# Polish 5 handoff

## Result

**PASS.** Every finding from adversarial reviews 1–5 is fixed and rechecked.
The concrete-and-moss visual identity and static offline PWA class are
unchanged.

The round-5 layout defect came from the hero image retaining its 1024px HTML
height on desktop. Its responsive rule now uses `height: auto`, while the
declared dimensions continue to reserve a 3:2 layout box. All three decision
facts now end by 728.03px at 1440×900. The copy audit now contains the complete
landing and README copy with mechanically verified whitespace word counts.

The catalog description is now: “Reconcile statement and ledger files locally,
review every match, and export approved rows.” It starts with a verb and is 91
characters long.

## Release

- Application repair commit:
  `520ada3aaca84d59afe79b4d019a4f8d9c1de3b3`
- Branch: `main`; the application commit is pushed to `origin/main`.
- Deployment: `886aa4ee-2611-4e98-9ae7-114668900e77`
- Live URL: https://statement-reconcile-bridge.sociobot.in
- Deploy command:
  `/opt/fleet/lib/deploy-static.sh statement-reconcile-bridge dist`

## Verification evidence

- Clean clone: `/tmp/statement-reconcile-bridge-polish-5/clean` at `520ada3`.
  `npm ci` installed 22 packages with zero vulnerabilities.
- Every one of the 18 exact `.factory/claims.json` commands passed individually.
  Each claim ID has exactly one matching test tag.
- Clean-clone gates passed: `npm run typecheck`, `npm run lint`,
  `npm test -- --workers=1` (24/24), and `npm run build`.
- Production output: 21.57 kB JavaScript (8.07 kB gzip), 10.96 kB CSS
  (3.24 kB gzip), and 89.38 kB hero WebP. `dist/index.html` exists.
- Local URL verification passed at
  `/tmp/statement-reconcile-bridge-polish-5/local-verify/`.
- Cold live URL verification passed at
  `/tmp/statement-reconcile-bridge-polish-5/live-verify/`.
- Cold live screenshots:
  `/tmp/statement-reconcile-bridge-polish-5/live/home-desktop.png`,
  `/tmp/statement-reconcile-bridge-polish-5/live/home-mobile.png`,
  `/tmp/statement-reconcile-bridge-polish-5/live/demo-mobile.png`,
  `/tmp/statement-reconcile-bridge-polish-5/live/workbench-rule.png`, and
  `/tmp/statement-reconcile-bridge-polish-5/live/404-mobile.png`.
- Live route checks covered `/`, `/demo`, `/?demo=1`, `/work`, `/privacy`,
  `/terms`, and `/missing-polish-5`. Successful routes returned 200; the
  designed missing route returned 404.
- Route titles, descriptions, canonicals, Open Graph/Twitter fields, one H1,
  main landmarks, legal links, History API focus, and every discovered
  first-party link passed.
- The query demo loaded ten suggestions, used only `demo:` keys, reset to zero
  acceptances, removed its namespace on exit, and made no off-origin request.
- A live offline `/demo` reload rendered all ten rows. Successful routes logged
  no console or page errors.
- Live input replay rejected invalid CSV and QIF dates. A cleanup rule changed
  a match from 65% to 95%, all demo rows had reasons, and the selected ledger
  retained all 45 bytes through review and export.
- Playwright Axe found zero serious or critical issues across every route and
  the 404 in light and dark schemes.
- Live Lighthouse mobile scored 100 performance, 100 accessibility, 100 best
  practices, and 100 SEO. LCP was 1.2 s, CLS 0, and TBT 20 ms. Report:
  `/tmp/statement-reconcile-bridge-polish-5/lighthouse-live-mobile.json`.
- Live JS and CSS hashes exactly match `dist/`:
  `a6f450dbafeac5c951c11a6662a8c9e8b61257fbeec59a29196b1d380f8fcf4d`
  and `22b906bb13d60fd38f864dffd94f129dad5583aa3f6388d224fca011f4ea068e`.

## How to verify

```sh
npm ci
npm test -- --workers=1
npm run typecheck
npm run lint
npm run build
```

Use `/demo` or `/?demo=1` for isolated sample data. Use `/work` for private
files. Run each command recorded in `.factory/claims.json` for the claim gate.

## Known gaps and next steps

None. No blocking or minor review finding remains.
