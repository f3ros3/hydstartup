export function getRealtimeApplyUrl(job) {
  for (const candidate of [job?.jobUrl, job?.applyUrl, job?.applicationUrl, job?.id?.startsWith('job-custom-') ? job.careerUrl : undefined]) {
    try {
      const url = new URL(candidate);
      if (url.protocol === 'https:' || url.protocol === 'http:') return url.href;
    } catch {
      // Custom listings can omit a web application URL.
    }
  }
  return undefined;
}

export function getIndeedJobUrl(job, company) {
  const title = job?.title || '';
  const compName = company?.name || job?.companyName || '';
  return `https://in.indeed.com/jobs?q=${encodeURIComponent(title + ' ' + compName)}&l=Hyderabad%2C+Telangana`;
}

export function getNaukriJobUrl(job, company) {
  const title = (job?.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const compName = company?.name || job?.companyName || '';
  return `https://www.naukri.com/${encodeURIComponent(title)}-jobs-in-hyderabad?k=${encodeURIComponent(compName)}`;
}
