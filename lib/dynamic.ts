/**
 * dynamic.ts — the dynamic layer's data + typed strings (v5).
 *
 * Self-contained four-locale records for the "around the network" rail and
 * the Ask concierge. Invariant unchanged: every link opens a real surface,
 * and the concierge honestly labels itself as an instant client-side guide
 * over this index — never as a server-side AI.
 */

import type { Locale } from './i18n';

export type L = Record<Locale, string>;

export const railUi: { prev: L; next: L; liveKicker: L; liveTitle: L; liveIntro: L; liveBadge: L } = {
  prev: { en: 'Previous', es: 'Anterior', de: 'Zurück', zh: '上一个' },
  next: { en: 'Next', es: 'Siguiente', de: 'Weiter', zh: '下一个' },
  liveKicker: { en: 'Around the network', es: 'Por la red', de: 'Durch das Netzwerk', zh: '网络各处' },
  liveTitle: {
    en: 'Everything here is live — wander through it',
    es: 'Todo aquí está en vivo — recórrelo',
    de: 'Alles hier ist live — schauen Sie sich um',
    zh: '这里的一切都在线 — 随意浏览',
  },
  liveIntro: {
    en: 'The life and the work, in production. Each card opens a surface you can use right now.',
    es: 'La vida y el trabajo, en producción. Cada tarjeta abre una superficie que puedes usar ahora.',
    de: 'Das Leben und die Arbeit, in Produktion. Jede Karte öffnet eine sofort nutzbare Oberfläche.',
    zh: '生活与工作，皆在生产环境中。每张卡片都能立即使用。',
  },
  liveBadge: { en: 'Live', es: 'En vivo', de: 'Live', zh: '在线' },
};

export type Deployment = { id: string; href: string; host: string; title: L; desc: L };

export const liveDeployments: Deployment[] = [
  {
    id: 'plastilonas',
    href: 'https://plastilonas-peruanas-sac.vercel.app',
    host: 'plastilonas-peruanas-sac.vercel.app',
    title: { en: 'Plastilonas Peruanas SAC', es: 'Plastilonas Peruanas SAC', de: 'Plastilonas Peruanas SAC', zh: 'Plastilonas Peruanas SAC' },
    desc: {
      en: 'The B2B platform built for a real Lima business.',
      es: 'La plataforma B2B construida para un negocio real de Lima.',
      de: 'Die B2B-Plattform für ein reales Unternehmen in Lima.',
      zh: '为利马真实企业打造的 B2B 平台。',
    },
  },
  {
    id: 'ecowoods',
    href: 'https://ecowoods.ca',
    host: 'ecowoods.ca',
    title: { en: 'Ecowoods', es: 'Ecowoods', de: 'Ecowoods', zh: 'Ecowoods' },
    desc: {
      en: 'The flooring venture, live in Canada.',
      es: 'El negocio de pisos, en vivo en Canadá.',
      de: 'Das Bodenbelag-Venture, live in Kanada.',
      zh: '地板创业项目，加拿大在线运行。',
    },
  },
  {
    id: 'forge',
    href: 'https://engineeringgrimaldi.com',
    host: 'engineeringgrimaldi.com',
    title: { en: 'The Forge Line', es: 'La Línea Forge', de: 'Die Forge Line', zh: 'Forge 产品线' },
    desc: {
      en: 'Trades 2.0 — one automation product per trade.',
      es: 'Oficios 2.0 — un producto de automatización por oficio.',
      de: 'Handwerk 2.0 — ein Automatisierungsprodukt pro Gewerk.',
      zh: '行业 2.0 — 每个行业一款自动化产品。',
    },
  },
  {
    id: 'palletizer',
    href: 'https://palletizer-app.vercel.app',
    host: 'palletizer-app.vercel.app',
    title: { en: 'Palletizer optimizer', es: 'Optimizador de paletizado', de: 'Palettier-Optimierer', zh: '码垛优化器' },
    desc: {
      en: 'The shipped Forge product — try the optimizer.',
      es: 'El producto Forge entregado — prueba el optimizador.',
      de: 'Das ausgelieferte Forge-Produkt — Optimierer ausprobieren.',
      zh: '已交付的 Forge 产品 — 试用优化器。',
    },
  },
  {
    id: 'thesis',
    href: 'https://physics-informed.vercel.app/',
    host: 'physics-informed.vercel.app',
    title: { en: 'The thesis, running', es: 'La tesis, ejecutándose', de: 'Die Thesis, laufend', zh: '运行中的论文' },
    desc: {
      en: 'The RWTH master thesis as an interactive simulator.',
      es: 'La tesis de RWTH como simulador interactivo.',
      de: 'Die RWTH-Masterarbeit als interaktiver Simulator.',
      zh: 'RWTH 硕士论文的交互式仿真器。',
    },
  },
  {
    id: 'portfolio',
    href: 'https://igrimaldi.engineering',
    host: 'igrimaldi.engineering',
    title: { en: 'The work registry', es: 'El registro de trabajo', de: 'Das Arbeitsregister', zh: '工作档案' },
    desc: {
      en: 'Capabilities and platforms, each with provenance.',
      es: 'Capacidades y plataformas, cada una con procedencia.',
      de: 'Kompetenzen und Plattformen, jede mit Provenienz.',
      zh: '能力与平台，均有可查出处。',
    },
  },
  {
    id: 'card',
    href: 'https://igrimaldi.engineering/card',
    host: 'igrimaldi.engineering/card',
    title: { en: 'The business card', es: 'La tarjeta de visita', de: 'Die Visitenkarte', zh: '数字名片' },
    desc: {
      en: 'vCard, QR and every channel in one place.',
      es: 'vCard, QR y todos los canales en un lugar.',
      de: 'vCard, QR und alle Kanäle an einem Ort.',
      zh: 'vCard、二维码与全部渠道，一处齐备。',
    },
  },
];

/* ------------------------------------------------------------------ */
/* Ask — the study concierge                                           */
/* ------------------------------------------------------------------ */

export const askUi: {
  launcher: L;
  title: L;
  badge: L;
  sub: L;
  placeholder: L;
  send: L;
  suggestionsLabel: L;
  disclaimer: L;
  fallback: L;
  close: L;
} = {
  launcher: { en: 'Ask Vincenzo’s site', es: 'Pregunta al sitio de Vincenzo', de: 'Vincenzos Seite fragen', zh: '询问 Vincenzo 的网站' },
  title: { en: 'Ask the study', es: 'Pregunta al estudio', de: 'Das Arbeitszimmer fragen', zh: '问书房' },
  badge: { en: 'Built-in', es: 'Integrado', de: 'Integriert', zh: '内置' },
  sub: {
    en: 'Instant answers about the journey, the books and the ventures.',
    es: 'Respuestas instantáneas sobre el camino, los libros y las empresas.',
    de: 'Sofortige Antworten zum Weg, den Büchern und den Ventures.',
    zh: '即刻解答有关历程、著作与创业项目的问题。',
  },
  placeholder: { en: 'Ask a question…', es: 'Haz una pregunta…', de: 'Stellen Sie eine Frage…', zh: '输入问题…' },
  send: { en: 'Send', es: 'Enviar', de: 'Senden', zh: '发送' },
  suggestionsLabel: { en: 'Curious where to start?', es: '¿Por dónde empezar?', de: 'Wo anfangen?', zh: '不知从何问起？' },
  disclaimer: {
    en: 'Instant guide over this site’s own content — runs in your browser, no data leaves it.',
    es: 'Guía instantánea sobre el contenido de este sitio — corre en tu navegador, ningún dato sale de él.',
    de: 'Sofort-Guide über die Inhalte dieser Seite — läuft im Browser, keine Daten verlassen ihn.',
    zh: '基于本站内容的即时向导 — 在您的浏览器中运行，数据不外传。',
  },
  fallback: {
    en: 'That page of the story isn’t written yet. Email reaches me fastest — or pick a topic below.',
    es: 'Esa página de la historia aún no está escrita. El correo me llega más rápido — o elige un tema abajo.',
    de: 'Diese Seite der Geschichte ist noch nicht geschrieben. E-Mail erreicht mich am schnellsten — oder wählen Sie unten ein Thema.',
    zh: '故事的这一页还没写。发邮件最快 — 或从下方选择话题。',
  },
  close: { en: 'Close', es: 'Cerrar', de: 'Schließen', zh: '关闭' },
};

export type AskLink = { label: L; href: string };
export type AskEntry = { id: string; keywords: string[]; question: L; answer: L; links: AskLink[] };

export const askEntries: AskEntry[] = [
  {
    id: 'books',
    keywords: ['book', 'books', 'renewables', 'orbital', 'manuscript', 'read', 'libro', 'leer', 'buch', 'bücher', 'lesen', '书', '著作', 'proof', 'chapter', 'capítulo', 'kapitel', '章', 'publish'],
    question: { en: 'What are the two books?', es: '¿Cuáles son los dos libros?', de: 'Was sind die zwei Bücher?', zh: '两本书是什么？' },
    answer: {
      en: 'The Renewables Migration — the case for how the energy transition actually gets built, with eleven public chapter proof-engine repositories so every load-bearing number can be re-run — and The Orbital AI Compute Roadmap. Both are honestly in revision, not yet on sale.',
      es: 'The Renewables Migration — cómo se construye de verdad la transición energética, con once repositorios públicos de motores de prueba por capítulo — y The Orbital AI Compute Roadmap. Ambos están honestamente en revisión, aún no a la venta.',
      de: 'The Renewables Migration — wie die Energiewende tatsächlich gebaut wird, mit elf öffentlichen Kapitel-Beweis-Engines, sodass jede tragende Zahl nachrechenbar ist — und The Orbital AI Compute Roadmap. Beide ehrlich in Überarbeitung, noch nicht im Verkauf.',
      zh: '《The Renewables Migration》— 论述能源转型究竟如何落地，配有十一个公开的章节验证引擎仓库，每个关键数字都可重新运行 — 以及《The Orbital AI Compute Roadmap》。两部均如实标注修订中，尚未发售。',
    },
    links: [{ label: { en: 'Books & receipts', es: 'Libros y recibos', de: 'Bücher & Belege', zh: '著作与凭证' }, href: '#books' }],
  },
  {
    id: 'proof',
    keywords: ['proof', 'engine', 'receipt', 'verify', 'number', 'repositor', 'código', 'codigo', 'verificar', 'beweis', 'nachrechnen', '验证', '引擎', '仓库', 'github'],
    question: { en: 'What is a proof engine?', es: '¿Qué es un motor de prueba?', de: 'Was ist eine Beweis-Engine?', zh: '什么是验证引擎？' },
    answer: {
      en: 'A public repository per chapter that recomputes the chapter’s load-bearing numbers from source data. Readers don’t have to trust the book — they can run it. Eleven engines cover The Renewables Migration, linked from the Books section.',
      es: 'Un repositorio público por capítulo que recalcula los números estructurales del capítulo desde los datos fuente. Los lectores no tienen que confiar en el libro — pueden ejecutarlo. Once motores cubren The Renewables Migration.',
      de: 'Ein öffentliches Repository pro Kapitel, das die tragenden Zahlen des Kapitels aus Quelldaten neu berechnet. Leser müssen dem Buch nicht vertrauen — sie können es ausführen. Elf Engines decken The Renewables Migration ab.',
      zh: '每章一个公开仓库，从源数据重新计算该章的关键数字。读者无需盲信书稿 — 可以直接运行验证。十一个引擎覆盖《The Renewables Migration》全书。',
    },
    links: [{ label: { en: 'See the engines', es: 'Ver los motores', de: 'Engines ansehen', zh: '查看引擎' }, href: '#books' }],
  },
  {
    id: 'journey',
    keywords: ['who', 'journey', 'story', 'about', 'vincenzo', 'rwth', 'aachen', 'frankfurt', 'bahn', 'quién', 'quien', 'historia', 'camino', 'wer', 'weg', 'geschichte', '谁', '历程', '经历', 'life'],
    question: { en: 'What’s the journey so far?', es: '¿Cuál es el camino hasta ahora?', de: 'Wie verlief der Weg bisher?', zh: '至今的历程是怎样的？' },
    answer: {
      en: 'RWTH Aachen master thesis (2025, runnable in the browser), grid networks engineering at DB InfraGO in Frankfurt since 2024, the three-domain Grimaldi Network launched in 2026 — and right now, two manuscripts in revision and the Forge Line in development.',
      es: 'Tesis de máster en RWTH Aachen (2025, ejecutable en el navegador), ingeniería de redes en DB InfraGO en Fráncfort desde 2024, la Red Grimaldi de tres dominios lanzada en 2026 — y ahora mismo, dos manuscritos en revisión y la Línea Forge en desarrollo.',
      de: 'RWTH-Masterarbeit (2025, im Browser ausführbar), Netzingenieur bei DB InfraGO in Frankfurt seit 2024, das Drei-Domain-Grimaldi-Netzwerk 2026 gestartet — und aktuell zwei Manuskripte in Überarbeitung und die Forge Line in Entwicklung.',
      zh: 'RWTH 亚琛硕士论文（2025，可在浏览器中运行）、2024 年起在法兰克福 DB InfraGO 从事电网工程、2026 年上线三域名 Grimaldi 网络 — 眼下：两部书稿修订中，Forge 产品线开发中。',
    },
    links: [{ label: { en: 'The journey', es: 'El camino', de: 'Der Weg', zh: '历程' }, href: '#journey' }],
  },
  {
    id: 'ventures',
    keywords: ['venture', 'business', 'plastilonas', 'ecowoods', 'lima', 'peru', 'canada', 'empresa', 'negocio', 'unternehmen', '创业', '企业', '公司', 'flooring', 'pisos'],
    question: { en: 'What are the ventures?', es: '¿Cuáles son las empresas?', de: 'Was sind die Ventures?', zh: '有哪些创业项目？' },
    answer: {
      en: 'Two platforms that pay their way in production: Plastilonas Peruanas SAC, a B2B platform for a real Lima business, and Ecowoods, a flooring venture live in Canada. Both are open — site and source.',
      es: 'Dos plataformas que se pagan solas en producción: Plastilonas Peruanas SAC, una plataforma B2B para un negocio real de Lima, y Ecowoods, un negocio de pisos en vivo en Canadá. Ambas abiertas — sitio y código.',
      de: 'Zwei Plattformen, die sich in Produktion selbst tragen: Plastilonas Peruanas SAC, eine B2B-Plattform für ein reales Unternehmen in Lima, und Ecowoods, ein Bodenbelag-Venture live in Kanada. Beide offen — Seite und Quellcode.',
      zh: '两个在生产环境中自负盈亏的平台：为利马真实企业服务的 B2B 平台 Plastilonas Peruanas SAC，以及在加拿大运营的地板项目 Ecowoods。站点与源码均公开。',
    },
    links: [{ label: { en: 'The ventures', es: 'Las empresas', de: 'Die Ventures', zh: '创业项目' }, href: '#ventures' }],
  },
  {
    id: 'network',
    keywords: ['network', 'domain', 'site', 'engineering', 'forge', 'trades', 'red', 'dominio', 'sitio', 'netzwerk', 'seite', '网络', '域名', '站点', 'igrimaldi', 'engineeringgrimaldi'],
    question: { en: 'How do the three sites fit together?', es: '¿Cómo encajan los tres sitios?', de: 'Wie passen die drei Seiten zusammen?', zh: '三个网站如何配合？' },
    answer: {
      en: 'This is the trust layer — the person, the books, the ventures. engineeringgrimaldi.com is the product site (the Forge Line, Trades 2.0) and igrimaldi.engineering is the credibility engine (the full work registry). One mark, one language system, no dead ends.',
      es: 'Este es la capa de confianza — la persona, los libros, las empresas. engineeringgrimaldi.com es el sitio de producto (la Línea Forge, Oficios 2.0) e igrimaldi.engineering es el motor de credibilidad (el registro completo de trabajo). Una marca, un sistema de idiomas, sin callejones sin salida.',
      de: 'Dies ist die Vertrauensschicht — die Person, die Bücher, die Ventures. engineeringgrimaldi.com ist die Produktseite (Forge Line, Handwerk 2.0), igrimaldi.engineering die Glaubwürdigkeits-Engine (das vollständige Arbeitsregister). Eine Marke, ein Sprachsystem, keine Sackgassen.',
      zh: '本站是信任层 — 个人、著作、创业项目。engineeringgrimaldi.com 是产品站（Forge 产品线，行业 2.0），igrimaldi.engineering 是可信度引擎（完整工作档案）。同一标识，同一语言系统，无死链。',
    },
    links: [{ label: { en: 'The network', es: 'La red', de: 'Das Netzwerk', zh: '网络' }, href: '#network' }],
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'podcast', 'interview', 'press', 'journalist', 'contacto', 'correo', 'entrevista', 'prensa', 'kontakt', 'e-mail', 'presse', '联系', '采访', '播客'],
    question: { en: 'Podcast or press — how to reach out?', es: 'Podcast o prensa — ¿cómo contactar?', de: 'Podcast oder Presse — wie erreichen?', zh: '播客或媒体如何联系？' },
    answer: {
      en: 'Email vincenzo@igrimaldi.engineering. Podcast hosts, journalists and partners welcome — and every claim you might quote here has a public receipt behind it.',
      es: 'Escribe a vincenzo@igrimaldi.engineering. Anfitriones de podcast, periodistas y socios bienvenidos — y cada afirmación citable aquí tiene un recibo público detrás.',
      de: 'E-Mail an vincenzo@igrimaldi.engineering. Podcast-Hosts, Journalisten und Partner willkommen — und jede zitierbare Aussage hier hat einen öffentlichen Beleg.',
      zh: '发邮件至 vincenzo@igrimaldi.engineering。欢迎播客主持人、记者与合作伙伴 — 这里每个可引用的论断背后都有公开凭证。',
    },
    links: [
      { label: { en: 'Email', es: 'Correo', de: 'E-Mail', zh: '邮件' }, href: 'mailto:vincenzo@igrimaldi.engineering' },
      { label: { en: 'Business card', es: 'Tarjeta', de: 'Visitenkarte', zh: '名片' }, href: 'https://igrimaldi.engineering/card' },
    ],
  },
];

export const askSuggestions = ['books', 'journey', 'ventures', 'contact'];

export function matchAsk(query: string): AskEntry | null {
  const q = query.toLowerCase();
  let best: AskEntry | null = null;
  let bestScore = 0;
  for (const entry of askEntries) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.length > 3 ? 2 : 1;
    }
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }
  return bestScore > 0 ? best : null;
}
