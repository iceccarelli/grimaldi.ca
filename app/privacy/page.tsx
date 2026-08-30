import type { Metadata } from 'next';
import { PERSON } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy / Datenschutz',
  description: 'Privacy policy for grimaldi.ca — what is processed, by whom, and your rights under the GDPR.',
  alternates: { canonical: '/privacy/' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main>
      <div className="sheet" style={{ marginTop: 0 }}>
        <div className="section legal-page">
          <span className="kicker">Legal</span>
          <h2>Privacy / Datenschutz</h2>

          <h3>Controller</h3>
          <p>
            {PERSON.legalName}, {PERSON.city}, {PERSON.country} —{' '}
            <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>. See the{' '}
            <a href="/imprint/">imprint</a> for the full address.
          </p>

          <h3>Hosting</h3>
          <p>
            This site is a static site hosted by Vercel Inc. (USA). When you visit, Vercel
            processes technical connection data (IP address, user agent, requested URL) in
            server logs to deliver the site securely — legal basis: Art. 6 (1)(f) GDPR
            (legitimate interest in operating the site). Data processing agreement and EU
            transfer safeguards are provided by Vercel.
          </p>

          <h3>Analytics</h3>
          <p>
            The site uses Vercel Web Analytics and Speed Insights. These are cookie-free and
            collect aggregated page-view and performance metrics without persistent
            identifiers — legal basis: Art. 6 (1)(f) GDPR.
          </p>

          <h3>Contact form</h3>
          <p>
            When you use the contact form, the data you enter (name, email, subject, message)
            is transmitted to the form processor and forwarded to me by email, solely to answer
            your request — legal basis: Art. 6 (1)(b) GDPR. It is not used for advertising.
          </p>

          <h3>Book waitlist</h3>
          <p>
            If you join a book waitlist, your email address is stored with the newsletter
            provider solely to notify you about the book — legal basis: Art. 6 (1)(a) GDPR
            (consent). You can unsubscribe at any time via the link in any email.
          </p>

          <h3>Local storage</h3>
          <p>
            Your language choice is stored in your browser’s localStorage (key: vg-locale). It
            never leaves your device and can be cleared in your browser settings at any time.
          </p>

          <h3>Your rights</h3>
          <p>
            Under the GDPR you have the right to access, rectification, erasure, restriction of
            processing, data portability, and objection, and the right to lodge a complaint
            with a supervisory authority. Write to {PERSON.email}.
          </p>
        </div>
      </div>
    </main>
  );
}
