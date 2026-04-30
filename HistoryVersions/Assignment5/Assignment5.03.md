# Assignment5.03 History

Date: 30 April 2026 (30 เมษายน 2569)

## Overview

Implemented Challenge 3 for Lab 5 by adding CSV export functionality for expense records.

## Reason

Users need a simple way to take expense data out of the app for sharing, backup, or further analysis in spreadsheet tools.

## Changes

1. Updated src/context/ExpenseContext.jsx
   - Added CSV escaping helper to safely handle commas, quotes, and text values.
   - Added `exportExpensesCSV()` action in Context to generate and download a CSV file.
   - Export includes headers: id, name, amount, category, date, dateISO.
   - Added exported action to provider value so components can call it directly via `useExpenses()`.

2. Updated src/components/ExpenseList.jsx
   - Added `Export CSV` button at the top of the expense list section.
   - Wired button to `exportExpensesCSV()` from Context.
   - Added disabled state when there are no expenses.

3. Updated src/App.css
   - Added styles for export action row and export button.
   - Added disabled visual state for export button.

## Validation

- Ran npm run lint successfully.
- Ran npm run build successfully.

## Notes

- Export currently includes all expenses in state, not only the currently filtered tab.
- Downloaded filename format: expenses-YYYY-MM-DD.csv.
