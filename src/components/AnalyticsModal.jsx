import React from 'react';
import { X, TrendingUp, Building2, Rocket, MapPin, DollarSign, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AnalyticsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#0F172A] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-[#131E35] to-slate-900 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">Hyderabad Startup Ecosystem Intelligence</h2>
              <p className="text-xs text-slate-400 mt-0.5">Geospatial data, funding benchmarks & hiring trends</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/20">
              <p className="text-slate-400 font-semibold text-[11px]">Total Tech Funding</p>
              <p className="text-xl font-extrabold text-emerald-400 mt-1 font-mono">$3.2 Billion+</p>
              <p className="text-[10px] text-slate-500 mt-1">Across 384+ deals</p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/20">
              <p className="text-slate-400 font-semibold text-[11px]">Global GCC Hubs</p>
              <p className="text-xl font-extrabold text-cyan-400 mt-1 font-mono">355+ Mega GCCs</p>
              <p className="text-[10px] text-slate-500 mt-1">Leading India in GCC growth</p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/20">
              <p className="text-slate-400 font-semibold text-[11px]">T-Hub Impact</p>
              <p className="text-xl font-extrabold text-purple-400 mt-1 font-mono">2,000+ Startups</p>
              <p className="text-[10px] text-slate-500 mt-1">World's largest innovation hub</p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/20">
              <p className="text-slate-400 font-semibold text-[11px]">Key Tech Clusters</p>
              <p className="text-xl font-extrabold text-amber-400 mt-1 font-mono">8 Corridors</p>
              <p className="text-[10px] text-slate-500 mt-1">HITEC, Raidurg, Gachibowli, etc.</p>
            </div>
          </div>

          {/* Section: Sector Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* High Growth Sectors */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Rocket className="w-4 h-4 text-emerald-400" />
                <span>Hyderabad Dominant Tech Pillars</span>
              </h4>
              
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-200">Enterprise SaaS & HRTech</p>
                    <p className="text-[11px] text-slate-400">Darwinbox, HighRadius, Zenoti, Keka HR</p>
                  </div>
                  <span className="text-emerald-400 font-bold text-xs">$5B+ Val</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-200">SpaceTech & DeepTech</p>
                    <p className="text-[11px] text-slate-400">Skyroot Aerospace, Dhruva Space, Marut Drones</p>
                  </div>
                  <span className="text-cyan-400 font-bold text-xs">Unicorn Status</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-200">Life Sciences & HealthTech AI</p>
                    <p className="text-[11px] text-slate-400">Novartis, Eli Lilly, Mapmygenome, Cotiviti</p>
                  </div>
                  <span className="text-rose-400 font-bold text-xs">Global Hub</span>
                </div>
              </div>
            </div>

            {/* Salary Benchmarks in Hyderabad */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Hyderabad Tech Compensation Ranges (2026)</span>
              </h4>

              <div className="space-y-2 font-mono">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60">
                  <span className="text-slate-300 font-sans">Generative AI / LLM Engineer (3-6y)</span>
                  <span className="text-emerald-400 font-bold">₹35 - ₹55 LPA</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60">
                  <span className="text-slate-300 font-sans">Full Stack / Frontend Lead (5-8y)</span>
                  <span className="text-emerald-400 font-bold">₹30 - ₹48 LPA</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60">
                  <span className="text-slate-300 font-sans">SpaceTech Avionics / Embedded (2-5y)</span>
                  <span className="text-cyan-400 font-bold">₹18 - ₹32 LPA</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60">
                  <span className="text-slate-300 font-sans">SaaS Product Manager (3-7y)</span>
                  <span className="text-purple-400 font-bold">₹24 - ₹42 LPA</span>
                </div>
              </div>
            </div>

          </div>

          {/* Micro-Hub Clusters Overview */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Hyderabad Geographical Clusters</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <p className="font-bold text-slate-200">T-Hub 2.0 / Raidurg</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Epicenter for SpaceTech, Web3, AI startups & early-stage innovators.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <p className="font-bold text-slate-200">HITEC City & Mindspace</p>
                <p className="text-[11px] text-slate-400 mt-0.5">SaaS unicorns, product giants (Uber, EA, Pega, Darwinbox, HighRadius).</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <p className="font-bold text-slate-200">Financial District (WaveRock)</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Mega FinTechs, Goldman Sachs, Arcesium, Salesforce, Eli Lilly.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Close Insights
          </button>
        </div>

      </div>
    </div>
  );
}
