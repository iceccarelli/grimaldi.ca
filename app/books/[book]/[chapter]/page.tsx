import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import Blocks from '@/components/Blocks';
import JsonLd from '@/components/JsonLd';
import { MetaLine } from '@/components/Meta';
import { bookBySlug, books, chapterOf } from '@/content/books';
import { blocksWords, minutesFor } from '@/content/types';
import { personRef } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

/**
 * /books/<book>/chapter-<n>/ — one chapter, serialised.
 *
 * Every chapter of both books has a URL so the shape of each manuscript is
 * addressable. Chapters without text render an honest not-yet page, noindex,
 * absent from the sitemap and the feeds. The book landing pages themselves
 * stay on their existing static routes.
 */

type Params = { params: { book: string; chapter: string } };

const parse = (chapter: string) => {
  const m = /^chapter-(\d{1,2})$/.exec(chapter);
  return m ? Number(m[1]) : NaN;
};

export function generateStaticParams() {
  return books.flatMap((b) => b.chapters.map((c) => ({ book: b.slug, chapter: `chapter-${c.number}` })));
}

export function generateMetadata({ params }: Params): Metadata {
  const book = bookBySlug(params.book);
  const ch = book && chapterOf(book, parse(params.chapter));
  if (!book || !ch) return {};
  const has = ch.blocks.length > 0;
  return {
    title: `${book.title} — ${ch.title}`,
    description: ch.summary ?? `${ch.title} of ${book.title}: ${has ? 'essay stub, in revision.' : 'not yet serialised.'}`,
    alternates: { canonical: `/books/${book.slug}/chapter-${ch.number}/` },
    robots: has ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: { images: [{ url: book.og, width: 1200, height: 630, alt: book.title }] },
  };
}

export default function ChapterPage({ params }: Params) {
  const book = bookBySlug(params.book);
  const n = parse(params.chapter);
  const ch = book && chapterOf(book, n);
  if (!book || !ch) notFound();

  const has = ch.blocks.length > 0;
  const prev = chapterOf(book, n - 1);
  const next = chapterOf(book, n + 1);

  const node = {
    '@context': 'https://schema.org',
    '@type': 'Chapter',
    '@id': `${SITE_URL}/books/${book.slug}/chapter-${n}/#chapter`,
    url: `${SITE_URL}/books/${book.slug}/chapter-${n}/`,
    name: ch.title,
    position: n,
    isPartOf: { '@id': `${SITE_URL}/books/${book.slug}/#book` },
    author: personRef,
    inLanguage: 'en',
    creativeWorkStatus: 'Draft',
    ...(has ? { wordCount: blocksWords(ch.blocks) } : {}),
    ...(ch.engine ? { citation: { '@type': 'SoftwareSourceCode', codeRepository: ch.engine, url: ch.engine } } : {}),
  };

  return (
    <PageShell
      trail={[
        { name: 'Books', path: '/books/' },
        { name: book.title, path: `/books/${book.slug}/` },
        { name: ch.title, path: `/books/${book.slug}/chapter-${n}/` },
      ]}
      kicker={`${book.title} · ${ch.title}`}
      title={ch.summary ? `${ch.title} — ${ch.summary}` : ch.title}
      narrow
    >
      <JsonLd data={node} />
      <MetaLine
        badge={ch.badge}
        parts={[has ? 'IN REVISION · SERIAL' : 'not yet serialised', has ? `${minutesFor(ch.blocks)} min` : undefined]}
      />

      {has ? (
        <Blocks blocks={ch.blocks} />
      ) : (
        <div className="empty" role="note">
          <h2>{ch.title} is in revision and not yet serialised.</h2>
          <p>
            Its title is withheld until the text clears; a chapter is listed by number so the shape
            of the book is visible without inventing anything.
            {ch.engine ? ' The proof engine for this chapter is public now, below.' : ' No proof engine is claimed for this chapter.'}
          </p>
        </div>
      )}

      {ch.engine && (
        <p className="artefact-line">
          <span className="artefact-owner">github.com/iceccarelli</span>
          <a href={ch.engine} rel="noopener noreferrer">Run it: chapter {n} proof engine →</a>
        </p>
      )}

      <nav className="chapter-nav" aria-label="Chapters">
        {prev ? <a href={`/books/${book.slug}/chapter-${prev.number}/`}>← {prev.title}</a> : <span />}
        <a href={`/books/${book.slug}/`}>All chapters</a>
        {next ? <a href={`/books/${book.slug}/chapter-${next.number}/`}>{next.title} →</a> : <span />}
      </nav>
    </PageShell>
  );
}
