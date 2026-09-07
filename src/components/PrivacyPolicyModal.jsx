import React from 'react';
import { X, ShieldCheck, Lock, Eye, Database, Server, UserCheck, Mail, Building2, ExternalLink } from 'lucide-react';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 select-none" role="dialog" aria-modal="true" aria-labelledby="privacy-policy-title">
      
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
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="privacy-policy-title" className="text-lg sm:text-xl font-black dark:text-white text-slate-900">
                Privacy Policy
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                Last Updated: September 2026 • Compliant with DPDP Act 2023 & GDPR
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Privacy Policy Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Policy Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-xs sm:text-[13px] leading-relaxed dark:text-slate-300 text-slate-700">
          
          {/* Section 1 */}
          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" />
              1. Overview & Data Minimization Commitment
            </h3>
            <p>
              Welcome to <strong>HydStartupArena</strong> (accessible at <a href="https://hydstartup.online" className="text-emerald-500 underline">https://hydstartup.online</a>), operated by <strong>Tech With Shaik (TWS)</strong> based in Hyderabad, Telangana, India. We are committed to protecting your privacy and practicing strict <strong>data minimization</strong>. We only collect the minimal information necessary to deliver job discovery and geospatial mapping services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-500" />
              2. Information We Process
            </h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Client-Side Local Storage:</strong> Your interface preferences (such as dark/light theme choice, saved bookmark IDs, and cookie consent status) are stored strictly within your browser's local storage (<code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono">localStorage</code>). This data remains on your device and is never uploaded to any remote server.
              </li>
              <li>
                <strong>Email Address (Optional Newsletter):</strong> If you voluntarily subscribe to our Hyderabad Tech Digest, your email is stored securely to send you weekly job and ecosystem updates. You may unsubscribe at any time with a single click.
              </li>
              <li>
                <strong>Automated Technical Telemetry:</strong> Like most web services, our servers and third-party delivery networks (such as GitHub Pages and CDNs) may log standard connection information such as IP address, browser type, and access timestamps for diagnostic and security purposes.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-purple-500" />
              3. Third-Party Services & Advertising (Google AdSense)
            </h3>
            <p>
              We utilize select third-party services to enhance portal functionality:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Google AdSense:</strong> We display advertisements served by Google AdSense (<code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono">ca-pub-4703620599888014</code>). Google uses cookies to serve ads based on your prior visits to this and other websites. You can customize or opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-500 underline">Google Ads Settings</a>.
              </li>
              <li>
                <strong>OpenStreetMap:</strong> Map tiles are loaded from OpenStreetMap infrastructure. No personal identifiers are shared with map tile servers.
              </li>
              <li>
                <strong>External Employer Career Portals:</strong> When clicking "Apply" or "Careers", you are redirected directly to the official hiring portal or ATS (e.g., Greenhouse, Lever, Workday) of the respective company. Those external sites operate under their own independent privacy policies.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-pink-500" />
              4. Your Rights Under DPDP Act 2023 & GDPR
            </h3>
            <p>
              Under applicable data protection legislation (including India's <em>Digital Personal Data Protection Act, 2023</em> and the <em>General Data Protection Regulation</em>), you possess the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access a summary of personal data processed about you.</li>
              <li>Request correction, completion, or erasure of your personal data.</li>
              <li>Withdraw consent at any time (e.g., for newsletter emails or non-essential cookies).</li>
              <li>Seek grievance redressal regarding data handling practices.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500" />
              5. Data Protection Officer & Contact Information
            </h3>
            <p>
              For privacy-related inquiries, data requests, or grievance redressal, please contact our Data Protection representative:
            </p>
            <div className="p-3.5 rounded-2xl dark:bg-slate-900 bg-slate-50 border dark:border-slate-800 border-slate-200 text-xs space-y-1">
              <p><strong>Entity:</strong> Tech With Shaik (TWS) — HydStartupArena</p>
              <p><strong>Location:</strong> Hyderabad, Telangana, India - 500081</p>
              <p><strong>Email:</strong> <a href="mailto:contact@hydstartup.online" className="text-emerald-500 font-bold underline">contact@hydstartup.online</a></p>
              <p><strong>Social:</strong> <a href="https://www.instagram.com/techwithshaik/" target="_blank" rel="noopener noreferrer" className="text-purple-500 font-bold underline">@techwithshaik</a></p>
            </div>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t dark:border-slate-800 border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/40 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Close & Acknowledge
          </button>
        </div>

      </div>
    </div>
  );
}
