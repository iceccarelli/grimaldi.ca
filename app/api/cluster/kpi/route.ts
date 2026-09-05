import { kpis, KPI_CURRENCY } from '@/content/cluster';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/** /api/cluster/kpi/ — the KPI system. Null = not yet measured. */
export function GET() {
  return Response.json(
    {
      $schema: `${SITE_URL}/api/cluster/kpi/`,
      generated: new Date().toISOString(),
      currency: KPI_CURRENCY,
      measured: kpis.filter((k) => k.value !== null).length,
      total: kpis.length,
      rule: 'A value is present only when measured from the named source on the stated date. Null is not zero.',
      items: kpis,
    },
    { headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' } },
  );
}
