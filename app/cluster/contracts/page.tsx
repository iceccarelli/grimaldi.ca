import type { Metadata } from 'next';
import ClusterHeader from '@/components/cluster/ClusterHeader';
import { clusters, contracts } from '@/content/cluster';

export const metadata: Metadata = {
  title: 'Contracts',
  description:
    'Versioned integration contracts between the Operations cluster and the Energy Intelligence and Physical AI clusters — OperationalEvent, WorkOrder, InspectionResult — with field-level schemas and the independence guarantee that no system requires another to function.',
  alternates: { canonical: '/cluster/contracts/' },
};

const name = (id: string) => clusters.find((c) => c.id === id)?.name ?? id;

export default function ContractsPage() {
  return (
    <main className="cr">
      <ClusterHeader
        path="/cluster/contracts/"
        title="Cross-cluster contracts"
        intro="Integration through contracts, not spaghetti dependencies. Each has a producer, a consumer, a version, a field-level schema and a statement of how both sides keep working when the other is absent. Status proposed means documented here and nowhere else."
      >
        <p className="cr-meta">
          <span>{contracts.length} contracts</span>
          {(['proposed', 'draft', 'versioned', 'deprecated'] as const).map((s) => (
            <span key={s}>{s}: {contracts.filter((c) => c.status === s).length}</span>
          ))}
        </p>
      </ClusterHeader>

      <div className="cr-arch" style={{ marginBottom: '2rem' }}>
        <div className="cr-arch-row">
          <div className="cr-arch-box">Energy Intelligence<small>detects an asset anomaly</small></div>
          <div className="cr-arch-box cr-arch-box--os">Operations<small>creates an inspection work order — human approved</small></div>
          <div className="cr-arch-box">Physical AI<small>performs the inspection under its own safety chain</small></div>
          <div className="cr-arch-box">Energy Intelligence<small>receives the result on the asset</small></div>
        </div>
        <div className="cr-arch-flow">
          OperationalEvent → WorkOrder → InspectionResult. Powerful — and none of the three systems requires the others to function.
        </div>
      </div>

      {contracts.map((c) => (
        <section className="cr-section" key={c.id} id={c.id} aria-labelledby={`c-${c.id}`} style={{ marginTop: '2rem' }}>
          <h2 id={`c-${c.id}`}>
            <code>{c.name}</code> <span className="dim" style={{ fontSize: '.9rem' }}>v{c.version}</span>
            <span className="cr-tag">{c.status}</span>
          </h2>
          <p className="cr-meta" style={{ marginBottom: '.6rem' }}>
            <span>producer: {name(c.producer)}</span>
            <span>consumer: {name(c.consumer)}</span>
          </p>
          <p className="intro" style={{ marginBottom: '1rem' }}>{c.summary}</p>
          <div className="cr-table-wrap">
            <table className="cr-table">
              <caption>Schema — {c.name} v{c.version}</caption>
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Type</th>
                  <th scope="col">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {c.schema.map((f) => (
                  <tr key={f.field}>
                    <th scope="row"><code>{f.field}</code></th>
                    <td><code>{f.type}</code></td>
                    <td>{f.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '.95rem' }}><strong>Independence.</strong> {c.independence}</p>
        </section>
      ))}

      <aside className="cr-rule">
        Shared infrastructure — authentication, billing, observability, deployment tooling, AI model gateway,
        secrets, analytics, audit logging, documentation tooling — is a separate, economic decision. Domain
        logic is never shared for elegance.
      </aside>
    </main>
  );
}
