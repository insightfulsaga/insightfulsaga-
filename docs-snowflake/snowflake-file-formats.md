---
id: snowflake-file-formats
title: File Formats (CSV, JSON, Parquet) — With Story and Use Cases
sidebar_label: File Formats
description: Beginner-friendly guide to Snowflake file formats including CSV, JSON, and Parquet, with real-world examples and use cases for data loading.
keywords:
  - Snowflake file formats
  - Snowflake CSV
  - Snowflake JSON
  - Snowflake Parquet
  - Snowflake data loading
---

# File Formats (CSV, JSON, Parquet) — With Story and Use Cases

Welcome back to **RetailCo**, our fictional retail company.  
Alice, the data engineer, has received multiple datasets from vendors and needs to **decide the right file format to load into Snowflake**.

> “Choosing the right format affects **performance, storage, and query efficiency**,” she explains.

Let’s explore the **most common file formats in Snowflake**: **CSV, JSON, and Parquet**.

---

## 🏗️ 1️⃣ CSV — Comma-Separated Values

**CSV** is the most common format for tabular data:

- Simple and widely used  
- Human-readable  
- Works well for small to medium datasets  

**RetailCo Example:**

- Vendor sends daily sales data in `sales_jan.csv`  
- Alice stages it in Snowflake table stage and uses:

```sql
COPY INTO SALES
FROM @%SALES FILE_FORMAT = (TYPE = CSV FIELD_OPTIONALLY_ENCLOSED_BY='"' SKIP_HEADER=1);
```

**Pros:**

* Easy to generate and read
* Supported by almost all tools

**Cons:**

* Larger file size than binary formats
* No schema enforcement
* Slower queries for large datasets

---

## 🏗️ 2️⃣ JSON — Semi-Structured Data

**JSON** stores hierarchical or semi-structured data:

* Ideal for logs, events, or nested data
* Can use Snowflake’s **VARIANT** data type

**RetailCo Example:**

* Customer clickstream data in `clicks.json`:

```json
{
  "customer_id": 101,
  "page": "/home",
  "timestamp": "2025-11-27T12:34:56"
}
```

**Load into Snowflake:**

```sql
COPY INTO CLICKSTREAM
FROM @CLICKSTREAM_STAGE FILE_FORMAT = (TYPE = JSON);
```

**Pros:**

* Handles complex nested structures
* Flexible schema

**Cons:**

* Larger storage size than Parquet
* Queries can be slower if heavily nested

---

## 🏗️ 3️⃣ Parquet — Columnar Binary Format

**Parquet** is a **columnar, binary format** optimized for analytics:

* Smaller storage footprint
* Faster query performance for large datasets
* Ideal for BI, analytics, and ML pipelines

**RetailCo Example:**

* Weekly aggregated sales stored as `sales_weekly.parquet`:

```sql
COPY INTO SALES_AGG
FROM @S3_PARQUET_STAGE FILE_FORMAT = (TYPE = PARQUET);
```

**Pros:**

* Compressed storage
* Faster queries for analytic workloads
* Supports schema evolution

**Cons:**

* Not human-readable
* Requires specific tools to generate

---

## 🧠 Choosing the Right Format

| File Format | Use Case                     | Pros                          | Cons                           |
| ----------- | ---------------------------- | ----------------------------- | ------------------------------ |
| CSV         | Tabular, small datasets      | Simple, widely supported      | Large, no schema, slow queries |
| JSON        | Semi-structured, logs/events | Handles nested data, flexible | Larger size, slower queries    |
| Parquet     | Large datasets, analytics    | Compressed, fast queries      | Not human-readable             |

**RetailCo Rule:**

* **CSV** → Vendor uploads, quick ETL
* **JSON** → Clickstream or API data
* **Parquet** → Analytics tables and ML pipelines

---

## 🧩 Story Recap — RetailCo in Action

1. Vendor sends CSV → Alice loads into table stage
2. Clickstream JSON → stored in VARIANT column
3. Weekly aggregates → saved as Parquet for analytics

> Result: Efficient **storage, query performance, and workflow alignment** with the right format.

---

## 🏁 Quick Summary 

* **CSV, JSON, Parquet** are the most common Snowflake file formats
* **CSV:** simple tabular data
* **JSON:** semi-structured/nested data
* **Parquet:** columnar, analytics-optimized
* **Best practice:** choose format based on dataset size, structure, and query type
* Using the correct file format **reduces storage costs, improves performance, and simplifies analytics workflows**

---

# 🚀 Coming Next

👉 **COPY INTO Command — Complete Guide with All Options**


