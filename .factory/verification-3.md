# Independent verification 3 — PASS

**Candidate:** `05e047f2c8f86c2e36d955898d962c1cfa726cc7`  
**Live URL:** https://statement-reconcile-bridge.sociobot.in  
**Verified:** 2026-08-28 from a clean checkout. Product source was not changed.

## Decision

**PASS — eligible for release.** The live deployment matches the candidate and
the local-first reconciliation job works end to end. No release-blocking defects
were found in this independent pass.

## Mandatory gates

- `.factory/claims.json` exists with 18 entries. Every exact declared command
  was run separately from the clean checkout after `npm ci`; all passed. A
  confirming `npm test -- --grep @claim --workers=4` run passed **18/18** in
  23.7 seconds. Covered claims: sample reconciliation, demo isolation, free
  import/review/export, CSV/debit-credit/OFX/QFX/QIF import, exact-cent
  one-to-one matching, explicit manual review, CSV and audit export, local-only
  handling, no bank login, offline reload, license restore, $19 price, no
  budget advice, persistence, local rules, no advertising analytics, and
  payment handling.
- First-read test, cold live desktop visit: “Reconcile your statement with your
  ledger” says what it does; the next sentence names private-budget-file users
  checking a monthly bank download; the visible first action is **Try it with
  sample data**, with “See suggested matches right away.” The action opens
  `/demo` in one click.
- The same live check at 390 x 844 passes: H1 bottom 307 px, audience text
  bottom 403 px, and sample action bottom 469 px. Visual inspection confirms
  all three are in the first viewport.

## Clean-checkout and build evidence

- `npm ci`: PASS — 22 packages added, 23 audited, zero vulnerabilities.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm test`: PASS — all 22 Playwright tests completed cleanly.
- `npm run build`: PASS; `dist/` produced. Main JS is 22.30 kB (8.47 kB gzip),
  CSS 11.13 kB (3.28 kB gzip), and the hero WebP 89.38 kB: all within the PWA
  budgets.
- Fresh live Lighthouse mobile run: performance **96**, accessibility **100**,
  best practices **100**, SEO **100**; FCP 1.0 s, LCP 1.4 s, TBT 220 ms, CLS 0,
  transfer 101 KiB.

## Independent product exercise

- A real two-row statement and ledger import made two **suggested** matches and
  zero accepted matches. CSV export had its header only before review and two
  lines after one explicit acceptance. The exported audit contained `import`,
  `import`, and `review` actions. Reload retained the real work.
- An OFX record with calendar-invalid `20260230` was rejected with an announced
  recovery message. A `-$10.00` statement against `-$10.01` ledger row stayed
  unmatched. The complete sample showed 10 suggestions against 11 ledger rows.
- No cross-origin requests occurred during the real import/review/export flow;
  the normal public routes had no third-party requests, page errors, console
  errors, or failed resources.
- `/demo` registered `/sw.js`; after an online visit, offline reload returned
  200 and rendered all 10 matches. A controlled two-version worker exercise
  created a waiting update, showed **An update is ready**, and **Refresh app**
  activated it, removed the old cache, and retained all 10 demo rows.

## Accessibility, privacy, and deployment

- `/opt/fleet/lib/verify-url.sh` passed against the live URL: HTTP 200, title,
  `lang=en`, one H1, main landmark, image alt text, and no load errors.
- Live Axe scans of `/`, `/demo`, `/work`, `/privacy`, and `/terms` in both
  light and dark schemes found zero serious or critical violations. At 390 px
  there was no horizontal overflow. The skip link is the first Tab stop;
  keyboard acceptance retains focus on **Undo acceptance**. Focus is a visible
  solid 3 px ring, and reduced-motion mode leaves no active transitions or
  animations.
- The live CSP permits only self plus `https://api.sociobot.in` for connections;
  HSTS, `nosniff`, and strict-origin referrer policy are present. Hashed assets
  use one-year immutable caching and `sw.js` uses `no-cache`.
- A 40-request concurrent burst to the only server-side product endpoint,
  invalid license verification, returned 30 x 200 and then 10 x 429. Each 429
  carried `Retry-After: 4`; observed allowance is 30 requests. There is no
  product sign-in or first-party backend, so Entra, backend health, and
  persistence-boundary checks are not applicable.
- Candidate/live SHA-256 values match exactly: main JS
  `605375154081c7ac1242eadf099ec8a4645f340e22e9ed688de8df282ad312b9`, CSS
  `dbc86294780dedfffe4cd17094696fce9ead916cd08d86244ae94d425ecd434a`, worker
  `7029ddf9ae36d31cee99d51d9c387cc61492ff43fb036f74dae5f1364dc80a7e`, and
  manifest `5c1cca0fd59c683827c271a391a57db2108ad93eb75e7dcfb6c945e8c3ced2cd`.

## Defects by severity

None found.

## Scope notes

This is a static PWA, not a library/CLI or authenticated backend. No AI feature
is implied by the brief, so there is no AI-path verification requirement.
