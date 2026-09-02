'use client';

import { useEffect, useRef } from 'react';

/**
 * The one moving thing on this domain.
 *
 * A 16.7 Hz reference trace, a model trace that lags and mis-scales it a
 * little, and the residual (model − reference) drawn underneath. It is
 * illustrative and says so on the figure: no measured data, nothing from any
 * operator. It exists to make the word “residual” visible on the page that
 * is built around it.
 *
 * Cost discipline: 12 fps, stops off-screen and on a hidden tab, and renders
 * a single static frame under prefers-reduced-motion. Pure SVG path updates —
 * no canvas, no WebGL.
 */

const W = 720;
const H = 200;
const N = 180;                 // samples across the width
const CYCLES = 3;              // 16.7 Hz cycles shown across the width (≈180 ms of signal)
const REF_Y = 66;              // baseline of the waveform band
const REF_A = 40;              // amplitude, px
const RES_Y = 160;             // baseline of the residual band
const RES_GAIN = 6;            // residual is small; scale for legibility

function traces(phase: number) {
  let ref = '';
  let mdl = '';
  let res = '';
  for (let i = 0; i < N; i++) {
    const x = (i / (N - 1)) * W;
    const t = (i / (N - 1)) * CYCLES * 2 * Math.PI + phase;
    const r = Math.sin(t);
    // model: slight lag, slight gain error, a slow drift that comes and goes
    const m = 0.97 * Math.sin(t - 0.12) + 0.03 * Math.sin(phase * 0.37);
    const e = m - r;
    const yr = REF_Y - r * REF_A;
    const ym = REF_Y - m * REF_A;
    const ye = RES_Y - e * REF_A * RES_GAIN;
    ref += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + yr.toFixed(1);
    mdl += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + ym.toFixed(1);
    res += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + ye.toFixed(1);
  }
  return { ref, mdl, res };
}

export default function ResidualPlot() {
  const refPath = useRef<SVGPathElement>(null);
  const mdlPath = useRef<SVGPathElement>(null);
  const resPath = useRef<SVGPathElement>(null);
  const host = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let phase = 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    const paint = () => {
      const t = traces(phase);
      refPath.current?.setAttribute('d', t.ref);
      mdlPath.current?.setAttribute('d', t.mdl);
      resPath.current?.setAttribute('d', t.res);
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      if (now - last < 1000 / 12) return;
      last = now;
      phase += 0.09;
      paint();
    };

    paint();
    if (reduced) return;

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    if (host.current) io.observe(host.current);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const first = traces(0);

  return (
    <figure className="residual">
      <svg ref={host} viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" role="img"
        aria-label="Illustrative 16.7 hertz reference waveform with a model trace, and the residual between them drawn underneath.">
        <line x1="0" y1={REF_Y} x2={W} y2={REF_Y} className="res-axis" />
        <line x1="0" y1={RES_Y} x2={W} y2={RES_Y} className="res-axis" />
        <path ref={refPath} d={first.ref} className="res-ref" />
        <path ref={mdlPath} d={first.mdl} className="res-mdl" />
        <path ref={resPath} d={first.res} className="res-res" />
        <text x="8" y={REF_Y - REF_A - 8} className="res-label">16.7 Hz — reference · model</text>
        <text x="8" y={RES_Y - 30} className="res-label">residual = model − reference (×{RES_GAIN})</text>
      </svg>
      <figcaption>
        Illustrative. Synthetic traces — no measured data, nothing from any operator. The number this site is about is the bottom line.
      </figcaption>
    </figure>
  );
}
