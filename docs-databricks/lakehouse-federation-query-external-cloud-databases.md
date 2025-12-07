---
id: lakehouse-federation-query-external-cloud-databases
title: Lakehouse Federation — Query External Cloud Databases
sidebar_label: Lakehouse Federation
description: Learn how Databricks Lakehouse Federation allows you to seamlessly query external cloud databases, enabling data integration across platforms.
keywords:
  - Lakehouse Federation
  - Query External Databases
  - External Cloud Databases
  - Databricks SQL
  - Cloud Integration
  - Data Federation
---

# Lakehouse Federation — Query External Cloud Databases

## 🌐 The Power of Data Federation

In today's data-driven world, organizations are leveraging data from various sources across multiple platforms. Whether it's structured, semi-structured, or unstructured data, businesses need the flexibility to query data across different clouds, data lakes, and databases.

Databricks' **Lakehouse Federation** provides a powerful solution to **query external cloud databases** seamlessly. With Lakehouse Federation, you can unify your data ecosystem, run queries across data stored in external sources, and integrate data from a variety of platforms without the need for complex data replication or movement.

Imagine being able to query your data in **Amazon Redshift**, **Google BigQuery**, **Azure SQL**, or any other external cloud database directly from Databricks, all within the same pipeline. This is the power of Lakehouse Federation — **no more data silos**.

---

## 🔍 How Lakehouse Federation Works

Lakehouse Federation enables you to query external cloud databases using **Databricks SQL**, as if they were native tables in your Databricks environment. By integrating external databases into your **Databricks Lakehouse**, you can perform analytics and data processing without moving the data physically.

### Key Components:
- **External Data Sources**: Includes databases such as Amazon RDS, Google BigQuery, Microsoft SQL Server, and many others.
- **Databricks SQL**: Databricks SQL allows you to run queries against external data sources, leveraging the power of Databricks’ distributed compute engine.
- **External Tables**: These are virtual tables that represent data from an external source. They allow you to run SQL queries directly on external data without needing to replicate or ingest the data into Databricks.

With Lakehouse Federation, you can **query, analyze, and transform** data from multiple clouds and storage locations in real-time.

---

## 🧑‍💻 Example: Querying External Databases with Lakehouse Federation

Here's how you can use Lakehouse Federation to query an external cloud database directly from Databricks:

### Example: Querying Data from Google BigQuery

```python
# Define an external data source (BigQuery)
spark.conf.set("spark.databricks.service.catalog.bigquery", "bigquery-project")

# Create an external table linked to BigQuery
external_table = spark.read \
    .format("bigquery") \
    .option("project", "your-gcp-project-id") \
    .option("table", "bigquery_dataset.table_name") \
    .load()

# Run a query on the external table
external_table.createOrReplaceTempView("bigquery_data")

result = spark.sql("SELECT * FROM bigquery_data WHERE column_name > 100")
result.show()
```

### What happens here:

* The code creates an **external table** linked to a **Google BigQuery** dataset.
* Databricks SQL is used to **query the external table** as if it were a regular Databricks table.
* The data stays in **BigQuery**; only the query execution happens in Databricks.

This process makes data federation simple — you can query data across cloud platforms as if everything were housed in a single location.

---

## 🔑 Key Benefits of Lakehouse Federation

### 1. **Unify Your Data Ecosystem**

Lakehouse Federation allows you to **integrate** and **query** data from a variety of external sources without the need for data replication. You can work with your data in-place, saving time and reducing the complexity of data management.

### 2. **No Need for Data Movement**

With traditional data lakes or warehouses, you often need to **ingest or replicate data** before running queries. Lakehouse Federation eliminates this need. It allows you to work with **external data** in its native location, reducing data movement and increasing efficiency.

### 3. **Consistent Querying Experience**

Databricks provides a unified querying experience across all external sources, meaning you can use **Databricks SQL** to access external databases in the same way you access tables within your Databricks Lakehouse. This ensures that your queries are consistent, regardless of where the data resides.

### 4. **Scalable and High-Performance**

Lakehouse Federation leverages Databricks’ scalable infrastructure to run **high-performance queries** against external data sources. You don’t need to worry about performance degradation when querying large datasets from external sources.

### 5. **Simplified Data Management**

By using Lakehouse Federation, you don’t need to deal with the complexities of managing data pipelines, replicas, or storage across multiple platforms. You can focus on the data itself and the analysis you need to perform.

---

## 🧠 When Should You Use Lakehouse Federation?

Use Lakehouse Federation if:

* You have **data spread across different cloud platforms** and need a unified view.
* You want to run **cross-cloud queries** without moving large datasets.
* Your data resides in external cloud databases, and you need to **integrate** them into your Databricks workflows.
* You need to **reduce costs** associated with replicating or moving large amounts of data.

Avoid Lakehouse Federation if:

* Your data is **centralized** in a single cloud or platform and there’s no need for external data integration.
* You don't require real-time querying or federation of external data sources.

---

## 📦 Architecture (Simple Overview)

```
External Cloud Databases (BigQuery, Redshift, SQL Server)
           ↓ Query from Databricks
       Lakehouse Federation (Databricks SQL)
           ↓ Data Transformation & Analytics
       Databricks Lakehouse (Bronze, Silver, Gold Tables)
```

In this architecture, external databases are **queried directly** using Lakehouse Federation, enabling data transformation and analysis without needing to move or replicate the data.

---

## 📘 Summary

**Lakehouse Federation** is a game-changer for data integration, allowing organizations to query external cloud databases as easily as querying native Databricks tables. By eliminating the need for data movement, you can build more efficient, scalable, and cost-effective data workflows. Whether you are working with **Google BigQuery**, **Amazon Redshift**, or any other external data source, Lakehouse Federation gives you the flexibility to analyze and transform data in real-time, across multiple platforms.

If you're looking to break down data silos and integrate external databases into your Databricks workflows, **Lakehouse Federation** is the solution.

---

# 👉 Next Topic

**Databricks Governance — Tags, Classifications & Policies**


