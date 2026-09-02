/**
 * Residuals — the podcast. Hub before microphone.
 *
 * Series name is used everywhere and nowhere else: `SERIES.name`. Every
 * episode has exactly one claim, one number and one artefact, and the show
 * notes point BACK to the domain that owns the artefact. No audio URL is
 * recorded here until an audio file exists — `audio` is simply absent.
 */

import type { Episode } from '../types';

export const SERIES = {
  name: 'Residuals',
  tagline: 'One claim, one number, one artefact. 18–28 minutes.',
  format:
    'Each episode makes a single claim about grids, traction power or automation, names the one number that decides it, and points at the one public artefact where you can check it. No guests in season one. No sponsors. No audio until the script is honest.',
  season: 1,
} as const;

export const episodes: Episode[] = [
  {
    slug: 's1e1-black-box-on-a-traction-grid',
    number: 1,
    status: 'published',
    badge: 'IN REVISION',
    title: 'Why a black-box model on a traction grid is a career-ending idea',
    description:
      'A model you cannot bound is a model you cannot defend in front of the operator, the regulator or the accident board. Residuals are the bound.',
    claim: 'No model whose physics violation cannot be computed per output belongs on protection-relevant infrastructure.',
    figure: 'The physics residual of the proposed set-point — one scalar per decision, checkable before acting.',
    artefact: {
      label: 'Residuals on the IEEE 9-bus benchmark, in the browser',
      href: 'https://physics-informed.vercel.app/',
      owner: 'physics-informed.vercel.app',
    },
    script: [
      { kind: 'h', text: 'Cold open (2 min)' },
      {
        kind: 'p',
        text:
          'A traction grid is a 16.7 Hz island with trains for loads. Someone proposes putting a learned model in the loop. The question the room asks is not “how accurate is it?” — it is “what happens when it is wrong, and how will we know before the relay does?”',
      },
      { kind: 'h', text: 'The claim (5 min)' },
      {
        kind: 'p',
        text:
          'Accuracy on average is not a safety property. A bound on the physics violation of each individual output is. Black boxes give you the first; physics-informed models can give you the second. That difference is the whole argument, and it is not an AI argument — it is a state-estimation argument that is fifty years old.',
      },
      { kind: 'h', text: 'The number (6 min)' },
      {
        kind: 'p',
        text:
          'Walk through what a residual is: model prediction minus measurement, per channel. Why one large residual means a sensor, many slow residuals mean the model, and a residual on a proposed action means the action. Point at the field note.',
      },
      { kind: 'h', text: 'The artefact (5 min)' },
      {
        kind: 'p',
        text:
          'The IEEE 9-bus demo: physics-informed versus black-box on the same benchmark, residuals shown side by side. It proves the mechanism, not the deployment. Say so.',
      },
      { kind: 'h', text: 'What it does not prove (3 min)' },
      {
        kind: 'p',
        text:
          'Nine buses are not a railway. A demo is not a KRITIS-grade system. Nothing here is from any operator. The path from this to a substation LAN is the rest of the season.',
      },
    ],
  },
  {
    slug: 's1e2-ieee-9-bus-residuals',
    number: 2,
    status: 'published',
    badge: 'RESEARCH',
    title: 'IEEE 9-bus residuals — what the demo actually proves',
    description:
      'A public benchmark, an exact solver, a physics-informed model and a black box. What the side-by-side residuals show, and what they do not.',
    claim: 'On a standard benchmark, a physics-informed model’s violation of power-flow equations is measurable; a black box’s is not even defined.',
    figure: 'Residual against the exact AC power-flow solution on the IEEE 9-bus case.',
    artefact: {
      label: 'Run the comparison yourself',
      href: 'https://physics-informed.vercel.app/',
      owner: 'physics-informed.vercel.app',
    },
    script: [],
  },
  {
    slug: 's1e3-mixed-sku-stability-is-geometry',
    number: 3,
    status: 'published',
    badge: 'RESEARCH',
    title: 'Mixed-SKU stability is geometry, not AI',
    description:
      'Why a stable pallet of unequal boxes is a centre-of-mass and support-polygon problem, and why the shipped planner is deliberately not a neural network.',
    claim: 'Pallet stability for mixed SKUs is decided by geometry that can be checked in closed form; learning is the wrong tool for the load-bearing part.',
    figure: 'Stability margin of the stack — support-polygon test per placement, computed, not predicted.',
    artefact: {
      label: 'The shipped cell planner, and the trade site that owns it',
      href: 'https://engineeringgrimaldi.com/',
      owner: 'engineeringgrimaldi.com · palletizer-app.vercel.app',
    },
    script: [],
  },
  {
    slug: 's1e4-kritis-nis2-plain-language',
    number: 4,
    status: 'published',
    badge: 'RESEARCH',
    title: 'KRITIS / NIS2 in plain language',
    description:
      'What the German critical-infrastructure rules and the EU NIS2 directive actually require of an operator, said without a slide deck.',
    claim: 'The regulation does not forbid models on infrastructure; it forbids models nobody can account for.',
    figure: 'No number is claimed for this episode yet. It will be one obligation, quoted, with its article.',
    artefact: {
      label: 'The explainer this episode reads from',
      href: '/explain/kritis-vs-ai-act/',
      owner: 'grimaldi.ca',
    },
    script: [],
  },
  {
    slug: 's1e5-why-paintforge-is-parked',
    number: 5,
    status: 'published',
    badge: 'PARKED',
    title: 'Why PaintForge is parked',
    description:
      'A product name that exists, a repo that exists, and a decision to stop. The reasoning, so the name does not become a zombie.',
    claim: 'One wedge at a time: a second trade cell before the first one has paying measurements is a distraction, not a roadmap.',
    figure: 'The count of shipped, measured cells: one. The threshold for a second: more than one.',
    artefact: {
      label: 'The one that shipped instead',
      href: 'https://engineeringgrimaldi.com/',
      owner: 'engineeringgrimaldi.com',
    },
    script: [],
  },
  {
    slug: 's1e6-chapter-one-read-and-proof-engine',
    number: 6,
    status: 'published',
    badge: 'IN REVISION',
    title: 'Book chapter 1 read + proof engine',
    description:
      'The opening chapter of The Renewables Migration, read aloud, followed by running the chapter’s public proof engine on air.',
    claim: 'A book claim you can re-run is a different kind of claim from one you can only quote.',
    figure: 'Whatever the chapter-1 engine prints when it is run during the recording.',
    artefact: {
      label: 'Chapter 1 and its proof engine',
      href: '/books/the-renewables-migration/chapter-1/',
      owner: 'grimaldi.ca · github.com/iceccarelli',
    },
    script: [],
  },
];

export const publishedEpisodes = (): Episode[] =>
  episodes.filter((e) => e.status === 'published').sort((a, b) => a.number - b.number);

export const episodeBySlug = (slug: string): Episode | undefined => episodes.find((e) => e.slug === slug);

/** The latest episode that has more than a title: a script or audio. */
export const latestEpisode = (): Episode | undefined =>
  [...publishedEpisodes()].reverse().find((e) => e.audio || e.script.length > 0);
