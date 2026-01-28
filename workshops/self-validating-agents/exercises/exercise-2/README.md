# Exercise 2: Self-Correcting CSV Agent

**Duration:** 25 minutes
**Difficulty:** Intermediate

## Goal

Build a CSV validator that provides detailed, actionable error messages enabling Claude to automatically fix data issues without human intervention.

## What You Will Build

1. A custom command (`csv-edit.md`) specialized for CSV operations
2. A robust CSV validator (`csv_validator.py`) with detailed error reporting
3. A logging system for observability

## The Auto-Fix Loop

This exercise demonstrates the core pattern:

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
Error message returned to agent
       |
       v
Agent fixes based on error details
       |
       v
Validator runs again...
```

## Directory Structure

```
your-project/
├── .claude/
│   ├── commands/
│   │   └── csv-edit.md           # Your custom command
│   ├── hooks/
│   │   └── validators/
│   │       └── csv_validator.py  # Your validator
│   └── logs/                     # Validation logs
└── transactions.csv              # Test file with errors
```

## Instructions

### Step 1: Create the Custom Command

Create `.claude/commands/csv-edit.md`

**Requirements:**
- Hook fires on `post-tool-use` for `write` operations
- Instruct agent to fix errors when validation fails
- Include CSV formatting rules

**Starter template:** `starter/csv-edit.md`

### Step 2: Create the CSV Validator

Create `.claude/hooks/validators/csv_validator.py`

**Requirements:**
- Accept file path as command line argument
- Only validate `.csv` files
- Check for:
  - Consistent column count across all rows
  - No empty values in required columns (first column)
  - Valid CSV parsing
- Return errors with:
  - Specific row numbers
  - Expected vs actual values
  - The problematic row content
- Log all validation attempts

**Starter template:** `starter/csv_validator.py`

### Step 3: Test with Broken Data

The test file `transactions.csv` has intentional errors:

```csv
date,vendor,description,amount,category
2024-01-15,ACME Corp,Invoice,1500,Services
2024-01-16,Tech Inc,Software License,2500
2024-01-17,Office Depot,Supplies,150,Office
,Amazon,Books,45,Education
```

**Errors present:**
1. Row 3 is missing the "category" column (only 4 values)
2. Row 5 has an empty "date" column

### Step 4: Run and Observe

```bash
claude /csv-edit "Review transactions.csv and fix any data issues"
```

Watch the auto-fix loop:
1. Claude reads the file
2. Claude makes changes
3. Validator catches remaining errors
4. Claude receives specific error messages
5. Claude fixes exactly what is wrong
6. Validator passes

## Success Criteria

- [ ] Validator detects both errors in test file
- [ ] Error messages include row numbers
- [ ] Error messages show expected vs actual column count
- [ ] Error messages include row content for context
- [ ] Agent successfully auto-corrects based on feedback
- [ ] Log files created for each validation run

## Writing Good Error Messages

**The Golden Rule:** Error messages must be ACTIONABLE

### Bad Example
```
Validation failed
```

### Good Example
```
CSV VALIDATION ERRORS in transactions.csv:

  - Row 3: Expected 5 columns, found 4.
    Row content: ['2024-01-16', 'Tech Inc', 'Software License', '2500']
    Missing value for column: 'category'

  - Row 5: First column ('date') is empty.
    Row content: ['', 'Amazon', 'Books', '45', 'Education']

Fix these specific errors and try again.
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Hook not firing | Check absolute path; verify YAML syntax |
| csv.Error on parse | Check for unescaped special characters |
| Agent not fixing | Ensure error messages are specific enough |
| Encoding issues | Specify `encoding='utf-8'` when opening files |

## Challenge Mode

Enhance your validator with schema validation:

1. **Required columns:** Ensure `date`, `vendor`, `amount` exist in header
2. **Numeric validation:** `amount` column must contain valid numbers
3. **Date format:** `date` column should match YYYY-MM-DD format

See `solution/csv_validator_advanced.py` for implementation hints.

## Solution

See `solution/` directory for complete working implementations:
- `csv-edit.md` - Complete custom command
- `csv_validator.py` - Basic validator
- `csv_validator_advanced.py` - With schema validation
