---
id: snowflake-snowpipe
title: Snowpipe — Real-Time Streaming Load with Example Pipeline
sidebar_label: Snowpipe
description: Beginner-friendly guide to Snowflake Snowpipe for real-time data loading, including setup, streaming pipelines, and real company example.
keywords:
  - Snowflake Snowpipe
  - Snowflake real-time load
  - Snowpipe streaming
  - Snowflake continuous data load
  - Snowflake ETL automation
---

# Snowpipe — Real-Time Streaming Load with Example Pipeline

Welcome back to **RetailCo**, our fictional retail company.  
Alice, the data engineer, has been using COPY INTO for batch loading daily sales data. Now the **marketing team wants real-time sales data for dashboards**.

> “We need **Snowpipe** — it continuously loads data as it arrives, without waiting for daily batches,” Alice explains.

Let’s explore **Snowpipe**, how it works, and a **real-world example**.

---

## 🏗️ What Is Snowpipe?

**Snowpipe** is Snowflake’s **serverless, continuous data ingestion service**:

- Loads data automatically from **stages** (internal or external)  
- Supports **event-driven or scheduled triggers**  
- Scales automatically for incoming data  
- Ideal for **real-time dashboards and analytics**

**RetailCo example:** Sales CSVs arrive in S3 every minute. Snowpipe immediately loads them into Snowflake for analytics.

---

## 🔹 Snowpipe Architecture

1. **External Stage** → e.g., `s3://retailco-realtime-sales`  
2. **File Arrival Event** → triggers Snowpipe automatically  
3. **Snowflake Table** → data loaded continuously  
4. **Optional Transformation** → downstream pipelines or dashboards

Visual flow:

```

S3 Bucket (New File) → Event Notification → Snowpipe → SALES Table → BI Dashboard

```

---

## 🔹 Setting Up Snowpipe

### Step 1: Create an External Stage

```sql
CREATE STAGE REALTIME_SALES_STAGE
URL='s3://retailco-realtime-sales/'
CREDENTIALS=(AWS_KEY_ID='YOUR_KEY' AWS_SECRET_KEY='YOUR_SECRET')
FILE_FORMAT=(TYPE=CSV FIELD_OPTIONALLY_ENCLOSED_BY='"' SKIP_HEADER=1);
```

### Step 2: Create Snowpipe

```sql
CREATE PIPE SALES_PIPE
AUTO_INGEST=TRUE
AS
COPY INTO SALES
FROM @REALTIME_SALES_STAGE
FILE_FORMAT=(TYPE=CSV);
```

* `AUTO_INGEST=TRUE` → Snowpipe loads files automatically upon arrival
* No manual COPY INTO required

---

### Step 3: Configure Cloud Event Notifications

**RetailCo S3 example:**

* Enable S3 **event notifications** to trigger Snowpipe when a new CSV is uploaded
* Snowpipe receives the event and loads the file immediately

---

## 🔹 Monitoring Snowpipe

* Use **Snowflake’s `LOAD_HISTORY` view** to track file load status:

```sql
SELECT *
FROM TABLE(INFORMATION_SCHEMA.LOAD_HISTORY(
    PIPE_NAME=>'SALES_PIPE',
    START_TIME=>DATEADD('hour', -1, CURRENT_TIMESTAMP)
));
```

* Ensures **real-time visibility** into ingestion

---

## 🧩 RetailCo Real-Time Pipeline

1. Marketing team uploads sales CSVs every minute to S3
2. S3 triggers Snowpipe automatically
3. Snowpipe loads data into `SALES` table
4. BI dashboard reflects near real-time sales updates
5. Alice monitors load history for errors

**Outcome:** Continuous, automated, and near real-time data availability without manual intervention.

---

## 🧠 Best Practices

1. **Use external stages** (S3, Azure, GCS) for scalability
2. **Enable AUTO_INGEST** for event-driven ingestion
3. **Use proper file formats** (CSV, JSON, Parquet)
4. **Monitor load history** regularly
5. **Archive or clean up files** to control storage costs
6. Combine Snowpipe with **tasks** for downstream transformations

---

## 🏁 Quick Summary 

* **Snowpipe** = serverless, continuous data ingestion for Snowflake
* **Key benefits:** real-time data loading, automated, scalable
* **Setup:** external stage → Snowpipe → table → optional downstream tasks
* **Best practices:** event notifications, file formats, monitoring, and storage management
* Enables **real-time dashboards and analytics** without manual intervention

---

# 🚀 Coming Next

👉 **Incremental Loading (CDC) in Snowflake — 5 Real Techniques**


