---
id: snowflake-caching
title: Result Caching, Metadata Caching & Warehouse Caching
sidebar_label: Snowflake Caching
description: "A story-driven guide to understanding Snowflake caching layers: result cache, metadata cache, and warehouse cache, with practical examples and performance tips."
keywords:
  - Snowflake caching
  - Snowflake result cache
  - metadata cache Snowflake
  - warehouse cache Snowflake
  - Snowflake performance optimization
  - Snowflake query acceleration
---

# Result Caching, Metadata Caching & Warehouse Caching

## ✨ Story Time — “Why Is the Query Suddenly So Fast?”

Meet Ravi, a BI engineer. Yesterday, his dashboard queries were taking **10 seconds**, but today:

> “Wait… why is it only 0.5 seconds now?”  

No changes in SQL, no new indexes.  
The reason? **Snowflake caching magic.**

Snowflake has **three types of caching**:

1. Result Cache  
2. Metadata Cache  
3. Warehouse (Local Disk / SSD) Cache  

Let’s explore each one and how it works.

---

## 1️⃣ Result Cache — Lightning-Fast Query Results

- Stores **query results** for **24 hours**  
- Applies **at the account level**  
- Used when the **same exact query** is run again  

### Example:

```sql
SELECT COUNT(*) 
FROM SALES 
WHERE REGION = 'Europe';
```

* First run: scans 10GB → takes 8 seconds
* Second run: uses **result cache** → returns instantly (less than 0.01s)

✅ **Key points**:

* Query must be identical
* Query on the same data
* No DML changes on underlying tables

---

## 2️⃣ Metadata Cache — Smart Catalog Speed

Metadata cache stores:

* Table definitions
* Column types
* Micro-partition statistics
* Min/Max values
* Table size

### Purpose:

* Accelerates **query compilation**
* Reduces time spent reading **table metadata**

### Example:

Query:

```sql
SELECT * 
FROM ORDERS 
WHERE CUSTOMER_ID = 12345;
```

Snowflake first checks **metadata cache**:

* Min/Max per micro-partition
* Prunes irrelevant partitions

✅ Result: fewer partitions read → faster query.

---

## 3️⃣ Warehouse Cache (Local SSD / SSD Cache)

* Caches **recently accessed micro-partitions** on the warehouse level
* Applies to **intermediate results**
* Faster than reading from cloud storage (S3/Azure Blob/GCS)

### Behavior:

* Cache is **per warehouse**
* If you resize warehouse → cache cleared
* Active queries benefit more
* Improves **large table scans** and repeated transformations

### Example:

Transforming SALES table:

```sql
SELECT CUSTOMER_ID, SUM(AMOUNT)
FROM SALES
GROUP BY CUSTOMER_ID;
```

* First run: reads from cloud → 12 seconds
* Second run (same warehouse, same table): warehouse cache → 4 seconds

---

## 🔄 How These Caches Work Together

| Cache Type      | Scope              | Lifetime          | Notes                                          |
| --------------- | ------------------ | ----------------- | ---------------------------------------------- |
| Result Cache    | Account            | 24 hours          | Query-level, identical queries only            |
| Metadata Cache  | Warehouse + global | Until invalidated | Auto-prunes partitions, speeds compilation     |
| Warehouse Cache | Warehouse          | Session-based     | Intermediate data + table blocks, faster scans |

> Snowflake automatically chooses which cache to use based on query, table, and warehouse state.

---

## 🧪 Real-World Story — Ravi’s Dashboard

Ravi noticed:

* Query A ran first at **10s** → result cached → **0.01s next run**
* Query B scanned **large table** → warehouse cache reduced runtime by **3×**
* Metadata cache prevented unnecessary compilation for 50+ queries

Lesson:

> “Caching isn’t magic — it’s automatic, and it works best when queries are repeated.”

---

## 💡 Practical Tips to Leverage Caching

### ✅ Result Cache

* Useful for dashboards or repeated queries
* Avoid DML between runs if you want speed

### ✅ Metadata Cache

* Automatically maintained
* Design queries to benefit from partition pruning

### ✅ Warehouse Cache

* Keep the same warehouse active for repeated jobs
* Avoid unnecessary resize operations

---

## ⚠️ Common Misconceptions

* **“I need to enable caching manually.”** → ❌ False, Snowflake caches automatically.
* **“Caching increases storage cost.”** → ❌ False, cached data is ephemeral and included in warehouse usage.
* **“All queries benefit equally.”** → ❌ Only repeated queries, same warehouse, or unchanged tables benefit.

---

## 📘 Summary

Snowflake caching layers are key for **high performance without manual tuning**:

* **Result Cache:** Instant query returns for identical queries
* **Metadata Cache:** Speeds query compilation and pruning
* **Warehouse Cache:** Reduces repeated large table scans

When used properly, caching dramatically improves:

* BI dashboard response time
* ETL pipeline efficiency
* Daily analytical workloads

Snowflake handles caching automatically — your job is to **design queries and workloads that benefit from it**.

---

# 👉 Next Topic

**Performance Tuning Techniques for Daily Company Work**

