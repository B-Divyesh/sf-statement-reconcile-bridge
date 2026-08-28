# Polish 3 — cumulative finding closure

**Released application commit:** `edcbf76`  
**Live URL:** https://statement-reconcile-bridge.sociobot.in  
**Static deployment:** `c11f254a-0211-4446-a5ea-329dcfb16c9c`

This pass read every `review-*.md`, `polish-*.md`, and verification record.
“Retained” means the prior code fix remains present and was tested again; it is
not a documentation-only closure.

## Adversarial review findings

| Finding | Change made                                                                                                                                                                           | Evidence                                                                                                                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F-1-1   | Retained removal of the unavailable paid checkout, price, license UI, and payment promises. Cleanup rules remain free and local.                                                      | Live same-origin link crawl: `/`, `/work`, `/demo`, `/privacy`, `/terms` all return 200; no checkout link exists.                                                                                                |
| F-1-2   | Retained the 20-word README audience sentence.                                                                                                                                        | `README.md` source audit; `.factory/copy-audit.md`.                                                                                                                                                              |
| F-1-3   | Retained the three short README capability sentences.                                                                                                                                 | `README.md` source audit; `.factory/copy-audit.md`.                                                                                                                                                              |
| F-1-4   | Retained removal of the untested payee-normalisation promise.                                                                                                                         | README and landing source audit; `@claim:one-to-one-matching`.                                                                                                                                                   |
| F-1-5   | Retained the tested manual-review wording instead of the unlisted financial-advice phrase.                                                                                            | `@claim:manual-review`; README source audit.                                                                                                                                                                     |
| F-1-6   | Retained full 404 icon, canonical, Open Graph, and Twitter metadata.                                                                                                                  | Live `/missing-polish-3` returned 404 with all metadata; `@regression: workspace markup and route metadata are complete`.                                                                                        |
| F-2-1   | Retained explicit Twitter card, title, description, and image on every route; direct query demo now updates its document head to `/demo` metadata too.                                | `@claim:demo-isolation`; live light/dark metadata sweep of all public routes and 404.                                                                                                                            |
| F-2-2   | Retained the product-wide term “audit report.”                                                                                                                                        | `.factory/copy-audit.md`; landing and workbench source audit.                                                                                                                                                    |
| F-2-3   | Retained real cleanup-rule matching: saving a rule recalculates a caution match to a 95% payee-agreement suggestion.                                                                  | `@claim:cleanup-rule-matching`.                                                                                                                                                                                  |
| F-3-1   | Replaced permissive JavaScript date parsing with numeric calendar parsing and UTC component round-tripping for CSV and QIF. Calendar-invalid dates are rejected before state changes. | `@regression: calendar-invalid CSV and QIF dates, OFX, truncated, and oversized inputs are announced and recoverable`; live `/work` replay: CSV and QIF alerts, zero invalid matches, then one valid suggestion. |
| F-3-2   | Added `match-score-reasons` and a browser claim covering high-confidence, caution, and unmatched explanations.                                                                        | `@claim:match-score-reasons`; `.factory/claims.json`; `/tmp/srb-polish-3/live-demo-query-mobile.png`.                                                                                                            |

## Earlier independent-verification findings

| Finding                                  | Change made                                                                                                                                                  | Evidence                                                                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| V1 P0 — demo wrote real storage          | Retained the separate `demo:` namespace and strengthened the claim to preserve a seeded real sentinel through direct `?demo=1`, acceptance, reset, and exit. | `@claim:demo-isolation`; live `?demo=1` replay; `/tmp/srb-polish-3/live-demo-query-mobile.png`.                       |
| V1 P0 — no real importer                 | Retained `/work` with separate statement and ledger inputs.                                                                                                  | `@claim:free-core-job`; live Start for real opened `/work` with two file inputs.                                      |
| V1 P1 — blocked billing CSP              | Retained removal of unavailable billing, license, and payment UI; the CSP has no unnecessary external connection.                                            | Live header: `connect-src 'self'`; link crawl.                                                                        |
| V1 P1 — hidden import errors             | Retained visible, announced errors; expanded recovery coverage to calendar-invalid CSV and QIF input.                                                        | Calendar-invalid regression and live `/work` replay.                                                                  |
| V1 P1 — incomplete claims                | Expanded inventory to 17 claims, with exactly one matching `@claim:` test each.                                                                              | Clean-install individual claim run; mechanical claim/tag check; aggregate `17 passed`.                                |
| V1 P1 — mobile performance               | Retained small local bundle and remeasured it.                                                                                                               | Lighthouse mobile: 97 performance, 100 accessibility, 2.467 s LCP, 0 CLS; `/tmp/srb-polish-3/lighthouse-mobile.json`. |
| V1 P2 — cache/update behavior            | Retained versioned service worker, no-cache worker policy, update toast, and shell cache.                                                                    | `@claim:offline-reload`; live offline `/demo` reload showed 10 matches.                                               |
| V1 P2 — missing real 404                 | Retained Static Web Apps response override and designed 404.                                                                                                 | Live `/missing-polish-3` HTTP 404, one H1 and main; light/dark Axe sweep.                                             |
| V1 P2 — undersized targets               | Retained 44 px controls, including demo and review actions.                                                                                                  | `@regression: mobile first screen, touch targets, and keyboard focus remain usable`.                                  |
| V1 P2 — ineffective route focus          | Retained focusable H1 and polite route note; added direct route/history regression.                                                                          | `@regression: direct routes have metadata, legal links, and focused history navigation`.                              |
| V2 P0 — mobile first screen              | Retained job headline, audience, and sample action before the fold.                                                                                          | Live 390×844 bottoms: H1 307 px, audience 403 px, CTA 469 px; `/tmp/srb-polish-3/live-home-mobile.png`.               |
| V2 P0 — automatic or one-cent acceptance | Retained explicit human acceptance and integer-cent matching.                                                                                                | `@claim:manual-review`; `@claim:one-to-one-matching`.                                                                 |
| V2 P1 — dark contrast                    | Retained dark treatment and reran Axe in both schemes.                                                                                                       | Live Axe: zero serious or critical violations on six routes in light and dark.                                        |
| V2 P1 — malformed OFX                    | Retained strict OFX date validation and recovery.                                                                                                            | Calendar-invalid regression includes malformed and truncated OFX.                                                     |
| V2 P1 — review focus reset               | Retained focus on the new Undo control after review actions.                                                                                                 | Mobile/keyboard regression.                                                                                           |
| V2 P1 — public reliance claims           | Retained coverage for formats, persistence, cleanup rules, privacy, no bank login, and manual review; added score explanations.                              | All 17 declared claim commands and `npm test`.                                                                        |
| V2 P1 — paid legal disclosure            | Retained removal of the unavailable paid product and all payment claims.                                                                                     | Source audit and live link crawl.                                                                                     |
| V2 P2 — small targets                    | Retained 44 px nav, file, inline-link, banner, and review controls.                                                                                          | Mobile/keyboard regression; live 390 px Axe sweep.                                                                    |
| V2 P2 — demo keys on exit                | Retained cleanup for header navigation and Start for real.                                                                                                   | `@claim:demo-isolation`; live replay showed `demoKeysAfterExit: []`.                                                  |
| V2 P2 — literal markup residue           | Retained valid workbench HTML with no literal fragment text.                                                                                                 | `@regression: workspace markup and route metadata are complete`.                                                      |
| V2 P2 — route metadata/sitemap           | Retained `/work` sitemap entry, standard 404 skeleton, and complete Open Graph/Twitter route metadata.                                                       | Direct-route regression; live metadata sweep; live 404 check.                                                         |

## Evidence summary

- Fresh locked install: `npm ci` installed 22 packages with zero vulnerabilities.
- Each of the 17 exact commands in `.factory/claims.json` was executed from that
  clean install. The aggregate command `npm test -- --grep @claim --workers=4`
  then passed 17/17.
- `npm run typecheck`, `npm run lint`, `npm test` (22/22), and `npm run build`
  passed. The production bundle is 21.64 kB JavaScript (8.10 kB gzip), 11.01
  kB CSS (3.25 kB gzip), and 89.38 kB product-owned hero WebP.
- `/opt/fleet/lib/verify-url.sh` passed locally and cold against the live home;
  evidence is in `/tmp/srb-polish-3/local-verify/` and
  `/tmp/srb-polish-3/live-verify/`.
- Live mobile screenshots: `/tmp/srb-polish-3/live-home-mobile.png` and
  `/tmp/srb-polish-3/live-demo-query-mobile.png`.
- Live route, link, metadata, and Axe sweep covered home, demo, work, privacy,
  terms, and 404 in light and dark modes. All first-party links returned 200;
  the intentional missing route returned 404. No serious or critical Axe issue
  occurred.
- The live JS and CSS SHA-256 values match the deployed `dist/` exactly:
  `b170090978811ee884af048df983b1bbaabfd6e56d5053f333c4634a483498d2` and
  `0bc98342e40e30e613b39d34479a7622f496ecc14154035094c5ae5ec8184e67`.
