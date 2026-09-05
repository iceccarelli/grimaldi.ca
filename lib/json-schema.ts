/**
 * json-schema.ts — JSON Schema (draft 2020-12) for every record the API serves.
 *
 * Hand-maintained beside content/cluster/types.ts, and held to it by the
 * typechecker: every enum array below is declared against its TypeScript
 * union with an exhaustiveness check, so adding a status, tier or kind to
 * types.ts without adding it here fails `tsc`.
 */

import {
  REPO_STATUSES,
  SCORE_DIMENSIONS,
  type AgentSpec,
  type ArchitectureLayer,
  type ClusterId,
  type Contract,
  type Decision,
  type Evidence,
  type KillEntry,
  type Kpi,
  type Maturity,
  type RepoTier,
} from '@/content/cluster';
import { SITE_URL } from '@/lib/site';

/** Compile-time exhaustiveness: `Exhaustive<Union, typeof ARRAY>` is `true` only when the array names every member. */
type Exhaustive<U extends string, A extends readonly string[]> = Exclude<U, A[number]> extends never ? true : never;

export const TIERS = ['core', 'vertical', 'related'] as const satisfies readonly RepoTier[];
export const LAYERS = ['operations-os', 'field-service', 'contractors', 'logistics', 'industrial-services', 'critical-infrastructure', 'commercial-website', 'control-surface'] as const satisfies readonly ArchitectureLayer[];
export const MATURITIES = ['live-with-customers', 'live-no-paying-customers', 'pre-launch', 'internal-tool', 'hypothesis', 'not-located'] as const satisfies readonly Maturity[];
export const EVIDENCE_KINDS = ['conversation', 'signed-pilot', 'design-partnership', 'paying-customer'] as const satisfies readonly Evidence['kind'][];
export const URGENCIES = ['now', 'this-quarter', 'this-year', 'none', 'unknown'] as const satisfies readonly Evidence['urgency'][];
export const DECISION_STATUSES = ['proposed', 'accepted', 'superseded', 'reversed'] as const satisfies readonly Decision['status'][];
export const KILL_OUTCOMES = ['frozen', 'killed', 'archived'] as const satisfies readonly KillEntry['outcome'][];
export const CONTRACT_STATUSES = ['proposed', 'draft', 'versioned', 'deprecated'] as const satisfies readonly Contract['status'][];
export const AGENT_STATUSES = ['specified', 'building', 'piloting', 'frozen'] as const satisfies readonly AgentSpec['status'][];
export const CLUSTER_IDS = ['energy', 'physical-ai', 'operations'] as const satisfies readonly ClusterId[];
export const KPI_UNITS = ['EUR', 'CAD', '%', 'count', 'days', 'hours', 'months'] as const satisfies readonly Kpi['unit'][];
export const KPI_RANKS = ['primary', 'secondary', 'derived'] as const satisfies readonly Kpi['rank'][];

// If any of these lines stops typechecking, a union in content/cluster/types.ts gained a member the schema does not list.
const _tiers: Exhaustive<RepoTier, typeof TIERS> = true;
const _layers: Exhaustive<ArchitectureLayer, typeof LAYERS> = true;
const _maturities: Exhaustive<Maturity, typeof MATURITIES> = true;
const _kinds: Exhaustive<Evidence['kind'], typeof EVIDENCE_KINDS> = true;
const _urgencies: Exhaustive<Evidence['urgency'], typeof URGENCIES> = true;
const _dstatus: Exhaustive<Decision['status'], typeof DECISION_STATUSES> = true;
const _kill: Exhaustive<KillEntry['outcome'], typeof KILL_OUTCOMES> = true;
const _cstatus: Exhaustive<Contract['status'], typeof CONTRACT_STATUSES> = true;
const _astatus: Exhaustive<AgentSpec['status'], typeof AGENT_STATUSES> = true;
const _cid: Exhaustive<ClusterId, typeof CLUSTER_IDS> = true;
const _units: Exhaustive<Kpi['unit'], typeof KPI_UNITS> = true;
const _ranks: Exhaustive<Kpi['rank'], typeof KPI_RANKS> = true;
void [_tiers, _layers, _maturities, _kinds, _urgencies, _dstatus, _kill, _cstatus, _astatus, _cid, _units, _ranks];

const str = { type: 'string' } as const;
const nstr = { type: ['string', 'null'] } as const;
const nnum = { type: ['number', 'null'] } as const;
const date = { type: 'string', format: 'date' } as const;
const strList = { type: 'array', items: str } as const;
const list = (ref: string) => ({ type: 'array', items: { $ref: `#/$defs/${ref}` } });

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: `${SITE_URL}/api/cluster/schema/`,
  title: 'Operations & Commercial Automation cluster — record types',
  description:
    'Every record served by the grimaldi.ca cluster API. Null on a KPI value means not yet measured — it is never zero. Mirrors content/cluster/types.ts in the public repository.',
  $defs: {
    RepoStatus: { type: 'string', enum: REPO_STATUSES, description: 'The six constitutional statuses. No other status exists.' },
    ClusterId: { type: 'string', enum: CLUSTER_IDS },
    Cluster: {
      type: 'object',
      required: ['id', 'agent', 'name', 'mandate', 'command', 'controlSurface'],
      properties: { id: { $ref: '#/$defs/ClusterId' }, agent: str, name: str, mandate: str, command: str, controlSurface: nstr },
    },
    RegistryEntry: {
      type: 'object',
      required: ['slug', 'name', 'repo', 'site', 'tier', 'status', 'layer', 'maturity', 'description', 'stack', 'hypothesis', 'customer', 'role', 'duplicates', 'gate', 'risk', 'reviewed'],
      properties: {
        slug: str,
        name: str,
        repo: { ...nstr, description: 'GitHub owner/name, or null when no public repository has been located.' },
        site: nstr,
        tier: { type: 'string', enum: TIERS },
        status: { $ref: '#/$defs/RepoStatus' },
        layer: { type: 'string', enum: LAYERS },
        maturity: { type: 'string', enum: MATURITIES },
        description: str,
        stack: strList,
        hypothesis: str,
        customer: str,
        role: str,
        duplicates: strList,
        gate: str,
        risk: str,
        reviewed: date,
        url: { type: 'string', format: 'uri' },
        github: { anyOf: [{ $ref: '#/$defs/RepoMeta' }, { type: 'null' }] },
        activity: { anyOf: [{ $ref: '#/$defs/CommitActivity' }, { type: 'null' }] },
      },
    },
    RepoMeta: {
      type: 'object',
      description: 'Live GitHub metadata. enriched=false means the API could not be reached; the other fields are then null, never stale.',
      required: ['fullName', 'url', 'description', 'language', 'topics', 'updated', 'stars', 'openIssues', 'license', 'archived', 'enriched'],
      properties: { fullName: str, url: { type: 'string', format: 'uri' }, description: nstr, language: nstr, topics: strList, updated: nstr, stars: nnum, openIssues: nnum, license: nstr, archived: { type: ['boolean', 'null'] }, enriched: { type: 'boolean' } },
    },
    CommitActivity: {
      type: 'object',
      required: ['fullName', 'weeks', 'total', 'latestWeek'],
      properties: { fullName: str, weeks: { type: 'array', items: { type: 'integer', minimum: 0 }, maxItems: 52 }, total: { type: 'integer' }, latestWeek: date },
    },
    Kpi: {
      type: 'object',
      required: ['id', 'label', 'rank', 'unit', 'definition', 'value', 'measuredAt', 'source'],
      properties: {
        id: str,
        label: str,
        rank: { type: 'string', enum: KPI_RANKS },
        unit: { type: 'string', enum: KPI_UNITS },
        definition: str,
        value: { ...nnum, description: 'Null until measured. Never zero by default.' },
        measuredAt: { anyOf: [date, { type: 'null' }] },
        source: str,
      },
    },
    WorkflowScore: { type: 'object', properties: Object.fromEntries(SCORE_DIMENSIONS.map((d) => [d, { type: ['integer', 'null'], minimum: 1, maximum: 5 }])), required: SCORE_DIMENSIONS },
    Workflow: {
      type: 'object',
      required: ['id', 'name', 'leak', 'score', 'evidenceRefs'],
      properties: { id: str, name: str, leak: str, score: { $ref: '#/$defs/WorkflowScore' }, evidenceRefs: strList, rank: { ...nnum, description: 'Product of the six dimensions; null while any is unscored.' } },
    },
    Evidence: {
      type: 'object',
      required: ['id', 'date', 'kind', 'vertical', 'industry', 'companySize', 'currentSoftware', 'workflows', 'pain', 'cost', 'decisionMaker', 'budget', 'urgency', 'competitorsMentioned', 'willingnessToPay', 'validation'],
      properties: {
        id: str, date, kind: { type: 'string', enum: EVIDENCE_KINDS }, vertical: str, industry: str, companySize: str, currentSoftware: str,
        workflows: strList, pain: str, cost: nstr, decisionMaker: str, budget: nstr, urgency: { type: 'string', enum: URGENCIES },
        competitorsMentioned: strList, willingnessToPay: nstr,
        validation: { type: 'boolean', description: 'True only for money, a signed pilot or a committed design partnership. Compliments are not validation.' },
      },
    },
    Decision: {
      type: 'object',
      required: ['id', 'date', 'title', 'status', 'context', 'decision', 'consequences', 'requiresCeoApproval', 'approvedBy'],
      properties: { id: { type: 'string', pattern: '^D-\\d{3}$' }, date, title: str, status: { type: 'string', enum: DECISION_STATUSES }, context: str, decision: str, consequences: str, requiresCeoApproval: { type: 'boolean' }, approvedBy: nstr },
    },
    KillEntry: {
      type: 'object',
      required: ['id', 'date', 'what', 'failed', 'outcome', 'reason'],
      properties: { id: str, date, what: str, failed: strList, outcome: { type: 'string', enum: KILL_OUTCOMES }, reason: str },
    },
    Objective: { type: 'object', required: ['id', 'label', 'target', 'counts'], properties: { id: str, label: str, target: { type: 'integer' }, counts: { type: 'array', items: { type: 'string', enum: EVIDENCE_KINDS } }, current: { type: 'integer' }, pct: { type: 'integer' } } },
    Roadmap: { type: 'object', required: ['start', 'end', 'objectives', 'ifMissed'], properties: { start: date, end: date, objectives: list('Objective'), ifMissed: str, period: { type: 'object', properties: { total: { type: 'integer' }, elapsed: { type: 'integer' }, remaining: { type: 'integer' }, over: { type: 'boolean' } } }, progress: list('Objective') } },
    WeeklyReport: {
      type: 'object',
      required: ['week', 'filed', 'revenue', 'mrr', 'arr', 'pipeline', 'leads', 'qualifiedOpportunities', 'conversion', 'churn', 'retention', 'grossMargin', 'customerRequests', 'topWorkflow', 'topFailure', 'competitiveChange', 'featuresKilled', 'customersWon', 'customersLost', 'next7Days'],
      properties: {
        week: { type: 'string', pattern: '^\\d{4}-W\\d{2}$' }, filed: date,
        revenue: nnum, mrr: nnum, arr: nnum, pipeline: nnum, leads: nnum, qualifiedOpportunities: nnum, conversion: nnum, churn: nnum, retention: nnum, grossMargin: nnum,
        customerRequests: strList, topWorkflow: nstr, topFailure: nstr, competitiveChange: nstr, featuresKilled: strList, customersWon: strList, customersLost: strList, next7Days: strList,
      },
    },
    WatchItem: {
      type: 'object',
      required: ['id', 'name', 'kind', 'url', 'why', 'lastReviewed', 'findings'],
      properties: { id: str, name: str, kind: { type: 'string', enum: ['competitor', 'category', 'community', 'signal'] }, url: nstr, why: str, lastReviewed: { anyOf: [date, { type: 'null' }] }, findings: strList },
    },
    ContractField: { type: 'object', required: ['field', 'type', 'meaning'], properties: { field: str, type: str, meaning: str } },
    Contract: {
      type: 'object',
      required: ['id', 'name', 'version', 'status', 'producer', 'consumer', 'summary', 'schema', 'independence'],
      properties: { id: str, name: str, version: { type: 'string', pattern: '^\\d+\\.\\d+\\.\\d+$' }, status: { type: 'string', enum: CONTRACT_STATUSES }, producer: { $ref: '#/$defs/ClusterId' }, consumer: { $ref: '#/$defs/ClusterId' }, summary: str, schema: list('ContractField'), independence: str },
    },
    AgentSpec: {
      type: 'object',
      required: ['id', 'name', 'steps', 'may', 'mayNot', 'approval', 'status'],
      properties: { id: str, name: str, steps: strList, may: strList, mayNot: strList, approval: str, status: { type: 'string', enum: AGENT_STATUSES } },
    },
    ClusterList: list('Cluster'),
    DecisionList: list('Decision'),
    KillEntryList: list('KillEntry'),
    EvidenceList: list('Evidence'),
    WorkflowList: list('Workflow'),
    WeeklyReportList: list('WeeklyReport'),
    AgentSpecList: list('AgentSpec'),
    ContractList: list('Contract'),
    WatchItemList: list('WatchItem'),
    ResourceEnvelope: {
      type: 'object',
      description: 'Envelope of every /api/cluster/{resource}/ response.',
      required: ['$schema', 'resource', 'summary', 'generated', 'data'],
      properties: { $schema: { type: 'string', format: 'uri' }, resource: str, summary: str, generated: { type: 'string', format: 'date-time' }, data: {} },
    },
    RegistryResponse: { type: 'object', required: ['generated', 'reviewed', 'countByStatus', 'entries'], properties: { $schema: str, generated: { type: 'string', format: 'date-time' }, reviewed: date, countByStatus: { type: 'object', additionalProperties: { type: 'integer' } }, entries: list('RegistryEntry') } },
    RegistryEntryResponse: { type: 'object', required: ['generated', 'entry'], properties: { $schema: str, generated: { type: 'string', format: 'date-time' }, entry: { $ref: '#/$defs/RegistryEntry' } } },
    KpiResponse: { type: 'object', required: ['generated', 'currency', 'measured', 'total', 'rule', 'items'], properties: { $schema: str, generated: { type: 'string', format: 'date-time' }, currency: str, measured: { type: 'integer' }, total: { type: 'integer' }, rule: str, items: list('Kpi') } },
    ClusterIndex: {
      type: 'object',
      description: 'The full state served at /api/cluster/. Fields mirror the per-resource endpoints.',
      required: ['generated', 'cluster', 'constitution', 'mandate', 'registry', 'kpis', 'workflows', 'evidence', 'roadmap', 'decisions', 'killList', 'reports', 'agents', 'contracts', 'watchlist', 'pages'],
      properties: {
        generated: { type: 'string', format: 'date-time' }, evidenceRule: str, cluster: { type: 'object' }, constitution: { type: 'object' }, mandate: { type: 'object' },
        registry: { type: 'object' }, kpis: { type: 'object' }, workflows: list('Workflow'), evidence: { type: 'object' }, roadmap: { $ref: '#/$defs/Roadmap' },
        decisions: list('Decision'), killList: list('KillEntry'), reports: list('WeeklyReport'), agents: list('AgentSpec'), contracts: list('Contract'), watchlist: list('WatchItem'), pages: { type: 'object' },
      },
    },
  },
} as const;
