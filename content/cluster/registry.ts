/**
 * registry.ts — the repository registry of the Operations cluster.
 *
 * One entry per repository or capability the mandate names. Every field is
 * either quoted from the repository's own README, stated by the operator, or
 * marked null. Live GitHub metadata (language, last push, topics) is fetched
 * at build time by lib/github.ts and never written here by hand.
 *
 * Inventory basis: public GitHub inventory of github.com/iceccarelli taken on
 * 2026-09-05. Repositories the mandate names but the inventory could not
 * locate are listed with `repo: null` and maturity 'not-located' — the site
 * says what it could not find rather than inventing a link.
 *
 * Promoting, demoting or archiving an entry is a registry edit plus a decision
 * in decisions.ts. The two must agree; the CI guard checks that every
 * ARCHIVE entry has a matching kill-list entry.
 */

import type { RegistryEntry } from './types';

export const REGISTRY_REVIEWED = '2026-09-05';

export const registry: RegistryEntry[] = [
  /* ── CORE ─────────────────────────────────────────────────────────── */
  {
    slug: 'runway-fuel',
    name: 'Runway Fuel',
    repo: null,
    site: null,
    tier: 'core',
    status: 'INTERNAL',
    layer: 'operations-os',
    maturity: 'hypothesis',
    description:
      'The Operations OS the vertical applications are meant to sit on. Per the mandate it remains a platform hypothesis: identity, organizations, users, permissions, jobs, assets, documents, workflow engine, notifications, audit logs, integrations, AI tools, reporting and billing are extracted only after repeated customer evidence.',
    stack: [],
    hypothesis:
      'Two or more independent paying customers will require the same job → documentation → invoice workflow, making shared primitives cheaper than per-vertical code.',
    customer: 'None yet. Runway Fuel has no customer of its own by design; it inherits them from the verticals.',
    role: 'Platform hypothesis. Not to be generalized prematurely.',
    duplicates: ['ecowoods-app', 'bahn-project-manager'],
    gate:
      'Promote to CORE code only when at least two independent customers require similar workflows. Until then nothing is built here that a vertical does not already need.',
    risk: 'Premature generalization — the mandate names it explicitly. No public repository located under this name on 2026-09-05.',
    reviewed: REGISTRY_REVIEWED,
  },
  {
    slug: 'ecowoods-app',
    name: 'ecowoods-app',
    repo: 'iceccarelli/ecowoods-app',
    site: 'https://ecowoods.ca',
    tier: 'core',
    status: 'CORE',
    layer: 'contractors',
    maturity: 'live-no-paying-customers',
    description:
      'The web platform behind Ecowoods Hardwood Flooring Inc., a Toronto hardwood contractor operating since 2000: installation, refinishing, dust-free sanding, restoration, custom inlays and stair refinishing across the GTA. The repository is the single source of the facts every search engine, map service, directory and AI system resolves for this business; job management, quoting, invoicing and lead capture live in the same monorepo.',
    stack: ['pnpm', 'Turborepo', 'Next.js 15', 'TypeScript', 'Prisma', 'Supabase'],
    hypothesis:
      'A contractor that runs its whole lead → estimate → quote → schedule → job → invoice workflow on this software saves enough hours per month that a second, unrelated contractor would pay for the same thing.',
    customer:
      'One operating business (Ecowoods Hardwood Flooring Inc.) uses it in production. The software has no external paying customer yet.',
    role: 'Commercial proving ground. Every workflow claim in this cluster is tested here first.',
    duplicates: ['runway-fuel', 'field-service-software', 'contractor-software'],
    gate:
      'Stays CORE while it is the only place a complete contractor workflow runs with real jobs and real invoices. Second contractor on the same code → extract shared primitives into Runway Fuel.',
    risk:
      'Business facts (NAP, reviews, pricing) are load-bearing for a real company; the repository enforces them from one constants file and fails the build when a retired literal reappears.',
    reviewed: REGISTRY_REVIEWED,
  },

  /* ── VERTICAL APPLICATIONS ────────────────────────────────────────── */
  {
    slug: 'floorforge-ai',
    name: 'FloorForge',
    repo: 'iceccarelli/floorforge-ai',
    site: 'https://floorforge-ai.vercel.app',
    tier: 'vertical',
    status: 'EXPERIMENT',
    layer: 'contractors',
    maturity: 'pre-launch',
    description:
      'Marketing and pilot-waitlist site for an operating system for autonomous hardwood floor refinishing — early stage, pilot program forming. Hardware and software are in development; all specifications are design targets, pricing is indicative, and the ROI calculator is a transparent model with stated assumptions, not measured customer results.',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Clerk (optional)', 'Supabase (optional)'],
    hypothesis:
      'Flooring contractors will join a paid pilot for robot-assisted refinishing because labour is the binding constraint on their throughput.',
    customer: 'None. The one conversion path is the pilot waitlist.',
    role: 'Vertical experiment — flooring. Shares its buyer with the EcoWoods proving ground.',
    duplicates: ['paintforge-ai', 'dryforge-ai'],
    gate:
      'Freeze if the validation period ends without a signed pilot. Moves to the Physical AI cluster only if actual robotic execution exists — a documented cluster move with CEO approval, not a drift.',
    risk:
      'Every number on the site is a design target and must stay labelled as such. No shipped hardware or production software yet.',
    reviewed: REGISTRY_REVIEWED,
  },
  {
    slug: 'paintforge-ai',
    name: 'PaintForge',
    repo: 'iceccarelli/paintforge-ai',
    site: 'https://paintforge-ai.vercel.app',
    tier: 'vertical',
    status: 'EXPERIMENT',
    layer: 'contractors',
    maturity: 'pre-launch',
    description:
      'Robotic wall-and-ceiling painting for contractors, positioned as a 2026 GTA pilot program on a robot-as-a-service model. The repository is the marketing site with a 3D simulator; the published figures — 4× crew output, ±2 mil thickness tolerance, 1,000+ sq ft per coat per day — are engineering targets for pilot units, not measurements.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'react-three-fiber', 'Resend', 'Zod'],
    hypothesis:
      'General contractors and painting subcontractors in the GTA will pay per finished square foot for consistency and schedule certainty they cannot hire.',
    customer: 'None. Pilot program recruiting.',
    role: 'Vertical experiment — painting.',
    duplicates: ['floorforge-ai', 'dryforge-ai'],
    gate: 'Same as FloorForge: signed pilot within the validation period or freeze. One of the three Forge verticals wins; the others do not launch simultaneously.',
    risk: 'Targets presented alongside pricing must never be read as delivered performance.',
    reviewed: REGISTRY_REVIEWED,
  },
  {
    slug: 'dryforge-ai',
    name: 'DryForge',
    repo: 'iceccarelli/dryforge-ai',
    site: null,
    tier: 'vertical',
    status: 'EXPERIMENT',
    layer: 'contractors',
    maturity: 'pre-launch',
    description:
      'Robot-assisted drywall finishing as a service — semi-autonomous taping, mudding and sanding supervised by trained operators, sold per finished square foot with no capex for contractors. Pre-launch, recruiting founding pilot partners in the GTA. The repository states plainly: no deployed robots, no customers, no certifications.',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS 4', 'Clerk (optional)', 'Supabase (optional)'],
    hypothesis:
      'Drywall finishing is labour-bound and quality-variable enough that a contractor will pay per square foot for a supervised robot cell.',
    customer: 'None. Founding pilot partners sought.',
    role: 'Vertical experiment — drywall.',
    duplicates: ['floorforge-ai', 'paintforge-ai'],
    gate: 'Signed pilot within the validation period or freeze. Domain ownership (dryforge.ai) is unconfirmed per the repository; no production URL is listed here until it is.',
    risk: 'The README carries an explicit honesty policy: no fabricated metrics, fake customers or certification claims. It binds this registry too.',
    reviewed: REGISTRY_REVIEWED,
  },
  {
    slug: 'bahn-project-manager',
    name: 'Bahn Project Manager',
    repo: 'iceccarelli/bahn-project-manager',
    site: null,
    tier: 'vertical',
    status: 'INTERNAL',
    layer: 'critical-infrastructure',
    maturity: 'internal-tool',
    description:
      'Enterprise platform for managing railway infrastructure and station-development projects across 14 technical departments (Fachbereiche), data-driven from a 1,298-project dataset, deployed as a static SPA. Typecheck, lint, tests and build are green end to end on main; the README records the measured state of the repository rather than an aspiration.',
    stack: ['Vite 7', 'React 19', 'TypeScript 5.9', 'Tailwind v4', 'Biome', 'Vitest', 'pnpm 10'],
    hypothesis:
      'Infrastructure operators with many parallel projects and many review departments lose money on coordination — dashboards and a structured project intake (Projektanmeldung) recover it.',
    customer: 'Internal use context only. No commercial customer.',
    role: 'Vertical hypothesis — critical infrastructure project operations. The cluster’s only foothold outside contracting.',
    duplicates: ['operational-dashboards', 'runway-fuel'],
    gate:
      'Becomes an EXPERIMENT only with a named buyer and a dataset the cluster is entitled to commercialize. Until then it stays INTERNAL.',
    risk:
      'The project dataset belongs to its data owner. Commercial use of the tool requires clearance from that owner and a clean separation of data from code. Licence in the repository: MIT.',
    reviewed: REGISTRY_REVIEWED,
  },

  /* ── RELATED ──────────────────────────────────────────────────────── */
  {
    slug: 'logistisync',
    name: 'LogistiSync',
    repo: null,
    site: null,
    tier: 'related',
    status: 'INTERNAL',
    layer: 'logistics',
    maturity: 'not-located',
    description:
      'Named in the mandate as a related logistics repository. No public repository under this name was located in the inventory of 2026-09-05. Listed so the gap is visible, not filled with a guess.',
    stack: [],
    hypothesis: 'Logistics operators lose money on dispatch and load synchronization.',
    customer: 'None known.',
    role: 'Related — logistics. Unverified.',
    duplicates: [],
    gate: 'Locate the repository or the private source, review it against this registry, then assign a status. If nothing exists: ARCHIVE the name.',
    risk: 'A mandate that names code nobody can find is a mandate with a hole in it. Resolve within the first review cycle.',
    reviewed: REGISTRY_REVIEWED,
  },
  {
    slug: 'equipment-tracking',
    name: 'Equipment tracking',
    repo: null,
    site: null,
    tier: 'related',
    status: 'INTERNAL',
    layer: 'field-service',
    maturity: 'not-located',
    description:
      'Named in the mandate as a related capability. No dedicated public repository located on 2026-09-05. Asset and equipment tracking would be a Runway Fuel primitive (assets) if two customers ask for it.',
    stack: [],
    hypothesis: 'Contractors and field-service firms lose tools, miss maintenance and double-book equipment.',
    customer: 'None known.',
    role: 'Related — capability, not yet code.',
    duplicates: ['runway-fuel'],
    gate: 'Build only on customer request. Two requests → Runway Fuel `assets` primitive.',
    risk: 'None while it is not built.',
    reviewed: REGISTRY_REVIEWED,
  },
  {
    slug: 'field-service-software',
    name: 'Field-service software',
    repo: null,
    site: null,
    tier: 'related',
    status: 'INTERNAL',
    layer: 'field-service',
    maturity: 'hypothesis',
    description:
      'Capability category named in the mandate. No dedicated repository; scheduling, dispatch and job documentation of this kind currently exist inside ecowoods-app. Field service is one of the six candidate wedges.',
    stack: [],
    hypothesis: 'Field-service firms are a candidate wedge if contracting does not validate.',
    customer: 'None. Candidate wedge.',
    role: 'Related — candidate vertical.',
    duplicates: ['ecowoods-app'],
    gate: 'Only becomes a repository after the wedge decision, and only if the wedge is field service.',
    risk: 'Building it before the wedge decision violates §4.',
    reviewed: REGISTRY_REVIEWED,
  },
  {
    slug: 'contractor-software',
    name: 'Contractor software',
    repo: null,
    site: null,
    tier: 'related',
    status: 'INTERNAL',
    layer: 'contractors',
    maturity: 'hypothesis',
    description:
      'Capability category named in the mandate — the generalized form of what ecowoods-app does for one contractor. It does not exist as separate code and must not until the proving ground produces a second contractor.',
    stack: [],
    hypothesis: 'Specialty contractors will pay for the smallest complete workflow, not a platform.',
    customer: 'None beyond the proving ground.',
    role: 'Related — the generalization target of ecowoods-app.',
    duplicates: ['ecowoods-app', 'runway-fuel'],
    gate: 'Second contractor customer on ecowoods-app code.',
    risk: 'Premature generalization.',
    reviewed: REGISTRY_REVIEWED,
  },
  {
    slug: 'operational-dashboards',
    name: 'Operational dashboards',
    repo: null,
    site: null,
    tier: 'related',
    status: 'INTERNAL',
    layer: 'industrial-services',
    maturity: 'hypothesis',
    description:
      'Capability category named in the mandate. Dashboard capability currently exists inside bahn-project-manager (project portfolio, department reviews, station map) and in the labelled sample dashboards of the Forge sites.',
    stack: [],
    hypothesis: 'Operators pay for dashboards only when the dashboard changes a decision that costs money.',
    customer: 'None.',
    role: 'Related — capability slot.',
    duplicates: ['bahn-project-manager'],
    gate: 'A dashboard is built when a paying customer names the decision it must inform.',
    risk: 'Dashboards are the classic vanity feature. §11 applies.',
    reviewed: REGISTRY_REVIEWED,
  },
  {
    slug: 'grimaldi-ca',
    name: 'grimaldi.ca',
    repo: 'iceccarelli/grimaldi.ca',
    site: 'https://grimaldi.ca',
    tier: 'related',
    status: 'INTERNAL',
    layer: 'control-surface',
    maturity: 'internal-tool',
    description:
      'This site. The control and integration surface of the Operations cluster: registry, KPI system, decision log, kill list, roadmap, weekly CEO report, cross-cluster contracts and the machine-readable index at /api/cluster/. It also carries the operator’s explainers and book manuscripts.',
    stack: ['Next.js 14', 'TypeScript', 'Vercel'],
    hypothesis: 'A cluster that can see its own evidence kills faster and sells earlier.',
    customer: 'The CEO layer.',
    role: 'Control surface. Sells nothing; displays and orchestrates.',
    duplicates: [],
    gate: 'Stays INTERNAL. Never becomes a product.',
    risk: 'The danger is decoration: a control room must show measured values or say "not yet measured". Nothing here is typed in as if measured.',
    reviewed: REGISTRY_REVIEWED,
  },
];

export const registryBySlug = (slug: string): RegistryEntry | undefined => registry.find((r) => r.slug === slug);

export const byTier = (tier: RegistryEntry['tier']): RegistryEntry[] => registry.filter((r) => r.tier === tier);
