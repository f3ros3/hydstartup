import React from 'react';
import { HYDERABAD_SECTORS } from '../data/sectors';
import { Layers, Building2, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

export default function SectorsDirectory({ onSelectSectorFilter }) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl border border-emerald-500/20 text-white shadow-xl overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            Industry Clusters & Sectors
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hyderabad Startup Industry Sectors
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Explore Hyderabad's primary technology verticals: from B2B SaaS unicorns in HITEC City to private space launch vehicles and life sciences automation in Genome Valley.
          </p>
        </div>
      </div>

      {/* Sectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {HYDERABAD_SECTORS.map(sector => (
          <div
            key={sector.id}
            className="flex flex-col justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {sector.name}
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full border border-emerald-200 dark:border-emerald-800/60">
                  {sector.keyMetrics.activeCompanies}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {sector.tagline}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {sector.description}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-750">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Scale</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{sector.keyMetrics.unicornsCount}</div>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-750">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Key Hubs</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5 truncate">{sector.keyMetrics.keyHubs}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">Valuation: {sector.keyMetrics.combinedValuation}</span>
              <button
                type="button"
                onClick={() => onSelectSectorFilter(sector.name)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                Browse Companies & Jobs <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
