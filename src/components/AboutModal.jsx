import React from 'react';
import { X, ShieldCheck, Database, Award, CheckCircle2, Users, Mail, MapPin } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Editorial & Mission</span>
            <h2 id="about-modal-title" className="text-xl font-bold text-slate-900 dark:text-white">
              About HydStartup Portal
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Our Mission: Mapping Hyderabad's Tech Renaissance</h3>
            <p>
              HydStartup Portal (<strong>hydstartup.online</strong>) was founded to chronicle, map, and empower the vibrant technology ecosystem of Greater Hyderabad and the state of Telangana. From high-growth B2B SaaS unicorns in HITEC City to deeptech space pioneers at T-Hub and life sciences innovators in Genome Valley, our platform serves as the single source of truth for founders, engineers, researchers, and job seekers.
            </p>
          </div>

          {/* Methodology */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
              <Database className="w-5 h-5" />
              <h4>How We Collect, Verify and Curate Data</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
              We uphold strict editorial standards to avoid the noisy, unverified data that plagues generic scrapers:
            </p>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>Primary Source Verification:</strong> Every company profile and job vacancy is cross-referenced against official ATS portals (Greenhouse, Lever, Workable, BambooHR, Darwinbox) and verified company career pages.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>No Dead or Spam Listings:</strong> Automated checks purge closed requisitions on a weekly cycle. If an ATS link is defunct, it is delisted until re-verified.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>Original Tech Synthesis:</strong> We do not copy-paste boilerplate marketing text. Each company breakdown includes original technical analysis of their tech stack, engineering culture, and ecosystem contribution.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>Community Auditing:</strong> Users and founders can submit edits, report outdated compensation, or suggest new startups through our interactive review forms.</span>
              </li>
            </ul>
          </div>

          {/* Business & Publisher Info */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Publisher & Editorial Principles</h3>
            <p className="text-sm">
              HydStartup Portal is published by <strong>Tech With Shaik (TWS)</strong>, based in Hyderabad, Telangana, India. We maintain strict editorial independence. We do not accept paid placement to artificially alter compensation metrics, funding stages, or technical assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white text-sm mb-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Location</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                HITEC City / Knowledge City Corridor, Hyderabad, Telangana 500081, India.
              </p>
            </div>

            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white text-sm mb-1">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>Editorial Inquiries</span>
              </div>
              <a href="mailto:techwithshaik2@gmail.com" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline">
                techwithshaik2@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
