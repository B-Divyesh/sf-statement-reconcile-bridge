# Adversarial first-read review 4 — FAIL

**Reviewed:** 2026-08-28  
**Live URL:** https://statement-reconcile-bridge.sociobot.in  
**Method:** fresh Chromium contexts at 390×844 and 1440×900; a fresh remote clone and `npm ci`; every declared claim command; live demo, storage, request, route, metadata, link, keyboard, and Axe checks; full prior-review history check. Product code was not changed.

## Verdict

**FAIL.** The core job is clear on the first screen and the one-click demo is usable and isolated. Two minor copy/claims findings remain. A PASS requires zero findings.

## Cold first read, before scrolling

| Viewport | What it does                                                  | For whom                                                              | First click                                           |
| -------- | ------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------- |
| 390×844  | Reconciles a downloaded bank statement with a private ledger. | People using a private budget file who check a monthly bank download. | **Try it with sample data** to see suggested matches. |
| 1440×900 | Same.                                                         | Same.                                                                 | Same.                                                 |

The first-screen H1, audience sentence, and sample action ended at 307 px, 403 px, and 469 px respectively on mobile; all were visible before the 844 px fold. Desktop positions were 634 px, 718 px, and 794 px respectively before the 900 px fold. There were no console or page errors on either successful route load.

## Findings

### F-4-1 — Minor — The hero caption ends with an information-free metaphor

**Location / quote:** Landing hero caption: “Two independent records. **One small bridge.**”

**Why this fails:** “One small bridge” is a product-name metaphor, not information a first-time visitor can use. It violates the plain-words rule against slogans and metaphor copy, even though the H1 itself already explains the job.

**Concrete fix:** Remove the caption’s second sentence, or rewrite the caption as “Compare statement rows with ledger rows.”

### F-4-2 — Minor — The footer’s no-change promise is not in `claims.json`

**Location / quote:** Landing footer: “Reconcile statement files **without changing your ledger.**”

**Why this fails:** This is a valuable product behavior a visitor can rely on, but no claim inventories and proves it. `local-only` records off-origin requests and `free-core-job` exercises import/review/export; neither asserts that the selected ledger input remains unchanged throughout that flow.

**Concrete fix:** Add `input-files-unchanged` to `.factory/claims.json` and an `@claim:input-files-unchanged` browser test that retains a ledger fixture’s original bytes, imports it, accepts a match, exports, and asserts the selected ledger file bytes are unchanged. If that behavior will not be claimed, remove “without changing your ledger.”

## Copy audit

Counts use whitespace-delimited words; hyphenated terms, file formats, and URLs count as one. The audit includes visible landing and README copy once rather than repeating header/footer labels. No entry exceeds 22 words and no banned marketing adjective appears. F-4-1 and F-4-2 are the only flags.

### Landing page

| Copy                                                                             | Words | Result                                        |
| -------------------------------------------------------------------------------- | ----: | --------------------------------------------- |
| Statement Bridge                                                                 |     2 | product wordmark                              |
| Reconcile files                                                                  |     2 | clear nav label                               |
| Demo                                                                             |     1 | clear nav label                               |
| Privacy                                                                          |     1 | clear nav label                               |
| Private file-to-file reconciliation                                              |     3 | descriptive eyebrow                           |
| Reconcile your statement with your ledger                                        |     6 | clear H1                                      |
| For people with a private budget file who need to check a monthly bank download. |    15 | clear audience sentence                       |
| Try it with sample data                                                          |     5 | result-naming primary action                  |
| See suggested matches right away.                                                |     5 | `sample-reconcile`                            |
| Start with your files                                                            |     4 | result-naming action                          |
| Files stay in this browser.                                                      |     5 | `local-only`                                  |
| Works offline after the first visit.                                             |     6 | `offline-reload`                              |
| Free for the full reconciliation job.                                            |     6 | `free-core-job`                               |
| Two independent records.                                                         |     3 | describes the two inputs                      |
| One small bridge.                                                                |     3 | **F-4-1**                                     |
| Three steps                                                                      |     2 | clear section label                           |
| Move through a monthly statement                                                 |     5 | clear procedural heading                      |
| Import files                                                                     |     2 | clear step heading                            |
| Add a bank CSV, OFX, or QIF and your ledger CSV.                                 |    11 | `statement-file-formats`                      |
| Review suggestions                                                               |     2 | clear step heading                            |
| See one-to-one matches with the reason for each score.                           |     9 | `one-to-one-matching`, `match-score-reasons`  |
| Export reviewed rows                                                             |     3 | clear step heading                            |
| Hand approved rows and an audit report back to your ledger.                      |    11 | `csv-export`, `audit-export`, `manual-review` |
| Local cleanup rules                                                              |     3 | clear section label                           |
| Save recurring payee wording                                                     |     4 | clear heading                                 |
| Keep bank wording and ledger wording aligned before you review suggestions.      |    11 | `cleanup-rule-matching`                       |
| Set a cleanup rule                                                               |     4 | result-naming action                          |
| No bank login.                                                                   |     3 | `no-bank-login`                               |
| No budget advice.                                                                |     3 | `no-budget-advice`                            |
| This is a bridge between files you already control.                              |     9 | useful scope limit                            |
| Matches are suggestions.                                                         |     3 | `manual-review`                               |
| You make the final call.                                                         |     5 | `manual-review`                               |
| Read the privacy terms                                                           |     4 | result-naming action                          |
| Reconcile statement files without changing your ledger.                          |     7 | **F-4-2**                                     |
| Terms                                                                            |     1 | clear footer link                             |
| Built by Param Factory                                                           |     4 | attribution                                   |
| v1.2.0                                                                           |     1 | build label                                   |
| Original illustration generated for this product.                                |     6 | asset provenance                              |

### README

| Copy                                                                                                                                                  | Words | Result                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----: | ------------------------------------------- |
| Statement Reconcile Bridge                                                                                                                            |     3 | clear product title                         |
| Reconcile a downloaded bank statement with a private ledger without a bank login.                                                                     |    13 | `no-bank-login`                             |
| It is for people with a spreadsheet or local CSV who need a monthly handoff tool, not another budget app.                                             |    20 | clear audience sentence                     |
| The app reads CSV, OFX/QFX, and QIF statement files plus a ledger CSV.                                                                                |    13 | `statement-file-formats`                    |
| It proposes one-to-one exact-cent matches.                                                                                                            |     5 | `one-to-one-matching`                       |
| Review each match.                                                                                                                                    |     3 | `manual-review`                             |
| Export accepted rows and a JSON audit report.                                                                                                         |     8 | `csv-export`, `audit-export`                |
| Files stay in browser storage and are never sent to a server.                                                                                         |    12 | `local-only`                                |
| The complete reconciliation flow is free.                                                                                                             |     6 | `free-core-job`                             |
| Save local cleanup rules for recurring bank wording before matching.                                                                                  |    10 | `cleanup-rule-matching`, `rules-local-only` |
| Run it                                                                                                                                                |     2 | clear heading                               |
| Open `http://localhost:5173`.                                                                                                                         |     2 | useful instruction                          |
| Use `/work` to import your statement and ledger files, or `/demo` (or `/?demo=1`) for a ready-to-review sample in a separate local-storage namespace. |    22 | `demo-isolation`                            |
| The app works offline after its first visit because the service worker stores the app shell.                                                          |    16 | `offline-reload`                            |
| Verify and build                                                                                                                                      |     3 | clear heading                               |
| The static deployment output is `dist/`, with `index.html` at its root.                                                                               |    11 | useful instruction                          |
| The test suite includes the listed product claims, CSV export, local-only requests, and an offline demo reload.                                       |    17 | verification instruction                    |
| Privacy and limits                                                                                                                                    |     3 | clear heading                               |
| This app asks for no bank credentials.                                                                                                                |     7 | `no-bank-login`                             |
| Matches are suggestions.                                                                                                                              |     3 | `manual-review`                             |
| Review them before relying on them.                                                                                                                   |     6 | `manual-review`                             |
| See `/privacy` and `/terms` in the running app.                                                                                                       |     6 | useful instruction                          |
| License                                                                                                                                               |     1 | clear heading                               |
| MIT.                                                                                                                                                  |     1 | license identifier                          |
| See LICENSE.                                                                                                                                          |     2 | useful instruction                          |

Terminology is consistent: **statement**, **ledger**, **match/suggestion**, **reviewed rows**, **cleanup rule**, and **audit report**. CSV, OFX/QFX, and QIF are necessary named file formats, not unexplained marketing jargon.

## Demo, sandbox, privacy, and offline

From a fresh 390 px live context, **Try it with sample data** opened `/demo` in one click. Its first screen already contained the reconciliation workbench: 10 statement rows, 11 ledger rows, 10 suggested rows, and the persistent “Demo — sample data, nothing is saved” banner.

After accepting a row, only `demo:statement-reconcile-bridge:` keys existed; there were no `real:` keys. **Reset demo** restored zero accepted rows and left only its demo state. **Start for real** opened `/work`, rendered two file inputs, and removed all demo keys. A Playwright request log for this demo-to-real flow recorded no off-origin request. The clean-clone `@claim:offline-reload` test also passed from a fresh service-worker visit.

## Claims and clean-clone verification

Fresh clone: `/tmp/srb-review4-PJdnsY/repo`, cloned from the specified remote, then `npm ci` (22 packages, zero vulnerabilities). Every exact command named by the 17 `claims.json` entries passed individually:

| Claim id                   | Result |
| -------------------------- | ------ |
| `sample-reconcile`         | pass   |
| `demo-isolation`           | pass   |
| `free-core-job`            | pass   |
| `statement-file-formats`   | pass   |
| `one-to-one-matching`      | pass   |
| `match-score-reasons`      | pass   |
| `manual-review`            | pass   |
| `csv-export`               | pass   |
| `audit-export`             | pass   |
| `local-only`               | pass   |
| `no-bank-login`            | pass   |
| `offline-reload`           | pass   |
| `no-budget-advice`         | pass   |
| `real-persistence`         | pass   |
| `rules-local-only`         | pass   |
| `cleanup-rule-matching`    | pass   |
| `no-advertising-analytics` | pass   |

The mechanical inventory check found exactly one `@claim:<id>` test tag for each claim. In the same fresh clone, `npm run typecheck`, `npm run lint`, `npm test -- --workers=1` (22/22), and `npm run build` passed. Build output is 21.64 kB JavaScript (8.10 kB gzip), 11.01 kB CSS (3.25 kB gzip), and the 89.38 kB product-owned hero image.

## Structure, accessibility, links, and identity

- Live `/`, `/demo`, `/work`, `/privacy`, and `/terms` returned 200. A random missing route returned the designed 404 with HTTP 404, one H1, a main landmark, header/footer, a home link, canonical, favicon/Apple icon, and complete Open Graph/Twitter fields.
- Each successful route had one H1, a route-specific title, description, canonical, Open Graph/Twitter image metadata, consistent header/footer, and Privacy/Terms links. All discovered first-party links returned 200; the missing-page skip target returned its intentional 404 page.
- A live History API check moved focus and the polite route announcement to “Your files stay on your device” on Privacy, then back to the landing H1.
- Live mobile Axe on `/`, `/demo`, `/work`, `/privacy`, and `/terms` found no serious or critical issues. The 390 px first-screen load and successful routes had no console or page errors.
- The concrete, ink, moss, ledger-serif surface, paper workbench art, hard rules, and square controls are distinct from a generic SaaS template and match `.factory/design.md`. Local system fonts and same-origin assets avoid third-party font/script requests.

## Earlier finding verification

All previous review findings were rechecked in current live behavior and source; none is merely marked fixed.

| Earlier finding                       | Current confirmation                                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| F-1-1 dead paid checkout              | Fixed by removal: no price, checkout, license, payment, or external billing link remains; live crawl passes. |
| F-1-2 / F-1-3 README length           | Fixed: audience is 20 words; capabilities are separate 5-, 3-, and 8-word sentences.                         |
| F-1-4 unlisted payee normalisation    | Fixed: promise remains absent.                                                                               |
| F-1-5 financial-advice wording        | Fixed: current manual-review wording is listed and tested.                                                   |
| F-1-6 404 social metadata             | Fixed: live 404 contains canonical, icon, OG, and complete Twitter metadata.                                 |
| F-2-1 Twitter image/title/description | Fixed on every live route and 404.                                                                           |
| F-2-2 audit-record terminology        | Fixed: landing, workbench, README, and inventory use “audit report.”                                         |
| F-2-3 cleanup-rule behavior           | Fixed: `cleanup-rule-matching` recalculates the visible score and reason.                                    |
| F-3-1 calendar-invalid CSV/QIF dates  | Fixed: current regression rejects them with an announced error before matching.                              |
| F-3-2 explanation claim               | Fixed: `match-score-reasons` covers high, caution, and open rows.                                            |

The earlier independent verification defects were also retained as fixed: demo isolation and a real importer; visible input errors; claim coverage; mobile first screen and 44 px controls; offline/update behavior; real 404; route focus; explicit human acceptance and exact-cent matching; dark contrast; strict OFX/date parsing; demo cleanup on header exit; valid workbench markup; sitemap/metadata; and removal of unavailable paid billing. Current source and the passing clean-clone tests above confirm those closures.

## Missed leverage

No missing AI feature was found. The brief and implemented job are a deterministic local file comparison; an AI step would not improve the core exact-cent, human-review workflow. The expected import, cleanup-rule, audit, and CSV export paths are present.

## What would make this perfect

Remove the “One small bridge” slogan and either test or remove the footer’s no-change promise. With those two items resolved, this review found no further blocker or minor defect.
