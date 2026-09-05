import { registry, type Maturity, type RegistryEntry } from '@/content/cluster';
import { MATURITY_LABEL } from '@/lib/cluster';

/**
 * MaturityLadder — every registry entry placed on the maturity axis.
 *
 * The axis is ordered (not located → hypothesis → internal tool → pre-launch →
 * live without paying software customer → live with paying customers). Each
 * entry is a dot with its name; the tier is encoded by the dot's shape
 * (filled = core, ringed = vertical, hollow = related), so identity never
 * rests on colour. The right-hand column is where the cluster must move
 * things. Server component.
 */
const ORDER: Maturity[] = ['not-located', 'hypothesis', 'internal-tool', 'pre-launch', 'live-no-paying-customers', 'live-with-customers'];
const SHORT: Record<Maturity, string> = {
  'not-located': 'not located',
  hypothesis: 'hypothesis',
  'internal-tool': 'internal tool',
  'pre-launch': 'pre-launch',
  'live-no-paying-customers': 'live · no paying customer',
  'live-with-customers': 'live · paying customers',
};
/** Two-line column captions so the six labels never collide. */
const CAPTION: Record<Maturity, [string, string]> = {
  'not-located': ['not located', 'in inventory'],
  hypothesis: ['hypothesis', 'no code'],
  'internal-tool': ['internal', 'tool'],
  'pre-launch': ['pre-launch', 'no customers'],
  'live-no-paying-customers': ['live', 'no paying customer'],
  'live-with-customers': ['live', 'paying customers'],
};

function Dot({ tier, cx, cy }: { tier: RegistryEntry['tier']; cx: number; cy: number }) {
  if (tier === 'core') return <circle cx={cx} cy={cy} r={6} className="viz-dot" />;
  if (tier === 'vertical')
    return (
      <>
        <circle cx={cx} cy={cy} r={7} className="viz-hollow" />
        <circle cx={cx} cy={cy} r={3} className="viz-dot" />
      </>
    );
  return <circle cx={cx} cy={cy} r={6} className="viz-hollow" />;
}

export default function MaturityLadder() {
  const W = 900;
  const colW = W / ORDER.length;
  const rowH = 26;
  const maxRows = Math.max(...ORDER.map((m) => registry.filter((r) => r.maturity === m).length), 1);
  const top = 30;
  const H = top + maxRows * rowH + 48;

  return (
    <figure className="viz-fig">
      <svg className="viz viz--wide viz-ladder" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Maturity ladder: ${ORDER.map((m) => `${SHORT[m]}: ${registry.filter((r) => r.maturity === m).map((r) => r.name).join(', ') || 'none'}`).join('; ')}`}>
        <title>Where every registry entry stands on the maturity axis</title>
        {ORDER.map((m, i) => {
          const x = i * colW;
          const rows = registry.filter((r) => r.maturity === m);
          return (
            <g key={m}>
              {i > 0 && <line x1={x} x2={x} y1={top - 12} y2={H - 40} className="viz-grid" />}
              <text x={x + colW / 2} y={H - 22} textAnchor="middle" className="viz-label viz-label--ink">{CAPTION[m][0]}</text>
              <text x={x + colW / 2} y={H - 7} textAnchor="middle" className="viz-label">{CAPTION[m][1]}</text>
              {rows.map((r, j) => {
                const cy = top + j * rowH;
                return (
                  <g key={r.slug}>
                    <title>{`${r.name} — ${MATURITY_LABEL[r.maturity]} · ${r.tier} · ${r.status}`}</title>
                    <Dot tier={r.tier} cx={x + 14} cy={cy} />
                    <text x={x + 26} y={cy + 4} className="viz-label viz-label--ink">
                      {r.name.length > 18 ? `${r.name.slice(0, 17)}…` : r.name}
                    </text>
                  </g>
                );
              })}
              {rows.length === 0 && <text x={x + colW / 2} y={top + 4} textAnchor="middle" className="viz-label viz-label--faint">—</text>}
            </g>
          );
        })}
        <line x1={0} x2={W} y1={H - 40} y2={H - 40} className="viz-grid" />
        <text x={W - 4} y={top - 16} textAnchor="end" className="viz-label">→ the direction the cluster is paid to move</text>
      </svg>
      <figcaption>
        <span className="viz-key viz-key--dot" /> core · <span className="viz-key viz-key--ringed" /> vertical · <span className="viz-key viz-key--hollow" /> related.{' '}
        {registry.some((r) => r.maturity === 'live-with-customers')
          ? `${registry.filter((r) => r.maturity === 'live-with-customers').length} entr${registry.filter((r) => r.maturity === 'live-with-customers').length === 1 ? 'y has' : 'ies have'} paying customers.`
          : 'The right-most column is empty: no entry has a paying software customer yet.'}
      </figcaption>
    </figure>
  );
}
