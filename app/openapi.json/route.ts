import { ENDPOINTS, resources } from '@/lib/cluster-api';
import { jsonSchema } from '@/lib/json-schema';
import { CLUSTER, PERSON, SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * /openapi.json — OpenAPI 3.1 description of every read-only endpoint.
 *
 * Generated from the same endpoint table as the routes themselves, and the
 * same JSON Schema as /api/cluster/schema/, so an agent can load this one
 * document and call the API correctly without reading a page.
 */
export function GET() {
  const paths: Record<string, unknown> = {};
  for (const e of ENDPOINTS) {
    const isJson = e.schema !== 'atom';
    const params = e.path.includes('{slug}')
      ? [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' }, description: 'Registry entry slug, e.g. ecowoods-app.' }]
      : [];
    paths[e.path] = {
      get: {
        operationId: `get${e.path.replace(/[{}]/g, '').split(/[\/.-]/).filter(Boolean).map((s) => s[0].toUpperCase() + s.slice(1)).join('')}`,
        summary: e.summary,
        parameters: params,
        responses: {
          '200': {
            description: 'OK',
            content: isJson
              ? { 'application/json': { schema: e.schema === 'object' ? { type: 'object' } : { $ref: `#/components/schemas/${e.schema}` } } }
              : { 'application/atom+xml': { schema: { type: 'string' } } },
          },
          ...(params.length ? { '404': { description: 'Unknown slug.' } } : {}),
        },
      },
    };
  }

  const doc = {
    openapi: '3.1.0',
    info: {
      title: `${CLUSTER.name} — cluster API`,
      version: '1.0.0',
      summary: 'Read-only state of the Operations & Commercial Automation cluster of Grimaldi Engineering.',
      description:
        'Every endpoint is static or revalidated twice a day. Null on a KPI value means not yet measured — never zero. Roadmap progress is counted from the evidence log. GitHub fields are fetched live and null when unreachable. Resources: ' +
        resources.map((r) => r.id).join(', ') +
        '.',
      contact: { name: PERSON.legalName, email: PERSON.email, url: `${SITE_URL}/contact/` },
      license: { name: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/' },
      'x-llms-txt': `${SITE_URL}/llms.txt`,
      'x-ai-txt': `${SITE_URL}/ai.txt`,
    },
    servers: [{ url: SITE_URL }],
    externalDocs: { description: 'The control room', url: `${SITE_URL}/` },
    paths,
    components: { schemas: jsonSchema.$defs },
  };

  return new Response(JSON.stringify(doc, null, 2), {
    headers: { 'Content-Type': 'application/vnd.oai.openapi+json; version=3.1; charset=utf-8', 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' },
  });
}
