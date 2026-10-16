import type { Factor } from "./types.js";

function factor(
  id: string,
  activityType: Factor["activityType"],
  label: string,
  unit: Factor["unit"],
  kgCo2ePerUnit: string,
  scope: Factor["scope"]
): Factor {
  return {
    id,
    activityType,
    label,
    unit,
    kgCo2ePerUnit,
    scope,
    source: "Workshop sample",
    version: "2026.1",
    validFrom: "2026-01-01"
  };
}

// Workshop sample values, not real emission factors.
const SEED: Factor[] = [
  factor("EF-DIESEL-UK-2026.1", "diesel", "Diesel (road)", "litre", "2.70", 1),
  factor("EF-PETROL-UK-2026.1", "petrol", "Petrol (road)", "litre", "2.31", 1),
  factor("EF-NATURALGAS-UK-2026.1", "natural_gas", "Natural gas", "kWh", "0.183", 1),
  factor("EF-LPG-UK-2026.1", "lpg", "LPG", "litre", "1.56", 1),
  factor("EF-GRIDELEC-UK-2026.1", "grid_electricity", "Grid electricity (UK)", "kWh", "0.207", 2),
  factor("EF-DISTRICTHEAT-UK-2026.1", "district_heat", "District heat", "kWh", "0.150", 2)
];

export interface FactorRepository {
  seed(): void;
  findAll(): Factor[];
}

export function createFactorRepository(): FactorRepository {
  const byId = new Map<string, Factor>();

  return {
    // Idempotent: the seed uses fixed ids, so running it twice changes nothing.
    seed() {
      for (const f of SEED) {
        if (!byId.has(f.id)) byId.set(f.id, { ...f });
      }
    },
    findAll() {
      return Array.from(byId.values()).map((f) => ({ ...f }));
    }
  };
}
