import React, { useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';

/*
 * Live motion graphic: psychedelic holographic "blue ocean waves" liquify gradient.
 * - Per-pixel domain-warped liquid gradient rendered at a tiny internal resolution
 *   (~160px wide) and upscaled smoothly by the browser -> very low CPU/GPU cost
 * - Slow, calm motion; light ~10% softening blur
 * - Paused automatically when the banner is off-screen or the tab is hidden
 * - Always animates; when the OS requests reduced motion it simply moves slower
 */

// Cyclic holographic ocean palette (deep navy -> cobalt -> cyan -> pearl highlight -> violet tint)
const PALETTE_STOPS = [
  [0.0, [2, 8, 38]],
  [0.16, [10, 40, 140]],
  [0.32, [30, 100, 255]],
  [0.46, [60, 190, 255]],
  [0.56, [200, 240, 255]],
  [0.64, [110, 160, 255]],
  [0.76, [80, 70, 220]],
  [0.88, [18, 36, 130]],
  [1.0, [2, 8, 38]]
];

const LUT_SIZE = 512;

function buildLut() {
  const lut = new Uint32Array(LUT_SIZE);
  for (let i = 0; i < LUT_SIZE; i++) {
    const p = i / (LUT_SIZE - 1);
    let s = 0;
    while (s < PALETTE_STOPS.length - 2 && p > PALETTE_STOPS[s + 1][0]) s++;
    const [p0, c0] = PALETTE_STOPS[s];
    const [p1, c1] = PALETTE_STOPS[s + 1];
    let f = (p - p0) / (p1 - p0);
    f = f * f * (3 - 2 * f); // smoothstep for silky transitions
    const r = Math.round(c0[0] + (c1[0] - c0[0]) * f);
    const g = Math.round(c0[1] + (c1[1] - c0[1]) * f);
    const b = Math.round(c0[2] + (c1[2] - c0[2]) * f);
    lut[i] = (255 << 24) | (b << 16) | (g << 8) | r; // little-endian RGBA
  }
  return lut;
}

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
    // Slow, calm liquid motion
    const SPEED = reducedMotion ? 0.12 : 0.22;

    const lut = buildLut();
    const W = 160;
    let H = 100;
    let image = null;
    let pixels = null;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const aspect = rect.width > 0 ? rect.height / rect.width : 0.6;
      H = Math.max(60, Math.min(160, Math.round(W * aspect)));
      canvas.width = W;
      canvas.height = H;
      image = ctx.createImageData(W, H);
      pixels = new Uint32Array(image.data.buffer);
    };
    resize();

    const drawFrame = (now) => {
      const t = (now / 1000) * SPEED;
      const inv = 3.2 / W; // spatial scale
      let idx = 0;
      for (let y = 0; y < H; y++) {
        const py0 = y * inv;
        for (let x = 0; x < W; x++) {
          let px = x * inv;
          let py = py0;
          // Domain warping -> liquify / ocean-wave folds
          px += 0.7 * Math.sin(py * 1.3 + t * 1.1);
          py += 0.7 * Math.cos(px * 1.1 - t * 0.9);
          px += 0.35 * Math.sin(py * 2.3 - t * 0.7 + 1.7);
          py += 0.35 * Math.cos(px * 2.1 + t * 1.3 + 0.6);
          px += 0.18 * Math.sin(py * 3.7 + t * 0.5 + 3.1);
          const v = 0.5 + 0.5 * Math.sin(px * 1.6 + py * 1.2 + t * 0.6);
          const w = (v * 0.85 + 0.08 * Math.sin(py * 2.0 - t) + 0.08) % 1;
          pixels[idx++] = lut[((w < 0 ? w + 1 : w) * (LUT_SIZE - 1)) | 0];
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    let rafId = null;
    let onScreen = true;
    let last = 0;

    // ~40fps is plenty for slow liquid motion and saves battery
    const loop = (now) => {
      rafId = requestAnimationFrame(loop);
      if (now - last < 24) return;
      last = now;
      drawFrame(now);
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
        {/* Live holographic blue-ocean liquify gradient (light ~10% blur) */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ filter: 'blur(2px) saturate(1.15)', transform: 'scale(1.04)', zIndex: 0 }}
        />

        {/* Subtle dark vignette for crisp text readability */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-black/10 to-black/35"
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
