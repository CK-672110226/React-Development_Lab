# Assignment4.05 History

Date: 28 April 2026 (28 เมษายน 2569)

## Overview

Fixed a white-screen edge case when developers temporarily change API endpoints and the response shape is not an array.

## Reason

A blank page can occur if the request succeeds with an unexpected payload shape (object/string) and UI logic tries to call array methods directly.

## Changes

1. Updated src/App.jsx
   - Restored API URL to the valid countries endpoint with required fields.
   - Added runtime response-shape guard:
     - `countryList = Array.isArray(countries) ? countries : []`
     - If non-null response is not an array, show the shared ErrorPage with guidance.
   - Updated country count rendering to use safe `countryList.length`.

## Validation

- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.
- Ran `npm run test -- --run` successfully (3 tests passed).

## Notes

- ErrorPage still handles HTTP/network failures.
- This update adds protection for malformed but successful responses to avoid runtime crashes.
