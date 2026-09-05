import type { Metadata } from 'next';
import ClusterHeader from '@/components/cluster/ClusterHeader';
import ObjectiveBar from '@/components/cluster/ObjectiveBar';
import { evidence, roadmap, validatedEvidence } from '@/content/cluster';
import { evidenceByVertical, roadmapProgress, validationPeriod } from '@/lib/cluster';

/** The validation-period clock must not freeze at build time: rebuilt twice a day. */
export const revalidate = 43200;

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    'The 90-day objective of the Operations cluster — 50 customer conversations, 10 qualified opportunities, 3 design partners, 1 paying customer — with progress counted from the customer evidence log, and the rule if it is missed.',
  alternates: { canonical: '/cluster/roadmap/' },
};

export default function RoadmapPage() {
  const progress = roadmapProgress();
  const period = validationPeriod();
  const byVertical = evidenceByVertical();
  const validated = validatedEvidence();

  return (
    <main className="cr">
      <ClusterHeader
        path="/cluster/roadmap/"
        title="90-day objective"
        intro="Four targets fixed by the mandate. Progress is counted from the customer evidence log, never typed in: a conversation that was not logged did not happen as far as this page is concerned."
      >
        <p className="cr-meta">
          <span>{roadmap.start} → {roadmap.end}</span>
          <span>{period.over ? 'validation period over' : `${period.remaining} days remaining`}</span>
          <span>{evidence.length} evidence entr{evidence.length === 1 ? 'y' : 'ies'}</span>
        </p>
      </ClusterHeader>

      <div className="cr-grid" style={{ alignItems: 'start' }}>
        <section className="cr-panel" aria-labelledby="h-obj">
          <h2 id="h-obj">Objectives</h2>
          {progress.map((o) => <ObjectiveBar o={o} key={o.id} />)}
        </section>
        <section className="cr-panel" aria-labelledby="h-rule">
          <h2 id="h-rule">If missed</h2>
          <p>{roadmap.ifMissed}</p>
          <p className="dim" style={{ fontSize: '.9rem' }}>
            Validation is money, a signed pilot or a committed design partnership. Compliments are logged as
            conversations and count toward the first target only.
          </p>
        </section>
      </div>

      <section className="cr-section" aria-labelledby="h-ev">
        <h2 id="h-ev">Customer evidence</h2>
        <p className="intro">
          One row per real conversation, pilot, partnership or customer — described by industry and size,
          never by name on this public page.
        </p>
        {evidence.length === 0 ? (
          <aside className="cr-empty">
            <strong>No conversations logged.</strong> The 90-day clock is running and the count is zero. The first
            entry goes in <code>content/cluster/evidence.ts</code>; the objectives above update on the next build.
          </aside>
        ) : (
          <>
            <p className="cr-meta" style={{ marginBottom: '.8rem' }}>
              {Object.entries(byVertical).map(([v, rows]) => (
                <span key={v}>{v}: {rows.length}</span>
              ))}
              <span>validated: {validated.length}</span>
            </p>
            <div className="cr-table-wrap">
              <table className="cr-table">
                <caption>Evidence log</caption>
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Kind</th>
                    <th scope="col">Vertical</th>
                    <th scope="col">Company</th>
                    <th scope="col">Current software</th>
                    <th scope="col">Workflows</th>
                    <th scope="col">Pain</th>
                    <th scope="col">Urgency</th>
                    <th scope="col">Validation</th>
                  </tr>
                </thead>
                <tbody>
                  {[...evidence].sort((a, b) => b.date.localeCompare(a.date)).map((e) => (
                    <tr key={e.id}>
                      <td className="cr-record-id">{e.id}</td>
                      <td className="num">{e.date}</td>
                      <td>{e.kind}</td>
                      <td>{e.vertical}</td>
                      <td>{e.industry}, {e.companySize}</td>
                      <td>{e.currentSoftware}</td>
                      <td>{e.workflows.join(', ')}</td>
                      <td>{e.pain}</td>
                      <td>{e.urgency}</td>
                      <td>{e.validation ? 'yes' : 'no'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <section className="cr-section" aria-labelledby="h-track">
        <h2 id="h-track">What every conversation records</h2>
        <p className="intro">
          Industry, company size, revenue, current software, workflow, pain, cost, decision maker, budget,
          urgency, competitors, willingness to pay. The schema is enforced by the typecheck; a row with a
          missing field does not build.
        </p>
      </section>
    </main>
  );
}
