import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Badge from '@/components/Badge';
import { explainIndex } from '@/content/explain';

export const metadata: Metadata = {
  title: 'Explain — niche explainers',
  description:
    'One-page explainers on the things the work touches: CIM/CGMES, PINNs on power flow, KRITIS vs the AI Act, mixed-SKU stability math, why trades get automated — plus the reviewed topics.',
  alternates: { canonical: '/explain/' },
};

export default function ExplainPage() {
  const rows = explainIndex();
  const published = rows.filter((r) => r.status === 'published');
  const stubs = rows.filter((r) => r.status !== 'published');

  return (
    <PageShell
      trail={[{ name: 'Explain', path: '/explain/' }]}
      kicker="Explain · one page each"
      title="Niche explainers"
      standfirst="Reference pages written to be cited. Every figure carries its source; nothing is published before it has been checked line by line."
    >
      <h2 className="h-quiet">Reviewed</h2>
      <ol className="note-list">
        {published.map((r) => (
          <li key={r.slug}>
            <a href={r.href}>
              <span className="note-date">{r.updated}</span>
              <span className="note-main"><b>{r.title}</b><span>{r.description}</span></span>
              <span className="note-meta">reviewed · published</span>
            </a>
          </li>
        ))}
      </ol>

      <h2 className="h-quiet">Reserved — not yet written</h2>
      <p className="quiet">Each has a page and a scope. None is indexed until it is written and checked.</p>
      <ol className="note-list">
        {stubs.map((r) => (
          <li key={r.slug}>
            <a href={r.href}>
              <span className="note-date">{r.subjects[0]}</span>
              <span className="note-main"><b>{r.title}</b><span>{r.description}</span></span>
              <span className="note-meta"><Badge kind="RESEARCH" /> stub</span>
            </a>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
