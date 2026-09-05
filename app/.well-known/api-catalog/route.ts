import { ENDPOINTS } from '@/lib/cluster-api';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * /.well-known/api-catalog — RFC 9727 API catalog, as a linkset (RFC 9264).
 *
 * The standard way for a client to discover which APIs a host publishes:
 * one JSON document listing every API with its OpenAPI description and
 * documentation. Advertised from every response with a
 * `Link: </.well-known/api-catalog>; rel="api-catalog"` header (vercel.json).
 */
export function GET() {
  const linkset = {
    linkset: [
      {
        anchor: `${SITE_URL}/api/cluster/`,
        'service-desc': [{ href: `${SITE_URL}/openapi.json`, type: 'application/vnd.oai.openapi+json;version=3.1' }],
        'service-doc': [{ href: `${SITE_URL}/cluster/map/`, type: 'text/html' }, { href: `${SITE_URL}/llms.txt`, type: 'text/plain' }],
        'service-meta': [{ href: `${SITE_URL}/api/cluster/schema/`, type: 'application/schema+json' }, { href: `${SITE_URL}/ai.txt`, type: 'text/plain' }],
        status: [{ href: `${SITE_URL}/api/cluster/roadmap/`, type: 'application/json' }],
        item: ENDPOINTS.map((e) => ({ href: `${SITE_URL}${e.path}`, title: e.summary })),
      },
    ],
  };
  return new Response(JSON.stringify(linkset, null, 2), {
    headers: { 'Content-Type': 'application/linkset+json; charset=utf-8', 'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800' },
  });
}
