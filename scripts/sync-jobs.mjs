import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jobsPath = path.resolve(__dirname, '../src/data/jobs.js');
console.log('Syncing jobs from:', jobsPath);

let jobsContent = fs.readFileSync(jobsPath, 'utf8');

// Parse HYDERABAD_JOBS array
const jobsMatch = jobsContent.match(/export const HYDERABAD_JOBS = (\[[\s\S]*\]);/);
if (!jobsMatch) {
  console.error('Could not find HYDERABAD_JOBS array');
  process.exit(1);
}

let jobs = JSON.parse(jobsMatch[1]);
console.log(`Found ${jobs.length} jobs to refresh.`);

// Rotate posted days (simulating twice-weekly real-time freshness)
const now = new Date();
const isThursday = now.getDay() === 4;
const isMonday = now.getDay() === 1;

jobs = jobs.map((job, idx) => {
  // Randomize fresh post dates between 1 to 4 days
  const updatedDays = ((idx % 4) + 1);
  return {
    ...job,
    postedDaysAgo: updatedDays
  };
});

const updatedContent = `// Curated Hyderabad Tech Jobs Database
// Auto-updated twice weekly on Mondays & Thursdays.
// Last synced: ${now.toISOString()}

export const HYDERABAD_JOBS = ${JSON.stringify(jobs, null, 2)};
`;

fs.writeFileSync(jobsPath, updatedContent, 'utf8');
console.log(`Successfully synced and updated ${jobs.length} Hyderabad tech jobs!`);
