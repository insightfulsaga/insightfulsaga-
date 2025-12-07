---
id: spark-sql
title: Using Spark SQL — Register Temp Views and Query
sidebar_label: Spark SQL Basics
description: Learn how to use Spark SQL in PySpark by registering temporary views and running SQL queries on DataFrames in Databricks.
keywords:
  - Spark SQL PySpark
  - register temp view
  - query DataFrame SQL
  - Databricks SQL queries
  - PySpark SQL example
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
---

# Using Spark SQL — Register Temp Views and Query

Imagine you’re working at **NeoMart**, and your team wants **analysts to query DataFrames using SQL** rather than DataFrame API.  
SQL is familiar to analysts, and Spark SQL allows seamless integration with PySpark DataFrames.

By **registering temporary views**, you can run SQL queries directly on DataFrames in **Databricks notebooks** or Spark clusters, bridging the gap between **SQL familiarity** and **big data scalability**.

---

## Why Spark SQL Matters

- Analysts and engineers can **use standard SQL** on big data  
- Supports **complex queries, joins, and aggregations**  
- Temporary views are **session-scoped** for flexible querying  
- Fully integrates with **DataFrame API**  

This allows teams to **collaborate easily** without learning the full DataFrame API immediately.

---

## 1. Registering a Temp View

```python
# Assume df is your DataFrame
df.createOrReplaceTempView("sales_view")
```

### Notes:

* `createOrReplaceTempView` → creates a session-scoped view
* DataFrames remain in memory; no data is copied
* Can be queried with SQL using `spark.sql()`

---

# 2. Querying Temp Views Using Spark SQL

```python
result_df = spark.sql("""
    SELECT product_id, SUM(amount) AS total_sales
    FROM sales_view
    WHERE amount > 0
    GROUP BY product_id
    ORDER BY total_sales DESC
""")
result_df.show()
```

### Story Example

NeoMart wants **top-selling products**:

* Analysts can write SQL instead of PySpark code
* The result can be used for **dashboards or ML pipelines**

---

## 3. Temporary vs Global Views

* **Temporary View** (`createOrReplaceTempView`)

  * Session-specific
  * Removed when session ends

* **Global Temporary View** (`createGlobalTempView`)

  * Accessible across sessions
  * Stored in `global_temp` database

```python
df.createGlobalTempView("global_sales")
spark.sql("SELECT * FROM global_temp.global_sales").show()
```

Useful for **shared datasets in multi-user environments**.

---

## 4. Combining DataFrame API and SQL

You can mix **DataFrame operations** and SQL seamlessly:

```python
# DataFrame transformation
filtered_df = df.filter(df.amount > 100)

# Register temp view
filtered_df.createOrReplaceTempView("high_sales")

# SQL query
result_df = spark.sql("""
    SELECT customer_id, SUM(amount) AS total_amount
    FROM high_sales
    GROUP BY customer_id
    HAVING total_amount > 500
""")
result_df.show()
```

This allows flexibility for **engineers and analysts to collaborate**.

---

## Summary

* Spark SQL allows querying DataFrames using **familiar SQL syntax**
* Temporary views (`createOrReplaceTempView`) bridge **DataFrames and SQL queries**
* Global views are **shareable across sessions**
* You can **combine SQL and DataFrame API** for flexible pipelines

Spark SQL is a powerful tool for teams transitioning from **traditional SQL workflows** to **big data analytics**.

---

Next, we’ll explore **Complex SQL Queries in PySpark**, including joins, subqueries, window functions, and aggregations.

