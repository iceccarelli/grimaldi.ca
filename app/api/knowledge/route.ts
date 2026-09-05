import { publishedTopics } from '@/content/topics';
import { readingMinutes, wordCount } from '@/content/types';
import { operationsCluster, registry, REGISTRY_REVIEWED } from '@/content/cluster';
import { countByStatus } from '@/lib/cluster';
import { CLUSTER, PERSON, SITE_URL } from '@/lib/site';

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
          'A single engineer based in Frankfurt am Main, Germany, with ties to Toronto and the Greater Toronto Area. The .ca domain is personal and does not indicate a Canadian organisation.',
      },

      sites: [
        { domain: 'grimaldi.ca', role: 'control and integration surface of the Operations & Commercial Automation cluster (Agent 3); also the operator’s explainers and book manuscripts; nothing for sale' },
        { domain: 'igrimaldi.engineering', role: 'engineering notebook' },
        { domain: 'engineeringgrimaldi.com', role: 'palletizing software company' },
        { domain: 'ecowoods.ca', role: 'Toronto hardwood contractor' },
        { domain: 'greenhardwood.ca', role: 'Green Hardwood Ltd., Toronto — hardwood flooring, custom stairs and railings' },
      ],

      cluster: {
        name: CLUSTER.name,
        agent: CLUSTER.agent,
        command: operationsCluster.command,
        operator: CLUSTER.operator,
        index: `${SITE_URL}/api/cluster/`,
        registryReviewed: REGISTRY_REVIEWED,
        registryCount: registry.length,
        countByStatus: countByStatus(),
        evidenceRule:
          'Every KPI is measured and sourced or marked not yet measured; roadmap progress is counted from the logged evidence; repository metadata is fetched from GitHub, never hand-copied.',
      },

      expertise: [
        'Digitalisation of high-voltage railway traction power assets',
        'IT/OT convergence and security governance for critical infrastructure',
        'Power system stability and grid frequency control',
        'Physics-informed cyber-physical systems',
      ],

      works: [
        {
          type: 'Book',
          status: 'manuscript in revision',
          title: 'The Renewables Migration',
          url: `${SITE_URL}/books/the-renewables-migration/`,
          verification:
            'Eleven public chapter proof-engine repositories recompute the load-bearing figures from source data.',
        },
        {
          type: 'Book',
          status: 'manuscript in revision',
          title: 'The Orbital AI Compute Roadmap',
          url: `${SITE_URL}/books/the-orbital-ai-compute-roadmap/`,
        },
      ],

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
          'Claims about shipped work link to a public artefact — a repository or a live site. Figures cite the standards body or system operator that publishes them.',
      },

      feeds: {
        rss: `${SITE_URL}/feed.xml`,
        atom: `${SITE_URL}/atom.xml`,
        json: `${SITE_URL}/feed.json`,
        sitemap: `${SITE_URL}/sitemap.xml`,
        llms: `${SITE_URL}/llms.txt`,
        cluster: `${SITE_URL}/api/cluster/`,
      },
    },
    { headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' } },
  );
}
