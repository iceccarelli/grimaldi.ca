import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import Blocks from '@/components/Blocks';
import JsonLd from '@/components/JsonLd';
import { ArtefactLine, MetaLine } from '@/components/Meta';
import { SERIES, episodeBySlug, episodes } from '@/content/podcast';
import { personRef } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return episodes.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const e = episodeBySlug(params.slug);
  if (!e) return {};
  return {
    title: `${SERIES.name} S${SERIES.season}E${e.number} — ${e.title}`,
    description: e.description,
    alternates: { canonical: `/podcast/${e.slug}/` },
    robots: e.status === 'draft' ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default function EpisodePage({ params }: Params) {
  const e = episodeBySlug(params.slug);
  if (!e) notFound();

  const episode = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    '@id': `${SITE_URL}/podcast/${e.slug}/#episode`,
    url: `${SITE_URL}/podcast/${e.slug}/`,
    name: e.title,
    description: e.description,
    episodeNumber: e.number,
    partOfSeries: { '@id': `${SITE_URL}/podcast/#series` },
    author: personRef,
    inLanguage: 'en',
    ...(e.audio ? { associatedMedia: { '@type': 'MediaObject', contentUrl: e.audio } } : {}),
  };

  return (
    <PageShell
      trail={[{ name: 'Podcast', path: '/podcast/' }, { name: `S${SERIES.season}E${e.number}`, path: `/podcast/${e.slug}/` }]}
      kicker={`${SERIES.name} · S${SERIES.season}E${e.number}`}
      title={e.title}
      standfirst={e.description}
      narrow
    >
      <JsonLd data={episode} />
      <MetaLine badge={e.badge} parts={[e.audio ? 'Audio' : 'No audio yet', e.script.length ? 'Script published' : 'Title and claim only']} />

      {e.audio ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio controls preload="none" src={e.audio} />
      ) : (
        <p className="quiet">There is no audio file for this episode. Nothing here pretends otherwise — the hub exists before the microphone.</p>
      )}

      <dl className="template">
        <div><dt>Claim</dt><dd>{e.claim}</dd></div>
        <div><dt>Number</dt><dd>{e.figure}</dd></div>
        <div><dt>Artefact</dt><dd>{e.artefact.label} — {e.artefact.owner}</dd></div>
      </dl>

      {e.script.length > 0 ? (
        <>
          <h2 className="h-quiet">Script</h2>
          <Blocks blocks={e.script} />
        </>
      ) : (
        <p className="quiet">Script not yet written. The claim and the number above are the whole of what this episode currently asserts.</p>
      )}

      <ArtefactLine pointer={e.artefact} verb="Show notes point back" />
      <p className="backlinks"><a href="/podcast/">← Season {SERIES.season} map</a></p>
    </PageShell>
  );
}
