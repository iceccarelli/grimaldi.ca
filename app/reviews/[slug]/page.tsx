import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import Blocks from '@/components/Blocks';
import { MetaLine } from '@/components/Meta';
import { reviewBySlug, reviews } from '@/content/reviews';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return reviews.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const r = reviewBySlug(params.slug);
  if (!r) return {};
  return {
    title: `Review — ${r.title}`,
    description: r.description,
    alternates: { canonical: `/reviews/${r.slug}/` },
    robots: r.status === 'draft' ? { index: false, follow: false } : { index: true, follow: true },
  };
}

const VERDICT: Record<string, string> = {
  yes: 'Yes.',
  'not yet': 'Not yet.',
  no: 'No.',
  unreviewed: '— (not yet reviewed)',
};

export default function ReviewPage({ params }: Params) {
  const r = reviewBySlug(params.slug);
  if (!r) notFound();
  const blank = '— (not yet written)';

  return (
    <PageShell
      trail={[{ name: 'Reviews', path: '/reviews/' }, { name: r.title, path: `/reviews/${r.slug}/` }]}
      kicker={`Review · ${r.category}`}
      title={r.title}
      standfirst={r.description}
      narrow
    >
      <MetaLine badge={r.badge} parts={[r.status === 'draft' ? 'Unwritten — the shape is reserved' : `updated ${r.updated}`]} />

      <dl className="template review-template">
        <div><dt>What it is</dt><dd>{r.whatItIs || blank}</dd></div>
        <div><dt>Who it is for</dt><dd>{r.whoItIsFor || blank}</dd></div>
        <div><dt>What number they published</dt><dd>{r.numberPublished || blank}</dd></div>
        <div><dt>What they hid</dt><dd>{r.whatTheyHid || blank}</dd></div>
        <div className="verdict"><dt>Would you put it on a substation LAN?</dt><dd>{VERDICT[r.substationLan]}</dd></div>
      </dl>

      {r.blocks.length > 0 && <Blocks blocks={r.blocks} />}

      {r.sources?.length ? (
        <section className="topic-sources">
          <h3>Sources</h3>
          <ol>
            {r.sources.map((s, i) => (
              <li key={i}>
                <span className="src-pub">{s.publisher}</span> —{' '}
                {s.url ? <a href={s.url} rel="noopener noreferrer nofollow">{s.title}</a> : s.title}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <p className="backlinks"><a href="/reviews/">← All reviews</a></p>
    </PageShell>
  );
}
