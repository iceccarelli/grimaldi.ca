import JsonLd from '@/components/JsonLd';
import Plate, { type PlateProps } from '@/components/Plate';
import { publishedTopics } from '@/content/topics';
import { NOW_UPDATED, nowItems } from '@/content/now';
import {
  CLUSTER,
  ENGINEERING_URL,
  LINKEDIN,
  NEURALBRIDGE_URL,
  PERSON,
  PORTFOLIO_URL,
  SITE_TITLE,
  SITE_URL,
  TIME_TO_POWER_URL,
} from '@/lib/site';
import { personRef } from '@/lib/schema';

export const revalidate = 3600;

const homePage = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': SITE_URL + '/#home',
  url: SITE_URL + '/',
  name: SITE_TITLE,
  mainEntity: personRef,
  inLanguage: 'en',
};

const visualPlates: PlateProps[] = [
  {
    src: '/images/personal/02-podcast-recording-setup.jpg',
    alt: 'Podcast recording and technical discussion setup',
    code: 'PERS 02 · DIALOGUE & EXPLAINERS',
    title: 'Technical conversations',
    caption: 'Discussing power systems, grid inertia and software-defined automation.',
  },
  {
    src: '/images/personal/03-ecowoods-hardwood-craftsmanship.jpg',
    alt: 'Hardwood craftsmanship and material detail',
    code: 'PERS 03 · CRAFT & MATERIALS',
    title: 'Physical craft',
    caption: 'Precision woodworking and material fabrication alongside digital engineering.',
  },
  {
    src: '/images/personal/04-broader-engineering-ambitions.jpg',
    alt: 'Conceptual image representing broader engineering ambitions',
    code: 'PERS 04 · SYSTEMS & SCALE',
    title: 'Systems thinking',
    caption: 'Connecting physical infrastructure, electrical systems and software.',
  },
  {
    src: '/images/personal/05-writing-explainers.jpg',
    alt: 'Technical writing and research workspace',
    code: 'PERS 05 · TECHNICAL WRITING',
    title: 'Research into clear ideas',
    caption: 'Turning complex engineering principles into structured technical explainers.',
  },
  {
    src: '/images/personal/06-plastilonas-side-engineering.jpg',
    alt: 'Mechanical and automation prototyping workspace',
    code: 'PERS 06 · PROTOTYPING',
    title: 'Practical prototyping',
    caption: 'Mechanical, automation and hands-on engineering experiments.',
  },
  {
    src: '/images/personal/07-toronto-frankfurt-dual-life.jpg',
    alt: 'Toronto and Frankfurt visual context',
    code: 'PERS 07 · TRANSATLANTIC CONTEXT',
    title: 'Two technical contexts',
    caption: 'European infrastructure experience and North American connections.',
  },
  {
    src: '/images/personal/08-selected-projects.jpg',
    alt: 'Selected electrical engineering and automation project materials',
    code: 'PERS 08 · PROJECT ARCHIVE',
    title: 'Selected projects',
    caption: 'A curated view across electrical engineering, automation and software.',
  },
  {
    src: '/images/personal/09-human-aspirations-engineer.jpg',
    alt: 'Conceptual image about people, engineering and infrastructure',
    code: 'PERS 09 · PURPOSE',
    title: 'Engineering with purpose',
    caption: 'Keeping technical precision connected to real-world infrastructure needs.',
  },
  {
    src: '/images/personal/10-contact-connection.jpg',
    alt: 'Professional collaboration and contact setting',
    code: 'PERS 10 · COLLABORATION',
    title: 'Open collaboration',
    caption: 'A direct channel for engineering, research and venture conversations.',
  },
];

export default function Home() {
  const topics = publishedTopics();
  const current = nowItems[0];

  return (
    <main className="personal-shell">
      <JsonLd data={homePage} />

      <header className="personal-hero">
        <div className="personal-copy">
          <span className="personal-kicker">PERSONAL & PROFESSIONAL DOMAIN</span>
          <h1 className="personal-title">{PERSON.legalName}</h1>
          <p className="personal-role">{PERSON.jobTitle}</p>
          <p className="personal-lead">
            An independent engineering practice connecting electrical power systems,
            critical infrastructure, industrial machines and software. This is the
            human layer behind the projects, research and ventures.
          </p>
          <div className="personal-actions">
            <a className="personal-button" href={ENGINEERING_URL} rel="noopener noreferrer">
              Explore engineering ventures <span aria-hidden="true">↗</span>
            </a>
            <a className="personal-text-link" href={PORTFOLIO_URL} rel="noopener noreferrer">
              Technical portfolio <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="personal-location">{PERSON.city} · {PERSON.country}</p>
        </div>

        <div className="personal-hero-visual">
          <Plate
            src="/images/personal/01-personal-engineering-workspace.jpg"
            alt="Personal engineering workspace with technical references and equipment"
            code="FIELD NOTES · 01"
            title="Engineering practice"
            caption="Electrical systems, infrastructure and software — approached as one connected discipline."
            priority
            className="plate--feature"
            sizes="(max-width: 880px) 100vw, 54vw"
          />
        </div>
      </header>

      <section className="personal-section" aria-labelledby="venture-heading">
        <div className="personal-section-heading">
          <div>
            <span className="personal-kicker">VENTURE NETWORK</span>
            <h2 id="venture-heading">Engineering ideas, built into useful systems</h2>
          </div>
          <a href={ENGINEERING_URL} rel="noopener noreferrer">Company hub · engineeringgrimaldi.com ↗</a>
        </div>

        <div className="venture-grid">
          <a className="venture-card" href={TIME_TO_POWER_URL} rel="noopener noreferrer">
            <span className="venture-index">01 / POWER & CAPACITY</span>
            <h3>Time to Power</h3>
            <p>Power-capacity intelligence for existing AI data-centre halls.</p>
            <span className="venture-destination">timetopower.ai ↗</span>
          </a>
          <a className="venture-card" href={NEURALBRIDGE_URL} rel="noopener noreferrer">
            <span className="venture-index">02 / INDUSTRIAL ASSURANCE</span>
            <h3>NeuralBridge</h3>
            <p>Evidence and assurance infrastructure for industrial machines and autonomous systems.</p>
            <span className="venture-destination">neuralbridge.io ↗</span>
          </a>
          <a className="venture-card" href={PORTFOLIO_URL} rel="noopener noreferrer">
            <span className="venture-index">03 / ELECTRICAL ENGINEERING</span>
            <h3>Technical portfolio</h3>
            <p>High-voltage grids, railway traction, electrical machines and physics-informed methods.</p>
            <span className="venture-destination">igrimaldi.engineering ↗</span>
          </a>
        </div>
      </section>

      <section className="personal-section" aria-labelledby="gallery-heading">
        <div className="personal-section-heading personal-section-heading--stack">
          <div>
            <span className="personal-kicker">SELECTED VISUAL NOTES</span>
            <h2 id="gallery-heading">The work behind the work</h2>
          </div>
          <p>
            Engineering is practical as well as analytical: research, technical conversations,
            prototypes, materials and the people who use the systems.
          </p>
        </div>
        <div className="personal-gallery">
          {visualPlates.map((plate) => (
            <Plate key={plate.src} {...plate} />
          ))}
        </div>
      </section>

      <section className="personal-lower">
        <article className="personal-info-panel" aria-labelledby="now-heading">
          <span className="personal-kicker">CURRENT FOCUS · UPDATED {NOW_UPDATED.toUpperCase()}</span>
          <h2 id="now-heading">{current.title}</h2>
          <p>{current.body}</p>
          <div className="personal-inline-links">
            <a href="/now/">What I’m working on now →</a>
            <a href="/about/">Professional background →</a>
          </div>
        </article>

        <article className="personal-info-panel" aria-labelledby="writing-heading">
          <span className="personal-kicker">WRITING & RESEARCH</span>
          <h2 id="writing-heading">Technical ideas, explained carefully</h2>
          {topics.length > 0 ? (
            <ul className="personal-topic-list">
              {topics.slice(0, 3).map((topic) => (
                <li key={topic.slug}>
                  <a href={'/topics/' + topic.slug + '/'}>{topic.title}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Technical explainers are published after their claims and references are checked.</p>
          )}
          <div className="personal-inline-links">
            <a href="/topics/">All explainers →</a>
            <a href="/books/">Books and manuscripts →</a>
          </div>
        </article>
      </section>

      <section className="personal-contact" aria-labelledby="contact-heading">
        <div>
          <span className="personal-kicker">DIRECT CONTACT</span>
          <h2 id="contact-heading">A good conversation starts with a clear problem.</h2>
          <p>For engineering, research, press or venture enquiries, use the direct channels below.</p>
        </div>
        <div className="personal-contact-links">
          <a href={'mailto:' + PERSON.email}>Email Vincenzo ↗</a>
          <a href={LINKEDIN} rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="/contact/">Contact form ↗</a>
          <a href="/cluster/">{CLUSTER.short} control room ↗</a>
        </div>
      </section>
    </main>
  );
}
