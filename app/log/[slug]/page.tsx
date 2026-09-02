import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import Blocks from '@/components/Blocks';
import JsonLd from '@/components/JsonLd';
import { ArtefactLine, MetaLine } from '@/components/Meta';
import { allNotes, noteBySlug } from '@/content/log';
import { blocksWords, minutesFor } from '@/content/types';
import { personRef } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return allNotes.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const n = noteBySlug(params.slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.description,
    alternates: { canonical: `/log/${n.slug}/` },
    robots: n.status === 'draft' ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { type: 'article', title: n.title, description: n.description },
  };
}

export default function NotePage({ params }: Params) {
  const n = noteBySlug(params.slug);
  if (!n) notFound();

  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/log/${n.slug}/#post`,
    url: `${SITE_URL}/log/${n.slug}/`,
    headline: n.title,
    description: n.description,
    datePublished: n.date,
    dateModified: n.date,
    inLanguage: 'en',
    author: personRef,
    publisher: personRef,
    wordCount: blocksWords(n.blocks),
    ...(n.subjects ? { about: n.subjects.map((name) => ({ '@type': 'Thing', name })) } : {}),
    isAccessibleForFree: true,
  };

  return (
    <PageShell
      trail={[{ name: 'Log', path: '/log/' }, { name: n.title, path: `/log/${n.slug}/` }]}
      kicker={<>Field note · <time dateTime={n.date}>{n.date}</time></>}
      title={n.title}
      standfirst={n.description}
      narrow
    >
      <JsonLd data={article} />
      <MetaLine badge={n.badge} parts={[`${minutesFor(n.blocks)} min`, n.subjects?.join(' · ')]} />

      {n.blocks.length > 0 ? (
        <Blocks blocks={n.blocks} />
      ) : (
        <p className="quiet">Outline only — the note is not yet written.</p>
      )}

      {n.sources?.length ? (
        <section className="topic-sources">
          <h3>Sources</h3>
          <ol>
            {n.sources.map((s, i) => (
              <li key={i}>
                <span className="src-pub">{s.publisher}</span> —{' '}
                {s.url ? <a href={s.url} rel="noopener noreferrer nofollow">{s.title}</a> : s.title}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {n.artefact && <ArtefactLine pointer={n.artefact} verb="Check it" />}

      <p className="backlinks"><a href="/log/">← All notes</a></p>
    </PageShell>
  );
}
