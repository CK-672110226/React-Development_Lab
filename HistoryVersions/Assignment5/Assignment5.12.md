# Assignment5.12 History

Date: 30 April 2026 (30 เมษายน 2569)

## Overview

Hardened export range validation to explicitly support both `All months` and `This Month` options while keeping the `start month <= end month` guard.

## Reason

Range validation previously compared raw select values directly. This worked for plain `YYYY-MM` values but was brittle once semantic options like `This Month` and `All months` were involved.

## Changes

1. Updated src/components/ExpenseList.jsx
   - Added `resolveMonthValue(value, currentMonthKey)` helper.
   - `All months` now resolves to `null` (unbounded side of range).
   - `This Month` now uses explicit option value `THIS_MONTH` and resolves to current `YYYY-MM`.
   - Updated month option list to always include:
     - `All months`
     - `This Month (...)`
     - remaining concrete months from data
   - Main export range validation now compares normalized keys (`fromKey`, `toKey`) instead of raw select values.
   - Main export range filtering now uses normalized keys.
   - Main export CSV scope string now uses normalized keys.
   - Modal export range validation/filtering/scope updated with the same normalized logic (`modalFromKey`, `modalToKey`).

## Validation

- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.

## Notes

- Invalid-range message (`Start month must be before end month.`) now appears only when both normalized bounds are concrete months and `from > to`.
- Selecting `All months` on either side no longer triggers false invalid-range cases.
