/**
 * types.ts — the control engine's data contract.
 *
 * grimaldi.ca is the control and integration surface of the OPERATIONS &
 * COMMERCIAL AUTOMATION cluster (Agent 3). Everything the site displays about
 * the cluster — the repository registry, the KPI system, the decision log, the
 * kill list, the 90-day objective, the cross-cluster contracts — is typed
 * TypeScript in content/cluster/. `tsc` refuses to build a registry entry with
 * a missing field or a status outside the group constitution.
 *
 * THE EVIDENCE RULE, enforced in software rather than in discipline:
 * a KPI with no measurement is `null` and renders as "not yet measured". A
 * repository whose GitHub metadata could not be fetched shows nothing in
 * place of the metadata. No number on this site is typed by hand as if it
 * were measured. A control room that lies to its operator is worse than none.
 */

/* ── Group constitution ─────────────────────────────────────────────── */

/** Exactly three strategic clusters. No agent may create a fourth. */
export type ClusterId = 'energy' | 'physical-ai' | 'operations';

export type Cluster = {
  id: ClusterId;
  agent: string;
  name: string;
  mandate: string;
  /** The one-line command the CEO layer gives this agent. */
  command: string;
  /** Where this cluster is controlled from. Only Operations is controlled here. */
  controlSurface: string | null;
};

/**
 * Allowed repository statuses. No other status exists. The union is the
 * enforcement: a fifth-hand label like "active" or "wip" fails the typecheck.
 */
export type RepoStatus = 'CORE' | 'MODULE' | 'RESEARCH' | 'INTERNAL' | 'EXPERIMENT' | 'ARCHIVE';
export const REPO_STATUSES: readonly RepoStatus[] = ['CORE', 'MODULE', 'RESEARCH', 'INTERNAL', 'EXPERIMENT', 'ARCHIVE'];

/** The mandate's own grouping (§1): core, vertical application, related. */
export type RepoTier = 'core' | 'vertical' | 'related';

/** Where the code sits in the target architecture (§2). */
export type ArchitectureLayer =
  | 'operations-os'
  | 'field-service'
  | 'contractors'
  | 'logistics'
  | 'industrial-services'
  | 'critical-infrastructure'
  | 'commercial-website'
  | 'control-surface';

export type Maturity =
  | 'live-with-customers'
  | 'live-no-paying-customers'
  | 'pre-launch'
  | 'internal-tool'
  | 'hypothesis'
  | 'not-located';

/* ── Repository registry ────────────────────────────────────────────── */

export type RegistryEntry = {
  slug: string;
  name: string;
  /** GitHub `owner/name`, or null when no public repository has been located. */
  repo: string | null;
  /** Public production URL, if one exists and is known. */
  site: string | null;
  tier: RepoTier;
  status: RepoStatus;
  layer: ArchitectureLayer;
  maturity: Maturity;
  /** One paragraph, from the repository's own README or the mandate — never invented. */
  description: string;
  /** Stack as stated in the repository. Empty when not verified. */
  stack: string[];
  /** The business hypothesis this code exists to test. */
  hypothesis: string;
  /** Who pays, if anyone does or is meant to. */
  customer: string;
  /** Role in the cluster: proving ground, vertical experiment, platform hypothesis… */
  role: string;
  /** Repos in this registry whose functionality overlaps. Slugs. */
  duplicates: string[];
  /** What would have to be true for this repository to be promoted or archived. */
  gate: string;
  /** Security / regulatory notes relevant to a commercial operator. */
  risk: string;
  /** ISO date the registry entry was last reviewed against the repository. */
  reviewed: string;
};

/* ── KPI system ─────────────────────────────────────────────────────── */

export type KpiId =
  | 'revenue'
  | 'mrr'
  | 'arr'
  | 'pipeline'
  | 'leads'
  | 'qualified-opportunities'
  | 'conversion'
  | 'churn'
  | 'retention'
  | 'gross-margin'
  | 'time-saved'
  | 'implementation-speed'
  | 'cac'
  | 'payback-period';

export type KpiUnit = 'EUR' | 'CAD' | '%' | 'count' | 'days' | 'hours' | 'months';

export type Kpi = {
  id: KpiId;
  label: string;
  /** primary: REVENUE. secondary: the mandate's secondary KPIs. */
  rank: 'primary' | 'secondary' | 'derived';
  unit: KpiUnit;
  definition: string;
  /**
   * The measured value. Null until a real measurement exists. The UI renders
   * null as "not yet measured" — never as 0, because 0 is a measurement.
   */
  value: number | null;
  /** ISO date of the measurement. Null whenever `value` is null. */
  measuredAt: string | null;
  /** Where the number comes from when it exists (invoice ledger, CRM, Stripe…). */
  source: string;
};

/* ── Finding the money (§3) ─────────────────────────────────────────── */

export type ScoreDimension = 'pain' | 'frequency' | 'budget' | 'urgency' | 'abilityToPay' | 'repeatability';
export const SCORE_DIMENSIONS: readonly ScoreDimension[] = [
  'pain', 'frequency', 'budget', 'urgency', 'abilityToPay', 'repeatability',
];

/** 1–5 per dimension; the product is the rank. Null = no customer evidence yet. */
export type WorkflowScore = Record<ScoreDimension, number | null>;

export type Workflow = {
  id: string;
  name: string;
  /** Where the money leaks in this workflow, as a hypothesis to test in interviews. */
  leak: string;
  score: WorkflowScore;
  /** Count of customer conversations that mentioned this workflow. Derived from evidence. */
  evidenceRefs: string[];
};

/* ── Customer evidence (§9) ─────────────────────────────────────────── */

export type EvidenceKind = 'conversation' | 'signed-pilot' | 'design-partnership' | 'paying-customer';

export type Evidence = {
  id: string;
  date: string;
  kind: EvidenceKind;
  vertical: string;
  industry: string;
  companySize: string;
  currentSoftware: string;
  workflows: string[];
  pain: string;
  /** What the pain costs them, in their words. Null when they did not say. */
  cost: string | null;
  decisionMaker: string;
  budget: string | null;
  urgency: 'now' | 'this-quarter' | 'this-year' | 'none' | 'unknown';
  competitorsMentioned: string[];
  willingnessToPay: string | null;
  /** Compliments are not validation. Only money, a signed pilot or a committed design partnership count. */
  validation: boolean;
};

/* ── Decision log and kill list (constitution) ──────────────────────── */

export type DecisionStatus = 'proposed' | 'accepted' | 'superseded' | 'reversed';

export type Decision = {
  id: string;
  date: string;
  title: string;
  status: DecisionStatus;
  context: string;
  decision: string;
  consequences: string;
  /** The constitution requires CEO approval for cluster moves and new projects. */
  requiresCeoApproval: boolean;
  approvedBy: string | null;
};

export type KillEntry = {
  id: string;
  date: string;
  what: string;
  /** Which of the constitution's criteria it failed. */
  failed: string[];
  /** 'frozen' can be revived by evidence; 'killed' cannot; 'archived' is a repository status. */
  outcome: 'frozen' | 'killed' | 'archived';
  reason: string;
};

/* ── Roadmap: the 90-day objective (§16) ────────────────────────────── */

export type Objective = {
  id: string;
  label: string;
  target: number;
  /** Which evidence kinds count toward this objective. */
  counts: EvidenceKind[];
};

export type Roadmap = {
  /** ISO date the 90-day clock started. */
  start: string;
  /** ISO date the clock ends: validation period over, kill rule applies. */
  end: string;
  objectives: Objective[];
  ifMissed: string;
};

/* ── Weekly CEO report (§15) ────────────────────────────────────────── */

export type WeeklyReport = {
  /** ISO week, e.g. 2026-W37. */
  week: string;
  filed: string;
  revenue: number | null;
  mrr: number | null;
  arr: number | null;
  pipeline: number | null;
  leads: number | null;
  qualifiedOpportunities: number | null;
  conversion: number | null;
  churn: number | null;
  retention: number | null;
  grossMargin: number | null;
  customerRequests: string[];
  topWorkflow: string | null;
  topFailure: string | null;
  competitiveChange: string | null;
  featuresKilled: string[];
  customersWon: string[];
  customersLost: string[];
  next7Days: string[];
};

/* ── Web intelligence (§8) ──────────────────────────────────────────── */

export type WatchItem = {
  id: string;
  name: string;
  kind: 'competitor' | 'category' | 'community' | 'signal';
  url: string | null;
  why: string;
  /** ISO date of the last review. Null = never reviewed; the site says so. */
  lastReviewed: string | null;
  /** What changed, why it matters, which product it affects, what to build/not build, whom to call. */
  findings: string[];
};

/* ── Cross-cluster integration contracts (§13, §14) ─────────────────── */

export type ContractStatus = 'proposed' | 'draft' | 'versioned' | 'deprecated';

export type Contract = {
  id: string;
  name: string;
  version: string;
  status: ContractStatus;
  producer: ClusterId;
  consumer: ClusterId;
  /** The event or API this contract describes. */
  summary: string;
  /** Field-level shape, as documentation. Rendered verbatim. */
  schema: { field: string; type: string; meaning: string }[];
  /** None of the systems may require another to function. */
  independence: string;
};

/* ── Agentic workflows (§7) ─────────────────────────────────────────── */

export type AgentSpec = {
  id: string;
  name: string;
  steps: string[];
  /** Explicit permissions. Nothing autonomous and financial or customer-facing. */
  may: string[];
  mayNot: string[];
  approval: string;
  status: 'specified' | 'building' | 'piloting' | 'frozen';
};
