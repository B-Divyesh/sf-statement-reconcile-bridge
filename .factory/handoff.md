# Verification handoff — FAIL

## Result

**FAIL — do not release candidate
`cdd19453a98b42d09397628ba897d721640ca68b`.** The deployed product at
https://statement-reconcile-bridge.sociobot.in matches the candidate, but fresh
independent QA found release-blocking mobile, reconciliation-integrity,
accessibility, input-validation, and claims-contract defects.

The complete evidence and reproduction details are in
`.factory/verification-2.md`. No product source was modified during this
verification.

## Main blockers

- At 390×844 the cold first viewport shows only navigation and a 1,024 px-tall
  image crop. The headline, audience sentence, and sample CTA are below it; the
  CTA begins around y=1,535 px.
- High-confidence matches are automatically finalized as `accepted`, cannot be
  rejected, and are exported before any review. A `-$10.00` statement row was
  incorrectly matched and exported against a `-$10.01` ledger row at 95% while
  described as the “Same amount.”
- Axe reports serious dark-mode contrast failures as low as 1.4:1.
- Malformed OFX dates such as `BAD` are accepted and rendered as `BAD--`.
- Review actions and initial load force focus to the h1, breaking efficient
  keyboard use and bypassing the skip link.
- Public claims remain unlisted/untested, and paid merchant/refund disclosures
  are missing.

## Verification summary

- Mandatory first-read: desktop PASS; 390 px mobile FAIL.
- `npm ci`: PASS, 0 vulnerabilities.
- Every one of 13 exact claim commands: PASS after install.
- `npm test`: PASS, 15/15.
- `npm run build`: PASS; `dist/` produced.
- Live deployment identity: PASS by exact JS, CSS, worker, and manifest hashes.
- Live Lighthouse mobile: 93 performance, 100 accessibility, 100 best
  practices, 100 SEO; LCP 1.6 s, CLS 0.
- Axe across five local and five live routes, light/dark: FAIL in dark mode;
  serious contrast findings on `/` and `/demo`.
- Live offline reload: PASS. Simulated service-worker update/activation: PASS.
- Privacy network capture: PASS for demo and real import/export; only explicit
  license restore contacts `api.sociobot.in`.
- Billing rate limit: PASS; a 40-request burst yielded 30×200 and 10×429, with
  `Retry-After: 4`.
- Live routes/security/caching/404: PASS. No console or page errors observed.

## Re-run

```sh
npm ci
npm test
npm run build
```

After repairs, rerun every command in `.factory/claims.json`, then repeat the
independent amount-mismatch, pre-review export, 390 px first-screen, dark Axe,
malformed OFX, and keyboard-focus cases documented in
`.factory/verification-2.md`.
