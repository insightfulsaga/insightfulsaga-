---
id: databricks-file-compaction
title: File Compaction & Delta File Management
sidebar_label: File Compaction
description: Learn how file compaction, small file problems, and Delta Lake file management work in Databricks. Discover how to keep your Lakehouse fast and cost-efficient using optimize techniques and best practices.
keywords:
  - Databricks file compaction
  - Delta small files
  - Delta Lake optimization
  - Databricks file management
  - data lake performance
---

# File Compaction & Delta File Management

## ✨ Story Time — “Why Are My Queries Slowing Down Every Week?”

Meet Arjun, a data engineer responsible for maintaining a busy Delta Lake table receiving:

- CDC updates every 5 minutes  
- Batch data every hour  
- Streaming inserts all day  

At first, everything is fast.  
But after a few weeks:

- Queries slow down  
- Dashboards lag  
- Costs increase  
- Data engineers keep asking: *“Why is Delta so slow now?”*

Arjun opens the Delta table storage…

He sees **THOUSANDS of tiny files** — the dreaded **Small File Problem**.

He smiles again.  
He knows exactly what’s needed:

➡ **File Compaction & Proper Delta File Management**.  

---

## 🧩 What Is File Compaction in Delta Lake?

File compaction is the process of **merging many small Delta files into fewer, larger, optimized files**.

Why small files happen:

- Streaming writes produce small batches  
- Frequent micro-batch ingest  
- CDC jobs write small delta chunks  
- Over-partitioning causes tiny files per partition  

Small files = **slow queries + high compute cost + too much metadata**.

Compaction solves this by:

- Reducing file count  
- Increasing file size  
- Improving read performance  
- Reducing metadata overhead  

---

## 🔍 Why Small Files Hurt Performance

### ❌ More files = More metadata  
Each query has to read metadata for every file → slower planning.

### ❌ More files = More unnecessary reads  
Even if only 1 row matches the filter, Databricks still must scan many files.

### ❌ More files = Higher storage cost  
Many tiny files create version bloat.

### ❌ More files = Slower Z-ORDER & OPTIMIZE  
The more files you have, the heavier maintenance operations become.

**Solution → Compaction through OPTIMIZE.**

---

## ⚙️ How Delta Performs File Compaction

### The key command:

```sql
OPTIMIZE my_delta_table;
```

What it does:

1. Scans small files
2. Groups and merges them
3. Writes larger Parquet files (typically 128–512MB)
4. Updates Delta transaction log
5. Removes old small files (via VACUUM)

---

## 🔁 Automatic File Compaction (With Auto-Optimize)

Databricks also offers automated compaction:

```sql
ALTER TABLE my_delta_table
SET TBLPROPERTIES (
  'delta.autoOptimize.optimizeWrite' = 'true',
  'delta.autoOptimize.autoCompact' = 'true'
);
```

### What these do:

| Property        | Action                                   |
| --------------- | ---------------------------------------- |
| `optimizeWrite` | Writes fewer, larger files during ingest |
| `autoCompact`   | Merges files after small batch inserts   |

Perfect for streaming or frequent batches.

---

## 🧪 Real-World Example — Before & After Compaction

Arjun’s table (before):

* 8,200 files per partition
* Avg file size: 40KB
* Query runtime: **34 seconds**

After:

```sql
OPTIMIZE sales_data ZORDER BY (customer_id);
VACUUM sales_data RETAIN 168 HOURS;
```

* 320 files per partition
* Avg file size: 300MB
* Query runtime: **5 seconds**

Improved performance, reduced cost, and less pressure on the cluster.

---

## 📦 Delta File Management — The Full Picture

Delta Lake automatically manages:

* Transaction logs (`_delta_log/`)
* Versioning
* Compaction
* Data skipping
* File pruning
* Data removal with VACUUM

But **you** must manage:

* When to compact
* How often to vacuum
* How to structure partitions
* How to avoid unnecessary file explosion

---

## 🎯 Best Practices for File Compaction

### ✅ 1. Compact high-ingestion tables regularly

Daily or weekly, depending on volume.

### ✅ 2. Enable Auto-Optimize for streaming workloads

Reduces small files during writes.

### ✅ 3. Combine OPTIMIZE with Z-ORDER

Boosts data skipping for faster queries.

### ✅ 4. Avoid over-partitioning

Too many partitions → too many tiny files.

### ✅ 5. Use VACUUM after compaction

Clean old files and free storage:

```sql
VACUUM my_delta_table RETAIN 168 HOURS;
```

### ✅ 6. Monitor file count

If files per partition > 1000 → compaction required.

---

## 📘 Summary

* File compaction merges small files into large, efficient ones.
* Small files slow down queries, inflate compute cost, and destroy performance.
* OPTIMIZE + Auto-Optimize are the main tools for managing Delta Lake storage.
* Use VACUUM to clear old files after compaction.
* Proper file management makes your Lakehouse **fast, clean, and cost-efficient**.

---

# 👉 Next Topic

**Caching in Databricks — Best Practices**

