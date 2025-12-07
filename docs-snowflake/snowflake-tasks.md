---
id: snowflake-tasks
title: Tasks — How Scheduling Works Internally
sidebar_label: Tasks
description: Learn how Snowflake Tasks automate and schedule SQL operations, pipelines, and workflows. Understand how internal scheduling works in a story-driven, practical format.
keywords:
  - Snowflake Tasks
  - Snowflake scheduling
  - automate Snowflake
  - pipeline automation
  - Snowflake workflow
---

# Tasks — How Scheduling Works Internally

## ✨ Story Time — “I Don’t Want to Run Queries Manually”

Meet Nina, a data engineer.  

She wakes up every morning and manually runs the same ETL queries to populate reporting tables.  
- Slow  
- Error-prone  
- Not scalable  

Snowflake solves this with **Tasks**, its built-in **scheduling and automation engine**.

---

## 🧩 What is a Snowflake Task?

A **Task** in Snowflake:

- Automates SQL statements or stored procedures  
- Can be scheduled at fixed intervals or triggered by another Task  
- Integrates with Streams for **incremental pipelines**  

**Key benefit:** Snowflake handles scheduling and execution behind the scenes — no external cron jobs needed.

---

## 🔍 How Tasks Work

1. **Create a simple Task**:

```sql
CREATE OR REPLACE TASK refresh_orders
WAREHOUSE = my_warehouse
SCHEDULE = 'USING CRON 0 * * * * UTC'
AS
INSERT INTO orders_delta
SELECT * FROM orders_stream;
```

* Runs **every hour**
* Consumes new data from `orders_stream`
* Populates `orders_delta` automatically

2. **Start the Task**:

```sql
ALTER TASK refresh_orders RESUME;
```

3. **Check Task history**:

```sql
SELECT *
FROM SNOWFLAKE.ACCOUNT_USAGE.TASK_HISTORY
WHERE TASK_NAME = 'REFRESH_ORDERS';
```

---

## 🎯 Task Scheduling Types

| Type                                | Description                                          |
| ----------------------------------- | ---------------------------------------------------- |
| **Time-based (Cron)**               | Run Tasks at fixed intervals (minutes, hours, days)  |
| **Task Dependency (Chained Tasks)** | Trigger one Task after another finishes              |
| **Stream-driven**                   | Combine with Streams to process **incremental data** |

**Example of Chained Tasks:**

```sql
-- Task A
CREATE TASK load_raw ...
-- Task B dependent on Task A
CREATE TASK transform_data
AFTER load_raw
AS ...
```

This ensures **pipelines execute in order automatically**.

---

## 🧪 Real-World Use Case

**Scenario:** E-commerce pipeline

1. Stream tracks new orders → `orders_stream`
2. Task 1: Load incremental orders into staging → runs every 15 mins
3. Task 2: Transform staging → insert into `orders_delta` → depends on Task 1
4. Task 3: Update dashboards → depends on Task 2

**Result:** Fully automated, near real-time ETL pipeline — no manual intervention.

---

## ⚡ Internal Mechanics of Tasks

* Tasks run on **Snowflake warehouses**
* Automatic retries on failures (configurable)
* Execution logs available via `TASK_HISTORY`
* Tasks can be suspended/resumed anytime
* Chained tasks **respect dependencies** without external orchestration tools

**Magic:** Snowflake ensures **Tasks run exactly once** per scheduled interval and manages state internally.

---

## 🧠 Best Practices

* Use **Tasks + Streams** for incremental pipelines
* Monitor Task history and failures regularly
* Keep warehouses for Tasks **small but adequate** to reduce cost
* Chain Tasks carefully to avoid circular dependencies
* Resume Tasks after maintenance or deployment

---

## 📘 Summary

* **Tasks** automate SQL queries and pipelines in Snowflake.
* They support **time-based scheduling**, **chained execution**, and **stream-driven pipelines**.
* Tasks remove the need for external schedulers or cron jobs.
* They integrate seamlessly with Streams and cloning for robust, automated ETL workflows.
* Understanding Tasks allows you to **build fully automated, cost-efficient, and reliable pipelines** in Snowflake.

---

# 👉 Next Topic

**Materialized Views — When to Use & When to Avoid**

