---
id: databricks-managed-vs-external-tables
title: Tables in Databricks — Managed vs External
sidebar_label: Managed vs External Tables
description: A beginner-friendly, story-style explanation of Databricks managed and external tables, how they store data, and when to use each type in the Lakehouse.
keywords:
  - Databricks tables
  - managed tables
  - external tables
  - Delta Lake
  - Databricks catalog
  - data storage
---

# Tables in Databricks — Managed vs External

## 🧭 A Simple Story to Begin

Imagine Databricks has two types of “homes” where your tables can live.

### 🏠 Home Type 1: Databricks Takes Care of Everything  
You store your table and Databricks decides where to put the data files, how to organize them, and even cleans up after you.  
This is a **Managed Table**.

### 🏡 Home Type 2: You Bring Your Own Folder  
You point Databricks to a location you control in cloud storage (S3, ADLS, GCS).  
Databricks stores table metadata, but the actual files live where *you* choose.  
This is an **External Table**.

That’s the entire concept in one simple picture.

---

## 💼 What Is a Managed Table?

A **Managed Table** is one where:

- Databricks decides where the data files are stored  
- Data and metadata are both controlled by Databricks  
- Dropping the table **deletes the data files** automatically  
- Storage path lives inside your workspace’s managed storage location  

### 📦 Example

```sql
CREATE TABLE sales_bronze (
    id INT,
    amount DOUBLE
);
```

No `LOCATION` given → automatically **managed**.

### ✔ Benefits of Managed Tables

* Easiest to use
* Automatic cleanup
* Perfect for internal Lakehouse workflows
* Delta features work smoothly

### ✖ When Managed Tables Are NOT Ideal

* When multiple tools, systems, or teams need file-level access
* When you must keep tight control over the physical storage layout
* When you use external governance (e.g., AWS Glue, Unity Catalog external volumes)

---

## 📁 What Is an External Table?

An **External Table** stores:

* Metadata inside Databricks
* Data files *outside* Databricks (in a place you choose)

### 📦 Example

```sql
CREATE TABLE logs_raw
USING delta
LOCATION 'abfss://raw@datalake.dfs.core.windows.net/logs/';
```

You are telling Databricks:

> “My files are stored here — just manage the table definition.”

### ✔ Benefits of External Tables

* You control the cloud storage location
* Easier for sharing data with non-Databricks systems
* Good for multi-cloud or shared architectures
* File-level access is always available

### ✖ Downsides

* If you drop the table, the files **remain** (you must clean manually)
* More responsibility on your side
* Slightly more setup required

---

## 🔍 Managed vs External — The One-Sentence Difference

> **Managed tables store both metadata and data in Databricks.
> External tables store metadata in Databricks, but data in a location you choose.**

---

## 📝 How to Check Table Type

```sql
DESCRIBE DETAIL table_name;
```

You'll see:

* `type`: MANAGED or EXTERNAL
* `location`: where the data actually lives

---

## 🧠 When Should You Use Which?

### ✔ Use **Managed Tables** When:

* You want Databricks to handle everything
* You are building Bronze → Silver → Gold tables
* The data is internal to your Lakehouse
* You don't care about controlling the cloud path

### ✔ Use **External Tables** When:

* You must control your own storage folder
* You share files with other systems or teams
* You are migrating existing data into Databricks
* You use external governance/security layers
* Data must remain even if the table is dropped

---

## 📦 Simple Visual

```
Managed Table
 ├─ Metadata -> Databricks
 └─ Data Files -> Databricks-managed storage

External Table
 ├─ Metadata -> Databricks
 └─ Data Files -> Your cloud storage path
```

---

## 📘 Summary

* Databricks has two types of tables: **Managed** and **External**.
* Managed tables store both the data and metadata inside Databricks.
* External tables store metadata in Databricks but data in a location you choose.
* Managed tables are simple and great for internal Lakehouse workflows.
* External tables give you full control and are ideal for multi-tool ecosystems.
* Dropping a managed table deletes data; dropping an external table does not.

Both table types are essential — you choose based on how much control you need.

---

# 👉 Next Topic

**Delta Lake Overview — The Storage Layer of Databricks**


