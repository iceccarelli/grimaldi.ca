import type { MetadataRoute } from 'next';
import { publishedTopics } from '@/content/topics';
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
    entry('/topics/', 0.9, 'weekly'),
    entry('/now/', 0.8, 'weekly'),
    entry('/books/', 0.8, 'monthly'),
    entry('/books/the-renewables-migration/', 0.7, 'monthly'),
    entry('/books/the-orbital-ai-compute-roadmap/', 0.7, 'monthly'),
    entry('/contact/', 0.9, 'yearly'),
    entry('/imprint/', 0.2, 'yearly'),
    entry('/privacy/', 0.2, 'yearly'),
    ...publishedTopics().map((t) =>
      entry(`/topics/${t.slug}/`, 0.8, 'monthly', new Date(t.updated)),
    ),
  ];
}
