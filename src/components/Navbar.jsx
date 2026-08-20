import React from 'react';
import { 
  MapPin, 
  Briefcase, 
  Building2, 
  Bookmark, 
  Sparkles, 
  BarChart3, 
  Search, 
  Compass, 
  LayoutGrid, 
  Map as MapIcon 
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ 
  viewMode, 
  setViewMode, 
  totalCompanies, 
  totalJobs, 
  bookmarksCount, 
  onOpenBookmarks, 
  onOpenAnalytics, 
  mobileSplitTab, 
  setMobileSplitTab,
  isDark,
  onToggleTheme
}) {
  return (
    <header className="sticky top-0 z-40 bg-transparent dark:bg-slate-950/20 bg-white/20 backdrop-blur-[3px] border-b dark:border-slate-800/40 border-slate-200/40 transition-all">
      <div className="w-full px-3 sm:px-6 lg:px-10">
        
        {/* ROW 1: Left Stats | CENTER BIG HEADING | Right: Actions */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 items-center min-h-[72px] py-2 gap-2">
          
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3">
            {/* LEFT: Brand Emblem & Live Stats */}
            <div className="flex items-center gap-3">
              <div 
                onClick={() => setViewMode('split')}
                className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 shadow-lg shadow-emerald-500/25 text-white font-black text-lg sm:text-xl cursor-pointer hover:scale-105 transition-transform shrink-0"
              >
                <span className="tracking-tighter">HYD</span>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0B0F19] dark:border-[#0B0F19] border-white rounded-full animate-ping"></span>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0B0F19] dark:border-[#0B0F19] border-white rounded-full"></span>
              </div>

              <div className="hidden xl:flex flex-col text-xs dark:text-slate-200 text-slate-800 font-semibold drop-shadow-sm">
                <span className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 font-bold">
                  <Building2 className="w-3.5 h-3.5" />
                  {totalCompanies} Startups & Tech Giants
                </span>
                <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-bold">
                  <Briefcase className="w-3.5 h-3.5" />
                  {totalJobs} Curated Openings
                </span>
              </div>
            </div>

            {/* Mobile-Only Top Right Actions: Insights & Saved */}
            <div className="flex sm:hidden items-center gap-1.5">
              <button
                onClick={onOpenAnalytics}
                className="p-2 rounded-xl dark:text-slate-200 dark:hover:text-cyan-400 dark:bg-slate-900/40 text-slate-800 bg-white/50 border dark:border-slate-700/60 border-slate-300/80 transition-all flex items-center text-xs font-bold"
                title="Insights"
              >
                <BarChart3 className="w-4 h-4 dark:text-cyan-400 text-purple-600" />
              </button>

              <button
                onClick={onOpenBookmarks}
                className="relative p-2 rounded-xl dark:text-slate-200 dark:hover:text-emerald-400 dark:bg-slate-900/40 text-slate-800 bg-white/50 border dark:border-slate-700/60 border-slate-300/80 transition-all flex items-center text-xs font-bold"
                title="Saved"
              >
                <Bookmark className="w-4 h-4" />
                {bookmarksCount > 0 && (
                  <span className="w-4 h-4 bg-emerald-500 text-slate-950 font-black text-[9px] rounded-full flex items-center justify-center absolute -top-1 -right-1">
                    {bookmarksCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* CENTER: BIG PROMINENT HYDSTARTUPARENA HEADING */}
          <div 
            className="flex flex-col items-center justify-center text-center cursor-pointer select-none py-1 sm:py-0" 
            onClick={() => setViewMode('split')}
          >
            <div className="flex items-center gap-1.5 sm:gap-3">
              <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-[2.65rem] font-black tracking-tight dark:text-white text-slate-950">
                HydStartup<span className="dark:text-emerald-400 text-orange-600">Arena</span>
              </h1>
              <span className="hidden sm:inline-block text-[11px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40 bg-orange-500/20 text-orange-700 border border-orange-500/40 backdrop-blur-md">
                HYD MAP
              </span>
            </div>
            <p className="text-[11px] sm:text-sm lg:text-[15px] dark:text-slate-200 text-slate-800 font-extrabold tracking-wide mt-0.5">
              One Stop for All Tech Job
            </p>
          </div>

          {/* RIGHT (Desktop): Theme Toggle (FIRST) -> Insights -> Saved */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3 justify-self-end">
            <ThemeToggle 
              isDark={isDark} 
              onToggle={onToggleTheme} 
            />

            <button
              onClick={onOpenAnalytics}
              className="p-2 sm:px-3 sm:py-2 rounded-xl dark:text-slate-200 dark:hover:text-cyan-400 dark:bg-slate-900/40 dark:hover:bg-slate-800/80 dark:border-slate-700/60 text-slate-800 hover:text-purple-600 bg-white/50 hover:bg-white/80 border border-slate-300/80 transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer backdrop-blur-md shadow-sm"
              title="Hyderabad Ecosystem Intelligence"
            >
              <BarChart3 className="w-4 h-4 dark:text-cyan-400 text-purple-600" />
              <span className="hidden lg:inline">Insights</span>
            </button>

            <button
              onClick={onOpenBookmarks}
              className="relative p-2 sm:px-3 sm:py-2 rounded-xl dark:text-slate-200 dark:hover:text-emerald-400 dark:bg-slate-900/40 dark:hover:bg-slate-800/80 dark:border-slate-700/60 text-slate-800 hover:text-emerald-600 bg-white/50 hover:bg-white/80 border border-slate-300/80 transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer backdrop-blur-md shadow-sm"
              title="Saved Opportunities"
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden lg:inline">Saved</span>
              {bookmarksCount > 0 && (
                <span className="w-5 h-5 bg-emerald-500 text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* MOBILE ONLY: Theme Toggle placed on its own line below the header */}
        <div className="flex sm:hidden items-center justify-between py-1.5 border-t dark:border-slate-800/40 border-slate-200/40">
          <span className="text-[11px] font-bold dark:text-slate-300 text-slate-700">Theme Mode:</span>
          <ThemeToggle 
            isDark={isDark} 
            onToggle={onToggleTheme} 
          />
        </div>

        {/* ROW 2: View Switchers (Dedicated Second Line) */}
        <div className="py-2.5 border-t dark:border-slate-800/40 border-slate-200/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          
          {/* View Mode Switcher Buttons */}
          <div className="grid grid-cols-4 sm:flex items-center gap-1.5 sm:gap-2 dark:bg-slate-900/50 bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border dark:border-slate-800/60 border-slate-200/70 shadow-sm flex-1 sm:max-w-2xl">
            
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center justify-center gap-2 py-2 px-3 sm:px-5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                viewMode === 'split'
                  ? 'dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-600 dark:text-slate-950 bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md'
                  : 'dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 text-slate-700 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>Split View</span>
            </button>

            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center justify-center gap-2 py-2 px-3 sm:px-5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                viewMode === 'map'
                  ? 'dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-600 dark:text-slate-950 bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md'
                  : 'dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 text-slate-700 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              <MapIcon className="w-4 h-4 shrink-0" />
              <span>Full Map</span>
            </button>

            <button
              onClick={() => setViewMode('jobs')}
              className={`flex items-center justify-center gap-2 py-2 px-3 sm:px-5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                viewMode === 'jobs'
                  ? 'dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-600 dark:text-slate-950 bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md'
                  : 'dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 text-slate-700 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>Jobs Board</span>
            </button>

            <button
              onClick={() => setViewMode('companies')}
              className={`flex items-center justify-center gap-2 py-2 px-3 sm:px-5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                viewMode === 'companies'
                  ? 'dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-600 dark:text-slate-950 bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md'
                  : 'dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 text-slate-700 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span>Directory</span>
            </button>

          </div>

          {/* Mobile Split-View Mode Toggle */}
          {viewMode === 'split' && (
            <div className="flex lg:hidden items-center justify-center gap-1 dark:bg-slate-900/60 bg-white/60 backdrop-blur-md p-1 rounded-xl border dark:border-slate-800/60 border-slate-200 text-xs">
              <button
                onClick={() => setMobileSplitTab('map')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all cursor-pointer ${
                  mobileSplitTab === 'map'
                    ? 'dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30 bg-orange-500/20 text-orange-700 border border-orange-500/30'
                    : 'dark:text-slate-300 text-slate-700'
                }`}
              >
                🗺️ Show Map
              </button>
              <button
                onClick={() => setMobileSplitTab('jobs')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all cursor-pointer ${
                  mobileSplitTab === 'jobs'
                    ? 'dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30 bg-orange-500/20 text-orange-700 border border-orange-500/30'
                    : 'dark:text-slate-300 text-slate-700'
                }`}
              >
                💼 Show Jobs ({totalJobs})
              </button>
            </div>
          )}

          {/* Tagline */}
          <div className="hidden lg:flex items-center gap-2 text-xs dark:text-slate-300 text-slate-700 font-bold drop-shadow-sm">
            <span className="flex items-center gap-1.5 dark:text-emerald-400 text-orange-600 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              T-Hub • HITEC City • Gachibowli • Financial District
            </span>
          </div>

        </div>

      </div>
    </header>
  );
}
