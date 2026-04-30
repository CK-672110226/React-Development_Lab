# Assignment5.04 History

Date: 30 April 2026 (30 เมษายน 2569)

## Overview

Implemented Challenge 4 for Lab 5 by adding monthly budget management and budget usage percentage in the summary panel.

## Reason

Users need to set a spending target and monitor how much of the monthly budget has been used to prevent overspending.

## Changes

1. Updated src/context/ExpenseContext.jsx
   - Added `budget` to centralized reducer state.
   - Added reducer action `SET_BUDGET` and exposed `setBudget(amount)` action.
   - Added localStorage persistence for budget under key `expenseBudget`.
   - Added derived budget values:
     - `budgetUsagePercent`
     - `budgetRemaining`
   - Exposed budget values and setter in `useExpenses()` context value.

2. Updated src/components/ExpenseSummary.jsx
   - Added monthly budget form (`input + Set button`) in summary section.
   - Added budget usage display including:
     - current budget amount
     - used percentage
     - remaining amount
   - Added visual warnings for near-budget and over-budget states.
   - Added usage progress bar with color states (normal/warning/danger).

3. Updated src/App.css
   - Added styles for budget form controls.
   - Added styles for budget status, progress bar, and warning/danger text states.

## Validation

- Ran npm run lint successfully.
- Ran npm run build successfully.

## Notes

- When budget is set to 0, usage percentage is shown as 0% to avoid division-by-zero behavior.
- Over-budget state is triggered when total expenses exceed the configured budget.
