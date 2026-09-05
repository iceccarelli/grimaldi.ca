/**
 * Sparkline — one series, 52 weekly values, no axes. The repository's pulse.
 *
 * Mark spec: 2px line, ~10% area wash, ≥8px end marker with a surface ring.
 * Colour comes from --viz-1 so light and dark are one component. Native SVG
 * <title> supplies the hover value without JavaScript. Server component.
 */
export default function Sparkline({
  values,
  label,
  width = 180,
  height = 40,
  showEnd = true,
  max: sharedMax,
}: {
  values: number[];
  label: string;
  width?: number;
  height?: number;
  showEnd?: boolean;
  /** Shared y-scale for small multiples; defaults to this series' own peak. */
  max?: number;
}) {
  if (values.length < 2) return null;
  const pad = 5;
  const max = Math.max(1, sharedMax ?? 0, ...values);
  const w = width - pad * 2;
  const h = height - pad * 2;
  const x = (i: number) => pad + (i / (values.length - 1)) * w;
  const y = (v: number) => pad + h - (v / max) * h;
  const line = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${line} L${x(values.length - 1).toFixed(1)},${(pad + h).toFixed(1)} L${x(0).toFixed(1)},${(pad + h).toFixed(1)} Z`;
  const last = values[values.length - 1];
  const total = values.reduce((a, b) => a + b, 0);

  return (
    <svg
      className="viz viz-spark"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={`${label}: ${total} commits in the last ${values.length} weeks, ${last} in the latest week, peak ${max}`}
    >
      <title>{`${label} — ${total} commits / ${values.length} weeks · latest ${last} · peak ${max}`}</title>
      <path d={area} className="viz-area" />
      <path d={line} className="viz-line" />
      {showEnd && (
        <>
          <circle cx={x(values.length - 1)} cy={y(last)} r={5.5} className="viz-ring" />
          <circle cx={x(values.length - 1)} cy={y(last)} r={4} className="viz-dot" />
        </>
      )}
    </svg>
  );
}
