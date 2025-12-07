---
id: snowflake-row-access-policies-rls
title: Row Access Policies — Row Level Security (RLS)
sidebar_label: Row-Level Security (RLS)
description: A story-driven guide explaining Snowflake Row Access Policies (RLS), including real-world enterprise security scenarios, SQL examples, multi-tenant architectures, and compliance-focused best practices.
keywords:
  - Snowflake row access policies
  - Snowflake RLS
  - Snowflake row level security
  - attribute based access control
  - Snowflake governance
  - data security snowflake
  - multi-tenant snowflake architecture
---

# Row Access Policies — Row Level Security (RLS)

## 🎬 Story Time — “Only Show Me My Region’s Data”

Ravi, a regional data manager at a global retail company, logs into Snowflake.

He runs a revenue dashboard query…  
But suddenly realizes:

> “Wait… am I seeing *everyone’s* revenue?”

Not good.  
Each region should only see its own data:

- North America → sees NA rows  
- Europe → sees EU rows  
- Asia → sees APAC rows  

Analysts should see all regions,  
but partners should only see theirs.

Snowflake’s **Row Access Policies (RLS)** save the day.

---

## 🛡️ 1. What Are Row Access Policies?

Row Access Policies restrict which **rows** a user or role may query.

They enforce security at row level by checking:

- user  
- role  
- attributes (e.g., employee region)  
- tags  
- lookup tables  

RLS is fully dynamic — enforced **during query execution**, not during data storage.

---

## 🔧 2. Create Your First RLS Policy

Ravi starts with a simple rule:

“Users in the NA role can only see region = 'NorthAmerica' rows.”

```sql
CREATE ROW ACCESS POLICY region_rls
AS (region STRING) RETURNS BOOLEAN ->
CASE
  WHEN CURRENT_ROLE() = 'NA_MANAGER' AND region = 'NorthAmerica' THEN TRUE
  WHEN CURRENT_ROLE() = 'EU_MANAGER' AND region = 'Europe' THEN TRUE
  ELSE FALSE
END;
```

Apply to the sales table:

```sql
ALTER TABLE sales 
ADD ROW ACCESS POLICY region_rls ON (region);
```

Now, each region manager sees only their rows.

---

## 🧩 3. Real Enterprise Use Cases for RLS

### ⭐ Use Case 1: Department-Based Security

Finance sees all rows.
HR sees only HR rows:

```sql
CREATE ROW ACCESS POLICY dept_rls
AS (department STRING) RETURNS BOOLEAN ->
CASE
  WHEN CURRENT_ROLE() = 'FINANCE_ANALYST' THEN TRUE
  WHEN CURRENT_ROLE() = 'HR_USER' AND department = 'HR' THEN TRUE
  ELSE FALSE
END;
```

---

### ⭐ Use Case 2: Multi-Tenant SaaS Architecture

Each tenant should only see their own data.

```sql
CREATE ROW ACCESS POLICY tenant_rls
AS (tenant_id STRING) RETURNS BOOLEAN ->
tenant_id = CURRENT_USER();
```

Perfect for:

* SaaS products
* Embedded analytics
* Shared databases for multiple customers

---

### ⭐ Use Case 3: Employee Hierarchy Access

Managers see rows for their employees; employees see only themselves.

```sql
CREATE ROW ACCESS POLICY employee_rls
AS (emp_id STRING) RETURNS BOOLEAN ->
emp_id = CURRENT_USER()
OR emp_id IN (
    SELECT subordinate_id 
    FROM employee_hierarchy 
    WHERE manager_id = CURRENT_USER()
);
```

This supports:

* Org charts
* Supervisory workflows
* Call center analytics

---

### ⭐ Use Case 4: Geo-Based Regulatory Compliance

EU employees cannot see US customer data due to GDPR rules.

```sql
CREATE ROW ACCESS POLICY geo_compliance_rls
AS (country STRING) RETURNS BOOLEAN ->
CASE
  WHEN CURRENT_REGION() = 'EU' AND country != 'USA' THEN TRUE
  WHEN CURRENT_REGION() != 'EU' THEN TRUE
  ELSE FALSE
END;
```

Built for international data locality requirements.

---

### ⭐ Use Case 5: RLS With Lookup Table (Best Practice)

Instead of hardcoding rules, Ravi uses a **mapping table**.

#### 1. Create mapping table

```sql
CREATE TABLE rls_map (
  role STRING,
  allowed_region STRING
);
```

#### 2. Create dynamic RLS policy

```sql
CREATE ROW ACCESS POLICY dynamic_rls
AS (region STRING) RETURNS BOOLEAN ->
region IN (
  SELECT allowed_region 
  FROM rls_map
  WHERE role = CURRENT_ROLE()
);
```

This approach scales to:

* thousands of stores
* hundreds of regions
* dozens of roles

Minimal SQL changes.

---

## 🔄 4. Applying RLS to Views, Tables & Columns

### Apply to a table:

```sql
ALTER TABLE orders ADD ROW ACCESS POLICY dynamic_rls ON (region);
```

### Apply to a secure view:

```sql
CREATE SECURE VIEW regional_view AS
SELECT * FROM orders;
```

RLS works automatically.

---

## 🧠 5. How RLS Works Behind the Scenes

When a query runs:

1. Snowflake evaluates the policy
2. Filters rows *before* query results
3. Applies masking policies afterwards
4. Returns only authorized data

RLS interacts seamlessly with:

* Tags
* Masking Policies
* Secure Views
* Access Control
* Snowflake Sharing (Secure Shares)

---

## 🧪 6. Testing RLS

Switch roles to validate:

```sql
USE ROLE NA_MANAGER;
SELECT region, revenue FROM sales;

USE ROLE EU_MANAGER;
SELECT region, revenue FROM sales;

USE ROLE ANALYTICS_TEAM;
SELECT region, revenue FROM sales;
```

Results differ by role — without modifying the actual table.

---

## 🧱 7. Performance Considerations

* RLS is metadata-based → no physical data copy
* Polices are evaluated at query time
* Works efficiently with micro-partition pruning
* Use lookup tables for scalable logic
* Complex expressions can slow queries → keep policies efficient

---

## 🌟 Best Practices

1. Use **lookup tables**, not hardcoded roles
2. Combine RLS with **masking** for column-level protection
3. Avoid nested CASE statements
4. Apply policies to **root tables**, not derived views
5. Document every RLS policy in a governance catalog
6. Audit row-level access using Access History
7. Use **Secure Views** for added protection when sharing data

---

## 🎉 Real-World Ending — “Secure Data, Happier Teams”

After deploying RLS:

* Regional managers see only their regions
* Analysts get full visibility
* Legal & compliance teams sleep peacefully
* No duplicate tables
* No custom ETL pipelines
* No manual partitions

Ravi's dashboard now shows only the right data to the right people.

His boss says:

> “This is security done right — invisible, accurate, and scalable.”

---

## 📘 Summary

Snowflake Row Access Policies provide:

### ✔ Row-level filtering

### ✔ Conditional visibility

### ✔ Multi-tenant isolation

### ✔ Regulatory compliance

### ✔ Real-time enforcement

### ✔ Seamless integration with governance tools

A critical component of any secure Snowflake data platform.

---

# 👉 Next Topic

**Snowflake Costs & Billing Dashboard — Monitoring Tips**

`
