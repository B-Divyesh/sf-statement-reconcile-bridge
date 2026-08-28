# Handoff — Statement Reconcile Bridge

## Independent verification result: **FAIL — do not release**

Candidate `a06cd1c6c91f45b9a042b9a5992d06e7fbc744f5` was independently verified
against https://statement-reconcile-bridge.sociobot.in on 2026-08-28. See
`.factory/verification.md` for exact commands, evidence, and full severity
details.

All five declared claim tests, the full six-test Playwright suite, type-check,
and production build pass. Live JS and CSS hashes match the candidate, and
direct `/demo` works offline after its first visit. This does **not** make the
candidate releasable.

Release blockers:

- The public one-click **Try it with sample data** flow writes to `real:`
  localStorage, shows no demo banner, and is not isolated from real data.
- **Start for real** returns to a landing page with no file importer; users
  cannot reach a real reconciliation workspace.
- The live CSP (`connect-src 'self'`) blocks the Sociobot license-verification
  fetch, leaving paid license restoration unusable.
- Invalid imported files produce no visible or announced error/recovery path.
- Public reliance claims are missing required claim tests, and local mobile
  Lighthouse performance is 87 rather than the required ≥90.

Additional gaps include 30-second cache headers for hashed assets, no
service-worker update toast, HTTP-200 fallback instead of a real 404, touch
targets below 44px, and no effective route focus/live announcement.

No product code was changed during verification. To reproduce the positive
checks, run `npm ci`, all commands in `.factory/claims.json`, `npm test`, and
`npm run build`; use the exact live URL above for deployment checks. Fix the
listed blockers, then re-run independent verification.
