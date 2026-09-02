import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import { EmptyState } from '@/components/Meta';

export const metadata: Metadata = {
  title: 'Travel',
  description: 'A slot for places, kept honest: no trips are logged here yet, and none are invented.',
  alternates: { canonical: '/travel/' },
  robots: { index: false, follow: true },
};

export default function TravelPage() {
  return (
    <PageShell
      trail={[{ name: 'Travel', path: '/travel/' }]}
      kicker="Travel · slot kept"
      title="Places"
      standfirst="Rail yards, substations and the towns around them, eventually. The slot exists so that when there is something to say it has a home."
      narrow
    >
      <EmptyState
        title="No trips logged."
        body="Nothing is written here yet, and nothing will be invented to fill it. When a trip earns a note, it will appear here with a date and, at most, one still photograph."
      />
      <p className="backlinks"><a href="/log/">Field notes →</a></p>
    </PageShell>
  );
}
