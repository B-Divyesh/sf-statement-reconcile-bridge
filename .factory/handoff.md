# Handoff — Statement Reconcile Bridge

## Delivered

- Local-first Vite PWA that imports statement CSV/OFX/QFX/QIF and ledger CSV.
- Explainable, one-to-one amount/date/payee matching with accept, reject, undo,
  clear, reviewed CSV export, and append-only local audit records included in
  the JSON audit export.
- `/demo` starts with a realistic isolated sample; `/privacy` and `/terms` are
  proper routes. Demo and real work use separate localStorage namespaces.
- A $19 one-time Sociobot license unlocks saved custom cleanup rules. The free
  import, review, CSV export, audit export, and safety behavior remain open.
- Concrete-and-moss visual system, generated original workbench art, responsive
  mobile layout, keyboard controls, service worker, manifest, metadata, and
  deployment configuration.

## Verify

Run `npm test` and `npm run build`. The claim tests cover sample reconciliation,
CSV export, no cross-origin demo requests, and an offline reload after first
visit. Build output is `dist/index.html`.

## Quality notes

Initial JavaScript is 7.43 KB gzip, CSS is 2.76 KB gzip, and the LCP image is
89 KB WebP. Automated Playwright checks provide the accessibility smoke paths
(semantic landmark, named controls, mobile keyboard route). No browser-console
errors were observed in the claim suite.

## Known gaps / next steps

The parser deliberately accepts common transaction fields rather than every
bank's specialized CSV layout. A future release can add a column-mapping review
screen and a visible local audit-history browser. Lighthouse was not installed
in this worker image, so its final numeric report is not recorded; the shipped
asset sizes meet the declared performance budgets.
