import HomeSections from '@/components/HomeSections';
import NowStrip from '@/components/NowStrip';
import Badge from '@/components/Badge';
import JsonLd from '@/components/JsonLd';
import { personRef } from '@/lib/schema';
import { PERSON, SITE_URL } from '@/lib/site';
import { currentSlot, publishedNotes } from '@/content/log';
import { SERIES, latestEpisode } from '@/content/podcast';
import { bookBySlug } from '@/content/books';
import { NOW_UPDATED } from '@/content/now';

/** The weekly slot rolls over without a deploy: re-evaluated hourly. */
export const revalidate = 3600;

/**
 * Server shell for the home page.
 *
 * Working backwards: a stranger reads 80 words, sees what is true this
 * month, then has three doors — the latest note (or the empty slot, on
 * purpose), the latest episode (or the season map), and chapter 1.
 * Everything else on this domain is one line further down.
 */
const profilePage = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profile`,
  url: `${SITE_URL}/`,
  name: `${PERSON.legalName} — Logbook`,
  inLanguage: 'en',
  mainEntity: personRef,
};

function Doors() {
  const slot = currentSlot();
  const latest = publishedNotes()[0];
  const ep = latestEpisode();
  const book = bookBySlug('the-renewables-migration')!;
  const ch1 = book.chapters[0];

  return (
    <div className="doors">
      {/* Door 1 — the weekly slot, filled or honestly empty */}
      <a className="door" href={slot.filled ? `/log/${slot.note.slug}/` : '/log/'}>
        <span className="door-n">01</span>
        <span className="door-k">Latest note · {slot.week}</span>
        {slot.filled ? (
          <>
            <Badge kind={slot.note.badge} />
            <strong>{slot.note.title}</strong>
            <span className="door-line">{slot.note.description}</span>
          </>
        ) : (
          <>
            <Badge kind="WEEKLY SLOT EMPTY" />
            <strong>No note this week — yet.</strong>
            <span className="door-line">
              Next due {slot.due}.{latest ? ` Last written: “${latest.title}”.` : ''}
            </span>
          </>
        )}
      </a>

      {/* Door 2 — latest episode with a script, else the season map */}
      <a className="door" href={ep ? `/podcast/${ep.slug}/` : '/podcast/'}>
        <span className="door-n">02</span>
        <span className="door-k">{SERIES.name} · {ep ? `S${SERIES.season}E${ep.number}` : `Season ${SERIES.season} map`}</span>
        {ep ? (
          <>
            <Badge kind={ep.badge} />
            <strong>{ep.title}</strong>
            <span className="door-line">{ep.audio ? 'Audio.' : 'Script, no audio yet.'} {ep.claim}</span>
          </>
        ) : (
          <>
            <Badge kind="RESEARCH" />
            <strong>Season {SERIES.season}, mapped before the microphone.</strong>
            <span className="door-line">{SERIES.tagline}</span>
          </>
        )}
      </a>

      {/* Door 3 — chapter 1 */}
      <a className="door" href={`/books/${book.slug}/chapter-1/`}>
        <span className="door-n">03</span>
        <span className="door-k">{book.title} · {ch1.title}</span>
        <Badge kind={ch1.badge} />
        <strong>IN REVISION · SERIAL — essay stub + proof engine</strong>
        <span className="door-line">{ch1.summary}</span>
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={profilePage} />
      <HomeSections
        nowStrip={<NowStrip compact />}
        nowUpdated={NOW_UPDATED}
        doors={<Doors />}
      />
    </>
  );
}
