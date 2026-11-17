import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  ExternalLink
} from 'lucide-react';
import CompanyLogo, { getCompanyLogoUrl } from './CompanyLogo';

const TECH_HOTSPOTS = [
  { name: 'HITEC City & Mindspace', center: [17.4475, 78.3785], radius: 850, color: '#a855f7' },
  { name: 'T-Hub 2.0 / Knowledge City', center: [17.4338, 78.3756], radius: 650, color: '#c026d3' },
  { name: 'Gachibowli Corridor', center: [17.4401, 78.3489], radius: 800, color: '#9333ea' },
  { name: 'Financial District', center: [17.4172, 78.3446], radius: 850, color: '#7e22ce' },
  { name: 'Madhapur & Durgam Cheruvu', center: [17.4375, 78.3888], radius: 650, color: '#d946ef' }
];

// Controller component to smoothly fly map, draw canvas hotspots, and handle container resizing (debounced)
function MapController({ targetCenter, targetZoom, selectedCompany }) {
  const map = useMap();

  useEffect(() => {
    const hotspotLayers = TECH_HOTSPOTS.flatMap((spot) => [
      L.circle(spot.center, {
        radius: spot.radius,
        color: spot.color,
        weight: 1.5,
        opacity: 0.45,
        fillColor: spot.color,
        fillOpacity: 0.12,
        interactive: false
      }),
      L.circle(spot.center, {
        radius: Math.round(spot.radius * 0.45),
        color: spot.color,
        weight: 1,
        opacity: 0.65,
        fillColor: spot.color,
        fillOpacity: 0.2,
        interactive: false
      })
    ]);

    hotspotLayers.forEach((layer) => layer.addTo(map));

    return () => {
      hotspotLayers.forEach((layer) => map.removeLayer(layer));
    };
  }, [map]);

  useEffect(() => {
    let debounceTimer = null;
    const handleResize = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        map.invalidateSize();
      }, 120);
    };

    window.addEventListener('resize', handleResize);
    const initTimer = setTimeout(() => map.invalidateSize(), 100);

    let resizeObserver;
    const container = map.getContainer();
    if (typeof ResizeObserver !== 'undefined' && container) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(initTimer);
      if (debounceTimer) clearTimeout(debounceTimer);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [map]);

  useEffect(() => {
    if (selectedCompany && selectedCompany.coordinates) {
      map.flyTo(selectedCompany.coordinates, 16, {
        duration: 1.0,
        easeLinearity: 0.25
      });
    } else if (targetCenter) {
      map.flyTo(targetCenter, targetZoom || 13, {
        duration: 0.9,
        easeLinearity: 0.25
      });
    }
  }, [targetCenter, targetZoom, selectedCompany, map]);

  return null;
}

// Map Click Listener to reset search and selections on clicking open space
function MapEventsHandler({ onResetSearch }) {
  useMapEvents({
    click: () => {
      if (onResetSearch) {
        onResetSearch();
      }
    }
  });
  return null;
}

// Generate custom Leaflet DivIcon with Real Company Logo (Zero idle GPU animations)
function createCustomMarkerIcon(company, isSelected) {
  const color = company.color || '#10B981';
  const logoText = company.logoText || company.name.substring(0, 2).toUpperCase();
  const jobsCount = company.openRolesCount || 0;
  const logoUrl = getCompanyLogoUrl(company);

  const html = `
    <div class="relative group cursor-pointer select-none" style="transform: translate(-50%, -50%);">
      <div class="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border-2 shadow-lg transition-transform duration-150 ${
        isSelected
          ? 'scale-125 ring-2 ring-emerald-400 border-emerald-500 z-50 shadow-emerald-500/40'
          : 'border-slate-800 hover:scale-110 shadow-black/50'
      }" style="border-color: ${isSelected ? '#10B981' : color};">
        
        ${
          logoUrl
            ? `<img 
                src="${logoUrl}" 
                alt="${company.name}" 
                class="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-md"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                loading="lazy"
              />
              <span class="text-[11px] font-black tracking-tighter" style="display:none; color: ${color};">${logoText}</span>`
            : `<span class="text-[11px] font-black tracking-tighter" style="color: ${color};">${logoText}</span>`
        }

        ${
          jobsCount > 0
            ? `<span class="absolute -top-1.5 -right-1.5 bg-purple-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full border-2 border-[#090314] shadow-sm">
                ${jobsCount}
              </span>`
            : ''
        }
      </div>
      <div class="hidden sm:block absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0B0F19]/95 text-slate-100 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-50">
        ${company.name}
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
}

function CompanyPopupContent({
  company,
  careerUrl,
  onSelectJobForCompany,
  onOpenCompanyDetails
}) {
  return (
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

      {/* Perfectly Aligned Actions Section */}
      <div className="space-y-2 pt-2 border-t dark:border-slate-800/80 border-slate-200/80">
        <a
          href={careerUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            onSelectJobForCompany?.(company);
          }}
          className="w-full h-9 px-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 !text-white font-black text-xs flex items-center justify-between shadow-md shadow-emerald-500/25 transition-colors cursor-pointer no-underline group"
          style={{ color: '#ffffff' }}
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-white shrink-0" />
            <span className="!text-white font-extrabold tracking-tight">Explore Open Jobs ({company.openRolesCount || 0})</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenCompanyDetails(company);
            }}
            className="flex-1 h-8 px-3 rounded-lg dark:bg-slate-800/90 dark:hover:bg-slate-700/90 dark:text-slate-100 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border dark:border-slate-700/80 border-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Building2 className="w-3.5 h-3.5 dark:text-slate-300 text-slate-600" />
            <span>Profile</span>
          </button>

          <a
            href={careerUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 h-8 px-3 rounded-lg dark:bg-cyan-500/15 dark:hover:bg-cyan-500/25 dark:text-cyan-300 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border dark:border-cyan-500/30 border-purple-200 flex items-center justify-center gap-1.5 transition-colors no-underline cursor-pointer shadow-sm"
          >
            <span>Careers</span>
            <ExternalLink className="w-3 h-3 dark:text-cyan-300 text-purple-600" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Clustered Markers Layer powered by leaflet.markercluster
function ClusteredMarkers({
  companies,
  selectedCompany,
  onSelectCompany,
  onSelectJobForCompany,
  onOpenCompanyDetails
}) {
  const map = useMap();
  const clusterGroupRef = useRef(null);
  const markerMapRef = useRef({});
  const popupRootsRef = useRef([]);

  const callbacksRef = useRef({
    onSelectCompany,
    onSelectJobForCompany,
    onOpenCompanyDetails
  });
  callbacksRef.current = {
    onSelectCompany,
    onSelectJobForCompany,
    onOpenCompanyDetails
  };

  useEffect(() => {
    const clusterGroup = L.markerClusterGroup({
      maxClusterRadius: 48,
      chunkedLoading: true,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      removeOutsideVisibleBounds: true,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        return L.divIcon({
          html: `<div class="hyd-cluster-badge">${count}</div>`,
          className: 'custom-marker-cluster',
          iconSize: L.point(42, 42)
        });
      }
    });

    clusterGroupRef.current = clusterGroup;
    map.addLayer(clusterGroup);

    return () => {
      popupRootsRef.current.forEach((root) => {
        try {
          root.unmount();
        } catch {}
      });
      popupRootsRef.current = [];
      map.removeLayer(clusterGroup);
      clusterGroupRef.current = null;
      markerMapRef.current = {};
    };
  }, [map]);

  // Rebuild clustered markers only when filtered companies list changes
  useEffect(() => {
    const clusterGroup = clusterGroupRef.current;
    if (!clusterGroup) return;

    clusterGroup.clearLayers();
    popupRootsRef.current.forEach((root) => {
      try {
        root.unmount();
      } catch {}
    });
    popupRootsRef.current = [];
    markerMapRef.current = {};

    const markers = [];

    companies.forEach((company) => {
      if (!company.coordinates || company.coordinates.length !== 2) return;

      const isSelected = selectedCompany?.id === company.id;
      const careerUrl = company.careerUrl || `https://www.google.com/search?q=${encodeURIComponent(company.name + ' careers hyderabad')}`;

      const marker = L.marker(company.coordinates, {
        icon: createCustomMarkerIcon(company, isSelected)
      });

      const popupEl = document.createElement('div');
      const root = createRoot(popupEl);
      root.render(
        <CompanyPopupContent
          company={company}
          careerUrl={careerUrl}
          onSelectJobForCompany={(c) => callbacksRef.current.onSelectJobForCompany?.(c)}
          onOpenCompanyDetails={(c) => callbacksRef.current.onOpenCompanyDetails?.(c)}
        />
      );
      popupRootsRef.current.push(root);

      marker.bindPopup(popupEl, {
        className: 'custom-popup',
        maxWidth: 340
      });

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        callbacksRef.current.onSelectCompany?.(company);
      });

      markerMapRef.current[company.id] = { marker, company };
      markers.push(marker);
    });

    clusterGroup.addLayers(markers);
  }, [companies]);

  // Update selected icon styling and open popup when selectedCompany changes
  useEffect(() => {
    const clusterGroup = clusterGroupRef.current;
    if (!clusterGroup) return;

    Object.entries(markerMapRef.current).forEach(([id, entry]) => {
      const isSelected = selectedCompany?.id === id;
      entry.marker.setIcon(createCustomMarkerIcon(entry.company, isSelected));
    });

    if (selectedCompany && markerMapRef.current[selectedCompany.id]) {
      const { marker } = markerMapRef.current[selectedCompany.id];
      clusterGroup.zoomToShowLayer(marker, () => {
        marker.openPopup();
      });
    }
  }, [selectedCompany]);

  return null;
}

export default function MapView({
  companies,
  selectedCompany,
  onSelectCompany,
  onSelectJobForCompany,
  onOpenCompanyDetails,
  onResetSearch,
  activeHubCenter,
  activeHubZoom
}) {
  const defaultCenter = [17.438, 78.375]; // HITEC City / Raidurg core

  return (
    <div className="relative w-full h-full min-h-[320px] rounded-3xl overflow-hidden border dark:border-slate-800 border-slate-200/90 shadow-2xl dark:bg-[#090D16] bg-slate-50 transition-colors">
      
      {/* Map Header Floating Overlay - Semi-transparent solid background (no costly backdrop-blur) */}
      <div className="absolute top-3 left-14 sm:left-16 z-[1000] pointer-events-auto dark:bg-[#090314]/92 bg-white/95 px-3.5 py-1.5 rounded-2xl border dark:border-purple-800/70 border-slate-200 shadow-xl flex items-center gap-2 text-xs">
        <span className="w-2.5 h-2.5 rounded-full dark:bg-purple-400 bg-orange-500"></span>
        <span className="font-bold dark:text-slate-100 text-slate-800">Hyderabad Tech Corridor</span>
        <span className="text-[10px] dark:text-purple-300 text-slate-500 font-mono">({companies.length} Mapped)</span>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={true}
        preferCanvas={true}
        className="w-full h-full z-0"
      >
        {/* OpenStreetMap Clean Tiles - 100% Free, Zero Watermarks, Zero API Key */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          keepBuffer={4}
          updateWhenZooming={false}
          updateWhenIdle={true}
        />

        <MapController
          targetCenter={activeHubCenter}
          targetZoom={activeHubZoom}
          selectedCompany={selectedCompany}
        />

        <MapEventsHandler onResetSearch={onResetSearch} />

        <ClusteredMarkers
          companies={companies}
          selectedCompany={selectedCompany}
          onSelectCompany={onSelectCompany}
          onSelectJobForCompany={onSelectJobForCompany}
          onOpenCompanyDetails={onOpenCompanyDetails}
        />
      </MapContainer>
    </div>
  );
}
