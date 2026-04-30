# Assignment5.07 History

Date: 30 April 2026 (30 เมษายน 2569)

## Overview

Upgraded export controls from a current-month toggle to a month/year selector for flexible historical CSV reporting.

## Reason

A fixed "current month only" switch was useful but limited. Users needed explicit month/year selection to export past periods directly.

## Changes

1. Updated src/components/ExpenseList.jsx
   - Replaced the current-month checkbox with an `Export month` dropdown.
   - Added dynamic month/year options based on available expense data.
   - Added month key extraction logic (`YYYY-MM`) using `dateISO` first, with `createdAt` fallback.
   - Added formatted month labels (e.g., "April 2026") in the selector.
   - Updated `Export All CSV` and `Export View CSV` to export by selected month scope.
   - Preserved `All months` as default export scope.

2. Updated src/App.css
   - Added styles for the new month/year export dropdown (`.export-month-select`).
   - Kept action row responsive and aligned with selector + buttons.

## Validation

- Ran npm run lint successfully.
- Ran npm run build successfully.

## Notes

- Export scope now supports full dataset or any month that exists in expense records.
- If a selected month has no rows in the current tab scope, export buttons are disabled.
