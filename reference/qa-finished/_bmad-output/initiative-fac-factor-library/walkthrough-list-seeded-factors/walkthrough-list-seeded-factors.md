# Walkthrough: List seeded factors (ticket 1.1)

Reference example. Your own walkthrough will use different words and may cut the blocks differently. What matters is the shape: intent first, a few entry points, slices of one concern each, periphery as links only.

Target: the commit that built ticket 1.1. Review status: all blocks accepted.

- [x] 1. Intent
- [x] 2. Broad strokes
- [x] 3. Slice: repository and seed
- [x] 4. Slice: service and route
- [x] 5. Slice: host wiring and tests
- [x] 6. Slice: web page
- [x] 7. Periphery

## 1. Intent

**Problem:** Priya cannot see which emission factors Carbon Hub Lite uses. Until she can, she has no way to check a figure later.

**Approach:** Seed six factors in memory. Add `GET /api/v1/factors` with `scope` and `activityType` filters. Add a "Factor library" page that shows the list in a table with a scope badge, a version chip and a "Workshop sample values" notice.

Source: the Intent section of the build plan, [story-list-seeded-factors-plan.md](../epic-browse-factors/story-list-seeded-factors-plan.md).

## 2. Broad strokes

Open these in order. They show the whole mechanism in about ten minutes.

1. [routes.ts:10](../../../apps/api/src/modules/factors/routes.ts) is where the HTTP request enters. It reads the query and calls the service.
2. [repository.ts:44](../../../apps/api/src/modules/factors/repository.ts) is the seed. The six factors and their fixed ids come from here.
3. [app.ts:10](../../../apps/api/src/app.ts) wires the module into the app. It seeds, then registers the routes.
4. [FactorLibraryPage.tsx:9](../../../apps/web/src/pages/FactorLibraryPage.tsx) is the page the member sees.
5. [factors.test.ts:15](../../../apps/api/test/factors.test.ts) shows what is promised and what is not.

## 3. Slice: repository and seed

The repository is an in-memory store. `seed()` adds a factor only when its id is not already stored, so running it twice is safe (FAC.FR-1: seeding twice adds nothing). Values are decimal strings with trailing zeros kept (AD-4). `findAll()` returns copies, so callers cannot change the stored factors.

- [repository.ts](../../../apps/api/src/modules/factors/repository.ts)
- [types.ts](../../../apps/api/src/modules/factors/types.ts)

## 4. Slice: service and route

The service orders by `label` in English locale (FAC.FR-1) and applies the two optional filters together. The route turns the query into a filter and returns `{ count, items }` (AD-7). Look at how `scope` becomes a number on the route and what the code does with a value that is not 1 or 2.

- [service.ts](../../../apps/api/src/modules/factors/service.ts)
- [routes.ts:10](../../../apps/api/src/modules/factors/routes.ts)

## 5. Slice: host wiring and tests

`buildApp()` creates the repository, seeds it, then registers the routes. Each built app has its own store, so tests do not share state. `/health` is untouched. The tests give one case per criterion (a) to (f). Criterion (g), the web table, is a manual check.

- [app.ts](../../../apps/api/src/app.ts)
- [factors.test.ts](../../../apps/api/test/factors.test.ts)

## 6. Slice: web page

The page shows items in the order received and prints `kgCo2ePerUnit` as the string it got. It does no calculation and no sorting. It has loading, error and empty states and the notice text "Workshop sample values, not real emission factors."

- [FactorLibraryPage.tsx](../../../apps/web/src/pages/FactorLibraryPage.tsx)
- [factors.ts](../../../apps/web/src/api/factors.ts)
- [App.tsx](../../../apps/web/src/App.tsx)
- [styles.css](../../../apps/web/src/styles.css)

## 7. Periphery

Low risk. Skim only.

- [server.ts](../../../apps/api/src/server.ts)
- [vite.config.ts](../../../apps/web/vite.config.ts)
- [main.tsx](../../../apps/web/src/main.tsx)
- [package.json](../../../package.json)
