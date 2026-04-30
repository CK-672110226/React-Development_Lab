# Assignment5.06 History

Date: 30 April 2026 (30 เมษายน 2569)

## Overview

Added a current-month export switch so CSV export can be limited to this month for both all data and filtered view exports.

## Reason

Users requested quicker monthly reporting without manually filtering rows outside the current month before exporting.

## Changes

1. Updated src/components/ExpenseList.jsx
   - Added `Current month only` checkbox switch in export actions.
   - Added month filter helper to detect whether each expense belongs to the current month.
   - Applied switch to both export actions:
     - `Export All CSV`
     - `Export View CSV`
   - Updated export scope labels when current-month mode is enabled.
   - Disabled export buttons when the selected export scope has no rows.

2. Updated src/App.css
   - Added styles for the export month switch control.
   - Improved list action alignment for switch + buttons in one row.

## Validation

- Ran npm run lint successfully.
- Ran npm run build successfully.

## Notes

- Current-month detection prioritizes `dateISO`, with fallback to `createdAt` for compatibility.
- The switch affects only CSV export output and does not change on-screen expense filtering tabs.
