/**
 * feeds.ts — one feed model, three serialisations.
 *
 * Drafts never appear here: the item list is built from publishedTopics()
 * only, so the draft rule is enforced in one place rather than three.
 */

import { publishedTopics } from '@/content/topics';
import { PERSON, SITE_URL } from './site';

export type FeedItem = {
  id: string;
  url: string;
  title: string;
  summary: string;
  updated: string;
  tags: string[];
};

export function feedItems(): FeedItem[] {
  return publishedTopics().map((t) => ({
    id: `${SITE_URL}/topics/${t.slug}/`,
    url: `${SITE_URL}/topics/${t.slug}/`,
    title: t.title,
    summary: t.description,
    updated: t.updated,
    tags: t.subjects,
  }));
}

export const FEED_TITLE = `${PERSON.legalName} — Topics`;
export const FEED_DESCRIPTION =
  'Technical explainers on grid digitalisation, power system stability and industrial control security.';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function rss(items: FeedItem[]): string {
  const latest = items[0]?.updated ?? new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(FEED_TITLE)}</title>
    <link>${SITE_URL}/topics/</link>
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
  <link href="${SITE_URL}/topics/"/>
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
    home_page_url: `${SITE_URL}/topics/`,
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
