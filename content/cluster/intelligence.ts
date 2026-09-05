/**
 * intelligence.ts — the web-intelligence watchlist (§8).
 *
 * What is monitored and why. Findings are appended per review with the five
 * questions the mandate asks: what changed, why it matters, which product it
 * affects, what to build or not build, whom to contact. Nothing here is a
 * claim about a competitor's product; it is a list of what to look at.
 * `lastReviewed: null` means exactly that.
 */

import type { WatchItem } from './types';

export const watchlist: WatchItem[] = [
  { id: 'servicetitan', name: 'ServiceTitan', kind: 'competitor', url: 'https://www.servicetitan.com/', why: 'The incumbent field-service and trades platform at the top of the market; its pricing and complaints define what "too heavy" means for a small contractor.', lastReviewed: null, findings: [] },
  { id: 'jobber', name: 'Jobber', kind: 'competitor', url: 'https://getjobber.com/', why: 'The default for small home-service and trades businesses in Canada; the most likely current software of a GTA contractor interviewed for this cluster.', lastReviewed: null, findings: [] },
  { id: 'housecall-pro', name: 'Housecall Pro', kind: 'competitor', url: 'https://www.housecallpro.com/', why: 'Direct competitor to Jobber in the same segment; its feature releases show which workflows small contractors ask for.', lastReviewed: null, findings: [] },
  { id: 'contractor-software', name: 'Contractor software (category)', kind: 'category', url: null, why: 'Buildertrend, Procore-for-small-firms and trade-specific tools. Where a specialty contractor goes when the field-service tools are too generic.', lastReviewed: null, findings: [] },
  { id: 'erp', name: 'ERP products for trades and industrial service', kind: 'category', url: null, why: 'The ceiling of the market: what a customer migrates to when they outgrow a vertical tool, and what they hate about it.', lastReviewed: null, findings: [] },
  { id: 'ai-native-vertical-saas', name: 'AI-native vertical SaaS', kind: 'category', url: null, why: 'New entrants that start from an agent rather than a form. They set buyer expectations for estimation and lead-response agents.', lastReviewed: null, findings: [] },
  { id: 'reddit-trades', name: 'Reddit and trade forums', kind: 'community', url: null, why: 'Unfiltered complaints from owners and estimators about their software and their paperwork — the raw material of §3.', lastReviewed: null, findings: [] },
  { id: 'trade-publications', name: 'Trade publications', kind: 'community', url: null, why: 'Flooring, painting, drywall and field-service press: pricing changes, acquisitions, labour statistics.', lastReviewed: null, findings: [] },
  { id: 'search-trends', name: 'Search trends for workflow queries', kind: 'signal', url: null, why: '"Best software for X workflow" queries by vertical — what §12 must be discoverable for.', lastReviewed: null, findings: [] },
  { id: 'marketplaces', name: 'Relevant marketplaces', kind: 'signal', url: null, why: 'HomeStars, Houzz and similar: where contractor leads originate and how response time is judged.', lastReviewed: null, findings: [] },
  { id: 'ai-capabilities', name: 'New AI capabilities', kind: 'signal', url: null, why: 'Model and tool changes that make an estimation, sales, operations or finance agent cheaper or safer to run under explicit permissions.', lastReviewed: null, findings: [] },
];
