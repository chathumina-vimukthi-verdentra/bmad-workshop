export const ACTIVITY_TYPES = [
  "diesel",
  "petrol",
  "natural_gas",
  "lpg",
  "grid_electricity",
  "district_heat"
] as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export type Unit = "litre" | "kWh";

export type Scope = 1 | 2;

export interface Factor {
  id: string;
  activityType: ActivityType;
  label: string;
  unit: Unit;
  kgCo2ePerUnit: string;
  scope: Scope;
  source: string;
  version: string;
  validFrom: string;
}

export interface FactorFilter {
  scope?: number;
  activityType?: string;
}
