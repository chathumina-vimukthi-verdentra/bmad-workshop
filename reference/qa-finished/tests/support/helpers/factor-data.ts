import { z } from 'zod';

// Workshop sample values, not real emission factors.
// The expected data below is copied from the capability PRD (section 4, Seed), not read from the app.

export const SAMPLE_NOTICE = 'Workshop sample values, not real emission factors.';

export const ACTIVITY_TYPES = ['diesel', 'petrol', 'natural_gas', 'lpg', 'grid_electricity', 'district_heat'] as const;

export const FactorSchema = z
  .object({
    id: z.string().regex(/^EF-[A-Z]+-UK-\d{4}\.\d+$/),
    activityType: z.enum(ACTIVITY_TYPES),
    label: z.string().min(1),
    unit: z.enum(['litre', 'kWh']),
    kgCo2ePerUnit: z.string().regex(/^\d+\.\d+$/),
    scope: z.union([z.literal(1), z.literal(2)]),
    source: z.literal('Workshop sample'),
    version: z.string().regex(/^\d{4}\.\d+$/),
    validFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  })
  .strict();

export const FactorListSchema = z
  .object({
    count: z.number().int().nonnegative(),
    items: z.array(FactorSchema),
  })
  .strict();

export interface ExpectedFactor {
  id: string;
  activityType: (typeof ACTIVITY_TYPES)[number];
  label: string;
  unit: 'litre' | 'kWh';
  kgCo2ePerUnit: string;
  scope: 1 | 2;
  source: 'Workshop sample';
  version: '2026.1';
  validFrom: '2026-01-01';
}

function seeded(
  id: string,
  activityType: ExpectedFactor['activityType'],
  label: string,
  unit: ExpectedFactor['unit'],
  kgCo2ePerUnit: string,
  scope: ExpectedFactor['scope'],
): ExpectedFactor {
  return { id, activityType, label, unit, kgCo2ePerUnit, scope, source: 'Workshop sample', version: '2026.1', validFrom: '2026-01-01' };
}

// Ordered by label ascending, as the API must return them (FAC.FR-1).
export const SEEDED_FACTORS: ExpectedFactor[] = [
  seeded('EF-DIESEL-UK-2026.1', 'diesel', 'Diesel (road)', 'litre', '2.70', 1),
  seeded('EF-DISTRICTHEAT-UK-2026.1', 'district_heat', 'District heat', 'kWh', '0.150', 2),
  seeded('EF-GRIDELEC-UK-2026.1', 'grid_electricity', 'Grid electricity (UK)', 'kWh', '0.207', 2),
  seeded('EF-LPG-UK-2026.1', 'lpg', 'LPG', 'litre', '1.56', 1),
  seeded('EF-NATURALGAS-UK-2026.1', 'natural_gas', 'Natural gas', 'kWh', '0.183', 1),
  seeded('EF-PETROL-UK-2026.1', 'petrol', 'Petrol (road)', 'litre', '2.31', 1),
];
