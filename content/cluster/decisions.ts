/**
 * decisions.ts — the decision log and the kill list.
 *
 * Architecture-decision-record style: context, decision, consequences. A
 * decision that moves a repository between clusters or starts a project
 * requires CEO approval and says so. Superseded decisions stay in the log with
 * status 'superseded' — the log is append-only in spirit.
 *
 * The kill list is separate because killing is the mandate's most important
 * verb. An empty kill list after the validation period is itself a finding.
 */

import type { Decision, KillEntry } from './types';

export const decisions: Decision[] = [
  {
    id: 'D-001',
    date: '2026-09-05',
    title: 'grimaldi.ca becomes the control and integration surface of the Operations cluster',
    status: 'accepted',
    context:
      'Three strategic clusters, each owned by one agent. Agent 3 (Operations & Commercial Automation) had repositories, live sites and a mandate but no single place where registry, KPIs, decisions and cross-cluster contracts were visible together.',
    decision:
      'grimaldi.ca displays and orchestrates the Operations cluster: repository registry, KPI system, workflow ranking, evidence-counted roadmap, decision log, kill list, weekly CEO report, web-intelligence watchlist and versioned integration contracts, all typed content with a machine-readable index at /api/cluster/. The operator’s existing explainers and manuscripts remain on the site under /topics/ and /books/; the person moves to /about/.',
    consequences:
      'The site sells nothing itself. Every displayed number is either measured and sourced or shown as not yet measured. The site’s Person @id stays network-wide and unchanged.',
    requiresCeoApproval: true,
    approvedBy: 'Vincenzo Ceccarelli Grimaldi (CEO layer)',
  },
  {
    id: 'D-002',
    date: '2026-09-05',
    title: 'Initial repository statuses assigned from the live inventory',
    status: 'accepted',
    context:
      'The constitution allows exactly six statuses. A live inventory of the public GitHub account was taken on 2026-09-05; five repositories the mandate names were located, two (Runway Fuel, LogistiSync) were not.',
    decision:
      'ecowoods-app → CORE (proving ground). floorforge-ai, paintforge-ai, dryforge-ai → EXPERIMENT. bahn-project-manager → INTERNAL. Runway Fuel → INTERNAL (hypothesis, no code). Unlocated and capability-only names → INTERNAL with maturity not-located / hypothesis. grimaldi.ca → INTERNAL (control surface). No entry is ARCHIVE yet.',
    consequences: 'Any status change from here is a new decision. Unlocated names must be resolved or archived within the first review cycle.',
    requiresCeoApproval: false,
    approvedBy: null,
  },
  {
    id: 'D-003',
    date: '2026-09-05',
    title: 'Runway Fuel stays a hypothesis; no platform code is written',
    status: 'accepted',
    context: '§6 of the mandate. Generic SaaS infrastructure without a customer-driven reason is forbidden.',
    decision:
      'No identity, organization, permission, workflow-engine or billing primitive is built as shared code until two independent paying customers require the same workflow. Until then, workflow code lives in the vertical that needs it.',
    consequences: 'Some duplication between ecowoods-app and any second vertical is accepted deliberately. The registry records the duplicates so extraction can be evidence-driven later.',
    requiresCeoApproval: false,
    approvedBy: null,
  },
  {
    id: 'D-004',
    date: '2026-09-05',
    title: 'The commercial wedge is not yet chosen',
    status: 'proposed',
    context:
      '§4 requires one vertical, chosen where customers are cheapest to acquire and ROI is immediate — not by founder preference. Fact on file: flooring is the only vertical with a live proving ground (ecowoods-app) and a vertical experiment (FloorForge) sharing the same buyer. That is a starting position, not a decision.',
    decision:
      'Choose the wedge after the first batch of logged conversations produces at least one fully scored workflow in one vertical. The decision is recorded here with the evidence IDs that justify it.',
    consequences: 'Until the wedge is chosen, no new vertical code is started. Interviews may run across all six candidate verticals.',
    requiresCeoApproval: true,
    approvedBy: null,
  },
  {
    id: 'D-005',
    date: '2026-09-05',
    title: 'The Forge verticals belong to Operations, not Physical AI',
    status: 'accepted',
    context:
      'FloorForge, PaintForge and DryForge sound like robotics. Agent 2’s mandate states they must not automatically become robotics products; they remain Operations unless actual physical robotic execution exists.',
    decision:
      'All three stay in this cluster as vertical experiments. A move to Physical AI requires the constitution’s documented cluster move: reason, commercial benefit, technical benefit, migration cost, dependency impact, CEO approval.',
    consequences: 'The Forge sites are judged by signed pilots and revenue, not by simulation quality.',
    requiresCeoApproval: false,
    approvedBy: null,
  },
  {
    id: 'D-006',
    date: '2026-09-05',
    title: 'Cross-cluster integration through versioned contracts only',
    status: 'accepted',
    context: '§13–14 and the constitution. Coupling through shared databases would make each cluster depend on the others.',
    decision:
      'Contracts are documented at /cluster/contracts/ with a version, a producer, a consumer and a field-level schema. The first contract (OperationalEvent → WorkOrder → InspectionResult) is proposed, not implemented. No system may require another to function.',
    consequences: 'Nothing is built on the contract until both counterparties have a customer reason. Shared infrastructure (auth, billing, observability…) is a separate, economic decision.',
    requiresCeoApproval: false,
    approvedBy: null,
  },
  {
    id: 'D-007',
    date: '2026-09-05',
    title: 'The control room shows measured values or "not yet measured" — never placeholders',
    status: 'accepted',
    context: 'A KPI strip full of zeros or sample data trains the operator to ignore it. The Forge repositories already carry an explicit honesty policy; the control surface must not be weaker than the products it controls.',
    decision:
      'Every KPI value is null until measured, with a source named. Roadmap progress is counted from the evidence log, never typed. GitHub metadata is fetched, never hand-copied. The CI guard fails on a KPI with a value but no measurement date.',
    consequences: 'The first version of the control room is visibly empty. That is the correct state of a cluster with zero logged conversations.',
    requiresCeoApproval: false,
    approvedBy: null,
  },
];

/** Nothing killed yet. After the validation period, an empty list here is a red flag, not a comfort. */
export const killList: KillEntry[] = [];

export const decisionById = (id: string): Decision | undefined => decisions.find((d) => d.id === id);
