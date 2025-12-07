---
id: snowflake-governance-access-control-tags-policies
title: Snowflake Governance — Access Control, Tags & Policies
sidebar_label: Governance & Policies
description: A story-driven, practical guide to Snowflake’s governance framework, including access control, object tagging, dynamic data masking, and policy-based security for enterprise-grade data management.
keywords:
  - Snowflake governance
  - Snowflake access control
  - Snowflake security policies
  - Snowflake tags
  - Snowflake masking policies
  - Snowflake role-based access control
  - Snowflake data governance best practices
---

# Snowflake Governance — Access Control, Tags & Policies

## 🎬 Story Time — “Who Should See What?”

Meet **Nihal**, a data platform manager at a healthcare-tech startup.  
His problem? Every department wants access to data — but **everyone needs different slices**, with strict privacy rules.

- Finance wants revenue numbers  
- Doctors need clinical insights  
- Marketing needs engagement data  
- Analysts need everything (as usual 😄)  

But patient-identifiable information (PII) must be protected.  
Compliance requires auditing.  
Executives want centralized policy controls.

Nihal whispers:

> “We need governance… the Snowflake kind.”

---

## 🛡️ 1. Understanding Snowflake Governance

Snowflake’s governance is built on 4 pillars:

### **1. Access Control (RBAC)**  
Roles, privileges, grants.

### **2. Object Tags**  
Classify data: PII, confidential, department ownership, etc.

### **3. Policies**  
- Dynamic Data Masking  
- Row Access Policies  
- Tag-Based Masking Policies  

### **4. Monitoring & Auditability**  
Query history, Access History, and governance views.

Nihal uses these to create a secure, scalable environment.

---

## 🔐 2. Access Control — RBAC in Snowflake

Snowflake uses **Role-Based Access Control (RBAC)**.  
Think of it like *keys* to *rooms* in a building.

### 🔑 Key Roles Defined by Nihal

```sql
CREATE ROLE FINANCE_ANALYST;
CREATE ROLE CLINICAL_RESEARCHER;
CREATE ROLE MARKETING_USER;
```

Assign to users:

```sql
GRANT ROLE FINANCE_ANALYST TO USER david;
```

Grant privileges:

```sql
GRANT SELECT ON DATABASE health_data TO ROLE CLINICAL_RESEARCHER;
```

### Why RBAC works well

* Centralized control
* Least-privilege principle
* Easy to rotate users/teams
* Perfect fit for enterprise governance

---

## 🏷️ 3. Tags — The "Metadata Labels" That Power Governance

Nihal wants to classify sensitive columns:

* SSN → PII
* Phone Number → PII
* Address → Confidential
* Revenue → Financial

He creates Snowflake **tags**:

```sql
CREATE TAG data_classification COMMENT = 'PII, Confidential, Financial, Public';
```

Apply to columns:

```sql
ALTER TABLE patients MODIFY COLUMN ssn 
SET TAG data_classification = 'PII';

ALTER TABLE billing MODIFY COLUMN revenue 
SET TAG data_classification = 'Financial';
```

### Why tags are powerful:

* Visible across databases
* Searchable metadata
* Required for compliance audits
* Work with **policy automation**

---

## 🕵️‍♂️ 4. Policies — Automated Enforcement

Snowflake policies ensure consistent enforcement without manual intervention.

### 4.1 🔒 Dynamic Data Masking

Mask sensitive data based on role:

```sql
CREATE MASKING POLICY mask_ssn
AS (val STRING) RETURNS STRING ->
CASE
  WHEN CURRENT_ROLE() IN ('CLINICAL_RESEARCHER') THEN val
  ELSE 'XXX-XX-XXXX'
END;
```

Apply to column:

```sql
ALTER TABLE patients MODIFY COLUMN ssn 
SET MASKING POLICY mask_ssn;
```

---

### 4.2 ➡ Row Access Policies (RLS)

Filter rows based on user/role.

```sql
CREATE ROW ACCESS POLICY patient_region_rls
AS (region STRING) RETURNS BOOLEAN ->
region = CURRENT_REGION();
```

Apply to table:

```sql
ALTER TABLE patients
ADD ROW ACCESS POLICY patient_region_rls;
```

---

### 4.3 🎯 Tag-Based Masking Policies (Automation!)

Automatically mask data based on tag value.

```sql
CREATE MASKING POLICY pii_policy
AS (val STRING, tag_value STRING) RETURNS STRING ->
CASE
  WHEN CURRENT_ROLE() = 'COMPLIANCE_OFFICER' THEN val
  ELSE '********'
END;
```

Attach to PII-tagged columns:

```sql
ALTER TAG data_classification 
SET MASKING POLICY pii_policy;
```

Now *every column* tagged `PII` is masked automatically.

---

## 📊 5. Monitoring, Auditing & Compliance

Snowflake provides complete audit logs.

### Query History

```sql
SELECT *
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE USER_NAME = 'DAVID';
```

### Access History (Critical for Governance)

```sql
SELECT *
FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY
WHERE DIRECT_OBJECTS_ACCESSED:databaseName = 'HEALTH_DATA';
```

### Why it matters:

* Investigate data misuse
* Satisfy compliance (HIPAA, GDPR, SOX, PCI)
* Track sensitive data access
* Build dashboards for auditors

---

## 🧠 Best Practices for Snowflake Governance

1. **Create a central role hierarchy**
2. **Tag all sensitive data (PII, PHI, financial)**
3. Use **tag-based masking policies** for automation
4. Apply **least-privilege** for all roles
5. Audit access regularly
6. Separate **admin roles** from **analyst roles**
7. Maintain a **governance catalog** shared with compliance teams

---

## 🧩 Real-World Ending — “Compliance Is Now a Button”

After implementing governance:

* Masking became automatic
* Departments only saw approved data
* Auditors could see access logs instantly
* Policies scaled to new datasets without extra work

Nihal no longer fears compliance reviews.
His CTO says:

> “This is the governance foundation we should’ve had years ago.”

---

## 📘 Summary

Snowflake governance empowers organizations with:

### ✔ Role-Based Access Control

### ✔ Data Classification via Tags

### ✔ Dynamic Masking & Row Policies

### ✔ Automated Policy Enforcement

### ✔ Complete Auditability

Together, they create a **secure, compliant, scalable** data platform.

---

# 👉 Next Topic

**Dynamic Data Masking — Real Security Use Cases**

