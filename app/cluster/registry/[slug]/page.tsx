import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import ClusterNav from '@/components/cluster/ClusterNav';
import StatusBadge from '@/components/cluster/StatusBadge';
import { breadcrumbs, personRef } from '@/lib/schema';
import { registry, registryBySlug, decisions } from '@/content/cluster';
import Sparkline from '@/components/viz/Sparkline';
import { commitActivity, repoMeta } from '@/lib/github';
import { LAYER_LABEL, MATURITY_LABEL, TIER_LABEL } from '@/lib/cluster';
import { SITE_URL } from '@/lib/site';

/** Rebuilt twice a day for the live GitHub fields. */
export const revalidate = 43200;

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return registry.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const r = registryBySlug(params.slug);
  if (!r) return {};
  return {
    title: `${r.name} — registry`,
    description: r.description.slice(0, 155),
    alternates: { canonical: `/cluster/registry/${r.slug}/` },
  };
}

export default async function RegistryEntryPage({ params }: Params) {
  const r = registryBySlug(params.slug);
  if (!r) notFound();
  const [m, a] = r.repo ? await Promise.all([repoMeta(r.repo), commitActivity(r.repo)]) : [null, null];
  const related = decisions.filter((d) => d.decision.includes(r.name) || d.context.includes(r.name) || d.title.includes(r.name));

  const node = r.repo
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        '@id': `${SITE_URL}/cluster/registry/${r.slug}/#code`,
        url: `${SITE_URL}/cluster/registry/${r.slug}/`,
        name: r.name,
        description: r.description,
        codeRepository: `https://github.com/${r.repo}`,
        author: personRef,
        ...(m?.language ? { programmingLanguage: m.language } : {}),
        ...(m?.license ? { license: `https://spdx.org/licenses/${m.license}.html` } : {}),
        ...(r.site ? { targetProduct: { '@type': 'WebSite', url: r.site } } : {}),
      }
    : null;

  return (
    <main className="cr">
      {node && <JsonLd data={node} />}
      <JsonLd data={breadcrumbs([
        { name: 'Cluster', path: '/cluster/' },
        { name: 'Registry', path: '/cluster/registry/' },
        { name: r.name, path: `/cluster/registry/${r.slug}/` },
      ])} />

      <header className="cr-head">
        <span className="kicker">Registry · {TIER_LABEL[r.tier]} · {LAYER_LABEL[r.layer]}</span>
        <h1 className="page-title" style={{ margin: '.2rem 0 .4rem', display: 'flex', gap: '.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {r.name} <StatusBadge status={r.status} />
        </h1>
        <p className="cr-lead">{r.description}</p>
        <p className="cr-meta">
          <span>{MATURITY_LABEL[r.maturity]}</span>
          {r.repo ? (
            <a className="url" href={`https://github.com/${r.repo}`} rel="noopener noreferrer">github.com/{r.repo}</a>
          ) : (
            <span>no public repository located</span>
          )}
          {r.site && <a className="url" href={r.site} rel="noopener noreferrer">{r.site.replace('https://', '')}</a>}
          <span>reviewed {r.reviewed}</span>
        </p>
      </header>

      <ClusterNav current="/cluster/registry/" />

      <div style={{ maxWidth: 'var(--max)' }}>
        <dl className="cr-facts" style={{ marginTop: 0 }}>
          <dt>Hypothesis</dt><dd>{r.hypothesis}</dd>
          <dt>Customer</dt><dd>{r.customer}</dd>
          <dt>Role</dt><dd>{r.role}</dd>
          <dt>Gate</dt><dd>{r.gate}</dd>
          <dt>Risk</dt><dd>{r.risk}</dd>
          <dt>Stack</dt>
          <dd>{r.stack.length ? r.stack.join(' · ') : <span className="dim">not verified / no code</span>}</dd>
          <dt>Overlaps with</dt>
          <dd>
            {r.duplicates.length ? (
              r.duplicates.map((d, i) => {
                const other = registryBySlug(d);
                return (
                  <span key={d}>
                    {i > 0 && ' · '}
                    {other ? <a href={`/cluster/registry/${other.slug}/`}>{other.name}</a> : d}
                  </span>
                );
              })
            ) : (
              <span className="dim">nothing in the registry</span>
            )}
          </dd>
          {a && (
            <>
              <dt>Pulse · 52 weeks</dt>
              <dd>
                <Sparkline values={a.weeks} label={r.name} width={320} height={48} />
                <span className="dim" style={{ fontSize: '.88rem' }}>{a.total} commits · {a.weeks[a.weeks.length - 1]} in the week of {a.latestWeek} · activity, not outcome</span>
              </dd>
            </>
          )}
          {m && (
            <>
              <dt>Live from GitHub</dt>
              <dd>
                {m.enriched ? (
                  <>
                    {m.description && <>“{m.description}” <br /></>}
                    {[
                      m.language,
                      m.updated ? `last push ${m.updated}` : null,
                      m.license,
                      m.stars !== null ? `${m.stars} star${m.stars === 1 ? '' : 's'}` : null,
                      m.openIssues !== null ? `${m.openIssues} open issue${m.openIssues === 1 ? '' : 's'}` : null,
                      m.archived ? 'archived on GitHub' : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                    {m.topics.length > 0 && <> · topics: {m.topics.join(', ')}</>}
                  </>
                ) : (
                  <span className="dim">GitHub could not be reached at build time; nothing is shown in its place.</span>
                )}
              </dd>
            </>
          )}
        </dl>

        {related.length > 0 && (
          <section className="cr-section" aria-labelledby="h-rel">
            <h2 id="h-rel">Decisions that mention this entry</h2>
            <ul className="plain">
              {related.map((d) => (
                <li key={d.id}>
                  <span className="cr-record-id">{d.id}</span> <a href={`/cluster/decisions/#${d.id}`}>{d.title}</a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="more" style={{ marginTop: '2rem' }}>
          <a href="/cluster/registry/">← Registry</a> · <a className="url" href={`/api/cluster/registry/`}>/api/cluster/registry/</a>
        </p>
      </div>
    </main>
  );
}
