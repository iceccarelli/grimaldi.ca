import type { Metadata } from 'next';
import WaitlistForm from '@/components/WaitlistForm';

export const metadata: Metadata = {
  title: 'The Renewables Migration',
  description:
    'The Renewables Migration — a book manuscript on how the energy transition actually gets built, by Vincenzo Ceccarelli Grimaldi. Eleven public chapter proof-engine repositories make every load-bearing number re-runnable.',
  alternates: { canonical: '/books/the-renewables-migration/' },
};

export default function RenewablesMigrationPage() {
  return (
    <main>
      <div className="sheet" style={{ marginTop: 0 }}>
        <div className="section">
          <span className="kicker">Manuscript · in revision</span>
          <h2>The Renewables Migration</h2>
          <p className="intro">
            Germany traded fuel imports for hardware imports — the €-trillion receipt, the
            physics of 50 Hz, and what it takes to give the grid a brain. The manuscript is in
            revision, being rewritten claim by claim.
          </p>

          <h3 style={{ fontFamily: 'var(--serif)' }}>Don’t trust the book — run it</h3>
          <p className="intro">
            Each chapter ships with a public proof-engine repository that recomputes that
            chapter’s load-bearing numbers from source data. Readers don’t have to take the
            argument on faith; they can execute it.
          </p>
          <div className="proof" style={{ maxWidth: 760 }}>
            <span className="proof-label">Chapter proof engines (public code)</span>
            <div className="proof-chips">
              {Array.from({ length: 11 }, (_, i) => i + 1).map((n) => (
                <a
                  key={n}
                  href={`https://github.com/iceccarelli/Renewables_Migration_Chapter${n}_Proof_Engine`}
                  rel="noopener noreferrer"
                >
                  Ch {n}
                </a>
              ))}
            </div>
          </div>

          <div className="banner" style={{ marginTop: '2.5rem' }}>
            <div>
              <h2>Be first to read it</h2>
              <p>One email when the manuscript ships. No noise before that.</p>
            </div>
            <WaitlistForm
              placeholder="you@example.com"
              button="Join the waitlist"
              ok="You’re on the list."
              err="That didn’t go through — try again or use the contact page."
            />
          </div>
        </div>
      </div>
    </main>
  );
}
