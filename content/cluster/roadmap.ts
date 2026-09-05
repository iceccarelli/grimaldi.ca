/**
 * roadmap.ts — the 90-day objective (§16), counted from evidence.
 *
 * The four targets are fixed by the mandate. Progress is never typed here: it
 * is computed from content/cluster/evidence.ts by lib/cluster.ts, so the
 * roadmap cannot claim a conversation that was not logged.
 */

import type { Roadmap } from './types';

/** The clock starts when the control surface goes live with this registry. */
export const roadmap: Roadmap = {
  start: '2026-09-05',
  end: '2026-12-04',
  objectives: [
    { id: 'conversations', label: 'Customer conversations', target: 50, counts: ['conversation', 'signed-pilot', 'design-partnership', 'paying-customer'] },
    { id: 'qualified', label: 'Qualified opportunities', target: 10, counts: [] },
    { id: 'design-partners', label: 'Serious design partners', target: 3, counts: ['design-partnership', 'paying-customer'] },
    { id: 'paying', label: 'Paying customers', target: 1, counts: ['paying-customer'] },
  ],
  ifMissed: 'If there is no paying customer at the end of the period, change the wedge. Do not respond by writing more code.',
};
