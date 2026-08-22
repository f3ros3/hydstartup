import re

SKILLS_DICT = {
    "Languages": ["Python", "Java", "JavaScript", "TypeScript", "C++", "C#", "Go", "Ruby", "PHP", "Rust", "Swift", "Kotlin", "Scala"],
    "Frameworks": ["React", "Angular", "Vue.js", "Django", "Flask", "Spring Boot", "Node.js", "Express", "Ruby on Rails", ".NET", "FastAPI"],
    "Cloud": ["AWS", "Azure", "Google Cloud", "GCP", "Docker", "Kubernetes", "Terraform", "Serverless", "Lambda", "EC2", "S3"],
    "Data": ["SQL", "Pandas", "NumPy", "Apache Spark", "Hadoop", "Kafka", "Airflow", "Tableau", "Power BI", "Snowflake", "Databricks"],
    "AI/ML": ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Scikit-Learn", "NLP", "Computer Vision", "LLMs", "OpenAI", "Generative AI"],
    "DevOps": ["CI/CD", "Jenkins", "GitLab CI", "GitHub Actions", "Ansible", "Prometheus", "Grafana", "ELK", "Linux"],
    "Databases": ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Cassandra", "Elasticsearch", "DynamoDB", "Oracle", "SQL Server"],
    "Tools": ["Git", "Jira", "Confluence", "Postman", "Swagger", "Figma", "Excel"]
}

def extract_skills(description_text):
    if not description_text:
        return []
    
    text = description_text.lower()
    found_skills = set()
    
    for category, skills in SKILLS_DICT.items():
        for skill in skills:
            escaped_skill = re.escape(skill.lower())
            pattern = r'\b' + escaped_skill + r'(?:\b|\s)'
            if skill.lower() in ["c++", "c#", ".net", "vue.js", "node.js"]:
                if skill.lower() in text:
                     found_skills.add(skill)
            elif re.search(pattern, text):
                found_skills.add(skill)
                
    return list(found_skills)

def extract_experience(text):
    if not text:
        return 'Fresher (0-1 yr)'
        
    text = text.lower()
    
    if re.search(r'(6\+|7\+|8\+|10\+)\s*years?', text) or re.search(r'[6-9]-', text):
        return 'Senior / Lead (6+ yrs)'
    elif re.search(r'(3\+|4\+|5\+)\s*years?', text) or re.search(r'[3-5]-', text):
        return 'Mid-Level (3-6 yrs)'
    elif re.search(r'(1\+|2\+)\s*years?', text) or re.search(r'[1-2]-', text):
        return 'Junior (1-3 yrs)'
    elif 'fresher' in text or '0-1' in text or '0 to 1' in text:
        return 'Fresher (0-1 yr)'
        
    return 'Mid-Level (3-6 yrs)'

def extract_work_mode(text):
    if not text:
        return 'Hybrid'
        
    text = text.lower()
    if 'remote' in text or 'work from home' in text:
        return 'Remote'
    elif 'hybrid' in text:
        return 'Hybrid'
    elif 'on-site' in text or 'onsite' in text or 'in-office' in text:
        return 'On-site'
        
    return 'Hybrid'

def extract_salary(text):
    if not text:
        return 'Not Disclosed'
        
    text = text.lower()
    salary_match = re.search(r'(₹|rs\.?|inr)\s*([\d,]+(\.\d+)?)\s*(lpa|lakhs?|crores?|k)?', text)
    if salary_match:
        return salary_match.group(0).upper()
        
    if re.search(r'[\d,]+\s*(lpa|lakhs?|ctc)', text):
        return re.search(r'[\d,]+\s*(lpa|lakhs?|ctc)', text).group(0).upper()
        
    return 'Not Disclosed'
