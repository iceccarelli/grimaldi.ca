import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Now',
  description:
    'What Vincenzo Ceccarelli Grimaldi is doing now: digitalising high-voltage railway traction assets in Frankfurt, building the Grimaldi Network, and revising two book manuscripts.',
  alternates: { canonical: '/now/' },
  openGraph: {
    images: [{ url: '/og-now.png', width: 1200, height: 630, alt: 'What Vincenzo Ceccarelli Grimaldi is doing now' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-now.png'] },
};

const UPDATED = 'August 2026';

export default function NowPage() {
  return (
    <main>
      <JsonLd data={breadcrumbs([{ name: 'Now', path: '/now/' }])} />
      <div className="sheet" style={{ marginTop: 0 }}>
        <div className="section">
          <span className="kicker">Now · updated {UPDATED}</span>
          <h2>What I’m doing now</h2>
          <p className="intro">
            A living page, in the spirit of nownow.com pages: what actually has my attention,
            updated as it changes — not a static bio.
          </p>

          <div className="steps">
            <div className="step">
              <h3>Engineering the grid</h3>
              <p>
                Digitalisation of high-voltage railway traction assets in Frankfurt — IT/OT
                convergence and security governance for critical infrastructure, at DB InfraGO,
                since 2024.
              </p>
            </div>
            <div className="step">
              <h3>Writing the books</h3>
              <p>
                Two manuscripts in revision: The Renewables Migration (with eleven public
                chapter proof-engine repositories) and The Orbital AI Compute Roadmap — being
                rewritten the hard way, claim by claim.
              </p>
            </div>
            <div className="step">
              <h3>Building the network</h3>
              <p>
                Three domains, one identity: the software portfolio at igrimaldi.engineering,
                the hardware lab at engineeringgrimaldi.com, and this personal surface — kept
                consistent and continuously shipped.
              </p>
            </div>
          </div>

          <div className="cta-row" style={{ marginTop: '2.5rem' }}>
            <a className="btn btn-dark" href="/contact/">Work with me</a>
            <a className="btn btn-line" href="/books/">The books</a>
          </div>
        </div>
      </div>
    </main>
  );
}
