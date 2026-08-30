import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Books',
  description:
    'Two book manuscripts by Vincenzo Ceccarelli Grimaldi — The Renewables Migration and The Orbital AI Compute Roadmap — each load-bearing claim backed by public, runnable proof-engine code.',
  alternates: { canonical: '/books/' },
};

export default function BooksPage() {
  return (
    <main>
      <div className="sheet" style={{ marginTop: 0 }}>
        <div className="section">
          <span className="kicker">The books</span>
          <h2>Two manuscripts — with public receipts</h2>
          <p className="intro">
            Long-form writing held to the same standard as the engineering: every load-bearing
            claim gets a proof. Both manuscripts are honestly in revision — not yet on sale —
            and the receipts are already public.
          </p>

          <div className="books">
            <div className="book">
              <h3><a href="/books/the-renewables-migration/">The Renewables Migration →</a></h3>
              <p>
                Germany traded fuel imports for hardware imports — the €-trillion receipt, the
                physics of 50 Hz, and what it takes to give the grid a brain. Eleven public
                proof-engine repositories, one per chapter, recompute the book’s load-bearing
                numbers from source data.
              </p>
              <span className="status"><span className="dot" /> In revision — join the waitlist on the book page</span>
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

          <div className="cta-row" style={{ marginTop: '2.5rem' }}>
            <a className="btn btn-dark" href="/contact/">Talk about the books</a>
            <a className="btn btn-line" href="https://github.com/iceccarelli" rel="noopener noreferrer">All public code</a>
          </div>
        </div>
      </div>
    </main>
  );
}
