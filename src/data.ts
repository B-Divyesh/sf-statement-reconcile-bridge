export type Transaction = {
  id: string;
  date: string;
  payee: string;
  amount: number;
  source: "statement" | "ledger";
  memo?: string;
};
export type Match = {
  id: string;
  statementId: string;
  ledgerId?: string;
  score: number;
  status: "suggested" | "accepted" | "rejected" | "unmatched";
  reason: string;
};

export const statementSample: Transaction[] = [
  ["s1", "2026-04-02", "Oak & Reed Coffee", -4.8],
  ["s2", "2026-04-03", "GREENMART #184", -56.42],
  ["s3", "2026-04-05", "Metro Transit Tap", -12],
  ["s4", "2026-04-07", "City Water Services", -38.11],
  ["s5", "2026-04-09", "Book Nook Online", -18.99],
  ["s6", "2026-04-12", "Oak and Reed Coffee", -5.25],
  ["s7", "2026-04-16", "Northside Hardware", -27.4],
  ["s8", "2026-04-20", "GREENMART #184", -31.73],
  ["s9", "2026-04-23", "Phone Service Monthly", -45],
  ["s10", "2026-04-27", "Corner Cinema", -24],
].map(([id, date, payee, amount]) => ({
  id: id as string,
  date: date as string,
  payee: payee as string,
  amount: amount as number,
  source: "statement",
}));
export const ledgerSample: Transaction[] = [
  ["l1", "2026-04-02", "Oak Reed Coffee", -4.8],
  ["l2", "2026-04-03", "Greenmart groceries", -56.42],
  ["l3", "2026-04-05", "Transit card", -12],
  ["l4", "2026-04-07", "City water", -38.11],
  ["l5", "2026-04-09", "Book Nook", -18.99],
  ["l6", "2026-04-12", "Oak Reed", -5.25],
  ["l7", "2026-04-16", "Northside Hardware", -27.4],
  ["l8", "2026-04-20", "Greenmart", -31.73],
  ["l9", "2026-04-23", "Phone Service", -45],
  ["l10", "2026-04-28", "Cinema", -24],
  ["l11", "2026-04-25", "Payday", 1800],
].map(([id, date, payee, amount]) => ({
  id: id as string,
  date: date as string,
  payee: payee as string,
  amount: amount as number,
  source: "ledger",
}));
