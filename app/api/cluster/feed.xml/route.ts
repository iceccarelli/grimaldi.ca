import { decisions, killList, reports } from '@/content/cluster';
import { PERSON, SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * /api/cluster/feed.xml — Atom feed of the decision log, the kill list and the
 * weekly CEO reports, newest first. The CEO layer — or an agent — subscribes
 * once and is told when the cluster decides, kills or reports.
 */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

type Item = { id: string; title: string; updated: string; url: string; summary: string; category: string };

export function GET() {
  const items: Item[] = [
    ...decisions.map((d) => ({ id: `decision:${d.id}`, title: `${d.id} — ${d.title}`, updated: d.date, url: `${SITE_URL}/cluster/decisions/#${d.id}`, summary: `${d.status}. ${d.decision}`, category: 'decision' })),
    ...killList.map((k) => ({ id: `kill:${k.id}`, title: `${k.outcome}: ${k.what}`, updated: k.date, url: `${SITE_URL}/cluster/decisions/#${k.id}`, summary: `Failed ${k.failed.join(', ')}. ${k.reason}`, category: 'kill' })),
    ...reports.map((r) => ({ id: `report:${r.week}`, title: `Weekly CEO report ${r.week}`, updated: r.filed, url: `${SITE_URL}/cluster/reports/#${r.week}`, summary: `Top workflow: ${r.topWorkflow ?? '—'}. Top failure: ${r.topFailure ?? '—'}. Next 7 days: ${r.next7Days.join('; ') || '—'}.`, category: 'report' })),
  ].sort((a, b) => b.updated.localeCompare(a.updated));
  const latest = items[0]?.updated ?? new Date().toISOString().slice(0, 10);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Operations cluster — decisions, kill list, weekly reports</title>
  <subtitle>The decision log, kill list and weekly CEO reports of the Operations &amp; Commercial Automation cluster, grimaldi.ca</subtitle>
  <id>${SITE_URL}/api/cluster/feed.xml</id>
  <link href="${SITE_URL}/api/cluster/feed.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE_URL}/cluster/decisions/" rel="alternate" type="text/html"/>
  <updated>${latest}T00:00:00Z</updated>
  <author><name>${esc(PERSON.legalName)}</name><uri>${SITE_URL}/about/</uri></author>
${items
  .map(
    (i) => `  <entry>
    <id>${SITE_URL}/api/cluster/feed.xml#${esc(i.id)}</id>
    <title>${esc(i.title)}</title>
    <link href="${i.url}" rel="alternate" type="text/html"/>
    <updated>${i.updated}T00:00:00Z</updated>
    <category term="${i.category}"/>
    <summary>${esc(i.summary)}</summary>
  </entry>`,
  )
  .join('\n')}
</feed>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' } });
}
