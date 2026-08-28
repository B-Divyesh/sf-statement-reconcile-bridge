# Polish 2 — cumulative finding closure

Repair commit: `c0e48b5aae2254a8322de99ee8442cac432d0e09`, based on
`522fa9ba1944649776cb97f5457e1b8032cc9b6a`.
All review, verification, and earlier-polish records were read before this
repair. Evidence paths below are retained in the worker at
`/tmp/srb-polish-2/`.

| Finding                                               | Change made                                                                                                                                                                                               | Evidence                                                                                                            |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| F-1-1                                                 | Kept the unavailable paid checkout, price, license UI, and payment promises removed; cleanup rules remain free and local.                                                                                 | `@claim:free-core-job`; local link crawl in `npm test`.                                                             |
| F-1-2                                                 | Kept the README audience sentence at 20 words.                                                                                                                                                            | `.factory/copy-audit.md`; `npm run lint`.                                                                           |
| F-1-3                                                 | Kept the README capability copy as three short sentences.                                                                                                                                                 | `.factory/copy-audit.md`; `npm run lint`.                                                                           |
| F-1-4                                                 | Kept the untested payee-normalisation marketing promise absent.                                                                                                                                           | README/source audit; `@claim:one-to-one-matching`.                                                                  |
| F-1-5                                                 | Kept the tested manual-review wording in place.                                                                                                                                                           | `@claim:manual-review`.                                                                                             |
| F-1-6                                                 | Kept the complete 404 social and icon metadata, now including the explicit Twitter image.                                                                                                                 | `@regression: workspace markup and route metadata are complete`.                                                    |
| F-2-1                                                 | Added explicit Twitter title, description, and image on home; added Twitter image to demo, work, privacy, terms, and 404. The metadata regression requires all four Twitter fields on every route source. | Metadata regression; live route sweep confirmed all four fields.                                                    |
| F-2-2                                                 | Replaced the landing phrase “audit record” with the product-wide term “audit report.”                                                                                                                     | `.factory/copy-audit.md`; source audit; mobile screenshot `/tmp/srb-polish-2/local-home-mobile.png`.                |
| F-2-3                                                 | Added `cleanup-rule-matching` to the claim inventory and a real browser test. A mismatched pair changes from 65%/caution to 95%/payee agreement after saving a rule.                                      | `@claim:cleanup-rule-matching`; `npm test -- --grep @claim --workers=4`.                                            |
| verification P0: demo isolation                       | Kept the separate `demo:` namespace and expanded `@claim:demo-isolation` to open `?demo=1`, show the banner, and reset isolated sample state.                                                             | `@claim:demo-isolation`; `/tmp/srb-polish-2/local-demo-desktop.png`.                                                |
| verification P0: real import                          | Kept the `/work` statement and ledger import route.                                                                                                                                                       | `@claim:free-core-job`; `@claim:statement-file-formats`.                                                            |
| verification P1: blocked billing                      | Kept paid billing removed rather than exposing a broken destination.                                                                                                                                      | Link coverage in `npm test`; source audit.                                                                          |
| verification P1: hidden input errors                  | Kept announced, recoverable malformed-input handling.                                                                                                                                                     | `@regression: invalid CSV, OFX, truncated, and oversized inputs are announced and recoverable`.                     |
| verification P1: incomplete claims                    | Inventory now contains 16 entries, each with exactly one `@claim:` test.                                                                                                                                  | Clean-clone declared-claim run recorded in handoff.                                                                 |
| verification P1: mobile performance                   | Kept the 20.12 kB (7.66 kB gzip) main JavaScript and 11.01 kB (3.25 kB gzip) CSS output.                                                                                                                  | `npm run build`; `/tmp/srb-polish-2/lighthouse-mobile.json` (100 performance, 100 accessibility, LCP 1.9 s, CLS 0). |
| verification P2: cache/update and offline             | Kept precache/update behavior and offline demo reload.                                                                                                                                                    | `@claim:offline-reload`.                                                                                            |
| verification P2: 404, routing, metadata               | Kept the designed 404, real routes, route focus, announcements, legal links, sitemap, and headers; completed Twitter metadata.                                                                            | Metadata, route, keyboard, and Axe regressions in `npm test`.                                                       |
| verification P2: touch targets and route focus        | Kept 44 px controls and focused route headings/Undo actions.                                                                                                                                              | `@regression: mobile first screen, touch targets, and keyboard focus remain usable`.                                |
| verification-2 P0: first mobile screen                | Kept headline, audience, and sample CTA inside 390×844 on first load.                                                                                                                                     | Same mobile regression; `/tmp/srb-polish-2/local-home-mobile.png`.                                                  |
| verification-2 P0: automatic or mismatched acceptance | Kept suggestions unaccepted until a person accepts them and exact-cent matching only.                                                                                                                     | `@claim:manual-review`; `@claim:one-to-one-matching`.                                                               |
| verification-2 P1: dark contrast and malformed OFX    | Kept dark-theme accessibility and OFX rejection behavior.                                                                                                                                                 | Dual-theme Axe regression; malformed-input regression.                                                              |
| verification-2 P1: review focus and unlisted claims   | Kept Undo focus and completed the remaining cleanup-rule behavior claim.                                                                                                                                  | Mobile/keyboard regression; `@claim:cleanup-rule-matching`.                                                         |
| verification-2 P1: paid legal disclosure              | Kept the unavailable paid offer removed.                                                                                                                                                                  | Source/link audit.                                                                                                  |
| verification-2 P2: demo exit and markup residue       | Kept demo-key removal and valid workbench markup.                                                                                                                                                         | `@claim:demo-isolation`; metadata/workspace regression.                                                             |

## Local verification

- `npm run typecheck`, `npm run lint`, `npm test -- --grep @claim --workers=4`
  (16/16), `npm test` (20/20), and `npm run build` passed.
- `verify-url.sh http://127.0.0.1:4173/ /tmp/srb-polish-2/local-verify` found
  title, `lang`, one H1, a main landmark, alt text, and no console error.
- Playwright Axe found no serious or critical issue across all public SPA routes
  in light and dark themes. Lighthouse mobile measured 100 performance and 100
  accessibility; the full JSON report is
  `/tmp/srb-polish-2/lighthouse-mobile.json`.

## Deployment recheck

- Deployed `dist/` with the work-order command
  `/opt/fleet/lib/deploy-static.sh statement-reconcile-bridge dist`. Azure Static
  Web Apps deployment `5190fb1e-0de1-4ad2-92e6-896e78c2d762` succeeded.
- Cold live checks at `https://statement-reconcile-bridge.sociobot.in/` found
  no console errors, one H1 and main landmark, title/lang/alt-text baseline,
  all Twitter fields on `/`, `/demo`, `/work`, `/privacy`, `/terms`, and the
  designed `/missing-polish-2` 404. The missing route returned HTTP 404.
- The direct `?demo=1` path showed 10 suggestions and the persistent banner.
  Reset wrote only `demo:statement-reconcile-bridge:state`; Start for real
  opened `/work` and removed the demo namespace. The live browser captured no
  off-origin request.
- Live mobile first-screen bottoms were 306.7 px (H1), 403.2 px (audience),
  and 469.2 px (sample CTA) in a 390×844 viewport. Live Axe found no serious
  or critical violation on each public route in either color scheme.
- Live screenshots: `/tmp/srb-polish-2/live-browser/demo-desktop.png` and
  `/tmp/srb-polish-2/live-browser/home-mobile.png`; URL verifier evidence:
  `/tmp/srb-polish-2/live-verify/`.
