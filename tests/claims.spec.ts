import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const csv = (rows: string) => Buffer.from(`date,payee,amount\n${rows}`);
const ledger = csv('2026-04-02,Oak Reed Coffee,-4.80\n2026-04-03,Greenmart,-56.42');

test('@claim:sample-reconcile loads a complete sample review queue', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.getByRole('heading', { name: 'Review statement matches' })).toBeVisible();
  await expect(page.getByText('10 statement rows and 11 ledger rows are loaded.')).toBeVisible();
  await expect(page.locator('.match')).toHaveCount(10);
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
});

test('@claim:demo-isolation enters the demo namespace from the public first screen', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys.some(key => key.startsWith('demo:statement-reconcile-bridge:'))).toBeTruthy();
  expect(keys.some(key => key.startsWith('real:statement-reconcile-bridge:'))).toBeFalsy();
});

test('@claim:free-core-job starts a reachable real workspace and completes a free review', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator('input[type=file]')).toHaveCount(2);
  await page.locator('#statement-file').setInputFiles({ name: 'statement.csv', mimeType: 'text/csv', buffer: csv('2026-04-02,Oak & Reed Coffee,-4.80\n2026-04-03,GREENMART #184,-56.42') });
  await page.locator('#ledger-file').setInputFiles({ name: 'ledger.csv', mimeType: 'text/csv', buffer: ledger });
  await expect(page.locator('.match')).toHaveCount(2);
  await expect(page.getByRole('link', { name: 'Buy custom rules' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export reviewed CSV' })).toBeVisible();
});

test('@claim:statement-file-formats imports CSV, OFX/QFX, and QIF statement files', async ({ page }) => {
  await page.goto('/work');
  await page.locator('#statement-file').setInputFiles({ name: 'statement.ofx', mimeType: 'text/plain', buffer: Buffer.from('<OFX><STMTTRN><DTPOSTED>20260402<TRNAMT>-4.80<NAME>Oak Reed Coffee') });
  await page.locator('#ledger-file').setInputFiles({ name: 'ledger.csv', mimeType: 'text/csv', buffer: ledger });
  await expect(page.locator('.match')).toHaveCount(1);
  await page.getByRole('button', { name: 'Clear files' }).click();
  await page.locator('#statement-file').setInputFiles({ name: 'statement.qif', mimeType: 'text/plain', buffer: Buffer.from('!Type:Bank\nD04/02/2026\nT-4.80\nPOak Reed Coffee\n^') });
  await page.locator('#ledger-file').setInputFiles({ name: 'ledger.csv', mimeType: 'text/csv', buffer: ledger });
  await expect(page.locator('.match')).toHaveCount(1);
});

test('@claim:one-to-one-matching assigns each ledger row only once', async ({ page }) => {
  await page.goto('/work');
  await page.locator('#statement-file').setInputFiles({ name: 'statement.csv', mimeType: 'text/csv', buffer: csv('2026-04-02,Oak Reed Coffee,-4.80\n2026-04-03,Oak Reed Coffee,-4.80') });
  await page.locator('#ledger-file').setInputFiles({ name: 'ledger.csv', mimeType: 'text/csv', buffer: csv('2026-04-02,Oak Reed Coffee,-4.80') });
  await expect(page.locator('.match')).toHaveCount(2);
  await expect(page.locator('.match.unmatched')).toHaveCount(1);
  await expect(page.getByText('No same-amount ledger row within three days.')).toBeVisible();
});

test('@claim:csv-export exports accepted reviewed rows', async ({ page }) => {
  await page.goto('/demo');
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export reviewed CSV' }).click();
  const file = await download;
  expect(file.suggestedFilename()).toBe('reviewed-rows.csv');
  const stream = await file.createReadStream(); const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(chunk);
  const content = Buffer.concat(chunks).toString();
  expect(content).toContain('statement_date,statement_payee,statement_amount');
  expect(content).toContain('accepted');
});

test('@claim:audit-export exports a JSON record of reviews', async ({ page }) => {
  await page.goto('/demo');
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export audit report' }).click();
  const file = await download;
  expect(file.suggestedFilename()).toBe('reconciliation-audit.json');
  const stream = await file.createReadStream(); const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(chunk);
  expect(JSON.parse(Buffer.concat(chunks).toString())).toMatchObject({ statementRows: 10, ledgerRows: 11 });
});

test('@claim:local-only makes no cross-origin requests during the demo flow', async ({ page }) => {
  const external: string[] = [];
  page.on('request', request => { if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') external.push(request.url()); });
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Export audit report' }).click();
  expect(external).toEqual([]);
});

test('@claim:no-bank-login asks for files, never bank credentials', async ({ page }) => {
  await page.goto('/work');
  await expect(page.locator('input[type=password]')).toHaveCount(0);
  await expect(page.locator('input[type=file]')).toHaveCount(2);
  await expect(page.getByText('No bank login. No budget advice.')).toHaveCount(0);
  await page.goto('/');
  await expect(page.getByText('No bank login. No budget advice.')).toBeVisible();
});

test('@claim:offline-reload renders the sample after an offline reload', async ({ page, context }) => {
  await page.goto('/demo');
  await page.waitForFunction(() => navigator.serviceWorker.ready.then(() => true));
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Review statement matches' })).toBeVisible();
  await expect(page.locator('.match')).toHaveCount(10);
});

test('@claim:paid-license verifies a restored license through the allowed billing origin', async ({ page }) => {
  await page.addInitScript(() => {
    const realFetch = window.fetch.bind(window);
    window.fetch = async (input, init) => {
      if (String(input).includes('api.sociobot.in/api/v1/products/statement-reconcile-bridge/verify?license=bad-token')) {
        (window as unknown as { verifyRequested: boolean }).verifyRequested = true;
        return new Response(JSON.stringify({ valid: false, reason: 'invalid' }), { status: 200, headers: { 'content-type': 'application/json' } });
      }
      return realFetch(input, init);
    };
  });
  await page.goto('/');
  await page.locator('#license-input').fill('bad-token');
  await page.getByRole('button', { name: 'Restore license' }).click();
  await expect(page.getByRole('alert')).toContainText('That license is not active. Check the token or buy a new unlock.');
  expect(await page.evaluate(() => (window as unknown as { verifyRequested?: boolean }).verifyRequested)).toBeTruthy();
  const config = readFileSync('public/staticwebapp.config.json', 'utf8');
  expect(config).toContain("connect-src 'self' https://api.sociobot.in");
});

test('@claim:one-time-price shows the exact custom-rules price', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('$19 once. Exporting, reviewing, and audit files stay free.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Buy custom rules — $19' })).toBeVisible();
});

test('@claim:no-budget-advice states the product limit plainly', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'No bank login. No budget advice.' })).toBeVisible();
});

test('@regression:errors are visible and announced for invalid files and blank licenses', async ({ page }) => {
  await page.goto('/work');
  await page.locator('#statement-file').setInputFiles({ name: 'broken.csv', mimeType: 'text/csv', buffer: Buffer.from('date,merchant,amount\nnot-a-date,Thing,nope') });
  await expect(page.getByRole('alert')).toContainText('Row 2 has an unreadable amount.');
  await page.goto('/');
  await page.getByRole('button', { name: 'Restore license' }).click();
  await expect(page.getByRole('alert')).toContainText('Paste your license token, then restore it.');
});

test('@regression:route focus, mobile target sizes, and keyboard demo navigation work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const start = page.getByRole('button', { name: 'Try it with sample data' });
  await start.focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Review statement matches' })).toBeFocused();
  for (const name of ['Reset demo', 'Start for real']) {
    const box = await page.getByRole('button', { name }).first().boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
  expect(readFileSync('src/repair.css', 'utf8')).toContain('.compact{min-height:44px');
});
