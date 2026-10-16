import { test, expect, log } from '../support/merged-fixtures';
import { SAMPLE_NOTICE, SEEDED_FACTORS } from '../support/helpers/factor-data';

// Epic 1, story 1.1, acceptance criterion (g): the Factor library page.
// Workshop sample values, not real emission factors.

test.describe('Factor library page', () => {
  test('[P1] lists the six seeded factors in the order the API sends them (AC g)', async ({ page, interceptNetworkCall }) => {
    const listCall = interceptNetworkCall({ method: 'GET', url: '**/api/v1/factors' });

    await page.goto('/');
    const { responseJson, status } = await listCall;

    expect(status).toBe(200);
    const rows = page.locator('tbody').getByRole('row');
    await expect(rows).toHaveCount(6);

    // The page never re-sorts: the visible order is the order received.
    const sent = (responseJson as { items: { label: string }[] }).items.map((f) => f.label);
    const shown = await rows.evaluateAll((trs) => trs.map((tr) => tr.querySelector('td div')?.textContent ?? ''));
    expect(shown).toEqual(sent);
    expect(shown).toEqual(SEEDED_FACTORS.map((f) => f.label));
  });

  test('[P1] shows the Workshop sample values notice (AC g)', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 2, name: 'Factor library' })).toBeVisible();
    await expect(page.getByText(SAMPLE_NOTICE)).toBeVisible();
  });

  test('[P1] every row has a scope badge that matches the factor scope (AC g)', async ({ page }) => {
    await page.goto('/');
    const rows = page.locator('tbody').getByRole('row');
    await expect(rows).toHaveCount(6);

    for (const [index, factor] of SEEDED_FACTORS.entries()) {
      await expect(rows.nth(index).getByText(`Scope ${factor.scope}`, { exact: true })).toBeVisible();
    }
  });

  test('[P1] every row has a version chip (AC g)', async ({ page }) => {
    await page.goto('/');
    const rows = page.locator('tbody').getByRole('row');
    await expect(rows).toHaveCount(6);

    for (let index = 0; index < 6; index++) {
      await expect(rows.nth(index).getByText('v2026.1', { exact: true })).toBeVisible();
    }
  });

  test('[P1] prints each value exactly as the API sent it, trailing zeros kept (CLT.NFR-1)', async ({ page }) => {
    await page.goto('/');
    const rows = page.locator('tbody').getByRole('row');
    await expect(rows).toHaveCount(6);

    for (const [index, factor] of SEEDED_FACTORS.entries()) {
      await expect(rows.nth(index).getByRole('cell', { name: factor.kgCo2ePerUnit, exact: true })).toBeVisible();
      await expect(rows.nth(index).getByText(factor.id, { exact: true })).toBeVisible();
    }
  });

  test('[P1] shows an error message when the API cannot be reached', { annotation: [{ type: 'skipNetworkMonitoring' }] }, async ({ page, interceptNetworkCall }) => {
    await log.step('Make the factor list fail with a 500');
    const failedCall = interceptNetworkCall({
      method: 'GET',
      url: '**/api/v1/factors',
      fulfillResponse: { status: 500, body: { message: 'boom' } },
    });

    await page.goto('/');
    await failedCall;

    await expect(page.getByRole('alert')).toHaveText('Could not load factors (status 500)');
    await expect(page.getByRole('table')).toHaveCount(0);
  });

  test('[P1] shows a message when the list is empty', async ({ page, interceptNetworkCall }) => {
    const emptyCall = interceptNetworkCall({
      method: 'GET',
      url: '**/api/v1/factors',
      fulfillResponse: { status: 200, body: { count: 0, items: [] } },
    });

    await page.goto('/');
    await emptyCall;

    await expect(page.getByText('No factors found.')).toBeVisible();
    await expect(page.getByRole('table')).toHaveCount(0);
  });
});

test.describe('App shell tabs', () => {
  test('[P3] Factors is the current tab and the other tabs are placeholders', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main' });

    await expect(nav.getByRole('button', { name: 'Factors' })).toHaveAttribute('aria-current', 'page');

    await nav.getByRole('button', { name: 'Activities' }).click();
    await expect(page.getByText('Coming in story 2.1')).toBeVisible();

    await nav.getByRole('button', { name: 'Footprint' }).click();
    await expect(page.getByText('Coming in story 3.2')).toBeVisible();

    await nav.getByRole('button', { name: 'Factors' }).click();
    await expect(page.locator('tbody').getByRole('row')).toHaveCount(6);
  });
});
