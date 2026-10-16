import { defineConfig, devices } from '@playwright/test';

// Carbon Hub Lite test configuration.
// Two projects: "api" talks to the Fastify API with no browser, "chromium" drives the web app.
// Both servers start on their own with `npm run test:e2e`. A server that is already running is reused.

const WEB_URL = process.env.BASE_URL ?? 'http://localhost:5173';
const API_URL = process.env.API_URL ?? 'http://127.0.0.1:3001';
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: 'retain-on-failure-and-retries',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: API_URL },
    },
    {
      name: 'chromium',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Chrome'], baseURL: WEB_URL },
    },
  ],
  webServer: [
    {
      command: 'npm run start -w apps/api',
      url: `${API_URL}/health`,
      reuseExistingServer: !isCI,
      timeout: 60_000,
    },
    {
      command: 'npm run dev:web',
      url: WEB_URL,
      reuseExistingServer: !isCI,
      timeout: 60_000,
    },
  ],
});
