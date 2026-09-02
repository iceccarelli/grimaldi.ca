import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs, manuscript } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'The Orbital AI Compute Roadmap',
  description:
    'The Orbital AI Compute Roadmap — a book manuscript by Vincenzo Ceccarelli Grimaldi on the terrestrial trilemma of AI compute (inertia, copper, heat) and the honest case for what comes after.',
  alternates: { canonical: '/books/the-orbital-ai-compute-roadmap/' },
  openGraph: {
    images: [{ url: '/og-orbital.png', width: 1200, height: 630, alt: 'The Orbital AI Compute Roadmap — manuscript in revision' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-orbital.png'] },
};

export default function OrbitalRoadmapPage() {
  return (
    <main>
      <JsonLd
        data={manuscript({
          path: '/books/the-orbital-ai-compute-roadmap/',
          name: 'The Orbital AI Compute Roadmap',
          about: 'AI compute infrastructure, data centre power, thermal and grid constraints',
          description:
            'The terrestrial trilemma of AI compute — inertia, copper, heat — and the honest case for what comes after.',
        })}
      />
      <JsonLd data={breadcrumbs([
        { name: 'Books', path: '/books/' },
        { name: 'The Orbital AI Compute Roadmap', path: '/books/the-orbital-ai-compute-roadmap/' },
      ])} />
      <div className="sheet">
        <div className="section">
          <span className="kicker">Manuscript · in revision</span>
          <h1 className="page-title">The Orbital AI Compute Roadmap</h1>
          <p className="intro">
            The terrestrial trilemma of AI compute — inertia, copper, heat — and the honest
            case for what comes after. In revision; every load-bearing claim is being given a
            public receipt before the manuscript ships.
          </p>

          <p className="more" style={{ marginTop: '2.5rem' }}>
            No waitlist and nothing to buy. If you want one email when an essay ships here,{' '}
            <a href="/topics/#subscribe">that exists</a>.
          </p>

          <p className="more">
            <a href="/books/the-renewables-migration/">The other manuscript →</a>
          </p>
        </div>
      </div>
    </main>
  );
}
