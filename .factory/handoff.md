# Review 4 handoff

## Result

**PASS-ready.** The product repair is commit
`b67814c06556a8c177319fd0969cf744afc87b36`, pushed to `main` and deployed as
Azure Static Web Apps deployment `7383a5a6-9b6c-4c83-815a-2c891a0a5eb5`.
The live URL is https://statement-reconcile-bridge.sociobot.in.

This round removed the slogan-only hero caption and added a real
`input-files-unchanged` claim. The browser test retains a selected ledger
fixture, imports it, accepts a suggestion, exports CSV, and compares the
fixture's bytes before and after. The catalog description is now a verb-first,
86-character sentence.

## Verification

- Fresh remote clone: `/tmp/srb-polish-4-clean-7paD3e/repo`, cloned with
  `--depth 1` after the repair was pushed. `npm ci` installed 22 packages with
  zero vulnerabilities.
- Every one of the 18 exact commands listed in `.factory/claims.json` passed
  individually from that clean clone. The confirming
  `npm test -- --grep @claim --workers=4` passed 18/18, and the mechanical
  inventory check found exactly one `@claim:<id>` tag for every claim.
- Clean clone: `npm run typecheck`, `npm run lint`, `npm test -- --workers=1`
  (23/23), and `npm run build` all passed. The build emitted `dist/` with
  21.57 kB JavaScript (8.07 kB gzip), 10.95 kB CSS (3.23 kB gzip), and the
  89.38 kB product-owned hero WebP.
- Local `/opt/fleet/lib/verify-url.sh` passed against the production build;
  evidence: `/tmp/srb-polish-4/local-verify/`.
- Live `/opt/fleet/lib/verify-url.sh` passed cold; evidence:
  `/tmp/srb-polish-4/live-verify/`.
- Live Playwright sweep confirmed `/`, `/demo`, `/work`, `/privacy`, and
  `/terms` return 200 with titles, one H1, main, legal links, canonical,
  Open Graph, Twitter, favicon, and Apple-touch metadata. The designed
  `/missing-polish-4` route returns 404 with the matching route metadata.
- Live Axe found zero serious or critical findings on those five routes plus
  the designed 404 in both light and dark schemes. The 390 px screenshots are
  `/tmp/srb-polish-4/live-browser/home-mobile.png` and
  `/tmp/srb-polish-4/live-browser/demo-mobile.png`.
- Live mobile first-screen bottoms were H1 306.7 px, audience 403.2 px, and
  sample action 469.2 px in a 390×844 viewport. The same replay confirmed
  `?demo=1`, the persistent banner, 10 suggestions, reset, isolated storage,
  and **Start for real** opening `/work` while removing demo keys.
- Live file-integrity replay retained a ledger fixture through import, explicit
  acceptance, and CSV export. Its bytes were unchanged and the flow made zero
  off-origin requests.
- Live offline replay rendered all 10 sample rows after a service-worker-ready
  visit. History navigation focused the new H1 and announced the route.
  A full live link crawl found 10/10 navigable first-party links returned 200;
  the 404 page's own skip anchor intentionally returned 404.
- Live deployed JavaScript and CSS SHA-256 values matched `dist/` exactly:
  `a6f450dbafeac5c951c11a6662a8c9e8b61257fbeec59a29196b1d380f8fcf4d` and
  `8c2171146ee42a75192a36b16eaff8d1fd4768644bb47055ff45b31024b55de2`.
- Mobile Lighthouse on the live URL: performance 99, accessibility 100, best
  practices 100, SEO 100, LCP 1.3 s, CLS 0. JSON evidence:
  `/tmp/srb-polish-4/lighthouse-mobile.json`.

## How to run and verify

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm test -- --workers=1
npm run build
```

Use `/demo` or `/?demo=1` for isolated sample data. Use `/work` for real
files. See `.factory/claims.json` for every exact claim command.

## Known gaps and next steps

None. No paid feature is exposed because the historical checkout destination
was unavailable; cleanup rules remain a free local feature. The static PWA,
privacy boundaries, legal pages, and concrete-and-moss visual identity are
unchanged.
