---
title: 'List seeded factors'
type: 'feature'
ticket: '1'
created: '2026-10-15'
status: 'built'
baseline_revision: '994bb972a52811aecbb9b39ba29954b39011447a'
route: 'full'
route_source: 'auto'
risk: 'low'
review: 'quick'
review_source: 'pinned'
lenses_ran: ['quick']
review_loop_iteration: 0
context:
  - '{project-root}/_bmad-output/initiative-fac-factor-library/epic-browse-factors/epic-browse-factors.md'
  - '{project-root}/_bmad-output/initiative-fac-factor-library/prd-fac-factor-library/prd-fac-factor-library.md'
  - '{project-root}/_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md'
  - '{project-root}/_bmad-output/initiative-fac-factor-library/ux-fac-factor-library/DESIGN.md'
---

<frozen-after-approval reason="human-owned intent, do not modify unless human renegotiates">

## Intent

**Problem:** Priya cannot see which emission factors Carbon Hub Lite uses. Until she can, she has no way to check a figure later.

**Approach:** Seed six factors in memory. Add `GET /api/v1/factors` with `scope` and `activityType` filters. Add a "Factor library" page that shows the list in a table with a scope badge, a version chip and a "Workshop sample values" notice.

## Boundaries & Constraints

**Always:** Follow the system spine, AD-1 to AD-10. Factor values are decimal strings. Ids are fixed so seeding twice changes nothing. Code lives in `apps/api/src/modules/factors/` with routes, service, repository and types. The web page uses the API list as received.

**Never:** Add create, update or delete for factors. Add the detail endpoint (ticket 1.2). Add pagination. Calculate anything in the web app.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Full list | `GET /api/v1/factors` | 200, `count` 6, items ordered by label | No error expected |
| Scope filter | `?scope=1` | 200, only scope 1 factors | No error expected |
| Type filter | `?activityType=diesel` | 200, one factor | No error expected |
| No match | `?scope=2&activityType=diesel` | 200, `count` 0, empty `items` | No error expected |
| API down | The web page cannot reach the API | The page shows an error message | Alert text, no crash |

</frozen-after-approval>

## Code Map

- `apps/api/src/app.ts` -- `buildApp()` only has `/health`; seed the repository and register the routes here. Keep `/health` as it is.
- `apps/api/src/modules/factors/` -- new module, four files (AD-8): `types.ts`, `repository.ts`, `service.ts`, `routes.ts`.
- `apps/api/test/health.test.ts` -- the existing pattern: `buildApp()` then `app.inject`. Reuse it. Do not change it.
- `apps/web/src/App.tsx` -- the Factors tab shows a placeholder. Replace it with the page.
- `apps/web/src/styles.css` -- add table, badge, chip and notice styles from the design tokens.
- `apps/web/src/pages/` and `apps/web/src/api/` -- new: `FactorLibraryPage.tsx` and `factors.ts`.

## Tasks & Acceptance

**Execution:**
- [x] `apps/api/src/modules/factors/types.ts` -- add `Factor`, the filter type and the activity type list -- shared by all layers
- [x] `apps/api/src/modules/factors/repository.ts` -- add the store and a seed with fixed ids -- FAC.FR-1 (seeding twice adds nothing), AD-3
- [x] `apps/api/src/modules/factors/service.ts` -- add `list(filter)` with ordering by label -- FAC.FR-1
- [x] `apps/api/src/modules/factors/routes.ts` -- add the list route returning `{count, items}` -- AD-7
- [x] `apps/api/src/app.ts` -- seed and register the routes -- host wiring
- [x] `apps/api/test/factors.test.ts` -- one test per criterion (a) to (f), covering every row of the matrix -- AD-10
- [x] `apps/web/src/api/factors.ts` and `apps/web/src/pages/FactorLibraryPage.tsx` -- fetch and show the table -- criterion (g)
- [x] `apps/web/src/App.tsx` and `apps/web/src/styles.css` -- wire the tab and style the table

**Acceptance Criteria:**
- Given the six factors are seeded, when I call `GET /api/v1/factors`, then the response is 200 with `count` 6 and items ordered by label ascending. (a)
- Given the factors are listed, when I look at any item, then it has `id`, `activityType`, `label`, `unit`, `kgCo2ePerUnit`, `scope`, `source`, `version` and `validFrom`, and `kgCo2ePerUnit` is a string. (b)
- Given the six factors are seeded, when I call `GET /api/v1/factors?scope=1`, then only scope 1 factors are returned and `count` matches. (c)
- Given the six factors are seeded, when I call `GET /api/v1/factors?activityType=diesel`, then exactly one factor is returned and it is the diesel factor. (d)
- Given the six factors are seeded, when I filter with values that match nothing, then the response is 200 with `count` 0 and empty `items`. (e)
- Given the seed has already run, when it runs again, then there are still six factors. (f)
- Given the API is running, when I open the Factors tab, then the "Factor library" page shows the factors in a table with a scope badge, a version chip and a "Workshop sample values" notice. (g)

## Implementation Notes

- The repository returns copies, so callers cannot change the stored factors.
- The seed runs in `buildApp()`. Each built app has its own store, so tests do not share state.
- Criterion (g) has no automated test. It is checked in the browser (CLT.NFR-4, manual check).

## Plan Change Log

## Review Triage Log

Pass 1, Quick lens. 2 findings. Counts: high 0, medium 0, low 1, false 1, maybe-false 0. Nothing patched, nothing deferred.

| # | Verdict | Route | Evidence |
|---|---------|-------|----------|
| 1 | false | rejected | The web page has no automated test, but the plan lists criterion (g) as a manual check and the starter has no browser test setup. The claim that a criterion is untested does not hold. |
| 2 | low | rejected | The repository copies every factor on each `findAll()`. Six rows, no measurable cost, and the copy protects the stored data. A fix would add complexity for no gain. |

## Verification

**Commands:**
- `npm test` -- expected: all tests pass, including the six in `factors.test.ts`
- `npm run build` -- expected: the web app builds with no type errors

**Manual checks (if no CLI):**
- Start the API and the web app. Open the Factors tab. Six rows show, ordered by label, each with a scope badge and a version chip. The sample values notice is visible.

## Code Review

### 2026-10-15

> **Code review complete.** 0 `decision-needed`, 2 `patch`, 3 `defer`, 3 rejected.

Lenses: Blind Hunter, Edge Case Hunter, Verification Gap, Intent Alignment. Reference example. Your own review will find different things and word them differently. The invalid filter value is the one to look for.

- [x] [Review][Patch] Filter values are not validated. `?scope=9`, `?scope=0`, `?scope=abc`, an empty `scope` and a repeated `scope` return 200 with an empty list, and `?activityType=coal` does too. FAC.FR-2 says an invalid `scope` is rejected with a 400 problem+json (CLT.NFR-3, AD-7), and a typo must not look like "no results". Five raw findings, one root cause: the route passes the query to the service as it comes. [apps/api/src/modules/factors/routes.ts:14]
- [x] [Review][Patch] No test covers an invalid filter value, so the FAC.FR-2 rule has no passing test and AD-10 (CLT.NFR-4) is not met. [apps/api/test/factors.test.ts:15]
- [x] [Review][Defer] The list has no pagination. [apps/api/src/modules/factors/routes.ts:10] - deferred: six factors today; needs an architecture decision on the paging parameters.
- [x] [Review][Defer] No `ETag` or `Cache-Control` on a response that never changes at runtime. [apps/api/src/modules/factors/routes.ts:10] - deferred: not needed for the sample; decide the rule once for all read endpoints.
- [x] [Review][Defer] An unknown route returns the Fastify default 404 body, not problem+json (AD-7). [apps/api/src/app.ts:6] - deferred: pre-existing, and the fix touches every module.

**Rejected**

- `false`: `localeCompare` ordering may differ across runtimes. The locale is pinned to `"en"` and Node 20 and later ship full ICU.
- `false`: criterion (g), the web table, has no automated test. The plan lists it as a manual check and the project has no browser test setup yet.
- `low`: the repository copies every factor on each `findAll()`. Six rows, no measurable cost, and it protects the stored data.

Patches applied after the review: the route checks `scope` and `activityType` before it calls the service, and `factors.test.ts` gains the invalid filter cases. `npm test` passes with 13 tests.
