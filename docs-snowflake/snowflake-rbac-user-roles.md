---
id: snowflake-rbac-user-roles
title: User Roles, Permissions, RBAC — Explained with Real Company Setup
sidebar_label: RBAC & Permissions
description: A simple, story-based explanation of Snowflake RBAC, user roles, permissions, and a real-world company hierarchy. Learn how Snowflake manages access control using roles instead of users.
keywords:
  - snowflake rbac
  - snowflake roles
  - snowflake permissions
  - snowflake access control
  - snowflake user management
---

# User Roles, Permissions, RBAC in Snowflake  
*A simple, story-driven guide to understanding Snowflake access control*

Imagine Snowflake as a giant digital office building.

Inside the building:
- Users = People working in the office  
- Roles = Keys to the rooms  
- Permissions = What each key unlocks  
- RBAC (Role-Based Access Control) = The security system that manages all keys  

Snowflake doesn’t give permissions *directly to people*.  
Instead, permissions are given to **roles**, and users are assigned roles.

This keeps the building safe, clean, and easy to manage.

Let’s walk through Snowflake RBAC in the simplest, clearest way.

---

## 🔑 1. What Is RBAC in Snowflake?  
**RBAC = Role-Based Access Control**  
A security model where:

```

Users → Assigned Roles → Roles Granted Permissions

```

You never grant privileges to users directly.

### Why?
Because:
- Users come and go  
- Roles stay forever  
- Permissions remain organized  
- Audits remain clean  

Snowflake’s RBAC model is widely considered one of the cleanest in the industry.

---

## 👥 2. Important Terms You Must Know

### **Users**
People or services connecting to Snowflake.

### **Roles**
The main objects that hold permissions.

Examples:
- `SYSADMIN`
- `USERADMIN`
- `SECURITYADMIN`
- `DATA_ENGINEER`
- `BI_ANALYST`

### **Grants**
Permissions attached to roles.

Examples:
- SELECT  
- INSERT  
- CREATE TABLE  
- USAGE  
- OPERATE  

### **Role Hierarchy**
Roles can be granted to other roles (like a family tree).

---

## 🏛 3. The Three Most Important Built-In Roles

### 🟦 1. SYSADMIN  
Builds databases, schemas, and tables.  
Owns most data objects.

Used by:
- Data engineers  
- Data architects  

### 🟩 2. SECURITYADMIN  
Manages:
- Roles  
- Grants  
- Permissions  

Used by:
- Security teams  
- Administrators  

### 🟧 3. USERADMIN  
Manages:
- Creating users  
- Assigning roles  

Used by:
- HR IT team  
- Platform engineers  

These roles are separate so that **no single person** has all power — governance done right.

---

## 🗂 4. Custom Roles — The Real Power of Snowflake

Built-in roles are strong, but real companies use **custom roles**.

Examples:
- `ROLE_DATA_ENGINEER`  
- `ROLE_ANALYST`  
- `ROLE_MARKETING_USER`  
- `ROLE_ETL_PIPELINE`  
- `ROLE_READONLY`  

You create custom roles to build a clean permission structure.

### Example: Create a custom role
```sql
CREATE ROLE ROLE_ANALYST;
GRANT ROLE ROLE_ANALYST TO USER JOHN;
```

---

## 🛡 5. How Permissions Work (Simple Explanation)

Think of permissions like keys:

### **Database-level keys**

* USAGE
* CREATE SCHEMA

### **Schema-level keys**

* USAGE
* CREATE TABLE
* CREATE VIEW

### **Table-level keys**

* SELECT
* INSERT
* UPDATE
* DELETE
* TRUNCATE

### Example Grant

```sql
GRANT SELECT ON TABLE SALES_DB.ANALYTICS.SALES TO ROLE ROLE_ANALYST;
```

Roles collect keys.
Users collect roles.
This is RBAC in action.

---

## 🧱 6. Real Company Example: A Clean RBAC Structure

Let’s imagine a mid-size company with 3 teams:

### ✔ Team 1: Data Engineering

Needs:

* CREATE TABLE
* INSERT/UPDATE
* Pipeline execution
* Warehouse usage

### ✔ Team 2: BI/Analytics

Needs:

* SELECT access
* Read-only dashboards

### ✔ Team 3: Executives

Needs:

* Limited SELECT on curated data
* No raw data access

Now let’s structure it using RBAC:

---

## 🧩 Step-by-Step Real RBAC Setup

### 👣 Step 1 — Create Custom Roles

```sql
CREATE ROLE ROLE_DATA_ENGINEER;
CREATE ROLE ROLE_ANALYST;
CREATE ROLE ROLE_EXECUTIVE;
CREATE ROLE ROLE_READONLY;
```

---

### 👣 Step 2 — Assign Users to Roles

```sql
GRANT ROLE ROLE_ANALYST TO USER ANALYST_1;
GRANT ROLE ROLE_DATA_ENGINEER TO USER DE_1;
GRANT ROLE ROLE_EXECUTIVE TO USER CEO;
```

---

### 👣 Step 3 — Grant Schema & Table Permissions

#### Data Engineers (full control on RAW & STAGE)

```sql
GRANT USAGE ON DATABASE RAW_DB TO ROLE ROLE_DATA_ENGINEER;
GRANT USAGE ON SCHEMA RAW_DB.RAW TO ROLE ROLE_DATA_ENGINEER;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA RAW_DB.RAW TO ROLE ROLE_DATA_ENGINEER;
```

#### Analysts (read curated only)

```sql
GRANT USAGE ON DATABASE PROD_DB TO ROLE ROLE_ANALYST;
GRANT USAGE ON SCHEMA PROD_DB.ANALYTICS TO ROLE ROLE_ANALYST;
GRANT SELECT ON ALL TABLES IN SCHEMA PROD_DB.ANALYTICS TO ROLE ROLE_ANALYST;
```

#### Executives (read from reporting schema only)

```sql
GRANT SELECT ON ALL TABLES IN SCHEMA PROD_DB.REPORTING TO ROLE ROLE_EXECUTIVE;
```

---

### 👣 Step 4 — Assign Warehouses to Roles

Roles need warehouse access to run queries.

```sql
GRANT USAGE ON WAREHOUSE WH_ANALYTICS TO ROLE ROLE_ANALYST;
GRANT USAGE ON WAREHOUSE WH_ETL TO ROLE ROLE_DATA_ENGINEER;
```

---

## 🏰 7. Role Hierarchy — Building the Security Pyramid

Most companies create a simple pyramid like this:

```
ORGADMIN
│
└── ACCOUNTADMIN
    │
    ├── SECURITYADMIN
    │     └── USERADMIN
    │
    └── SYSADMIN
          └── <Custom Department Roles>
                ├── ROLE_DATA_ENGINEER
                ├── ROLE_ANALYST
                ├── ROLE_MARKETING
                └── ROLE_EXECUTIVE
```

Meaning:

* Admins manage roles
* Sysadmins own objects
* Teams get custom roles

Super clean.
Super scalable.

---

## 🧠 8. Best Practices

### ✔ Use custom roles for all business teams

Do not assign SYSADMIN to everyone.

### ✔ Never grant privileges directly to a user

Always use roles.

### ✔ Use role hierarchy to simplify management

Parent roles → child roles → users.

### ✔ Separate “read” and “write” permissions

Avoid data accidents.

### ✔ Create dedicated service roles for pipelines

Avoid using human roles for automation.

### ✔ Periodically audit roles & unused privileges

Security stays tight.

---

## 🎯 One-Sentence Summary

**Snowflake RBAC gives permissions to roles—not users—making access control clean, scalable, and secure across your entire organization.**

---

# 🚀 Next Topic

👉 **Snowflake Web UI Tour — All Tabs Explained in Simple Words**

