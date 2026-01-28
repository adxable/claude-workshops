#!/usr/bin/env python3
"""
JSON Validator for Claude Code Hooks
Exercise 1 - Starter Template

TODO: Complete this validator to:
1. Accept a file path as command line argument
2. Check if the file is a JSON file (skip others)
3. Validate JSON syntax
4. Return actionable error messages
5. Log validation attempts
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

    # TODO: Step 1 - Check if file is a JSON file
    # Hint: Check path.suffix.lower()
    # If not a JSON file, just return (skip validation)

    # TODO: Step 2 - Check if file exists
    # Hint: If not path.exists(), print error and sys.exit(1)

    # TODO: Step 3 - Set up logging
    # Create log directory and log file
    # log_dir = Path.cwd() / ".claude" / "logs"
    # log_dir.mkdir(parents=True, exist_ok=True)
    # log_file = log_dir / f"json_validation_{datetime.now():%Y%m%d_%H%M%S}.log"

    # TODO: Step 4 - Try to parse JSON
    # Use try/except with json.loads()
    # On success: print success message, log it
    # On json.JSONDecodeError: print ACTIONABLE error with line/column

    # Hint for error message format:
    # print(f"JSON VALIDATION ERROR in {file_path}:")
    # print(f"  Line {e.lineno}, Column {e.colno}: {e.msg}")
    # print(f"  Please fix the JSON syntax error and try again.")
    # sys.exit(1)

    pass  # Remove this when you implement the function


if __name__ == "__main__":
    # TODO: Check command line arguments
    # Hint: if len(sys.argv) < 2: print usage and exit

    # TODO: Call validate_json with the file path
    # Hint: validate_json(sys.argv[1])

    pass  # Remove this when you implement
