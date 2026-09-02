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

/* ── v14: the logbook layer ─────────────────────────────────────────
 * Every non-topic artefact on this domain (a note, an episode, a review,
 * an essay, a chapter, an archive row) carries exactly one badge from this
 * closed set. The set is the honesty contract: nothing on grimaldi.ca is
 * "flagship", "coming soon" or "launching" — it is one of these seven.
 */
export type Badge =
  | 'IN REVISION'        // written, not yet verified line by line
  | 'RUNNABLE'           // a public repo or deployment reproduces it
  | 'WEEKLY SLOT EMPTY'  // the slot exists; this week's artefact does not
  | 'CLIENT BUILD'       // built for someone else's business, on contract
  | 'PARKED'             // deliberately stopped; the reason is on the page
  | 'RESEARCH'           // a question being worked, no artefact yet
  | 'SHIPPED';           // ONLY when the link points off-site to the thing itself

/** One line, one verb, one owner domain. Cross-links never become cards. */
export type Pointer = { label: string; href: string; owner: string };

export type Status = 'draft' | 'published';

/** A logbook entry — used by /log, /why and the podcast scripts. */
export type Note = {
  slug: string;
  status: Status;
  badge: Badge;
  title: string;
  /** <=155 chars, used verbatim as the meta description. */
  description: string;
  /** ISO date the note is dated (the week it belongs to). */
  date: string;
  /** Empty blocks = an outline that exists but is not yet written. */
  blocks: Block[];
  sources?: Source[];
  /** The artefact this note points BACK to, if any. */
  artefact?: Pointer;
  subjects?: string[];
};

export type Episode = {
  slug: string;
  number: number;
  status: Status;
  badge: Badge;
  title: string;
  description: string;
  /** The single claim the episode makes. */
  claim: string;
  /** The single number that decides the claim — or a plain statement that no number is claimed yet. */
  figure: string;
  /** The single artefact the show notes point back to. */
  artefact: Pointer;
  /** Script outline. Empty = title + claim only, no script yet. */
  script: Block[];
  /** Audio URL — never invented. Absent until a file exists. */
  audio?: string;
  date?: string;
};

export type Verdict = 'yes' | 'not yet' | 'no' | 'unreviewed';

/** A review in the house style. Every field answers one fixed question. */
export type Review = {
  slug: string;
  status: Status;
  badge: Badge;
  title: string;
  description: string;
  category: string;
  updated: string;
  whatItIs: string;
  whoItIsFor: string;
  numberPublished: string;
  whatTheyHid: string;
  substationLan: Verdict;
  blocks: Block[];
  sources?: Source[];
};

export type Chapter = {
  number: number;
  title: string;
  badge: Badge;
  /** Public proof-engine repository, when one exists. */
  engine?: string;
  /** Essay stub or serialised text. Empty = not yet serialised. */
  blocks: Block[];
  /** Short one-line summary shown in the chapter list. */
  summary?: string;
};

export type Book = {
  slug: string;
  title: string;
  description: string;
  about: string;
  standfirst: string;
  badge: Badge;
  chapters: Chapter[];
  og: string;
  waitlist: 'renewables-migration' | 'orbital-roadmap';
};

export const blocksWords = (blocks: Block[]): number =>
  blocks
    .map((b) => (b.kind === 'list' ? b.items.join(' ') : b.kind === 'figure' ? b.rows.flat().join(' ') : b.text))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;

export const minutesFor = (blocks: Block[]): number => Math.max(1, Math.round(blocksWords(blocks) / 200));
