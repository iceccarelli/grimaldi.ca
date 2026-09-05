import Image from 'next/image';
import JsonLd from '@/components/JsonLd';
import ClusterNav from '@/components/cluster/ClusterNav';
import KpiStrip from '@/components/cluster/KpiStrip';
import StatusBadge from '@/components/cluster/StatusBadge';
import ClusterMap from '@/components/viz/ClusterMap';
import ObjectiveRing from '@/components/viz/ObjectiveRing';
import PeriodTimeline from '@/components/viz/PeriodTimeline';
import PulseBoard from '@/components/viz/PulseBoard';
import StatusBars from '@/components/viz/StatusBars';
import { clusterDataset, collectionPage } from '@/lib/schema';
import { CLUSTER, DOORS, PERSON, SITE_URL } from '@/lib/site';
import {
  byTier,
  decisions,
  killList,
  kpis,
  latestReport,
  MANDATE_TITLE,
  operationsCluster,
  REGISTRY_REVIEWED,
  registry,
  roadmap,
} from '@/content/cluster';
import { countByStatus, roadmapProgress, unlocated, validationPeriod } from '@/lib/cluster';
import { registryActivity } from '@/lib/github';
import { publishedTopics } from '@/content/topics';

/** The validation-period clock must not freeze at build time: rebuilt twice a day. */
export const revalidate = 43200;

/**
 * Home — the control room of the Operations & Commercial Automation cluster.
 *
 * What the CEO layer needs in twenty seconds: the command, the primary KPI,
 * the state of the 90-day objective, the registry by status, the latest
 * decision, the latest report, and where the code and the sites are. Every
 * number is computed from typed content or fetched; none is typed as if
 * measured. Server component — no client bundle for the front door.
 */
export default async function Home() {
  const activity = await registryActivity(registry.map((r) => r.repo));
  const progress = roadmapProgress();
  const period = validationPeriod();
  const counts = countByStatus();
  const report = latestReport();
  const latestDecision = [...decisions].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))[0];
  const topics = publishedTopics();
  const core = byTier('core');
  const verticals = byTier('vertical');
  const primary = kpis.filter((k) => k.rank === 'primary');
  const headline = kpis.filter((k) => ['mrr', 'pipeline', 'qualified-opportunities', 'conversion', 'retention', 'gross-margin'].includes(k.id));

  const page = collectionPage({
    path: '/',
    name: `${CLUSTER.short} — control room`,
    description:
      'Control and integration surface of the Operations & Commercial Automation cluster: registry, KPIs, roadmap, decisions, contracts.',
    parts: registry
      .filter((r) => r.repo)
      .map((r) => ({
        '@type': 'SoftwareSourceCode',
        name: r.name,
        codeRepository: `https://github.com/${r.repo}`,
        url: `${SITE_URL}/cluster/registry/${r.slug}/`,
      })),
  });

  return (
    <main className="cr">
      <JsonLd data={page} />
      <JsonLd data={clusterDataset} />

      <header className="cr-head">
        <span className="kicker">
          {CLUSTER.agent} · {CLUSTER.name} · control surface
        </span>
        <h1 className="cr-cmd">{operationsCluster.command}</h1>
        <p className="cr-lead">
          This is where the Operations cluster is displayed and orchestrated: the repository
          registry, the KPI system with revenue first, the workflow ranking, the 90-day objective
          counted from logged customer conversations, the decision log and kill list, the
          weekly CEO report, and the versioned contracts to the Energy and Physical AI clusters.
          Nothing is for sale on this page. Every number is measured and sourced, or it says{' '}
          <em>not yet measured</em>.
        </p>
        <p className="cr-meta">
          <span>mandate: {MANDATE_TITLE}</span>
          <span>registry reviewed {REGISTRY_REVIEWED}</span>
          <span>
            validation period {roadmap.start} → {roadmap.end} · {period.over ? 'over' : `${period.remaining} days left`}
          </span>
          <span>
            machine index <a className="url" href="/api/cluster/">/api/cluster/</a>
          </span>
        </p>
      </header>

      <ClusterNav current="/" />

      {/* Primary KPI */}
      <section className="cr-section" aria-labelledby="h-kpi" style={{ marginTop: 0 }}>
        <h2 id="h-kpi">Revenue first</h2>
        <p className="intro">
          The primary KPI, then the six the CEO report opens with. A value appears here only when
          it has been measured from the named source.
        </p>
        <KpiStrip kpis={primary} />
        <div style={{ height: '.8rem' }} />
        <KpiStrip kpis={headline} compact />
        <p className="more">
          <a href="/cluster/kpi/">All fourteen KPIs, with definitions →</a>
        </p>
      </section>

      <div className="cr-grid cr-section">
        {/* 90-day objective */}
        <section className="cr-panel" aria-labelledby="h-obj" style={{ gridColumn: '1 / -1' }}>
          <h2 id="h-obj">90-day objective</h2>
          <div className="viz-rings">
            {progress.map((o) => <ObjectiveRing o={o} key={o.id} size={124} />)}
          </div>
          <PeriodTimeline />
          <p className="dim" style={{ fontSize: '.88rem' }}>
            Counted from the evidence log. {period.elapsed} of {period.total} days elapsed.
          </p>
          <p className="more">
            <a href="/cluster/roadmap/">Roadmap and evidence →</a>
          </p>
        </section>

        {/* Registry by status */}
        <section className="cr-panel" aria-labelledby="h-reg">
          <h2 id="h-reg">Registry · {registry.length} entries</h2>
          <StatusBars counts={counts} />
          {unlocated().length > 0 && (
            <p className="dim" style={{ fontSize: '.88rem', marginTop: '.6rem' }}>
              {unlocated().length} name{unlocated().length === 1 ? '' : 's'} from the mandate not located in the
              public inventory: {unlocated().map((r) => r.name).join(', ')}.
            </p>
          )}
          <p className="more">
            <a href="/cluster/registry/">Full registry →</a>
          </p>
        </section>

        {/* Latest decision + kill list */}
        <section className="cr-panel" aria-labelledby="h-dec">
          <h2 id="h-dec">Latest decision</h2>
          <p>
            <span className="cr-record-id">{latestDecision.id} · {latestDecision.date}</span>
            <br />
            <strong>{latestDecision.title}</strong>
          </p>
          <p style={{ fontSize: '.92rem' }}>{latestDecision.decision}</p>
          <p className="dim" style={{ fontSize: '.88rem' }}>
            Kill list: {killList.length === 0 ? 'nothing frozen or killed yet.' : `${killList.length} entr${killList.length === 1 ? 'y' : 'ies'}.`}
          </p>
          <p className="more">
            <a href="/cluster/decisions/">Decision log and kill list →</a>
          </p>
        </section>

        {/* Latest report */}
        <section className="cr-panel" aria-labelledby="h-rep">
          <h2 id="h-rep">Weekly CEO report</h2>
          {report ? (
            <>
              <p>
                <span className="cr-record-id">{report.week} · filed {report.filed}</span>
              </p>
              <p style={{ fontSize: '.92rem' }}>
                <strong>Top workflow:</strong> {report.topWorkflow ?? '—'}
                <br />
                <strong>Top failure:</strong> {report.topFailure ?? '—'}
              </p>
            </>
          ) : (
            <p className="dim" style={{ fontSize: '.92rem' }}>
              No report filed yet. The template with the eighteen mandated fields is ready.
            </p>
          )}
          <p className="more">
            <a href="/cluster/reports/">Reports →</a>
          </p>
        </section>
      </div>

      {/* The code and the sites */}
      <section className="cr-section" aria-labelledby="h-code">
        <h2 id="h-code">Core and vertical applications</h2>
        <p className="intro">
          EcoWoods is the commercial proving ground; the Forge sites are vertical experiments;
          Runway Fuel is a platform hypothesis until two independent customers require the same
          workflow. Live repository metadata is on the registry page.
        </p>
        <div className="cr-table-wrap">
          <table className="cr-table">
            <caption>Registry — core and vertical tiers</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Role</th>
                <th scope="col">Code</th>
                <th scope="col">Site</th>
              </tr>
            </thead>
            <tbody>
              {[...core, ...verticals].map((r) => (
                <tr key={r.slug}>
                  <td><a href={`/cluster/registry/${r.slug}/`}>{r.name}</a></td>
                  <td><StatusBadge status={r.status} /></td>
                  <td>{r.role}</td>
                  <td>
                    {r.repo ? (
                      <a className="url" href={`https://github.com/${r.repo}`} rel="noopener noreferrer">{r.repo.split('/')[1]}</a>
                    ) : (
                      <span className="dim">not located</span>
                    )}
                  </td>
                  <td>
                    {r.site ? (
                      <a className="url" href={r.site} rel="noopener noreferrer">{r.site.replace('https://', '')}</a>
                    ) : (
                      <span className="dim">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pulse */}
      <section className="cr-section" aria-labelledby="h-pulse">
        <h2 id="h-pulse">Pulse · where the hours went</h2>
        <p className="intro">
          Fifty-two weeks of commits per located repository, read live from GitHub and rebuilt twice
          a day. Activity is not outcome — revenue is — but the operator should see both.
        </p>
        <div className="cr-table-wrap">
          <PulseBoard entries={[...core, ...verticals, ...registry.filter((r) => r.tier === 'related' && r.repo)]} activity={activity} />
        </div>
      </section>

      {/* Map */}
      <section className="cr-section" aria-labelledby="h-map">
        <h2 id="h-map">The three clusters</h2>
        <p className="intro">
          This site controls one of three. The others are counterparties, reached only through
          versioned contracts — never a shared database.
        </p>
        <ClusterMap />
        <p className="more">
          <a href="/cluster/map/">The full map: architecture, maturity, contracts →</a>
        </p>
      </section>

      {/* Elsewhere in the network */}
      <section className="cr-section" aria-labelledby="h-elsewhere">
        <h2 id="h-elsewhere">Elsewhere in the network</h2>
        <ul className="doors">
          {DOORS.map((d) => (
            <li key={d.href}>
              <a className="url" href={d.href} rel="noopener noreferrer">{d.label}</a>
              <span> — {d.what}</span>
            </li>
          ))}
        </ul>
        {topics.length > 0 && (
          <p className="dim" style={{ fontSize: '.95rem' }}>
            The operator’s explainers stay on this site:{' '}
            {topics.slice(0, 3).map((t, i) => (
              <span key={t.slug}>
                {i > 0 && ' · '}
                <a href={`/topics/${t.slug}/`}>{t.title}</a>
              </span>
            ))}
            {' '}— <a href="/topics/">all explainers</a>, <a href="/books/">the books</a>.
          </p>
        )}
      </section>

      {/* Operator */}
      <div className="cr-operator">
        <Image src="/headshot.jpg" alt="" width={48} height={48} unoptimized />
        <p>
          Operated by <a href="/about/">{PERSON.legalName}</a>, electrical engineer in Frankfurt am
          Main — the CEO layer above the three clusters. <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a> ·{' '}
          <a href="/contact/">contact form</a>.
        </p>
      </div>
    </main>
  );
}
