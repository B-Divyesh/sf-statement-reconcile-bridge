# Adversarial first-read review 6 — FAIL

**Reviewed:** 2026-08-28  
**Live URL:** https://statement-reconcile-bridge.sociobot.in  
**Method:** fresh Playwright Chromium contexts at 390×844 and 1440×900;
fresh remote clone at `04c2f942c5561494a83946bef18c85bdf5847f59`; every
declared claim command; live demo, storage, offline, history, link, metadata,
request, console, and Axe checks; current source and all earlier review,
polish, verification, and handoff records. No product code was changed.

## Verdict

**FAIL.** Two blocking demo defects and five plain-copy defects remain. The
demo keeps changed sample state after the visitor exits with browser Back, and
the first mobile screen after entering the demo contains no transaction or
suggested match. A PASS requires zero findings.

## Cold first read, before scrolling

Both fresh contexts answer the three required questions.

| Viewport | What it does                                       | For whom                                                                         | What to click first                                   |
| -------- | -------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------- |
| 390×844  | Reconciles a bank statement with a private ledger. | People checking a monthly bank download against a private ledger or budget file. | **Try it with sample data** to see suggested matches. |
| 1440×900 | Same.                                              | Same.                                                                            | Same.                                                 |

The exact first-screen text is **“Reconcile your statement with your ledger,”**
**“For people with a private budget file who need to check a monthly bank
download,”** and **“Try it with sample data.”** On mobile their bottoms are
306.67 px, 403.17 px, and 469.17 px. The real-work action and all three plain
facts are also visible by 680.17 px. On desktop all three facts end by 728.03
px. Neither cold load logged a console or page error.

## Findings

### F-6-1 — BLOCKING — Browser Back preserves changed demo state after exit

**Location / quote:** Demo banner: **“Demo — sample data, nothing is saved.”**
`.factory/claims.json` says: **“Sample data uses a separate demo namespace that
is removed on exit.”** `.factory/demo.md` says: **“Leaving through any
navigation discards it.”**

**Evidence:** From a fresh landing visit, enter the demo, accept the first
match, and press browser Back. The landing page still has both
`demo:statement-reconcile-bridge:state` and
`demo:statement-reconcile-bridge:audit`. Browser Forward returns to `/demo`
with one accepted match still present. The real namespace remains untouched,
but the changed demo data was not discarded. In source, link navigation calls
`clearDemoStorage()` in `nav()`, while the `popstate` handler only calls
`render()`.

**Why this fails:** Back is a normal way to leave a demo. The live behavior
contradicts both the public isolation claim and its documentation. The passing
`@claim:demo-isolation` test checks **Start for real** and a header link, but
does not exercise browser history, so it does not prove the whole claim.

**Concrete fix:** Clear the prior demo namespace whenever a history transition
leaves demo mode, before switching roots. Extend `@claim:demo-isolation` with:
landing → demo → accept → `page.goBack()` → assert no `demo:` keys →
`page.goForward()` → assert zero accepted rows. Also cover a direct address-bar
exit if the implementation promises “any navigation.”

### F-6-2 — BLOCKING — The first mobile demo screen shows no sample match

**Location / quote:** `/demo` at 390×844 after one click. The screen shows
**“10 statement rows and 11 ledger rows are loaded,”** a four-number summary,
and the **Custom cleanup rule** form. The first statement-to-ledger match starts
at y=1091.44, 247 px below the viewport.

**Why this fails:** The demo contains realistic data, but the first phone
screen does not show any of it. A first-time visitor sees setup and summary UI
instead of the core comparison they clicked to try. The attached demo contract
defines a weak demo as blocking and requires the first post-click screen to
show the product already being used with realistic sample data. Desktop passes:
its first match starts at y=628.47.

**Concrete fix:** On mobile demo mode, put the first suggested match directly
after the workbench heading. Move the cleanup-rule form and full summary below
the review queue, or collapse them behind clearly named controls. Add a 390×844
regression asserting the first `.match` is visible without scrolling and shows
both a statement payee and ledger payee.

### F-6-3 — Minor — The first screen uses two terms for the same ledger

**Location / quote:** Headline: **“Reconcile your statement with your ledger.”**
Audience sentence: **“For people with a private budget file who need to check a
monthly bank download.”**

**Why this fails:** The visitor must decide whether “ledger” and “private budget
file” are different inputs. The product terminology table says the existing
private record is a **ledger**.

**Concrete rewrite:** “For people with a private ledger who need to check a
monthly bank download.”

### F-6-4 — Minor — A process heading does not name the job

**Location / quote:** Landing H2: **“Move through a monthly statement.”**

**Why this fails:** Heard out of context, the heading could mean reading or
navigating a statement. It does not name reconciliation or the three-step
section’s result.

**Concrete rewrite:** “Reconcile files in three steps.”

### F-6-5 — Minor — Scope copy uses the banned bridge metaphor

**Location / quote:** Landing privacy section: **“This is a bridge between
files you already control.”**

**Why this fails:** “Bridge” repeats the product name but does not state the
operation. The attached plain-words contract explicitly excludes metaphor and
brand-lore copy.

**Concrete rewrite:** “It compares the statement and ledger files you choose.”

### F-6-6 — Minor — The privacy link is named like the separate Terms page

**Location / quote:** Landing action **“Read the privacy terms”** links to
`/privacy`, while the footer has a separate **Terms** link to `/terms`.

**Why this fails:** “Privacy terms” conflates two named destinations and does
not tell the visitor which document will open.

**Concrete rewrite:** Use **“Read the privacy details”** for `/privacy`; reserve
**“Terms”** for `/terms`.

### F-6-7 — Minor — README audience copy uses vague “handoff tool” jargon

**Location / quote:** README: **“It is for people with a spreadsheet or local
CSV who need a monthly handoff tool, not another budget app.”**

**Why this fails:** “Handoff tool” does not say what is handed off or to whom.
The surrounding copy describes a file comparison, not a collaboration handoff.

**Concrete rewrite:** “It is for people who compare a monthly bank download
with a spreadsheet or ledger CSV.”

## Copy audit

Counts use whitespace-delimited words; punctuation separators are not words.
Repeated navigation/footer labels are listed once. Code commands are not prose.
No sentence exceeds 22 words and no banned marketing adjective appears. The
terminology, heading, metaphor, link-label, and jargon exceptions are findings
F-6-3 through F-6-7.

### Landing page

| Copy                                                                             | Words | Result                                              |
| -------------------------------------------------------------------------------- | ----: | --------------------------------------------------- |
| Skip to main content                                                             |     4 | pass                                                |
| Statement Bridge                                                                 |     2 | product wordmark                                    |
| Reconcile files                                                                  |     2 | pass                                                |
| Demo                                                                             |     1 | pass                                                |
| Privacy                                                                          |     1 | pass                                                |
| Private file-to-file reconciliation                                              |     3 | pass                                                |
| Reconcile your statement with your ledger                                        |     6 | pass                                                |
| For people with a private budget file who need to check a monthly bank download. |    15 | **F-6-3**                                           |
| Try it with sample data                                                          |     5 | pass                                                |
| See suggested matches right away.                                                |     5 | pass; `sample-reconcile`                            |
| Start with your files                                                            |     4 | pass                                                |
| Files stay in this browser.                                                      |     5 | pass; `local-only`                                  |
| Works offline after the first visit.                                             |     6 | pass; `offline-reload`                              |
| Free for the full reconciliation job.                                            |     6 | pass; `free-core-job`                               |
| A paper statement and graph-paper ledger on cracked concrete with moss.          |    11 | pass; image alt text                                |
| Three steps                                                                      |     2 | pass                                                |
| Move through a monthly statement                                                 |     5 | **F-6-4**                                           |
| Import files                                                                     |     2 | pass                                                |
| Add a bank CSV, OFX, or QIF and your ledger CSV.                                 |    11 | pass; `statement-file-formats`                      |
| Review suggestions                                                               |     2 | pass                                                |
| See one-to-one matches with the reason for each score.                           |     9 | pass; `one-to-one-matching`, `match-score-reasons`  |
| Export reviewed rows                                                             |     3 | pass                                                |
| Hand approved rows and an audit report back to your ledger.                      |    11 | pass; `csv-export`, `audit-export`, `manual-review` |
| Local cleanup rules                                                              |     3 | pass                                                |
| Save recurring payee wording                                                     |     4 | pass                                                |
| Keep bank wording and ledger wording aligned before you review suggestions.      |    11 | pass; `cleanup-rule-matching`                       |
| Set a cleanup rule                                                               |     4 | pass                                                |
| No bank login.                                                                   |     3 | pass; `no-bank-login`                               |
| No budget advice.                                                                |     3 | pass; `no-budget-advice`                            |
| This is a bridge between files you already control.                              |     9 | **F-6-5**                                           |
| Matches are suggestions.                                                         |     3 | pass; `manual-review`                               |
| You make the final call.                                                         |     5 | pass; `manual-review`                               |
| Read the privacy terms                                                           |     4 | **F-6-6**                                           |
| Reconcile statement files without changing your ledger.                          |     7 | pass; `input-files-unchanged`                       |
| Terms                                                                            |     1 | pass                                                |
| Built by Param Factory                                                           |     4 | pass                                                |
| v1.2.0                                                                           |     1 | pass                                                |
| Original illustration generated for this product.                                |     6 | provenance; pass                                    |

### README

| Copy                                                                                                                                                  | Words | Result                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----: | ------------------------------------------------- |
| Statement Reconcile Bridge                                                                                                                            |     3 | title; pass                                       |
| Reconcile a downloaded bank statement with a private ledger without a bank login.                                                                     |    13 | pass; `no-bank-login`                             |
| It is for people with a spreadsheet or local CSV who need a monthly handoff tool, not another budget app.                                             |    20 | **F-6-7**                                         |
| The app reads CSV, OFX/QFX, and QIF statement files plus a ledger CSV.                                                                                |    13 | pass; `statement-file-formats`                    |
| It proposes one-to-one exact-cent matches.                                                                                                            |     5 | pass; `one-to-one-matching`                       |
| Review each match.                                                                                                                                    |     3 | pass; `manual-review`                             |
| Export accepted rows and a JSON audit report.                                                                                                         |     8 | pass; `csv-export`, `audit-export`                |
| Files stay in browser storage and are never sent to a server.                                                                                         |    12 | pass; `local-only`                                |
| The complete reconciliation flow is free.                                                                                                             |     6 | pass; `free-core-job`                             |
| Save local cleanup rules for recurring bank wording before matching.                                                                                  |    10 | pass; `cleanup-rule-matching`, `rules-local-only` |
| Run it                                                                                                                                                |     2 | heading; pass                                     |
| Open `http://localhost:5173`.                                                                                                                         |     2 | pass                                              |
| Use `/work` to import your statement and ledger files, or `/demo` (or `/?demo=1`) for a ready-to-review sample in a separate local-storage namespace. |    22 | pass; `demo-isolation`                            |
| The app works offline after its first visit because the service worker stores the app shell.                                                          |    16 | pass; `offline-reload`                            |
| Verify and build                                                                                                                                      |     3 | heading; pass                                     |
| The static deployment output is `dist/`, with `index.html` at its root.                                                                               |    11 | pass                                              |
| The test suite includes the listed product claims, CSV export, local-only requests, and an offline demo reload.                                       |    17 | pass                                              |
| Privacy and limits                                                                                                                                    |     3 | heading; pass                                     |
| This app asks for no bank credentials.                                                                                                                |     7 | pass; `no-bank-login`                             |
| Matches are suggestions.                                                                                                                              |     3 | pass; `manual-review`                             |
| Review them before relying on them.                                                                                                                   |     6 | pass; `manual-review`                             |
| See `/privacy` and `/terms` in the running app.                                                                                                       |     8 | pass                                              |
| License                                                                                                                                               |     1 | heading; pass                                     |
| MIT.                                                                                                                                                  |     1 | pass                                              |
| See [LICENSE](LICENSE).                                                                                                                               |     2 | pass                                              |

Apart from F-6-3, the functional terminology is consistent: **statement**,
**ledger**, **match/suggestion**, **reviewed rows**, **cleanup rule**, and
**audit report**.

## Demo, sandbox, privacy, and offline

One click on **Try it with sample data** opens `/demo` with 10 realistic April
2026 statement rows, 11 ledger rows, and 10 unaccepted suggestions. Reset
returns the queue to zero acceptances. **Start for real** opens `/work`, removes
the demo namespace, and preserves a seeded real sentinel. The entire live
landing → demo → real flow made no off-origin request. After service-worker
readiness, an offline `/demo` reload returned 200 and rendered all 10 rows.

Those paths pass, but browser Back fails isolation as F-6-1. The mobile layout
also fails the required immediate-data check as F-6-2.

## Claims and clean-clone verification

The fresh clone was `/tmp/srb-review6-clean-G153N0/repo` at the supplied base
commit. `npm ci` installed 22 packages with zero vulnerabilities. Each of the
18 exact commands in `.factory/claims.json` passed independently, and each ID
appears exactly once as an `@claim:<id>` test tag.

| Claim ID                 | Declared command                                          |
| ------------------------ | --------------------------------------------------------- |
| sample-reconcile         | PASS                                                      |
| demo-isolation           | PASS — test omits browser Back; live claim fails as F-6-1 |
| free-core-job            | PASS                                                      |
| input-files-unchanged    | PASS                                                      |
| statement-file-formats   | PASS                                                      |
| one-to-one-matching      | PASS                                                      |
| match-score-reasons      | PASS                                                      |
| manual-review            | PASS                                                      |
| csv-export               | PASS                                                      |
| audit-export             | PASS                                                      |
| local-only               | PASS                                                      |
| no-bank-login            | PASS                                                      |
| offline-reload           | PASS                                                      |
| no-budget-advice         | PASS                                                      |
| real-persistence         | PASS                                                      |
| rules-local-only         | PASS                                                      |
| cleanup-rule-matching    | PASS                                                      |
| no-advertising-analytics | PASS                                                      |

The full clean-clone suite passed **24/24**. `npm run typecheck`, `npm run
lint`, and `npm run build` passed, and `dist/` was produced. The main JavaScript
is 21.57 kB (8.07 kB gzip) and CSS is 10.96 kB (3.24 kB gzip). The deployed JS
and CSS SHA-256 values exactly match the clean build. No landing or README
capability claim lacks a claims entry; F-6-1 is instead a false edge of an
existing claim that its test does not cover.

## Structure, accessibility, links, and identity

- `/`, `/demo`, `/work`, `/privacy`, and `/terms` return 200. A random missing
  path returns the designed 404 with HTTP 404.
- Every route has the required title pattern, one H1, one main landmark,
  description, canonical, favicon, Apple icon, Open Graph and Twitter fields,
  shared header/footer, Privacy, and Terms.
- Every discovered first-party link resolves. The CSP is same-origin only and
  is delivered as a response header. `robots.txt`, the five-route sitemap, and
  the Static Web Apps 404 override are present.
- Privacy navigation and browser Back focus the destination H1 and update the
  polite route announcement. F-6-1 is the separate demo-state history defect.
- `/opt/fleet/lib/verify-url.sh` passes. Playwright Axe reports zero violations
  on all five routes and the 404 in both light and dark color schemes.
- The concrete-and-moss palette, paper ledger rules, hard shadows, serif
  figures, and original workbench image match `.factory/design.md`. This is not
  a generic centered-gradient SaaS template.

## Earlier-finding verification

All earlier review findings were checked in current source and on the matching
live build.

| Earlier finding                           | Current confirmation                                                                                              |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| F-1-1 dead paid checkout                  | Fixed: price, checkout, license, payment UI, and external billing links remain absent; crawl passes.              |
| F-1-2 overlong README audience            | Fixed: current sentence is 20 words, though its jargon is separately F-6-7.                                       |
| F-1-3 overlong README capability sentence | Fixed: capabilities remain split into 5-, 3-, and 8-word sentences.                                               |
| F-1-4 unlisted normalisation promise      | Fixed: no public normalisation promise remains.                                                                   |
| F-1-5 unlisted financial-advice wording   | Fixed: current suggestion/review wording is inventoried and tested.                                               |
| F-1-6 incomplete 404 metadata             | Fixed: live 404 has complete icon, canonical, OG, and Twitter metadata.                                           |
| F-2-1 incomplete Twitter metadata         | Fixed on all routes and the 404.                                                                                  |
| F-2-2 “audit record” terminology          | Fixed: public copy consistently uses **audit report**.                                                            |
| F-2-3 untested cleanup-rule behavior      | Fixed: the claim test changes a 65% caution match to a 95% match with a new reason.                               |
| F-3-1 invalid dates silently normalised   | Fixed: numeric calendar round-tripping and the malformed-input regression reject invalid CSV, QIF, and OFX dates. |
| F-3-2 unlisted score reasons              | Fixed: `match-score-reasons` covers high, caution, and open rows.                                                 |
| F-4-1 “One small bridge” slogan           | Fixed at the cited hero caption; it is absent. F-6-5 identifies a different remaining bridge metaphor.            |
| F-4-2 untested no-change promise          | Fixed: `input-files-unchanged` compares selected bytes through review and export.                                 |
| F-5-1 desktop facts below fold            | Fixed: all three end by y=728.03 in a 900 px viewport.                                                            |
| F-5-2 incomplete copy audit               | Fixed: the repository audit includes the formerly omitted strings and accurate whitespace counts.                 |

Earlier independent-verification defects also remain fixed for real-file
import, visible parser errors, exact-cent/manual matching, dark contrast,
44 px controls, update/offline handling, the real 404, route focus, valid
workbench markup, metadata, sitemap coverage, and removal of the unavailable
paid feature. Demo-to-real and header-link cleanup are fixed in their tested
paths; the previously untested browser-history exit is F-6-1.

## Missed leverage

No missing AI feature is implied. Exact-cent file comparison, plain score
reasons, local cleanup rules, CSV import, OFX/QFX/QIF import, reviewed CSV
export, and audit export cover the obvious job. An AI step would weaken the
local, deterministic review model. Sync is likewise not implied by the private
local-first brief.

## What would make this perfect

Clear demo state on every exit path, including Back/Forward history, and prove
that path in the isolation claim. Put one realistic suggested match inside the
first 390×844 demo viewport. Then apply the five concrete copy rewrites above
and rerun the copy, demo, history, claim, link, and accessibility checks. This
review found no other open item.
