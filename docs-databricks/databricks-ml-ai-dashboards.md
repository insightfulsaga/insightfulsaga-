---
id: databricks-ml-ai-dashboards
title: ML & AI in Databricks Dashboards
sidebar_label: ML & AI Dashboards
description: Learn how to integrate Machine Learning and AI into Databricks dashboards using MLflow, AutoML, and predictive analytics — explained in both modern-story and professional ways.
tags:
  - Databricks
  - Machine Learning
  - MLflow
  - Dashboards
  - AI Analytics
---


## 🧩 1. Introduction to ML & AI in Dashboards

### 🌍 Modern Story Way

Imagine your dashboard as a mirror.

A normal mirror shows you what you look like **right now**.
But what if your mirror also told you:

✨ “You might smile tomorrow.”
✨ “Your mood will dip next week; take a break.”
✨ “Your energy level is trending up — keep going!”

This is exactly what Databricks dashboards do when you add **Machine Learning (ML)** and **Artificial Intelligence (AI)**.

Instead of just showing **what happened**, your dashboards begin to show:

* 📈 **What will happen next** (sales forecasts)
* 🕵️ **What’s unusual** (customer anomalies)
* 🛒 **What you should do next** (product recommendations)

Your dashboard becomes a **living assistant**, not a static report.

---

### 💼 Professional Explanation

Integrating ML and AI into Databricks dashboards adds layers of intelligence such as:

* **Predictive Analytics** – forecasting sales, churn, demand, risk
* **Anomaly Detection** – spotting outliers or unusual activity
* **Decision Automation** – recommending actions based on data
* **Natural Language Insights** – using LLMs to generate summaries

Databricks supports an end-to-end ML workflow using:

* **MLflow** – model tracking, metrics, artifacts
* **Databricks Feature Store** – centralized feature management
* **AutoML** – automated model training
* **Databricks Model Serving** – deploy models as APIs
* **Dashboards** – visualize insights in realtime

---

## 📸 Example Visual - Databricks ML Pipeline Flow

```md
![Databricks Dashboard Example](./img/databricks-dashboard-ml-example.png)
```

<svg width="900" height="300" viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg">
<rect width="900" height="300" rx="20" fill="#F7FAFF"/>

<text x="40" y="50" font-size="30" fill="#333" font-family="Arial">Databricks ML Pipeline Flow</text>

<!-- Boxes -->
<rect x="40" y="100" width="140" height="80" rx="10" fill="#E8F0FF" stroke="#7DA6FF" stroke-width="2"/>
<text x="50" y="145" font-size="16" font-family="Arial" fill="#333">Data</text>

<rect x="210" y="100" width="140" height="80" rx="10" fill="#E8F0FF" stroke="#7DA6FF" stroke-width="2"/>
<text x="220" y="145" font-size="16" font-family="Arial" fill="#333">Feature Store</text>

<rect x="380" y="100" width="140" height="80" rx="10" fill="#E8F0FF" stroke="#7DA6FF" stroke-width="2"/>
<text x="390" y="145" font-size="16" font-family="Arial" fill="#333">AutoML</text>

<rect x="550" y="100" width="140" height="80" rx="10" fill="#E8F0FF" stroke="#7DA6FF" stroke-width="2"/>
<text x="560" y="145" font-size="16" font-family="Arial" fill="#333">MLflow Registry</text>

<rect x="720" y="100" width="140" height="80" rx="10" fill="#E8F0FF" stroke="#7DA6FF" stroke-width="2"/>
<text x="730" y="145" font-size="16" font-family="Arial" fill="#333">Dashboards</text>

<!-- Arrows -->
<line x1="180" y1="140" x2="210" y2="140" stroke="#5A8CFF" stroke-width="4" marker-end="url(#arrow)"/>
<line x1="350" y1="140" x2="380" y2="140" stroke="#5A8CFF" stroke-width="4" marker-end="url(#arrow)"/>
<line x1="520" y1="140" x2="550" y2="140" stroke="#5A8CFF" stroke-width="4" marker-end="url(#arrow)"/>
<line x1="690" y1="140" x2="720" y2="140" stroke="#5A8CFF" stroke-width="4" marker-end="url(#arrow)"/>

<defs>
<marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
<polygon points="0,0 8,4 0,8" fill="#5A8CFF"/>
</marker>
</defs>
</svg>


---

---

# 🚀 MLflow Overview

## 🌍 Modern Story Way

Think of MLflow as your **machine-learning diary** — a notebook that never forgets.

A data scientist may test 10… 20… or 200 models:

* “This model got **92% accuracy**.”
* “This one used **XGBoost** with **learning_rate=0.1**.”
* “Run #74 is the best — lowest error.”

MLflow writes everything down automatically.

It’s like a chef keeping a recipe book:

🍲 *“This was the best dish — here’s exactly how I made it.”*

Whenever you need to recreate or deploy the model — MLflow already saved the recipe.

---

## 💼 Professional Explanation

MLflow is an open-source platform integrated into Databricks for managing the ML lifecycle.

It includes **4 major components**:

## 1️⃣ **MLflow Tracking**

**Simple Explanation:**
MLflow Tracking is like a notebook that automatically records everything about your machine-learning experiments — what parameters you used, how well the model performed, and what files it created.

**Why it matters:**
It helps you compare models, remember what you did, and pick the best version without confusion.

**Example Code:**

```python
import mlflow

with mlflow.start_run():
    mlflow.log_param("model_type", "xgboost")
    mlflow.log_metric("rmse", 3.21)
```
## 2️⃣ **MLflow Projects**

**Simple Explanation:**
MLflow Projects is a way to package your machine-learning code, environment, and dependencies so you or your team can run the same experiment anywhere — with one command.

**Why it matters:**
It eliminates “it works on my machine” problems by ensuring the code behaves the same everywhere (laptop, Databricks, cluster, or cloud).

---

## 3️⃣ **MLflow Models**

**Simple Explanation:**
MLflow Models stores your trained models in a standard, portable format so they can be deployed easily to different places (APIs, batch jobs, cloud services).

**Why it matters:**
No matter how a model was trained — in Python, R, Scikit-learn, PyTorch, etc. — MLflow wraps it so other tools can use it without compatibility issues.

---

## 4️⃣ **MLflow Model Registry**

**Simple Explanation:**
The Model Registry is a central “library shelf” where all your models are stored, versioned, reviewed, and approved for production.

**Why it matters:**
It provides governance:

* You can track versions (v1, v2, v3…)
* Add comments/review notes
* Approve/reject models
* Deploy to production with a click

It keeps your ML workflow organized and safe.


### 📊 How MLflow Helps Dashboards

You can use MLflow to:

* Fetch the **latest best model run**
* Display model accuracy trends in the dashboard
* Show how performance improves over time

Example snippet to load the best model:

```python
from mlflow import MlflowClient

client = MlflowClient()
best_run = client.search_runs(
    experiment_ids=["12345"],
    order_by=["metrics.rmse ASC"],
    max_results=1
)[0]

best_run.info.run_id
```

---

## 📸 MLflow UI Example Placeholder - MLflow Tracking System Concept

```md
![MLflow Tracking UI Example](./img/mlflow-ui-example.png)
```
<svg width="900" height="500" viewBox="0 0 900 500" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="900" height="500" rx="20" fill="#F7F9FF"/>

<text x="40" y="60" font-size="32" fill="#333" font-family="Arial">MLflow Tracking Overview</text>

<!-- Table -->
<rect x="40" y="100" width="820" height="150" rx="12" fill="white" stroke="#C9D3FF" stroke-width="2"/>
<text x="60" y="130" font-size="20" fill="#4A4A4A" font-family="Arial">Experiment Runs</text>
<line x1="50" y1="150" x2="850" y2="150" stroke="#D3D9FF"/>

<text x="60" y="180" font-family="Arial" font-size="16" fill="#555">Run ID</text>
<text x="200" y="180" font-family="Arial" font-size="16" fill="#555">Parameters</text>
<text x="400" y="180" font-family="Arial" font-size="16" fill="#555">Metrics</text>
<text x="600" y="180" font-family="Arial" font-size="16" fill="#555">Artifacts</text>

<text x="60" y="215" font-family="Arial" font-size="16">#74</text>
<text x="200" y="215" font-family="Arial" font-size="16">model=xgb</text>
<text x="400" y="215" font-family="Arial" font-size="16">rmse=3.21</text>
<text x="600" y="215" font-family="Arial" font-size="16">model.pkl</text>

<!-- Metrics Chart -->
<rect x="40" y="280" width="400" height="180" rx="12" fill="white" stroke="#C9D3FF" stroke-width="2"/>
<text x="60" y="315" font-size="20" fill="#4A4A4A" font-family="Arial">Metrics Over Time</text>
<polyline points="70,420 120,380 170,350 230,370 300,310 380,360" stroke="#6C63FF" stroke-width="4" fill="none"/>

<!-- Parameters panel -->
<rect x="480" y="280" width="380" height="180" rx="12" fill="white" stroke="#C9D3FF" stroke-width="2"/>
<text x="500" y="315" font-size="20" fill="#4A4A4A" font-family="Arial">Parameters</text>
<text x="500" y="350" font-size="16" fill="#6A6A6A" font-family="Arial">learning_rate: 0.1</text>
<text x="500" y="380" font-size="16" fill="#6A6A6A" font-family="Arial">max_depth: 5</text>
</svg>

---

---

# 📘 Why MLflow Matters for Dashboards

### 🎯 Simple Example

**Use Case:** Predict next week’s product demand.

Without MLflow:

* You forget which model was best
* Hard to reproduce results
* No version control

With MLflow:

* Best model is automatically tracked
* Code + parameters are saved
* Easy to deploy that model into the dashboard

---

---

# 🛠 Hands-On Example (Simple)

Below is a simple, beginner-friendly Databricks notebook-style demo.

### Step 1: Load Data

```python
df = spark.read.format("delta").load("/mnt/data/sales")
display(df)
```

---

### Step 2: AutoML Training (No ML Expertise Required)

```python
from databricks.automl import regression

summary = regression.train(
    df,
    target_col="weekly_sales",
    timeout_minutes=10
)

summary.best_trial
```

---

### Step 3: Register the Best Model

```python
summary.register_model(model_name="sales_forecast_model")
```

---

### Step 4: Create a Dashboard Cell

```python
from pyspark.sql.functions import current_date

model = mlflow.pyfunc.spark_udf(spark, "models:/sales_forecast_model/Production")

predictions = df.withColumn("predicted_sales", model(*df.columns))
display(predictions)
```

---

### Step 5: Add to Databricks Dashboard

1. Run the cell
2. Click **“Add to Dashboard”**
3. Choose your dashboard
4. Set refresh schedule (e.g., every hour)

---

# 📸 Dashboard Visualization Placeholder - ML Dashboard Concept

```md
![Predicted vs Actual Chart](./img/predicted-vs-actual-sales.png)
```

<svg width="900" height="520" viewBox="0 0 900 520" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="900" height="520" rx="20" fill="#F8FAFF"/>
<rect x="30" y="30" width="840" height="80" rx="10" fill="#E9EEFF"/>
<text x="50" y="80" font-size="32" fill="#3A3A3A" font-family="Arial">Machine Learning Dashboard</text>

<!-- Left chart -->
<rect x="50" y="140" width="380" height="330" rx="12" fill="white" stroke="#D3D9FF" stroke-width="2"/>
<text x="70" y="175" font-size="20" fill="#4A4A4A" font-family="Arial">Prediction Trend</text>
<polyline points="80,400 150,330 230,360 310,250 380,280" stroke="#6C63FF" stroke-width="4" fill="none"/>
<circle cx="310" cy="250" r="6" fill="#FF6A6A"/>
<text x="320" y="240" font-size="14" fill="#FF6A6A" font-family="Arial">Anomaly</text>

<!-- Right panel -->
<rect x="460" y="140" width="380" height="150" rx="12" fill="white" stroke="#D3D9FF" stroke-width="2"/>
<text x="480" y="175" font-size="20" fill="#4A4A4A" font-family="Arial">Model Insights</text>
<text x="480" y="210" font-size="16" fill="#6A6A6A" font-family="Arial">Model: XGBoost</text>
<text x="480" y="240" font-size="16" fill="#6A6A6A" font-family="Arial">RMSE: 3.21</text>

<rect x="460" y="310" width="380" height="160" rx="12" fill="white" stroke="#D3D9FF" stroke-width="2"/>
<text x="480" y="345" font-size="20" fill="#4A4A4A" font-family="Arial">Key KPIs</text>
<text x="480" y="380" font-size="16" fill="#6A6A6A" font-family="Arial">Accuracy: 92%</text>
<text x="480" y="410" font-size="16" fill="#6A6A6A" font-family="Arial">Forecast Horizon: 7 days</text>
</svg>

# 1-Minute Summary

| Topic                 | Modern Story                 | Professional                              |
| --------------------- | ---------------------------- | ----------------------------------------- |
| ML & AI in Dashboards | “Mirror predicting tomorrow” | Predictive / anomaly / automated insights |
| MLflow                | “Machine-learning diary”     | Tracking, projects, models, registry      |
| Why MLflow            | Avoid forgetting experiments | Model governance + reproducibility        |
| Hands-on              | Simple AutoML example        | Dashboard integration                     |

