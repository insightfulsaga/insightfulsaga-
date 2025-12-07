---
id: databricks-catalog-schema-table-permissions-rbac
title: Databricks Catalog, Schema & Table Permissions (RBAC)
sidebar_label: Permissions (RBAC)
description: A clear, easy-to-understand guide to Databricks Catalog, Schema, and Table Permissions using RBAC, including examples, principles, and real-world usage in the Lakehouse.
keywords:
  - Databricks permissions
  - RBAC
  - Databricks catalog
  - schema permissions
  - table access
  - Unity Catalog
---

# Databricks Catalog, Schema & Table Permissions (RBAC)

## 🔐 A Simple Story — “Too Many People, Too Much Data”

Imagine a company where:

- Analysts need access to Gold tables  
- Data engineers need access to Bronze/Silver  
- Data scientists need feature tables  
- Finance wants restricted datasets  
- Interns should not see sensitive customer info  

Without proper access controls, your Databricks environment becomes:

⚠️ Messy  
⚠️ Risky  
⚠️ Hard to audit  

What you need is a clean, structured permission system that controls **who can access what** — and keeps everything consistent.

This is where **RBAC (Role-Based Access Control)** in Databricks shines.

---

## 🗂 Understanding the Structure: Catalog → Schema → Table

Databricks organizes storage and permissions in **three layers**:

```

CATALOG
└── SCHEMA
└── TABLE / VIEW / FUNCTION

```

Think of it like:

- **Catalog** = entire building  
- **Schema** = floor inside the building  
- **Table** = rooms inside the floor  

You can set permissions at *any* level.

---

## 🏢 1. Catalog — The Top Level

A **catalog** contains schemas and tables.  
In Unity Catalog, this is the highest namespace.

Example:

```

hive_metastore
main
sales_catalog
ml_catalog

```

### Permissions Often Set Here:
- `USE CATALOG`
- `CREATE SCHEMA`
- `OWN`
- `READ FILES` (for external locations)

### Example:

```sql
GRANT USE CATALOG ON CATALOG sales_catalog TO analyst_team;
```

This allows the team to *see* and *navigate* the catalog.

---

## 🗄 2. Schema — Organizing Tables

A **schema** groups related objects.

Examples:

```
sales_catalog
    ├── bronze
    ├── silver
    └── gold
```

### Permissions Often Set Here:

* `USE SCHEMA`
* `CREATE TABLE`
* `SELECT`
* `MODIFY`
* `OWN`

### Example:

```sql
GRANT USE SCHEMA ON SCHEMA sales_catalog.gold TO bi_team;
```

Now BI users can query tables inside the Gold schema.

---

## 📊 3. Table — The Most Detailed Level

Tables hold actual data.

Examples:

```
sales_catalog.gold.daily_revenue
sales_catalog.silver.cleaned_orders
```

### Permissions Often Set Here:

* `SELECT` (read data)
* `MODIFY` (insert/update/delete)
* `OWN` (full control)

### Example:

```sql
GRANT SELECT ON TABLE sales_catalog.gold.daily_revenue TO finance_team;
```

Now finance users can read the Gold revenue table — and only that table.

---

## 🧠 Important RBAC Concepts

### ✔ Ownership

Every object (catalog, schema, table) has an **owner**.

Owners can:

* Modify
* Grant permissions
* Drop objects

You typically assign ownership to:

* Admin groups
* Data engineering teams

---

### ✔ Principle of Least Privilege

Always give only the access required:

* Analysts → Gold
* Data Scientists → Feature tables
* Engineers → Bronze/Silver
* Finance → Restricted Gold tables
* Interns → Only learning datasets

This keeps your environment safe and compliant.

---

### ✔ Inheritance

If you grant a privilege at a **higher level**, it flows downward.

Example:

```sql
GRANT SELECT ON SCHEMA sales_catalog.gold TO bi_team;
```

This gives read access to **all tables** inside gold.

---

## 🧪 Practical Real-World Permission Patterns

### Pattern 1 — BI/Analytics Teams

Only Gold data is needed.

```sql
GRANT SELECT ON SCHEMA sales_catalog.gold TO bi_team;
```

---

### Pattern 2 — Data Engineers

Full control of Bronze/Silver.

```sql
GRANT MODIFY ON SCHEMA sales_catalog.bronze TO data_eng;
GRANT MODIFY ON SCHEMA sales_catalog.silver TO data_eng;
```

---

### Pattern 3 — Secure Financial Data

Only the finance group can read.

```sql
GRANT SELECT ON TABLE sales_catalog.gold.finance_metrics TO finance_team;
```

---

### Pattern 4 — External Tables

Need `READ FILES` privilege.

```sql
GRANT READ FILES ON EXTERNAL LOCATION finance_location TO finance_team;
```

---

## 🛡 Unity Catalog Makes RBAC Easy

Unity Catalog centralizes permissions across:

* Databricks SQL
* Notebooks
* Jobs
* MLflow
* Delta Lake

So the same RBAC rules apply everywhere — clean, consistent, reliable.

---

## 📘 Summary

* Databricks uses **Catalog → Schema → Table** for organizing data.
* RBAC (Role-Based Access Control) lets you define who can do what.
* You can control access at any level: catalog, schema, or table.
* Permissions include: `USE`, `SELECT`, `MODIFY`, `CREATE`, `OWN`, etc.
* Unity Catalog provides centralized, secure, enterprise-grade permission management.
* Always follow the **least privilege** model for safety and compliance.

RBAC ensures the Lakehouse stays clean, secure, and easy to manage as your organization grows.

---

# 👉 Next Topic

**Optimize Command (OPTIMIZE, Z-ORDER)**

