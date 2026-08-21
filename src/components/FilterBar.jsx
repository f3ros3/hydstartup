import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Sparkles, 
  MapPin, 
  Briefcase, 
  Building, 
  Clock, 
  Globe, 
  ChevronDown, 
  Check, 
  ArrowUpDown 
} from 'lucide-react';
import { HYDERABAD_HUBS } from '../data/hubs';

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

export const SORT_OPTIONS = [
  { value: "recent_desc", label: "Sort: Most Recent (Newest First)" },
  { value: "recent_asc", label: "Sort: Oldest First" },
  { value: "salary_desc", label: "Sort: Salary (High to Low)" },
  { value: "salary_asc", label: "Sort: Salary (Low to High)" },
  { value: "company_asc", label: "Sort: Company Name (A to Z)" },
  { value: "company_desc", label: "Sort: Company Name (Z to A)" },
  { value: "experience_asc", label: "Sort: Experience (Entry to Senior)" },
  { value: "experience_desc", label: "Sort: Experience (Senior to Entry)" }
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
  selectedHub,
  onSelectHub,
  companyTypeFilter,
  setCompanyTypeFilter,
  sortBy,
  setSortBy,
  onResetFilters,
  hasActiveFilters,
  filteredJobsCount,
  filteredCompaniesCount
}) {
  const [isFiltersDropdownOpen, setIsFiltersDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFiltersDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate active filter count
  let activeFilterCount = 0;
  if (selectedHub && selectedHub !== 'all') activeFilterCount++;
  if (selectedRole && selectedRole !== 'All Roles') activeFilterCount++;
  if (selectedIndustry && selectedIndustry !== 'All Industries') activeFilterCount++;
  if (selectedExp && selectedExp !== 'All Levels') activeFilterCount++;
  if (selectedWorkMode && selectedWorkMode !== 'All Modes') activeFilterCount++;

  return (
    <div className="bg-transparent dark:bg-slate-950/20 bg-white/20 border-b dark:border-slate-800/40 border-slate-200/40 p-2.5 sm:p-3.5 sticky top-[80px] sm:top-[100px] z-30 shadow-sm backdrop-blur-[3px] transition-colors">
      <div className="w-full px-1 sm:px-4 lg:px-6 space-y-2.5">
        
        {/* Main Bar: Search + Entities + Unified Filters Dropdown + Sort */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 sm:gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-slate-300 text-slate-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, tech stack (React, Python, GenAI), or startups..."
              className="w-full pl-10 pr-10 py-2 sm:py-2.5 dark:bg-slate-900/65 bg-white/75 backdrop-blur-md border dark:border-slate-700/70 border-slate-300 hover:border-slate-400 dark:hover:border-slate-500 focus:border-emerald-500 dark:focus:border-emerald-400 rounded-2xl text-xs sm:text-sm dark:text-white text-slate-950 font-semibold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 shadow-sm transition-all"
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

          {/* Action Group: Entity Filter + Unified Filters Dropdown + Sort + Reset */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0 shrink-0">
            
            {/* 1. All Entities vs Startups */}
            <div className="flex items-center gap-0.5 sm:gap-1 dark:bg-slate-900/60 bg-white/60 backdrop-blur-md p-1 rounded-2xl border dark:border-slate-700/60 border-slate-300/80 shrink-0 shadow-sm">
              <button
                onClick={() => setCompanyTypeFilter('all')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  companyTypeFilter === 'all'
                    ? 'dark:bg-slate-800 dark:text-white bg-white text-slate-950 shadow-sm'
                    : 'dark:text-slate-300 dark:hover:text-white text-slate-700 hover:text-slate-950'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCompanyTypeFilter('startup')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all cursor-pointer ${
                  companyTypeFilter === 'startup'
                    ? 'dark:bg-gradient-to-r dark:from-emerald-600 dark:to-teal-600 dark:text-white bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-sm'
                    : 'dark:text-slate-300 dark:hover:text-white text-slate-700 hover:text-slate-950'
                }`}
              >
                <Sparkles className="w-3 h-3 dark:text-emerald-400 text-yellow-300" />
                <span>Startups</span>
              </button>
            </div>

            {/* 2. UNIFIED "FILTERS" DROPDOWN */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setIsFiltersDropdownOpen(!isFiltersDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer backdrop-blur-md shadow-sm ${
                  activeFilterCount > 0
                    ? 'dark:bg-emerald-500/25 dark:border-emerald-500/60 dark:text-emerald-300 bg-orange-500/20 border-orange-500/50 text-orange-800 ring-2 dark:ring-emerald-500/20 ring-orange-500/20'
                    : 'dark:bg-slate-900/70 dark:border-slate-700/70 dark:text-slate-200 bg-white/80 border-slate-300 text-slate-800 hover:border-slate-400'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isFiltersDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Expandable Filters Popover */}
              {isFiltersDropdownOpen && (
                <div className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-[310px] sm:w-[360px] p-4 rounded-3xl dark:bg-[#0E1526]/95 bg-white/95 border dark:border-slate-700/90 border-slate-200 shadow-2xl backdrop-blur-2xl z-50 space-y-3.5 animate-in fade-in zoom-in-95 duration-150">
                  
                  <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-2.5">
                    <div className="flex items-center gap-2 text-xs font-extrabold dark:text-white text-slate-900">
                      <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
                      <span>Ecosystem Filters</span>
                      {activeFilterCount > 0 && (
                        <span className="text-[10px] font-bold dark:text-emerald-400 text-orange-600">
                          ({activeFilterCount} active)
                        </span>
                      )}
                    </div>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={onResetFilters}
                        className="text-[11px] font-bold text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reset
                      </button>
                    )}
                  </div>

                  {/* 1. Hub / Location */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold dark:text-slate-300 text-slate-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Location / Tech Hub</span>
                    </label>
                    <select
                      value={selectedHub || 'all'}
                      onChange={(e) => {
                        const hub = HYDERABAD_HUBS.find(h => h.id === e.target.value);
                        if (hub && onSelectHub) onSelectHub(hub);
                      }}
                      className="w-full text-xs px-3 py-2 rounded-xl dark:bg-slate-900 dark:border-slate-700 border border-slate-300 dark:text-white text-slate-900 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {HYDERABAD_HUBS.map(hub => (
                        <option key={hub.id} value={hub.id} className="dark:bg-[#0B0F19]">
                          📍 {hub.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Role Category */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold dark:text-slate-300 text-slate-700 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Role Category</span>
                    </label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl dark:bg-slate-900 dark:border-slate-700 border border-slate-300 dark:text-white text-slate-900 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {ROLE_CATEGORIES.map(r => (
                        <option key={r} value={r} className="dark:bg-[#0B0F19]">{r}</option>
                      ))}
                    </select>
                  </div>

                  {/* 3. Industry */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold dark:text-slate-300 text-slate-700 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-purple-400" />
                      <span>Industry Domain</span>
                    </label>
                    <select
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl dark:bg-slate-900 dark:border-slate-700 border border-slate-300 dark:text-white text-slate-900 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {INDUSTRIES.map(ind => (
                        <option key={ind} value={ind} className="dark:bg-[#0B0F19]">{ind}</option>
                      ))}
                    </select>
                  </div>

                  {/* 4. Experience Level */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold dark:text-slate-300 text-slate-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-pink-400" />
                      <span>Experience Level</span>
                    </label>
                    <select
                      value={selectedExp}
                      onChange={(e) => setSelectedExp(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl dark:bg-slate-900 dark:border-slate-700 border border-slate-300 dark:text-white text-slate-900 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {EXPERIENCE_LEVELS.map(exp => (
                        <option key={exp} value={exp} className="dark:bg-[#0B0F19]">{exp}</option>
                      ))}
                    </select>
                  </div>

                  {/* 5. Work Mode */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold dark:text-slate-300 text-slate-700 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-amber-400" />
                      <span>Work Mode</span>
                    </label>
                    <select
                      value={selectedWorkMode}
                      onChange={(e) => setSelectedWorkMode(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl dark:bg-slate-900 dark:border-slate-700 border border-slate-300 dark:text-white text-slate-900 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {WORK_MODES.map(wm => (
                        <option key={wm} value={wm} className="dark:bg-[#0B0F19]">{wm}</option>
                      ))}
                    </select>
                  </div>

                  {/* Done / Apply Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => setIsFiltersDropdownOpen(false)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Apply Filters</span>
                    </button>
                  </div>

                </div>
              )}
            </div>

            {/* 3. SORT DROPDOWN (Ascending & Descending Options) */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="dark:bg-slate-900/70 bg-white/80 backdrop-blur-md border dark:border-slate-700/70 border-slate-300/90 rounded-2xl px-3 py-2 text-xs dark:text-slate-100 text-slate-900 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer shrink-0 shadow-sm"
                title="Sort opportunities"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value} className="dark:bg-[#0B0F19] dark:text-slate-200 bg-white text-slate-900 font-medium">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Reset Button */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 px-3 py-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/35 text-rose-500 dark:text-rose-300 rounded-2xl text-xs font-extrabold transition-all shrink-0 cursor-pointer backdrop-blur-md shadow-sm"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

          </div>

        </div>

        {/* Results Counter & Active Filter Pills */}
        <div className="flex items-center justify-between text-xs dark:text-slate-200 text-slate-800 font-mono font-bold pt-0.5 drop-shadow-sm">
          
          {/* Active Filter Summary Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                {selectedHub && selectedHub !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-sans font-bold dark:bg-emerald-500/20 dark:text-emerald-300 bg-orange-100 text-orange-800 border dark:border-emerald-500/30 border-orange-300">
                    📍 {HYDERABAD_HUBS.find(h => h.id === selectedHub)?.name || selectedHub}
                    <X className="w-2.5 h-2.5 cursor-pointer hover:opacity-75" onClick={() => onSelectHub({ id: 'all', center: [17.438, 78.375], zoom: 12 })} />
                  </span>
                )}
                {selectedRole !== 'All Roles' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-sans font-bold dark:bg-cyan-500/20 dark:text-cyan-300 bg-cyan-100 text-cyan-800 border dark:border-cyan-500/30 border-cyan-300">
                    💼 {selectedRole}
                    <X className="w-2.5 h-2.5 cursor-pointer hover:opacity-75" onClick={() => setSelectedRole('All Roles')} />
                  </span>
                )}
                {selectedIndustry !== 'All Industries' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-sans font-bold dark:bg-purple-500/20 dark:text-purple-300 bg-purple-100 text-purple-800 border dark:border-purple-500/30 border-purple-300">
                    🏢 {selectedIndustry}
                    <X className="w-2.5 h-2.5 cursor-pointer hover:opacity-75" onClick={() => setSelectedIndustry('All Industries')} />
                  </span>
                )}
                {selectedExp !== 'All Levels' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-sans font-bold dark:bg-pink-500/20 dark:text-pink-300 bg-pink-100 text-pink-800 border dark:border-pink-500/30 border-pink-300">
                    📈 {selectedExp}
                    <X className="w-2.5 h-2.5 cursor-pointer hover:opacity-75" onClick={() => setSelectedExp('All Levels')} />
                  </span>
                )}
                {selectedWorkMode !== 'All Modes' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-sans font-bold dark:bg-amber-500/20 dark:text-amber-300 bg-amber-100 text-amber-800 border dark:border-amber-500/30 border-amber-300">
                    🌐 {selectedWorkMode}
                    <X className="w-2.5 h-2.5 cursor-pointer hover:opacity-75" onClick={() => setSelectedWorkMode('All Modes')} />
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results Counter */}
          <div className="flex items-center gap-1.5 ml-auto shrink-0">
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
