import type { ObjectiveProgress } from '@/lib/cluster';

/**
 * ObjectiveRing — a radial meter for one 90-day target.
 *
 * The track is a lighter step of the same hue; the fill is the count over the
 * target. 0 of 50 draws no arc and prints "0 / 50" — the empty ring is the
 * message. The number wears text tokens, never the series colour. Server component.
 */
export default function ObjectiveRing({ o, size = 132 }: { o: ObjectiveProgress; size?: number }) {
  const stroke = 10;
  const r = (size - stroke) / 2 - 2;
  const c = 2 * Math.PI * r;
  const frac = Math.min(1, o.current / o.target);
  const cx = size / 2;
  const cy = size / 2;
  const id = `ring-${o.id}`;

  return (
    <figure className="viz-ring-fig" aria-labelledby={`${id}-cap`}>
      <svg
        className="viz viz-ringsvg"
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label={`${o.label}: ${o.current} of ${o.target} (${o.pct}%)`}
      >
        <title>{`${o.label}: ${o.current} of ${o.target} — ${o.pct}%`}</title>
        <circle cx={cx} cy={cy} r={r} className="viz-track" strokeWidth={stroke} fill="none" />
        {frac > 0 && (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            className="viz-arc"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${(frac * c).toFixed(2)} ${c.toFixed(2)}`}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        )}
        <text x={cx} y={cy - 4} textAnchor="middle" className="viz-num viz-num--hero">
          {o.current}
        </text>
        <text x={cx} y={cy + 16} textAnchor="middle" className="viz-label">
          of {o.target}
        </text>
      </svg>
      <figcaption id={`${id}-cap`}>{o.label}</figcaption>
    </figure>
  );
}
