---
id: databricks-security-basics
title: Databricks Security Basics — Tokens, Users & Groups
sidebar_label: Security Basics
description: A beginner-friendly guide to Databricks security, explaining tokens, users, groups, and access control in a story format for easy understanding.
keywords:
  - Databricks security
  - Databricks tokens
  - Databricks users and groups
  - Databricks access control
  - Databricks beginner security
---

# Databricks Security Basics — Tokens, Users & Groups

You’re back at **ShopWave**, our fictional retail company.  
You’ve set up your first notebooks, clusters, and dashboards. Everything seems perfect—until your manager asks:

> **“How do we make sure only the right people can access sensitive data?”**

Welcome to the world of **Databricks Security**.

---

## 🛡️ Why Security Matters in Databricks

Databricks houses **valuable business data**, including:

- Customer PII  
- Sales transactions  
- Payment info  
- ML models  
- Inventory forecasts  

Without proper security:

- Analysts might accidentally access restricted tables  
- Notebooks could be shared outside the team  
- Jobs and pipelines could be modified by unauthorized users  

Security in Databricks ensures **access is controlled, data is protected, and compliance is maintained**.

---

## 👤 Users — Who Can Log In?

A **user** is anyone with a Databricks account.  
Each user has:

- Login credentials (email/password, SSO)  
- Assigned roles  
- Permissions to access workspace resources  

At ShopWave:

- Alice is a **data engineer**  
- Bob is a **data scientist**  
- Carol is a **business analyst**  

Each has different privileges according to their role.

---

## 👥 Groups — Organize Users Efficiently

Instead of assigning permissions individually, Databricks uses **groups**:

- Engineers group → full cluster and notebook access  
- Analysts group → read access to dashboards and tables  
- Data scientists group → access to ML features and Delta tables  

**Benefits:**

- Easier management for large teams  
- Consistent access policies  
- Quick onboarding of new employees  

ShopWave creates groups for each department to simplify security management.

---

## 🔑 Personal Access Tokens — Programmatic Access

Sometimes, scripts or notebooks need to **access Databricks without a password**.

Enter **personal access tokens**:

- Used for API access  
- Can be time-limited  
- Can be revoked at any time  

Example use cases at ShopWave:

- CI/CD pipelines fetching notebooks  
- Automated ETL jobs reading Delta tables  
- External apps running queries via the Databricks REST API  

---

## 🏛️ Access Control Levels

Databricks provides **layered access control**:

| Level | Description |
|-------|-------------|
| Workspace | Who can see notebooks, folders, repos |
| Cluster | Who can start, edit, or terminate clusters |
| Data / Tables | Who can read, write, or manage Delta tables |
| Jobs | Who can create, schedule, or run jobs |
| Account-level | Admins controlling global workspace settings |

ShopWave enforces **least privilege principle**: each user only gets access needed for their job.

---

## 🔐 Security Best Practices

1. **Use groups** instead of individual permissions  
2. **Enable SSO** (Single Sign-On) for authentication  
3. **Rotate personal access tokens** regularly  
4. **Audit workspace activity** using Unity Catalog logs  
5. **Enforce multi-factor authentication (MFA)**  
6. **Apply table-level and row-level security** for sensitive data  

Following these practices prevents accidental leaks and ensures compliance.

---

## 🧠 Story Recap — ShopWave Security in Action

1. Alice (Engineer) runs ETL jobs on clusters → belongs to **Engineers Group**  
2. Bob (Data Scientist) trains ML models → belongs to **Data Scientists Group**  
3. Carol (Analyst) queries dashboards → belongs to **Analysts Group**  
4. Tokens are issued for API automation → securely revoked when done  
5. Admin monitors access → ensures everyone follows least privilege  

Result: ShopWave keeps data safe, while teams remain productive.

---

## 🏁 Quick Summary 

- **Users** are individual Databricks accounts; **Groups** manage access collectively.  
- **Personal Access Tokens** allow secure programmatic access.  
- **Access control layers** include workspace, clusters, tables, and jobs.  
- Security best practices: SSO, MFA, auditing, least privilege, and token rotation.  
- Proper security ensures **data protection, compliance, and team productivity**.

---

# 🚀 Coming Next

👉 **Databricks DBFS — Internal File System Explained**


