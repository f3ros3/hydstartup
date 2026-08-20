import React, { useState } from 'react';

// Domain mapping for accurate logos
const DOMAIN_MAP = {
  darwinbox: 'darwinbox.com',
  skyroot: 'skyroot.in',
  highradius: 'highradius.com',
  zenoti: 'zenoti.com',
  'keka-hr': 'keka.com',
  'dhruva-space': 'dhruvaspace.com',
  'kore-ai': 'kore.ai',
  stan: 'getstan.app',
  nxtwave: 'ccbp.in',
  recykal: 'recykal.com',
  turbohire: 'turbohire.co',
  'marut-drones': 'marutdrones.com',
  'fourth-partner': 'fourthpartner.co',
  mapmygenome: 'mapmygenome.in',
  'gmw-ev': 'gayammotorworks.com',
  ctrls: 'ctrls.com',
  evalueserve: 'evalueserve.com',
  accenture: 'accenture.com',
  'dxc-technology': 'dxc.com',
  byjus: 'byjus.com',
  'l-and-t': 'larsentoubro.com',
  novartis: 'novartis.com',
  'cloudnine-hospital': 'cloudninefertility.com',
  cotiviti: 'cotiviti.com',
  zelis: 'zelis.com',
  solenis: 'solenis.com',
  dazn: 'dazn.com',
  'thomson-reuters': 'thomsonreuters.com',
  'progress-software': 'progress.com',
  'thermo-fisher': 'thermofisher.com',
  'callaway-golf': 'callawaygolf.com',
  'rsm-us': 'rsmus.com',
  experian: 'experian.com',
  'eli-lilly': 'lilly.com',
  fanatics: 'fanaticsinc.com',
  paltech: 'pal.tech',
  arcesium: 'arcesium.com',
  valuemomentum: 'valuemomentum.com',
  zeta: 'zeta.tech',
  invesco: 'invesco.com',
  pegasystems: 'pega.com',
  adp: 'adp.com',
  qualcomm: 'qualcomm.com',
  amd: 'amd.com',
  micron: 'micron.com',
  salesforce: 'salesforce.com',
  servicenow: 'servicenow.com',
  uber: 'uber.com',
  'expedia-group': 'expediagroup.com',
  'electronic-arts': 'ea.com',
  mathworks: 'mathworks.com',
  valuelabs: 'valuelabs.com',
  innominds: 'innominds.com',
  cloud4c: 'cloud4c.com',
  'goldman-sachs': 'goldmansachs.com',
  cigniti: 'cigniti.com'
};

export function getCompanyLogoUrl(company) {
  if (company.logoUrl) return company.logoUrl;
  const domain = DOMAIN_MAP[company.id] || (company.careerUrl ? new URL(company.careerUrl).hostname.replace('www.', '').replace('careers.', '') : null);
  if (domain) {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  }
  return null;
}

export default function CompanyLogo({ company, size = 'md', className = '' }) {
  const [imgError, setImgError] = useState(false);
  const color = company?.color || '#10B981';
  const logoText = company?.logoText || company?.name?.substring(0, 2).toUpperCase() || 'HYD';
  const logoUrl = company ? getCompanyLogoUrl(company) : null;

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg text-xs',
    md: 'w-11 h-11 rounded-xl text-sm',
    lg: 'w-14 h-14 rounded-2xl text-base',
    xl: 'w-16 h-16 rounded-2xl text-lg'
  };

  const imgSizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
    xl: 'w-11 h-11'
  };

  return (
    <div
      className={`relative flex items-center justify-center font-extrabold text-white shrink-0 shadow-md border border-white/15 overflow-hidden transition-transform ${sizeClasses[size] || sizeClasses.md} ${className}`}
      style={{ backgroundColor: '#1E293B' }}
    >
      {logoUrl && !imgError ? (
        <div className="w-full h-full flex items-center justify-center p-1.5 bg-white/95 rounded-[inherit]">
          <img
            src={logoUrl}
            alt={company?.name || 'Company Logo'}
            className={`${imgSizeClasses[size] || imgSizeClasses.md} object-contain`}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>
      ) : (
        <div 
          className="w-full h-full flex items-center justify-center font-black"
          style={{ backgroundColor: color }}
        >
          <span>{logoText}</span>
        </div>
      )}
    </div>
  );
}
