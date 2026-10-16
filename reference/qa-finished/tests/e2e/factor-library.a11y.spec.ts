import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../support/merged-fixtures';

// Accessibility floor from EXPERIENCE.md: WCAG 2.2 AA.
// Workshop sample values, not real emission factors.

const WCAG_22_AA = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

function describeViolations(violations: { id: string; help: string; nodes: { html: string }[] }[]) {
  return violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? '' : 's'})`);
}

test.describe('Factor library accessibility', () => {
  test('[P1] the loaded page has no WCAG 2.2 AA violations', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('tbody').getByRole('row')).toHaveCount(6);

    const results = await new AxeBuilder({ page }).withTags(WCAG_22_AA).analyze();

    expect(describeViolations(results.violations)).toEqual([]);
  });

  test('[P2] the error state has no WCAG 2.2 AA violations', { annotation: [{ type: 'skipNetworkMonitoring' }] }, async ({ page, interceptNetworkCall }) => {
    const failedCall = interceptNetworkCall({
      method: 'GET',
      url: '**/api/v1/factors',
      fulfillResponse: { status: 500, body: { message: 'boom' } },
    });
    await page.goto('/');
    await failedCall;
    await expect(page.getByRole('alert')).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(WCAG_22_AA).analyze();

    expect(describeViolations(results.violations)).toEqual([]);
  });
});
