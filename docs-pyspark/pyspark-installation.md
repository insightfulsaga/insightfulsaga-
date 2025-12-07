---
id: pyspark-installation
title: Installing PySpark & Setting Up Environment
sidebar_label: PySpark Installation
description: Step-by-step guide to install PySpark, set up your development environment, and run your first Spark job for big data processing.
keywords:
  - PySpark installation
  - Set up PySpark environment
  - Apache Spark Python setup
  - PySpark first job
  - Big data development setup
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

# Installing PySpark & Setting Up Environment

Before you can harness the **power of distributed data processing** with PySpark, you need to **set up your development environment correctly**. Whether you’re on **Windows, Mac, or Linux**, or using **Databricks**, getting your environment ready is the first step to becoming a productive data engineer.

---

## Step 1: Prerequisites

Before installing PySpark, ensure you have:

- **Python** (3.7 or above recommended)  
- **Java Development Kit (JDK)** 8 or 11  
- **pip** for installing Python packages  

> PySpark runs on JVM, so having Java installed is mandatory even when coding in Python.

---

## Step 2: Installing PySpark

You have multiple ways to install PySpark:

### a) Using pip (Recommended for Local Setup)

```bash
pip install pyspark
````

Check installation:

```bash
python -c "import pyspark; print(pyspark.__version__)"
```

### b) Using Conda

```bash
conda install -c conda-forge pyspark
```

### c) Using Databricks (Cloud)

* Databricks comes with PySpark pre-installed.
* No local installation needed; just create a **cluster** and start coding in notebooks.

---

## Step 3: Setting Up Environment Variables (Local Setup)

* **JAVA_HOME**: Point to your JDK directory
* **SPARK_HOME**: Point to your Spark installation folder (if manually installed)

Example for Linux/Mac:

```bash
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk
export SPARK_HOME=/opt/spark
export PATH=$SPARK_HOME/bin:$PATH
```

---

## Step 4: Test Your Installation

Create a Python script `hello_spark.py`:

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("HelloSpark").getOrCreate()

data = [("Alice", 25), ("Bob", 30), ("Charlie", 28)]
df = spark.createDataFrame(data, ["Name", "Age"])

df.show()
spark.stop()
```

Run:

```bash
python hello_spark.py
```

Expected output:

```
+-------+---+
|   Name|Age|
+-------+---+
|  Alice| 25|
|    Bob| 30|
|Charlie| 28|
+-------+---+
```

> Congratulations! You just ran your **first PySpark job**.

---

## Step 5: IDE Recommendations

For a smoother experience, consider using:

* **VS Code** (with Python & PySpark extensions)
* **PyCharm** (Professional Edition recommended)
* **Databricks Notebooks** (for cloud environment)

---

## Real-Life Example

At **ShopVerse Retail**, new data engineers must first **set up PySpark locally** before working on ETL pipelines. Some developers use **VS Code for development** and then deploy scripts to **Databricks clusters**. This ensures **consistency between local testing and production jobs**.

---

## Key Takeaways

* Install **Python**, **JDK**, and **PySpark** to get started.
* Use **Databricks** for hassle-free cloud setup.
* Verify your setup by running a **simple DataFrame job**.
* Proper environment setup ensures **smooth development and debugging**.

---

Next, we’ll explore **RDDs vs DataFrames vs Datasets — When to Use**, so you can **choose the right Spark abstraction for your workloads**.

```

