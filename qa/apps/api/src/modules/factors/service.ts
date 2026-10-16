import type { Factor, FactorFilter } from "./types.js";
import type { FactorRepository } from "./repository.js";

export interface FactorService {
  list(filter?: FactorFilter): Factor[];
}

export function createFactorService(repository: FactorRepository): FactorService {
  return {
    list(filter = {}) {
      return repository
        .findAll()
        .filter((f) => filter.scope === undefined || f.scope === filter.scope)
        .filter((f) => filter.activityType === undefined || f.activityType === filter.activityType)
        .sort((a, b) => a.label.localeCompare(b.label, "en"));
    }
  };
}
