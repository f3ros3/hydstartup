import React from 'react';
import { 
  Briefcase, 
  Building2, 
  Bookmark, 
  BarChart3, 
  Compass, 
  Map as MapIcon,
  PlusCircle
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import CharminarLogo from './CharminarLogo';

export default function Navbar({ 
  viewMode, 
  setViewMode, 
  totalCompanies, 
  totalJobs, 
  bookmarksCount, 
  onOpenBookmarks, 
  onOpenAnalytics, 
  onOpenSubmit,
  isDark,
  onToggleTheme
}) {
  return (
    <header className="sticky top-0 z-40 dark:bg-[#0B0F19]/95 bg-white/95 border-b dark:border-slate-800/70 border-slate-200/80 shadow-sm" role="banner">
      <div className="w-full px-2.5 sm:px-6 lg:px-10">
        
        {/* ROW 1: Left Brand & Stats | CENTER HEADING | Right: Actions */}
        <div className="flex items-center justify-between min-h-0 sm:min-h-[68px] py-1.5 sm:py-2 gap-2">
          
          {/* LEFT: Brand Emblem & Live Stats */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              type="button"
              onClick={() => setViewMode('split')}
              aria-label="HydStartupArena Home - Reset to Split View"
              className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 shadow-md shadow-emerald-500/25 text-white cursor-pointer hover:scale-105 focus-visible:ring-2 focus-visible:ring-emerald-400 transition-transform shrink-0 p-1.5"
              title="HydStartupArena - Hyderabad Tech Ecosystem"
            >
              <CharminarLogo className="w-full h-full text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-emerald-400 border-2 border-[#0B0F19] dark:border-[#0B0F19] border-white rounded-full" aria-hidden="true"></span>
            </button>

            <div className="hidden xl:flex flex-col text-xs dark:text-slate-200 text-slate-800 font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 font-bold">
                <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                {totalCompanies}+ Startups & Tech Giants
              </span>
              <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-bold">
                <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
                {totalJobs}+ Verified Open Roles
              </span>
            </div>
          </div>

          {/* CENTER: BIG PROMINENT HYDSTARTUPARENA HEADING */}
          <button 
            type="button"
            className="flex flex-col items-center justify-center text-center cursor-pointer select-none flex-1 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-xl" 
            onClick={() => setViewMode('split')}
            aria-label="HydStartupArena - One Stop for All Tech Jobs"
          >
            <div className="flex items-center justify-center">
              <span className="text-xl sm:text-3xl lg:text-4xl xl:text-[2.65rem] font-black tracking-tight dark:text-white text-slate-950 whitespace-nowrap">
                HydStartup<span className="dark:text-emerald-400 text-orange-600">Arena</span>
              </span>
            </div>
            <p className="text-[10px] sm:text-sm lg:text-[15px] dark:text-slate-200 text-slate-800 font-extrabold tracking-wide -mt-0.5 sm:mt-0.5 whitespace-nowrap">
              One Stop for All Tech Job
            </p>
          </button>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Submit Startup / Job Button */}
            <button
              onClick={onOpenSubmit}
              aria-label="Submit a Startup or Job"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition-transform cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>

            {/* Desktop Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle 
                isDark={isDark} 
                onToggle={onToggleTheme} 
              />
            </div>

            <button
              onClick={onOpenAnalytics}
              aria-label="View Hyderabad Ecosystem Intelligence and Analytics"
              className="p-1.5 sm:px-2.5 sm:py-2 rounded-xl dark:text-slate-200 dark:hover:text-cyan-400 dark:bg-slate-900/70 dark:hover:bg-slate-800 dark:border-slate-700/60 text-slate-800 hover:text-purple-600 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-cyan-400"
              title="Hyderabad Ecosystem Intelligence"
            >
              <BarChart3 className="w-4 h-4 dark:text-cyan-400 text-purple-600" aria-hidden="true" />
              <span className="hidden lg:inline">Insights</span>
            </button>

            <button
              onClick={onOpenBookmarks}
              aria-label={`Saved Opportunities (${bookmarksCount} saved)`}
              className="relative p-1.5 sm:px-2.5 sm:py-2 rounded-xl dark:text-slate-200 dark:hover:text-emerald-400 dark:bg-slate-900/70 dark:hover:bg-slate-800 dark:border-slate-700/60 text-slate-800 hover:text-emerald-600 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-400"
              title="Saved Opportunities"
            >
              <Bookmark className="w-4 h-4" aria-hidden="true" />
              <span className="hidden lg:inline">Saved</span>
              {bookmarksCount > 0 && (
                <span className="w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 text-slate-950 font-black text-[9px] sm:text-[10px] rounded-full flex items-center justify-center absolute -top-1 -right-1 sm:static sm:ml-1">
                  {bookmarksCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* MOBILE ONLY: Quick Action & Theme Row */}
        <div className="flex sm:hidden items-center justify-between py-1 border-t dark:border-slate-800/40 border-slate-200/40">
          <button
            onClick={onOpenSubmit}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold"
          >
            <PlusCircle className="w-3 h-3" />
            + Submit Startup
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold dark:text-slate-300 text-slate-700">Theme:</span>
            <ThemeToggle 
              isDark={isDark} 
              onToggle={onToggleTheme} 
            />
          </div>
        </div>

        {/* ROW 2: View Switchers */}
        <div className="py-1.5 sm:py-2 border-t dark:border-slate-800/40 border-slate-200/40 flex items-center justify-between gap-2">
          
          {/* View Mode Switcher Buttons */}
          <div className="grid grid-cols-4 sm:inline-flex items-center gap-1 sm:gap-1.5 dark:bg-slate-900/70 bg-slate-100/90 p-1 sm:p-1.5 rounded-2xl border dark:border-slate-800/70 border-slate-200 shadow-sm w-full sm:w-auto">
            
            <button
              onClick={() => setViewMode('split')}
              aria-label="Switch to Split Map and Startups View"
              aria-pressed={viewMode === 'split'}
              className={`flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2 sm:px-4 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                viewMode === 'split'
                  ? 'dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-600 dark:text-slate-950 bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md'
                  : 'dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 text-slate-700 hover:text-slate-950 hover:bg-white/70'
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Split View</span>
            </button>

            <button
              onClick={() => setViewMode('map')}
              aria-label="Switch to Full Map View"
              aria-pressed={viewMode === 'map'}
              className={`flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2 sm:px-4 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                viewMode === 'map'
                  ? 'dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-600 dark:text-slate-950 bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md'
                  : 'dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 text-slate-700 hover:text-slate-950 hover:bg-white/70'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Full Map</span>
            </button>

            <button
              onClick={() => setViewMode('jobs')}
              aria-label="Switch to Jobs Board View"
              aria-pressed={viewMode === 'jobs'}
              className={`flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2 sm:px-4 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                viewMode === 'jobs'
                  ? 'dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-600 dark:text-slate-950 bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md'
                  : 'dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 text-slate-700 hover:text-slate-950 hover:bg-white/70'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Jobs Board</span>
            </button>

            <button
              onClick={() => setViewMode('companies')}
              aria-label="Switch to Directory View"
              aria-pressed={viewMode === 'companies'}
              className={`flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2 sm:px-4 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                viewMode === 'companies'
                  ? 'dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-600 dark:text-slate-950 bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md'
                  : 'dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 text-slate-700 hover:text-slate-950 hover:bg-white/70'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Directory</span>
            </button>

          </div>

        </div>

      </div>
    </header>
  );
}
