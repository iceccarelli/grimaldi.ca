import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import { NETWORK_LINES } from '@/content/network';

export const metadata: Metadata = {
  title: 'Network',
  description: 'The four surfaces of the Grimaldi Network, one line each. The artefact belongs to the domain that ships it.',
  alternates: { canonical: '/network/' },
};

export default function NetworkPage() {
  return (
    <PageShell
      trail={[{ name: 'Network', path: '/network/' }]}
      kicker="Network · pointers only"
      title="Four lines"
      standfirst="This page will never grow cards. One line, one verb, one owner — and the owner is where you go."
      narrow
    >
      <ul className="pointer-list">
        {NETWORK_LINES.map((n) => (
          <li key={n.host}>
            <a href={n.href} {...(n.host.startsWith('github') ? { rel: 'noopener noreferrer' } : {})}>{n.host}</a>
            <span> — {n.line}</span>
          </li>
        ))}
      </ul>
      <p className="quiet">
        Business card, vCard and QR: <a href="https://igrimaldi.engineering/card">igrimaldi.engineering/card</a>.
      </p>
    </PageShell>
  );
}
