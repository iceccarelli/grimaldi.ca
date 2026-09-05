import type { Metadata } from 'next';
import ClusterHeader from '@/components/cluster/ClusterHeader';
import StatusBadge from '@/components/cluster/StatusBadge';
import ClusterMap from '@/components/viz/ClusterMap';
import { clusters, constitution, registry, REPO_STATUSES } from '@/content/cluster';
import { LAYER_LABEL } from '@/lib/cluster';

export const metadata: Metadata = {
  title: 'Architecture',
  description:
    'The three strategic clusters, the Operations target architecture (Runway Fuel as Operations OS with field service, contractors, logistics, industrial services and critical infrastructure on top) and the group constitution every agent obeys.',
  alternates: { canonical: '/cluster/' },
};

const LAYERS = ['field-service', 'contractors', 'logistics', 'industrial-services', 'critical-infrastructure'] as const;

export default function ArchitecturePage() {
  return (
    <main className="cr">
      <ClusterHeader
        path="/cluster/"
        title="Architecture"
        intro="Three clusters, one controlled here. The target architecture of the Operations cluster and the constitution that governs how the three cooperate without coupling."
      />

      <section className="cr-section" aria-labelledby="h-clusters" style={{ marginTop: 0 }}>
        <h2 id="h-clusters">The three clusters</h2>
        <p className="intro">
          Each agent owns a cluster and competes for resources on evidence. grimaldi.ca is the
          control surface of exactly one of them.
        </p>
        <ClusterMap />
        <div className="cr-grid" style={{ marginTop: '1.2rem' }}>
          {clusters.map((c) => (
            <section className="cr-panel" key={c.id} aria-labelledby={`h-${c.id}`}>
              <h2 id={`h-${c.id}`}>{c.agent} · {c.name}</h2>
              <p><strong>“{c.command}”</strong></p>
              <p style={{ fontSize: '.93rem' }}>{c.mandate}</p>
              <p className="dim" style={{ fontSize: '.88rem' }}>
                {c.controlSurface ? (
                  <>Controlled from <a className="url" href={c.controlSurface}>{c.controlSurface.replace('https://', '')}</a> — this site.</>
                ) : (
                  <>Not controlled from this site. Counterparty in the integration contracts.</>
                )}
              </p>
            </section>
          ))}
        </div>
      </section>

      <section className="cr-section" aria-labelledby="h-target">
        <h2 id="h-target">Target architecture of the Operations cluster</h2>
        <p className="intro">
          Runway Fuel is the Operations OS — a hypothesis until two independent customers require the
          same workflow. Applications sit on top. The registry entries are placed on the layer they
          serve.
        </p>
        <div className="cr-arch">
          <div className="cr-arch-row">
            {LAYERS.map((l) => {
              const here = registry.filter((r) => r.layer === l);
              return (
                <div className="cr-arch-box" key={l}>
                  {LAYER_LABEL[l]}
                  <small>{here.length ? here.map((r) => r.name).join(' · ') : 'no code'}</small>
                </div>
              );
            })}
          </div>
          <div className="cr-arch-flow" aria-hidden="true">▲ applications sit on top ▲</div>
          <div className="cr-arch-row">
            <div className="cr-arch-box cr-arch-box--os">
              Runway Fuel — Operations OS
              <small>identity · organizations · users · permissions · jobs · assets · documents · workflow engine · notifications · audit logs · integrations · AI tools · reporting · billing — extracted only after repeated customer evidence</small>
            </div>
          </div>
          <div className="cr-arch-flow" aria-hidden="true">▲ shared with other clusters only where it creates economic value ▲</div>
          <div className="cr-arch-row">
            <div className="cr-arch-box">
              Shared infrastructure
              <small>authentication · billing · observability · deployment tooling · AI model gateway · secrets · analytics · audit logging · documentation tooling</small>
            </div>
          </div>
        </div>
        <p className="more" style={{ marginTop: '1rem' }}>
          <a href="/cluster/registry/">The registry, entry by entry →</a> · <a href="/cluster/contracts/">The contracts to the other clusters →</a>
        </p>
      </section>

      <section className="cr-section" aria-labelledby="h-const">
        <h2 id="h-const">Group constitution</h2>
        <p className="intro">The rules all three agents obey. Verbatim in substance.</p>
        <dl className="cr-facts">
          <dt>Clusters</dt><dd>{constitution.clusters}</dd>
          <dt>Ownership</dt><dd>{constitution.ownership}</dd>
          <dt>Moves</dt><dd>{constitution.moves}</dd>
          <dt>Sharing</dt><dd>{constitution.sharing}</dd>
          <dt>Communication</dt><dd>{constitution.communication}</dd>
          <dt>Project gate</dt>
          <dd>
            {constitution.gate.join(' → ')}. {constitution.gateRule}
          </dd>
          <dt>Artefacts</dt><dd>Every agent maintains: {constitution.artefacts.join(', ')}.</dd>
          <dt>Not rewarded</dt><dd>{constitution.notRewarded.join(', ')}.</dd>
          <dt>Rewarded</dt><dd>{constitution.rewarded.join(', ')}.</dd>
          <dt>When uncertain</dt><dd>Prefer {constitution.whenUncertain.join(', ')}.</dd>
          <dt>Allocation</dt><dd>{constitution.allocation}</dd>
        </dl>
      </section>

      <section className="cr-section" aria-labelledby="h-statuses">
        <h2 id="h-statuses">Allowed repository statuses</h2>
        <p className="intro">Six. No other status exists; the typecheck refuses a seventh.</p>
        <div className="cr-chips" style={{ gap: '.5rem' }}>
          {REPO_STATUSES.map((s) => <StatusBadge status={s} key={s} />)}
        </div>
      </section>
    </main>
  );
}
