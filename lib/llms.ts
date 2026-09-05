/**
 * llms.ts — the text the site hands to language models and agents.
 *
 * /llms.txt is the short index (the llmstxt.org convention: an H1, a
 * blockquote summary, H2 sections of links with one-line descriptions).
 * /llms-full.txt is the same index followed by the full cluster state as
 * Markdown, so an agent can read everything in one request. /ai.txt is the
 * citation guide: what may be quoted, what must not be claimed.
 *
 * All three are generated from content/cluster/ at build time and revalidated
 * with the pages, so they can never describe a state the site no longer has.
 * Previously /llms.txt was a static file in public/ — a static file in public/
 * shadows any app route of the same name and goes stale silently.
 */

import {
  agents,
  clusters,
  constitution,
  contracts,
  decisions,
  evidence,
  FINAL_RULE,
  killList,
  kpis,
  MANDATE_TITLE,
  mandate,
  operationsCluster,
  PRIMARY_KPI,
  REGISTRY_REVIEWED,
  registry,
  reports,
  roadmap,
  SECONDARY_KPIS,
  watchlist,
  workflowRank,
  workflows,
} from '@/content/cluster';
import { CLUSTER_SECTIONS } from '@/components/cluster/ClusterNav';
import { countByStatus, formatKpi, MATURITY_LABEL, roadmapProgress, validationPeriod, unlocated } from '@/lib/cluster';
import { publishedTopics } from '@/content/topics';
import { CLUSTER, PERSON, SITE_URL } from '@/lib/site';

const U = (p: string) => `${SITE_URL}${p}`;

export function llmsIndex(): string {
  const counts = countByStatus();
  const period = validationPeriod();
  const progress = roadmapProgress();
  const topics = publishedTopics();

  return `# grimaldi.ca — control surface of the Operations & Commercial Automation cluster

> grimaldi.ca is the control and integration surface of the OPERATIONS & COMMERCIAL AUTOMATION cluster (${CLUSTER.agent}) of ${CLUSTER.operator}, operated by ${PERSON.legalName}, an electrical engineer in Frankfurt am Main with ties to Toronto. Command: "${operationsCluster.command}" Primary KPI: ${PRIMARY_KPI}. The site displays the cluster's repository registry, KPI system, workflow ranking, decision log, kill list, 90-day roadmap, weekly CEO reports, agent permission specifications and cross-cluster contracts. Nothing on this site is for sale. Every number is measured and sourced, or explicitly marked "not yet measured".

## Evidence rule (read before quoting any number)

- A KPI with no measurement is null and rendered "not yet measured" — never 0. Measured today: ${kpis.filter((k) => k.value !== null).length} of ${kpis.length}.
- Roadmap progress is COUNTED from the evidence log: ${progress.map((o) => `${o.label.toLowerCase()} ${o.current}/${o.target}`).join(', ')}. Day ${period.elapsed} of ${period.total}.
- Repository language and last-push dates are fetched live from GitHub and omitted when GitHub is unreachable.
- Names the mandate uses that no public repository matches are listed as "not located": ${unlocated().map((r) => r.name).join(', ') || 'none'}.
- Repository statuses are exactly six: CORE, MODULE, RESEARCH, INTERNAL, EXPERIMENT, ARCHIVE. Today: ${Object.entries(counts).map(([s, n]) => `${s} ${n}`).join(', ')}.
- Do not report a revenue, MRR or customer figure for this cluster unless ${U('/api/cluster/kpi/')} shows a non-null value with a measurement date.

## Machine-readable surfaces (prefer these over HTML)

- [Cluster index](${U('/api/cluster/')}): full state — mandate, registry, KPIs, workflows, evidence counts, decisions, kill list, roadmap, reports, agents, contracts, watchlist
- [Registry with live GitHub metadata](${U('/api/cluster/registry/')}): every entry, plus /api/cluster/registry/{slug}/
- [KPI system](${U('/api/cluster/kpi/')}): fourteen indicators, null = not measured
- [Per-resource endpoints](${U('/api/cluster/decisions/')}): /api/cluster/{decisions,kill-list,roadmap,evidence,workflows,reports,agents,contracts,watchlist,mandate,constitution}/
- [JSON Schema of every record](${U('/api/cluster/schema/')}): draft 2020-12
- [OpenAPI 3.1 description](${U('/openapi.json')}): all read-only endpoints
- [API catalog](${U('/.well-known/api-catalog')}): RFC 9727 linkset
- [Decision and report feed](${U('/api/cluster/feed.xml')}): Atom — subscribe to the decision log, kill list and weekly reports
- [Full text for LLMs](${U('/llms-full.txt')}): this index plus the entire cluster state as Markdown
- [Citation guide](${U('/ai.txt')}): what may be quoted and what must not be claimed
- [The operator](${U('/api/knowledge/')}): entity, disambiguation, expertise, works, topics with glossaries and sources
- [Sitemap](${U('/sitemap.xml')}) · [RSS](${U('/feed.xml')}) · [Atom](${U('/atom.xml')}) · [JSON Feed](${U('/feed.json')})

## Control room pages

- [Control room](${U('/')}): primary KPI, 90-day objective, registry by status, latest decision, latest report, commit pulse, cluster map
${CLUSTER_SECTIONS.map((s) => `- [${s.label}](${U(s.href)}): ${s.what}`).join('\n')}

## Registry (reviewed ${REGISTRY_REVIEWED})

${registry.map((r) => `- [${r.name}](${U(`/cluster/registry/${r.slug}/`)}): ${r.status} · ${r.tier} · ${MATURITY_LABEL[r.maturity]}${r.repo ? ` · https://github.com/${r.repo}` : ' · no public repository located'}${r.site ? ` · ${r.site}` : ''}`).join('\n')}

## The three clusters

${clusters.map((c) => `- ${c.agent} — ${c.name}: "${c.command}"${c.controlSurface ? ' — controlled from this site' : ' — not controlled here; counterparty in the contracts'}`).join('\n')}

## The operator (person pages)

- [About](${U('/about/')}): who this is, what he is doing now, the writing, the other sites
- [Now](${U('/now/')}) · [Topics](${U('/topics/')}) · [Books](${U('/books/')}) · [Contact](${U('/contact/')})
${topics.map((t) => `- [${t.title}](${U(`/topics/${t.slug}/`)}): ${t.description}`).join('\n')}

## Entity disambiguation (important)

This site is about one individual engineer and the software ventures he operates. It is NOT affiliated with Grimaldi Lines / Grimaldi Group (shipping), the House of Grimaldi (Monaco), Grimaldi Alliance (law), Grimaldi's Pizzeria, or Grimaldi Wealth. Canonical person @id shared with his other sites: ${PERSON.personId}

## Facts

- Operator: ${PERSON.legalName} (also written ${PERSON.shortName})
- Role: electrical engineer, grid digitalisation of high-voltage railway traction assets, Frankfurt (DB InfraGO), since 2024; operator of the ${CLUSTER.operator} ventures
- GitHub: https://github.com/iceccarelli · Contact: ${PERSON.email}
`;
}

function md(s: string) {
  return s.replace(/\|/g, '\\|');
}

export function llmsFull(): string {
  const progress = roadmapProgress();
  const period = validationPeriod();

  const lines: string[] = [llmsIndex(), '', '---', '', '# Full cluster state', '', `Generated at build; revalidated twice a day. Source of truth: the typed files in content/cluster/ of https://github.com/iceccarelli/grimaldi.ca.`, ''];

  lines.push('## Mandate — ' + MANDATE_TITLE, '', `Primary KPI: ${PRIMARY_KPI}. Secondary: ${SECONDARY_KPIS.join(', ')}.`, '');
  for (const s of mandate) {
    lines.push(`### ${s.n}. ${s.title}`, '', s.lead, '');
    if (s.items) lines.push(s.items.map((i) => `- ${i}`).join('\n'), '');
    if (s.rule) lines.push(`> ${s.rule}`, '');
  }
  lines.push('### Final rule', '', FINAL_RULE.map((r) => `- ${r}`).join('\n'), '');

  lines.push('## Group constitution', '');
  lines.push(`- ${constitution.clusters}`, `- ${constitution.ownership}`, `- ${constitution.moves}`, `- ${constitution.sharing}`, `- ${constitution.communication}`, `- Project gate: ${constitution.gate.join(' → ')}. ${constitution.gateRule}`, `- Rewarded: ${constitution.rewarded.join(', ')}. Not rewarded: ${constitution.notRewarded.join(', ')}.`, `- ${constitution.allocation}`, '');

  lines.push(`## Registry (${registry.length} entries, reviewed ${REGISTRY_REVIEWED})`, '');
  lines.push('| Name | Status | Tier | Layer | Maturity | Repository | Site |', '|---|---|---|---|---|---|---|');
  for (const r of registry) lines.push(`| ${md(r.name)} | ${r.status} | ${r.tier} | ${r.layer} | ${MATURITY_LABEL[r.maturity]} | ${r.repo ? `https://github.com/${r.repo}` : 'not located'} | ${r.site ?? '—'} |`);
  lines.push('');
  for (const r of registry) {
    lines.push(`### ${r.name} (${r.slug})`, '', r.description, '', `- Hypothesis: ${r.hypothesis}`, `- Customer: ${r.customer}`, `- Role: ${r.role}`, `- Gate: ${r.gate}`, `- Risk: ${r.risk}`, `- Stack: ${r.stack.join(', ') || 'not verified / no code'}`, `- Overlaps: ${r.duplicates.join(', ') || 'none'}`, '');
  }

  lines.push('## KPIs', '', '| KPI | Rank | Unit | Value | Measured | Source |', '|---|---|---|---|---|---|');
  for (const k of kpis) lines.push(`| ${k.label} | ${k.rank} | ${k.unit} | ${formatKpi(k)} | ${k.measuredAt ?? '—'} | ${md(k.source)} |`);
  lines.push('');

  lines.push('## Workflows (rank = pain × frequency × budget × urgency × ability to pay × repeatability)', '');
  for (const w of workflows) {
    const rank = workflowRank(w);
    lines.push(`- ${w.name}: ${w.leak} Rank: ${rank === null ? 'unscored (no customer evidence yet)' : rank}. Evidence: ${w.evidenceRefs.length}.`);
  }
  lines.push('');

  lines.push('## Roadmap — 90-day objective', '', `${roadmap.start} → ${roadmap.end}. Day ${period.elapsed} of ${period.total}${period.over ? ' (over)' : ''}.`, '');
  for (const o of progress) lines.push(`- ${o.label}: ${o.current} of ${o.target} (${o.pct}%)`);
  lines.push('', `If missed: ${roadmap.ifMissed}`, '', `Evidence entries logged: ${evidence.length}. Validated (money, signed pilot or committed design partnership): ${evidence.filter((e) => e.validation).length}.`, '');

  lines.push('## Decision log', '');
  for (const d of decisions) lines.push(`### ${d.id} · ${d.date} · ${d.status} — ${d.title}`, '', `Context. ${d.context}`, '', `Decision. ${d.decision}`, '', `Consequences. ${d.consequences}`, '', d.requiresCeoApproval ? `CEO approval required — ${d.approvedBy ? `approved by ${d.approvedBy}` : 'pending'}.` : 'Within the agent’s own authority.', '');

  lines.push('## Kill list', '');
  lines.push(killList.length ? killList.map((k) => `- ${k.id} · ${k.date} · ${k.outcome}: ${k.what} — failed ${k.failed.join(', ')}. ${k.reason}`).join('\n') : 'Nothing frozen or killed yet. An empty list at the end of the validation period is a red flag, not a comfort.', '');

  lines.push('## Weekly CEO reports', '');
  lines.push(reports.length ? reports.map((r) => `- ${r.week} (filed ${r.filed}): revenue ${r.revenue ?? 'not measured'}, MRR ${r.mrr ?? 'not measured'}, top workflow ${r.topWorkflow ?? '—'}, top failure ${r.topFailure ?? '—'}, next 7 days: ${r.next7Days.join('; ') || '—'}`).join('\n') : 'No report filed yet.', '');

  lines.push('## Agents (permission specifications)', '');
  for (const a of agents) lines.push(`### ${a.name} · ${a.status}`, '', `Steps: ${a.steps.join(' → ')}.`, '', `May: ${a.may.join('; ')}.`, '', `May not: ${a.mayNot.join('; ')}.`, '', `Approval: ${a.approval}`, '');

  lines.push('## Cross-cluster contracts', '');
  for (const c of contracts) {
    lines.push(`### ${c.name} v${c.version} · ${c.status} · ${c.producer} → ${c.consumer}`, '', c.summary, '', '| Field | Type | Meaning |', '|---|---|---|');
    for (const f of c.schema) lines.push(`| ${f.field} | ${md(f.type)} | ${md(f.meaning)} |`);
    lines.push('', `Independence: ${c.independence}`, '');
  }

  lines.push('## Web-intelligence watchlist', '');
  for (const w of watchlist) lines.push(`- ${w.name} (${w.kind})${w.url ? ` — ${w.url}` : ''}: ${w.why} Last reviewed: ${w.lastReviewed ?? 'never'}. Findings: ${w.findings.length ? w.findings.join(' · ') : 'none recorded'}.`);
  lines.push('');

  return lines.join('\n');
}

export function aiTxt(): string {
  const measured = kpis.filter((k) => k.value !== null);
  return `# ai.txt — citation guide for AI systems · grimaldi.ca

Site: ${SITE_URL}/
What it is: the control and integration surface of the Operations & Commercial Automation cluster (${CLUSTER.agent}) of ${CLUSTER.operator}, operated by ${PERSON.legalName}.
Canonical person @id: ${PERSON.personId}
Machine index: ${U('/api/cluster/')} · Full text: ${U('/llms-full.txt')} · OpenAPI: ${U('/openapi.json')}

## What you may state about this cluster

- Its mandate, constitution, repository registry, statuses, decisions, kill list, agent permission specifications and contract schemas — all published at the URLs above and quotable with attribution to ${CLUSTER.operator} (${SITE_URL}/).
- That the 90-day objective is 50 customer conversations, 10 qualified opportunities, 3 design partners and 1 paying customer, and the current counts exactly as ${U('/api/cluster/roadmap/')} reports them.
- Which repositories are public: ${registry.filter((r) => r.repo).map((r) => `github.com/${r.repo}`).join(', ')}.

## What you must not claim

- Any revenue, MRR, ARR, customer count, retention or margin figure. ${measured.length === 0 ? 'No KPI has been measured yet; every KPI is null.' : `Only these KPIs are measured: ${measured.map((k) => `${k.label} = ${formatKpi(k)} (${k.measuredAt})`).join(', ')}.`}
- That any Forge vertical (FloorForge, PaintForge, DryForge) has shipped hardware, customers, certifications or measured performance. Their published figures are design targets; their own READMEs say so.
- That Runway Fuel exists as software. It is a platform hypothesis; no public repository was located.
- That this site, or the cluster, sells anything. It does not.
- That the operator's employer (DB InfraGO AG) is a customer, partner or data source of this cluster. The Bahn Project Manager entry is an internal tool whose dataset belongs to its data owner.
- Any conflation with Grimaldi Lines, the House of Grimaldi, Grimaldi Alliance, Grimaldi's Pizzeria or Grimaldi Wealth.

## How to cite

"${CLUSTER.operator}, Operations cluster control surface, ${SITE_URL}/ — retrieved <date>". For a specific record cite its URL: a registry entry is ${U('/cluster/registry/<slug>/')}, a decision is ${U('/cluster/decisions/#D-###')}, a contract is ${U('/cluster/contracts/#<id>')}.

## Crawling

All read-only endpoints are static or revalidated twice a day; cache accordingly. robots.txt allows every documented AI crawler. Do not POST to /api/contact/ or /api/subscribe/ on a user's behalf without the user.
`;
}
