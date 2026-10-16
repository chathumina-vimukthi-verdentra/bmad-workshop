---
workflowStatus: 'completed'
totalSteps: 5
stepsCompleted: ['step-01-detect-mode', 'step-02-load-context', 'step-03-risk-and-testability', 'step-04-coverage-plan', 'step-05-generate-output']
lastStep: 'step-05-generate-output'
nextStep: ''
lastSaved: '2026-10-16'
---

# Test Design: Epic 1 - Priya can browse the emission factors

**Date:** 2026-10-16
**Author:** Carbon Hub Lite workshop team
**Status:** Draft

Workshop sample values, not real emission factors. This is a reference example. A live run of `/bmad-tea-test-design` will word things differently and may score some risks differently.

---

## Executive Summary

**Scope:** Full test design for Epic 1 (`epic-browse-factors`, initiative FAC). Ticket 1.1 (List seeded factors) is built and reviewed. Ticket 1.2 (Factor detail by id) is planned and not built, so it has no coverage rows yet.

**Risk Summary:**

- Total risks identified: 4
- High-priority risks (score 6 or more): 1
- Critical categories: BUS (1), TECH (1), PERF (1), OPS (1)

**Coverage Summary:**

- P0 scenarios: 9 (~12 to 20 hours)
- P1 scenarios: 19 (~12 to 20 hours)
- P2/P3 scenarios: 4 (~2 to 5 hours)
- **Total effort**: 32 scenarios, ~26 to 45 hours (~4 to 6 days) if written by hand

---

## Not in Scope

| Item | Reasoning | Mitigation |
| --- | --- | --- |
| **Ticket 1.2, factor detail by id (FAC.FR-3)** | Not built. `GET /api/v1/factors/:id` does not exist yet. | Add coverage rows when ticket 1.2 is built. The unknown id 404 problem+json check belongs there. |
| **Scope filter select, count text, loading skeleton and "Try again" button on the page** | `EXPERIENCE.md` describes them, but the ticket 1.1 acceptance criteria and the built page do not include them. Tests cover what exists. | Raised as clarification C-1 below. |
| **Pagination and caching headers** | Deferred in `deferred-work.md`. Six factors today. | Documented as R-003 and R-004. Add tests when the decision is made. |
| **Load and performance testing** | No performance threshold is stated in any source. | Listed under unknown thresholds. |
| **Browsers other than Chromium** | The workshop runs one browser. | Add projects to `playwright.config.ts` when needed. |
| **Contract tests (Pact)** | The web app calls its own API from the same repository. There is no consumer-provider boundary. | None needed. |
| **Modules ACT and FPS** | Other initiatives, not built. | They will use the seeded factors as their data. |

---

## Risk Assessment

Every risk below cites the statement it comes from. A concern with no supporting statement is listed as an assumption or clarification at the end, not scored.

### High-Priority Risks (Score 6 or more)

| Risk ID | Category | Description | Probability | Impact | Score | Mitigation | Owner | Timeline |
| ------- | -------- | ----------- | ----------- | ------ | ----- | ---------- | ----- | -------- |
| R-001 | BUS | Criterion (g) has no automated test. The plan's Implementation Notes say the Factor library table, scope badge, version chip and sample values notice are checked by hand only. A later change can break the page unnoticed, and Priya loses the one screen where she checks which factor, version and value sit behind a figure. | 2 | 3 | 6 | Browser tests for the page with Playwright, including the error and empty states. | QA | Before ticket 1.1 is marked done |

### Medium-Priority Risks (Score 3-4)

| Risk ID | Category | Description | Probability | Impact | Score | Mitigation | Owner |
| ------- | -------- | ----------- | ----------- | ------ | ----- | ---------- | ----- |
| R-002 | TECH | An unknown route returns the Fastify default 404 body, not problem+json. The code review deferred it: one not-found handler and one error handler are missing, and CLT.NFR-3 says every API error is problem+json. A client that parses error bodies will not find `type`, `title`, `status` and `detail`. | 3 | 1 | 3 | Track the deferred item. Test that the route returns 404 today. Add the problem+json assertion in the same change that adds the handlers. Owner: Dev. | Dev |

### Low-Priority Risks (Score 1-2)

| Risk ID | Category | Description | Probability | Impact | Score | Action |
| ------- | -------- | ----------- | ----------- | ------ | ----- | ------ |
| R-003 | PERF | The list has no pagination. The code review deferred it: fine with six factors, add `limit` and `offset` when the library passes about 50. | 1 | 2 | 2 | Document. Revisit when the factor count grows. |
| R-004 | OPS | No `ETag` or `Cache-Control` on a response that never changes at runtime. The code review deferred it until factors come from a store that can change. | 1 | 1 | 1 | Document. Decide the rule once for all read endpoints. |

### Risk Category Legend

- **TECH**: Technical/Architecture (flaws, integration, scalability)
- **SEC**: Security (access controls, auth, data exposure)
- **PERF**: Performance (SLA violations, degradation, resource limits)
- **DATA**: Data Integrity (loss, corruption, inconsistency)
- **BUS**: Business Impact (UX harm, logic errors, revenue)
- **OPS**: Operations (deployment, config, monitoring)

### Controls already in place

These are not scored. The coverage plan checks them with regression tests.

- Invalid `scope` and `activityType` values return 400 problem+json. The code review found they returned 200 with an empty list, and the patch fixed it (FAC.FR-2, CLT.NFR-3). It was broken once, so it is P0.
- Factors cannot be written over HTTP. The module has no write route (AD-2, AD-3).
- The web page never re-sorts and never calculates (`EXPERIENCE.md`). A browser test compares the visible order with the API response.

---

## NFR Planning

**Purpose:** Capture epic-specific NFR thresholds, planned validation, and evidence expected for later `nfr-assess`. This is not a final evidence audit.

| NFR Category | Requirement / Threshold | Risk Link | Planned Validation | Evidence Needed |
| ------------ | ----------------------- | --------- | ------------------ | --------------- |
| Precision | Factor values are decimal strings, never floats (CLT.NFR-1) | - | API tests for string type and trailing zeros. Browser test for values shown as sent. | Playwright report |
| Error format | Every API error is problem+json with `type`, `title`, `status`, `detail` (CLT.NFR-3) | R-002 | API tests for the 400 cases. The 404 body check waits for the deferred handler. | Playwright report |
| Test evidence | Every acceptance criterion has a passing automated test, or a stated manual check (CLT.NFR-4) | R-001 | Browser tests replace the manual check for criterion (g). | Playwright report, `npm test` output |
| Accessibility | WCAG 2.2 AA (`EXPERIENCE.md`, Accessibility Floor) | - | axe scan of the loaded page and the error state | Playwright report |
| Performance | No threshold stated | R-003 | None planned | None |
| Security | Read-only, no sign-in in R1 | - | Write attempts are rejected (AD-2) | Playwright report |

**Unknown thresholds:** response time and page load time for the factor list. No source states one, so none is invented.

---

## Entry Criteria

- [x] Requirements and assumptions agreed upon by QA, Dev, PM (capability PRD sections 3 and 10)
- [x] Test environment provisioned and accessible (API on port 3001, web app on port 5173)
- [x] Test data available (six seeded factors in memory, ids fixed)
- [x] Feature deployed to test environment (ticket 1.1 built)
- [x] Test framework set up with `/bmad-tea-framework`

## Exit Criteria

- [ ] All P0 tests passing
- [ ] All P1 tests passing (or failures triaged)
- [ ] No open high-priority / high-severity bugs
- [ ] Test coverage agreed as sufficient
- [ ] Ticket 1.2 coverage rows added when it is built

## Test Coverage Plan

### P0 (Critical)

**Criteria**: Critical business, security, data-integrity, or compliance impact with no safe workaround. Risk score is supporting evidence and is not a required condition.

| Requirement | Test Level | Risk Link | Test Count | Owner | Notes |
| ----------- | ---------- | --------- | ---------- | ----- | ----- |
| FAC.FR-1: seeded list has six factors, nine fields, label order, valid shape (AC a, b) | API | - | 1 | QA | Every figure in Carbon Hub Lite is built on these values. A wrong value corrupts every footprint and has no workaround. Schema check plus full comparison with the PRD seed table. |
| CLT.NFR-1: values are decimal strings with trailing zeros kept | API | - | 1 | QA | Data integrity. Checks `"2.70"` and `"0.150"` are not shortened. |
| FAC.FR-2: invalid `scope` or `activityType` returns 400 problem+json | API | - | 7 | QA | Previously broken functionality found in the code review: a typo looked like "no results". Scenarios: scope 9, 0, abc, empty, repeated scope, unknown activityType, empty activityType. The repeated scope case was in the review finding but had no test. |

**Total P0**: 9 tests, ~12 to 20 hours

### P1 (High)

**Criteria**: Core, frequent, or complex behavior with material user reach and a limited workaround. Risk score is supporting evidence and is not a required condition.

| Requirement | Test Level | Risk Link | Test Count | Owner | Notes |
| ----------- | ---------- | --------- | ---------- | ----- | ----- |
| FAC.FR-1: Factor library page (AC g) | E2E | R-001 | 7 | QA | Mechanism: the page depends on the API and the browser, so the failure first shows across two deployables. Consequence: Priya cannot check a factor, and the workaround is a manual check by someone who knows the API. Scenarios: six rows in the API order, sample values notice, scope badge per row, version chip per row, values as sent, error message when the API fails, message when the list is empty. |
| FAC.FR-1: list is ordered by label | API | - | 1 | QA | Order is fixed by the API. The page must not re-sort. |
| FAC.FR-2: scope, activityType, combined and no-match filters (AC c, d, e) | API | - | 9 | QA | Scenarios: scope 1, one per activity type (6), scope with type, no match returns 200 with count 0. |
| AD-2, AD-3: factors cannot be written over HTTP | API | - | 1 | QA | POST, PUT, PATCH and DELETE are rejected and the list still has six factors. |
| EXPERIENCE.md: no WCAG 2.2 AA violations on the loaded page | E2E | - | 1 | QA | axe-core with tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa. |

**Total P1**: 19 tests, ~12 to 20 hours

### P2 (Medium)

**Criteria**: Secondary behavior with narrower user reach and an acceptable workaround. Risk score is supporting evidence and is not a required condition.

| Requirement | Test Level | Risk Link | Test Count | Owner | Notes |
| ----------- | ---------- | --------- | ---------- | ----- | ----- |
| FAC.FR-1 (f): reading the list twice gives the same six factors | API | - | 1 | QA | Seeding itself is a Unit-level check in `apps/api/test/factors.test.ts`. This is the API view of it. |
| CLT.NFR-3: an unknown route returns 404 | API | R-002 | 1 | QA | Mechanism: no not-found handler, so Fastify answers with its default body. Boundary: one service's HTTP contract, so API level. The test asserts the status only. The workaround is that the client treats any 404 as not found. The body check comes with the deferred handler. |
| EXPERIENCE.md: no WCAG 2.2 AA violations in the error state | E2E | - | 1 | QA | The error alert is the second state of the page that Priya can see. |

**Total P2**: 3 tests, ~2 to 3 hours

### P3 (Low)

**Criteria**: Rare, cosmetic, or experimental behavior with minimal impact and an easy workaround.

| Requirement | Test Level | Risk Link | Test Count | Owner | Notes |
| ----------- | ---------- | --------- | ---------- | ----- | ----- |
| App shell: Factors is the current tab, the other two tabs show their placeholders | E2E | - | 1 | QA | Smoke test only. |
| Pagination is not needed yet | API | R-003 | 0 | QA | Documented only. No test until the paging decision is made. |
| Caching headers are not set yet | API | R-004 | 0 | QA | Documented only. No test until the rule is decided. |

**Total P3**: 1 test, ~0.5 to 1 hour

---

## Execution Strategy

**Philosophy:** Run every functional scenario in pull requests while the suite stays under 15 minutes. P0 through P3 are priority and are not execution timing; this section decides when tests run and the coverage plan above decides what they are.

- **Pull request:** all 32 Playwright scenarios (API and browser) and the 13 Vitest tests. The Playwright run takes under 10 seconds on a laptop. It runs in parallel.
- **Nightly:** nothing yet. Add burn-in of changed specs when the suite grows (see the automation summary, RECOMMENDED utilities).
- **Weekly:** nothing yet.

---

## Resource Estimates

### Test Development Effort

| Priority | Count | Hours/Test | Total Hours | Notes |
| -------- | ----- | ---------- | ----------- | ----- |
| P0 | 9 | 2.0 | ~12 to 20 | Data integrity and error format |
| P1 | 19 | 1.0 | ~12 to 20 | Page, filters, read-only, accessibility |
| P2 | 3 | 0.5 | ~2 to 3 | Secondary behavior |
| P3 | 1 | 0.25 | ~0.5 to 1 | Smoke |
| **Total** | **32** | **-** | **~26 to 45** | **~4 to 6 days** |

These are hand-written estimates. `/bmad-tea-automate` wrote the suite in one pass.

### Prerequisites

**Test Data:**

- Expected factor data copied from the capability PRD seed table (`tests/support/helpers/factor-data.ts`)
- No data factories yet. The factors module has no write endpoint, so there is nothing to create or clean up.

**Tooling:**

- Playwright and `@seontechnologies/playwright-utils` for API and browser tests
- `@axe-core/playwright` for accessibility scans
- Vitest for the existing API unit tests

**Environment:**

- Node.js 20 or later
- Ports 3001 and 5173 free, or servers already running

---

## Quality Gate Criteria

### Pass/Fail Thresholds

- **P0 pass rate**: 100% (no exceptions)
- **P1 pass rate**: 95% or more (waivers required for failures)
- **P2/P3 pass rate**: 90% or more (informational)
- **High-risk mitigations**: 100% complete or approved waivers

### Coverage Targets

- **Critical paths**: 80% or more
- **Security scenarios**: 100% (write attempts rejected)
- **Business logic**: 70% or more
- **Edge cases**: 50% or more

### Non-Negotiable Requirements

- [ ] All P0 tests pass
- [ ] No high-risk (6 or more) items unmitigated: R-001 is mitigated by the seven browser tests
- [ ] Security tests pass 100%
- [ ] Performance targets met: not applicable, no threshold stated
- [ ] Planned NFR evidence exists or `nfr-assess` has documented CONCERNS/waivers

---

## Mitigation Plans

### R-001: Criterion (g) has no automated test (Score: 6)

**Mitigation Strategy:** Seven Playwright browser tests in `tests/e2e/factor-library.spec.ts` cover the table, order, notice, badge, chip, values as sent, error state and empty state. Two axe scans cover accessibility.
**Owner:** QA
**Timeline:** Before ticket 1.1 is marked done
**Status:** Complete in the reference run
**Verification:** `npm run test:e2e` passes. The plan's manual check for criterion (g) can be retired.

---

## Assumptions and Dependencies

### Assumptions

1. The seeded values in the capability PRD (section 4) are the oracle. The tests do not read expected values from the app.
2. The page has no `data-testid` attributes. Tests use roles, names and text.
3. Both servers run in memory with the fixed seed, so tests do not depend on each other.
4. In development mode the page asks for the list twice because React StrictMode runs effects twice. This is not a defect. Tests never count requests.

### Dependencies

1. Ticket 1.2 built - required before the factor detail coverage rows can be added.
2. A decision on the not-found and error handlers - required before R-002 gets its body assertion.

### Clarifications

- **C-1:** `EXPERIENCE.md` describes a Scope filter select, a count text, skeleton loading and a "Try again" button on the Factor library page. Ticket 1.1 does not include them and the page does not have them. Product to confirm whether they belong to a later ticket.

### Risks to Plan

- **Risk**: The accessibility scan finds a defect in the built page.
  - **Impact**: P1 test fails.
  - **Contingency**: Report it as a product defect. Fix it in the app, not in the test.

---

## Follow-on Workflows (Manual)

- Run `/bmad-tea-automate` to write the planned tests. This is the next step.
- Run `/bmad-tea-test-review` after that for a quality read of the new suite.

---

## Approval

**Test Design Approved By:**

- [ ] Product Manager: Date:
- [ ] Tech Lead: Date:
- [ ] QA Lead: Date:

**Comments:**

---

## Interworking & Regression

| Service/Component | Impact | Regression Scope |
| ----------------- | ------ | ---------------- |
| **apps/api factors module** | The tests exercise the real routes. | `apps/api/test/health.test.ts` and `apps/api/test/factors.test.ts` (13 Vitest tests) must keep passing. |
| **apps/web Factors tab** | The browser tests exercise the real page. | All tests in `tests/e2e/`. |
| **ACT and FPS (later)** | They will read factors through the factors service. | The seeded data in `tests/support/helpers/factor-data.ts` is the shared oracle. |

---

## Appendix

### Knowledge Base References

- `risk-governance.md` - Risk classification framework
- `probability-impact.md` - Risk scoring methodology
- `test-levels-framework.md` - Test level selection
- `test-priorities-matrix.md` - P0-P3 prioritization
- `nfr-criteria.md` - NFR planning

### Related Documents

- PRD: `_bmad-output/initiative-fac-factor-library/prd-fac-factor-library/prd-fac-factor-library.md`
- Master PRD: `_bmad-output/prd-carbon-lite/prd-carbon-lite.md`
- Epic: `_bmad-output/initiative-fac-factor-library/epic-browse-factors/epic-browse-factors.md`
- Plan and review: `_bmad-output/initiative-fac-factor-library/epic-browse-factors/story-list-seeded-factors-plan.md`
- Deferred work: `_bmad-output/initiative-fac-factor-library/deferred-work.md`
- System spine: `_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`
- UX: `_bmad-output/initiative-fac-factor-library/ux-fac-factor-library/EXPERIENCE.md`
