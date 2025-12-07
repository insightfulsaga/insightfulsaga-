---
id: databricks-dbfs
title: Databricks DBFS — Internal File System Explained
sidebar_label: Databricks DBFS
description: Beginner-friendly explanation of Databricks DBFS (Databricks File System), including how it works, commands, and real business examples.
keywords:
  - Databricks DBFS
  - Databricks file system
  - DBFS tutorial
  - Databricks internal storage
  - Databricks beginners guide
---

# Databricks DBFS — Internal File System Explained

Welcome back to **ShopWave**, our fictional retail company.  
You’ve built notebooks, set up clusters, and secured access—but now a question pops up:

> **“Where do we actually store all these files and datasets inside Databricks?”**

Enter **DBFS — Databricks File System**.

---

## 🗂️ What Is DBFS?

DBFS is **Databricks’ built-in file system**, a layer on top of cloud storage (AWS S3, Azure ADLS, or GCP GCS) that makes it **look and behave like a local filesystem**.

Think of it as:

> **“A Google Drive inside your Databricks workspace.”**

It lets you:

- Read and write files  
- Store notebooks, datasets, models  
- Share files between clusters and notebooks  
- Access cloud storage seamlessly  

---

## 🔥 Why DBFS Matters

DBFS is important because:

1. **Unified access** — Any cluster can access the same files.  
2. **Seamless integration** — Works with Spark, Python, R, Scala, SQL.  
3. **Persistent storage** — Files persist even if clusters are terminated.  
4. **Organized structure** — Personal workspace, shared workspace, temporary storage.  

ShopWave stores **raw sales data, cleaned datasets, ML models, and experiment outputs** in DBFS to keep everything organized.

---

## 🗂️ DBFS Structure

Here’s how DBFS is organized:

```

/dbfs
├── /FileStore
│    ├── /datasets
│    ├── /models
│    └── /temp
├── /mnt
│    └── /external_cloud_storage_mounts
└── /tmp
└── /temporary_files

```

- `/FileStore` → User-uploaded files, notebooks, datasets  
- `/mnt` → Mount points for external cloud storage  
- `/tmp` → Temporary files during execution  

**Example:** ShopWave uploads their CSV sales file to `/FileStore/datasets/sales.csv`.

---

## 💻 Accessing DBFS

### 1️⃣ Using Python / Spark

```python
# Read CSV from DBFS
sales_df = spark.read.csv("/FileStore/datasets/sales.csv", header=True, inferSchema=True)
sales_df.show(5)

# Write DataFrame back to DBFS
sales_df.write.parquet("/FileStore/datasets/sales_parquet")
```

### 2️⃣ Using SQL

```sql
-- Read a Delta table stored in DBFS
SELECT * FROM delta.`/FileStore/datasets/sales_delta`
```

### 3️⃣ Using CLI

```bash
# List files
databricks fs ls dbfs:/FileStore/datasets

# Copy local file to DBFS
databricks fs cp local_file.csv dbfs:/FileStore/datasets/

# Remove a file
databricks fs rm dbfs:/FileStore/datasets/old_file.csv
```

---

## 🔗 Mounting External Storage

DBFS can **mount cloud storage**, making it appear as part of the filesystem:

```
/mnt/s3_sales_data
/mnt/adls_customer_data
```

ShopWave mounts AWS S3 buckets containing raw sales and inventory data to `/mnt`, then accesses them through Spark without worrying about bucket paths each time.

---

## 🏢 Real Business Example — ShopWave

**Scenario:** ShopWave is building a recommendation engine.

1. Engineers upload product and sales CSVs to `/FileStore/datasets`.
2. Data scientists read these files from notebooks to train ML models.
3. Transformed data is written back as Delta tables in `/FileStore/models`.
4. BI dashboards access aggregated results from the same location.

DBFS ensures **all teams work with the same files**, avoiding duplication or version conflicts.

---

## 🧠 Quick Tips

* Use `/FileStore` for shared files within Databricks.
* Use `/mnt` for mounted cloud storage.
* Use `/tmp` for temporary files during workflows.
* Always clean up unused files to save storage costs.
* Leverage DBFS commands in notebooks or CLI for automation.

---

## 🏁 Quick Summary 

* **DBFS** is Databricks’ internal file system, providing persistent storage for notebooks, datasets, and models.
* Organizes data in `/FileStore`, `/mnt`, and `/tmp`.
* Allows seamless integration with **Python, SQL, R, Scala, Spark, and external cloud storage**.
* Critical for collaboration across **data engineers, analysts, and scientists**.
* Makes workflows more **efficient, organized, and scalable**.

---

# 🚀 Coming Next

👉 ** Databricks Pricing — How Clusters, SQL & Jobs Are Charged**

