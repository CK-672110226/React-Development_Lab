# Assignment4.01 History

Date: 28 April 2026 (28 เมษายน 2569)

## Overview

Implemented Lab 4 Step Challenge features on top of Assignment4.00: loading skeleton UI, sort dropdown, region country count badges, favorite toggles, and country detail modal.

## Reason

The challenge section requires extending the base countries explorer with richer UX and interactive state management beyond basic search and region filtering.

## Changes

1. Updated src/App.jsx
   - Added challenge states: `sortBy`, `favorites`, and `selectedCountry`.
   - Switched API request to `https://restcountries.com/v3.1/all` to support full detail modal data.
   - Added search-scoped `regionCounts` and passed counts to region buttons.
   - Added sorting dropdown for Name (A-Z) and Population (High to Low).
   - Added favorite toggle logic using country code (`cca3`).
   - Added loading skeleton rendering while data is being fetched.
   - Added country detail modal rendering when selecting a country card.

2. Updated src/components/RegionFilter.jsx
   - Added `regionCounts` prop.
   - Added count badge for each region button.

3. Updated src/components/CountryCard.jsx
   - Added favorite action button and visual state.
   - Added detail action button to open modal.
   - Added props for favorite and detail callbacks.

4. Added src/components/CountryModal.jsx
   - Added modal that displays expanded country information:
     official name, region, subregion, capital, population, languages,
     currencies, and timezones.
   - Added overlay click-to-close behavior.

5. Updated src/App.css
   - Added styles for region badges, sort controls, favorite button, detail button, modal, and skeleton shimmer.
   - Added responsive layout updates for the toolbar and controls.

## Validation

- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.
- Ran `npm run test -- --run` successfully (3 tests passed).

## Notes

- Existing TaskInput tests still pass; no new tests were added yet for the new countries challenge flows.
- Current sorting options follow challenge scope: name and population only.
