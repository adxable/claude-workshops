#!/usr/bin/env python3
"""
JSON Validator for Claude Code Hooks
Exercise 1 - Complete Solution

This validator:
1. Accepts a file path as command line argument
2. Checks if the file is a JSON file (skips others)
3. Validates JSON syntax
4. Returns actionable error messages with line/column info
5. Logs all validation attempts for debugging
"""

import json
import sys
from pathlib import Path
from datetime import datetime


def validate_json(file_path: str) -> None:
    """
    Validate a JSON file and return errors to the agent.

    Args:
        file_path: Path to the file to validate
    """
    path = Path(file_path)

    # Step 1: Only validate JSON files
    if path.suffix.lower() != '.json':
        return  # Not a JSON file, skip validation silently

    # Step 2: Check if file exists
    if not path.exists():
        print(f"ERROR: File does not exist: {file_path}")
        sys.exit(1)

    # Step 3: Set up logging
    log_dir = Path.cwd() / ".claude" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    log_file = log_dir / f"json_validation_{datetime.now():%Y%m%d_%H%M%S}.log"

    # Step 4: Try to parse JSON
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check for empty file
        if not content.strip():
            with open(log_file, 'w') as log:
                log.write(f"FAILED: {file_path}\n")
                log.write(f"Error: File is empty\n")
                log.write(f"Timestamp: {datetime.now().isoformat()}\n")

            print(f"JSON VALIDATION ERROR in {file_path}:")
            print(f"  File is empty")
            print(f"  Please add valid JSON content.")
            sys.exit(1)

        # Parse JSON
        json.loads(content)

        # Log success
        with open(log_file, 'w') as log:
            log.write(f"PASSED: {file_path}\n")
            log.write(f"Timestamp: {datetime.now().isoformat()}\n")
            log.write(f"File size: {len(content)} bytes\n")

        print(f"JSON validation PASSED: {file_path}")

    except json.JSONDecodeError as e:
        # Log failure with details
        with open(log_file, 'w') as log:
            log.write(f"FAILED: {file_path}\n")
            log.write(f"Error: {e.msg}\n")
            log.write(f"Line: {e.lineno}, Column: {e.colno}\n")
            log.write(f"Position: {e.pos}\n")
            log.write(f"Timestamp: {datetime.now().isoformat()}\n")

        # Return actionable error to agent
        print(f"JSON VALIDATION ERROR in {file_path}:")
        print(f"  Line {e.lineno}, Column {e.colno}: {e.msg}")
        print()

        # Try to show context around the error
        try:
            lines = content.split('\n')
            if 0 < e.lineno <= len(lines):
                print(f"  Problematic line: {lines[e.lineno - 1]}")
                print(f"  {' ' * (e.colno + 16)}^")
        except Exception:
            pass

        print()
        print(f"  Please fix the JSON syntax error and try again.")
        sys.exit(1)

    except UnicodeDecodeError as e:
        with open(log_file, 'w') as log:
            log.write(f"FAILED: {file_path}\n")
            log.write(f"Error: Unicode decode error - {str(e)}\n")
            log.write(f"Timestamp: {datetime.now().isoformat()}\n")

        print(f"JSON VALIDATION ERROR in {file_path}:")
        print(f"  File contains invalid characters (encoding error)")
        print(f"  Ensure the file is saved as UTF-8.")
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: json_validator.py <file_path>")
        print("  Validates JSON syntax and returns errors to Claude Code agent")
        sys.exit(1)

    validate_json(sys.argv[1])
