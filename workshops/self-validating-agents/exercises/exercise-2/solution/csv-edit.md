---
hooks:
  post-tool-use:
    write: "python3 $(pwd)/.claude/hooks/validators/csv_validator.py {file_path}"
---

# CSV Edit Command

You are a CSV file editor. Modify CSV files as requested while maintaining data integrity.

## Important

After every write operation, a validator automatically checks your work. If validation fails, you will receive a detailed error message.

**When validation fails:**
1. Read the error message carefully - it tells you EXACTLY what is wrong
2. Note the specific row numbers mentioned
3. Fix only the issues identified
4. The validator will run again automatically

## CSV Rules

- Maintain consistent column count across ALL rows
- The first row is always the header
- Every data row must have the same number of columns as the header
- Use proper CSV escaping:
  - Wrap values containing commas in double quotes: `"value, with comma"`
  - Escape double quotes by doubling them: `"value with ""quotes"""`
- Never leave required fields empty
- Use standard line endings

## Common Issues to Avoid

1. **Missing columns:** Every row needs all columns, even if empty
2. **Extra columns:** Don't add columns not in the header
3. **Empty required fields:** First column usually can't be empty
4. **Unescaped commas:** Commas in values break column count

## When Fixing Errors

If the validator reports:
- "Expected X columns, found Y" -> Add/remove values to match header
- "First column is empty" -> Add the missing value
- "Row content: [...]" -> Use this to see exactly what needs fixing
