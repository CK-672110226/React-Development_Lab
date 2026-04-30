# Assignment4.04 History

Date: 28 April 2026 (28 เมษายน 2569)

## Overview

Converted the provided error-page design into the project style and applied it as a unified error UI for all fetch failures, including grouped error guidance and back-to-home recovery flow.

## Reason

The request was to stop showing plain text errors and use a full error-page design for every error case, with additional error groups and practical fix instructions.

## Changes

1. Added src/components/ErrorPage.jsx
   - Implemented a reusable error screen component based on the supplied design direction.
   - Added error grouping logic for:
     - HTTP 404
     - HTTP 400/401/403/422
     - HTTP 5xx
     - Network/fetch failure
     - Unknown error
   - Added human-readable "fix guidance" list per error group.
   - Added "back to home" button to recover and retry.
   - Added lightweight parallax background motion using requestAnimationFrame and pointer tracking (converted from provided JS concept, without jQuery).

2. Added src/components/ErrorPage.css
   - Converted provided HTML/CSS style into scoped CSS classes for React usage.
   - Preserved key visual structure: dark panel, large error code, subtitle, guidance block, and overlay background image.
   - Added responsive behavior for smaller screens.

3. Updated src/App.jsx
   - Replaced plain text error output with the new ErrorPage component.
   - Added `retryKey` state and back-home handler to reset filters and retry data request.

## Validation

- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.
- Ran `npm run test -- --run` successfully (3 tests passed).

## Notes

- The new error UI now acts as the common entry point for all fetch-related failures in the app.
- Existing feature flows (loading skeleton, search, region filter, sort, favorites, modal) remain intact when no error occurs.
