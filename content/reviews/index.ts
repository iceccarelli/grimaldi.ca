/**
 * Reviews — house style, fixed questions.
 *
 *   What it is. Who it is for. What number they published. What they hid.
 *   Would you put it on a substation LAN? yes / not yet / no.
 *
 * A stub is a title with every answer set to '' and the verdict
 * 'unreviewed'. Stubs render with the question shape visible and the
 * answers honestly blank; they are noindex and absent from feeds until the
 * review is written. Vendor names in stub titles are targets, not verdicts.
 */

import type { Review } from '../types';

const stub = (
  slug: string,
  title: string,
  category: string,
  description: string,
): Review => ({
  slug,
  status: 'draft',
  badge: 'RESEARCH',
  title,
  description,
  category,
  updated: '2026-09-01',
  whatItIs: '',
  whoItIsFor: '',
  numberPublished: '',
  whatTheyHid: '',
  substationLan: 'unreviewed',
  blocks: [],
});

export const reviews: Review[] = [
  stub(
    'grid-copilots',
    'Grid copilots',
    'Grid software',
    'The LLM-in-the-control-room products: what they claim, what they measure, and whether any of it belongs near a relay.',
  ),
  stub(
    'pinn-libraries',
    'PINN libraries',
    'Physics-informed ML',
    'The physics-informed neural network toolkits: which ones report residuals honestly and which ones only report loss curves.',
  ),
  stub(
    'cim-cgmes-tooling',
    'CIM / CGMES tooling',
    'Grid data models',
    'Editors, validators and converters for the Common Information Model and its CGMES profile — the plumbing every grid AI claim depends on.',
  ),
  stub(
    'robot-cell-vendors',
    'Robot cell vendors — Stretch, Plus One, ABB, UR',
    'Automation',
    'Boston Dynamics Stretch, Plus One Robotics, ABB and Universal Robots as cell vendors for end-of-line work: published numbers versus demo numbers.',
  ),
  stub(
    'flooring-robots',
    'Flooring robots — Okibo, Canvas and the rest',
    'Trades automation',
    'A map of the robots aimed at floors, walls and finishing trades, kept here so the trade site can point at one honest page instead of a feature grid.',
  ),
];

export const publishedReviews = (): Review[] =>
  reviews.filter((r) => r.status === 'published').sort((a, b) => b.updated.localeCompare(a.updated));

export const reviewBySlug = (slug: string): Review | undefined => reviews.find((r) => r.slug === slug);
