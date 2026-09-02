import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs, personRef } from '@/lib/schema';
import { proofEngines, CHAPTER_COUNT } from '@/lib/github';
import { SITE_URL } from '@/lib/site';

/** Rebuilt twice a day so repository descriptions stay current without a deploy. */
export const revalidate = 43200;

export const metadata: Metadata = {
  title: 'Proof engines — The Renewables Migration',
  description:
    'Eleven public repositories, one per chapter, that recompute the load-bearing figures of The Renewables Migration from source data. Readers do not have to trust the book — they can run it.',
  alternates: { canonical: '/books/the-renewables-migration/proof-engines/' },
  openGraph: {
    images: [{ url: '/og-renewables.png', width: 1200, height: 630, alt: 'Chapter proof engines — The Renewables Migration' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-renewables.png'] },
};

export default async function ProofEnginesPage() {
  const engines = await proofEngines();
  const enriched = engines.filter((e) => e.enriched).length;

  const dataset = {
    '@context': 'https://schema.org',
    '@type': 'Collection',
    '@id': `${SITE_URL}/books/the-renewables-migration/proof-engines/#collection`,
    url: `${SITE_URL}/books/the-renewables-migration/proof-engines/`,
    name: 'Chapter proof engines — The Renewables Migration',
    description:
      'Public, runnable repositories that recompute the load-bearing figures of each chapter from source data.',
    creator: personRef,
    isPartOf: { '@id': `${SITE_URL}/books/the-renewables-migration/#book` },
    hasPart: engines.map((e) => ({
      '@type': 'SoftwareSourceCode',
      name: `Chapter ${e.chapter} proof engine`,
      codeRepository: e.url,
      url: e.url,
      ...(e.description ? { description: e.description } : {}),
      ...(e.language ? { programmingLanguage: e.language } : {}),
      author: personRef,
    })),
  };

  return (
    <main>
      <JsonLd data={dataset} />
      <JsonLd data={breadcrumbs([
        { name: 'Books', path: '/books/' },
        { name: 'The Renewables Migration', path: '/books/the-renewables-migration/' },
        { name: 'Proof engines', path: '/books/the-renewables-migration/proof-engines/' },
      ])} />

      <div className="sheet">
        <div className="section">
          <span className="kicker">The Renewables Migration · verification</span>
          <h1 className="page-title">Don’t trust the book — run it</h1>
          <p className="intro">
            Every chapter of The Renewables Migration ships with a public repository that
            recomputes that chapter’s load-bearing figures from source data. A reader who doubts
            a number does not have to argue about it: they can clone the engine and execute the
            argument. {CHAPTER_COUNT} chapters, {CHAPTER_COUNT} engines, no exceptions.
          </p>

          <div className="pe-grid">
            {engines.map((e) => (
              <a className="pe-card" key={e.chapter} href={e.url} rel="noopener noreferrer">
                <span className="pe-num">Chapter {e.chapter}</span>
                <p className="pe-desc">
                  {e.description ?? 'Proof engine repository — open on GitHub for the current description.'}
                </p>
                <div className="pe-meta">
                  {e.language && <span className="pe-lang">{e.language}</span>}
                  {e.updated && <span>updated {e.updated}</span>}
                  {typeof e.stars === 'number' && e.stars > 0 && <span>★ {e.stars}</span>}
                </div>
                {e.topics.length > 0 && (
                  <div className="topic-chips">
                    {e.topics.map((t) => <span key={t}>{t}</span>)}
                  </div>
                )}
                <span className="cta">Open repository →</span>
              </a>
            ))}
          </div>

          {enriched === 0 && (
            <p className="pe-note">
              Repository descriptions could not be loaded from GitHub for this build. The links
              above are correct and open the live repositories; the summaries return on the next
              revalidation.
            </p>
          )}

          <div className="cta-row" style={{ marginTop: '2.5rem' }}>
            <a className="btn btn-dark" href="/books/the-renewables-migration/">Back to the book</a>
            <a className="btn btn-line" href="/topics/">The engineering, explained</a>
          </div>
        </div>
      </div>
    </main>
  );
}
