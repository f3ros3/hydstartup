import React, { useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';

/*
 * Live motion graphic: flowing glowing light ribbons (blue / purple / orange)
 * inspired by abstract "flowing light waves" backgrounds.
 * - Rendered at reduced internal resolution and upscaled by CSS (cheap on CPU/GPU)
 * - Additive ("lighter") blending gives the glowing silk/light-wave look
 * - Paused automatically when the banner is off-screen or the tab is hidden
 * - Always animates; when the OS requests reduced motion it simply moves slower
 */

// Each ribbon is a bundle of thin glowing strands following a travelling wave.
const RIBBONS = [
  {
    base: 0.62, amp: 0.2, freq: 0.9, speed: 0.55, phase: 0.0, spread: 0.26, strands: 16,
    colors: ['rgba(37, 99, 235, A)', 'rgba(56, 189, 248, A)', 'rgba(147, 51, 234, A)'],
    alpha: 0.2, glow: 0.22
  },
  {
    base: 0.42, amp: 0.24, freq: 0.7, speed: -0.42, phase: 2.1, spread: 0.3, strands: 14,
    colors: ['rgba(168, 85, 247, A)', 'rgba(99, 102, 241, A)', 'rgba(59, 130, 246, A)'],
    alpha: 0.17, glow: 0.18
  },
  {
    base: 0.74, amp: 0.16, freq: 1.15, speed: 0.68, phase: 4.2, spread: 0.18, strands: 12,
    colors: ['rgba(249, 115, 22, A)', 'rgba(236, 72, 153, A)', 'rgba(124, 58, 237, A)'],
    alpha: 0.18, glow: 0.2
  },
  {
    base: 0.3, amp: 0.14, freq: 1.35, speed: 0.36, phase: 5.6, spread: 0.16, strands: 10,
    colors: ['rgba(14, 165, 233, A)', 'rgba(59, 130, 246, A)', 'rgba(251, 146, 60, A)'],
    alpha: 0.14, glow: 0.14
  }
];

const withAlpha = (c, a) => c.replace('A', a.toFixed(3));

export default function NewsletterSection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return undefined;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speedScale = reducedMotion ? 0.45 : 1;

    let W = 0;
    let H = 0;
    const SEGMENTS = 36;

    // Internal resolution ~ 45% of display size, capped (upscaled smoothly by CSS)
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const scale = 0.45;
      W = Math.max(160, Math.min(420, Math.round(rect.width * scale)));
      H = Math.max(100, Math.min(300, Math.round(rect.height * scale)));
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    const ribbonY = (r, x, t, k) => {
      const u = x / W;
      return (
        H *
        (r.base +
          r.amp * Math.sin(u * Math.PI * 2 * r.freq + t * r.speed + r.phase + k * 0.18) +
          r.amp * 0.45 * Math.sin(u * Math.PI * 2 * r.freq * 1.7 - t * r.speed * 0.8 + r.phase * 1.3 + k * 0.1))
      );
    };

    const drawFrame = (now) => {
      const t = (now / 1000) * speedScale;

      // Deep dark base with subtle moving colour glows
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#03030a';
      ctx.fillRect(0, 0, W, H);

      const g1x = W * (0.3 + 0.2 * Math.sin(t * 0.3));
      const g1 = ctx.createRadialGradient(g1x, H * 0.4, 0, g1x, H * 0.4, W * 0.6);
      g1.addColorStop(0, 'rgba(30, 64, 175, 0.45)');
      g1.addColorStop(1, 'rgba(3, 3, 10, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      const g2x = W * (0.75 + 0.15 * Math.cos(t * 0.25));
      const g2 = ctx.createRadialGradient(g2x, H * 0.75, 0, g2x, H * 0.75, W * 0.5);
      g2.addColorStop(0, 'rgba(126, 34, 206, 0.35)');
      g2.addColorStop(1, 'rgba(3, 3, 10, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // Additive glowing ribbons
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      const step = W / SEGMENTS;

      for (const r of RIBBONS) {
        // Colour sweeps along the ribbon over time
        const shift = 0.5 + 0.5 * Math.sin(t * 0.35 + r.phase);
        const makeGrad = (a) => {
          const g = ctx.createLinearGradient(0, 0, W, 0);
          g.addColorStop(0, withAlpha(r.colors[0], a));
          g.addColorStop(0.2 + shift * 0.6, withAlpha(r.colors[1], a));
          g.addColorStop(1, withAlpha(r.colors[2], a));
          return g;
        };

        // Soft wide glow body
        ctx.beginPath();
        for (let i = 0; i <= SEGMENTS; i++) {
          const x = i * step;
          const y = ribbonY(r, x, t, 0) - (H * r.spread) / 2;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        for (let i = SEGMENTS; i >= 0; i--) {
          const x = i * step;
          ctx.lineTo(x, ribbonY(r, x, t, r.strands) + (H * r.spread) / 2);
        }
        ctx.closePath();
        ctx.fillStyle = makeGrad(r.glow);
        ctx.fill();

        // Fine light strands (the silky "light wave" texture)
        const strandGrad = makeGrad(r.alpha);
        ctx.strokeStyle = strandGrad;
        ctx.lineWidth = Math.max(1, W / 260);
        for (let k = 0; k < r.strands; k++) {
          const off = (k / (r.strands - 1) - 0.5) * H * r.spread;
          ctx.beginPath();
          for (let i = 0; i <= SEGMENTS; i++) {
            const x = i * step;
            const y = ribbonY(r, x, t, k) + off;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    let rafId = null;
    let onScreen = true;

    const loop = (now) => {
      drawFrame(now);
      rafId = requestAnimationFrame(loop);
    };
    const start = () => {
      if (rafId == null && onScreen && !document.hidden) rafId = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      rafId = null;
    };

    drawFrame(performance.now());
    start();

    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => {
          onScreen = Boolean(entry && entry.isIntersecting);
          if (onScreen) start();
          else stop();
        },
        { rootMargin: '100px' }
      );
      io.observe(container);
    }

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        resize();
        drawFrame(performance.now());
      });
      ro.observe(container);
    }

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <section className="relative z-10 w-full max-w-3xl mx-auto my-8 sm:my-12 px-3 sm:px-6">
      <div
        ref={containerRef}
        className="cta-liquid-banner rounded-3xl px-6 py-12 sm:px-12 sm:py-16 border border-white/20 shadow-2xl text-center"
      >
        {/* Live flowing light-ribbon motion graphic (soft ~20% blur) */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ filter: 'blur(4px) saturate(1.2)', transform: 'scale(1.06)', zIndex: 0 }}
        />

        {/* Subtle dark vignette for crisp text readability */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-black/5 to-black/30"
          style={{ zIndex: 1 }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight max-w-xl drop-shadow-md">
            Stay Ahead in Hyderabad&apos;s Tech Ecosystem
          </h3>

          {/* Liquid Glass Email Pill + Liquid Glass Email me Button */}
          <div className="flex flex-col items-center gap-3.5 pt-1">
            <a
              href="mailto:techwithshaik2@gmail.com"
              className="cta-liquid-glass-pill inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white no-underline"
              aria-label="Compose email to techwithshaik2@gmail.com"
            >
              <Mail className="w-4 h-4 text-white/90 shrink-0" aria-hidden="true" />
              <span>techwithshaik2@gmail.com</span>
            </a>

            <a
              href="mailto:techwithshaik2@gmail.com"
              className="cta-email-me-btn inline-flex items-center justify-center px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white no-underline cursor-pointer"
            >
              Email me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
