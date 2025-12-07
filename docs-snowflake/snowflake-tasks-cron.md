---
id: snowflake-tasks-cron
title: Automation of Data Loads Using Tasks (Cron Style Scheduling)
sidebar_label: Snowflake Tasks
description: Beginner-friendly guide to automating Snowflake data loads using Tasks with cron-style scheduling, examples, and best practices.
keywords:
  - Snowflake tasks
  - Snowflake cron jobs
  - Snowflake ETL automation
  - Snowflake scheduled jobs
  - Snowflake incremental load
---

# Automation of Data Loads Using Tasks (Cron Style Scheduling)

Welcome back to **RetailCo**, our fictional retail company.  
Alice, the data engineer, has been manually triggering ETL pipelines, but **she wants automation** for daily sales, hourly inventory updates, and near real-time streams.  

> “Snowflake **Tasks** allow us to schedule SQL statements, pipelines, and even incremental loads automatically,” Alice explains.

Let’s explore **Snowflake Tasks** with cron-style scheduling and real-world examples.

---

## 🏗️ What Are Snowflake Tasks?

**Tasks** in Snowflake are **scheduled or triggered jobs** that execute SQL statements automatically:

- Can run **once, repeatedly, or on a schedule**  
- Can be **chained** for dependent pipelines  
- Fully integrated with **Streams** for CDC-based ETL  

**RetailCo example:**  
- Daily sales load at 2:00 AM  
- Inventory updates every hour  
- BI dashboards updated automatically  

---

## 🔹 1️⃣ Creating a Basic Task

Syntax:

```sql
CREATE TASK task_name
WAREHOUSE = etl_wh
SCHEDULE = 'USING CRON 0 2 * * * UTC'
AS
INSERT INTO SALES
SELECT *
FROM SALES_STG
WHERE LOAD_DATE = CURRENT_DATE;
```

* `SCHEDULE` uses **cron expressions**
* `WAREHOUSE` executes the task using that compute resource
* `AS` defines the SQL statement to run

**Explanation:**

* This task runs **daily at 2:00 AM UTC** to load new sales data.

---

## 🔹 2️⃣ Task with Streams (Incremental Load)

Combine **Tasks + Streams** for automated CDC:

```sql
CREATE TASK sales_stream_task
WAREHOUSE = etl_wh
SCHEDULE = 'USING CRON 0 * * * * UTC'
AS
MERGE INTO SALES
USING SALES_STREAM
ON SALES.SALE_ID = SALES_STREAM.SALE_ID
WHEN MATCHED THEN UPDATE SET QUANTITY = SALES_STREAM.QUANTITY
WHEN NOT MATCHED THEN INSERT (SALE_ID, PRODUCT_ID, QUANTITY, SALE_DATE)
VALUES (SALES_STREAM.SALE_ID, SALES_STREAM.PRODUCT_ID, SALES_STREAM.QUANTITY, SALES_STREAM.SALE_DATE);
```

* Runs **every hour**
* Automatically merges new or updated rows from the stream

---

## 🔹 3️⃣ Chaining Tasks

You can **create dependent tasks** to run in sequence:

```sql
CREATE TASK task_stage_to_staging
WAREHOUSE = etl_wh
SCHEDULE = 'USING CRON 0 1 * * * UTC'
AS
INSERT INTO SALES_STG SELECT * FROM RAW_SALES;

CREATE TASK task_staging_to_target
WAREHOUSE = etl_wh
AFTER task_stage_to_staging
AS
INSERT INTO SALES SELECT * FROM SALES_STG;
```

* Task 2 runs **only after Task 1 completes**
* Ensures proper **ETL sequence and data integrity**

---

## 🔹 4️⃣ Monitoring Tasks

Check task history:

```sql
SELECT *
FROM SNOWFLAKE.ACCOUNT_USAGE.TASK_HISTORY
WHERE TASK_NAME = 'SALES_TASK'
ORDER BY START_TIME DESC;
```

* Tracks **execution, status, errors**
* Essential for debugging and auditing

---

## 🧩 RetailCo Real-World Automation

1. **Daily Sales:** Task at 2:00 AM loads data into staging
2. **Hourly Inventory:** Task merges updates from stream into main table
3. **Dependent Tasks:** Process raw → staging → final tables
4. **Monitoring:** Alice ensures tasks run successfully without manual intervention

**Outcome:** Fully automated ETL, accurate dashboards, and reduced manual effort.

---

## 🧠 Best Practices

1. Use **appropriate warehouses** to optimize cost
2. Monitor task history regularly
3. Combine with **Streams for incremental loads**
4. Chain tasks for **complex ETL pipelines**
5. Use cron expressions carefully to avoid overlaps or conflicts
6. Keep tasks **idempotent** — safe to rerun if needed

---

## 🏁 Quick Summary 

* **Snowflake Tasks** automate SQL execution for ETL pipelines
* **Cron-style scheduling** allows daily, hourly, or custom intervals
* Combine with **Streams** for incremental loads
* Tasks can be **chained** for dependent pipelines
* Benefits: automation, reliability, cost control, and real-time dashboards

---

# 🚀 Coming Next

👉 **Working with Large Files, Compression Types & Optimization Tips**


