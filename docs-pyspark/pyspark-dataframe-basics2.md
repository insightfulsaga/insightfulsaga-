---
id: "pyspark-dataframe-basics2"
title: "PySpark DataFrame Basics (Part 2) — Custom Schemas, Column Ops & SQL"
sidebar_label: "DataFrame Basics - Part 2"
slug: "/pyspark/dataframe-basics-2"
description: "Learn how to define custom schemas, select columns, add new columns, rename columns, inspect types, and run SQL queries on PySpark DataFrames."
keywords:
  - "pyspark dataframe basics"
  - "pyspark custom schema"
  - "spark structtype structfield"
  - "pyspark select columns"
  - "pyspark withcolumn"
  - "pyspark sql temp view"
og:title: "PySpark DataFrame Basics (Part 2) — Custom Schemas, Column Operations, and SQL"
og:description: "A beginner-friendly guide covering custom schemas, selecting columns, creating new columns, renaming fields, and running SQL queries in PySpark."
tags:
  - "PySpark"
  - "DataFrames"
  - "Big Data"
  - "ETL"
  - "SQL"
---


# PySpark DataFrame Basics — Part 2  
This guide continues from **Part 1** and focuses on defining custom schemas, selecting columns, transforming data, and querying DataFrames using SQL.

---

# 1. Defining a Custom Schema

By default, Spark **infers** a schema based on your data.  
But when you want strict control over column data types or nullability, you define a **custom schema**.

---

## Import Required Types

```python
from pyspark.sql import SparkSession
from pyspark.sql.types import StructField, StringType, IntegerType, StructType
````

### ✔️ What These Imports Mean

| Code                          | What It Does                               | Why It's Needed                          |
| ----------------------------- | ------------------------------------------ | ---------------------------------------- |
| `StructField()`               | Defines a column (name, type, nullability) | Guarantees consistent schema rules       |
| `StringType(), IntegerType()` | Data types for each column                 | Prevents Spark from guessing incorrectly |
| `StructType()`                | Holds multiple StructFields                | Builds the full schema                   |
| SQL types module              | Provides full control                      | Ensures data correctness & validation    |

---

# 2. Creating Schema Fields

```python
data_schema = [
    StructField('age', IntegerType(), True),
    StructField('name', StringType(), True)
]
```

### ✔️ Explanation

| Code                                      | What It Does             | Why It's Needed                                 |
| ----------------------------------------- | ------------------------ | ----------------------------------------------- |
| `StructField('age', IntegerType(), True)` | Defines `age` as integer | Prevents Spark from treating numbers as strings |
| `StructField('name', StringType(), True)` | Defines `name` as string | Ensures proper text type                        |
| `data_schema`                             | List of fields           | Input to final StructType                       |

---

# 3. Building the Final Schema

```python
final_struc = StructType(fields=data_schema)
```

### ✔️ Why This Matters

This wraps all fields into a complete schema object that Spark can apply when constructing the DataFrame.

---

# 4. Raw Data

```python
data = [
    (30, "Alice"),
    (25, "Bob"),
    (35, "Charlie")
]
```

### ✔️ Meaning

A list of tuples representing rows before converting them into a DataFrame.

---

# 5. Creating a DataFrame with the Custom Schema

```python
df = spark.createDataFrame(data=data, schema=final_struc)
```

### ✔️ Why This Is Important

Spark now **must** respect the defined schema—no guessing or incorrect inference.

---

# 6. Inspecting the Schema

```python
df.printSchema()
```

**Output**

```text
root
 |-- age: integer (nullable = true)
 |-- name: string (nullable = true)
```

### ✔️ Why Use This?

To verify your schema is applied exactly as intended.

---

# 7. Showing the Data

```python
df.show()
```

**Output**

```text
+---+-------+
|age|   name|
+---+-------+
| 30|  Alice|
| 25|    Bob|
| 35|Charlie|
+---+-------+
```

---

# 8. Accessing a Column Object

```python
type(df['age'])
```

**Output**

```text
<class 'pyspark.sql.column.Column'>
```

### ✔️ Why It Matters

Confirms that `df['age']` is a **Column object**, not actual data—important for expressions and transformations.

---

# 9. Selecting a Single Column

```python
df.select('age').show()
```

**Output**

```text
+---+
|age|
+---+
| 30|
| 25|
| 35|
+---+
```

---

# 10. Selecting Multiple Columns (Two Ways)

```python
df.select('age', 'name').show()

# Alternative
df.select(['age', 'name']).show()
```

### ✔️ Why Use This?

Useful when you only need specific fields for analysis or debugging.

---

# 11. Getting the First N Rows

```python
df.head(2)
```

**Output**

```python
[Row(age=30, name='Alice'), Row(age=25, name='Bob')]
```

---

# 12. Adding a New Column

```python
df.withColumn('double_age', df['age'] * 2).show()
```

**Output**

```text
+---+-------+-----------+
|age|   name|double_age |
+---+-------+-----------+
| 30|  Alice|        60 |
| 25|    Bob|        50 |
| 35|Charlie|        70 |
+---+-------+-----------+
```

### ✔️ Why Use This?

Allows calculated/derived metrics (ETL, analytics, modeling, etc.).

---

# 13. Renaming a Column

```python
df.withColumnRenamed('age', 'new_age_renamed').show()
```

**Output**

```text
+---------------+-------+
|new_age_renamed|   name|
+---------------+-------+
|             30|  Alice|
|             25|    Bob|
|             35|Charlie|
+---------------+-------+
```

---

# 14. Registering a Temporary SQL View

```python
df.createOrReplaceTempView('people')
```

### ✔️ Why Use This?

Lets you run **pure SQL queries** directly on the DataFrame.

---

# 15. SQL Query: Select All

```python
results = spark.sql("SELECT * FROM people")
results.show()
```

**Output**

```text
+---+-------+
|age|   name|
+---+-------+
| 30|  Alice|
| 25|    Bob|
| 35|Charlie|
+---+-------+
```

---

# 16. SQL Query with WHERE Clause

```python
results = spark.sql("SELECT age FROM people WHERE name = 'Andy'")
results.show()
```

**Output**

```text
+---+
|age|
+---+
|   |
+---+
```

Andy doesn’t exist in this dataset → empty result.

---

# 🔑 1-Minute Summary

| Code                                     | Purpose                                   |
| ---------------------------------------- | ----------------------------------------- |
| `StructField()`                          | Defines column schema (type, nullability) |
| `StructType()`                           | Builds full schema                        |
| `spark.createDataFrame(..., schema=...)` | Creates DataFrame with strict schema      |
| `df.select()`                            | Select one or many columns                |
| `df.head(n)`                             | Returns first *n* rows                    |
| `df.withColumn()`                        | Adds calculated/derived column            |
| `df.withColumnRenamed()`                 | Renames a column                          |
| `df.createOrReplaceTempView()`           | Register DF as SQL table                  |
| `spark.sql()`                            | Query DataFrame using SQL                 |

---


