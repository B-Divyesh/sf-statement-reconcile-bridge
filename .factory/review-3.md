# Adversarial first-read review 3 — FAIL

**Reviewed:** 2026-08-28  
**Live URL:** https://statement-reconcile-bridge.sociobot.in  
**Method:** fresh Chromium contexts at 390×844 and 1440×900; clean dependency install; every declared claim command; live demo, storage, request, offline, route, metadata, link, and Axe checks; source and full review-history check. Product code was not changed.

## Verdict

**FAIL.** The first screen is clear, the demo is genuinely one-click and isolated, and all declared claims pass. However, a calendar-invalid CSV date is silently changed into a different date and can become a suggested match. One public promise about match explanations is also absent from the claims inventory. PASS requires zero findings.

## Cold first read, before scrolling

| Viewport | What it does | For whom | First click |
| --- | --- | --- | --- |
| 390×844 | Reconciles a bank statement with a private ledger. | People checking a monthly bank download against a private budget file. | **Try it with sample data** to see suggestions immediately. |
| 1440×900 | Same. | Same. | Same. |

This was answerable from the first screen in both fresh contexts. The exact visible copy was “Reconcile your statement with your ledger,” “For people with a private budget file who need to check a monthly bank download.” and “Try it with sample data.” At 390 px, their bottoms were 307, 403, and 469 px in an 844 px viewport. At 1440 px, the CTA bottom was 794 px in a 900 px viewport. No console or page errors occurred. The concrete, paper, moss, and ruled-ledger treatment matches the recorded visual thesis and is distinct from a generic SaaS template.

## Findings

### F-3-1 — BLOCKING — A nonexistent CSV date is silently changed and matched

**Location / quote:** Real `/work` importer; the help says “Expected CSV columns: date, payee or description, and amount.” In source, `src/reconcile.ts:101-107` accepts any date JavaScript normalizes.

**Evidence:** In a fresh live `/work` session, I imported a statement row `2026-02-30,Impossible date,-10.00` and a ledger row `2026-03-02,Impossible date,-10.00`. No error or alert appeared. The workbench reported “1 statement rows and 1 ledger rows are loaded.” and rendered both sides as `2026-03-02 · -$10.00`, with a 95% suggested match. The original statement date does not exist.

**Why this fails:** A reconciliation tool must not silently move a transaction into another month or day. A visitor can accept and export a match based on a date that was not in their statement. This is particularly misleading because the product correctly rejects calendar-invalid OFX dates, so equivalent malformed input produces different safety behavior by format.

**Concrete fix:** Validate CSV and QIF calendar dates by parsing numeric year/month/day and round-tripping each component, as `parseOfxDate` already does. Reject `2026-02-30` with the existing announced recovery pattern rather than normalizing it. Add a regression test that imports calendar-invalid CSV and QIF fixtures, asserts the alert and no match, then verifies a valid subsequent import still works.

### F-3-2 — Minor — The public explanation promise has no matching claim entry

**Location / quote:** Landing step 2: “See one-to-one matches with the reason for each score.”

**Why this fails:** `one-to-one-matching` inventories exact-cent, one-to-one matching only. `cleanup-rule-matching` observes one changed score/reason after saving a rule. Neither claim promises nor tests that every displayed match score has an explanation. The claims contract requires a separate inventory entry for each visitor-reliance behavior.

**Concrete fix:** Add a `match-score-reasons` entry such as “Every match shows a plain-language reason for its score,” plus an `@claim:match-score-reasons` browser test that exercises both a high-confidence suggestion and a caution/unmatched result and asserts the visible reasons. Alternatively remove “with the reason for each score” from the landing copy.

## Demo, sandbox, privacy, and offline

The one-click demo passes. From a fresh landing context, **Try it with sample data** opened `/demo`; its first screen already showed 10 statement rows, 11 ledger rows, and 10 suggested matches. The persistent banner read “Demo — sample data, nothing is saved” and included **Reset demo** and **Start for real**.

With a pre-seeded `real:statement-reconcile-bridge:sentinel`, demo entered with only `demo:statement-reconcile-bridge:*` state added. Accepting one sample changed only demo state. **Reset demo** restored zero accepted rows and left the real sentinel unchanged. **Start for real** opened `/work`, displayed two file inputs, removed every demo key, and did not show the banner. The complete landing → demo → real flow made only same-origin requests and logged no errors.

After a first online `/demo` visit and service-worker readiness, a live offline reload returned 200 and rendered all 10 rows. No AI capability is implied by this local file-to-file job; import, manual review, CSV export, audit export, and local cleanup rules are already present, so an AI addition would be decorative rather than missing leverage.

## Claim execution

`.factory/claims.json` contains 16 entries. After `npm ci`, every exact listed command was run individually. All passed, and each ID has one matching `@claim:` test tag.

| Claim ID | Result |
| --- | --- |
| sample-reconcile | PASS |
| demo-isolation | PASS |
| free-core-job | PASS |
| statement-file-formats | PASS |
| one-to-one-matching | PASS |
| manual-review | PASS |
| csv-export | PASS |
| audit-export | PASS |
| local-only | PASS |
| no-bank-login | PASS |
| offline-reload | PASS |
| no-budget-advice | PASS |
| real-persistence | PASS |
| rules-local-only | PASS |
| cleanup-rule-matching | PASS |
| no-advertising-analytics | PASS |

The confirmation `npm test` passed 20/20. `npm run typecheck`, `npm run lint`, and `npm run build` also passed; `dist/` was produced with 20.12 kB JavaScript (7.66 kB gzip), 11.01 kB CSS (3.25 kB gzip), and the 89.38 kB product-owned hero WebP. F-3-1 is outside the current claim inventory; it is a newly discovered input-integrity defect, not a failed declared claim test.

## Copy audit

Counts use whitespace-delimited words. No listed sentence exceeds 22 words or contains a banned marketing adjective. Buttons name an action or result. F-3-2 is the only unlisted public behavior in this audit.

### Landing page

| Sentence or label | Words | Result |
| --- | ---: | --- |
| Private file-to-file reconciliation | 3 | pass |
| Reconcile your statement with your ledger | 6 | pass |
| For people with a private budget file who need to check a monthly bank download. | 15 | pass |
| Try it with sample data | 5 | result-naming action |
| See suggested matches right away. | 5 | pass |
| Start with your files | 4 | result-naming action |
| Files stay in this browser. | 5 | listed `local-only` |
| Works offline after the first visit. | 6 | listed `offline-reload` |
| Free for the full reconciliation job. | 6 | listed `free-core-job` |
| Two independent records. | 3 | pass |
| One small bridge. | 3 | pass |
| Three steps | 2 | pass |
| Move through a monthly statement | 5 | pass |
| Import files | 2 | pass |
| Add a bank CSV, OFX, or QIF and your ledger CSV. | 12 | listed `statement-file-formats` |
| Review suggestions | 2 | pass |
| See one-to-one matches with the reason for each score. | 10 | **F-3-2** |
| Export reviewed rows | 3 | pass |
| Hand approved rows and an audit report back to your ledger. | 12 | listed `csv-export`, `audit-export` |
| Local cleanup rules | 3 | pass |
| Save recurring payee wording | 4 | listed `cleanup-rule-matching` |
| Keep bank wording and ledger wording aligned before you review suggestions. | 11 | listed `cleanup-rule-matching` |
| Set a cleanup rule | 4 | result-naming action |
| No bank login. | 3 | listed `no-bank-login` |
| No budget advice. | 3 | listed `no-budget-advice` |
| This is a bridge between files you already control. | 10 | pass |
| Matches are suggestions. | 3 | listed `manual-review` |
| You make the final call. | 5 | listed `manual-review` |
| Read the privacy terms | 4 | action-naming link |
| Reconcile statement files without changing your ledger. | 7 | local-file boundary; pass |
| Privacy · Terms · Built by Param Factory · v1.2.0 | 7 | footer labels |
| Original illustration generated for this product. | 6 | provenance; pass |

### README

| Sentence or label | Words | Result |
| --- | ---: | --- |
| Statement Reconcile Bridge | 3 | title; pass |
| Reconcile a downloaded bank statement with a private ledger without a bank login. | 13 | listed `no-bank-login` |
| It is for people with a spreadsheet or local CSV who need a monthly handoff tool, not another budget app. | 20 | pass |
| The app reads CSV, OFX/QFX, and QIF statement files plus a ledger CSV. | 13 | listed `statement-file-formats` |
| It proposes one-to-one exact-cent matches. | 5 | listed `one-to-one-matching` |
| Review each match. | 3 | listed `manual-review` |
| Export accepted rows and a JSON audit report. | 8 | listed `csv-export`, `audit-export` |
| Files stay in browser storage and are never sent to a server. | 12 | listed `local-only` |
| The complete reconciliation flow is free. | 6 | listed `free-core-job` |
| Save local cleanup rules for recurring bank wording before matching. | 10 | listed `cleanup-rule-matching` |
| Run it | 2 | heading; pass |
| Open `http://localhost:5173`. | 2 | pass |
| Use `/work` to import your statement and ledger files, or `/demo` for a ready-to-review sample that uses a separate local-storage namespace. | 21 | pass |
| The app works offline after its first visit because the service worker stores the app shell. | 16 | listed `offline-reload` |
| Verify and build | 3 | heading; pass |
| The static deployment output is `dist/`, with `index.html` at its root. | 11 | pass |
| The test suite includes the listed product claims, CSV export, local-only requests, and an offline demo reload. | 17 | pass |
| Privacy and limits | 3 | heading; pass |
| This app asks for no bank credentials. | 7 | listed `no-bank-login` |
| Matches are suggestions. | 3 | listed `manual-review` |
| Review them before relying on them. | 6 | listed `manual-review` |
| See `/privacy` and `/terms` in the running app. | 8 | pass |
| License | 1 | heading; pass |
| MIT. | 1 | pass |
| See [LICENSE](LICENSE). | 2 | pass |

## Structure, routes, accessibility, and links

- `/`, `/demo`, `/work`, `/privacy`, and `/terms` all returned 200. A direct `/review-3-missing` returned the styled 404 with HTTP 404.
- Every checked public route had one H1 and main landmark; a route-specific title, description, canonical URL, favicon/Apple icon, Open Graph, and Twitter card metadata; shared header/footer; skip link; and Privacy/Terms links. Titles follow the product/route plain-language pattern.
- All same-origin links discovered across the public routes returned 200. Direct deep links opened the correct state. Privacy navigation and Back populated the polite route announcement and restored focus to the destination H1.
- Live Axe checks found no serious or critical violations on all five public routes at 390 px. No horizontal overflow, console errors, page errors, failed resources, third-party requests, or generic-template treatment were observed.

## Earlier-finding verification

Every earlier `review-*`, `polish-*`, verification record, and handoff was read. The following historical findings were rechecked live and in current source; none is merely marked fixed.

| Earlier finding | Current confirmation |
| --- | --- |
| F-1-1 dead paid checkout | Fixed by removal: no paid UI, price, checkout, license restore, or payment copy remains; current link crawl passes. |
| F-1-2 and F-1-3 overlong README copy | Fixed: current audience and capability sentences are 20 words or fewer. |
| F-1-4 unlisted payee-normalisation; F-1-5 financial-advice wording | Fixed: former promise is absent; current manual-review wording is listed and tested. |
| F-1-6 and F-2-1 incomplete 404/Twitter metadata | Fixed: current home, route entries, and 404 contain canonical, icon, OG, Twitter title/description/image metadata. |
| F-2-2 inconsistent “audit record” | Fixed: current landing, workbench, claims, and README use “audit report.” |
| F-2-3 unlisted cleanup-rule behavior | Fixed: `cleanup-rule-matching` now asserts a changed score and reason after a saved rule. |
| Demo storage, real importer, CSP billing, paid legal disclosure | Fixed by true demo/real namespaces and `/work`; the unavailable paid feature and its billing path were removed. |
| Hidden errors, OFX validation, focus, targets, contrast | Fixed: malformed OFX is rejected with an alert; the suite checks recovery, Undo focus, 44 px controls, and light/dark Axe. F-3-1 is a distinct CSV/QIF calendar-validation defect. |
| Mobile first screen, automatic acceptance, one-cent matching | Fixed: H1/audience/CTA are in the 390 px first viewport; matches begin as suggestions; exact-cent fixture remains unmatched. |
| Cache/update, 404, metadata/sitemap, demo exit, markup residue | Fixed: offline demo reload passes; live 404 is real; sitemap includes `/work`; demo exit removes keys; current workbench has no literal markup residue. |

## What would make this perfect

Reject calendar-invalid CSV and QIF dates before matching, cover that recovery path, and either inventory/test score explanations or remove that landing promise. Then rerun the full clean-clone claim suite and this live first-read review with no findings.
