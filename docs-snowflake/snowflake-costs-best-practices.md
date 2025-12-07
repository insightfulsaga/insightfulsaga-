---
id: snowflake-costs-best-practices
title: Understanding Snowflake Compute Cost, Storage Cost & Best Practices
sidebar_label: Compute & Storage Costs
description: A simple, story-style explanation of Snowflake compute and storage costs, how pricing works, how warehouses consume credits, and real-world cost optimization best practices.
keywords:
  - snowflake compute cost
  - snowflake storage pricing
  - snowflake credit consumption
  - snowflake cost best practices
  - snowflake pricing explained
---

# Understanding Snowflake Compute Cost, Storage Cost & Best Practices  
*A story-based guide to understanding how Snowflake charges your account*

Snowflake is powerful and flexible — but if you’re new to it, its pricing model may feel like a mysterious vending machine.  
You insert credits… and suddenly your data pipelines are running, dashboards refreshing, and your boss is impressed.

But **how exactly is Snowflake charging you?**

And more importantly:

**How do you avoid surprise bills while keeping performance high?**

Let’s break it down in a simple, modern, story-driven way.

---

# 🎭 The Story of Snowflake Costs  
Imagine running a smart digital factory:

- **Compute** = the workers doing the tasks  
- **Storage** = shelves holding your raw materials  
- **Cloud Services** = managers coordinating workers  

Snowflake prices each part differently.

Let’s explore the two major cost buckets:  
**Compute Cost** and **Storage Cost**.

---

# ⚡ 1. Compute Cost — Your Main Expense  
*This is where 70–90% of Snowflake spend usually goes.*

Compute = **Virtual Warehouses** and **Serverless Compute**.

Examples:
- Query execution  
- ETL/ELT jobs  
- BI dashboards  
- Snowpipe streaming  
- Tasks & stored procedures  
- Materialized view refreshes  

## 💳 How Compute Is Charged
Snowflake compute is charged in **credits per hour**, billed **by the second** (minimum 60 seconds).

### Example Warehouse Credit Consumption  
| Warehouse Size | Credits per Hour |
|---------------|------------------|
| X-Small       | 1                |
| Small         | 2                |
| Medium        | 4                |
| Large         | 8                |
| X-Large       | 16               |

The bigger the warehouse → the more credits burned per hour → the faster your queries.

## 🕒 Compute Billing Example  
You run a Medium warehouse for 5 minutes:

- Medium = 4 credits/hour  
- 5 minutes = 0.083 hours  
- Cost → 4 × 0.083 = **0.33 credits**  

Snowflake bills very fairly — pay-per-second compute is one of its biggest advantages.

---

# 📦 2. Storage Cost — Cheap & Predictable  
Snowflake storage is extremely affordable compared to compute.

Storage costs are based on:
- Total compressed data stored  
- Time Travel retention  
- Fail-safe retention  
- Staged files  

### Rough monthly estimate (varies by cloud provider):
**~$23 per TB per month** for active storage.

Time Travel + Fail-safe add a bit more, depending on edition.

### Storage Example  
If you store:

- 2 TB Raw data  
- 1 TB Processed data  
- 0.5 TB Staged files  

Total → 3.5 TB  
Monthly cost → roughly 3.5 × $23 ≈ **$80.50**

Storage is cheap — compute is where you must optimize.

---

# ☁️ 3. Cloud Services — Free… Until 10%  
Snowflake includes Cloud Services usage **for free up to 10% of compute**.

Cloud Services includes:
- Query optimization  
- Authentication  
- Metadata management  
- Transaction coordination  
- Security & governance  

If a workload heavily stresses metadata/catalog operations, Cloud Services may exceed the 10% threshold and incur costs — but this is rare.

---

# 📊 4. Where Companies Accidentally Spend Too Much  
Based on industry usage patterns, overspending usually happens because of:

### ❌ 1. Warehouses left running overnight  
People forget to suspend them.

### ❌ 2. Warehouses sized too large  
Using a Large WH when Small is enough.

### ❌ 3. Too many BI users on a single WH  
Better to use multi-cluster or separate warehouses.

### ❌ 4. Poorly written SQL  
Inefficient joins or SELECT * from large tables.

### ❌ 5. Huge Time Travel retention  
Keeping old data for 90 days when not needed.

### ❌ 6. Loading massive files without partitioning  
Leading to slow performance and longer-running compute.

---

# 🧠 5. Best Practices to Reduce Snowflake Cost  
These tips are used by top Snowflake architects to cut cost **without reducing performance**.

---

## 🛑 Best Practice #1 — Always Enable Auto-Suspend  
Set suspend time to **60 seconds** or lower.

Example:
```sql
ALTER WAREHOUSE MY_WH
  SET AUTO_SUSPEND = 60;
````

Warehouses sleeping = money saved.

---

## 🚀 Best Practice #2 — Use Auto-Resume

Only pay when someone uses the warehouse.

---

## ⚖ Best Practice #3 — Right-Size Your Warehouses

Before scaling **up**, try scaling **out** or optimizing queries.

### Rule of thumb:

* X-Small → Light development
* Small → BI dashboards
* Medium → ETL jobs
* Large → Heavy pipelines
* XL+ → Massive workloads or ML processing

---

## 📚 Best Practice #4 — Avoid SELECT *

Selecting all columns forces Snowflake to scan more data → more compute → more cost.

Instead, always **select only what you need**.

---

## 🎯 Best Practice #5 — Use Caching Effectively

Keeping warehouses running removes cache — try not to suspend/restart too frequently for high-repeat workloads.

---

## 🧹 Best Practice #6 — Prune Unused Tables & Stages

Old transient tables and unneeded staged files waste money.

---

## 🕒 Best Practice #7 — Control Time Travel Retention

Set appropriate retention:

### Example:

```sql
ALTER TABLE MY_TABLE SET DATA_RETENTION_TIME_IN_DAYS = 3;
```

Not every table needs 90-day retention.

---

## 📊 Best Practice #8 — Use Resource Monitors

Prevent runaway costs from:

* Bad queries
* Loops
* Unplanned heavy jobs

Example:

```sql
CREATE RESOURCE MONITOR credit_guard
  WITH CREDIT_QUOTA = 200
  TRIGGERS ON 75 PERCENT DO NOTIFY
           ON 100 PERCENT DO SUSPEND;
```

---

# 🏢 6. Real-World Company Cost Optimization Example

A company before optimization:

* 6 warehouses running 24/7
* ETL pipelines taking too long
* BI dashboards slow
* Storage growing out of control

After implementing best practices:

* ETL warehouse moved from Large → Medium
* Auto-suspend enabled across all WH
* BI given its own multi-cluster Small WH
* Time Travel reduced from 90 to 7 days for non-critical data
* Storage staging cleaned weekly

**Total monthly savings: 40–60%** without any performance degradation.

---

# 🎯 One-Sentence Summary

**Compute is Snowflake’s main cost driver, storage is cheap, and smart warehouse management can cut your bill by up to 70%.**

---

# 🚀 Next Topic

👉 **Difference Between Snowflake & Traditional Databases**

