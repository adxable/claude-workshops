# Speaker Notes: Self-Validating Agents in Claude Code

## Pre-Workshop Preparation

### Environment Setup (30 min before)
1. Open terminal with Claude Code ready
2. Have demo project pre-created with intentional errors
3. Test all validator scripts work correctly
4. Clear Claude Code context/history for clean demos
5. Have backup slides/recordings ready

### Materials Ready
- [ ] Starter repo URL in chat
- [ ] Quick reference cards printed
- [ ] Exercise instructions visible
- [ ] Timer for exercises

---

## Module 1: Why Self-Validation Matters

### 1.1 Welcome and Setup Check (15 min)

**[SLIDE: Title slide]**

"Welcome to Self-Validating Agents. Today you'll learn to build agents that don't just do work - they verify their own work and fix mistakes automatically."

**Quick poll (show of hands):**
- "Who has used Claude Code before?" (expect most)
- "Who has used custom commands?" (expect many)
- "Who has used hooks?" (expect few)

"Great - we're targeting the right level. We'll build on your Claude Code knowledge to add a crucial capability: deterministic validation."

**Environment check:**
"Let's make sure everyone is ready. Run these commands:"

```bash
claude --version  # Should be recent
python --version  # 3.9+
uv --version      # Or pip --version
```

"Raise your hand if anything fails - we'll help you while others continue."

**Create project structure:**
```bash
mkdir -p claude-validation-workshop/.claude/hooks/validators
mkdir -p claude-validation-workshop/.claude/commands
mkdir -p claude-validation-workshop/.claude/logs
cd claude-validation-workshop
```

---

### 1.2 The Trust Problem (20 min)

**[SLIDE: "Hope it works" vs "Guaranteed validation"]**

"How many of you have had an agent complete a task, say 'Done!', and then you spend 10 minutes verifying the output was actually correct?"

(Wait for nods/responses)

"That's the trust problem. We're spending human time validating AI work."

**Key message:**
"Validation increases the trust we have in our agents, and trust saves the most precious engineering resource: time."

(Pause to let this sink in)

**[SLIDE: Specialized vs General-Purpose Agents]**

"Here's a counterintuitive insight: a focused agent that does ONE thing exceptionally well outperforms a multi-purpose agent across dozens of runs."

**Example:**
"Imagine an agent called CSVedit. It ONLY edits CSV files. Because it's specialized:
- We can write perfect validation for it
- It knows all the CSV edge cases
- It never gets confused about its purpose

Compare to a generalist agent handling 10-20 different file types. How would you validate that?"

**Speaker note:** If someone asks "but isn't that limiting?" - answer: "You build a library of specialized agents. The orchestrator chooses which to deploy."

**[SLIDE: From Global to Specialized Hooks]**

"Claude Code has had global hooks in settings.json for a while. But the game-changer is hooks INSIDE custom commands, subagents, and skills."

"Why does location matter? Because now the validation is CONTEXTUAL. Your CSV validator only runs when the CSV agent runs. Your JSON validator only runs for JSON operations."

---

### 1.3 The Core 4 Mental Model (15 min)

**[SLIDE: The Core 4]**

"Before we dive into hooks, I want to give you a mental model that will make everything click."

"Everything in Claude Code - every feature, every abstraction - reduces to four primitives:"

(Draw on whiteboard or reveal one at a time)

1. **Prompts** - The instructions
2. **Tools** - The actions
3. **Context Model** - The information
4. **Agents** - The execution

"That's it. Custom commands? Just a prompt in an agent with tools. Skills? Same thing. Subagents? A prompt running in a new agent context."

**Key insight:**
"When you understand that custom commands and skills are essentially prompts running in agents, the whole system becomes simple."

**Speaker note:** Someone might ask about MCP servers - they're tools in the Core 4 model.

**[SLIDE: Mapping Abstractions to Core 4]**

| Abstraction | Core 4 Mapping |
|-------------|----------------|
| Custom command | Prompt + Agent + Tools |
| Skill | Prompt (triggered contextually) |
| Subagent | New Agent with its own Context |
| Hook | Tool that runs at lifecycle points |

"Hooks are just tools that fire automatically at specific points. Nothing magical."

**BREAK (10 min)**

---

## Module 2: Hook Types Deep Dive

### 2.1 The Three Hook Types (25 min)

**[SLIDE: Hook Lifecycle]**

"Now let's get technical. There are three hook types, and choosing the right one matters."

**pre-tool-use:**
"Fires BEFORE a tool runs. Use cases:
- Check permissions before a write
- Validate input before processing
- Log what's about to happen"

**post-tool-use:**
"Fires AFTER a tool completes. This is your workhorse for validation.
- Verify the output is correct
- Check file format/structure
- Validate data integrity"

**on-stop:**
"Fires when the ENTIRE agent workflow ends.
- Multi-file validation
- Codebase-wide checks
- Final integration tests"

**[SLIDE: Hook Configuration Syntax]**

"Here's the frontmatter format - this goes at the top of your custom command file:"

```yaml
---
hooks:
  post-tool-use:
    read: "uv run /absolute/path/to/validator.py {file_path}"
    write: "uv run /absolute/path/to/validator.py {file_path}"
---
```

**CRITICAL POINT:**
"Always use ABSOLUTE paths in hooks. Relative paths will fail because the working directory may not be what you expect."

---

### DEMO: Live Hook Configuration (10 min)

**[Switch to terminal]**

"Let me show you a complete example. We'll create a command that edits JSON files with validation."

**Step 1: Create the custom command**

```bash
cat > .claude/commands/json-edit.md << 'EOF'
---
hooks:
  post-tool-use:
    write: "python3 $(pwd)/.claude/hooks/validators/json_validator.py {file_path}"
---

# JSON Edit Command

You are a JSON file editor. Your task is to modify JSON files as requested.

IMPORTANT: After any write operation, a validator will check your work. If validation fails, you will receive an error message - FIX THE ERROR and try again.

## Rules
- Only edit JSON files
- Maintain valid JSON syntax at all times
- Preserve existing structure unless instructed to change it
EOF
```

**Step 2: Create the validator**

```python
#!/usr/bin/env python3
# .claude/hooks/validators/json_validator.py

import json
import sys
from pathlib import Path
from datetime import datetime

def validate_json(file_path: str) -> None:
    """Validate JSON file and return errors to agent."""

    # Log this validation attempt
    log_dir = Path(file_path).parent.parent / ".claude" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    log_file = log_dir / f"json_validation_{datetime.now():%Y%m%d_%H%M%S}.log"

    path = Path(file_path)

    # Check if file is JSON
    if path.suffix.lower() != '.json':
        return  # Not a JSON file, skip validation

    if not path.exists():
        print(f"ERROR: File does not exist: {file_path}")
        sys.exit(1)

    try:
        with open(path, 'r') as f:
            content = f.read()
            json.loads(content)

        # Log success
        with open(log_file, 'w') as f:
            f.write(f"VALIDATION PASSED: {file_path}\n")
            f.write(f"Timestamp: {datetime.now().isoformat()}\n")

        print(f"JSON validation passed: {file_path}")

    except json.JSONDecodeError as e:
        # Log failure
        with open(log_file, 'w') as f:
            f.write(f"VALIDATION FAILED: {file_path}\n")
            f.write(f"Error: {str(e)}\n")
            f.write(f"Timestamp: {datetime.now().isoformat()}\n")

        # Return actionable error to agent
        print(f"JSON VALIDATION ERROR in {file_path}:")
        print(f"  Line {e.lineno}, Column {e.colno}: {e.msg}")
        print(f"  Fix the JSON syntax error and try again.")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: json_validator.py <file_path>")
        sys.exit(1)
    validate_json(sys.argv[1])
```

**Step 3: Test it**

```bash
# Create a test JSON file with an error
echo '{"name": "test", "value": }' > test.json

# Run the command
claude /json-edit "Fix the syntax error in test.json"
```

**[Watch Claude detect error, receive feedback, fix it]**

"Notice what happened:
1. Claude wrote a fix (but maybe still wrong)
2. Validator ran, found error
3. Error message went back to Claude
4. Claude fixed the actual issue
5. Validator passed

This is the magic - automatic self-correction."

---

### 2.2 Exercise 1: Your First Validator (30 min)

**[SLIDE: Exercise 1 Instructions]**

"Your turn. You'll build a JSON validator from scratch."

**Instructions:**
1. Create `.claude/commands/json-edit.md` with the hook configuration
2. Create `.claude/hooks/validators/json_validator.py`
3. Test with an intentionally broken JSON file

**Success criteria:**
- Hook fires on write operations
- Invalid JSON produces error message
- Agent receives and acts on error
- Log file is created

**Circulate and help. Common issues:**
- Forgetting to use absolute path
- Python path issues (use `python3` not `python`)
- File permissions on validator script

**At 25 minutes:**
"Five minutes left - get to a stopping point. We'll review solutions."

**Review (5 min):**
- Ask one person to share their solution
- Highlight any creative additions
- Address common issues seen

**BREAK (10 min)**

---

## Module 3: Advanced Patterns

### 3.1 The Auto-Fix Feedback Loop (20 min)

**[SLIDE: The Feedback Loop Diagram]**

```
Agent writes file
       |
       v
Validator runs
       |
   Error? ----No----> Success!
       |
      Yes
       |
       v
Error message returned
       |
       v
Agent fixes issue
       |
       v
Validator runs again
       |
      ...
```

"This loop is the core pattern. The validator doesn't just say 'failed' - it tells the agent exactly what's wrong."

**Critical design point:**
"Your error messages must be ACTIONABLE. Compare these:"

BAD:
```
Validation failed
```

GOOD:
```
CSV error on row 3: Expected 5 columns, found 4.
Missing value in 'amount' column.
Row content: "2024-01-15,ACME Corp,Invoice,1500,"
Please add the missing amount value.
```

"The second one gives Claude everything it needs to fix the issue."

---

### DEMO: CSV Validation with Auto-Fix (15 min)

**[Switch to terminal]**

"Let's see this with a real-world example - CSV validation with pandas."

**Create the CSV command:**

```bash
cat > .claude/commands/csv-edit.md << 'EOF'
---
hooks:
  post-tool-use:
    write: "python3 $(pwd)/.claude/hooks/validators/csv_validator.py {file_path}"
---

# CSV Edit Command

You are a CSV file editor. Modify CSV files as requested while maintaining data integrity.

## Rules
- Maintain consistent column count across all rows
- Preserve header row
- Use proper CSV escaping for special characters
- If validation fails, read the error carefully and fix it

## Expected Schema (if applicable)
The validator will check for:
- Consistent column count
- No empty required fields
- Valid data types where specified
EOF
```

**Create the CSV validator:**

```python
#!/usr/bin/env python3
# .claude/hooks/validators/csv_validator.py

import sys
import csv
from pathlib import Path
from datetime import datetime

def validate_csv(file_path: str) -> None:
    """Validate CSV structure and return detailed errors."""

    path = Path(file_path)

    # Only validate CSV files
    if path.suffix.lower() != '.csv':
        return

    if not path.exists():
        print(f"ERROR: File does not exist: {file_path}")
        sys.exit(1)

    errors = []

    try:
        with open(path, 'r', newline='') as f:
            reader = csv.reader(f)
            rows = list(reader)

        if not rows:
            errors.append("CSV file is empty")
        else:
            header = rows[0]
            expected_cols = len(header)

            for i, row in enumerate(rows[1:], start=2):
                # Check column count
                if len(row) != expected_cols:
                    errors.append(
                        f"Row {i}: Expected {expected_cols} columns, found {len(row)}. "
                        f"Row content: {row}"
                    )

                # Check for empty values in first column (usually ID/key)
                if row and not row[0].strip():
                    errors.append(
                        f"Row {i}: First column is empty. Row content: {row}"
                    )

        if errors:
            print(f"CSV VALIDATION ERRORS in {file_path}:")
            for error in errors:
                print(f"  - {error}")
            print("\nFix these errors and try again.")
            sys.exit(1)
        else:
            print(f"CSV validation passed: {file_path}")

    except csv.Error as e:
        print(f"CSV PARSE ERROR in {file_path}: {str(e)}")
        sys.exit(1)
    except Exception as e:
        print(f"UNEXPECTED ERROR validating {file_path}: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: csv_validator.py <file_path>")
        sys.exit(1)
    validate_csv(sys.argv[1])
```

**Create a broken CSV:**

```bash
cat > transactions.csv << 'EOF'
date,vendor,description,amount,category
2024-01-15,ACME Corp,Invoice,1500,Services
2024-01-16,Tech Inc,Software License,2500
2024-01-17,Office Depot,Supplies,150,Office
EOF
```

"Notice row 3 is missing the category column."

**Run the command:**

```bash
claude /csv-edit "Review transactions.csv and fix any data issues"
```

**[Watch the demo - Claude should:]**
1. Read the file
2. Try to understand/fix it
3. Write a fix
4. Validator catches remaining issues
5. Agent self-corrects

"See the feedback loop in action? Claude got specific error messages and fixed exactly what was wrong."

---

### 3.2 Exercise 2: Self-Correcting Agent (25 min)

**[SLIDE: Exercise 2 Instructions]**

"Now build your own self-correcting CSV agent."

**Requirements:**
1. Create `.claude/commands/csv-edit.md`
2. Create `.claude/hooks/validators/csv_validator.py`
3. Validator must check:
   - Consistent column count
   - No empty values in required columns
   - Return specific error messages with row numbers
4. Test with intentionally broken CSV

**Challenge mode (if time permits):**
Add schema validation:
- Required columns: date, amount, description
- Amount must be numeric
- Date must be valid format

**Circulate and assist.**

**At 20 minutes:**
"Five minutes to wrap up. Make sure your basic validation works."

**Quick share (5 min):**
- "Who got the auto-fix loop working?"
- "Anyone tackle the challenge mode?"
- Address questions

---

### 3.3 Parallel Agents & Observability (10 min)

**[SLIDE: One Agent Per File Pattern]**

"What if you need to process 50 CSV files? You don't run one agent on all of them."

**Pattern: Parallel Subagents**

```
Orchestrator Agent
       |
       +---> Subagent 1 (file1.csv) ---> Validator
       |
       +---> Subagent 2 (file2.csv) ---> Validator
       |
       +---> Subagent 3 (file3.csv) ---> Validator
```

"Each subagent:
- Handles exactly one file
- Has its own validation hooks
- Runs in isolation
- Logs independently"

**Why this matters:**
- Failures are isolated
- Parallel execution possible
- Clear ownership of errors
- Easier debugging

**[SLIDE: Logging Pattern]**

"Every validator should write logs:"

```
.claude/logs/validators/
  csv_validation_20240115_143022_file1.log
  csv_validation_20240115_143023_file2.log
  csv_validation_20240115_143024_file3.log
```

"Include in each log:
- Timestamp
- File validated
- Pass/fail
- Error details if failed
- Validation duration"

"This gives you full observability across all agent runs."

---

## Module 4: Wrap-up

### 4.1 Key Takeaways (5 min)

**[SLIDE: Five Key Lessons]**

"Let's recap what we learned:"

1. **Specialize your agents**
   "A focused agent doing one thing well beats a generalist."

2. **Validate deterministically**
   "Scripts, not prompts. Deterministic, not probabilistic."

3. **Enable self-correction**
   "Clear error messages let agents fix themselves."

4. **Log everything**
   "You can't debug what you can't see."

5. **Know what your agents do**
   "Read the docs. Understand the code. Avoid vibe coding."

---

### 4.2 Warning: Avoid Vibe Coding (3 min)

**[SLIDE: Quote]**

> "The key difference between real engineering and vibe coding is that engineers know what their agents are doing."

"I want to leave you with a warning. It's tempting to let agents do everything while you stop learning. Don't."

"Read Claude Code release notes - valuable features are buried in there. Understand your validation scripts. Maintain your engineering fundamentals."

"You're not working on your application anymore. You're working on the agents that run your application. That requires MORE engineering skill, not less."

---

### 4.3 Next Steps (2 min)

**[SLIDE: Action Items]**

"Before you leave, commit to one action:"

- [ ] Audit one existing agent for validation opportunities
- [ ] Create a validators directory in one project
- [ ] Build one specialized agent this week
- [ ] Implement logging for one validation run
- [ ] Share what you learn with your team

---

### 4.4 Q&A (10 min)

**Common questions and answers:**

**Q: Can hooks call external APIs?**
A: Yes, but be careful about latency. Hooks run synchronously.

**Q: What happens if a hook times out?**
A: The operation fails. Keep validators fast.

**Q: Can I use hooks with MCP servers?**
A: Yes, hooks work with any tool, including MCP-provided tools.

**Q: How do I debug hooks that aren't firing?**
A: Check the absolute path first. Then add a simple `echo "Hook fired"` to verify execution.

**Q: Can validators modify files?**
A: Technically yes, but don't. Validators should validate, not fix. Let the agent fix.

---

## Post-Workshop

### Send to Participants
- Link to exercise solutions
- Quick reference card PDF
- Links to Claude Code hook documentation
- Feedback survey

### Collect
- Feedback on pacing
- Difficulty ratings
- Topic requests for advanced workshop
