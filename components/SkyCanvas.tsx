'use client';

import { useEffect, useRef } from 'react';

/**
 * The signature of the personal surface: a slow, warm generative sky.
 *
 * PERFORMANCE CONTRACT (measured, not assumed). The first version ran an
 * unthrottled requestAnimationFrame loop at 2x device resolution, rebuilding
 * four gradients per frame, forever — 3.9 s of main-thread work and 300 ms TBT
 * on a desktop Lighthouse run, and a battery drain on phones. A decorative sky
 * is not allowed to cost that. So:
 *
 *   - the loop runs at ~12 fps, not 60. It is a drifting sky; nobody can tell.
 *   - it stops entirely when the hero scrolls out of view (IntersectionObserver)
 *   - it stops entirely when the tab is hidden (visibilitychange)
 *   - the sky gradient is rebuilt only on resize, not per frame
 *   - device pixel ratio is capped at 1.5
 *   - prefers-reduced-motion draws one frame and never loops
 */
const TARGET_FPS = 12;
const FRAME_MS = 1000 / TARGET_FPS;
const MAX_DPR = 1.5;

export default function SkyCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let running = false;
    let visible = true;
    let onScreen = true;
    let last = 0;
    let sky: CanvasGradient | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.max(1, Math.floor(canvas.offsetWidth * dpr));
      canvas.height = Math.max(1, Math.floor(canvas.offsetHeight * dpr));
      // Cache the sky: it depends only on height, so rebuilding it per frame
      // was pure waste.
      sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
      sky.addColorStop(0, 'rgba(246, 227, 197, 1)');
      sky.addColorStop(0.55, 'rgba(240, 191, 174, 1)');
      sky.addColorStop(1, 'rgba(200, 107, 143, 1)');
      paint(performance.now());
    };

    function paint(now: number) {
      const w = canvas!.width;
      const h = canvas!.height;
      const tm = reduced ? 0 : now / 1000;

      const hours = new Date().getHours() + new Date().getMinutes() / 60;
      const daylight = Math.max(0, Math.sin(((hours - 6) / 12) * Math.PI));
      const sunY = h * (0.72 - 0.42 * daylight);
      const sunX = w * (0.18 + 0.64 * Math.min(1, Math.max(0, (hours - 6) / 12)));

      ctx!.fillStyle = sky ?? 'rgba(240, 191, 174, 1)';
      ctx!.fillRect(0, 0, w, h);

      const bloom = ctx!.createRadialGradient(sunX, sunY, 0, sunX, sunY, h * 0.5);
      bloom.addColorStop(0, 'rgba(255, 243, 214, 0.95)');
      bloom.addColorStop(0.18, 'rgba(255, 214, 156, 0.55)');
      bloom.addColorStop(1, 'rgba(255, 214, 156, 0)');
      ctx!.fillStyle = bloom;
      ctx!.fillRect(0, 0, w, h);
      ctx!.beginPath();
      ctx!.arc(sunX, sunY, h * 0.055, 0, Math.PI * 2);
      ctx!.fillStyle = 'rgba(255, 248, 231, 0.98)';
      ctx!.fill();

      for (let i = 0; i < 4; i++) {
        const y = h * (0.3 + i * 0.16) + Math.sin(tm * 0.12 + i * 1.7) * h * 0.012;
        const drift = ((tm * (6 + i * 2.5)) % (w * 1.4)) - w * 0.2;
        const grad = ctx!.createLinearGradient(0, y - 30, 0, y + 30);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.5, `rgba(255, 250, 243, ${0.16 - i * 0.025})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.ellipse(drift, y, w * 0.32, h * 0.045, 0, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const loop = (now: number) => {
      if (!running) return;
      if (now - last >= FRAME_MS) {
        last = now;
        paint(now);
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced || !visible || !onScreen) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    window.addEventListener('resize', resize);

    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
      visible ? start() : stop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    // Off-screen heroes do not need to animate.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        onScreen ? start() : stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="sky" aria-hidden="true" />;
}
