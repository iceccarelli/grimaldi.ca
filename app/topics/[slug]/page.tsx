import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs, personRef } from '@/lib/schema';
import { allTopics, topicBySlug } from '@/content/topics';
import { readingMinutes, wordCount, type Block } from '@/content/types';
import { PERSON, SITE_URL } from '@/lib/site';

type Params = { params: { slug: string } };

/** Every topic prerenders; nothing here is dynamic at request time. */
export function generateStaticParams() {
  return allTopics.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const topic = topicBySlug(params.slug);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.description,
    alternates: { canonical: `/topics/${topic.slug}/` },
    // A draft must never reach an index. This is the enforcement point.
    robots: topic.status === 'draft' ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'article',
      title: topic.title,
      description: topic.description,
      images: [{ url: '/og-topics.png', width: 1200, height: 630, alt: topic.title }],
    },
    twitter: { card: 'summary_large_image', images: ['/og-topics.png'] },
  };
}

function renderBlock(block: Block, i: number) {
  switch (block.kind) {
    case 'h':
      return <h3 key={i}>{block.text}</h3>;
    case 'p':
      return <p key={i}>{block.text}</p>;
    case 'list':
      return (
        <ul key={i}>
          {block.items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      );
    case 'note':
      return <aside className="topic-note" key={i}>{block.text}</aside>;
    case 'figure':
      return (
        <figure className="topic-figure" key={i}>
          <table>
            <caption>{block.caption}</caption>
            <tbody>
              {block.rows.map(([k, v], j) => (
                <tr key={j}><th scope="row">{k}</th><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
  }
}

export default function TopicPage({ params }: Params) {
  const topic = topicBySlug(params.slug);
  if (!topic) notFound();

  const article = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${SITE_URL}/topics/${topic.slug}/#article`,
    url: `${SITE_URL}/topics/${topic.slug}/`,
    headline: topic.title,
    description: topic.description,
    inLanguage: 'en',
    author: personRef,
    publisher: personRef,
    dateModified: topic.updated,
    wordCount: wordCount(topic),
    about: topic.subjects.map((name) => ({ '@type': 'Thing', name })),
    citation: topic.sources.map((s) => ({
      '@type': 'CreativeWork',
      name: s.title,
      publisher: { '@type': 'Organization', name: s.publisher },
      ...(s.url ? { url: s.url } : {}),
    })),
    isAccessibleForFree: true,
  };

  const glossary = topic.glossary?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        '@id': `${SITE_URL}/topics/${topic.slug}/#glossary`,
        name: `${topic.title} — glossary`,
        hasDefinedTerm: topic.glossary.map((g) => ({
          '@type': 'DefinedTerm',
          name: g.term,
          description: g.definition,
          inDefinedTermSet: `${SITE_URL}/topics/${topic.slug}/#glossary`,
        })),
      }
    : null;

  return (
    <main>
      <JsonLd data={article} />
      {glossary && <JsonLd data={glossary} />}
      <JsonLd data={breadcrumbs([
        { name: 'Topics', path: '/topics/' },
        { name: topic.title, path: `/topics/${topic.slug}/` },
      ])} />

      <div className="sheet" style={{ marginTop: 0 }}>
        <article className="section topic">
          <span className="kicker">
            Topic · {readingMinutes(topic)} min read · updated {topic.updated}
          </span>
          <h2>{topic.title}</h2>
          <p className="topic-standfirst">{topic.standfirst}</p>

          {topic.status === 'draft' && (
            <aside className="topic-draft" role="note">
              <strong>Unreviewed draft.</strong> This explainer has not yet been verified by{' '}
              {PERSON.legalName}. It is excluded from search engines, the sitemap and the feeds
              until every figure and standard reference in it has been checked.
            </aside>
          )}

          <div className="topic-chips">
            {topic.subjects.map((s) => <span key={s}>{s}</span>)}
          </div>

          <div className="topic-body">{topic.blocks.map(renderBlock)}</div>

          {topic.glossary?.length ? (
            <section className="topic-glossary">
              <h3>Terms</h3>
              <dl>
                {topic.glossary.map((g) => (
                  <div key={g.term}>
                    <dt>{g.term}</dt>
                    <dd>{g.definition}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <section className="topic-sources">
            <h3>Sources</h3>
            <ol>
              {topic.sources.map((s, i) => (
                <li key={i}>
                  <span className="src-pub">{s.publisher}</span> —{' '}
                  {s.url ? <a href={s.url} rel="noopener noreferrer nofollow">{s.title}</a> : s.title}
                </li>
              ))}
            </ol>
          </section>

          {topic.related?.length ? (
            <nav className="topic-related" aria-label="Related">
              <h3>Related</h3>
              {topic.related.map((r) => <a key={r.href} href={r.href}>{r.label} →</a>)}
            </nav>
          ) : null}

          <div className="cta-row" style={{ marginTop: '2.5rem' }}>
            <a className="btn btn-dark" href="/contact/">Discuss this work</a>
            <a className="btn btn-line" href="/topics/">All topics</a>
          </div>
        </article>
      </div>
    </main>
  );
}
