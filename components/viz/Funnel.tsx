import type { ObjectiveProgress } from '@/lib/cluster';

/**
 * Funnel — the four 90-day stages as horizontal bars against their targets.
 *
 * Each row: a target ghost (track) and the actual count (fill). One hue; the
 * stages are ordered, not categorical. Values are labelled at the bar tip in
 * text ink. 0 renders a hairline and "0 / n" — nothing is drawn that was not
 * counted. Server component.
 */
export default function Funnel({ stages }: { stages: ObjectiveProgress[] }) {
  const W = 520;
  const rowH = 40;
  const H = stages.length * rowH + 12;
  const labelW = 172;
  const barMaxW = W - labelW - 78;
  const barH = 18;

  return (
    <figure className="viz-fig">
      <svg className="viz viz--wide viz-funnel" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Funnel: ${stages.map((s) => `${s.label} ${s.current} of ${s.target}`).join('; ')}`}>
        <title>{`90-day funnel — ${stages.map((s) => `${s.label} ${s.current}/${s.target}`).join(' · ')}`}</title>
        {stages.map((s, i) => {
          const y = 8 + i * rowH;
          const frac = Math.min(1, s.current / s.target);
          const fillW = Math.max(frac * barMaxW, s.current > 0 ? 6 : 0);
          return (
            <g key={s.id}>
              <title>{`${s.label}: ${s.current} of ${s.target} (${s.pct}%)`}</title>
              <text x={labelW - 12} y={y + barH / 2 + 4} textAnchor="end" className="viz-label viz-label--row">{s.label}</text>
              <rect x={labelW} y={y} width={barMaxW} height={barH} rx={4} className="viz-track-fill" />
              {fillW > 0 && <rect x={labelW} y={y} width={fillW} height={barH} rx={4} className="viz-fill" />}
              {fillW === 0 && <line x1={labelW} x2={labelW} y1={y - 3} y2={y + barH + 3} className="viz-baseline" />}
              <text x={labelW + barMaxW + 10} y={y + barH / 2 + 4} className="viz-num">
                {s.current} <tspan className="viz-label">/ {s.target}</tspan>
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>Counted from the evidence log. Grey = target; filled = logged.</figcaption>
    </figure>
  );
}
