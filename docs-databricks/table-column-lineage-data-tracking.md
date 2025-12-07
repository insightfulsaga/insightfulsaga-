---
id: table-column-lineage-data-tracking
title: Table & Column Lineage — Data Tracking
sidebar_label: Table & Column Lineage
description: Understand the importance of tracking table and column lineage for data auditing, transparency, and ensuring data quality within your Databricks Lakehouse.
keywords:
  - Data Lineage
  - Table Lineage
  - Column Lineage
  - Databricks Lakehouse
  - Data Tracking
  - Data Quality
---

# Table & Column Lineage — Data Tracking

## 🔍 What is Data Lineage?

In the world of data, **lineage** refers to the **tracking** and **visualization** of the path data takes from its source to its destination. It shows how data is transformed, from raw data sources through various processing stages to its final state in a database or analytical report.

When we talk about **table** and **column lineage**, we are focusing on understanding the flow of data at the **table** and **column** level in a pipeline. This allows data teams to:

- **Trace** how data is transformed
- **Identify** data quality issues
- Ensure compliance with data privacy regulations (e.g., GDPR, CCPA)

In Databricks, table and column lineage helps improve **transparency**, **auditability**, and **data quality** across the Lakehouse.

---

## 🛠 How Table & Column Lineage Works in Databricks

In the Databricks Lakehouse, **lineage tracking** provides an automatic map of how data moves through your tables, views, and columns. This is important for:

- **Auditing**: Ensuring that data is correctly transformed and stored.
- **Troubleshooting**: Quickly identifying where data issues occur.
- **Compliance**: Meeting regulatory requirements for data traceability.

### Table Lineage:  
When you track table lineage, you're looking at how data moves from one table to another, across different stages of the pipeline. This helps you visualize the flow of data between different layers, from **Bronze** to **Silver** to **Gold**.

### Column Lineage:  
Column lineage tracks how individual columns are transformed across the pipeline. For example, it shows if a column's values are altered in any way (such as aggregation or cleaning) as it moves through different tables or views.

Together, **table** and **column lineage** give you a **full picture** of how data is processed, helping to ensure its integrity and making it easier to resolve any issues.

---

## 🧑‍💻 Example of Table & Column Lineage

Consider a simple transformation pipeline where data flows from a raw data table to a cleaned and aggregated version:

1. **Raw Data Table (Bronze Layer)**:  
   Contains raw, unclean data.

2. **Transformation (Silver Layer)**:  
   Data is cleaned, filtered, and transformed.

3. **Aggregated Data Table (Gold Layer)**:  
   Data is aggregated for final analysis.

Here’s an example in PySpark that might create this lineage:

```python
# Bronze Layer: Raw Data Table
df_bronze = spark.read.table("raw_data")

# Silver Layer: Data Transformation
df_silver = df_bronze.filter(df_bronze.age > 18).select("name", "age", "email")

# Gold Layer: Aggregated Data Table
df_gold = df_silver.groupBy("age").count()

df_gold.write.format("delta").mode("overwrite").saveAsTable("aggregated_data")
```

### What happens behind the scenes:

* **Table Lineage**: You can track how the `raw_data` table moves to `aggregated_data` through the `transformation` and `aggregation` steps.
* **Column Lineage**: You can trace how the `age` column is filtered and then grouped.

This lineage helps you understand where data comes from, how it's transformed, and where it's used, making it easier to track the entire process.

---

## 🚀 Why Table & Column Lineage Is Crucial

### 1. **Data Auditing**

By tracking data lineage, you can create a transparent audit trail. This is essential for **compliance** with data regulations and for ensuring that the data in your reports is accurate and traceable.

### 2. **Troubleshooting Data Issues**

Lineage helps quickly identify where something went wrong in your data pipeline. If you notice a data issue in your **Gold Layer**, tracing the lineage back to the **Bronze Layer** lets you find the root cause — whether it's incorrect data ingestion or a transformation error.

### 3. **Ensuring Data Quality**

Lineage provides insights into how data is transformed, cleaned, and aggregated. By visualizing this flow, you can make sure that all data transformations preserve the integrity and quality of the data.

### 4. **Simplifying Collaboration**

When different teams work with the same dataset, having a clear map of data lineage helps ensure that everyone is on the same page. Data engineers, data scientists, and analysts can all track how data flows across the system, helping prevent errors and miscommunication.

---

## 🌉 How to Enable Lineage Tracking in Databricks

Databricks automatically tracks lineage for tables and columns, especially for Delta Lake tables. If you use **Delta Lake** for storing your data, **lineage tracking** is integrated, allowing you to visualize the flow of data.

To view lineage, you can use Databricks' built-in **lineage graph** feature:

1. Navigate to the **Data** tab in Databricks.
2. Select a **table** or **view**.
3. Click the **Lineage** tab to see a visual representation of its lineage, showing how the data moves and transforms.

You can also use the **Delta Lake history API** to retrieve the history of any Delta table, including information about schema changes, data modifications, and transformations.

---

## 🧠 When Should You Use Table & Column Lineage?

Use Table & Column Lineage if:

* You need to **track** data as it moves through your pipeline for **compliance** and **auditability**.
* You want to improve **data quality** by understanding how each table and column is transformed.
* Your organization has complex **data workflows** involving multiple teams and stakeholders.
* You need to quickly **debug** data issues and **troubleshoot** your data pipelines.

Avoid Lineage Tracking if:

* Your dataset is small and doesn’t require in-depth tracking.
* You’re working with static, one-time data transformations without ongoing data flow.
* You’re not concerned with **data quality** or **regulatory compliance**.

---

## 📊 Architecture (Simple View)

```
Raw Data (Bronze Layer)
        ↓ Data Transformation (Silver Layer)
   Processed Data (Gold Layer)
```

In this pipeline, each stage of data transformation can be tracked for both table and column lineage, giving you a clear path from the raw data to the final processed data.

---

## 📘 Summary

**Table and Column Lineage** in Databricks provides an essential framework for tracking the flow of data through your system. It helps with **auditing**, **troubleshooting**, **data quality**, and **collaboration** across teams.

By automatically tracking how data is transformed and providing visual lineage graphs, Databricks makes it easier to ensure data integrity, identify issues quickly, and stay compliant with regulations.

Lineage isn’t just a nice-to-have; it’s a must-have in modern data workflows.

---

# 👉 Next Topic

**Lakehouse Federation — Query External Cloud Databases**

```

