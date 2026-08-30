import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { CAL_URL, PERSON } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Vincenzo Ceccarelli Grimaldi — electrical engineer in Frankfurt. Hiring, advisory, press and the books. Form, call booking and direct channels.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <main>
      <div className="sheet" style={{ marginTop: 0 }}>
        <div className="section">
          <span className="kicker">Contact</span>
          <h2>Start a conversation</h2>
          <p className="intro">
            Hiring, advisory on grid digitalisation and IT/OT security, press and podcasts, or the
            books — pick the lane and write. I reply from {PERSON.email}, usually within two
            working days (Europe/Berlin).
          </p>

          <div className="contact-grid">
            <ContactForm />

            <aside className="contact-aside">
              <h3>Prefer a call?</h3>
              {CAL_URL ? (
                <p>
                  <a className="btn btn-line" href={CAL_URL} rel="noopener noreferrer">
                    Book a slot (Europe/Berlin)
                  </a>
                </p>
              ) : (
                <p>
                  Call booking is being set up — for now, mention your availability
                  (Europe/Berlin) in the message and I’ll send a slot.
                </p>
              )}
              <h3>Direct channels</h3>
              <p>
                <a href="https://www.linkedin.com/in/vincenzo-ceccarelli-grimaldi-2912b42a0" rel="noopener noreferrer">LinkedIn →</a><br />
                <a href="https://github.com/iceccarelli" rel="noopener noreferrer">GitHub →</a><br />
                <a href="https://igrimaldi.engineering/card" rel="noopener noreferrer">Digital business card →</a>
              </p>
              <h3>For press</h3>
              <p>
                Every claim on this site that you might quote has a public receipt — code,
                repository or live deployment — linked next to it.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
