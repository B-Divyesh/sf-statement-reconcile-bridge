import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";

const csv = (rows: string) => Buffer.from(`date,payee,amount\n${rows}`);
const statement = csv(
  "2026-04-02,Oak & Reed Coffee,-4.80\n2026-04-03,GREENMART #184,-56.42",
);
const ledger = csv(
  "2026-04-02,Oak Reed Coffee,-4.80\n2026-04-03,Greenmart,-56.42",
);

async function importCsvPair(
  page: Page,
  statementFile = statement,
  ledgerFile = ledger,
) {
  await page.locator("#statement-file").setInputFiles({
    name: "statement.csv",
    mimeType: "text/csv",
    buffer: statementFile,
  });
  await page.locator("#ledger-file").setInputFiles({
    name: "ledger.csv",
    mimeType: "text/csv",
    buffer: ledgerFile,
  });
}

async function downloadedText(page: Page, buttonName: string) {
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: buttonName }).click();
  const file = await pending;
  const stream = await file.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(chunk);
  return { file, content: Buffer.concat(chunks).toString() };
}

test("@claim:sample-reconcile loads a complete sample review queue", async ({
  page,
}) => {
  await page.goto("/demo");
  await expect(
    page.getByRole("heading", { name: "Review statement matches" }),
  ).toBeVisible();
  await expect(
    page.getByText("10 statement rows and 11 ledger rows are loaded."),
  ).toBeVisible();
  await expect(page.locator(".match")).toHaveCount(10);
  await expect(page.locator(".match.suggested")).toHaveCount(10);
  await expect(page.locator(".match.accepted")).toHaveCount(0);
});

test("@claim:demo-isolation enters and leaves an isolated sample namespace", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem(
      "real:statement-reconcile-bridge:sentinel",
      "untouched",
    ),
  );
  await page.goto("/?demo=1");
  await expect(page).toHaveTitle("Demo — Statement Reconcile Bridge");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://statement-reconcile-bridge.sociobot.in/demo",
  );
  await expect(
    page.getByRole("heading", { name: "Review statement matches" }),
  ).toBeVisible();
  await expect(
    page.getByText("Demo — sample data, nothing is saved"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Accept" }).first().click();
  await expect(page.locator(".match.accepted")).toHaveCount(1);
  expect(
    await page.evaluate(() =>
      localStorage.getItem("real:statement-reconcile-bridge:sentinel"),
    ),
  ).toBe("untouched");
  await page.goto("/work");
  let keys = await page.evaluate(() => Object.keys(localStorage));
  expect(
    keys.some((key) => key.startsWith("demo:statement-reconcile-bridge:")),
  ).toBeFalsy();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("real:statement-reconcile-bridge:sentinel"),
    ),
  ).toBe("untouched");

  await page.goto("/");
  await page.getByRole("button", { name: "Try it with sample data" }).click();
  await expect(page).toHaveURL(/\/demo$/);
  await page.getByRole("button", { name: "Accept" }).first().click();
  await expect(page.locator(".match.accepted")).toHaveCount(1);
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  keys = await page.evaluate(() => Object.keys(localStorage));
  expect(
    keys.some((key) => key.startsWith("demo:statement-reconcile-bridge:")),
  ).toBeFalsy();
  await page.goForward();
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.locator(".match.accepted")).toHaveCount(0);

  await page.getByRole("button", { name: "Reset demo" }).click();
  await expect(page.locator(".match.accepted")).toHaveCount(0);
  expect(
    await page.evaluate(() =>
      Object.keys(localStorage).some((key) =>
        key.startsWith("demo:statement-reconcile-bridge:"),
      ),
    ),
  ).toBeTruthy();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("real:statement-reconcile-bridge:sentinel"),
    ),
  ).toBe("untouched");
  await page.getByRole("button", { name: "Start for real" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator('input[type="file"]')).toHaveCount(2);
  await expect(
    page.getByText("Demo — sample data, nothing is saved"),
  ).toHaveCount(0);
  keys = await page.evaluate(() => Object.keys(localStorage));
  expect(
    keys.some((key) => key.startsWith("demo:statement-reconcile-bridge:")),
  ).toBeFalsy();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("real:statement-reconcile-bridge:sentinel"),
    ),
  ).toBe("untouched");
  await page.goto("/");
  await page.getByRole("button", { name: "Try it with sample data" }).click();
  await expect(page).toHaveURL(/\/demo$/);
  await expect(
    page.getByText("Demo — sample data, nothing is saved"),
  ).toBeVisible();
  keys = await page.evaluate(() => Object.keys(localStorage));
  expect(
    keys.some((key) => key.startsWith("demo:statement-reconcile-bridge:")),
  ).toBeTruthy();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("real:statement-reconcile-bridge:state"),
    ),
  ).toBeNull();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("real:statement-reconcile-bridge:sentinel"),
    ),
  ).toBe("untouched");
  await page.getByRole("link", { name: "Reconcile files" }).click();
  keys = await page.evaluate(() => Object.keys(localStorage));
  expect(
    keys.some((key) => key.startsWith("demo:statement-reconcile-bridge:")),
  ).toBeFalsy();
});

test("@claim:free-core-job completes import, review, and export", async ({
  page,
}) => {
  await page.goto("/work");
  await importCsvPair(page);
  await expect(page.locator(".match.suggested")).toHaveCount(2);
  await page.getByRole("button", { name: "Accept" }).first().click();
  const { content } = await downloadedText(page, "Export reviewed CSV");
  expect(content.trim().split("\n")).toHaveLength(2);
});

test("@claim:input-files-unchanged keeps selected file bytes intact through review and export", async ({
  page,
}) => {
  await page.goto("/work");
  await page.locator("#statement-file").setInputFiles({
    name: "statement.csv",
    mimeType: "text/csv",
    buffer: statement,
  });
  await page.evaluate((ledgerText) => {
    const ledgerFile = new File([ledgerText], "ledger.csv", {
      type: "text/csv",
    });
    (
      globalThis as typeof globalThis & { retainedLedgerFile: File }
    ).retainedLedgerFile = ledgerFile;
    const input = document.querySelector<HTMLInputElement>("#ledger-file")!;
    const selection = new DataTransfer();
    selection.items.add(ledgerFile);
    input.files = selection.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }, ledger.toString());
  await expect(page.locator(".match.suggested")).toHaveCount(2);
  const selectedLedgerBytes = () =>
    page.evaluate(async () =>
      Array.from(
        new Uint8Array(
          await (
            globalThis as typeof globalThis & { retainedLedgerFile: File }
          ).retainedLedgerFile.arrayBuffer(),
        ),
      ),
    );

  expect(Buffer.from(await selectedLedgerBytes())).toEqual(ledger);
  await page.getByRole("button", { name: "Accept" }).first().click();
  await downloadedText(page, "Export reviewed CSV");
  expect(Buffer.from(await selectedLedgerBytes())).toEqual(ledger);
});

test("@claim:statement-file-formats imports CSV debit/credit, OFX/QFX, and QIF", async ({
  page,
}) => {
  await page.goto("/work");
  const debitCredit = Buffer.from(
    "date,description,debit,credit\n2026-04-02,Oak Reed Coffee,4.80,",
  );
  await page.locator("#statement-file").setInputFiles({
    name: "statement.csv",
    mimeType: "text/csv",
    buffer: debitCredit,
  });
  await page.locator("#ledger-file").setInputFiles({
    name: "ledger.csv",
    mimeType: "text/csv",
    buffer: csv("2026-04-02,Oak Reed Coffee,-4.80"),
  });
  await expect(page.locator(".match.suggested")).toHaveCount(1);
  await page.getByRole("button", { name: "Clear files" }).click();
  await page.locator("#statement-file").setInputFiles({
    name: "statement.qfx",
    mimeType: "text/plain",
    buffer: Buffer.from(
      "<OFX><STMTTRN><DTPOSTED>20260402<TRNAMT>-4.80<NAME>Oak Reed Coffee",
    ),
  });
  await page.locator("#ledger-file").setInputFiles({
    name: "ledger.csv",
    mimeType: "text/csv",
    buffer: ledger,
  });
  await expect(page.locator(".match")).toHaveCount(1);
  await page.getByRole("button", { name: "Clear files" }).click();
  await page.locator("#statement-file").setInputFiles({
    name: "statement.qif",
    mimeType: "text/plain",
    buffer: Buffer.from("!Type:Bank\nD04/02/2026\nT-4.80\nPOak Reed Coffee\n^"),
  });
  await page.locator("#ledger-file").setInputFiles({
    name: "ledger.csv",
    mimeType: "text/csv",
    buffer: ledger,
  });
  await expect(page.locator(".match")).toHaveCount(1);
});

test("@claim:one-to-one-matching uses each exact-cent ledger row only once", async ({
  page,
}) => {
  await page.goto("/work");
  await importCsvPair(
    page,
    csv("2026-04-02,Oak Reed Coffee,-10.00\n2026-04-03,Oak Reed Coffee,-10.00"),
    csv("2026-04-02,Oak Reed Coffee,-10.00"),
  );
  await expect(page.locator(".match.suggested")).toHaveCount(1);
  await expect(page.locator(".match.unmatched")).toHaveCount(1);
  await page.getByRole("button", { name: "Clear files" }).click();
  await importCsvPair(
    page,
    csv("2026-04-02,Oak Reed Coffee,-10.00"),
    csv("2026-04-02,Oak Reed Coffee,-10.01"),
  );
  await expect(page.locator(".match.unmatched")).toHaveCount(1);
  await expect(
    page.getByText("No same-amount ledger row within three days."),
  ).toBeVisible();
});

test("@claim:match-score-reasons explains every displayed suggestion and open row", async ({
  page,
}) => {
  await page.goto("/work");
  await importCsvPair(
    page,
    csv(
      "2026-04-02,Oak Reed Coffee,-10.00\n2026-04-03,Unknown Shop,-20.00\n2026-04-04,No Ledger Match,-30.00",
    ),
    csv("2026-04-02,Oak Reed Coffee,-10.00\n2026-04-03,Other Ledger,-20.00"),
  );
  const high = page.locator(".match").filter({ hasText: "Oak Reed Coffee" });
  const caution = page.locator(".match").filter({ hasText: "Unknown Shop" });
  const unmatched = page
    .locator(".match")
    .filter({ hasText: "No Ledger Match" });
  await expect(high.locator(".score b")).toHaveText("95%");
  await expect(high.locator(".score span")).toHaveText(
    "Exact amount and close date; payee words agree. Review before accepting.",
  );
  await expect(caution.locator(".score b")).toHaveText("65%");
  await expect(caution.locator(".score span")).toHaveText(
    "Exact amount and close date. Check the payee before accepting.",
  );
  await expect(unmatched.locator(".score b")).toHaveText("—");
  await expect(unmatched.locator(".score span")).toHaveText(
    "No same-amount ledger row within three days.",
  );
  for (const reason of await page
    .locator(".match .score span")
    .allTextContents())
    expect(reason.trim()).not.toBe("");
});

test("@claim:manual-review requires a person to accept every exported row", async ({
  page,
}) => {
  await page.goto("/demo");
  await expect(page.locator(".match.accepted")).toHaveCount(0);
  const before = await downloadedText(page, "Export reviewed CSV");
  expect(before.content.trim().split("\n")).toHaveLength(1);
  await page.getByRole("button", { name: "Accept" }).first().click();
  await expect(page.locator(".match.accepted")).toHaveCount(1);
  await page.getByRole("button", { name: "Undo acceptance" }).click();
  await expect(page.locator(".match.accepted")).toHaveCount(0);
});

test("@claim:csv-export exports only explicitly accepted rows", async ({
  page,
}) => {
  await page.goto("/demo");
  await page.getByRole("button", { name: "Accept" }).first().click();
  const { file, content } = await downloadedText(page, "Export reviewed CSV");
  expect(file.suggestedFilename()).toBe("reviewed-rows.csv");
  expect(content.trim().split("\n")).toHaveLength(2);
  expect(content).toContain('"accepted"');
});

test("@claim:audit-export records imports and human review actions", async ({
  page,
}) => {
  await page.goto("/demo");
  await page.getByRole("button", { name: "Accept" }).first().click();
  const { file, content } = await downloadedText(page, "Export audit report");
  expect(file.suggestedFilename()).toBe("reconciliation-audit.json");
  const audit = JSON.parse(content);
  expect(audit).toMatchObject({ statementRows: 10, ledgerRows: 11 });
  expect(
    audit.history.some(
      (entry: { action: string }) => entry.action === "review",
    ),
  ).toBeTruthy();
});

test("@claim:local-only sends no transaction data off-origin in demo or real work", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== "http://127.0.0.1:4173")
      external.push(request.url());
  });
  await page.goto("/demo");
  await page.getByRole("button", { name: "Start for real" }).click();
  await importCsvPair(page);
  await page.getByRole("button", { name: "Accept" }).first().click();
  await downloadedText(page, "Export reviewed CSV");
  expect(external).toEqual([]);
});

test("@claim:no-bank-login asks for files and never bank credentials", async ({
  page,
}) => {
  await page.goto("/work");
  await expect(page.locator("input[type=password]")).toHaveCount(0);
  await expect(page.locator("input[type=file]")).toHaveCount(2);
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "No bank login. No budget advice." }),
  ).toBeVisible();
});

test("@claim:offline-reload renders the sample after an offline reload", async ({
  page,
  context,
}) => {
  await page.goto("/demo");
  await page.waitForFunction(() =>
    navigator.serviceWorker.ready.then(() => true),
  );
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Review statement matches" }),
  ).toBeVisible();
  await expect(page.locator(".match")).toHaveCount(10);
});

test("@claim:no-budget-advice states the product limit plainly", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "No bank login. No budget advice." }),
  ).toBeVisible();
});

test("@claim:real-persistence keeps real imported work across refresh", async ({
  page,
}) => {
  await page.goto("/work");
  await importCsvPair(page);
  await page.reload();
  await expect(
    page.getByText("2 statement rows and 2 ledger rows are loaded."),
  ).toBeVisible();
  await expect(page.locator(".match")).toHaveCount(2);
});

test("@claim:rules-local-only stores a cleanup rule only in local browser state", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== "http://127.0.0.1:4173")
      external.push(request.url());
  });
  await page.goto("/work");
  await importCsvPair(page);
  await page.locator("#rule-find").fill("GREENMART");
  await page.locator("#rule-replace").fill("Greenmart");
  await page.getByRole("button", { name: "Save rule" }).click();
  await page.reload();
  await expect(page.getByText("Saved: GREENMART → Greenmart")).toBeVisible();
  expect(external).toEqual([]);
});

test("@claim:cleanup-rule-matching applies saved wording before recalculating suggestions", async ({
  page,
}) => {
  await page.goto("/work");
  await importCsvPair(
    page,
    csv("2026-04-02,POS FARM SHOP,-12.50"),
    csv("2026-04-02,Greenmart,-12.50"),
  );
  const match = page.locator(".match").first();
  await expect(match.locator(".score b")).toHaveText("65%");
  await expect(match.locator(".score span")).toContainText(
    "Check the payee before accepting.",
  );
  await page.locator("#rule-find").fill("POS FARM SHOP");
  await page.locator("#rule-replace").fill("Greenmart");
  await page.getByRole("button", { name: "Save rule" }).click();
  await expect(match.locator(".score b")).toHaveText("95%");
  await expect(match.locator(".score span")).toContainText("payee words agree");
});

test("@claim:no-advertising-analytics has no tracker scripts or advertising requests", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/");
  await page.goto("/privacy");
  expect(
    requests.every((url) => new URL(url).origin === "http://127.0.0.1:4173"),
  ).toBeTruthy();
  await expect(
    page.getByText(/does not collect bank credentials.*advertising analytics/i),
  ).toBeVisible();
});

test("@regression: calendar-invalid CSV and QIF dates, OFX, truncated, and oversized inputs are announced and recoverable", async ({
  page,
}) => {
  await page.goto("/work");
  await page.locator("#statement-file").setInputFiles({
    name: "impossible-date.csv",
    mimeType: "text/csv",
    buffer: csv("2026-02-30,Impossible date,-10.00"),
  });
  await expect(page.getByRole("alert")).toContainText(
    "Row 2 has an unreadable date. Use YYYY-MM-DD or MM/DD/YYYY.",
  );
  await expect(page.locator(".match")).toHaveCount(0);
  await page.locator("#statement-file").setInputFiles({
    name: "impossible-date.qif",
    mimeType: "text/plain",
    buffer: Buffer.from("!Type:Bank\nD02/30/2026\nT-4.80\nPImpossible date\n^"),
  });
  await expect(page.getByRole("alert")).toContainText(
    "QIF transaction 1 has an unreadable date.",
  );
  await expect(page.locator(".match")).toHaveCount(0);
  await page.locator("#statement-file").setInputFiles({
    name: "broken.ofx",
    mimeType: "text/plain",
    buffer: Buffer.from("<OFX><STMTTRN><DTPOSTED>BAD<TRNAMT>-4.80<NAME>Thing"),
  });
  await expect(page.getByRole("alert")).toContainText(
    "OFX transaction 1 has an unreadable date.",
  );
  await page.locator("#statement-file").setInputFiles({
    name: "truncated.ofx",
    mimeType: "text/plain",
    buffer: Buffer.from("<OFX><STMTTRN><DTPOSTED>20260402"),
  });
  await expect(page.getByRole("alert")).toContainText(
    "OFX transaction 1 has an unreadable amount.",
  );
  await page.locator("#statement-file").setInputFiles({
    name: "oversized.csv",
    mimeType: "text/csv",
    buffer: Buffer.alloc(5 * 1024 * 1024 + 1, "a"),
  });
  await expect(page.getByRole("alert")).toContainText(
    "This file is over 5 MB.",
  );
  await page.locator("#statement-file").setInputFiles({
    name: "valid.csv",
    mimeType: "text/csv",
    buffer: statement,
  });
  await expect(page.getByRole("alert")).toHaveCount(0);
  await page.locator("#ledger-file").setInputFiles({
    name: "valid-ledger.csv",
    mimeType: "text/csv",
    buffer: ledger,
  });
  await expect(page.locator(".match.suggested")).toHaveCount(2);
});

test("@regression: mobile and desktop first screens, touch targets, and keyboard focus remain usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const facts = [
    "Files stay in this browser.",
    "Works offline after the first visit.",
    "Free for the full reconciliation job.",
  ];
  for (const fact of facts) {
    const box = await page.getByText(fact, { exact: true }).boundingBox();
    expect(box, `${fact} bounds`).not.toBeNull();
    expect(box!.y + box!.height, `${fact} desktop fold`).toBeLessThanOrEqual(
      900,
    );
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  for (const target of [
    page.getByRole("heading", {
      name: "Reconcile your statement with your ledger",
    }),
    page.getByText(
      "For people with a private ledger who need to check a monthly bank download.",
    ),
    page.getByRole("button", { name: "Try it with sample data" }),
  ]) {
    const box = await target.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThanOrEqual(844);
  }
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to main content" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Try it with sample data" }).click();
  await expect(
    page.getByRole("heading", { name: "Review statement matches" }),
  ).toBeFocused();
  const firstMatch = page.locator(".match").first();
  await expect(firstMatch).toContainText("Oak & Reed Coffee");
  await expect(firstMatch).toContainText("Oak Reed Coffee");
  const firstMatchBox = await firstMatch.boundingBox();
  expect(firstMatchBox).not.toBeNull();
  expect(firstMatchBox!.y + firstMatchBox!.height).toBeLessThanOrEqual(844);
  const accept = page.getByRole("button", { name: "Accept" }).first();
  await accept.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Undo acceptance" }),
  ).toBeFocused();
  const controls = page.locator("a[href],button,input[type=file]:visible");
  for (let index = 0; index < (await controls.count()); index++) {
    const box = await controls.nth(index).boundingBox();
    if (box) {
      expect(box.height, `control ${index} height`).toBeGreaterThanOrEqual(44);
      expect(box.width, `control ${index} width`).toBeGreaterThanOrEqual(44);
    }
  }
});

test("@regression: direct routes have metadata, legal links, and focused history navigation", async ({
  page,
}) => {
  const routes = [
    {
      path: "/",
      title: "Statement Reconcile Bridge — Reconcile statement files",
      canonical: "https://statement-reconcile-bridge.sociobot.in/",
      heading: "Reconcile your statement with your ledger",
    },
    {
      path: "/demo",
      title: "Demo — Statement Reconcile Bridge",
      canonical: "https://statement-reconcile-bridge.sociobot.in/demo",
      heading: "Review statement matches",
    },
    {
      path: "/work",
      title: "Reconcile files — Statement Reconcile Bridge",
      canonical: "https://statement-reconcile-bridge.sociobot.in/work",
      heading: "Review statement matches",
    },
    {
      path: "/privacy",
      title: "Privacy — Statement Reconcile Bridge",
      canonical: "https://statement-reconcile-bridge.sociobot.in/privacy",
      heading: "Your files stay on your device",
    },
    {
      path: "/terms",
      title: "Terms — Statement Reconcile Bridge",
      canonical: "https://statement-reconcile-bridge.sociobot.in/terms",
      heading: "Terms for Statement Reconcile Bridge",
    },
  ];
  for (const route of routes) {
    await page.goto(route.path);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('meta[name="description"]')).not.toHaveAttribute(
      "content",
      "",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      route.canonical,
    );
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      route.heading,
    );
    await expect(page.getByRole("link", { name: "Privacy" })).not.toHaveCount(
      0,
    );
    await expect(page.getByRole("link", { name: "Terms" })).not.toHaveCount(0);
  }

  await page.goto("/");
  await page.getByRole("link", { name: "Privacy" }).first().click();
  const privacyHeading = page.getByRole("heading", {
    name: "Your files stay on your device",
  });
  await expect(privacyHeading).toBeFocused();
  await expect(page.locator("#route-note")).toHaveText(
    "Your files stay on your device",
  );
  await page.goBack();
  const homeHeading = page.getByRole("heading", {
    name: "Reconcile your statement with your ledger",
  });
  await expect(homeHeading).toBeFocused();
  await expect(page.locator("#route-note")).toHaveText(
    "Reconcile your statement with your ledger",
  );
});

test("@regression: all public routes have no serious Axe findings in light or dark", async ({
  page,
}) => {
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    for (const route of ["/", "/demo", "/work", "/privacy", "/terms"]) {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).analyze();
      expect(
        results.violations.filter((item) =>
          ["serious", "critical"].includes(item.impact || ""),
        ),
        `${colorScheme} ${route}`,
      ).toEqual([]);
    }
  }
});

test("@regression: workspace markup and route metadata are complete", async ({
  page,
}) => {
  await page.goto("/demo");
  await expect(page.locator("main")).not.toContainText("<>");
  const sitemap = readFileSync("public/sitemap.xml", "utf8");
  expect(sitemap).toContain("/work</loc>");
  const twitterFields = [
    'name="twitter:card"',
    'name="twitter:title"',
    'name="twitter:description"',
    'name="twitter:image"',
  ];
  const home = readFileSync("index.html", "utf8");
  for (const marker of twitterFields) expect(home).toContain(marker);
  for (const file of [
    "demo/index.html",
    "work/index.html",
    "privacy/index.html",
    "terms/index.html",
  ]) {
    const html = readFileSync(file, "utf8");
    expect(html, file).toContain('property="og:title"');
    for (const marker of twitterFields) expect(html, file).toContain(marker);
  }
  const notFound = readFileSync("public/404.html", "utf8");
  expect(notFound).toContain("<header>");
  expect(notFound).toContain("<footer>");
  for (const marker of [
    'property="og:title"',
    'property="og:description"',
    'property="og:image"',
    ...twitterFields,
    'rel="apple-touch-icon"',
  ])
    expect(notFound).toContain(marker);
});

test("@regression: copy audit is complete for reviewed landing copy and has accurate counts", () => {
  const audit = readFileSync(".factory/copy-audit.md", "utf8");
  const catalog = readFileSync(
    ".factory/catalog-description.txt",
    "utf8",
  ).trim();
  const landing = audit.split("## Landing page")[1]?.split("## README")[0];
  expect(landing).toBeTruthy();
  expect(catalog.length).toBeLessThanOrEqual(120);
  expect(catalog).toMatch(/^Reconcile\b/);

  const rows = new Map(
    landing!
      .split("\n")
      .filter((line) => line.startsWith("| "))
      .map((line) =>
        line
          .split("|")
          .slice(1, -1)
          .map((cell) => cell.trim()),
      )
      .filter(
        ([copy, count]) =>
          copy !== "Copy" && !copy.startsWith("---") && /^\d+$/.test(count),
      )
      .map(([copy, count]) => [copy, Number(count)]),
  );

  for (const [copy, count] of rows)
    expect(count, copy).toBe(copy.split(/\s+/).length);

  for (const copy of [
    "Try it with sample data",
    "Three steps",
    "Reconcile files in three steps",
    "Import files",
    "Review suggestions",
    "Export reviewed rows",
    "Read the privacy details",
  ])
    expect(rows.has(copy), `${copy} is audited`).toBeTruthy();

  for (const removedCopy of [
    "private budget file",
    "Move through a monthly statement",
    "This is a bridge between files you already control.",
    "Read the privacy terms",
    "monthly handoff tool",
  ])
    expect(audit, `${removedCopy} was removed`).not.toContain(removedCopy);
});
