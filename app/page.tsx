'use client';

import Image from 'next/image';
import SkyCanvas from '@/components/SkyCanvas';
import { useI18n } from '@/lib/i18n';

export default function Home() {
  const { t } = useI18n();

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
              <a className="btn btn-dark" href="#now">{t('ctaNow')}</a>
              <a className="btn btn-line" href="https://igrimaldi.engineering/card">{t('ctaCard')}</a>
            </div>
          </div>
          <div className="hero-portrait">
            <Image src="/headshot.jpg" alt="Vincenzo Grimaldi" width={280} height={280} priority unoptimized />
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
                <span className="status">
                  <span className="dot" /> {t(i === 0 ? 'writing' : i === 1 ? 'drafting' : 'growing')}
                </span>
              </div>
            ))}
          </div>
        </div>

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
            <a className="btn btn-dark" href="mailto:vincenzo@igrimaldi.engineering?subject=Notify%20me%20—%20grimaldi.ca">
              {t('bannerCta')}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
