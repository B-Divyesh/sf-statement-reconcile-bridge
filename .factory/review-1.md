# Adversarial first-read review 1 — FAIL

**Reviewed:** 2026-08-28  
**Live URL:** https://statement-reconcile-bridge.sociobot.in  
**Method:** fresh Playwright Chromium contexts at 390×844 and 1440×900; a fresh npm ci; every declared claim command; live link crawl; source and history review. No product code was changed.

## Verdict

**FAIL.** The page promises a $19 paid unlock and exposes **Buy custom rules — $19**, but its live target returns HTTP 404. A visitor cannot buy the feature. There are also copy/claims and 404 metadata findings below. A pass requires zero findings.

## Cold first read

Both fresh contexts were clear before scrolling.

| Viewport | What it does                                | For whom                                                                           | First action                                                                  |
| -------- | ------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 390×844  | “Reconcile your statement with your ledger” | “For people with a private budget file who need to check a monthly bank download.” | **Try it with sample data**; its bottom was y=469, inside the 844px viewport. |
| 1440×900 | Same headline                               | Same audience sentence                                                             | **Try it with sample data**; its bottom was y=794, inside the 900px viewport. |

The mobile page did not log console or page errors. The concrete-and-moss workbench art, hard rules, and ledger typography are product-specific and do not resemble a generic gradient SaaS landing page.

## Findings

### F-1-1 — BLOCKING — The paid checkout action is a dead link

**Location / quote:** Landing paid section: **“Buy custom rules — $19”**. Its live target is https://api.sociobot.in/api/v1/products/statement-reconcile-bridge/checkout.

**Evidence:** A live GET and a browser-link crawl returned HTTP 404 with {"error":"enabled factory product","status":404}. All first-party page, policy, demo, workbench, sitemap, and robots links returned 200; this is the only dead interactive destination found.

**Why this fails:** The visitor is offered a one-time purchase that cannot be started. “Sociobot and Dodo handle payment and refunds” and the advertised $19 unlock are therefore not tryable or honest end to end.

**Concrete fix:** Provision or correct the Sociobot checkout URL so a normal GET opens a live checkout/redirect, then add @claim:paid-checkout from a fresh browser context that follows the button and asserts a 2xx checkout page or documented Sociobot redirect. If that product is not purchasable, remove the paid card, button, price, and payment claims.

### F-1-2 — Minor — README audience sentence exceeds the 22-word limit

**Location / quote:** README opening paragraph: “It is for people who already keep a spreadsheet or local CSV and want a small monthly handoff tool instead of another budget app.” — **24 words**.

**Why this fails:** It combines the audience, their existing practice, timing, tool category, and a comparison in one sentence. This breaches the attached plain-words hard cap.

**Concrete rewrite:** “It is for people with a spreadsheet or local CSV who need a monthly handoff tool, not another budget app.” (20 words.)

### F-1-3 — Minor — README capability sentence exceeds the 22-word limit

**Location / quote:** README paragraph two: “It normalizes payee text, proposes one-to-one exact-cent matches, lets you review every match, and exports accepted rows plus a JSON audit report.” — **25 words**.

**Why this fails:** It contains four separate capabilities and breaches the plain-words hard cap.

**Concrete rewrite:** “It proposes one-to-one exact-cent matches. Review each match. Export accepted rows and a JSON audit report.”

### F-1-4 — Minor — Payee-normalisation claim is not in the claims inventory

**Location / quote:** README: “It normalizes payee text”.

**Why this fails:** This is a visitor-reliance behavior, but .factory/claims.json has no claim for normalising payee text. The current one-to-one-matching entry asserts exact cents and one-to-one use; it does not name this behavior. The free-core-job fixture happens to use similar payee text, which is not an inventory entry for the public promise.

**Concrete fix:** Either remove this promise as in F-1-3, or add a payee-normalisation claim and one @claim:payee-normalisation test that imports deliberately variant payees and asserts the observable suggestion and its reason.

### F-1-5 — Minor — “Not financial advice” is an unlisted public claim

**Location / quote:** README Privacy and limits: “Matches are suggestions, not financial advice.”

**Why this fails:** no-budget-advice covers the separate landing phrase “No budget advice”; it neither names nor tests the stronger financial-advice statement. This leaves a public limitation claim outside the required inventory.

**Concrete fix:** Prefer “Matches are suggestions. Review them before relying on them.” Or add a precisely scoped no-financial-advice inventory entry and an observable-copy test, while retaining the plain-language limitation.

### F-1-6 — Minor — The designed 404 lacks required social metadata

**Location / quote:** public/404.html, live /missing-row-review-1 (HTTP 404): it has a title, description, favicon, header, footer, and one H1, but no og:title, og:description, og:image, twitter:card, Twitter title or description, or Apple touch icon.

**Why this fails:** The site-structure requirement applies route metadata, including Open Graph/Twitter and the product icon, to every route. The 404 is designed and correctly returns 404, but its metadata is incomplete.

**Concrete fix:** Add the product’s existing social artwork and route metadata to public/404.html (retaining noindex), then extend the metadata regression test to cover it.

## Copy audit

No landing phrase is over 22 words, uses a banned marketing adjective, or uses a non-result-naming button. “Try it with sample data”, “Start with your files”, “Restore license”, “Export reviewed CSV”, and “Export audit report” name the result. The two README length flags are F-1-2 and F-1-3. Counts treat hyphenated terms and slash-delimited format names as one word.

### Landing page

| Text                                                                             | Words | Result                      |
| -------------------------------------------------------------------------------- | ----: | --------------------------- |
| Private file-to-file reconciliation                                              |     3 | pass                        |
| Reconcile your statement with your ledger                                        |     6 | pass                        |
| For people with a private budget file who need to check a monthly bank download. |    15 | pass                        |
| Try it with sample data                                                          |     6 | pass                        |
| See suggested matches right away.                                                |     5 | pass                        |
| Start with your files                                                            |     4 | pass                        |
| Files stay in this browser.                                                      |     5 | pass                        |
| Works offline after the first visit.                                             |     6 | pass                        |
| Free for the full reconciliation job.                                            |     6 | pass                        |
| Two independent records.                                                         |     3 | pass                        |
| One small bridge.                                                                |     3 | pass                        |
| Three steps                                                                      |     2 | pass                        |
| Move through a monthly statement                                                 |     5 | pass                        |
| Import files                                                                     |     2 | pass                        |
| Add a bank CSV, OFX, or QIF and your ledger CSV.                                 |    12 | pass                        |
| Review suggestions                                                               |     2 | pass                        |
| See one-to-one matches with the reason for each score.                           |    10 | pass                        |
| Export reviewed rows                                                             |     3 | pass                        |
| Hand approved rows and an audit record back to your ledger.                      |    12 | pass                        |
| Optional one-time purchase                                                       |     3 | pass                        |
| Save custom cleanup rules                                                        |     4 | pass                        |
| $19 once.                                                                        |     2 | pass                        |
| Exporting, reviewing, and audit files stay free.                                 |     7 | pass                        |
| Sociobot and Dodo handle payment and refunds.                                    |     7 | pass                        |
| Payment details never enter this app.                                            |     6 | pass                        |
| Buy custom rules — $19                                                           |     4 | **F-1-1: dead destination** |
| Have a license?                                                                  |     3 | pass                        |
| Paste license token                                                              |     3 | pass                        |
| Restore license                                                                  |     2 | pass                        |
| No bank login.                                                                   |     3 | pass                        |
| No budget advice.                                                                |     3 | pass                        |
| This is a bridge between files you already control.                              |    10 | pass                        |
| Matches are suggestions.                                                         |     3 | pass                        |
| You make the final call.                                                         |     5 | pass                        |
| Read the privacy terms                                                           |     4 | pass                        |
| Reconcile statement files without changing your ledger.                          |     7 | pass                        |
| Privacy / Terms / Built by Param Factory / v1.2.0                                |     6 | pass (footer labels)        |
| Original illustration generated for this product.                                |     6 | pass                        |

Terminology is consistent: **statement**, **ledger**, **match/suggestion**, **reviewed rows**, and **audit report**. The short “bridge” motif is explained by the following sentence and does not replace the job headline.

### README

| Text                                                                                                                                               | Words | Result                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ----: | ----------------------------------------- |
| Statement Reconcile Bridge                                                                                                                         |     3 | pass (title)                              |
| Reconcile a downloaded bank statement with a private ledger without a bank login.                                                                  |    13 | pass                                      |
| It is for people who already keep a spreadsheet or local CSV and want a small monthly handoff tool instead of another budget app.                  |    24 | **F-1-2**                                 |
| The app reads CSV, OFX/QFX, and QIF statement files plus a ledger CSV.                                                                             |    13 | pass                                      |
| It normalizes payee text, proposes one-to-one exact-cent matches, lets you review every match, and exports accepted rows plus a JSON audit report. |    25 | **F-1-3, F-1-4**                          |
| Files stay in browser storage and are never sent to a server.                                                                                      |    12 | pass (listed local-only claim)            |
| The complete reconciliation flow is free.                                                                                                          |     6 | pass                                      |
| A $19 one-time optional license unlocks saved custom cleanup rules for recurring bank wording.                                                     |    14 | pass in length; checkout blocked by F-1-1 |
| Sociobot and Dodo handle payment and refunds.                                                                                                      |     7 | pass in copy; checkout blocked by F-1-1   |
| Payment details never enter this app.                                                                                                              |     6 | pass                                      |
| Run it                                                                                                                                             |     2 | pass (heading)                            |
| Open http://localhost:5173.                                                                                                                        |     2 | pass                                      |
| Use /work to import your statement and ledger files, or /demo for a ready-to-review sample that uses a separate local-storage namespace.           |    21 | pass                                      |
| The app works offline after its first visit because the service worker stores the app shell.                                                       |    16 | pass                                      |
| Verify and build                                                                                                                                   |     3 | pass (heading)                            |
| The static deployment output is dist/, with index.html at its root.                                                                                |    11 | pass                                      |
| The test suite includes the listed product claims, CSV export, local-only requests, and an offline demo reload.                                    |    17 | pass                                      |
| Privacy and limits                                                                                                                                 |     3 | pass (heading)                            |
| This app asks for no bank credentials.                                                                                                             |     7 | pass                                      |
| Matches are suggestions, not financial advice.                                                                                                     |     6 | **F-1-5**                                 |
| Review them before changing your primary ledger.                                                                                                   |     7 | pass                                      |
| See /privacy and /terms in the running app.                                                                                                        |     8 | pass                                      |
| License                                                                                                                                            |     1 | pass (heading)                            |
| MIT.                                                                                                                                               |     1 | pass                                      |
| See LICENSE.                                                                                                                                       |     2 | pass                                      |

## Demo, sandbox, and privacy checks

**Pass, except for the independent paid checkout finding.** From a fresh 390px context, one click on **Try it with sample data** opened /demo and immediately rendered 10 realistic statement-to-ledger review rows. The persistent banner read “Demo — sample data, nothing is saved”; it included **Reset demo** and **Start for real**. Before reset only demo:statement-reconcile-bridge:state and ...:audit existed. Reset left only the demo state; Start for real opened /work with two file inputs and left no demo or real storage key behind.

After a first online demo visit and service-worker readiness, a fresh offline reload returned 200 and showed all 10 matches. The manual demo flow made no cross-origin requests and no console errors. The real import/review/export network-interception coverage is also exercised by @claim:local-only.

## Claim execution

.factory/claims.json contains 18 entries. After fresh npm ci, every exact declared npm test -- --grep @claim:<id> invocation completed successfully:

| Claim IDs with passing declared command                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------- |
| sample-reconcile; demo-isolation; free-core-job; statement-file-formats; one-to-one-matching; manual-review; csv-export; audit-export |
| local-only; no-bank-login; offline-reload; paid-license; one-time-price; no-budget-advice; real-persistence; rules-local-only         |
| no-advertising-analytics; payment-handling                                                                                            |

npm test then passed **22/22**; npm run typecheck, npm run lint, and npm run build passed. The build emitted dist/; its main JavaScript was 22.30 kB (8.47 kB gzip) and CSS was 11.13 kB (3.28 kB gzip). The full suite covers the claimed demo, local-only privacy, offline reload, formats, exact cents, manual acceptance, audit export, persistence, dual-theme Axe, keyboard, and metadata regressions. F-1-1 shows that the existing payment/price fixtures do not exercise the real checkout destination; F-1-4 and F-1-5 are public claims with no inventory entry.

## Structure, accessibility, and links

- /, /demo, /work, /privacy, and /terms returned 200. A direct missing route returned the styled page with HTTP 404.
- The five public routes have a route title, one H1, description, canonical, OG/Twitter metadata, favicon, header/footer, skip link, and visible route focus behavior. The 404 exception is F-1-6.
- Browser Back restored the landing page after a privacy navigation; SPA route code announces and focuses the new H1. The local full suite’s light and dark Axe test passed with no serious or critical violations.
- /opt/fleet/lib/verify-url.sh passed live: HTTP 200, title, lang=en, one H1, a main landmark, image alt text, labelled buttons, and no load errors.
- Live hashed JS was Cache-Control: public, max-age=31536000, immutable and sw.js was no-cache. The CSP allowed only self plus https://api.sociobot.in for connections. No runtime third-party scripts or tracking requests were observed.
- Link crawl: every first-party link succeeded; the external checkout target failed as F-1-1.

## Earlier-review history

Before this report, the repository had no prior review or polish reports. I read verification.md, verification-2.md, verification-3.md, and the handoff. Their historical findings were checked from the live site and code:

| Earlier finding group                                                 | Current confirmation                                                                                                                                                                      |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Demo wrote to real storage; no real importer; demo data survived exit | Fixed: cold sample flow used only demo: keys; exit cleared them; /work shows statement and ledger file inputs.                                                                            |
| CSP blocked license verify; input errors invisible                    | Fixed in code/live policy: CSP contains connect-src self plus api.sociobot.in; current tests exercise visible errors.                                                                     |
| Missing claim categories; paid legal disclosure                       | The earlier listed categories now have 18 entries and current Terms names Sociobot/Dodo and refunds. F-1-4/F-1-5 are newly found distinct public claims; F-1-1 is a live checkout defect. |
| Slow mobile first read; small targets; focus reset; dark contrast     | Fixed: first-read elements were inside 390px viewport; full suite passed mobile-target, focus, and dual-theme Axe regressions.                                                            |
| Automatic/one-cent acceptance; malformed OFX; markup residue          | Fixed: current tests assert zero initially accepted demo rows, exact-cent matching, OFX rejection, and no <> markup.                                                                      |
| Cache/update behavior; 404; metadata/sitemap                          | Fixed except F-1-6: immutable hashed assets, a no-cache worker, /work in sitemap, and a real 404 are present. The 404 social/icon metadata remains incomplete.                            |

## Missed leverage

No AI step is implied by this local file-to-file reconciliation job. Imports, manual review, CSV export, and audit export are present, so an AI feature would be decorative rather than an obvious missing capability. The obvious missing leverage is not new functionality: make the existing paid checkout actually work (F-1-1).

## What would make this perfect

Make the live $19 checkout reachable and prove it with an end-to-end claim. Then shorten the two README sentences, remove or inventory the two unlisted claims, and add the shared social/icon metadata to the 404. Re-run the cold link crawl and the full claim suite; with those findings gone, the otherwise clear local-first demo and workbench would be pass-ready.
