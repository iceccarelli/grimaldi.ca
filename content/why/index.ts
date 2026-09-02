/**
 * Why — the love essays. The only place on the network allowed to be human.
 * Rules: first person, no LinkedIn-speak, no product names as heroes.
 * A stub is a title with no blocks; it renders as an honest unwritten page.
 */

import type { Note } from '../types';

const oneCell: Note = {
  slug: 'why-one-cell-not-ten',
  status: 'published',
  badge: 'IN REVISION',
  title: 'Why one cell, not ten',
  description:
    'I had names for ten automation products. I shipped one. This is why the other nine are parked, and why I think that was the engineering decision, not the timid one.',
  date: '2026-09-01',
  subjects: ['Wedge', 'Trades', 'Focus'],
  artefact: {
    label: 'The one cell — shipped and measured',
    href: 'https://engineeringgrimaldi.com/',
    owner: 'engineeringgrimaldi.com',
  },
  blocks: [
    {
      kind: 'p',
      text:
        'At one point I had a name for every trade. FloorForge, PaintForge, DryForge — a product line on paper, one automation cell per craft, the whole of the building trades tidied into a roadmap. It looked like ambition. It was a list.',
    },
    {
      kind: 'p',
      text:
        'A list is not a company and it is not engineering either. What I actually had was one cell that worked: a planner for stacking unequal boxes onto a pallet so that the stack stands up, runs on a real robot, and produces a number a plant manager can argue with. Everything else was a name and a repository with a README.',
    },
    { kind: 'h', text: 'What a shipped cell teaches you that a roadmap cannot' },
    {
      kind: 'p',
      text:
        'The moment something is deployed, reality starts sending you residuals. The boxes are not the dimensions in the ERP. The pallet has a broken board. The operator wants an override and wants it in two clicks, not five. None of this is in the roadmap, because the roadmap was written by someone who had not yet been wrong in front of a customer. Ten cells on paper generate zero of these lessons. One cell in a plant generates them weekly.',
    },
    {
      kind: 'p',
      text:
        'There is also a plainer reason. I have one pair of hands and a full-time job on the traction grid, which is where my judgment is actually being formed. A second cell before the first has a paying, measured customer is not a second bet — it is the first bet, diluted.',
    },
    { kind: 'h', text: 'Why I keep the names anyway' },
    {
      kind: 'p',
      text:
        'The parked names are not deleted. They sit in the archive with a badge that says PARKED and a sentence that says why. That is deliberate. A name that quietly disappears from a website becomes a rumour; a name with a stated reason for stopping becomes a decision you can be held to, and reversed in public if the reason changes.',
    },
    {
      kind: 'p',
      text:
        'So: one cell. When it has been measured long enough that I can write the number down without flinching, there will be a second. The podcast episode on this is the one where I try to say it out loud without sounding like I am pitching. I am not. I am counting.',
    },
  ],
};

const stub = (slug: string, title: string, description: string): Note => ({
  slug,
  status: 'draft',
  badge: 'IN REVISION',
  title,
  description,
  date: '2026-09-01',
  blocks: [],
});

export const essays: Note[] = [
  oneCell,
  stub('why-frankfurt', 'Why Frankfurt', 'A city chosen for the work, not the skyline. What the traction grid and the trading floor have in common.'),
  stub('why-rail-yards', 'Why rail yards', 'On finding the most interesting electrical engineering in the country behind a fence next to a siding.'),
  stub(
    'why-claim-by-claim-books',
    'Why claim-by-claim books',
    'Why I am rewriting two manuscripts one sentence at a time, and why each load-bearing claim gets a repository instead of a footnote.',
  ),
];

export const publishedEssays = (): Note[] =>
  essays.filter((e) => e.status === 'published').sort((a, b) => b.date.localeCompare(a.date));

export const essayBySlug = (slug: string): Note | undefined => essays.find((e) => e.slug === slug);
