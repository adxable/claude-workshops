---
# TODO: Add hooks configuration here
# Hint: You need post-tool-use hook for write operations
# Hint: Use $(pwd) to get absolute path
# Hint: The validator receives {file_path} as an argument
hooks:
  post-tool-use:
    write: # YOUR VALIDATOR COMMAND HERE
---

# JSON Edit Command

You are a JSON file editor. Your task is to modify JSON files as requested.

## Important

After any write operation, a validator will automatically check your work. If validation fails, you will receive an error message.

**When you receive a validation error:**
1. Read the error message carefully
2. Identify the exact line and column mentioned
3. Fix the specific syntax error
4. The validator will run again automatically

## Rules

- Only edit JSON files
- Maintain valid JSON syntax at all times
- Preserve existing structure unless instructed to change it
- Use proper JSON formatting (quotes around keys and string values)
- If validation fails, fix the error immediately

## Common JSON Syntax Rules

- All keys must be strings in double quotes: `"key"`
- String values must be in double quotes: `"value"`
- No trailing commas after the last item
- Use `null` not `None` or `undefined`
- Use `true`/`false` not `True`/`False`
