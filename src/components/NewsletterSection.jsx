import React, { useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Low internal resolution scaled up smoothly via CSS for zero CPU/GPU overhead
    const W = 160;
    const H = 96;
    canvas.width = W;
    canvas.height = H;

    let rafId = null;
    let isVisible = true;
    let startTime = performance.now();

    const drawFrame = (now) => {
      const t = (now - startTime) * 0.0011;

      // Deep obsidian base
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, W, H);

      // Draw 5 smooth flowing silk/ribbon waves with radial gradients
      const ribbons = [
        {
          cx: W * (0.28 + 0.22 * Math.sin(t * 0.85)),
          cy: H * (0.35 + 0.24 * Math.cos(t * 0.7)),
          r: W * 0.62,
          stops: [
            [0, 'rgba(56, 189, 248, 0.95)'],
            [0.42, 'rgba(37, 99, 235, 0.75)'],
            [1, 'rgba(2, 6, 23, 0)']
          ]
        },
        {
          cx: W * (0.76 + 0.2 * Math.cos(t * 0.75 + 1.2)),
          cy: H * (0.32 + 0.26 * Math.sin(t * 0.9 + 0.6)),
          r: W * 0.68,
          stops: [
            [0, 'rgba(29, 78, 216, 0.95)'],
            [0.45, 'rgba(59, 130, 246, 0.65)'],
            [1, 'rgba(2, 6, 23, 0)']
          ]
        },
        {
          cx: W * (0.55 + 0.26 * Math.sin(t * 0.65 + 2.4)),
          cy: H * (0.78 + 0.2 * Math.cos(t * 0.8 + 1.8)),
          r: W * 0.58,
          stops: [
            [0, 'rgba(96, 165, 250, 0.9)'],
            [0.4, 'rgba(14, 165, 233, 0.55)'],
            [1, 'rgba(2, 6, 23, 0)']
          ]
        },
        {
          // Dark obsidian fold carving silk ridges (creates the reference's dramatic folds)
          cx: W * (0.45 + 0.22 * Math.cos(t * 0.95 + 0.5)),
          cy: H * (0.52 + 0.22 * Math.sin(t * 0.8 + 2.1)),
          r: W * 0.42,
          stops: [
            [0, 'rgba(2, 4, 12, 0.96)'],
            [0.65, 'rgba(3, 7, 18, 0.65)'],
            [1, 'rgba(2, 6, 23, 0)']
          ]
        },
        {
          cx: W * (0.18 + 0.18 * Math.sin(t * 1.05 + 3.1)),
          cy: H * (0.82 + 0.18 * Math.cos(t * 0.9 + 0.9)),
          r: W * 0.52,
          stops: [
            [0, 'rgba(14, 165, 233, 0.85)'],
            [0.5, 'rgba(30, 64, 175, 0.45)'],
            [1, 'rgba(2, 6, 23, 0)']
          ]
        }
      ];

      for (const b of ribbons) {
        const grad = ctx.createRadialGradient(b.cx, b.cy, 0, b.cx, b.cy, b.r);
        for (const [offset, color] of b.stops) {
          grad.addColorStop(offset, color);
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      // Flowing sweeping highlight wave curve across the canvas
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.beginPath();
      const waveY = H * (0.48 + 0.18 * Math.sin(t * 0.9));
      ctx.moveTo(-10, H);
      ctx.bezierCurveTo(
        W * 0.25,
        waveY + Math.sin(t * 1.4) * 28,
        W * 0.72,
        waveY - Math.cos(t * 1.2) * 30,
        W + 10,
        H * (0.35 + 0.2 * Math.cos(t * 0.8))
      );
      ctx.lineTo(W + 10, H);
      ctx.closePath();
      const waveGrad = ctx.createLinearGradient(0, 0, W, H);
      waveGrad.addColorStop(0, 'rgba(56, 189, 248, 0.28)');
      waveGrad.addColorStop(0.5, 'rgba(37, 99, 235, 0.36)');
      waveGrad.addColorStop(1, 'rgba(14, 165, 233, 0.22)');
      ctx.fillStyle = waveGrad;
      ctx.fill();
      ctx.restore();
    };

    const loop = (now) => {
      if (!isVisible) return;
      drawFrame(now);
      rafId = requestAnimationFrame(loop);
    };

    drawFrame(startTime);

    if (prefersReducedMotion) return;

    let observer;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          isVisible = Boolean(entry?.isIntersecting);
          if (isVisible && !rafId) {
            rafId = requestAnimationFrame(loop);
          } else if (!isVisible && rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    } else {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section className="relative z-10 w-full max-w-3xl mx-auto my-8 sm:my-12 px-3 sm:px-6">
      <div
        ref={containerRef}
        className="cta-liquid-banner rounded-3xl px-6 py-12 sm:px-12 sm:py-16 border border-white/20 shadow-2xl text-center"
      >
        {/* Live 60fps low-CPU fluid silk motion graphic canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-110"
          style={{ filter: 'blur(16px) contrast(1.15) saturate(1.2)' }}
        />

        {/* Subtle dark vignette for crisp text readability */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/15 via-transparent to-black/25"
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
