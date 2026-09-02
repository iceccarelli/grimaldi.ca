import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import Blocks from '@/components/Blocks';
import JsonLd from '@/components/JsonLd';
import { ArtefactLine, MetaLine } from '@/components/Meta';
import { essayBySlug, essays } from '@/content/why';
import { blocksWords, minutesFor } from '@/content/types';
import { personRef } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return essays.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const e = essayBySlug(params.slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.description,
    alternates: { canonical: `/why/${e.slug}/` },
    robots: e.status === 'draft' ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { type: 'article', title: e.title, description: e.description },
  };
}

export default function EssayPage({ params }: Params) {
  const e = essayBySlug(params.slug);
  if (!e) notFound();

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/why/${e.slug}/#essay`,
    url: `${SITE_URL}/why/${e.slug}/`,
    headline: e.title,
    description: e.description,
    datePublished: e.date,
    inLanguage: 'en',
    author: personRef,
    publisher: personRef,
    wordCount: blocksWords(e.blocks),
    isAccessibleForFree: true,
  };

  return (
    <PageShell
      trail={[{ name: 'Why', path: '/why/' }, { name: e.title, path: `/why/${e.slug}/` }]}
      kicker="Why · essay"
      title={e.title}
      standfirst={e.description}
      narrow
    >
      <JsonLd data={article} />
      <MetaLine badge={e.badge} parts={[e.blocks.length ? `${minutesFor(e.blocks)} min` : 'unwritten', e.date]} />

      {e.blocks.length > 0 ? (
        <Blocks blocks={e.blocks} />
      ) : (
        <div className="empty" role="note">
          <h2>Not written yet.</h2>
          <p>The title is a promise to myself, not to you. When the essay exists it will be here; until then this page is served noindex.</p>
        </div>
      )}

      {e.artefact && <ArtefactLine pointer={e.artefact} verb="The thing itself" />}
      <p className="backlinks"><a href="/why/">← All essays</a></p>
    </PageShell>
  );
}
