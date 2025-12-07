---
id: df-window-functions
title: Window Functions in PySpark DataFrames
sidebar_label: Window Functions
description: Learn how to use PySpark window functions for ranking, running totals, cumulative sums, and time-based analytics in Databricks.
keywords:
  - PySpark window functions
  - Spark row_number
  - running totals PySpark
  - partitionBy orderBy
  - cumulative sum Spark
  - Databricks analytics
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

# Window Functions in PySpark DataFrames

At **NeoMart**, analysts often need more than simple aggregations.  
They want **rankings, running totals, moving averages, and session-level analytics**.
For example:

- Rank products by revenue per category  
- Calculate each customer’s cumulative spend  
- Determine the last purchase date for loyalty scoring  

This is where **window functions** come in.

---

## Why Window Functions Matter

- Allow calculations **over partitions of data**  
- Keep **row-level detail** while performing aggregations  
- Essential for **ranking, cumulative metrics, and analytics features**  
- Perfect for dashboards, reporting, and feature engineering in ML

Unlike `groupBy`, which reduces rows, window functions **retain all rows**.

---

## 1. Import Window Functions

```python
from pyspark.sql.window import Window
from pyspark.sql.functions import row_number, sum, avg, rank, desc
```

---

## 2. Ranking Rows: row_number()

```python
window_spec = Window.partitionBy("category").orderBy(desc("revenue"))

df.withColumn("rank", row_number().over(window_spec)).show()
```

### Story Example

NeoMart wants **top 3 products per category** for promotion campaigns.

---

## 3. Cumulative / Running Totals

```python
window_spec = Window.partitionBy("customer_id").orderBy("date")

df.withColumn("running_total", sum("amount").over(window_spec)).show()
```

This tracks **each customer’s cumulative spend over time**, essential for loyalty programs.

---

## 4. Moving Averages

```python
window_spec = Window.orderBy("date").rowsBetween(-3, 0)

df.withColumn("moving_avg", avg("amount").over(window_spec)).show()
```

### Use Case

* Smooth out daily sales volatility
* Detect trends or anomalies

---

## 5. Ranking With Ties: rank() vs dense_rank()

```python
window_spec = Window.partitionBy("category").orderBy(desc("revenue"))

df.withColumn("rank", rank().over(window_spec)).show()
df.withColumn("dense_rank", dense_rank().over(window_spec)).show()
```

* `rank()` → leaves gaps for ties
* `dense_rank()` → no gaps

Useful for **leaderboards or top-n product ranking**.

---

## Summary

Window functions in PySpark:

* Operate **over partitions without reducing rows**
* Enable **rankings, cumulative sums, moving averages**
* Are **essential for BI, ML features, and advanced analytics**
* Retain the flexibility of DataFrame operations

---

Next, we’ll cover **Handling Missing Data — Drop, Fill, Replace**, to clean and prepare datasets for analysis and modeling.

