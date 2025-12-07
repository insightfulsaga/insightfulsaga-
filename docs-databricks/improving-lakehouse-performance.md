---
id: improving-lakehouse-performance
title: Improving Lakehouse Performance — Dos & Don’ts
sidebar_label: Lakehouse Performance
description: Learn the essential performance optimization techniques for the Databricks Lakehouse. A story-driven, SEO-friendly guide covering file management, Z-ORDER, caching, Photon, SQL tuning, and architecture best practices.
keywords:
  - Databricks performance tuning
  - Lakehouse performance best practices
  - Delta Lake optimization
  - Databricks tuning guide
  - data engineering performance
---

# Improving Lakehouse Performance — Dos & Don’ts

## ✨ Story Time — “Why Is the Lakehouse Getting Slower?”

Ethan is the lead data engineer at a fast-scaling startup.

What began as a simple Lakehouse with 10 tables has now grown to:

- 200+ tables  
- Multiple ETL pipelines  
- Streaming + batch mixed workloads  
- Dashboards hitting data every few minutes  

Suddenly:

- Queries slow down  
- Jobs take longer  
- Costs spike  
- The CTO asks:  
  **“Is our Lakehouse breaking?”**

Ethan takes a deep breath.  
The Lakehouse is fine — it just needs proper **performance tuning**.

Let’s learn the **right** and **wrong** ways to do that.

---

## 🟩 DO: Compact Files & Run OPTIMIZE Regularly

Small files = slow reads + high compute cost.

### Recommended:

```sql
OPTIMIZE table_name;
OPTIMIZE table_name ZORDER BY (important_column);
```

### Use Cases:

* High-ingestion tables
* Streaming outputs
* CDC pipelines

**Result:** Faster scans, better data skipping, lower cost.

---

## 🟥 DON'T: Let Tiny Files Accumulate

If your table has:

* Thousands of small files
* 10KB or 100KB files
* Heavy streaming writes
* Over-partitioning

… your performance will crash.

Symptoms:

* Slow queries
* High I/O
* Excessive metadata operations

Prevent file explosion with Auto-Optimize:

```sql
ALTER TABLE my_table
SET TBLPROPERTIES (
  'delta.autoOptimize.optimizeWrite' = 'true',
  'delta.autoOptimize.autoCompact' = 'true'
);
```

---

## 🟩 DO: Use Z-ORDER for Filter Columns

Z-ORDER physically clusters related values.

### Best for queries filtering by:

* customer_id
* event_date
* device_id
* sku or product_id

### Example:

```sql
OPTIMIZE events ZORDER BY (device_id, event_timestamp);
```

**Result:** 5×–20× faster filter-based queries.

---

## 🟥 DON'T: Z-ORDER Too Many Columns

Z-ORDER works best with **1–3 columns**.

Problems with too many columns:

✖ Slower OPTIMIZE
✖ Too much data movement
✖ No performance gain

Keep it simple → only Z-ORDER your primary filter keys.

---

## 🟩 DO: Use Photon for SQL Queries

Photon = Databricks’ ultra-fast C++ execution engine.

### Perfect for:

* BI dashboards
* Large SQL aggregations
* Ad-hoc analytics
* Interactive data exploration

Enable Photon in SQL Warehouses & All-purpose clusters.

---

## 🟥 DON'T: Expect Photon to Speed Up Everything

Photon doesn’t accelerate:

✖ Python UDFs
✖ R or Scala-heavy workloads
✖ ML pipelines
✖ Non-SQL transformations

Use Photon only where it makes sense.

---

## 🟩 DO: Partition For Write Volume, Not Read Volume

Partitioning helps huge ingestion workloads.

Examples:

✔ `partition by date`
✔ `partition by region`

---

## 🟥 DON'T: Over-Partition

Too many partitions → tiny files → slow queries.

Bad examples:

✖ Partitioning by customer_id
✖ Partitioning by 1000+ values

Rule:

> If a partition will contain < 256MB of data → don’t partition by it.

---

## 🟩 DO: Cache Hot Tables

Cache tables used repeatedly:

```sql
CACHE TABLE daily_sales;
```

Great for:

* BI dashboards
* Repeated queries
* Interactive explorations

---

## 🟥 DON'T: Cache Large, Rarely Used Tables

Caching is **not storage** — it’s memory.

Avoid caching:

✖ 5 TB tables
✖ Cold data rarely queried
✖ Tables that update frequently

---

## 🟩 DO: Tune SQL Endpoints Properly

For BI dashboards:

✔ Use **Pro** or **Serverless SQL Warehouses**
✔ Enable autoscaling
✔ Tune concurrency
✔ Allow the warehouse to scale up during peak hours

---

## 🟥 DON'T: Run Dashboards on Job Clusters

Job clusters are:

* Temporary
* Not cached
* Not optimized for BI
* Slow for dashboards

Use SQL Warehouses instead.

---

## 🟩 DO: Reduce Shuffle & Skew

Data skew leads to:

* Long-running tasks
* Failed jobs
* High compute cost

Fix skew by:

✔ Salting keys
✔ Using `REPARTITION`
✔ Broadcasting small tables
✔ Reducing unnecessary joins

Example:

```sql
SELECT /*+ BROADCAST(dim_table) */
```

---

## 🟩 DO: Monitor & Profile Queries

Databricks gives you powerful tools:

* **Query Profile**
* **Query History**
* **Spark UI**
* **SQL Query Insights**

Track:

* Shuffle volume
* Scan volume
* Stage execution time
* Skewed partitions
* Photon usage

---

## 📘 Summary

Improving Lakehouse performance is a balance of:

### ✔ Storage optimization

* Compact files
* Z-ORDER
* OPTIMIZE
* Correct partitioning

### ✔ Compute optimization

* Photon
* Correct cluster sizing
* Autoscaling

### ✔ Query optimization

* Avoid SELECT *
* Filter early
* Broadcast joins
* Tune SQL endpoints

### ✔ Architecture alignment

* Use SQL Warehouses for BI
* Avoid over-caching
* Prevent small file problems

A well-tuned Lakehouse is fast, cost-efficient, and extremely scalable.

---

# 👉 Next Topic

**Unity Catalog — Central Governance Explained**


