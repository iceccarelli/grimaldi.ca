import type { Metadata } from 'next';
import ClusterHeader from '@/components/cluster/ClusterHeader';
import { decisions, killList } from '@/content/cluster';

export const metadata: Metadata = {
  title: 'Decisions',
  description:
    'Decision log and kill list of the Operations cluster: architecture-decision records with context, decision and consequences, CEO approval where the constitution requires it, and what has been frozen, killed or archived.',
  alternates: { canonical: '/cluster/decisions/' },
};

export default function DecisionsPage() {
  const rows = [...decisions].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));

  return (
    <main className="cr">
      <ClusterHeader
        path="/cluster/decisions/"
        title="Decision log and kill list"
        intro="Every decision that changed a status, started or stopped work, or bound the cluster to a rule — with its context and consequences. Decisions that move a repository between clusters or start a project require CEO approval and say so."
      >
        <p className="cr-meta">
          <span>{decisions.length} decisions</span>
          <span>{decisions.filter((d) => d.status === 'proposed').length} proposed</span>
          <span>{killList.length} on the kill list</span>
        </p>
      </ClusterHeader>

      <div style={{ maxWidth: 'var(--max)' }}>
        <section aria-labelledby="h-kill" className="cr-section" style={{ marginTop: 0 }}>
          <h2 id="h-kill">Kill list</h2>
          {killList.length === 0 ? (
            <aside className="cr-empty">
              <strong>Nothing frozen or killed yet.</strong> Correct for a cluster at the start of its validation
              period. An empty list at the end of the period is a red flag, not a comfort — the hard kill rule
              (§11) says a vertical without commercial evidence is frozen.
            </aside>
          ) : (
            killList.map((k) => (
              <article className="cr-record cr-record--kill" key={k.id} id={k.id}>
                <h3>
                  <span className="cr-record-id">{k.id} · {k.date}</span>
                  <br />
                  {k.what}
                  <span className="cr-tag cr-tag--kill">{k.outcome}</span>
                </h3>
                <p><strong>Failed:</strong> {k.failed.join(', ')}.</p>
                <p>{k.reason}</p>
              </article>
            ))
          )}
        </section>

        <section aria-labelledby="h-log" className="cr-section">
          <h2 id="h-log">Decision log</h2>
          {rows.map((d) => (
            <article className={`cr-record${d.status === 'proposed' ? ' cr-record--proposed' : ''}`} key={d.id} id={d.id}>
              <h3>
                <span className="cr-record-id">{d.id} · {d.date}</span>
                <br />
                {d.title}
                <span className={`cr-tag${d.status === 'accepted' ? ' cr-tag--accepted' : ''}`}>{d.status}</span>
              </h3>
              <p><strong>Context.</strong> {d.context}</p>
              <p><strong>Decision.</strong> {d.decision}</p>
              <p><strong>Consequences.</strong> {d.consequences}</p>
              <p className="dim" style={{ fontSize: '.88rem' }}>
                {d.requiresCeoApproval
                  ? d.approvedBy
                    ? `CEO approval required — approved by ${d.approvedBy}.`
                    : 'CEO approval required — pending.'
                  : 'Within the agent’s own authority.'}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
