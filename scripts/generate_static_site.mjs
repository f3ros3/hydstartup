import fs from 'fs';
import path from 'path';

// Import datasets
import { HYDERABAD_COMPANIES } from '../src/data/companies.js';
import { HYDERABAD_HUBS } from '../src/data/hubs.js';
import { HYDERABAD_JOBS } from '../src/data/jobs.js';
import { HYDERABAD_SECTORS } from '../src/data/sectors.js';
import { HYDERABAD_ARTICLES } from '../src/data/articles.js';

const SITE_URL = 'https://hydstartup.online';
const BASE_TITLE = 'HydStartup Portal | Hyderabad Startups & Tech Job Board';
const LAST_UPDATED = 'October 2026';

// Helper to ensure dir exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper to find latest CSS & JS assets from dist/assets or docs/assets
function getAssetLinks() {
  let cssFile = '';
  let jsFile = '';
  const searchDirs = ['dist/assets', 'docs/assets'];
  for (const dir of searchDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      const css = files.find(f => f.endsWith('.css'));
      const js = files.find(f => f.endsWith('.js'));
      if (css) cssFile = `assets/${css}`;
      if (js) jsFile = `assets/${js}`;
      if (cssFile && jsFile) break;
    }
  }
  return { cssFile, jsFile };
}

// Generate shared HTML wrapper
function createHtmlDocument({
  title,
  description,
  canonicalPath,
  jsonLd,
  contentHtml,
  keywords = 'Hyderabad startups, tech jobs Hyderabad, HITEC City, Gachibowli, T-Hub, FinTech, SaaS, SpaceTech'
}) {
  const canonicalUrl = `${SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : '/' + canonicalPath}`;
  const { cssFile, jsFile } = getAssetLinks();

  const scriptTag = jsFile ? `<script type="module" crossorigin src="/${jsFile}"></script>` : '';
  const cssTag = cssFile ? `<link rel="stylesheet" crossorigin href="/${cssFile}">` : '';

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  <meta name="author" content="Tech With Shaik">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:site_name" content="HydStartup Portal">
  <meta property="og:locale" content="en_US">

  <!-- Twitter Meta -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">

  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4703620599888014" crossorigin="anonymous"></script>

  <!-- Favicon & Styles -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310B981'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/></svg>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  ${cssTag}

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
  ${JSON.stringify(jsonLd || {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HydStartup Portal",
    "url": SITE_URL,
    "description": description
  }, null, 2)}
  </script>

  <style>
    body { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; }
    .prose a { color: #10B981; text-decoration: underline; }
    .prose a:hover { color: #059669; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-emerald-500 selection:text-slate-950">
  
  <!-- Pre-rendered Static Content for Search Engines & No-JS Users -->
  <div id="static-content" class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
    
    <!-- Top Navigation -->
    <header class="border-b border-slate-800 pb-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <a href="/" class="flex items-center gap-2 text-xl font-black text-white hover:text-emerald-400 transition-colors">
          <span class="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold">HYD</span>
          <span>HydStartup<span class="text-emerald-400">Arena</span></span>
        </a>
        <span class="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full font-medium">Verified: ${LAST_UPDATED}</span>
      </div>

      <nav class="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
        <a href="/" class="hover:text-emerald-400 transition-colors">Directory & Map</a>
        <a href="/#jobs" class="hover:text-emerald-400 transition-colors">Jobs Board</a>
        <a href="/#articles" class="hover:text-emerald-400 transition-colors">Research & Guides</a>
        <a href="/#sectors" class="hover:text-emerald-400 transition-colors">Sectors</a>
        <a href="/about" class="hover:text-emerald-400 transition-colors">About</a>
        <a href="/contact" class="hover:text-emerald-400 transition-colors">Contact</a>
      </nav>
    </header>

    <!-- Main Content Injection -->
    <main class="space-y-8">
      ${contentHtml}
    </main>

    <!-- Static Footer -->
    <footer class="mt-16 pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-4">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
        <div>
          <h4 class="font-bold text-slate-300 mb-2">Tech Corridors</h4>
          <ul class="space-y-1">
            <li><a href="/area/hitec-city" class="hover:text-emerald-400">HITEC City & Mindspace</a></li>
            <li><a href="/area/gachibowli" class="hover:text-emerald-400">Gachibowli Corridor</a></li>
            <li><a href="/area/financial-district" class="hover:text-emerald-400">Financial District</a></li>
            <li><a href="/area/t-hub-raidurg" class="hover:text-emerald-400">T-Hub / Knowledge City</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-slate-300 mb-2">Key Sectors</h4>
          <ul class="space-y-1">
            <li><a href="/sector/saas" class="hover:text-emerald-400">Enterprise SaaS</a></li>
            <li><a href="/sector/ai-deeptech" class="hover:text-emerald-400">AI & DeepTech</a></li>
            <li><a href="/sector/spacetech" class="hover:text-emerald-400">SpaceTech & Defence</a></li>
            <li><a href="/sector/fintech" class="hover:text-emerald-400">FinTech & Banking</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-slate-300 mb-2">Research Guides</h4>
          <ul class="space-y-1">
            <li><a href="/articles/hyderabad-startup-ecosystem-report-2026" class="hover:text-emerald-400">Ecosystem Report 2026</a></li>
            <li><a href="/articles/hitec-city-vs-gachibowli-startup-guide" class="hover:text-emerald-400">Corridor Comparison</a></li>
            <li><a href="/articles/how-to-get-hired-hyderabad-startup" class="hover:text-emerald-400">Hiring & Interview Playbook</a></li>
            <li><a href="/articles/engineering-salaries-hyderabad-tech-2026" class="hover:text-emerald-400">Salary Benchmarks</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-slate-300 mb-2">Trust & Policies</h4>
          <ul class="space-y-1">
            <li><a href="/about" class="hover:text-emerald-400">About & Methodology</a></li>
            <li><a href="/contact" class="hover:text-emerald-400">Contact Us</a></li>
            <li><a href="/privacy" class="hover:text-emerald-400">Privacy Policy (DPDP/GDPR)</a></li>
            <li><a href="/terms" class="hover:text-emerald-400">Terms of Service</a></li>
            <li><a href="/cookie-policy" class="hover:text-emerald-400">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div class="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
        <p>&copy; ${new Date().getFullYear()} HydStartup Portal. Published by Tech With Shaik, Hyderabad, Telangana, India.</p>
        <p>Direct Inquiries: <a href="mailto:techwithshaik2@gmail.com" class="text-emerald-400 hover:underline">techwithshaik2@gmail.com</a></p>
      </div>
    </footer>

  </div>

  <!-- Interactive SPA Root (Hydrated by React on Client) -->
  <div id="root"></div>

  ${scriptTag}
</body>
</html>`;
}

// Generate Everything
function buildStaticSite() {
  console.log('🚀 Starting Static Site Generation (SSG)...');

  const targetDirs = ['dist', 'docs'];

  targetDirs.forEach(baseDir => {
    ensureDir(baseDir);

    // 1. GENERATE HOMEPAGE (index.html)
    const homeContent = `
      <section class="space-y-6">
        <div class="p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl text-white">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold mb-4">
            🚀 150+ Curated Companies • 500+ Verified Jobs • Updated ${LAST_UPDATED}
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Hyderabad Tech & Startup Ecosystem Directory
          </h1>
          <p class="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            The authoritative, verified guide to Hyderabad's startup clusters across HITEC City, Gachibowli, Financial District, and T-Hub Phase 2. Discover authentic job openings, in-depth company tech stacks, and original research reports.
          </p>
        </div>

        <!-- How We Collect and Verify Data -->
        <div class="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <span class="text-emerald-400">🛡️</span> How We Collect, Verify & Curate Our Data
          </h2>
          <p class="text-xs text-slate-400 leading-relaxed">
            Every company in this portal is manually verified with active offices in Greater Hyderabad. Job vacancies link directly to primary ATS endpoints (Greenhouse, Lever, Workable, Darwinbox) and authentic company career portals. Expired requisitions and spam links are purged on a weekly automated schedule.
          </p>
        </div>

        <!-- Featured Startups Directory Preview -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-white">Featured Hyderabad Startups & Unicorns</h2>
            <span class="text-xs text-slate-400">${HYDERABAD_COMPANIES.length} Total Verified Companies</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${HYDERABAD_COMPANIES.slice(0, 18).map(comp => `
              <div class="p-5 bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition-all">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <h3 class="font-bold text-white text-base">
                      <a href="/startups/${comp.id}" class="hover:text-emerald-400 transition-colors">${comp.name}</a>
                    </h3>
                    <div class="text-xs text-slate-400 mt-0.5">${comp.category || comp.industry} • ${comp.stage || 'Scaleup'}</div>
                  </div>
                  <span class="px-2 py-0.5 bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-[11px] font-bold rounded-md">
                    ${comp.openRolesCount || 4} Roles
                  </span>
                </div>
                <p class="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">${comp.description}</p>
                <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span class="text-slate-400 text-[11px]">📍 ${comp.area}</span>
                  <a href="/startups/${comp.id}" class="text-emerald-400 font-semibold hover:underline">View Profile &rarr;</a>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="text-center pt-2">
            <p class="text-xs text-slate-400">Browse all 130+ companies and live corridor map on the interactive dashboard.</p>
          </div>
        </div>

        <!-- Ecosystem Articles Preview -->
        <div class="space-y-4 pt-6">
          <h2 class="text-xl font-bold text-white">Original Hyderabad Tech Research & Guides</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${HYDERABAD_ARTICLES.slice(0, 6).map(art => `
              <article class="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                <div class="text-[11px] font-semibold text-emerald-400 uppercase">${art.category} • ${art.readTime}</div>
                <h3 class="font-bold text-white text-base">
                  <a href="/articles/${art.slug}" class="hover:text-emerald-400">${art.title}</a>
                </h3>
                <p class="text-xs text-slate-400 leading-relaxed line-clamp-2">${art.excerpt}</p>
                <a href="/articles/${art.slug}" class="inline-block text-xs text-emerald-400 font-semibold pt-1 hover:underline">Read Research Report &rarr;</a>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    const homeHtml = createHtmlDocument({
      title: BASE_TITLE,
      description: 'Directory and live map of 150+ Hyderabad startups and 500+ curated tech jobs across HITEC City, Gachibowli, Financial District, and T-Hub. Real-time hiring data & research.',
      canonicalPath: '/',
      contentHtml: homeContent
    });

    fs.writeFileSync(path.join(baseDir, 'index.html'), homeHtml, 'utf8');

    // 2. GENERATE COMPANY PROFILE PAGES (/startups/{companyId}/index.html)
    HYDERABAD_COMPANIES.forEach(comp => {
      const compDir = path.join(baseDir, 'startups', comp.id);
      ensureDir(compDir);

      const compJobs = HYDERABAD_JOBS.filter(j => j.companyId === comp.id);

      const compContent = `
        <article class="space-y-8">
          <nav class="text-xs text-slate-400 flex items-center gap-2">
            <a href="/" class="hover:text-emerald-400">Home</a> &gt; 
            <a href="/#companies" class="hover:text-emerald-400">Startups</a> &gt; 
            <span class="text-white">${comp.name}</span>
          </nav>

          <div class="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span class="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-lg text-xs font-bold uppercase tracking-wider">
                  ${comp.category || comp.industry}
                </span>
                <h1 class="text-3xl sm:text-4xl font-extrabold text-white mt-2">${comp.name}</h1>
                <p class="text-xs text-slate-400 mt-1">Founded in ${comp.foundedYear} • ${comp.stage || 'Scaleup'} • ${comp.employees} Team Members</p>
              </div>

              <div class="flex items-center gap-3">
                <a href="${comp.careerUrl}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors">
                  Official Careers Portal &rarr;
                </a>
              </div>
            </div>

            <p class="text-sm sm:text-base text-slate-200 leading-relaxed pt-2">
              ${comp.description}
            </p>
          </div>

          <!-- Deep Original Technical Breakdown -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2 space-y-6">
              <section class="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-3">
                <h2 class="text-lg font-bold text-white">Company & Engineering Overview</h2>
                <p class="text-sm text-slate-300 leading-relaxed">${comp.longOverview}</p>
              </section>

              <section class="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-3">
                <h2 class="text-lg font-bold text-white">Engineering Stack & Architecture</h2>
                <p class="text-sm text-slate-300 leading-relaxed">${comp.engineeringCulture}</p>
                <div class="pt-2 flex flex-wrap gap-2">
                  ${(comp.techStack || []).map(t => `<span class="px-2.5 py-1 bg-slate-800 text-slate-200 text-xs font-mono rounded-lg">${t}</span>`).join('')}
                </div>
              </section>

              <section class="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-3">
                <h2 class="text-lg font-bold text-white">Hiring Focus & Talent Profiles</h2>
                <p class="text-sm text-slate-300 leading-relaxed">${comp.hiringFocus}</p>
              </section>
            </div>

            <!-- Sidebar Info -->
            <div class="space-y-6">
              <div class="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
                <h3 class="text-sm font-bold text-slate-300 uppercase tracking-wider">Office Details</h3>
                <div class="space-y-2 text-xs text-slate-300">
                  <div><strong>Tech Corridor:</strong> ${comp.area}</div>
                  <div><strong>Address:</strong> ${comp.address || 'HITEC City, Hyderabad'}</div>
                  ${comp.valuation ? `<div><strong>Valuation:</strong> ${comp.valuation}</div>` : ''}
                </div>
                <div class="pt-2 border-t border-slate-800">
                  <a href="${comp.careerUrl}" target="_blank" rel="noopener noreferrer" class="text-xs text-emerald-400 font-semibold hover:underline block">
                    &rarr; Explore open jobs on ${comp.name} careers
                  </a>
                </div>
              </div>

              <div class="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-3">
                <h3 class="text-sm font-bold text-slate-300 uppercase tracking-wider">Ecosystem Impact</h3>
                <p class="text-xs text-slate-300 leading-relaxed">${comp.ecosystemImpact}</p>
              </div>
            </div>
          </div>

          <!-- Open Roles Listing -->
          ${compJobs.length > 0 ? `
            <div class="space-y-4 pt-4">
              <h2 class="text-xl font-bold text-white">Verified Open Positions at ${comp.name}</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${compJobs.map(j => `
                  <div class="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                    <div class="flex items-start justify-between gap-2">
                      <h3 class="font-bold text-white text-base">${j.title}</h3>
                      <span class="text-xs font-bold text-emerald-400">${j.salaryRange || 'Competitive'}</span>
                    </div>
                    <div class="text-xs text-slate-400">${j.experienceLevel} • ${j.workMode} • ${j.area}</div>
                    <p class="text-xs text-slate-300 line-clamp-2">${j.description}</p>
                    <div class="pt-2 flex items-center justify-between">
                      <div class="flex flex-wrap gap-1">
                        ${(j.skills || []).slice(0, 3).map(s => `<span class="px-2 py-0.5 bg-slate-800 text-[10px] text-slate-300 rounded">${s}</span>`).join('')}
                      </div>
                      <a href="${j.applyUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow transition-colors">
                        Apply Now &rarr;
                      </a>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </article>
      `;

      const compJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": comp.name,
        "description": comp.description,
        "url": comp.careerUrl,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": comp.address || comp.area,
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "addressCountry": "IN"
        }
      };

      const compHtml = createHtmlDocument({
        title: `${comp.name} Hyderabad | Tech Stack, Jobs, Office & Careers`,
        description: `${comp.name} in Hyderabad (${comp.area}). Explore tech stack (${(comp.techStack || []).join(', ')}), funding stage, engineering culture, and verified open roles.`,
        canonicalPath: `/startups/${comp.id}`,
        jsonLd: compJsonLd,
        contentHtml: compContent
      });

      fs.writeFileSync(path.join(compDir, 'index.html'), compHtml, 'utf8');
    });

    // 3. GENERATE AREA / TECH CORRIDOR PAGES (/area/{hubId}/index.html)
    HYDERABAD_HUBS.forEach(hub => {
      const hubDir = path.join(baseDir, 'area', hub.id);
      ensureDir(hubDir);

      const hubCompanies = hub.id === 'all' 
        ? HYDERABAD_COMPANIES 
        : HYDERABAD_COMPANIES.filter(c => c.hubId === hub.id);

      const hubContent = `
        <article class="space-y-6">
          <nav class="text-xs text-slate-400 flex items-center gap-2">
            <a href="/" class="hover:text-emerald-400">Home</a> &gt; 
            <a href="/#map" class="hover:text-emerald-400">Tech Corridors</a> &gt; 
            <span class="text-white">${hub.name}</span>
          </nav>

          <div class="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <span class="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-lg text-xs font-bold uppercase tracking-wider">
              ${hub.badge || 'Tech Cluster'}
            </span>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white">${hub.name} Tech Corridor</h1>
            <p class="text-sm sm:text-base text-slate-300 leading-relaxed">${hub.tagline}</p>
          </div>

          <div class="space-y-4">
            <h2 class="text-xl font-bold text-white">Startups & Tech Offices in ${hub.name} (${hubCompanies.length} Verified)</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              ${hubCompanies.map(comp => `
                <div class="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                  <h3 class="font-bold text-white text-base">
                    <a href="/startups/${comp.id}" class="hover:text-emerald-400">${comp.name}</a>
                  </h3>
                  <div class="text-xs text-slate-400">${comp.category || comp.industry} • ${comp.stage || 'Scaleup'}</div>
                  <p class="text-xs text-slate-300 line-clamp-2">${comp.description}</p>
                  <a href="/startups/${comp.id}" class="inline-block text-xs text-emerald-400 font-semibold pt-1 hover:underline">View Profile &rarr;</a>
                </div>
              `).join('')}
            </div>
          </div>
        </article>
      `;

      const hubHtml = createHtmlDocument({
        title: `${hub.name} Startups & Tech Offices | Hyderabad Tech Corridor Guide`,
        description: `Explore all verified tech startups, GCCs, and open jobs in ${hub.name}, Hyderabad. Comprehensive directory and transit guide.`,
        canonicalPath: `/area/${hub.id}`,
        contentHtml: hubContent
      });

      fs.writeFileSync(path.join(hubDir, 'index.html'), hubHtml, 'utf8');
    });

    // 4. GENERATE SECTOR PAGES (/sector/{sectorId}/index.html)
    HYDERABAD_SECTORS.forEach(sec => {
      const secDir = path.join(baseDir, 'sector', sec.slug);
      ensureDir(secDir);

      const secContent = `
        <article class="space-y-6">
          <nav class="text-xs text-slate-400 flex items-center gap-2">
            <a href="/" class="hover:text-emerald-400">Home</a> &gt; 
            <a href="/#sectors" class="hover:text-emerald-400">Sectors</a> &gt; 
            <span class="text-white">${sec.name}</span>
          </nav>

          <div class="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <span class="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-lg text-xs font-bold uppercase tracking-wider">
              ${sec.keyMetrics.activeCompanies}
            </span>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white">${sec.name} in Hyderabad</h1>
            <p class="text-base text-emerald-400 font-semibold">${sec.tagline}</p>
            <p class="text-sm text-slate-300 leading-relaxed pt-2">${sec.description}</p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <div class="text-[10px] text-slate-400 uppercase font-bold">Total Scale</div>
              <div class="text-sm font-bold text-white mt-1">${sec.keyMetrics.unicornsCount}</div>
            </div>
            <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <div class="text-[10px] text-slate-400 uppercase font-bold">Valuation</div>
              <div class="text-sm font-bold text-white mt-1">${sec.keyMetrics.combinedValuation}</div>
            </div>
            <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <div class="text-[10px] text-slate-400 uppercase font-bold">Active Hubs</div>
              <div class="text-sm font-bold text-white mt-1">${sec.keyMetrics.keyHubs}</div>
            </div>
            <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <div class="text-[10px] text-slate-400 uppercase font-bold">Verified Status</div>
              <div class="text-sm font-bold text-emerald-400 mt-1">${LAST_UPDATED}</div>
            </div>
          </div>
        </article>
      `;

      const secHtml = createHtmlDocument({
        title: `${sec.name} in Hyderabad | Startups, Scale & Tech Landscape`,
        description: `${sec.name} startups in Hyderabad. ${sec.description.substring(0, 140)}...`,
        canonicalPath: `/sector/${sec.slug}`,
        contentHtml: secContent
      });

      fs.writeFileSync(path.join(secDir, 'index.html'), secHtml, 'utf8');
    });

    // 5. GENERATE RESEARCH ARTICLES (/articles/{slug}/index.html)
    HYDERABAD_ARTICLES.forEach(art => {
      const artDir = path.join(baseDir, 'articles', art.slug);
      ensureDir(artDir);

      const artContent = `
        <article class="space-y-6">
          <nav class="text-xs text-slate-400 flex items-center gap-2">
            <a href="/" class="hover:text-emerald-400">Home</a> &gt; 
            <a href="/#articles" class="hover:text-emerald-400">Research</a> &gt; 
            <span class="text-white">${art.title}</span>
          </nav>

          <header class="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <div class="text-xs font-bold text-emerald-400 uppercase">${art.category} • ${art.readTime}</div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white leading-tight">${art.title}</h1>
            <p class="text-sm sm:text-base text-slate-300 leading-relaxed">${art.subtitle}</p>
            <div class="text-xs text-slate-400 pt-2">By ${art.author} • Published ${art.publishedDate}</div>
          </header>

          <div class="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl prose prose-invert max-w-none text-sm leading-relaxed space-y-4">
            ${art.content}
          </div>
        </article>
      `;

      const artJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": art.title,
        "description": art.excerpt,
        "author": {
          "@type": "Organization",
          "name": "HydStartup Research Desk"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Tech With Shaik",
          "url": SITE_URL
        },
        "datePublished": "2026-10-01"
      };

      const artHtml = createHtmlDocument({
        title: art.metaTitle || `${art.title} | HydStartup Research`,
        description: art.metaDescription || art.excerpt,
        canonicalPath: `/articles/${art.slug}`,
        jsonLd: artJsonLd,
        contentHtml: artContent
      });

      fs.writeFileSync(path.join(artDir, 'index.html'), artHtml, 'utf8');
    });

    // 6. GENERATE TRUST & LEGAL PAGES (/about, /contact, /privacy, /terms, /cookie-policy)
    const staticPages = [
      {
        slug: 'about',
        title: 'About HydStartup Portal | Methodology & Editorial Principles',
        description: 'Learn about HydStartup Portal, our data collection and verification methodology, editorial integrity standards, and tech research mission in Hyderabad.',
        content: `
          <div class="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
            <h1 class="text-3xl font-extrabold text-white">About HydStartup Portal</h1>
            <p class="text-sm text-slate-300 leading-relaxed">
              HydStartup Portal (<strong>hydstartup.online</strong>) is an independent technology catalog and research publication dedicated to chronicling Greater Hyderabad's startup ecosystem. Published by <strong>Tech With Shaik (TWS)</strong>, our mission is to provide accurate, verified, and unbloated insights into the companies, careers, and capital shaping Telangana.
            </p>
            <h2 class="text-xl font-bold text-white pt-4">Our Data Verification Protocol</h2>
            <ul class="list-disc list-inside text-sm text-slate-300 space-y-2">
              <li><strong>Direct Career Portal Verification:</strong> Every job listing links to official ATS endpoints or verified career portals.</li>
              <li><strong>Weekly Automated Link Health Checks:</strong> Broken links and closed vacancies are purged automatically.</li>
              <li><strong>Zero Paid Editorial Alterations:</strong> We do not accept sponsored compensation adjustments or false stage claims.</li>
            </ul>
            <div class="pt-4 border-t border-slate-800 text-xs text-slate-400">
              Contact us: <a href="mailto:techwithshaik2@gmail.com" class="text-emerald-400 hover:underline">techwithshaik2@gmail.com</a>
            </div>
          </div>
        `
      },
      {
        slug: 'contact',
        title: 'Contact Us | HydStartup Portal Editorial Team',
        description: 'Get in touch with the HydStartup Portal editorial desk in Hyderabad. Working contact email, response SLAs, grievance contact, and location.',
        content: `
          <div class="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
            <h1 class="text-3xl font-extrabold text-white">Contact HydStartup Portal</h1>
            <p class="text-sm text-slate-300 leading-relaxed">
              Have a suggestion, want to submit a startup for editorial review, or need to report outdated data? We respond to all verified inquiries within 24-48 business hours.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div class="p-5 bg-slate-800/60 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1">
                <div class="font-bold text-white text-sm">Direct Editorial Email</div>
                <div><a href="mailto:techwithshaik2@gmail.com" class="text-emerald-400 font-semibold hover:underline">techwithshaik2@gmail.com</a></div>
              </div>
              <div class="p-5 bg-slate-800/60 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1">
                <div class="font-bold text-white text-sm">Publisher Location</div>
                <div>Tech With Shaik, Hyderabad, Telangana 500081, India</div>
              </div>
            </div>
          </div>
        `
      },
      {
        slug: 'privacy',
        title: 'Privacy Policy | HydStartup Portal (DPDP Act & GDPR Compliant)',
        description: 'Privacy Policy for HydStartup Portal. Full transparency on local storage, data minimization, Google AdSense cookies, and user rights.',
        content: `
          <div class="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
            <h1 class="text-3xl font-extrabold text-white">Privacy Policy</h1>
            <p class="text-xs text-slate-400">Effective Date: October 2026</p>
            <div class="text-sm text-slate-300 space-y-4">
              <p>HydStartup Portal ("we", "us", or "our") respects your digital privacy and complies with the Digital Personal Data Protection (DPDP) Act 2023 of India, EU GDPR, and California Consumer Privacy Act (CCPA).</p>
              <h2 class="text-lg font-bold text-white">1. Strict Data Minimization</h2>
              <p>We do not require user account registration, login credentials, or credit card information to access the directory or job board.</p>
              <h2 class="text-lg font-bold text-white">2. Geolocation Consent</h2>
              <p>If you use the optional "Near Me" map feature, coordinates are processed locally inside your browser and are never transmitted to external analytics servers.</p>
              <h2 class="text-lg font-bold text-white">3. Third-Party Advertising & Cookies</h2>
              <p>We use Google AdSense to serve non-intrusive ads. Google may use cookies to serve ads based on user visits. You can manage your cookie preferences at any time.</p>
            </div>
          </div>
        `
      },
      {
        slug: 'terms',
        title: 'Terms and Conditions | HydStartup Portal',
        description: 'Terms of Service and legal disclaimer for HydStartup Portal directory and job discovery platform.',
        content: `
          <div class="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
            <h1 class="text-3xl font-extrabold text-white">Terms & Conditions</h1>
            <div class="text-sm text-slate-300 space-y-4">
              <p>By accessing HydStartup Portal (hydstartup.online), you agree to these terms. Content is provided for informational and community discovery purposes.</p>
              <h2 class="text-lg font-bold text-white">1. Nominative Fair Use</h2>
              <p>All company names, logos, and trademarks belong to their respective owners. Mention on this site is nominative identification and does not imply sponsorship.</p>
              <h2 class="text-lg font-bold text-white">2. External Application Links</h2>
              <p>We redirect job applicants to third-party ATS platforms. We do not act as an employer, agent, or recruiter.</p>
            </div>
          </div>
        `
      },
      {
        slug: 'cookie-policy',
        title: 'Cookie Policy | HydStartup Portal',
        description: 'Detailed Cookie Policy explaining functional local storage and Google AdSense advertising cookies.',
        content: `
          <div class="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
            <h1 class="text-3xl font-extrabold text-white">Cookie Policy</h1>
            <div class="text-sm text-slate-300 space-y-4">
              <p>We use essential local browser storage to save your theme preferences and bookmarked jobs, alongside Google AdSense advertising cookies.</p>
            </div>
          </div>
        `
      }
    ];

    staticPages.forEach(p => {
      const pageDir = path.join(baseDir, p.slug);
      ensureDir(pageDir);
      const pageHtml = createHtmlDocument({
        title: p.title,
        description: p.description,
        canonicalPath: `/${p.slug}`,
        contentHtml: p.content
      });
      fs.writeFileSync(path.join(pageDir, 'index.html'), pageHtml, 'utf8');
    });

    // 7. GENERATE SITEMAP.XML
    const sitemapUrls = [
      { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' },
      { loc: `${SITE_URL}/about`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${SITE_URL}/contact`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${SITE_URL}/privacy`, priority: '0.5', changefreq: 'monthly' },
      { loc: `${SITE_URL}/terms`, priority: '0.5', changefreq: 'monthly' },
      { loc: `${SITE_URL}/cookie-policy`, priority: '0.5', changefreq: 'monthly' },
      ...HYDERABAD_HUBS.map(h => ({ loc: `${SITE_URL}/area/${h.id}`, priority: '0.8', changefreq: 'weekly' })),
      ...HYDERABAD_SECTORS.map(s => ({ loc: `${SITE_URL}/sector/${s.slug}`, priority: '0.8', changefreq: 'weekly' })),
      ...HYDERABAD_ARTICLES.map(a => ({ loc: `${SITE_URL}/articles/${a.slug}`, priority: '0.9', changefreq: 'weekly' })),
      ...HYDERABAD_COMPANIES.map(c => ({ loc: `${SITE_URL}/startups/${c.id}`, priority: '0.7', changefreq: 'weekly' }))
    ];

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(baseDir, 'sitemap.xml'), sitemapXml, 'utf8');

    // 8. GENERATE ROBOTS.TXT
    const robotsTxt = `User-agent: *
Allow: /
Disallow:

User-agent: Mediapartners-Google
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
    fs.writeFileSync(path.join(baseDir, 'robots.txt'), robotsTxt, 'utf8');

  });

  console.log('✅ Static Site Generation completed successfully! All HTML files, sitemap.xml & robots.txt generated.');
}

buildStaticSite();
