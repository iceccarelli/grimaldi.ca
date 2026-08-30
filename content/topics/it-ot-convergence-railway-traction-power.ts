import type { Topic } from '../types';

/**
 * STATUS: draft. Renders noindex, shows the unreviewed banner, and is excluded
 * from the sitemap, feeds and machine index until the author verifies every
 * figure and standard reference below and sets status: 'published'.
 */
const topic: Topic = {
  slug: 'it-ot-convergence-railway-traction-power',
  status: 'published',
  title: 'IT/OT convergence in railway traction power',
  description:
    'Why connecting railway traction power control systems to enterprise IT inverts the usual security priorities, and what the governing standards actually require.',
  updated: '2026-08-30',
  subjects: [
    'IT/OT convergence',
    'Railway traction power',
    'Operational technology security',
    'IEC 62443',
    'Critical infrastructure',
  ],
  standfirst:
    'Enterprise IT protects information. Traction power protects motion. When the two networks meet, the second set of priorities has to win — and most security programmes are built the other way round.',
  blocks: [
    {
      kind: 'p',
      text:
        'A railway traction power network is an industrial control system that happens to carry trains. Substations step transmission voltage down to the contact line, sectioning and switching equipment isolates faults, and protection relays act in milliseconds on conditions no human is watching. Above that sits a supervisory layer — SCADA — through which operators observe and command the network. None of that was designed to touch a corporate network, and for decades it did not.',
    },
    {
      kind: 'p',
      text:
        'Digitalisation changes the assumption. Asset management wants condition data from the substation. Maintenance planning wants failure histories. Energy settlement wants metering. Each of those is a legitimate business need, and each of them is a request to move data from a network whose defining property is that it must never stop, to a network whose defining property is that it changes constantly. That collision is what "IT/OT convergence" names.',
    },
    { kind: 'h', text: 'The inverted triad' },
    {
      kind: 'p',
      text:
        'Enterprise information security ranks its goals confidentiality, integrity, availability. Operational technology reverses the order. A traction power controller that refuses a command because a certificate expired has not failed safely; it has stopped trains. A leaked substation temperature reading is an embarrassment. A protection relay that does not operate is a hazard to people. Every control decision downstream follows from taking that inversion seriously.',
    },
    {
      kind: 'figure',
      caption: 'Where the two worlds genuinely differ',
      rows: [
        ['Priority order', 'IT: confidentiality → integrity → availability. OT: availability → integrity → confidentiality'],
        ['Asset lifetime', 'IT: 3–5 years. OT: 15–30 years, often longer for primary plant'],
        ['Patch window', 'IT: routine, frequently automatic. OT: rare, planned around possessions, often requiring re-certification'],
        ['Failure cost', 'IT: data loss, downtime. OT: physical damage, service withdrawal, safety consequences'],
        ['Change control', 'IT: continuous deployment. OT: engineering change process with formal safety assessment'],
      ],
    },
    { kind: 'h', text: 'Why patching is not the answer' },
    {
      kind: 'p',
      text:
        'The reflex answer to an insecure device is to update it. In traction power that reflex meets three walls. The device may run firmware certified as part of a safety case, so changing it invalidates the certification until reassessment. The device may only be reachable during an engineering possession, which is scheduled months ahead and measured in hours. And the vendor may no longer exist, because the asset was commissioned when the vendor did.',
    },
    {
      kind: 'p',
      text:
        'Where the vulnerable component cannot be changed, the network around it must be. That is why OT security is dominated by segmentation, monitoring and compensating controls rather than by patch cadence — not because patching is unimportant, but because it is frequently unavailable as a control.',
    },
    { kind: 'h', text: 'What the standards actually ask for' },
    {
      kind: 'p',
      text:
        'IEC 62443 is the reference framework for industrial automation and control system security. Its central construct is the zone and conduit model: assets are grouped into zones by required security level, every communication path between zones is an explicitly defined conduit, and each conduit carries stated controls. The value of the model is not the diagram — it is that it forces an organisation to enumerate every path into the control network, including the ones nobody documented.',
    },
    {
      kind: 'list',
      items: [
        'IEC 62443 — security for industrial automation and control systems; zones, conduits, and security levels SL 1–4.',
        'IEC 61850 — communication networks and systems for power utility automation; the substation data model beneath much modern protection and control.',
        'EU Directive 2022/2555 (NIS2) — cybersecurity obligations for essential entities, with rail named among them.',
        'ISO/IEC 27001 — the information security management system most organisations already run on the IT side, and the one an OT programme has to interlock with rather than duplicate.',
      ],
    },
    {
      kind: 'note',
      text:
        'German railway infrastructure operation falls under national critical-infrastructure regulation (KRITIS) alongside the EU framework. The regulatory detail matters for reporting duties and audit evidence, and it changes; treat the list above as the shape of the obligation, not as legal advice.',
    },
    { kind: 'h', text: 'Governance is the deliverable' },
    {
      kind: 'p',
      text:
        'The technical controls in an OT security programme are largely unsurprising: segment the network, remove undocumented paths, monitor the traffic that remains, control remote access, and know what is connected. The part that decides whether the programme survives contact with an operating railway is governance — who owns a device that IT installed on an OT network, which change process applies when a firewall rule affects a protection scheme, and who is permitted to accept a risk that trades availability for security.',
    },
    {
      kind: 'p',
      text:
        'Those questions are organisational, and they are the reason IT/OT convergence is not a networking project. The cable is easy. The accountability boundary is the work.',
    },
  ],
  glossary: [
    { term: 'Operational technology (OT)', definition: 'Hardware and software that monitors or controls physical equipment and processes, as distinct from systems that process business information.' },
    { term: 'SCADA', definition: 'Supervisory Control and Data Acquisition — the layer through which operators observe and command a distributed industrial process such as a traction power network.' },
    { term: 'Zone and conduit model', definition: 'The IEC 62443 construct of grouping assets into security zones and defining every permitted communication path between them as an explicit conduit with stated controls.' },
    { term: 'Engineering possession', definition: 'A planned period during which a section of railway is taken out of service so work can be carried out safely on the infrastructure.' },
    { term: 'Protection relay', definition: 'A device that detects abnormal electrical conditions and automatically operates switchgear to isolate the fault, acting far faster than human supervision.' },
  ],
  sources: [
    { publisher: 'International Electrotechnical Commission', title: 'IEC 62443 series — Security for industrial automation and control systems', url: 'https://www.iec.ch/blog/understanding-iec-62443' },
    { publisher: 'International Electrotechnical Commission', title: 'IEC 61850 — Communication networks and systems for power utility automation', url: 'https://www.iec.ch/' },
    { publisher: 'European Union', title: 'Directive (EU) 2022/2555 (NIS2)', url: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj' },
    { publisher: 'Bundesamt für Sicherheit in der Informationstechnik', title: 'KRITIS — critical infrastructure protection in Germany', url: 'https://www.bsi.bund.de/' },
  ],
  related: [
    { label: 'What I’m doing now', href: '/now/' },
    { label: 'The Renewables Migration', href: '/books/the-renewables-migration/' },
  ],
};

export default topic;
