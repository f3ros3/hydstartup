import { HYDERABAD_COMPANIES as companies } from './companies.js';

const careerLinks = {
  "skyroot": "https://www.skyroot.in/careers",
  "highradius": "https://www.highradius.com/about/career/",
  "nxtwave": "https://nxtwave.freshteam.com/jobs",
  "zeta": "https://jobs.lever.co/zeta",
  "uber": "https://jobs.uber.com/en/jobs/?location=Hyderabad&radius=100",
  "ozonetel": "https://ozonetel.com/job-openings/",
  "qualizeal": "https://qualizeal.com/careers/jobs/",
  "pando-ai": "https://pando.zohorecruit.com/jobs/Careers"
};

export const HYDERABAD_COMPANIES = companies.map(company => careerLinks[company.id]
  ? { ...company, careerUrl: careerLinks[company.id] }
  : company);
