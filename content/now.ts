/**
 * now.ts — the one source for "what I'm doing now".
 *
 * /now/ renders the whole list; the home page shows the first entry as an
 * excerpt. Editing this file updates both, so the excerpt can never drift
 * from the page it points at.
 */

export const NOW_UPDATED = 'August 2026';

export type NowItem = { title: string; body: string };

export const nowItems: NowItem[] = [
  {
    title: 'Engineering the grid',
    body:
      'Digitalisation of high-voltage railway traction assets in Frankfurt — IT/OT convergence and security governance for critical infrastructure, at DB InfraGO, since 2024.',
  },
  {
    title: 'Writing the explainers',
    body:
      'Reference pieces on grid inertia, IT/OT convergence and why AI is power-bound — written to be cited, checked line by line before they are published.',
  },
  {
    title: 'Revising the books',
    body:
      'Two manuscripts in revision: The Renewables Migration (with eleven public chapter proof-engine repositories) and The Orbital AI Compute Roadmap — being rewritten the hard way, claim by claim.',
  },
];
