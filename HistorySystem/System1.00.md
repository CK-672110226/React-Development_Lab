# System1.00 History

Date: 30 April 2026 (30 เมษายน 2569)

## Overview

Updated project-level AI workflow rules for stricter history review and reorganized assignment history files into per-assignment folders.

## Reason

Previous history guidance allowed reading only recent versions first and `HistoryVersions` files were mixed in one folder, which increased the risk of missing earlier context and made maintenance harder.

## Changes

1. Updated .github/copilot-instructions.md
   - Enforced full history review from `.00` to latest version for the current assignment before planning.
   - Added explicit example: Assignment 5 must be read from `Assignment5.00` through `Assignment5.09` when `5.09` is latest.
   - Added `System History Rule` to store non-assignment workflow/tool/rule updates in `HistorySystem/`.
   - Updated naming and practical conventions to use assignment subfolders:
     - `HistoryVersions/AssignmentX/AssignmentX.YY.md`
   - Added system-level versioning guidance for `HistorySystem/` files.

2. Reorganized HistoryVersions structure
   - Created assignment folders:
     - `HistoryVersions/Assignment1/`
     - `HistoryVersions/Assignment2/`
     - `HistoryVersions/Assignment3/`
     - `HistoryVersions/Assignment4/`
     - `HistoryVersions/Assignment5/`
   - Moved existing history files into matching assignment folders without renaming version numbers.

3. Added HistorySystem/System1.00.md
   - Recorded this workflow/rule and structure update as system-level history.

## Validation

- Verified `HistoryVersions` now contains only assignment-specific subfolders with expected files.
- Verified `.github/copilot-instructions.md` includes:
  - strict `.00` to latest history-reading rule,
  - `HistorySystem` storage policy,
  - updated path conventions.

## Notes

- This system update does not change application runtime behavior.
- Future non-assignment AI process updates should continue in `HistorySystem/` with incremental version naming.
