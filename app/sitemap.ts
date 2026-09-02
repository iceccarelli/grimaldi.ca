import type { MetadataRoute } from 'next';
import { publishedTopics } from '@/content/topics';
import { publishedNotes } from '@/content/log';
import { publishedEpisodes } from '@/content/podcast';
import { publishedEssays } from '@/content/why';
import { publishedReviews } from '@/content/reviews';
import { publishedExplainers } from '@/content/explain';
import { books, serialisedChapters } from '@/content/books';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * Static routes plus every PUBLISHED topic. Drafts are absent by construction:
 * the list comes from publishedTopics(), so no one can forget to exclude one.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    lastModified: Date = now,
  ) => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency, priority });

  return [
    entry('/', 1.0, 'weekly'),
    entry('/log/', 0.9, 'weekly'),
    entry('/podcast/', 0.9, 'weekly'),
    entry('/reviews/', 0.7, 'monthly'),
    entry('/explain/', 0.8, 'monthly'),
    entry('/topics/', 0.6, 'monthly'),
    entry('/why/', 0.7, 'monthly'),
    entry('/books/', 0.8, 'monthly'),
    entry('/books/the-renewables-migration/', 0.7, 'monthly'),
    entry('/books/the-renewables-migration/proof-engines/', 0.7, 'monthly'),
    entry('/books/the-orbital-ai-compute-roadmap/', 0.7, 'monthly'),
    entry('/now/', 0.8, 'weekly'),
    entry('/archive/', 0.5, 'monthly'),
    entry('/network/', 0.4, 'yearly'),
    entry('/subscribe/', 0.5, 'yearly'),
    entry('/contact/', 0.6, 'yearly'),
    entry('/imprint/', 0.2, 'yearly'),
    entry('/privacy/', 0.2, 'yearly'),
    // /travel/ is deliberately absent: an empty slot is not a page to index.
    ...publishedNotes().map((n) => entry(`/log/${n.slug}/`, 0.8, 'monthly', new Date(n.date))),
    ...publishedEpisodes().map((e) => entry(`/podcast/${e.slug}/`, 0.7, 'monthly')),
    ...publishedEssays().map((n) => entry(`/why/${n.slug}/`, 0.7, 'yearly', new Date(n.date))),
    ...publishedReviews().map((r) => entry(`/reviews/${r.slug}/`, 0.7, 'monthly', new Date(r.updated))),
    ...publishedTopics().map((t) => entry(`/topics/${t.slug}/`, 0.8, 'monthly', new Date(t.updated))),
    ...publishedExplainers().map((t) => entry(`/explain/${t.slug}/`, 0.8, 'monthly', new Date(t.updated))),
    ...books.flatMap((b) =>
      serialisedChapters(b).map((c) => entry(`/books/${b.slug}/chapter-${c.number}/`, 0.7, 'monthly')),
    ),
  ];
}
