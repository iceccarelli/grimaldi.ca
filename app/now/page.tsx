import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import NowStrip from '@/components/NowStrip';
import { NOW_UPDATED } from '@/content/now';

export const metadata: Metadata = {
  title: 'Now',
  description:
    'What Vincenzo Ceccarelli Grimaldi is doing this month: the sanitised day-job line, the artefact shipped, chapter status, and the research direction.',
  alternates: { canonical: '/now/' },
  openGraph: {
    images: [{ url: '/og-now.png', width: 1200, height: 630, alt: 'What Vincenzo Ceccarelli Grimaldi is doing now' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-now.png'] },
};

export default function NowPage() {
  return (
    <PageShell
      trail={[{ name: 'Now', path: '/now/' }]}
      kicker={`Now · ${NOW_UPDATED}`}
      title="This month"
      standfirst="Four lines that are true today and expected to go stale. Each is edited in one place and shown on the home page too."
      narrow
    >
      <NowStrip />
      <p className="quiet" style={{ marginTop: '2rem' }}>
        The day-job line is deliberately generic. Nothing from an employer system, document or
        measurement appears on this domain — the field notes are written from public physics and
        public artefacts only.
      </p>
      <p className="backlinks">
        <a href="/log/">The weekly notes →</a>
      </p>
    </PageShell>
  );
}
