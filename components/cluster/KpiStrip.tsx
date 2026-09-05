import type { Kpi } from '@/content/cluster';
import { formatKpi } from '@/lib/cluster';

/**
 * The KPI strip. A KPI without a measurement says so in words; the number
 * slot is not filled with a dash that could be read as zero. Server component.
 */
export default function KpiStrip({ kpis, compact = false }: { kpis: Kpi[]; compact?: boolean }) {
  return (
    <dl className={`cr-kpis${compact ? ' cr-kpis--compact' : ''}`}>
      {kpis.map((k) => {
        const measured = k.value !== null;
        return (
          <div className={`cr-kpi cr-kpi--${k.rank}${measured ? '' : ' cr-kpi--empty'}`} key={k.id}>
            <dt>
              {k.label}
              {k.rank === 'primary' && <span className="cr-kpi-rank"> · primary</span>}
            </dt>
            <dd className="cr-kpi-value">{formatKpi(k)}</dd>
            <dd className="cr-kpi-meta">
              {measured ? (
                <>measured {k.measuredAt} · {k.source}</>
              ) : (
                <>source when measured: {k.source}</>
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
