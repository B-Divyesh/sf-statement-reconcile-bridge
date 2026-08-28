# Review 6 handoff

## Result

**FAIL.** `.factory/review-6.md` records two blocking demo findings and five
minor copy findings. No product code was changed.

The blocking issues are:

1. Browser Back leaves changed `demo:` state behind, and Forward restores the
   accepted sample row despite the “nothing is saved” / “removed on exit” claim.
2. At 390×844, the first realistic match begins at y=1091.44, so the first
   screen after entering the demo does not show sample transaction data.

## Verification performed

- Fresh mobile and desktop Chromium contexts against the live URL.
- One-click demo, Reset, Start for real, real-storage sentinel, browser
  Back/Forward, request log, and offline reload checks.
- Fresh remote clone at `04c2f942c5561494a83946bef18c85bdf5847f59`.
- All 18 exact `.factory/claims.json` commands passed independently; each claim
  ID has exactly one test tag.
- `npm test -- --workers=1`: 24/24 passed.
- `npm run typecheck`, `npm run lint`, and `npm run build`: passed; `dist/`
  produced.
- Live route, metadata, link, 404, focus/history, console, and request sweeps.
- `/opt/fleet/lib/verify-url.sh`: passed after creating its evidence directory.
- Live Axe in light and dark on `/`, `/demo`, `/work`, `/privacy`, `/terms`,
  and the designed 404: zero violations.
- Live JS and CSS hashes exactly match the clean-clone build.
- Every earlier review, polish, verification, and handoff record was read and
  its findings rechecked against current source and live behavior.

Evidence generated during review is under `/tmp/srb-review6/`. The clean clone
is `/tmp/srb-review6-clean-G153N0/repo`.

## Remaining work

Resolve F-6-1 through F-6-7 in `.factory/review-6.md`. In particular, extend
`@claim:demo-isolation` to cover browser history and add a 390×844 assertion
that a real statement-to-ledger match is visible without scrolling. Then rerun
all declared claim commands and the full suite from a clean clone.
