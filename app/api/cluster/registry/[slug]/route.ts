import { notFound } from 'next/navigation';
import { registry, registryBySlug } from '@/content/cluster';
import { API_HEADERS } from '@/lib/cluster-api';
import { commitActivity, repoMeta } from '@/lib/github';
import { SITE_URL } from '@/lib/site';

/** /api/cluster/registry/{slug}/ — one entry, live GitHub metadata, 52-week commit activity. */
export const revalidate = 43200;
export const dynamicParams = false;

export function generateStaticParams() {
  return registry.map((r) => ({ slug: r.slug }));
}

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const r = registryBySlug(params.slug);
  if (!r) notFound();
  const [github, activity] = r.repo ? await Promise.all([repoMeta(r.repo), commitActivity(r.repo)]) : [null, null];
  return Response.json(
    {
      $schema: `${SITE_URL}/api/cluster/schema/#/$defs/RegistryEntry`,
      generated: new Date().toISOString(),
      entry: { ...r, url: `${SITE_URL}/cluster/registry/${r.slug}/`, github, activity },
    },
    { headers: API_HEADERS },
  );
}
