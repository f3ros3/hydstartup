import React from 'react';

export default function CharminarLogo({ className = "w-6 h-6 sm:w-8 sm:h-8" }) {
  return (
    <div className={`relative flex items-center justify-center ${className} select-none group`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Base Foundation */}
        <path
          d="M6 42H42V45H6V42Z"
          fill="currentColor"
          className="text-white/80 dark:text-emerald-400/90"
        />

        {/* Central Lower Grand Archway */}
        <path
          d="M16 42V28C16 23.5817 19.5817 20 24 20C28.4183 20 32 23.5817 32 28V42H16Z"
          fill="currentColor"
          className="text-white/95 dark:text-slate-900/95"
        />
        <path
          d="M19 42V31C19 28.2386 21.2386 26 24 26C26.7614 26 29 28.2386 29 31V42H19Z"
          fill="currentColor"
          className="text-emerald-950 dark:text-emerald-300"
        />

        {/* Main Central Block */}
        <rect
          x="12"
          y="18"
          width="24"
          height="8"
          rx="1"
          fill="currentColor"
          className="text-white/90 dark:text-slate-100"
        />

        {/* Upper Balcony & Gallery */}
        <path
          d="M10 18H38V16H10V18Z"
          fill="currentColor"
          className="text-emerald-200 dark:text-emerald-300"
        />
        <path
          d="M13 16V13C13 11.8954 13.8954 11 15 11H33C34.1046 11 35 11.8954 35 13V16H13Z"
          fill="currentColor"
          className="text-white dark:text-slate-200"
        />

        {/* 4 Iconic Minarets */}
        
        {/* Minaret 1 (Far Left) */}
        <rect x="7" y="10" width="4" height="32" rx="1" fill="currentColor" className="text-white dark:text-slate-100" />
        <rect x="6" y="24" width="6" height="2" rx="0.5" fill="currentColor" className="text-emerald-400" />
        <rect x="6" y="14" width="6" height="2" rx="0.5" fill="currentColor" className="text-emerald-400" />
        <path d="M7 10C7 7.5 9 6 9 6C9 6 11 7.5 11 10H7Z" fill="currentColor" className="text-emerald-300" />
        <circle cx="9" cy="4.5" r="1" fill="#34D399" className="animate-pulse" />

        {/* Minaret 2 (Inner Left) */}
        <rect x="14" y="8" width="3.5" height="10" rx="0.5" fill="currentColor" className="text-white/90 dark:text-slate-200" />
        <path d="M14 8C14 6 15.75 5 15.75 5C15.75 5 17.5 6 17.5 8H14Z" fill="currentColor" className="text-teal-300" />
        <circle cx="15.75" cy="3.5" r="0.8" fill="#2DD4BF" className="animate-pulse" />

        {/* Minaret 3 (Inner Right) */}
        <rect x="30.5" y="8" width="3.5" height="10" rx="0.5" fill="currentColor" className="text-white/90 dark:text-slate-200" />
        <path d="M30.5 8C30.5 6 32.25 5 32.25 5C32.25 5 34 6 34 8H30.5Z" fill="currentColor" className="text-teal-300" />
        <circle cx="32.25" cy="3.5" r="0.8" fill="#2DD4BF" className="animate-pulse" />

        {/* Minaret 4 (Far Right) */}
        <rect x="37" y="10" width="4" height="32" rx="1" fill="currentColor" className="text-white dark:text-slate-100" />
        <rect x="36" y="24" width="6" height="2" rx="0.5" fill="currentColor" className="text-emerald-400" />
        <rect x="36" y="14" width="6" height="2" rx="0.5" fill="currentColor" className="text-emerald-400" />
        <path d="M37 10C37 7.5 39 6 39 6C39 6 41 7.5 41 10H37Z" fill="currentColor" className="text-emerald-300" />
        <circle cx="39" cy="4.5" r="1" fill="#34D399" className="animate-pulse" />

        {/* Central Top Dome (Qutb Shahi Arch Dome) */}
        <path
          d="M20 11C20 8 24 5 24 5C24 5 28 8 28 11H20Z"
          fill="currentColor"
          className="text-emerald-400 dark:text-emerald-300"
        />
        <circle cx="24" cy="3" r="1.2" fill="#6EE7B7" className="animate-ping opacity-75" />
        <circle cx="24" cy="3" r="1.2" fill="#A7F3D0" />
      </svg>
    </div>
  );
}
