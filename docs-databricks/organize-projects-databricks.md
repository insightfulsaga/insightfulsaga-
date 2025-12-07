---
id: organize-projects-databricks
title: How to Organize Projects in Databricks — Best Folder Strategy
sidebar_label: Organize Projects
description: Beginner-friendly guide on organizing projects in Databricks with best folder structure, workspace organization, and collaboration tips.
keywords:
  - Databricks project organization
  - Databricks workspace structure
  - Databricks folder strategy
  - Databricks best practices
---

## How to Organize Projects in Databricks — Best Folder Strategy

Welcome back to **ShopWave**, our fictional retail company.  
Your manager asks:

> **“Our workspace is messy! How do we organize projects so everyone can find things easily?”**

Let’s walk through **best practices for organizing Databricks projects** in a story-based, beginner-friendly way.

---

## 🏗️ Why Project Organization Matters

Without a proper structure:

- Notebooks get lost  
- Teams overwrite each other’s work  
- Jobs and pipelines become hard to maintain  
- Collaboration slows down  

With a good structure, ShopWave:

- Finds ETL notebooks quickly  
- Tracks ML experiments  
- Shares dashboards efficiently  
- Maintains clear permissions for sensitive data  

---

## 🗂️ Recommended Folder Structure

Here’s a **proven structure** for Databricks projects:

```

/Workspace
├── /Users
│    └── /<username>
│         └── /personal_notebooks
├── /Shared
│    ├── /ETL
│    ├── /ML
│    ├── /SQL
│    └── /Dashboards
├── /Repos
│    └── /git_repos
└── /Projects
├── /Project_A
│    ├── /Data
│    ├── /Notebooks
│    ├── /Models
│    └── /Jobs
└── /Project_B
├── /Data
├── /Notebooks
├── /Models
└── /Jobs

```

---

## 🔹 Folder Explanation

### 1️⃣ `/Users/<username>/personal_notebooks`
- Personal experiments and practice notebooks  
- Safe to try new code without affecting team projects  

### 2️⃣ `/Shared`
- Common notebooks and resources for the team  
- Subfolders by function: ETL, ML, SQL, Dashboards  
- Everyone can collaborate, but with controlled permissions  

### 3️⃣ `/Repos`
- Git-integrated folders for version-controlled projects  
- Sync notebooks with GitHub, GitLab, or Bitbucket  
- Ideal for reproducibility and CI/CD pipelines  

### 4️⃣ `/Projects/<Project_Name>`
- Full project-level structure  
- Includes **data**, **notebooks**, **models**, and **jobs**  
- Keeps production-ready code organized  
- Easy to assign RBAC and monitor activity  

---

## 🧩 Best Practices for Project Organization

1. **Use descriptive folder names** → avoids confusion  
2. **Separate personal vs shared work** → prevents accidental edits  
3. **Organize by project** → ETL, ML, BI dashboards  
4. **Integrate with Git** → version control and collaboration  
5. **Set access permissions at folder level** → least privilege principle  
6. **Archive old projects** → reduces clutter and storage cost  

**ShopWave Tip:** Assign **one project lead** to maintain folder consistency.

---

## 🏢 Real Business Example — ShopWave

- **ETL Team:** Saves notebooks in `/Shared/ETL`  
- **ML Team:** Stores trained models in `/Projects/RecommendationEngine/Models`  
- **Analytics Team:** Dashboards in `/Shared/Dashboards`  
- **New Employees:** Start in `/Users/<username>/personal_notebooks` before moving notebooks to shared folders  

Result: **Teams work efficiently without overwriting each other**, and admins can manage access easily.

---

## 🏁 Quick Summary 

- **Organize Databricks projects by personal, shared, and project folders**  
- Use `/Users`, `/Shared`, `/Repos`, and `/Projects` for structure  
- **Best practices:** descriptive names, separate personal vs shared, Git integration, access control, archive old projects  
- Helps teams **collaborate, maintain reproducibility, and reduce clutter**  

---

# 🚀 Coming Next

👉 **Mounting Cloud Storage — ADLS / S3 / GCS**