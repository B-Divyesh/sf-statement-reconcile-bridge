# Statement Reconcile Bridge

Reconcile a downloaded bank statement with a private ledger without a bank
login. It is for people who already keep a spreadsheet or local CSV and want a
small monthly handoff tool instead of another budget app.

The app reads CSV, OFX/QFX, and QIF statement files plus a ledger CSV. It
normalizes payee text, proposes one-to-one matches, lets you review exceptions,
and exports accepted rows plus a JSON audit report. Files stay in browser
storage and are never sent to a server.

The complete reconciliation flow is free. A $19 one-time optional license
unlocks saved custom cleanup rules for recurring bank wording. Checkout and
license verification use the Sociobot billing service; payment details never
enter this app.

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
npm run build
```

The static deployment output is `dist/`, with `index.html` at its root. The
test suite includes the listed product claims, CSV export, local-only requests,
and an offline demo reload.

## Privacy and limits

This app asks for no bank credentials. Matches are suggestions, not financial
advice. Review them before changing your primary ledger. See `/privacy` and
`/terms` in the running app.

## License

MIT. See [LICENSE](LICENSE).
