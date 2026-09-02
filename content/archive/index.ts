/**
 * The archive. Everything that used to be a section, a card or a rail on
 * this domain lives here as a row with a badge. Nothing is deleted; nothing
 * is called flagship. Client platforms are client platforms. Parked names
 * are parked, with the reason.
 */

import type { Badge } from '../types';

export type ArchiveRow = {
  title: string;
  badge: Badge;
  line: string;
  href?: string;
  owner?: string;
};

export type ArchiveGroup = { id: string; title: string; intro: string; rows: ArchiveRow[] };

export const timeline: { year: string; title: string; line: string }[] = [
  {
    year: '2025',
    title: 'RWTH Aachen — M.Sc.',
    line: 'Thesis: a cross-domain CIM–ThreMA ontology with reinforcement-learning security agents. The thesis repository and a public simulator descend from it.',
  },
  {
    year: '2024–',
    title: 'Frankfurt — DB InfraGO',
    line: 'ITk Fachspezialist. Digitisation of high-voltage traction assets; IT/OT convergence; critical-infrastructure (KRITIS) governance. No employer data appears on this domain.',
  },
  {
    year: '2026',
    title: 'Three domains',
    line: 'igrimaldi.engineering (grid intelligence), engineeringgrimaldi.com (the trade cell) and this logbook — one person, one mark, four languages.',
  },
  {
    year: '2026',
    title: 'Two manuscripts, one cell',
    line: 'The Renewables Migration and The Orbital AI Compute Roadmap in revision; one palletizing cell shipped. Everything else on this page is context.',
  },
];

export const groups: ArchiveGroup[] = [
  {
    id: 'engines',
    title: 'Chapter proof engines',
    intro: 'Eleven public repositories, one per chapter of The Renewables Migration. Indexed from the book, not from any vendor page.',
    rows: [
      {
        title: 'Renewables_Migration_Chapter1…11_Proof_Engine',
        badge: 'RUNNABLE',
        line: 'Recompute each chapter’s load-bearing figures from source data. Several are archived on GitHub as finished; archived is not withdrawn.',
        href: '/books/the-renewables-migration/',
        owner: 'grimaldi.ca → github.com/iceccarelli',
      },
    ],
  },
  {
    id: 'theses',
    title: 'Thesis dumps',
    intro: 'The academic record, as repositories. Dumps, not showcases.',
    rows: [
      {
        title: 'Master_Thesis_Vincenzo_Grimaldi',
        badge: 'RESEARCH',
        line: 'RWTH Aachen, 2025. CIM–ThreMA ontology and RL agents for smart-grid cyber-defence.',
        href: 'https://github.com/iceccarelli/Master_Thesis_Vincenzo_Grimaldi',
        owner: 'github.com/iceccarelli',
      },
      {
        title: 'Bachelor_Thesis_Vincenzo_Grimaldi_Urkunde',
        badge: 'RESEARCH',
        line: 'The bachelor thesis and its certificate.',
        href: 'https://github.com/iceccarelli/Bachelor_Thesis_Vincenzo_Grimaldi_Urkunde',
        owner: 'github.com/iceccarelli',
      },
      {
        title: 'The thesis, running',
        badge: 'RUNNABLE',
        line: 'Physics-informed power flow on the IEEE 9-bus benchmark with residuals you can check. A demo of the mechanism, not a deployment.',
        href: 'https://physics-informed.vercel.app/',
        owner: 'physics-informed.vercel.app',
      },
    ],
  },
  {
    id: 'client',
    title: 'Client platforms',
    intro: 'Built for other people’s businesses. Their companies, my code.',
    rows: [
      {
        title: 'Plastilonas Peruanas SAC',
        badge: 'CLIENT BUILD',
        line: 'B2B commerce platform for a Lima industrial-textiles manufacturer. Live, with source.',
        href: 'https://plastilonas-peruanas-sac.vercel.app',
        owner: 'plastilonas-peruanas-sac.vercel.app · github.com/iceccarelli/Plastilonas-Peruanas-SAC',
      },
      {
        title: 'Ecowoods (Toronto, est. 2000)',
        badge: 'CLIENT BUILD',
        line: 'Job-management platform for a hardwood flooring shop — a client platform and a possible channel for the trade cell. Not my company.',
        href: 'https://ecowoods.ca',
        owner: 'ecowoods.ca · github.com/iceccarelli/ecowoods-app',
      },
    ],
  },
  {
    id: 'portfolios',
    title: 'Old portfolios and holding sites',
    intro: 'Earlier versions of the network, kept as repositories.',
    rows: [
      {
        title: 'vincenzo-grimaldi-portfolio',
        badge: 'SHIPPED',
        line: 'The repository behind igrimaldi.engineering, through every redesign.',
        href: 'https://github.com/iceccarelli/vincenzo-grimaldi-portfolio',
        owner: 'github.com/iceccarelli',
      },
      {
        title: 'The digital business card',
        badge: 'SHIPPED',
        line: 'vCard, QR and every channel on one URL.',
        href: 'https://igrimaldi.engineering/card',
        owner: 'igrimaldi.engineering',
      },
    ],
  },
  {
    id: 'parked',
    title: 'Parked names',
    intro: 'Names that exist and are deliberately not being built. The reason is the essay.',
    rows: [
      {
        title: 'PaintForge',
        badge: 'PARKED',
        line: 'A second trade cell before the first has paying measurements is dilution, not a roadmap. See “Why one cell, not ten”.',
        href: '/why/why-one-cell-not-ten/',
        owner: 'grimaldi.ca',
      },
      {
        title: 'FloorForge · DryForge',
        badge: 'PARKED',
        line: 'Names on the trade site’s line. Not built here; whether they are built at all is decided by the first cell’s numbers.',
        href: 'https://engineeringgrimaldi.com/',
        owner: 'engineeringgrimaldi.com',
      },
    ],
  },
  {
    id: 'pointers',
    title: 'Things that live elsewhere',
    intro: 'One line, one verb. The artefact belongs to the domain that ships it.',
    rows: [
      {
        title: 'Grid intelligence platforms',
        badge: 'SHIPPED',
        line: 'Read the work registry on the grid domain. Nothing there is cloneable from here, and it is not repeated here.',
        href: 'https://igrimaldi.engineering/work',
        owner: 'igrimaldi.engineering',
      },
      {
        title: 'The palletizing cell planner',
        badge: 'SHIPPED',
        line: 'Try the planner on the trade domain.',
        href: 'https://palletizer-app.vercel.app/',
        owner: 'palletizer-app.vercel.app',
      },
    ],
  },
];
