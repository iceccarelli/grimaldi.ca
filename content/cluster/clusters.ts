/**
 * clusters.ts — the three strategic clusters and the group constitution.
 *
 * grimaldi.ca controls exactly one of them. The other two are listed so that
 * the integration contracts have named counterparties, and so that no one
 * mistakes this site for the control surface of Energy or Physical AI.
 */

import type { Cluster } from './types';

export const OPERATIONS_CLUSTER_ID = 'operations' as const;

export const clusters: Cluster[] = [
  {
    id: 'energy',
    agent: 'Agent 1',
    name: 'Energy Intelligence',
    mandate:
      'Software that observes, predicts, simulates, optimizes, coordinates and eventually safely controls distributed energy infrastructure. GridOS, DERIM, Energie Teilen, NeuralBridge, physics-informed.',
    command: 'Create the highest-value deep-tech company.',
    controlSurface: null,
  },
  {
    id: 'physical-ai',
    agent: 'Agent 2',
    name: 'Physical AI & Robotics',
    mandate:
      'One coherent physical-AI stack — perceive, model, plan, act, verify, recover, learn — proven on one economically superior workflow first. Palletizer, robot-lidar-fusion, autonomous inspection.',
    command: 'Prove whether physical autonomy can create a defensible second moat.',
    controlSurface: null,
  },
  {
    id: 'operations',
    agent: 'Agent 3',
    name: 'Operations & Commercial Automation',
    mandate:
      'Turn existing operational software into a profitable, repeatable business. Primary KPI: revenue. Not a research laboratory. No generic SaaS infrastructure without a customer-driven reason.',
    command: 'Make money and build distribution.',
    controlSurface: 'https://grimaldi.ca/',
  },
];

export const operationsCluster = clusters.find((c) => c.id === OPERATIONS_CLUSTER_ID)!;

/** The group constitution — the rules every agent obeys, verbatim in substance. */
export const constitution = {
  clusters: 'There are exactly three strategic clusters. No agent may create a fourth.',
  ownership: 'Each cluster owns its domain. Domain logic remains isolated: energy logic remains Energy, robotics logic remains Robotics, operations logic remains Operations.',
  moves:
    'No repository moves between clusters without documenting reason, commercial benefit, technical benefit, migration cost, dependency impact, and the CEO approval requirement.',
  sharing:
    'Shared primitives only when genuinely cross-cluster: authentication, billing, observability, deployment tooling, AI model gateway, secrets management, analytics, audit logging, documentation tooling.',
  communication:
    'Clusters communicate through versioned APIs, events, schemas, contracts and documented interfaces — never through undocumented database coupling.',
  gate: [
    'CUSTOMER PAIN',
    'BUYER',
    'MONEY',
    'DIFFERENTIATION',
    'TECHNICAL FEASIBILITY',
    'STRATEGIC FIT',
    'EXECUTION COST',
  ],
  gateRule: 'A proposed project that fails two or more criteria is archived.',
  artefacts: [
    'repository registry',
    'architecture map',
    'dependency graph',
    'decision log',
    'kill list',
    'roadmap',
    'customer evidence',
    'competitive intelligence',
    'research backlog',
    'weekly KPI report',
  ],
  notRewarded: ['number of commits', 'number of repositories', 'lines of code', 'number of features', 'architectural complexity'],
  rewarded: [
    'revenue',
    'customers',
    'deployments',
    'measurable ROI',
    'technical benchmarks',
    'proprietary IP',
    'research quality',
    'reduced engineering complexity',
  ],
  whenUncertain: [
    'smaller scope',
    'fewer repositories',
    'clearer ownership',
    'faster customer validation',
    'stronger interfaces',
    'lower burn',
    'higher evidence',
  ],
  allocation:
    'Agents compete for resources on evidence, not activity. Whichever cluster produces contracted value gets the next euro and the next engineer.',
} as const;
