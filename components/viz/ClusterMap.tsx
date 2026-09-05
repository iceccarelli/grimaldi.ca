import { clusters, contracts, type ClusterId } from '@/content/cluster';

/**
 * ClusterMap — the three strategic clusters and the contracts between them.
 *
 * Three boxes, one per cluster, each with its validated categorical hue as an
 * accent bar (Operations = slot 1, Energy = slot 2, Physical AI = slot 3);
 * the text stays in ink. Arrows are the proposed contracts, labelled with
 * name and version. Operations is marked as controlled here. The picture
 * shows the mechanism the constitution requires: interfaces, not shared
 * databases. Server component.
 */
const POS: Record<ClusterId, { x: number; y: number }> = {
  energy: { x: 20, y: 40 },
  operations: { x: 270, y: 150 },
  'physical-ai': { x: 520, y: 40 },
};
const BW = 180;
const BH = 78;
const SLOT: Record<ClusterId, 1 | 2 | 3> = { operations: 1, energy: 2, 'physical-ai': 3 };

type Edge = { x1: number; y1: number; x2: number; y2: number; lx: number; ly: number; anchor: 'start' | 'middle' | 'end' };

/** Hand-placed anchors for the three known routes, so labels never cross a box. */
const EDGES: Record<string, Edge> = {
  'energy->operations': { x1: 200, y1: 104, x2: 268, y2: 172, lx: 196, ly: 168, anchor: 'end' },
  'operations->physical-ai': { x1: 450, y1: 172, x2: 518, y2: 104, lx: 524, ly: 168, anchor: 'start' },
  'physical-ai->energy': { x1: 518, y1: 79, x2: 204, y2: 79, lx: 360, ly: 66, anchor: 'middle' },
};

function center(id: ClusterId) {
  return { cx: POS[id].x + BW / 2, cy: POS[id].y + BH / 2 };
}

/** Any contract on a route not hand-placed above: centre to centre, label at the midpoint. */
function fallbackEdge(a: ClusterId, b: ClusterId): Edge {
  const p = center(a);
  const q = center(b);
  return { x1: p.cx, y1: p.cy, x2: q.cx, y2: q.cy, lx: (p.cx + q.cx) / 2, ly: (p.cy + q.cy) / 2 - 8, anchor: 'middle' };
}

export default function ClusterMap() {
  const W = 720;
  const H = 260;
  return (
    <figure className="viz-fig">
      <svg className="viz viz--wide viz-map" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Three clusters: ${clusters.map((c) => c.name).join(', ')}. Contracts: ${contracts.map((c) => `${c.name} from ${c.producer} to ${c.consumer}`).join('; ')}.`}>
        <title>The three clusters and the contracts between them</title>
        <defs>
          <marker id="viz-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="viz-arrowhead" />
          </marker>
        </defs>

        {contracts.map((c) => {
          const e = EDGES[`${c.producer}->${c.consumer}`] ?? fallbackEdge(c.producer, c.consumer);
          return (
            <g key={c.id}>
              <title>{`${c.name} v${c.version} · ${c.status} · ${c.producer} → ${c.consumer}`}</title>
              <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} className="viz-edge" markerEnd="url(#viz-arrow)" />
              <text x={e.lx} y={e.ly} textAnchor={e.anchor} className="viz-label viz-label--mono">
                {c.name} v{c.version}
              </text>
            </g>
          );
        })}

        {clusters.map((c) => {
          const p = POS[c.id];
          const here = c.controlSurface !== null;
          return (
            <g key={c.id}>
              <title>{`${c.agent} — ${c.name}: “${c.command}”${here ? ' · controlled from this site' : ' · not controlled here'}`}</title>
              <rect x={p.x} y={p.y} width={BW} height={BH} rx={8} className={here ? 'viz-box viz-box--here' : 'viz-box'} />
              <rect x={p.x} y={p.y} width={5} height={BH} rx={2} className={`viz-accent viz-slot-${SLOT[c.id]}`} />
              <text x={p.x + 16} y={p.y + 22} className="viz-label viz-label--mono">{c.agent}</text>
              <text x={p.x + 16} y={p.y + 42} className="viz-label viz-label--ink viz-label--strong">{c.name.length > 22 ? c.name.replace(' & Commercial Automation', '') : c.name}</text>
              <text x={p.x + 16} y={p.y + 62} className="viz-label">{here ? 'controlled here' : 'counterparty'}</text>
            </g>
          );
        })}
        <text x={W / 2} y={H - 8} textAnchor="middle" className="viz-label">
          None of the three systems requires the others to function.
        </text>
      </svg>
      <figcaption>
        <span className="viz-key viz-key--slot1" /> Operations (this site) · <span className="viz-key viz-key--slot2" /> Energy Intelligence · <span className="viz-key viz-key--slot3" /> Physical AI. Arrows are contracts —{' '}
        {(['proposed', 'draft', 'versioned', 'deprecated'] as const)
          .map((s) => [s, contracts.filter((c) => c.status === s).length] as const)
          .filter(([, n]) => n > 0)
          .map(([s, n]) => `${n} ${s}`)
          .join(', ')}.
      </figcaption>
    </figure>
  );
}
