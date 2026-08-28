# Handoff — Statement Reconcile Bridge repair

## Result

Repaired every release blocker recorded in `.factory/verification.md` for
candidate `a06cd1c6c91f45b9a042b9a5992d06e7fbc744f5`. The product remains a
static Vite TypeScript PWA, deploys from `dist/`, and keeps its local-first
reconciliation behavior.

## Repairs

- The landing **Try it with sample data** action now changes route and storage
  mode before it writes. It creates only
  `demo:statement-reconcile-bridge:*` state, displays the persistent demo
  banner, and leaves real state untouched.
- Added `/work`, linked from landing navigation and **Start with your files**.
  **Start for real** discards demo state and reaches the two-file real importer.
- Import, empty license, and rule-form failures now render a visible,
  persistent `role=alert` message with recovery guidance.
- Allowed only `https://api.sociobot.in` in CSP `connect-src`; recorded browser
  coverage proves the restore flow consumes an API verdict. No billing request
  is made until the visitor explicitly restores a license.
- Added 13 claim entries and exact Playwright coverage for demo isolation,
  free reconciliation, CSV/OFX/QIF input, one-to-one matching, both exports,
  local-only use, no bank login, offline reload, license verification, $19
  price, and no budget advice.
- Added route-specific build entries for `/demo`, `/work`, `/privacy`, and
  `/terms`, removed the catch-all navigation fallback, and retained the
  Static Web Apps 404 override. Unknown URLs can now receive a real 404.
- Hashed assets receive immutable one-year cache headers. The service worker
  uses a versioned cache, clears old caches, and reports an available update
  with an in-app refresh control before `skipWaiting`.
- Raised demo and review controls to 44px, made route headings focusable,
  populated the route live region, and added a local `/404.css` so the CSP does
  not block the designed 404 page.

## Verification evidence

Executed from a clean install on 2026-08-28:

- `npm ci` — pass; 0 vulnerabilities.
- `npm test` — pass; **15/15 Playwright** tests. This covers desktop, 390px
  mobile, keyboard Enter navigation, route focus, error announcements,
  importer workflows, download content, privacy network capture, and offline
  reload.
- `npm run build` — pass (`tsc --noEmit && vite build`); `dist/index.html` and
  static route entries are produced. Gzipped initial JS is **8.09 KB**, CSS is
  **3.12 KB**, and hero WebP is **89.38 KB**.
- Every declared claim has one exact `@claim:` test tag; the full clean suite
  passed, and the individual claim commands were spot-checked from the
  generated claim inventory.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 /tmp/statement-bridge-verify`
  — pass: HTTP 200, title, `lang=en`, one h1, main landmark, image alt, and no
  load errors.
- Axe 4.11 injected through Playwright on `/`, `/demo`, `/work`, `/privacy`,
  and `/terms` — **0 total WCAG 2A/AA violations** (therefore 0 serious or
  critical). The standalone Axe CLI was unavailable because it cannot locate a
  system Chrome binary; the equivalent run used Playwright Chromium.
- Console/page-error smoke at 1440px and 390px across every public route —
  **0 errors**.
- Mobile Lighthouse (Playwright Chromium, local production preview) —
  **99 performance, 100 accessibility**; FCP 1.1s, LCP 2.0s, TBT 0ms, CLS 0.
- Static deployment policy checked: no catch-all navigation fallback, an
  explicit 404 rewrite, immutable `/assets/*` caching, no-cache worker, and
  the scoped Sociobot billing CSP origin.

## Run and deploy

```sh
npm ci
npm test
npm run build
```

Deploy `dist/` as the existing static artifact. The checked-in
`staticwebapp.config.json` is part of the artifact and supplies production
security, cache, route, and 404 behavior.

## Known gaps

None in the repaired product. Live deployment and identity/hash verification
must be performed by the configured factory deployment after this commit is
pushed; this container has no repository-specific deploy script or deployed
credentials.
