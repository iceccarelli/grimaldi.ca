'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import ResidualPlot from '@/components/ResidualPlot';
import SubscribeForm from '@/components/SubscribeForm';
import { useI18n } from '@/lib/i18n';

/**
 * The home page, as a printed journal page: masthead, 80 words, one figure,
 * the /now strip, three doors, then the table of contents. The interactive
 * parts (locale strings, the one moving figure, the subscribe form) are
 * client-side; the doors and the now strip arrive server-rendered as props
 * so their content never enters the client bundle.
 */
const SECTIONS: { href: string; title: string; line: string }[] = [
  { href: '/log/', title: 'Log', line: 'Weekly field notes. One slot a week, empty on purpose when unfilled.' },
  { href: '/podcast/', title: 'Podcast', line: 'Residuals — one claim, one number, one artefact. Hub before microphone.' },
  { href: '/reviews/', title: 'Reviews', line: 'What it is, who it is for, what number they published, what they hid, substation LAN: yes / not yet / no.' },
  { href: '/explain/', title: 'Explain', line: 'Niche explainers: CIM/CGMES, PINNs on power flow, KRITIS vs the AI Act, mixed-SKU statics.' },
  { href: '/why/', title: 'Why', line: 'The love essays. The only human page on the network.' },
  { href: '/books/', title: 'Books', line: 'Two manuscripts, serialised chapter by chapter, with proof engines where they exist.' },
  { href: '/archive/', title: 'Archive', line: 'Timeline, theses, client platforms, old portfolios, parked names.' },
  { href: '/travel/', title: 'Travel', line: 'A slot, kept. No trips invented.' },
  { href: '/now/', title: 'Now', line: 'This month, in four lines.' },
];

export default function HomeSections({
  nowStrip,
  nowUpdated,
  doors,
}: {
  nowStrip: ReactNode;
  nowUpdated: string;
  doors: ReactNode;
}) {
  const { t } = useI18n();

  return (
    <main>
      {/* MASTHEAD */}
      <section className="masthead">
        <div className="masthead-in">
          <span className="kicker">{t('kicker')}</span>
          <h1>{t('title')}</h1>
          <p className="lead">{t('lead')}</p>

          <div className="person">
            <div className="person-portrait">
              <Image src="/headshot.jpg" alt="Vincenzo Ceccarelli Grimaldi" width={112} height={112} priority unoptimized />
            </div>
            <p className="person-80">{t('person80')}</p>
          </div>

          <ResidualPlot />
        </div>
      </section>

      <div className="sheet">
        {/* NOW STRIP */}
        <div className="section section-tight" id="now">
          <div className="section-head">
            <span className="kicker">{t('nowKicker')} · {nowUpdated}</span>
            <a className="more" href="/now/">/now →</a>
          </div>
          {nowStrip}
        </div>

        {/* THREE DOORS */}
        <div className="section section-tight" id="doors">
          <span className="kicker">{t('doorsKicker')}</span>
          {doors}
        </div>

        {/* TABLE OF CONTENTS */}
        <div className="section section-tight" id="sections">
          <span className="kicker">{t('sectionsKicker')}</span>
          <ol className="toc">
            {SECTIONS.map((s) => (
              <li key={s.href}>
                <a href={s.href}><b>{s.title}</b><span>{s.line}</span></a>
              </li>
            ))}
          </ol>
        </div>

        {/* SUBSCRIBE */}
        <div className="section section-tight" id="subscribe">
          <span className="kicker">{t('navSub')}</span>
          <SubscribeForm compact />
        </div>
      </div>
    </main>
  );
}
