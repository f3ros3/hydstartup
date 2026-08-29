import React, { useEffect, useState } from 'react';
import { Info, X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function JobsDisclaimerToast({ isOpen, onClose, duration = 4000 }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) {
      setProgress(100);
      return;
    }

    const startTime = Date.now();
    const interval = 50; // update progress every 50ms

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingPercent = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remainingPercent);

      if (elapsed >= duration) {
        clearInterval(timer);
        onClose();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-auto select-none animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="relative overflow-hidden rounded-2xl dark:bg-[#0E1526]/95 bg-white/95 backdrop-blur-xl border dark:border-amber-500/40 border-amber-400/50 shadow-2xl p-4 sm:p-4.5 text-xs text-slate-800 dark:text-slate-100">
        
        {/* Top Header */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-500 dark:text-amber-400 mt-0.5">
            <AlertCircle className="w-4.5 h-4.5" />
          </div>

          <div className="flex-1 pr-2">
            <h4 className="text-xs sm:text-sm font-black dark:text-amber-300 text-amber-700 flex items-center gap-1.5 mb-1">
              Job Listings Disclaimer
            </h4>
            <p className="text-[11px] sm:text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
              The list might not be accurate. For exact job role please refer to respective company career website.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Button */}
        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 cursor-pointer flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>I Understand</span>
          </button>
        </div>

        {/* Dynamic Countdown Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>
    </div>
  );
}
