import { test, expect, log } from '../support/merged-fixtures';
import { FactorListSchema, SEEDED_FACTORS, type ExpectedFactor } from '../support/helpers/factor-data';

// Epic 1, story 1.1: GET /api/v1/factors.
// Workshop sample values, not real emission factors.
// Priorities and risk links come from _bmad-output/test-artifacts/test-design/test-design-epic-1.md.

const LIST = '/api/v1/factors';

interface FactorList {
  count: number;
  items: ExpectedFactor[];
}

test.describe('Factors API: list', () => {
  test('[P0] returns the six seeded factors, valid against the schema (AC a, b)', async ({ apiRequest }) => {
    await log.step('Request the full list');
    const { status, body } = await apiRequest<FactorList>({ method: 'GET', path: LIST }).validateSchema(FactorListSchema);

    expect(status).toBe(200);
    expect(body.count).toBe(6);
    expect(body.items).toEqual(SEEDED_FACTORS);
  });

  test('[P0] sends every factor value as a decimal string and keeps trailing zeros (CLT.NFR-1)', async ({ apiRequest }) => {
    const { body } = await apiRequest<FactorList>({ method: 'GET', path: LIST });

    for (const item of body.items) {
      expect(typeof item.kgCo2ePerUnit).toBe('string');
    }
    const byId = new Map(body.items.map((f) => [f.id, f.kgCo2ePerUnit]));
    expect(byId.get('EF-DIESEL-UK-2026.1')).toBe('2.70');
    expect(byId.get('EF-DISTRICTHEAT-UK-2026.1')).toBe('0.150');
  });

  test('[P1] orders the list by label ascending (AC a)', async ({ apiRequest }) => {
    const { body } = await apiRequest<FactorList>({ method: 'GET', path: LIST });

    const labels = body.items.map((f) => f.label);
    expect(labels).toEqual([...labels].sort((a, b) => a.localeCompare(b, 'en')));
  });

  test('[P1] scope filter returns only that scope and count matches (AC c)', async ({ apiRequest }) => {
    const scope1 = await apiRequest<FactorList>({ method: 'GET', path: LIST, params: { scope: 1 } });
    expect(scope1.status).toBe(200);
    expect(scope1.body.count).toBe(4);
    expect(scope1.body.items).toHaveLength(scope1.body.count);
    expect(scope1.body.items.every((f) => f.scope === 1)).toBe(true);

    const scope2 = await apiRequest<FactorList>({ method: 'GET', path: LIST, params: { scope: 2 } });
    expect(scope2.body.count).toBe(2);
    expect(scope2.body.items.map((f) => f.activityType)).toEqual(['district_heat', 'grid_electricity']);
  });

  for (const factor of SEEDED_FACTORS) {
    test(`[P1] activityType=${factor.activityType} returns exactly that factor (AC d)`, async ({ apiRequest }) => {
      const { status, body } = await apiRequest<FactorList>({
        method: 'GET',
        path: LIST,
        params: { activityType: factor.activityType },
      });

      expect(status).toBe(200);
      expect(body.count).toBe(1);
      expect(body.items).toEqual([factor]);
    });
  }

  test('[P1] scope and activityType together narrow the list (AC c, d)', async ({ apiRequest }) => {
    const { body } = await apiRequest<FactorList>({
      method: 'GET',
      path: LIST,
      params: { scope: 2, activityType: 'grid_electricity' },
    });

    expect(body.count).toBe(1);
    expect(body.items[0].id).toBe('EF-GRIDELEC-UK-2026.1');
  });

  test('[P1] a valid filter with no match returns 200, count 0 and empty items (AC e)', async ({ apiRequest }) => {
    const { status, body } = await apiRequest<FactorList>({
      method: 'GET',
      path: LIST,
      params: { scope: 2, activityType: 'diesel' },
    });

    expect(status).toBe(200);
    expect(body).toEqual({ count: 0, items: [] });
  });

  test('[P2] reading the list twice gives the same six factors (AC f at the API)', async ({ apiRequest }) => {
    const first = await apiRequest<FactorList>({ method: 'GET', path: LIST });
    const second = await apiRequest<FactorList>({ method: 'GET', path: LIST });

    expect(second.body).toEqual(first.body);
    expect(new Set(second.body.items.map((f) => f.id)).size).toBe(6);
  });
});

test.describe('Factors API: invalid filters return 400 problem+json (FAC.FR-2, CLT.NFR-3)', () => {
  // Problem+json tests use Playwright's request fixture. See the deviation note above each call.

  async function expectProblem(
    response: { status(): number; headers(): Record<string, string>; json(): Promise<Record<string, unknown>> },
    title: string,
  ) {
    expect(response.status()).toBe(400);
    expect(response.headers()['content-type']).toContain('application/problem+json');
    const problem = await response.json();
    expect(problem).toMatchObject({ title, status: 400 });
    expect(typeof problem.type).toBe('string');
    expect(typeof problem.detail).toBe('string');
  }

  for (const value of ['9', '0', 'abc', '']) {
    test(`[P0] scope=${JSON.stringify(value)} is rejected`, async ({ request }) => {
      // playwright-utils deviation: raw request, apiRequest returns a null body and no headers for problem+json
      const response = await request.get(`${LIST}?scope=${value}`);
      await expectProblem(response, 'Invalid scope');
    });
  }

  test('[P0] a repeated scope parameter is rejected, not treated as no match', async ({ request }) => {
    // playwright-utils deviation: raw request, apiRequest returns a null body and no headers for problem+json
    const response = await request.get(`${LIST}?scope=1&scope=2`);
    await expectProblem(response, 'Invalid scope');
  });

  test('[P0] an unknown activityType is rejected and named in the detail', async ({ request }) => {
    // playwright-utils deviation: raw request, apiRequest returns a null body and no headers for problem+json
    const response = await request.get(`${LIST}?activityType=coal`);
    await expectProblem(response, 'Invalid activity type');
    expect((await response.json()).detail).toContain('coal');
  });

  test('[P0] an empty activityType is rejected', async ({ request }) => {
    // playwright-utils deviation: raw request, apiRequest returns a null body and no headers for problem+json
    const response = await request.get(`${LIST}?activityType=`);
    await expectProblem(response, 'Invalid activity type');
  });
});

test.describe('Factors API: read only and unknown routes', () => {
  test('[P1] factors cannot be written over HTTP (AD-2, AD-3)', async ({ apiRequest }) => {
    for (const method of ['POST', 'PUT', 'PATCH', 'DELETE'] as const) {
      const { status } = await apiRequest({ method, path: LIST, body: { activityType: 'diesel' } });
      expect(status, `${method} ${LIST}`).toBeGreaterThanOrEqual(400);
    }
    const { body } = await apiRequest<FactorList>({ method: 'GET', path: LIST });
    expect(body.count).toBe(6);
  });

  test('[P2] an unknown route returns 404', async ({ apiRequest }) => {
    // The body of this 404 is the Fastify default, not problem+json (AD-7). That gap is deferred in
    // deferred-work.md and is not asserted here. See "Left for later" in the automation summary.
    const { status } = await apiRequest({ method: 'GET', path: '/api/v1/does-not-exist' });
    expect(status).toBe(404);
  });
});
