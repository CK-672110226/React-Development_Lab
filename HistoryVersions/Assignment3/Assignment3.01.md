# Assignment3.01 History

Date: 28 April 2026 (28 เมษายน 2569)

## Overview

Added the optional select-all control to the Lab 3 to-do list so every task can be marked complete or incomplete in one action.

## Reason

The challenge extension asked for a bulk-complete control, and the current app already centralizes task state in App, which makes a single bulk toggle the correct place to implement it.

## Changes

1. Updated src/App.jsx
   - Added derived state to detect when tasks exist and when all tasks are completed.
   - Added a select-all checkbox control below the task input.
   - Added a bulk toggle handler that marks every task complete or incomplete in one update.

2. Updated src/App.css
   - Added styles for the select-all control so it matches the existing to-do interface.
   - Added a disabled visual state for the label when no tasks exist.

## Validation

- Ran npm run build.
- Ran npm run lint.

## Notes

- The select-all control is disabled when the task list is empty.
- Optional challenge items for edit-in-place and localStorage persistence are still not implemented.