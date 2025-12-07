---
id: databricks-repos-ci-cd
title: Repos & CI/CD — Git Integration and Code Promotion
sidebar_label: Repos & CI/CD
description: A story-driven guide on Databricks Repos, Git integration, and CI/CD pipelines for managing notebooks, jobs, and production deployments in enterprise environments.
keywords:
  - databricks repos
  - databricks git integration
  - databricks CI/CD
  - databricks code promotion
  - databricks version control
  - databricks deployment automation
  - databricks enterprise workflows
---

# Repos & CI/CD — Git Integration and Code Promotion

## 🎬 Story Time — “We Need Version Control on Notebooks”

Meera, a data engineer, faces recurring issues:

- Developers overwrite each other’s notebooks  
- Production jobs break after untested changes  
- Difficult to track who changed what  

> “We need Git integration and proper CI/CD for Databricks,” she thinks.

Enter **Databricks Repos + CI/CD pipelines** — a seamless solution to version control, collaboration, and deployment.

---

## 🔥 1. What Are Databricks Repos?

Databricks Repos allow teams to:

- Clone Git repositories into Databricks  
- Edit notebooks, scripts, and SQL directly  
- Commit and push changes to Git  
- Work collaboratively without breaking production  

Supports:

- GitHub  
- GitLab  
- Bitbucket  
- Azure DevOps  

---

## 🧱 2. Key Benefits

### Collaboration & Version Control
- Track notebook versions  
- Revert changes easily  
- Branching for feature development  

### Production Safety
- Separate dev/test/prod branches  
- CI/CD pipelines for automated deployments  

### Enterprise Governance
- Audit changes  
- Role-based access  
- Integrate with CI/CD tools  

---

## ⚙️ 3. Setting Up Databricks Repos

1. Go to **Repos → Add Repo → Git Provider**  
2. Authenticate via token or OAuth  
3. Clone the repo into Databricks workspace  

```

/Repos/company/etl-project

```

- Edit notebooks or scripts  
- Commit and push changes from UI or CLI  

---

## 🔄 4. Branching Strategy

Meera recommends:

- `main` → Production-ready code  
- `dev` → Development branch  
- `feature/*` → Experimental features  

Developers:

- Make changes in `feature` branches  
- Merge to `dev` after review  
- Promote to `main` via CI/CD  

---

## 🛠️ 5. CI/CD for Databricks

Databricks integrates with standard CI/CD tools:

- GitHub Actions  
- Azure DevOps Pipelines  
- GitLab CI  

### Example Workflow:

1. Developer commits notebook changes to `dev` branch  
2. CI pipeline runs:
   - Unit tests on notebooks/scripts  
   - Data validation checks  
   - Build artifact creation  
3. Merge approved changes to `main`  
4. CD pipeline deploys notebooks/jobs to production workspace  

---

## 🧪 6. Example: GitHub Actions for Notebook Deployment

```yaml
name: Deploy to Databricks
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Install Databricks CLI
        run: pip install databricks-cli
      - name: Configure Databricks CLI
        run: databricks configure --token
      - name: Deploy Notebooks
        run: databricks workspace import_dir ./notebooks /Workspace/ETL --overwrite
```

* Automatically updates production workspace
* Reduces human errors
* Ensures reproducibility

---

## 🔐 7. Best Practices for Repos & CI/CD

1. Use **feature branches** for development
2. Review notebooks via **pull requests**
3. Test notebooks with **unit tests or PyTest**
4. Promote to production via **automated pipelines**
5. Tag releases for auditability
6. Store secrets securely using **Databricks secrets**
7. Enable logging and monitoring for CI/CD jobs

---

## 📊 8. Real-World Story — Meera’s Team

Before Repos & CI/CD:

* Broken pipelines
* Conflicting notebook versions
* Manual deployments

After implementing:

* All notebooks under Git
* Feature branches tested automatically
* Production pipelines deployed via CI/CD
* Team productivity and reliability improved drastically

Meera proudly notes:

> “Code promotion and versioning finally work seamlessly.”

---

## 📘 Summary

Databricks Repos + CI/CD enable:

* ✔ Git-backed version control

* ✔ Collaborative development

* ✔ Branching & feature management

* ✔ Automated testing and deployment

* ✔ Production reliability

* ✔ Governance and auditability

A must-have for **enterprise-scale Databricks workflows**.

---

# 👉 Next Topic

**Databricks Monitoring Dashboard — Usage, Cost & Metrics**
