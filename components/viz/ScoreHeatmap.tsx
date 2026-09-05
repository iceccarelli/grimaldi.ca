import { rankedWorkflows, SCORE_DIMENSIONS, workflowRank, type ScoreDimension } from '@/content/cluster';

/**
 * ScoreHeatmap — fifteen workflows × six dimensions.
 *
 * Scored cells take a step of one sequential hue (1 → 5, light → dark) and
 * print the digit; unscored cells are hatched and empty. The rank column at
 * the right is the product, or "unscored". A legend names the five steps.
 * Server component.
 */
const DIM: Record<ScoreDimension, string> = {
  pain: 'Pain',
  frequency: 'Freq.',
  budget: 'Budget',
  urgency: 'Urgency',
  abilityToPay: 'Ability to pay',
  repeatability: 'Repeat.',
};

export default function ScoreHeatmap() {
  const rows = rankedWorkflows();
  const W = 720;
  const labelW = 170;
  const rankW = 80;
  const cell = (W - labelW - rankW) / SCORE_DIMENSIONS.length;
  const rowH = 24;
  const top = 26;
  const H = top + rows.length * rowH + 30;
  const scored = rows.filter((w) => workflowRank(w) !== null).length;

  return (
    <figure className="viz-fig">
      <svg className="viz viz--wide viz-heat" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Workflow scoring heatmap: ${scored} of ${rows.length} workflows scored`}>
        <title>{`Workflow scoring — ${scored} of ${rows.length} fully scored`}</title>
        <defs>
          <pattern id="viz-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" className="viz-hatch-line" />
          </pattern>
        </defs>
        {SCORE_DIMENSIONS.map((d, i) => (
          <text key={d} x={labelW + i * cell + cell / 2} y={top - 10} textAnchor="middle" className="viz-label">{DIM[d]}</text>
        ))}
        <text x={W - rankW / 2} y={top - 10} textAnchor="middle" className="viz-label">Rank</text>
        {rows.map((w, r) => {
          const y = top + r * rowH;
          const rank = workflowRank(w);
          return (
            <g key={w.id}>
              <text x={labelW - 10} y={y + rowH / 2 + 4} textAnchor="end" className="viz-label viz-label--ink">{w.name}</text>
              {SCORE_DIMENSIONS.map((d, i) => {
                const v = w.score[d];
                const x = labelW + i * cell;
                return (
                  <g key={d}>
                    <title>{`${w.name} · ${DIM[d]}: ${v === null ? 'unscored — no customer evidence yet' : `${v} of 5`}`}</title>
                    <rect x={x + 1} y={y + 1} width={cell - 2} height={rowH - 2} rx={3} className={v === null ? 'viz-cell--empty' : `viz-cell viz-seq-${v}`} />
                    {v !== null && (
                      <text x={x + cell / 2} y={y + rowH / 2 + 4} textAnchor="middle" className={`viz-num viz-num--cell${v >= 4 ? ' viz-num--oncolor' : ''}`}>{v}</text>
                    )}
                  </g>
                );
              })}
              <text x={W - 8} y={y + rowH / 2 + 4} textAnchor="end" className={rank === null ? 'viz-label viz-label--faint' : 'viz-num'}>
                {rank === null ? 'unscored' : rank}
              </text>
            </g>
          );
        })}
        {/* legend */}
        {[1, 2, 3, 4, 5].map((v, i) => (
          <g key={v}>
            <rect x={labelW + i * 22} y={H - 20} width={20} height={12} rx={2} className={`viz-cell viz-seq-${v}`} />
          </g>
        ))}
        <text x={labelW + 5 * 22 + 8} y={H - 10} className="viz-label">1 → 5 per dimension · hatched = unscored</text>
      </svg>
      <figcaption>Rank = pain × frequency × budget × urgency × ability to pay × repeatability. A dimension is scored only from logged evidence.</figcaption>
    </figure>
  );
}
