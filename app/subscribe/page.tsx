import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import SubscribeForm from '@/components/SubscribeForm';

export const metadata: Metadata = {
  title: 'Subscribe',
  description: 'One email, once a month, with the notes, the episodes and the chapters that cleared. No list-spam.',
  alternates: { canonical: '/subscribe/' },
};

export default function SubscribePage() {
  return (
    <PageShell
      trail={[{ name: 'Subscribe', path: '/subscribe/' }]}
      kicker="Subscribe"
      title="One email, once a month."
      standfirst="What cleared: the notes, the episode scripts, the chapters. Nothing else, and nothing in the weeks between."
      narrow
    >
      <SubscribeForm />
      <p className="quiet" style={{ marginTop: '2rem' }}>
        Prefer a reader? <a href="/feed.xml">RSS</a> · <a href="/atom.xml">Atom</a> · <a href="/feed.json">JSON Feed</a>.
        Your address is used for this one email and nothing else; see <a href="/privacy/">privacy</a>.
      </p>
    </PageShell>
  );
}
