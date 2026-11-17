import React from 'react';
import { InstagramIcon } from './Icons';
import { 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Cookie, 
  Mail, 
  Compass, 
  BarChart3, 
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
    <footer className="relative z-10 mt-14 bg-transparent border-t dark:border-purple-500/25 border-slate-200/80 pt-12 pb-8 px-4 sm:px-8 text-xs dark:text-slate-200 text-slate-700 transition-colors" role="contentinfo">
      <div className="w-full max-w-7xl mx-auto space-y-10">
        
        {/* TOP ROW: Brand Column + Navigation + Community/Trust + Legal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-left">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-violet-700 flex items-center justify-center p-1.5 shadow-md shadow-purple-500/25 text-white shrink-0">
                <CharminarLogo className="w-full h-full" />
              </div>
              <div>
                <span className="text-base font-black dark:text-white text-slate-950 tracking-tight">
                  HydStartup<span className="dark:text-purple-300 text-orange-600">Arena</span>
                </span>
                <p className="text-[10px] dark:text-purple-200/90 text-slate-600 font-bold -mt-0.5">
                  Hyderabad Tech Ecosystem Portal
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed dark:text-slate-200 text-slate-700 font-medium">
              Real-time, verified geospatial intelligence and tech job discovery across HITEC City, Gachibowli, T-Hub Phase 2, Madhapur, Financial District, and Greater Hyderabad.
            </p>

            <div className="space-y-1 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold dark:text-purple-200 text-orange-600">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="text-[11px] dark:text-slate-300 text-slate-600 font-medium">
                Verified Directory • 100+ Companies
              </div>
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider dark:text-white text-slate-900 border-b dark:border-purple-400/30 border-slate-200 pb-1.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 dark:text-purple-300 text-orange-600" />
              <span>Explore Portal</span>
            </h3>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button 
                  onClick={() => setViewMode?.('split')} 
                  className="dark:text-slate-200 dark:hover:text-white hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Split Map &amp; Startups View</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setViewMode?.('map')} 
                  className="dark:text-slate-200 dark:hover:text-white hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Full Tech Corridor Map</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setViewMode?.('jobs')} 
                  className="dark:text-slate-200 dark:hover:text-white hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Curated Jobs Board</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setViewMode?.('companies')} 
                  className="dark:text-slate-200 dark:hover:text-white hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Startups &amp; Unicorns Directory</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setViewMode?.('articles')} 
                  className="dark:text-slate-200 dark:hover:text-white hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <BookOpen className="w-3 h-3 dark:text-purple-300 text-orange-600" />
                  <span>Ecosystem Research &amp; Guides</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setViewMode?.('sectors')} 
                  className="dark:text-slate-200 dark:hover:text-white hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Layers className="w-3 h-3 dark:text-purple-300 text-orange-600" />
                  <span>Industry Sectors &amp; Clusters</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAnalytics} 
                  className="dark:text-slate-200 dark:hover:text-white hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <BarChart3 className="w-3 h-3 dark:text-fuchsia-300 text-purple-600" />
                  <span>Ecosystem Insights &amp; Analytics</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Community */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider dark:text-white text-slate-900 border-b dark:border-purple-400/30 border-slate-200 pb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 dark:text-purple-300 text-orange-600" />
              <span>Trust &amp; Community</span>
            </h3>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button 
                  onClick={onOpenAbout} 
                  className="dark:text-slate-200 dark:hover:text-white hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>About Us &amp; Methodology</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenContact} 
                  className="dark:text-slate-200 dark:hover:text-white hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Mail className="w-3 h-3" />
                  <span>Contact Editorial Team</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenSubmit} 
                  className="dark:text-purple-200 dark:hover:text-white text-orange-600 hover:underline transition-colors flex items-center gap-1.5 cursor-pointer text-left font-bold"
                >
                  <PlusCircle className="w-3 h-3" />
                  <span>+ Submit a Startup / Job</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenReport?.('')} 
                  className="dark:text-amber-200 dark:hover:text-amber-100 text-amber-700 hover:underline transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Flag className="w-3 h-3" />
                  <span>Report Error / Suggest Edit</span>
                </button>
              </li>
              <li className="pt-1">
                <a 
                  href="mailto:techwithshaik2@gmail.com"
                  className="dark:text-slate-200 dark:hover:text-white text-slate-700 hover:text-orange-600 transition-colors block text-[11px] font-semibold"
                >
                  techwithshaik2@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Compliance */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider dark:text-white text-slate-900 border-b dark:border-purple-400/30 border-slate-200 pb-1.5 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 dark:text-fuchsia-300 text-purple-600" />
              <span>Legal &amp; Policies</span>
            </h3>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button 
                  onClick={onOpenPrivacy} 
                  className="dark:text-slate-200 dark:hover:text-white hover:text-purple-600 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <FileText className="w-3 h-3" />
                  <span>Privacy Policy (DPDP / GDPR)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTerms} 
                  className="dark:text-slate-200 dark:hover:text-white hover:text-purple-600 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Scale className="w-3 h-3" />
                  <span>Terms &amp; Conditions</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenCookiePolicy} 
                  className="dark:text-slate-200 dark:hover:text-white hover:text-purple-600 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Cookie className="w-3 h-3" />
                  <span>Cookie Policy &amp; Consent</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenCookieSettings} 
                  className="dark:text-slate-300 dark:hover:text-white text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer text-left text-[11px]"
                >
                  <span>Manage Cookie Preferences</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* MIDDLE: Nominative Fair Use & Disclaimer Notice */}
        <div className="p-4 rounded-2xl dark:bg-black/45 bg-white/80 border dark:border-purple-400/25 border-slate-200 text-[11px] leading-relaxed dark:text-slate-200 text-slate-700 space-y-1.5 shadow-sm">
          <p>
            <strong className="dark:text-white text-slate-900">Editorial &amp; Trademark Disclaimer:</strong> All company names, logos, trademarks, and registered trademarks displayed on HydStartup Portal belong to their respective owners. Their use on this portal is solely for editorial reference, nominative identification, and community job discovery purposes, and does not imply endorsement, affiliation, or sponsorship.
          </p>
          <p>
            Job application links redirect directly to verified ATS endpoints and authentic company career pages. HydStartup Portal does not charge candidates or act as a recruitment agency.
          </p>
        </div>

        {/* BOTTOM ROW: Copyright & Animated Instagram Button */}
        <div className="pt-4 border-t dark:border-purple-400/25 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-semibold dark:text-slate-200 text-slate-700">
          <div>
            &copy; {new Date().getFullYear()} <strong className="dark:text-white text-slate-900">HydStartup Portal</strong>. All rights reserved. • Hyderabad, Telangana
          </div>

          <a
            href="https://www.instagram.com/@techwithshaik"
            target="_blank"
            rel="noopener noreferrer"
            className="tws-instagram-btn"
            title="Visit Tech With Shaik on Instagram"
            aria-label="created by Tech With Shaik | TWS on Instagram"
          >
            <InstagramIcon className="w-[18px] h-[18px] shrink-0" />
            <span>created by Tech With Shaik | TWS</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
