---
id: "df-joins"
title: "Joins in PySpark DataFrames (Full Beginner Guide)"
sidebar_label: "DataFrame Joins"
slug: "/pyspark/joins"
description: "Learn all types of joins in PySpark DataFrames — inner, left, right, outer, semi, anti, and cross join with clear examples, code, and explanations."
keywords:
  - "PySpark joins"
  - "PySpark DataFrame join"
  - "inner join PySpark"
  - "left join PySpark"
  - "outer join PySpark"
  - "semi join PySpark"
  - "anti join PySpark"
  - "cross join PySpark"
  - "PySpark tutorial"
og:title: "Joins in PySpark DataFrames — Complete Guide with Examples"
og:description: "A complete step-by-step guide on all PySpark DataFrame joins: inner, left, right, full outer, semi, anti, and cross join with code examples."
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

# Joins in PySpark DataFrames

Joins are one of the most common operations when working with data.  
In PySpark, joins let you combine DataFrames based on matching keys — while taking advantage of Spark’s distributed computing engine.

This guide covers **all join types in PySpark**, including:  
- Inner Join  
- Left Join  
- Right Join  
- Full Outer Join  
- Left Semi Join  
- Left Anti Join  
- Cross Join  

Each join comes with a clean explanation, Python code, and output.

---

## Load Example Datasets

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('joins').getOrCreate()

# Authors dataset
authors = [(1, "John Smith"),
           (2, "Jane Doe"),
           (3, "Alex Lee"),
           (4, "Anna Ray")]

df_authors = spark.createDataFrame(authors, ["AuthorID", "Author"])

# Books dataset
books = [(1, "Deep Learning"),
         (2, "AI Ethics"),
         (5, "Data Science")]

df_books = spark.createDataFrame(books, ["AuthorID", "Book"])
````

---

# 1. Inner Join

```python
df_authors.join(df_books, on="AuthorID", how="inner").show()
```

### 📌 When to Use:

Use **inner join** when you only need rows that exist in *both* DataFrames.
Example: authors who actually wrote a book.

### ✅ Result

| AuthorID | Author     | Book          |
| -------- | ---------- | ------------- |
| 1        | John Smith | Deep Learning |
| 2        | Jane Doe   | AI Ethics     |

---

# 2. Left Join (Left Outer Join)

```python
df_authors.join(df_books, on="AuthorID", how="left").show()
```

### 📌 When to Use:

Use when you want **all authors**, even if they don’t have a book.

### ✅ Result

| AuthorID | Author     | Book          |
| -------- | ---------- | ------------- |
| 1        | John Smith | Deep Learning |
| 2        | Jane Doe   | AI Ethics     |
| 3        | Alex Lee   | null          |
| 4        | Anna Ray   | null          |

---

# 3. Right Join (Right Outer Join)

```python
df_authors.join(df_books, on="AuthorID", how="right").show()
```

### 📌 When to Use:

Use when you want **all books**, even if no author matches.

### ✅ Result

| AuthorID | Author     | Book          |
| -------- | ---------- | ------------- |
| 1        | John Smith | Deep Learning |
| 2        | Jane Doe   | AI Ethics     |
| 5        | null       | Data Science  |

---

# 4. Full Outer Join

```python
df_authors.join(df_books, on="AuthorID", how="outer").show()
```

### 📌 When to Use:

Use this join when you want **all records from both sides**, matched where possible.

### ✅ Result

| AuthorID | Author     | Book          |
| -------- | ---------- | ------------- |
| 1        | John Smith | Deep Learning |
| 2        | Jane Doe   | AI Ethics     |
| 3        | Alex Lee   | null          |
| 4        | Anna Ray   | null          |
| 5        | null       | Data Science  |

---

# 5. Left Semi Join

```python
df_authors.join(df_books, on="AuthorID", how="left_semi").show()
```

### 📌 When to Use:

Use **left semi join** when you only need rows from the left DataFrame that **have a match** in the right.

> Note: You only get left columns — right DataFrame columns are removed.

### Example:

Find authors who **have written a book**.

### ✅ Result

| AuthorID | Author     |
| -------- | ---------- |
| 1        | John Smith |
| 2        | Jane Doe   |

---

# 6. Left Anti Join

```python
df_authors.join(df_books, on="AuthorID", how="left_anti").show()
```

### 📌 When to Use:

Use when you want rows from the left DataFrame that **do NOT** exist in the right.

### Example:

Find authors **without** any published book.

### ✅ Result

| AuthorID | Author   |
| -------- | -------- |
| 3        | Alex Lee |
| 4        | Anna Ray |

---

# 7. Cross Join (Cartesian Product)

```python
df_authors.crossJoin(df_books).show()
```

### 📌 When to Use:

Use **only in special cases**, such as generating combinations for recommendations or testing.

⚠️ Warning:
Cross join produces **all combinations**, which can explode to millions of rows.

### Example Result (Truncated)

| AuthorID | Author     | AuthorID | Book          |
| -------- | ---------- | -------- | ------------- |
| 1        | John Smith | 1        | Deep Learning |
| 1        | John Smith | 2        | AI Ethics     |
| 1        | John Smith | 5        | Data Science  |
| ...      | ...        | ...      | ...           |

---

# 🔑 1-Minute Summary — PySpark Joins

| Join Type       | What It Does                                   |
| --------------- | ---------------------------------------------- |
| **inner**       | Only matching rows from both sides             |
| **left**        | All left rows + matching right rows            |
| **right**       | All right rows + matching left rows            |
| **outer**       | Keep every row from both sides                 |
| **left_semi**   | Left rows that **have** matches in right       |
| **left_anti**   | Left rows that **don’t have** matches in right |
| **crossJoin()** | All combinations (use carefully)               |

Next, we’ll explore Window Functions in PySpark DataFrames, enabling running totals, rankings, and time-based calculations.
