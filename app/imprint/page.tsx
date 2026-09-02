import type { Metadata } from 'next';
import { PERSON } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Imprint / Impressum',
  description: 'Legal notice (Impressum) for grimaldi.ca pursuant to § 5 DDG.',
  alternates: { canonical: '/imprint/' },
  robots: { index: true, follow: true },
};

export default function ImprintPage() {
  return (
    <main>
      <div className="sheet">
        <div className="section legal-page">
          <span className="kicker">Legal</span>
          <h1 className="page-title">Imprint / Impressum</h1>

          <h3>Angaben gemäß § 5 DDG</h3>
          <p>
            {PERSON.legalName}
            <br />
            {/* TODO(vincenzo): a full postal address is LEGALLY REQUIRED here
                before offering commercial services from Germany. A P.O. box is
                not sufficient. Consider an Impressum-service address if you do
                not want to publish your home address. */}
            [Street and number]
            <br />
            [Postal code] {PERSON.city}
            <br />
            {PERSON.country}
          </p>

          <h3>Kontakt</h3>
          <p>
            E-Mail: <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
          </p>

          <h3>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
          <p>{PERSON.legalName}, Anschrift wie oben.</p>

          <h3>Haftung für Links</h3>
          <p>
            Diese Website verlinkt auf externe Websites Dritter, auf deren Inhalte kein
            Einfluss besteht. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
            Anbieter oder Betreiber der Seiten verantwortlich.
          </p>

          <h3>Namensklarstellung / Name disambiguation</h3>
          <p>
            Diese Website ist die persönliche Website eines einzelnen Ingenieurs. Sie steht in
            keiner Verbindung zu Grimaldi Lines / Grimaldi Group, zum Fürstenhaus Grimaldi
            (Monaco), zur Grimaldi Alliance oder zu anderen gleichnamigen Unternehmen.
          </p>
        </div>
      </div>
    </main>
  );
}
