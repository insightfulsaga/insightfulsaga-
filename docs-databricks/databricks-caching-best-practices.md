---
id: databricks-caching-best-practices
title: Caching in Databricks — Best Practices for Faster Queries
sidebar_label: Caching Best Practices
description: Learn how caching works in Databricks, when to use it, when to avoid it, and how to dramatically improve Lakehouse query performance with a story-driven explanation.
keywords:
  - Databricks caching
  - Delta cache
  - Databricks performance tuning
  - memory cache spark
  - accelerate queries Databricks
---

# Caching in Databricks — Best Practices

## ✨ Story Time — “My Query Is Fast… But Only the Second Time?”

Mila, a data analyst, runs a heavy analytical query:

```sql
SELECT region, SUM(total_sales)
FROM transactions
GROUP BY region;
```

The first time: **30 seconds**
The second time: **4 seconds**

She wonders: *“Why is it so much faster now?”*

Her teammate smiles:

> “That’s Databricks caching. Used right, it can speed up your entire Lakehouse.”

Let’s understand why caching can be your secret superpower.

---

## 🧩 What Is Caching in Databricks?

Caching means storing frequently accessed data in **memory** or **local SSDs** so queries run MUCH faster.

Databricks supports **three types** of caching:

1. **Delta Cache** (Disk-based cache managed by Databricks)
2. **Spark Memory Cache** (Stored in RAM with `CACHE TABLE`)
3. **Disk Cache** for Databricks SQL Warehouses

Each one accelerates repeated queries by avoiding costly reads from cloud storage (S3/ADLS/GCS).

---

## 🔍 Type 1: Delta Cache (Databricks Runtime)

Activated automatically when reading from Delta tables.

### How it works:

* Cached on each worker node
* Stored on **local SSDs**, not RAM
* Persistent during the cluster lifetime
* Great for BI dashboards & repeated table scans

### Enable (if disabled):

```sql
SET spark.databricks.io.cache.enabled = true;
```

---

## 🔍 Type 2: Spark Memory Cache

Manually cache tables into memory:

```sql
CACHE SELECT * FROM transactions;
```

or:

```sql
CACHE TABLE transactions;
```

### Best for:

* Heavy compute transformations
* Machine learning workloads
* Repeated DataFrame operations in notebooks

### Limitations:

* Uses cluster RAM
* Cache is lost if cluster goes down
* Not ideal for very large tables

---

## 🔍 Type 3: Databricks SQL Warehouse Cache

Used by BI tools and dashboards.

### Benefits:

* Fast interactive queries
* Stores results & metadata
* Extremely efficient for dashboards refreshing frequently

Works automatically behind the scenes — no setup required.

---

## ⚡ When Should You Use Caching?

### ✅ Use caching when:

✔ Running the same query multiple times
✔ Interactive analysis (SQL editor, notebooks, BI tools)
✔ Data fits into memory or SSD
✔ You want ultra-fast dashboard loads
✔ You run iterative ML transformations
✔ You have hot tables read frequently

---

## ❌ When NOT to Use Caching

### Avoid caching when:

✖ Your table updates *very* frequently (cache invalidation overhead)
✖ Data is too large to fit in RAM or SSD
✖ You are running one-time ETL jobs
✖ Queries are always unique (no repetition)
✖ You are using Job Clusters (cache resets every job)

---

## 🧪 Real-World Example — 8× Faster Dashboard

Mila’s team has a PowerBI dashboard querying a Delta table every 10 minutes.

Before caching:

* 22-second load time
* Frequent cluster spikes
* Occasional timeouts

After enabling caching on the cluster:

```sql
CACHE TABLE sales_aggregated;
```

Results:

* Dashboard loads in **3 seconds**
* Cluster CPU dropped by 45%
* BI team finally stopped complaining 🎉

---

## 🔧 How to Check If Cache Is Being Used

For Delta Cache:

```sql
DESCRIBE DETAIL delta.`/path/to/table`;
```

Or at runtime:

```sql
spark.conf.get("spark.databricks.io.cache.enabled")
```

For Memory Cache:

```sql
SHOW TABLES;
```

```sql
CLEAR CACHE;
```

---

## 🎯 Best Practices for Caching

### 🟩 1. Cache only hot datasets

Avoid caching huge cold data.

### 🟩 2. Use Delta Cache for most SQL workloads

Lightweight and automatic.

### 🟩 3. Use MEMORY cache only for DataFrame-heavy notebooks

Not for general SQL.

### 🟩 4. Don’t over-cache

Caching useless data = wasted resources.

### 🟩 5. Combine caching with Z-ORDER + OPTIMIZE

They complement each other for performance.

### 🟩 6. Tune cache size for large clusters

Use SSD-heavy clusters for maximum Delta Cache performance.

---

## 📘 Summary

* **Caching improves query speed dramatically** by storing frequently accessed data in memory or SSD.
* Databricks provides three caching layers: **Delta Cache**, **Spark Memory Cache**, and **SQL Warehouse Cache**.
* Best used for repeated queries, dashboards, ML workflows, and hot datasets.
* Avoid caching massive or frequently updated data.
* Use caching alongside OPTIMIZE, Z-ORDER, and file compaction for maximum Lakehouse performance.

Caching = Fast queries, low cost, happy analysts.

---

# 👉 Next Topic

**Photon Execution Engine — When & Why to Use**
