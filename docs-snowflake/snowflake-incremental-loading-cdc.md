---
id: snowflake-incremental-loading-cdc
title: Incremental Loading (CDC) in Snowflake — 5 Real Techniques
sidebar_label: Incremental Loading
description: Beginner-friendly, story-driven guide to incremental loading (CDC) in Snowflake with 5 practical techniques and real-world examples.
keywords:
  - Snowflake CDC
  - Snowflake incremental load
  - Snowflake data pipelines
  - Snowflake change data capture
  - Snowflake ETL best practices
---

# Incremental Loading (CDC) in Snowflake — 5 Real Techniques

Welcome back to **RetailCo**, our fictional retail company.  
Alice, the data engineer, is now dealing with **large tables that get frequent updates**. Loading the full table every day wastes time and storage.  

> “We need **incremental loading**, also called Change Data Capture (CDC), to only load new or updated rows,” she explains.

Let’s explore **5 real techniques for incremental loading in Snowflake**.

---

## 🏗️ Why Incremental Loading Matters

Without incremental loading:

- ETL jobs become slow and costly  
- Storage and compute costs increase  
- Analytics dashboards lag behind real-time updates  

With incremental loading:

- Only changed data is loaded  
- Jobs run faster and cheaper  
- Reports stay up-to-date  

---

### 🔹 Technique 1: Timestamp-Based Incremental Load

- Use a `LAST_UPDATED` timestamp column  
- Load rows where `LAST_UPDATED` > last ETL run

**Example:**

```sql
INSERT INTO SALES_STG
SELECT *
FROM SALES_RAW
WHERE LAST_UPDATED > (SELECT MAX(LAST_UPDATED) FROM SALES);
```

* Simple and efficient for append/update scenarios
* Works well for tables with timestamp tracking

---

### 🔹 Technique 2: Sequence Number or ID-Based Incremental Load

* Use an auto-incrementing ID column
* Load rows where ID > last loaded ID

**Example:**

```sql
INSERT INTO ORDERS_STG
SELECT *
FROM ORDERS_RAW
WHERE ORDER_ID > (SELECT MAX(ORDER_ID) FROM ORDERS);
```

* Ideal for append-only datasets
* Very fast, especially for large tables

---

### 🔹 Technique 3: Merge Statement (Upsert)

* Handles **insert + update**
* Uses Snowflake `MERGE` to apply changes

**Example:**

```sql
MERGE INTO SALES AS target
USING SALES_STG AS source
ON target.SALE_ID = source.SALE_ID
WHEN MATCHED THEN UPDATE SET target.QUANTITY = source.QUANTITY
WHEN NOT MATCHED THEN INSERT (SALE_ID, PRODUCT_ID, QUANTITY, SALE_DATE)
VALUES (source.SALE_ID, source.PRODUCT_ID, source.QUANTITY, source.SALE_DATE);
```

* Ensures table stays up-to-date
* Handles updates, not just new rows

---

### 🔹 Technique 4: Snowflake Streams + Tasks

* **Streams** track table changes automatically
* **Tasks** schedule incremental load pipelines

**RetailCo Example:**

```sql
CREATE STREAM SALES_STREAM ON TABLE SALES_RAW;

CREATE TASK SALES_TASK
WAREHOUSE = ETL_WH
SCHEDULE = 'USING CRON 0 * * * *'
AS
MERGE INTO SALES
USING SALES_STREAM
ON SALES.SALE_ID = SALES_STREAM.SALE_ID
WHEN MATCHED THEN UPDATE SET QUANTITY = SALES_STREAM.QUANTITY
WHEN NOT MATCHED THEN INSERT (SALE_ID, PRODUCT_ID, QUANTITY, SALE_DATE)
VALUES (SALES_STREAM.SALE_ID, SALES_STREAM.PRODUCT_ID, SALES_STREAM.QUANTITY, SALES_STREAM.SALE_DATE);
```

* Fully automated incremental ETL
* Real-time or near-real-time data updates

---

### 🔹 Technique 5: Hash-Based Comparison

* Generate a hash of each row (MD5, SHA256)
* Compare hashes to detect changes

**Example:**

```sql
INSERT INTO SALES_STG
SELECT *
FROM SALES_RAW r
WHERE MD5(TO_VARIANT(r.*)) NOT IN (SELECT HASH FROM SALES);
```

* Useful for datasets without timestamps or IDs
* Detects both inserts and updates

---

## 🧩 RetailCo Real-World CDC Scenario

1. **Daily Sales:** Timestamp-based load
2. **Orders Table:** Sequence ID-based incremental load
3. **Inventory Updates:** MERGE to handle insert + update
4. **Streaming Events:** Snowflake Streams + Tasks for near real-time
5. **Vendor Data:** Hash comparison for unknown updates

Result: **Faster ETL, lower costs, and up-to-date dashboards**.

---

## 🏁 Quick Summary 

* **Incremental loading (CDC)** ensures only new/changed data is loaded
* **5 techniques:** Timestamp-based, Sequence/ID-based, Merge (Upsert), Streams + Tasks, Hash-based
* Best practice: choose technique based on dataset type and update pattern
* Benefits: faster ETL, reduced compute/storage cost, real-time or near-real-time analytics

---

# 🚀 Coming Next

👉 **Automation of Data Loads Using Tasks (Cron Style Scheduling)**


