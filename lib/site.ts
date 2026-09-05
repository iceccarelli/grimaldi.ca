/**
 * site.ts — single source of truth for identity, URLs and conversion endpoints.
 *
 * Every surface (metadata, JSON-LD, sitemap, forms) reads from here so the
 * legal name, the canonical host and the contact channels can never drift.
 *
 * Conversion endpoints are first-party API routes — see the block below.
 */

export const SITE_URL = 'https://grimaldi.ca';

export const PERSON = {
  legalName: 'Vincenzo Ceccarelli Grimaldi',
  shortName: 'Vincenzo Grimaldi',
  jobTitle: 'Electrical Engineer — Grid Digitalisation & Physics-Informed Cyber-Physical Systems',
  city: 'Frankfurt am Main',
  country: 'Germany',
  email: 'vincenzo@igrimaldi.engineering',
  personId: 'https://igrimaldi.engineering/#person', // network-wide @id — never change per-site
  sameAs: [
    'https://github.com/iceccarelli',
    'https://www.linkedin.com/in/vincenzo-ceccarelli-grimaldi-2912b42a0',
    'https://x.com/Vince87Grimaldi',
    'https://www.instagram.com/grimaldiengineering/',
    'https://igrimaldi.engineering/',
    'https://engineeringgrimaldi.com/',
  ],
} as const;

/**
 * What this site is. grimaldi.ca is the control and integration surface of
 * the Operations & Commercial Automation cluster (Agent 3): it displays the
 * repository registry, the KPI system, the decision log and the cross-cluster
 * contracts, and orchestrates nothing by itself — it sells nothing, it shows
 * evidence. The operator's explainers and manuscripts stay on the site.
 */
export const CLUSTER = {
  name: 'Operations & Commercial Automation',
  short: 'Operations cluster',
  agent: 'Agent 3',
  command: 'Make money and build distribution.',
  operator: 'Grimaldi Engineering',
} as const;

export const SITE_TITLE = `${CLUSTER.short} — control surface · ${PERSON.shortName}`;

export const SITE_DESCRIPTION =
  'Control and integration surface of the Operations & Commercial Automation cluster (Agent 3, Grimaldi Engineering): repository registry, KPI system, decision log, kill list, 90-day roadmap counted from customer evidence, and versioned cross-cluster contracts. Nothing is for sale here; every number is measured or marked not yet measured.';

/**
 * The doors. Each entry names another site in the network and says in a few
 * words what a visitor will find there. Text links only — no tiles, no
 * product copy, nothing absorbed from the sites themselves.
 */
export const DOORS = [
  { href: 'https://engineeringgrimaldi.com', label: 'engineeringgrimaldi.com', what: 'palletizing software company (Physical AI cluster)' },
  { href: 'https://igrimaldi.engineering', label: 'igrimaldi.engineering', what: 'engineering notebook' },
  {
    href: 'https://ecowoods.ca',
    label: 'ecowoods.ca',
    what: 'Toronto hardwood contractor — the cluster’s commercial proving ground (open ecowoods-app repository)',
  },
] as const;

/** Footer order, fixed. */
export const FOOTER_SITES = [
  { href: 'https://engineeringgrimaldi.com', label: 'engineeringgrimaldi.com' },
  { href: 'https://igrimaldi.engineering', label: 'igrimaldi.engineering' },
  { href: 'https://ecowoods.ca', label: 'ecowoods.ca' },
  { href: 'https://greenhardwood.ca', label: 'greenhardwood.ca' },
  { href: 'https://github.com/iceccarelli', label: 'GitHub' },
] as const;

/* ── Conversion endpoints — FIRST PARTY ─────────────────────────────
 * The contact form and the one-email subscribe post to this site's own API
 * routes. No Formspree, no Buttondown, no vendor account required.
 *
 * One environment variable arms the whole layer (Vercel → Settings →
 * Environment Variables, all environments):
 *
 *   RESEND_API_KEY   required — https://resend.com, free tier, 60 seconds
 *   CONTACT_TO       optional — override the destination inbox
 *   CONTACT_FROM     optional — verified sender once your domain is added
 *
 * Until RESEND_API_KEY exists the routes answer 503 and the forms tell the
 * visitor to email directly. Honest failure, never a silent drop.
 */
export const CONTACT_ENDPOINT = '/api/contact/'; // trailing slash is REQUIRED: trailingSlash:true 308-redirects the bare path, and a 308 on POST drops the body in some clients
export const SUBSCRIBE_ENDPOINT = '/api/subscribe/';

/**
 * Search engine ownership verification. Paste the token from the HTML-tag
 * method — Search Console → Add property → HTML tag → copy the content value
 * only (not the whole meta tag). Bing accepts import from Google.
 */
export const VERIFY_GOOGLE = '';
export const VERIFY_BING = '';

/** Booking: paste a Cal.com link (Europe/Berlin) to promote it to a hero CTA. */
export const CAL_URL = '';
