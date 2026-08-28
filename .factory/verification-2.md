# Independent verification 2 — FAIL

**Candidate:** `cdd19453a98b42d09397628ba897d721640ca68b`  
**Live URL:** https://statement-reconcile-bridge.sociobot.in  
**Verified:** 2026-08-28 from a clean checkout; no product code was changed

## Decision

**FAIL — do not release.** The deployed files match the candidate and the
declared tests pass after installation, but independent testing found two core
release blockers: the 390 px first screen does not explain the product or show
the demo action, and the app can silently call a one-cent amount mismatch
“accepted” and export it before a person reviews it. Dark-mode Axe failures and
invalid OFX date acceptance are additional release blockers.

## Mandatory first-read gate

Desktop at 1440×900 passes. A cold live visit says:

- What it does: “Reconcile your statement with your ledger.”
- For whom: people with a private budget file checking a monthly bank download.
- First click: “Try it with sample data,” followed by “See suggested matches
  right away.”

The same cold test at 390×844 fails. The first viewport contains the header and
a tall crop of the illustration only. The image is rendered about 1,024 px
tall; the sample-data button starts at y=1,535 px. The headline, audience
sentence, facts, and action are all below the first screen. This independently
triggers the work order's mandatory FAIL rule.

The demo itself is one click on desktop. It opens `/demo`, shows the persistent
demo banner and 10 statement rows against 11 ledger rows, and creates only
`demo:statement-reconcile-bridge:state` and `demo:...:audit`. **Start for real**
removes those keys and opens `/work` with two file inputs.

## Declared claims

`.factory/claims.json` exists with 13 entries. Each ID occurs exactly once as an
`@claim:<id>` test. The first mandated invocation was made before any other
repository work; because the dependency-free clone had not yet been installed,
all commands initially stopped at `ERR_MODULE_NOT_FOUND: @playwright/test`.
After the required `npm ci`, every exact command was rerun individually and
passed:

| Claim | Exact command result |
| --- | --- |
| `sample-reconcile` | PASS — 1 passed |
| `demo-isolation` | PASS — 1 passed |
| `free-core-job` | PASS — 1 passed |
| `statement-file-formats` | PASS — 1 passed |
| `one-to-one-matching` | PASS — 1 passed |
| `csv-export` | PASS — 1 passed |
| `audit-export` | PASS — 1 passed |
| `local-only` | PASS — 1 passed |
| `no-bank-login` | PASS — 1 passed |
| `offline-reload` | PASS — 1 passed |
| `paid-license` | PASS — 1 passed |
| `one-time-price` | PASS — 1 passed |
| `no-budget-advice` | PASS — 1 passed |

Passing the current tests does not establish acceptance. In particular, the
`csv-export` test never performs a review action before asserting that rows
labelled `accepted` are exported. Independent testing disproves the claim that
those are reviewed rows.

## Repository gates

- `npm ci`: PASS; 19 packages installed, 0 vulnerabilities.
- `npm test`: PASS; 15/15 Playwright tests in 20.1 s.
- `npm run build`: PASS; `tsc --noEmit && vite build`; `dist/` produced.
- No lint script or separate lint configuration exists. Type checking is part
  of the production build.
- Production output: JS 20.92 KB / 8.09 KB gzip; CSS 10.43 KB / 3.12 KB gzip;
  hero WebP 89.38 KB. These meet the stated budgets.
- Live Lighthouse mobile: performance 93, accessibility 100, best practices
  100, SEO 100; FCP 1.0 s, LCP 1.6 s, TBT 310 ms, CLS 0. INP was not available
  from a synthetic no-interaction run. Initial transfer was 102,938 bytes.
- `/opt/fleet/lib/verify-url.sh` against the live URL: PASS; HTTP 200, title,
  `lang=en`, one h1, main landmark, image alt, and no load errors.

## Independent workflow evidence

Normal and boundary cases:

- The sample loads 10 rows, all reported as automatic/accepted (100%).
- A real three-row statement against two ledger rows produced one accepted,
  one suggested, and one unmatched row.
- Duplicate-value coverage in the repository suite preserved one-to-one use of
  the ledger row.
- Same amount and payee exactly three days apart matched at 89%; four days apart
  remained unmatched.
- Invalid CSV amounts and invalid QIF dates produce visible alerts, and a valid
  upload afterward recovers successfully.
- CSV and JSON downloads were valid and had the documented filenames.

Privacy and PWA:

- A complete real import/export flow made no cross-origin requests. Cold public
  routes also made no third-party requests. Source review found no analytics,
  trackers, CDN scripts, embedded secrets, or Azure endpoints.
- A live invalid-license restore made exactly one request to
  `api.sociobot.in`, received 200 `{valid:false}`, showed a useful error, and
  produced no CSP or console error.
- A 40-request concurrent burst to the verify endpoint completed in 431 ms:
  30 responses were 200 and 10 were 429. Every sampled 429 included
  `Retry-After: 4` (and `x-ratelimit-after: 4`). The observed burst allowance
  was 30 requests.
- This static product has no first-party backend and no sign-in, so backend
  concurrency/persistence and Entra authority checks are not applicable.
- The live manifest parsed with no browser errors. The active worker was
  `/sw.js`; after one online `/demo` visit, an offline reload returned 200 and
  rendered all 10 rows without errors.
- A controlled local two-version worker test changed the cache from
  `statement-bridge-v2` to `statement-bridge-v3-qa`: the app showed “An update
  is ready,” had a waiting worker, activated it through **Refresh app**, reloaded
  `/demo`, and removed the old cache without errors.

Deployment and policies:

- Live JS SHA-256 `b2e4ddac28bfee1a2825ffb4f572e210dcd1fec337bff3dc31ab5f50d971e9fc`
  exactly equals `dist/assets/main-zrM_AR3m.js`.
- Live CSS SHA-256 `b72369e01508d29eb0751e755c10bbfcb1f3e90e07825a7561965f63a1c00d78`
  exactly equals `dist/assets/style-HMnu4GGN.css`.
- Live worker SHA-256 `07b71964d16f921032bb65c7acdde73b7fe25a7a978ee7165ba5b8fb1a4218b4`
  and manifest SHA-256 `88df22659aa2299df36de9ef9f11c2ebef1ca33abcd9ce7473d8564ad86456a5`
  also exactly equal the candidate build.
- `/`, `/demo`, `/work`, `/privacy`, and `/terms` return 200. A random missing
  path returns the designed 404 with status 404. All same-origin links return
  200.
- Live CSP is restrictive and permits only self plus `https://api.sociobot.in`
  for connections. `X-Content-Type-Options`, `Referrer-Policy`, and HSTS are
  present. Hashed assets have one-year immutable caching; `sw.js` is no-cache.
- No console errors, page errors, failed resources, or horizontal overflow were
  found across all five routes locally and live in light and dark modes.

## Defects by severity

### P0 — The mobile first screen fails the explicit release gate

At 390×844 the image consumes the entire first viewport and continues below it.
The CTA starts at y=1,535 px. A cold visitor cannot see what the product does,
who it is for, or what to click first. The desktop layout passing does not cure
the required mobile experience.

### P0 — Unreviewed and amount-mismatched rows can be finalized as accepted

The matcher assigns high-confidence rows the final `accepted` status
automatically. Such rows have no Accept, Reject, or Undo control. Immediately
after import—before any human action—**Export reviewed CSV** included the row
and the audit history contained only the two import events.

Worse, a statement amount of `-$10.00` and ledger amount of `-$10.01` with the
same date/payee was labelled `MATCHED`, scored 95%, described as “Same amount,”
and put in the export. The matcher allows differences below 0.011. For a
financial reconciliation bridge, silently finalizing a one-cent discrepancy is
unsafe and contradicts “Matches are suggestions,” “You make the final call,”
and “Exports accepted reviewed rows.”

### P1 — Dark mode has serious Axe contrast failures

Axe 4.10.3 was injected through Playwright on every public route, both locally
and live, in light and dark schemes. Light mode had zero WCAG A/AA violations.
Dark mode reported serious `color-contrast` failures:

- Landing audience text: 1.5:1 (`#3b3e38` on `#1c211d`).
- Landing buy link: 2.66:1 (white on `#81a975`).
- Demo banner and both banner buttons: 1.4:1 (white on `#c6e2b7`).

This violates the required zero serious/critical result and 4.5:1 text
contrast. Lighthouse's 100 accessibility score covered only its default light
run and did not catch the alternate theme.

### P1 — Malformed OFX dates are accepted instead of rejected

`<DTPOSTED>BAD` with a valid amount imported without an error. After adding a
ledger, the UI rendered the statement date as `BAD--` and created an unmatched
row. CSV and QIF invalid dates are rejected, but OFX dates are never validated.
This fails defensive parsing of untrusted financial files.

### P1 — Keyboard focus is moved away after every review action

Every render focuses the h1, not only route changes. After keyboard-activating
**Accept**, focus jumped to “Review statement matches” at the top, forcing the
user to traverse the page again for the next exception. Initial page load also
focuses the h1, so the first Tab lands on the sample CTA instead of the skip
link; the skip link is not the first keyboard stop as intended.

### P1 — Public reliance claims remain outside the claims inventory

The claim list does not test several concrete promises, including “Debit and
credit columns also work,” real-work persistence across refresh, “Rules stay
in this browser,” “payment details never enter this app,” and the absence of
advertising analytics. The current local-only test covers only the demo flow,
not paid rules or all real-data paths. The claims contract makes unlisted
reliance claims release-blocking.

### P1 — Paid-product legal disclosure is incomplete

The product sells a $19 one-time unlock, but neither the landing page nor Terms
states that Sociobot/Dodo is merchant of record or that refunds are handled
there. The attached paid-unlock contract requires both disclosures.

### P2 — Several mobile targets are below 44×44 CSS px

At 390 px, the inline privacy/terms links are 16–19 px tall, the file inputs are
32 px tall, and the Demo nav link is 41.6 px wide. The repaired action buttons
are 44 px tall, but the baseline applies to every interactive target.

### P2 — Demo state is retained when leaving through header navigation

After entering from the landing sample action, using the header's **Reconcile
files** link removes the banner and enters real mode but leaves both `demo:`
keys behind. Only **Start for real** discards them. The demo contract says
leaving demo mode discards demo data unless the user explicitly keeps it.

### P2 — Visible markup residue appears in the workbench

The workspace text contains a literal `<>` between the header and match
summary, caused by fragment-like text embedded in an HTML string.

### P2 — Route metadata inventory is incomplete

`sitemap.xml` omits the real `/work` route. Non-home HTML entries also omit the
Open Graph/Twitter metadata required by the site-structure contract, and the
404 page does not use the standard header/footer skeleton.

## Required next steps

1. Make the 390 px first viewport lead with the job, audience, and sample CTA;
   constrain the hero image with an actual responsive height.
2. Keep machine matches as suggestions until a person explicitly accepts each
   one; allow rejection/undo for every proposal; export only explicit accepts.
   Compare monetary values in integer minor units and add a one-cent regression
   test.
3. Validate OFX dates and add malformed/truncated/oversized file coverage.
4. Fix dark-theme tokens and rerun Axe in both themes.
5. Preserve review focus, restore the skip link as the first tab stop, and make
   every mobile target at least 44×44 px.
6. Add every public claim to `claims.json` with a real behavioral test, add the
   required merchant/refund copy, and complete route metadata/sitemap coverage.
