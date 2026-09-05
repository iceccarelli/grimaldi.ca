import type { Metadata } from 'next';
import ClusterHeader from '@/components/cluster/ClusterHeader';
import { FINAL_RULE, LOOP, MANDATE_ROLE, MANDATE_TITLE, mandate, PRIMARY_KPI, SECONDARY_KPIS } from '@/content/cluster';

export const metadata: Metadata = {
  title: 'Mandate',
  description:
    'The operating mandate of Agent 3 — Operations & Commercial Automation, revenue first: sixteen sections from repositories under control to the 90-day objective, and the final rule.',
  alternates: { canonical: '/cluster/mandate/' },
};

export default function MandatePage() {
  return (
    <main className="cr">
      <ClusterHeader
        path="/cluster/mandate/"
        title={MANDATE_TITLE}
        kicker="Agent 3 · mandate"
        intro={MANDATE_ROLE}
      >
        <p className="cr-meta">
          <span>primary KPI: <strong>{PRIMARY_KPI}</strong></span>
          <span>secondary: {SECONDARY_KPIS.join(' · ')}</span>
        </p>
      </ClusterHeader>

      <aside className="cr-rule" style={{ marginTop: 0 }}>
        Not a research laboratory. No generic SaaS infrastructure without a customer-driven reason.
        The job is to turn existing operational software into a profitable, repeatable business.
      </aside>

      <div style={{ maxWidth: 'var(--max)' }}>
        {mandate.map((s) => (
          <section className="cr-section" key={s.n} aria-labelledby={`m-${s.n}`} style={{ marginTop: '2rem' }}>
            <h2 id={`m-${s.n}`}>
              <span className="cr-record-id">{s.n}.</span> {s.title}
            </h2>
            <p>{s.lead}</p>
            {s.items && (
              <ul className="topic-body" style={{ marginTop: '.4rem', paddingLeft: '1.2rem' }}>
                {s.items.map((it) => <li key={it} style={{ marginBottom: '.25rem' }}>{it}</li>)}
              </ul>
            )}
            {s.rule && <aside className="cr-rule">{s.rule}</aside>}
          </section>
        ))}

        <section className="cr-section" aria-labelledby="m-final">
          <h2 id="m-final">Final rule</h2>
          <p>This cluster exists to make money.</p>
          <ul className="topic-body" style={{ paddingLeft: '1.2rem' }}>
            {FINAL_RULE.map((r) => <li key={r} style={{ marginBottom: '.25rem' }}>{r}</li>)}
          </ul>
          <p className="cr-loop">{LOOP.join(' · ')}</p>
        </section>
      </div>
    </main>
  );
}
