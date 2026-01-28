#!/usr/bin/env python3
"""
CSV Validator for Claude Code Hooks
Exercise 2 - Complete Solution

This validator:
1. Accepts file path as command line argument
2. Only validates .csv files
3. Checks column count consistency across all rows
4. Checks for empty required fields (first column)
5. Returns detailed, actionable error messages
6. Logs all validation attempts
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

    # Step 1: Only validate CSV files
    if path.suffix.lower() != '.csv':
        return  # Not a CSV file, skip silently

    # Step 2: Check if file exists
    if not path.exists():
        print(f"ERROR: File does not exist: {file_path}")
        sys.exit(1)

    errors = []

    # Step 3: Set up logging
    log_dir = Path.cwd() / ".claude" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    log_file = log_dir / f"csv_validation_{datetime.now():%Y%m%d_%H%M%S}.log"

    try:
        # Step 4: Parse and validate CSV
        with open(path, 'r', newline='', encoding='utf-8') as f:
            reader = csv.reader(f)
            rows = list(reader)

        # Check for empty file
        if not rows:
            errors.append("CSV file is empty - add header and data rows")
        else:
            header = rows[0]
            expected_cols = len(header)

            # Check header for empty column names
            empty_headers = [i + 1 for i, col in enumerate(header) if not col.strip()]
            if empty_headers:
                errors.append(
                    f"Header has empty column names at positions: {empty_headers}"
                )

            # Check each data row
            for row_num, row in enumerate(rows[1:], start=2):
                # Column count check
                if len(row) != expected_cols:
                    errors.append(
                        f"Row {row_num}: Expected {expected_cols} columns, found {len(row)}.\n"
                        f"    Row content: {row}\n"
                        f"    Header columns: {header}"
                    )

                # Empty first column check
                if row and not row[0].strip():
                    errors.append(
                        f"Row {row_num}: First column ('{header[0]}') is empty.\n"
                        f"    Row content: {row}"
                    )

        # Step 5: Write log file
        with open(log_file, 'w') as log:
            log.write(f"CSV Validation Log\n")
            log.write(f"{'=' * 50}\n")
            log.write(f"File: {file_path}\n")
            log.write(f"Timestamp: {datetime.now().isoformat()}\n")
            log.write(f"Status: {'FAILED' if errors else 'PASSED'}\n")
            log.write(f"Rows checked: {len(rows) if rows else 0}\n")
            if errors:
                log.write(f"\nErrors ({len(errors)}):\n")
                for i, e in enumerate(errors, 1):
                    log.write(f"\n{i}. {e}\n")
            log.write(f"\n{'=' * 50}\n")

        # Step 6: Output results
        if errors:
            print(f"CSV VALIDATION ERRORS in {file_path}:")
            print()
            for error in errors:
                print(f"  - {error}")
            print()
            print("Fix these specific errors and try again.")
            sys.exit(1)
        else:
            print(f"CSV validation PASSED: {file_path}")

    except csv.Error as e:
        print(f"CSV PARSE ERROR in {file_path}:")
        print(f"  {str(e)}")
        print("  Check for unescaped special characters.")
        sys.exit(1)

    except UnicodeDecodeError as e:
        print(f"ENCODING ERROR in {file_path}:")
        print(f"  File contains invalid characters.")
        print(f"  Ensure the file is saved as UTF-8.")
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: csv_validator.py <file_path>")
        print("  Validates CSV structure and returns errors to Claude Code agent")
        sys.exit(1)

    validate_csv(sys.argv[1])
