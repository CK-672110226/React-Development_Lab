# Assignment4.02 History

Date: 28 April 2026 (28 เมษายน 2569)

## Overview

Fixed runtime fetch failure (`HTTP Error: 400`) in the Lab 4 countries app.

## Reason

The challenge update switched API usage to a broad `/v3.1/all` request, which can fail depending on API behavior and request expectations. The app should request only fields it actually uses.

## Changes

1. Updated src/App.jsx
   - Replaced API URL with explicit `fields` query to request only required data:
     `cca3,name,capital,population,region,flags,languages,subregion,currencies,timezones`.
   - This keeps response shape predictable for Search, RegionFilter badges, CountryCard, and CountryModal.

## Validation

- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.
- Ran `npm run test -- --run` successfully (3 tests passed).

## Notes

- Error handling behavior in `useFetch` remains unchanged (`Error: HTTP Error: <status>`), but this fix prevents the `400` path for normal app usage.
