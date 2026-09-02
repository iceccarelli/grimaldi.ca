import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Books',
  description:
    'Two book manuscripts by Vincenzo Ceccarelli Grimaldi — The Renewables Migration and The Orbital AI Compute Roadmap — each load-bearing claim backed by public, runnable proof-engine code. In revision; not on sale.',
  alternates: { canonical: '/books/' },
  openGraph: {
    images: [{ url: '/og-books.png', width: 1200, height: 630, alt: 'The books, with public receipts — two manuscripts by Vincenzo Ceccarelli Grimaldi' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-books.png'] },
};

export default function BooksPage() {
  return (
    <main>
      <JsonLd data={breadcrumbs([{ name: 'Books', path: '/books/' }])} />
      <div className="sheet">
        <div className="section">
          <span className="kicker">The books</span>
          <h1 className="page-title">Two manuscripts — with public receipts</h1>
          <p className="intro">
            Long-form writing held to the same standard as the engineering: every load-bearing
            claim gets a proof. Both manuscripts are in revision. Neither is on sale, here or
            anywhere else, and there is no list to join — the receipts are already public.
          </p>

          <div className="books">
            <div className="book">
              <h3><a href="/books/the-renewables-migration/">The Renewables Migration →</a></h3>
              <p>
                Germany traded fuel imports for hardware imports — the size of that bill, the
                physics of 50 Hz, and what it takes to give the grid a brain. Eleven public
                proof-engine repositories, one per chapter, recompute the book’s load-bearing
                numbers from source data.
              </p>
              <span className="status"><span className="dot" /> In revision</span>
            </div>
            <div className="book">
              <h3><a href="/books/the-orbital-ai-compute-roadmap/">The Orbital AI Compute Roadmap →</a></h3>
              <p>
                The terrestrial trilemma of AI compute — inertia, copper, heat — and the honest
                case for what comes after.
              </p>
              <span className="status"><span className="dot" /> In revision</span>
            </div>
          </div>

          <p className="more" style={{ marginTop: '2.5rem' }}>
            <a href="https://github.com/iceccarelli" rel="noopener noreferrer">All public code →</a> ·{' '}
            <a href="/contact/">Talk about the books →</a>
          </p>
        </div>
      </div>
    </main>
  );
}
