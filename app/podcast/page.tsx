import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Badge from '@/components/Badge';
import JsonLd from '@/components/JsonLd';
import { SERIES, publishedEpisodes } from '@/content/podcast';
import { personRef } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: `${SERIES.name} — the podcast`,
  description: `${SERIES.name}: ${SERIES.tagline} Season ${SERIES.season} is mapped and scripted before any audio exists; show notes always point back to the artefact.`,
  alternates: { canonical: '/podcast/' },
};

export default function PodcastPage() {
  const eps = publishedEpisodes();
  const withAudio = eps.filter((e) => e.audio).length;

  const series = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    '@id': `${SITE_URL}/podcast/#series`,
    url: `${SITE_URL}/podcast/`,
    name: SERIES.name,
    description: SERIES.format,
    inLanguage: 'en',
    author: personRef,
    // No webFeed / audio assertions: there is no audio yet, and saying so is the point.
  };

  return (
    <PageShell
      trail={[{ name: 'Podcast', path: '/podcast/' }]}
      kicker={`${SERIES.name} · season ${SERIES.season}`}
      title={SERIES.name}
      standfirst={SERIES.tagline}
    >
      <JsonLd data={series} />
      <p className="intro">{SERIES.format}</p>

      <p className="meta-line">
        <Badge kind={withAudio > 0 ? 'SHIPPED' : 'RESEARCH'} />
        <span>{withAudio} of {eps.length} episodes have audio.</span>
        <span>Scripts are published as they clear revision.</span>
      </p>

      <h2 className="h-quiet">Season {SERIES.season} map</h2>
      <ol className="ep-list">
        {eps.map((e) => (
          <li key={e.slug}>
            <a href={`/podcast/${e.slug}/`}>
              <span className="ep-n">E{e.number}</span>
              <span className="ep-main">
                <b>{e.title}</b>
                <span>{e.description}</span>
                <span className="ep-art">→ {e.artefact.owner}</span>
              </span>
              <span className="ep-meta">
                <Badge kind={e.badge} />
                <span>{e.audio ? 'audio' : e.script.length ? 'script' : 'title + claim'}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>

      <h2 className="h-quiet">Show-notes template</h2>
      <dl className="template">
        <div><dt>Claim</dt><dd>One sentence. If it needs two, it is two episodes.</dd></div>
        <div><dt>Number</dt><dd>The single figure that decides the claim, with where it comes from.</dd></div>
        <div><dt>Artefact</dt><dd>One public thing you can open, run or clone — on the domain that owns it.</dd></div>
        <div><dt>What it does not prove</dt><dd>Stated every time. A demo is not a deployment; a benchmark is not a railway.</dd></div>
        <div><dt>Back-link</dt><dd>The show notes point back to the vendor artefact. The podcast does not sell a zoo.</dd></div>
      </dl>
    </PageShell>
  );
}
