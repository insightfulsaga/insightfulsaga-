---
id: snowflake-sql-basics
title: SQL Basics in Snowflake — SELECT, FILTER, GROUP BY
sidebar_label: SQL Basics
description: A story-driven guide to learning SQL basics in Snowflake, covering SELECT, WHERE, FILTER, GROUP BY, and simple examples for modern data professionals.
keywords:
  - snowflake sql basics
  - snowflake select query
  - snowflake group by
  - snowflake filter data
  - sql tutorial snowflake
---

# SQL Basics in Snowflake — SELECT, FILTER, GROUP BY  
*A story-based introduction for modern Snowflake users*

Imagine Snowflake as a **giant data library**.  
Inside are millions of books (tables), shelves (schemas), and rooms (databases).  
SQL is your **magic spell** that helps you quickly **find, filter, and summarize the exact information** you need.

Let’s explore the essentials using simple, real-world examples.

---

## 📄 1. SELECT — Choosing Your Columns  

**SELECT** is like saying:  
*"I want to read these specific columns from my table."*

### Syntax
```sql
SELECT column1, column2
FROM schema.table;
````

### Example

```sql
SELECT first_name, last_name, email
FROM SALES_DB.CUSTOMERS;
```

**Story Example:**
You’re a store manager looking at **just customer names and emails** instead of the whole customer file. That’s SELECT.

---

## 🔍 2. WHERE — Filtering Rows

**WHERE** lets you filter only the rows you want.

### Syntax

```sql
SELECT column1, column2
FROM schema.table
WHERE condition;
```

### Example

```sql
SELECT first_name, last_name, total_purchase
FROM SALES_DB.CUSTOMERS
WHERE total_purchase > 500;
```

**Story Example:**
You want **VIP customers** only. WHERE is like a filter in your workflow — showing only the important people.

---

## 🎯 3. FILTER — Using Conditional Logic

FILTER works mostly with **aggregates** to refine calculations.

### Example

```sql
SELECT country, COUNT(*) AS total_customers
FROM SALES_DB.CUSTOMERS
GROUP BY country
HAVING COUNT(*) > 50;
```

* `HAVING` is like a filter **after grouping**.
* Only countries with **more than 50 customers** are displayed.

**Story Example:**
You’re summarizing sales per country but only want to show **active markets**, ignoring tiny countries.

---

## 🧮 4. GROUP BY — Summarizing Data

**GROUP BY** groups rows that have the same value in one or more columns.

### Syntax

```sql
SELECT column1, AGG_FUNCTION(column2)
FROM schema.table
GROUP BY column1;
```

### Example

```sql
SELECT country, SUM(total_purchase) AS total_sales
FROM SALES_DB.CUSTOMERS
GROUP BY country;
```

**Story Example:**
Think of it like **counting total sales per country**. GROUP BY helps you summarize big data into meaningful insights.

---

## ⚡ 5. Combining SELECT, WHERE, GROUP BY

You can combine all three for powerful insights.

### Example

```sql
SELECT country, COUNT(*) AS vip_customers, SUM(total_purchase) AS total_sales
FROM SALES_DB.CUSTOMERS
WHERE total_purchase > 500
GROUP BY country
ORDER BY total_sales DESC;
```

**Explanation:**

* WHERE → filters VIP customers
* GROUP BY → groups them by country
* SELECT → chooses the columns to show
* ORDER BY → ranks countries by total sales

**Story Example:**
You’re a regional manager checking **where your VIP customers are spending the most**. Done in one simple query.

---

## 📝 6. Tips for SQL in Snowflake

1. **Always start small:** Use `LIMIT 10` while testing queries.
2. **Use aliases:** Makes results easy to read.

   ```sql
   SELECT country AS region, SUM(total_purchase) AS revenue
   FROM SALES_DB.CUSTOMERS
   GROUP BY country;
   ```
3. **Use CTEs for clarity:** `WITH` clauses make complex queries readable.
4. **Use consistent naming:** Snowflake is case-insensitive by default, but best to be consistent.
5. **Preview before aggregating:** `SELECT * FROM table LIMIT 5` can save compute and time.

---

## 🎯 7. One-Sentence Summary

**SELECT chooses your columns, WHERE filters rows, GROUP BY summarizes, and FILTER/HAVING refines aggregates — these are the building blocks of SQL in Snowflake.**

---

# 🚀 Next Step

**Internal Stages, Table Stages, User Stages — Deep Explanation**


