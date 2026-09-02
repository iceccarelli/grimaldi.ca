import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Badge from '@/components/Badge';
import { books } from '@/content/books';

export const metadata: Metadata = {
  title: 'Books',
  description:
    'Two book manuscripts by Vincenzo Ceccarelli Grimaldi — The Renewables Migration and The Orbital AI Compute Roadmap — serialised chapter by chapter, each load-bearing claim backed by public proof-engine code where one exists.',
  alternates: { canonical: '/books/' },
  openGraph: {
    images: [{ url: '/og-books.png', width: 1200, height: 630, alt: 'Two manuscripts, serialised in public' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-books.png'] },
};

export default function BooksPage() {
  return (
    <PageShell
      trail={[{ name: 'Books', path: '/books/' }]}
      kicker="Books · in public"
      title="Two manuscripts, serialised"
      standfirst="Held to the same standard as the engineering: every load-bearing claim gets a proof. Neither is on sale. Both are being rewritten claim by claim, and the chapters appear here as they clear."
    >
      <div className="books">
        {books.map((b) => {
          const engines = b.chapters.filter((c) => c.engine).length;
          const serialised = b.chapters.filter((c) => c.blocks.length > 0).length;
          return (
            <div className="book" key={b.slug}>
              <h2><a href={`/books/${b.slug}/`}>{b.title} →</a></h2>
              <p>{b.standfirst}</p>
              <p className="meta-line">
                <Badge kind={b.badge} />
                <span>{b.chapters.length} chapters</span>
                <span>{serialised} serialised</span>
                <span>{engines ? `${engines} proof engines` : 'no engines yet'}</span>
              </p>
              {serialised > 0 && (
                <a className="cta" href={`/books/${b.slug}/chapter-1/`}>Read chapter 1 →</a>
              )}
            </div>
          );
        })}
      </div>
      <p className="quiet" style={{ marginTop: '2rem' }}>
        The proof engines are indexed from here and from the archive — not from any product page.
        The Orbital AI Compute Roadmap is a book; it is not, and will not become, a product on any
        domain of this network.
      </p>
    </PageShell>
  );
}
