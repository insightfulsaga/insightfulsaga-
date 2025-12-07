---
id: performance-optimization1
title: Performance & Optimization (Speed + Cost) - part 2
sidebar_label: Performance & Optimization - part 2
---

## 3. Data Skipping      

Data Skipping means Spark automatically avoids scanning files that don’t contain relevant data — by checking column stats (min/max) stored in each file.     

Instead of blindly scanning everything, it asks:      
“Which files even could contain the data I need?”    

It’s a built-in feature in Delta Lake — you don’t have to enable it manually.    

**🧠 Real-World Analogy**      
Imagine you’re looking for a book published in 2025:    

Library has 10 shelves, each labeled with a year range:     
Shelf 1: 2020–2021   
Shelf 2: 2022–2023    
Shelf 3: 2025–2026 ✅

You check the labels and go only to Shelf 3.    
That’s data skipping.    

### ✅ How It Works (Behind the Scenes)         
Delta stores metadata like:   
| File Name | Min `order_date` | Max `order_date` |
| --------- | ---------------- | ---------------- |
| File_1    | 2025-08-01       | 2025-08-02       |
| File_2    | 2025-08-03       | 2025-08-04       |
| File_3    | 2025-08-05       | 2025-08-06       |

Now, if you run:    
```sql    
SELECT * FROM sales  
WHERE order_date = '2025-08-05';
```
👉 Spark checks file stats first and sees:   

Only File_3 can contain that date.   
So it skips all other files.   

Result: 🚀 Faster query with less I/O.    

### Why OPTIMIZE Helps    

If your data has lots of small files, each one has only a few rows → min/max stats are not very meaningful.
Also, many small files = more overhead.   

**✅ OPTIMIZE solves this:** 
```sql
OPTIMIZE gold.sales;
```
-Combines small files into larger ones    
-Each large file now has better, broader stats   
-So data skipping becomes much more effective    


## 4. Auto Optimize & Auto Compaction    

**The Problem:**   

When writing data in small batches (e.g., streaming, micro-batch, CDC), Delta tables end up with many tiny files.     

This is called the "small file problem"    

**✅ The Solution: Auto Optimize + Auto Compaction**
| Feature                            | What it Does                                                           |
| ---------------------------------- | ---------------------------------------------------------------------- |
| **Auto Optimize (Optimize Write)** | Writes **larger, more efficient files** right from the start           |
| **Auto Compaction**                | Periodically **merges small files** in the background into larger ones |

Together, they keep your Delta tables clean and performant — without needing manual OPTIMIZE jobs.    

🧪 Example SQL to Enable:     
```sql
ALTER TABLE silver.sales
SET TBLPROPERTIES (
  delta.autoOptimize.optimizeWrite = true,
  delta.autoOptimize.autoCompact = true
);
```

### 🛠️ When to Use    
| Use Case                         | ✅ Use It                                           |
| -------------------------------- | -------------------------------------------------- |
| **Streaming ingestion**          | YES — perfect fit                                  |
| **Incremental loads**            | YES — prevents file bloat                          |
| **Heavy ETL pipelines**          | YES — keeps tables performant                      |
| **Static full refresh datasets** | ❌ Not needed — just use `OPTIMIZE` once after load |

### 🔍 Tuning Notes   

-Doesn’t fully replace OPTIMIZE for big performance tuning, but reduces the need for frequent runs    
-Works best in high-frequency write environments (like real-time or hourly data)    
-Auto Compaction is asynchronous and runs behind the scenes   


## 🚘 5. Cluster Sizing & Photon     

Databricks runs your jobs on clusters (groups of machines or VMs).   

The cluster size determines:    

-How fast your job runs   
-How much you pay     

| Cluster Size                     | When to Use                                       |
| -------------------------------- | ------------------------------------------------- |
| 🧪 **Small jobs**                | Light ETL, dev testing → 2–4 nodes                |
| 🧱 **Heavy batch jobs**          | Aggregations, joins, transformations → 8–16 nodes |
| 📊 **BI dashboards / SQL**       | Use **auto-scaling** clusters with Photon         |
| ⚙️ **Experiments / retry logic** | Use **spot instances** for cost savings           |

**❗ Problem:**    
 
Too small → Jobs spill to disk, slow performance   
Too big → Wastes money, underutilized resources    

### Top Engineer Insight:  

Monitor these to right-size:    
**Shuffle spill:** Memory not enough for joins/sorts? Increase RAM.   
**Executor memory/CPU:** Constantly maxed? Need bigger nodes.   
**Skewed tasks:** One task runs longer than others? Time to tune data layout.   

Enter Photon: The Jetpack Engine    

### Photon  
Photon is a new execution engine built in C++ (instead of Java/Scala like traditional Spark).    

✅ Automatically speeds up:    

-SQL queries   
-Delta Lake operations   
-BI dashboards (Databricks SQL)    

### 🔥 Photon Benefits   
* 2–3x faster queries   
* Lower compute cost   
* Works with Delta Lake + Spark SQL   
* Easy to enable — just check a box   

### 🛠️ How to Enable Photon    

Via UI:    

When creating a cluster, just check "Enable Photon"    
 
Via JSON config:   
```json
{
  "cluster_name": "photon-cluster",
  "spark_version": "13.3.x-scala2.12-photon",
  "node_type_id": "i3.xlarge",
  "num_workers": 4
}
```

### 📊 Real Example: Before vs After Photon    
A retail company runs daily sales reports.    
```test
| Metric       | Before Photon           | After Photon |
| ------------ | ----------------------- | ------------ |
| Cluster Size | 10 nodes                | 6 nodes      |
| Query Time   | 45 minutes              | 15 minutes   |
| Result       | ✅ 3x faster, 💰 cheaper |              |
```

**“The best engineers don’t just use big clusters — they use the right clusters, with Photon, at the right time.”**    


## 6. File Format Optimization   

**The Story: Grocery Store Files**     

Imagine you run a grocery store, and every day you get invoices from different suppliers:    

Supplier A sends handwritten notes (slow to read).   
Supplier B sends Excel files (a bit faster).  
Supplier C sends organized PDFs (okay speed).     
Supplier D sends barcode-scanned digital lists (super fast!).    

If you want to quickly find the price of milk, which supplier’s file would you prefer?     

Clearly, the barcode-scanned list wins!     

### 💡 What This Means for Data Files   
| Format  | Like…                        | Speed & Efficiency             |
| ------- | ---------------------------- | ------------------------------ |
| CSV     | Handwritten notes            | Slow, bulky, no compression    |
| JSON    | Semi-structured Excel        | Flexible, but heavy            |
| Parquet | Barcode format               | Columnar, compressed, fast     |
| Delta   | Barcode + history + security | Best performance & reliability |


**Professional**    
Choose the right format to speed up your data journey.     

* **CSV & JSON** are easy but slow and large—bad for big data analytics.    

* **Parquet** is columnar and compressed, speeding up queries and saving storage.    

* **Delta Lake** builds on Parquet and adds ACID transactions, schema control, and time travel — perfect for reliable, fast analytics.   

### 🚀 Best Practice 
 
* Always convert raw CSV/JSON to Delta or Parquet ASAP.   

* Use Delta as your production data format for the best speed, compression, and reliability.   

* Partition large datasets (e.g., by date) for faster queries.   

**Code Snippets**       
```python
# Not recommended for big data
df.write.format("csv").save("/mnt/raw/sales_data")

# Better: Parquet
df.write.format("parquet").mode("overwrite").save("/mnt/bronze/sales_data")

# Best practice: Delta
df.write.format("delta").mode("overwrite").save("/mnt/silver/sales_data")
```
**Quick Takeaway**      
Use Delta for your analytics data. Avoid raw CSV/JSON beyond ingestion. It’s the barcode scanner of data formats — fast, efficient, and reliable.      

## 🔑 1-Minute Summary: performance-optimization      
| 🔧 **Technique**               | ✅ **Best For**                                                      | ⚠️ **Watch Out For**                                       |
| ------------------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Partitioning**               | Low-cardinality columns (e.g., `date`, `region`)                    | Too many partitions → small files → worse performance      |
| **Z-Ordering**                 | High-cardinality filter columns (e.g., `customer_id`, `product_id`) | Requires compute-heavy `OPTIMIZE`; not real-time           |
| **Use Both Together**          | Partition by date, Z-Order by customer_id                           | Use when both filter types are common                      |
| **Caching**                    | Interactive queries, repeated dashboard reads                       | Needs enough memory; must manually trigger with `.cache()` |
| **Materialized Views**         | Stable aggregated data (e.g., daily revenue)                        | Can become stale; needs manual/scheduled refresh           |
| **Data Skipping**              | Filtering by min/max-aware columns (e.g., `order_date`)             | Less effective with many small files                       |
| **Auto Optimize + Compaction** | Streaming, frequent micro-batches, CDC                              | Not needed for static, full-refresh datasets               |
| **Cluster Sizing**             | Matching workload to right compute size                             | Too small → slow; too big → expensive waste                |
| **Photon Engine**              | SQL, Delta, BI queries                                              | Not all workloads benefit; needs enabling                  |
| **File Format Optimization**   | Analytics workloads on large data volumes                           | CSV/JSON slow and heavy → use Delta/Parquet                |
