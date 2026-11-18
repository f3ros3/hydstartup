import React from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
  return (
    <section className="relative z-10 w-full max-w-3xl mx-auto my-8 sm:my-12 px-3 sm:px-6">
      <div className="cta-liquid-banner rounded-3xl px-6 py-12 sm:px-12 sm:py-16 border border-white/15 shadow-2xl text-center">
        {/* Smooth GPU-animated fluid gradient wave layers under the banner */}
        <div className="cta-liquid-wave-1" aria-hidden="true" />
        <div className="cta-liquid-wave-2" aria-hidden="true" />

        <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight max-w-xl drop-shadow-sm">
            Stay Ahead in Hyderabad&apos;s Tech Ecosystem
          </h3>

          {/* Liquid Glass Email Pill + Email me Button */}
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
