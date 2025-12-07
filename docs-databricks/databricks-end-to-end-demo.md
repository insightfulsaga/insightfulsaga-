---
id: databricks-end-to-end-demo
title: Hands-On Demo- Ingest → Transform → Insight with Databricks
sidebar_label: Hands-On- Ingest to Insight
---

# Hands-On Demo Flow (End-to-End)

We’ll simulate a Retail Orders mini-project (works as a Databricks notebook)

## 0. Setup (paths & imports)

```python
# Imports: PySpark core
from pyspark.sql import functions as F            # F: column functions (select, filter, agg, etc.)
from pyspark.sql import types as T                # T: data types (StringType, IntegerType...)
from pyspark.sql.window import Window             # Window: dedup & ranking operations

# Initialize Spark session (skip in Databricks)
spark = SparkSession.builder.appName("RetailETL").getOrCreate()

# Set base paths (DBFS or external mount)
base = "/tmp/demo_retail"                         # Change to your mount, e.g. /mnt/bronze/...
bronze_path = f"{base}/bronze/orders"
silver_path = f"{base}/silver/orders"
gold_path   = f"{base}/gold/metrics"
```

**Result**
```text
No output (setup cell).
```


## 1. Ingestion → Bronze (raw, as-is)

Create a tiny synthetic dataset so you can run this anywhere.

**i. Define schema explicitly (good practice for CSV/JSON ingestion)**
```python
orders_schema = T.StructType([
    T.StructField("order_id", T.StringType(),  True),   # order identifier (may arrive duplicated)
    T.StructField("order_ts", T.StringType(),  True),   # timestamp as string in raw (to be typed later)
    T.StructField("customer_id", T.StringType(), True), # customer foreign key
    T.StructField("sku", T.StringType(),       True),   # product id
    T.StructField("qty", T.IntegerType(),      True),   # quantity
    T.StructField("unit_price", T.DoubleType(),True),   # price per unit
    T.StructField("status", T.StringType(),    True),   # 'Created','Completed','Cancelled', ...
    T.StructField("channel", T.StringType(),   True),   # 'web','store'
])
```
**Result**
```text
No output (schema definition).
```

**ii. Create raw rows (simulate ingestion)**

```python
raw_rows = [
    ("o-1001","2025-08-31 09:12:00","c-9","sku-1",1,19.99,"Completed","web"),
    ("o-1002","2025-08-31 09:15:00","c-2","sku-2",2,12.50,"Completed","store"),
    ("o-1002","2025-08-31 09:15:00","c-2","sku-2",2,12.50,"Completed","store"),  # duplicate
    ("o-1003","2025-08-31 09:20:00","c-5","sku-7",1,49.00,"Cancelled","web"),
    ("o-1004","2025-08-31 09:35:00","c-9","sku-1",3,19.99,"Completed","web"),
]
```
**Result**
```text
No output (just a list).
```


**iii. Create Bronze DataFrame (raw)**

```python
bronze_df = spark.createDataFrame(raw_rows, schema=orders_schema)
bronze_df.show()
```

**Result**
```text
+--------+-------------------+-----------+------+---+----------+---------+-------+
|order_id|order_ts           |customer_id|sku   |qty|unit_price|status   |channel|
+--------+-------------------+-----------+------+---+----------+---------+-------+
|o-1001  |2025-08-31 09:12:00|c-9        |sku-1 |1  |19.99     |Completed|web    |
|o-1002  |2025-08-31 09:15:00|c-2        |sku-2 |2  |12.5      |Completed|store  |
|o-1002  |2025-08-31 09:15:00|c-2        |sku-2 |2  |12.5      |Completed|store  |
|o-1003  |2025-08-31 09:20:00|c-5        |sku-7 |1  |49.0      |Cancelled|web    |
|o-1004  |2025-08-31 09:35:00|c-9        |sku-1 |3  |19.99     |Completed|web    |
+--------+-------------------+-----------+------+---+----------+---------+-------+
```

**iv. Write as Delta (raw/immutable style)**
```python
bronze_df.write.format("delta").mode("overwrite").save(bronze_path)  # Use Delta Lake for ACID + versioning.mode("overwrite")               # Fresh demo; use 'append' in real pipelines
```
**Result**
```text
No direct output, but the Delta table is saved.
```
**What you did:** You ingested raw orders as-is into a Delta table (Bronze). This mirrors real ingestion from CSV/JSON/Kafka.


## 2. Cleaning/Validation → Silver (structured, deduped, typed)

**Read Bronze**
```python
b = spark.read.format("delta").load(bronze_path)
```

```python
# Type conversions + computed columns
s = (b
     .withColumn("order_ts", F.to_timestamp("order_ts", "yyyy-MM-dd HH:mm:ss"))
     .withColumn("line_amount", F.col("qty") * F.col("unit_price"))
     .withColumn("status_std", F.initcap("status"))
    )

s.select("order_id", "order_ts", "qty", "unit_price", "line_amount", "status", "status_std").show()
```
**Result**
```text
+--------+-------------------+---+----------+-----------+---------+-----------+
|order_id|order_ts           |qty|unit_price|line_amount|status   |status_std|
+--------+-------------------+---+----------+-----------+---------+-----------+
|o-1001  |2025-08-31 09:12:00|1  |19.99     |19.99      |Completed|Completed |
|o-1002  |2025-08-31 09:15:00|2  |12.5      |25.0       |Completed|Completed |
|o-1002  |2025-08-31 09:15:00|2  |12.5      |25.0       |Completed|Completed |
|o-1003  |2025-08-31 09:20:00|1  |49.0      |49.0       |Cancelled|Cancelled |
|o-1004  |2025-08-31 09:35:00|3  |19.99     |59.97      |Completed|Completed |
+--------+-------------------+---+----------+-----------+---------+-----------+
```



**Deduplicate by business key (order_id); keep latest by order_ts**
```python
w = Window.partitionBy("order_id").orderBy(F.col("order_ts").desc())

s_dedup = (s
           .withColumn("rn", F.row_number().over(w))
           .filter(F.col("rn") == 1)
           .drop("rn"))

s_dedup.select("order_id", "order_ts", "sku", "qty", "status_std").show()
```
**Result**
```text
+--------+-------------------+------+---+-----------+
|order_id|order_ts           |sku   |qty|status_std|
+--------+-------------------+------+---+-----------+
|o-1001  |2025-08-31 09:12:00|sku-1 |1  |Completed |
|o-1002  |2025-08-31 09:15:00|sku-2 |2  |Completed |
|o-1003  |2025-08-31 09:20:00|sku-7 |1  |Cancelled |
|o-1004  |2025-08-31 09:35:00|sku-1 |3  |Completed |
+--------+-------------------+------+---+-----------+
```

**Keep only valid, completed orders**
```python
s_clean = (s_dedup
           .filter(F.col("status_std") == "Completed")
           .drop("status"))  # optional

s_clean.select("order_id", "order_ts", "sku", "qty", "line_amount").show()
```
**Result**
```text
+--------+-------------------+------+---+-----------+
|order_id|order_ts           |sku   |qty|line_amount|
+--------+-------------------+------+---+-----------+
|o-1001  |2025-08-31 09:12:00|sku-1 |1  |19.99      |
|o-1002  |2025-08-31 09:15:00|sku-2 |2  |25.0       |
|o-1004  |2025-08-31 09:35:00|sku-1 |3  |59.97      |
+--------+-------------------+------+---+-----------+
```

**Persist to Silver**

```python
(s_clean.write.format("delta").mode("overwrite").save(silver_path))
```
**Result**
```text
No output, Delta table saved.
```
**Key ideas:** Cast types, add business columns, deduplicate, and filter to valid business states. That’s Silver.


## 3. Business Models → Gold (aggregates for BI/AI)
```python
# Read Silver
s = spark.read.format("delta").load(silver_path)
```

**Result**
```text
Same as final Silver data above — 3 clean, deduplicated, completed rows.
```

```python
# Example 1: Daily revenue per channel
gold_daily = (s
    .withColumn("order_date", F.to_date("order_ts"))
    .groupBy("order_date", "channel")
    .agg(
        F.sum("line_amount").alias("revenue"),
        F.countDistinct("order_id").alias("orders"),
        F.sum("qty").alias("units")
    )
)

gold_daily.orderBy("order_date", "channel").show()
```

**Result**
```text
+-----------+-------+-------+------+-----+
|order_date |channel|revenue|orders|units|
+-----------+-------+-------+------+-----+
|2025-08-31 |store  |25.0   |1     |2    |
|2025-08-31 |web    |79.96  |2     |4    |
+-----------+-------+-------+------+-----+
```

```python
# Example 2: Top SKUs by revenue

gold_sku = (s
    .groupBy("sku")
    .agg(
        F.sum("line_amount").alias("revenue"),
        F.sum("qty").alias("units"),
        F.countDistinct("order_id").alias("orders")
    )
    .orderBy(F.col("revenue").desc())
)

gold_sku.show()
```

**Result**
```test
+------+-------+-----+------+
|sku   |revenue|units|orders|
+------+-------+-----+------+
|sku-1 |79.96  |4    |2     |
|sku-2 |25.0   |2    |1     |
+------+-------+-----+------+
```
```python
# Persist Gold (you might create multiple Golds)

(gold_daily.write.format("delta").mode("overwrite").save(f"{gold_path}/daily_by_channel"))

(gold_sku.write.format("delta").mode("overwrite").save(f"{gold_path}/top_skus"))
```
**Result**
```text
No output; two Gold Delta tables saved.
```
**Gold** = answers. These are the exact tables BI tools or ML features consume.


## 4. SQL Insights (Databricks SQL / Notebook %sql magic)
```sql
-- Create SQL views over Gold for analysts (optional)
CREATE OR REPLACE TEMP VIEW gold_daily AS
SELECT * FROM delta.'/tmp/demo_retail/gold/metrics/daily_by_channel';

CREATE OR REPLACE TEMP VIEW gold_top_skus AS
SELECT * FROM delta.'/tmp/demo_retail/gold/metrics/top_skus';

-- Example insights
SELECT order_date, channel, revenue, orders, units
FROM gold_daily
ORDER BY order_date, channel;

SELECT sku, revenue, units, orders
FROM gold_top_skus
LIMIT 10;
```

**Tip:** In Unity Catalog environments, prefer catalog.schema.table names rather than paths, e.g.,
CREATE TABLE retail.gold.daily_by_channel USING DELTA LOCATION '...'.


## 5. Orchestrate & Operationalize (Jobs/Workflows)

**Notebook Tasks:**

Task A (Bronze load) → Task B (Silver clean) → Task C (Gold aggregates).

**Schedule:** Hourly / Daily.

**Retries & Alerts:** Set retry policy, email/Slack on failure.

**Parameters:** Pass ingest_date, source_path to notebooks for reusability.


## 6. Performance & Governance touches

**Performance:** OPTIMIZE ... ZORDER BY (order_date, sku) on big tables; cache hot Silver tables.

**Cost:** Use job clusters + auto-termination.

**Governance:** Put tables under Unity Catalog; grant SELECT to analyst groups; track lineage.


# Bonus: Equivalent SQL Pattern (quick view)
```sql
-- Bronze → Silver in pure SQL (Delta tables)
CREATE OR REPLACE TABLE silver_orders AS
SELECT
  order_id,
  to_timestamp(order_ts, 'yyyy-MM-dd HH:mm:ss') AS order_ts,
  customer_id,
  sku,
  qty,
  unit_price,
  initcap(status) AS status_std,
  qty * unit_price AS line_amount
FROM delta.'/tmp/demo_retail/bronze/orders';

-- Dedup & filter
CREATE OR REPLACE TABLE silver_orders_curated AS
WITH ranked AS (
  SELECT *,
         row_number() OVER (PARTITION BY order_id ORDER BY order_ts DESC) AS rn
  FROM silver_orders
)
SELECT * FROM ranked WHERE rn = 1 AND status_std = 'Completed';

-- Gold aggregates
CREATE OR REPLACE TABLE gold_daily_by_channel AS
SELECT
  date(order_ts) AS order_date,
  channel,
  sum(line_amount) AS revenue,
  count(DISTINCT order_id) AS orders,
  sum(qty) AS units
FROM silver_orders_curated
GROUP BY date(order_ts), channel;
```