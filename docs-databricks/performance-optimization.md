---
id: performance-optimization
title: Performance & Optimization (Speed + Cost) - part 1
sidebar_label: Performance & Optimization - part 1
---

**The Modern Story**

Think of your data platform as a busy airport:-

-Flights (queries) are constantly taking off and landing.
-Passengers (data) need to move quickly and efficiently.
-Every delay or mismanagement costs both time and money.

Now, how do we make this airport world-class?

**Partitioning = Terminals by Destination**  
Instead of mixing all flights in one terminal, flights are split into `Domestic` and `International`, then further by `region`. This way, security and passengers only deal with the **relevant section**, not the whole airport.  

**Z-Ordering → Priority Boarding**
Instead of boarding randomly, passengers are grouped (by zone or seat class). Similarly, Z-Ordering groups related data together, so queries can "board" faster without scanning the entire dataset.

**Caching → Airport Lounges**
Frequent travelers don’t go through long lines every time — they relax in lounges. Caching keeps frequently used data "on hand," avoiding repeated trips to cold storage.

**Materialized Views = Pre-Scheduled Boarding Passes**  
For routes like “Daily New York–London,” the system preprints boarding passes every morning. Passengers don’t have to wait in line for fresh processing — they get ready-made documents.  

**Data Skipping → Empty Gates Ignored**
An efficient control tower doesn’t check every gate if it knows some are empty. Data skipping avoids scanning irrelevant files, reducing unnecessary overhead.

**Auto Optimize & Auto Compaction → Runway Maintenance**
A great airport runs smoothly because runways are constantly maintained without shutting down operations. Auto Optimize and compaction keep your Delta tables clean and query-ready behind the scenes.

**Cluster Sizing & Photon → Choosing the Right Aircraft**
You don’t use a jumbo jet for 5 passengers or a small plane for 500. Photon + smart cluster sizing ensures the right compute power is used for the right workload.

🔑 As a Data Engineer, your role isn’t just moving data — it’s ensuring that your airport of data runs efficiently, reliably, and cost-effectively. Every choice — from Z-Ordering to caching — is like fine-tuning airport operations so passengers (data consumers) experience seamless travel.


**Professional**
In real-world Databricks projects, performance tuning isn’t just about speed — it’s about cost optimization:

-Queries that run 2x faster often cost 3x less.
-Well-partitioned, optimized data reduces cloud storage and compute waste.
-Photon execution and adaptive cluster sizing directly impact your cloud bill.

This involves performance optimization and tuning. Let’s break it down step by step:

The main areas are:-
## 1. Partitioning & Z-Ordering
Helps reduce the amount of data scanned.

### What is Partitioning?
Partitioning means organizing your data into separate folders/files based on the values of certain columns.

Think of it like this:

📁 sales/
└── 📁 date=2025-08-28/
        └── 📁 region=APAC/
            └── 🗂️ data files here

Instead of storing everything in one huge folder, you split it out by common filter columns — like date, region, or country.

### Why is Partitioning Good?
**🚀 1. Speed (Partition Pruning)**
When you query data using a filter on a partitioned column, your system can skip scanning irrelevant folders entirely.

Example:
```sql
SELECT * FROM sales WHERE date = '2025-08-28'
```
If data is partitioned by date, only the folder date=2025-08-28 is scanned.
No need to look inside thousands of other dates.
That’s faster and cheaper.
This is called partition pruning.

### But Be Careful: Pitfalls of Partitioning
**🐜 1. Too Many Partitions = Small File Problem**
If you over-partition (e.g., use columns with millions of unique values like user_id), you get:
Tiny files spread across millions of folders
Overhead in managing, listing, and reading those files
Performance becomes worse than no partitioning at all

**🎯 2. Choose the Right Columns**
Partition columns should be:
Low or medium cardinality → not too many unique values
<u>Good:</u> date, region, country, device_type
<u>Bad:</u> user_id, email, transaction_id
Frequently used in filters
If you never filter by a partition column, the system can’t take advantage of pruning.


### What is Z-Ordering?
Z-Ordering is a technique that rearranges data inside files (within a partition) to make filtering more efficient.

It’s not about how the data is stored on disk in folders (like partitioning). Instead, it’s about how rows are ordered inside the files.

### Why is Z-Ordering Good?
**⚡ 1. Faster Range Scans**

Example:
```sql
WHERE customer_id BETWEEN 100 AND 200
```
If data is Z-Ordered by customer_id, those rows are stored near each other, so the engine reads fewer blocks.

**📊 2. Works Well for High-Cardinality Columns**

Unlike partitioning, Z-Ordering is great for columns with lots of unique values:

customer_id
product_id
session_id

Partitioning on these would create millions of folders → bad idea. But Z-Ordering keeps things organized inside files.

**🔍 3. Better for Multi-Column Filters**
Example:
```sql
WHERE region = 'APAC' AND category = 'Electronics'
```
If Z-Ordered by both columns, rows with this combination are co-located, making queries much faster.

### Pitfalls of Z-Ordering
**💸 1. Expensive Operation**

Z-Ordering isn't automatic.

It requires a special job:
```sql
OPTIMIZE gold.sales ZORDER BY (customer_id, region);
```
This job rewrites the data, so it can:

--Take time
--Consume compute resources

**🔁 2. Needs to be Done Periodically**

You don’t Z-Order after every write.
Best done as a batch job, e.g., daily or weekly, depending on data volume.


**🔄 Combine with Partitioning (Best Practice)**

They work together, not against each other.

Technique	Best for
**Partitioning** Columns with few unique values (e.g., date, region) that are always filtered on
**Z-Ordering**	Columns with many unique values (e.g., customer_id, product_id) that are frequently queried

✅ Example:
```sql
-- Partition by date (low-cardinality)
CREATE TABLE gold.sales (
  order_id STRING,
  customer_id STRING,
  amount DECIMAL(10,2),
  order_date DATE,
  region STRING
)
USING DELTA
PARTITIONED BY (order_date);

-- Periodically run:
OPTIMIZE gold.sales
ZORDER BY (customer_id, region);
```
**Summary:-**
| 🧠 Concept       | ✅ Good For                                                    | ⚠️ Watch Out                    |
| ---------------- | ------------------------------------------------------------- | ------------------------------- |
| **Partitioning** | Low-cardinality columns (e.g. `date`, `region`)               | Too many = small file problem   |
| **Z-Ordering**   | High-cardinality columns used in filters (e.g. `customer_id`) | Expensive to run; not real-time |
| **Use Together** | Partition by `date`, Z-Order by `customer_id`                 | Best for big datasets           |

## 2. Caching & Materialized Views

### What is Caching?
Caching means storing data in memory (RAM) so it can be accessed much faster than reading it from disk again.

Imagine keeping your most-used documents on your desk instead of in a filing cabinet — you reach them instantly.

Example in Spark:
```python
df = spark.table("gold.daily_revenue")
df.cache()       # Tell Spark: keep this in memory
df.count()       # Actually triggers the cache ("materialize" it)
```
After this, future queries on df will be much faster, as Spark doesn’t have to read and compute it again.


### 📋 What are Materialized Views?
A Materialized View is like a saved result of a complex query.

Think of it as pre-computed data stored like a table.

Unlike regular views (which run the query every time), materialized views are updated only on demand or on a schedule.

✅ Example:
```sql
CREATE MATERIALIZED VIEW daily_revenue_mv AS
SELECT date, SUM(amount) as total
FROM sales
GROUP BY date;
```
This saves the result as a physical table, which can be indexed, cached, and queried quickly.

### ✅ Use Caching or Materialized Views When:

| Use Case                 | ✅ Good Fit                                                       |
| ------------------------ | ---------------------------------------------------------------- |
| **Dashboards**           | Same data queried many times (e.g., daily sales)                 |
| **Stable data**          | Data that doesn’t change frequently                              |
| **Complex aggregations** | Repeating heavy GROUP BY or JOIN logic                           |
| **Interactive queries**  | Need speed in BI tools (e.g., Power BI, Tableau, Databricks SQL) |


### ⚠️ Pitfalls / Things to Watch
| Concept                  | Gotchas                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Caching**              | Data must fit in memory; use `.cache()` only if reused a lot                        |
| **Materialized Views**   | They **can go stale**; you must **refresh** them manually or on schedule            |
| **Cache doesn't update** | If source data changes, the cached version stays the same until dropped or reloaded |
