import argparse
from collections import defaultdict
from datetime import date
from hashlib import sha256
import json
from pathlib import Path
import re
from urllib.parse import urlparse

from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

from skills import extract_skills
from parsers import (
    parse_greenhouse, parse_lever, parse_ashby, parse_workable,
    parse_bamboohr, parse_smartrecruiters, parse_custom_html, detect_platform
)

PARSERS = {
    'greenhouse': parse_greenhouse,
    'lever': parse_lever,
    'ashby': parse_ashby,
    'workable': parse_workable,
    'bamboohr': parse_bamboohr,
    'smartrecruiters': parse_smartrecruiters,
}
MAX_JOBS_PER_COMPANY = 5


def board_slug(career_url, platform):
    parsed = urlparse(career_url)
    if platform == 'bamboohr':
        return parsed.hostname.split('.')[0]
    return parsed.path.strip('/').split('/')[0]


def listing_key(url):
    return sha256(url.encode('utf-8')).hexdigest()[:16]


def posted_days(date_posted):
    try:
        return max(0, (date.today() - date.fromisoformat(date_posted[:10])).days)
    except (TypeError, ValueError):
        return None


def role_category(title):
    categories = {
        'AI / ML': r'machine learning|generative ai|data scien|\\bai\\b',
        'Design': r'designer|\\bux\\b|\\bui\\b',
        'Product': r'product (manager|owner|specialist)',
        'Sales & Marketing': r'sales|marketing|account executive|business development',
        'Engineering': r'engineer|developer|architect|devops|security|systems administrator|full stack',
    }
    return next((category for category, pattern in categories.items()
                 if re.search(pattern, title, re.I)), 'Operations')


def format_job(company, job):
    description = BeautifulSoup(job.get('description') or '', 'html.parser').get_text(' ', strip=True)
    url = job['applyUrl']
    return {
        'id': f"job-{company['id']}-{listing_key(url)}",
        'companyId': company['id'],
        'companyName': company['name'],
        'title': job['title'].strip(),
        'industry': company.get('industry', ''),
        'roleCategory': role_category(job['title']),
        'description': description[:650],
        'skills': extract_skills(description),
        'workMode': job.get('workMode') or '',
        'postedDaysAgo': posted_days(job.get('datePosted')),
        'datePosted': job.get('datePosted'),
        'verifiedOn': date.today().isoformat(),
        'hubId': company.get('hubId'),
        'area': job.get('location'),
        'applyUrl': url,
        'jobUrl': url,
    }


def run_scraper(dry_run=False):
    root = Path(__file__).resolve().parent.parent
    with (root / 'scraper' / 'companies.json').open(encoding='utf-8') as stream:
        companies = json.load(stream)
    feed = root / 'public' / 'jobs.json'
    previous = defaultdict(list)
    for job in json.loads(feed.read_text(encoding='utf-8')):
        previous[job['companyId']].append(job)
    if dry_run:
        companies = companies[:5]
    all_jobs = []

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page()
        page.route('**/*', lambda route: route.abort()
                   if route.request.resource_type in ('image', 'media', 'font') else route.continue_())
        for company in companies:
            career = company.get('career', '')
            platform = company.get('platform')
            if not platform or platform == 'custom':
                platform = detect_platform(career)
            parse_board = PARSERS.get(platform)
            try:
                if parse_board:
                    jobs = parse_board(company.get('boardSlug') or board_slug(career, platform))
                else:
                    jobs = parse_custom_html(career, company['name'], page, company.get('detailPattern'))
            except Exception as error:
                print(f"{company['name']}: scrape failed ({error})", flush=True)
                continue

            seen = set()
            count = 0
            jobs.sort(key=lambda job: job.get('datePosted') or '', reverse=True)
            for job in jobs:
                title = (job.get('title') or '').strip()
                url = job.get('applyUrl') or ''
                if not title or not re.search(r'\\bhyderabad\\b', job.get('location') or '', re.I):
                    continue
                if urlparse(url).scheme != 'https' or not urlparse(url).hostname or url.rstrip('/') == career.rstrip('/'):
                    continue
                if url in seen:
                    continue
                all_jobs.append(format_job(company, job))
                seen.add(url)
                count += 1
                if count == MAX_JOBS_PER_COMPANY:
                    break
            # A source can be temporarily inaccessible. Keep recently checked,
            # employer-sourced rows for that company while its board recovers.
            if not jobs:
                for job in previous[company['id']]:
                    checked = posted_days(job.get('verifiedOn'))
                    if checked is not None and checked <= 7:
                        all_jobs.append({**job, 'postedDaysAgo': posted_days(job.get('datePosted'))})
                        count += 1
            print(f"{company['name']}: {count} Hyderabad postings", flush=True)

        browser.close()

    if not dry_run and all_jobs:
        temporary = feed.with_suffix('.tmp')
        temporary.write_text(json.dumps(all_jobs, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        temporary.replace(feed)
    elif not dry_run:
        raise RuntimeError('No postings were retrieved. The previous feed was left in place.')
    print(f"{len(all_jobs)} postings across {len({job['companyId'] for job in all_jobs})} companies.")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true', help='Check five companies without writing the feed')
    run_scraper(dry_run=parser.parse_args().dry_run)
