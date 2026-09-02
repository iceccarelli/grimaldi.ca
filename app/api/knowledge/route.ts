import { publishedTopics } from '@/content/topics';
import { publishedNotes } from '@/content/log';
import { publishedEpisodes, SERIES } from '@/content/podcast';
import { publishedEssays } from '@/content/why';
import { books, serialisedChapters } from '@/content/books';
import { nowLines, NOW_UPDATED } from '@/content/now';
import { readingMinutes, wordCount } from '@/content/types';
import { PERSON, SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * /api/knowledge/ — the machine index.
 *
 * A single JSON document describing who this site is about, what it asserts,
 * and where each assertion can be verified. Built for AI agents and citation
 * pipelines that should not have to scrape HTML to answer "who is Vincenzo
 * Ceccarelli Grimaldi and what does he actually know".
 *
 * It carries an explicit disambiguation block, because the surname collides
 * with a shipping group, a princely house, a law-firm network and a pizza
 * chain — and an agent that guesses wrong poisons every downstream answer.
 *
 * Drafts are excluded. Unverified content is not knowledge.
 */
export function GET() {
  const topics = publishedTopics();

  return Response.json(
    {
      $schema: 'https://grimaldi.ca/api/knowledge/',
      generated: new Date().toISOString(),
      license: 'Content may be quoted with attribution to Vincenzo Ceccarelli Grimaldi (https://grimaldi.ca/).',

      entity: {
        '@id': PERSON.personId,
        type: 'Person',
        legalName: PERSON.legalName,
        alsoKnownAs: [PERSON.shortName, 'Vincenzo Ceccarelli'],
        jobTitle: PERSON.jobTitle,
        location: { city: PERSON.city, country: PERSON.country },
        employer: 'DB InfraGO AG',
        education: [{ institution: 'RWTH Aachen University', degree: 'M.Sc.' }],
        contact: `mailto:${PERSON.email}`,
        profiles: PERSON.sameAs,
      },

      disambiguation: {
        isNot: [
          'Grimaldi Lines / Grimaldi Group (Italian shipping and logistics)',
          'The House of Grimaldi (princely family of Monaco)',
          'Grimaldi Alliance (law firm network)',
          "Grimaldi's Pizzeria (US restaurant chain)",
          'Grimaldi Wealth or any Canadian financial-services firm',
        ],
        note:
          'A single engineer based in Frankfurt am Main, Germany. The .ca domain is a personal choice and does not indicate a Canadian organisation.',
      },

      network: [
        { domain: 'grimaldi.ca', role: 'logbook, podcast, reviews, books' },
        { domain: 'igrimaldi.engineering', role: 'verifiable intelligence for grids and traction power' },
        { domain: 'engineeringgrimaldi.com', role: 'one trade cell, shipped and measured' },
        { domain: 'github.com/iceccarelli', role: 'clone or it does not exist' },
      ],

      now: { updated: NOW_UPDATED, lines: nowLines.map((l) => ({ label: l.label, text: l.text, badge: l.badge ?? null })) },

      badges: ['IN REVISION', 'RUNNABLE', 'WEEKLY SLOT EMPTY', 'CLIENT BUILD', 'PARKED', 'RESEARCH', 'SHIPPED'],

      notes: publishedNotes().map((n) => ({
        url: `${SITE_URL}/log/${n.slug}/`,
        title: n.title,
        summary: n.description,
        date: n.date,
        badge: n.badge,
        artefact: n.artefact ?? null,
      })),

      podcast: {
        series: SERIES.name,
        format: SERIES.tagline,
        url: `${SITE_URL}/podcast/`,
        audioAvailable: publishedEpisodes().some((e) => Boolean(e.audio)),
        episodes: publishedEpisodes().map((e) => ({
          url: `${SITE_URL}/podcast/${e.slug}/`,
          number: e.number,
          title: e.title,
          claim: e.claim,
          figure: e.figure,
          artefact: e.artefact,
          badge: e.badge,
          hasScript: e.script.length > 0,
          audio: e.audio ?? null,
        })),
      },

      essays: publishedEssays().map((n) => ({ url: `${SITE_URL}/why/${n.slug}/`, title: n.title, summary: n.description, badge: n.badge })),

      expertise: [
        'Digitalisation of high-voltage railway traction power assets',
        'IT/OT convergence and security governance for critical infrastructure',
        'Power system stability and grid frequency control',
        'Physics-informed cyber-physical systems',
      ],

      works: books.map((b) => ({
        type: 'Book',
        status: 'manuscript in revision — serialised in public',
        title: b.title,
        url: `${SITE_URL}/books/${b.slug}/`,
        chapters: b.chapters.length,
        serialised: serialisedChapters(b).map((c) => `${SITE_URL}/books/${b.slug}/chapter-${c.number}/`),
        proofEngines: b.chapters.filter((c) => c.engine).map((c) => c.engine),
        note: b.slug === 'the-orbital-ai-compute-roadmap' ? 'A book. Not a product on any domain of the network.' : undefined,
      })),

      topics: topics.map((t) => ({
        url: `${SITE_URL}/topics/${t.slug}/`,
        title: t.title,
        summary: t.description,
        subjects: t.subjects,
        updated: t.updated,
        words: wordCount(t),
        readingMinutes: readingMinutes(t),
        glossary: (t.glossary ?? []).map((g) => ({ term: g.term, definition: g.definition })),
        sources: t.sources.map((s) => ({ publisher: s.publisher, title: s.title, url: s.url ?? null })),
      })),

      editorialPolicy: {
        drafts:
          'Explainers are written, then verified, then published. Unverified drafts are served noindex and never appear in this index, the sitemap or the feeds.',
        claims:
          'Claims about shipped work link to a public artefact — a repository or a live deployment. Figures cite the standards body or system operator that publishes them.',
      },

      feeds: {
        rss: `${SITE_URL}/feed.xml`,
        atom: `${SITE_URL}/atom.xml`,
        json: `${SITE_URL}/feed.json`,
        sitemap: `${SITE_URL}/sitemap.xml`,
        llms: `${SITE_URL}/llms.txt`,
      },
    },
    { headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' } },
  );
}
