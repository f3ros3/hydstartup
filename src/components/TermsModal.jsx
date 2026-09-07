import React from 'react';
import { X, FileText, CheckCircle, AlertTriangle, Scale, ShieldAlert, Globe } from 'lucide-react';

export default function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 select-none" role="dialog" aria-modal="true" aria-labelledby="terms-modal-title">
      
      {/* Dark Translucent Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 dark:bg-black/85 backdrop-blur-[3px] transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div className="relative z-10 max-w-3xl w-full max-h-[90vh] flex flex-col rounded-3xl dark:bg-[#0E1526] bg-white border dark:border-slate-800 border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b dark:border-slate-800 border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-500 dark:text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="terms-modal-title" className="text-lg sm:text-xl font-black dark:text-white text-slate-900">
                Terms and Conditions of Service
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                Governing Use of HydStartupArena • Effective September 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Terms Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Terms Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-xs sm:text-[13px] leading-relaxed dark:text-slate-300 text-slate-700">
          
          {/* Section 1 */}
          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-500" />
              1. Acceptance of Terms & Platform Scope
            </h3>
            <p>
              By accessing and utilizing <strong>HydStartupArena</strong> ("Platform", "Website", "We", "Us"), you agree to abide by these Terms and Conditions. HydStartupArena is an informational geospatial mapping directory and startup career aggregator designed to connect technology professionals with employment opportunities across the Hyderabad tech corridor (HITEC City, Gachibowli, T-Hub, Financial District, and surrounding tech zones).
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              2. Job Listings & Third-Party Applications Disclaimer
            </h3>
            <p>
              Please note the following regarding aggregated job opportunities:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Informational Aggregation:</strong> Job listings displayed on the Platform are compiled from publicly available company career boards, applicant tracking systems (Greenhouse, Lever, Workday, etc.), and official job feeds.
              </li>
              <li>
                <strong>No Employment Brokerage:</strong> HydStartupArena is not a recruitment agency, employer, or hiring intermediary. We do not process job applications directly on our servers. All "Apply" buttons route users directly to the respective hiring organization's official application portal.
              </li>
              <li>
                <strong>Accuracy of Openings:</strong> While we refresh listings periodically, startup job availability, requirements, and compensation are subject to rapid change. Users must verify exact role criteria on the official employer website prior to applying.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-500" />
              3. Intellectual Property & Nominative Fair Use
            </h3>
            <p>
              All trademarks, trade names, company logos, and service marks displayed on this portal remain the exclusive intellectual property of their respective owners. Their display on HydStartupArena constitutes <strong>nominative fair use</strong> strictly for descriptive purposes to accurately identify the employer offering the employment opportunity and office location.
            </p>
            <p>
              The original design, source code, interactive geospatial interface, curated dataset structure, and editorial content of HydStartupArena are the copyrighted work of <strong>Tech With Shaik (TWS)</strong>.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-pink-500" />
              4. Limitation of Liability & Governing Law
            </h3>
            <p>
              HydStartupArena and its operators shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use of this website, reliance on job listings, or interactions with third-party employers.
            </p>
            <p>
              These Terms shall be governed by and construed in accordance with the substantive laws of <strong>India</strong>. Any disputes arising in connection with this portal shall be subject to the exclusive jurisdiction of the competent courts in <strong>Hyderabad, Telangana, India</strong>.
            </p>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t dark:border-slate-800 border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/40 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            I Accept Terms
          </button>
        </div>

      </div>
    </div>
  );
}
