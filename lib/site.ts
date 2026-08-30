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

export const SITE_TITLE =
  'Vincenzo Ceccarelli Grimaldi — Electrical Engineer, Frankfurt | Grid Digitalisation & Physics-Informed Systems';

export const SITE_DESCRIPTION =
  'Vincenzo Ceccarelli Grimaldi is an electrical engineer in Frankfurt working on the digitalisation of high-voltage rail infrastructure — the personal surface of the Grimaldi Network: the journey, two book manuscripts with public proof engines, and the ventures.';

/* ── Conversion endpoints — FIRST PARTY ─────────────────────────────
 * The contact form and the book waitlists post to this site's own API
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

/** Booking: paste a Cal.com link (Europe/Berlin) to promote it to a hero CTA. */
export const CAL_URL = '';
