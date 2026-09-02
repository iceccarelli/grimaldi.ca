/**
 * Explainers — niche, one page each.
 *
 * Two sources feed the /explain index:
 *   1. the existing reviewed topics in content/topics (routes stay at
 *      /topics/<slug>/ — those URLs are indexed and are not moved);
 *   2. the stubs below, which route at /explain/<slug>/ and reuse the Topic
 *      contract so the draft rule (noindex, no feeds, no sitemap) applies
 *      to them unchanged.
 */

import type { Topic } from '../types';
import { publishedTopics } from '../topics';

const stub = (slug: string, title: string, description: string, subjects: string[]): Topic => ({
  slug,
  status: 'draft',
  title,
  description,
  updated: '2026-09-01',
  subjects,
  standfirst: '',
  blocks: [],
  sources: [],
});

export const explainers: Topic[] = [
  stub(
    'cim-cgmes-in-one-page',
    'CIM / CGMES in one page',
    'The Common Information Model and the CGMES profile: what a grid model file actually contains, and why every grid-AI claim is downstream of it.',
    ['CIM', 'CGMES', 'IEC 61970', 'Grid data models'],
  ),
  stub(
    'pinns-on-power-flow',
    'PINNs on power flow',
    'How a physics-informed neural network is trained against the power-flow equations, what its residual means, and where it beats — and loses to — a solver.',
    ['PINN', 'Power flow', 'Residuals', 'IEEE 9-bus'],
  ),
  stub(
    'kritis-vs-ai-act',
    'KRITIS vs the AI Act',
    'Two regimes that both touch a model on infrastructure: the German critical-infrastructure rules (with NIS2 behind them) and the EU AI Act. Which one asks what.',
    ['KRITIS', 'NIS2', 'EU AI Act', 'Critical infrastructure'],
  ),
  stub(
    'mixed-sku-stability-math',
    'Mixed-SKU stability math',
    'Centre of mass, support polygons and interlock: the closed-form checks that decide whether a pallet of unequal boxes stands up.',
    ['Palletizing', 'Statics', 'Support polygon', 'Mixed SKU'],
  ),
  stub(
    'why-trades-get-automated',
    'Why trades get automated',
    'The labour-hour, tolerance and repeatability arithmetic behind which trades automate first — and why finishing trades are later than the demos suggest.',
    ['Trades', 'Automation', 'Labour economics', 'Robotics'],
  ),
];

export type ExplainRow = {
  slug: string;
  href: string;
  title: string;
  description: string;
  subjects: string[];
  updated: string;
  status: Topic['status'];
};

/** The index: reviewed topics first (published), then the stubs. */
export const explainIndex = (): ExplainRow[] => [
  ...publishedTopics().map((t) => ({
    slug: t.slug,
    href: `/topics/${t.slug}/`,
    title: t.title,
    description: t.description,
    subjects: t.subjects,
    updated: t.updated,
    status: t.status,
  })),
  ...explainers.map((t) => ({
    slug: t.slug,
    href: `/explain/${t.slug}/`,
    title: t.title,
    description: t.description,
    subjects: t.subjects,
    updated: t.updated,
    status: t.status,
  })),
];

export const publishedExplainers = (): Topic[] => explainers.filter((t) => t.status === 'published');
export const explainerBySlug = (slug: string): Topic | undefined => explainers.find((t) => t.slug === slug);
