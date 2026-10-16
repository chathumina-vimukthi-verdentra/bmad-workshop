import { mergeTests } from '@playwright/test';
import { log } from '@seontechnologies/playwright-utils';
import { test as apiRequestFixture } from '@seontechnologies/playwright-utils/api-request/fixtures';
import { test as recurseFixture } from '@seontechnologies/playwright-utils/recurse/fixtures';
import { test as interceptFixture } from '@seontechnologies/playwright-utils/intercept-network-call/fixtures';
import { test as networkErrorFixture } from '@seontechnologies/playwright-utils/network-error-monitor/fixtures';

// The one entry point every spec imports `test` from.
// No auth fixture: Carbon Hub Lite has no sign-in in R1 (see the system spine, Deferred).
export const test = mergeTests(apiRequestFixture, recurseFixture, interceptFixture, networkErrorFixture);

export { expect } from '@playwright/test';
export { log };
