---
id: databricks-multi-task-job-workflows
title: Multi-Task Job Workflows — Dependencies Across Tasks
sidebar_label: Multi-Task Workflows
description: A modern, story-driven guide explaining Databricks Multi-Task Job Workflows, task dependencies, orchestration patterns, job clusters, retry logic, and real production use cases for building end-to-end data pipelines.
keywords:
  - databricks multi task job
  - databricks workflows
  - databricks job dependencies
  - databricks orchestration
  - databricks pipeline automation
  - databricks ETL workflow
  - databricks production pipelines
---

# Multi-Task Job Workflows — Dependencies Across Tasks

## 🎬 Story Time — “One Task Fails And Everything Breaks…”

Arjun, a senior data engineer, maintains a pipeline that:

1. Extracts data from APIs  
2. Cleans & transforms it  
3. Loads it to Delta Lake  
4. Validates quality  
5. Sends success notifications  

Unfortunately, these steps were **split across five separate jobs**.

When the extraction job fails, the transform job still runs.  
When transformation fails, the notification job still says “pipeline completed.”  

Arjun sighs:

> “I need something that ties everything together… with dependencies… and intelligence.”

Enter **Databricks Multi-Task Job Workflows** — the Lakehouse-native orchestration layer.

---

## 🔥 1. What Are Multi-Task Job Workflows?

A **workflow** in Databricks is a single job that contains multiple tasks with:

- Task dependencies  
- Conditional logic  
- Modular execution  
- Shared compute clusters  
- Automatic DAG orchestration  

Perfect for building **end-to-end ETL pipelines** in a single pane.

---

## 🧱 2. Creating a Multi-Task Workflow

Arjun opens:

**Workflows → Jobs → Create Job**

Then clicks **“Add Task”** multiple times.

Example workflow:

```

extract → transform → load → validate → notify

```

Each task can be:

- Notebook  
- Python script  
- SQL query  
- JAR  
- Delta Live Table pipeline  
- dbt task (new)  
- dbt CLI runner  
- Or a combination  

---

## 🔗 3. Defining Task Dependencies

Databricks uses a clean dependency UI:

```

[extract] → [transform] → [load]
↓
[validate]
↓
[notify]

```

A task only runs **after its upstream tasks succeed**.

### Example:

```json
{
  "task_key": "transform",
  "depends_on": [{"task_key": "extract"}]
}
```

Dependencies can form:

* Linear DAGs
* Fan-in DAGs
* Fan-out DAGs
* Branching pipelines

---

## 🧪 4. Example: Notebook-Based Multi-Task Pipeline

### Step 1 — Extract

```python
df_raw = spark.read.format("json").load("/mnt/raw/api_logs/")
df_raw.write.format("delta").mode("overwrite").save("/mnt/stage/logs_raw")
```

### Step 2 — Transform

```python
df = spark.read.format("delta").load("/mnt/stage/logs_raw")
df_clean = df.filter("event IS NOT NULL")
df_clean.write.format("delta").mode("overwrite").save("/mnt/clean/logs_clean")
```

### Step 3 — Validation

```python
from pyspark.sql import functions as F

df = spark.read.format("delta").load("/mnt/clean/logs_clean")
if df.filter(F.col("event").isNull()).count() > 0:
    raise Exception("Data validation failed")
```

### Step 4 — Notify

```python
dbutils.notebook.exit("Success: ETL Pipeline Completed")
```

---

## ⚙️ 5. Shared Job Cluster

Arjun selects:

* **Job cluster** (cheaper than all-purpose clusters)
* Applies it to all tasks
* Auto-terminate after 5 minutes

This avoids cluster spin-ups for every task.

---

## 🔄 6. Retry Logic Per Task

Instead of retrying the whole job:
Arjun can retry only the **failing task**.

Task-level retry settings:

* Retry attempts
* Backoff
* Timeout
* Cluster retry vs task retry

This makes workflows extremely resilient.

---

## 🧯 7. Error Handling Across Tasks

Databricks supports:

* ✔ Stop entire pipeline on failure

* ✔ Run downstream tasks only if upstream succeeds

* ✔ Add "failure notification" as a separate branch

* ✔ On-failure triggers for Slack/email

Example branch:

```
validate_failed → slack_alert
```

---

## 🌉 8. Branching Logic Inside Workflows

Arjun builds a logic:

```
high_volume → process_big_data
else → process_small_data
```

Branches allow conditional processing depending on:

* Input size
* Date
* Event type
* External parameters

This is Databricks' version of lightweight if-else orchestration.

---

## 📊 9. Real-World Enterprise Use Cases

### ⭐ Finance

Multi-step risk scoring → aggregation → validation → reporting.

### ⭐ Retail

Daily SKU extraction → price rules → promotions → BI delivery.

### ⭐ Healthcare

PHI ingestion → anonymization → validation → controlled-zone storage.

### ⭐ Logistics

GPS ingest → cleaning → route clustering → ML scoring → dashboard refresh.

### ⭐ Manufacturing

Sensor data → dedupe → QC → anomaly detection.

---

## 🧠 Best Practices

1. Keep tasks **modular** (single purpose per task)
2. Use **job clusters** for cost control
3. Add **alerts + slack notifications**
4. Add **validation task** before loading curated data
5. Use **task parameters** instead of hardcoding
6. Enable **run-as** service principals for security
7. Store job configs in repos for version control

---

## 🎉 Real-World Ending — “The Pipeline is Finally Smart”

Now Arjun’s ETL:

* understands dependencies
* retries failures automatically
* alerts the team instantly
* uses clean DAG orchestration
* cuts compute cost with shared job clusters

His manager says:

> “This is the pipeline architecture we should have done years ago.”

And everyone finally stops blaming Arjun’s pipelines.

---

## 📘 Summary

Databricks Multi-Task Job Workflows provide:

* ✔ DAG orchestration

* ✔ Multiple task types

* ✔ Dependency management

* ✔ Shared job clusters

* ✔ Conditional branching

* ✔ Retry & alerting

* ✔ Production-grade pipeline automation

A core building block for **enterprise-scale data workflows**.

---

# 👉 Next Topic

**Databricks Workflows (New) — Production Orchestration**
