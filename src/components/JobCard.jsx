import React from 'react';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Bookmark, 
  ExternalLink, 
  ChevronRight, 
  Sparkles, 
  Send 
} from 'lucide-react';
import CompanyLogo from './CompanyLogo';
import AnimatedApplyButton from './AnimatedApplyButton';
import { getRealtimeApplyUrl } from '../utils/applyLinks';

export default function JobCard({
  job,
  company,
  isSelected,
  onSelectJob,
  onViewOnMap,
  isBookmarked,
  onToggleBookmark,
  onOpenApplyModal
}) {
  const comp = company || {
    id: job.companyId,
    name: job.companyName,
    color: '#10B981',
    logoText: job.companyName?.substring(0, 2).toUpperCase() || 'HYD',
    isStartup: true,
    area: job.area
  };

  return (
    <div 
      className={`relative group rounded-3xl p-4 sm:p-5 transition-all duration-300 cursor-pointer border ${
        isSelected
          ? 'dark:bg-slate-900/95 bg-white/95 dark:border-emerald-500 border-orange-500 shadow-xl dark:shadow-emerald-500/20 shadow-orange-500/20 ring-1 dark:ring-emerald-500 ring-orange-500'
          : 'dark:bg-[#111827]/90 bg-white/85 hover:bg-white dark:hover:bg-slate-900/90 dark:border-slate-800 border-slate-200/90 hover:border-orange-300 dark:hover:border-slate-700 shadow-md hover:shadow-2xl hover:-translate-y-0.5'
      }`}
      onClick={() => onSelectJob(job)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        
        {/* Company Avatar & Role Info */}
        <div className="flex items-start gap-3 min-w-0">
          <CompanyLogo company={comp} size="md" />

          <div className="min-w-0">
            <h3 className="font-bold text-sm sm:text-base dark:text-white text-slate-900 group-hover:text-orange-600 dark:group-hover:text-emerald-400 transition-colors truncate">
              {job.title}
            </h3>
            
            <div className="flex items-center gap-2 mt-0.5 text-xs dark:text-slate-300 text-slate-600">
              <span className="font-semibold dark:text-slate-200 text-slate-800 truncate">{job.companyName}</span>
              <span className="text-slate-400">•</span>
              <span className="dark:text-slate-400 text-slate-500 truncate">{job.industry}</span>
            </div>
          </div>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(job);
          }}
          className={`p-2 rounded-xl transition-all shrink-0 cursor-pointer ${
            isBookmarked
              ? 'dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/40 bg-orange-500/20 text-orange-600 border border-orange-500/40'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
          }`}
          title={isBookmarked ? 'Remove Bookmark' : 'Save Job'}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

      </div>

      {/* Meta Chips: Salary, Experience, Work Mode, Hub */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3 text-xs">
        {job.salaryRange && (
          <span className="px-2.5 py-1 rounded-xl dark:bg-emerald-500/10 dark:border-emerald-500/25 dark:text-emerald-400 bg-orange-500/10 border border-orange-500/25 text-orange-700 font-bold font-mono">
            {job.salaryRange}
          </span>
        )}

        <span className="px-2.5 py-1 rounded-xl dark:bg-slate-800/90 dark:text-slate-300 dark:border-slate-700/60 bg-slate-100 text-slate-700 border border-slate-200 font-medium">
          {job.experienceLevel || job.experience}
        </span>

        <span className="px-2.5 py-1 rounded-xl dark:bg-cyan-500/10 dark:border-cyan-500/20 dark:text-cyan-300 bg-purple-500/10 border border-purple-500/20 text-purple-700 font-medium">
          {job.workMode || 'Hybrid'}
        </span>

        <div className="flex items-center gap-1 dark:text-slate-400 text-slate-500 ml-auto text-[11px]">
          <MapPin className="w-3 h-3 dark:text-emerald-400 text-orange-500" />
          <span className="truncate max-w-[130px]">{job.area || comp.area}</span>
        </div>
      </div>

      {/* Description Snippet */}
      <p className="text-xs dark:text-slate-400 text-slate-600 line-clamp-2 mb-3.5 leading-relaxed">
        {job.description}
      </p>

      {/* Skills Badges & Footer Actions */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t dark:border-slate-800/80 border-slate-200/80">
        
        {/* Skills */}
        <div className="flex flex-wrap items-center gap-1 overflow-hidden max-h-6">
          {job.skills?.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700/50 bg-slate-100 text-slate-700 border border-slate-200 font-mono">
              {skill}
            </span>
          ))}
          {job.skills?.length > 3 && (
            <span className="text-[10px] text-slate-400 font-mono">+{job.skills.length - 3}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewOnMap(comp);
            }}
            className="px-2.5 py-1.5 text-[11px] font-bold dark:text-cyan-400 text-purple-600 hover:text-purple-700 dark:hover:text-cyan-300 dark:hover:bg-cyan-500/10 hover:bg-purple-50 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Map</span>
          </button>

          {/* Animated Uiverse Button */}
          <div onClick={(e) => e.stopPropagation()}>
            <AnimatedApplyButton
              href={job.applyUrl || getRealtimeApplyUrl(job, comp)}
              size="sm"
              color="#059669"
            >
              Apply
            </AnimatedApplyButton>
          </div>
        </div>

      </div>

    </div>
  );
}
