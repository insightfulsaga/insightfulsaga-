---
id: "pyspark-aggregation"
title: "Data Aggregation in PySpark DataFrames (Complete Guide)"
sidebar_label: "Dataframe Aggregation"
slug: "/pyspark/aggregation"
description: "Learn how to perform data aggregation in PySpark using groupBy, agg, max, sum, avg, distinct, and sorting operations with real shipment dataset examples."
keywords:
  - "pyspark aggregation"
  - "pyspark groupBy"
  - "pyspark avg sum max"
  - "pyspark countDistinct"
  - "pyspark sorting"
  - "spark dataframe aggregation"
  - "pyspark shipments dataset"
  - "big data transformations"
og:title: "Data Aggregation in PySpark — Full Tutorial with Examples"
og:description: "A complete guide to performing data aggregation in PySpark including groupBy, agg, max, sum, avg, distinct counts, and sorting."
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
---


# Data Aggregation in PySpark DataFrames

Data aggregation is one of the most powerful operations in PySpark.  
Whether you're analyzing shipments, sales, demand planning, logs, or events — aggregation is essential for summarizing large datasets.

This guide walks through **groupBy**, **aggregations**, **sorting**, and **built-in PySpark aggregation functions** with a real shipments dataset.

---

# Loading the Shipments Dataset

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('agg').getOrCreate()

df = spark.read.csv('/path/to/shipments.csv', header=True, inferSchema=True)
```

### ✔️ Why This Is Needed

To start a Spark session, load the dataset, and auto-infer column types.

---

# Preview & Schema

```python
df.show()
```

Example dataset:

```text
+----------+--------+----------+-----+-----+
|ShipmentID|Company | Product  |Units|Sales|
+----------+--------+----------+-----+-----+
|     S001 | FedEx  |  Soap    | 100 |1500 |
|     S002 | FedEx  | Shampoo  | 200 |3000 |
|     S003 |BlueDart|  Bread   | 150 |1800 |
|     S004 |  DHL   |Toothpaste| 120 |2400 |
|     S005 |  DHL   |  Rice    | 300 |6000 |
|     S006 |BlueDart|Chocolate | 180 |3600 |
|     S007 | FedEx  |  Juice   | 130 |2600 |
|     S008 |  DHL   | Cereal   | 220 |4400 |
|     S009 |BlueDart|  Soda    | 110 |2200 |
|     S010 | FedEx  |Facewash  | 140 |2800 |
+----------+--------+----------+-----+-----+
```

Schema:

```python
df.printSchema()
```

Output:

```python
root
 |-- ShipmentID: string (nullable = true)
 |-- Company: string (nullable = true)
 |-- Product: string (nullable = true)
 |-- Units: integer (nullable = true)
 |-- Sales: integer (nullable = true)
```

---

# Aggregation Examples

## 1. Group by Company (no aggregation yet)

```python
df.groupBy("Company")
```

Returns:

```
GroupedData object — must apply aggregation such as .count(), .avg(), .max(), etc.
```

### ✔️ Why We Need This

To prepare the data for summarization by company.

---

## 2. Average of all numeric columns per Company

```python
df.groupBy("Company").mean().show()
```

Output:

```sql
+--------+-----------+-----------+
|Company |avg(Units) |avg(Sales) |
+--------+-----------+-----------+
|BlueDart|  146.6667 | 2533.3333 |
|   FedEx|  142.5    | 2475.0    |
|     DHL|  213.3333 | 4266.6667 |
+--------+-----------+-----------+
```

### ✔️ Why We Need This

To quickly compute per-company performance metrics.

---

## 3. Count of shipments per Company

```python
df.groupBy("Company").count().show()
```

Output:

```sql
+--------+-----+
|Company |count|
+--------+-----+
|BlueDart|  3  |
|   FedEx|  4  |
|     DHL|  3  |
+--------+-----+
```

### ✔️ Why We Need This

To understand shipment volume distribution.

---

## 4. Maximum values per Company

```python
df.groupBy("Company").max().show()
```

Output:

```sql
+--------+-----------+-----------+
|Company |max(Units) |max(Sales) |
+--------+-----------+-----------+
|BlueDart|    180    |   3600    |
|   FedEx|    200    |   3000    |
|     DHL|    300    |   6000    |
+--------+-----------+-----------+
```

---

## 5. Total sales across all rows

```python
df.agg({'Sales': 'sum'}).show()
```

Output:

```sql
+----------+
|sum(Sales)|
+----------+
|  30300   |
+----------+
```

---

## 6. Maximum sale value

```python
df.agg({'Sales': 'max'}).show()
```

Output:

```sql
+----------+
|max(Sales)|
+----------+
|   6000   |
+----------+
```

---

## 7. Max Sales per Company (group then aggregate)

```python
group_data = df.groupBy("Company")
group_data.agg({'Sales': 'max'}).show()
```

Output:

```sql
+--------+----------+
|Company |max(Sales)|
+--------+----------+
|BlueDart|   3600   |
|   FedEx|   3000   |
|     DHL|   6000   |
+--------+----------+
```

---

# Using Built-In Functions

## 8. Average Sales using `avg()`

```python
from pyspark.sql.functions import avg

df.select(avg('Sales').alias('Average Sales')).show()
```

Output:

```sql
+-------------+
|Average Sales|
+-------------+
|    3030.0   |
+-------------+
```

---

## 9. Count distinct Sales values

```python
from pyspark.sql.functions import countDistinct

df.select(countDistinct('Sales')).show()
```

Output:

```sql
+---------------------+
|count(DISTINCT Sales)|
+---------------------+
|         10          |
+---------------------+
```

---

# Sorting & Ordering Data

## 10. Sort by Sales (ascending)

```python
df.orderBy('Sales').show()
```

---

## 11. Sort by Sales (descending)

```python
df.orderBy(df['Sales'].desc()).show()
```

---

# 🟦 1-Minute Summary — PySpark Data Aggregation

| Code Snippet                      | What It Does                           |
| --------------------------------- | -------------------------------------- |
| `df.groupBy("Company")`           | Groups rows by company                 |
| `groupBy().mean()`                | Calculates average of numeric columns  |
| `groupBy().count()`               | Counts number of shipments per company |
| `groupBy().max()`                 | Gets max of each numeric column        |
| `df.agg({'Sales': 'sum'})`        | Total sales across dataset             |
| `df.agg({'Sales': 'max'})`        | Maximum sale value                     |
| `groupBy().agg({'Sales': 'max'})` | Max sales per company                  |
| `avg(), countDistinct()`          | Built-in aggregation functions         |
| `orderBy('Sales')`                | Sorts ascending                        |
| `orderBy(df['Sales'].desc())`     | Sorts descending                       |

---

Next, we’ll explore Window Functions in PySpark DataFrames, enabling running totals, rankings, and time-based calculations.
