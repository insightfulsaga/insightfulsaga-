---
id: pyspark-streaming-kafka
title: Streaming with Kafka
sidebar_label: Kafka Streaming
description: A storytelling, beginner-friendly yet complete guide on integrating PySpark Streaming with Apache Kafka for real-time pipelines. Includes schema handling, offsets, partitioning, watermarking, and production best practices.
keywords:
  - spark kafka streaming
  - pyspark kafka streaming tutorial
  - kafka spark integration
  - spark structured streaming kafka
  - real-time data pipelines kafka
  - kafka consumer spark
  - spark streaming kafka example
---

# 🛰️ Streaming with Kafka — *Message Highways of Data City*

Imagine a city where every action — a click, swipe, payment, or sensor reading — becomes a **message** speeding through ultra-fast highways.  
These highways are managed by **Apache Kafka**, the city’s transport department for events.

But raw events alone mean nothing.

Enter **PySpark**, the city's analyst, ready to read, understand, transform, and store these messages in real time.

Together they form one of the most powerful pipelines in Data Engineering.

---

# 🚦 What Is Kafka? (The Simple Way)

Kafka is:

- a **real-time messaging system**
- a **high-throughput event pipeline**
- a **distributed log system**
- a **buffer between producers & consumers**

Producers → Kafka Topics → Consumers (Spark)

Kafka stores messages in **topics**, split into **partitions** for parallel processing.

---

# 🎯 Why Spark + Kafka?

| Benefit | Explanation |
|--------|-------------|
| ⚡ High Throughput | Supports millions of events per second |
| 🛡 Fault Tolerant | Handles crashes gracefully |
| 🔄 Scalability | Add partitions/consumers to scale horizontally |
| ⏱ Event-Time Analytics | Spark adds windows, watermarks & event-time |
| 🔗 Ecosystem Integration | ML, ETL, batch, dashboards |

This combination is used by Netflix, Uber, PayPal, and Airbnb for real-time ML, fraud detection, and streaming ETL.

---

# 🧱 Kafka Message Structure (Very Important)

Kafka provides:

- `key` (binary)
- `value` (binary)
- `topic`
- `partition`
- `offset`
- `timestamp`

In most pipelines, you primarily parse the **value** field.

---

# 🔧 Reading Kafka Streams (PySpark Structured Streaming)

```python
df = spark \
  .readStream \
  .format("kafka") \
  .option("kafka.bootstrap.servers", "localhost:9092") \
  .option("subscribe", "events-topic") \
  .load()

df_parsed = df.selectExpr("CAST(key AS STRING)", "CAST(value AS STRING)", "timestamp")
````

✔ Spark automatically tracks Kafka offsets
✔ Data arrives as a streaming DataFrame
✔ Value is usually JSON, CSV, or delimited text

---

# 🧩 Parsing Kafka Messages (JSON Example)

Most real-world Kafka pipelines send **JSON messages**.

```python
from pyspark.sql.functions import *

schema = "user STRING, action STRING, amount DOUBLE, event_time TIMESTAMP"

json_df = df_parsed.select(
    from_json(col("value"), schema).alias("data"),
    "timestamp"
)

parsed = json_df.select("data.*", "timestamp")
```

✔ Now all fields become real DataFrame columns
✔ Schema validation prevents broken data

---

# 🕒 Using Event-Time & Watermarking

Kafka messages may arrive late.
Spark needs a watermark to manage state.

```python
result = parsed \
    .withWatermark("event_time", "10 minutes") \
    .groupBy(window("event_time", "5 minutes"), "user") \
    .count()
```

✔ Handles late events
✔ Prevents infinite memory usage
✔ Enables time-based aggregation

---

# 📝 Transforming Kafka Data

```python
cleaned = parsed \
    .filter(col("user").isNotNull()) \
    .withColumn("action_upper", upper(col("action")))
```

---

# 📤 Writing Back to Kafka

```python
cleaned \
  .selectExpr(
    "CAST(user AS STRING) AS key",
    "to_json(struct(*)) AS value"
  ) \
  .writeStream \
  .format("kafka") \
  .option("kafka.bootstrap.servers", "localhost:9092") \
  .option("topic", "processed-events") \
  .option("checkpointLocation", "/tmp/kafka-checkpoint") \
  .start()
```

✔ Supports exactly-once delivery
✔ Automatically commits Kafka offsets

---

# 📍 Subscribing to Multiple Topics

```python
.option("subscribe", "topic1,topic2")
```

Or use a **pattern**:

```python
.option("subscribePattern", "events-*")
```

---

# 🧭 Manual Offset Control (Advanced but Important)

```python
.option("startingOffsets", "earliest")
```

Values you can use:

* `"earliest"`
* `"latest"`
* A JSON of specific partitions

Perfect for **reprocessing old data**.

---

# 📦 Kafka → Spark Parallelism

Kafka partitions = Spark parallelism.

Example:

Kafka topic has **12 partitions**
→ Spark can process using **12 parallel tasks**

If input is slow:

Increase partitions
OR
Increase consumer group instances

---

# 🔐 Security (SSL & SASL)

```python
.option("kafka.security.protocol", "SASL_SSL")
.option("kafka.sasl.mechanism", "PLAIN")
.option("kafka.ssl.truststore.location", "/certs/kafka.jks")
```

Supports:

* SSL
* Kerberos
* SASL
* OAuth

---

# 🛡️ Checkpointing (Mandatory)

```python
.option("checkpointLocation", "/path/to/checkpoints")
```

Checkpoint stores:

* Kafka offsets
* Aggregation state
* Watermark data
* Query progress

Without checkpoint → no exactly-once guarantees.

---

# 🧪 Testing Kafka + Spark Locally

Use:

```bash
nc -lk 9999
```

or
Run a local Kafka:

```bash
bin/kafka-console-producer.sh --topic test --bootstrap-server localhost:9092
```

---

# 🚀 Production Best Practices

### ✔ Always use JSON with schema

Avoid unstructured messages.

### ✔ Use watermarks with aggregations

Prevent memory buildup.

### ✔ Tune partition counts

More partitions → more throughput.

### ✔ Use Delta/Parquet as sink

Avoid console sink in production.

### ✔ Monitor lag

Kafka Consumer Lag = Health of your pipeline.

### ✔ Use autoscaling Spark clusters

Handle spikes automatically.

---

# 🛠️ Full Working Example (Clean, Ready-to-Use)

```python
from pyspark.sql.functions import *
from pyspark.sql.types import *

schema = StructType([
    StructField("user", StringType()),
    StructField("action", StringType()),
    StructField("amount", DoubleType()),
    StructField("event_time", TimestampType())
])

# Read from Kafka
df = spark.readStream.format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "transactions") \
    .load()

# Parse JSON
json = df.select(
    from_json(col("value").cast("string"), schema).alias("data"),
    "timestamp"
)

parsed = json.select("data.*", "timestamp")

# Aggregation with windows
agg = parsed.withWatermark("event_time", "10 minutes") \
    .groupBy(window("event_time", "5 minutes"), "user") \
    .agg(sum("amount").alias("total_spent"))

# Write back to Kafka
agg.selectExpr("CAST(user AS STRING) AS key", "to_json(struct(*)) AS value") \
   .writeStream \
   .format("kafka") \
   .option("kafka.bootstrap.servers", "localhost:9092") \
   .option("topic", "user-spending") \
   .option("checkpointLocation", "/checkpoint/kafka-pipeline") \
   .start()
```

---

# 🏁 Summary

Kafka + PySpark Streaming gives you:

* Real-time event ingestion
* Scalable, fault-tolerant pipelines
* Event-time windowing
* Exactly-once delivery
* JSON parsing & schema validation
* State management via watermarks
* High-throughput processing

This is the backbone of modern data engineering.

