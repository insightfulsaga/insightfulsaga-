---
id: databricks-interview-part3
title: Must-Know Databricks Interview Question & Answer(Explained Through Real-World Stories) - Part 3
sidebar_label: Databricks Interview Q&A(Real Scenarios)  - 3
---

# Must-Know Databricks Interview Questions & Answers (Real Company Scenarios) – Part 3

## 26. How do you monitor cluster performance?

### Story-Driven
Think of monitoring a cluster like keeping an eye on a team of chefs. You check who’s busy, who’s idle, and whether any chef is struggling. This ensures the feast (your job) finishes on time.

### Professional / Hands-On
- **Cluster performance monitoring** in Databricks includes:
  - CPU, memory, and disk usage.
  - Spark UI: stages, tasks, and DAG visualization.
  - Ganglia metrics and logs.
- **Steps:**
  1. Go to the **Clusters** page.
  2. Click on a cluster → **Metrics/Driver Logs/Worker Logs**.
  3. Use **Spark UI** for detailed job-level performance.

---

## 27. How do you handle large datasets in Databricks?

### Story-Driven
Handling large datasets is like managing a giant library—you can’t read every book at once. You organize, categorize, and fetch only what you need.

### Professional / Hands-On
Strategies:
- **Partition data** for faster reads.
- Use **Delta Lake** for ACID and efficient storage.
- **Caching** frequently accessed datasets.
- Use **spark.read.format(...).option(...).load(...)** to stream or load in chunks.
- Leverage **Auto-scaling clusters** to dynamically adjust resources.

---

## 28. Difference between `spark.read` and `spark.readStream`

### Story-Driven
- `spark.read` is like reading a whole book in one go.  
- `spark.readStream` is like watching a live news feed—you get data as it arrives.

### Professional / Hands-On
| Feature | `spark.read` | `spark.readStream` |
|---------|--------------|------------------|
| Type | Batch | Streaming |
| Data | Static snapshot | Continuous flow |
| Use Case | Historical data analysis | Real-time ingestion and analytics |

---

## 29. Explain structured streaming in Databricks

### Story-Driven
Structured streaming is like a smart conveyor belt: it continuously processes incoming data in mini-batches, so you always have fresh results without rerunning everything.

### Professional / Hands-On
- **Structured Streaming** is Spark’s high-level streaming API.
- Supports **incremental processing** with DataFrames/Datasets.
- Handles **late data, checkpoints, and exactly-once semantics**.
```python
df = (spark.readStream.format("csv")
      .option("header", "true")
      .load("/stream/input"))
df.writeStream.format("delta").option("checkpointLocation","/checkpoint").start("/delta/output")
````

---

## 30. What are MLflow experiments?

### Story-Driven

Think of MLflow experiments like a lab notebook for your ML models. Each experiment records parameters, metrics, and results, so you can track progress and compare models.

### Professional / Hands-On

* **MLflow Experiments** track:

  * **Parameters:** Hyperparameters used for training.
  * **Metrics:** Accuracy, loss, etc.
  * **Artifacts:** Model files, plots, or logs.
* Can create multiple runs within an experiment to compare models.

```python
import mlflow
mlflow.start_run()
mlflow.log_param("learning_rate", 0.01)
mlflow.log_metric("accuracy", 0.95)
mlflow.end_run()
```

---

## 31. How does Databricks implement lazy evaluation?

### Story-Driven

Lazy evaluation is like writing your shopping list but not going to the store until you really need the items. Spark builds a plan but executes it only when necessary.

### Professional / Hands-On

* Transformations (like `map`, `filter`) are **lazy**.
* Actions (like `count`, `collect`) trigger execution.
* Benefits: Optimized query plans, reduced unnecessary computations.

---

## 32. What is checkpointing in Spark Structured Streaming?

### Story-Driven

Checkpointing is like saving your progress in a video game. If something crashes, you can resume from where you left off, instead of starting from scratch.

### Professional / Hands-On

* Checkpointing stores:

  * Offsets of streaming data
  * Metadata for recovery
* Enables **fault-tolerant streaming**

```python
df.writeStream.format("delta").option("checkpointLocation","/checkpoint").start("/delta/output")
```

---

## 33. Explain shuffling and how to minimize it in Databricks

### Story-Driven

Shuffling is like rearranging all the books in a library to sort them—expensive and time-consuming. Minimizing shuffle saves time and resources.

### Professional / Hands-On

* **Shuffling:** Redistributing data across partitions for joins or aggregations.
* **Ways to minimize:**

  * Partition by join keys.
  * Use **broadcast joins** for small tables.
  * Avoid unnecessary wide transformations.

```python
from pyspark.sql.functions import broadcast
df.join(broadcast(small_df), "id")
```

---

## 34. What is skew handling in Spark?

### Story-Driven

Skew is like one chef getting 90% of the work while others are idle. Skew handling balances the load across all workers.

### Professional / Hands-On

* **Data skew:** Uneven data distribution causing some tasks to take longer.
* **Solutions:**

  * Salting keys.
  * Repartitioning before joins.
  * Skew join hints in Spark SQL.

```python
df.repartition(100, "key")  # Redistribute data evenly
```

---

## 35. How do you optimize joins in large datasets in Spark?

### Story-Driven

Optimizing joins is like pairing cooks efficiently: match big tasks with helpers and avoid everyone crowding one station.

### Professional / Hands-On

* **Broadcast small tables:** Use `broadcast()` to avoid shuffles.
* **Partition tables by join keys** to co-locate data.
* **Avoid multiple wide transformations**.
* Use **Delta tables and Z-ordering** for faster joins.

```python
from pyspark.sql.functions import broadcast
df1.join(broadcast(df2), "id")
```