import type { Metadata } from 'next';
import ClusterHeader from '@/components/cluster/ClusterHeader';
import KpiStrip from '@/components/cluster/KpiStrip';
import { kpis, KPI_CURRENCY } from '@/content/cluster';
import { measuredKpis } from '@/lib/cluster';

export const metadata: Metadata = {
  title: 'KPIs',
  description:
    'The KPI system of the Operations cluster: revenue as the primary KPI, then retention, gross margin, customer acquisition, time saved, conversion and implementation speed — each defined, sourced, and shown as measured or not yet measured.',
  alternates: { canonical: '/cluster/kpi/' },
};

export default function KpiPage() {
  const measured = measuredKpis();
  const primary = kpis.filter((k) => k.rank === 'primary');
  const secondary = kpis.filter((k) => k.rank === 'secondary');
  const derived = kpis.filter((k) => k.rank === 'derived');

  return (
    <main className="cr">
      <ClusterHeader
        path="/cluster/kpi/"
        title="KPI system"
        intro="Revenue first. Fourteen indicators, each with a definition and the source it is measured from. A value appears only when it has been measured; the strip never shows a zero that was not counted."
      >
        <p className="cr-meta">
          <span>{measured.length} of {kpis.length} measured</span>
          <span>currency {KPI_CURRENCY} (the proving ground invoices in Toronto)</span>
          <span>machine-readable <a className="url" href="/api/cluster/kpi/">/api/cluster/kpi/</a></span>
        </p>
      </ClusterHeader>

      <section className="cr-section" aria-labelledby="h-p" style={{ marginTop: 0 }}>
        <h2 id="h-p">Primary</h2>
        <KpiStrip kpis={primary} />
      </section>
      <section className="cr-section" aria-labelledby="h-s">
        <h2 id="h-s">Secondary</h2>
        <KpiStrip kpis={secondary} />
      </section>
      <section className="cr-section" aria-labelledby="h-d">
        <h2 id="h-d">Derived</h2>
        <KpiStrip kpis={derived} />
      </section>

      <section className="cr-section" aria-labelledby="h-def">
        <h2 id="h-def">Definitions</h2>
        <div className="cr-table-wrap">
          <table className="cr-table">
            <caption>Every KPI, how it is defined, where it is measured</caption>
            <thead>
              <tr>
                <th scope="col">KPI</th>
                <th scope="col">Rank</th>
                <th scope="col">Unit</th>
                <th scope="col">Definition</th>
                <th scope="col">Source</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((k) => (
                <tr key={k.id}>
                  <th scope="row" style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{k.label}</th>
                  <td>{k.rank}</td>
                  <td>{k.unit}</td>
                  <td>{k.definition}</td>
                  <td className="dim">{k.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="cr-rule">
        Do not optimize vanity metrics. Optimize for ARR, gross margin, retention, CAC and payback
        period — and report outcomes, not activity.
      </aside>
    </main>
  );
}
