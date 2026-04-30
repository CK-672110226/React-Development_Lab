# Assignment3.03 History

Date: 28 April 2026 (28 เมษายน 2569)

## Overview

Added localStorage persistence so the to-do list keeps its tasks after the page is refreshed.

## Reason

The remaining Lab 3 challenge item was persistence. The app already stores all task changes in App state, so localStorage needed to be added at the initial state boundary and task update boundary.

## Changes

1. Updated src/App.jsx
   - Added a localStorage-backed initializer for the tasks state.
   - Added JSON parsing guards so invalid stored data falls back to the default task list.
   - Updated nextId to continue from the highest saved task id.
   - Added an effect that saves the task array to localStorage whenever tasks change.

## Validation

- Ran npm run build.
- Ran npm run lint.

## Notes

- If localStorage contains invalid JSON or a non-array value, the app falls back to the default seeded tasks.
- The task filter remains in component state only and resets to All on page refresh.