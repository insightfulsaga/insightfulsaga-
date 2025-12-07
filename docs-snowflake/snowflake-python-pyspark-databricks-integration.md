---
id: snowflake-python-pyspark-databricks-integration
title: Snowflake with Python, PySpark, Databricks — Enterprise Integration
sidebar_label: Python, PySpark & Databricks
description: A story-driven, enterprise-ready guide on integrating Snowflake with Python, PySpark, and Databricks using connectors, Snowpark, Spark Snowflake Connector, and modern data architecture patterns.
keywords:
  - Snowflake Python integration
  - Snowflake PySpark connector
  - Snowflake Databricks integration
  - Snowflake Snowpark
  - Spark Snowflake connector
  - snowflake data engineering
  - python snowflake examples
---

# Snowflake with Python, PySpark, Databricks — Enterprise Integration

## 🎬 Story Time — “We Need All Our Tools Talking to Each Other”

Ritika, a lead data engineer at a fast-growing SaaS company, faces an integration challenge.

Her ecosystem is huge:

- Python notebooks for analysts  
- PySpark pipelines on Databricks  
- Machine learning workflows  
- Batch + streaming  
- Snowflake as the central data warehouse  

The CTO declares:

> “Everything must flow into Snowflake and out of Snowflake, seamlessly.”

Now Ritika must connect **Python**, **PySpark**, and **Databricks** in a clean, scalable architecture.

---

## 🧊 1. Snowflake + Python — Your Data Engineering Power Duo

Python integrates with Snowflake through:

- **Snowflake Connector for Python**  
- **Snowpark for Python**  
- **Pandas + Snowflake Native Connectors**  
- **Streamlit-in-Snowflake (SIS)**  

Ritika starts with the Python connector.

---

### 🔌 1.1 Snowflake Python Connector

Install:

```bash
pip install snowflake-connector-python
```

Connect:

```python
import snowflake.connector

conn = snowflake.connector.connect(
    user='RITIKA',
    password='xxxxxxx',
    account='AB12345.ap-south-1',
    warehouse='ANALYTICS_WH',
    database='SALES_DB',
    schema='PUBLIC'
)

cursor = conn.cursor()
cursor.execute("SELECT COUNT(*) FROM ORDERS")
print(cursor.fetchone())
```

This powers:

* ad hoc scripts
* ETL micro-jobs
* Python automations
* Airflow & Prefect pipelines

---

### 🧠 1.2 Snowpark for Python — Server-Side Python

Ritika discovers **Snowpark**, allowing Python logic to run **inside Snowflake compute**.

Install:

```bash
pip install snowflake-snowpark-python
```

Example:

```python
from snowflake.snowpark import Session

session = Session.builder.configs(connection_parameters).create()

df = session.table("ORDERS")
df_filtered = df.filter(df["REVENUE"] > 1000)

df_filtered.show()
```

### Benefits:

* Pushdown compute to Snowflake
* Distributed processing
* Zero data movement
* ML model execution inside Snowflake

---

## 🔥 2. Snowflake + PySpark Integration

Snowflake integrates with PySpark via the **Spark Snowflake Connector**.

Perfect for:

* Large-scale Spark transformations
* Ingest from Delta Lake
* ETL pipelines running on Databricks or EMR
* Converting Spark DataFrames → Snowflake tables

---

### 🔌 2.1 Spark Snowflake Connector Setup

Add dependencies:

```bash
--packages net.snowflake:snowflake-jdbc:3.13.28,net.snowflake:spark-snowflake_2.12:2.12.0-spark_3.3
```

Connection options:

```python
sfOptions = {
  "sfURL": "AB12345.snowflakecomputing.com",
  "sfAccount": "AB12345",
  "sfUser": "RITIKA",
  "sfPassword": "xxxx",
  "sfDatabase": "SALES_DB",
  "sfSchema": "PUBLIC",
  "sfWarehouse": "SPARK_WH"
}
```

### Write Spark DataFrame → Snowflake

```python
df.write \
  .format("snowflake") \
  .options(**sfOptions) \
  .option("dbtable", "ORDERS_CLEAN") \
  .save()
```

### Read from Snowflake → Spark

```python
df_snow = spark.read \
  .format("snowflake") \
  .options(**sfOptions) \
  .option("query", "SELECT * FROM SALES_DB.PUBLIC.ORDERS") \
  .load()
```

---

## 🏔️ 3. Snowflake + Databricks — A Modern Lakehouse Integration

Databricks teams often use:

* Spark for heavy transformations
* MLflow for experimentation
* Delta Lake for raw zone
* Snowflake for **analytics, BI & governed modeling**

Ritika builds a pipeline:

1. Raw data → Delta Lake
2. Transform in Databricks using PySpark
3. Load curated data → Snowflake
4. Analysts query Snowflake using BI tools

---

### 🔗 3.1 Databricks + Snowflake Connector Example

In Databricks notebook:

```python
options = {
  "sfUrl": "ab12345.ap-south-1.snowflakecomputing.com",
  "sfUser": dbutils.secrets.get("snowflake", "USER"),
  "sfPassword": dbutils.secrets.get("snowflake", "PASSWORD"),
  "sfDatabase": "REVENUE_DB",
  "sfSchema": "PUBLIC",
  "sfWarehouse": "DBRICKS_WH"
}

spark_df = spark.sql("SELECT * FROM unified_sales")

spark_df.write \
  .format("snowflake") \
  .options(**options) \
  .option("dbtable", "UNIFIED_SALES_SF") \
  .mode("overwrite") \
  .save()
```

### Why Databricks integrates well with Snowflake:

* High-performance parallel load
* Supports Delta → Snowflake
* Easy credential management via Secrets
* Handles large ETL pipelines

---

## 🤖 4. Machine Learning Workflows

Ritika combines:

* Snowpark for Python (feature engineering inside Snowflake)
* Spark ML or Databricks MLflow
* Snowflake UDFs & UDTFs
* Model scoring inside Snowflake

Example: Deploy ML model using Snowpark UDF:

```python
@udf
def score_model(amount: float) -> float:
    return amount * 0.98  # simplified example
```

Apply on Snowflake table:

```python
session.table("ORDERS").select(score_model("REVENUE")).show()
```

This removes the need for exporting large datasets.

---

## 🧠 5. Architecture Patterns

### ✔ Pattern 1 — Databricks as Transformation Layer, Snowflake as Analytics

* Spark cleans & enriches
* Snowflake stores final models & tables

### ✔ Pattern 2 — Snowpark-First Architecture

* All transformations in Snowflake
* Only ML training outside

### ✔ Pattern 3 — Hybrid Lakehouse

* Delta for raw + bronze
* Snowflake for gold semantic layers

---

## 📦 6. Best Practices

1. Use **Snowpark** where possible to avoid data movement
2. Use **Spark Connector** for large-scale batch loads
3. Do not oversize Snowflake warehouses for Spark loads
4. Use **COPY INTO** for bulk micro-batch ingestion
5. Use **Secrets Manager** on Databricks for credentials
6. Monitor connector jobs through **Query History**
7. Keep transformations close to the compute engine (Spark or Snowflake)

---

## 🎉 Real-World Ending — “Everything Works Together Now”

With her new integration setup:

* Python automations sync instantly with Snowflake
* Spark pipelines load cleaned data at scale
* Databricks notebooks talk to Snowflake seamlessly
* ML workloads run inside Snowflake using Snowpark
* No messy data exports or CSV dumps

Her CTO smiles:

> “This is a true modern data platform. Excellent work.”

---

## 📘 Summary

Snowflake integrates deeply with:

### ✔ Python & Snowpark

### ✔ PySpark

### ✔ Databricks

### ✔ ML & Feature Engineering

### ✔ Modern Lakehouse Workflows

Together they create a **scalable, flexible, and enterprise-grade** data ecosystem.

---




