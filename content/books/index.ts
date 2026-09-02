/**
 * The two manuscripts, serialised.
 *
 * Chapter titles are NOT invented here: until a chapter's text clears
 * revision it is listed by number only. A chapter with blocks is an essay
 * stub or the serial text; a chapter without blocks renders as an honest
 * "not yet serialised" page, noindex, absent from sitemap and feeds.
 *
 * Badges: RUNNABLE when a public proof engine exists for the chapter,
 * IN REVISION otherwise. The Orbital manuscript has no engines yet and says so.
 */

import type { Book, Chapter } from '../types';

const ENGINE = (n: number) => `https://github.com/iceccarelli/Renewables_Migration_Chapter${n}_Proof_Engine`;

const renewablesChapter1: Chapter = {
  number: 1,
  title: 'Chapter 1',
  badge: 'RUNNABLE',
  engine: ENGINE(1),
  summary: 'Germany did not stop importing energy — it changed what the import is made of.',
  blocks: [
    {
      kind: 'note',
      text:
        'IN REVISION · SERIAL. This is the essay stub for chapter 1 — the argument in its shortest honest form. The serialised chapter text replaces it here when it clears line-by-line revision. The proof engine linked below is public now.',
    },
    {
      kind: 'p',
      text:
        'The Energiewende is usually told as a story about fuel: coal out, gas out, wind and sun in. That is the visible half. The other half is that a country which used to import its energy as molecules — in tankers and pipelines, priced by the barrel and the cubic metre — now imports it as hardware: modules, inverters, cells, rare-earth magnets, power electronics. The energy still arrives from abroad. It arrives once, as a capital good, instead of continuously, as a commodity.',
    },
    {
      kind: 'p',
      text:
        'That swap changes almost everything a grid engineer cares about. A fuel import is a flow you can throttle; a hardware import is a stock that sits on the roof for twenty-five years and behaves according to firmware someone else wrote. A fuel-based system has inertia by accident, because the machines that burn the fuel are heavy and spin. A hardware-based system has inertia only on purpose, because somebody specified it.',
    },
    {
      kind: 'p',
      text:
        'The book’s first claim, then, is a receipt: what Germany paid for the migration, in which currency, to whom — and what it stopped paying. The proof engine for this chapter recomputes that receipt from public trade and energy statistics, so the number in the text is one you can regenerate rather than one you have to believe. The rest of the book follows the physics that the receipt buys: 50 Hz, the machines that keep it, and what has to be built so that a grid full of hardware imports can be given something like a brain without being given a black box.',
    },
    {
      kind: 'p',
      text:
        'Nothing in this stub states a figure. The figures are the chapter’s job, and the chapter is in revision. When a number appears on this page, it will have been produced by the engine, and the engine will be linked beside it.',
    },
  ],
};

const numbered = (from: number, to: number, engine: boolean): Chapter[] =>
  Array.from({ length: to - from + 1 }, (_, i) => {
    const n = from + i;
    return {
      number: n,
      title: `Chapter ${n}`,
      badge: engine ? 'RUNNABLE' : 'IN REVISION',
      ...(engine ? { engine: ENGINE(n) } : {}),
      blocks: [],
    } satisfies Chapter;
  });

export const books: Book[] = [
  {
    slug: 'the-renewables-migration',
    title: 'The Renewables Migration',
    description:
      'A book manuscript on how the energy transition actually gets built, by Vincenzo Ceccarelli Grimaldi. Eleven public chapter proof-engine repositories make every load-bearing number re-runnable.',
    about: 'Energy transition, electrical grid engineering, power systems',
    standfirst:
      'Germany traded fuel imports for hardware imports — the receipt, the physics of 50 Hz, and what it takes to give the grid a brain without giving it a black box.',
    badge: 'IN REVISION',
    chapters: [renewablesChapter1, ...numbered(2, 11, true)],
    og: '/og-renewables.png',
    waitlist: 'renewables-migration',
  },
  {
    slug: 'the-orbital-ai-compute-roadmap',
    title: 'The Orbital AI Compute Roadmap',
    description:
      'A book manuscript by Vincenzo Ceccarelli Grimaldi on the terrestrial trilemma of AI compute — inertia, copper, heat — and the honest case for what comes after. A book, not a product.',
    about: 'AI compute infrastructure, data centre power, thermal and grid constraints',
    standfirst:
      'The terrestrial trilemma of AI compute — inertia, copper, heat — and the honest case for what comes after. This is a book. It is not, and will not become, a product.',
    badge: 'IN REVISION',
    chapters: numbered(1, 11, false),
    og: '/og-orbital.png',
    waitlist: 'orbital-roadmap',
  },
];

export const bookBySlug = (slug: string): Book | undefined => books.find((b) => b.slug === slug);

export const chapterOf = (book: Book, n: number): Chapter | undefined =>
  book.chapters.find((c) => c.number === n);

/** Chapters with text — the only ones indexed, fed and sitemapped. */
export const serialisedChapters = (book: Book): Chapter[] => book.chapters.filter((c) => c.blocks.length > 0);
