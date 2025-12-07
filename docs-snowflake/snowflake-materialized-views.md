---
id: snowflake-materialized-views
title: Materialized Views — When to Use & When to Avoid
sidebar_label: Materialized Views
description: Learn about Snowflake Materialized Views, how they improve query performance, their limitations, and best practices in a story-driven, easy-to-understand format.
keywords:
  - Snowflake Materialized Views
  - Snowflake MV
  - query performance Snowflake
  - Snowflake caching
  - Snowflake optimization
---

# Materialized Views — When to Use & When to Avoid

## ✨ Story Time — “Why is My Query So Slow?”

Emma, a data analyst, runs a complex aggregation on a **1 billion-row sales table**.  

Query runtime: **5 minutes**.  
Dashboard refresh: **slow**.  
Coffee: **cold**.  

Her friend, Alex, says:

> “Why don’t you try a Materialized View? Snowflake can precompute and store the results!”

Materialized Views (MV) are Snowflake’s **performance optimization superheroes** — but they come with caveats.

---

## 🧩 What is a Materialized View?

A **Materialized View** is a **precomputed table** that stores the results of a query.  

- Unlike regular views, MVs **store data physically**  
- Automatically **refresh as the underlying table changes**  
- Ideal for queries that are **repeated often** or **computationally expensive**  

**Example:**

```sql
CREATE MATERIALIZED VIEW top_customers_mv AS
SELECT customer_id, SUM(amount) AS total_spent
FROM orders
GROUP BY customer_id;
```

---

## 🔍 How It Works

1. Snowflake executes the query in the MV **once** and stores results
2. When underlying table changes:

   * MV is incrementally updated
   * Querying MV is **faster than scanning the base table**

**Analogy:** Think of it as **caching the query results in a smart, auto-refreshing way**.

---

## 🎯 When to Use Materialized Views

### ✅ 1. Repeated Heavy Queries

* Aggregations like SUM, COUNT, AVG
* Joins between large tables
* Queries that power dashboards

### ✅ 2. Performance-Critical Dashboards

* Users expect near-real-time response
* MV reduces load on warehouses and speeds up queries

### ✅ 3. Incremental Refresh Fits Your Data

* Tables with **frequent but moderate changes**
* MV updates incrementally without reprocessing entire table

---

## ❌ When to Avoid Materialized Views

* Tables with **high-volume, rapid inserts**
* Queries that **change structure often**
* Very small tables (MV overhead > benefit)
* Complex joins with very large fact tables that refresh frequently
* If you rely on **ad-hoc queries with different columns or filters**

**Key:** MV is a **trade-off between storage cost, refresh overhead, and query speed**.

---

## 🧪 Real-World Example

**Scenario:** Retail company wants daily top-selling products for dashboards:

1. Base table: `sales` (10M rows/day)
2. MV:

```sql
CREATE MATERIALIZED VIEW daily_top_products_mv AS
SELECT product_id, SUM(quantity) AS total_sold
FROM sales
WHERE sale_date = CURRENT_DATE
GROUP BY product_id;
```

* Queries run **instantly**
* Dashboard updates **automatically** as new sales arrive
* No need to scan billions of rows each time

---

## ⚡ Benefits

* Speeds up frequent queries
* Reduces compute cost on large tables
* Automatically updated (incremental refresh)
* Works seamlessly with Tasks for pipeline automation

---

## 🧠 Best Practices

* Use for **frequently accessed, compute-heavy queries**
* Monitor **refresh time** — avoid on ultra-high insert tables
* Combine with **clustering keys** for better performance
* Query MV using **direct SELECT**; do not over-index
* Avoid overly complex queries that MV cannot incrementally maintain

---

## 📘 Summary

* **Materialized Views** store precomputed query results physically for faster access.
* Best for **frequently queried, heavy aggregation queries** and dashboard optimization.
* Avoid on **rapidly changing or very large tables** where refresh cost outweighs benefit.
* Integrates with **Tasks, Streams, and Cloning** for automated pipelines.
* MV is a **powerful tool** but requires careful planning to balance **performance, cost, and maintenance**.

---

# 👉 Next Topic

**Secure Views & Secure Data Sharing Between Teams**
