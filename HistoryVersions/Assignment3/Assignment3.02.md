# Assignment3.02 History

Date: 28 April 2026 (28 เมษายน 2569)

## Overview

Added inline task renaming so each to-do item can switch into edit mode, update its text, and save the change without leaving the list.

## Reason

The Lab 3 challenge asked for an Edit control on each task. Since App already owns the task data, the correct implementation is a local edit UI in each task row paired with a parent rename callback.

## Changes

1. Updated src/App.jsx
   - Added a task rename handler that updates a task's text by id.
   - Passed the rename callback into TaskItem so each row can save edits back to App state.

2. Updated src/components/TaskItem.jsx
   - Added local edit mode state and draft text state for each task row.
   - Replaced the task label with an input field and Save/Cancel controls while editing.
   - Kept whitespace trimming so empty task names are not saved.

3. Updated src/App.css
   - Added styles for the inline edit form, edit buttons, and mobile layout behavior.

## Validation

- Ran npm run build.
- Ran npm run lint.

## Notes

- Editing keeps task completion status unchanged.
- Optional localStorage persistence is still not implemented.