---
id: databricks-materialized-views
title: Materialized Views in Databricks (SQL + Pipelines)
sidebar_label: Materialized Views
description: A simple, story-style explanation of Materialized Views in Databricks, how they work, why they exist, and how to use them in SQL and pipelines for fast and reliable analytics.
keywords:
  - Databricks materialized views
  - streaming tables
  - SQL pipelines
  - delta lake views
  - refreshed views
---

# Materialized Views in Databricks (SQL + Pipelines)

## 🌟 A Simple Story — “Recomputing the Same Thing Every Day”

Imagine you work at a company where the sales team asks:

> “What are the top 10 selling products today?”  
> “What was the daily revenue for the past week?”  
> “How many new users signed up yesterday?”

These questions sound simple…  
but answering them can be **expensive**:

- Scanning billions of rows  
- Running the same aggregations repeatedly  
- Recalculating heavy queries for every dashboard refresh  
- Reprocessing old data even when nothing changed  

It’s like re-cooking a whole meal every time someone wants a snack.

Databricks Materialized Views solve this by **precomputing** results and updating them efficiently.

---

## 💡 What Is a Materialized View (MV)?

A **Materialized View** is a table that:

- Stores the *results* of a query  
- Updates automatically when underlying data changes  
- Can serve BI dashboards extremely fast  

Think of it as:

> “A cached version of a query, but smart enough to update itself.”

Instead of recomputing everything, Databricks updates *only the new or changed data*.

---

## 🧠 Why Use Materialized Views?

### ✔ Faster BI dashboards  
Your dashboards read from a **precomputed** table, not raw data.

### ✔ Lower compute cost  
Only incremental changes are processed.

### ✔ Simple SQL definition  
No complex jobs or triggers required.

### ✔ Reliable + consistent  
Built on Delta Lake and ACID transactions.

### ✔ Works great with slowly changing data  
You never recompute old partitions unnecessarily.

---

## 🧪 Example 1 — Creating a Materialized View (SQL)

Here’s how easy it is:

```sql
CREATE MATERIALIZED VIEW daily_sales_mv
AS
SELECT
  DATE(order_timestamp) AS order_date,
  SUM(amount) AS total_revenue,
  COUNT(*) AS total_orders
FROM live_orders
GROUP BY DATE(order_timestamp);
```

Now Databricks automatically:

* Tracks changes in `live_orders`
* Updates the materialized view
* Keeps results ready for dashboards

No scheduler.
No orchestration.
No manual refresh.

---

## 🧪 Example 2 — Materialized Views in a Pipeline (SQL Warehouse or Workflow)

You can include MVs inside Databricks SQL Pipelines.

Example pipeline step:

```sql
CREATE OR REFRESH MATERIALIZED VIEW top_products_mv
AS
SELECT
  product_id,
  COUNT(*) AS order_count
FROM silver_orders
GROUP BY product_id;
```

Whenever `silver_orders` is updated,
this MV updates too — incrementally.

---

## 🔧 Materialized View vs Standard View

| Feature             | Standard View                  | Materialized View           |
| ------------------- | ------------------------------ | --------------------------- |
| Stored Results      | ❌ No                           | ✔ Yes                       |
| Automatic Refresh   | ❌ No                           | ✔ Yes                       |
| Fast for BI         | ❌ Slower                       | ✔ Very Fast                 |
| Incremental Refresh | ❌ No                           | ✔ Yes                       |
| Cost                | Higher (each query recomputes) | Lower (incremental updates) |

A materialized view behaves like a real table — but one you don’t manually maintain.

---

## 🔍 How Refreshing Works (Simple Explanation)

When new data arrives in the base table:

* Databricks identifies what changed
* Recalculates only that part
* Merges results into the MV
* Keeps everything ACID-consistent

It’s like updating only the new pages of a book rather than reprinting the whole book every day.

---

## 🧱 Best Use Cases

### ✔ Perfect for:

* Daily/weekly/monthly metrics
* Revenue dashboards
* Top-N ranking queries
* Aggregation-heavy workloads
* Slowly changing tables
* BI tools (Power BI, Looker, Tableau)
* Gold-layer summaries

### ✖ Not ideal for:

* Raw, rapidly changing high-volume streaming
* Very complex joins with unstable schemas
* Use cases where you need full control over refresh logic

For those, **Streaming Tables** or **DLT** may be better.

---

## 🖼 Example Architecture Using MVs

```
Bronze (raw data)
      ↓
Silver (cleaned)
      ↓
Gold Aggregations (Materialized Views)
      ↓
Dashboards / BI Tools
```

Materialized Views live in the **Gold layer** because they represent final, business-ready data.

---

## 📘 Summary

* A Materialized View stores the results of a query and updates automatically.
* It is perfect for dashboards and frequently reused aggregations.
* Databricks refreshes MVs incrementally, saving huge compute costs.
* MVs are excellent in the **Gold layer** for reliable, fast analytics.
* Use MVs when you want stable, precomputed insights without rerunning heavy queries.

Materialized Views make your Lakehouse smoother, faster, and cheaper — especially for analytics teams.

---

# 👉 Next Topic

**Databricks Catalog, Schema & Table Permissions (RBAC)**
