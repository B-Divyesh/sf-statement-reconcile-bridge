# Polish 4 — complete cumulative finding closure

**Repair commit:** `b67814c06556a8c177319fd0969cf744afc87b36`  
**Deployment:** `7383a5a6-9b6c-4c83-815a-2c891a0a5eb5`  
**Live URL:** https://statement-reconcile-bridge.sociobot.in

This pass read every `review-*.md`, `polish-*.md`, and verification report.
The rows below map each original finding to the present, tested behavior. The
fresh remote clone evidence is `/tmp/srb-polish-4-clean-7paD3e/repo`; all 18
declared claim commands passed individually there, the aggregate claim run
passed 18/18, and the full suite passed 23/23.

## Adversarial review findings

| Finding | Change made                                                                                                             | Evidence                                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| F-1-1   | Retained removal of the unavailable paid checkout, price, license UI, and payment claims. Local cleanup rules are free. | Live first-party link crawl: 10/10 navigable links returned 200; source audit has no checkout link.                      |
| F-1-2   | Retained the 20-word README audience sentence.                                                                          | `README.md` and copy audit review; `npm run lint`.                                                                       |
| F-1-3   | Retained the three short README capability sentences.                                                                   | `README.md` review; `npm run lint`.                                                                                      |
| F-1-4   | Retained removal of the untested payee-normalisation promise.                                                           | README/source audit; `@claim:one-to-one-matching`.                                                                       |
| F-1-5   | Retained the listed manual-review limitation wording.                                                                   | `@claim:manual-review`; README/source audit.                                                                             |
| F-1-6   | Retained designed 404 icon, canonical, Open Graph, and Twitter metadata.                                                | Live `/missing-polish-4` returned 404 with complete metadata; route/Axe sweep.                                           |
| F-2-1   | Retained explicit Twitter card, title, description, and image on every route.                                           | Live metadata sweep across public routes and 404.                                                                        |
| F-2-2   | Retained the product-wide term **audit report**.                                                                        | Landing, workbench, claims, README source audit.                                                                         |
| F-2-3   | Retained local cleanup rules that recalculate matching before review.                                                   | `@claim:cleanup-rule-matching`.                                                                                          |
| F-3-1   | Retained strict calendar validation for CSV, QIF, and OFX before state changes.                                         | `@regression: calendar-invalid CSV and QIF dates, OFX, truncated, and oversized inputs are announced and recoverable`.   |
| F-3-2   | Retained a plain-language reason for every score or open row.                                                           | `@claim:match-score-reasons`.                                                                                            |
| F-4-1   | Removed the information-free **“One small bridge.”** caption and its dead CSS.                                          | Live home has no `figcaption` or slogan; `/tmp/srb-polish-4/live-browser/home-mobile.png`.                               |
| F-4-2   | Added `input-files-unchanged` to the claim inventory and a real browser byte-comparison test.                           | `@claim:input-files-unchanged`; live `/work` fixture replay kept bytes unchanged through import, acceptance, and export. |

## Independent verification findings

| Finding                                     | Change made                                                                                                              | Evidence                                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| V1 P0 — demo wrote real storage             | Retained separate `demo:` storage, banner, reset, and cleanup on exit.                                                   | `@claim:demo-isolation`; live `?demo=1` replay.                                      |
| V1 P0 — no reachable real importer          | Retained `/work` with separate statement and ledger inputs.                                                              | `@claim:free-core-job`; live **Start for real** opened `/work`.                      |
| V1 P1 — billing CSP blocked verification    | Retained removal of unavailable billing rather than a broken paid path.                                                  | Live link crawl; source audit; `connect-src 'self'`.                                 |
| V1 P1 — errors were hidden                  | Retained announced, visible, recoverable parser errors.                                                                  | Calendar-invalid input regression.                                                   |
| V1 P1 — claims were incomplete              | Expanded and retained 18 claims, including round-4 file integrity.                                                       | Clean-clone individual claim commands; mechanical 18-tag check.                      |
| V1 P1 — mobile performance gate             | Retained small local bundle and remeasured live performance.                                                             | Lighthouse mobile 99 performance, 100 accessibility; 1.3 s LCP, CLS 0.               |
| V1 P2 — cache/update behavior               | Retained versioned shell cache, no-cache worker, and update toast.                                                       | `@claim:offline-reload`; live offline demo replay.                                   |
| V1 P2 — missing real 404                    | Retained Static Web Apps 404 override and designed page.                                                                 | Live `/missing-polish-4` HTTP 404, H1, main, and Axe sweep.                          |
| V1 P2 — undersized targets                  | Retained 44 px interactive controls.                                                                                     | `@regression: mobile first screen, touch targets, and keyboard focus remain usable`. |
| V1 P2 — route focus/announcement            | Retained focusable H1 and polite live route note.                                                                        | Live history replay; direct-route regression.                                        |
| V2 P0 — mobile first screen                 | Retained content-first mobile hero layout.                                                                               | Live 390×844 bottoms: 306.7, 403.2, and 469.2 px.                                    |
| V2 P0 — automatic or one-cent acceptance    | Retained explicit acceptance and integer-cent matching.                                                                  | `@claim:manual-review`; `@claim:one-to-one-matching`.                                |
| V2 P1 — dark contrast                       | Retained dark treatment with sufficient contrast.                                                                        | Live Axe: zero serious/critical issues in light and dark.                            |
| V2 P1 — malformed OFX                       | Retained strict OFX date and amount validation.                                                                          | Calendar-invalid input regression.                                                   |
| V2 P1 — review focus reset                  | Retained focus on the newly rendered Undo action.                                                                        | Mobile/keyboard regression.                                                          |
| V2 P1 — unlisted public claims              | Retained coverage for formats, persistence, local rules, privacy, review, and score reasons; added input-file integrity. | All 18 exact claim commands from the clean clone.                                    |
| V2 P1 — paid legal disclosure               | Retained removal of unavailable paid UI and payment promises.                                                            | Source audit and live link crawl.                                                    |
| V2 P2 — small mobile targets                | Retained 44 px nav, banner, file, inline-link, and review targets.                                                       | Mobile/keyboard regression; live mobile Axe sweep.                                   |
| V2 P2 — demo keys on header exit            | Retained cleanup for header navigation and **Start for real**.                                                           | `@claim:demo-isolation`; live replay.                                                |
| V2 P2 — literal markup residue              | Retained valid workspace HTML.                                                                                           | `@regression: workspace markup and route metadata are complete`.                     |
| V2 P2 — sitemap, metadata, and 404 skeleton | Retained `/work` sitemap entry, complete route metadata, and standard 404 structure.                                     | Live metadata sweep, link crawl, and 404 check.                                      |

## Deployment recheck

- `/opt/fleet/lib/verify-url.sh` passed cold at the live URL; evidence is
  `/tmp/srb-polish-4/live-verify/`.
- Live screenshots are `/tmp/srb-polish-4/live-browser/home-mobile.png` and
  `/tmp/srb-polish-4/live-browser/demo-mobile.png`.
- The deployed JS and CSS SHA-256 values exactly equal the current `dist/`
  assets: `a6f450dbafeac5c951c11a6662a8c9e8b61257fbeec59a29196b1d380f8fcf4d`
  and `8c2171146ee42a75192a36b16eaff8d1fd4768644bb47055ff45b31024b55de2`.
- The live browser rechecked first screen, direct query demo, demo isolation,
  local-only requests, input-byte integrity, offline reload, History API focus,
  route metadata, link health, 404, mobile layout, and both-theme Axe after
  deployment. No unresolved finding remains.
