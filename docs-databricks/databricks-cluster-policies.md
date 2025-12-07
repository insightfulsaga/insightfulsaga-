---
id: databricks-cluster-policies
title: Cluster Policies — Cost & Security Enforcement
sidebar_label: Cluster Policies
description: A story-driven, practical guide on using Databricks Cluster Policies to enforce cost controls, security settings, and standardized configurations for enterprise workloads.
keywords:
  - databricks cluster policies
  - databricks cost control
  - databricks cluster security
  - databricks governance
  - databricks enterprise clusters
  - databricks policy enforcement
---

# Cluster Policies — Cost & Security Enforcement

## 🎬 Story Time — “Clusters Out of Control”

Priya, a data engineering manager, notices the company’s Databricks costs skyrocketing:

- Multiple large clusters running overnight  
- Developers creating expensive GPU clusters for simple ETL  
- Misconfigured clusters with weak security settings  

> “We need control without slowing down our team,” she thinks.  

Enter **Databricks Cluster Policies** — the tool that balances **governance, cost, and security**.

---

## 🔥 1. What Are Cluster Policies?

Cluster Policies allow admins to:

- Enforce rules for all clusters  
- Restrict instance types  
- Set minimum/maximum node counts  
- Control auto-termination timers  
- Restrict access to sensitive network/security configurations  
- Apply governance without blocking developers  

Essentially, **control the environment without slowing down innovation**.

---

## 🧱 2. Why Cluster Policies Matter

### Cost Control
- Prevent large, expensive clusters  
- Enforce auto-termination  
- Limit GPU usage to approved projects  

### Security & Compliance
- Enforce secure cluster configurations  
- Control IAM roles & credential passthrough  
- Prevent risky network settings  

### Standardization
- Maintain cluster consistency across teams  
- Reduce debugging caused by misconfigured clusters  

---

## ⚙️ 3. Creating a Cluster Policy

1. Go to **Admin Console → Cluster Policies → Create Policy**  
2. Define **policy name**: `ETL_Default_Policy`  
3. Set rules:

```json
{
  "num_workers": {
    "type": "range",
    "minValue": 2,
    "maxValue": 8,
    "defaultValue": 4
  },
  "spark_version": {
    "type": "fixed",
    "value": "13.2.x-scala2.12"
  },
  "node_type_id": {
    "type": "allowed",
    "values": ["Standard_DS3_v2", "Standard_DS4_v2"],
    "defaultValue": "Standard_DS3_v2"
  },
  "autotermination_minutes": {
    "type": "fixed",
    "value": 60
  }
}
```

4. Assign policy to users/groups
5. Users creating clusters must now comply with the policy

---

## 🧪 4. Example Use Cases

### ✅ Cost Control for ETL Pipelines

* Limit worker nodes
* Restrict expensive instances
* Enforce 30-minute auto-termination

### ✅ Security for Sensitive Data

* Enforce credential passthrough
* Restrict public network access
* Prevent elevated IAM roles

### ✅ Standardization Across Teams

* Same Spark version across dev, QA, and prod
* Consistent logging & monitoring configurations

---

## 🔄 5. Advanced Policy Rules

Cluster policies support:

* **Conditional rules** based on user groups
* **Dynamic defaults** depending on workload type
* **Regex validation** for cluster names
* **Enforcing init scripts** for compliance or monitoring

Example:

```json
{
  "cluster_name": {
    "type": "regex",
    "pattern": "^(etl|ml|analytics)-.*$"
  }
}
```

All clusters must now follow naming conventions.

---

## 🛡️ 6. Real-World Story — Priya’s Success

Before policies:

* 50 clusters running every night
* Cost: $25k/month

After applying **Cluster Policies**:

* Unapproved instance types blocked
* Auto-termination enforced
* Standardized Spark version applied

Result:

* Cost dropped 35%
* Security compliance ensured
* Developers could still create clusters without waiting for approvals

Priya smiles:

> “We have control and agility — finally!”

---

## 🧠 Best Practices

1. Start with **lightweight policies**, then tighten gradually
2. Apply policies **per user group or workspace**
3. Enforce **auto-termination** to control idle cost
4. Standardize **Spark versions and node types**
5. Use **init scripts** for monitoring or compliance
6. Audit cluster creation and failures
7. Communicate policy changes to teams

---

## 📘 Summary

Databricks Cluster Policies enable:

* ✔ Cost governance

* ✔ Security enforcement

* ✔ Standardized cluster configurations

* ✔ Reduced idle compute costs

* ✔ Compliance with enterprise regulations

A must-have tool for **enterprise-scale Databricks deployments**.

---

# 👉 Next Topic

**Repos & CI/CD — Git Integration and Code Promotion**
