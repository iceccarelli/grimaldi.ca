import { publishedTopics } from '@/content/topics';
import { readingMinutes } from '@/content/types';

/**
 * TopicsShelf — the knowledge layer, surfaced on the homepage.
 *
 * A visitor arriving from LinkedIn or a search result lands on `/`. Before
 * this, the homepage said nothing about the explainers at all: the only route
 * to the site's most valuable content was the nav bar. That is a conversion
 * defect, not a design preference.
 *
 * Server component, rendered by the page shell and passed into the client
 * sections as a prop — so the topic text never enters the client bundle.
 *
 * Renders NOTHING when no topic is published. No empty shelf, no promise of
 * writing that does not exist; the section appears by itself the moment a
 * topic's status flips to 'published'.
 */
export default function TopicsShelf() {
  const topics = publishedTopics();
  if (topics.length === 0) return null;

  return (
    <div className="section" id="topics">
      <span className="kicker">The engineering, explained</span>
      <h2>Reference explainers</h2>
      <p className="intro">
        Long-form technical writing on the systems this work touches — power system stability,
        grid digitalisation, and the security of industrial control networks. Every claim carries
        its source, and nothing is published before it has been checked.
      </p>
      <div className="topic-list">
        {topics.slice(0, 4).map((t) => (
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
      {topics.length > 4 && (
        <p style={{ marginTop: '1.4rem' }}>
          <a className="cta" href="/topics/">All {topics.length} explainers →</a>
        </p>
      )}
    </div>
  );
}
