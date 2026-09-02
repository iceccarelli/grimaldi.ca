import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs, manuscript } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'The Renewables Migration',
  description:
    'The Renewables Migration — a book manuscript on how the energy transition actually gets built, by Vincenzo Ceccarelli Grimaldi. Eleven public chapter proof-engine repositories make every load-bearing number re-runnable.',
  alternates: { canonical: '/books/the-renewables-migration/' },
  openGraph: {
    images: [{ url: '/og-renewables.png', width: 1200, height: 630, alt: 'The Renewables Migration — manuscript in revision, with 11 public proof engines' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-renewables.png'] },
};

export default function RenewablesMigrationPage() {
  return (
    <main>
      <JsonLd
        data={manuscript({
          path: '/books/the-renewables-migration/',
          name: 'The Renewables Migration',
          about: 'Energy transition, electrical grid engineering, power systems',
          description:
            'How the energy transition actually gets built: the cost of trading fuel imports for hardware imports, the physics of 50 Hz, and what it takes to give the grid a brain. Each chapter ships a public proof-engine repository that recomputes its load-bearing numbers from source data.',
          proofRepos: Array.from({ length: 11 }, (_, i) =>
            `https://github.com/iceccarelli/Renewables_Migration_Chapter${i + 1}_Proof_Engine`),
        })}
      />
      <JsonLd data={breadcrumbs([
        { name: 'Books', path: '/books/' },
        { name: 'The Renewables Migration', path: '/books/the-renewables-migration/' },
      ])} />
      <div className="sheet">
        <div className="section">
          <span className="kicker">Manuscript · in revision</span>
          <h1 className="page-title">The Renewables Migration</h1>
          <p className="intro">
            Germany traded fuel imports for hardware imports — the size of that bill, the
            physics of 50 Hz, and what it takes to give the grid a brain. The manuscript is in
            revision, being rewritten claim by claim.
          </p>

          <h2 className="sub">Don’t trust the book — run it</h2>
          <p className="intro">
            Each chapter ships with a public proof-engine repository that recomputes that
            chapter’s load-bearing numbers from source data. Readers don’t have to take the
            argument on faith; they can execute it.
          </p>
          <div className="proof" style={{ maxWidth: 760 }}>
            <span className="proof-label">Chapter proof engines (public code)</span>
            <div className="proof-chips">
              {Array.from({ length: 11 }, (_, i) => i + 1).map((n) => (
                <a
                  key={n}
                  href={`https://github.com/iceccarelli/Renewables_Migration_Chapter${n}_Proof_Engine`}
                  rel="noopener noreferrer"
                >
                  Ch {n}
                </a>
              ))}
            </div>
            <p style={{ marginTop: '1rem' }}>
              <a className="cta" href="/books/the-renewables-migration/proof-engines/">
                What each engine computes →
              </a>
            </p>
          </div>

          <p className="more" style={{ marginTop: '2.5rem' }}>
            No waitlist and nothing to buy. If you want one email when an essay ships here,{' '}
            <a href="/topics/#subscribe">that exists</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
