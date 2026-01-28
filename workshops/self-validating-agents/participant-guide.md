# Participant Guide: Self-Validating Agents in Claude Code

## Workshop Overview

**Duration:** 2.5-3 hours
**Your Goal:** Learn to build agents that validate their own work and fix mistakes automatically

By the end of this workshop, you will be able to:
- Create custom commands with validation hooks
- Build validation scripts that provide actionable feedback
- Implement the auto-fix feedback loop pattern
- Deploy parallel agents with individual validation

---

## Prerequisites Checklist

Before we begin, verify your setup:

```bash
# Check Claude Code
claude --version
# Expected: Recent version (check with facilitator)

# Check Python
python3 --version
# Expected: 3.9 or higher

# Check uv (or pip)
uv --version
# OR
pip --version
```

If any check fails, raise your hand for assistance.

---

## Project Setup

Create your workshop directory:

```bash
# Create directory structure
mkdir -p claude-validation-workshop/.claude/hooks/validators
mkdir -p claude-validation-workshop/.claude/commands
mkdir -p claude-validation-workshop/.claude/logs
cd claude-validation-workshop

# Initialize (optional)
git init
```

---

## Quick Reference: The Core 4

Everything in Claude Code reduces to four primitives:

| Primitive | What It Is | Example |
|-----------|------------|---------|
| **Prompts** | Instructions that guide behavior | Custom command content |
| **Tools** | Actions the agent can take | read, write, bash, grep |
| **Context Model** | Information available | Files, conversation history |
| **Agents** | The execution environment | Claude Code session |

**Key insight:** Custom commands, skills, and subagents are all just prompts running in agents with tools.

---

## Quick Reference: Hook Types

| Hook | When It Fires | Best Use Case |
|------|---------------|---------------|
| `pre-tool-use` | Before tool runs | Permission checks, input validation |
| `post-tool-use` | After tool completes | Output validation, format checks |
| `on-stop` | When agent finishes | Multi-file validation, final checks |

### Hook Configuration Syntax

Place in frontmatter of custom command (`.claude/commands/*.md`):

```yaml
---
hooks:
  post-tool-use:
    write: "python3 /absolute/path/to/validator.py {file_path}"
    read: "python3 /absolute/path/to/validator.py {file_path}"
  on-stop: "python3 /absolute/path/to/final_check.py"
---
```

**IMPORTANT:** Always use absolute paths in hooks!

---

## Exercise 1: Your First Validator

**Duration:** 30 minutes
**Goal:** Create a JSON validator that catches syntax errors

### Step 1: Create the Custom Command

Create file: `.claude/commands/json-edit.md`

```markdown
---
hooks:
  post-tool-use:
    write: "python3 $(pwd)/.claude/hooks/validators/json_validator.py {file_path}"
---

# JSON Edit Command

You are a JSON file editor. Your task is to modify JSON files as requested.

IMPORTANT: After any write operation, a validator will check your work. If validation fails, you will receive an error message. READ THE ERROR CAREFULLY and fix the issue.

## Rules

- Only edit JSON files
- Maintain valid JSON syntax at all times
- Preserve existing structure unless instructed otherwise
- If validation fails, fix the error and try again
```

### Step 2: Create the Validator

Create file: `.claude/hooks/validators/json_validator.py`

```python
#!/usr/bin/env python3
"""JSON validator for Claude Code hooks."""

import json
import sys
from pathlib import Path
from datetime import datetime


def validate_json(file_path: str) -> None:
    """Validate JSON file and return errors to agent."""

    path = Path(file_path)

    # Only validate JSON files
    if path.suffix.lower() != '.json':
        return  # Not a JSON file, skip

    if not path.exists():
        print(f"ERROR: File does not exist: {file_path}")
        sys.exit(1)

    # Create log directory
    log_dir = Path.cwd() / ".claude" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    log_file = log_dir / f"json_validation_{datetime.now():%Y%m%d_%H%M%S}.log"

    try:
        with open(path, 'r') as f:
            content = f.read()
            json.loads(content)

        # Log success
        with open(log_file, 'w') as log:
            log.write(f"PASSED: {file_path}\n")
            log.write(f"Time: {datetime.now().isoformat()}\n")

        print(f"JSON validation PASSED: {file_path}")

    except json.JSONDecodeError as e:
        # Log failure
        with open(log_file, 'w') as log:
            log.write(f"FAILED: {file_path}\n")
            log.write(f"Error: {e.msg} at line {e.lineno}, col {e.colno}\n")
            log.write(f"Time: {datetime.now().isoformat()}\n")

        # Return actionable error to agent
        print(f"JSON VALIDATION ERROR in {file_path}:")
        print(f"  Line {e.lineno}, Column {e.colno}: {e.msg}")
        print(f"  Please fix the JSON syntax error and try again.")
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: json_validator.py <file_path>")
        sys.exit(1)
    validate_json(sys.argv[1])
```

### Step 3: Make Validator Executable (optional but recommended)

```bash
chmod +x .claude/hooks/validators/json_validator.py
```

### Step 4: Test It

Create a broken JSON file:

```bash
echo '{"name": "test", "value": }' > test.json
```

Run the command:

```bash
claude /json-edit "Fix the syntax error in test.json"
```

### Success Criteria

- [ ] Hook fires after write operations
- [ ] Invalid JSON produces specific error message
- [ ] Agent receives error and attempts to fix
- [ ] Log file created in `.claude/logs/`

### Troubleshooting

| Problem | Solution |
|---------|----------|
| Hook not firing | Check path is absolute, verify frontmatter syntax |
| Python not found | Use `python3` instead of `python` |
| Permission denied | Run `chmod +x` on validator script |
| No output | Add `print()` statements to debug |

---

## Exercise 2: Self-Correcting CSV Agent

**Duration:** 25 minutes
**Goal:** Build a CSV validator with detailed error messages that enable auto-correction

### Step 1: Create the Custom Command

Create file: `.claude/commands/csv-edit.md`

```markdown
---
hooks:
  post-tool-use:
    write: "python3 $(pwd)/.claude/hooks/validators/csv_validator.py {file_path}"
---

# CSV Edit Command

You are a CSV file editor. Modify CSV files as requested while maintaining data integrity.

## Rules

- Maintain consistent column count across ALL rows
- Preserve the header row
- Use proper CSV escaping for commas and quotes
- Never leave required fields empty

## Validation

After every write, a validator checks:
1. All rows have the same number of columns as the header
2. Required fields are not empty
3. CSV format is valid

If validation fails, you will receive a detailed error message. Fix the EXACT issue mentioned and try again.
```

### Step 2: Create the CSV Validator

Create file: `.claude/hooks/validators/csv_validator.py`

```python
#!/usr/bin/env python3
"""CSV validator for Claude Code hooks."""

import sys
import csv
from pathlib import Path
from datetime import datetime


def validate_csv(file_path: str) -> None:
    """Validate CSV structure with detailed error messages."""

    path = Path(file_path)

    # Only validate CSV files
    if path.suffix.lower() != '.csv':
        return

    if not path.exists():
        print(f"ERROR: File does not exist: {file_path}")
        sys.exit(1)

    errors = []

    # Create log directory
    log_dir = Path.cwd() / ".claude" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    log_file = log_dir / f"csv_validation_{datetime.now():%Y%m%d_%H%M%S}.log"

    try:
        with open(path, 'r', newline='', encoding='utf-8') as f:
            reader = csv.reader(f)
            rows = list(reader)

        if not rows:
            errors.append("CSV file is empty - add header and data rows")
        else:
            header = rows[0]
            expected_cols = len(header)

            # Check header
            if not all(col.strip() for col in header):
                empty_indices = [i+1 for i, col in enumerate(header) if not col.strip()]
                errors.append(f"Header has empty column names at positions: {empty_indices}")

            # Check each data row
            for row_num, row in enumerate(rows[1:], start=2):
                # Column count check
                if len(row) != expected_cols:
                    errors.append(
                        f"Row {row_num}: Expected {expected_cols} columns, found {len(row)}. "
                        f"Content: {row}"
                    )

                # Empty first column check (usually ID/key)
                if row and not row[0].strip():
                    errors.append(
                        f"Row {row_num}: First column ('{header[0]}') is empty"
                    )

        # Log results
        with open(log_file, 'w') as log:
            log.write(f"File: {file_path}\n")
            log.write(f"Time: {datetime.now().isoformat()}\n")
            log.write(f"Status: {'FAILED' if errors else 'PASSED'}\n")
            if errors:
                log.write(f"Errors:\n")
                for e in errors:
                    log.write(f"  - {e}\n")

        if errors:
            print(f"CSV VALIDATION ERRORS in {file_path}:")
            print()
            for error in errors:
                print(f"  - {error}")
            print()
            print("Fix these specific errors and try again.")
            sys.exit(1)
        else:
            print(f"CSV validation PASSED: {file_path}")

    except csv.Error as e:
        print(f"CSV PARSE ERROR in {file_path}: {str(e)}")
        sys.exit(1)
    except UnicodeDecodeError as e:
        print(f"ENCODING ERROR in {file_path}: File contains invalid characters. "
              f"Ensure UTF-8 encoding.")
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: csv_validator.py <file_path>")
        sys.exit(1)
    validate_csv(sys.argv[1])
```

### Step 3: Create Test Data with Errors

Create file: `transactions.csv`

```csv
date,vendor,description,amount,category
2024-01-15,ACME Corp,Invoice,1500,Services
2024-01-16,Tech Inc,Software License,2500
2024-01-17,Office Depot,Supplies,150,Office
,Amazon,Books,45,Education
```

This file has two intentional errors:
1. Row 3 is missing the "category" column
2. Row 5 has an empty "date" column

### Step 4: Test the Auto-Fix Loop

```bash
claude /csv-edit "Review transactions.csv and fix any data issues you find"
```

### Success Criteria

- [ ] Validator detects both errors
- [ ] Error messages include row numbers and specific issues
- [ ] Agent fixes the issues based on error feedback
- [ ] Final validation passes

### Challenge Mode (Extra Credit)

Enhance your validator to also check:

1. **Required columns exist:** date, vendor, amount
2. **Amount is numeric:** Parse and validate
3. **Date format:** Check for valid date format (YYYY-MM-DD)

Add these checks to your validator:

```python
# Add after existing checks in validate_csv()

# Required columns check
required_columns = {'date', 'vendor', 'amount'}
header_set = {col.lower().strip() for col in header}
missing = required_columns - header_set
if missing:
    errors.append(f"Missing required columns: {missing}")

# Data type checks (for each row)
amount_idx = None
date_idx = None
for i, col in enumerate(header):
    if col.lower().strip() == 'amount':
        amount_idx = i
    if col.lower().strip() == 'date':
        date_idx = i

for row_num, row in enumerate(rows[1:], start=2):
    # Amount numeric check
    if amount_idx is not None and amount_idx < len(row):
        try:
            float(row[amount_idx].replace(',', ''))
        except ValueError:
            errors.append(
                f"Row {row_num}: 'amount' must be numeric, got '{row[amount_idx]}'"
            )

    # Date format check
    if date_idx is not None and date_idx < len(row):
        import re
        if row[date_idx] and not re.match(r'\d{4}-\d{2}-\d{2}', row[date_idx]):
            errors.append(
                f"Row {row_num}: 'date' should be YYYY-MM-DD format, got '{row[date_idx]}'"
            )
```

---

## Key Concepts Summary

### The Auto-Fix Feedback Loop

```
Agent writes file
       |
       v
Validator runs
       |
   Error? ----No----> Done!
       |
      Yes
       |
       v
Error returned to agent
       |
       v
Agent fixes based on error
       |
       v
Validator runs again...
```

### Writing Good Error Messages

**BAD:**
```
Validation failed
```

**GOOD:**
```
CSV error on row 3: Expected 5 columns, found 4.
Missing value after 'Software License,2500'.
Please add the 'category' column value.
```

The agent needs:
1. **Location:** Where is the problem? (row 3)
2. **Expected:** What should it be? (5 columns)
3. **Actual:** What is it now? (4 columns)
4. **Action:** What should the agent do? (add category)

### Specialized vs General Agents

| Approach | Pros | Cons |
|----------|------|------|
| **Specialized** (CSVedit) | Perfect validation, predictable, focused | Need multiple agents |
| **General** (edit anything) | Flexible, one agent | Hard to validate, unpredictable |

**Recommendation:** Build a library of specialized agents. Use an orchestrator to choose which one to deploy.

---

## File Reference

After completing both exercises, your directory should look like:

```
claude-validation-workshop/
├── .claude/
│   ├── commands/
│   │   ├── json-edit.md
│   │   └── csv-edit.md
│   ├── hooks/
│   │   └── validators/
│   │       ├── json_validator.py
│   │       └── csv_validator.py
│   └── logs/
│       ├── json_validation_*.log
│       └── csv_validation_*.log
├── test.json
└── transactions.csv
```

---

## Next Steps After This Workshop

### Immediate Actions

- [ ] Audit one existing project for validation opportunities
- [ ] Create a `.claude/hooks/validators/` directory in your main project
- [ ] Build one specialized agent for a repetitive task
- [ ] Implement logging for at least one validation workflow

### Learning Resources

- Claude Code documentation on hooks
- Claude Code release notes (valuable features are often buried!)
- Community patterns and examples

### Advanced Topics to Explore

- **Parallel subagents:** One agent per file for batch processing
- **On-stop hooks:** Validate entire codebase when agent finishes
- **MCP server integration:** Use external tools in validation
- **Complex schemas:** Validate against JSON Schema, database schemas

---

## Troubleshooting Guide

### Hook Not Firing

1. **Check the path is absolute**
   - Use `$(pwd)` or full path like `/Users/you/project/.claude/hooks/...`
   - Relative paths fail silently

2. **Verify frontmatter syntax**
   - Must be valid YAML
   - Must be at the very top of the file
   - Check for proper indentation

3. **Test validator independently**
   ```bash
   python3 .claude/hooks/validators/json_validator.py test.json
   ```

### Validator Not Returning Errors to Agent

1. **Print to stdout**
   - Use `print()` not `logging` for messages to agent
   - Claude Code captures stdout

2. **Exit with non-zero code on failure**
   - Use `sys.exit(1)` when validation fails
   - `sys.exit(0)` or no exit means success

### Python Issues

1. **Use python3 explicitly**
   - Some systems have `python` pointing to Python 2
   - Always use `python3` in hook commands

2. **Missing dependencies**
   - For pandas: `pip install pandas`
   - Consider using `uv` for faster installs

---

## Quick Reference Card

### Hook Frontmatter Template

```yaml
---
hooks:
  pre-tool-use:
    bash: "command {args}"
  post-tool-use:
    read: "python3 /path/to/validator.py {file_path}"
    write: "python3 /path/to/validator.py {file_path}"
  on-stop: "python3 /path/to/final_check.py"
---
```

### Validator Template

```python
#!/usr/bin/env python3
import sys
from pathlib import Path

def validate(file_path: str) -> None:
    path = Path(file_path)

    # Skip non-target files
    if path.suffix.lower() != '.target':
        return

    errors = []

    # Your validation logic here
    # ...

    if errors:
        print(f"VALIDATION ERRORS in {file_path}:")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)
    else:
        print(f"Validation passed: {file_path}")

if __name__ == "__main__":
    validate(sys.argv[1])
```

### Remember

> "The key difference between real engineering and vibe coding is that engineers know what their agents are doing."

Read the docs. Understand your validators. Keep learning.
