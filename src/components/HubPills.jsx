import React from 'react';
import { HYDERABAD_HUBS } from '../data/hubs';
import { MapPin, Sparkles } from 'lucide-react';

export default function HubPills({ selectedHub, onSelectHub, companyCountsByHub }) {
  return (
    <div className="w-full bg-transparent dark:bg-slate-950/15 bg-white/15 backdrop-blur-[3px] border-b dark:border-slate-800/40 border-slate-200/40 py-2.5 px-4 sm:px-6 lg:px-10 overflow-x-auto no-scrollbar transition-colors">
      <div className="w-full flex items-center justify-between gap-2 min-w-max">
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold dark:text-slate-200 text-slate-800 flex items-center gap-1.5 mr-2 shrink-0 drop-shadow-sm">
            <MapPin className="w-4 h-4 dark:text-emerald-400 text-orange-600" />
            <span>Hyderabad Tech Hubs:</span>
          </span>

          {HYDERABAD_HUBS.map((hub) => {
            const isSelected = selectedHub === hub.id;
            const count = companyCountsByHub[hub.id] || 0;

            return (
              <button
                key={hub.id}
                onClick={() => onSelectHub(hub)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'dark:bg-emerald-500 dark:text-slate-950 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-black shadow-lg shadow-orange-500/20 ring-2 ring-orange-400/40'
                    : 'dark:bg-slate-900/60 dark:hover:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700/60 bg-white/70 hover:bg-white text-slate-800 border border-slate-300/80 shadow-sm'
                }`}
              >
                <span>{hub.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? 'bg-black/20 text-white font-black'
                      : 'dark:bg-slate-800 dark:text-slate-300 bg-slate-200 text-slate-700 font-bold'
                  }`}
                >
                  {hub.id === 'all' ? Object.values(companyCountsByHub).reduce((a, b) => a + b, 0) : count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden 2xl:flex items-center gap-1.5 text-xs dark:text-slate-300 text-slate-700 font-mono font-semibold drop-shadow-sm">
          <span className="w-2 h-2 rounded-full dark:bg-emerald-400 bg-orange-500 animate-pulse"></span>
          <span>Click any hub to zoom camera</span>
        </div>

      </div>
    </div>
  );
}
