# Assignment5.11 History

Date: 30 April 2026 (30 เมษายน 2569)

## Overview

Three UX improvements: merged export range controls into a single From/To row with "This Month" as an inline option, converted "Export View CSV" button into a full popup report modal with bar chart and detailed table, and added a sub-label input for the "Other" expense category.

## Reason

- The two separate export control areas (Export month selector + From/To range row) were redundant. Merging them reduces visual noise.
- Export View CSV was downloading a file without user review. A popup gives better visibility: see the chart and rows before deciding to download.
- "Other" category gave no context; users needed a way to describe what the expense actually was.

## Changes

1. Updated src/components/ExpenseList.jsx
   - Removed `selectedExportMonth` state and all related derived values (`exportAllData`, `exportViewData`, `isAllMonths`, `exportScopeSuffix`).
   - Removed inline `getExpenseMonthKey` and `formatMonthLabel` functions — extracted to module scope as `getMonthKey` and `formatMonthLabel`.
   - Removed `availableMonthsAscending` (no longer needed).
   - Added `MonthOptions` helper component that renders `All months` → `This Month (...)` → past months for any dropdown.
   - Merged controls into a single `.range-actions` row: `From` select + `To` select + `Export All CSV` + `Export View CSV`.
   - `Export All CSV` now uses From/To range directly (same behavior as previous "Export Range CSV").
   - `Export View CSV` opens a popup (`showExportModal` state) instead of downloading.
   - Added `ExportModal` component:
     - Shows title with current filter tab name.
     - Has its own `From`, `To`, and `Category` controls.
     - `BarChart` component: horizontal bar chart grouped by category with color-coded fill.
     - Expense table: Name, Category (with dot), Date, Amount columns; total row in `<tfoot>`.
     - "Download CSV" button at the bottom to export the modal-scoped data.
     - Closes on overlay click or ✕ button.
   - Added `subCategory` display in each expense row (`— label` after name if present).

2. Updated src/context/ExpenseContext.jsx
   - Added `subCategory = ''` parameter to `addExpense` useCallback.
   - Added `subCategory = ''` parameter to `updateExpense` useCallback.
   - Both store `subCategory: subCategory.trim()` in the expense payload.

3. Updated src/components/AddExpenseForm.jsx
   - Added `otherLabel` state initialized from `editingExpense?.subCategory || ''`.
   - When `category === 'Other'`, renders an extra `<input>` for custom label.
   - Passes `otherLabel` to `addExpense` and `updateExpense` calls.
   - Resets `otherLabel` on submit and on cancel.

4. Updated src/App.css
   - Removed: `.list-actions`, `.month-switch`, `.export-month-select`, `.month-quick-btn`, `.month-quick-btn:disabled`.
   - Added `.expense-sub-category` style for Other label display.
   - Added modal styles: `.modal-overlay`, `.export-modal`, `.export-modal-header`, `.modal-close-btn`, `.export-modal-controls`, `.export-modal-list`, `.export-modal-footer`.
   - Added chart styles: `.bar-chart`, `.bar-row`, `.bar-label`, `.bar-track`, `.bar-fill`, `.bar-amount`.
   - Added table styles: `.export-table`, `.export-table th/td/tfoot`, `.sub-category`.

## Validation

- Ran `npm run lint` — no errors.
- Ran `npm run build` — success (205 kB JS, 60 ms).

## Notes

- `Export All CSV` downloads the entire From/To range without a preview.
- The popup chart and table dynamically filter by modal-level From/To/Category controls (independent from the main tab filter, but starts from the current tab's data as base).
- `subCategory` is stored per expense; existing expenses without it simply render without the extra label.
