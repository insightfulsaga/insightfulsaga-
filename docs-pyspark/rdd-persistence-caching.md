---
id: rdd-persistence-caching
title: RDD Persistence & Caching — Memory Management in Spark
sidebar_label: RDD Persistence & Caching
description: Learn how Spark RDD caching and persistence work, why they matter for performance, and how to manage memory effectively in distributed data pipelines.
keywords:
  - PySpark caching
  - RDD persistence levels
  - Spark memory management
  - cache() vs persist()
  - Databricks performance optimization
tags:
  # Core PySpark
  - "PySpark"
  - "Apache Spark"
  - "Big Data"
  - "Spark Basics"
  - "Cluster Computing"

  # Architecture
  - "Spark Architecture"
  - "Driver Program"
  - "Executors"
  - "Cluster Manager"
  - "SparkSession"
  - "SparkContext"

  # RDD Topics
  - "RDD"
  - "RDD Transformations"
  - "RDD Actions"
  - "Key-Value RDD"
  - "RDD Caching"

  # DataFrame Topics
  - "DataFrame"
  - "DataFrame API"
  - "Column Operations"
  - "DataFrame Joins"
  - "Aggregations"
  - "GroupBy"
  - "Window Functions"
  - "Missing Data Handling"

  # Spark SQL
  - "Spark SQL"
  - "Temp Views"
  - "Spark SQL Functions"
  - "UDF"
  - "UDAF"

---

# RDD Persistence & Caching — Memory Management in Spark

NeoMart’s data team is running an advanced analytics pipeline on customer clickstream logs. The process includes:

- Cleaning raw data  
- Extracting session-level metrics  
- Running machine learning transformations  
- Aggregating results for dashboards  

Each step uses the **same** processed RDD multiple times.

But there is a problem:  
Running the entire pipeline again and again takes **too long**. Spark must recompute every transformation from scratch, rebuilding lineage and rerunning all upstream stages.

Enter **RDD Persistence & Caching** — Spark’s way of remembering data for faster computations, saving precious time, money, and compute resources.

---

## Why Do We Need Caching?

Spark uses **lazy evaluation**, meaning RDD transformations are not executed unless an action triggers them.  
So if an RDD is used multiple times:

```python
cleaned_data.count()
cleaned_data.take(10)
cleaned_data.saveAsTextFile("/mnt/output")
```

Spark recomputes `cleaned_data` *three separate times* unless you **cache** it.

Caching solves this by storing the RDD in memory (or memory + disk) so repeated access is **instant**.

---

## cache() vs persist()

Spark provides two main ways to store RDDs:

### ### 1. `cache()`

Stores RDD in **memory only**.

```python
rdd.cache()
```

Equivalent to:

```python
rdd.persist(StorageLevel.MEMORY_ONLY)
```

### ### 2. `persist()`

Allows specifying different **storage levels**.

```python
from pyspark import StorageLevel

rdd.persist(StorageLevel.MEMORY_AND_DISK)
```

Used when data may not fit entirely in memory.

---

## Available Storage Levels

| Storage Level           | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| **MEMORY_ONLY**         | Fastest, but may fail if RDD doesn’t fit in memory         |
| **MEMORY_AND_DISK**     | Stores what fits in memory; spills the rest to disk        |
| **DISK_ONLY**           | Slower, but ensures full persistence                       |
| **MEMORY_ONLY_SER**     | Serialized in memory — reduces size but increases CPU cost |
| **MEMORY_AND_DISK_SER** | Balanced storage & reliability                             |
| **OFF_HEAP**            | For external memory (Tungsten), rare in typical workloads  |

---

## Story Example: NeoMart Recommendation Pipeline

NeoMart runs a sessionization workflow to build personalized recommendations.

### Without caching:

* Each model training iteration recomputes raw logs
* Session extraction runs again
* Feature engineering runs again
* Total time: **45 minutes**

### With caching:

```python
sessions = (
    logs
    .filter(lambda x: "session" in x)
    .map(parse_session)
)

sessions.cache()

model = train_recommendation_model(sessions)
```

Total time drops to **8 minutes**.

Caching saved them **over 80%** compute time.

---

## When Should You Cache an RDD?

### ✔**When the RDD is reused multiple times**

Example: Training multiple ML models with the same preprocessed data.

### ✔**When recomputation cost is expensive**

Example: Custom parsing, UDFs, joins, or external IO.

### ✔**When performing iterative algorithms**

* PageRank
* K-Means
* Gradient descent loops

### ✔**When running multiple actions on the same RDD**

Such as `count()`, `take()`, `collect()`, `saveAsTextFile()`.

---

## When *Not* to Cache

### ❌ RDD is used only once

Caching wastes memory.

### ❌ RDD is too large to fit in memory

Prefer `MEMORY_AND_DISK` or avoid caching.

### ❌ Using DataFrames instead

Spark automatically optimizes them with Catalyst & Tungsten.

---

## How to Uncache / Remove from Memory

Memory is limited. After you're done, always clean up:

```python
rdd.unpersist()
```

Or remove all cached objects:

```python
spark.catalog.clearCache()
```

---

## Debugging: How to See Cached RDDs

In Databricks or Spark UI:

* Open the **Storage** tab
* View size, partitions, and storage level
* Monitor memory usage
* Identify partitions not cached due to size

This helps optimize cluster resources effectively.

---

## Example: Full Pipeline Using cache() and persist()

```python
from pyspark import StorageLevel

logs = sc.textFile("/mnt/neomart/raw_logs")

clean = logs \
    .filter(lambda x: "event" in x) \
    .map(lambda x: parse_event(x))

clean.persist(StorageLevel.MEMORY_AND_DISK)

# Perform multiple actions without recomputation
print(clean.count())
print(clean.take(5))

daily_stats = clean \
    .map(lambda x: (x.date, 1)) \
    .reduceByKey(lambda x, y: x + y)
```

---

## Best Practices for RDD Caching

### 🔹 Cache early in iterative algorithms

Avoid repeating expensive transformations.

### 🔹 Use MEMORY_ONLY when data fits

Fastest option.

### 🔹 Use MEMORY_AND_DISK when unsure

Safe and reliable.

### 🔹 Don’t cache everything

Be selective to avoid memory pressure.

### 🔹 Clean up with unpersist()

Especially in long Databricks jobs.

---

## Summary — Caching Makes Spark Lightning Fast

* RDD caching prevents expensive recomputations.
* `cache()` stores data in memory; `persist()` lets you choose storage levels.
* Useful for ML loops, repeated actions, and expensive pipelines.
* Improves performance and reduces cluster cost.
* Spark UI helps monitor cached datasets and memory usage.

Caching is one of the most powerful performance tools in Spark — when used wisely, it turns slow pipelines into near real-time workflows.

---

Next, we’ll cover **Creating DataFrames from CSV, JSON, Parquet, and Hive Tables**.
```



