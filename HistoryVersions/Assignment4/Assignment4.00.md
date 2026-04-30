# Assignment4.00 History

Date: 28 April 2026 (28 เมษายน 2569)

## Overview

Implemented Lab 4 component architecture for a countries explorer app using 4 components and 1 reusable custom hook.

## Reason

Session 4 focuses on separating UI rendering from reusable data-fetch logic with custom hooks, plus real-time filtering by search text and region.

## Changes

1. Updated src/App.jsx
   - Replaced the Lab 3 to-do integration with Lab 4 countries integration.
   - Added `searchTerm` and `selectedRegion` state.
   - Integrated `useFetch(API)` to fetch countries.
   - Added search + region filtering and alphabetical sorting.
   - Rendered summary count and mapped filtered data to country cards.

2. Updated src/App.css
   - Replaced previous to-do styles with countries page styles.
   - Added styles for header, search bar, region buttons, card grid, and responsive behavior.

3. Added src/hooks/useFetch.js
   - Created reusable fetch hook returning `{ data, loading, error }`.
   - Added HTTP status validation.
   - Added unmount-safe cleanup with cancellation flag in `useEffect`.

4. Added src/components/SearchBar.jsx
   - Created controlled search input component.
   - Used `useRef` to return focus to input after clicking clear.

5. Added src/components/RegionFilter.jsx
   - Created region button group component.
   - Supports `All`, `Africa`, `Americas`, `Asia`, `Europe`, and `Oceania`.

6. Added src/components/CountryCard.jsx
   - Created card rendering country flag, name, capital, population, and languages.
   - Added fallback values for missing capital/languages.

7. Updated .github/copilot-instructions.md
   - Added "References & Further Reading" section requested for Lab 4 rule notes.

## Validation

- Ran `npm run build` successfully.
- Ran `npm run test -- --run` successfully (3 tests passed).

## Notes

- Existing Lab 3 components and tests were kept in the repository to preserve assignment history and prior artifacts.
- Country data source: `https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,languages`.
