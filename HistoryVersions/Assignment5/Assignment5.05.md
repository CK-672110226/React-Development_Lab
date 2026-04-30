# Assignment5.05 History

Date: 30 April 2026 (30 เมษายน 2569)

## Overview

Enhanced Lab 5 with two productivity improvements: export for current filtered view and automatic spending guidance when near/over budget.

## Reason

After adding CSV export and budgeting, users still needed:
- Faster export of only what is currently filtered on screen.
- Clear guidance when spending approaches or exceeds the configured budget.

## Changes

1. Updated src/context/ExpenseContext.jsx
   - Extended `exportExpensesCSV()` to accept:
     - custom expense list input (`expensesToExport`)
     - export scope label (`scope`) for filenames.
   - Export function now supports both full-data and filtered-data exports.
   - Added scoped filename pattern: `expenses-<scope>-YYYY-MM-DD.csv`.

2. Updated src/components/ExpenseList.jsx
   - Replaced single export action with two buttons:
     - `Export All CSV`
     - `Export View CSV` (based on currently filtered tab).
   - Wired both buttons to the updated context export action.
   - Added disabled behavior for each button based on available rows.

3. Updated src/components/ExpenseSummary.jsx
   - Added recommendation message when over budget:
     - shows overspend amount
     - highlights top spending category and its total.
   - Added warning message when usage is near budget limit.

4. Updated src/App.css
   - Updated list action layout for multiple export buttons.
   - Added secondary export button style.
   - Added spacing style for budget recommendation text.

## Validation

- Ran npm run lint successfully.
- Ran npm run build successfully.

## Notes

- `Export View CSV` uses the currently selected filter tab output.
- Over-budget recommendation relies on existing category totals shown in Summary.
