# Assignment4.03 History

Date: 28 April 2026 (28 เมษายน 2569)

## Overview

Improved modal behavior for better UX by adding keyboard close support and background scroll lock while the modal is open.

## Reason

The challenge follow-up requested two interaction fixes:
1) close modal with the Escape key, and 2) prevent background page scrolling while modal is active.

## Changes

1. Updated src/components/CountryModal.jsx
   - Added `useEffect` lifecycle handling when modal mounts/unmounts.
   - Added `keydown` listener to close modal when `Escape` is pressed.
   - Added body scroll lock (`document.body.style.overflow = 'hidden'`) while modal is open.
   - Restored previous body overflow value and removed keydown listener during cleanup.

## Validation

- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.
- Ran `npm run test -- --run` successfully (3 tests passed).

## Notes

- Modal still supports existing close interactions (overlay click and close button).
- Keyboard and scroll behavior are now centralized inside the modal component lifecycle.
