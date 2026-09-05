import type { Metadata } from 'next';
import ClusterHeader from '@/components/cluster/ClusterHeader';
import ClusterMap from '@/components/viz/ClusterMap';
import ContractSequence from '@/components/viz/ContractSequence';
import Funnel from '@/components/viz/Funnel';
import MaturityLadder from '@/components/viz/MaturityLadder';
import ObjectiveRing from '@/components/viz/ObjectiveRing';
import PeriodTimeline from '@/components/viz/PeriodTimeline';
import PulseBoard from '@/components/viz/PulseBoard';
import ScoreHeatmap from '@/components/viz/ScoreHeatmap';
import StatusBars from '@/components/viz/StatusBars';
import { registry } from '@/content/cluster';
import { countByStatus, roadmapProgress } from '@/lib/cluster';
import { registryActivity } from '@/lib/github';

/** Live GitHub pulse and the validation clock: rebuilt twice a day. */
export const revalidate = 43200;

export const metadata: Metadata = {
  title: 'Map',
  description:
    'The Operations cluster in pictures: the three clusters and their contracts, the maturity ladder of every repository, registry by status, the 90-day funnel and timeline, the workflow scoring heatmap, the contract sequence, and the 52-week commit pulse — all drawn from the same typed data as the API.',
  alternates: { canonical: '/cluster/map/' },
};

export default async function MapPage() {
  const activity = await registryActivity(registry.map((r) => r.repo));
  const progress = roadmapProgress();
  const counts = countByStatus();

  return (
    <main className="cr">
      <ClusterHeader
        path="/cluster/map/"
        title="The map"
        intro="Every picture on this page is drawn at build time from the same typed content the API serves — inline SVG, no JavaScript, one validated palette in light and dark. Where there is no data, the picture shows that there is no data."
      />

      <section className="cr-section" aria-labelledby="h-clusters" style={{ marginTop: 0 }}>
        <h2 id="h-clusters">Three clusters, three contracts</h2>
        <p className="intro">Ownership is exclusive; integration is by interface. Operations is the one controlled from this site.</p>
        <ClusterMap />
      </section>

      <section className="cr-section" aria-labelledby="h-seq">
        <h2 id="h-seq">The loop, as a sequence</h2>
        <ContractSequence />
        <p className="more"><a href="/cluster/contracts/">Field-level schemas →</a></p>
      </section>

      <section className="cr-section" aria-labelledby="h-maturity">
        <h2 id="h-maturity">Maturity ladder</h2>
        <p className="intro">Where each registry entry stands, and which way it must move. Names come from the registry; positions from its maturity field.</p>
        <MaturityLadder />
        <p className="more"><a href="/cluster/registry/">Registry →</a></p>
      </section>

      <div className="viz-grid2 cr-section">
        <section aria-labelledby="h-status">
          <h2 id="h-status" style={{ fontSize: '1.3rem', margin: '0 0 .3rem' }}>Registry by status</h2>
          <p className="intro" style={{ marginBottom: '.4rem' }}>Six constitutional statuses. An ARCHIVE bar would be the only red on this page.</p>
          <StatusBars counts={counts} />
        </section>
        <section aria-labelledby="h-funnel">
          <h2 id="h-funnel" style={{ fontSize: '1.3rem', margin: '0 0 .3rem' }}>90-day funnel</h2>
          <p className="intro" style={{ marginBottom: '.4rem' }}>Conversations → qualified → design partners → paying. Counted, never typed.</p>
          <Funnel stages={progress} />
        </section>
      </div>

      <section className="cr-section" aria-labelledby="h-period">
        <h2 id="h-period">Validation period</h2>
        <div className="viz-rings" style={{ marginBottom: '.8rem' }}>
          {progress.map((o) => <ObjectiveRing o={o} key={o.id} size={120} />)}
        </div>
        <PeriodTimeline />
        <p className="more"><a href="/cluster/roadmap/">Roadmap and evidence →</a> · <a href="/cluster/reports/">Reports →</a></p>
      </section>

      <section className="cr-section" aria-labelledby="h-heat">
        <h2 id="h-heat">Where the money leaks — scoring heatmap</h2>
        <p className="intro">Fifteen workflows, six dimensions. A cell is coloured only when a logged conversation scored it.</p>
        <ScoreHeatmap />
        <p className="more"><a href="/cluster/workflows/">The table, with leak hypotheses →</a></p>
      </section>

      <section className="cr-section" aria-labelledby="h-pulse">
        <h2 id="h-pulse">Pulse · 52 weeks of commits</h2>
        <p className="intro">Live from GitHub, shared scale across repositories, rebuilt twice a day. Activity, not outcome.</p>
        <div className="cr-table-wrap">
          <PulseBoard entries={registry} activity={activity} />
        </div>
      </section>

      <aside className="cr-rule">
        Everything above is also available as data: <a className="url" href="/api/cluster/">/api/cluster/</a>,{' '}
        <a className="url" href="/api/cluster/registry/">/api/cluster/registry/</a>, <a className="url" href="/openapi.json">/openapi.json</a>,{' '}
        <a className="url" href="/llms-full.txt">/llms-full.txt</a>.
      </aside>
    </main>
  );
}
