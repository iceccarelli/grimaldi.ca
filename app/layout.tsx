import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import Chrome from '@/components/Chrome';
import './globals.css';

const SITE_URL = 'https://grimaldi.ca';

export const metadata: Metadata = {
  metadataBase: new globalThis.URL(SITE_URL),
  title: 'Vincenzo Grimaldi — Personal',
  description:
    'The personal surface of the Grimaldi Network: the engineer behind igrimaldi.engineering — life, travel, two book manuscripts in progress, and the long arc of the work.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Vincenzo Grimaldi — Personal',
    description:
      'Life, travel and the long arc of the work — the person behind the Grimaldi Network.',
    url: `${SITE_URL}/`,
    type: 'profile',
    images: [{ url: `${SITE_URL}/headshot.jpg`, width: 280, height: 280 }],
  },
};

const jsonld = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profile`,
  url: `${SITE_URL}/`,
  name: 'Vincenzo Grimaldi — Personal',
  inLanguage: 'en',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://igrimaldi.engineering/#person',
    name: 'Vincenzo Grimaldi',
    url: 'https://igrimaldi.engineering/',
    image: `${SITE_URL}/headshot.jpg`,
    jobTitle: 'Physics-Informed Cyber-Physical Systems Engineer',
    sameAs: [
      'https://github.com/iceccarelli',
      'https://www.linkedin.com/in/vincenzo-ceccarelli-grimaldi-2912b42a0',
      'https://x.com/Vince87Grimaldi',
      'https://www.instagram.com/grimaldiengineering/',
      'https://igrimaldi.engineering/',
      'https://engineeringgrimaldi.com/',
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" id="top">
      <body>
        <LanguageProvider>
          <Chrome>{children}</Chrome>
        </LanguageProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      </body>
    </html>
  );
}
