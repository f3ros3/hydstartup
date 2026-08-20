import React from 'react';
import { 
  X, 
  MapPin, 
  Globe, 
  Users, 
  Calendar, 
  DollarSign, 
  ExternalLink, 
  Briefcase, 
  ChevronRight,
  Sparkles 
} from 'lucide-react';
import { LinkedInIcon } from './Icons';
import CompanyLogo from './CompanyLogo';
import AnimatedApplyButton from './AnimatedApplyButton';

export default function CompanyDetailsModal({
  company,
  jobs = [],
  isOpen,
  onClose,
  onSelectJob = () => {},
  onViewOnMap = () => {}
}) {
  if (!isOpen || !company) return null;

  const color = company.color || '#10B981';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 dark:bg-black/85 backdrop-blur-md overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl lg:max-w-3xl dark:bg-[#0F172A] bg-white/95 backdrop-blur-2xl border dark:border-slate-700/80 border-orange-200/80 rounded-3xl shadow-2xl dark:shadow-emerald-950/20 shadow-orange-500/10 overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 dark:bg-gradient-to-b dark:from-slate-900 dark:to-[#0F172A] bg-gradient-to-b from-orange-50/90 via-purple-50/40 to-white/90 border-b dark:border-slate-800 border-orange-100">
          <div className="flex items-start justify-between gap-3">
            
            <div className="flex items-start gap-3 sm:gap-4">
              <CompanyLogo company={company} size="xl" />

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black dark:text-white text-slate-950 tracking-tight">{company.name}</h2>
                  {company.isStartup && (
                    <span className="text-[10px] px-2 py-0.5 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30 bg-orange-100 text-orange-700 border border-orange-200 font-bold rounded-md">
                      Startup
                    </span>
                  )}
                </div>
                
                <p className="text-xs dark:text-slate-400 text-slate-600 font-medium mt-0.5">{company.category} • {company.industry}</p>
                
                <div className="flex items-center gap-1.5 text-xs dark:text-slate-300 text-slate-700 mt-2 font-medium">
                  <MapPin className="w-3.5 h-3.5 dark:text-emerald-400 text-orange-600 shrink-0" />
                  <span>{company.address || company.area}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 border dark:border-transparent border-slate-200 transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            <div className="p-2.5 rounded-xl dark:bg-slate-800/80 dark:border-slate-700/60 bg-emerald-50/70 border border-emerald-100 shadow-sm">
              <p className="text-[10px] dark:text-slate-400 text-slate-500 uppercase font-bold">Stage / Valuation</p>
              <p className="text-xs font-black dark:text-emerald-400 text-emerald-700 mt-0.5 truncate">{company.valuation || company.stage || 'Private'}</p>
            </div>
            <div className="p-2.5 rounded-xl dark:bg-slate-800/80 dark:border-slate-700/60 bg-slate-50 border border-slate-200 shadow-sm">
              <p className="text-[10px] dark:text-slate-400 text-slate-500 uppercase font-bold">Team Size</p>
              <p className="text-xs font-black dark:text-slate-200 text-slate-800 mt-0.5">{company.employees || '500+'}</p>
            </div>
            <div className="p-2.5 rounded-xl dark:bg-slate-800/80 dark:border-slate-700/60 bg-purple-50/70 border border-purple-100 shadow-sm">
              <p className="text-[10px] dark:text-slate-400 text-slate-500 uppercase font-bold">Founded</p>
              <p className="text-xs font-black dark:text-slate-200 text-purple-800 mt-0.5">{company.foundedYear || '2016'}</p>
            </div>
            <div className="p-2.5 rounded-xl dark:bg-slate-800/80 dark:border-slate-700/60 bg-orange-50/70 border border-orange-100 shadow-sm">
              <p className="text-[10px] dark:text-slate-400 text-slate-500 uppercase font-bold">Open Roles</p>
              <p className="text-xs font-black dark:text-cyan-400 text-orange-700 mt-0.5">{jobs.length} Active Positions</p>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* About */}
          <div>
            <h4 className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-2">About the Organization</h4>
            <p className="dark:text-slate-300 text-slate-800 leading-relaxed font-medium">
              {company.description}
            </p>
          </div>

          {/* Tech Stack */}
          {company.techStack && (
            <div>
              <h4 className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-2">Core Technologies & Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {company.techStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 bg-orange-50 text-orange-900 border border-orange-200 font-mono text-xs font-bold shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Active Job Openings from this Company */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider">
                Current Openings ({jobs.length})
              </h4>
            </div>

            {jobs.length === 0 ? (
              <div className="p-4 rounded-xl dark:bg-slate-900 dark:border-slate-800 bg-slate-50 border border-slate-200 text-xs dark:text-slate-400 text-slate-500 text-center font-medium">
                No direct open listings cached. Check their official careers portal below.
              </div>
            ) : (
              <div className="space-y-2.5">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => {
                      onClose();
                      onSelectJob(job);
                    }}
                    className="p-3.5 rounded-2xl dark:bg-slate-900/80 dark:hover:bg-slate-800/80 dark:border-slate-800 bg-slate-50 hover:bg-orange-50/70 border border-slate-200 hover:border-orange-200 transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-sm"
                  >
                    <div>
                      <h5 className="font-bold dark:text-white text-slate-900 group-hover:dark:text-emerald-400 group-hover:text-orange-600 transition-colors text-sm">
                        {job.title}
                      </h5>
                      <div className="flex items-center gap-2 mt-1 text-xs dark:text-slate-400 text-slate-500 font-medium">
                        <span>{job.experienceLevel || job.experience}</span>
                        <span>•</span>
                        <span>{job.workMode}</span>
                        {job.salaryRange && (
                          <>
                            <span>•</span>
                            <span className="dark:text-emerald-400 text-emerald-600 font-bold font-mono">{job.salaryRange}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 dark:text-slate-500 text-slate-400 group-hover:dark:text-emerald-400 group-hover:text-orange-600 transition-transform group-hover:translate-x-1 shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer Links & Navigation */}
        <div className="p-4 dark:bg-slate-900/95 dark:border-slate-800 bg-slate-50/95 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onViewOnMap(company);
              }}
              className="px-3.5 py-2 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-cyan-400 dark:border-slate-700 bg-white hover:bg-orange-50 text-orange-600 hover:text-orange-700 text-xs font-bold border border-slate-200 shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Locate on Map</span>
            </button>

            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 dark:text-slate-400 text-slate-500" />
                <span>Website</span>
              </a>
            )}

            {company.linkedInUrl && (
              <a
                href={company.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 bg-white hover:bg-blue-50 text-slate-800 text-xs font-bold border border-slate-200 shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-blue-500" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>

          <AnimatedApplyButton
            href={company.careerUrl || `https://www.google.com/search?q=${encodeURIComponent(company.name + ' careers hyderabad')}`}
            size="md"
            iconType="external"
          >
            Careers Portal
          </AnimatedApplyButton>

        </div>

      </div>
    </div>
  );
}
