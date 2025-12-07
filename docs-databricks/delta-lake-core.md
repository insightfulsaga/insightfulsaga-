---
id: delta-lake-core
title: Delta Lake – Foundation of Reliable Data Pipelines
sidebar_label: Delta Lake Overview
---

**Story Driven**

A company had a huge warehouse full of documents (data). People were dropping files anywhere, updating them without telling anyone, and sometimes files went missing. It was chaotic.

Then they hired Delta Lake, a smart warehouse manager. Here’s what Delta Lake did:-       
⦁	Logged every change with timestamps (so you could undo mistakes).       
⦁	Checked the format of all incoming documents to avoid corruption.      
⦁	Enabled people to edit files safely without overwriting others’ work.     
⦁	Made searching for documents much faster with indexing.       

Now, the company runs faster, cleaner, and with fewer mistakes. Delta Lake turned the messy warehouse into a well-run data system.


**Profesional Explanation:**

Delta Lake is an open-source storage layer that brings ACID transactions, schema enforcement, and time travel (versioning) to your data lake. It allows you to use data lakes (like those built on S3, ADLS, or HDFS) with the reliability of a database, enabling scalable, reliable data pipelines and analytics and it is stored in formats like Parquet.
   
Upserts – Adds new customers or updates old ones.

Schema Evolution – Automatically handles new info (e.g., "birthday" added later).

Time Travel – Lets you check yesterday’s list in case of mistakes.



## Code : Real-World Scenario
**Problem:** Managing Data on a Data Lake Without Delta Lake

Let’s walk through what it looks like to read, write, and update data without Delta Lake (just using Parquet on S3 or HDFS).

## Upserts
**🚫 Without Delta Lake (Raw Parquet on S3)**
```python
# Read CSV file
df = spark.read.csv("/raw/sales.csv", header=True, inferSchema=True)
```
```python
# Write to S3 in Parquet format (no transactional control)
df.write.mode("overwrite").parquet("s3://data-lake/silver/sales/")
```

⚠️ Update/Upsert is Hard (No MERGE, No Transactions)

**To update records, you'd have to:-**
- Read existing Parquet data.
- Read new/updated data.
- Perform join & logic in Spark.
- Overwrite the entire dataset.

```python
# Read existing Parquet
existing_df = spark.read.parquet("s3://data-lake/silver/sales/")
```
```python
# Read new data
updates_df = spark.read.csv("/raw/updates.csv", header=True, inferSchema=True)
```
```python
# Perform upsert manually
from pyspark.sql.functions import col

# Keep records that are NOT in the updates (i.e., unmatched by ID)
unchanged_df = existing_df.join(updates_df, on="id", how="left_anti")

# Combine updated + unchanged
final_df = unchanged_df.unionByName(updates_df)

# Overwrite full dataset (expensive, risky!)
final_df.write.mode("overwrite").parquet("s3://data-lake/silver/sales/")
```

**❌ Drawbacks:-**
* No schema enforcement or evolution.
* No ACID guarantees — overwrites can cause data loss.
* Complex and inefficient upserts.
* No versioning or time travel.
* Difficult to audit or track changes.

**✅ With Delta Lake**
```python
# Ingest & Save as Delta
df = spark.read.csv("/raw/sales.csv", header=True, inferSchema=True)
df.write.format("delta").mode("overwrite").save("/data/silver/sales/")
```

**Perform Upsert with DeltaTable API**
```python
from delta.tables import DeltaTable 

# Load existing Delta Table
existing = DeltaTable.forPath(spark, "/data/silver/sales/")

# Load new updates
new_data = spark.read.csv("/raw/updates.csv", header=True, inferSchema=True)

# Merge (Upsert)
existing.alias("old") \
.merge(new_data.alias("new"), "old.id = new.id") \
.whenMatchedUpdateAll() \
.whenNotMatchedInsertAll() \
.execute()
```

**✅ Benefits:**
* ACID transactions ✅
* Easy upserts/merges ✅
* Schema enforcement & evolution ✅
* Time travel/versioning ✅
* Efficient reads with indexing (Z-Ordering) ✅


**Schema Evolution**   

<u>🧩 Problem:</u>

New data has extra columns (e.g., "birthday"), and you want to append without manually altering the table schema.

<u>✅ Solution:</u>

Delta Lake supports automatic schema evolution with mergeSchema.

🔧 Code:
```python
df = spark.read.csv("/mnt/raw/new_customers.csv", header=True)

df.write.format("delta") \
  .option("mergeSchema", "true") \
  .mode("append") \
  .save("/mnt/silver/customers/")
```

**📝 What it does:**   

Detects new columns (like "birthday")
Merges them into the existing schema automatically
Avoids failures from schema mismatch

## Schema Evolution – Real-World Scenario
**Scenario:**
New data has a new column (e.g., birthday).
You want to append it to an existing table without errors.

**❌ Without Delta Lake (Parquet only)**

Appending a file with new columns will fail or drop columns silently, depending on settings. You must:-  
Manually update schema
Reprocess or rewrite the entire dataset

```python
# This may fail or ignore 'birthday' column
df = spark.read.csv("/mnt/raw/new_customers.csv", header=True)

df.write.mode("append").parquet("/mnt/silver/customers/")

```
**⚠️ Problems:**
- No schema validation
- Manual handling required
- Risk of silent data loss or inconsistency

**✅ With Delta Lake (Schema Evolution Made Easy)**

Delta Lake automatically merges the new schema when enabled.

```python
df = spark.read.csv("/mnt/raw/new_customers.csv", header=True)

df.write.format("delta") \
  .option("mergeSchema", "true") \
  .mode("append") \
  .save("/mnt/silver/customers/")

```

**✅ Benefits:**
* New columns (like birthday) are added automatically
* No data loss, no manual updates
* Clean and scalable schema management


## Time Travel
**🧩 Scenario:**
You need to query historical data — an earlier version of your dataset — to recover from mistakes or audit changes.

**❌ Without Delta Lake**
- No built-in versioning.
- To track changes, you’d have to manually save copies or snapshots.
- Complex and error-prone to manage.

**✅ With Delta Lake (Built-in Time Travel)**
Read data as it was at a specific version or timestamp easily:


```python
# Read data at a specific version
spark.read.format("delta") \
  .option("versionAsOf", 1) \
  .load("/mnt/silver/customers/")

# Or read data as of a specific timestamp
spark.read.format("delta") \
  .option("timestampAsOf", "2024-07-01") \
  .load("/mnt/silver/customers/")

```

**📝 Benefits:**
* Query any previous snapshot instantly
* Undo errors or compare changes
* Simplifies data auditing and debugging



## Summary table     

| Feature             | Without Delta Lake          | With Delta Lake                      |
|---------------------|----------------------------|------------------------------------|
| **Updates**         | Manual overwrite           | Easy `update()` or `merge()`       |
| **Versioning**      | Not supported              | Yes: Time Travel supported         |
| **Schema validation** | Manual, error-prone        | Automatic enforcement              |
| **Atomic operations**| Not guaranteed             | ACID transactions supported        |
| **Performance**     | Slower for large datasets  | Optimized via transaction logs     |




## 🔑 1-Minute Summary:  Delta Lake – Foundation of Reliable Data Pipelines

**Step 1: Upserts (Without vs With Delta Lake)**      
<u>Without Delta:</u> Manual join, overwrite entire dataset — risky and inefficient.        
<u>With Delta:</u> Use merge() to safely update or insert records.   

**Step 2: Schema Evolution**     
<u>Without Delta:</u> Fails or silently ignores new columns — requires manual fixes.   
<u>With Delta:</u> Use mergeSchema to automatically handle new columns (e.g., birthday).  

**Step 3: Time Travel**     
<u>Without Delta:</u> No versioning — must manually save snapshots.   
<u>With Delta:</u> Use versionAsOf or timestampAsOf to query historical data instantly.   

**Step 4: Performance & Reliability**     
Delta's transaction logs optimize reads, enable caching, and ensure safe concurrent writes.   