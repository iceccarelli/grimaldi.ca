import type { Metadata } from 'next';
import ClusterHeader from '@/components/cluster/ClusterHeader';
import { agents } from '@/content/cluster';

export const metadata: Metadata = {
  title: 'Agents',
  description:
    'The agentic workflows of the Operations cluster — estimation, sales, operations and finance agents — each specified by its steps, explicit permissions, prohibitions and the human approval step. No uncontrolled autonomous financial or customer-facing action.',
  alternates: { canonical: '/cluster/agents/' },
};

export default function AgentsPage() {
  return (
    <main className="cr">
      <ClusterHeader
        path="/cluster/agents/"
        title="Agentic workflows"
        intro="Four agents, each built around one economic workflow. The permissions are written before the code so that the code has a contract to be tested against. Every agent ends at a human approval."
      >
        <p className="cr-meta">
          {(['specified', 'building', 'piloting', 'frozen'] as const).map((s) => (
            <span key={s}>{s}: {agents.filter((a) => a.status === s).length}</span>
          ))}
        </p>
      </ClusterHeader>

      <aside className="cr-rule" style={{ marginTop: 0 }}>
        No uncontrolled autonomous financial or customer-facing action. Every agent has explicit permissions.
      </aside>

      <div className="cr-grid">
        {agents.map((a) => (
          <article className="cr-repo" key={a.id} aria-labelledby={`a-${a.id}`}>
            <div className="cr-repo-head">
              <h2 id={`a-${a.id}`}>{a.name}</h2>
              <span className="cr-tag" style={{ marginLeft: 0 }}>{a.status}</span>
            </div>
            <p className="cr-repo-desc">{a.steps.join(' → ')}</p>
            <dl className="cr-facts" style={{ gridTemplateColumns: '6rem 1fr', marginTop: '.4rem', fontSize: '.92rem' }}>
              <dt>May</dt>
              <dd>{a.may.join('; ')}.</dd>
              <dt>May not</dt>
              <dd>{a.mayNot.join('; ')}.</dd>
              <dt>Approval</dt>
              <dd>{a.approval}</dd>
            </dl>
          </article>
        ))}
      </div>
    </main>
  );
}
