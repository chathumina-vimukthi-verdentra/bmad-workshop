# Carbon Hub Lite build rules

Workshop sample values, not real emission factors.

This is the product track: planning only. Write the capability PRD, the UX, the epic and the tickets for
the active initiative and stop. Do not write build plans or code here. The build rules below are context
that the PRD, the UX and the tickets must respect, not work to do.

- AD-1: Modules depend one way: footprint -> activities -> factors. No cycles. A module is reached
  only through its service interface. `modules.yaml` `may_call` lists the allowed dependencies.
- AD-2: One writer per aggregate. Only `factors` writes factors. Only `activities` writes activities.
  `footprint` stores nothing.
- AD-3: Factors are immutable and versioned. A new value is a new factor with a new id.
- AD-4: Decimal strings only. Quantities and factors travel and are stored as strings. Arithmetic uses
  decimal.js. No floats. Rounding happens only in the footprint calculation.
- AD-6: An activity pins its factor id at creation. Never look up "latest".
- AD-7: Routes are under `/api/v1`. Errors are problem+json with `type`, `title`, `status`, `detail`.
  Lists are `{count, items}`.
- AD-8 to AD-10: module layout `apps/api/src/modules/<slug>/` with `routes.ts`, `service.ts`,
  `repository.ts`, `types.ts`; the fixed stack; tests with `fastify.inject`, and a ticket is done only
  when each acceptance criterion has a passing test. Full rules:
  `_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`.
- The web app formats numbers for display only. It never calculates.
- One story per pull request. Stay inside the story's module paths.
- Do not update the BMad skills during the workshop. Never run `npx skills update`.
