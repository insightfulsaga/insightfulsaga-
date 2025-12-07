---
id: udfs-udafs
title: UDFs & UDAFs — Custom Functions in SQL
sidebar_label: UDFs & UDAFs
description: Learn how to create and use PySpark UDFs (User Defined Functions) and UDAFs (User Defined Aggregate Functions) to implement custom logic and aggregations in Spark SQL and DataFrames.
keywords:
  - PySpark UDF
  - PySpark UDAF
  - custom functions Spark SQL
  - Databricks user-defined functions
  - Spark SQL custom aggregation
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

# UDFs & UDAFs — Custom Functions in SQL

At **NeoMart**, sometimes built-in Spark functions aren’t enough:  

- Categorize products dynamically based on complex rules  
- Compute custom loyalty scores for customers  
- Aggregate unusual metrics not supported by default  

This is where **User Defined Functions (UDFs)** and **User Defined Aggregate Functions (UDAFs)** come in.  
They allow you to implement **custom logic** in PySpark SQL or DataFrame pipelines.

---

## Why UDFs & UDAFs Matter

- Extend PySpark with **custom Python logic**  
- Support **non-standard computations** in SQL and DataFrames  
- Enable **complex business rules and analytics**  
- Provide flexibility beyond built-in Spark functions  

UDFs operate **row by row**, while UDAFs operate **over groups/aggregations**.

---

## 1. User Defined Functions (UDFs)

UDFs allow custom transformations for each row.

```python
from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

# Example: categorize products based on price
def price_category(price):
    if price > 1000:
        return "Premium"
    elif price > 500:
        return "Mid-range"
    else:
        return "Budget"

price_category_udf = udf(price_category, StringType())

df.withColumn("category", price_category_udf(df.price)).show()
```

### Story Example

NeoMart tags each product with **Premium, Mid-range, or Budget** for reporting and marketing campaigns.

---

## 2. Using UDFs in Spark SQL

```python
df.createOrReplaceTempView("products")
spark.udf.register("price_category_sql", price_category, StringType())

spark.sql("""
    SELECT product_id, price, price_category_sql(price) AS category
    FROM products
""").show()
```

UDFs work seamlessly in SQL queries for **analyst-friendly pipelines**.

---

## 3. User Defined Aggregate Functions (UDAFs)

UDAFs allow custom aggregation logic.

```python
from pyspark.sql.expressions import UserDefinedAggregateFunction
from pyspark.sql.types import StructType, StructField, DoubleType, LongType
from pyspark.sql.types import StringType
from pyspark.sql import Row
from pyspark.sql.functions import col

# Example: custom average function
class MyAverage(UserDefinedAggregateFunction):
    # Define input, buffer, and output types here...
    # Implementation skipped for brevity
    pass
```

### Use Cases

* Custom scoring or ranking
* Weighted averages
* Aggregations not natively supported by Spark

UDAFs are applied **over groups**, just like `groupBy().agg()`.

---

## 4. Tips for Using UDFs & UDAFs

* **Prefer built-in Spark functions** for performance
* UDFs can be **slower** because they break Catalyst optimizations
* Use **vectorized UDFs (pandas_udf)** for large datasets
* Register functions to make them available in **SQL and DataFrames**

---

## Summary

* **UDFs** → row-level custom transformations
* **UDAFs** → group-level custom aggregations
* Both allow **custom business logic** in PySpark pipelines
* Use carefully: built-in functions are faster, but UDFs/UDAFs provide unmatched **flexibility**

Mastering UDFs and UDAFs enables NeoMart (and you!) to handle **unique business rules** at scale.

---

Next, we’ll explore **Performance Comparison — DataFrame API vs Spark SQL**, showing which approach is faster and when to use each.

