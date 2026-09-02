import type { Metadata } from 'next';
import BookView from '@/components/BookView';
import { bookBySlug } from '@/content/books';

const book = bookBySlug('the-orbital-ai-compute-roadmap')!;

export const metadata: Metadata = {
  title: book.title,
  description: book.description,
  alternates: { canonical: `/books/${book.slug}/` },
  openGraph: {
    images: [{ url: book.og, width: 1200, height: 630, alt: `${book.title} — manuscript in revision` }],
  },
  twitter: { card: 'summary_large_image', images: [book.og] },
};

export default function OrbitalRoadmapPage() {
  return <BookView book={book} />;
}
