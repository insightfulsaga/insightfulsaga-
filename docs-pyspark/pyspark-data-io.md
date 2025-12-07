---
id: "pyspark-data-io"
title: "PySpark Data I/O — Reading, Writing & Optimizing Big Data"
sidebar_label: "Data I/O"
slug: "/pyspark/data-io"
description: "Learn how to efficiently read, write, and process data in PySpark including CSV, JSON, Parquet, ORC, JDBC databases, cloud storage, streaming, and compression. A complete guide for beginners and data engineers."
keywords:
  - "pyspark data io"
  - "pyspark read csv"
  - "pyspark write parquet"
  - "pyspark jdbc"
  - "pyspark read json"
  - "pyspark streaming data"
  - "pyspark cloud storage"
og:title: "PySpark Data I/O — Complete Guide for Reading & Writing Data"
og:description: "Master PySpark Data I/O — Learn how to read and write CSV, JSON, Parquet, ORC, connect to databases, handle streaming data, optimize performance with partitioning, bucketing, and compression."
tags:
  - "PySpark"
  - "Data I/O"
  - "Big Data"
  - "ETL"
  - "Streaming"
---

# PySpark Data I/O: Read, Write & Optimize Big Data Efficiently

Imagine standing in a massive data library: CSV files, Parquet tables, JSON logs, and databases all around you. Your mission is clear—read, process, and save data efficiently without hitting memory limits. This is where **PySpark Data I/O** comes in, combining Python simplicity with Spark's power for scalable data workflows.

Whether your data is local, in the cloud, or inside a database, PySpark provides tools to manage it all efficiently.

---

## What is Data I/O in PySpark?

**Data I/O (Input/Output)** is a critical part of any **big data pipeline**. It involves:

* **Input (I):** Reading data from files, databases, or streaming sources.
* **Output (O):** Writing processed data to files, cloud storage, or databases for analysis.

With PySpark, you can handle datasets from **thousands to billions of rows**, making your data engineering tasks scalable and reliable.

---

## 1️⃣ Reading and Writing CSV Files in PySpark

CSV files are ubiquitous in data analytics—they are often the first format you encounter. PySpark makes **reading and writing CSVs fast, scalable, and reliable**.

### Example: Reading & Writing CSV
```python
from pyspark.sql import SparkSession

# Start Spark Session
spark = SparkSession.builder.appName("CSV Example").getOrCreate()

# Read CSV
df = spark.read.csv("data/sales.csv", header=True, inferSchema=True)
df.show(5)
df.printSchema()

# Filter rows
filtered_df = df.filter(df["amount"] > 500)

# Write CSV
filtered_df.write.csv("output/sales_filtered.csv", header=True, mode="overwrite")
````

### Pro Tips for CSV:

* Use `option("delimiter", "\t")` for TSV files.
* Apply `repartition()` before writing **large CSV files** for better parallelism.

💡 **Why it matters:** Even millions of rows that would crash Excel can now be processed efficiently.

---

## 2️⃣ Parquet & ORC: Columnar Data Formats

For large-scale analytics, **columnar formats like Parquet and ORC** are essential. They improve **query performance, reduce storage size**, and enable scalable big data workflows.

### Example: Working with Parquet

```python
# Read Parquet
parquet_df = spark.read.parquet("data/sales.parquet")

# Filter and aggregate
high_value_sales = parquet_df.filter(parquet_df["amount"] > 1000)
summary = high_value_sales.groupBy("region").sum("amount")
summary.show()

# Write Parquet
summary.write.parquet("output/sales_summary.parquet", mode="overwrite")
```

### Pro Tips:

* Use `partitionBy("column")` to speed up queries.
* Leverage **column pruning** to reduce memory usage during reads.

💡 **Why it matters:** Parquet and ORC make storing and querying massive datasets faster and more cost-efficient.

---

## 3️⃣ Reading Data from Databases with JDBC

Sometimes data is stored in relational databases. PySpark integrates seamlessly with **JDBC** to read tables into **Spark DataFrames**.

### Example: Reading from PostgreSQL

```python
jdbc_url = "jdbc:postgresql://localhost:5432/salesdb"
properties = {"user": "postgres", "password": "mypassword", "driver": "org.postgresql.Driver"}

# Load table
db_df = spark.read.jdbc(url=jdbc_url, table="transactions", properties=properties)
db_df.show(5)
```

### Advanced Tips:

* Use **pushdown queries** to filter rows before loading:

```python
query = "(SELECT * FROM transactions WHERE amount > 1000) AS high_sales"
df_filtered = spark.read.jdbc(url=jdbc_url, table=query, properties=properties)
```

* Partition **large tables** by numeric or date columns for faster parallel reads.

💡 **Why it matters:** Handle millions of database rows efficiently across Spark clusters.

---

## 4️⃣ Writing Data to External Storage

After processing, save your results reliably—whether to **cloud storage, HDFS, or databases**.

### Example: Writing to S3 and Databases

```python
# Write to S3
filtered_df.write.parquet("s3://my-bucket/sales_filtered/", mode="overwrite")

# Append back to database
filtered_df.write.jdbc(url=jdbc_url, table="filtered_transactions", mode="append", properties=properties)
```

### Pro Tips:

* Use `bucketBy()` and `sortBy()` for optimized storage and queries.
* `mode="overwrite"` replaces datasets, `append` adds new data incrementally.

💡 **Why it matters:** Store insights efficiently for dashboards, reporting, or further analysis.

---

## 5️⃣ Advanced Data I/O Scenarios in PySpark

### 5.1 JSON & Nested Data

```python
json_df = spark.read.json("data/events.json", multiLine=True)
json_df.select("user.id", "event.type").show()
```

* Handles **nested and complex structures**.
* Ideal for **logs or API outputs**.

### 5.2 Streaming Data Input

```python
stream_df = spark.readStream.format("socket").option("host", "localhost").option("port", 9999).load()
stream_df.printSchema()
```

* Enables **real-time analytics** on live data streams.

### 5.3 Compression for Storage Optimization

```python
df.write.option("compression", "snappy").parquet("output/compressed_sales.parquet")
```

* Reduces storage costs and speeds up I/O operations.

---

## 🔑 PySpark Data I/O Summary

PySpark Data I/O allows you to:

* 📄 Read and write **CSV, JSON, Parquet, ORC** effortlessly.
* 🏛️ Connect to **databases** and query large datasets efficiently.
* ☁️ Save data to **cloud storage or distributed systems** reliably.
* ⏱️ Process **streaming data** and handle **compressed formats**.
* ⚡ Optimize **performance** using partitioning, bucketing, and columnar storage.

**Why it’s powerful:** Handle millions or billions of rows smoothly, focus on **data analysis, transformation, and insights**, and forget about memory limitations or format constraints.

```

