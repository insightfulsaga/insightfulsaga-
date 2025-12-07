---
id: "pyspark-missing"
title: "Handling Missing Data in PySpark DataFrames (Complete Guide)"
sidebar_label: "Handling Missing Data"
slug: "/pyspark/missing-data"
description: "Learn all techniques for handling missing or null data in PySpark DataFrames including dropping nulls, filling values, conditional replacement, and computing statistics."
keywords:
  - "pyspark missing data"
  - "pyspark null handling"
  - "pyspark na functions"
  - "spark drop null"
  - "pyspark fill null"
  - "big data cleaning"
  - "spark dataframe cleaning"
og:title: "Handling Missing Data in PySpark — Complete Tutorial"
og:description: "A full guide explaining how to drop, fill, and replace null values in PySpark using df.na.drop, df.na.fill, subset operations, thresholds, and mean imputation."
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

  # Advanced Transformations
  - "Explode"
  - "Arrays"
  - "StructType"
  - "Complex Data Types"
  - "Pivot"
  - "Unpivot"
  - "Join Optimization"
  - "Sorting"
  - "Sampling"
  - "Partitioning"
  - "Bucketing"

  # Storage / File Formats
  - "CSV"
  - "JSON"
  - "Parquet"
  - "Avro"
  - "Delta Lake"

  # Performance / Optimization
  - "Performance Tuning"
  - "Shuffle"
  - "Narrow vs Wide Transformations"
  - "Spark UI"
  - "Catalyst Optimizer"
  - "Tungsten"
  - "Repartition"
  - "Coalesce"
  - "Broadcast Join"
  - "Memory Management"

  # Streaming
  - "Structured Streaming"
  - "Real-Time Data"
  - "Kafka"
  - "Streaming Sinks"
  - "Watermarking"
  - "Checkpoints"

  # Machine Learning
  - "MLlib"
  - "Machine Learning"
  - "Regression"
  - "Classification"
  - "Clustering"
  - "Recommendation Systems"
  - "Feature Engineering"

  # Integrations
  - "Snowflake"
  - "Hive"
  - "Databricks"
  - "AWS EMR"
  - "GCP Dataproc"
  - "Azure Synapse"

  # ETL / Real-World
  - "ETL"
  - "Data Pipelines"
  - "Data Processing"
  - "Workflow Automation"
  - "Data Quality"
  - "Semi-Structured Data"
  - "Production Pipelines"
  - "Use Cases"

---


# Handling Missing Data in PySpark DataFrames

Handling missing values is an essential part of data cleaning, ETL pipelines, machine learning prep, and large-scale analytics.  
PySpark provides powerful `DataFrame.na` functions to detect, drop, fill, and impute missing values.

Below is a complete guide using a sample **Royalty & Sales** dataset.

---

# Load Dataset

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('missing-data').getOrCreate()

df = spark.read.csv('/path/to/royalty.csv', header=True, inferSchema=True)
````

---

# Show Raw Data

```python
df.show()
```

Output:

```sql
+------------+------------------+------+--------+
| Author     | Book             | Sales| Royalty|
+------------+------------------+------+--------+
| John Smith | Deep Learning    | 5000 | 800    |
| Jane Doe   | AI Ethics        | null | 600    |
| null       | Quantum Computing| 3500 | 550    |
| Alex Lee   | Big Data         | 4500 | null   |
| Anna Ray   | null             | null | null   |
+------------+------------------+------+--------+
```

---

# 1. Drop Rows With Any Null Values

```python
df.na.drop().show()
```

Output:

```sql
+-----------+--------------+-----+--------+
| Author    | Book         |Sales|Royalty |
+-----------+--------------+-----+--------+
| John Smith|Deep Learning | 5000|   800  |
+-----------+--------------+-----+--------+
```

### ✔️ What This Does

Removes any row that contains **at least one** null value.

---

# 2. Keep Rows Only if ≥ 2 Non-Null Values

```python
df.na.drop(thresh=2).show()
```

Output:

```sql
+-----------+------------------+-----+--------+
| Author    | Book             |Sales|Royalty |
+-----------+------------------+-----+--------+
| John Smith|Deep Learning     |5000 | 800    |
| Jane Doe  |AI Ethics         |null | 600    |
| null      |Quantum Computing |3500 | 550    |
| Alex Lee  |Big Data          |4500 | null   |
+-----------+------------------+-----+--------+
```

### ✔️ What This Does

Keeps rows that have **at least 2 non-null values**.

---

# 3. Drop Row Only If Every Column Is Null

```python
df.na.drop(how='all').show()
```

Output:

```sql
+-----------+------------------+-----+--------+
| Author    | Book             |Sales|Royalty |
+-----------+------------------+-----+--------+
| John Smith|Deep Learning     |5000 |800     |
| Jane Doe  |AI Ethics         |null |600     |
| null      |Quantum Computing |3500 |550     |
| Alex Lee  |Big Data          |4500 |null    |
| Anna Ray  |null              |null |null    |
+-----------+------------------+-----+--------+
```

### ✔️ What This Does

Removes rows **only if every column** has null → none in this dataset.

---

# 4. Drop Rows If Any Column Is Null

```python
df.na.drop(how='any').show()
```

Output is the same as example (only one row remains).

✔️ Equivalent to `df.na.drop()`.

---

# 5. Drop Rows Where a Specific Column (Sales) Is Null

```python
df.na.drop(subset=['Sales']).show()
```

Output:

```sql
+-----------+------------------+-----+--------+
| Author    | Book             |Sales|Royalty |
+-----------+------------------+-----+--------+
| John Smith|Deep Learning     |5000 | 800    |
| null      |Quantum Computing |3500 | 550    |
| Alex Lee  |Big Data          |4500 | null   |
+-----------+------------------+-----+--------+
```

### ✔️ What This Does

Keeps only rows where **Sales is not null**.

---

# 6. Fill All Nulls With 0

```python
df.na.fill(0).show()
```

Output:

```sql
+-----------+------------------+-----+--------+
| Author    | Book             |Sales|Royalty |
+-----------+------------------+-----+--------+
| John Smith|Deep Learning     |5000 | 800    |
| Jane Doe  |AI Ethics         |  0  | 600    |
| null      |Quantum Computing |3500 | 550    |
| Alex Lee  |Big Data          |4500 | 0      |
| Anna Ray  |null              |  0  | 0      |
+-----------+------------------+-----+--------+
```

### ✔️ What This Does

Replaces **all nulls** (numbers, strings) with `0`.

---

# 7. Fill All Nulls With `"unknown"`

```python
df.na.fill('unknown').show()
```

Output:

```sql
+-----------+------------------+--------+--------+
| Author    | Book             | Sales  |Royalty |
+-----------+------------------+--------+--------+
| John Smith| Deep Learning    | 5000   | 800    |
| Jane Doe  | AI Ethics        | unknown| 600    |
| unknown   | Quantum Computing| 3500   | 550    |
| Alex Lee  | Big Data         | 4500   |unknown |
| Anna Ray  | unknown          |unknown |unknown |
+-----------+------------------+--------+--------+
```

### ✔️ What This Does

Fills every missing cell with `"unknown"` regardless of data type.

---

# 8. Fill Nulls Only in the Author Column

```python
df.na.fill('unknown', subset=['Author']).show()
```

Output:

```sql
+-----------+------------------+------+--------+
| Author    | Book             |Sales |Royalty |
+-----------+------------------+------+--------+
| John Smith|Deep Learning     | 5000 |  800   |
| Jane Doe  |AI Ethics         | null |  600   |
| unknown   |Quantum Computing | 3500 |  550   |
| Alex Lee  |Big Data          | 4500 | null   |
| Anna Ray  |null              | null | null   |
+-----------+------------------+------+--------+
```

### ✔️ What This Does

Only fills missing author names.

---

# 9. Fill Missing Sales Values With the Mean

```python
from pyspark.sql.functions import mean

mean_val = df.select(mean(df['Sales'])).collect()
mean_sales = mean_val[0][0]

df.na.fill(mean_sales, subset=['Sales']).show()
```

Output:

```sql
+-----------+------------------+------+--------+
| Author    | Book             |Sales |Royalty |
+-----------+------------------+------+--------+
| John Smith|Deep Learning     | 5000 | 800    |
| Jane Doe  |AI Ethics         | 4250 | 600    |
| null      |Quantum Computing | 3500 | 550    |
| Alex Lee  |Big Data          | 4500 | null   |
| Anna Ray  |null              | 4250 | null   |
+-----------+------------------+------+--------+
```

### ✔️ What This Does

Replaces missing Sales values with the calculated **average = 4250**.

---

# 🟦 1-Minute Summary — Handling Missing Data in PySpark

| Code Example                               | Meaning / Use Case                           |
| ------------------------------------------ | -------------------------------------------- |
| `df.na.drop()`                             | Drop rows with *any* null values             |
| `df.na.drop(thresh=2)`                     | Keep rows with ≥ 2 non-null values           |
| `df.na.drop(how='all')`                    | Drop only rows where *all* columns are null  |
| `df.na.drop(subset=['Sales'])`             | Drop rows with nulls in specific column(s)   |
| `df.na.fill(0)`                            | Replace all nulls with `0`                   |
| `df.na.fill('unknown')`                    | Replace all nulls with `"unknown"`           |
| `df.na.fill('unknown', subset=['Author'])` | Replace nulls only in the `Author` column    |
| `mean(df['Sales'])`                        | Compute the mean for imputation              |
| `df.na.fill(mean_sales, subset=['Sales'])` | Fill Sales nulls using mean-based imputation |

---
Next, we’ll cover Working with Dates and Timestamps in PySpark DataFrames (Full Guide)