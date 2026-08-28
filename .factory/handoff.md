# Polish 3 handoff

## Result

The release candidate is repaired and deployed. The application code deployed
from `edcbf76` at https://statement-reconcile-bridge.sociobot.in through static
deployment `c11f254a-0211-4446-a5ea-329dcfb16c9c`.

## What changed

- CSV and QIF import dates now use strict numeric calendar parsing. An
  impossible date such as `2026-02-30` is announced and rejected instead of
  being silently normalized and matched.
- Added the `match-score-reasons` claim and browser coverage for high,
  caution, and unmatched explanations.
- Direct `?demo=1` now proves the demo route title and canonical metadata after
  client rendering. Its test now verifies the separate namespace, persistent
  banner, reset, exit cleanup, and preservation of real data.
- Added a direct-route regression for metadata, legal links, route focus, and
  browser Back announcements. The demo workbench no longer offers an
  ambiguous second clear action; its banner owns reset.
- Documented `/demo` and `?demo=1` in the demo guide, refreshed the catalog
  sentence, and updated the landing copy audit.

## Verify locally

```sh
npm ci
npm run typecheck
npm run lint
npm test -- --grep @claim --workers=4
npm test
npm run build
```

The exact 17 claim commands listed in `.factory/claims.json` were also run
individually from a fresh remote clone at `/tmp/srb-clean-Sa3tnA/repo` after
`npm ci`. They all passed. In that clone, the complete Playwright suite passed
22/22 and `npm run build` produced `dist/` with 21.64 kB JavaScript (8.10 kB
gzip), 11.01 kB CSS (3.25 kB gzip), and an 89.38 kB hero WebP.

Local `verify-url.sh` passed with title, `lang`, one H1, a main landmark, alt
text, labels, and no load errors. Playwright Axe found zero serious or critical
issues across the public routes in light and dark modes. Mobile Lighthouse
measured 97 performance and 100 accessibility, with 2.467 s LCP and 0 CLS;
the JSON evidence is `/tmp/srb-polish-3/lighthouse-mobile.json`.

## Live verification

- Cold `verify-url.sh` passed at the live home. Evidence:
  `/tmp/srb-polish-3/live-verify/`.
- A live 390×844 cold visit kept the H1, audience, and sample action inside
  the first viewport at 307 px, 403 px, and 469 px respectively. Screenshot:
  `/tmp/srb-polish-3/live-home-mobile.png`.
- Live `?demo=1` showed its banner and 10 suggestions. Accepting and resetting
  did not change a seeded real sentinel. Start for real opened `/work`, removed
  all demo keys, and showed two file inputs. Screenshot:
  `/tmp/srb-polish-3/live-demo-query-mobile.png`.
- Live invalid CSV and QIF calendar dates produced visible alerts and zero
  matches; a valid following pair produced one suggestion.
- `/`, `/demo`, `/work`, `/privacy`, and `/terms` returned 200. Every
  first-party link resolved to 200. `/missing-polish-3` returned the designed
  404 with complete metadata, one H1, and a main landmark.
- Live Axe found no serious or critical finding across those routes and the 404
  in light and dark schemes. The offline live demo reload rendered 10 matches
  after service-worker readiness.
- The deployed JS and CSS hashes match `dist/` exactly:
  `b170090978811ee884af048df983b1bbaabfd6e56d5053f333c4634a483498d2` and
  `0bc98342e40e30e613b39d34479a7622f496ecc14154035094c5ae5ec8184e67`.

## Known gaps

None.

## Detailed closure map

See `.factory/polish-3.md` for every historical and current finding, its
durable correction, and its test, screenshot, or live-URL evidence.
