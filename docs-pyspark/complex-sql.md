---
id: complex-sql
title: Complex SQL Queries in PySpark
sidebar_label: Complex SQL Queries
description: Learn how to write complex SQL queries in PySpark, including joins, subqueries, aggregations, and window functions for advanced analytics in Databricks.
keywords:
  - PySpark SQL complex queries
  - Spark joins subqueries
  - PySpark window functions SQL
  - Databricks SQL analytics
  - advanced SQL in Spark
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

# Complex SQL Queries in PySpark

At **NeoMart**, simple queries are no longer enough.  
Analysts and data engineers need **insightful answers** from massive datasets:  

- Top 3 products per category  
- Daily active users by region  
- Customers with multiple high-value orders  

This is where **complex SQL queries in PySpark** become indispensable.  
Spark SQL supports **joins, subqueries, aggregations, and window functions** at scale.

---

## Why Complex Queries Matter

- Combine multiple tables with **joins**  
- Perform **conditional aggregations**  
- Use **subqueries** for filtered or ranked results  
- Apply **window functions** to calculate running totals, rankings, or moving averages  

Without these, insights remain **partial or incomplete**.

---

## 1. Joins in SQL Queries

```sql
SELECT c.customer_id, c.name, SUM(o.amount) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
ORDER BY total_spent DESC
```

### Story Example

NeoMart wants **total spending per customer** to identify VIPs.
SQL allows combining **multiple tables in a single query**.

---

## 2. Subqueries

```sql
SELECT *
FROM orders
WHERE customer_id IN (
    SELECT customer_id
    FROM orders
    GROUP BY customer_id
    HAVING SUM(amount) > 500
)
```

### Use Case

* Find **high-value customers**
* Filter datasets based on **aggregated conditions**

Subqueries simplify **complex filtering logic** in a readable way.

---

## 3. Window Functions in SQL

```sql
SELECT customer_id, order_date, amount,
       SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total,
       ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rank
FROM orders
```

### Use Case

* Track **cumulative spending per customer**
* Rank **latest orders** for promotions
* Analyze trends **without reducing row-level data**

---

## 4. Combining Joins, Subqueries, and Window Functions

```sql
SELECT c.customer_id, c.name, o.order_id, o.amount,
       SUM(o.amount) OVER (PARTITION BY c.customer_id ORDER BY o.order_date) AS cumulative_amount
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.amount > 50
```

### Story Example

NeoMart wants a **detailed view of all customers’ orders above $50**, with **running totals** to reward loyal shoppers.

---

## 5. Tips for Writing Efficient Complex Queries

* Use **temp views** instead of repeatedly querying raw tables
* Avoid selecting **unnecessary columns** to reduce shuffle
* Prefer **filtering early** using `WHERE` clauses
* Use **broadcast joins** for small lookup tables

These practices improve **performance and reduce computation time** in Databricks.

---

## Summary

* Spark SQL supports **joins, subqueries, aggregations, and window functions** for advanced analytics
* Complex queries allow combining multiple datasets and performing **rich computations**
* Use **temp views and optimization techniques** for large-scale Spark workflows
* Mastering complex SQL queries bridges the gap between **traditional SQL analysts** and **big data engineers**

---

Next, we’ll dive into **UDFs & UDAFs — Custom Functions in SQL**, enabling custom logic and aggregations in Spark SQL.

