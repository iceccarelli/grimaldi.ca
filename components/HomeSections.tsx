'use client';

import Image from 'next/image';
import SkyCanvas from '@/components/SkyCanvas';
import Rail from '@/components/Rail';
import WaitlistForm from '@/components/WaitlistForm';
import { liveDeployments, railUi } from '@/lib/dynamic';
import { useI18n } from '@/lib/i18n';
import type { ReactNode } from 'react';

export default function HomeSections({ topicsShelf }: { topicsShelf?: ReactNode }) {
  const { t, locale } = useI18n();

  return (
    <main>
      {/* HERO — generative sky, portrait, plain words */}
      <section className="hero">
        <SkyCanvas />
        <div className="hero-in">
          <div className="hero-card">
            <span className="kicker">{t('kicker')}</span>
            <h1>{t('title')}</h1>
            <p className="lead">{t('lead')}</p>
            <div className="cta-row">
              <a className="btn btn-dark" href="/contact/">{t('ctaContact')}</a>
              <a className="btn btn-line" href="/now/">{t('ctaNow')}</a>
            </div>
          </div>
          <div className="hero-portrait">
            <Image src="/headshot.jpg" alt="Vincenzo Ceccarelli Grimaldi" width={280} height={280} priority unoptimized />
          </div>
        </div>
      </section>

      <div className="sheet">
        {/* ABOUT */}
        <div className="section" id="about">
          <span className="kicker">{t('a_kicker')}</span>
          <h2>{t('a_title')}</h2>
          <p className="intro">{t('a_intro')}</p>
          <div className="grid">
            {(['ab1', 'ab2', 'ab3'] as const).map((c, i) => (
              <div className="card" key={c}>
                <span className="tag">{t(`${c}tag`)}</span>
                <h3>{t(`${c}title`)}</h3>
                <p>{t(`${c}body`)}</p>
                {/* No promise-shelves: the "first posts being written" status is
                    hidden until a published post URL exists. */}
                {i !== 0 && (
                  <span className="status">
                    <span className="dot" /> {t(i === 1 ? 'drafting' : 'growing')}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* TOPICS — server-rendered shelf; absent until something is published */}
        {topicsShelf}

        {/* JOURNEY — the arc, told as a timeline */}
        <div className="section" id="journey">
          <span className="kicker">{t('jKicker')}</span>
          <h2>{t('jTitle')}</h2>
          <ol className="journey">
            {(['j1', 'j2', 'j3', 'j4'] as const).map((j) => (
              <li className="journey-item" key={j}>
                <span className="journey-year">{t(`${j}y`)}</span>
                <div>
                  <h3>{t(`${j}t`)}</h3>
                  <p>{t(`${j}b`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* BOOKS — the manuscripts, with public receipts */}
        <div className="section" id="books">
          <span className="kicker">{t('b_kicker')}</span>
          <h2>{t('b_title')}</h2>
          <p className="intro">{t('b_intro')}</p>
          <div className="books">
            <div className="book">
              <h3><a href="/books/the-renewables-migration/">{t('b1_title')} →</a></h3>
              <p>{t('b1_body')}</p>
              <span className="status"><span className="dot" /> {t('b_status')}</span>
              <div className="proof">
                <span className="proof-label">{t('b1_proof')}</span>
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
            </div>
            <div className="book">
              <h3><a href="/books/the-orbital-ai-compute-roadmap/">{t('b2_title')} →</a></h3>
              <p>{t('b2_body')}</p>
              <span className="status"><span className="dot" /> {t('b_status')}</span>
            </div>
          </div>
        </div>

        {/* VENTURES — built for real businesses */}
        <div className="section" id="ventures">
          <span className="kicker">{t('v_kicker')}</span>
          <h2>{t('v_title')}</h2>
          <p className="intro">{t('v_intro')}</p>
          <div className="grid grid-2">
            <div className="card">
              <span className="tag">B2B · Lima</span>
              <h3>{t('v1_title')}</h3>
              <p>{t('v1_body')}</p>
              <div className="card-links">
                <a className="cta" href="https://plastilonas-peruanas-sac.vercel.app" rel="noopener noreferrer">{t('v_open')}</a>
                <a className="cta" href="https://github.com/iceccarelli/Plastilonas-Peruanas-SAC" rel="noopener noreferrer">{t('v_source')}</a>
              </div>
            </div>
            <div className="card">
              <span className="tag">Flooring · Canada</span>
              <h3>{t('v2_title')}</h3>
              <p>{t('v2_body')}</p>
              <div className="card-links">
                <a className="cta" href="https://ecowoods.ca" rel="noopener noreferrer">{t('v_open')}</a>
                <a className="cta" href="https://github.com/iceccarelli/ecowoods-app" rel="noopener noreferrer">{t('v_source')}</a>
              </div>
            </div>
          </div>
        </div>

        {/* AROUND THE NETWORK — everything live, in one cascading rail */}
        <div className="section" id="live">
          <span className="kicker">{railUi.liveKicker[locale]}</span>
          <h2>{railUi.liveTitle[locale]}</h2>
          <p className="intro">{railUi.liveIntro[locale]}</p>
          <Rail ariaLabel={railUi.liveKicker[locale]} prevLabel={railUi.prev[locale]} nextLabel={railUi.next[locale]}>
            {liveDeployments.map((deployment) => (
              <a
                className="card rail-card deploy-card"
                key={deployment.id}
                href={deployment.href}
                {...(deployment.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="deploy-live">
                  <span className="dot" /> {railUi.liveBadge[locale]}
                </span>
                <h3>{deployment.title[locale]}</h3>
                <p>{deployment.desc[locale]}</p>
                <span className="deploy-host">{deployment.host}</span>
              </a>
            ))}
          </Rail>
        </div>

        {/* NOW */}
        <div className="section" id="now">
          <span className="kicker">{t('w_kicker')}</span>
          <h2>{t('w_title')}</h2>
          <div className="steps">
            {(['w1', 'w2', 'w3'] as const).map((s) => (
              <div className="step" key={s}>
                <h3>{t(`${s}title`)}</h3>
                <p>{t(`${s}body`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* NETWORK */}
        <div className="section" id="network">
          <span className="kicker">{t('n_kicker')}</span>
          <h2>{t('n_title')}</h2>
          <div className="grid">
            <a className="card card-link" href="https://igrimaldi.engineering">
              <span className="tag">igrimaldi.engineering</span>
              <h3>{t('n1title')}</h3>
              <p>{t('n1body')}</p>
              <span className="cta">{t('open')}</span>
            </a>
            <a className="card card-link" href="https://engineeringgrimaldi.com">
              <span className="tag">engineeringgrimaldi.com</span>
              <h3>{t('n2title')}</h3>
              <p>{t('n2body')}</p>
              <span className="cta">{t('open2')}</span>
            </a>
            <a className="card card-link" href="https://igrimaldi.engineering/card">
              <span className="tag">{t('n3tag')}</span>
              <h3>{t('n3title')}</h3>
              <p>{t('n3body')}</p>
              <span className="cta">{t('open3')}</span>
            </a>
          </div>
        </div>

        {/* NOTIFY */}
        <div className="section">
          <div className="banner">
            <div>
              <h2>{t('bannerTitle')}</h2>
              <p>{t('bannerBody')}</p>
            </div>
            <WaitlistForm
              placeholder={t('wlPh')}
              button={t('bannerCta')}
              ok={t('wlOk')}
              err={t('wlErr')}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
