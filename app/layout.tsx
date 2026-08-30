import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LanguageProvider } from '@/lib/i18n';
import Chrome from '@/components/Chrome';
import AskLazy from '@/components/AskLazy';
import { PERSON, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/site';
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
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: PERSON.legalName,
    type: 'profile',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: `${PERSON.legalName} — ${PERSON.jobTitle}`,
      },
    ],
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
      'application/atom+xml': `${SITE_URL}/atom.xml`,
      'application/feed+json': `${SITE_URL}/feed.json`,
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
 * Sitewide node only. The Person is the network-wide entity — the SAME @id is
 * emitted by igrimaldi.engineering and engineeringgrimaldi.com, so the three
 * domains resolve to one person rather than three. Page-specific nodes
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
  mainEntityOfPage: `${SITE_URL}/`,
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
          <AskLazy />
        </LanguageProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
