# Review 3 handoff

## Result

Completed the requested adversarial first-read review without changing product code. The review is **FAIL** and is recorded in `.factory/review-3.md`.

## What was checked

- Fresh live contexts at 390×844 and 1440×900 confirmed the job, audience, and sample-data action are visible before scrolling.
- The live one-click demo loaded realistic sample rows immediately, used only the `demo:` storage namespace, reset independently, removed demo data on exit, and made no off-origin requests.
- The live offline demo reload rendered 10 rows after the service worker was ready.
- Every one of the 16 commands listed in `.factory/claims.json` passed after `npm ci`.
- `npm test` passed 20/20; `npm run typecheck`, `npm run lint`, and `npm run build` passed and produced `dist/`.
- Route metadata, 404, link crawl, focus/back behavior, mobile overflow, and live Axe checks were completed. No serious or critical Axe finding occurred.
- All earlier review, polish, verification, and handoff findings were rechecked against current live/source behavior.

## Known gaps

1. A calendar-invalid CSV date such as `2026-02-30` is silently normalized to `2026-03-02` and can be suggested as a match. This is blocking for a reconciliation tool.
2. The landing promise that every score has a reason is not separately represented in `claims.json`.

## Next steps

Validate CSV and QIF calendar components before matching, add recovery regression coverage, and add a score-reason claim/test (or remove that promise). Re-run the declared claim suite and the live review after repair.
