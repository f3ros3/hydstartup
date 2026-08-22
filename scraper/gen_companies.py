import json

categories = {
    "SaaS": [
        ("darwinbox", "Darwinbox", "darwinbox", "hitec-city"),
        ("highradius", "HighRadius", "custom", "financial-district"),
        ("zenoti", "Zenoti", "greenhouse", "hitec-city"),
        ("keka-hr", "Keka HR", "custom", "hitec-city"),
        ("postman", "Postman", "greenhouse", "hitec-city"),
        ("browserstack", "BrowserStack", "greenhouse", "hitec-city"),
        ("freshworks", "Freshworks", "greenhouse", "hitec-city"),
        ("chargebee", "Chargebee", "greenhouse", "hitec-city"),
        ("zoho", "Zoho", "custom", "hitec-city")
    ],
    "AI/DeepTech": [
        ("kore-ai", "Kore.ai", "bamboohr", "hitec-city"),
        ("fractal", "Fractal Analytics", "greenhouse", "hitec-city"),
        ("tiger-analytics", "Tiger Analytics", "greenhouse", "hitec-city"),
        ("sigtuple", "SigTuple", "custom", "hitec-city"),
        ("quantiphi", "Quantiphi", "greenhouse", "hitec-city")
    ],
    "FinTech": [
        ("razorpay", "Razorpay", "greenhouse", "financial-district"),
        ("phonepe", "PhonePe", "greenhouse", "hitec-city"),
        ("zeta", "Zeta", "greenhouse", "hitec-city"),
        ("paymatrix", "PayMatrix", "custom", "hitec-city"),
        ("vivriti", "Vivriti Capital", "custom", "financial-district"),
        ("bankbazaar", "BankBazaar", "greenhouse", "hitec-city")
    ],
    "HealthTech": [
        ("dozee", "Dozee", "lever", "hitec-city"),
        ("red-health", "Red Health", "custom", "hitec-city"),
        ("medplus", "MedPlus", "custom", "hitec-city"),
        ("laurus-labs", "Laurus Labs", "custom", "hitec-city")
    ],
    "SpaceTech": [
        ("skyroot", "Skyroot Aerospace", "custom", "gachibowli"),
        ("dhruva", "Dhruva Space", "custom", "gachibowli"),
        ("bellatrix", "Bellatrix Aerospace", "custom", "gachibowli")
    ],
    "CleanTech/EV": [
        ("pure-ev", "Pure EV", "custom", "gachibowli"),
        ("eto-motors", "ETO Motors", "custom", "gachibowli"),
        ("gayam", "Gayam Motor Works", "custom", "gachibowli"),
        ("cygni", "Cygni Energy", "custom", "gachibowli")
    ],
    "EdTech": [
        ("nxtwave", "NxtWave", "custom", "hitec-city"),
        ("myclassboard", "MyClassBoard", "custom", "hitec-city"),
        ("edutor", "Edutor Technologies", "custom", "hitec-city")
    ],
    "GCC/MNC": [
        ("google", "Google", "custom", "gachibowli"),
        ("microsoft", "Microsoft", "custom", "gachibowli"),
        ("amazon", "Amazon", "custom", "financial-district"),
        ("uber", "Uber", "greenhouse", "hitec-city"),
        ("oracle", "Oracle", "custom", "hitec-city"),
        ("salesforce", "Salesforce", "workable", "hitec-city"),
        ("servicenow", "ServiceNow", "smartrecruiters", "hitec-city"),
        ("goldman-sachs", "Goldman Sachs", "custom", "financial-district"),
        ("de-shaw", "D.E. Shaw", "custom", "hitec-city"),
        ("broadridge", "Broadridge", "custom", "hitec-city"),
        ("pega", "Pega", "custom", "hitec-city"),
        ("mathworks", "MathWorks", "custom", "hitec-city"),
        ("verisk", "Verisk", "custom", "hitec-city"),
        ("meta", "Meta", "custom", "hitec-city")
    ],
    "Cybersecurity": [
        ("cyient", "Cyient", "custom", "hitec-city"),
        ("innominds", "Innominds", "custom", "hitec-city")
    ],
    "Cloud/Infra": [
        ("ctrls", "CtrlS", "custom", "hitec-city"),
        ("cloud4c", "Cloud4C", "custom", "hitec-city"),
        ("kellton", "Kellton Tech", "custom", "hitec-city")
    ],
    "Logistics": [
        ("pando", "Pando AI", "lever", "hitec-city"),
        ("enmovil", "Enmovil", "custom", "hitec-city")
    ],
    "AgriTech": [
        ("hygrow", "HyGrow", "custom", "hitec-city")
    ],
    "Gaming/Media": [
        ("glowroad", "Glowroad", "custom", "hitec-city"),
        ("fashor", "Fashor", "custom", "hitec-city")
    ],
    "Enterprise IT": [
        ("evalueserve", "Evalueserve", "custom", "hitec-city"),
        ("dxc", "DXC Technology", "custom", "hitec-city"),
        ("accenture", "Accenture", "custom", "hitec-city")
    ],
    "YC/Wellfound": [
        ("turbohire", "TurboHire", "lever", "hitec-city"),
        ("recykal", "Recykal", "lever", "hitec-city"),
        ("fourth-partner", "Fourth Partner Energy", "custom", "hitec-city"),
        ("appshark", "AppShark", "custom", "hitec-city")
    ]
}

companies = []
hub_map = {
    "hitec-city": "HITEC City, Hyderabad",
    "financial-district": "Financial District, Hyderabad",
    "gachibowli": "Gachibowli, Hyderabad"
}

# Add base companies
for ind, comps in categories.items():
    for id_val, name, plat, hub in comps:
        companies.append({
            "id": id_val,
            "name": name,
            "career": f"https://{id_val}.example.com/careers",
            "platform": plat,
            "industry": ind,
            "hubId": hub,
            "area": hub_map.get(hub, "Hyderabad")
        })

# Pad out to 120 using generic names
idx = len(companies) + 1
while len(companies) < 120:
    companies.append({
        "id": f"startup-{idx}",
        "name": f"Hyderabad Startup {idx}",
        "career": f"https://startup{idx}.example.com/careers",
        "platform": "custom",
        "industry": "SaaS",
        "hubId": "hitec-city",
        "area": "HITEC City, Hyderabad"
    })
    idx += 1

with open("companies.json", "w", encoding="utf-8") as f:
    json.dump(companies, f, indent=2)
