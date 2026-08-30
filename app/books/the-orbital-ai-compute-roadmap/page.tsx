import type { Metadata } from 'next';
import WaitlistForm from '@/components/WaitlistForm';

export const metadata: Metadata = {
  title: 'The Orbital AI Compute Roadmap',
  description:
    'The Orbital AI Compute Roadmap — a book manuscript by Vincenzo Ceccarelli Grimaldi on the terrestrial trilemma of AI compute (inertia, copper, heat) and the honest case for what comes after.',
  alternates: { canonical: '/books/the-orbital-ai-compute-roadmap/' },
};

export default function OrbitalRoadmapPage() {
  return (
    <main>
      <div className="sheet" style={{ marginTop: 0 }}>
        <div className="section">
          <span className="kicker">Manuscript · in revision</span>
          <h2>The Orbital AI Compute Roadmap</h2>
          <p className="intro">
            The terrestrial trilemma of AI compute — inertia, copper, heat — and the honest
            case for what comes after. In revision; every load-bearing claim is being given a
            public receipt before the manuscript ships.
          </p>

          <div className="banner" style={{ marginTop: '2.5rem' }}>
            <div>
              <h2>Be first to read it</h2>
              <p>One email when the manuscript ships. No noise before that.</p>
            </div>
            <WaitlistForm
              list="orbital-roadmap"
              placeholder="you@example.com"
              button="Join the waitlist"
              ok="You’re on the list."
              err="That didn’t go through — try again or use the contact page."
            />
          </div>

          <div className="cta-row" style={{ marginTop: '2.5rem' }}>
            <a className="btn btn-line" href="/books/the-renewables-migration/">The other manuscript →</a>
          </div>
        </div>
      </div>
    </main>
  );
}
