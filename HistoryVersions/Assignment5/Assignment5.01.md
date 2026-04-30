# Assignment5.01 History

Date: 30 April 2026 (30 เมษายน 2569)

## Overview

Implemented Challenge 1 for Lab 5 by adding a date picker to expense entry and sorting expenses by latest date first.

## Reason

The challenge requires users to choose an expense date explicitly and see recent expenses first for better tracking and review.

## Changes

1. Updated src/context/ExpenseContext.jsx
   - Extended `addExpense` to accept a `dateValue` parameter from the form.
   - Saved `date` and `createdAt` in each expense payload.
   - Added latest-first sorting in `filteredExpenses` so list ordering is centralized in Context.
   - Added safe timestamp fallback for older/localStorage items without `createdAt`.

2. Updated src/components/AddExpenseForm.jsx
   - Added a new controlled `date` state with default value set to today.
   - Added `<input type="date">` to the form.
   - Added validation for missing date input.
   - Sent selected date to `addExpense(...)` when submitting.

3. Updated src/components/ExpenseList.jsx
   - Added date display under each expense name to make selected dates visible in list rows.

4. Updated src/App.css
   - Added styles for expense metadata block and date text in expense list items.

## Validation

- Ran npm run lint successfully.
- Ran npm run build successfully.

## Notes

- Existing expenses created before this update can still be sorted using fallback timestamp logic.
- Primary sort is by selected expense date descending; if dates are equal, newer insertion order is shown first.
