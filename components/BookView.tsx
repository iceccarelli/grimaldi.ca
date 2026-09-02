import PageShell from './PageShell';
import Badge from './Badge';
import JsonLd from './JsonLd';
import WaitlistForm from './WaitlistForm';
import type { Book } from '@/content/types';
import { manuscript } from '@/lib/schema';

/**
 * One manuscript, serialised: a chapter list where every row has a badge,
 * an essay link when text exists, and an engine link when a proof engine
 * exists. Chapters without text are listed — by number only — so the shape
 * of the book is visible without a single invented title.
 */
export default function BookView({ book }: { book: Book }) {
  const engines = book.chapters.filter((c) => c.engine).map((c) => c.engine!) ;
  const serialised = book.chapters.filter((c) => c.blocks.length > 0).length;

  return (
    <PageShell
      trail={[{ name: 'Books', path: '/books/' }, { name: book.title, path: `/books/${book.slug}/` }]}
      kicker="Manuscript · serialised in public"
      title={book.title}
      standfirst={book.standfirst}
    >
      <JsonLd data={manuscript({ path: `/books/${book.slug}/`, name: book.title, about: book.about, description: book.description, proofRepos: engines })} />

      <p className="meta-line">
        <Badge kind={book.badge} />
        <span>{book.chapters.length} chapters</span>
        <span>{serialised} serialised</span>
        <span>{engines.length ? `${engines.length} public proof engines` : 'no proof engines yet — none is claimed'}</span>
      </p>

      <ol className="chapters">
        {book.chapters.map((c) => {
          const has = c.blocks.length > 0;
          return (
            <li key={c.number}>
              <span className="ch-n">{String(c.number).padStart(2, '0')}</span>
              <span className="ch-main">
                {has ? (
                  <a href={`/books/${book.slug}/chapter-${c.number}/`}><b>{c.title}</b> — essay stub →</a>
                ) : (
                  <b className="ch-quiet">{c.title} — not yet serialised</b>
                )}
                {c.summary && <span>{c.summary}</span>}
              </span>
              <span className="ch-meta">
                <Badge kind={c.badge} />
                {c.engine && <a href={c.engine} rel="noopener noreferrer">engine ↗</a>}
              </span>
            </li>
          );
        })}
      </ol>

      {engines.length > 0 && (
        <p className="quiet">
          <a href={`/books/${book.slug}/proof-engines/`}>What each engine computes →</a>
        </p>
      )}

      <div className="section-sub">
        <h2 className="h-quiet">When it ships</h2>
        <WaitlistForm
          list={book.waitlist}
          placeholder="you@example.com"
          button="One email, when it ships"
          ok="You’re on the list."
          err="That didn’t go through — email vincenzo@igrimaldi.engineering instead."
        />
      </div>
    </PageShell>
  );
}
