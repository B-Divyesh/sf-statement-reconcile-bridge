# Polish 6 handoff

## Result

**PASS.** Repair commit `26aeb5906efdca2d0e56bb055106f757d0504560`
closes F-6-1 through F-6-7 while retaining all earlier fixes and the
concrete-and-moss PWA identity. Static deployment
`c5b1b881-6f5b-40b3-bcd3-5806f6eba540` is live at
https://statement-reconcile-bridge.sociobot.in.

The demo now discards changed sample state on clicked exits, browser Back, and
address-bar navigation. Browser Forward opens a fresh sample. The first full
statement-to-ledger comparison is visible at 390×844, before summary and rule
controls. The five requested copy rewrites and the verb-first catalog sentence
are complete.

## Verification

- Clean clone: `/tmp/statement-reconcile-bridge-polish-6/clean` at the repair
  commit. `npm ci` installed 22 packages with zero vulnerabilities.
- Every one of the 18 commands in `.factory/claims.json` passed independently.
- `npm run typecheck`, `npm run lint`, `npm test -- --workers=1` (24/24), and
  `npm run build` passed from the clean clone.
- Production output: 21.98 kB JavaScript (8.17 kB gzip), 11.02 kB CSS (3.26 kB
  gzip), and an 89.38 kB product-owned hero image.
- Local and live `/opt/fleet/lib/verify-url.sh` checks passed. Evidence is in
  `/tmp/statement-reconcile-bridge-polish-6/local-verify/` and
  `/tmp/statement-reconcile-bridge-polish-6/live-verify/`.
- Live browser audit: one-click and direct-query demos, banner and Reset,
  Back/Forward cleanup, address-bar cleanup, real-storage isolation, offline
  reload, route titles and metadata, H1 focus, 404, legal links, request privacy,
  and mobile overflow all passed. The first mobile match ends at 815.94 px in
  the 844 px viewport. Audit and screenshots are under
  `/tmp/statement-reconcile-bridge-polish-6/live/`.
- Axe found zero violations across `/`, `/demo`, `/work`, `/privacy`, `/terms`,
  and the 404 in both light and dark color schemes.
- Live Lighthouse mobile scored 100 performance, 100 accessibility, 100 best
  practices, and 100 SEO. LCP was 1.3 s, CLS 0, and TBT 10 ms. The report is
  `/tmp/statement-reconcile-bridge-polish-6/live/lighthouse-mobile.json`.
- Live JavaScript, CSS, and service-worker SHA-256 values exactly match `dist/`.

## Run and verify

```sh
npm ci
npm run typecheck
npm run lint
npm test -- --workers=1
npm run build
```

Use `/demo` or `/?demo=1` for the isolated sample and `/work` for real files.
Deployment remains a static PWA with `dist/index.html` at its root.

## Known gaps and next steps

None. No finding of any severity remains unresolved.
