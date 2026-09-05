import type { MetadataRoute } from 'next';
import { publishedTopics } from '@/content/topics';
import { registry } from '@/content/cluster';
import { CLUSTER_SECTIONS } from '@/components/cluster/ClusterNav';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * Static routes, every control-room section, every registry entry, and every
 * PUBLISHED topic. Drafts are absent by construction: the list comes from
 * publishedTopics(), so no one can forget to exclude one. The cluster routes
 * come from the same lists the navigation and the registry render from.
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
    entry('/', 1.0, 'daily'),
    ...CLUSTER_SECTIONS.map((s) => entry(s.href, s.href === '/cluster/registry/' ? 0.9 : 0.8, 'weekly')),
    ...registry.map((r) => entry(`/cluster/registry/${r.slug}/`, 0.7, 'weekly', new Date(r.reviewed))),
    entry('/about/', 0.8, 'monthly'),
    entry('/topics/', 0.8, 'weekly'),
    entry('/now/', 0.6, 'weekly'),
    entry('/books/', 0.8, 'monthly'),
    entry('/books/the-renewables-migration/', 0.7, 'monthly'),
    entry('/books/the-renewables-migration/proof-engines/', 0.7, 'monthly'),
    entry('/books/the-orbital-ai-compute-roadmap/', 0.7, 'monthly'),
    entry('/contact/', 0.9, 'yearly'),
    entry('/imprint/', 0.2, 'yearly'),
    entry('/privacy/', 0.2, 'yearly'),
    ...publishedTopics().map((t) =>
      entry(`/topics/${t.slug}/`, 0.8, 'monthly', new Date(t.updated)),
    ),
  ];
}
