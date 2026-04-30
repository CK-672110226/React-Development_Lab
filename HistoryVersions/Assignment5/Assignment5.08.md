# Assignment5.08 History

Date: 30 April 2026 (30 เมษายน 2569)

## Overview

Extended export controls with a one-click current-month action and a month-range export flow for multi-month reports.

## Reason

Users wanted both faster month selection and more flexible historical reporting in one CSV file.

## Changes

1. Updated src/components/ExpenseList.jsx
   - Added `This Month` quick button to auto-select the current month in export scope.
   - Added range export controls with `From` and `To` month selectors.
   - Added range-based CSV export button (`Export Range CSV`).
   - Added validation for invalid ranges (start month after end month).
   - Disabled export actions when selected scope has no rows.

2. Updated src/App.css
   - Added styles for:
     - quick month button (`.month-quick-btn`)
     - range control row (`.range-actions`)
     - range selectors (`.range-select`)
     - range validation note (`.range-note`)

## Validation

- Ran npm run lint successfully.
- Ran npm run build successfully.

## Notes

- Range export currently exports from the full expense dataset (not only filtered tab rows).
- `This Month` is disabled when no expense exists in the current month.
