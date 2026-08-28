# Adversarial first-read review 2 — FAIL

**Reviewed:** 2026-08-28  
**Live URL:** https://statement-reconcile-bridge.sociobot.in  
**Method:** Fresh Chromium contexts at 390×844 and 1440×900; fresh clean-clone install; every declared claim command; live route/link/metadata checks; storage, request, offline, keyboard, Axe, source, and history checks. No product code was changed.

## Verdict

**FAIL.** The core job is clear, usable, local-first, and tryable in one click. Three minor findings remain. A PASS requires zero findings.

## Cold first read

| Viewport | What it does                                                | For whom                                                                 | What to click first                                         |
| -------- | ----------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| 390×844  | Reconciles a downloaded statement against a private ledger. | People who keep a private budget file and check a monthly bank download. | **Try it with sample data** to see suggestions immediately. |
| 1440×900 | Same.                                                       | Same.                                                                    | Same.                                                       |

The exact visible text was “Reconcile your statement with your ledger,” “For people with a private budget file who need to check a monthly bank download,” and “Try it with sample data.” At 390 px their bottoms were 307, 403, and 469 px. At desktop they were 634, 718, and 794 px. There were no console or page errors. The concrete, paper, moss, and ledger-rule treatment follows the recorded visual thesis and is not a generic SaaS template.

## Findings

### F-2-1 — Minor — Twitter card metadata is incomplete

**Location / quote:** The live landing `<head>` contains only `<meta name="twitter:card" content="summary_large_image">`. It lacks `twitter:title`, `twitter:description`, and `twitter:image`. `/demo`, `/work`, `/privacy`, `/terms`, and the designed 404 have title and description but lack `twitter:image`.

**Why this fails:** The site-structure contract requires a Twitter card title, description, and product-owned 1200×630 image on every route. Open Graph fallback is not the required explicit route metadata.

**Concrete fix:** Add explicit `twitter:title`, `twitter:description`, and `twitter:image` to `index.html`; add `twitter:image` to the other route entries and `public/404.html`. Use the existing absolute `https://statement-reconcile-bridge.sociobot.in/social-workbench.webp` URL. Extend the metadata regression to assert all four Twitter fields for every route.

### F-2-2 — Minor — “Audit record” conflicts with the product’s “audit report” term

**Location / quote:** Landing step 3 says “Hand approved rows and an **audit record** back to your ledger.” The workbench button, claims inventory, README, and terminology table call the same output an **“audit report.”**

**Why this fails:** A first-time visitor is asked to learn two names for one download. The plain-words rule requires one term for one concept.

**Concrete fix:** Rewrite the landing sentence to: “Hand approved rows and an audit report back to your ledger.”

### F-2-3 — Minor — Cleanup-rule behavior is public copy without a matching claim entry

**Location / quote:** Landing: “Save recurring payee wording” and “Keep bank wording and ledger wording aligned before you review suggestions.” README: “Save local cleanup rules for recurring bank wording without an account.”

**Why this fails:** `rules-local-only` proves that a saved rule remains in local storage. It does not inventory or demonstrate the public behavior that the rule changes wording before matching. The current test saves a rule and checks its text after reload; it does not assert a changed suggestion or score.

**Concrete fix:** Add a `cleanup-rule-matching` claim and an `@claim:cleanup-rule-matching` test with a deliberately mismatched payee pair. Save a rule, rerun matching, and assert the observable updated suggestion, reason, or score. Alternatively remove the three behavior promises and retain only the already-tested storage statement.

## Demo, privacy, and offline check

One landing click opened `/demo`. Its first product screen already showed 10 statement rows, 11 ledger rows, and 10 realistic suggestions. The persistent banner read “Demo — sample data, nothing is saved,” with **Reset demo** and **Start for real**.

After accepting one suggestion, Reset restored 10 suggestions and zero accepted rows. The browser contained only `demo:statement-reconcile-bridge:*` keys plus an intentional sentinel real key; the sentinel stayed `untouched`. Start for real opened `/work`, removed every demo key, and did not show the banner. The complete flow made no off-origin request and logged no error. After one online `/demo` visit and service-worker readiness, a live offline reload returned HTTP 200 and rendered all 10 matches.

## Claim execution

`.factory/claims.json` has 15 entries. From a fresh clone at `/tmp/srb-review-bjhjsg`, after `npm ci`, each exact declared command passed; each ID occurs exactly once as an `@claim:` tag.

| Claim                    | Result |
| ------------------------ | ------ |
| sample-reconcile         | PASS   |
| demo-isolation           | PASS   |
| free-core-job            | PASS   |
| statement-file-formats   | PASS   |
| one-to-one-matching      | PASS   |
| manual-review            | PASS   |
| csv-export               | PASS   |
| audit-export             | PASS   |
| local-only               | PASS   |
| no-bank-login            | PASS   |
| offline-reload           | PASS   |
| no-budget-advice         | PASS   |
| real-persistence         | PASS   |
| rules-local-only         | PASS   |
| no-advertising-analytics | PASS   |

The confirming `npm test -- --grep @claim --workers=4` passed 15/15. The full suite passed 19/19; `npm run lint` and `npm run build` passed and the latter produced `dist/` (20.12 kB JavaScript, 7.66 kB gzip). F-2-3 is the only unlisted claim-like behavior found in the current landing page or README.

## Copy audit

Counts use whitespace-delimited words; code commands are not prose sentences. No item exceeds 22 words, uses a banned marketing adjective, or has a non-result-naming button. F-2-2 and F-2-3 are the exceptions below.

### Landing page

| Text                                                                             | Words | Result                              |
| -------------------------------------------------------------------------------- | ----: | ----------------------------------- |
| Private file-to-file reconciliation                                              |     3 | pass                                |
| Reconcile your statement with your ledger                                        |     6 | pass                                |
| For people with a private budget file who need to check a monthly bank download. |    15 | pass                                |
| Try it with sample data                                                          |     5 | pass                                |
| See suggested matches right away.                                                |     5 | pass                                |
| Start with your files                                                            |     4 | pass                                |
| Files stay in this browser.                                                      |     5 | listed local-only claim             |
| Works offline after the first visit.                                             |     6 | listed offline-reload claim         |
| Free for the full reconciliation job.                                            |     6 | listed free-core-job claim          |
| Two independent records.                                                         |     3 | pass                                |
| One small bridge.                                                                |     3 | pass                                |
| Three steps                                                                      |     2 | pass                                |
| Move through a monthly statement                                                 |     5 | pass                                |
| Import files                                                                     |     2 | pass                                |
| Add a bank CSV, OFX, or QIF and your ledger CSV.                                 |    12 | listed statement-file-formats claim |
| Review suggestions                                                               |     2 | pass                                |
| See one-to-one matches with the reason for each score.                           |    10 | listed one-to-one-matching claim    |
| Export reviewed rows                                                             |     3 | pass                                |
| Hand approved rows and an audit record back to your ledger.                      |    12 | **F-2-2**                           |
| Local cleanup rules                                                              |     3 | pass                                |
| Save recurring payee wording                                                     |     4 | **F-2-3**                           |
| Keep bank wording and ledger wording aligned before you review suggestions.      |    11 | **F-2-3**                           |
| Set a cleanup rule                                                               |     4 | pass                                |
| No bank login.                                                                   |     3 | listed no-bank-login claim          |
| No budget advice.                                                                |     3 | listed no-budget-advice claim       |
| This is a bridge between files you already control.                              |    10 | pass                                |
| Matches are suggestions.                                                         |     3 | listed manual-review claim          |
| You make the final call.                                                         |     5 | listed manual-review claim          |
| Read the privacy terms                                                           |     4 | pass                                |
| Reconcile statement files without changing your ledger.                          |     7 | pass                                |
| Privacy · Terms · Built by Param Factory · v1.2.0                                |     7 | footer labels                       |
| Original illustration generated for this product.                                |     6 | provenance; pass                    |

### README

| Text                                                                                                                                         | Words | Result                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ----: | ----------------------------------------- |
| Statement Reconcile Bridge                                                                                                                   |     3 | pass                                      |
| Reconcile a downloaded bank statement with a private ledger without a bank login.                                                            |    13 | listed no-bank-login claim                |
| It is for people with a spreadsheet or local CSV who need a monthly handoff tool, not another budget app.                                    |    20 | pass                                      |
| The app reads CSV, OFX/QFX, and QIF statement files plus a ledger CSV.                                                                       |    13 | listed statement-file-formats claim       |
| It proposes one-to-one exact-cent matches.                                                                                                   |     5 | listed one-to-one-matching claim          |
| Review each match.                                                                                                                           |     3 | listed manual-review claim                |
| Export accepted rows and a JSON audit report.                                                                                                |     8 | listed csv-export and audit-export claims |
| Files stay in browser storage and are never sent to a server.                                                                                |    12 | listed local-only claim                   |
| The complete reconciliation flow is free.                                                                                                    |     6 | listed free-core-job claim                |
| Save local cleanup rules for recurring bank wording without an account.                                                                      |    11 | **F-2-3**                                 |
| Run it                                                                                                                                       |     2 | pass                                      |
| Open `http://localhost:5173`.                                                                                                                |     2 | pass                                      |
| Use `/work` to import your statement and ledger files, or `/demo` for a ready-to-review sample that uses a separate local-storage namespace. |    21 | pass                                      |
| The app works offline after its first visit because the service worker stores the app shell.                                                 |    16 | listed offline-reload claim               |
| Verify and build                                                                                                                             |     3 | pass                                      |
| The static deployment output is `dist/`, with `index.html` at its root.                                                                      |    11 | pass                                      |
| The test suite includes the listed product claims, CSV export, local-only requests, and an offline demo reload.                              |    17 | pass                                      |
| Privacy and limits                                                                                                                           |     3 | pass                                      |
| This app asks for no bank credentials.                                                                                                       |     7 | listed no-bank-login claim                |
| Matches are suggestions.                                                                                                                     |     3 | listed manual-review claim                |
| Review them before relying on them.                                                                                                          |     6 | listed manual-review claim                |
| See `/privacy` and `/terms` in the running app.                                                                                              |     8 | pass                                      |
| License                                                                                                                                      |     1 | pass                                      |
| MIT.                                                                                                                                         |     1 | pass                                      |
| See [LICENSE](LICENSE).                                                                                                                      |     2 | pass                                      |

## Structure, routes, accessibility, and links

- `/`, `/demo`, `/work`, `/privacy`, and `/terms` returned 200; a fresh `/missing-review-2` request returned the designed 404 with HTTP 404.
- Each checked route has one H1, one main landmark, a route-specific title, description, canonical URL, favicon, Apple touch icon, Open Graph metadata, shared header/footer, and Privacy/Terms links. F-2-1 is the Twitter exception.
- Direct deep links work. A Privacy navigation moved focus and the polite route announcement to its H1; browser Back restored the landing route and focused its H1. All crawled first-party destinations returned 200, except the intentionally requested missing route at 404.
- Axe found zero serious or critical violations across the six checked routes in both light and dark color schemes. There was no console error.
- The live CSP permits only same-origin connections. Request capture over the demo-to-real flow recorded no third-party or analytics request.

## Earlier-finding verification

Every earlier review, polish, verification, and handoff record was read. The following checks confirm the former findings are fixed in both the deployed product and current source, not merely marked fixed.

| Earlier finding                                 | Current verification                                                                                                                                                         |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F-1-1 dead $19 checkout                         | Fixed: paid UI, price, checkout, and payment copy are absent from live/source; all current links resolve.                                                                    |
| F-1-2 overlong README audience sentence         | Fixed: current sentence is 20 words.                                                                                                                                         |
| F-1-3 overlong README capability sentence       | Fixed: current capability copy is three sentences of 5, 3, and 8 words.                                                                                                      |
| F-1-4 unlisted payee-normalisation promise      | Fixed: that promise is absent from README and landing copy.                                                                                                                  |
| F-1-5 “not financial advice” claim              | Fixed: replaced by the tested manual-review wording.                                                                                                                         |
| F-1-6 missing 404 social metadata               | Fixed for the prior fields: live 404 has canonical, Apple icon, OG title/description/image, and Twitter card/title/description. F-2-1 separately identifies `twitter:image`. |
| Verification P0 demo wrote real storage         | Fixed: live sample action writes only `demo:` keys; sentinel real storage was untouched.                                                                                     |
| Verification P0 no real import route            | Fixed: `/work` exposes statement and ledger file inputs.                                                                                                                     |
| Verification P1 CSP blocked billing             | Fixed by removal: no billing or license path remains; CSP has `connect-src 'self'`.                                                                                          |
| Verification P1 errors hidden                   | Fixed: current malformed-input regression passes with an alert and recovery.                                                                                                 |
| Verification P1 incomplete claims               | Fixed for former listed claims; F-2-3 identifies one distinct current behavior claim.                                                                                        |
| Verification P1 mobile performance              | Fixed: the production build remains within the stated asset budgets.                                                                                                         |
| Verification P2 cache/update                    | Fixed: worker is `no-cache`; offline reload works after first visit.                                                                                                         |
| Verification P2 missing 404                     | Fixed: live missing route is a designed HTTP 404.                                                                                                                            |
| Verification P2 undersized targets              | Fixed: current mobile/keyboard regression passes.                                                                                                                            |
| Verification P2 route focus/announcement        | Fixed: live navigation and Back move focus and populate `#route-note`.                                                                                                       |
| Verification-2 P0 mobile first screen           | Fixed: cold 390 px measurements place H1, audience, and CTA in viewport.                                                                                                     |
| Verification-2 P0 automatic/one-cent acceptance | Fixed: claim tests and full suite pass explicit-review and exact-cent checks.                                                                                                |
| Verification-2 P1 dark contrast                 | Fixed: live dark Axe has zero serious/critical violations.                                                                                                                   |
| Verification-2 P1 malformed OFX                 | Fixed: current regression rejects malformed OFX and announces recovery.                                                                                                      |
| Verification-2 P1 focus after review            | Fixed: current keyboard regression retains focus on Undo acceptance.                                                                                                         |
| Verification-2 P1 unlisted public claims        | Fixed for the prior list; see the new, separate F-2-3.                                                                                                                       |
| Verification-2 P1 paid legal disclosure         | Fixed by removal of the paid feature and its legal claims.                                                                                                                   |
| Verification-2 P2 mobile target sizes           | Fixed: current mobile regression passes.                                                                                                                                     |
| Verification-2 P2 demo keys on header exit      | Fixed: live exit removes every demo key.                                                                                                                                     |
| Verification-2 P2 literal `<>` residue          | Fixed: live workbench has no such text; metadata regression passes.                                                                                                          |
| Verification-2 P2 route metadata/sitemap        | Fixed for sitemap, non-home OG/Twitter title/description, and 404 skeleton; F-2-1 is the remaining Twitter-image detail.                                                     |

## Missed leverage

No missing AI step was found. This is a local file-to-file reconciliation job, and an AI call would add data exposure without being necessary to import, suggest, review, or export. The expected import, explicit review, CSV export, audit export, offline use, and cleanup-rule facility are present.

## What would make this perfect

Add complete Twitter-card fields, use “audit report” everywhere, and either test the cleanup-rule matching behavior as a named claim or remove that promise. Then rerun this same clean-clone, live-browser review with zero findings.
