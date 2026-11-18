import React, { useMemo } from 'react';
import { HYDERABAD_COMPANIES } from '../data/companies';
import { getCompanyLogoUrl } from './CompanyLogo';

// Exact 4-point sparkle + top-right mini-star icon matching crownzdesigns.me/links
function SparkleDivider() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-sky-400 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M 5.65 10.849 L 0.485 8.946 C 0.194 8.839 0 8.561 0 8.25 C 0 7.939 0.194 7.661 0.485 7.553 L 5.65 5.65 L 7.553 0.485 C 7.661 0.194 7.939 0 8.25 0 C 8.561 0 8.839 0.194 8.946 0.485 L 10.849 5.65 L 16.014 7.553 C 16.306 7.661 16.5 7.939 16.5 8.25 C 16.5 8.561 16.306 8.839 16.014 8.946 L 10.849 10.849 L 8.946 16.014 C 8.839 16.306 8.561 16.5 8.25 16.5 C 7.939 16.5 7.661 16.306 7.553 16.014 Z"
        transform="translate(2.25 5.25)"
      />
      <path d="M 16.5 1.5 L 16.5 6" />
      <path d="M 14.25 3.75 L 18.75 3.75" />
    </svg>
  );
}

export default function CompanyLogoRibbon({ onSelectCompany }) {
  const ribbonCompanies = useMemo(() => {
    const seen = new Set();
    const list = [];
    for (const company of HYDERABAD_COMPANIES) {
      if (!company?.id || seen.has(company.id)) continue;
      const logoUrl = getCompanyLogoUrl(company);
      if (!logoUrl) continue;
      seen.add(company.id);
      list.push({
        company,
        logoUrl,
        logoText: company.logoText || company.name.slice(0, 2).toUpperCase(),
        color: company.color || '#6366F1'
      });
    }
    return list;
  }, []);

  // Duplicate list twice for a seamless -50% infinite loop
  const trackItems = useMemo(
    () => [...ribbonCompanies, ...ribbonCompanies],
    [ribbonCompanies]
  );

  return (
    <section
      aria-label="Featured Hyderabad Startups and Tech Companies"
      className="company-ribbon-wrapper relative z-10 w-full my-4 sm:my-6 py-3.5 sm:py-4 border-y dark:border-purple-800/50 border-slate-200/90 dark:bg-[#090314]/75 bg-white/90"
    >
      <div className="company-ribbon-track flex items-center gap-6 sm:gap-8 w-max">
        {trackItems.map(({ company, logoUrl, logoText, color }, idx) => {
          const isDuplicate = idx >= ribbonCompanies.length;
          return (
            <React.Fragment key={`${company.id}-${idx}`}>
              <button
                type="button"
                tabIndex={isDuplicate ? -1 : 0}
                aria-hidden={isDuplicate ? 'true' : undefined}
                onClick={() => onSelectCompany && onSelectCompany(company)}
                title={`View ${company.name}`}
                className="group inline-flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-pointer bg-transparent border-0 p-0 focus:outline-none"
              >
                <span className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white shadow-sm border border-slate-200/80 dark:border-white/15 p-1 shrink-0 overflow-hidden transition-transform duration-200 group-hover:scale-110">
                  <img
                    src={logoUrl}
                    alt={company.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }
                    }}
                  />
                  <span
                    style={{ display: 'none', backgroundColor: color }}
                    className="w-full h-full items-center justify-center rounded-[inherit] text-[10px] font-black text-white"
                  >
                    {logoText}
                  </span>
                </span>

                <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] dark:text-slate-200 text-slate-800 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors whitespace-nowrap">
                  {company.name}
                </span>
              </button>

              <SparkleDivider />
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
