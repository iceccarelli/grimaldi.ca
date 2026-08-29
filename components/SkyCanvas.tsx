'use client';

import { useEffect, useRef } from 'react';

/**
 * The signature of the personal surface: a slow, warm generative sky.
 * A sun disc drifts with the visitor's local time of day, soft cloud bands
 * breathe across the gradient — quiet motion, no data, no dashboards.
 * The engineering lives elsewhere; this page is the person.
 */
export default function SkyCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();
    window.addEventListener('resize', resize);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = (now: number) => {
      const w = canvas.width;
      const h = canvas.height;
      const tm = reduced ? 0 : now / 1000;

      // Sun height follows local time: high at noon, low at the edges of day.
      const hours = new Date().getHours() + new Date().getMinutes() / 60;
      const daylight = Math.max(0, Math.sin(((hours - 6) / 12) * Math.PI)); // 0 night … 1 noon
      const sunY = h * (0.72 - 0.42 * daylight);
      const sunX = w * (0.18 + 0.64 * Math.min(1, Math.max(0, (hours - 6) / 12)));

      // Sky gradient, warmer near the horizon.
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, `rgba(246, 227, 197, 1)`);
      sky.addColorStop(0.55, `rgba(240, 191, 174, 1)`);
      sky.addColorStop(1, `rgba(200, 107, 143, 1)`);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // Sun with soft bloom.
      const bloom = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, h * 0.5);
      bloom.addColorStop(0, 'rgba(255, 243, 214, 0.95)');
      bloom.addColorStop(0.18, 'rgba(255, 214, 156, 0.55)');
      bloom.addColorStop(1, 'rgba(255, 214, 156, 0)');
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h);
      ctx.beginPath();
      ctx.arc(sunX, sunY, h * 0.055, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 248, 231, 0.98)';
      ctx.fill();

      // Breathing cloud bands.
      for (let i = 0; i < 4; i++) {
        const y = h * (0.3 + i * 0.16) + Math.sin(tm * 0.12 + i * 1.7) * h * 0.012;
        const drift = ((tm * (6 + i * 2.5)) % (w * 1.4)) - w * 0.2;
        const grad = ctx.createLinearGradient(0, y - 30, 0, y + 30);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.5, `rgba(255, 250, 243, ${0.16 - i * 0.025})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(drift, y, w * 0.32, h * 0.045, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="sky" aria-hidden="true" />;
}
