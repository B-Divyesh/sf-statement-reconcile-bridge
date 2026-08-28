import "./style.css";
import "./paid.css";
import "./repair.css";
import heroUrl from "./assets/reconcile-workbench.webp";
import {
  ledgerSample,
  statementSample,
  type Match,
  type Transaction,
} from "./data";
import { makeMatches, parseFile, type CleanupRule } from "./reconcile";

type Stored = {
  statement: Transaction[];
  ledger: Transaction[];
  matches: Match[];
  rules: CleanupRule[];
  updated: string;
};
type AuditEntry = { at: string; action: string; detail: string };
type NoticeKind = "status" | "error";
const app = document.querySelector<HTMLDivElement>("#app")!;
let activeRoot = storageRoot();
let state = load(activeRoot) || initialState(activeRoot);
let notice = "";
let noticeKind: NoticeKind = "status";
let updateReady = false;
let registration: ServiceWorkerRegistration | undefined;
let applyingUpdate = false;
const siteOrigin = "https://statement-reconcile-bridge.sociobot.in";

type RouteMetadata = {
  title: string;
  description: string;
  canonicalPath: string;
};

function isDemoRoute() {
  return (
    location.pathname === "/demo" ||
    new URLSearchParams(location.search).get("demo") === "1"
  );
}
function storageRoot() {
  return isDemoRoute()
    ? "demo:statement-reconcile-bridge:"
    : "real:statement-reconcile-bridge:";
}
function sampleState(): Stored {
  return {
    statement: structuredClone(statementSample),
    ledger: structuredClone(ledgerSample),
    matches: makeMatches(statementSample, ledgerSample),
    rules: [],
    updated: "",
  };
}
function initialState(root: string): Stored {
  return root.startsWith("demo:")
    ? sampleState()
    : { statement: [], ledger: [], matches: [], rules: [], updated: "" };
}
function load(root: string): Stored | null {
  try {
    return JSON.parse(localStorage.getItem(root + "state") || "null");
  } catch {
    return null;
  }
}
function save() {
  state.updated = new Date().toISOString();
  localStorage.setItem(activeRoot + "state", JSON.stringify(state));
}
function auditHistory(): AuditEntry[] {
  try {
    return JSON.parse(localStorage.getItem(activeRoot + "audit") || "[]");
  } catch {
    return [];
  }
}
function logAudit(action: string, detail: string) {
  const records = auditHistory();
  records.push({ at: new Date().toISOString(), action, detail });
  localStorage.setItem(activeRoot + "audit", JSON.stringify(records));
}
function syncRouteState() {
  const next = storageRoot();
  if (next !== activeRoot) {
    if (activeRoot.startsWith("demo:") && !next.startsWith("demo:"))
      clearDemoStorage();
    activeRoot = next;
    state = load(next) || initialState(next);
    state.rules ||= [];
  }
}
function clearDemoStorage() {
  localStorage.removeItem("demo:statement-reconcile-bridge:state");
  localStorage.removeItem("demo:statement-reconcile-bridge:audit");
}
function tell(message: string, kind: NoticeKind = "status") {
  notice = message;
  noticeKind = kind;
}
function money(v: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(v);
}
function esc(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        c
      ]!,
  );
}
function routeMetadata(path: string): RouteMetadata {
  if (isDemoRoute())
    return {
      title: "Demo — Statement Reconcile Bridge",
      description: "Try statement reconciliation with isolated sample data.",
      canonicalPath: "/demo",
    };
  if (path === "/privacy")
    return {
      title: "Privacy — Statement Reconcile Bridge",
      description:
        "How Statement Reconcile Bridge keeps transaction files local.",
      canonicalPath: "/privacy",
    };
  if (path === "/terms")
    return {
      title: "Terms — Statement Reconcile Bridge",
      description: "Terms for using Statement Reconcile Bridge.",
      canonicalPath: "/terms",
    };
  if (path === "/work")
    return {
      title: "Reconcile files — Statement Reconcile Bridge",
      description: "Import and reconcile private statement and ledger files.",
      canonicalPath: "/work",
    };
  if (path !== "/")
    return {
      title: "Not found — Statement Reconcile Bridge",
      description: "Page not found in Statement Reconcile Bridge.",
      canonicalPath: "/404",
    };
  return {
    title: "Statement Reconcile Bridge — Reconcile statement files",
    description:
      "Reconcile a bank statement with your private ledger, without a bank login.",
    canonicalPath: "/",
  };
}
function setRouteMetadata(path: string) {
  const metadata = routeMetadata(path);
  document.title = metadata.title;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", metadata.description);
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute("href", `${siteOrigin}${metadata.canonicalPath}`);
  for (const selector of [
    'meta[property="og:title"]',
    'meta[name="twitter:title"]',
  ])
    document.querySelector(selector)?.setAttribute("content", metadata.title);
  for (const selector of [
    'meta[property="og:description"]',
    'meta[name="twitter:description"]',
  ])
    document
      .querySelector(selector)
      ?.setAttribute("content", metadata.description);
}
function nav(path: string) {
  if (activeRoot.startsWith("demo:") && !path.startsWith("/demo"))
    clearDemoStorage();
  history.pushState({}, "", path);
  render({ routeChange: true });
  window.scrollTo({ top: 0, behavior: "auto" });
}
window.addEventListener("popstate", () => render({ routeChange: true }));
window.addEventListener("pagehide", () => {
  if (activeRoot.startsWith("demo:")) clearDemoStorage();
});
document.addEventListener("click", (event) => {
  const link = (event.target as Element).closest<HTMLAnchorElement>(
    "a[data-route]",
  );
  if (link) {
    event.preventDefault();
    nav(link.getAttribute("href")!);
  }
});

function message() {
  return notice
    ? `<p id="app-message" class="message ${noticeKind}" role="${noticeKind === "error" ? "alert" : "status"}" aria-live="${noticeKind === "error" ? "assertive" : "polite"}">${esc(notice)}</p>`
    : "";
}
function updateToast() {
  return updateReady
    ? `<div class="update-toast" role="status">An update is ready. <button data-action="update">Refresh app</button></div>`
    : "";
}
function shell(content: string) {
  const demo = activeRoot.startsWith("demo:");
  return `${demo ? `<div class="demo-banner" role="status">Demo — sample data, nothing is saved <span><button data-action="reset">Reset demo</button><button data-action="real">Start for real</button></span></div>` : ""}<a class="skip" href="#main">Skip to main content</a><header><a class="wordmark" href="/" data-route>Statement <i>Bridge</i></a><nav aria-label="Main navigation"><a href="/work" data-route>Reconcile files</a><a href="/demo" data-route>Demo</a><a href="/privacy" data-route>Privacy</a></nav></header>${content}<footer><p>Reconcile statement files without changing your ledger.</p><p><a href="/privacy" data-route>Privacy</a> · <a href="/terms" data-route>Terms</a> · Built by Param Factory · v1.2.0</p><small>Original illustration generated for this product.</small></footer><div class="sr-only" aria-live="polite" id="route-note"></div>${updateToast()}`;
}
function landing() {
  return shell(
    `<main id="main"><section class="hero"><div class="hero-copy"><p class="eyebrow">Private file-to-file reconciliation</p><h1 tabindex="-1">Reconcile your statement with your ledger</h1><p class="lede">For people with a private ledger who need to check a monthly bank download.</p><div class="hero-actions"><button class="primary" data-action="sample">Try it with sample data</button><span>See suggested matches right away.</span><a class="real-start" href="/work" data-route>Start with your files</a></div><ul class="facts"><li>Files stay in this browser.</li><li>Works offline after the first visit.</li><li>Free for the full reconciliation job.</li></ul></div><figure><img src="${heroUrl}" width="1536" height="1024" fetchpriority="high" alt="A paper statement and graph-paper ledger on cracked concrete with moss." /></figure></section><section id="work" class="steps"><p class="eyebrow">Three steps</p><h2>Reconcile files in three steps</h2><ol><li><b>1. Import files</b><span>Add a bank CSV, OFX, or QIF and your ledger CSV.</span></li><li><b>2. Review suggestions</b><span>See one-to-one matches with the reason for each score.</span></li><li><b>3. Export reviewed rows</b><span>Hand approved rows and an audit report back to your ledger.</span></li></ol></section><section class="rules-callout"><p class="eyebrow">Local cleanup rules</p><h2>Save recurring payee wording</h2><p>Keep bank wording and ledger wording aligned before you review suggestions.</p><a href="/work" data-route>Set a cleanup rule</a></section><section class="privacy-block"><h2>No bank login. No budget advice.</h2><p>It compares the statement and ledger files you choose. Matches are suggestions. You make the final call.</p><a href="/privacy" data-route>Read the privacy details</a></section></main>`,
  );
}
function filePicker(
  kind: "statement" | "ledger",
  label: string,
  accept: string,
) {
  return `<label class="dropzone" for="${kind}-file"><strong>${label}</strong><span>${kind === "statement" ? "CSV, OFX, QFX, or QIF" : "CSV"} · files are read in this browser</span><input id="${kind}-file" data-file="${kind}" aria-describedby="import-help app-message" type="file" accept="${accept}" /></label>`;
}
function workspace() {
  const ready = state.statement.length && state.ledger.length;
  const demo = activeRoot.startsWith("demo:");
  const high = state.matches.filter((m) => m.status === "accepted").length,
    review = state.matches.filter((m) => m.status === "suggested").length,
    unmatched = state.matches.filter(
      (m) => m.status === "unmatched" || m.status === "rejected",
    ).length;
  const summary = `<section class="summary" aria-label="Match summary"><div><b>${high}</b><span>accepted</span></div><div><b>${review}</b><span>to review</span></div><div><b>${unmatched}</b><span>unmatched</span></div><div><b>${Math.round((high / state.matches.length) * 100)}%</b><span>reviewed</span></div></section>`;
  const rules = `<section class="rules"><div><h2>Custom cleanup rule</h2><p>Replace one recurring payee phrase before matching. Rules stay in this browser.</p></div><label>Bank wording<input id="rule-find" aria-describedby="app-message" placeholder="e.g. POS GREENMART" /></label><label>Ledger wording<input id="rule-replace" aria-describedby="app-message" placeholder="e.g. Greenmart" /></label><button data-action="rule">Save rule</button>${state.rules.length ? `<p class="rule-list">Saved: ${state.rules.map((r) => `${esc(r.find)} → ${esc(r.replace)}`).join(" · ")}</p>` : ""}</section>`;
  const toolbar = `<section class="toolbar"><p>Accept or reject each suggestion. Exports include accepted rows only.</p><span><button class="ghost" data-action="audit">Export audit report</button><button class="primary" data-action="csv">Export reviewed CSV</button></span></section>`;
  const reviewQueue = demo
    ? `<section class="match-list demo-first-match" aria-label="First sample match">${matchRow(state.matches[0])}</section>${summary}${rules}${toolbar}<section class="match-list demo-more-matches" aria-label="Remaining sample matches">${state.matches.slice(1).map(matchRow).join("")}</section>`
    : `${summary}${rules}${toolbar}<section class="match-list" aria-label="Reconciliation review">${state.matches.map(matchRow).join("")}</section>`;
  return shell(
    `<main id="main" class="workspace"><section class="workhead"><div><p class="eyebrow">${demo ? "Sample reconciliation" : "Your local reconciliation"}</p><h1 tabindex="-1">Review statement matches</h1><p>${ready ? `${state.statement.length} statement rows and ${state.ledger.length} ledger rows are loaded.` : "Add both files to create a review queue."}</p></div>${demo ? "" : '<button class="ghost" data-action="clear">Clear files</button>'}</section>${message()}${!ready ? `<section class="import-grid" aria-label="Import files">${filePicker("statement", "1. Add bank statement", "text/csv,.csv,.ofx,.qfx,.qif")}${filePicker("ledger", "2. Add ledger CSV", "text/csv,.csv")}</section><p class="help" id="import-help">Expected CSV columns: date, payee or description, and amount. Debit and credit columns also work.</p>` : reviewQueue}</main>`,
  );
}
function matchRow(m: Match) {
  const s = state.statement.find((x) => x.id === m.statementId)!;
  const l = state.ledger.find((x) => x.id === m.ledgerId);
  return `<article class="match ${m.status}"><div class="stamp">${m.status === "accepted" ? "ACCEPTED" : m.status === "suggested" ? "CHECK" : m.status === "rejected" ? "REJECTED" : "OPEN"}</div><div class="tx"><small>Statement</small><b>${esc(s.payee)}</b><span>${s.date} · ${money(s.amount)}</span></div><div class="bridge" aria-hidden="true">↔</div><div class="tx">${l ? `<small>Ledger</small><b>${esc(l.payee)}</b><span>${l.date} · ${money(l.amount)}</span>` : "<small>No ledger row</small><b>Needs your attention</b><span>Search your ledger or leave unmatched.</span>"}</div><div class="score"><b>${m.score ? `${m.score}%` : "—"}</b><span>${esc(m.reason)}</span></div><div class="row-actions">${m.status === "suggested" ? `<button class="primary compact" data-match="${m.id}" data-status="accepted">Accept</button><button class="ghost compact" data-match="${m.id}" data-status="rejected">Reject</button>` : m.status === "accepted" ? `<button class="ghost compact" data-match="${m.id}" data-status="suggested">Undo acceptance</button>` : m.status === "rejected" ? `<button class="ghost compact" data-match="${m.id}" data-status="suggested">Undo rejection</button>` : ""}</div></article>`;
}
function legal(kind: "privacy" | "terms") {
  const privacy = kind === "privacy";
  return shell(
    `<main id="main" class="legal"><p class="eyebrow">${privacy ? "Privacy" : "Terms"}</p><h1 tabindex="-1">${privacy ? "Your files stay on your device" : "Terms for Statement Reconcile Bridge"}</h1>${privacy ? "<p>Statement Reconcile Bridge reads transaction files in your browser. It stores your work in browser local storage so it survives a refresh. It does not collect bank credentials, send transaction files to a server, or use advertising analytics.</p><p>You can clear local work with Clear files. Exported CSV and audit files go where your browser normally saves downloads. The sample demo uses a separate browser-storage namespace and is removed when you leave it.</p><p>This app is a reconciliation aid. It suggests matches. Check each result before relying on it.</p>" : "<p>Use this tool to compare files you are allowed to use. You remain responsible for reviewing every match and for keeping backups of your ledger.</p><p>The app is a local utility without bank access. It cannot promise that every record matches. These terms may change when the app changes.</p><p>Questions about the product can be sent to the Param Factory.</p>"}</main>`,
  );
}
function notFound() {
  return shell(
    `<main id="main" class="legal"><p class="eyebrow">Not found</p><h1 tabindex="-1">This page has no matching row.</h1><p>Return to the reconciliation workbench.</p><a href="/" data-route>Go home</a></main>`,
  );
}
function render(options: { routeChange?: boolean; focusMatch?: string } = {}) {
  syncRouteState();
  const path = location.pathname;
  setRouteMetadata(path);
  app.innerHTML =
    path === "/privacy"
      ? legal("privacy")
      : path === "/terms"
        ? legal("terms")
        : path === "/demo" ||
            location.search.includes("demo=1") ||
            path === "/work"
          ? workspace()
          : path === "/"
            ? landing()
            : notFound();
  bind();
  if (options.routeChange) {
    const heading = document.querySelector<HTMLElement>("h1");
    document.querySelector("#route-note")!.textContent =
      heading?.textContent || "";
    setTimeout(() => heading?.focus({ preventScroll: true }), 0);
  } else if (options.focusMatch) {
    const selector = `[data-match="${CSS.escape(options.focusMatch)}"]`;
    setTimeout(
      () =>
        document
          .querySelector<HTMLElement>(selector)
          ?.focus({ preventScroll: true }),
      0,
    );
  }
}
function bind() {
  document.querySelectorAll<HTMLInputElement>("[data-file]").forEach((input) =>
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const rows = parseFile(
          await file.text(),
          file.name,
          input.dataset.file as "statement" | "ledger",
        );
        if (input.dataset.file === "statement") state.statement = rows;
        else state.ledger = rows;
        logAudit(
          "import",
          `${rows.length} ${input.dataset.file} rows from ${file.name}`,
        );
        if (state.statement.length && state.ledger.length) {
          state.matches = makeMatches(
            state.statement,
            state.ledger,
            state.rules,
          );
          tell("Matches are suggestions. Review the queue.");
        } else {
          tell(
            `${rows.length} ${input.dataset.file} rows loaded. Add the other file to create suggestions.`,
          );
        }
        save();
        render();
      } catch (error) {
        tell(
          error instanceof Error
            ? error.message
            : "This file could not be read. Choose a CSV, OFX, QFX, or QIF file and try again.",
          "error",
        );
        render();
      }
    }),
  );
  document
    .querySelectorAll<HTMLElement>("[data-action]")
    .forEach((button) =>
      button.addEventListener("click", () => action(button.dataset.action!)),
    );
  document.querySelectorAll<HTMLElement>("[data-match]").forEach((button) =>
    button.addEventListener("click", () => {
      const match = state.matches.find((x) => x.id === button.dataset.match)!;
      match.status = button.dataset.status as Match["status"];
      logAudit("review", `${match.id} marked ${match.status}`);
      tell(`Match ${match.status}.`);
      save();
      render({ focusMatch: match.id });
    }),
  );
}
function action(name: string) {
  if (name === "sample") {
    nav("/demo");
    state = sampleState();
    localStorage.removeItem(activeRoot + "audit");
    logAudit("sample", "Loaded the bundled sample reconciliation.");
    save();
    tell("Sample data loaded in its separate demo space.");
    render({ routeChange: true });
  } else if (name === "reset") {
    localStorage.removeItem(activeRoot + "audit");
    state = sampleState();
    save();
    tell("Sample data reset.");
    render();
  } else if (name === "real") {
    clearDemoStorage();
    tell("Add your statement and ledger files to begin.");
    nav("/work");
  } else if (name === "clear") {
    logAudit("clear", "Cleared local working files.");
    state = initialState("real:");
    save();
    tell("Local files cleared. Add two files to begin again.");
    render();
  } else if (name === "csv") download("reviewed-rows.csv", toCsv());
  else if (name === "audit")
    download(
      "reconciliation-audit.json",
      JSON.stringify(
        {
          createdAt: new Date().toISOString(),
          statementRows: state.statement.length,
          ledgerRows: state.ledger.length,
          matches: state.matches,
          history: auditHistory(),
        },
        null,
        2,
      ),
      "application/json",
    );
  else if (name === "rule") {
    const find =
        document.querySelector<HTMLInputElement>("#rule-find")?.value.trim() ||
        "",
      replace =
        document
          .querySelector<HTMLInputElement>("#rule-replace")
          ?.value.trim() || "";
    if (!find || !replace) {
      tell(
        "Enter both bank wording and ledger wording, then save the rule.",
        "error",
      );
      render();
      return;
    }
    state.rules.push({ find, replace });
    state.matches = makeMatches(state.statement, state.ledger, state.rules);
    logAudit("rule", `${find} → ${replace}`);
    tell("Cleanup rule saved and matches recalculated.");
    save();
    render();
  } else if (name === "update") {
    applyingUpdate = true;
    registration?.waiting?.postMessage({ type: "SKIP_WAITING" });
  }
}
function toCsv() {
  const header =
    "statement_date,statement_payee,statement_amount,ledger_date,ledger_payee,ledger_amount,match_score,status\n";
  const rows = state.matches
    .filter((m) => m.status === "accepted")
    .map((m) => {
      const s = state.statement.find((x) => x.id === m.statementId)!;
      const l = state.ledger.find((x) => x.id === m.ledgerId)!;
      return [
        s.date,
        s.payee,
        s.amount,
        l.date,
        l.payee,
        l.amount,
        m.score,
        "accepted",
      ]
        .map((x) => `"${String(x).replace(/"/g, '""')}"`)
        .join(",");
    });
  return header + rows.join("\n");
}
function download(name: string, body: string, type = "text/csv") {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data?.type === "UPDATE_AVAILABLE") {
      updateReady = true;
      render();
    }
  });
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (applyingUpdate) location.reload();
  });
  navigator.serviceWorker
    .register("/sw.js")
    .then((value) => {
      registration = value;
      const watch = () => {
        const worker = registration?.installing;
        if (!worker) return;
        worker.addEventListener("statechange", () => {
          if (
            worker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            updateReady = true;
            render();
          }
        });
      };
      registration.addEventListener("updatefound", watch);
      watch();
    })
    .catch(() => {});
}
registerServiceWorker();
render();
