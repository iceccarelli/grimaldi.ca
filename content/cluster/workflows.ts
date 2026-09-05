/**
 * workflows.ts — where businesses lose money (§3).
 *
 * The fifteen workflows the mandate names, each with a leak hypothesis and a
 * six-dimension score. Scores are null until customer conversations supply
 * them; the ranking page multiplies only fully scored rows and lists the rest
 * as unscored. Founder preference is not a score.
 */

import type { Workflow, WorkflowScore } from './types';

const unscored: WorkflowScore = {
  pain: null,
  frequency: null,
  budget: null,
  urgency: null,
  abilityToPay: null,
  repeatability: null,
};

export const workflows: Workflow[] = [
  { id: 'lead-response', name: 'Lead response', leak: 'Leads that wait hours go to whoever answered first; the cost is the whole job.', score: unscored, evidenceRefs: [] },
  { id: 'estimating', name: 'Estimating', leak: 'Site visits and take-offs done by the most expensive person in the company, often for jobs that never close.', score: unscored, evidenceRefs: [] },
  { id: 'quoting', name: 'Quoting', leak: 'Slow, inconsistent quotes; margin lost to guesswork and unpriced scope.', score: unscored, evidenceRefs: [] },
  { id: 'scheduling', name: 'Scheduling', leak: 'Crews idle between jobs; customers rescheduled by phone; no view of capacity.', score: unscored, evidenceRefs: [] },
  { id: 'dispatch', name: 'Dispatch', leak: 'Wrong crew, wrong materials, wrong site; drive time nobody bills.', score: unscored, evidenceRefs: [] },
  { id: 'procurement', name: 'Procurement', leak: 'Materials ordered late or twice; pickup runs during billable hours.', score: unscored, evidenceRefs: [] },
  { id: 'labor-utilization', name: 'Labor utilization', leak: 'Paid hours that are not on a job — the largest line in most trades.', score: unscored, evidenceRefs: [] },
  { id: 'material-waste', name: 'Material waste', leak: 'Over-ordering, off-cuts, damaged stock, returns never processed.', score: unscored, evidenceRefs: [] },
  { id: 'change-orders', name: 'Change orders', leak: 'Extra work done on a handshake and never invoiced.', score: unscored, evidenceRefs: [] },
  { id: 'job-documentation', name: 'Job documentation', leak: 'Photos and notes on phones; disputes lost for lack of a record.', score: unscored, evidenceRefs: [] },
  { id: 'customer-communication', name: 'Customer communication', leak: 'Status calls that interrupt the crew; reviews lost to silence after the job.', score: unscored, evidenceRefs: [] },
  { id: 'invoicing', name: 'Invoicing', leak: 'Invoices sent days after completion, or not at all for small extras.', score: unscored, evidenceRefs: [] },
  { id: 'collections', name: 'Collections', leak: 'Receivables ageing while the owner does the chasing personally.', score: unscored, evidenceRefs: [] },
  { id: 'warranty', name: 'Warranty', leak: 'Callbacks with no record of what was installed, when, by whom.', score: unscored, evidenceRefs: [] },
  { id: 'quality-control', name: 'Quality control', leak: 'Defects found by the customer instead of by a checklist before handover.', score: unscored, evidenceRefs: [] },
];

/** The rank: the product of the six dimensions, or null while any is unscored. */
export function workflowRank(w: Workflow): number | null {
  const v = Object.values(w.score);
  if (v.some((x) => x === null)) return null;
  return (v as number[]).reduce((a, b) => a * b, 1);
}

export const rankedWorkflows = (): Workflow[] =>
  [...workflows].sort((a, b) => (workflowRank(b) ?? -1) - (workflowRank(a) ?? -1));
