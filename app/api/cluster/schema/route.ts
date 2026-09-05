import { jsonSchema } from '@/lib/json-schema';
import { API_HEADERS } from '@/lib/cluster-api';

export const dynamic = 'force-static';

/** /api/cluster/schema/ — JSON Schema (draft 2020-12) for every record type the API serves. */
export function GET() {
  return new Response(JSON.stringify(jsonSchema, null, 2), {
    headers: { ...API_HEADERS, 'Content-Type': 'application/schema+json; charset=utf-8' },
  });
}
