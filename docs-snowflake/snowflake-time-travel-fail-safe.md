---
id: snowflake-time-travel-fail-safe
title: Time Travel & Fail-Safe — How Snowflake Protects Data
sidebar_label: Time Travel & Fail-Safe
description: Learn how Snowflake Time Travel and Fail-Safe work to protect your data, recover deleted or changed records, and maintain business continuity with a story-driven approach.
keywords:
  - Snowflake Time Travel
  - Snowflake Fail-Safe
  - data recovery Snowflake
  - Snowflake backup
  - Snowflake retention
---

# Time Travel & Fail-Safe — How Snowflake Protects Data

## ✨ Story Time — “Oops! I Deleted Everything”

Imagine a data engineer, Alex, working late at night.  
Alex accidentally runs:

```sql
DROP TABLE orders;
```

Panic sets in.

But Snowflake comes to the rescue with **Time Travel** and **Fail-Safe**.

These features let you **recover deleted or changed data**, almost like a time machine for your tables.

---

## 🧩 What is Time Travel in Snowflake?

**Time Travel** allows you to **access historical data** at any point within a defined retention period.

* Default retention: **1 day (24 hours)** for standard accounts
* Can be extended up to **90 days** for enterprise accounts

You can recover:

* Dropped tables
* Deleted rows
* Updated rows
* Historical versions of a table

### Example:

```sql
-- Restore a dropped table
UNDROP TABLE orders;

-- Query data as of 1 hour ago
SELECT * FROM orders AT (OFFSET => -3600);
```

Time Travel gives you **granular control** over data recovery — down to a timestamp or statement offset.

---

## ⏳ How Time Travel Works

1. Snowflake stores **all changes** to tables in **micro-partitions**.
2. When you query historical data, Snowflake reconstructs it using these micro-partitions.
3. No separate backups are needed; everything is **built-in and optimized**.

**Analogy:** It’s like having a magical undo button that works across hours, days, or even weeks.

---

## 🛡 Fail-Safe — Your Last Line of Defense

Time Travel covers your immediate recovery needs.
But what if something catastrophic happens beyond Time Travel retention?

**Fail-Safe** kicks in:

* Duration: **7 days** (non-configurable)
* Only Snowflake Support can access it
* For **emergency data recovery**

Fail-Safe ensures compliance and business continuity, even for extreme cases like:

* Accidental mass deletes beyond retention
* Storage system failures
* Misconfigured pipelines

**Important:** Fail-Safe is **not for regular operations**; it’s purely emergency use.

---

## 🔍 Practical Use Cases

### ✅ Recover Dropped Table

```sql
UNDROP TABLE customer_orders;
```

### ✅ Query Historical Data

```sql
SELECT *
FROM orders
AT (TIMESTAMP => '2025-11-15 14:00:00');
```

### ✅ Restore Deleted Rows

```sql
INSERT INTO orders
SELECT *
FROM orders
BEFORE (STATEMENT => 123);
```

### ✅ Analyze Historical Versions for Audit

* Finance needs yesterday’s snapshot
* Regulatory compliance requires version history

Time Travel makes it simple to **recreate exact snapshots**.

---

## ⚡ Key Differences: Time Travel vs Fail-Safe

| Feature     | Time Travel                      | Fail-Safe                |
| ----------- | -------------------------------- | ------------------------ |
| Access      | Self-service via SQL             | Snowflake Support only   |
| Duration    | 1–90 days (configurable)         | 7 days (fixed)           |
| Use case    | Recovery, auditing, rollback     | Emergency recovery only  |
| Granularity | Per statement, timestamp, offset | Entire table recovery    |
| Cost        | Storage counted in Snowflake     | Included in base storage |

---

## 🧠 Best Practices

* **Enable extended Time Travel** for critical tables.
* **Use Time Travel for auditing and rollback** during pipeline runs.
* **Do not rely on Fail-Safe for regular recovery**; it’s emergency-only.
* Combine with **cloning** to test pipeline changes without risk.
* Monitor your **retention usage** to avoid storage surprises.

---

## 📘 Summary

* **Time Travel** allows point-in-time recovery of tables, rows, or versions.
* **Fail-Safe** provides a 7-day emergency recovery window, handled by Snowflake Support.
* Together, they **protect your data from mistakes, disasters, or audits**.
* Ideal for critical tables in analytics, finance, and operational pipelines.
* Snowflake’s architecture uses **micro-partitions** and **metadata tracking** to make recovery fast, simple, and reliable.

Time Travel + Fail-Safe = Snowflake’s magical shield for your data.

---

# 👉 Next Topic

**Zero-Copy Cloning — The Most Powerful Snowflake Feature**

