import { notFound } from 'next/navigation';
import { API_HEADERS, resourceById, resources } from '@/lib/cluster-api';
import { SITE_URL } from '@/lib/site';

/**
 * /api/cluster/{resource}/ — one resource of the cluster state.
 *
 * The resource table in lib/cluster-api.ts is the single source: this route,
 * the OpenAPI description, the API catalog and llms.txt all read from it.
 * Every resource prerenders; an unknown resource is a 404, not a guess.
 */
export const revalidate = 43200;
export const dynamicParams = false;

export function generateStaticParams() {
  return resources.map((r) => ({ resource: r.id }));
}

export function GET(_req: Request, { params }: { params: { resource: string } }) {
  const r = resourceById(params.resource);
  if (!r) notFound();
  return Response.json(
    {
      $schema: `${SITE_URL}/api/cluster/schema/`,
      resource: r.id,
      summary: r.summary,
      generated: new Date().toISOString(),
      data: r.payload(),
    },
    { headers: API_HEADERS },
  );
}
