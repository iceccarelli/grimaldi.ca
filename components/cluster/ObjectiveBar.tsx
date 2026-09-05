import type { ObjectiveProgress } from '@/lib/cluster';

/**
 * One 90-day objective as an accessible progress bar. The count comes from
 * the evidence log; 0 of 50 renders as 0 of 50. Server component.
 */
export default function ObjectiveBar({ o }: { o: ObjectiveProgress }) {
  const id = `obj-${o.id}`;
  return (
    <div className="cr-objective">
      <div className="cr-objective-head">
        <span id={id}>{o.label}</span>
        <span className="cr-objective-count">
          <strong>{o.current}</strong> / {o.target}
        </span>
      </div>
      <div
        className="cr-bar"
        role="progressbar"
        aria-labelledby={id}
        aria-valuemin={0}
        aria-valuemax={o.target}
        aria-valuenow={o.current}
        aria-valuetext={`${o.current} of ${o.target}`}
      >
        <span className="cr-bar-fill" style={{ width: `${o.pct}%` }} />
      </div>
    </div>
  );
}
