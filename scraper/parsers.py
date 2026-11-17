import requests
import json
import logging
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
}
TIMEOUT = 8

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def parse_greenhouse(company_slug):
    jobs = []
    url = f"https://boards-api.greenhouse.io/v1/boards/{company_slug}/jobs?content=true"
    try:
        response = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
        if response.status_code == 200:
            data = response.json()
            for job in data.get('jobs', []):
                location = job.get('location', {}).get('name', '').lower()
                if 'hyderabad' in location or 'india' in location or 'remote' in location:
                    description = job.get('content', '')
                    soup = BeautifulSoup(description, 'html.parser')
                    text_desc = soup.get_text(separator=' ', strip=True)
                    jobs.append({
                        'title': job.get('title', ''),
                        'location': job.get('location', {}).get('name', ''),
                        'applyUrl': job.get('absolute_url', f"https://boards.greenhouse.io/{company_slug}/jobs/{job.get('id')}"),
                        'description': text_desc,
                        'salary': '',
                        'experience': '',
                        'workMode': ''
                    })
    except Exception as e:
        logger.warning(f"Error parsing Greenhouse for {company_slug}: {e}")
    return jobs

def parse_lever(company_slug):
    jobs = []
    url = f"https://api.lever.co/v0/postings/{company_slug}?mode=json"
    try:
        response = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
        if response.status_code == 200:
            data = response.json()
            for job in data:
                location = job.get('categories', {}).get('location', '').lower()
                workplace_type = job.get('workplaceType', '').lower()
                if 'hyderabad' in location or 'india' in location or 'remote' in location or 'remote' in workplace_type:
                    description = job.get('descriptionPlain', '') or job.get('description', '')
                    jobs.append({
                        'title': job.get('text', ''),
                        'location': job.get('categories', {}).get('location', ''),
                        'applyUrl': job.get('applyUrl', '') or job.get('hostedUrl', ''),
                        'description': description,
                        'salary': '',
                        'experience': '',
                        'workMode': 'Remote' if 'remote' in workplace_type else ''
                    })
    except Exception as e:
        logger.warning(f"Error parsing Lever for {company_slug}: {e}")
    return jobs

def parse_ashby(company_slug):
    jobs = []
    url = f"https://api.ashbyhq.com/posting-api/job-board/{company_slug}"
    try:
        response = requests.post(url, headers=HEADERS, timeout=TIMEOUT, json={})
        if response.status_code == 200:
            data = response.json()
            for job in data.get('jobs', []):
                location = job.get('location', '').lower()
                if 'hyderabad' in location or 'india' in location:
                    jobs.append({
                        'title': job.get('title', ''),
                        'location': job.get('location', ''),
                        'applyUrl': job.get('jobUrl', ''),
                        'description': job.get('descriptionHtml', ''),
                        'salary': '',
                        'experience': '',
                        'workMode': ''
                    })
    except Exception as e:
        logger.warning(f"Error parsing Ashby for {company_slug}: {e}")
    return jobs

def parse_workable(company_slug):
    jobs = []
    url = f"https://apply.workable.com/api/v3/accounts/{company_slug}/jobs"
    try:
        response = requests.post(url, headers=HEADERS, timeout=TIMEOUT, json={"location":"India","query":""})
        if response.status_code == 200:
            data = response.json()
            for job in data.get('results', []):
                jobs.append({
                    'title': job.get('title', ''),
                    'location': f"{job.get('city', '')}, {job.get('country', '')}",
                    'applyUrl': job.get('shortlink', ''),
                    'description': job.get('description', ''),
                    'salary': '',
                    'experience': '',
                    'workMode': ''
                })
    except Exception as e:
        logger.warning(f"Error parsing Workable for {company_slug}: {e}")
    return jobs

def parse_bamboohr(company_slug):
    jobs = []
    url = f"https://{company_slug}.bamboohr.com/careers/list"
    try:
        response = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
        if response.status_code == 200:
            data = response.json()
            for job in data.get('result', []):
                location = job.get('location', {}).get('city', '').lower()
                if 'hyderabad' in location or 'india' in location:
                    jobs.append({
                        'title': job.get('jobOpeningName', ''),
                        'location': job.get('location', {}).get('city', ''),
                        'applyUrl': f"https://{company_slug}.bamboohr.com/careers/{job.get('id')}",
                        'description': '',
                        'salary': '',
                        'experience': '',
                        'workMode': ''
                    })
    except Exception as e:
        logger.warning(f"Error parsing BambooHR for {company_slug}: {e}")
    return jobs

def parse_smartrecruiters(company_id):
    jobs = []
    url = f"https://api.smartrecruiters.com/v1/companies/{company_id}/postings?limit=100&offset=0"
    try:
        response = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
        if response.status_code == 200:
            data = response.json()
            for job in data.get('content', []):
                location = job.get('location', {}).get('city', '').lower()
                if 'hyderabad' in location or 'india' in location:
                    jobs.append({
                        'title': job.get('name', ''),
                        'location': job.get('location', {}).get('city', ''),
                        'applyUrl': f"https://jobs.smartrecruiters.com/{company_id}/{job.get('id')}",
                        'description': '',
                        'salary': '',
                        'experience': '',
                        'workMode': ''
                    })
    except Exception as e:
        logger.warning(f"Error parsing SmartRecruiters for {company_id}: {e}")
    return jobs

def parse_custom_html(career_url, company_name, page=None):
    jobs = []
    if not page or not career_url:
        return jobs
    try:
        page.goto(career_url, timeout=12000, wait_until='domcontentloaded')
        page.wait_for_timeout(1500)
        links = page.locator('a').all()
        for link in links:
            if len(jobs) >= 4:
                break
            try:
                text = link.inner_text().strip()
                href = link.get_attribute('href')
                if text and href and len(text) > 4 and len(text) < 80:
                    t_low = text.lower()
                    if any(kw in t_low for kw in ['engineer', 'developer', 'manager', 'lead', 'designer', 'analyst', 'specialist', 'architect', 'scientist']):
                        full_url = urljoin(career_url, href)
                        jobs.append({
                            'title': text,
                            'location': 'Hyderabad, India',
                            'applyUrl': full_url,
                            'description': '',
                            'salary': '',
                            'experience': '',
                            'workMode': 'Hybrid'
                        })
            except Exception:
                continue
    except Exception as e:
        logger.warning(f"Notice parsing {company_name}: {e}")
    return jobs

def detect_platform(career_url):
    if not career_url:
        return 'custom'
    domain = urlparse(career_url).netloc.lower()
    if 'greenhouse.io' in domain:
        return 'greenhouse'
    elif 'lever.co' in domain:
        return 'lever'
    elif 'ashbyhq.com' in domain:
        return 'ashby'
    elif 'workable.com' in domain:
        return 'workable'
    elif 'bamboohr.com' in domain:
        return 'bamboohr'
    elif 'smartrecruiters.com' in domain:
        return 'smartrecruiters'
    elif 'darwinbox.in' in domain:
        return 'darwinbox'
    return 'custom'
