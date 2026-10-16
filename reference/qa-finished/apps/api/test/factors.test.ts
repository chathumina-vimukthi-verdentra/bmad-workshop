import { describe, it, expect } from "vitest";
import { buildApp } from "../src/app.js";
import { createFactorRepository } from "../src/modules/factors/repository.js";

// Story 1.1 acceptance criteria (a) to (f) are tested here.
// Criterion (g), the web table, is checked in the browser.
// The last describe block was added by the code review (invalid filter values).

async function get(url: string) {
  const app = buildApp();
  const res = await app.inject({ method: "GET", url });
  await app.close();
  return res;
}

describe("GET /api/v1/factors", () => {
  it("(a) returns the six seeded factors ordered by label", async () => {
    const res = await get("/api/v1/factors");
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.count).toBe(6);
    expect(body.items.map((f: { label: string }) => f.label)).toEqual([
      "Diesel (road)",
      "District heat",
      "Grid electricity (UK)",
      "LPG",
      "Natural gas",
      "Petrol (road)"
    ]);
  });

  it("(b) each item has the full factor shape with the value as a string", async () => {
    const res = await get("/api/v1/factors");
    for (const item of res.json().items) {
      expect(Object.keys(item).sort()).toEqual(
        [
          "activityType",
          "id",
          "kgCo2ePerUnit",
          "label",
          "scope",
          "source",
          "unit",
          "validFrom",
          "version"
        ].sort()
      );
      expect(typeof item.kgCo2ePerUnit).toBe("string");
      expect(item.source).toBe("Workshop sample");
      expect(item.version).toBe("2026.1");
      expect(item.validFrom).toBe("2026-01-01");
    }
    const diesel = res.json().items.find((f: { activityType: string }) => f.activityType === "diesel");
    expect(diesel.id).toBe("EF-DIESEL-UK-2026.1");
    expect(diesel.kgCo2ePerUnit).toBe("2.70");
  });

  it("(c) scope=1 returns only scope 1 factors", async () => {
    const res = await get("/api/v1/factors?scope=1");
    const body = res.json();
    expect(res.statusCode).toBe(200);
    expect(body.count).toBe(4);
    expect(body.items.every((f: { scope: number }) => f.scope === 1)).toBe(true);
  });

  it("(d) activityType=diesel returns one factor", async () => {
    const res = await get("/api/v1/factors?activityType=diesel");
    const body = res.json();
    expect(body.count).toBe(1);
    expect(body.items[0].id).toBe("EF-DIESEL-UK-2026.1");
  });

  it("(e) a filter with no match returns count 0 and an empty list", async () => {
    const res = await get("/api/v1/factors?scope=2&activityType=diesel");
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ count: 0, items: [] });
  });

  it("(f) seeding twice does not duplicate factors", () => {
    const repository = createFactorRepository();
    repository.seed();
    repository.seed();
    expect(repository.findAll()).toHaveLength(6);
  });
});

describe("GET /api/v1/factors with invalid filters", () => {
  it.each(["9", "0", "abc", ""])("scope=%s returns 400 problem+json", async (value) => {
    const res = await get("/api/v1/factors?scope=" + value);
    expect(res.statusCode).toBe(400);
    expect(res.headers["content-type"]).toContain("application/problem+json");
    const body = res.json();
    expect(body.status).toBe(400);
    expect(body.title).toBe("Invalid scope");
    expect(typeof body.type).toBe("string");
    expect(body.detail).toContain("scope must be 1 or 2");
  });

  it("an unknown activityType returns 400 problem+json", async () => {
    const res = await get("/api/v1/factors?activityType=coal");
    expect(res.statusCode).toBe(400);
    expect(res.headers["content-type"]).toContain("application/problem+json");
    const body = res.json();
    expect(body.title).toBe("Invalid activity type");
    expect(body.detail).toContain("coal");
  });

  it("valid filters still work after validation was added", async () => {
    const res = await get("/api/v1/factors?scope=2&activityType=grid_electricity");
    expect(res.statusCode).toBe(200);
    expect(res.json().count).toBe(1);
  });
});
