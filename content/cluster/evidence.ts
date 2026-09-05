/**
 * evidence.ts — the customer evidence log (§9).
 *
 * One entry per real conversation, signed pilot, committed design partnership
 * or paying customer. The 90-day objective on the roadmap is COUNTED from this
 * file, so a conversation that is not logged here did not happen as far as the
 * control room is concerned — and a target that shows 0 shows 0.
 *
 * Log the conversation, not the compliment. `validation` is true only for
 * money, a signed pilot or a committed design partnership.
 *
 * Names of people and companies stay out of this public file. Use a private
 * identifier in `id` and describe the company by industry and size.
 */

import type { Evidence, EvidenceKind } from './types';

export const evidence: Evidence[] = [
  /* Example of the shape — remove when the first real entry is logged.
  {
    id: 'C-0001',
    date: '2026-09-08',
    kind: 'conversation',
    vertical: 'flooring',
    industry: 'residential hardwood contractor',
    companySize: '4–8 field staff',
    currentSoftware: 'spreadsheets, phone, e-transfer',
    workflows: ['quoting', 'scheduling', 'invoicing'],
    pain: 'Quotes take two evenings a week; two jobs a month are invoiced late.',
    cost: null,
    decisionMaker: 'owner',
    budget: null,
    urgency: 'this-quarter',
    competitorsMentioned: ['Jobber'],
    willingnessToPay: null,
    validation: false,
  },
  */
];

export const countKind = (kind: EvidenceKind): number => evidence.filter((e) => e.kind === kind).length;

/** Qualified: a stated pain, a decision maker, a budget, and urgency other than none/unknown. */
export const qualifiedOpportunities = (): Evidence[] =>
  evidence.filter(
    (e) => e.pain.length > 0 && e.decisionMaker.length > 0 && e.budget !== null && e.urgency !== 'none' && e.urgency !== 'unknown',
  );

export const validatedEvidence = (): Evidence[] => evidence.filter((e) => e.validation);
