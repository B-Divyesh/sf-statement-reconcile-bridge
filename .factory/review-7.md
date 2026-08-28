# Adversarial first-read review 7 — PASS

Reviewed 2026-08-28 against the live deployment and a fresh clone of commit
`82b18d7c98b610f8db2f9f40ba1fc528a0db91c7`.

## Verdict

**PASS.** There are zero blocking or minor findings. The page says what it
does, who it is for, and what to do first before scrolling at both 390×844 and
1440×900. The one-click demo immediately shows a realistic reconciliation and
is isolated from real storage. Every declared claim was run independently from
a clean clone and passed.

## Cold first read, before scrolling

At 390×844 and 1440×900, the first screen says:

> Reconcile your statement with your ledger

> For people with a private ledger who need to check a monthly bank download.

> Try it with sample data — See suggested matches right away.

Interpretation: this compares a downloaded bank statement with an existing
private ledger for a person checking a monthly download. Click **Try it with
sample data** first to open the preloaded comparison; **Start with your files**
is the real-work alternative. All three decision facts are visible: files stay
in the browser, the app works offline after first visit, and the full job is
free. Their respective bottoms were 624.17, 652.17, and 680.17 px on mobile;
672.03, 700.03, and 728.03 px on desktop.

## Copy audit

Whitespace-delimited counts treat `file-to-file`, `OFX/QFX`, URLs, and version
strings as one word. Navigation and repeated footer labels are listed once.
No item exceeds 22 words, contains a banned marketing adjective, uses a vague
or metaphor heading, or gives two names to one product concept. All buttons
name their outcome or next result. Every product-reliance sentence maps to a
claim in `.factory/claims.json`.

### Landing page

| Copy                                                                        | Words | Check                                         |
| --------------------------------------------------------------------------- | ----: | --------------------------------------------- |
| Skip to main content                                                        |     4 | Clear skip link                               |
| Statement Bridge                                                            |     2 | Product wordmark                              |
| Reconcile files                                                             |     2 | Clear navigation action                       |
| Demo                                                                        |     1 | Clear navigation label                        |
| Privacy                                                                     |     1 | Clear navigation label                        |
| Private file-to-file reconciliation                                         |     3 | Descriptive eyebrow                           |
| Reconcile your statement with your ledger                                   |     6 | Plain job headline                            |
| For people with a private ledger who need to check a monthly bank download. |    14 | Audience and situation                        |
| Try it with sample data                                                     |     5 | Result-naming primary action                  |
| See suggested matches right away.                                           |     5 | `sample-reconcile`                            |
| Start with your files                                                       |     4 | Result-naming real-work action                |
| Files stay in this browser.                                                 |     5 | `local-only`                                  |
| Works offline after the first visit.                                        |     6 | `offline-reload`                              |
| Free for the full reconciliation job.                                       |     6 | `free-core-job`                               |
| Three steps                                                                 |     2 | Descriptive section label                     |
| Reconcile files in three steps                                              |     5 | Job-specific heading                          |
| Import files                                                                |     2 | Clear step heading                            |
| Add a bank CSV, OFX, or QIF and your ledger CSV.                            |    11 | `statement-file-formats`                      |
| Review suggestions                                                          |     2 | Clear step heading                            |
| See one-to-one matches with the reason for each score.                      |     9 | `one-to-one-matching`, `match-score-reasons`  |
| Export reviewed rows                                                        |     3 | Clear step heading                            |
| Hand approved rows and an audit report back to your ledger.                 |    11 | `csv-export`, `audit-export`, `manual-review` |
| Local cleanup rules                                                         |     3 | Descriptive section label                     |
| Save recurring payee wording                                                |     4 | Clear section heading                         |
| Keep bank wording and ledger wording aligned before you review suggestions. |    11 | `cleanup-rule-matching`                       |
| Set a cleanup rule                                                          |     4 | Result-naming action                          |
| No bank login.                                                              |     3 | `no-bank-login`                               |
| No budget advice.                                                           |     3 | `no-budget-advice`                            |
| It compares the statement and ledger files you choose.                      |     9 | `free-core-job`                               |
| Matches are suggestions.                                                    |     3 | `manual-review`                               |
| You make the final call.                                                    |     5 | `manual-review`                               |
| Read the privacy details                                                    |     4 | Names the destination                         |
| Reconcile statement files without changing your ledger.                     |     7 | `input-files-unchanged`                       |
| Terms                                                                       |     1 | Clear legal link                              |
| Built by Param Factory                                                      |     4 | Attribution                                   |
| v1.2.0                                                                      |     1 | Build label                                   |
| Original illustration generated for this product.                           |     6 | Asset provenance                              |

### README

| Copy                                                                                                                                                  | Words | Check                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----: | ------------------------------------------- |
| Statement Reconcile Bridge                                                                                                                            |     3 | Clear title                                 |
| Reconcile a downloaded bank statement with a private ledger without a bank login.                                                                     |    13 | `no-bank-login`                             |
| It is for people who compare a monthly bank download with a spreadsheet or ledger CSV.                                                                |    16 | Audience and job                            |
| The app reads CSV, OFX/QFX, and QIF statement files plus a ledger CSV.                                                                                |    13 | `statement-file-formats`                    |
| It proposes one-to-one exact-cent matches.                                                                                                            |     5 | `one-to-one-matching`                       |
| Review each match.                                                                                                                                    |     3 | `manual-review`                             |
| Export accepted rows and a JSON audit report.                                                                                                         |     8 | `csv-export`, `audit-export`                |
| Files stay in browser storage and are never sent to a server.                                                                                         |    12 | `local-only`                                |
| The complete reconciliation flow is free.                                                                                                             |     6 | `free-core-job`                             |
| Save local cleanup rules for recurring bank wording before matching.                                                                                  |    10 | `cleanup-rule-matching`, `rules-local-only` |
| Run it                                                                                                                                                |     2 | Clear heading                               |
| Open `http://localhost:5173`.                                                                                                                         |     2 | Useful instruction                          |
| Use `/work` to import your statement and ledger files, or `/demo` (or `/?demo=1`) for a ready-to-review sample in a separate local-storage namespace. |    22 | `demo-isolation`                            |
| The app works offline after its first visit because the service worker stores the app shell.                                                          |    16 | `offline-reload`                            |
| Verify and build                                                                                                                                      |     3 | Clear heading                               |
| The static deployment output is `dist/`, with `index.html` at its root.                                                                               |    11 | Useful instruction                          |
| The test suite includes the listed product claims, CSV export, local-only requests, and an offline demo reload.                                       |    17 | Verification instruction                    |
| Privacy and limits                                                                                                                                    |     3 | Clear heading                               |
| This app asks for no bank credentials.                                                                                                                |     7 | `no-bank-login`                             |
| Matches are suggestions.                                                                                                                              |     3 | `manual-review`                             |
| Review them before relying on them.                                                                                                                   |     6 | `manual-review`                             |
| See `/privacy` and `/terms` in the running app.                                                                                                       |     8 | Useful instruction                          |
| License                                                                                                                                               |     1 | Clear heading                               |
| MIT.                                                                                                                                                  |     1 | License identifier                          |
| See [LICENSE](LICENSE).                                                                                                                               |     2 | Useful instruction                          |

Terminology is consistent: **statement**, **ledger**, **match**,
**suggestion**, **reviewed rows**, **cleanup rule**, and **audit report**.

## Demo, sandbox, privacy, and offline

From a fresh 390px context, one click on **Try it with sample data** opened
`/demo`. The immediate screen showed the persistent banner, the 10-to-11 row
sample count, and the first realistic statement-to-ledger match at y=544.44–
815.94. It included both payees, dates, amounts, a 95% reason, and Accept /
Reject actions.

The banner says **“Demo — sample data, nothing is saved”** and exposes both
**Reset demo** and **Start for real**. After accepting the first sample match,
browser Back removed all `demo:` keys. Forward returned a fresh demo with zero
accepted rows. Reset restored the sample without accepted rows. Start for real
left no demo or real key. Requests throughout the landing, demo, real-work,
privacy, and export flow were same-origin only. The independent
`offline-reload` claim test passed from a fresh context after service-worker
installation.

## Claim execution and build

Fresh clone: `/tmp/statement-reconcile-bridge-review-7.Kw4dXk`, installed with
`npm ci` (22 packages, zero vulnerabilities). Each exact command declared in
`.factory/claims.json` was run independently and passed:

| Claim IDs                                                                       | Result |
| ------------------------------------------------------------------------------- | ------ |
| sample-reconcile; demo-isolation; free-core-job; input-files-unchanged          | PASS   |
| statement-file-formats; one-to-one-matching; match-score-reasons; manual-review | PASS   |
| csv-export; audit-export; local-only; no-bank-login                             | PASS   |
| offline-reload; no-budget-advice; real-persistence; rules-local-only            | PASS   |
| cleanup-rule-matching; no-advertising-analytics                                 | PASS   |

`npm test -- --workers=1` passed 24/24. `npm run typecheck`, `npm run lint`,
and `npm run build` passed. The build produced `dist/` with 21.98 kB JavaScript
(8.17 kB gzip), 11.02 kB CSS (3.26 kB gzip), and an 89.38 kB original hero
asset. SHA-256 checks confirmed the live JavaScript, CSS, and service worker
equal the tested `dist/` files.

## Structure, accessibility, links, and identity

Live `/`, `/demo`, `/work`, `/privacy`, `/terms`, and a real 404 were checked
directly. Each has a route-specific title, one H1, one main landmark, `lang`,
description, canonical, favicon, Apple touch icon, Open Graph, and Twitter
metadata. The 404 returns HTTP 404 and offers a home link. The five first-party
link targets (`/`, `/work`, `/demo`, `/privacy`, `/terms`) returned 200.

SPA navigation moved focus to the destination H1 and Back restored focus to the
home H1. Axe found zero serious or critical violations on every route. Successful
routes produced no console errors. The expected browser network message for the
404 document itself was the only error seen on that intentionally failing URL.

The concrete-and-moss statement/ledger imagery, dotted paper ground, serif
display face, dark-green actions, and stamped match cards are product-specific;
the visual result is not a generic SaaS-template surface. The hero art is
original and its provenance is stated in the footer and design record.

## Earlier-finding verification

Every `review-*.md`, `polish-*.md`, verification report, and previous handoff
was read. Each earlier finding was reconfirmed against the current deployed
build and source; none is merely marked fixed.

| Earlier IDs    | Current confirmation                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| F-1-1          | Paid checkout, price, license, and payment promises remain absent; all discovered links resolve.                                                 |
| F-1-2, F-1-3   | README audience/capability copy remains at or under the 22-word cap.                                                                             |
| F-1-4, F-1-5   | Unlisted normalisation and financial-advice wording remain absent; current review language is claimed and tested.                                |
| F-1-6, F-2-1   | The live 404 and all public routes retain complete canonical, icon, OG, and Twitter metadata.                                                    |
| F-2-2          | The JSON download is consistently called an audit report.                                                                                        |
| F-2-3          | A saved cleanup rule recalculates the visible matching score and reason under `cleanup-rule-matching`.                                           |
| F-3-1          | Source validation and regression tests reject calendar-invalid CSV, QIF, and OFX dates before matching.                                          |
| F-3-2          | `match-score-reasons` covers high-confidence, caution, and open explanations.                                                                    |
| F-4-1          | The information-free “One small bridge” slogan remains absent.                                                                                   |
| F-4-2          | `input-files-unchanged` retains original input bytes through import, review, and export.                                                         |
| F-5-1          | All three first-screen facts remain inside the 1440×900 viewport.                                                                                |
| F-5-2          | The current copy audit includes the prior omissions and accurate counts.                                                                         |
| F-6-1          | Live Back/Forward, direct exit, Reset, and Start-for-real clear demo state while preserving real isolation.                                      |
| F-6-2          | The first sample match is visible on the first 390×844 demo viewport.                                                                            |
| F-6-3 to F-6-7 | The current audience term, three-step heading, scope sentence, privacy-link label, and README audience sentence use direct, consistent language. |

## Missed leverage

No missing AI feature is implied: reconciliation needs deterministic parsing,
exact-cent matching, and human review, all of which are present. Adding an AI
step would be decorative. The obvious import, review, cleanup, CSV export, and
audit-export paths are available and tested.

## What would make this perfect

No product change is required by this review. Keep the claim inventory and the
fresh-context browser coverage in step with future copy or behavior changes;
retain the explicit demo-isolation checks for browser history transitions.
