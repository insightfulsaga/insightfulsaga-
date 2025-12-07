---
id: df-missing-data
title: Handling Missing Data — Drop, Fill & Replace
sidebar_label: Handling Missing Data
description: Learn how to handle missing data in PySpark DataFrames using drop, fill, and replace operations with practical Databricks examples.
keywords:
  - PySpark missing data
  - handle nulls in DataFrame
  - dropna PySpark
  - fillna DataFrame
  - replace null values
  - Databricks data cleaning
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

# Handling Missing Data — Drop, Fill & Replace

At **NeoMart**, real-world data is messy.  
Customer information may be incomplete, product prices may be missing, or logs may have null values.  
Before analysis, **cleaning missing data** is essential to avoid **incorrect insights** or **errors in ML models**.

PySpark provides **simple and powerful methods** to handle missing values at scale.

---

## Why Handling Missing Data Matters

- Null values can break transformations and aggregations  
- Missing data affects **accuracy** in analytics and machine learning  
- Cleaning ensures **consistent, reliable datasets**  
- Helps optimize **storage and compute** in Databricks  

---

## 1. drop() / dropna() — Remove Rows with Nulls

```python
df_clean = df.dropna()
```

### Options:

* `how="any"` → drops row if **any column** is null (default)
* `how="all"` → drops row only if **all columns** are null
* `subset=["col1","col2"]` → drops row if null in specific columns

### Story Example

NeoMart wants to **remove transactions without an order amount**:

```python
orders_df.dropna(subset=["amount"]).show()
```

This keeps only valid orders for reporting.

---

## 2. fill() / fillna() — Replace Nulls with a Value

```python
df_filled = df.fillna(0, subset=["amount"])
df_filled = df.fillna({"city": "Unknown", "quantity": 1})
```

### Use Cases:

* Replace missing numeric values with **0** or mean
* Replace missing strings with **“Unknown”**
* Fill multiple columns with different values

### Story Example

NeoMart fills missing product categories with "Miscellaneous":

```python
products_df.fillna({"category": "Miscellaneous"}).show()
```

---

## 3. replace() — Substitute Specific Values

```python
df.replace({"N/A": None, "NA": None}).show()
```

### Use Cases:

* Convert placeholder strings (like "N/A") to **null**
* Replace erroneous values with correct defaults

### Story Example

NeoMart replaces invalid age values in customer data:

```python
customers_df.replace({"-1": None}).show()
```

---

## 4. Combining Methods

You can **chain operations** to clean data efficiently:

```python
clean_df = (
    raw_df.replace({"N/A": None})
          .fillna({"quantity": 1, "city": "Unknown"})
          .dropna(subset=["amount", "product_id"])
)
```

This ensures a fully **consistent and ready-to-use dataset**.

---

## Summary

* **drop()/dropna()** → remove rows with nulls
* **fill()/fillna()** → replace nulls with default values
* **replace()** → substitute specific values
* Proper handling of missing data ensures **accurate analytics**, **reliable ML models**, and **optimized Spark performance**

---

Next, we’ll cover **Using Spark SQL — Register Temp Views and Query**.

