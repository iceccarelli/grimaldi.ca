import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import Blocks from '@/components/Blocks';
import { MetaLine } from '@/components/Meta';
import { explainerBySlug, explainers } from '@/content/explain';

/**
 * Explainer stubs route here. Reviewed topics keep their /topics/<slug>/
 * URLs (indexed, unchanged); this route exists so the /explain index can
 * reserve a page per niche subject before it is written.
 */

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return explainers.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const t = explainerBySlug(params.slug);
  if (!t) return {};
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: `/explain/${t.slug}/` },
    robots: t.status === 'draft' ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default function ExplainerPage({ params }: Params) {
  const t = explainerBySlug(params.slug);
  if (!t) notFound();

  return (
    <PageShell
      trail={[{ name: 'Explain', path: '/explain/' }, { name: t.title, path: `/explain/${t.slug}/` }]}
      kicker="Explainer"
      title={t.title}
      standfirst={t.standfirst || t.description}
      narrow
    >
      <MetaLine badge={t.status === 'draft' ? 'RESEARCH' : 'IN REVISION'} parts={[t.subjects.join(' · ')]} />

      {t.blocks.length > 0 ? (
        <Blocks blocks={t.blocks} />
      ) : (
        <div className="empty" role="note">
          <h2>Reserved, not written.</h2>
          <p>
            This page holds the scope of an explainer that does not exist yet. It is served
            noindex and appears in no feed until the text is written and every figure in it has
            been checked against its source.
          </p>
        </div>
      )}

      {t.sources.length > 0 && (
        <section className="topic-sources">
          <h3>Sources</h3>
          <ol>
            {t.sources.map((s, i) => (
              <li key={i}>
                <span className="src-pub">{s.publisher}</span> —{' '}
                {s.url ? <a href={s.url} rel="noopener noreferrer nofollow">{s.title}</a> : s.title}
              </li>
            ))}
          </ol>
        </section>
      )}

      <p className="backlinks"><a href="/explain/">← All explainers</a></p>
    </PageShell>
  );
}
