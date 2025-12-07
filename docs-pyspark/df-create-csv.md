---
id: df-create-csv
title: Creating DataFrames from CSV, JSON, Parquet & Hive Tables
sidebar_label: Creating DataFrames
description: Learn how to create PySpark DataFrames from CSV, JSON, Parquet files, and Hive tables using Databricks and Spark best practices.
keywords:
  - PySpark DataFrame creation
  - Spark read CSV
  - Spark read JSON
  - Spark read Parquet
  - DataFrame from Hive
  - Databricks read files
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

# Creating DataFrames from CSV, JSON, Parquet & Hive Tables

Every analytics pipeline at **NeoMart**, our growing e-commerce platform, starts with one step: **loading data into Spark**.  
Whether it comes from mobile apps, warehouses, partners, or machine logs, your first job as a data engineer is to convert this raw data into a **DataFrame** — Spark’s most widely used data structure.

DataFrames provide schema, structure, column-level operations, and optimization through Catalyst.  
But how you *create* a DataFrame depends on the **file format** you’re working with.

Let’s explore the four most common formats: **CSV, JSON, Parquet, and Hive tables**.

---

## Why File Formats Matter

Not all file formats behave the same.  
Some are slow but simple (CSV), others lightning fast (Parquet), and some ideal for semi-structured workloads (JSON).

Choosing the right format can easily save **minutes or even hours** in large-scale ETL jobs.

---

## 1. Creating DataFrames from CSV Files

CSV files are widely used but come with limitations — no schema, no compression, and slow parsing.

```python
df = spark.read \
    .option("header", True) \
    .option("inferSchema", True) \
    .csv("/mnt/data/sales.csv")
```

### ✔ When to Use CSV

* During initial ingestion
* When partners/vendors deliver small datasets
* For debugging and quick data inspection

### ❌ Avoid for big data

CSV parsing becomes slow as data volume increases.

---

## 2. Creating DataFrames from JSON Files

JSON is perfect for logs, nested attributes, and NoSQL-like structures.

```python
df = spark.read \
    .option("multiline", True) \
    .json("/mnt/data/events.json")
```

### ✔ Best for

* Clickstream logs
* IoT events
* User activity streams

### Story Example

NeoMart’s mobile app sends events like:

```json
{
  "user": "123",
  "actions": ["view", "add_to_cart"]
}
```

JSON allows nested data, which Spark can parse easily.

---

## 3. Creating DataFrames from Parquet Files (Best Practice)

Parquet is the **default** format for big data because of:

* Columnar storage
* Built-in compression
* Predicate pushdown
* Fast read/write

```python
df = spark.read.parquet("/mnt/data/transactions/")
```

### ✔ Best Format For

* Analytics
* Large-scale ETL
* Machine learning pipelines
* Databricks Delta workflows

This is NeoMart’s recommended storage format for raw, clean, and analytics layers.

---

## 4. Creating DataFrames from Hive Tables

Hive tables allow you to store structured datasets with metadata (schema, partitions).

```python
df = spark.table("analytics.daily_orders")
```

or using SQL:

```python
df = spark.sql("SELECT * FROM analytics.daily_orders")
```

### ✔ Helpful When

* Working with enterprise data warehouses
* Using Databricks metastore
* Structuring data by partitions (date, region, etc.)

---

## 5. Summary

* **CSV** → simple, human-readable, but slow
* **JSON** → perfect for nested & semi-structured data
* **Parquet** → fastest & most efficient (recommended for big data)
* **Hive Tables** → ideal for enterprise-scale structured storage

Proper DataFrame creation lays the foundation for the entire transformation pipeline — ensuring performance, accuracy, and scalability.

---

Next up, we’ll master the **DataFrame API — Select, Filter, WithColumn, Drop**, the core tools used to transform raw data into analytics-ready datasets.

