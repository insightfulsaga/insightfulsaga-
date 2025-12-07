---
id: snowflake-costs-billing-dashboard-monitoring
title: Snowflake Costs & Billing Dashboard — Monitoring Tips
sidebar_label: Costs & Billing
description: A practical, story-driven guide to monitoring Snowflake costs using the Billing Dashboard, Resource Monitors, Query History, and best practices for cost optimization across compute, storage, and cloud services.
keywords:
  - Snowflake cost optimization
  - Snowflake billing dashboard
  - Snowflake credit usage
  - Snowflake cost monitoring
  - snowflake query history
  - snowflake warehouse optimization
  - snowflake resource monitors
---

# Snowflake Costs & Billing Dashboard — Monitoring Tips

## 🎬 Story Time — “Why Did Our Snowflake Bill Jump Last Month?!”

Arjun, a cloud analytics lead, faces a sudden firestorm.

The CFO walks into the engineering bay:

> “Snowflake costs went up 38% last month. What happened?”

Arjun panics.  
Analysts ran expensive ad hoc queries…  
A forgotten warehouse stayed running all weekend…  
ETL jobs scaled up concurrency…  
Materialized views refreshed too frequently…

He realizes the truth:

**“We didn’t monitor anything.”**

Time to learn Snowflake’s powerful cost management tools.

---

## 💰 1. Understanding What Drives Snowflake Costs

Before touching dashboards, Arjun learns the 3 cost pillars:

### **1. Compute (Warehouses)**
- Biggest cost component  
- Credits billed per second  
- Depends on warehouse size + runtime  

### **2. Storage**
- Managed cloud storage  
- Charged monthly based on TB stored  

### **3. Cloud Services Layer**
- Metadata, optimization, result caching  
- Small but visible for extremely high query volumes  

Arjun’s mission: **Monitor, optimize, and reduce.**

---

## 📊 2. Billing & Cost Dashboard (Snowflake UI Overview)

Snowflake provides a built-in Billing Dashboard showing:

- Total credits consumed  
- Cost over time  
- Warehouse-level cost  
- Query type cost distribution  
- Materialized view maintenance cost  
- Cloud services usage  

Arjun checks:

**Admin → Cost Management → Usage → Billing Dashboard**

He immediately spots:

- A runaway XL warehouse  
- Unused but running compute clusters  
- Refresh-heavy materialized views  

The dashboard becomes his new best friend.

---

## 🔍 3. Monitoring Credit Usage Using SQL

Arjun also queries **ACCOUNT_USAGE** views for deeper insights.

### Daily credit consumption:

```sql
SELECT
  DATE(start_time) AS day,
  SUM(credits_used) AS total_credits
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
GROUP BY day
ORDER BY day;
```

### Warehouse-level cost:

```sql
SELECT
  warehouse_name,
  SUM(credits_used) AS credits
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
GROUP BY warehouse_name;
```

### Query-level cost (who is the offender?)

```sql
SELECT
  user_name,
  warehouse_name,
  total_elapsed_time/1000 AS seconds,
  credits_used_cloud_services,
  query_text
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
ORDER BY credits_used_cloud_services DESC
LIMIT 20;
```

Arjun instantly identifies “expensive users.”

---

## ⏱️ 4. Resource Monitors — Your “Cost Airbags”

Arjun sets up Snowflake **Resource Monitors** to stop overspending.

### Create a resource monitor

```sql
CREATE RESOURCE MONITOR warehouse_budget
WITH CREDIT_QUOTA = 500
TRIGGERS ON 80 PERCENT DO NOTIFY
         ON 100 PERCENT DO SUSPEND;
```

Attach it to a warehouse:

```sql
ALTER WAREHOUSE etl_wh SET RESOURCE_MONITOR = warehouse_budget;
```

Now:

* At 80% → sends alert
* At 100% → automatically suspends the warehouse

**No more weekend runaway compute!**

---

## 🧠 5. Identifying Cost Spikes — What to Look For

Arjun creates a checklist for cost anomalies:

### ✔ Long-running queries

### ✔ Warehouse left running

### ✔ Over-provisioned warehouse sizes

### ✔ Materialized view auto-refresh spike

### ✔ High concurrency settings

### ✔ Data transformations using large warehouse sizes

### ✔ Unused data retained too long

---

## 🏗️ 6. Optimizing Compute Costs — Pro Tips

### 🔸 Use Auto-Suspend (Most Important!)

```sql
ALTER WAREHOUSE analytics_wh 
SET AUTO_SUSPEND = 30, AUTO_RESUME = TRUE;
```

### 🔸 Scale down warehouse size

Most workloads can run on **SMALL** or **MEDIUM**.

### 🔸 Use multi-cluster only when needed

Avoid:

```sql
MIN_CLUSTER_COUNT=3, MAX_CLUSTER_COUNT=5
```

Use auto-scaling cautiously.

### 🔸 Use task-level compute instead of warehouses

Snowflake Tasks run on **serverless compute** — cost-efficient for small jobs.

---

## 🏪 7. Storage Optimization Tips

### ❄ Use Time Travel efficiently

Reduce default retention:

```sql
ALTER TABLE big_table SET DATA_RETENTION_TIME_IN_DAYS = 1;
```

### ❄ Drop old transient tables

```sql
DROP TABLE IF EXISTS temp_results;
```

### ❄ Archive historical data to cheaper cloud storage (external stage)

Snowflake storage is good — but not the cheapest for cold data.

---

## 🛠️ 8. Cloud Services Cost — Why It Increases

Arjun notices cloud services costs spike due to:

* Long metadata scans
* Queries retrieving massive result sets
* Excessive repeated query parsing
* Non-pruned partitions
* Large transactions

Fix: rewrite queries to prune micro-partitions.

---

## 📦 9. Build Cost Dashboards in BI Tools

Arjun creates a BI dashboard (Looker, Power BI, Tableau) using:

* `WAREHOUSE_METERING_HISTORY`
* `QUERY_HISTORY`
* `METERING_HISTORY`
* `MATERIALIZED_VIEW_REFRESH_HISTORY`

He shares it with finance and leadership.

Result: **full transparency.**

---

## 🧠 Best Practices Summary

1. Enable **auto-suspend** on all warehouses
2. Use **resource monitors** for budgets
3. Prefer **smaller warehouse sizes**, scale only when needed
4. Monitor **materialized view refresh costs**
5. Use **result cache** & **warehouse cache**
6. Track costs per role/user regularly
7. Archive cold data outside Snowflake
8. Use query history to find expensive workflows

---

# 🎉 Real-World Ending — “We Saved 42% in One Quarter”

After implementing these practices:

* Compute waste dropped dramatically
* Dashboards exposed expensive queries
* ETL pipelines migrated to optimized warehouse sizes
* Materialized views were tuned
* Business teams developed awareness

The CFO congratulates Arjun:

> “This is what cost governance looks like. Great work!”

---

## 📘 Summary

Snowflake provides powerful tools to manage and reduce costs:

### ✔ Billing Dashboard

### ✔ Usage History Views

### ✔ Resource Monitors

### ✔ Query-Level Cost Insights

### ✔ Warehouse Optimization Techniques

Mastering these ensures a **cost-efficient, scalable, and predictable** Snowflake environment.

---

# 👉 Next Topic

**Snowflake with Python, PySpark, Databricks — Enterprise Integration**
