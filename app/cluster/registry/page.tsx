import type { Metadata } from 'next';
import ClusterHeader from '@/components/cluster/ClusterHeader';
import StatusBadge from '@/components/cluster/StatusBadge';
import { byTier, REGISTRY_REVIEWED, registry, type RegistryEntry } from '@/content/cluster';
import Sparkline from '@/components/viz/Sparkline';
import { registryActivity, registryMeta, type CommitActivity, type RepoMeta } from '@/lib/github';
import { LAYER_LABEL, MATURITY_LABEL, TIER_LABEL, unlocated } from '@/lib/cluster';
import { SITE_URL } from '@/lib/site';

/** Rebuilt twice a day so last-push dates and descriptions stay current without a deploy. */
export const revalidate = 43200;

export const metadata: Metadata = {
  title: 'Registry',
  description:
    'The repository registry of the Operations cluster: every repository the mandate names, its constitutional status, tier, layer, maturity, hypothesis, customer, duplicates, promotion gate and risk — with live GitHub metadata.',
  alternates: { canonical: '/cluster/registry/' },
};

function RepoCard({ r, m, a }: { r: RegistryEntry; m: RepoMeta | undefined; a: CommitActivity | null | undefined }) {
  return (
    <article className="cr-repo" aria-labelledby={`r-${r.slug}`}>
      <div className="cr-repo-head">
        <h3 id={`r-${r.slug}`}><a href={`/cluster/registry/${r.slug}/`}>{r.name}</a></h3>
        <StatusBadge status={r.status} />
      </div>
      <p className="cr-repo-desc">{r.description}</p>
      <div className="cr-chips">
        <span>{TIER_LABEL[r.tier]}</span>
        <span>{LAYER_LABEL[r.layer]}</span>
        <span>{MATURITY_LABEL[r.maturity]}</span>
      </div>
      {a && (
        <div className="cr-repo-meta" style={{ alignItems: 'center' }}>
          <Sparkline values={a.weeks} label={r.name} width={200} height={34} />
          <span>{a.total} commits / 52 wks</span>
        </div>
      )}
      <div className="cr-repo-meta">
        {r.repo ? (
          <a className="url" href={`https://github.com/${r.repo}`} rel="noopener noreferrer">{r.repo}</a>
        ) : (
          <span>no public repository located</span>
        )}
        {r.site && <a className="url" href={r.site} rel="noopener noreferrer">{r.site.replace('https://', '')}</a>}
        {m?.enriched && m.language && <span>{m.language}</span>}
        {m?.enriched && m.updated && <span>last push {m.updated}</span>}
        {m?.enriched && m.license && <span>{m.license}</span>}
        {m?.enriched && m.archived && <span>archived on GitHub</span>}
      </div>
    </article>
  );
}

export default async function RegistryPage() {
  const [meta, activity] = await Promise.all([
    registryMeta(registry.map((r) => r.repo)),
    registryActivity(registry.map((r) => r.repo)),
  ]);
  const enriched = Object.values(meta).filter((m) => m.enriched).length;
  const locatedCount = registry.filter((r) => r.repo).length;

  const tiers: RegistryEntry['tier'][] = ['core', 'vertical', 'related'];

  return (
    <main className="cr">
      <ClusterHeader
        path="/cluster/registry/"
        title="Repository registry"
        intro="Every repository and capability the mandate names, with its constitutional status and the gate that would change it. Descriptions come from the repositories’ own READMEs; language and last push are read live from GitHub and omitted when GitHub cannot be reached."
        parts={registry
          .filter((r) => r.repo)
          .map((r) => ({
            '@type': 'SoftwareSourceCode',
            name: r.name,
            codeRepository: `https://github.com/${r.repo}`,
            url: `${SITE_URL}/cluster/registry/${r.slug}/`,
            ...(meta[r.repo!]?.language ? { programmingLanguage: meta[r.repo!].language } : {}),
          }))}
      >
        <p className="cr-meta">
          <span>{registry.length} entries</span>
          <span>{locatedCount} with a located public repository</span>
          <span>
            live metadata for {enriched} of {locatedCount}
            {enriched < locatedCount ? ' — GitHub not fully reachable at build time' : ''}
          </span>
          <span>reviewed {REGISTRY_REVIEWED}</span>
        </p>
      </ClusterHeader>

      {tiers.map((tier) => {
        const rows = byTier(tier);
        return (
          <section className="cr-section" key={tier} aria-labelledby={`t-${tier}`} style={tier === 'core' ? { marginTop: 0 } : undefined}>
            <h2 id={`t-${tier}`}>{TIER_LABEL[tier]}{tier === 'vertical' ? 's' : ''} · {rows.length}</h2>
            <div className="cr-grid">
              {rows.map((r) => <RepoCard r={r} m={r.repo ? meta[r.repo] : undefined} a={r.repo ? activity[r.repo] : undefined} key={r.slug} />)}
            </div>
          </section>
        );
      })}

      {unlocated().length > 0 && (
        <aside className="cr-empty cr-section">
          <strong>Not located.</strong> {unlocated().map((r) => r.name).join(' and ')} {unlocated().length === 1 ? 'is' : 'are'} named in the mandate
          but no public repository under {unlocated().length === 1 ? 'that name' : 'those names'} exists in the inventory of {REGISTRY_REVIEWED}.
          The gap is listed rather than filled with a guess; the gate on each entry says how to resolve it.
        </aside>
      )}

      <p className="pe-note">
        Machine-readable: <a className="url" href="/api/cluster/registry/">/api/cluster/registry/</a>. A status change is a registry edit plus a
        decision in the <a href="/cluster/decisions/">decision log</a>; the CI guard checks that an ARCHIVE entry has a kill-list entry.
      </p>
    </main>
  );
}
