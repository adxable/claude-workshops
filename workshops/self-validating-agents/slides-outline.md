# Slides Outline: Self-Validating Agents in Claude Code

## Slide Deck Structure

**Total Slides:** ~45-50
**Format Recommendation:** Dark theme, minimal text, large code snippets
**Fonts:** Monospace for code, sans-serif for headings

---

## Section 1: Opening (Slides 1-8)

### Slide 1: Title
**Self-Validating Agents in Claude Code**

Subtitle: Building Agents That Check Their Own Work

Visual: Abstract illustration of a feedback loop or quality check symbol

---

### Slide 2: The Problem

**"Done!"**

...but is it really?

Visual: Chat bubble with agent saying "Done!" and developer looking skeptical

---

### Slide 3: The Time Sink

**Manual verification is expensive**

- Review every file change
- Check every output format
- Validate every data transformation
- Repeat for every run

Visual: Clock draining or hourglass

---

### Slide 4: The Solution

**Agents that validate their own work**

Deterministic. Automatic. Every time.

Visual: Circular arrow with checkmark

---

### Slide 5: Quote Slide

> "Validation increases the trust we have in our agents, and trust saves the most precious engineering resource: time."

---

### Slide 6: Workshop Goals

By the end, you will:

1. Create commands with validation hooks
2. Build validation scripts
3. Implement auto-fix feedback loops
4. Deploy parallel validated agents

---

### Slide 7: Prerequisites Check

```bash
claude --version
python3 --version
uv --version
```

Visual: Terminal window

---

### Slide 8: Project Setup

```bash
mkdir -p workshop/.claude/hooks/validators
mkdir -p workshop/.claude/commands
mkdir -p workshop/.claude/logs
```

---

## Section 2: The Core 4 Mental Model (Slides 9-14)

### Slide 9: Section Title

**The Core 4**

Understanding Claude Code's Fundamentals

---

### Slide 10: The Four Primitives

```
+----------+     +-------+
| Prompts  |     | Tools |
+----------+     +-------+
      \             /
       \           /
        \         /
       +----------+
       |  Agent   |
       +----------+
            |
     +--------------+
     | Context Model|
     +--------------+
```

---

### Slide 11: Everything Is Prompts + Agents

| Abstraction | What It Really Is |
|-------------|-------------------|
| Custom Command | Prompt in Agent |
| Skill | Prompt (triggered) |
| Subagent | New Agent context |
| Hook | Auto-triggered Tool |

---

### Slide 12: Why This Matters

"When you understand that custom commands are just prompts running in agents, the whole system becomes simple."

---

### Slide 13: Hooks in Core 4

Hooks = Tools that fire automatically

- At specific lifecycle points
- With specific triggers
- Returning output to agent

---

### Slide 14: Key Insight

Custom commands, skills, subagents - they all collapse to the Core 4.

Master the primitives, master the system.

---

## Section 3: Hook Types Deep Dive (Slides 15-25)

### Slide 15: Section Title

**Hook Types**

When, Where, and Why

---

### Slide 16: The Three Types

| Hook | Fires | Best For |
|------|-------|----------|
| pre-tool-use | Before | Input validation |
| post-tool-use | After | Output validation |
| on-stop | End | Multi-file checks |

---

### Slide 17: pre-tool-use

**Before the tool runs**

Use cases:
- Permission checks
- Input validation
- Logging/audit

---

### Slide 18: post-tool-use

**After the tool completes**

Use cases:
- Output validation (primary)
- Format verification
- Data integrity checks

Visual: Highlight this as the most important

---

### Slide 19: on-stop

**When agent workflow ends**

Use cases:
- Multi-file validation
- Codebase-wide checks
- Integration tests

---

### Slide 20: Configuration Location

Hooks go in frontmatter:

```markdown
---
hooks:
  post-tool-use:
    write: "validator.py {file_path}"
---

# Your Command Content
```

---

### Slide 21: Tool-Specific Hooks

```yaml
hooks:
  post-tool-use:
    read: "validate_read.py {file_path}"
    write: "validate_write.py {file_path}"
    bash: "validate_bash.py {command}"
```

---

### Slide 22: Critical Rule

**ALWAYS use absolute paths**

Bad:
```yaml
write: "./validators/check.py"
```

Good:
```yaml
write: "/full/path/to/validators/check.py"
```

Or:
```yaml
write: "python3 $(pwd)/.claude/hooks/validators/check.py"
```

---

### Slide 23: Hook Output

What the validator prints goes to the agent.

```python
# Agent sees this:
print("ERROR: Line 5 has invalid format")
```

---

### Slide 24: Hook Exit Codes

| Exit Code | Meaning |
|-----------|---------|
| 0 | Success, continue |
| Non-zero | Failure, report to agent |

```python
sys.exit(1)  # Tell agent something is wrong
```

---

### Slide 25: Quick Demo

Live: Creating a hook that fires on every write

Visual: Terminal screenshot or live demo indicator

---

## Section 4: Building Validators (Slides 26-32)

### Slide 26: Section Title

**Building Validators**

Scripts That Enable Self-Correction

---

### Slide 27: Validator Template

```python
#!/usr/bin/env python3
import sys
from pathlib import Path

def validate(file_path: str):
    errors = []

    # Your validation logic

    if errors:
        for e in errors:
            print(f"ERROR: {e}")
        sys.exit(1)

if __name__ == "__main__":
    validate(sys.argv[1])
```

---

### Slide 28: The Golden Rule

Error messages must be **ACTIONABLE**

---

### Slide 29: Bad vs Good Errors

**Bad:**
```
Validation failed
```

**Good:**
```
Row 3: Expected 5 columns, found 4
Missing 'category' value after 'amount'
Add the missing column value
```

---

### Slide 30: What Agent Needs

1. **Where** is the problem?
2. **What** should it be?
3. **What** is it now?
4. **How** to fix it?

---

### Slide 31: Logging Pattern

```python
log_file = f"validation_{timestamp}.log"

with open(log_file, 'w') as f:
    f.write(f"File: {path}\n")
    f.write(f"Status: {status}\n")
    f.write(f"Errors: {errors}\n")
```

---

### Slide 32: Exercise 1 Introduction

Build a JSON validator

- Catches syntax errors
- Returns line/column info
- Creates log file

**Time: 30 minutes**

---

## Section 5: The Auto-Fix Loop (Slides 33-40)

### Slide 33: Section Title

**The Auto-Fix Loop**

Closed-Loop Self-Correction

---

### Slide 34: The Pattern

```
Write -> Validate -> Error? -> Fix -> Validate -> Done
          ^                      |
          +----------------------+
```

---

### Slide 35: Flow Diagram

```
Agent writes file
       |
       v
Validator runs
       |
   Error? --No--> Success!
       |
      Yes
       |
       v
Error to agent
       |
       v
Agent fixes
       |
       v
[repeat]
```

---

### Slide 36: Demo - CSV Validation

Live demonstration:
1. Broken CSV file
2. Agent attempts edit
3. Validator catches error
4. Agent self-corrects
5. Validation passes

---

### Slide 37: The Magic

No human intervention required.

Agent + Validator = Closed loop

---

### Slide 38: Design Principle

Validators VALIDATE.
Agents FIX.

Don't let validators modify files.

---

### Slide 39: Exercise 2 Introduction

Build a self-correcting CSV agent

- Validates column count
- Checks required fields
- Enables auto-correction

**Time: 25 minutes**

---

### Slide 40: Challenge Mode

Add schema validation:
- Required columns
- Data types
- Date formats

---

## Section 6: Parallel Agents & Observability (Slides 41-45)

### Slide 41: Section Title

**Scaling Up**

Parallel Agents & Observability

---

### Slide 42: One Agent Per File

Processing 50 files?

```
Orchestrator
    |
    +-> Agent 1 (file1) -> Validator
    +-> Agent 2 (file2) -> Validator
    +-> Agent 3 (file3) -> Validator
```

---

### Slide 43: Why Parallelize?

- Failures isolated
- Independent validation
- Clearer debugging
- Better logging

---

### Slide 44: Logging Structure

```
.claude/logs/validators/
  csv_20240115_143022_file1.log
  csv_20240115_143023_file2.log
  csv_20240115_143024_file3.log
```

Full visibility across all runs.

---

### Slide 45: Observability Checklist

Each log should include:
- [ ] Timestamp
- [ ] File path
- [ ] Pass/Fail status
- [ ] Error details
- [ ] Validation duration

---

## Section 7: Closing (Slides 46-50)

### Slide 46: Section Title

**Wrapping Up**

Key Takeaways & Next Steps

---

### Slide 47: Five Key Lessons

1. **Specialize** your agents
2. **Validate** deterministically
3. **Enable** self-correction
4. **Log** everything
5. **Know** what agents do

---

### Slide 48: Warning - Vibe Coding

> "The key difference between real engineering and vibe coding is that engineers know what their agents are doing."

Read the docs. Understand your code. Keep learning.

---

### Slide 49: Your Next Steps

- [ ] Audit one project for validation opportunities
- [ ] Create validators directory
- [ ] Build one specialized agent
- [ ] Implement logging
- [ ] Share with your team

---

### Slide 50: Thank You

**Questions?**

Resources:
- Claude Code documentation
- Workshop materials
- Exercise solutions

---

## Visual Guidelines

### Code Slides

- Dark background (prefer #1e1e1e or similar)
- Syntax highlighting
- Large font (minimum 18pt)
- Maximum 15 lines of code per slide

### Diagram Slides

- Simple box/arrow diagrams
- Maximum 5-6 elements
- Clear flow direction
- Color-coded by type

### Quote Slides

- Large centered text
- Minimal decoration
- Speaker attribution if known

### Table Slides

- Maximum 4 columns
- Maximum 5 rows
- Clear headers
- Alternating row colors

---

## Animations Suggestions

### For Hook Flow (Slide 35)

Reveal each step sequentially:
1. "Agent writes file" appears
2. Arrow animates down
3. "Validator runs" appears
4. Decision diamond appears
5. Loop back arrow animates

### For Core 4 (Slide 10)

Build diagram piece by piece:
1. Agent box appears center
2. Prompts appears upper left
3. Tools appears upper right
4. Context Model appears below
5. Connection lines draw in

---

## Handout Materials

Consider printing and distributing:
1. Quick reference card (hooks syntax)
2. Validator template
3. Exercise instructions
4. Troubleshooting guide

These allow participants to follow along without needing to switch between slides and code.
