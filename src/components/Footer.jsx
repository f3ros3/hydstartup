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
  Scale,
  BookOpen,
  Layers,
  PlusCircle,
  Flag,
  HelpCircle
} from 'lucide-react';
import CharminarLogo from './CharminarLogo';

export default function Footer({ 
  onOpenPrivacy, 
  onOpenTerms, 
  onOpenCookiePolicy, 
  onOpenCookieSettings,
  onOpenAnalytics,
  onOpenAbout,
  onOpenContact,
  onOpenSubmit,
  onOpenReport,
  setViewMode
}) {
  return (
    <footer className="relative z-10 mt-14 bg-transparent dark:bg-slate-950/40 bg-white/40 backdrop-blur-md border-t dark:border-slate-800/60 border-slate-200/60 pt-12 pb-8 px-4 sm:px-8 text-xs dark:text-slate-400 text-slate-600 transition-colors" role="contentinfo">
      <div className="w-full max-w-7xl mx-auto space-y-10">
        
        {/* TOP ROW: Brand Column + Navigation + Community/Trust + Legal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-left">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 flex items-center justify-center p-1.5 shadow-md shadow-emerald-500/20 text-white shrink-0">
                <CharminarLogo className="w-full h-full" />
              </div>
              <div>
                <span className="text-base font-black dark:text-white text-slate-950 tracking-tight">
                  HydStartup<span className="dark:text-emerald-400 text-orange-600">Arena</span>
                </span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold -mt-0.5">
                  Hyderabad Tech Ecosystem Portal
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed dark:text-slate-300 text-slate-600 font-medium">
              Real-time, verified geospatial intelligence and tech job discovery across HITEC City, Gachibowli, T-Hub Phase 2, Madhapur, Financial District, and Greater Hyderabad.
            </p>

            <div className="space-y-1 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold dark:text-emerald-400 text-emerald-600">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                Last Verified: October 2026 • 150+ Companies
              </div>
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider dark:text-white text-slate-900 border-b dark:border-slate-800 border-slate-200 pb-1.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-500" />
              <span>Explore Portal</span>
            </h3>
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
                  <span>Full Tech Corridor Map</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setViewMode?.('jobs')} 
                  className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Curated Jobs Board</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setViewMode?.('companies')} 
                  className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Startups &amp; Unicorns Directory</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setViewMode?.('articles')} 
                  className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <BookOpen className="w-3 h-3 text-emerald-500" />
                  <span>Ecosystem Research &amp; Guides</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setViewMode?.('sectors')} 
                  className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Layers className="w-3 h-3 text-emerald-500" />
                  <span>Industry Sectors &amp; Clusters</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAnalytics} 
                  className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <BarChart3 className="w-3 h-3 text-cyan-500" />
                  <span>Ecosystem Insights &amp; Analytics</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Community */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider dark:text-white text-slate-900 border-b dark:border-slate-800 border-slate-200 pb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Trust &amp; Community</span>
            </h3>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button 
                  onClick={onOpenAbout} 
                  className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>About Us &amp; Methodology</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenContact} 
                  className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Mail className="w-3 h-3" />
                  <span>Contact Editorial Team</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenSubmit} 
                  className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left text-emerald-600 dark:text-emerald-400 font-bold"
                >
                  <PlusCircle className="w-3 h-3" />
                  <span>+ Submit a Startup / Job</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenReport?.('')} 
                  className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left text-amber-600 dark:text-amber-400"
                >
                  <Flag className="w-3 h-3" />
                  <span>Report Error / Suggest Edit</span>
                </button>
              </li>
              <li className="pt-1">
                <a 
                  href="mailto:techwithshaik2@gmail.com"
                  className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors block text-[11px]"
                >
                  techwithshaik2@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Compliance */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider dark:text-white text-slate-900 border-b dark:border-slate-800 border-slate-200 pb-1.5 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-cyan-500" />
              <span>Legal &amp; Policies</span>
            </h3>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button 
                  onClick={onOpenPrivacy} 
                  className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <FileText className="w-3 h-3" />
                  <span>Privacy Policy (DPDP / GDPR)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTerms} 
                  className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Scale className="w-3 h-3" />
                  <span>Terms &amp; Conditions</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenCookiePolicy} 
                  className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Cookie className="w-3 h-3" />
                  <span>Cookie Policy &amp; Consent</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenCookieSettings} 
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left text-[11px]"
                >
                  <span>Manage Cookie Preferences</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* MIDDLE: Nominative Fair Use & Disclaimer Notice */}
        <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 space-y-1.5">
          <p>
            <strong>Editorial &amp; Trademark Disclaimer:</strong> All company names, logos, trademarks, and registered trademarks displayed on HydStartup Portal belong to their respective owners. Their use on this portal is solely for editorial reference, nominative identification, and community job discovery purposes, and does not imply endorsement, affiliation, or sponsorship.
          </p>
          <p>
            Job application links redirect directly to verified ATS endpoints and authentic company career pages. HydStartup Portal does not charge candidates or act as a recruitment agency.
          </p>
        </div>

        {/* BOTTOM ROW: Copyright & Publisher Credits */}
        <div className="pt-4 border-t dark:border-slate-800/60 border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} <strong>HydStartup Portal</strong>. Published by <strong>Tech With Shaik (TWS)</strong>. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/techwithshaik" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-pink-500 transition-colors flex items-center gap-1 font-semibold"
              title="Follow Tech With Shaik on Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>@techwithshaik</span>
            </a>
            <span>•</span>
            <span>Hyderabad, Telangana</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
