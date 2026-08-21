import React, { useState, useMemo, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HubPills from './components/HubPills';
import FilterBar from './components/FilterBar';
import MapView from './components/MapView';
import JobCard from './components/JobCard';
import CompanyCard from './components/CompanyCard';
import JobDetailsModal from './components/JobDetailsModal';
import CompanyDetailsModal from './components/CompanyDetailsModal';
import PostJobModal from './components/PostJobModal';
import BookmarksDrawer from './components/BookmarksDrawer';
import AnalyticsModal from './components/AnalyticsModal';
import NewsletterSection from './components/NewsletterSection';
import FloatingTechBackground from './components/FloatingTechBackground';
import { InstagramIcon } from './components/Icons';

import { HYDERABAD_COMPANIES } from './data/companies';
import { HYDERABAD_JOBS } from './data/jobs';
import { HYDERABAD_HUBS } from './data/hubs';

import { 
  Building2, 
  Briefcase, 
  MapPin, 
  SlidersHorizontal, 
  Sparkles, 
  Layers, 
  ArrowUpDown, 
  Search, 
  Heart,
  PlusCircle,
  GripVertical,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function App() {
  // Navigation & View Mode: 'split' | 'map' | 'jobs' | 'companies'
  const [viewMode, setViewMode] = useState('split');
  const [mobileSplitTab, setMobileSplitTab] = useState('map'); // 'map' is default on mobile!
  const [isMobileExpandedJobs, setIsMobileExpandedJobs] = useState(false);

  // Adjustable Split Pane Ratio (Map Width %)
  const [splitRatio, setSplitRatio] = useState(58); // Default 58% Map, 42% Jobs
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);
  const splitContainerRef = useRef(null);

  // Handle Dragging Splitter
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDraggingSplit || !splitContainerRef.current) return;
      const rect = splitContainerRef.current.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
      if (!clientX) return;

      const offsetX = clientX - rect.left;
      const percentage = (offsetX / rect.width) * 100;
      // Clamp between 25% and 75%
      const clamped = Math.max(25, Math.min(75, percentage));
      setSplitRatio(clamped);
      window.dispatchEvent(new Event('resize'));
    };

    const handlePointerUp = () => {
      if (isDraggingSplit) {
        setIsDraggingSplit(false);
        window.dispatchEvent(new Event('resize'));
      }
    };

    if (isDraggingSplit) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDraggingSplit]);

  // Theme State: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('hyd_portal_theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const isDark = theme === 'dark';

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    try {
      localStorage.setItem('hyd_portal_theme', theme);
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Active filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedExp, setSelectedExp] = useState('All Levels');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All Modes');
  const [companyTypeFilter, setCompanyTypeFilter] = useState('all'); // 'all' | 'startup'
  const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'salary' | 'company'

  // Active Hub
  const [selectedHub, setSelectedHub] = useState('all');
  const [activeHubCenter, setActiveHubCenter] = useState([17.438, 78.375]);
  const [activeHubZoom, setActiveHubZoom] = useState(12);

  // Selected entities for interaction
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  // Modals state
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isBookmarksDrawerOpen, setIsBookmarksDrawerOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);

  // LocalStorage for bookmarks and user-submitted jobs
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('hyd_bookmarked_jobs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customJobs, setCustomJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('hyd_custom_jobs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hyd_bookmarked_jobs', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('hyd_custom_jobs', JSON.stringify(customJobs));
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
  }, [customJobs]);

  // Combined jobs list
  const allJobs = useMemo(() => {
    return [...customJobs, ...HYDERABAD_JOBS];
  }, [customJobs]);

  // Company Lookup Map
  const companyMap = useMemo(() => {
    const map = {};
    HYDERABAD_COMPANIES.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, []);

  // Hub company count lookup
  const companyCountsByHub = useMemo(() => {
    const counts = {};
    HYDERABAD_COMPANIES.forEach((c) => {
      counts[c.hubId] = (counts[c.hubId] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter Jobs
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const company = companyMap[job.companyId] || { name: job.companyName };

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.companyName.toLowerCase().includes(q);
        const matchesSkills = job.skills?.some(s => s.toLowerCase().includes(q));
        const matchesIndustry = job.industry.toLowerCase().includes(q);
        const matchesArea = (job.area || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesIndustry && !matchesArea) {
          return false;
        }
      }

      // Role Filter
      if (selectedRole !== 'All Roles' && job.roleCategory !== selectedRole) {
        return false;
      }

      // Industry Filter
      if (selectedIndustry !== 'All Industries' && job.industry !== selectedIndustry) {
        return false;
      }

      // Experience Level Filter
      if (selectedExp !== 'All Levels') {
        if (!job.experienceLevel?.includes(selectedExp.split(' ')[0]) && !job.experience?.includes(selectedExp.split(' ')[0])) {
          return false;
        }
      }

      // Work Mode Filter
      if (selectedWorkMode !== 'All Modes' && job.workMode !== selectedWorkMode) {
        return false;
      }

      // Hub Filter
      if (selectedHub !== 'all' && job.hubId !== selectedHub && company.hubId !== selectedHub) {
        return false;
      }

      // Company Type Filter
      if (companyTypeFilter === 'startup' && !company.isStartup) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const getSalaryMax = (str) => {
        const matches = (str || '').match(/(\d+)/g);
        if (!matches) return 0;
        return parseInt(matches[matches.length - 1], 10);
      };

      const getSalaryMin = (str) => {
        const matches = (str || '').match(/(\d+)/g);
        if (!matches) return 0;
        return parseInt(matches[0], 10);
      };

      const getExpNum = (str) => {
        const match = (str || '').match(/(\d+)/);
        return match ? parseInt(match[0], 10) : 0;
      };

      switch (sortBy) {
        case 'salary_desc':
        case 'salary':
          return getSalaryMax(b.salaryRange) - getSalaryMax(a.salaryRange);
        case 'salary_asc':
          return getSalaryMin(a.salaryRange) - getSalaryMin(b.salaryRange);
        case 'company_asc':
        case 'company':
          return (a.companyName || '').localeCompare(b.companyName || '');
        case 'company_desc':
          return (b.companyName || '').localeCompare(a.companyName || '');
        case 'experience_asc':
          return getExpNum(a.experience) - getExpNum(b.experience);
        case 'experience_desc':
          return getExpNum(b.experience) - getExpNum(a.experience);
        case 'recent_asc':
          return (b.postedDaysAgo || 0) - (a.postedDaysAgo || 0);
        case 'recent_desc':
        case 'recent':
        default:
          return (a.postedDaysAgo || 0) - (b.postedDaysAgo || 0);
      }
    });
  }, [allJobs, companyMap, searchQuery, selectedRole, selectedIndustry, selectedExp, selectedWorkMode, selectedHub, companyTypeFilter, sortBy]);

  // Filter Companies
  const filteredCompanies = useMemo(() => {
    return HYDERABAD_COMPANIES.filter((company) => {
      // Hub Filter
      if (selectedHub !== 'all' && company.hubId !== selectedHub) {
        return false;
      }

      // Company Type Filter
      if (companyTypeFilter === 'startup' && !company.isStartup) {
        return false;
      }

      // Industry Filter
      if (selectedIndustry !== 'All Industries' && company.industry !== selectedIndustry) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = company.name.toLowerCase().includes(q);
        const matchesCategory = company.category.toLowerCase().includes(q);
        const matchesTech = company.techStack?.some(t => t.toLowerCase().includes(q));
        const matchesAddress = (company.address || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesTech && !matchesAddress) {
          return false;
        }
      }

      return true;
    });
  }, [selectedHub, companyTypeFilter, selectedIndustry, searchQuery]);

  // Active filter count check
  const hasActiveFilters = searchQuery !== '' || selectedRole !== 'All Roles' || selectedIndustry !== 'All Industries' || selectedExp !== 'All Levels' || selectedWorkMode !== 'All Modes' || companyTypeFilter !== 'all' || selectedHub !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRole('All Roles');
    setSelectedIndustry('All Industries');
    setSelectedExp('All Levels');
    setSelectedWorkMode('All Modes');
    setCompanyTypeFilter('all');
    setSelectedHub('all');
    setActiveHubCenter([17.438, 78.375]);
    setActiveHubZoom(12);
    setSelectedCompany(null);
  };

  // Toggle Bookmark
  const handleToggleBookmark = (job) => {
    setBookmarkedIds((prev) => {
      if (prev.includes(job.id)) {
        return prev.filter(id => id !== job.id);
      } else {
        return [...prev, job.id];
      }
    });
  };

  // Select Hub
  const handleSelectHub = (hub) => {
    setSelectedHub(hub.id);
    setActiveHubCenter(hub.center);
    setActiveHubZoom(hub.zoom);
  };

  // Fly to company on map
  const handleViewOnMap = (comp) => {
    setSelectedCompany(comp);
    if (comp.coordinates) {
      setActiveHubCenter(comp.coordinates);
      setActiveHubZoom(16);
    }
    if (viewMode === 'jobs' || viewMode === 'companies') {
      setViewMode('split');
    }
    setMobileSplitTab('map');
  };

  // View Company's Jobs
  const handleViewCompanyJobs = (comp) => {
    setSelectedCompany(comp);
    setSearchQuery(comp.name);
    if (viewMode === 'companies') {
      setViewMode('split');
    }
    setMobileSplitTab('jobs');
  };

  // Add custom job
  const handleAddCustomJob = (newJob) => {
    setCustomJobs(prev => [newJob, ...prev]);
  };

  // Bookmarked jobs list
  const bookmarkedJobs = useMemo(() => {
    return allJobs.filter(j => bookmarkedIds.includes(j.id));
  }, [allJobs, bookmarkedIds]);

  return (
    <div className="relative min-h-screen flex flex-col font-sans overflow-x-hidden transition-colors duration-300">
      
      {/* Floating Tech Background Logos with Gaussian Blur */}
      <FloatingTechBackground />

      {/* Top Navbar with Theme Toggle */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalCompanies={HYDERABAD_COMPANIES.length}
        totalJobs={allJobs.length}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksDrawerOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsModalOpen(true)}
        mobileSplitTab={mobileSplitTab}
        setMobileSplitTab={setMobileSplitTab}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Filter & Search Bar with Integrated Tech Hub Dropdown */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        selectedExp={selectedExp}
        setSelectedExp={setSelectedExp}
        selectedWorkMode={selectedWorkMode}
        setSelectedWorkMode={setSelectedWorkMode}
        selectedHub={selectedHub}
        onSelectHub={handleSelectHub}
        companyTypeFilter={companyTypeFilter}
        setCompanyTypeFilter={setCompanyTypeFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        filteredJobsCount={filteredJobs.length}
        filteredCompaniesCount={filteredCompanies.length}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full px-3 sm:px-6 lg:px-10 py-4 sm:py-6">
        
        {/* VIEW 1: ADJUSTABLE SPLIT VIEW (Interactive Resizable Map & Job Feed) */}
        {viewMode === 'split' && (
          <div 
            ref={splitContainerRef}
            className="relative flex flex-col lg:flex-row gap-4 lg:gap-3 h-auto lg:h-[calc(100vh-270px)] min-h-0 lg:min-h-[580px] select-none"
          >
            
            {/* Left Pane: Interactive Hyderabad Map (Adjustable Width on Desktop / Full Width Top on Mobile) */}
            <div 
              className={`h-[360px] sm:h-[420px] lg:h-full w-full flex flex-col transition-[width] shrink-0 ${
                isDraggingSplit ? 'duration-0 pointer-events-none' : 'duration-150'
              }`}
              style={{ width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${splitRatio}%` : '100%' }}
            >
              <MapView
                companies={filteredCompanies}
                selectedCompany={selectedCompany}
                onSelectCompany={(c) => setSelectedCompany(c)}
                onSelectJobForCompany={handleViewCompanyJobs}
                onOpenCompanyDetails={(c) => {
                  setSelectedCompany(c);
                  setIsCompanyModalOpen(true);
                }}
                activeHubCenter={activeHubCenter}
                activeHubZoom={activeHubZoom}
              />
            </div>

            {/* Draggable Divider Handle (Desktop Only) */}
            <div
              onMouseDown={() => setIsDraggingSplit(true)}
              onTouchStart={() => setIsDraggingSplit(true)}
              className={`hidden lg:flex flex-col items-center justify-center w-3.5 hover:w-5 group cursor-col-resize rounded-2xl transition-all duration-200 z-20 shrink-0 ${
                isDraggingSplit 
                  ? 'bg-emerald-500 shadow-xl shadow-emerald-500/50 w-5 ring-2 ring-emerald-400' 
                  : 'hover:bg-emerald-500/20 dark:bg-slate-800/60 bg-white/60 backdrop-blur-md border dark:border-slate-700/60 border-slate-300/80 shadow-sm'
              }`}
              title="Drag horizontally to resize Map & Jobs (Double-click to reset 58:42)"
              onDoubleClick={() => {
                setSplitRatio(58);
                window.dispatchEvent(new Event('resize'));
              }}
            >
              <div className="flex flex-col gap-1 items-center justify-center py-3 text-slate-400 dark:text-slate-300 group-hover:text-emerald-400">
                <div className="w-1 h-1 rounded-full bg-current"></div>
                <div className="w-1 h-3.5 rounded-full bg-current"></div>
                <div className="w-1 h-1 rounded-full bg-current"></div>
              </div>
            </div>

            {/* Right Pane: Searchable Jobs & Startup Stream (Adjustable Width on Desktop / Follows Map on Mobile) */}
            <div 
              className={`h-auto lg:h-full w-full min-h-[500px] flex flex-col dark:bg-[#0E1526]/85 bg-white/90 backdrop-blur-md rounded-3xl border dark:border-slate-800 border-slate-200 p-4 sm:p-5 overflow-hidden shadow-xl transition-[width] ${
                isDraggingSplit ? 'duration-0' : 'duration-150'
              }`}
              style={{ width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${100 - splitRatio}%` : '100%' }}
            >
              
              <div className="flex items-center justify-between pb-3 mb-3 border-b dark:border-slate-800 border-slate-200">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 dark:text-emerald-400 text-orange-600" />
                  <h2 className="font-extrabold text-sm sm:text-base dark:text-white text-slate-900">Startup Job Opportunities</h2>
                </div>

                <div className="flex items-center gap-2">
                  {/* Quick Preset Buttons on Desktop */}
                  <div className="hidden xl:flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <button
                      onClick={() => { setSplitRatio(50); window.dispatchEvent(new Event('resize')); }}
                      className="px-1.5 py-0.5 rounded hover:bg-slate-800 dark:hover:text-emerald-400 hover:text-orange-600 transition-colors"
                      title="50% Map / 50% Jobs"
                    >
                      50:50
                    </button>
                    <span>|</span>
                    <button
                      onClick={() => { setSplitRatio(70); window.dispatchEvent(new Event('resize')); }}
                      className="px-1.5 py-0.5 rounded hover:bg-slate-800 dark:hover:text-emerald-400 hover:text-orange-600 transition-colors"
                      title="70% Map / 30% Jobs"
                    >
                      70:30
                    </button>
                  </div>

                  <span className="text-xs font-mono font-extrabold dark:text-emerald-400 dark:bg-emerald-500/10 text-orange-700 bg-orange-500/10 px-2.5 py-0.5 rounded-lg border dark:border-emerald-500/20 border-orange-500/20">
                    {filteredJobs.length} Roles
                  </span>
                </div>
              </div>

              {/* Scrollable Job List */}
              <div className="overflow-y-auto space-y-3.5 flex-1 pr-1">
                {filteredJobs.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-12 h-12 rounded-full dark:bg-slate-800 bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                      <Search className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold dark:text-slate-300 text-slate-700">No jobs match your filter</p>
                    <p className="text-xs text-slate-500">Try adjusting role, industry, or search keywords.</p>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 dark:bg-slate-800 dark:hover:bg-slate-700 bg-slate-100 hover:bg-slate-200 text-xs dark:text-emerald-400 text-orange-600 rounded-xl font-bold transition-colors cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <>
                    {(typeof window !== 'undefined' && window.innerWidth < 1024 && !isMobileExpandedJobs
                      ? filteredJobs.slice(0, 5)
                      : filteredJobs
                    ).map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        company={companyMap[job.companyId]}
                        isSelected={selectedJob?.id === job.id}
                        onSelectJob={(j) => {
                          setSelectedJob(j);
                          setIsJobModalOpen(true);
                        }}
                        onViewOnMap={handleViewOnMap}
                        isBookmarked={bookmarkedIds.includes(job.id)}
                        onToggleBookmark={handleToggleBookmark}
                        onOpenApplyModal={(j) => {
                          setSelectedJob(j);
                          setIsJobModalOpen(true);
                        }}
                      />
                    ))}

                    {/* Mobile "See More Jobs" Button */}
                    {filteredJobs.length > 5 && (
                      <div className="pt-2 pb-1 text-center lg:hidden">
                        {!isMobileExpandedJobs ? (
                          <button
                            onClick={() => setIsMobileExpandedJobs(true)}
                            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-cyan-500/15 hover:from-emerald-500/25 hover:to-teal-500/25 border border-emerald-500/40 text-emerald-400 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all active:scale-[0.98]"
                          >
                            <span>See More Jobs ({filteredJobs.length - 5} More Available)</span>
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setIsMobileExpandedJobs(false)}
                            className="w-full py-2.5 px-4 rounded-2xl dark:bg-slate-800/80 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 border dark:border-slate-700 border-slate-300 cursor-pointer transition-all"
                          >
                            <span>Show Less</span>
                            <ChevronUp className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

            </div>

          </div>
        )}

        {/* VIEW 2: FULL MAP VIEW */}
        {viewMode === 'map' && (
          <div className="h-[calc(100vh-270px)] min-h-[580px] flex flex-col">
            <MapView
              companies={filteredCompanies}
              selectedCompany={selectedCompany}
              onSelectCompany={(c) => setSelectedCompany(c)}
              onSelectJobForCompany={handleViewCompanyJobs}
              onOpenCompanyDetails={(c) => {
                setSelectedCompany(c);
                setIsCompanyModalOpen(true);
              }}
              activeHubCenter={activeHubCenter}
              activeHubZoom={activeHubZoom}
              isFullView={true}
            />
          </div>
        )}

        {/* VIEW 3: JOB BOARD GRID VIEW */}
        {viewMode === 'jobs' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 dark:bg-[#0E1526]/90 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border dark:border-slate-800 border-slate-200 shadow-md">
              <div>
                <h2 className="text-base sm:text-lg font-black dark:text-white text-slate-900">Hyderabad Startup Job Directory</h2>
                <p className="text-xs dark:text-slate-400 text-slate-500">Curated opportunities across top startups, unicorns & global tech centers</p>
              </div>
              <span className="text-xs font-mono font-black dark:text-emerald-400 dark:bg-emerald-500/10 text-orange-700 bg-orange-500/10 px-3.5 py-1.5 rounded-xl border dark:border-emerald-500/20 border-orange-500/20">
                {filteredJobs.length} Positions Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  company={companyMap[job.companyId]}
                  isSelected={selectedJob?.id === job.id}
                  onSelectJob={(j) => {
                    setSelectedJob(j);
                    setIsJobModalOpen(true);
                  }}
                  onViewOnMap={handleViewOnMap}
                  isBookmarked={bookmarkedIds.includes(job.id)}
                  onToggleBookmark={handleToggleBookmark}
                  onOpenApplyModal={(j) => {
                    setSelectedJob(j);
                    setIsJobModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: COMPANY DIRECTORY GRID */}
        {viewMode === 'companies' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 dark:bg-[#0E1526]/90 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border dark:border-slate-800 border-slate-200 shadow-md">
              <div>
                <h2 className="text-base sm:text-lg font-black dark:text-white text-slate-900">Hyderabad Tech Companies & Startups Directory</h2>
                <p className="text-xs dark:text-slate-400 text-slate-500">Explore founders, tech stacks, valuations, and verified careers links</p>
              </div>
              <span className="text-xs font-mono font-black dark:text-cyan-400 dark:bg-cyan-500/10 text-purple-700 bg-purple-500/10 px-3.5 py-1.5 rounded-xl border dark:border-cyan-500/20 border-purple-500/20">
                {filteredCompanies.length} Organizations
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
              {filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onSelectCompany={(c) => setSelectedCompany(c)}
                  onViewOnMap={handleViewOnMap}
                  onViewCompanyJobs={handleViewCompanyJobs}
                  onOpenDetails={(c) => {
                    setSelectedCompany(c);
                    setIsCompanyModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Newsletter Subscription Section */}
      <NewsletterSection />

      {/* FOOTER: Created by Tech With Shaik & Copyright Notice (Transparent Background) */}
      <footer className="relative z-10 mt-12 bg-transparent dark:bg-slate-950/20 bg-white/20 backdrop-blur-[3px] border-t dark:border-slate-800/40 border-slate-200/40 py-8 px-4 sm:px-8 text-center text-xs dark:text-slate-400 text-slate-600 transition-colors">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-4">
          
          {/* Created by Button linked to Instagram */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/techwithshaik/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 transition-all cursor-pointer"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Created by @techwithshaik</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold tracking-wide">Follow</span>
            </a>
          </div>

          {/* Copyright Notice */}
          <div className="space-y-1">
            <p className="dark:text-slate-300 text-slate-800 font-bold text-xs sm:text-sm">
              Copyright belongs to <span className="dark:text-emerald-400 text-orange-600 font-extrabold">"Tech With Shaik | TWS"</span> account.
            </p>
            <p className="text-[11px] text-slate-500">
              HydStartupArena • One Stop for All Tech Jobs
            </p>
          </div>

          {/* Quick ecosystem footer links */}
          <div className="flex flex-wrap items-center justify-center gap-4 dark:text-slate-400 text-slate-600 text-xs pt-2">
            <button onClick={() => setIsAnalyticsModalOpen(true)} className="hover:text-cyan-400 transition-colors cursor-pointer">
              Ecosystem Insights
            </button>
            <span>•</span>
            <button onClick={() => setIsPostJobModalOpen(true)} className="hover:text-emerald-500 transition-colors cursor-pointer">
              Post a Job
            </button>
            <span>•</span>
            <a href="https://t-hub.co" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transition-colors">
              T-Hub Hyderabad
            </a>
          </div>

        </div>
      </footer>

      {/* Modals */}
      <JobDetailsModal
        job={selectedJob}
        company={selectedJob ? companyMap[selectedJob.companyId] : null}
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        isBookmarked={selectedJob ? bookmarkedIds.includes(selectedJob.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onViewOnMap={handleViewOnMap}
      />

      <CompanyDetailsModal
        company={selectedCompany}
        jobs={selectedCompany ? allJobs.filter(j => j.companyId === selectedCompany.id) : []}
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
        onSelectJob={(j) => {
          setSelectedJob(j);
          setIsJobModalOpen(true);
        }}
        onViewOnMap={handleViewOnMap}
      />

      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        onAddJob={handleAddCustomJob}
      />

      <BookmarksDrawer
        isOpen={isBookmarksDrawerOpen}
        onClose={() => setIsBookmarksDrawerOpen(false)}
        bookmarkedJobs={bookmarkedJobs}
        onSelectJob={(j) => {
          setSelectedJob(j);
          setIsJobModalOpen(true);
        }}
        onRemoveBookmark={(id) => setBookmarkedIds(prev => prev.filter(x => x !== id))}
        onClearAll={() => setBookmarkedIds([])}
      />

      <AnalyticsModal
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
      />

    </div>
  );
}
