---
id: df-api
title: DataFrame API — Select, Filter, WithColumn & Drop
sidebar_label: DataFrame API
description: Learn how to use PySpark DataFrame API operations such as select, filter, withColumn, and drop through practical Databricks examples and real-world use cases.
keywords:
  - PySpark DataFrame API
  - PySpark select filter
  - withColumn examples
  - drop column PySpark
  - Databricks DataFrame transformations
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
---

# DataFrame API — Select, Filter, WithColumn & Drop

Imagine you're working at **NeoMart**, where millions of product views, clicks, sessions, and purchases are being collected every day. The raw data is overwhelming, and your job is to convert it into **clean, structured, meaningful insights**.

This is where the **PySpark DataFrame API** becomes your most powerful tool.  
With just a few transformations — **select**, **filter**, **withColumn**, and **drop** — you can shape your dataset into a ready-to-analyze form.

These operations form the foundation of every ETL pipeline in Spark and Databricks.

---

## Why DataFrame API Matters

DataFrames are:

- **Optimized** through Catalyst engine  
- **Faster** than RDDs  
- **Easier** to use with SQL expressions  
- **Scalable** to billions of rows  

These core functions help transform raw data into analytics-ready data in a clean and efficient way.

---

## 1. select() — Choose Columns or Expressions

The `select()` function allows you to pick specific columns or create new ones using expressions.

### Basic selection

```python
df.select("product_id", "price").show()
```

### With expressions

```python
df.select(col("price") * 0.9).show()
```

### Rename columns

```python
df.select(col("price").alias("discounted_price"))
```

### Story Example

NeoMart wants only product and revenue:

```python
sales_df.select("product_id", "revenue").show()
```

Simple and clean.

---

## 2. filter() / where() — Keep Only Matching Rows

Use `filter()` to keep rows that meet certain conditions.

### Using column expressions

```python
df.filter(df.price > 100).show()
```

### Using SQL-style string filters

```python
df.where("price > 100 AND category = 'electronics'").show()
```

### Story Example

NeoMart wants orders worth above $500:

```python
orders_df.filter(col("amount") > 500).show()
```

This reduces millions of transactions to just the high-value insights.

---

## 3. withColumn() — Add or Modify Columns

`withColumn()` is used to:

* Add new fields
* Transform existing ones
* Apply calculations

### Create a new column

```python
df2 = df.withColumn("price_usd", col("price") * 0.013)
```

### Modify an existing column

```python
df2 = df.withColumn("quantity", col("quantity") + 1)
```

### Add conditional logic

```python
df.withColumn(
    "is_expensive",
    when(col("price") > 1000, True).otherwise(False)
)
```

### Story Example

NeoMart wants to tag premium products:

```python
products_df.withColumn(
    "premium_flag",
    col("price") > 1500
)
```

---

## 4. drop() — Remove Unneeded Columns

Clean up your dataset by removing unnecessary fields.

### Drop a single column

```python
df.drop("internal_notes")
```

### Drop multiple columns

```python
df.drop("temp_col", "backup_col")
```

### Story Example

After processing, NeoMart removes unnecessary metadata:

```python
events_df.drop("raw_payload", "old_timestamp")
```

This reduces storage, memory use, and shuffle size.

---

## Putting It All Together — Real ETL Example

```python
clean_df = (
    raw_df
    .select("user_id", "event_type", "amount", "timestamp")
    .filter(col("amount") > 0)
    .withColumn("amount_usd", col("amount") * 0.013)
    .drop("timestamp")  # if not needed for downstream analytics
)
```

This pipeline:

* Picks relevant fields
* Filters invalid data
* Adds conversion logic
* Cleans unnecessary columns

Exactly what a real-world data engineer does daily.

---

## Summary — Your Core Transformation Toolkit

* **select()** — choose columns or apply expressions
* **filter() / where()** — remove unwanted rows
* **withColumn()** — add or modify fields
* **drop()** — clean the dataset

These core DataFrame operations are the building blocks of every Spark transformation pipeline.
Mastering them prepares you for more advanced transformations like **joins**, **aggregations**, and **window functions**.

---

Next, we’ll dive into **DataFrame Joins — Inner, Left, Right & Full Outer**, where we connect multiple datasets and unlock relational insights.


