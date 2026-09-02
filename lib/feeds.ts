/**
 * feeds.ts — one feed model, three serialisations.
 *
 * Drafts never appear here: the item list is built from publishedTopics()
 * only, so the draft rule is enforced in one place rather than three.
 */

import { publishedTopics } from '@/content/topics';
import { publishedNotes } from '@/content/log';
import { publishedEpisodes, SERIES } from '@/content/podcast';
import { publishedEssays } from '@/content/why';
import { publishedReviews } from '@/content/reviews';
import { publishedExplainers } from '@/content/explain';
import { books, serialisedChapters } from '@/content/books';
import { PERSON, SITE_URL } from './site';

export type FeedItem = {
  id: string;
  url: string;
  title: string;
  summary: string;
  updated: string;
  tags: string[];
};

/**
 * One feed for the whole logbook: notes, episode scripts, essays, reviews,
 * explainers and serialised chapters. Drafts and unwritten stubs never
 * appear — every list here is a published*() list.
 */
export function feedItems(): FeedItem[] {
  const items: FeedItem[] = [
    ...publishedNotes().map((n) => ({
      id: `${SITE_URL}/log/${n.slug}/`,
      url: `${SITE_URL}/log/${n.slug}/`,
      title: `Note: ${n.title}`,
      summary: n.description,
      updated: n.date,
      tags: n.subjects ?? ['Field note'],
    })),
    ...publishedEpisodes()
      .filter((e) => e.audio || e.script.length > 0)
      .map((e) => ({
        id: `${SITE_URL}/podcast/${e.slug}/`,
        url: `${SITE_URL}/podcast/${e.slug}/`,
        title: `${SERIES.name} S${SERIES.season}E${e.number}: ${e.title}`,
        summary: e.description,
        updated: e.date ?? '2026-09-01',
        tags: ['Podcast', SERIES.name],
      })),
    ...publishedEssays().map((n) => ({
      id: `${SITE_URL}/why/${n.slug}/`,
      url: `${SITE_URL}/why/${n.slug}/`,
      title: `Why: ${n.title}`,
      summary: n.description,
      updated: n.date,
      tags: n.subjects ?? ['Essay'],
    })),
    ...publishedReviews().map((r) => ({
      id: `${SITE_URL}/reviews/${r.slug}/`,
      url: `${SITE_URL}/reviews/${r.slug}/`,
      title: `Review: ${r.title}`,
      summary: r.description,
      updated: r.updated,
      tags: ['Review', r.category],
    })),
    ...publishedTopics().map((t) => ({
      id: `${SITE_URL}/topics/${t.slug}/`,
      url: `${SITE_URL}/topics/${t.slug}/`,
      title: t.title,
      summary: t.description,
      updated: t.updated,
      tags: t.subjects,
    })),
    ...publishedExplainers().map((t) => ({
      id: `${SITE_URL}/explain/${t.slug}/`,
      url: `${SITE_URL}/explain/${t.slug}/`,
      title: t.title,
      summary: t.description,
      updated: t.updated,
      tags: t.subjects,
    })),
    ...books.flatMap((b) =>
      serialisedChapters(b).map((c) => ({
        id: `${SITE_URL}/books/${b.slug}/chapter-${c.number}/`,
        url: `${SITE_URL}/books/${b.slug}/chapter-${c.number}/`,
        title: `${b.title} — ${c.title}`,
        summary: c.summary ?? `${c.title}, serialised.`,
        updated: '2026-09-01',
        tags: ['Book', b.title],
      })),
    ),
  ];
  return items.sort((a, b) => b.updated.localeCompare(a.updated));
}

export const FEED_TITLE = `${PERSON.legalName} — Logbook`;
export const FEED_DESCRIPTION =
  'Weekly field notes from HV rail and grids, the Residuals podcast, reviews, explainers and two books serialised in public.';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function rss(items: FeedItem[]): string {
  const latest = items[0]?.updated ?? new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(FEED_TITLE)}</title>
    <link>${SITE_URL}/log/</link>
    <description>${esc(FEED_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${new Date(latest).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${i.url}</link>
      <guid isPermaLink="true">${i.id}</guid>
      <description>${esc(i.summary)}</description>
      <pubDate>${new Date(i.updated).toUTCString()}</pubDate>
${i.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n')}
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`;
}

export function atom(items: FeedItem[]): string {
  const latest = items[0]?.updated ?? new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${esc(FEED_TITLE)}</title>
  <subtitle>${esc(FEED_DESCRIPTION)}</subtitle>
  <link href="${SITE_URL}/atom.xml" rel="self"/>
  <link href="${SITE_URL}/log/"/>
  <id>${SITE_URL}/</id>
  <updated>${new Date(latest).toISOString()}</updated>
  <author><name>${esc(PERSON.legalName)}</name><uri>${SITE_URL}/</uri></author>
${items
  .map(
    (i) => `  <entry>
    <title>${esc(i.title)}</title>
    <link href="${i.url}"/>
    <id>${i.id}</id>
    <updated>${new Date(i.updated).toISOString()}</updated>
    <summary>${esc(i.summary)}</summary>
${i.tags.map((t) => `    <category term="${esc(t)}"/>`).join('\n')}
  </entry>`,
  )
  .join('\n')}
</feed>
`;
}

export function jsonFeed(items: FeedItem[]) {
  return {
    version: 'https://jsonfeed.org/version/1.1',
    title: FEED_TITLE,
    home_page_url: `${SITE_URL}/log/`,
    feed_url: `${SITE_URL}/feed.json`,
    description: FEED_DESCRIPTION,
    language: 'en',
    authors: [{ name: PERSON.legalName, url: SITE_URL }],
    items: items.map((i) => ({
      id: i.id,
      url: i.url,
      title: i.title,
      summary: i.summary,
      date_modified: new Date(i.updated).toISOString(),
      tags: i.tags,
      authors: [{ name: PERSON.legalName }],
    })),
  };
}
