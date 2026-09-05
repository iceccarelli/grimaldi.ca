/**
 * cluster.ts — derived state of the Operations cluster.
 *
 * Nothing in content/cluster/ stores a computed value. This module computes
 * them — roadmap progress from the evidence log, registry counts by status,
 * the validation-period clock — so that a page and the API can never disagree,
 * and so that a number that is not in the evidence cannot appear on a page.
 */

import {
  countKind,
  evidence,
  kpis,
  qualifiedOpportunities,
  registry,
  roadmap,
  REPO_STATUSES,
  type Evidence,
  type Kpi,
  type Objective,
  type RegistryEntry,
  type RepoStatus,
} from '@/content/cluster';

/* ── Roadmap ────────────────────────────────────────────────────────── */

export type ObjectiveProgress = Objective & { current: number; pct: number };

export function objectiveProgress(o: Objective): ObjectiveProgress {
  const current =
    o.id === 'qualified'
      ? qualifiedOpportunities().length
      : o.counts.reduce((n, kind) => n + countKind(kind), 0);
  return { ...o, current, pct: Math.min(100, Math.round((current / o.target) * 100)) };
}

export const roadmapProgress = (): ObjectiveProgress[] => roadmap.objectives.map(objectiveProgress);

/** Days remaining in the validation period as of `today` (ISO date). Negative when over. */
export function daysRemaining(today = new Date().toISOString().slice(0, 10)): number {
  const ms = new Date(roadmap.end).getTime() - new Date(today).getTime();
  return Math.ceil(ms / 86_400_000);
}

export function validationPeriod(today = new Date().toISOString().slice(0, 10)) {
  const total = Math.round((new Date(roadmap.end).getTime() - new Date(roadmap.start).getTime()) / 86_400_000);
  const elapsed = Math.max(0, Math.min(total, total - daysRemaining(today)));
  return { total, elapsed, remaining: Math.max(0, daysRemaining(today)), over: daysRemaining(today) < 0 };
}

/* ── Registry ───────────────────────────────────────────────────────── */

export function countByStatus(): Record<RepoStatus, number> {
  const out = Object.fromEntries(REPO_STATUSES.map((s) => [s, 0])) as Record<RepoStatus, number>;
  for (const r of registry) out[r.status] += 1;
  return out;
}

export const located = (): RegistryEntry[] => registry.filter((r) => r.repo !== null);
export const unlocated = (): RegistryEntry[] => registry.filter((r) => r.repo === null && r.maturity === 'not-located');

/* ── KPIs ───────────────────────────────────────────────────────────── */

export const primaryKpi = (): Kpi => kpis.find((k) => k.rank === 'primary')!;
export const measuredKpis = (): Kpi[] => kpis.filter((k) => k.value !== null);

export function formatKpi(k: Kpi): string {
  if (k.value === null) return 'not yet measured';
  switch (k.unit) {
    case 'EUR':
      return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(k.value);
    case 'CAD':
      return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(k.value);
    case '%':
      return `${k.value.toFixed(1)} %`;
    case 'count':
      return String(k.value);
    default:
      return `${k.value} ${k.unit}`;
  }
}

/* ── Evidence ───────────────────────────────────────────────────────── */

export const evidenceByVertical = (): Record<string, Evidence[]> =>
  evidence.reduce<Record<string, Evidence[]>>((acc, e) => {
    (acc[e.vertical] ??= []).push(e);
    return acc;
  }, {});

/* ── Labels ─────────────────────────────────────────────────────────── */

export const MATURITY_LABEL: Record<RegistryEntry['maturity'], string> = {
  'live-with-customers': 'Live · paying customers',
  'live-no-paying-customers': 'Live · no paying software customer',
  'pre-launch': 'Pre-launch',
  'internal-tool': 'Internal tool',
  hypothesis: 'Hypothesis · no code',
  'not-located': 'Not located in inventory',
};

export const LAYER_LABEL: Record<RegistryEntry['layer'], string> = {
  'operations-os': 'Operations OS',
  'field-service': 'Field service',
  contractors: 'Contractors',
  logistics: 'Logistics',
  'industrial-services': 'Industrial services',
  'critical-infrastructure': 'Critical infrastructure',
  'commercial-website': 'Commercial website',
  'control-surface': 'Control surface',
};

export const TIER_LABEL: Record<RegistryEntry['tier'], string> = {
  core: 'Core',
  vertical: 'Vertical application',
  related: 'Related',
};
