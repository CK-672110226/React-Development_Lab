# Assignment5.02 History

Date: 30 April 2026 (30 เมษายน 2569)

## Overview

Implemented Challenge 2 for Lab 5 by adding an Edit flow to update existing expense items.

## Reason

Users need to correct or adjust expense details after creation without deleting and recreating records.

## Changes

1. Updated src/context/ExpenseContext.jsx
   - Added centralized edit state: `editingExpense`.
   - Added reducer actions for edit lifecycle: `START_EDIT`, `CANCEL_EDIT`, and `UPDATE`.
   - Added context actions: `startEdit(expense)`, `cancelEdit()`, and `updateExpense(...)`.
   - Extended expense payload to include `dateISO` for stable date-input roundtrip in edit mode.

2. Updated src/components/AddExpenseForm.jsx
   - Converted form to support both Add and Edit modes.
   - Prefills fields when editing an expense and switches button labels accordingly.
   - Added `Cancel Edit` action to exit edit mode safely.
   - Refactored form rendering to avoid setState-in-effect lint issues by remounting inner form state with a key.

3. Updated src/components/ExpenseList.jsx
   - Added `Edit` button per expense row.
   - Wired row edit action to `startEdit(expense)` from Context.

4. Updated src/App.css
   - Added styles for the new `Edit` and `Cancel Edit` buttons.

## Validation

- Ran npm run lint successfully.
- Ran npm run build successfully.

## Notes

- Edit updates keep the same expense `id`, so list identity remains stable.
- Sorting behavior remains latest-first using context-level ordering logic.
