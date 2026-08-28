# Repair handoff

## Result

All release blockers in independent verification commit
`e4d2ff42de330d936a041d5dbab73e30c640ef7d` for candidate
`cdd19453a98b42d09397628ba897d721640ca68b` were repaired. The product remains
a static, local-first PWA with the original concrete-and-moss visual system.

## Repairs

- The 390 px layout now places the job, audience, and sample action before a
  constrained illustration. All visible interactive targets measure at least
  44 by 44 CSS pixels.
- Machine matches always begin as suggestions. A person must accept a row
  before CSV export includes it. Accepted and rejected decisions can be undone,
  and keyboard focus stays on the same review row.
- Matching compares integer cents. A `-$10.00` statement no longer pairs with
  a `-$10.01` ledger row.
- OFX dates are calendar-validated. Missing amounts and files over 5 MB produce
  visible, announced errors, and a later valid upload clears the error.
- Dark-theme banner, paid-link, body-copy, and error colors now meet contrast
  requirements. Axe checks cover all five public routes in both color schemes.
- The skip link is the first initial keyboard stop. H1 focus and route
  announcements happen only after SPA navigation, not after each review action.
- Leaving demo mode through any navigation deletes both demo keys. The stray
  `<>` workbench text was removed.
- The paid section and Terms name Sociobot/Dodo as merchant of record and state
  that they handle refunds. No payment fields exist in the app.
- `/work` is in the sitemap. Every HTML entry has route-specific canonical,
  Open Graph, Twitter, icon, description, and title metadata. The static 404 now
  uses the shared header/main/footer structure.
- The 18-entry claim inventory covers debit/credit import, exact-cent one-to-one
  matching, manual review, real-work persistence, browser-only rules, payment
  handling, and the absence of advertising analytics. Each claim tag occurs
  exactly once in the browser suite.
- Service-worker first install no longer shows a false update notice. A waiting
  worker still exposes the controlled **Refresh app** action.

## Verification evidence

- Clean install: `npm ci` — 22 packages installed, 23 audited, 0 vulnerabilities.
- Every exact command in `.factory/claims.json` — 18 of 18 passed separately.
- Full suite: `npm test` — 22 of 22 passed, including desktop, 390 px mobile,
  keyboard, dual-theme Axe, privacy-network, offline reload, malformed input,
  one-cent mismatch, and metadata regressions.
- Static checks: `npm run typecheck` and `npm run lint` — passed.
- Production build: `npm run build` — passed and produced `dist/index.html`.
  Main JS is 22.30 KB (8.47 KB gzip), CSS is 11.13 KB (3.28 KB gzip), and the
  hero WebP is 89.38 KB.
- Local `verify-url.sh` — `/`, `/demo`, `/work`, `/privacy`, and `/terms` each
  returned 200 with the expected title, `lang=en`, one H1, one main landmark,
  alt text, and no console errors.
- Local mobile Lighthouse — performance 100, accessibility 100, best practices
  100, SEO 100; FCP 0.9 s, LCP 1.8 s, TBT 40 ms, CLS 0, total transfer 101 KiB.
- Controlled two-version service-worker exercise — first install showed no
  update notice; the next worker waited, **Refresh app** activated it, the old
  cache was removed, and all 10 demo rows remained after reload.

## Deployment

Deployment and final live identity, response-policy, offline, and route checks
are recorded in the final section below after upload.

## Known gaps

None found in the repaired scope. Synthetic Lighthouse does not report field
INP; interaction tests exercise the review controls directly.
