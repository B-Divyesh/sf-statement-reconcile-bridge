# Copy audit

Counts use whitespace-delimited words. Hyphenated terms, file formats, and
URLs count as one word. Navigation and footer labels appear once where they
repeat. No sentence exceeds 22 words, no banned marketing term appears, and
every action names its result.

## Landing page

| Copy                                                                        | Words | Check                                         |
| --------------------------------------------------------------------------- | ----: | --------------------------------------------- |
| Skip to main content                                                        |     4 | Clear skip link                               |
| Statement Bridge                                                            |     2 | Product wordmark                              |
| Reconcile files                                                             |     2 | Clear navigation action                       |
| Demo                                                                        |     1 | Clear navigation label                        |
| Privacy                                                                     |     1 | Clear navigation and footer label             |
| Private file-to-file reconciliation                                         |     3 | Descriptive eyebrow                           |
| Reconcile your statement with your ledger                                   |     6 | Clear job headline                            |
| For people with a private ledger who need to check a monthly bank download. |    14 | Clear audience and situation                  |
| Try it with sample data                                                     |     5 | Result-naming primary action                  |
| See suggested matches right away.                                           |     5 | `sample-reconcile`                            |
| Start with your files                                                       |     4 | Result-naming real-work action                |
| Files stay in this browser.                                                 |     5 | `local-only`                                  |
| Works offline after the first visit.                                        |     6 | `offline-reload`                              |
| Free for the full reconciliation job.                                       |     6 | `free-core-job`                               |
| Three steps                                                                 |     2 | Clear section label                           |
| Reconcile files in three steps                                              |     5 | Job-specific section heading                  |
| Import files                                                                |     2 | Clear step heading                            |
| Add a bank CSV, OFX, or QIF and your ledger CSV.                            |    11 | `statement-file-formats`                      |
| Review suggestions                                                          |     2 | Clear step heading                            |
| See one-to-one matches with the reason for each score.                      |     9 | `one-to-one-matching`, `match-score-reasons`  |
| Export reviewed rows                                                        |     3 | Clear step heading                            |
| Hand approved rows and an audit report back to your ledger.                 |    11 | `csv-export`, `audit-export`, `manual-review` |
| Local cleanup rules                                                         |     3 | Clear section label                           |
| Save recurring payee wording                                                |     4 | Clear section heading                         |
| Keep bank wording and ledger wording aligned before you review suggestions. |    11 | `cleanup-rule-matching`                       |
| Set a cleanup rule                                                          |     4 | Result-naming action                          |
| No bank login.                                                              |     3 | `no-bank-login`                               |
| No budget advice.                                                           |     3 | `no-budget-advice`                            |
| It compares the statement and ledger files you choose.                      |     9 | Concrete scope limit                          |
| Matches are suggestions.                                                    |     3 | `manual-review`                               |
| You make the final call.                                                    |     5 | `manual-review`                               |
| Read the privacy details                                                    |     4 | Names the linked document                     |
| Reconcile statement files without changing your ledger.                     |     7 | `input-files-unchanged`                       |
| Terms                                                                       |     1 | Clear footer link                             |
| Built by Param Factory                                                      |     4 | Attribution                                   |
| v1.2.0                                                                      |     1 | Build label                                   |
| Original illustration generated for this product.                           |     6 | Asset provenance                              |

## README

| Copy                                                                                                                                                  | Words | Check                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----: | ------------------------------------------- |
| Statement Reconcile Bridge                                                                                                                            |     3 | Clear title                                 |
| Reconcile a downloaded bank statement with a private ledger without a bank login.                                                                     |    13 | `no-bank-login`                             |
| It is for people who compare a monthly bank download with a spreadsheet or ledger CSV.                                                                |    16 | Clear audience                              |
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

## Terminology

| Concept                  | Product word  |
| ------------------------ | ------------- |
| Bank export              | statement     |
| Existing private record  | ledger        |
| Paired record            | match         |
| Suggested pairing        | suggestion    |
| Final reviewed output    | reviewed rows |
| Saved payee substitution | cleanup rule  |
| Record of actions        | audit report  |
