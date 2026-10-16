---
applyTo: "apps/api/src/modules/factors/**"
---
# factors module. Owner: squad-a.

- The only writer of factors (AD-2). Nothing writes factors over HTTP.
- Factors are immutable and versioned (AD-3). Ids are fixed so seeding twice changes nothing.
- `kgCo2ePerUnit` is a decimal string, never a number (AD-4).
- Other modules use only the service interface (AD-1). The factors module depends on no other module.
- Endpoints are under `/api/v1/factors` and errors are problem+json (AD-7).
