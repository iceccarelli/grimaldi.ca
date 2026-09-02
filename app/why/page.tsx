import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Badge from '@/components/Badge';
import { essays } from '@/content/why';
import { minutesFor } from '@/content/types';

export const metadata: Metadata = {
  title: 'Why — the love essays',
  description:
    'Why Frankfurt, why rail yards, why claim-by-claim books, why one cell and not ten. The only page on the network that is allowed to be human.',
  alternates: { canonical: '/why/' },
};

export default function WhyPage() {
  const written = essays.filter((e) => e.status === 'published');
  const unwritten = essays.filter((e) => e.status !== 'published');

  return (
    <PageShell
      trail={[{ name: 'Why', path: '/why/' }]}
      kicker="Why · essays"
      title="Why I love the work"
      standfirst="First person, no LinkedIn-speak, no product as hero. The reasons behind the choices, written down so they can be held against me later."
    >
      <ol className="note-list">
        {written.map((e) => (
          <li key={e.slug}>
            <a href={`/why/${e.slug}/`}>
              <span className="note-date"><time dateTime={e.date}>{e.date}</time></span>
              <span className="note-main"><b>{e.title}</b><span>{e.description}</span></span>
              <span className="note-meta"><Badge kind={e.badge} /> {minutesFor(e.blocks)} min</span>
            </a>
          </li>
        ))}
      </ol>

      <h2 className="h-quiet">Unwritten</h2>
      <ol className="note-list">
        {unwritten.map((e) => (
          <li key={e.slug}>
            <a href={`/why/${e.slug}/`}>
              <span className="note-date">—</span>
              <span className="note-main"><b>{e.title}</b><span>{e.description}</span></span>
              <span className="note-meta">not yet</span>
            </a>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
