#!/usr/bin/env python3
"""
CSV Validator for Claude Code Hooks
Exercise 2 - Starter Template

TODO: Complete this validator to:
1. Accept file path as command line argument
2. Only validate .csv files
3. Check column count consistency
4. Check for empty required fields
5. Return detailed, actionable error messages
6. Log validation attempts
"""

import sys
import csv
from pathlib import Path
from datetime import datetime


def validate_csv(file_path: str) -> None:
    """
    Validate CSV structure with detailed error messages.

    Args:
        file_path: Path to the CSV file to validate
    """
    path = Path(file_path)

    # TODO: Step 1 - Only validate CSV files
    # Hint: if path.suffix.lower() != '.csv': return

    # TODO: Step 2 - Check if file exists
    # Hint: Print error and sys.exit(1) if not

    errors = []  # Collect all errors here

    # TODO: Step 3 - Set up logging
    # log_dir = Path.cwd() / ".claude" / "logs"
    # log_dir.mkdir(parents=True, exist_ok=True)
    # log_file = log_dir / f"csv_validation_{datetime.now():%Y%m%d_%H%M%S}.log"

    # TODO: Step 4 - Parse CSV and validate
    # Use try/except with csv.reader
    #
    # with open(path, 'r', newline='', encoding='utf-8') as f:
    #     reader = csv.reader(f)
    #     rows = list(reader)
    #
    # Checks to implement:
    # a) File not empty
    # b) Get header row and expected column count
    # c) For each data row (rows[1:]):
    #    - Check column count matches header
    #    - Check first column is not empty
    #    - Append detailed errors to errors list

    # TODO: Step 5 - Write log file
    # Include: file path, timestamp, status, errors if any

    # TODO: Step 6 - Output results
    # If errors:
    #   print("CSV VALIDATION ERRORS in {file_path}:")
    #   for error in errors:
    #       print(f"  - {error}")
    #   print("\nFix these specific errors and try again.")
    #   sys.exit(1)
    # Else:
    #   print(f"CSV validation PASSED: {file_path}")

    pass  # Remove when implemented


if __name__ == "__main__":
    # TODO: Check arguments and call validate_csv
    pass
