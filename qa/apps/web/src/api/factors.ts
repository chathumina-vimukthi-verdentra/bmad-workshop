export interface Factor {
  id: string;
  activityType: string;
  label: string;
  unit: string;
  kgCo2ePerUnit: string;
  scope: 1 | 2;
  source: string;
  version: string;
  validFrom: string;
}

export interface FactorList {
  count: number;
  items: Factor[];
}

export async function fetchFactors(): Promise<FactorList> {
  const res = await fetch("/api/v1/factors");
  if (!res.ok) {
    throw new Error(`Could not load factors (status ${res.status})`);
  }
  return (await res.json()) as FactorList;
}
