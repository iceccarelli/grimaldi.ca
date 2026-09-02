import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs } from '@/lib/schema';
import { allTopics, publishedTopics } from '@/content/topics';
import { readingMinutes } from '@/content/types';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Topics',
  description:
    'Technical explainers on grid digitalisation, power system stability and industrial control security — the engineering behind the work of Vincenzo Ceccarelli Grimaldi.',
  alternates: { canonical: '/topics/' },
  openGraph: {
    images: [{ url: '/og-topics.png', width: 1200, height: 630, alt: 'Topics — technical explainers' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-topics.png'] },
};

export default function TopicsPage() {
  const published = publishedTopics();
  const drafts = allTopics.filter((t) => t.status === 'draft');

  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/topics/#page`,
    url: `${SITE_URL}/topics/`,
    name: 'Topics',
    inLanguage: 'en',
    hasPart: published.map((t) => ({
      '@type': 'TechArticle',
      '@id': `${SITE_URL}/topics/${t.slug}/#article`,
      name: t.title,
      url: `${SITE_URL}/topics/${t.slug}/`,
    })),
  };

  return (
    <main>
      <JsonLd data={collection} />
      <JsonLd data={breadcrumbs([{ name: 'Topics', path: '/topics/' }])} />
      <div className="sheet" style={{ marginTop: 0 }}>
        <div className="section">
          <span className="kicker">Topics</span>
          <h1 className="page-title">The engineering, explained</h1>
          <p className="intro">
            Reference explainers on the systems this work touches: power system stability, grid
            digitalisation and the security of industrial control networks. Written to be cited —
            every claim carries its source, and nothing is published before it has been checked.
            The full index, including the niche explainers still being written, is at{' '}
            <a href="/explain/" style={{ color: 'var(--terra)', fontWeight: 600 }}>/explain</a>.
          </p>

          {published.length > 0 && (
            <div className="topic-list">
              {published.map((t) => (
                <a className="topic-row" key={t.slug} href={`/topics/${t.slug}/`}>
                  <div>
                    <h3>{t.title}</h3>
                    <p>{t.description}</p>
                    <div className="topic-chips">
                      {t.subjects.slice(0, 3).map((s) => <span key={s}>{s}</span>)}
                    </div>
                  </div>
                  <span className="topic-meta">{readingMinutes(t)} min · {t.updated}</span>
                </a>
              ))}
            </div>
          )}

          {published.length === 0 && (
            <div className="card" style={{ maxWidth: 760 }}>
              <h2>Nothing published yet</h2>
              <p>
                {drafts.length} explainer{drafts.length === 1 ? ' is' : 's are'} written and awaiting
                review. Nothing appears here, in the sitemap or in the feeds until it has been
                checked line by line — an authority page is worth less than nothing if a number in
                it is wrong.
              </p>
              <a className="cta" href="/contact/">Tell me what to write about →</a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
