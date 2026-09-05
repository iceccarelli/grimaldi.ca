import type { Metadata } from 'next';
import ClusterHeader from '@/components/cluster/ClusterHeader';
import ScoreHeatmap from '@/components/viz/ScoreHeatmap';
import { rankedWorkflows, SCORE_DIMENSIONS, workflowRank, type ScoreDimension } from '@/content/cluster';

export const metadata: Metadata = {
  title: 'Workflows',
  description:
    'Where contractors and field-service businesses lose money — fifteen workflows ranked by PAIN × FREQUENCY × BUDGET × URGENCY × ABILITY TO PAY × REPEATABILITY, scored only from customer conversations.',
  alternates: { canonical: '/cluster/workflows/' },
};

const DIM_LABEL: Record<ScoreDimension, string> = {
  pain: 'Pain',
  frequency: 'Frequency',
  budget: 'Budget',
  urgency: 'Urgency',
  abilityToPay: 'Ability to pay',
  repeatability: 'Repeatability',
};

export default function WorkflowsPage() {
  const rows = rankedWorkflows();
  const scored = rows.filter((w) => workflowRank(w) !== null).length;

  return (
    <main className="cr">
      <ClusterHeader
        path="/cluster/workflows/"
        title="Find the money"
        intro="Fifteen workflows where businesses lose money, each with the leak hypothesis to test in interviews. The rank is the product of six dimensions scored 1–5. A dimension is scored only from customer evidence; founder preference is not a score."
      >
        <p className="cr-meta">
          <span>{scored} of {rows.length} fully scored</span>
          <span>rank = pain × frequency × budget × urgency × ability to pay × repeatability</span>
        </p>
      </ClusterHeader>

      {scored === 0 && (
        <aside className="cr-empty" style={{ marginBottom: '1.2rem' }}>
          <strong>Unscored.</strong> No workflow has customer evidence yet, so no rank is shown. The order below is the
          mandate’s list order, not a ranking. Log conversations in the evidence file, score the dimensions they support,
          and the table sorts itself.
        </aside>
      )}

      <ScoreHeatmap />

      <div className="cr-table-wrap" style={{ marginTop: '1.4rem' }}>
        <table className="cr-table">
          <caption>Workflow ranking</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Workflow</th>
              <th scope="col">Where the money leaks (hypothesis)</th>
              {SCORE_DIMENSIONS.map((d) => <th scope="col" key={d}>{DIM_LABEL[d]}</th>)}
              <th scope="col">Rank</th>
              <th scope="col">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((w, i) => {
              const rank = workflowRank(w);
              return (
                <tr key={w.id}>
                  <td className="num">{rank === null ? '—' : i + 1}</td>
                  <th scope="row" style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{w.name}</th>
                  <td>{w.leak}</td>
                  {SCORE_DIMENSIONS.map((d) => (
                    <td className="num" key={d}>{w.score[d] ?? <span className="dim">·</span>}</td>
                  ))}
                  <td className="num">{rank === null ? <span className="dim">unscored</span> : rank}</td>
                  <td className="num">{w.evidenceRefs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <aside className="cr-rule">
        The wedge is chosen from this table — one vertical, where customers are cheapest to acquire and
        the ROI is immediate — and recorded as a decision with the evidence IDs that justify it.
        See <a href="/cluster/decisions/#D-004">D-004</a>.
      </aside>
    </main>
  );
}
