# Review 4 handoff

## Result

Adversarial review 4 completed without product-code changes. The result is
**FAIL** with two minor findings recorded in `.factory/review-4.md`:

- F-4-1: remove or replace the information-free hero caption “One small bridge.”
- F-4-2: add a tested claim for “without changing your ledger,” or remove that
  footer promise.

## Verification performed

- Fresh live Chromium checks at 390×844 and 1440×900 confirmed the job,
  audience, and sample action are visible on the first screen.
- Live demo check confirmed one-click sample use, persistent banner, 10
  suggestions, demo-only storage, reset, exit cleanup, real workspace, and no
  off-origin request in the demo-to-real flow.
- Fresh remote clone at `/tmp/srb-review4-PJdnsY/repo`: `npm ci`; all 17 exact
  claim commands individually; typecheck; lint; the full 22-test suite; and
  build all passed.
- Live route, metadata, link, History API/focus, 404, request-log, and mobile
  Axe checks passed. No serious or critical Axe violation was found.

## How to verify

```sh
npm ci
npm run typecheck
npm run lint
npm test -- --workers=1
npm run build
```

For the two remaining issues and complete evidence, read
`.factory/review-4.md`.

## Known gaps

The two documented copy/claims findings remain. No deployment action was
taken.
