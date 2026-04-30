# Assignment5.10 History

Date: 30 April 2026 (30 เมษายน 2569)

## Overview

Applied full React Hook optimization: useMemo for derived values, useCallback for action functions, and split ExpenseContext into separate State and Actions contexts to reduce unnecessary re-renders.

## Reason

The app relied on plain variables and inline functions defined inside the render body of ExpenseProvider. Each render recreated all derived values and function references, causing every context consumer to re-render even when unrelated state changed. This update applies the four key hooks (useReducer, useContext, useMemo, useCallback) at the right places without changing any visible behavior.

## Changes

1. Updated src/context/ExpenseContext.jsx
   - Added `useCallback` and `useMemo` to import.
   - Replaced `const ExpenseContext` with two contexts: `ExpenseStateContext` and `ExpenseActionsContext`.
   - Wrapped `totalAmount`, `budgetUsagePercent`, `budgetRemaining`, and `filteredExpenses` in `useMemo` with correct dependency arrays.
   - Converted all action functions (`addExpense`, `updateExpense`, `deleteExpense`, `startEdit`, `cancelEdit`, `setFilter`, `setBudget`) from plain `function` declarations to `useCallback` with `[]` deps (stable since they only use `dispatch`).
   - Converted `exportExpensesCSV` to `useCallback`; removed `state.expenses` as default parameter since all call sites pass explicit data.
   - Wrapped `stateValue` and `actionsValue` context objects in `useMemo` to prevent object identity churn.
   - Updated provider return to nest `<ExpenseActionsContext.Provider>` inside `<ExpenseStateContext.Provider>`.
   - Exported `useExpenseState()` — reads state context only.
   - Exported `useExpenseActions()` — reads actions context only.
   - Kept `useExpenses()` as a backward-compatible combined hook (spreads both contexts).

2. Updated src/components/ExpenseSummary.jsx
   - Added `useMemo` to import.
   - Wrapped `byCategory` O(n) reduce in `useMemo([expenses, categories])`.
   - Wrapped `topCategoryEntry` sort in `useMemo([byCategory])`.

3. Updated src/components/ExpenseList.jsx
   - Added `useMemo` to import.
   - Wrapped `availableMonths` in `useMemo([expenses])`.
   - Wrapped `availableMonthsAscending` in `useMemo([availableMonths])`.
   - Wrapped `exportAllData` in `useMemo([expenses, isAllMonths, selectedExportMonth])`.
   - Wrapped `exportViewData` in `useMemo([filteredExpenses, isAllMonths, selectedExportMonth])`.
   - Removed standalone `isInRange()` function; inlined the condition logic directly into `rangeExportData` useMemo body.
   - Wrapped `rangeExportData` in `useMemo([expenses, isInvalidRange, rangeFrom, rangeTo])`.

## Validation

- Ran `npm run lint` — no errors or warnings.
- Ran `npm run build` — built successfully (202 kB JS, 67 ms).

## Notes

- Existing components that call `useExpenses()` continue to work unchanged (backward-compatible wrapper).
- Components that only need state can switch to `useExpenseState()`; those that only trigger actions can switch to `useExpenseActions()` to further reduce re-render surface area.
- `useCallback([], [])` with empty deps is correct for all dispatch-only actions because `dispatch` from `useReducer` is stable by React guarantee.
