import { contracts, clusters, type ClusterId } from '@/content/cluster';

/**
 * ContractSequence — the event → work order → result loop as a sequence diagram.
 *
 * Three lifelines, one message per contract, and the human-approval gate drawn
 * where the WorkOrder schema requires it. Everything is read from
 * content/cluster/contracts.ts, so a new contract becomes a new message.
 * Server component.
 */
const LANES: ClusterId[] = ['energy', 'operations', 'physical-ai'];
const SLOT: Record<ClusterId, 1 | 2 | 3> = { operations: 1, energy: 2, 'physical-ai': 3 };

export default function ContractSequence() {
  const W = 720;
  const laneX = (id: ClusterId) => 120 + LANES.indexOf(id) * 240;
  const top = 44;
  const step = 64;
  const H = top + contracts.length * step + 40;
  const name = (id: ClusterId) => clusters.find((c) => c.id === id)?.name ?? id;

  return (
    <figure className="viz-fig">
      <svg className="viz viz--wide viz-seq" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Sequence: ${contracts.map((c) => `${c.name} from ${name(c.producer)} to ${name(c.consumer)}`).join('; ')}`}>
        <title>Contract sequence — event, work order, result</title>
        <defs>
          <marker id="viz-arrow-seq" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="viz-arrowhead" />
          </marker>
        </defs>
        {LANES.map((id) => (
          <g key={id}>
            <line x1={laneX(id)} x2={laneX(id)} y1={top - 6} y2={H - 16} className="viz-grid" />
            <rect x={laneX(id) - 80} y={4} width={160} height={28} rx={6} className="viz-box" />
            <rect x={laneX(id) - 80} y={4} width={4} height={28} rx={2} className={`viz-accent viz-slot-${SLOT[id]}`} />
            <text x={laneX(id) + 2} y={23} textAnchor="middle" className="viz-label viz-label--ink viz-label--strong">
              {name(id).replace(' & Commercial Automation', '').replace(' & Robotics', '')}
            </text>
          </g>
        ))}
        {contracts.map((c, i) => {
          const y = top + i * step + 20;
          const x1 = laneX(c.producer);
          const x2 = laneX(c.consumer);
          const dir = x2 > x1 ? 1 : -1;
          const gate = c.schema.some((f) => f.field === 'approval');
          return (
            <g key={c.id}>
              <title>{`${c.name} v${c.version}: ${c.summary}`}</title>
              <line x1={x1 + dir * 4} x2={x2 - dir * 6} y1={y} y2={y} className="viz-edge" markerEnd="url(#viz-arrow-seq)" />
              <text x={(x1 + x2) / 2} y={y - 8} textAnchor="middle" className="viz-label viz-label--mono">{c.name} v{c.version}</text>
              <text x={(x1 + x2) / 2} y={y + 16} textAnchor="middle" className="viz-label">{c.status}</text>
              {gate && (
                <g>
                  <title>Human approval required — a work order without `approval` is invalid by schema</title>
                  <rect x={x1 - 9} y={y - 9} width={18} height={18} rx={3} className="viz-gate" transform={`rotate(45 ${x1} ${y})`} />
                  <text x={x1} y={y + 4} textAnchor="middle" className="viz-num viz-num--cell viz-num--oncolor">✓</text>
                </g>
              )}
            </g>
          );
        })}
        <text x={W / 2} y={H - 2} textAnchor="middle" className="viz-label">◆ human approval — required by schema before anything physical happens</text>
      </svg>
      <figcaption>The loop from §14 of the mandate: GridOS detects → Runway Fuel creates an approved work order → Physical AI executes under its own safety chain → the result returns to Energy.</figcaption>
    </figure>
  );
}
