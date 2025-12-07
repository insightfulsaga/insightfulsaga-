---
id: snowflake-object-hierarchy
title: Databases, Schemas, Tables — Snowflake Object Hierarchy Explained
sidebar_label: Object Hierarchy (DB → Schema → Tables)
description: A simple and story-driven guide to understanding Snowflake object hierarchy — databases, schemas, tables, stages, file formats, and best practices.
keywords:
  - snowflake database schema
  - snowflake tables
  - snowflake object hierarchy explained
  - snowflake data modeling
  - snowflake folder structure
---

# Databases, Schemas, Tables — Snowflake Object Hierarchy  
*A simple story about the structure behind your Snowflake data world*

Imagine Snowflake as a giant **digital office building**.  
Inside this building, different departments organize their documents neatly so everything is easy to find.

Snowflake does the same with your data using a **clear hierarchy**:

```

Account → Database → Schema → Tables/Views/Other Objects

```

This hierarchy is the foundation of everything you do in Snowflake.

Let’s walk through this building together.

---

## 🏛 1. Snowflake Account — The Entire Building

Your Snowflake **Account** is like owning the entire building.  
Inside it, you create:

- Databases  
- Warehouses  
- Schemas  
- Users  
- Roles  

Think of it as the top-level container.

When someone says:

> “We have a Snowflake account for our company.”

They mean they own the building where all teams will set up their data floors.

---

## 🗂 2. Databases — The Floors of the Building

A **Database** in Snowflake is like a **floor** in the office building.  
Each floor holds different departments or divisions.

Examples:
- `SALES_DB`
- `FINANCE_DB`
- `MARKETING_DB`
- `HR_DB`

Databases are the highest logical container you create to organize datasets.

### Key points:
- They contain schemas  
- You can clone databases instantly  
- You can share databases using Snowflake’s sharing features  
- They are logical containers, not tied to compute costs  

### SQL Example
```sql
CREATE DATABASE SALES_DB;
USE DATABASE SALES_DB;
```

---

## 📁 3. Schemas — Rooms Inside the Floor

If databases are floors, then **Schemas** are the **rooms** where specific subject areas live.

Inside the SALES_DB floor, you might have:

* `RAW` — raw ingested data
* `STAGE` — cleaned, standardized data
* `ANALYTICS` — curated data for dashboards
* `REF` — reference lookup tables

Schemas let you separate data logically, cleanly, and securely.

### SQL Example

```sql
CREATE SCHEMA RAW;
CREATE SCHEMA ANALYTICS;
```

### Why Schemas Matter

* Better organization
* Easier permission control
* Cleaner naming conventions
* Separation between raw and transformed data

A well-designed schema structure saves countless headaches later.

---

## 📦 4. Tables — The Files Inside the Room

Tables are the **actual data containers**.

This is where your rows and columns live — facts, transactions, logs, customers, orders, all of it.

### Types of Tables in Snowflake

* **Permanent tables** (default)
* **Transient tables** (cheaper, less recovery)
* **Temporary tables** (session-based)

### Example

```sql
CREATE TABLE ANALYTICS.SALES_SUMMARY (
  REGION STRING,
  TOTAL_SALES NUMBER,
  YEAR NUMBER
);
```

---

## 🔍 5. Views — Windows to the Table

A **View** is like a window looking into data.
It doesn’t store data itself — only the query that generates it.

Types:

* **Standard View**
* **Secure View**
* **Materialized View**

Useful for:

* Abstracting complex SQL
* Hiding sensitive columns
* Creating business-friendly data layers

---

## 📦 6. Stages — Data Upload Rooms

Stages are special storage areas (internal or external) where data files are placed before loading into Snowflake.

Examples:

* `@~` (user stage)
* `@%TABLE` (table stage)
* Internal or external S3/Azure/GCS stages

### Example

```sql
CREATE STAGE RAW_STAGE
  URL='s3://mybucket/raw_data'
  CREDENTIALS=(AWS_KEY_ID='...' AWS_SECRET_KEY='...');
```

Stages are part of the object hierarchy, helping you ingest data cleanly and consistently.

---

## 🏗 7. File Formats — Instructions for Reading Files

Like telling your workers *how to read a file*, file formats define:

* CSV
* JSON
* Parquet
* Avro

Example:

```sql
CREATE FILE FORMAT my_csv_format
  TYPE = 'CSV'
  FIELD_DELIMITER = ','
  SKIP_HEADER = 1;
```

---

## 🧩 8. How All Snowflake Objects Fit Together

Here’s a high-level hierarchy diagram:

```
SNOWFLAKE ACCOUNT
│
└── DATABASE: SALES_DB
    │
    ├── SCHEMA: RAW
    │   ├── TABLE: SALES_RAW
    │   ├── STAGE: RAW_STAGE
    │   └── FILE FORMAT: RAW_CSV
    │
    ├── SCHEMA: ANALYTICS
    │   ├── TABLE: SALES_SUMMARY
    │   ├── VIEW: SALES_DAILY_VIEW
    │   └── MATERIALIZED VIEW: SALES_AGG_MV
    │
    └── SCHEMA: REF
        └── TABLE: COUNTRY_LOOKUP
```

Nice. Clean. Organized. Easy to understand and govern.

---

## 🏢 9. Real Company Example (Best Practice Setup)

A standard Snowflake setup for a real company might look like:

```
MYCOMPANY
│
└── DATABASES:
    ├── RAW_DB
    │   └── SCHEMAS: CRM, SALES, MARKETING
    ├── PROD_DB
    │   └── SCHEMAS: CORE, ANALYTICS, REPORTING
    ├── SANDBOX_DB
    │   └── SCHEMAS: DEV_USER1, DEV_USER2
    └── REF_DB
        └── SCHEMAS: LOOKUPS
```

Why this works:

* Clear separation between raw & curated data
* Dedicated sandbox for developers
* Easy access control using roles
* Organized for scale and teamwork

---

## 🧠 10. Best Practices 

* Use **RAW → STAGE → PROD** schema patterns
* Separate dev, test, and prod using different databases
* Use consistent naming conventions
* Keep sensitive data in secure schemas
* Use transient or temp tables where recovery is not needed
* Organize stages and file formats by schema

---

## 🎯 One-Line Summary

**Snowflake organizes data in a clean hierarchy: Account → Database → Schema → Tables, making your data world structured, secure, and easy to navigate.**

---

# 🚀 Next Topic

👉 **Snowflake Editions (Standard, Enterprise, Business Critical)**


