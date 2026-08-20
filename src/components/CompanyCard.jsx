import React from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Calendar, 
  Briefcase, 
  ExternalLink, 
  Mail, 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';
import { LinkedInIcon } from './Icons';
import CompanyLogo from './CompanyLogo';
import AnimatedApplyButton from './AnimatedApplyButton';

export default function CompanyCard({
  company,
  onSelectCompany,
  onViewOnMap,
  onViewCompanyJobs,
  onOpenDetails
}) {
  const color = company.color || '#10B981';

  return (
    <div className="dark:bg-[#111827]/90 bg-white/85 hover:bg-white dark:hover:bg-slate-900/90 rounded-3xl border dark:border-slate-800 border-slate-200/90 hover:border-orange-300 dark:hover:border-slate-700 p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 group shadow-md hover:shadow-2xl hover:-translate-y-1">
      
      {/* Top Section */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          
          <div className="flex items-center gap-3">
            <CompanyLogo company={company} size="lg" />

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-base sm:text-lg dark:text-white text-slate-900 group-hover:text-orange-600 dark:group-hover:text-emerald-400 transition-colors">
                  {company.name}
                </h3>
                {company.isStartup && (
                  <span className="text-[9px] px-2 py-0.5 dark:bg-emerald-500/15 dark:text-emerald-400 bg-orange-500/15 text-orange-700 font-extrabold rounded-md border dark:border-emerald-500/30 border-orange-500/30">
                    Startup
                  </span>
                )}
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-500">{company.category}</p>
            </div>
          </div>

          <span 
            className="text-[11px] font-bold px-2.5 py-1 rounded-xl shrink-0"
            style={{ 
              backgroundColor: `${color}15`, 
              color: color, 
              border: `1px solid ${color}35` 
            }}
          >
            {company.stage || 'Enterprise'}
          </span>

        </div>

        {/* Location & Stats */}
        <div className="space-y-1.5 my-3.5 text-xs dark:text-slate-300 text-slate-600">
          <div className="flex items-center gap-1.5 dark:text-slate-400 text-slate-500">
            <MapPin className="w-3.5 h-3.5 dark:text-emerald-400 text-orange-500 shrink-0" />
            <span className="truncate">{company.area || 'Hyderabad'}</span>
          </div>

          <div className="flex items-center gap-3 dark:text-slate-400 text-slate-500 text-[11px]">
            {company.employees && (
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" />
                {company.employees} Team
              </span>
            )}
            {company.foundedYear && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Est. {company.foundedYear}
              </span>
            )}
            {company.valuation && (
              <span className="flex items-center gap-1 dark:text-emerald-400 text-orange-600 font-bold font-mono">
                Val: {company.valuation}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs dark:text-slate-400 text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {company.description}
        </p>

        {/* Tech Stack */}
        {company.techStack && (
          <div className="flex flex-wrap gap-1 mb-4">
            {company.techStack.slice(0, 4).map((tech, idx) => (
              <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700/50 bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                {tech}
              </span>
            ))}
            {company.techStack.length > 4 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-lg dark:bg-slate-800 dark:text-slate-400 bg-slate-100 text-slate-500 font-mono">
                +{company.techStack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="space-y-2.5 pt-3.5 border-t dark:border-slate-800/80 border-slate-200/80">
        <div className="flex items-center justify-between gap-2">
          
          <div className="flex-1">
            <AnimatedApplyButton
              onClick={() => onViewCompanyJobs(company)}
              size="sm"
              className="w-full justify-center"
              color="#059669"
            >
              Open Roles ({company.openRolesCount || 0})
            </AnimatedApplyButton>
          </div>

          <button
            onClick={() => onViewOnMap(company)}
            className="p-2 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-cyan-400 bg-slate-100 hover:bg-slate-200 text-purple-600 border dark:border-slate-700 border-slate-200 transition-colors cursor-pointer"
            title="Locate on Hyderabad Map"
          >
            <MapPin className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenDetails(company)}
            className="p-2 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 border dark:border-slate-700 border-slate-200 transition-colors cursor-pointer"
            title="Company Overview & Links"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

        {/* Quick External Links (PDF Sourced) */}
        <div className="flex items-center justify-between text-[11px] dark:text-slate-400 text-slate-500 px-1 pt-1">
          {company.careerUrl ? (
            <a 
              href={company.careerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="dark:hover:text-cyan-400 hover:text-orange-600 flex items-center gap-1 transition-colors font-medium"
            >
              <span>Careers</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          ) : <span></span>}

          <div className="flex items-center gap-3">
            {company.linkedInUrl && (
              <a 
                href={company.linkedInUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            )}

            {company.hrMail && (
              <a 
                href={`mailto:${company.hrMail}?subject=Application for Hyderabad Tech Roles`} 
                className="dark:hover:text-emerald-400 hover:text-orange-600 transition-colors"
                title={`Official HR Email: ${company.hrMail}`}
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
