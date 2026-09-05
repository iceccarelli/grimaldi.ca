import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LanguageProvider } from '@/lib/i18n';
import Chrome from '@/components/Chrome';
import { PERSON, SITE_DESCRIPTION, SITE_TITLE, SITE_URL, VERIFY_BING, VERIFY_GOOGLE } from '@/lib/site';
import { webSite } from '@/lib/schema';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new globalThis.URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${PERSON.legalName}`,
  },
  description: SITE_DESCRIPTION,
  robots: { index: true, follow: true },
  ...(VERIFY_GOOGLE || VERIFY_BING
    ? {
        verification: {
          ...(VERIFY_GOOGLE ? { google: VERIFY_GOOGLE } : {}),
          ...(VERIFY_BING ? { other: { 'msvalidate.01': VERIFY_BING } } : {}),
        },
      }
    : {}),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: 'grimaldi.ca — Operations cluster',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: 'grimaldi.ca — control surface of the Operations & Commercial Automation cluster',
      },
    ],
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
      'application/atom+xml': [
        { url: `${SITE_URL}/atom.xml`, title: 'Explainers' },
        { url: `${SITE_URL}/api/cluster/feed.xml`, title: 'Cluster decisions, kill list, weekly reports' },
      ],
      'application/feed+json': `${SITE_URL}/feed.json`,
      'application/json': `${SITE_URL}/api/cluster/`,
      'application/vnd.oai.openapi+json': `${SITE_URL}/openapi.json`,
      'application/linkset+json': `${SITE_URL}/.well-known/api-catalog`,
      'text/plain': [
        { url: `${SITE_URL}/llms.txt`, title: 'llms.txt' },
        { url: `${SITE_URL}/llms-full.txt`, title: 'llms-full.txt' },
        { url: `${SITE_URL}/ai.txt`, title: 'ai.txt' },
      ],
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og.png`],
  },
};

/**
 * Sitewide node only. The Person @id is shared with igrimaldi.engineering and
 * engineeringgrimaldi.com, so search engines resolve the domains to one person
 * rather than three. Page-specific nodes
 * (ProfilePage, ContactPage, Book, BreadcrumbList) live on their own pages;
 * emitting ProfilePage from here made /contact/ and /privacy/ claim to be
 * profile pages too, which is a contradictory signal.
 */
const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON.personId,
  name: PERSON.legalName,
  alternateName: [PERSON.shortName, 'Vincenzo Ceccarelli'],
  url: 'https://igrimaldi.engineering/',
  mainEntityOfPage: `${SITE_URL}/about/`,
  image: `${SITE_URL}/headshot.jpg`,
  jobTitle: PERSON.jobTitle,
  disambiguatingDescription:
    'Electrical engineer in Frankfurt am Main, Germany, working on grid digitalisation and physics-informed cyber-physical systems. Not affiliated with Grimaldi Lines, the House of Grimaldi, Grimaldi Alliance, or any similarly named organisation.',
  worksFor: { '@type': 'Organization', name: 'DB InfraGO AG' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'RWTH Aachen University' },
  workLocation: {
    '@type': 'Place',
    address: { '@type': 'PostalAddress', addressLocality: PERSON.city, addressCountry: 'DE' },
  },
  email: `mailto:${PERSON.email}`,
  sameAs: PERSON.sameAs,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" id="top">
      <body>
        <LanguageProvider>
          <Chrome>{children}</Chrome>
        </LanguageProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
