---
id: databricks-alerts-email-slack
title: Alerting — Email & Slack Alerts for Job Failures
sidebar_label: Alerts (Email & Slack)
description: A story-driven, practical guide on setting up Databricks alerting using Email, Slack, Webhooks, and on-failure notifications to monitor job failures in production pipelines.
keywords:
  - databricks alerts
  - databricks slack alerts
  - databricks email alerts
  - databricks job failure notifications
  - databricks webhook alerts
  - databricks monitoring
  - workflow alerts databricks
---

# Alerting — Email & Slack Alerts for Job Failures

## 🎬 Story Time — “The Job Failed… and Nobody Knew”

Rahul, a data engineer at an e-commerce company, receives a frantic message at 10 AM:

> “Why is today’s dashboard blank?”

It turns out:

- ETL pipeline failed at 2:00 AM  
- No one received an alert  
- No monitoring was set up  
- Dashboards showed stale data  

Rahul thinks:

> “A pipeline without alerts is like a plane without sensors.”

He opens **Databricks Workflows** to configure **Email + Slack alerts** for every step.

---

## 🔥 1. Why Alerts Matter in Production

Alerts help teams react immediately to failures like:

- Cluster issues  
- Node failures  
- Schema mismatches  
- API rate limits  
- File unavailability  
- Data validation failures  
- Logic bugs in notebooks/scripts  

Without alerts, teams lose hours — or worse, publish incorrect data.

---

## 📧 2. Email Alerts in Databricks

Email alerts are the simplest and fastest way to get notified.

### How to Add Email Alerts

1. Go to your **Job / Workflow**
2. Click **Alerts**
3. Add:
   - Your email
   - Team distribution email
   - On-call group email

Choose alert type:

- **On Failure**
- **On Success**
- **On Start**
- **On Duration Over Threshold**

### Example — Alert Configuration

```

On Failure → [analytics-team@company.com](mailto:analytics-team@company.com)
On Duration Exceeded → [dataops@company.com](mailto:dataops@company.com)

```

Databricks automatically sends:

- Error message  
- Failed task name  
- Logs link  
- Run details  
- Cluster info  

Perfect for morning triage.

---

## 📨 3. Slack Alerts — For Real-Time Team Visibility

Most modern teams prefer Slack notifications because:

- Everyone sees alerts  
- Rapid response coordination  
- On-call rotation visibility  
- Faster triage  

### Step 1 — Create a Slack Webhook URL

In Slack:

**Apps → Incoming Webhooks → Create New Webhook**

Select channel, e.g., `#data-alerts`.

Copy the webhook URL.

### Step 2 — Add Slack Webhook to Databricks Workflows

In the Job configuration:

```

Alerts → Add → Webhook → Paste URL

```

### Step 3 — Customize Slack Message (Optional)

Databricks sends structured info like:

- Status  
- Workflow name  
- Link to job run  
- Failed task  
- Failure reason  

But you can also design your own message via a Python task:

```python
import requests

payload = {
    "text": f"🚨 Databricks Job Failed: {dbutils.jobs.taskValues.get('task_name')}"
}

requests.post(slack_webhook_url, json=payload)
```

Now failures appear instantly in Slack.

---

## ⛑️ 4. Alerts for Multi-Task Workflows (Per Task)

Databricks allows:

### ✔ Alerts for the entire workflow

### ✔ Alerts per individual task

This is extremely helpful when:

* The validation task fails
* But upstream ingestion tasks run fine
* Only the downstream team needs notification

Example:

```
validate_data → On Failure → #quality-alerts
load_gold → On Failure → #data-engineering
```

---

## 🛠️ 5. On-Failure Trigger Tasks (Advanced Alerts)

You can create **error handling tasks** inside workflows.

Example:

```
validate → load_gold  
      ↓
  notify_failure
```

The `notify_failure` task runs only when:

```json
{
  "condition": "failed()"
}
```

Inside this task:

```python
requests.post(slack_url, json={"text": "Validation failed in Databricks!"})
```

This enables fully automated error routing.

---

## 🧪 6. Real Example — Notebook Alert on Error

In a notebook:

```python
try:
    df = spark.table("silver.sales")
    assert df.count() > 0
except Exception as e:
    dbutils.notebook.exit(f"ERROR: {str(e)}")
```

Databricks will automatically trigger failure alerts.

---

## 📊 7. Alerts With Databricks SQL (Dashboards)

Databricks SQL supports **real-time condition-based alerts**:

* Revenue drop alerts
* Data drift detection
* SLA monitoring
* Missing data alerts

Example:

```
Alert when COUNT(*) < 1000 in daily_sales table
```

Alerts can fire:

* Email
* Slack webhooks
* PagerDuty
* Custom HTTP endpoints

---

## 🧠 Best Practices

1. Always configure **on-failure alerts**
2. Use **Slack → primary**, email → secondary
3. Create **separate channels** per pipeline type
4. Add **file-based triggers** + alerts for ingestion issues
5. Include **run URL** in alert message
6. Add **retry logic** + alerts only after retries fail
7. Use **service principals** for webhook authentication

---

## 🎉 Real-World Ending — “The Alert Saved the Morning”

Next day, at exactly 2:01 AM:

* API returned empty data
* The validation task failed
* Slack alerted the team instantly
* Issue resolved before business hours

At 9:00 AM, dashboards were fresh.

Rahul’s manager said:

> “Finally… the pipeline can talk to us when things go wrong.”

And that’s the magic of **Databricks Alerts**.

---

## 📘 Summary

Databricks supports:

* ✔ Email alerts

* ✔ Slack alerts

* ✔ Webhook-based alerts

* ✔ On-failure tasks

* ✔ SQL alerts

* ✔ Per-task notification targeting

A must-have component for **production-grade pipeline monitoring**.

---

# 👉 Next Topic

**Cluster Policies — Cost & Security Enforcement**

