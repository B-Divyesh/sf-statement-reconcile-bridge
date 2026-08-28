import { test, expect } from '@playwright/test';

test('@claim:sample-reconcile loads a complete sample review queue', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.getByRole('heading', { name: 'Review statement matches' })).toBeVisible();
  await expect(page.getByText('10 statement rows and 11 ledger rows are loaded.')).toBeVisible();
  await expect(page.locator('.match')).toHaveCount(10);
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
});

test('@claim:csv-export exports accepted reviewed rows', async ({ page }) => {
  await page.goto('/demo');
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export reviewed CSV' }).click();
  const file = await download;
  expect(file.suggestedFilename()).toBe('reviewed-rows.csv');
  const content = await file.createReadStream().then(async stream => { const chunks: Buffer[]=[]; for await (const c of stream!) chunks.push(c); return Buffer.concat(chunks).toString(); });
  expect(content).toContain('statement_date,statement_payee,statement_amount');
  expect(content.split('\n').length).toBeGreaterThan(1);
  expect(content).toContain('accepted');
});

test('@claim:local-only makes no cross-origin requests during the demo flow', async ({ page }) => {
  const external: string[] = [];
  page.on('request', request => { if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') external.push(request.url()); });
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Export audit report' }).click();
  expect(external).toEqual([]);
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

test('@claim:paid-license unlocks custom cleanup rules from a verified license callback', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('sb_license:statement-reconcile-bridge', 'demo-license');
    localStorage.setItem('sb_license:statement-reconcile-bridge:verdict', JSON.stringify({ valid: true, checked: Date.now() }));
  });
  await page.goto('/');
  await expect(page.getByText('$19 once. Exporting, reviewing, and audit files stay free.')).toBeVisible();
  await expect(page.getByText('License active. Custom cleanup rules are ready in the workbench.')).toBeVisible();
  await page.goto('/demo');
  await expect(page.getByRole('heading', { name: 'Custom cleanup rule' })).toBeVisible();
});

test('mobile layout preserves the primary action and keyboard controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const start = page.getByRole('button', { name: 'Try it with sample data' });
  await expect(start).toBeVisible();
  await start.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Review statement matches' })).toBeVisible();
});
