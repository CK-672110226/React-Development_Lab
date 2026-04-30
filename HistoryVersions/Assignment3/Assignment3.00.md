# Assignment3.00 History

Date: 28 April 2026 (28 เมษายน 2569)

## Overview

Built the Lab 3 interactive to-do list app with child components, task state management, filtering, delete actions, and clear-completed support.

## Reason

Assignment 3 moves the project from static props-driven rendering to stateful React interactions, so the app needed to be rebuilt around task state in App and child components for task input and task rows.

## Changes

1. Updated src/App.jsx
   - Replaced the previous product gallery with to-do list state management using useState.
   - Added task creation, toggle, delete, filter, and clear-completed handlers.
   - Rendered filter buttons, task summary, empty-state messaging, and the TaskInput/TaskItem child components.

2. Added src/components/TaskInput.jsx
   - Created the controlled input form for adding tasks.
   - Trimmed whitespace before submitting and cleared the field after successful add.

3. Added src/components/TaskItem.jsx
   - Created the reusable task row component with checkbox toggle and delete button callbacks.
   - Applied the completed visual state through the parent CSS classes.

4. Updated src/App.css
   - Replaced the old gallery styles with the Lab 3 to-do layout and component styling.
   - Added styles for the card layout, filters, task rows, completed state, and responsive behavior.

5. Updated src/index.css
   - Set the page background required by the lab and ensured the app fills the viewport cleanly.

## Validation

- Ran npm run build.
- Ran npm run lint.

## Notes

- Existing ProductCard and RatingStars components remain in the repository but are no longer used by App for Lab 3.
- Challenge items such as edit-in-place, select-all, and localStorage persistence were not implemented because they were listed as optional extensions.