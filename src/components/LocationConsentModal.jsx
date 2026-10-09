import React from 'react';
import { MapPin, ShieldCheck, X } from 'lucide-react';

export default function LocationConsentModal({ isOpen, onAllow, onDeny }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-consent-title"
    >
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <MapPin className="w-6 h-6" />
          </div>
          <button
            onClick={onDeny}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Decline location access"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 id="location-consent-title" className="text-lg font-bold text-slate-900 dark:text-white">
            Find Startups & Jobs Near You
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            HydStartup Portal can use your device's approximate location to center the map on your closest tech cluster (e.g. HITEC City, Gachibowli, or Financial District) and sort nearby career opportunities.
          </p>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
            <strong>Privacy Guarantee:</strong> Your location coordinates are processed strictly inside your local browser and are never sent, stored, or shared with external analytics or ad trackers.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onDeny}
            className="px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Not Now
          </button>
          <button
            type="button"
            onClick={onAllow}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-emerald-500/20"
          >
            Allow Location Access
          </button>
        </div>
      </div>
    </div>
  );
}
