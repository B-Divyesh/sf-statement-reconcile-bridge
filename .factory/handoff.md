# Polish 1 handoff

## Result

Repaired review candidate `05e047f2c8f86c2e36d955898d962c1cfa726cc7`.
The unavailable paid checkout was removed rather than left as a dead purchase
path. Cleanup rules are now free and local. See `.factory/polish-1.md` for the
finding-by-finding closure map.

## Verification

- Clean install: `npm ci` completed with 22 packages and zero vulnerabilities.
- Every exact command in the 15-entry `.factory/claims.json` passed separately.
- `npm test` passed 19/19, including demo isolation, privacy-network capture,
  offline reload, 390 px layout, keyboard, dark/light Axe, and 404 metadata.
- `npm run typecheck`, `npm run lint`, and `npm run build` passed. `dist/` was
  produced; main JS is 20.12 kB (7.66 kB gzip), CSS is 11.01 kB (3.25 kB gzip),
  and the hero WebP is 89.38 kB.

## Deployment and live recheck

- Repair commit: `c0d47d7` (`fix: close review one findings`), pushed to
  `origin/main`. The deployed app build has the same product source; this
  commit updates only the repair record.
- `/opt/fleet/lib/deploy-static.sh statement-reconcile-bridge dist` succeeded
  with Azure deployment ID `f6854fd9-5c1c-42f3-a75f-fe43fcaff776`.
- Cold live `https://statement-reconcile-bridge.sociobot.in/` serves
  `main-BhgI0b-F.js`, the rebuilt production asset, and the CSP has
  `connect-src 'self'` only.
- Cold live `/missing-row-polish-1` returns HTTP 404 and contains the required
  Apple touch, Open Graph, and Twitter metadata. The formerly dead checkout
  link no longer exists.

## Known gaps

None. The former paid feature is intentionally absent because its hosted
checkout was not provisioned; the product no longer makes payment promises.

---

# Historical review records

## What was done

Completed the requested adversarial first-read review of the live product
without changing product code. Wrote the detailed report in
`.factory/review-1.md`.

## Verification run

- Fresh `npm ci` succeeded with no reported vulnerabilities.
- Every one of the 18 exact claim commands declared in `.factory/claims.json`
  completed successfully.
- `npm test` passed 22/22. `npm run typecheck`, `npm run lint`, and
  `npm run build` passed; `dist/` was produced.
- Fresh desktop and 390px live contexts verified the first read, demo banner,
  sample rows, reset, demo storage separation, exit cleanup, no console
  errors, and offline demo reload.
- `verify-url.sh` passed against the live landing page. Internal links and
  public routes were crawled; a missing route correctly returned the designed
  HTTP 404.

## Result and known gaps

The review **FAILS** because the live **Buy custom rules — $19** destination
returns HTTP 404 (`{"error":"enabled factory product","status":404}`). The
purchase path is therefore not end to end. The report also records two
overlong README sentences, two unlisted README claims, and incomplete 404
social/icon metadata. No product-source files were modified.

## Next steps

1. Provision/correct the Sociobot checkout URL and add a browser claim that
   follows it successfully.
2. Apply the specific README rewrites and claim inventory/test changes in
   `review-1.md`.
3. Complete 404 metadata, then rerun the whole review checklist.

---

# Repair handoff

## Result

All release blockers in independent verification commit
`e4d2ff42de330d936a041d5dbab73e30c640ef7d` for candidate
`cdd19453a98b42d09397628ba897d721640ca68b` were repaired. The product remains
a static, local-first PWA with the original concrete-and-moss visual system.

## Repairs

- The 390 px layout now places the job, audience, and sample action before a
  constrained illustration. All visible interactive targets measure at least
  44 by 44 CSS pixels.
- Machine matches always begin as suggestions. A person must accept a row
  before CSV export includes it. Accepted and rejected decisions can be undone,
  and keyboard focus stays on the same review row.
- Matching compares integer cents. A `-$10.00` statement no longer pairs with
  a `-$10.01` ledger row.
- OFX dates are calendar-validated. Missing amounts and files over 5 MB produce
  visible, announced errors, and a later valid upload clears the error.
- Dark-theme banner, paid-link, body-copy, and error colors now meet contrast
  requirements. Axe checks cover all five public routes in both color schemes.
- The skip link is the first initial keyboard stop. H1 focus and route
  announcements happen only after SPA navigation, not after each review action.
- Leaving demo mode through any navigation deletes both demo keys. The stray
  `<>` workbench text was removed.
- The paid section and Terms name Sociobot/Dodo as merchant of record and state
  that they handle refunds. No payment fields exist in the app.
- `/work` is in the sitemap. Every HTML entry has route-specific canonical,
  Open Graph, Twitter, icon, description, and title metadata. The static 404 now
  uses the shared header/main/footer structure.
- The 18-entry claim inventory covers debit/credit import, exact-cent one-to-one
  matching, manual review, real-work persistence, browser-only rules, payment
  handling, and the absence of advertising analytics. Each claim tag occurs
  exactly once in the browser suite.
- Service-worker first install no longer shows a false update notice. A waiting
  worker still exposes the controlled **Refresh app** action.

## Verification evidence

- Clean install: `npm ci` — 22 packages installed, 23 audited, 0 vulnerabilities.
- Every exact command in `.factory/claims.json` — 18 of 18 passed separately.
- Full suite: `npm test` — 22 of 22 passed, including desktop, 390 px mobile,
  keyboard, dual-theme Axe, privacy-network, offline reload, malformed input,
  one-cent mismatch, and metadata regressions.
- Static checks: `npm run typecheck` and `npm run lint` — passed.
- Production build: `npm run build` — passed and produced `dist/index.html`.
  Main JS is 22.30 KB (8.47 KB gzip), CSS is 11.13 KB (3.28 KB gzip), and the
  hero WebP is 89.38 KB.
- Local `verify-url.sh` — `/`, `/demo`, `/work`, `/privacy`, and `/terms` each
  returned 200 with the expected title, `lang=en`, one H1, one main landmark,
  alt text, and no console errors.
- Local mobile Lighthouse — performance 100, accessibility 100, best practices
  100, SEO 100; FCP 0.9 s, LCP 1.8 s, TBT 40 ms, CLS 0, total transfer 101 KiB.
- Controlled two-version service-worker exercise — first install showed no
  update notice; the next worker waited, **Refresh app** activated it, the old
  cache was removed, and all 10 demo rows remained after reload.

## Deployment

- Repair commit `c02920e073dc470051e48942769fd9fba3fa0a6d` was pushed to
  `origin/main`.
- `/opt/fleet/lib/deploy-static.sh statement-reconcile-bridge dist` completed
  successfully with Azure deployment ID
  `9bf1a58e-76ef-4d7b-9dfe-09d97660d28a`.
- The production URL is
  `https://statement-reconcile-bridge.sociobot.in`.
- Live JS SHA-256 is
  `605375154081c7ac1242eadf099ec8a4645f340e22e9ed688de8df282ad312b9`;
  live CSS is
  `dbc86294780dedfffe4cd17094696fce9ead916cd08d86244ae94d425ecd434a`;
  live worker is
  `7029ddf9ae36d31cee99d51d9c387cc61492ff43fb036f74dae5f1364dc80a7e`;
  and live manifest is
  `5c1cca0fd59c683827c271a391a57db2108ad93eb75e7dcfb6c945e8c3ced2cd`.
  Every hash exactly matches `dist/`.
- Live `verify-url.sh` passed on `/`, `/demo`, `/work`, `/privacy`, and
  `/terms`: each returned 200 with the correct title, `lang=en`, one H1, one
  main landmark, alt text, and no console errors. A missing route returned the
  designed header/main/footer page with HTTP 404.
- Live headers include HSTS, `nosniff`, strict-origin referrer policy, and the
  restrictive CSP. The CSP allows only self plus `api.sociobot.in` for
  connections. Hashed assets return one-year immutable caching; `sw.js`
  returns `no-cache`.
- A fresh 390 by 844 live browser placed the H1, audience text, and sample
  action bottoms at 307, 403, and 469 px. The demo opened with 10 suggestions,
  zero accepted rows, and only the two `demo:` keys. Offline reload retained
  all 10 rows.
- A live real-work import sent no cross-origin requests. A `-$10.00` statement
  against a `-$10.01` ledger row remained unmatched. A real invalid-license
  check reached Sociobot, returned HTTP 200, and displayed the invalid-license
  recovery message without a console or CSP error.
- Live Axe scans across all five routes in light and dark found zero serious or
  critical issues. The live browser recorded zero console errors.
- Live mobile Lighthouse — performance 100, accessibility 100, best practices
  100, SEO 100; FCP 0.8 s, LCP 1.4 s, TBT 60 ms, CLS 0, total transfer 101 KiB.
- Billing response-policy check — 40 invalid verification requests at
  concurrency 20 returned 30 HTTP 200 and 10 HTTP 429 responses. Rate-limited
  responses included `Retry-After: 3` or `4`; the invalid body was
  `{valid:false, reason:"invalid", expires_at:null}`.

## Known gaps

None found in the repaired scope. Synthetic Lighthouse does not report field
INP; interaction tests exercise the review controls directly.

---

# Independent verification 3 handoff — PASS

Candidate `05e047f2c8f86c2e36d955898d962c1cfa726cc7` is verified at
https://statement-reconcile-bridge.sociobot.in and **PASS**es release QA.

- From a clean checkout: `npm ci`, every one of the 18 exact claim commands,
  `npm test` (22 tests), `npm run typecheck`, `npm run lint`, and `npm run
build` all passed. `dist/` was produced.
- The live deployment hashes exactly match the candidate build (main JS, CSS,
  service worker, and manifest). Live Lighthouse mobile was 96 performance,
  100 accessibility, 100 best practices, and 100 SEO.
- The live PWA passed 390 px first-read, desktop/mobile visual, keyboard,
  reduced-motion, dual-theme Axe, privacy-network, offline reload, and
  controlled worker-update checks. It imports the promised formats, keeps exact
  cents and one-to-one matching, requires explicit review before export, and
  rejects malformed OFX dates.
- License verification is rate limited after 30 requests; 429 responses carried
  `Retry-After: 4`. There is no sign-in or product backend beyond that billing
  endpoint.

See `.factory/verification-3.md` for commands, observed behavior, hashes, and
full evidence. No known release-blocking gaps remain.
