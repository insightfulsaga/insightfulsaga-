---
id: snowflake-warehouse-sizing
title: Snowflake Warehouse Sizing — Small vs Medium vs Large Explained With Cost
sidebar_label: Warehouse Sizing
description: A story-driven, simple explanation of Snowflake warehouse sizes, how scaling works, when to choose Small vs Medium vs Large, and how pricing impacts daily company workloads.
keywords:
  - Snowflake warehouse sizing
  - Snowflake Small warehouse cost
  - Snowflake Medium warehouse performance
  - Snowflake Large warehouse use cases
  - Snowflake compute cost
  - Snowflake performance tuning
---

# Warehouse Sizing — Small vs Medium vs Large Explained With Cost

## ✨ Story Time — “Which Warehouse Size Should We Use?”

Meet Daniel, a data engineer who joined a company that recently migrated to Snowflake. Everything is going well… until his manager asks:

> “Daniel, which warehouse size should we use: Small, Medium, or Large?  
> And how much will it cost us?”

Daniel freezes.  
Small is cheaper…  
Medium is faster…  
Large is powerful…  
XL, 2XL, 3XL exist…  

**Which one is right?**  
Choosing wrong = you waste money or slow down the company.

So let’s walk through Snowflake warehouse sizing in the simplest possible way.

---

## 🧩 What Is a Snowflake Virtual Warehouse?

A **warehouse** in Snowflake is your **compute engine** used for:

- SELECT queries  
- INSERT/UPDATE/MERGE  
- ELT pipelines  
- BI dashboards  
- Data transformations  

Storage and compute are separate, so warehouse size affects **speed + concurrency + cost**, not storage.

---

## 🏗️ Snowflake Warehouse Sizes (XS → 6XL)

Snowflake offers 8 warehouse sizes:

| Size | Power Multiplier | Cost per Hour* |
|------|------------------|----------------|
| X-Small | 1x | Cheapest |
| Small | 2x | 2× XS |
| Medium | 4x | 4× XS |
| Large | 8x | 8× XS |
| X-Large | 16x | 16× XS |
| 2X-Large | 32x | 32× XS |
| 3X-Large | 64x | 64× XS |
| 4X-Large | 128x | 128× XS |

> 💰 *Actual cost depends on cloud + region, but scaling is linear.*

If XS costs **$2/hour**, then:

- SMALL = $4/hour  
- MEDIUM = $8/hour  
- LARGE = $16/hour  

You pay more → you get more compute power → faster and more concurrent work.

---

## ⚡ How Snowflake Scales Performance

Larger warehouses give you:

### ✔ More compute power  
Faster execution of large transformations.

### ✔ More parallelism  
Snowflake splits your query into micro-partitions and tasks.

### ✔ Higher concurrency  
More users or pipelines can run at once without queuing.

### ✔ Better performance for:
- Massive JOINs  
- Heavy aggregations  
- Large MERGE statements  
- Complex ETL pipelines  

But this doesn't mean Large is always better.  
You might pay 8× more with **no noticeable speed improvement**.

---

## 🔍 Small vs Medium vs Large — The Real Differences

### 🟩 **X-Small / Small**  
Best for:

- Light BI dashboards  
- Simple SELECT queries  
- Small data loads  
- Development workloads  
- Ad-hoc SQL

Why use it:

- Cheapest  
- Surprisingly powerful for small datasets  
- Autoscaling makes it even better  

---

### 🟧 **Medium**  
Best for:

- Moderate ETL pipelines  
- Multi-user analytical workloads  
- Use cases where Small is “almost enough but not quite”

Why use it:

- 2× the power of Small  
- Handles larger joins  
- Good balance of cost and performance  

---

### 🟥 **Large**  
Best for:

- Heavy transformations  
- Huge JOIN operations  
- Daily ELT workloads processing 100M+ rows  
- High-concurrency dashboards  
- MERGEs on large tables  

Why use it:

- 2× Medium’s compute  
- Scales up CPU + threads + parallelism  
- Produces noticeable speed boosts  

---

## 🧪 Real-World Story — Daniel Runs a Test

Daniel runs the same query on three warehouse sizes:

### Query:
```sql
SELECT customer_id, SUM(amount)
FROM transactions
GROUP BY 1;
```

Dataset size: **250 million rows**

### Results:

| Size   | Time    | Cost per Run |
| ------ | ------- | ------------ |
| Small  | 4 min   | $0.25        |
| Medium | 1.8 min | $0.24        |
| Large  | 1.2 min | $0.32        |

### What Daniel learned:

* Large was fastest, but not the most cost-efficient
* Medium gave **best cost-per-performance**
* Small was too slow for production workloads

He chose **Medium** — smart & balanced.

---

## 📦 Cost Efficiency Tips (Most Companies Ignore)

### ✔ 1. Enable Auto-Suspend

Set to **1 minute** if possible.

No one should pay for idle warehouses.

### ✔ 2. Use Auto-Resume

Instant resume = no delays.

### ✔ 3. Use Multi-Cluster Only When Needed

Multi-cluster is great for concurrency, but costs grow quickly.

### ✔ 4. Scale Up Instead of Scaling Out

For big queries:
➡ Scale **up** (Medium → Large) instead of scaling out.

For concurrency:
➡ Scale **out** (multi-cluster Small).

### ✔ 5. Don’t oversize warehouses

Larger doesn’t always mean faster — your query may not be parallelizable.

### ✔ 6. Measure performance using Query Profile

Check bottlenecks before increasing warehouse size.

---

## 🧠 Simple Rules for Choosing the Right Size

### 🟦 Choose **X-Small or Small** for:

* dev/testing
* simple SELECT queries
* BI dashboards under 10 users

### 🟧 Choose **Medium** for:

* daily ETL
* multi-user SQL workloads
* medium dashboards
* tables up to ~1–5 TB

### 🟥 Choose **Large** for:

* very large joins
* 100M–2B row transformations
* BI with 20–50 concurrent users
* major nightly pipelines

---

## 📘 Summary

* Snowflake warehouse size impacts **speed, concurrency, and cost**.
* Scaling is linear: Medium = 4× XS; Large = 8× XS.
* Bigger isn't always better — cost-per-performance matters.
* Most production workloads run best on **Medium or Large**.
* Use auto-suspend, auto-resume, and performance testing to avoid overspending.

Choosing the right warehouse is not about power…
It’s about **balance, smart scaling, and real workload understanding.**

---

# 👉 Next Topic

**Automatic Query Optimization — How Snowflake Internally Works**
