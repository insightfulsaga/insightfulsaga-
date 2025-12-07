---
id: snowflake-semi-structured-data
title: Handling Semi-Structured Data (JSON, XML, Avro)
sidebar_label: Semi-Structured Data
description: A story-driven guide to handling semi-structured data in Snowflake, including JSON, XML, and Avro, with practical examples, VARIANT data type, and query best practices.
keywords:
  - Snowflake semi-structured data
  - Snowflake JSON
  - Snowflake XML
  - Snowflake Avro
  - Snowflake VARIANT type
  - querying semi-structured data
---

# Handling Semi-Structured Data (JSON, XML, Avro)

## ✨ Story Time — “How Do I Query JSON in Snowflake?”

Arjun, a data engineer, just received a dataset from a new SaaS platform.

Problem:

- Data is **JSON files**
- Nested arrays, mixed types, dynamic fields
- Exported as **XML** for another system
- Some files in **Avro** format

He’s used to traditional relational tables and asks:

> “Do I need to flatten everything into columns? Do I need to preprocess outside Snowflake?”

The answer: **No. Snowflake makes semi-structured data easy.**

---

## 🧱 Step 1: Understanding Snowflake VARIANT Type

Snowflake uses **VARIANT** to store semi-structured data:

- JSON
- XML
- Avro
- Parquet
- ORC

### Example:

```sql
CREATE TABLE raw_data (
    id STRING,
    data VARIANT
);
```

**Input:**
Declaring a table with two columns (`id`, `data`).

**Output:**
An empty table `raw_data` is created successfully.

---

## 2️⃣ Loading Semi-Structured Data

### JSON Example:

```sql
COPY INTO raw_data
FROM @my_stage/json_files/
FILE_FORMAT = (TYPE = 'JSON');
```

**Input:**
JSON files staged in: `@my_stage/json_files/`

**Output:**
Rows inserted into `raw_data` with JSON parsed as VARIANT.

---

### XML Example:

```sql
COPY INTO raw_data
FROM @my_stage/xml_files/
FILE_FORMAT = (TYPE = 'XML');
```

**Input:**
XML files staged in: `@my_stage/xml_files/`

**Output:**
XML is parsed and stored in the VARIANT column.

---

### Avro Example:

```sql
COPY INTO raw_data
FROM @my_stage/avro_files/
FILE_FORMAT = (TYPE = 'AVRO');
```

**Input:**
Avro files located in: `@my_stage/avro_files/`

**Output:**
Avro data is loaded and schema interpreted automatically.

---

## 3️⃣ Querying JSON / XML / Avro

### JSON Example:

```sql
SELECT
    data:customer.name AS customer_name,
    data:customer.address.city AS city
FROM raw_data
WHERE data:customer.age > 30;
```

**Input (sample JSON):**

```json
{
  "customer": {
    "name": "John",
    "age": 35,
    "address": { "city": "Bangalore" }
  }
}
```

**Output:**

| customer_name | city      |
| ------------- | --------- |
| John          | Bangalore |

---

### XML Example:

```sql
SELECT
    data:"customer"."name"::STRING AS customer_name,
    data:"customer"."address"."city"::STRING AS city
FROM raw_data;
```

**Input (sample XML):**

```xml
<customer>
  <name>Arjun</name>
  <address><city>Hyderabad</city></address>
</customer>
```

**Output:**

| customer_name | city      |
| ------------- | --------- |
| Arjun         | Hyderabad |

---

### Avro Example:

```sql
SELECT
    data:key1::STRING AS key1_value,
    data:key2::NUMBER AS key2_value
FROM raw_data;
```

**Input:**
Avro record with fields `key1`, `key2`.

**Output:**

| key1_value | key2_value |
| ---------- | ---------- |
| "A123"     | 90         |

---

## 4️⃣ Flattening Nested Arrays

Example JSON:

```json
{
  "customer": "John",
  "orders": [
    { "id": 1, "amount": 100 },
    { "id": 2, "amount": 150 }
  ]
}
```

Query:

```sql
SELECT
    data:customer AS customer,
    f.value:id AS order_id,
    f.value:amount AS order_amount
FROM raw_data,
LATERAL FLATTEN(input => data:orders) f;
```

**Input:**
Orders array with two objects.

**Output:**

| customer | order_id | order_amount |
| -------- | -------- | ------------ |
| John     | 1        | 100          |
| John     | 2        | 150          |

---

## 🧪 Real-World Story — Arjun Queries SaaS Data

```sql
SELECT
    f.value:eventType AS event_type,
    COUNT(*) AS total_events
FROM raw_data,
LATERAL FLATTEN(input => data:events) f
GROUP BY event_type
ORDER BY total_events DESC;
```

**Input:**
VARIANT object containing millions of event records.

Example small sample:

```json
{
  "events": [
    { "eventType": "login" },
    { "eventType": "purchase" },
    { "eventType": "logout" }
  ]
}
```

**Output (example):**

| event_type | total_events |
| ---------- | ------------ |
| login      | 20000000     |
| purchase   | 15000000     |
| logout     | 10000000     |

---

## 💡 Best Practices

1. Use **VARIANT** for raw storage — flexible and efficient
2. **Flatten only when needed** — avoid unnecessary row explosion
3. Filter early to reduce scanned micro-partitions
4. Use **materialized views** for repeated queries
5. Cast fields using `::TYPE` when required

---

## 📘 Summary

Snowflake simplifies handling semi-structured data:

* Store JSON, XML, Avro directly in **VARIANT**
* Query with **dot notation** and **FLATTEN**
* Nested and dynamic fields supported
* No preprocessing or schema migration needed

> Handling semi-structured data becomes **fast, scalable, and simple**.

---

# 👉 Next Topic

**Flatten Function & VARIANT Type — Real Use Cases**

```


