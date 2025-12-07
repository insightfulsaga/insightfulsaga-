---
id: snowflake-large-files-optimization
title: "Working with Large Files, Compression Types & Optimization Tips"
sidebar_label: Large Files & Optimization
description: Beginner-friendly guide on handling large files in Snowflake, compression types, and performance optimization tips with real-world examples.
keywords:
  - Snowflake large files
  - Snowflake compression
  - Snowflake performance optimization
  - Snowflake ETL best practices
  - Snowflake data loading
---

# Working with Large Files, Compression Types & Optimization Tips

Welcome back to **RetailCo**, our fictional retail company.  
Alice, the data engineer, now faces a new challenge: **loading massive historical sales and clickstream data** efficiently.  

> “If we don’t handle large files and compression properly, loads will be slow, costly, and error-prone,” she explains.

Let’s explore **how to work with large files, choose compression types, and optimize Snowflake performance**.

---

## 🏗️ Challenge of Large Files

- Large files can **slow down ETL**  
- Risk of **time-out or memory issues**  
- Higher **storage and compute costs**  

**RetailCo example:** 500 GB of historical sales CSVs from vendors need to be loaded quickly for analytics.

---

## 🔹 1️⃣ Best Practices for Large Files

1. **Split huge files into manageable chunks** (~100 MB to 1 GB each)  
2. **Use external stages** (S3, Azure, GCS) to avoid internal stage limits  
3. **Leverage Snowflake parallelism** with multiple files  
4. **Avoid too many tiny files** (less than 10 MB) — increases load overhead

**Example:**

- Split 500 GB CSV into 500 files of ~1 GB  
- Load them in parallel using COPY INTO or Snowpipe

---

## 🔹 2️⃣ Compression Types

Snowflake supports automatic decompression for **GZIP, BZIP2, ZSTD, and more**:

| Compression | Use Case | Pros | Cons |
|------------|---------|------|------|
| GZIP | CSV, JSON | Widely supported, reduces size 5–10x | Slower decompression |
| BZIP2 | CSV, JSON | High compression ratio | Slower |
| ZSTD | Parquet | Very fast and efficient | Limited support outside Snowflake |
| NONE | Already compressed files | No overhead | Uses more storage |

**RetailCo example:** Alice compresses large CSVs with **GZIP** to reduce storage and speed up loads.

```sql
COPY INTO SALES
FROM @S3_SALES_STAGE
FILE_FORMAT=(TYPE=CSV COMPRESSION=GZIP);
```

---

## 🔹 3️⃣ File Format Optimization

* **Parquet** for large datasets → smaller, columnar, faster queries
* **CSV** for simple ingestion, but compress it (GZIP)
* **JSON** for nested data → use VARIANT column, compress with GZIP

**Rule of thumb:** Use **columnar formats (Parquet/ORC)** for analytics, **row-based (CSV/JSON)** for raw ingest.

---

## 🔹 4️⃣ Snowflake Load Optimization Tips

1. **Use multiple files** to leverage **parallel loading**
2. **Clustered tables** → improves query performance on large datasets
3. **Avoid auto-compressing already compressed files**
4. **Use staged files efficiently** (internal/external stages)
5. **Monitor load performance** via `COPY_HISTORY` or `LOAD_HISTORY`
6. **Purge old staged files** to save storage

---

## 🧩 RetailCo Real-World Scenario

1. Alice splits 500 GB CSVs into 500 files (~1 GB each)
2. Compresses them with **GZIP**
3. Stages them in **S3 external stage**
4. Loads in parallel using **COPY INTO**
5. Uses **clustered table** for faster aggregation queries

**Outcome:** ETL runs efficiently, cost is optimized, and dashboards are updated faster.

---

## 🧠 Quick Tips Checklist

* Split large files → ~100 MB–1 GB
* Compress files (GZIP/ZSTD) → reduces storage & network usage
* Use Parquet for analytics-heavy tables
* Leverage Snowflake **parallelism** by loading multiple files
* Monitor load history and optimize warehouses for heavy loads

---

## 🏁 Quick Summary 

* Large files require **splitting, compression, and staging** for efficient Snowflake loads
* **Compression types:** GZIP, BZIP2, ZSTD, NONE
* **File format:** Parquet for analytics, CSV/JSON for raw ingestion
* Use **parallel loading, clustered tables, and staged files**
* Benefits: faster ETL, lower cost, optimized storage, improved query performance

---

## 🚀 Coming Next

👉 **Snowflake Data Types Explained with Use Cases**
