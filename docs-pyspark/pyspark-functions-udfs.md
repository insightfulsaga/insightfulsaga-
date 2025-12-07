---
id: "pyspark-functions-udfs"
title: "PySpark Functions & UDFs — Complete Beginner Guide"
sidebar_label: "Functions & UDFs"
slug: "/pyspark/functions-udfs"
description: "Learn how to use PySpark built-in functions, User Defined Functions (UDFs), and Pandas UDFs for efficient data transformations. Step-by-step examples and best practices for beginners."
keywords:
  - "pyspark functions"
  - "pyspark udfs"
  - "pyspark pandas udf"
  - "spark dataframe functions"
  - "pyspark custom transformations"
  - "spark udf example"
  - "pyspark beginner guide"
og:title: "PySpark Functions & UDFs — Beginner-Friendly Guide"
og:description: "Master PySpark Functions, UDFs, and Pandas UDFs. Learn how to apply built-in functions, write custom logic, and optimize transformations on large datasets."
tags:
  - "PySpark"
  - "DataFrames"
  - "Functions"
  - "UDFs"
  - "Pandas UDFs"
  - "ETL"
  - "Beginner"
---

# PySpark Functions & UDFs — Complete Beginner Guide

Imagine running a **high-tech data lab** where data comes from CSVs, APIs, streaming sensors, and cloud buckets. Sometimes, PySpark’s built-in functions are enough. Other times, you need **custom Python logic** for special cases.  

In PySpark, these custom transformations are handled with **Functions, User Defined Functions (UDFs), and Pandas UDFs**, allowing you to combine **Spark’s distributed computing power** with **Python flexibility**.

---

## Why Use Functions & UDFs in PySpark?

PySpark DataFrames are powerful but **cannot solve every problem out-of-the-box**. Functions and UDFs allow you to:

* Perform **data transformations at scale** on millions of rows
* Write **clean, reusable Python code**
* Combine **built-in optimization** with **custom logic** for complex transformations

Think of it this way:

* **Built-in functions:** Fast, optimized, Spark-native
* **UDFs:** Row-wise custom Python logic
* **Pandas UDFs:** High-performance, batch-friendly transformations

---

## 1️⃣ Using Built-In PySpark Functions

PySpark provides **hundreds of optimized built-in functions** for **string, numeric, date, and aggregation operations**. Always prefer these before writing UDFs—they’re faster and cluster-optimized.

### Common Built-In Functions

| Function                    | Purpose                        | Example                                            |
| --------------------------- | ------------------------------ | -------------------------------------------------- |
| `col()`                     | Reference a DataFrame column   | `col("amount")`                                    |
| `lit()`                     | Create a constant column       | `lit("USD")`                                       |
| `upper()`, `lower()`        | Convert text case              | `upper(col("region"))`                             |
| `concat()`                  | Combine multiple columns       | `concat(col("first"), col("last"))`                |
| `avg()`, `sum()`, `count()` | Aggregation functions          | `df.groupBy("region").avg("amount")`               |
| `when()`                    | Conditional column logic       | `when(col("amount")>1000,"High").otherwise("Low")` |

### Example: Applying Built-In Functions

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lit, upper, when, avg

spark = SparkSession.builder.appName("Built-in Functions").getOrCreate()

df = spark.read.csv("data/sales.csv", header=True, inferSchema=True)

df = df.withColumn("currency", lit("USD")) \
       .withColumn("region_upper", upper(col("region"))) \
       .withColumn("high_value", when(col("amount") > 1000, "Yes").otherwise("No"))

df.groupBy("region").agg(avg("amount").alias("avg_sales")).show()
````

💡 **Tip:** Always check if a **built-in function** can solve your problem before creating a UDF.

---

## 2️⃣ User Defined Functions (UDFs) in PySpark

When built-in functions are insufficient, use **UDFs** to implement **custom Python logic** that runs on Spark DataFrames.

### Example: Custom Discount Logic

```python
from pyspark.sql.functions import udf
from pyspark.sql.types import DoubleType

def discount(amount):
    return amount * 0.9 if amount > 1000 else amount

discount_udf = udf(discount, DoubleType())
df = df.withColumn("discounted_amount", discount_udf(col("amount")))
df.show(5)
```

**Explanation:**

1. Define a Python function (`discount`) for row-wise logic.
2. Wrap it as a PySpark UDF specifying the return type.
3. Apply it to a DataFrame column using `withColumn`.

💡 **Pro Tip:** Regular UDFs are **slower than built-in functions** due to Python-JVM serialization overhead.

---

## 3️⃣ Pandas UDFs (Vectorized UDFs)

**Pandas UDFs** use **batch processing** with Apache Arrow, making them **much faster than regular UDFs** for large datasets.

### Example: Batch Discount Using Pandas UDF

```python
from pyspark.sql.functions import pandas_udf
import pandas as pd

@pandas_udf("double")
def discount_pandas(amount: pd.Series) -> pd.Series:
    return amount.apply(lambda x: x * 0.9 if x > 1000 else x)

df = df.withColumn("discounted_batch", discount_pandas(col("amount")))
df.show(5)
```

💡 **Explanation:**

* Input: `pd.Series` (batch of rows)
* Output: `pd.Series` of transformed values
* Benefit: Reduces Python-JVM overhead for **large-scale transformations**

---

## 4️⃣ Real-World Example: Combining Functions & UDFs

```python
from pyspark.sql.functions import upper, col, udf, pandas_udf
from pyspark.sql.types import StringType
import pandas as pd

# Built-in function
df = df.withColumn("region_upper", upper(col("region")))

# Regular UDF
def premium_flag(amount):
    return "Premium" if amount > 2000 else "Standard"
premium_udf = udf(premium_flag, StringType())
df = df.withColumn("customer_type", premium_udf(col("amount")))

# Pandas UDF for batch discount
@pandas_udf("double")
def batch_discount(amount: pd.Series) -> pd.Series:
    return amount.apply(lambda x: x * 0.85 if x > 2000 else x)

df = df.withColumn("discounted_batch", batch_discount(col("amount")))
df.show()
```

💡 **Tip:** Rule of Thumb:

1. Prefer **built-in functions** first.
2. Use **Pandas UDFs** for batch processing.
3. Resort to **regular UDFs** only when necessary.

---

## 5️⃣ Key Takeaways for PySpark Functions & UDFs

* **Built-in functions:** Fast, optimized, Spark-native
* **UDFs:** Custom Python logic, slower, use sparingly
* **Pandas UDFs:** Vectorized, batch-friendly, ideal for large datasets
* **Best Practice:** Always attempt built-ins first, then Pandas UDFs, and finally regular UDFs if needed

**Use Cases:**

* Data cleaning & transformations
* Conditional business logic
* Feature engineering for ML
* Large-scale batch computations




