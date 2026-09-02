import type { Note } from '../types';

/**
 * Seed A — the first field note. An outline that already says something,
 * written from public physics only. Nothing in it comes from an employer
 * system, a measurement, or a document that is not public.
 */
const note: Note = {
  slug: 'what-a-residual-is-for-on-a-traction-grid',
  status: 'published',
  badge: 'IN REVISION',
  title: 'What a residual is for on a traction grid',
  description:
    'A residual is the gap between what the physics says should be there and what the sensor says is there. On a 16.7 Hz traction grid that gap is the whole job.',
  date: '2026-09-01',
  subjects: ['Traction power', 'Residuals', 'Physics-informed models', '16.7 Hz'],
  artefact: {
    label: 'The residual you can check yourself: IEEE 9-bus demo',
    href: 'https://physics-informed.vercel.app/',
    owner: 'physics-informed.vercel.app',
  },
  blocks: [
    {
      kind: 'p',
      text:
        'German mainline railways run on single-phase AC at 15 kV and 16.7 Hz, a frequency chosen a century ago for the commutator motors of the time and kept because the fleet, the substations and the overhead line are all built for it. It is a separate grid from the 50 Hz public network, coupled to it through converters, and it has its own dynamics: a moving load that draws megawatts for minutes, then regenerates, then disappears into the next feeding section.',
    },
    {
      kind: 'p',
      text:
        'A residual is a subtraction. You take a model of that grid — Kirchhoff’s laws, the line impedances, the converter set-points — and you compute what a given sensor ought to read. Then you read the sensor. The difference is the residual. When it is near zero, the model and the world agree. When it is not, one of three things is true: the sensor is wrong, the model is wrong, or something has happened that neither of them knew about.',
    },
    { kind: 'h', text: 'Three uses, in the order they pay for themselves' },
    {
      kind: 'list',
      items: [
        'Bad-data detection. A transducer that drifts or a telegram that arrives corrupted produces a residual that grows on one channel while its neighbours stay quiet. This is textbook state estimation, and it is the reason a control room can trust a picture assembled from thousands of unequal measurements.',
        'Model maintenance. A residual that grows slowly on many channels at once is not a sensor: it is the model falling behind reality — a line re-conductored, a transformer tap changed, a section reconfigured. The residual is the cheapest audit of the asset register there is.',
        'Bounding what a learned model is allowed to do. This is the one that matters for the next decade. If a neural network proposes a set-point, the physics residual of that proposal is a number you can check before you act on it. A black box gives you a prediction; a physics-informed model gives you a prediction and the size of its own violation of the laws it is supposed to obey.',
      ],
    },
    { kind: 'h', text: 'Why this is the whole job' },
    {
      kind: 'p',
      text:
        'Critical-infrastructure operators are not going to put a model on a traction grid because it is accurate on average. They are going to put it there when someone can say, for every output, how far it departed from the physics and what happens if that departure is wrong. The residual is that sentence. Everything I want to build for grids starts from being able to write it down.',
    },
    {
      kind: 'note',
      text:
        'Scope note: this is an outline of public power-system fundamentals. It contains no measurements, topologies or procedures from any operator, including my employer. The runnable version of the argument — residuals on the IEEE 9-bus benchmark — lives on the vendor domain, linked below.',
    },
  ],
  sources: [
    {
      publisher: 'IEEE',
      title: 'A. Abur & A. G. Expósito, Power System State Estimation: Theory and Implementation (bad-data detection via measurement residuals)',
    },
    {
      publisher: 'CENELEC',
      title: 'EN 50163 — Railway applications: Supply voltages of traction systems (defines the 15 kV, 16.7 Hz AC system)',
    },
  ],
};

export default note;
