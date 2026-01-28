# Exercise 1: Your First JSON Validator

**Duration:** 30 minutes
**Difficulty:** Beginner

## Goal

Create a JSON validator that runs automatically after every write operation and provides actionable error messages that enable Claude to self-correct.

## What You Will Build

1. A custom command (`json-edit.md`) with hook configuration
2. A validation script (`json_validator.py`) that checks JSON syntax
3. A logging system for debugging

## Directory Structure

After completing this exercise, you should have:

```
your-project/
├── .claude/
│   ├── commands/
│   │   └── json-edit.md         # Your custom command
│   ├── hooks/
│   │   └── validators/
│   │       └── json_validator.py # Your validator
│   └── logs/                     # Validation logs (auto-created)
└── test.json                     # Test file
```

## Instructions

### Step 1: Create the Directory Structure

```bash
mkdir -p .claude/hooks/validators
mkdir -p .claude/commands
mkdir -p .claude/logs
```

### Step 2: Create the Custom Command

Create `.claude/commands/json-edit.md` with the hook configuration.

**Requirements:**
- Hook should fire on `post-tool-use` for `write` operations
- Use absolute path to the validator (use `$(pwd)` trick)
- Tell Claude to fix errors when validation fails

**Starter template provided in:** `starter/json-edit.md`

### Step 3: Create the Validator Script

Create `.claude/hooks/validators/json_validator.py`

**Requirements:**
- Accept file path as command line argument
- Only validate `.json` files (skip others)
- Parse JSON and catch `JSONDecodeError`
- Print actionable error messages with line/column numbers
- Exit with code 1 on failure, 0 on success
- Write to a log file for debugging

**Starter template provided in:** `starter/json_validator.py`

### Step 4: Test Your Implementation

1. Create a broken JSON file:
   ```bash
   echo '{"name": "test", "value": }' > test.json
   ```

2. Run the command:
   ```bash
   claude /json-edit "Fix the syntax error in test.json"
   ```

3. Observe:
   - Validator should detect the error
   - Error message should appear in Claude's context
   - Claude should attempt to fix the file
   - Validator should run again
   - Eventually validation should pass

## Success Criteria

- [ ] Hook fires after every write operation to a JSON file
- [ ] Invalid JSON produces specific error message with line/column
- [ ] Agent receives error and makes correction attempt
- [ ] Log file is created in `.claude/logs/`
- [ ] Valid JSON passes without errors

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Hook not firing | Check path is absolute; verify YAML frontmatter syntax |
| Python not found | Use `python3` instead of `python` |
| Permission denied | Run `chmod +x` on validator script |
| No output to agent | Ensure using `print()` to stdout |

## Bonus Challenge

Enhance your validator to also check:
- File is not empty
- Top-level is an object or array (not primitive)
- No duplicate keys (requires custom parsing)

## Solution

See `solution/` directory for complete working implementation.
