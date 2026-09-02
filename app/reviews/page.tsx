import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Badge from '@/components/Badge';
import { reviews } from '@/content/reviews';

export const metadata: Metadata = {
  title: 'Reviews',
  description:
    'Reviews of grid copilots, PINN libraries, CIM/CGMES tooling, robot cell vendors and flooring robots — in a fixed house style that ends with one question: would you put it on a substation LAN?',
  alternates: { canonical: '/reviews/' },
};

export default function ReviewsPage() {
  const published = reviews.filter((r) => r.status === 'published');
  const queue = reviews.filter((r) => r.status !== 'published');

  return (
    <PageShell
      trail={[{ name: 'Reviews', path: '/reviews/' }]}
      kicker="Reviews · house style"
      title="Reviews"
      standfirst="What it is. Who it is for. What number they published. What they hid. Would you put it on a substation LAN? Yes, not yet, or no."
    >
      <p className="intro">
        Five questions, always the same, so that two reviews are comparable and so that the last
        answer cannot be dodged. Nothing is reviewed from a press release; if the vendor has not
        published a number, that is the review.
      </p>

      {published.length > 0 && (
        <>
          <h2 className="h-quiet">Published</h2>
          <ol className="note-list">
            {published.map((r) => (
              <li key={r.slug}>
                <a href={`/reviews/${r.slug}/`}>
                  <span className="note-date">{r.updated}</span>
                  <span className="note-main"><b>{r.title}</b><span>{r.description}</span></span>
                  <span className="note-meta"><Badge kind={r.badge} /> LAN: {r.substationLan}</span>
                </a>
              </li>
            ))}
          </ol>
        </>
      )}

      <h2 className="h-quiet">{published.length ? 'Queue' : 'Queue — nothing reviewed yet'}</h2>
      <p className="quiet">
        Targets with a page reserved. Each opens to the empty five-question shape; none carries
        a verdict until it is written, and none is in the sitemap or the feeds until then.
      </p>
      <ol className="note-list">
        {queue.map((r) => (
          <li key={r.slug}>
            <a href={`/reviews/${r.slug}/`}>
              <span className="note-date">{r.category}</span>
              <span className="note-main"><b>{r.title}</b><span>{r.description}</span></span>
              <span className="note-meta"><Badge kind={r.badge} /> unreviewed</span>
            </a>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
