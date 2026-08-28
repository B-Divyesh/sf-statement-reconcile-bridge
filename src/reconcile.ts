import type { Match, Transaction } from "./data";

export const normalizePayee = (name: string) =>
  name
    .toLowerCase()
    .replace(/\b(inc|ltd|llc|online|monthly|tap|services|groceries)\b/g, "")
    .replace(/[^a-z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const daysBetween = (a: string, b: string) =>
  Math.abs((Date.parse(a) - Date.parse(b)) / 86400000);
const words = (text: string) =>
  new Set(normalizePayee(text).split(" ").filter(Boolean));
const payeeScore = (a: string, b: string) => {
  const x = words(a),
    y = words(b);
  const shared = [...x].filter((w) => y.has(w)).length;
  return x.size && y.size ? shared / Math.max(x.size, y.size) : 0;
};

export type CleanupRule = { find: string; replace: string };
const withRules = (value: string, rules: CleanupRule[]) =>
  rules.reduce(
    (next, rule) =>
      rule.find.trim()
        ? next.replaceAll(rule.find.toLowerCase(), rule.replace.toLowerCase())
        : next,
    value.toLowerCase(),
  );

export function makeMatches(
  statement: Transaction[],
  ledger: Transaction[],
  rules: CleanupRule[] = [],
): Match[] {
  const taken = new Set<string>();
  return statement.map((s) => {
    const statementCents = Math.round(s.amount * 100);
    const candidates = ledger
      .filter(
        (l) =>
          !taken.has(l.id) &&
          statementCents === Math.round(l.amount * 100) &&
          daysBetween(s.date, l.date) <= 3,
      )
      .map((l) => ({
        l,
        score:
          Math.round(
            (65 +
              payeeScore(withRules(s.payee, rules), withRules(l.payee, rules)) *
                30 -
              daysBetween(s.date, l.date) * 2) *
              10,
          ) / 10,
      }))
      .sort((a, b) => b.score - a.score);
    const best = candidates[0];
    if (!best)
      return {
        id: `m-${s.id}`,
        statementId: s.id,
        score: 0,
        status: "unmatched",
        reason: "No same-amount ledger row within three days.",
      };
    taken.add(best.l.id);
    return {
      id: `m-${s.id}`,
      statementId: s.id,
      ledgerId: best.l.id,
      score: best.score,
      status: "suggested",
      reason:
        best.score >= 78
          ? "Exact amount and close date; payee words agree. Review before accepting."
          : "Exact amount and close date. Check the payee before accepting.",
    };
  });
}

function splitCsv(line: string) {
  const out: string[] = [];
  let cell = "",
    quote = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (quote && line[i + 1] === '"') {
        cell += '"';
        i++;
      } else quote = !quote;
    } else if (c === "," && !quote) {
      out.push(cell.trim());
      cell = "";
    } else cell += c;
  }
  out.push(cell.trim());
  return out;
}
function calendarDate(
  year: number,
  month: number,
  day: number,
  unreadable: string,
) {
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  )
    throw new Error(unreadable);
  return date.toISOString().slice(0, 10);
}

function parseNumericDate(value: string, unreadable: string) {
  const raw = value.trim();
  const iso = raw.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (iso)
    return calendarDate(
      Number(iso[1]),
      Number(iso[2]),
      Number(iso[3]),
      unreadable,
    );

  const monthFirst = raw.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2}|\d{4})$/);
  if (!monthFirst) throw new Error(unreadable);
  const abbreviatedYear = Number(monthFirst[3]);
  const year =
    monthFirst[3].length === 2
      ? abbreviatedYear + (abbreviatedYear >= 70 ? 1900 : 2000)
      : abbreviatedYear;
  return calendarDate(
    year,
    Number(monthFirst[1]),
    Number(monthFirst[2]),
    unreadable,
  );
}

function parseCsvDate(value: string, row: number) {
  return parseNumericDate(
    value,
    `Row ${row} has an unreadable date. Use YYYY-MM-DD or MM/DD/YYYY.`,
  );
}
function parseOfxDate(value: string, index: number) {
  const raw = value.slice(0, 8);
  if (!/^\d{8}$/.test(raw))
    throw new Error(`OFX transaction ${index} has an unreadable date.`);
  const year = Number(raw.slice(0, 4)),
    month = Number(raw.slice(4, 6)),
    day = Number(raw.slice(6, 8));
  return calendarDate(
    year,
    month,
    day,
    `OFX transaction ${index} has an unreadable date.`,
  );
}
export function parseCsv(
  text: string,
  source: Transaction["source"],
): Transaction[] {
  const rows = text
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter(Boolean);
  if (rows.length < 2)
    throw new Error("This CSV needs a header and at least one transaction.");
  const headers = splitCsv(rows[0]).map((x) =>
    x.toLowerCase().replace(/[^a-z]/g, ""),
  );
  const find = (names: string[]) => headers.findIndex((h) => names.includes(h));
  const dateI = find(["date", "transactiondate", "posteddate"]);
  const payeeI = find(["payee", "description", "merchant", "name"]);
  const amountI = find(["amount", "transactionamount"]);
  const debitI = find(["debit", "withdrawal"]);
  const creditI = find(["credit", "deposit"]);
  if (dateI < 0 || payeeI < 0 || (amountI < 0 && debitI < 0))
    throw new Error("Need date, payee or description, and amount columns.");
  return rows.slice(1).map((row, i) => {
    const c = splitCsv(row);
    const raw =
      amountI >= 0
        ? c[amountI]
        : creditI >= 0 && c[creditI]
          ? c[creditI]
          : `-${c[debitI]}`;
    const amount = Number(raw.replace(/[$,]/g, ""));
    if (!Number.isFinite(amount))
      throw new Error(`Row ${i + 2} has an unreadable amount.`);
    return {
      id: `${source}-${Date.now()}-${i}`,
      date: parseCsvDate(c[dateI] || "", i + 2),
      payee: c[payeeI] || "Unlabelled transaction",
      amount,
      source,
    };
  });
}
export function parseOfx(
  text: string,
  source: Transaction["source"],
): Transaction[] {
  const chunks = text.split(/<STMTTRN>/i).slice(1);
  if (!chunks.length) throw new Error("No OFX transactions were found.");
  const tag = (chunk: string, name: string) =>
    chunk.match(new RegExp(`<${name}>([^<\r\n]+)`, "i"))?.[1]?.trim() || "";
  return chunks.map((c, i) => {
    const amountText = tag(c, "TRNAMT");
    const amount = Number(amountText);
    if (!amountText || !Number.isFinite(amount))
      throw new Error(`OFX transaction ${i + 1} has an unreadable amount.`);
    return {
      id: `${source}-${Date.now()}-${i}`,
      date: parseOfxDate(tag(c, "DTPOSTED"), i + 1),
      payee: tag(c, "NAME") || tag(c, "MEMO") || "Unlabelled transaction",
      amount,
      source,
    };
  });
}
export function parseQif(
  text: string,
  source: Transaction["source"],
): Transaction[] {
  const chunks = text
    .split("^")
    .map((x) => x.trim())
    .filter((x) => x.includes("\nT"));
  if (!chunks.length) throw new Error("No QIF transactions were found.");
  return chunks.map((c, i) => {
    const lines = c.split(/\r?\n/);
    const v = (key: string) =>
      lines
        .find((x) => x.startsWith(key))
        ?.slice(1)
        .trim() || "";
    const amount = Number(v("T").replace(/[$,]/g, ""));
    if (!Number.isFinite(amount))
      throw new Error(`QIF transaction ${i + 1} has an unreadable amount.`);
    const date = parseNumericDate(
      v("D").replace(/'/g, "/"),
      `QIF transaction ${i + 1} has an unreadable date.`,
    );
    return {
      id: `${source}-${Date.now()}-${i}`,
      date,
      payee: v("P") || v("M") || "Unlabelled transaction",
      amount,
      source,
    };
  });
}
export function parseFile(
  text: string,
  name: string,
  source: Transaction["source"],
) {
  if (text.length > 5 * 1024 * 1024)
    throw new Error(
      "This file is over 5 MB. Export a smaller statement and try again.",
    );
  const lower = name.toLowerCase();
  if (lower.endsWith(".ofx") || lower.endsWith(".qfx"))
    return parseOfx(text, source);
  if (lower.endsWith(".qif")) return parseQif(text, source);
  return parseCsv(text, source);
}
