/**
 * types.ts — the knowledge layer's content contract.
 *
 * Content is typed TypeScript, not MDX: no parser dependency, no runtime
 * markdown cost, and `tsc` refuses to build a topic with a missing field or a
 * malformed source. Publishing a new explainer is one file in content/topics/
 * plus one line in content/topics/index.ts — no other code changes.
 *
 * THE DRAFT RULE, enforced in software rather than in discipline:
 * a topic with status 'draft' is rendered with noindex, carries a visible
 * "unreviewed draft" banner, and is excluded from the sitemap, the feeds and
 * the machine index. Nothing reaches a crawler until the author has read it
 * and flipped the status. An authority site publishes nothing it has not
 * verified.
 */

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'note'; text: string }
  | { kind: 'figure'; caption: string; rows: [string, string][] };

export type Source = {
  /** Publisher or standards body — the authority being cited. */
  publisher: string;
  title: string;
  url?: string;
};

export type Term = { term: string; definition: string };

export type Topic = {
  slug: string;
  /** 'draft' → noindex, banner, excluded from sitemap/feeds/machine index. */
  status: 'draft' | 'published';
  title: string;
  /** <=155 chars — used verbatim as the meta description. */
  description: string;
  /** ISO date. */
  updated: string;
  /** Schema.org `about` terms and the on-page topic chips. */
  subjects: string[];
  /** Short standfirst rendered under the H1. */
  standfirst: string;
  blocks: Block[];
  /** Rendered as a DefinedTermSet — the part AI agents quote most. */
  glossary?: Term[];
  sources: Source[];
  /** Internal links: related routes on this site. */
  related?: { label: string; href: string }[];
};

/** ~200 wpm over prose blocks only. */
export function readingMinutes(topic: Topic): number {
  const words = topic.blocks
    .map((b) =>
      b.kind === 'list' ? b.items.join(' ') : b.kind === 'figure' ? b.rows.flat().join(' ') : b.text,
    )
    .join(' ')
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function wordCount(topic: Topic): number {
  return topic.blocks
    .map((b) =>
      b.kind === 'list' ? b.items.join(' ') : b.kind === 'figure' ? b.rows.flat().join(' ') : b.text,
    )
    .join(' ')
    .split(/\s+/).length;
}
