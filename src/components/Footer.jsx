import React from 'react';
import { InstagramIcon } from './Icons';
import { 
  Building2, 
  Briefcase, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Cookie, 
  Mail, 
  ExternalLink, 
  Sparkles, 
  Compass, 
  BarChart3, 
  Heart,
  Scale
} from 'lucide-react';
import CharminarLogo from './CharminarLogo';

export default function Footer({ 
  onOpenPrivacy, 
  onOpenTerms, 
  onOpenCookiePolicy, 
  onOpenCookieSettings,
  onOpenAnalytics,
  setViewMode
}) {
  return (
    <footer className="relative z-10 mt-14 bg-transparent dark:bg-slate-950/40 bg-white/40 backdrop-blur-md border-t dark:border-slate-800/60 border-slate-200/60 pt-12 pb-8 px-4 sm:px-8 text-xs dark:text-slate-400 text-slate-600 transition-colors" role="contentinfo">
      <div className="w-full max-w-7xl mx-auto space-y-10">
        
        {/* TOP ROW: Brand Column + Quick Nav + Legal & Compliance + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-left">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 flex items-center justify-center p-1.5 shadow-md shadow-emerald-500/20 text-white shrink-0">
                <CharminarLogo className="w-full h-full" />
              </div>
              <div>
                <h3 className="text-base font-black dark:text-white text-slate-950 tracking-tight">
                  HydStartup<span className="dark:text-emerald-400 text-orange-600">Arena</span>
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold -mt-0.5">
                  Hyderabad Tech Ecosystem Portal
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed dark:text-slate-300 text-slate-600 font-medium">
              Curated geospatial intelligence and real-time tech job discovery across HITEC City, Gachibowli, T-Hub, Madhapur, Financial District, and Hyderabad's booming startup ecosystem.
            </p>

            <div className="flex items-center gap-1.5 text-[11px] font-bold dark:text-emerald-400 text-orange-600">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Hyderabad, Telangana, India</span>
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider dark:text-white text-slate-900 border-b dark:border-slate-800 border-slate-200 pb-1.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-500" />
              <span>Explore Portal</span>
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button 
                  onClick={() => setViewMode?.('split')} 
                  className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Split Map &amp; Jobs View</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setViewMode?.('map')} 
                  className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Full Hyderabad Tech Corridor Map</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setViewMode?.('jobs')} 
                  className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Startup Jobs Board</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setViewMode?.('companies')} 
                  className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Company &amp; Unicorn Directory</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAnalytics} 
                  className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Ecosystem Insights &amp; Analytics</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Privacy Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider dark:text-white text-slate-900 border-b dark:border-slate-800 border-slate-200 pb-1.5 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-cyan-500" />
              <span>Legal &amp; Compliance</span>
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button 
                  onClick={onOpenPrivacy} 
                  className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Privacy Policy (DPDP / GDPR)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTerms} 
                  className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Terms and Conditions</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenCookiePolicy} 
                  className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Cookie className="w-3.5 h-3.5 text-amber-500" />
                  <span>Cookie Policy</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenCookieSettings} 
                  className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Cookie Preferences &amp; Consent</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Business Operator & Community */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider dark:text-white text-slate-900 border-b dark:border-slate-800 border-slate-200 pb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-pink-500" />
              <span>Operated By</span>
            </h4>
            
            <div className="space-y-1 text-xs">
              <p className="font-extrabold dark:text-white text-slate-900">
                Tech With Shaik (TWS)
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Empowering India's Tech Professionals &amp; Startup Builders
              </p>
            </div>

            {/* Official Instagram Button */}
            <div>
              <a
                href="https://www.instagram.com/techwithshaik/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white font-black text-xs shadow-md shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label="Visit Tech With Shaik on Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>@techwithshaik</span>
              </a>
            </div>

            {/* Email Contact */}
            <div className="pt-1">
              <a 
                href="mailto:contact@hydstartup.online" 
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors"
                aria-label="Email contact"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-500" />
                <span>contact@hydstartup.online</span>
              </a>
            </div>
          </div>

        </div>

        {/* MIDDLE ROW: Fair Use & Trademark Disclaimer Notice */}
        <div className="p-4 rounded-2xl dark:bg-slate-900/60 bg-slate-100/70 border dark:border-slate-800/80 border-slate-200/80 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed text-center sm:text-left space-y-1">
          <p>
            <strong>Trademark &amp; Nominative Fair Use Disclaimer:</strong> All company names, brand logos, trademarks, and registered trademarks displayed on HydStartupArena are the property of their respective owners. All company, product, and service names used on this website are for descriptive and identification purposes only. Use of these names, logos, and brands does not imply endorsement or affiliation.
          </p>
          <p>
            <strong>Job Opportunity Routing:</strong> All job applications are submitted directly on the official hiring portals of the respective employers. HydStartupArena does not collect applicant resumes or process job applications.
          </p>
        </div>

        {/* BOTTOM ROW: Copyright & Made with Heart */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t dark:border-slate-800/60 border-slate-200/60 text-[11px] text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="dark:text-white text-slate-900">HydStartupArena</strong>. All rights reserved. Created by <span className="font-extrabold dark:text-emerald-400 text-orange-600">Tech With Shaik</span>.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with passion for the Hyderabad Tech Ecosystem</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
