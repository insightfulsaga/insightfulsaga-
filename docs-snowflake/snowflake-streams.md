---
id: snowflake-streams
title: Streams — Change Data Capture at Table Level
sidebar_label: Streams
description: Learn how Snowflake Streams enable Change Data Capture (CDC) at the table level, track inserts, updates, and deletes, and integrate with pipelines efficiently in a story-driven format.
keywords:
  - Snowflake Streams
  - change data capture Snowflake
  - CDC Snowflake
  - Snowflake incremental data
  - Snowflake table streams
---

# Streams — Change Data Capture at Table Level

## ✨ Story Time — “How Do I Track Changes Without Breaking Everything?”

Meet Leo, a data engineer.  
His company wants to **process only new or updated orders** from their massive `orders` table every day.  

Without Streams, Leo has two painful options:

1. **Full table scan**: Scan billions of rows every time — slow and expensive.  
2. **Manual tracking**: Add “last updated” columns and logic — prone to errors.  

Snowflake provides a **magical feature called Streams** that solves this elegantly.

---

## 🧩 What is a Snowflake Stream?

A **Stream** is like a **watcher** on a table.  

- Tracks **INSERT, UPDATE, DELETE** operations  
- Records changes since the last time the stream was consumed  
- Supports **incremental processing** without scanning the full table  

**Key benefit:** You get **only the new or changed data** automatically.

---

## 🔍 How Streams Work

1. Create a Stream on a table:

```sql
CREATE OR REPLACE STREAM orders_stream 
ON TABLE orders
SHOW_INITIAL_ROWS = TRUE;
```

2. Query the Stream:

```sql
SELECT * FROM orders_stream;
```

3. Snowflake returns:

* Newly inserted rows
* Updated rows with **before/after** images
* Deleted rows with **metadata**

4. Consume the Stream in a pipeline:

```sql
INSERT INTO orders_delta
SELECT * FROM orders_stream;
```

After consumption, the Stream automatically **tracks only new changes** next time.

---

## 🎯 Types of Streams

| Stream Type                 | Description                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------- |
| Standard Stream             | Tracks changes (insert, update, delete) on a table                                     |
| Append-Only Stream          | Tracks only new rows inserted                                                          |
| Table Stream vs View Stream | Table streams are tied to a table; view streams track changes from the underlying view |

---

## 🧪 Real-World Use Case

**Scenario:** Marketing analytics wants to process only new orders for dashboards:

1. Create Stream on `orders` table
2. Pipeline reads `orders_stream` every hour
3. Only new/changed orders are inserted into reporting table

**Result:**

* Avoids scanning billions of rows
* Reduces warehouse costs
* Ensures real-time or near-real-time analytics

---

## ⚡ Benefits of Streams

* **Incremental processing**: Only process changed data
* **Pipeline efficiency**: Avoid full table scans
* **Simplifies CDC**: Built-in Snowflake feature, no manual tracking
* **Works with Tasks**: Automate consumption in scheduled jobs
* **Supports recovery**: Works with Time Travel to recover missed changes

---

## 🧠 Best Practices

* Always **consume Streams regularly** to avoid excessive metadata
* Use **Tasks** to automate Stream processing
* Combine Streams with **Zero-Copy Cloning** for safe testing
* Use **Append-Only Streams** for logs or event tables
* Monitor **lag** in Stream consumption for large tables

---

## 📘 Summary

* **Streams** are Snowflake’s built-in solution for **Change Data Capture**.
* They track **inserts, updates, and deletes** at the table level.
* Streams enable **incremental ETL pipelines**, reducing cost and improving performance.
* They integrate perfectly with **Tasks, Time Travel, and Zero-Copy Cloning** for safe and automated workflows.
* Ideal for analytics, reporting, and any scenario where only **new or changed data matters**.

---

# 👉 Next Topic

**Tasks — How Scheduling Works Internally**


