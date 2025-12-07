---
id: snowflake-external-stages
title: External Stages (S3, Azure, GCS) — Real Company Setup Example
sidebar_label: External Stages
description: Beginner-friendly, story-driven guide to Snowflake external stages, including S3, Azure Blob, and Google Cloud Storage setup with real-world examples.
keywords:
  - Snowflake external stage
  - Snowflake S3 stage
  - Snowflake Azure stage
  - Snowflake GCS stage
  - Snowflake cloud storage
---

# External Stages (S3, Azure, GCS) — Real Company Setup Example

Welcome back to **RetailCo**, our fictional retail company.  
Alice, the data engineer, now wants to **load large amounts of historical sales data stored in AWS S3** into Snowflake.  

> “Internal stages are great for small loads,” she explains, “but for large datasets or multi-team projects, we use **external stages**.”

Let’s explore **Snowflake external stages** and see how RetailCo sets them up.

---

## 🏗️ What Are External Stages?

An **external stage** is a reference to a **cloud storage location outside Snowflake**, such as:

- **AWS S3**  
- **Azure Blob Storage**  
- **Google Cloud Storage (GCS)**  

**Benefits:**

- Handle **large datasets** efficiently  
- Share data between multiple Snowflake accounts  
- Integrate with **data lakes or pipelines**  
- Secure access with cloud credentials  

**RetailCo example:** Historical sales CSVs and JSON files sit in an S3 bucket. Alice wants to stage them in Snowflake without copying them internally.

---

## 🔹 1️⃣ Setting Up an S3 External Stage

**Step 1: Create an S3 bucket**

- Bucket name: `retailco-sales-data`  
- Folders: `/raw`, `/processed`  

**Step 2: Create IAM user for Snowflake**

- Permissions: `s3:GetObject`, `s3:ListBucket`  
- Access key & secret key stored securely  

**Step 3: Create Snowflake stage**

```sql
CREATE STAGE S3_SALES_STAGE
  URL='s3://retailco-sales-data/raw/'
  CREDENTIALS=(
    AWS_KEY_ID='YOUR_AWS_KEY'
    AWS_SECRET_KEY='YOUR_AWS_SECRET'
  )
  FILE_FORMAT=(TYPE=CSV FIELD_OPTIONALLY_ENCLOSED_BY='"' SKIP_HEADER=1);
````

**Step 4: Load data into Snowflake table**

```sql
COPY INTO SALES
FROM @S3_SALES_STAGE
ON_ERROR='CONTINUE';
```

Result: Large CSVs are loaded directly from S3 into the `SALES` table without storing them in Snowflake permanently first.

---

## 🔹 2️⃣ Azure Blob Storage Example

**RetailCo has customer data in Azure Blob Storage.** Steps:

```sql
CREATE STAGE AZURE_CUSTOMERS_STAGE
  URL='azure://retailco.blob.core.windows.net/raw/customers/'
  CREDENTIALS=(AZURE_SAS_TOKEN='YOUR_SAS_TOKEN')
  FILE_FORMAT=(TYPE=PARQUET);
```

* Parquet files loaded efficiently
* Supports incremental updates with COPY INTO

```sql
COPY INTO CUSTOMERS FROM @AZURE_CUSTOMERS_STAGE;
```

---

## 🔹 3️⃣ Google Cloud Storage (GCS) Example

**RetailCo also uses GCS for analytics data.**

```sql
CREATE STAGE GCS_ANALYTICS_STAGE
  URL='gcs://retailco-analytics/raw/'
  CREDENTIALS=(GCP_KEY='YOUR_GCP_KEY_JSON')
  FILE_FORMAT=(TYPE=JSON);
```

* Load JSON logs directly into Snowflake tables
* Ideal for multi-cloud environments

```sql
COPY INTO ANALYTICS_LOGS FROM @GCS_ANALYTICS_STAGE;
```

---

## 🧠 Best Practices for External Stages

1. Use **dedicated cloud storage buckets** per project or team
2. Set **least privilege permissions** for credentials
3. Use **file formats matching your data** (CSV, JSON, Parquet)
4. Monitor **cloud storage costs** when staging large datasets
5. Clean up or archive files after loading if possible

**RetailCo Tip:** Store raw files in `/raw` and processed files in `/processed` folders to avoid overwriting important data.

---

## 🧩 Story Recap — RetailCo External Stages in Action

1. Alice creates **S3, Azure, and GCS stages** for different datasets
2. ETL jobs COPY INTO Snowflake tables from external stages
3. Teams across RetailCo access raw and processed data without creating multiple copies
4. Data remains secure via cloud credentials and Snowflake RBAC

Result: **Efficient, scalable, and secure data loading from external cloud storage**.

---

## 🏁 Quick Summary 

* **External stages** allow Snowflake to read files directly from S3, Azure, or GCS
* **Benefits:** scalability, multi-team collaboration, cloud integration
* **Setup:** create stage, provide credentials, specify file format, and load data using COPY INTO
* **Best practices:** organize buckets, secure credentials, monitor costs, and clean up after load

---

# 🚀 Coming Next

👉 **File Formats (CSV, JSON, Parquet) — With Story and Use Cases**

