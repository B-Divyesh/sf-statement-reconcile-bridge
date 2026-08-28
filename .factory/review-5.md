# Adversarial first-read review 5 — FAIL

**Reviewed:** 2026-08-28  
**Live URL:** https://statement-reconcile-bridge.sociobot.in  
**Method:** Fresh Chromium contexts at 390×844 and 1440×900; a fresh clone of `main` at `d38aac5b048b4cd250d5999361359201dcd4ce7c`; all declared claim commands; live browser, storage, request, offline, route, link, metadata, history, and Axe checks. No product code was changed.

## Verdict

**FAIL.** The product is clear, genuinely tryable, local-first, and visually distinct. Two minor but real checklist failures remain. A PASS requires zero findings.

## Cold first read

| Viewport | What it does                                       | For whom                                                            | First action                                                  |
| -------- | -------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------- |
| 390×844  | Reconciles a bank statement with a private ledger. | People with a private budget file checking a monthly bank download. | **Try it with sample data** to open a populated review queue. |
| 1440×900 | Same.                                              | Same.                                                               | Same.                                                         |

The first screen supplies all three answers without scrolling. The exact headline is “Reconcile your statement with your ledger”; the audience sentence is “For people with a private budget file who need to check a monthly bank download.”; the first action is “Try it with sample data.” Successful home loads produced no browser console or page errors. The concrete, paper, moss, ledger-serif, and rule-mark visual system matches `.factory/design.md` and does not resemble a generic SaaS template.

## Findings

### F-5-1 — Minor — Desktop first screen hides two required plain facts

**Location / quote:** Landing hero fact list, desktop 1440×900 viewport: “Works offline after the first visit.” and “Free for the full reconciliation job.”

**Evidence:** Their rendered bounds are respectively y=892–913 and y=920–941. Only “Files stay in this browser.” (y=864–885) is fully visible in the initial 900px desktop viewport. At 390×844, all three facts are visible at y=603–680.

**Why this fails:** The required first-screen shape includes three plain facts: privacy, offline, and price. A desktop visitor gets the headline, audience, and CTA, but must scroll before seeing two of the three required decision facts.

**Concrete fix:** Reduce the desktop hero’s vertical consumption, or arrange the three facts in a compact desktop row, so all three fact-list bottoms are at or above 900px at 1440×900. Add a viewport regression that asserts this for each fact, not only the H1, audience sentence, and sample action.

### F-5-2 — Minor — The required repository copy-audit is incomplete and has incorrect counts

**Location / quote:** `.factory/copy-audit.md` records “Try it with sample data” as **6** words. It has five words. It also omits visible comparable copy such as “Three steps”, “Import files”, “Review suggestions”, “Export reviewed rows”, and “Read the privacy terms”.

**Why this fails:** The plain-words proof requires an accurate extraction of landing copy with word counts. This artifact cannot serve as reliable evidence that the copy pass was complete, even though the missed strings themselves are clear.

**Concrete fix:** Regenerate `.factory/copy-audit.md` from the rendered landing copy, include all headings, instructions, actions, facts, and footer copy once, and correct the whitespace-delimited counts. Keep a terminology table and flag rules in that artifact.

## Copy audit

Counts use whitespace-delimited words; hyphenated terms, format names, and URLs count as one. Navigation and footer labels are recorded once where repeated. No public landing or README sentence exceeds 22 words, contains a banned marketing adjective, uses inconsistent terminology, or has a non-result-naming action. The only audit-artifact defect is F-5-2.

### Landing page

| Copy                                                                             | Words | Check                                         |
| -------------------------------------------------------------------------------- | ----: | --------------------------------------------- |
| Skip to main content                                                             |     4 | clear skip link                               |
| Statement Bridge                                                                 |     2 | product wordmark                              |
| Reconcile files                                                                  |     2 | clear navigation action                       |
| Demo                                                                             |     1 | clear navigation label                        |
| Privacy                                                                          |     1 | clear navigation/footer label                 |
| Private file-to-file reconciliation                                              |     3 | descriptive eyebrow                           |
| Reconcile your statement with your ledger                                        |     6 | clear job headline                            |
| For people with a private budget file who need to check a monthly bank download. |    15 | clear audience and situation                  |
| Try it with sample data                                                          |     5 | result-naming primary action                  |
| See suggested matches right away.                                                |     5 | `sample-reconcile`                            |
| Start with your files                                                            |     4 | result-naming real-work action                |
| Files stay in this browser.                                                      |     5 | `local-only`                                  |
| Works offline after the first visit.                                             |     6 | `offline-reload`                              |
| Free for the full reconciliation job.                                            |     6 | `free-core-job`                               |
| Three steps                                                                      |     2 | clear section label                           |
| Move through a monthly statement                                                 |     5 | procedural section heading                    |
| Import files                                                                     |     2 | clear step heading                            |
| Add a bank CSV, OFX, or QIF and your ledger CSV.                                 |    11 | `statement-file-formats`                      |
| Review suggestions                                                               |     2 | clear step heading                            |
| See one-to-one matches with the reason for each score.                           |     9 | `one-to-one-matching`, `match-score-reasons`  |
| Export reviewed rows                                                             |     3 | clear step heading                            |
| Hand approved rows and an audit report back to your ledger.                      |    11 | `csv-export`, `audit-export`, `manual-review` |
| Local cleanup rules                                                              |     3 | clear section label                           |
| Save recurring payee wording                                                     |     4 | clear section heading                         |
| Keep bank wording and ledger wording aligned before you review suggestions.      |    11 | `cleanup-rule-matching`                       |
| Set a cleanup rule                                                               |     4 | result-naming action                          |
| No bank login.                                                                   |     3 | `no-bank-login`                               |
| No budget advice.                                                                |     3 | `no-budget-advice`                            |
| This is a bridge between files you already control.                              |     9 | useful scope limit                            |
| Matches are suggestions.                                                         |     3 | `manual-review`                               |
| You make the final call.                                                         |     5 | `manual-review`                               |
| Read the privacy terms                                                           |     4 | result-naming action                          |
| Reconcile statement files without changing your ledger.                          |     7 | `input-files-unchanged`                       |
| Terms                                                                            |     1 | clear footer link                             |
| Built by Param Factory                                                           |     4 | attribution                                   |
| v1.2.0                                                                           |     1 | build label                                   |
| Original illustration generated for this product.                                |     6 | asset provenance                              |

### README

| Copy                                                                                                                                                  | Words | Check                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----: | ------------------------------------------- |
| Statement Reconcile Bridge                                                                                                                            |     3 | clear title                                 |
| Reconcile a downloaded bank statement with a private ledger without a bank login.                                                                     |    13 | `no-bank-login`                             |
| It is for people with a spreadsheet or local CSV who need a monthly handoff tool, not another budget app.                                             |    20 | clear audience                              |
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
| See `/privacy` and `/terms` in the running app.                                                                                                       |     8 | useful instruction                          |
| License                                                                                                                                               |     1 | clear heading                               |
| MIT.                                                                                                                                                  |     1 | license identifier                          |
| See [LICENSE](LICENSE).                                                                                                                               |     2 | useful instruction                          |

Terminology is consistent: **statement**, **ledger**, **match/suggestion**, **reviewed rows**, **cleanup rule**, and **audit report**. CSV, OFX/QFX, and QIF are necessary file-format names, not unexplained marketing jargon. There is no information-free slogan remaining.

## Demo, sandbox, privacy, and offline behavior

One click on **Try it with sample data** opened `/demo`. The first product screen immediately rendered a realistic workbench with 10 statement rows, 11 ledger rows, and 10 suggestions. The persistent banner was exactly “Demo — sample data, nothing is saved” and supplied **Reset demo** and **Start for real**.

After an acceptance, Reset returned the queue to zero accepted rows. The demo used only `demo:statement-reconcile-bridge:state` and `demo:statement-reconcile-bridge:audit`. Start for real opened `/work` with two file inputs, removed the demo keys, and left no real key behind. The request log for the landing-to-demo-to-real flow contained no off-origin request and no console or page error. After an online `/demo` visit and service-worker readiness, an offline reload rendered the heading and all 10 rows.

## Claims and clean-clone verification

Fresh clone: `/tmp/srb-review5-clean-fkoMUm/repo`, cloned from the supplied remote at `d38aac5b048b4cd250d5999361359201dcd4ce7c`; `npm ci` installed 22 packages with zero vulnerabilities. Every exact command in `.factory/claims.json` was run individually and passed. Each inventory ID has exactly one matching `@claim:<id>` tag.

| Claim ID                 | Result |
| ------------------------ | ------ |
| sample-reconcile         | pass   |
| demo-isolation           | pass   |
| free-core-job            | pass   |
| input-files-unchanged    | pass   |
| statement-file-formats   | pass   |
| one-to-one-matching      | pass   |
| match-score-reasons      | pass   |
| manual-review            | pass   |
| csv-export               | pass   |
| audit-export             | pass   |
| local-only               | pass   |
| no-bank-login            | pass   |
| offline-reload           | pass   |
| no-budget-advice         | pass   |
| real-persistence         | pass   |
| rules-local-only         | pass   |
| cleanup-rule-matching    | pass   |
| no-advertising-analytics | pass   |

The full suite passed **23/23**. `npm run typecheck`, `npm run lint`, and `npm run build` passed; the build produced `dist/`. Its first-load JavaScript is 21.57 kB (8.07 kB gzip); CSS is 10.95 kB (3.23 kB gzip); the original hero WebP is 89.38 kB. SHA-256 values for the built JS and CSS exactly match the deployed assets. No landing-page or README claim-like sentence lacks a corresponding inventory entry and observable test.

## Structure, accessibility, links, and identity

- `/`, `/demo`, `/work`, `/privacy`, and `/terms` returned 200. A fresh random path returned the designed 404 with HTTP 404, one H1, a main landmark, home link, shared header/footer, favicon/Apple icon, and complete canonical, Open Graph, and Twitter metadata.
- Each successful route has a route-specific title, description, canonical URL, one H1, and a main landmark. Browser Back restored the landing route, focused its H1, and updated the polite route announcement.
- The full current link set (`/`, `/work`, `/demo`, `/privacy`, `/terms`, and the skip anchor) has no dead destination. The header and footer consistently include Privacy and Terms.
- `/opt/fleet/lib/verify-url.sh` passed against the live home: `lang=en`, title, one H1, main, image alt text, and labelled buttons were confirmed with no console errors. Axe found zero serious or critical violations on every route and the 404 at 390px in light and dark color schemes.
- The PWA service-worker check above confirms the offline public claim. The same-origin CSP and request log confirm the no-tracker/local-only claims.
- The visual identity remains product-specific: concrete and paper surfaces, moss match signals, serif ledger typography, hard rule lines, and the product-owned workbench image. The `LICENSE` is MIT.

## Earlier-finding verification

Every earlier `review-*.md`, `polish-*.md`, and handoff record was read. The following former review findings were rechecked in both current source and the live deployment; none is merely marked fixed.

| Earlier finding                            | Current confirmation                                                                                           |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| F-1-1 dead paid checkout                   | Fixed by removal: no price, checkout, license, payment copy, or billing link remains; crawl passes.            |
| F-1-2 / F-1-3 overlong README copy         | Fixed: audience is 20 words and capabilities are separate 5-, 3-, and 8-word sentences.                        |
| F-1-4 unlisted payee-normalisation promise | Fixed: that public promise remains absent.                                                                     |
| F-1-5 financial-advice wording             | Fixed: current manual-review wording is listed and tested.                                                     |
| F-1-6 missing 404 social metadata          | Fixed: the live 404 has canonical, icon, Open Graph, and complete Twitter metadata.                            |
| F-2-1 Twitter metadata                     | Fixed on every successful route and the 404.                                                                   |
| F-2-2 audit-record terminology             | Fixed: current copy and export use “audit report”.                                                             |
| F-2-3 cleanup-rule behavior                | Fixed: `cleanup-rule-matching` proves a saved rule changes the visible score and reason.                       |
| F-3-1 invalid calendar dates               | Fixed: current regression rejects invalid CSV, QIF, and OFX input before matching.                             |
| F-3-2 score/open-row reasons               | Fixed: `match-score-reasons` covers high, caution, and unmatched rows.                                         |
| F-4-1 information-free bridge caption      | Fixed: the slogan-only caption is absent from live/source.                                                     |
| F-4-2 untested no-change promise           | Fixed: `input-files-unchanged` retains and compares selected fixture bytes through import, review, and export. |

The earlier independent verification closures also remain present: isolated demo storage and cleanup; reachable real import; visible parser errors; complete claim inventory; small bundle; offline shell; real 404; 44px controls; focused route changes; explicit human acceptance; strict date parsing; dark contrast; and sitemap/metadata coverage.

## Missed leverage

No missing AI feature was found. This job is an exact-cent, private, human-reviewed file comparison; adding AI would be decorative rather than useful. The expected high-leverage features—file import, local wording cleanup, review reasons, CSV export, and audit export—are present.

## What would make this perfect

Put all three decision facts inside the 1440×900 first viewport and correct the repository’s copy-audit artifact. With those two items resolved and regression coverage added for the desktop facts, this review found no additional blocker or minor defect.
