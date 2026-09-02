import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Badge from '@/components/Badge';
import { groups, timeline } from '@/content/archive';

export const metadata: Metadata = {
  title: 'Archive',
  description:
    'Timeline, thesis repositories, chapter proof engines, client platforms, old portfolios and parked product names — everything that used to be a section, kept with a badge and a reason.',
  alternates: { canonical: '/archive/' },
};

export default function ArchivePage() {
  return (
    <PageShell
      trail={[{ name: 'Archive', path: '/archive/' }]}
      kicker="Archive · nothing deleted"
      title="The record"
      standfirst="Everything that was ever a card, a rail or a section on this domain, kept as a row. No flagship language. Client platforms are client platforms; parked names say why."
    >
      <h2 className="h-quiet">Timeline</h2>
      <ol className="journey">
        {timeline.map((t, i) => (
          <li className="journey-item" key={i}>
            <span className="journey-year">{t.year}</span>
            <div>
              <h3>{t.title}</h3>
              <p>{t.line}</p>
            </div>
          </li>
        ))}
      </ol>

      {groups.map((g) => (
        <section className="archive-group" key={g.id} id={g.id}>
          <h2 className="h-quiet">{g.title}</h2>
          <p className="quiet">{g.intro}</p>
          <ul className="archive-rows">
            {g.rows.map((r) => (
              <li key={r.title}>
                <span className="ar-badge"><Badge kind={r.badge} /></span>
                <span className="ar-main">
                  {r.href ? (
                    <a href={r.href} {...(r.href.startsWith('http') ? { rel: 'noopener noreferrer' } : {})}><b>{r.title}</b></a>
                  ) : (
                    <b>{r.title}</b>
                  )}
                  <span>{r.line}</span>
                  {r.owner && <span className="ar-owner">{r.owner}</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PageShell>
  );
}
