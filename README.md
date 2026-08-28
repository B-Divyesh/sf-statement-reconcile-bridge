# Statement Reconcile Bridge

Reconcile a downloaded bank statement with a private ledger without a bank
login. It is for people with a spreadsheet or local CSV who need a monthly
handoff tool, not another budget app.

The app reads CSV, OFX/QFX, and QIF statement files plus a ledger CSV. It
proposes one-to-one exact-cent matches. Review each match. Export accepted rows
and a JSON audit report. Files stay in browser storage and are never sent to a
server.

The complete reconciliation flow is free. Save local cleanup rules for recurring
bank wording without an account.

## Run it

```sh
npm install
npm run dev
```

Open `http://localhost:5173`. Use `/work` to import your statement and ledger
files, or `/demo` for a ready-to-review sample that uses a separate
local-storage namespace. The app works offline after its first visit because
the service worker stores the app shell.

## Verify and build

```sh
npm test
npm run typecheck
npm run lint
npm run build
```

The static deployment output is `dist/`, with `index.html` at its root. The
test suite includes the listed product claims, CSV export, local-only requests,
and an offline demo reload.

## Privacy and limits

This app asks for no bank credentials. Matches are suggestions. Review them
before relying on them. See `/privacy` and `/terms` in the running app.

## License

MIT. See [LICENSE](LICENSE).
