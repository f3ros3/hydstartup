import React from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Briefcase, 
  Layers, 
  Clock, 
  Building,
  Sparkles,
  DollarSign
} from 'lucide-react';

export const ROLE_CATEGORIES = [
  "All Roles",
  "Engineering",
  "AI / ML",
  "Product",
  "Design",
  "Operations",
  "Sales & Marketing"
];

export const INDUSTRIES = [
  "All Industries",
  "SaaS / Enterprise",
  "AI & DeepTech",
  "SpaceTech & Aerospace",
  "FinTech / SaaS",
  "CleanTech & EV",
  "HealthTech / Bio",
  "Gaming & Media",
  "EdTech",
  "Cloud & Infrastructure",
  "Enterprise / IT Services"
];

export const EXPERIENCE_LEVELS = [
  "All Levels",
  "Fresher / Intern",
  "Junior (1-3 yrs)",
  "Mid-Level (3-6 yrs)",
  "Senior / Lead (6+ yrs)"
];

export const WORK_MODES = [
  "All Modes",
  "Hybrid",
  "On-site",
  "Remote"
];

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedRole,
  setSelectedRole,
  selectedIndustry,
  setSelectedIndustry,
  selectedExp,
  setSelectedExp,
  selectedWorkMode,
  setSelectedWorkMode,
  companyTypeFilter,
  setCompanyTypeFilter,
  sortBy,
  setSortBy,
  onResetFilters,
  hasActiveFilters,
  filteredJobsCount,
  filteredCompaniesCount
}) {
  return (
    <div className="bg-transparent dark:bg-slate-950/20 bg-white/20 border-b dark:border-slate-800/40 border-slate-200/40 p-3 sm:p-4 sticky top-[108px] sm:top-[112px] z-30 shadow-sm backdrop-blur-[3px] transition-colors">
      <div className="w-full px-1 sm:px-4 lg:px-6 space-y-3">
        
        {/* Main Search & Quick Toggles */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-slate-300 text-slate-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, tech stack (React, Python, C++, GenAI), or startup name..."
              className="w-full pl-10 pr-10 py-2.5 dark:bg-slate-900/65 bg-white/75 backdrop-blur-md border dark:border-slate-700/70 border-slate-300 hover:border-slate-400 dark:hover:border-slate-500 focus:border-emerald-500 dark:focus:border-emerald-400 rounded-2xl text-xs sm:text-sm dark:text-white text-slate-950 font-semibold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters Row */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0 shrink-0">
            
            {/* Company Type Filter (Startups vs All) */}
            <div className="flex items-center gap-1 dark:bg-slate-900/60 bg-white/60 backdrop-blur-md p-1 rounded-2xl border dark:border-slate-700/60 border-slate-300/80 shrink-0 shadow-sm">
              <button
                onClick={() => setCompanyTypeFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  companyTypeFilter === 'all'
                    ? 'dark:bg-slate-800 dark:text-white bg-white text-slate-950 shadow-sm'
                    : 'dark:text-slate-300 dark:hover:text-white text-slate-700 hover:text-slate-950'
                }`}
              >
                All Entities
              </button>
              <button
                onClick={() => setCompanyTypeFilter('startup')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  companyTypeFilter === 'startup'
                    ? 'dark:bg-gradient-to-r dark:from-emerald-600 dark:to-teal-600 dark:text-white bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-sm'
                    : 'dark:text-slate-300 dark:hover:text-white text-slate-700 hover:text-slate-950'
                }`}
              >
                <Sparkles className="w-3 h-3 dark:text-emerald-400 text-yellow-300" />
                <span>Startups & Unicorns</span>
              </button>
            </div>

            {/* Sort By Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="dark:bg-slate-900/70 bg-white/80 backdrop-blur-md border dark:border-slate-700/70 border-slate-300/90 rounded-2xl px-3 py-2 text-xs dark:text-slate-100 text-slate-900 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer shrink-0 shadow-sm"
            >
              <option value="recent">⚡ Most Recent</option>
              <option value="salary">💰 Highest Salary</option>
              <option value="company">🏢 Company Name</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 px-3 py-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/35 text-rose-500 dark:text-rose-300 rounded-2xl text-xs font-extrabold transition-all shrink-0 cursor-pointer backdrop-blur-md shadow-sm"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

          </div>

        </div>

        {/* Multi-Dimensional Filter Dropdowns (All Roles, All Industries, All Levels, All Modes) */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Role Filter */}
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className={`text-xs px-3.5 py-1.5 rounded-xl border appearance-none pr-8 cursor-pointer transition-all shadow-sm font-bold backdrop-blur-md ${
                  selectedRole !== 'All Roles'
                    ? 'dark:bg-emerald-500/25 dark:border-emerald-500/60 dark:text-emerald-300 bg-orange-100/90 border-orange-400 text-orange-800'
                    : 'dark:bg-slate-900/70 dark:border-slate-700/70 dark:text-slate-200 bg-white/80 border-slate-300 text-slate-800'
                }`}
              >
                {ROLE_CATEGORIES.map(r => (
                  <option key={r} value={r} className="dark:bg-[#0B0F19] dark:text-slate-200 bg-white text-slate-900">{r}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
            </div>

            {/* Industry Filter */}
            <div className="relative">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className={`text-xs px-3.5 py-1.5 rounded-xl border appearance-none pr-8 cursor-pointer transition-all shadow-sm font-bold backdrop-blur-md ${
                  selectedIndustry !== 'All Industries'
                    ? 'dark:bg-cyan-500/25 dark:border-cyan-500/60 dark:text-cyan-300 bg-purple-100/90 border-purple-400 text-purple-800'
                    : 'dark:bg-slate-900/70 dark:border-slate-700/70 dark:text-slate-200 bg-white/80 border-slate-300 text-slate-800'
                }`}
              >
                {INDUSTRIES.map(ind => (
                  <option key={ind} value={ind} className="dark:bg-[#0B0F19] dark:text-slate-200 bg-white text-slate-900">{ind}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
            </div>

            {/* Experience Filter */}
            <div className="relative">
              <select
                value={selectedExp}
                onChange={(e) => setSelectedExp(e.target.value)}
                className={`text-xs px-3.5 py-1.5 rounded-xl border appearance-none pr-8 cursor-pointer transition-all shadow-sm font-bold backdrop-blur-md ${
                  selectedExp !== 'All Levels'
                    ? 'dark:bg-purple-500/25 dark:border-purple-500/60 dark:text-purple-300 bg-pink-100/90 border-pink-400 text-pink-800'
                    : 'dark:bg-slate-900/70 dark:border-slate-700/70 dark:text-slate-200 bg-white/80 border-slate-300 text-slate-800'
                }`}
              >
                {EXPERIENCE_LEVELS.map(exp => (
                  <option key={exp} value={exp} className="dark:bg-[#0B0F19] dark:text-slate-200 bg-white text-slate-900">{exp}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
            </div>

            {/* Work Mode Filter */}
            <div className="relative">
              <select
                value={selectedWorkMode}
                onChange={(e) => setSelectedWorkMode(e.target.value)}
                className={`text-xs px-3.5 py-1.5 rounded-xl border appearance-none pr-8 cursor-pointer transition-all shadow-sm font-bold backdrop-blur-md ${
                  selectedWorkMode !== 'All Modes'
                    ? 'dark:bg-amber-500/25 dark:border-amber-500/60 dark:text-amber-300 bg-amber-100/90 border-amber-400 text-amber-800'
                    : 'dark:bg-slate-900/70 dark:border-slate-700/70 dark:text-slate-200 bg-white/80 border-slate-300 text-slate-800'
                }`}
              >
                {WORK_MODES.map(wm => (
                  <option key={wm} value={wm} className="dark:bg-[#0B0F19] dark:text-slate-200 bg-white text-slate-900">{wm}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
            </div>
          </div>

          {/* Results Counter */}
          <div className="text-xs dark:text-slate-200 text-slate-800 flex items-center gap-1.5 font-mono font-bold ml-auto sm:ml-0 drop-shadow-sm">
            <span>Showing</span>
            <span className="dark:text-emerald-400 text-orange-600 font-black">{filteredJobsCount}</span>
            <span>jobs across</span>
            <span className="dark:text-cyan-400 text-purple-600 font-black">{filteredCompaniesCount}</span>
            <span>companies</span>
          </div>

        </div>

      </div>
    </div>
  );
}
