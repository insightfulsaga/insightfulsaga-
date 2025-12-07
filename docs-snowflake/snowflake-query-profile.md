---
id: snowflake-query-profile
title: Query Profile — Full Explanation of Each Section
sidebar_label: Query Profile Explained
description: A simple story-driven walkthrough of the Snowflake Query Profile UI, with explanations of each section, node types, pruning, join behavior, and performance tuning insights.
keywords:
  - Snowflake Query Profile
  - Snowflake query analysis
  - Snowflake performance tuning
  - Query plan Snowflake
  - Snowflake execution graph
  - Snowflake profiling
---

# Query Profile — Full Explanation of Each Section

## ✨ Story Time — “The Query Runs Slow… But Why?”

Aria, a data engineer, keeps hearing:

> “This query is slow.”  
> “Our dashboard takes too long.”  
> “Can you speed this up?”

But SQL by itself doesn’t tell her the reason.

Then she discovers the **Snowflake Query Profile**, a hidden gem that reveals:

- where time is spent  
- how partitions are scanned  
- how joins behave  
- what Snowflake pruned  
- how parallel the query is  

Once she learns it properly, tuning becomes EASY.

Today, you’ll learn the same way Aria did — step by step.

---

## 🧭 What Is the Query Profile?

It is the **visual execution graph** that shows how Snowflake executed your query:

- scanned micro-partitions  
- pruned data  
- join strategy  
- operation order  
- time spent per node  
- rows processed  
- bytes scanned  
- execution bottlenecks

If you want to tune Snowflake, **this is your #1 tool**.

---

## 🧱 Main Sections of Query Profile

Snowflake’s Query Profile has **7 sections**:

1. Query Outline / Operator Tree  
2. Execution Graph  
3. Node Details  
4. Pruning Information  
5. Query Metrics  
6. Statistics (Bytes, Partitions, Rows)  
7. Query Timeline  

Let’s break each one down.

---

## 1️⃣ Query Outline (Operator Tree)

This is the **top-down logical flow** of your query.

Common nodes you’ll see:

| Node | Meaning |
|------|---------|
| SCAN | Reads micro-partitions from storage |
| FILTER | Applies WHERE filter |
| JOIN | Hash, Merge, or Nested Loop |
| AGGREGATE | SUM, COUNT, GROUP BY |
| PROJECTION | SELECT list |
| SORT | ORDER BY |
| LIMIT | LIMIT clause |

### Why it matters:
You can instantly see:

- how many stages your query has  
- the type of join Snowflake chose  
- where filters are applied  
- whether subqueries were flattened  

---

## 2️⃣ Execution Graph (Visual Node Flow)

This is Snowflake’s **visual DAG** (Directed Acyclic Graph).

Each box = a node (operation)  
Arrows = how data flows  
Color intensity = time spent  

### Insights you get:

- Which part takes the longest  
- Which branch of the join is heavier  
- Whether aggregations are expensive  
- Whether scans dominate the query  

If a node is dark orange/red → bottleneck.

---

## 3️⃣ Node Details (Operator Details Panel)

Click a node → see detailed metadata:

### You will see:
- rows scanned  
- rows produced  
- partitions scanned  
- partitions pruned  
- bytes read  
- time spent  
- join type  
- join key  
- filter conditions  
- pushdown applied or not  
- parallelism  

### Most important fields:
- **Partitions scanned**  
- **Partitions pruned**  
- **Bytes scanned**  
- **Rows / bytes returned**  

These show WHERE your query is slow.

---

## 4️⃣ Partition Pruning Details

This is the “Snowflake Magic Section.”

It shows:

### ✔ How many micro-partitions exist  
### ✔ How many were pruned  
### ✔ Why they were pruned  
(based on min/max values, bloom filters, etc.)

Example:

```

Micro-partitions scanned: 8
Micro-partitions pruned: 792

```

That means Snowflake eliminated **99% of the table**  
— without you creating partitions manually.

If pruning is low → query will be slow.

---

## 5️⃣ Query Metrics Summary

This appears at the top of the profile:

- Total Bytes Scanned  
- Partitions Scanned  
- Total Execution Time  
- Average Execution Time  
- Compilation Time  
- Rows Scanned  
- Credits Used  

### Why it's important:
- If bytes scanned = full table → filter isn’t selective  
- If compilation is slow → complex query  
- If execution time is low but credits are high → warehouse size too big  

---

## 6️⃣ Statistics — Rows, Bytes, and Memory

Every node shows:

- rows in / out  
- bytes processed  
- spilling (if happened)  
- memory usage per operator  

### Watch out for:
✔ Huge reduction ratio = good  
❌ Memory spill = bad (scale up warehouse)  
❌ High bytes = missing filter or wrong join paths  

---

## 7️⃣ Timeline View

This shows **how Snowflake executed the query over time**:

- Stages  
- Parallel threads  
- Operator durations  
- Compilation vs execution time  

### Use this to detect:
- execution skew  
- stages waiting on others  
- slow-running nodes  
- idle time  
- unbalanced threads  

---

## 🧪 Real Story — Aria Investigates a Slow Query

Query:  
Joining SALES (200GB) to CUSTOMER (50MB)

Dashboard takes **12 seconds**.

Aria opens Query Profile and sees:

- Only **30% of micro-partitions pruned**  
- JOIN is a HASH JOIN  
- SALES table filtered after the join  
- 180GB scanned  

She rewrites the query:

```sql
WITH cust AS (
  SELECT id
  FROM CUSTOMER
  WHERE country = 'Canada'
)

SELECT s.*
FROM SALES s
JOIN cust c
  ON s.customer_id = c.id;
```

New Profile:

* 95% partitions pruned
* Broadcast join
* 12GB scanned

Dashboard loads in **1.8 seconds**.

She smiles:
**“Query Profile is the greatest tuning tool ever.”**

---

## 🔥 What to Look for in Query Profile (Cheat Sheet)

### 🚩 Red Flags

* Many partitions scanned
* Little/no pruning
* Large table driving join
* Sorting huge datasets
* Memory spill
* Large intermediate rows
* Excessive stages

### 🟩 Good Signs

* High pruning ratio
* Filter pushdown
* Broadcast joins on small tables
* Reduced row counts
* Parallel operators
* Efficient aggregation

---

## 📘 Summary

The Snowflake Query Profile helps you understand:

* how Snowflake executes your SQL
* which operations slow down performance
* where pruning succeeds or fails
* how joins behave internally
* how much data is scanned
* how parallel the execution is
* where tuning is needed

If you want to become a Snowflake performance expert,
**learning Query Profile is non-negotiable.**

---

# 👉 Next Topic

**Result Caching, Metadata Caching & Warehouse Caching**
