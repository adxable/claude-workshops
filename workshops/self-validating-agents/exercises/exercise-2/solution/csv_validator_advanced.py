#!/usr/bin/env python3
"""
CSV Validator for Claude Code Hooks
Exercise 2 - Advanced Solution with Schema Validation

This advanced validator adds:
1. Required column checking
2. Numeric field validation
3. Date format validation
4. Custom schema support
"""

import sys
import csv
import re
from pathlib import Path
from datetime import datetime
from typing import Optional


# Schema definition - customize for your use case
SCHEMA = {
    'required_columns': ['date', 'vendor', 'amount'],
    'numeric_columns': ['amount'],
    'date_columns': ['date'],
    'date_format': r'\d{4}-\d{2}-\d{2}',  # YYYY-MM-DD
}


def validate_csv(file_path: str, schema: Optional[dict] = None) -> None:
    """
    Validate CSV structure and data with schema support.

    Args:
        file_path: Path to the CSV file to validate
        schema: Optional schema dictionary for advanced validation
    """
    path = Path(file_path)
    schema = schema or SCHEMA

    # Only validate CSV files
    if path.suffix.lower() != '.csv':
        return

    if not path.exists():
        print(f"ERROR: File does not exist: {file_path}")
        sys.exit(1)

    errors = []
    warnings = []

    # Set up logging
    log_dir = Path.cwd() / ".claude" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    log_file = log_dir / f"csv_validation_{datetime.now():%Y%m%d_%H%M%S}.log"

    try:
        with open(path, 'r', newline='', encoding='utf-8') as f:
            reader = csv.reader(f)
            rows = list(reader)

        if not rows:
            errors.append("CSV file is empty - add header and data rows")
        else:
            header = rows[0]
            header_lower = [col.lower().strip() for col in header]
            expected_cols = len(header)

            # Build column index map
            col_index = {col.lower().strip(): i for i, col in enumerate(header)}

            # === SCHEMA VALIDATION: Required columns ===
            required = set(schema.get('required_columns', []))
            missing = required - set(header_lower)
            if missing:
                errors.append(
                    f"Missing required columns: {sorted(missing)}\n"
                    f"    Found columns: {header}"
                )

            # === STRUCTURE VALIDATION ===
            for row_num, row in enumerate(rows[1:], start=2):
                # Column count
                if len(row) != expected_cols:
                    errors.append(
                        f"Row {row_num}: Expected {expected_cols} columns, found {len(row)}.\n"
                        f"    Row content: {row}"
                    )
                    continue  # Skip further checks for malformed rows

                # Empty first column
                if not row[0].strip():
                    errors.append(
                        f"Row {row_num}: First column ('{header[0]}') is empty.\n"
                        f"    Row content: {row}"
                    )

                # === SCHEMA VALIDATION: Numeric columns ===
                for num_col in schema.get('numeric_columns', []):
                    if num_col.lower() in col_index:
                        idx = col_index[num_col.lower()]
                        if idx < len(row):
                            value = row[idx].strip().replace(',', '')
                            if value:  # Skip empty values (separate check)
                                try:
                                    float(value)
                                except ValueError:
                                    errors.append(
                                        f"Row {row_num}: Column '{num_col}' must be numeric.\n"
                                        f"    Found: '{row[idx]}'\n"
                                        f"    Row content: {row}"
                                    )

                # === SCHEMA VALIDATION: Date columns ===
                date_pattern = schema.get('date_format', r'\d{4}-\d{2}-\d{2}')
                for date_col in schema.get('date_columns', []):
                    if date_col.lower() in col_index:
                        idx = col_index[date_col.lower()]
                        if idx < len(row):
                            value = row[idx].strip()
                            if value and not re.match(date_pattern, value):
                                errors.append(
                                    f"Row {row_num}: Column '{date_col}' has invalid date format.\n"
                                    f"    Expected format: YYYY-MM-DD\n"
                                    f"    Found: '{value}'\n"
                                    f"    Row content: {row}"
                                )

        # Write comprehensive log
        with open(log_file, 'w') as log:
            log.write(f"CSV Validation Log (Advanced)\n")
            log.write(f"{'=' * 60}\n")
            log.write(f"File: {file_path}\n")
            log.write(f"Timestamp: {datetime.now().isoformat()}\n")
            log.write(f"Status: {'FAILED' if errors else 'PASSED'}\n")
            log.write(f"Rows checked: {len(rows) if rows else 0}\n")
            log.write(f"\nSchema used:\n")
            for key, value in schema.items():
                log.write(f"  {key}: {value}\n")
            if errors:
                log.write(f"\nErrors ({len(errors)}):\n")
                for i, e in enumerate(errors, 1):
                    log.write(f"\n{i}. {e}\n")
            if warnings:
                log.write(f"\nWarnings ({len(warnings)}):\n")
                for w in warnings:
                    log.write(f"  - {w}\n")
            log.write(f"\n{'=' * 60}\n")

        # Output results
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
            if warnings:
                print(f"  Warnings: {len(warnings)} (see log for details)")

    except csv.Error as e:
        print(f"CSV PARSE ERROR in {file_path}: {str(e)}")
        sys.exit(1)
    except UnicodeDecodeError:
        print(f"ENCODING ERROR in {file_path}: Ensure UTF-8 encoding")
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: csv_validator_advanced.py <file_path>")
        print()
        print("Schema validation includes:")
        print(f"  Required columns: {SCHEMA['required_columns']}")
        print(f"  Numeric columns: {SCHEMA['numeric_columns']}")
        print(f"  Date columns: {SCHEMA['date_columns']}")
        sys.exit(1)

    validate_csv(sys.argv[1])
