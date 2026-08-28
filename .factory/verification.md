# Independent verification — FAIL

**Candidate:** `a06cd1c6c91f45b9a042b9a5992d06e7fbc744f5`  
**Live URL:** https://statement-reconcile-bridge.sociobot.in  
**Verified:** 2026-08-28 (fresh `npm ci`; no product-source changes made by the verifier)

## Decision

**FAIL — do not release.** The landing-page demo is not isolated, a real user
has no route to the real importer, and the deployed CSP blocks the paid
license-verification request. These are independent of the passing test suite.

## First-read result (cold live page)

Pass. A fresh 1440px browser loaded with HTTP 200 and no console/page errors.
The first screen says “Reconcile your statement with your ledger”; it identifies
people with a private budget file checking a monthly bank download; and the
first action is “Try it with sample data” followed by “See suggested matches
right away.” It includes the three plain facts about browser-only files,
offline use, and the free core job.

## Required claim tests — all passed from the demo entry point

Executed after `npm ci`, exactly as declared in `.factory/claims.json`:

| Claim ID | Command | Result |
| --- | --- | --- |
| `sample-reconcile` | `npm test -- --grep @claim:sample-reconcile` | PASS — 1 test, sample queue showed 10 statement rows / 11 ledger rows |
| `csv-export` | `npm test -- --grep @claim:csv-export` | PASS — 1 test, reviewed CSV header and accepted rows asserted |
| `local-only` | `npm test -- --grep @claim:local-only` | PASS — 1 test, only same-origin requests in the direct `/demo` flow |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS — 1 test, 10 sample matches after offline reload |
| `paid-license` | `npm test -- --grep @claim:paid-license` | PASS — 1 test, cached/fixture verdict unlocks rules |

The direct `/demo` claim coverage does not cover the landing-page transition
used by real visitors; that transition is broken below.

## Local checks and end-to-end exercise

- `npm test`: **PASS**, 6/6 Playwright tests.
- `npm run build`: **PASS** (`tsc --noEmit && vite build`), producing `dist/`.
  No separate lint or type-check script exists; the build performs the available
  type check.
- Built gzip sizes: JS **7,431 B**, CSS **3,010 B**, hero WebP **89,451 B**;
  each is within the specified asset budget.
- Direct `/demo` normal CSV import: two rows reconciled, two accepted (100%).
  OFX and QIF one-row fixtures each imported and matched correctly.
- Boundary fixture: two same-value statement rows against one unrelated
  same-value ledger row produced one `suggested` and one `unmatched` row,
  preserving one-to-one assignment.
- Live PWA: after a first online `/demo` visit and SW readiness, an offline
  reload displayed the heading and 10 matches. The active worker was
  `/sw.js` and no errors occurred.
- Privacy/network smoke: cold live page requested only the live origin’s HTML,
  JS, CSS, and hero image. The declared local-only test passed in direct demo.
  Source review found no analytics or external runtime request except the
  Sociobot billing endpoint.
- No sign-in is present. The billing verify endpoint rate limit was exercised
  with 40 invalid-token requests at concurrency 20: **30× 200, 10× 429**;
  a 429 was observed by request file 28 and included `Retry-After: 3` and
  `x-ratelimit-after: 3`.
- Deployment match: live `index-BjBvZRc1.js` SHA-256 is
  `3b265186754ae00da8360341d188da02d9bb88a1e9fac6eca64678b01760a3f9`
  and live `style-B95fODY6.css` is
  `8dae536db5153c9a22af1b0b59e10a14595c9f4c9488928d5edd73f67bb5f31d`;
  both equal this candidate’s production build.
- `/opt/fleet/lib/verify-url.sh <url> <evidence-dir>` passed locally: title,
  `lang=en`, exactly one h1, main landmark, image alt, and no console errors.
  Its first invocation with only a URL was invalid because the tool requires
  an evidence-directory argument.
- Axe injected through Playwright on `/`, `/demo`, `/privacy`, and `/terms`
  found **zero serious or critical** violations. It reported one minor
  `aria-allowed-role` violation on `/demo`.
- Local mobile Lighthouse (Chrome/Playwright Chromium) was **87 performance,
  100 accessibility**: FCP 1.0 s, LCP 2.0 s, TBT 480 ms, CLS 0. This misses
  the required mobile performance score of at least 90.

## Release-blocking defects

### P0 — Landing “Try it with sample data” writes to real storage, not demo storage

Reproduction in a fresh context at `/`: click **Try it with sample data**.
The URL becomes `/demo`, but the page has no demo banner, labels itself “Your
local reconciliation,” and localStorage contains only
`real:statement-reconcile-bridge:state` and
`real:statement-reconcile-bridge:audit`. It does not contain the documented
`demo:` namespace. Therefore the one-click public demo is neither visibly
marked nor isolated, and can overwrite/read the real namespace. This violates
the demo-sandbox and privacy acceptance contract.

### P0 — There is no reachable real-data import workflow

From a direct `/demo` visit, clicking **Start for real** goes to `/`. The
result has the landing h1, zero `input[type=file]` elements, no demo banner,
and only “Try it with sample data” as the first button. There is no other
documented or navigable real workspace route. The real job (upload a user’s
statement and ledger, then reconcile) is inaccessible without relying on the
broken demo route.

### P1 — Live CSP blocks paid license verification

On the live landing page, entering an invalid test token and clicking
**Restore license** emitted:

> Connecting to `https://api.sociobot.in/api/v1/products/statement-reconcile-bridge/verify?...` violates `connect-src 'self'`.

No API request left the browser. Direct curl to the same endpoint returned
HTTP 200 JSON, so it is the deployed CSP that prevents all client-side license
verification. The fixture claim only seeds a cached valid verdict and cannot
detect this. The purchased custom-rules feature cannot verify or recover a
license in production.

### P1 — Invalid-file and other user errors are not visible or announced

After clearing the direct demo, uploading
`date,merchant,amount / not-a-date,Thing,nope` leaves the import screen
unchanged. The expected parse error is neither in `<main>` nor in the empty
`aria-live` element. The same rendering path hides blank-license and rule-form
feedback on the landing page. This prevents recovery from invalid untrusted
files and fails the required form/error behavior.

### P1 — Claim inventory is incomplete

`claims.json` does not cover several visitor-reliance claims in the landing
page and README, including CSV/OFX/QIF import, one-to-one matching, audit
export, no bank login, the free core reconciliation job, the exact $19 price,
and no budget advice. The claims contract requires each such claim to be
listed and demonstrated from the sandbox. The direct-demo test also fails to
cover the public first-screen demo transition, which allowed the P0 isolation
defect to pass.

### P1 — Mobile Lighthouse performance gate missed

The required Lighthouse-class mobile score is ≥90; the fresh local production
build scored 87 performance (TBT 480 ms), although accessibility scored 100.

## Other defects / contract gaps

### P2 — Cache and update behavior do not meet the PWA contract

Live hashed JS and CSS, plus `sw.js`, are served with
`Cache-Control: public, must-revalidate, max-age=30`, not long-lived immutable
caching. `public/sw.js` has `skipWaiting` and `clients.claim` but no
update-detection message or in-app “update available” toast, so users have no
controlled update path.

### P2 — Missing real 404 response

Live `/no-such-route` returns HTTP 200 with `index.html` and renders the
landing page, rather than the required designed 404 response.

### P2 — Mobile touch targets are below 44 px

At 390px, Reset demo and Start for real measure 32px high; Accept and Reject
measure 36px high. The acceptance target is at least 44×44 CSS px. The CSS
defines these reduced sizes explicitly.

### P2 — SPA route focus/announcement is ineffective

The render code calls `h1.focus()` without making the h1 focusable, and the
`#route-note` polite live region is never populated. Route changes therefore
do not provide the required focus move or announcement.

## Required fixes before re-verification

1. Separate real and demo routes/state at navigation time; have the landing
   sample action enter a true `demo:` sandbox with its banner, and add a
   reachable real workspace/import route.
2. Permit only the required Sociobot billing origin in `connect-src`; verify a
   real license path with a safe fixture/staging token and display all outcomes.
3. Render parse/form errors in a persistent, visible `aria-live` status/error
   region with a next action.
4. Complete and execute claim coverage for every public reliance claim,
   including the landing-button sandbox transition.
5. Meet the mobile performance, caching, service-worker update, 404, route
   focus, and 44px target requirements; then rerun the full verification.
