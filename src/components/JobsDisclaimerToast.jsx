import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function JobsDisclaimerToast({ isOpen, onClose, duration = 6000 }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) {
      setProgress(100);
      return;
    }

    const startTime = Date.now();
    const interval = 40; // update progress every 40ms

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 select-none">
      
      {/* Darkened Translucent Backdrop - everything around is dark yet softly visible */}
      <div 
        className="fixed inset-0 bg-black/65 dark:bg-black/80 backdrop-blur-[3px] transition-opacity animate-in fade-in duration-300 cursor-pointer"
        onClick={onClose}
      />

      {/* Centered Modal Card */}
      <div className="relative z-10 max-w-lg w-full overflow-hidden rounded-3xl dark:bg-[#0E1526] bg-white border dark:border-amber-500/50 border-amber-400/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] p-6 sm:p-7 text-xs text-slate-800 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Dismiss"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Content Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 pt-1">
          
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-500 dark:text-amber-400 shadow-inner">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                Advisory Notice
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Auto-closes in {Math.ceil((progress / 100) * 6)}s</span>
            </div>

            <h3 className="text-base sm:text-lg font-black dark:text-white text-slate-900 leading-snug">
              Job Listings Disclaimer
            </h3>

            <p className="text-xs sm:text-[13px] font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              The list might not be accurate. For exact job role please refer to respective company career website.
            </p>
          </div>

        </div>

        {/* Bottom CTA Button */}
        <div className="mt-6 flex items-center justify-center sm:justify-end gap-3 pt-4 border-t dark:border-slate-800/80 border-slate-200">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
            <span>I Understand</span>
          </button>
        </div>

        {/* Real-time Dynamic 6-Second Countdown Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-cyan-400 transition-all ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>
    </div>
  );
}

