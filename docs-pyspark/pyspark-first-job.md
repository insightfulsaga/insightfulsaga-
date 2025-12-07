---
id: pyspark-first-job
title: First PySpark Job — Hello World Example
sidebar_label: First PySpark Job
description: Learn how to write and run your first PySpark job with a hands-on “Hello World” example, and understand the end-to-end workflow in Spark.
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

# First PySpark Job — Hello World Example

Now that we understand **PySpark setup, SparkSession, and SparkContext**, it’s time to write your **first PySpark job**. Think of this as the **Hello World** of distributed computing, but instead of printing text, we’ll process some data in parallel!

---

## Step 1: Initialize SparkSession

Every PySpark job starts with a **SparkSession**:

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("HelloWorldJob") \
    .master("local[*]") \
    .getOrCreate()
```

* `appName`: Name of your Spark job
* `master`: Execution mode (`local[*]` uses all CPU cores)

> SparkSession automatically creates a **SparkContext** under the hood.

---

## Step 2: Create Sample Data

We will create a **small dataset** to simulate a real-world scenario:

```python
data = [("Alice", 25), ("Bob", 30), ("Charlie", 28)]
columns = ["Name", "Age"]

df = spark.createDataFrame(data, columns)
```

Here, we are using a **DataFrame**, which is Spark’s high-level abstraction for structured data.

---

## Step 3: Perform a Simple Transformation

Let’s filter out people younger than 30:

```python
filtered_df = df.filter(df.Age >= 30)
```

This is equivalent to **SQL WHERE clause** in Spark.

---

## Step 4: Show Results

```python
filtered_df.show()
```

Expected output:

```
+----+---+
|Name|Age|
+----+---+
| Bob| 30|
+----+---+
```

> Congratulations! You just ran your **first PySpark job** and applied a basic transformation.

---

## Step 5: Stop SparkSession

Always stop the Spark session to **free resources**:

```python
spark.stop()
```

---

## Real-Life Example

At **ShopVerse Retail**, new ETL jobs often start like this:

1. Load **sample CSV files** into a DataFrame
2. Apply **basic transformations** (filter, groupBy, aggregate)
3. Verify results locally using **`show()`**
4. Deploy the same logic to a **cluster for production scale**

This approach allows **safe experimentation** without affecting production pipelines.

---

## Key Takeaways

* Every PySpark job starts with a **SparkSession**.
* Use **DataFrames** for structured data processing.
* Apply **transformations** (`filter`, `map`, `select`) to process data.
* Always **stop SparkSession** to release cluster resources.
* Start small with **sample data** before scaling to large datasets.

---

Next, we will explore **RDDs vs DataFrames vs Datasets** in detail to understand **which abstraction to choose for your Spark jobs**.

```
