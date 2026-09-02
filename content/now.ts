/**
 * /now — this month. Four lines, each a fact that can go stale and is
 * expected to. Edit the lines, bump UPDATED. The home page renders the same
 * strip, so there is one place to keep honest.
 */

import type { Badge } from './types';

export const NOW_UPDATED = 'September 2026';

export type NowLine = { label: string; text: string; badge?: Badge; href?: string };

export const nowLines: NowLine[] = [
  {
    label: 'Day job',
    text: 'DB InfraGO, Frankfurt — ITk Fachspezialist on the digitisation of high-voltage traction assets; IT/OT and KRITIS governance. Sanitised: nothing from work appears here.',
  },
  {
    label: 'Artefact shipped',
    text: 'One palletizing cell planner, shipped and measured, on the trade domain. Second cell: not until the first has numbers.',
    badge: 'SHIPPED',
    href: 'https://engineeringgrimaldi.com/',
  },
  {
    label: 'Chapters',
    text: 'The Renewables Migration: chapter 1 serialised as an essay stub, eleven proof engines public. The Orbital AI Compute Roadmap: in revision, no engines yet.',
    badge: 'IN REVISION',
    href: '/books/',
  },
  {
    label: 'Research',
    text: 'Preparing a PhD direction with RWTH ACS around safer grid operation with verifiable models (the SAFEr Grid ambition). An application, not a product.',
    badge: 'RESEARCH',
  },
];
