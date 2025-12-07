---
id: pyspark-one-liners
title: One-Line PySpark Function Meanings
sidebar_label: Function Meanings
---

## 🧰 Basic utilities

| Function / Method                       | Meaning                                                          |
| --------------------------------------- | ---------------------------------------------------------------- |
| `from pyspark.sql.functions import ...` | Imports built-in functions from PySpark SQL module.              |
| `.select([...])`                        | Selects specific columns from the DataFrame.                     |
| `.show()` after any transformation      | Displays the result of the transformation for visual inspection. |

## 📦Data Loading & Preview

| Method / Parameter | Meaning                                             |
| ------------------ | --------------------------------------------------- |
| `inferSchema=True` | Automatically detects the data types of columns.    |
| `header=True`      | Treats the first row of the file as column headers. |
| `df.show()`        | Displays the first 20 rows of the DataFrame.        |
| `df.head(1)`       | Retrieves the first row as a list of Row objects.   |
| `df.printSchema()` | Displays the structure (schema) of the DataFrame.   |


## 📅Date Functions

| Function / Method                | Meaning                                                 |
| -------------------------------- | ------------------------------------------------------- |
| `dayofmonth(df['Date'])`         | Extracts the day (1–31) from a date.                    |
| `month(df['Date'])`              | Extracts the month (1–12) from a date.                  |
| `year(df['Date'])`               | Extracts the year (e.g., 2023) from a date.             |
| `weekofyear(df['Date'])`         | Extracts the week number of the year from a date.       |
| `date_format(df['Date'], 'MMM')` | Formats the date into a custom format (e.g., Jan, Feb). |


## 🧮 Aggregations & Metrics
| Function / Method                        | Meaning                                                     |
| ---------------------------------------- | ----------------------------------------------------------- |
| `withColumn('Year', year(df['Date']))`   | Creates a new column 'Year' derived from the 'Date' column. |
| `groupBy('Year')`                        | Groups the rows by 'Year' column.                           |
| `.mean()` or `.agg({'col':'mean'})`      | Computes average of one or more columns.                    |
| `.agg({'Sales':'sum'})`                  | Computes the total sum for the 'Sales' column.              |
| `.agg({'Volume':'max'})`                 | Finds the maximum value in the 'Volume' column.             |
| `round(mean(df['Close']), 2)`            | Computes the mean and rounds it to 2 decimal places.        |
| `max(df['Volume'])`, `min(df['Volume'])` | Gets maximum or minimum volume across all rows.             |
| `countDistinct(df['Sales'])`             | Counts unique (distinct) values in the 'Sales' column.      |


## 🧮 Column Math / Derived Columns
| Expression / Method                         | Meaning                                                      |
| ------------------------------------------- | ------------------------------------------------------------ |
| `(df['ForecastUnits'] / df['ActualUnits'])` | Creates a new column with ratio of forecast to actual units. |
| `.alias('Forecast_to_Actual')`              | Renames the resulting column to a readable name.             |


## 🧠 SQL Queries

| Function / Method                                  | Meaning                                           |
| -------------------------------------------------- | ------------------------------------------------- |
| `createOrReplaceTempView('table')`                 | Registers DataFrame as a temporary SQL table.     |
| `spark.sql('...')`                                 | Executes SQL query on registered temp table.      |
| `SELECT MAX(column) FROM table`                    | SQL syntax to find the maximum value in a column. |
| `WHERE ActualUnits = (SELECT MAX(ActualUnits)...)` | Filters rows that have the maximum actual units.  |


## 🧰🧠Utility & Optimization Methods
| Function / Method                             | One-Line Meaning                                                       |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| `distinct()`                                  | Removes duplicate rows from the DataFrame.                             |
| `dropDuplicates(['col1', 'col2'])`            | Removes duplicate rows based on specific columns.                      |
| `selectExpr("colA as newCol")`                | Selects column(s) using SQL expressions with aliasing.                 |
| `withColumnRenamed("old", "new")`             | Renames a column.                                                      |
| `cache()`                                     | Caches the DataFrame in memory for faster access.                      |
| `persist()`                                   | Stores DataFrame with a specified storage level (memory, disk, etc.).  |
| `repartition(4)`                              | Redistributes rows across a specified number of partitions.            |
| `coalesce(1)`                                 | Reduces the number of partitions, often to write a single output file. |
| `dropna()`                                    | Drops rows with null values (alias for `na.drop()`).                   |
| `fillna(value)`                               | Fills null values with the specified value.                            |
| `isNull()`, `isNotNull()`                     | Filters rows with null or non-null values.                             |
| `when(...).otherwise(...)` (from `functions`) | Performs conditional logic like SQL `CASE WHEN`.                       |

## Joins
| Join Type     | Why We Need It                                       |
| ------------- | ---------------------------------------------------- |
| `inner`       | Only matching rows (common records)                  |
| `left`        | Keep all from left, match where possible             |
| `right`       | Keep all from right, match where possible            |
| `outer`       | Keep everything from both sides                      |
| `left_semi`   | Filter left rows that exist in right                 |
| `left_anti`   | Filter left rows that **don’t** exist in right       |
| `crossJoin()` | All combinations (use cautiously — can explode rows) |
