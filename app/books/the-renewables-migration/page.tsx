import type { Metadata } from 'next';
import BookView from '@/components/BookView';
import { bookBySlug } from '@/content/books';

const book = bookBySlug('the-renewables-migration')!;

export const metadata: Metadata = {
  title: book.title,
  description: book.description,
  alternates: { canonical: `/books/${book.slug}/` },
  openGraph: {
    images: [{ url: book.og, width: 1200, height: 630, alt: `${book.title} — manuscript in revision, serialised with public proof engines` }],
  },
  twitter: { card: 'summary_large_image', images: [book.og] },
};

export default function RenewablesMigrationPage() {
  return <BookView book={book} />;
}
