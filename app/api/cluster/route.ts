import {
  agents,
  clusters,
  constitution,
  contracts,
  decisions,
  evidence,
  FINAL_RULE,
  killList,
  kpis,
  MANDATE_TITLE,
  mandate,
  operationsCluster,
  PRIMARY_KPI,
  REGISTRY_REVIEWED,
  registry,
  reports,
  roadmap,
  SECONDARY_KPIS,
  watchlist,
  workflowRank,
  workflows,
} from '@/content/cluster';
import { countByStatus, roadmapProgress, validationPeriod } from '@/lib/cluster';
import { CLUSTER, PERSON, SITE_URL } from '@/lib/site';

/** Rebuilt twice a day so the validation-period clock and `generated` stay honest. */
export const revalidate = 43200;

/**
 * /api/cluster/ — the machine-readable state of the Operations cluster.
 *
 * One JSON document: mandate, registry, KPIs, workflows, evidence counts,
 * decisions, kill list, roadmap progress, reports, agents, contracts and the
 * watchlist. Built for the CEO layer's tooling and for AI agents that should
 * not scrape HTML to learn what this cluster is, owns and has decided.
 *
 * Every value here is the same value the pages render, computed by the same
 * functions. Null means not measured. Nothing is filled in.
 */
export function GET() {
  return Response.json(
    {
      $schema: `${SITE_URL}/api/cluster/`,
      generated: new Date().toISOString(),
      license: 'CC BY 4.0 — quote with attribution to Grimaldi Engineering (https://grimaldi.ca/).',
      evidenceRule:
        'A KPI without a measurement is null, never 0. Roadmap progress is counted from the evidence log. GitHub metadata is fetched, never hand-copied. Nothing here is typed in as if measured.',

      cluster: {
        ...operationsCluster,
        controlSurface: `${SITE_URL}/`,
        operator: { '@id': PERSON.personId, name: PERSON.legalName, brand: CLUSTER.operator },
        siblings: clusters.filter((c) => c.id !== operationsCluster.id).map(({ id, agent, name, command }) => ({ id, agent, name, command })),
      },

      constitution,

      mandate: { title: MANDATE_TITLE, primaryKpi: PRIMARY_KPI, secondaryKpis: SECONDARY_KPIS, sections: mandate, finalRule: FINAL_RULE },

      registry: {
        reviewed: REGISTRY_REVIEWED,
        allowedStatuses: ['CORE', 'MODULE', 'RESEARCH', 'INTERNAL', 'EXPERIMENT', 'ARCHIVE'],
        countByStatus: countByStatus(),
        entries: registry.map((r) => ({
          ...r,
          url: `${SITE_URL}/cluster/registry/${r.slug}/`,
          github: r.repo ? `https://github.com/${r.repo}` : null,
        })),
        detail: `${SITE_URL}/api/cluster/registry/`,
      },

      kpis: { detail: `${SITE_URL}/api/cluster/kpi/`, items: kpis },

      workflows: workflows.map((w) => ({ ...w, rank: workflowRank(w) })),

      evidence: {
        count: evidence.length,
        byKind: {
          conversation: evidence.filter((e) => e.kind === 'conversation').length,
          'signed-pilot': evidence.filter((e) => e.kind === 'signed-pilot').length,
          'design-partnership': evidence.filter((e) => e.kind === 'design-partnership').length,
          'paying-customer': evidence.filter((e) => e.kind === 'paying-customer').length,
        },
        validated: evidence.filter((e) => e.validation).length,
        note: 'Entries are described by industry and size; names stay out of the public index.',
      },

      roadmap: { ...roadmap, period: validationPeriod(), progress: roadmapProgress() },

      decisions,
      killList,
      reports,
      agents,
      contracts,
      watchlist,

      pages: {
        home: `${SITE_URL}/`,
        architecture: `${SITE_URL}/cluster/`,
        mandate: `${SITE_URL}/cluster/mandate/`,
        registry: `${SITE_URL}/cluster/registry/`,
        kpi: `${SITE_URL}/cluster/kpi/`,
        workflows: `${SITE_URL}/cluster/workflows/`,
        roadmap: `${SITE_URL}/cluster/roadmap/`,
        decisions: `${SITE_URL}/cluster/decisions/`,
        reports: `${SITE_URL}/cluster/reports/`,
        agents: `${SITE_URL}/cluster/agents/`,
        contracts: `${SITE_URL}/cluster/contracts/`,
        intelligence: `${SITE_URL}/cluster/intelligence/`,
        knowledge: `${SITE_URL}/api/knowledge/`,
        llms: `${SITE_URL}/llms.txt`,
      },
    },
    { headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' } },
  );
}
