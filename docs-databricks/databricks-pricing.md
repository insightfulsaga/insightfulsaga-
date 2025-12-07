---
id: databricks-pricing
title: Databricks Pricing — How Clusters, SQL & Jobs Are Charged
sidebar_label: Databricks Pricing
description: Beginner-friendly guide to Databricks pricing, explaining costs for clusters, SQL warehouses, and jobs, with practical examples for real business use cases.
keywords:
  - Databricks pricing
  - Databricks cost explained
  - Databricks clusters cost
  - Databricks SQL warehouse pricing
  - Databricks jobs pricing
---

# Databricks Pricing — How Clusters, SQL & Jobs Are Charged

Welcome back to **ShopWave**, our fictional retail company.  
Your manager asks a critical question during a budget review meeting:

> **“How much are we spending on Databricks, and why does it fluctuate?”**

Understanding Databricks pricing is essential for **controlling costs and planning resources effectively**.

---

## 🏗️ Pricing is Based on Compute + Storage

Databricks bills based on:

1. **Compute** — Running clusters or SQL warehouses  
2. **Storage** — Delta tables, files in DBFS, and cloud storage  

Think of it like this:

> Compute = “How hard the engine works”  
> Storage = “How much room you use in the warehouse”

---

## 💻 Cluster Pricing

Clusters are the main compute engine for:

- Notebooks  
- ETL pipelines  
- Machine learning  
- Streaming jobs  

**Pricing depends on:**

- **Number of nodes** (driver + worker nodes)  
- **Node type** (standard, memory-optimized, GPU)  
- **Cluster type**:  
  - Interactive → billed per second while active  
  - Job clusters → billed per run  

**Example at ShopWave:**

- Small Python notebook cluster: 2 nodes × $0.20/hr → ~$0.40/hr  
- Large ML GPU cluster: 4 nodes × $2/hr → ~$8/hr  

💡 Tip: **Terminate idle clusters** to save costs.

---

## ⚡ SQL Warehouse Pricing

SQL warehouses (formerly SQL endpoints) are optimized for **dashboards and analytics**.

- Billed based on **compute size + time running**  
- Can scale **up or down** automatically  
- Concurrency matters: More users querying → bigger warehouse → higher cost  

**ShopWave scenario:**

- A dashboard warehouse with 4 “serverless” units → ~$1.50/hr  
- During peak reporting → auto-scale to 8 units → ~$3/hr  
- At night → auto-terminate → $0/hr  

SQL warehouses are cheaper if **auto-scaling and auto-termination** are enabled.

---

## 🏃 Jobs Pricing

Databricks **Jobs** are scheduled workflows (ETL, ML pipelines, notebooks).

- Charged based on the **compute used during execution**  
- Job clusters are **temporary** → cost only while running  
- Duration × cluster type determines the total  

**Example at ShopWave:**

- Daily ETL job runs for 30 minutes on 3-node cluster  
- 3 nodes × $0.50/hr × 0.5 hr = $0.75/day  
- Monthly cost ≈ $22.50  

---

## 💰 Storage Costs

- DBFS storage = cost of underlying cloud storage (S3, ADLS, GCS)  
- Delta tables, CSV, Parquet, or model artifacts stored here  
- Charges depend on **size and retention**  
- Versioning and time travel in Delta Lake also consume storage  

**ShopWave tip:** Clean up old Delta versions to save costs.

---

# 🔄 Cost Optimization Tips

1. **Auto-terminate clusters** → no idle costs  
2. **Use job clusters** → temporary compute for pipelines  
3. **Auto-scale SQL warehouses** → right-size for concurrency  
4. **Monitor usage metrics** → identify expensive workloads  
5. **Archive or delete old data** → reduce storage charges  
6. **Use spot/preemptible instances** → lower compute costs  

---

## 🧠 Real Business Example — ShopWave

1. Data engineering team runs ETL jobs on **job clusters** → billed only for runtime.  
2. BI dashboards use **serverless SQL warehouses** → auto-scaled to save money.  
3. ML team trains models on GPU clusters → costs monitored and allocated to projects.  
4. Admin regularly cleans old DBFS files → storage costs minimized.  

Result: **Optimized compute + storage → predictable monthly costs.**

---

## 🏁 Quick Summary 

- Databricks pricing = **compute + storage**  
- Clusters = charged per node × time, interactive or job-based  
- SQL warehouses = charged per compute unit × time, optimized for BI  
- Jobs = charged only while running on job clusters  
- Storage = underlying cloud storage usage + Delta Lake versioning  
- Cost optimization = auto-terminate clusters, auto-scale warehouses, clean storage  

---

# 🚀 Coming Next

👉 **Databricks Community Edition vs Enterprise vs Premium**


