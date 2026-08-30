import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LanguageProvider } from '@/lib/i18n';
import Chrome from '@/components/Chrome';
import Ask from '@/components/Ask';
import { PERSON, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new globalThis.URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${PERSON.legalName}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
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
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og.png`],
  },
};

const jsonld = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profile`,
  url: `${SITE_URL}/`,
  name: `${PERSON.legalName} — Personal`,
  inLanguage: 'en',
  mainEntity: {
    '@type': 'Person',
    '@id': PERSON.personId,
    name: PERSON.legalName,
    alternateName: [PERSON.shortName, 'Vincenzo Ceccarelli'],
    url: 'https://igrimaldi.engineering/',
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
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" id="top">
      <body>
        <LanguageProvider>
          <Chrome>{children}</Chrome>
          <Ask />
        </LanguageProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
