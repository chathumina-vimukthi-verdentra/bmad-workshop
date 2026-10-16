## Deferred from: code review of story-list-seeded-factors-plan (2026-10-15)

- **Pagination for the factor list.** `GET /api/v1/factors` returns every factor. With six factors this is fine. Add `limit` and `offset`, and keep `count` as the total, when the library passes about 50 factors. Needs an architecture decision on the paging parameters.
- **ETag and Cache-Control on the factor list.** The data never changes while the app runs, so clients could cache it. Not needed for the sample. Revisit when factors load from a store that can change, and decide the rule once for all read endpoints.
- **Problem+json for unknown routes.** An unknown route returns the Fastify default JSON 404. AD-7 says errors are problem+json. Add one not-found handler and one error handler in `apps/api/src/app.ts` so every module gets the same error shape. This touches all modules, so it is not part of ticket 1.1.
