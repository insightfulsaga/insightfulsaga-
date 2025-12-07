---
id: "pyspark-dates"
title: "Working with Dates and Timestamps in PySpark DataFrames (Full Guide)"
sidebar_label: "Dates & Time"
slug: "/pyspark/dates-and-timestamps"
description: "Complete guide to date and timestamp operations in PySpark, including extracting date components, aggregations, ratios, and SQL queries with real examples."
keywords:
  - "pyspark date functions"
  - "pyspark timestamp"
  - "pyspark date formatting"
  - "date extraction pyspark"
  - "pyspark weekofyear"
  - "pyspark groupBy date"
  - "pyspark sql dates"
  - "demand planning pyspark"
og:title: "Dates & Timestamps in PySpark — Complete Tutorial with Examples"
og:description: "Learn how to work with dates and timestamps in PySpark DataFrames, including extraction, aggregations, ratios, and SQL date queries."
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


# Dates & Timestamps in PySpark DataFrames

Working with dates and timestamps is essential for analytics, forecasting, time-series modeling, and demand planning.  
PySpark provides powerful built-in functions to extract, transform, manipulate, and aggregate date-related fields.

This guide walks you step-by-step through **date extraction**, **aggregations**, **SQL queries**, and **derived metrics**.

---

## Loading Data

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('dates').getOrCreate()

df = spark.read.csv('/path/to/demand_planning.csv', header=True, inferSchema=True)
```

---

## Preview & Schema

```python
df.show()
```

Example output:

```sql
+----------+--------+-------------+-----------+------------+
|      Date| Product|ForecastUnits|ActualUnits|LeadTimeDays|
+----------+--------+-------------+-----------+------------+
|2023-01-01|    Soap|          100|         95|           3|
|2023-01-02|    Soap|          120|        110|           2|
|2023-01-03| Shampoo|           80|         85|           4|
|2023-01-04| Shampoo|           90|         88|           3|
|2023-02-01|    Soap|          130|        125|           2|
|2023-02-02| Shampoo|           85|         82|           4|
|2023-03-01|    Soap|          140|        135|           3|
|2023-03-05| Shampoo|          100|        102|           3|
+----------+--------+-------------+-----------+------------+
```

```python
df.printSchema()
```

Output:

```python
root
 |-- Date: date (nullable = true)
 |-- Product: string (nullable = true)
 |-- ForecastUnits: integer (nullable = true)
 |-- ActualUnits: integer (nullable = true)
 |-- LeadTimeDays: integer (nullable = true)
```

> **Note:** Some Spark versions read dates as strings. You can convert using:
> `df = df.withColumn("Date", to_date("Date"))`

---

# Extracting Date Components in PySpark

PySpark provides functions to extract day, month, year, and week numbers.

```python
from pyspark.sql.functions import dayofmonth, month, year, weekofyear
```

```python
df.select(
    dayofmonth(df['Date']).alias('Day'),
    month(df['Date']).alias('Month'),
    year(df['Date']).alias('Year'),
    weekofyear(df['Date']).alias('WeekOfYear')
).show()
```

Output:

```sql
+---+-----+----+----------+
|Day|Month|Year|WeekOfYear|
+---+-----+----+----------+
| 1 |  1  |2023|    52    |
| 2 |  1  |2023|     1    |
| 3 |  1  |2023|     1    |
| 4 |  1  |2023|     1    |
| 1 |  2  |2023|     5    |
| 2 |  2  |2023|     5    |
| 1 |  3  |2023|     9    |
| 5 |  3  |2023|    10    |
+---+-----+----+----------+
```

### ✔️ What This Does

Extracts different date components for time-series analysis, forecasting, and reporting.

---

# Aggregation by Year

```python
from pyspark.sql.functions import avg
```

```python
df_with_year = df.withColumn('Year', year(df['Date']))

df_with_year.groupBy('Year') \
    .mean() \
    .select('Year', 'avg(ActualUnits)') \
    .show()
```

Output:

```sql
+----+------------------+
|Year|avg(ActualUnits)  |
+----+------------------+
|2023|  103.375         |
+----+------------------+
```

### ✔️ Meaning

Computes yearly averages—useful for trend analysis and demand forecasting.

---

# Creating Ratios / Derived Metrics

```python
df.select(
    (df['ForecastUnits'] / df['ActualUnits']).alias('Forecast_to_Actual')
).show()
```

Output:

```sql
+--------------------+
|Forecast_to_Actual  |
+--------------------+
|1.0526315789473684  |
|1.0909090909090908  |
|0.9411764705882353  |
|1.0227272727272727  |
|1.04                |
|1.0365853658536585  |
|1.037037037037037   |
|0.9803921568627451  |
+--------------------+
```

### ✔️ Meaning

Shows forecasting accuracy by comparing forecast vs actual.

---

# Running SQL Queries with Dates

```python
df.createOrReplaceTempView('demand')
```

### Query: Find Date(s) With Maximum Actual Units

```python
spark.sql("""
  SELECT Date, ActualUnits 
  FROM demand 
  WHERE ActualUnits = (SELECT MAX(ActualUnits) FROM demand)
""").show()
```

Output:

```sql
+----------+-----------+
| Date     |ActualUnits|
+----------+-----------+
|2023-03-05|       102 |
+----------+-----------+
```

### ✔️ Meaning

Returns the highest-demand day(s) using SQL subqueries.

---

# More Aggregations & Statistics

```python
from pyspark.sql.functions import round, max, min
```

```python
df.select(
    round(avg(df['ActualUnits']), 2).alias('AvgActual'),
    max(df['ForecastUnits']).alias('MaxForecast'),
    min(df['ForecastUnits']).alias('MinForecast')
).show()
```

Output:

```sql
+-----------+-------------+-------------+
| AvgActual | MaxForecast | MinForecast |
+-----------+-------------+-------------+
|   103.38  |     140     |     80      |
+-----------+-------------+-------------+
```

### ✔️ Meaning

Computes multiple KPIs in a single query.

---

# 🟦 1-Minute Summary — Dates & Time in PySpark

| Code / Expression                                   | What It Does                          |
| --------------------------------------------------- | ------------------------------------- |
| `dayofmonth()`, `month()`, `year()`, `weekofyear()` | Extract components from a Date column |
| `withColumn('Year', year(...))`                     | Adds new year column                  |
| `groupBy('Year').mean()`                            | Aggregates metrics by year            |
| `(ForecastUnits / ActualUnits)`                     | Computes forecast accuracy            |
| `createOrReplaceTempView()`                         | Registers DataFrame for SQL           |
| `SELECT ... WHERE ActualUnits = (MAX...)`           | Finds rows with maximum demand        |
| `round(avg(), 2)`, `max()`, `min()`                 | Summary statistics                    |

---
Next, we’ll cover Using Spark SQL basic — Register Temp Views and Query.