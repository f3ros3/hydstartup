import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Building2, 
  Send, 
  CheckCircle2, 
  Share2, 
  Bookmark, 
  ExternalLink,
  Mail,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { LinkedInIcon } from './Icons';
import CompanyLogo from './CompanyLogo';
import AnimatedApplyButton from './AnimatedApplyButton';

export default function JobDetailsModal({
  job,
  company,
  isOpen,
  onClose,
  isBookmarked = false,
  onToggleBookmark = () => {},
  onViewOnMap = () => {}
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !job) return null;

  const comp = company || {
    id: job.companyId,
    name: job.companyName,
    color: '#10B981',
    logoText: job.companyName?.substring(0, 2).toUpperCase() || 'HYD',
    area: job.area,
    stage: 'Growth Startup'
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const applyUrl = comp.careerUrl || `https://www.google.com/search?q=${encodeURIComponent(job.companyName + ' ' + job.title + ' careers hyderabad')}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 dark:bg-black/85 backdrop-blur-md overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl lg:max-w-3xl dark:bg-[#0F172A] bg-white/95 backdrop-blur-2xl border dark:border-slate-700/80 border-orange-200/80 rounded-3xl shadow-2xl dark:shadow-emerald-950/20 shadow-orange-500/10 overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 dark:bg-gradient-to-b dark:from-slate-900 dark:to-[#0F172A] bg-gradient-to-b from-orange-50/90 via-purple-50/40 to-white/90 border-b dark:border-slate-800 border-orange-100">
          <div className="flex items-start justify-between gap-3">
            
            {/* Company Info */}
            <div className="flex items-start gap-3 sm:gap-4">
              <CompanyLogo company={comp} size="lg" />

              <div>
                <h2 className="text-lg sm:text-2xl font-black dark:text-white text-slate-950 tracking-tight leading-snug">
                  {job.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                  <span className="font-extrabold dark:text-emerald-400 text-orange-600 text-sm">{job.companyName}</span>
                  <span className="dark:text-slate-600 text-slate-300">•</span>
                  <span className="dark:text-slate-400 text-slate-600 font-medium">{job.industry}</span>
                  <span className="dark:text-slate-600 text-slate-300">•</span>
                  <span className="dark:text-slate-400 text-slate-600 font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3 dark:text-emerald-400 text-orange-600" />
                    {job.area || comp.area}
                  </span>
                </div>
              </div>
            </div>

            {/* Top Action Icons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-orange-100/70 text-slate-700 hover:text-orange-700 border dark:border-transparent border-slate-200 transition-colors cursor-pointer"
                title="Share Job"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleBookmark(job)}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  isBookmarked
                    ? 'dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/40 bg-orange-100 text-orange-600 border border-orange-300'
                    : 'dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-orange-100/70 text-slate-700 border dark:border-transparent border-slate-200'
                }`}
                title={isBookmarked ? 'Saved' : 'Save Job'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 border dark:border-transparent border-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Quick Details Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3.5 border-t dark:border-slate-800/80 border-orange-100">
            {job.salaryRange && (
              <span className="px-3 py-1 rounded-xl dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold font-mono text-xs shadow-sm">
                💰 {job.salaryRange}
              </span>
            )}
            <span className="px-3 py-1 rounded-xl dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs shadow-sm">
              🎯 {job.experienceLevel || job.experience}
            </span>
            <span className="px-3 py-1 rounded-xl dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30 bg-purple-50 text-purple-700 border border-purple-200 font-semibold text-xs shadow-sm">
              🏢 {job.workMode || 'Hybrid'}
            </span>
            <span className="px-3 py-1 rounded-xl dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30 bg-orange-50 text-orange-700 border border-orange-200 font-semibold text-xs shadow-sm">
              ⚡ Posted {job.postedDaysAgo === 1 ? 'Yesterday' : `${job.postedDaysAgo} days ago`}
            </span>
          </div>

          {copied && (
            <div className="mt-2 text-xs dark:text-emerald-400 text-orange-600 font-bold animate-pulse">
              ✓ Job link copied to clipboard!
            </div>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* About the Role */}
          <div>
            <h4 className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-2">Role Overview</h4>
            <p className="dark:text-slate-300 text-slate-800 leading-relaxed font-medium">
              {job.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && (
            <div>
              <h4 className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-2.5">Key Responsibilities</h4>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 dark:text-slate-300 text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 dark:text-emerald-400 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements & Skills */}
          {job.requirements && (
            <div>
              <h4 className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-2.5">Requirements</h4>
              <ul className="space-y-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 dark:text-slate-300 text-slate-800 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full dark:bg-cyan-400 bg-purple-500 shrink-0 mt-2"></div>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Required */}
          {job.skills && (
            <div>
              <h4 className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-2">Required Skills & Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 bg-orange-50 text-orange-900 border border-orange-200 font-mono text-xs font-bold shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Perks & Benefits */}
          {job.perks && (
            <div>
              <h4 className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-2">Perks & Benefits</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {job.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl dark:bg-slate-800/60 dark:border-slate-800 dark:text-slate-300 bg-purple-50/60 border border-purple-100 text-slate-800 font-medium text-xs shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 dark:text-amber-400 text-amber-500 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Office Location & Map Jump */}
          <div className="p-4 rounded-2xl dark:bg-slate-900/90 dark:border-slate-800 bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl dark:bg-emerald-500/10 dark:text-emerald-400 bg-orange-100 text-orange-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs dark:text-slate-400 text-slate-500 font-medium">Hyderabad Office Location</p>
                <p className="text-sm font-bold dark:text-slate-200 text-slate-900">{comp.address || job.area || comp.area}</p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onViewOnMap(comp);
              }}
              className="px-3.5 py-1.5 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-cyan-400 dark:border-slate-700 bg-white hover:bg-orange-50 text-orange-600 hover:text-orange-700 text-xs font-bold border border-slate-200 shadow-sm transition-all shrink-0 cursor-pointer"
            >
              Locate on Map
            </button>
          </div>

        </div>

        {/* Bottom Multi-Channel Apply Bar with Animated Button */}
        <div className="p-4 dark:bg-slate-900/95 dark:border-slate-800 bg-slate-50/95 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-2">
            {comp.hrMail && (
              <a
                href={`mailto:${comp.hrMail}?subject=Application for ${job.title} at ${job.companyName}&body=Hi Hiring Team at ${job.companyName},%0D%0A%0D%0AI would like to apply for the ${job.title} position in Hyderabad.`}
                className="px-3 py-2 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 bg-white hover:bg-orange-50 text-slate-800 text-xs font-bold border border-slate-200 shadow-sm flex items-center gap-1.5 transition-colors"
                title={`Email HR directly: ${comp.hrMail}`}
              >
                <Mail className="w-3.5 h-3.5 dark:text-emerald-400 text-emerald-600" />
                <span>Email HR</span>
              </a>
            )}

            {comp.linkedInUrl && (
              <a
                href={comp.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 bg-white hover:bg-blue-50 text-slate-800 text-xs font-bold border border-slate-200 shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-blue-500" />
                <span>LinkedIn</span>
              </a>
            )}

            <a
              href={`https://www.naukri.com/jobs-in-hyderabad?keyword=${encodeURIComponent(job.title + ' ' + job.companyName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 shadow-sm flex items-center gap-1.5 transition-colors hidden sm:flex"
            >
              <span>Naukri</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href={`https://in.indeed.com/jobs?q=${encodeURIComponent(job.title + ' ' + job.companyName)}&l=Hyderabad%2C+Telangana`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 shadow-sm flex items-center gap-1.5 transition-colors hidden sm:flex"
            >
              <span>Indeed</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          {/* Animated Primary Apply Button */}
          <div className="flex-1 sm:flex-initial">
            <AnimatedApplyButton
              href={applyUrl}
              size="md"
              iconType="external"
              className="w-full sm:w-auto"
            >
              Apply on Official Portal
            </AnimatedApplyButton>
          </div>

        </div>

      </div>
    </div>
  );
}
