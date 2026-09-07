import React from 'react';
import { X, Cookie, Shield, CheckCircle2, Sliders, Info, ExternalLink } from 'lucide-react';

export default function CookiePolicyModal({ isOpen, onClose, onOpenSettings }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 select-none" role="dialog" aria-modal="true" aria-labelledby="cookie-policy-title">
      
      {/* Dark Translucent Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 dark:bg-black/85 backdrop-blur-[3px] transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div className="relative z-10 max-w-3xl w-full max-h-[90vh] flex flex-col rounded-3xl dark:bg-[#0E1526] bg-white border dark:border-slate-800 border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b dark:border-slate-800 border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h2 id="cookie-policy-title" className="text-lg sm:text-xl font-black dark:text-white text-slate-900">
                Cookie & Storage Policy
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                Transparent Disclosure on Cookies & Browser Storage
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Cookie Policy Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-xs sm:text-[13px] leading-relaxed dark:text-slate-300 text-slate-700">
          
          {/* Section 1 */}
          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-500" />
              1. What Are Cookies and Local Storage?
            </h3>
            <p>
              Cookies are small text files placed on your computer or mobile device when you visit websites. In addition to cookies, modern web applications utilize <strong>HTML5 Local Storage</strong> to preserve user preferences locally on your machine without transmitting them to remote servers.
            </p>
          </section>

          {/* Section 2: Categories */}
          <section className="space-y-3">
            <h3 className="text-sm sm:text-base font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-500" />
              2. Categories of Storage We Use
            </h3>

            {/* Essential Category */}
            <div className="p-4 rounded-2xl dark:bg-slate-900 bg-slate-50 border dark:border-slate-800 border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs dark:text-emerald-400 text-emerald-700">
                  Strictly Necessary / Functional Storage
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-bold">
                  Always Active
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Required for core website operations. Stored only in your local browser:
              </p>
              <ul className="list-disc pl-5 text-[11px] space-y-1">
                <li><code className="font-mono">hyd_portal_theme</code>: Remembers your Dark / Light theme selection.</li>
                <li><code className="font-mono">hyd_bookmarked_job_ids</code>: Saves your favorited jobs locally.</li>
                <li><code className="font-mono">hyd_cookie_consent</code>: Stores your cookie preference choices.</li>
              </ul>
            </div>

            {/* Advertising & Telemetry Category */}
            <div className="p-4 rounded-2xl dark:bg-slate-900 bg-slate-50 border dark:border-slate-800 border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs dark:text-cyan-400 text-cyan-700">
                  Third-Party Advertising & Measurement Cookies (Google AdSense)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-bold">
                  Consent Controlled
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Google AdSense utilizes cookies (<code className="font-mono">__gads</code>, <code className="font-mono">__gpi</code>, <code className="font-mono">IDE</code>) to measure ad performance, prevent fraud, and serve relevant sponsor content.
              </p>
            </div>
          </section>

          {/* Section 3: Managing preferences */}
          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-500" />
              3. How to Manage or Revoke Cookies
            </h3>
            <p>
              You can adjust your cookie preferences at any time using our on-site settings trigger or by modifying your browser settings:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>On-Site Settings:</strong> Click "Cookie Preferences" in the footer at any time to update or revoke non-essential cookie consent.
              </li>
              <li>
                <strong>Browser Controls:</strong> Most web browsers (Chrome, Firefox, Safari, Edge) allow you to refuse or delete cookies via their Settings &gt; Privacy &amp; Security menus.
              </li>
              <li>
                <strong>Google Ad Personalization:</strong> Manage personalized Google advertising via <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-500 underline">Google Ads Settings</a>.
              </li>
            </ul>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t dark:border-slate-800 border-slate-100 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40 shrink-0 gap-3">
          {onOpenSettings && (
            <button
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="px-4 py-2 rounded-xl border dark:border-slate-700 border-slate-300 dark:text-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Update Preferences
            </button>
          )}

          <button
            onClick={onClose}
            className="ml-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
}
