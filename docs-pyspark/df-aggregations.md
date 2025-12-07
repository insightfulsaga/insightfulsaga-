---
id: df-aggregations
title: Aggregations & GroupBy — Sum, Count, Avg, Max & Min
sidebar_label: Aggregations & GroupBy
description: Learn how to perform aggregations in PySpark using groupBy, sum, count, average, max, and min functions with practical Databricks examples.
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

# Aggregations & GroupBy — Sum, Count, Avg, Max & Min

At **NeoMart**, raw data is generated every second — orders, clicks, sessions, and product interactions.  
To make sense of billions of rows, analysts need **aggregated insights**: total revenue, number of orders, average cart value, highest-selling products.

This is where **groupBy()** and **aggregations** in PySpark become essential.

---

## Why Aggregations Matter

Aggregations help you:

- Summarize large datasets efficiently  
- Generate key metrics for dashboards  
- Provide input for machine learning  
- Analyze trends across categories, regions, or time  

Without aggregation, data remains just a **massive raw table**.

---

## 1. Basic Aggregations with groupBy

The `groupBy()` method allows you to group rows by one or more columns and apply aggregate functions.

### Example — Total revenue by category

```python
from pyspark.sql.functions import sum, avg, count, max, min

df.groupBy("category").agg(
    sum("revenue").alias("total_revenue"),
    avg("revenue").alias("avg_revenue"),
    count("*").alias("total_orders")
).show()
```

### Story Example

NeoMart wants **daily sales metrics by category**:

* Electronics: $1M total revenue, 5,000 orders
* Clothing: $500K total revenue, 3,200 orders

Aggregation converts raw transactions into actionable metrics.

---

## 2. Quick Aggregation Functions

| Function  | Example           | Description               |
| --------- | ----------------- | ------------------------- |
| `sum()`   | `sum("sales")`    | Total of a numeric column |
| `avg()`   | `avg("price")`    | Average value             |
| `count()` | `count("*")`      | Count of rows             |
| `max()`   | `max("revenue")`  | Maximum value             |
| `min()`   | `min("discount")` | Minimum value             |

### Example — Product-level statistics

```python
df.groupBy("product_id").agg(
    max("price").alias("max_price"),
    min("price").alias("min_price"),
    avg("price").alias("avg_price")
).show()
```

---

## 3. Aggregation with Multiple Columns

You can group by multiple columns to analyze intersections:

```python
df.groupBy("category", "region").agg(
    sum("revenue").alias("total_revenue"),
    count("*").alias("orders_count")
).show()
```

### Story Example

NeoMart wants revenue by **category and region** to plan inventory and marketing campaigns.

---

## 4. Using SQL for Aggregations (Optional)

PySpark allows SQL-style aggregation:

```python
df.createOrReplaceTempView("sales")
spark.sql("""
    SELECT category, SUM(revenue) AS total_revenue, COUNT(*) AS orders
    FROM sales
    GROUP BY category
""").show()
```

This is useful for analysts comfortable with SQL syntax.

---

## Summary

Aggregations transform **raw, row-level data** into **business insights**:

* `groupBy()` + `agg()` is the foundation
* Functions like **sum, count, avg, max, min** generate metrics
* Multi-column grouping allows fine-grained analysis
* SQL syntax provides flexibility for analysts

In short, aggregation is **where raw Spark tables turn into intelligence** for dashboards, ML, and reporting.

---

Next, we’ll explore **Window Functions in PySpark DataFrames**, enabling running totals, rankings, and time-based calculations.

`
