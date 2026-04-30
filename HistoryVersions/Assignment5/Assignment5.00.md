# Assignment5.00 History

Date: 30 April 2026 (30 เมษายน 2569)

## Overview

Built Lab 5 Personal Expense Tracker App using React Context + useReducer architecture with localStorage persistence.

## Reason

Lab 5 requires centralized expense state management through Context so that Add, Summary, and List components can consume shared data and actions directly without prop drilling.

## Changes

1. Updated src/App.jsx
   - Replaced Countries Explorer composition with Expense Tracker composition.
   - Wrapped the app with ExpenseProvider.
   - Connected ExpenseSummary, AddExpenseForm, and ExpenseList components in a two-column layout.

2. Updated src/App.css
   - Replaced previous country-app styles with expense-tracker styles.
   - Added styles for summary cards, add form, filter tabs, expense rows, delete button, and mobile responsive layout.

3. Added src/context/ExpenseContext.jsx
   - Implemented ExpenseContext with useReducer actions: ADD, LOAD, DELETE, FILTER.
   - Added localStorage load/save with useEffect.
   - Added derived values: totalAmount and filteredExpenses.
   - Exposed shared API via useExpenses(): expenses, filteredExpenses, totalAmount, filter, categories, addExpense, deleteExpense, setFilter.

4. Added src/components/ExpenseSummary.jsx
   - Read expenses and totals from useExpenses().
   - Calculated and rendered per-category totals and total transaction count.

5. Added src/components/AddExpenseForm.jsx
   - Implemented controlled form for name, amount, and category.
   - Added validation error handling for empty/invalid inputs.
   - Called addExpense() from context on submit.

6. Added src/components/ExpenseList.jsx
   - Implemented category filter tabs using context filter/setFilter.
   - Rendered filtered expenses directly from context.
   - Added item delete action via deleteExpense().

## Validation

- Ran npm run lint successfully.
- Ran npm run build successfully.

## Notes

- Existing unrelated country feature files remain in the repository but are no longer mounted by App for this lab.
- Expense data persists by key "expenses" in localStorage and survives page refresh.
