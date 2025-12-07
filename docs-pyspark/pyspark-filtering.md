---
id: "pyspark-filtering"
title: "Data Filtering in PySpark DataFrames (Complete Guide with Examples)"
sidebar_label: "Data Filtering"
slug: "/pyspark/filtering"
description: "Learn how to filter data in PySpark DataFrames using conditions, column expressions, multiple filters, and row extraction with examples and outputs."
keywords:
  - "PySpark filtering"
  - "PySpark DataFrame filter"
  - "filter in PySpark"
  - "PySpark select examples"
  - "PySpark conditions"
  - "big data filtering"
  - "PySpark tutorial"
og:title: "Data Filtering in PySpark DataFrames — Full Tutorial"
og:description: "Step-by-step guide on filtering data in PySpark using expressions, column objects, multiple conditions, and row extraction with real examples."
tags:
  - "PySpark"
  - "DataFrames"
  - "Filtering"
  - "Big Data"
---

# Data Filtering in PySpark DataFrames

Filtering is one of the most common and essential operations in PySpark.  
It helps you extract relevant subsets of data, apply conditions, perform transformations, and prepare clean datasets for analysis or downstream processing.

In this guide, you’ll learn **all major filtering techniques in PySpark**, along with examples, outputs, and explanations.


## Loading the Data

```python
from pyspark.sql import SparkSession

# Start Spark session
spark = SparkSession.builder.appName('ops').getOrCreate()

# Load the CSV with header and schema inference
df = spark.read.csv('/path/to/orders.csv', inferSchema=True, header=True)

```

### 📌 Why We Need This

Data must be loaded into a Spark DataFrame before we can apply filtering, transformations, analytics, or aggregations.


## Preview & Schema

```python
df.show()
```

### Example Output

```text
+--------+----------+-------------+--------+--------------+---------+----------+
|order_id|  product |   category  |quantity|price_per_unit|  status |total_cost|
+--------+----------+-------------+--------+--------------+---------+----------+
|   1001 |    Soap  |Personal Care|   10   |      15      |Delivered|    150   |
|   1002 |  Shampoo |Personal Care|    5   |      60      |Cancelled|    300   |
|   1003 |   Bread  |     Food    |   20   |      10      |Delivered|    200   |
|   1004 |Toothpaste|Personal Care|    7   |      25      | Pending |    175   |
|   1005 |   Rice   |     Food    |   50   |      40      |Delivered|   2000   |
|   1006 |Chocolate |     Food    |   30   |      20      | Pending |    600   |
|   1007 |   Juice  |  Beverages  |   15   |      30      |Delivered|    450   |
|   1008 |  Cereal  |     Food    |   10   |      35      |Delivered|    350   |
|   1009 |   Soda   |  Beverages  |   25   |      25      |Cancelled|    625   |
|   1010 | Facewash |Personal Care|    3   |     120      |Delivered|    360   |
+--------+----------+-------------+--------+--------------+---------+----------+
```

```python
df.printSchema()
```

### Schema Output

```text
root
 |-- order_id: integer (nullable = true)
 |-- product: string (nullable = true)
 |-- category: string (nullable = true)
 |-- quantity: integer (nullable = true)
 |-- price_per_unit: integer (nullable = true)
 |-- status: string (nullable = true)
 |-- total_cost: integer (nullable = true)
```

---

# Filtering Examples in PySpark

## 1. Filter Orders With `total_cost < 500`

```python
df.filter("total_cost < 500").show()
```

### 📌 Why We Need This

To analyze and work with only the lower-cost orders.

### Output

```text
+--------+----------+-------------+--------+--------------+---------+----------+
|order_id|  product |   category  |quantity|price_per_unit|  status |total_cost|
+--------+----------+-------------+--------+--------------+---------+----------+
|   1001 |    Soap  |Personal Care|   10   |      15      |Delivered|    150   |
|   1002 |  Shampoo |Personal Care|    5   |      60      |Cancelled|    300   |
|   1003 |   Bread  |     Food    |   20   |      10      |Delivered|    200   |
|   1004 |Toothpaste|Personal Care|    7   |      25      | Pending |    175   |
|   1007 |   Juice  |  Beverages  |   15   |      30      |Delivered|    450   |
|   1008 |  Cereal  |     Food    |   10   |      35      |Delivered|    350   |
|   1010 | Facewash |Personal Care|    3   |     120      |Delivered|    360   |
+--------+----------+-------------+--------+--------------+---------+----------+
```

---

## 2. Select Only Product and Cost (After Filtering)

```python
df.filter("total_cost < 500").select("product", "total_cost").show()
```

### 📌 Why We Need This

To extract specific columns after filtering.

```
+----------+----------+
| product  |total_cost|
+----------+----------+
|   Soap   |    150   |
| Shampoo  |    300   |
| Bread    |    200   |
|Toothpaste|    175   |
|  Juice   |    450   |
|  Cereal  |    350   |
| Facewash |    360   |
+----------+----------+
```

---

## 3. Select Using List Syntax

```python
df.filter("total_cost < 500").select(['product', 'total_cost']).show()
```

📌 Useful when you're dynamically passing a list of columns.

---

## 4. Filter Using Column Object Expressions

```python
df.filter(df['total_cost'] < 500).select(['product', 'category', 'quantity']).show()
```

### 📌 Why We Need This

Cleaner, safer approach than SQL strings — helps avoid errors in dynamic pipelines.

---

## 5. Filtering With Multiple Conditions (AND Logic)

```python
df.filter(
    (df['total_cost'] < 500) & (df['quantity'] > 10)
).show()
```

### 📌 Why We Need This

To apply compound filters using multiple conditions.

---

## 6. Filter Orders With Status = “Pending”

```python
df.filter(df['status'] == 'Pending').show()
```

### 📌 Why We Need This

To isolate pending orders for further processing or tracking.

---

## 7. Filter Orders Where Quantity = 10

```python
df.filter(df['quantity'] == 10).show()
```

### 📌 Why We Need This

To locate rows matching exact numeric values.



## 8. Extract Row Data Using `.collect()` and `.asDict()`

```python
result = df.filter(df['order_id'] == 1003).collect()
row = result[0]
row.asDict()
```

### Output

```text
{'order_id': 1003, 'product': 'Bread', 'category': 'Food', 
 'quantity': 20, 'price_per_unit': 10, 
 'status': 'Delivered', 'total_cost': 200}
```

Extract a specific field:

```python
row.asDict()['product']
```

Output:

```text
'Bread'
```

### 📌 Why We Need This

To convert Spark data into Python objects for custom logic, API calls, or downstream use.

---

# 🔑 1-Minute Summary — Data Filtering in PySpark

| Code Example                    | What It Does                   |                               |
| ------------------------------- | ------------------------------ | ----------------------------- |
| `df.filter("total_cost < 500")` | Filters rows by cost           |                               |
| `select("product")`             | Selects specific columns       |                               |
| `df['col'] < 500`               | Condition using column objects |                               |
| `&` and `                       | `                              | AND / OR filtering conditions |
| `df['status'] == 'Pending'`     | Filters by category/string     |                               |
| `.collect()`                    | Returns rows to Python list    |                               |
| `.asDict()`                     | Converts row to dictionary     |                               |
| `asDict()['product']`           | Access single field from row   |                               |

