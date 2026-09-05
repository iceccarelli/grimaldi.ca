/**
 * reports.ts — weekly CEO reports (§15).
 *
 * One entry per ISO week, filed by the agent, read by the CEO layer. Numbers
 * that were not measured that week are null. Free-text fields say what
 * happened, not what was worked on: outcomes, not activity.
 *
 * The newest report is rendered on the control room home; the full history at
 * /cluster/reports/. An empty array renders the report template with the
 * fields the mandate requires, so the first report has a shape to fill.
 */

import type { WeeklyReport } from './types';

export const reports: WeeklyReport[] = [];

/** Field order and labels, exactly as the mandate lists them. */
export const REPORT_FIELDS: { key: keyof WeeklyReport; label: string }[] = [
  { key: 'revenue', label: 'Revenue' },
  { key: 'mrr', label: 'MRR' },
  { key: 'arr', label: 'ARR' },
  { key: 'pipeline', label: 'Pipeline' },
  { key: 'leads', label: 'Leads' },
  { key: 'qualifiedOpportunities', label: 'Qualified opportunities' },
  { key: 'conversion', label: 'Conversion' },
  { key: 'churn', label: 'Churn' },
  { key: 'retention', label: 'Retention' },
  { key: 'grossMargin', label: 'Gross margin' },
  { key: 'customerRequests', label: 'Customer requests' },
  { key: 'topWorkflow', label: 'Top workflow' },
  { key: 'topFailure', label: 'Top failure' },
  { key: 'competitiveChange', label: 'Competitive change' },
  { key: 'featuresKilled', label: 'Features killed' },
  { key: 'customersWon', label: 'Customers won' },
  { key: 'customersLost', label: 'Customers lost' },
  { key: 'next7Days', label: 'Next 7 days' },
];

export const latestReport = (): WeeklyReport | undefined =>
  [...reports].sort((a, b) => b.week.localeCompare(a.week))[0];
