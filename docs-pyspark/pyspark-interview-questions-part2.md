---
id: pyspark-interview-questions-part2
title: Essential PySpark Interview Question & Answer(Explained Through Real-World Stories) – Part 2
description: Learn key PySpark interview questions and answers covering SparkSession, DataFrames, RDDs, and more. Includes code examples and comparisons with Pandas.
sidebar_label: PySpark Interview Q&A(Story-Based) - 2
tags:
    - pyspark-intro
    - pyspark dataframe basics
    - pyspark dataframe basics2
    - pyspark filtering
    - pyspark aggregation
    - pyspark missing
    - pyspark dates
    - pyspark joins
    - pyspark one liners
    - linear regression model
    - linear regression math
    - house price linear regression
    - logistic regression model
    - logistic regression query
    - logistic regression mini project
    - pyspark-interview-questions-part1
keywords:
    - pyspark-intro
    - pyspark dataframe basics
    - pyspark dataframe basics2
    - pyspark filtering
    - pyspark aggregation
    - pyspark missing
    - pyspark dates
    - pyspark joins
    - pyspark one liners
    - linear regression model
    - linear regression math
    - house price linear regression
    - logistic regression model
    - logistic regression query
    - logistic regression mini project
    - pyspark-interview-questions-part1
sidebar_position: 2
---

## **6. What are the different file formats PySpark supports?**

PySpark supports many file formats to read and write data easily.
Some of the most common ones are:

1. **CSV (Comma-Separated Values):**
   Text files where each line represents a row of data, and values are separated by commas.
   Example: `data.csv`

2. **JSON (JavaScript Object Notation):**
   Data is stored as key-value pairs. Very useful for structured and semi-structured data.
   Example: `data.json`

3. **Parquet:**
   A column-based storage format that is very fast and efficient. Commonly used in big data projects.
   Example: `data.parquet`

4. **ORC (Optimized Row Columnar):**
   Another efficient columnar format used mostly with Hive.
   Example: `data.orc`

5. **Avro:**
   A binary format often used for data exchange between systems.
   Example: `data.avro`

6. **Text Files:**
   Simple files containing plain text data.
   Example: `data.txt`

---

## **7. How do you read a CSV file into a PySpark DataFrame?**

To read a CSV file in PySpark, we use the `read` method of the `SparkSession` object.
Here’s how you can do it:

```python
from pyspark.sql import SparkSession

# Create Spark session
spark = SparkSession.builder.appName("ReadCSVExample").getOrCreate()

# Read CSV file
df = spark.read.csv("data.csv", header=True, inferSchema=True)

# Show data
df.show()
```

**Explanation:**

* `header=True` means the first line of the file contains column names.
* `inferSchema=True` tells PySpark to automatically detect the data types (like integer, string, etc.).

---

## **8. How do you write a DataFrame to a Parquet file?**

Writing a DataFrame to a Parquet file is simple and efficient in PySpark:

```python
df.write.parquet("output_data.parquet")
```

**Explanation:**

* The above command saves your DataFrame in Parquet format.
* Parquet files are faster to read and take up less storage compared to CSV files.
* You can also use options like `mode("overwrite")` to replace existing files.

Example:

```python
df.write.mode("overwrite").parquet("output_data.parquet")
```

---

## **9. What are the common DataFrame transformations?**

Transformations are operations that create a **new DataFrame** from an existing one — without changing the original data.

Some common transformations are:

| Transformation         | Description                      | Example                                   |
| ---------------------- | -------------------------------- | ----------------------------------------- |
| **select()**           | Select specific columns          | `df.select("name", "age")`                |
| **filter() / where()** | Filter rows based on a condition | `df.filter(df.age > 18)`                  |
| **groupBy()**          | Group data for aggregation       | `df.groupBy("city").count()`              |
| **withColumn()**       | Add or modify a column           | `df.withColumn("age_plus_1", df.age + 1)` |
| **drop()**             | Remove a column                  | `df.drop("address")`                      |
| **orderBy()**          | Sort data                        | `df.orderBy("age")`                       |

**Note:**
Transformations are **lazy**, meaning they don’t run immediately — they wait until an **action** is performed.

---

## **10. What are actions in PySpark? Give examples.**

**Actions** are operations that trigger the actual execution of transformations and return a result.

Some common actions are:

| Action               | Description                      | Example                      |
| -------------------- | -------------------------------- | ---------------------------- |
| **show()**           | Displays the DataFrame content   | `df.show()`                  |
| **collect()**        | Returns all rows as a list       | `df.collect()`               |
| **count()**          | Returns the number of rows       | `df.count()`                 |
| **first() / head()** | Returns the first row(s)         | `df.first()`                 |
| **take(n)**          | Returns the first `n` rows       | `df.take(5)`                 |
| **write()**          | Saves data to a file or database | `df.write.csv("output.csv")` |

**In simple words:**
Transformations prepare the data, while actions actually **do the work** (like displaying or saving results).


## **11. How do you show the top N rows of a DataFrame?**

To display the top **N** rows of a PySpark DataFrame, use the `show()` function and specify the number of rows you want to see.

```python
df.show(5)
```

**Explanation:**

* This command displays the **first 5 rows** of the DataFrame in a readable table format.
* If no number is given, PySpark shows **20 rows by default**.


## **12. How do you select specific columns from a DataFrame?**

To pick specific columns from a DataFrame, use the `select()` function.

```python
df_selected = df.select("name", "age")
df_selected.show()
```

**Explanation:**

* This creates a new DataFrame with only the columns **“name”** and **“age”**.
* The original DataFrame stays unchanged since PySpark transformations are **immutable**.

---

## **13. How do you rename a column in PySpark?**

To rename a column, use the `withColumnRenamed()` function.

```python
df_renamed = df.withColumnRenamed("oldName", "newName")
df_renamed.show()
```

**Explanation:**

* The column **“oldName”** is renamed to **“newName”**.
* This does not change the original DataFrame — it returns a new one.

---

## **14. How do you drop columns from a DataFrame?**

You can remove columns using the `drop()` function.

```python
df_dropped = df.drop("address")
df_dropped.show()
```

**Explanation:**

* The **“address”** column is removed from the DataFrame.
* To drop multiple columns at once:

```python
df_dropped = df.drop("address", "phone_number")
```

---

## **15. What is the difference between `filter` and `where`?**

Both `filter()` and `where()` are used to select rows based on conditions.
They work **exactly the same way** — the only difference is in the function name.

**Example using `filter()`:**

```python
df.filter(df.age > 18).show()
```

**Example using `where()`:**

```python
df.where(df.age > 18).show()
```

**Explanation:**

* Both commands show rows where **age > 18**.
* They are **interchangeable**, so you can use either one depending on your preference.

