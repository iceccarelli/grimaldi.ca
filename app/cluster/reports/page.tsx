import type { Metadata } from 'next';
import ClusterHeader from '@/components/cluster/ClusterHeader';
import { REPORT_FIELDS, reports, type WeeklyReport } from '@/content/cluster';

export const metadata: Metadata = {
  title: 'Weekly CEO reports',
  description:
    'Weekly CEO reports of the Operations cluster — revenue, MRR, ARR, pipeline, leads, qualified opportunities, conversion, churn, retention, gross margin, customer requests, top workflow, top failure, competitive change, features killed, customers won and lost, next 7 days.',
  alternates: { canonical: '/cluster/reports/' },
};

function cell(v: WeeklyReport[keyof WeeklyReport]): string {
  if (v === null || v === undefined) return 'not measured';
  if (Array.isArray(v)) return v.length ? v.join('; ') : 'none';
  return String(v);
}

export default function ReportsPage() {
  const rows = [...reports].sort((a, b) => b.week.localeCompare(a.week));

  return (
    <main className="cr">
      <ClusterHeader
        path="/cluster/reports/"
        title="Weekly CEO report"
        intro="One report per ISO week, in the eighteen fields the mandate lists, in that order. Outcomes, not activity. A number not measured that week says so."
      >
        <p className="cr-meta">
          <span>{reports.length} report{reports.length === 1 ? '' : 's'} filed</span>
        </p>
      </ClusterHeader>

      <div style={{ maxWidth: 'var(--max)' }}>
        {rows.length === 0 && (
          <aside className="cr-empty" style={{ marginBottom: '1.4rem' }}>
            <strong>No report filed yet.</strong> The first is due at the end of the first full week of the validation
            period. Below is the template; a report is one entry in <code>content/cluster/reports.ts</code>.
          </aside>
        )}

        {rows.map((r) => (
          <article className="cr-record" key={r.week} id={r.week}>
            <h2 style={{ fontSize: '1.08rem', margin: '0 0 .3rem' }}>
              <span className="cr-record-id">{r.week} · filed {r.filed}</span>
            </h2>
            <dl className="cr-facts" style={{ marginTop: '.6rem' }}>
              {REPORT_FIELDS.map((f) => (
                <div key={f.key} style={{ display: 'contents' }}>
                  <dt>{f.label}</dt>
                  <dd>{cell(r[f.key])}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}

        <section className="cr-section" aria-labelledby="h-tmpl">
          <h2 id="h-tmpl">Template</h2>
          <div className="cr-table-wrap">
            <table className="cr-table" style={{ minWidth: 0 }}>
              <caption>The eighteen fields, in mandate order</caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Field</th>
                  <th scope="col">Type</th>
                </tr>
              </thead>
              <tbody>
                {REPORT_FIELDS.map((f, i) => (
                  <tr key={f.key}>
                    <td className="num">{i + 1}</td>
                    <th scope="row" style={{ fontWeight: 600 }}>{f.label}</th>
                    <td className="dim">
                      {['customerRequests', 'featuresKilled', 'customersWon', 'customersLost', 'next7Days'].includes(f.key)
                        ? 'list'
                        : ['topWorkflow', 'topFailure', 'competitiveChange'].includes(f.key)
                          ? 'text or null'
                          : 'number or null (not measured)'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
