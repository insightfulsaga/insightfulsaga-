---
id: lakehouse-medallion-model
title: Bronze / Silver / Gold Layers — Lakehouse Medallion Model
sidebar_label: Medallion Model (Bronze / Silver / Gold)
description: A simple, story-driven explanation of the Databricks Lakehouse Medallion Architecture — Bronze, Silver, and Gold layers — and how they create clean, trustworthy, production-grade data pipelines.
keywords:
  - medallion architecture
  - bronze silver gold
  - Databricks Lakehouse
  - Delta Lake layers
  - ETL pipelines
---

## Bronze / Silver / Gold Layers — Lakehouse Medallion Model

## 🌍 Why the Medallion Model Exists (Short Story)

Imagine a bakery that receives raw ingredients from dozens of suppliers.

Some flour is high quality.  
Some arrives in broken bags.  
Some ingredients have missing labels.  
Some are fresh… some are **mysteriously old**.

Would the bakery use all of this *directly* to bake bread?  
Of course not.

They sort it.  
They clean it.  
They check quality.  
They refine it into usable forms.

This process is exactly what the **Medallion Architecture** does for data.

Databricks groups data into **three simple layers**:

- **Bronze** → raw  
- **Silver** → cleaned  
- **Gold** → business-ready  

This structure makes large data systems *predictable, trustworthy, and scalable*.

---
## 🥉 1. Bronze Layer — “Raw but Reliable”

The **Bronze layer** stores **raw data exactly as it arrives**.

This includes:
- Raw JSON, CSV, binary logs  
- Streaming ingestion (Autoloader)  
- Duplicate or messy records  
- Columns that don’t always match  
- Events arriving out of order  

### 🎯 Purpose of Bronze
- Keep the original source data (for auditing & replay)
- No business logic
- No cleanup
- No transformations

### ✔ Best Practices
- Use **Delta Lake** for reliability  
- Auto-ingest using Autoloader or streaming  
- Partition only when necessary  

### 📦 Example

```

/mnt/bronze/sales
/mnt/bronze/customers

```

Think of Bronze as the **raw pantry** of the data bakery.

---

## 🥈 2. Silver Layer — “Clean, Organized, and Usable”

The **Silver layer** is where the real work happens.

Here you:
- Clean data  
- Deduplicate  
- Parse nested fields  
- Fix data types  
- Standardize columns  
- Join data across sources  
- Apply initial business rules  

### 🎯 Purpose of Silver
Make data **trustworthy** and **ready for broad analytical use**.

This is usually the biggest and most complex layer.

### ✔ Best Practices
- Use `MERGE` to handle late-arriving or changed data  
- Maintain CDC patterns here  
- Enforce schema consistency  

### 📦 Example

```

/mnt/silver/sales_clean
/mnt/silver/customers_enriched

```

Silver tables are your **clean ingredients** — ready for recipes.

---

## 🥇 3. Gold Layer — “Business-Ready Insights”

The **Gold layer** is where data becomes **value**.

Here you build:
- BI dashboards (Power BI, Tableau)  
- Aggregations (daily/monthly metrics)  
- Feature tables for ML  
- Domain-specific marts (Sales, Finance, Marketing)  

### 🎯 Purpose of Gold
Deliver data in the exact form business users need.

### ✔ Best Practices
- Keep Gold tables stable and predictable  
- Use incremental updates (MERGE or UPDATE)  
- Document business logic clearly  

### 📦 Example

```

/mnt/gold/sales_summary_daily
/mnt/gold/customer_lifetime_value

```

Gold tables represent the **finished products**: the baked bread, cakes, and pastries.

---

## 🔁 How Data Flows (Simple Diagram)

```

```
   RAW DATA
      ↓
  🥉 Bronze
 (unprocessed)
      ↓
  🥈 Silver
 (clean + reliable)
      ↓
  🥇 Gold
```

(business-level insights)

```

This pipeline turns chaos into clarity.

---

## 🧠 Why the Medallion Model Works So Well

### ✔ 1. Clear separation of responsibility  
Raw → Clean → Analytics.

### ✔ 2. Easier debugging  
If something breaks in Gold, check Silver.  
If Silver breaks, check Bronze.

### ✔ 3. Scales beautifully  
You can grow each layer independently.

### ✔ 4. Supports both batch and streaming  
Modern Lakehouse pipelines demand both.

### ✔ 5. Works perfectly with Delta Lake + Databricks  
Versioning + schema enforcement + time travel = stable layers.

---

## 🧩 Quick Real-World Example

### Source  
Ecommerce clickstream data

### Bronze  
Raw events from website logs

### Silver  
Cleaned sessions with user IDs and timestamps

### Gold  
Daily product conversion metrics for marketing teams

This structure is used at:
- Retail companies  
- Banks  
- Healthcare providers  
- Startups  
- Enterprises  

It works everywhere.

---

## 📘 Summary

- The Medallion Architecture organizes data into **Bronze → Silver → Gold** layers.  
- **Bronze** stores raw, unprocessed data exactly as received.  
- **Silver** cleans, standardizes, and enriches the data for analytical use.  
- **Gold** provides business-ready datasets, metrics, and curated domains.  
- This model improves reliability, scalability, debugging, and team collaboration.  
- It is the foundation of modern Databricks Lakehouse pipelines.

---

# 👉 Next Topic  
**Delta Live Tables (DLT Pipelines) — Hands-On Concepts**
