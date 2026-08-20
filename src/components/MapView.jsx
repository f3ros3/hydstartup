import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  ExternalLink, 
  Mail, 
  ChevronRight, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { LinkedInIcon } from './Icons';
import CompanyLogo, { getCompanyLogoUrl } from './CompanyLogo';
import AnimatedApplyButton from './AnimatedApplyButton';

// Controller component to smoothly fly map and automatically handle container resizing
function MapController({ targetCenter, targetZoom, selectedCompany }) {
  const map = useMap();

  useEffect(() => {
    const handleResize = () => {
      map.invalidateSize();
    };

    window.addEventListener('resize', handleResize);
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [map]);

  useEffect(() => {
    if (selectedCompany && selectedCompany.coordinates) {
      map.flyTo(selectedCompany.coordinates, 16, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    } else if (targetCenter) {
      map.flyTo(targetCenter, targetZoom || 13, {
        duration: 1.0,
        easeLinearity: 0.25
      });
    }
  }, [targetCenter, targetZoom, selectedCompany, map]);

  return null;
}

// Generate custom Leaflet DivIcon with Real Company Logo
function createCustomMarkerIcon(company, isSelected) {
  const color = company.color || '#10B981';
  const logoText = company.logoText || company.name.substring(0, 2).toUpperCase();
  const jobsCount = company.openRolesCount || 0;
  const logoUrl = getCompanyLogoUrl(company);

  const html = `
    <div class="relative group cursor-pointer" style="transform: translate(-50%, -50%);">
      ${company.isHiring ? `<div class="absolute -inset-1.5 rounded-2xl bg-[${color}]/40 animate-ping opacity-75"></div>` : ''}
      <div class="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-white border-2 shadow-2xl transition-all duration-300 ${
        isSelected
          ? 'scale-125 ring-4 ring-emerald-400 border-emerald-500 z-50 shadow-emerald-500/60'
          : 'border-slate-800 hover:scale-115 hover:border-emerald-400 shadow-black/90'
      }" style="border-color: ${isSelected ? '#10B981' : color};">
        
        ${
          logoUrl
            ? `<img 
                src="${logoUrl}" 
                alt="${company.name}" 
                class="w-6 h-6 object-contain rounded-md"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
              />
              <span class="text-xs font-black tracking-tighter" style="display:none; color: ${color};">${logoText}</span>`
            : `<span class="text-xs font-black tracking-tighter" style="color: ${color};">${logoText}</span>`
        }

        ${
          jobsCount > 0
            ? `<span class="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-[#0B0F19] shadow-md">
                ${jobsCount}
              </span>`
            : ''
        }
      </div>
      <div class="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0B0F19]/95 text-slate-100 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl z-50">
        ${company.name}
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: html,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -24]
  });
}

export default function MapView({
  companies,
  selectedCompany,
  onSelectCompany,
  onSelectJobForCompany,
  onOpenCompanyDetails,
  activeHubCenter,
  activeHubZoom,
  isFullView = false
}) {
  const defaultCenter = [17.438, 78.375]; // HITEC City / Raidurg core
  const markerRefs = useRef({});

  useEffect(() => {
    if (selectedCompany && markerRefs.current[selectedCompany.id]) {
      markerRefs.current[selectedCompany.id].openPopup();
    }
  }, [selectedCompany]);

  return (
    <div className={`relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-3xl overflow-hidden border dark:border-slate-800 border-slate-200/90 shadow-2xl dark:bg-[#090D16] bg-slate-50 transition-colors`}>
      
      {/* Map Header Floating Overlay */}
      <div className="absolute top-3 left-3 z-[1000] pointer-events-auto dark:bg-[#0B0F19]/90 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border dark:border-slate-800/90 border-slate-200 shadow-xl flex items-center gap-2 text-xs">
        <span className="w-2.5 h-2.5 rounded-full dark:bg-emerald-400 bg-orange-500 animate-pulse"></span>
        <span className="font-bold dark:text-slate-200 text-slate-800">Hyderabad Tech Corridor</span>
        <span className="text-[10px] dark:text-slate-400 text-slate-500 font-mono">({companies.length} Mapped)</span>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        {/* CartoDB Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        <MapController
          targetCenter={activeHubCenter}
          targetZoom={activeHubZoom}
          selectedCompany={selectedCompany}
        />

        {companies.map((company) => {
          if (!company.coordinates || company.coordinates.length !== 2) return null;
          const isSelected = selectedCompany?.id === company.id;

          return (
            <Marker
              key={company.id}
              position={company.coordinates}
              icon={createCustomMarkerIcon(company, isSelected)}
              ref={(ref) => {
                if (ref) markerRefs.current[company.id] = ref;
              }}
              eventHandlers={{
                click: () => onSelectCompany(company)
              }}
            >
              <Popup className="custom-popup">
                <div className="w-72 sm:w-80 p-1 font-sans dark:text-slate-100 text-slate-900">
                  
                  {/* Popup Header with Company Logo */}
                  <div className="flex items-start justify-between gap-3 border-b dark:border-slate-800 border-slate-200 pb-2.5 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <CompanyLogo company={company} size="sm" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-sm dark:text-white text-slate-900 tracking-tight">{company.name}</h4>
                          {company.isStartup && (
                            <span className="text-[9px] px-1.5 py-0.2 dark:bg-emerald-500/20 dark:text-emerald-300 bg-orange-500/20 text-orange-700 rounded font-bold border dark:border-emerald-500/30 border-orange-500/30">
                              Startup
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] dark:text-slate-400 text-slate-500">{company.category}</p>
                      </div>
                    </div>

                    <span
                      className="px-2 py-0.5 text-[10px] font-bold rounded-md shrink-0"
                      style={{
                        backgroundColor: `${company.color}20`,
                        color: company.color,
                        border: `1px solid ${company.color}40`
                      }}
                    >
                      {company.stage || 'Enterprise'}
                    </span>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-1.5 text-[11px] dark:text-slate-300 text-slate-600 mb-2.5">
                    <MapPin className="w-3.5 h-3.5 dark:text-emerald-400 text-orange-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{company.address || company.area}</span>
                  </div>

                  {/* Tech Stack Pills */}
                  {company.techStack && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {company.techStack.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded dark:bg-slate-800 dark:text-slate-300 bg-slate-100 text-slate-700 font-mono">
                          {tech}
                        </span>
                      ))}
                      {company.techStack.length > 4 && (
                        <span className="text-[10px] px-1 py-0.5 rounded dark:bg-slate-800 dark:text-slate-400 bg-slate-100 text-slate-500">
                          +{company.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-2 pt-1 border-t dark:border-slate-800/80 border-slate-200/80">
                    <div className="w-full flex justify-center">
                      <AnimatedApplyButton
                        onClick={() => onSelectJobForCompany(company)}
                        size="sm"
                        className="w-full justify-center"
                        color="#059669"
                      >
                        Explore Open Jobs ({company.openRolesCount || 0})
                      </AnimatedApplyButton>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => onOpenCompanyDetails(company)}
                        className="py-1.5 px-2 text-center rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold border dark:border-slate-700 border-slate-200 transition-colors cursor-pointer"
                      >
                        Company Profile
                      </button>

                      {company.careerUrl && (
                        <a
                          href={company.careerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-2 text-center rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-cyan-400 bg-slate-100 hover:bg-slate-200 text-purple-600 text-[11px] font-semibold border dark:border-slate-700 border-slate-200 flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>Careers</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
