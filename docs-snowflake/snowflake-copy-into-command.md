---
id: snowflake-copy-into-command
title: COPY INTO Command — Complete Guide with All Options
sidebar_label: COPY INTO Command
description: Beginner-friendly, story-driven guide to Snowflake COPY INTO command, explaining all options, file formats, and real-world use cases.
keywords:
  - Snowflake COPY INTO
  - Snowflake data loading
  - Snowflake ETL
  - Snowflake load command
  - Snowflake staging
---

# COPY INTO Command — Complete Guide with All Options

Welcome back to **RetailCo**, our fictional retail company.  
Alice, the data engineer, now has **staged data files** and needs to **load them into Snowflake tables** efficiently.  

> “The COPY INTO command is like a **magic wand** — it moves data from your stage into tables safely and quickly,” she explains.

Let’s explore **how COPY INTO works**, all its options, and real-world use cases.

---

## 🏗️ What Is COPY INTO?

The **COPY INTO** command loads data **from a stage (internal or external) into a Snowflake table**.  

Basic syntax:

```sql
COPY INTO <table_name>
FROM <stage_name>
FILE_FORMAT = (TYPE = CSV)
ON_ERROR = 'CONTINUE';
```

* `<table_name>` → destination table
* `<stage_name>` → internal or external stage
* `FILE_FORMAT` → CSV, JSON, Parquet, etc.
* `ON_ERROR` → what to do if errors occur

---

## 🔹 Key Options

### 1️⃣ FILE_FORMAT

Specifies how Snowflake interprets files:

```sql
FILE_FORMAT = (TYPE = CSV FIELD_OPTIONALLY_ENCLOSED_BY='"' SKIP_HEADER=1)
```

Other formats: JSON, PARQUET, ORC.

---

### 2️⃣ ON_ERROR

Controls error handling:

| Option          | Behavior                                   |
| --------------- | ------------------------------------------ |
| CONTINUE        | Skip bad files/rows, continue loading      |
| ABORT_STATEMENT | Stop the load if an error occurs (default) |
| SKIP_FILE       | Skip the entire file if an error occurs    |

**RetailCo example:** Alice uses `ON_ERROR='CONTINUE'` to skip malformed CSV rows while loading daily sales.

---

### 3️⃣ PATTERN

Load only specific files matching a regex:

```sql
COPY INTO SALES
FROM @RAW_SALES_STAGE
FILE_FORMAT = (TYPE=CSV)
PATTERN = '.*_jan.csv';
```

* Only files ending with `_jan.csv` are loaded
* Useful for incremental loads

---

### 4️⃣ FORCE

Forces reload of files even if they were already loaded:

```sql
COPY INTO SALES
FROM @RAW_SALES_STAGE
FILE_FORMAT = (TYPE=CSV)
FORCE = TRUE;
```

* Default: Snowflake **tracks loaded files** to avoid duplicates
* Use FORCE only if you want to reload intentionally

---

### 5️⃣ PURGE

Deletes files after successful load (internal stages only):

```sql
COPY INTO SALES
FROM @%SALES
FILE_FORMAT = (TYPE=CSV)
PURGE = TRUE;
```

* Keeps internal stages clean
* Saves storage costs

---

### 6️⃣ VALIDATION_MODE

Check files without actually loading:

```sql
COPY INTO SALES
FROM @RAW_SALES_STAGE
VALIDATION_MODE = RETURN_ERRORS;
```

* Useful for **pre-checking data quality**

---

## 🧩 Real-World Use Case — RetailCo

1. Daily sales CSVs arrive in `@RAW_SALES_STAGE`
2. Alice runs:

```sql
COPY INTO SALES
FROM @RAW_SALES_STAGE
FILE_FORMAT=(TYPE=CSV FIELD_OPTIONALLY_ENCLOSED_BY='"' SKIP_HEADER=1)
ON_ERROR='CONTINUE'
PATTERN='.*_2025-11-27.csv';
```

3. Bad rows are skipped, valid rows load into table
4. Stage files are automatically purged after loading:

```sql
COPY INTO SALES
FROM @%SALES
PURGE = TRUE;
```

Result: **Clean, efficient, and automated daily data load workflow**.

---

## 🧠 Best Practices

1. Always **define a file format** matching your data
2. Use **ON_ERROR** wisely to handle unexpected data
3. Apply **PATTERN** for incremental or selective loads
4. Use **PURGE** for internal stages to save storage
5. Test with **VALIDATION_MODE** before production load
6. Leverage **FORCE** only when necessary to reload

---

## 🏁 Quick Summary 

* **COPY INTO** = primary command to load data from stages into Snowflake tables
* Key options: **FILE_FORMAT, ON_ERROR, PATTERN, FORCE, PURGE, VALIDATION_MODE**
* Supports **internal and external stages**
* Best practices: proper file formats, error handling, incremental loads, and stage cleanup
* Enables **fast, reliable, and production-ready ETL workflows**

---

# 🚀 Coming Next

👉 **Snowpipe — Real-Time Streaming Load with Example Pipeline**


