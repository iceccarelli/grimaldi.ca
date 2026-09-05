/**
 * cluster-api.ts — the read-only API surface of the control room, in one place.
 *
 * Every per-resource endpoint, the OpenAPI description, the RFC 9727 API
 * catalog and the llms.txt index are generated from this table, so an
 * endpoint cannot exist without being documented and cannot be documented
 * without existing.
 */

import {
  agents,
  clusters,
  constitution,
  contracts,
  decisions,
  evidence,
  FINAL_RULE,
  killList,
  LOOP,
  MANDATE_ROLE,
  MANDATE_TITLE,
  mandate,
  PRIMARY_KPI,
  reports,
  roadmap,
  SECONDARY_KPIS,
  watchlist,
  workflowRank,
  workflows,
} from '@/content/cluster';
import { roadmapProgress, validationPeriod } from '@/lib/cluster';
import { SITE_URL } from '@/lib/site';

export const API_HEADERS = { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' } as const;

export type ResourceId =
  | 'mandate'
  | 'constitution'
  | 'clusters'
  | 'decisions'
  | 'kill-list'
  | 'roadmap'
  | 'evidence'
  | 'workflows'
  | 'reports'
  | 'agents'
  | 'contracts'
  | 'watchlist';

export type Resource = {
  id: ResourceId;
  summary: string;
  /** Name of the JSON Schema definition for one item, when the payload is a list of records. */
  item: string | null;
  payload: () => unknown;
};

export const resources: Resource[] = [
  {
    id: 'mandate',
    summary: "Agent 3's operating mandate: sixteen sections, the primary and secondary KPIs, the final rule.",
    item: null,
    payload: () => ({ title: MANDATE_TITLE, role: MANDATE_ROLE, primaryKpi: PRIMARY_KPI, secondaryKpis: SECONDARY_KPIS, sections: mandate, finalRule: FINAL_RULE, loop: LOOP }),
  },
  {
    id: 'constitution',
    summary: 'The group constitution all three cluster agents obey.',
    item: null,
    payload: () => constitution,
  },
  {
    id: 'clusters',
    summary: 'The three strategic clusters and which one this site controls.',
    item: 'Cluster',
    payload: () => clusters,
  },
  {
    id: 'decisions',
    summary: 'The decision log, ADR style, newest first.',
    item: 'Decision',
    payload: () => [...decisions].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)),
  },
  {
    id: 'kill-list',
    summary: 'What has been frozen, killed or archived, and which constitutional criteria it failed.',
    item: 'KillEntry',
    payload: () => killList,
  },
  {
    id: 'roadmap',
    summary: 'The 90-day objective with progress counted from the evidence log and the validation-period clock.',
    item: null,
    payload: () => ({ ...roadmap, period: validationPeriod(), progress: roadmapProgress() }),
  },
  {
    id: 'evidence',
    summary: 'The customer evidence log — conversations, pilots, partnerships, customers — by industry and size, never by name.',
    item: 'Evidence',
    payload: () => evidence,
  },
  {
    id: 'workflows',
    summary: 'Fifteen money-losing workflows with six-dimension scores and the computed rank.',
    item: 'Workflow',
    payload: () => workflows.map((w) => ({ ...w, rank: workflowRank(w) })),
  },
  {
    id: 'reports',
    summary: 'Weekly CEO reports in the eighteen mandated fields.',
    item: 'WeeklyReport',
    payload: () => [...reports].sort((a, b) => b.week.localeCompare(a.week)),
  },
  {
    id: 'agents',
    summary: 'Agentic workflow specifications: steps, permissions, prohibitions, approval step.',
    item: 'AgentSpec',
    payload: () => agents,
  },
  {
    id: 'contracts',
    summary: 'Versioned cross-cluster integration contracts with field-level schemas.',
    item: 'Contract',
    payload: () => contracts,
  },
  {
    id: 'watchlist',
    summary: 'The web-intelligence watchlist and the findings of each review.',
    item: 'WatchItem',
    payload: () => watchlist,
  },
];

export const resourceById = (id: string): Resource | undefined => resources.find((r) => r.id === id);

/** Every read-only endpoint the site exposes, for the OpenAPI document and the API catalog. */
export const ENDPOINTS = [
  { path: '/api/cluster/', summary: 'Full cluster state in one document.', schema: 'ClusterIndex' },
  { path: '/api/cluster/registry/', summary: 'Repository registry with live GitHub metadata.', schema: 'RegistryResponse' },
  { path: '/api/cluster/registry/{slug}/', summary: 'One registry entry with live GitHub metadata and 52-week commit activity.', schema: 'RegistryEntryResponse' },
  { path: '/api/cluster/kpi/', summary: 'The KPI system. Null means not yet measured.', schema: 'KpiResponse' },
  ...resources.map((r) => ({ path: `/api/cluster/${r.id}/`, summary: r.summary, schema: r.item ? `${r.item}List` : 'object' })),
  { path: '/api/cluster/schema/', summary: 'JSON Schema (draft 2020-12) for every record type.', schema: 'object' },
  { path: '/api/cluster/feed.xml', summary: 'Atom feed of decisions, kill-list entries and weekly reports.', schema: 'atom' },
  { path: '/api/knowledge/', summary: 'The operator: entity, disambiguation, expertise, works, topics.', schema: 'object' },
] as const;

export const absolute = (p: string) => `${SITE_URL}${p}`;
