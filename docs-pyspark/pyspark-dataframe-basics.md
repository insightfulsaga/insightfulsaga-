---
id: "pyspark-dataframe-basics"
title: "PySpark DataFrame Basics (Part 1) — Complete Beginner Guide"
sidebar_label: "DataFrame Basics - Part 1"
slug: "/pyspark/dataframe-basics"
description: "Learn the fundamentals of PySpark DataFrames including creation, schema inspection, show(), describe(), and column operations. Perfect for beginners starting with distributed data processing."
keywords:
  - "pyspark dataframe"
  - "pyspark dataframe basics"
  - "spark dataframe tutorial"
  - "pyspark schema"
  - "spark show printschema"
  - "pyspark beginner guide"
  - "spark create dataframe"
og:title: "PySpark DataFrame Basics — Beginner Friendly Guide (Part 1)"
og:description: "A complete introduction to PySpark DataFrames covering SparkSession, creating DataFrames, using show(), schema, describe(), and key operations for beginners."
tags:
  - "PySpark"
  - "DataFrames"
  - "Big Data"
  - "ETL"
  - "Beginner"
---

# PySpark DataFrame Basics — Part 1  
A beginner-friendly introduction to **Spark DataFrames**, how they work, and how to perform essential operations.

---

# 🔍 What Is a DataFrame in PySpark?

Imagine you're at a startup analyzing huge customer datasets — millions of records across multiple files and machines.

Excel can’t handle it.  
Pandas will run out of memory.  
But PySpark can — using **DataFrames**.

A **PySpark DataFrame** is:

✅ Like a table in a SQL database  
✅ Distributed across a cluster  
✅ Queryable using Python  
✅ Optimized for massive-scale analytics  

Each DataFrame contains:

- **Rows →** individual records  
- **Columns →** specific fields such as `name`, `age`, `email`  

It behaves like Pandas, but is built for **big data**.

---

# Step-by-Step Guide to Basic DataFrame Operations

---

# 1. Importing SparkSession

```python
from pyspark.sql import SparkSession
````

### ✔️ What This Means

`SparkSession` is the entry point to using DataFrames, SQL, and the entire Spark engine.

---

# 2. Creating a Spark Session

```python
spark = SparkSession.builder.appName('Basics').getOrCreate()
```

### ✔️ Explanation

* `.builder` → starts the SparkSession builder
* `.appName('Basics')` → names your application
* `.getOrCreate()` →

  * returns an existing session **OR**
  * creates a new one

Think of this as **turning on** the Spark engine.

---

# 3. Creating Sample Data

```python
data = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
]

df = spark.createDataFrame(data)
```

### ✔️ What’s happening?

* Python list of dictionaries = **rows**
* Keys = **columns**
* `createDataFrame()` converts Python data → Spark DataFrame

---

# 4. Displaying the DataFrame

```python
df.show()
```

**Output:**

```text
+-------+---+
|   name|age|
+-------+---+
|  Alice| 30|
|    Bob| 25|
|Charlie| 35|
+-------+---+
```

### ✔️ What It Does

`show()` prints the DataFrame in a clean, table-like format.

---

# 5. Inspecting the Schema

```python
df.printSchema()
```

**Output:**

```text
root
 |-- name: string (nullable = true)
 |-- age: long (nullable = true)
```

### ✔️ Why This Is Important

Schema shows:

* Column names
* Data types (`string`, `long`, `double`, etc.)
* Nullable or required values

Great for debugging and data validation.

---

# 6. Getting Column Names

```python
df.columns
```

**Output example:**

```python
['name', 'age']
```

### ✔️ Use Case

Helpful when dynamically selecting, renaming, or transforming columns.

---

# 7. Quick Statistical Summary

```python
df.describe().show()
```

**Output:**

```text
+-------+-------+----+
|summary|   name| age|
+-------+-------+----+
|  count|      3|   3|
|   mean|   null|30.0|
| stddev|   null| 5.0|
|    min|  Alice|  25|
|    max|Charlie|  35|
+-------+-------+----+
```

### ✔️ What This Tells You

* `count` → number of rows
* `mean` → average value
* `stddev` → variation
* `min`, `max` → smallest/largest value

This is extremely useful for quick EDA (Exploratory Data Analysis).

---

# 🔑 1-Minute Summary (Cheat Sheet)

| Code                                   | Purpose                     |
| -------------------------------------- | --------------------------- |
| `from pyspark.sql import SparkSession` | Import SparkSession         |
| `SparkSession.builder...getOrCreate()` | Initialize Spark            |
| `spark.createDataFrame(data)`          | Create a DataFrame          |
| `df.show()`                            | Display data                |
| `df.printSchema()`                     | Show structure & data types |
| `df.columns`                           | Get list of column names    |
| `df.describe().show()`                 | Statistical summary         |

---

