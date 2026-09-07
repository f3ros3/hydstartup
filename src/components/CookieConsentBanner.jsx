import React, { useState } from 'react';
import { Cookie, ShieldCheck, Check, X, SlidersHorizontal, Info } from 'lucide-react';

export default function CookieConsentBanner({ isOpen, onAcceptAll, onRejectNonEssential, onOpenPolicy }) {
  const [showPreferences, setShowPreferences] = useState(false);
  const [allowAds, setAllowAds] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-3 right-3 sm:left-6 sm:right-6 md:left-auto md:right-6 md:max-w-xl z-50 select-none animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="relative overflow-hidden rounded-3xl dark:bg-[#0E1526]/95 bg-white/95 backdrop-blur-2xl border dark:border-slate-700/90 border-slate-300 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-5 sm:p-6 text-xs text-slate-800 dark:text-slate-100 space-y-4">
        
        {/* Header with Icon */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500 dark:text-amber-400 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black dark:text-white text-slate-900 flex items-center gap-1.5">
                We Value Your Privacy &amp; Consent
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              We use strictly necessary browser storage to preserve your theme and bookmarks. We also use third-party Google AdSense cookies for ad performance measurement. You can accept all, reject non-essential cookies, or review our{' '}
              <button
                type="button"
                onClick={onOpenPolicy}
                className="text-emerald-500 dark:text-emerald-400 font-bold underline cursor-pointer hover:opacity-80 inline"
              >
                Cookie Policy
              </button>.
            </p>
          </div>
        </div>

        {/* Custom Preference Drawer (if expanded) */}
        {showPreferences && (
          <div className="p-3.5 rounded-2xl dark:bg-slate-900/90 bg-slate-100/90 border dark:border-slate-800 border-slate-200 space-y-3 animate-in fade-in duration-150">
            
            <div className="flex items-center justify-between text-[11px]">
              <div>
                <p className="font-bold dark:text-white text-slate-900">Essential / Functional Storage</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Theme mode, saved bookmarks, session states</p>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                Always Active
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-2 border-t dark:border-slate-800 border-slate-200">
              <div>
                <p className="font-bold dark:text-white text-slate-900">Advertising &amp; Analytics (AdSense)</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Ad delivery telemetry &amp; measurement</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowAds}
                  onChange={(e) => setAllowAds(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

          </div>
        )}

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
          
          <button
            type="button"
            onClick={() => setShowPreferences(!showPreferences)}
            className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center gap-1 py-1.5 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showPreferences ? 'Hide Preferences' : 'Customize Preferences'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRejectNonEssential}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border dark:border-slate-700 border-slate-300 dark:text-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-center"
            >
              Reject Non-Essential
            </button>

            <button
              type="button"
              onClick={() => {
                if (showPreferences) {
                  allowAds ? onAcceptAll() : onRejectNonEssential();
                } else {
                  onAcceptAll();
                }
              }}
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
            >
              Accept All
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
