import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/** Static export: generated once per deploy — lastModified = build date. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  ) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority });

  return [
    entry('/', 1.0, 'weekly'),
    entry('/now/', 0.8, 'weekly'),
    entry('/books/', 0.8, 'monthly'),
    entry('/books/the-renewables-migration/', 0.7, 'monthly'),
    entry('/books/the-orbital-ai-compute-roadmap/', 0.7, 'monthly'),
    entry('/contact/', 0.9, 'yearly'),
    entry('/imprint/', 0.2, 'yearly'),
    entry('/privacy/', 0.2, 'yearly'),
  ];
}
