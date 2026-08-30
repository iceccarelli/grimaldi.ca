/**
 * site.ts — single source of truth for identity, URLs and conversion endpoints.
 *
 * Every surface (metadata, JSON-LD, sitemap, forms) reads from here so the
 * legal name, the canonical host and the contact channels can never drift.
 *
 * CONVERSION ENDPOINTS — action required (see 0–48h checklist):
 *  - FORM_ENDPOINT: create a free form at https://formspree.io → paste the
 *    endpoint ("https://formspree.io/f/xxxxxxxx"). Until then the contact
 *    form degrades to a prefilled email draft — wire it immediately.
 *  - CAL_URL: create https://cal.com event (Europe/Berlin) → paste the link.
 *  - NEWSLETTER_ACTION: create a https://buttondown.com list → paste
 *    "https://buttondown.com/api/emails/embed-subscribe/<username>".
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

export const SITE_TITLE =
  'Vincenzo Ceccarelli Grimaldi — Electrical Engineer, Frankfurt | Grid Digitalisation & Physics-Informed Systems';

export const SITE_DESCRIPTION =
  'Vincenzo Ceccarelli Grimaldi is an electrical engineer in Frankfurt working on the digitalisation of high-voltage rail infrastructure — the personal surface of the Grimaldi Network: the journey, two book manuscripts with public proof engines, and the ventures.';

/* ── Conversion endpoints (REPLACE before relying on them) ─────────── */
export const FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_ME';
export const CAL_URL = ''; // e.g. 'https://cal.com/vincenzo-ceccarelli-grimaldi/intro'
export const NEWSLETTER_ACTION = ''; // Buttondown embed-subscribe URL

export const formConfigured = () => !FORM_ENDPOINT.includes('REPLACE_ME');
export const newsletterConfigured = () => NEWSLETTER_ACTION.length > 0;
