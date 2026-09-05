import { REGISTRY_REVIEWED, registry } from '@/content/cluster';
import { registryMeta } from '@/lib/github';
import { countByStatus } from '@/lib/cluster';
import { SITE_URL } from '@/lib/site';

/** Rebuilt twice a day with live GitHub metadata, like the registry page. */
export const revalidate = 43200;

/**
 * /api/cluster/registry/ — the registry with live GitHub enrichment.
 * `github.enriched` is false when the API could not be reached; the fields
 * are then null rather than stale.
 */
export async function GET() {
  const meta = await registryMeta(registry.map((r) => r.repo));
  return Response.json(
    {
      $schema: `${SITE_URL}/api/cluster/registry/`,
      generated: new Date().toISOString(),
      reviewed: REGISTRY_REVIEWED,
      countByStatus: countByStatus(),
      entries: registry.map((r) => ({
        ...r,
        url: `${SITE_URL}/cluster/registry/${r.slug}/`,
        github: r.repo ? meta[r.repo] ?? null : null,
      })),
    },
    { headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' } },
  );
}
