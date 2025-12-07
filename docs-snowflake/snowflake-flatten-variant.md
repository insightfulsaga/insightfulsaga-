---
id: snowflake-flatten-variant
title: Flatten Function & VARIANT Type — Real Use Cases
sidebar_label: Flatten & VARIANT
description: A practical story-driven guide on using Snowflake’s FLATTEN function with the VARIANT data type, including real-world examples for querying nested JSON, XML, and semi-structured data efficiently.
keywords:
  - Snowflake FLATTEN function
  - Snowflake VARIANT type
  - querying nested JSON
  - semi-structured data Snowflake
  - Snowflake data pipelines
  - Snowflake analytics
---

# Flatten Function & VARIANT Type — Real Use Cases

## ✨ Story Time — “I Need One Row Per Nested Item”

Kiran, a data engineer, receives nested JSON logs from an e-commerce platform:

```json
{
  "orderId": "1001",
  "customer": "Alice",
  "items": [
    {"itemId": "A1", "price": 50},
    {"itemId": "A2", "price": 30}
  ],
  "status": "shipped"
}
```

She wants **one row per item** for analytics.

> “If I don’t flatten this, aggregations become impossible,” she thinks.

Snowflake makes this easy with the **FLATTEN function** combined with **VARIANT**.

---

## FLATTEN Function:
FLATTEN is a table function that converts semi-structured arrays or objects (VARIANT, OBJECT, ARRAY) into a relational set of rows.

## VARIANT Type:
VARIANT is a Snowflake data type that can store semi-structured data like JSON, XML, or Avro in a single column.

---

## 🧱 Step 1: Store Semi-Structured Data in VARIANT

```sql
CREATE TABLE orders (
    order_id STRING,
    data VARIANT
);
```

Load JSON:

```sql
INSERT INTO orders (order_id, data)
VALUES ('1001', PARSE_JSON('{
  "orderId": "1001",
  "customer": "Alice",
  "items": [{"itemId": "A1", "price": 50}, {"itemId": "A2", "price": 30}],
  "status": "shipped"
}'));
```

* `data` stores the **entire JSON structure**
* Flexible for future fields or nested arrays

---

## 2️⃣ Step 2: Use FLATTEN to Expand Nested Arrays

```sql
SELECT
    order_id,
    data:customer AS customer_name,
    f.value:itemId AS item_id,
    f.value:price AS item_price
FROM orders,
LATERAL FLATTEN(input => data:items) f;
```

### Output:

| order_id | customer_name | item_id | item_price |
| -------- | ------------- | ------- | ---------- |
| 1001     | Alice         | A1      | 50         |
| 1001     | Alice         | A2      | 30         |

* Each nested item becomes a **separate row**
* Easy to aggregate, filter, and join with other tables

---

## 3️⃣ Step 3: Real-World Use Cases

### ✅ E-commerce Order Analytics

* Flatten `items` array
* Calculate revenue per product, per order

```sql
SELECT item_id, SUM(item_price) AS total_sales
FROM orders,
LATERAL FLATTEN(input => data:items) f
GROUP BY item_id;
```

### Output:

| item_id | total_sales |
| ------- | ----------- |
| A1      | 50          |
| A2      | 30          |

---
Explanation: Aggregates item prices across orders.

### ✅ Event Logs Analysis

JSON logs often contain **nested events** per user session:

```sql
SELECT user_id, f.value:eventType AS event_type, f.value:timestamp AS ts
FROM sessions,
LATERAL FLATTEN(input => data:events) f;
```

### Output:

| user_id | event_type | ts               |
| ------- | ---------- | ---------------- |
| U100    | login      | 2025-12-01 09:00 |
| U100    | click      | 2025-12-01 09:05 |
| U101    | login      | 2025-12-01 10:00 |

Explanation: Each nested event in the events array becomes its own row.

* Count events per type
* Detect anomalies
* Track user activity over time

---

### ✅ Marketing Campaigns

Nested JSON for campaign responses:

```sql
SELECT campaign_id, f.value:email AS email, f.value:clicked AS clicked
FROM campaigns,
LATERAL FLATTEN(input => data:responses) f
WHERE f.value:clicked = TRUE;
```
### Output:

| campaign_id | email                                   | clicked |
| ----------- | --------------------------------------- | ------- |
| C100        | [alice@mail.com](mailto:alice@mail.com) | TRUE    |
| C100        | [bob@mail.com](mailto:bob@mail.com)     | TRUE    |

Explanation: Only returns rows where the user clicked (clicked = TRUE).

* Track engagement
* Build dashboards
* Segment users easily

---

## 4️⃣ Step 4: Combine FLATTEN With Joins

Nested data often needs to join **reference tables**:

### Example Input Tables 

**orders**
```md
| order_id | data |
| -------- | ----- |
| 1001     | {"customer":"Alice","items":[{"itemId":"A1","price":50},{"itemId":"A2","price":30}]} |
```


**product_lookup**
| product_id | category    |
| ---------- | ----------- |
| A1         | Electronics |
| A2         | Books       |
| A3         | Furniture   |

```sql
SELECT o.order_id, o.customer_name, f.value:itemId AS item_id, p.category
FROM (
    SELECT order_id, data:customer AS customer_name, data:items AS items
    FROM orders
) o,
LATERAL FLATTEN(input => o.items) f
JOIN product_lookup p
ON f.value:itemId = p.product_id;
```
**Explanation**

**1. The subquery o extracts:**
* order_id
* customer_name
* items array (still nested)

**2. LATERAL FLATTEN(input => o.items) f expands each item in the items array into separate rows.**

**3. The JOIN with product_lookup matches each itemId to its category.**

### Output:

| order_id | customer_name | item_id | category    |
| -------- | ------------- | ------- | ----------- |
| 1001     | Alice         | A1      | Electronics |
| 1001     | Alice         | A2      | Books       |

* Flattening happens before the join, so each item becomes a row.
* Efficient for large datasets because Snowflake can prune micro-partitions before executing the join.

---

## 💡 Best Practices

1. **Flatten only arrays** — avoid unnecessary expansion
2. **Cast values** using `::TYPE` to ensure correct data type
3. Use **LATERAL FLATTEN** instead of nested loops for performance
4. Combine **filtering before flattening** to reduce scanned partitions
5. Consider **materialized views** for repeated flatten queries

---

## 🧪 Real-World Story — Kiran’s Dashboard

Kiran needs **top-selling items per month**:

1. Flatten `items`
2. Extract `price` and `itemId`
3. Aggregate by month

Result: **SQL query reduced 3 days of manual preprocessing to 5 minutes**, using only Snowflake SQL.

---

## 📘 Summary

Using **FLATTEN + VARIANT** in Snowflake:

* Converts nested arrays into **row-level data**
* Works with JSON, XML, Avro, Parquet
* Simplifies analytics on semi-structured datasets
* Reduces need for external ETL preprocessing
* Enables aggregation, joins, and BI dashboards efficiently

> With these tools, handling complex semi-structured data becomes **fast, flexible, and maintainable**.

---

# 👉 Next Topic

**Snowflake Sharing: Data Marketplace, Data Exchange & Secure Shares**
