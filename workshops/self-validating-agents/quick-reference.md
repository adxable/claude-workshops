# Quick Reference Card: Self-Validating Agents

## Hook Types at a Glance

| Hook | When It Fires | Use For |
|------|---------------|---------|
| `pre-tool-use` | Before tool runs | Input validation, permission checks |
| `post-tool-use` | After tool completes | Output validation, format checks |
| `on-stop` | When agent workflow ends | Multi-file validation, final checks |

## Hook Configuration Template

Place in frontmatter of `.claude/commands/*.md`:

```yaml
---
hooks:
  pre-tool-use:
    bash: "python3 /path/to/pre_check.py {command}"
  post-tool-use:
    read: "python3 /path/to/validator.py {file_path}"
    write: "python3 /path/to/validator.py {file_path}"
  on-stop: "python3 /path/to/final_check.py"
---
```

## Critical Rules

1. **Always use absolute paths** - Relative paths fail silently
2. **Print to stdout** - Agent only sees `print()` output
3. **Exit codes matter** - `sys.exit(1)` = failure, `sys.exit(0)` = success
4. **Be specific** - Actionable error messages enable auto-fix

## Validator Template

```python
#!/usr/bin/env python3
import sys
from pathlib import Path
from datetime import datetime

def validate(file_path: str) -> None:
    path = Path(file_path)

    # Skip non-target files
    if path.suffix.lower() != '.target':
        return

    if not path.exists():
        print(f"ERROR: File not found: {file_path}")
        sys.exit(1)

    errors = []

    # Your validation logic here
    # ...

    # Log results
    log_dir = Path.cwd() / ".claude" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    log_file = log_dir / f"validation_{datetime.now():%Y%m%d_%H%M%S}.log"

    with open(log_file, 'w') as f:
        f.write(f"File: {file_path}\n")
        f.write(f"Status: {'FAIL' if errors else 'PASS'}\n")

    # Output to agent
    if errors:
        print(f"VALIDATION ERRORS in {file_path}:")
        for e in errors:
            print(f"  - {e}")
        print("\nFix these errors and try again.")
        sys.exit(1)
    else:
        print(f"Validation passed: {file_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: validator.py <file_path>")
        sys.exit(1)
    validate(sys.argv[1])
```

## Good vs Bad Error Messages

### Bad (Not Actionable)
```
Validation failed
```

### Good (Actionable)
```
CSV error in transactions.csv:
  Row 3: Expected 5 columns, found 4
  Row content: ['2024-01-16', 'Tech Inc', 'License', '2500']
  Missing value for column: 'category'
Fix this error and try again.
```

## The Auto-Fix Loop

```
Agent writes -> Validator -> Error? -> Agent fixes -> Validator -> Success
                              ^                          |
                              +------ Loop back ----------+
```

## The Core 4

| Primitive | What It Is |
|-----------|------------|
| Prompts | Instructions |
| Tools | Actions |
| Context | Information |
| Agents | Execution |

Everything else (commands, skills, subagents) reduces to these.

## Directory Structure

```
project/
├── .claude/
│   ├── commands/
│   │   └── my-command.md
│   ├── hooks/
│   │   └── validators/
│   │       └── my_validator.py
│   └── logs/
│       └── validation_*.log
```

## Troubleshooting

| Problem | Check |
|---------|-------|
| Hook not firing | Is path absolute? Is YAML valid? |
| No output to agent | Using `print()` not `logging`? |
| Validator not failing | Using `sys.exit(1)` on errors? |
| Python not found | Use `python3` not `python` |

## Key Quote

> "The key difference between real engineering and vibe coding is that engineers know what their agents are doing."
