---
id: unity-catalog-data-quality
title: Unity Catalog & Data Quality – Secure, Governed, and Trusted Data
sidebar_label: Unity Catalog & Data Quality
---

**Story**               
Imagine your company, **ChocoVault**, is a large chocolate manufacturer with multiple teams working on different data sets scattered across many tools and clusters. Previously, managing data access was like juggling many loose balls:

* Permissions were scattered across clusters, tables, and users.
* Different teams used different systems, creating confusion.
* Tracking who accessed or changed data was difficult.
* Sharing data between teams meant creating copies, wasting space, and causing version confusion.

In short, data governance was fragmented and complicated.

---

## The Solution: Unity Catalog — The Centralized Data Gatekeeper

Now, Unity Catalog acts as **one secure control tower** for all your company’s data in Databricks, providing:

* **Centralized Permissions:** Manage who can access data, no matter the workspace or cluster — all in one place.
* **Structured Data Organization:** Organize data like a library — Catalog (big container) → Schema (section) → Tables (books).
* **Audit & Lineage:** See who accessed or changed data, when, and track the full journey of data from source to final report.
* **Role-Based Access with SSO & SCIM:** Integrate with your company’s identity system so roles and permissions sync automatically.
* **Row/Column Level Security:** Protect sensitive data by hiding or filtering rows and columns based on who’s asking.
* **Cross-Workspace Sharing:** Share live data across teams without making multiple copies.



## Step-by-Step Story: How ChocoVault Uses Unity Catalog        

---

### 1. Creating the Data Framework: Catalog, Schema, and Tables           

You start by creating a **Catalog** called `choco_vault` (your entire data universe), a **Schema** called `Dairy_milk` (a section within the catalog), and a **Table** called `ghee_choco` which holds information about your products.     

```sql
Create Catalog choco_vault;
Use Catalog choco_vault;

Create Schema Dairy_milk;

Create Table Dairy_milk.ghee_choco (
    id INT,
    size INT,
    taste STRING
);
```

*Simple Explanation:*  
Think of this like setting up your data library with shelves (catalogs), book sections (schemas), and books (tables).

---

### 2. Controlling Access with Roles and Permissions           

You create groups for different teams like “Data Analytics” and “Data Engineers.” Then, assign them rights:      

* Analytics team can **view** the data.    
* Engineers can **change** the data structure.    

```sql
Grant Select on Table Dairy_milk.ghee_choco to 'Data Analytics';
Grant Modify on Schema Dairy_milk to 'Data Engineers';

Create Group Data_Analytics;
Create Group AMS_EDW_SUPPORT;

Alter Group Data_Analytics ADD User('hcprofs@company.com', 'ch@na.company.com');
```

*Simple Explanation:*    
This is like giving your marketing team permission to read sales reports, but only your engineers can update the product details.    

---

### 3. Fine-Grained Control: Row-Level Filtering    

You don’t want everyone to see all data. For example, only Indian users can see certain rows:   

```sql
Create or replace Function is_indian_user(user String)
Returns BOOLEAN
Return user IN ('harish@company.com', 'riya@company.com');

Alter Table Dairy_milk.ghee_choco 
SET ROW filter Dairy_milk.is_indian_user(added_by);
```

*Simple Explanation:*    
It’s like a filter that only shows each employee their own salary info or lets bank staff see only their branch’s data.

---

### 4. Checking Who Can Do What: Verifying Permissions    

You can easily check who has access to what with:   

```sql
Show Grants on Table Dairy_milk.ghee_choco;
Show Grants on Schema Dairy_milk;
```

*Simple Explanation:*   
This is your security checklist, making sure permissions are set correctly.

---

### 5. Auditing: Tracking All Data Access and Changes    

Unity Catalog logs every action on your data, so you can run queries like:     

```sql
select user_email, action_name, object_name, timestamp 
from system.access.audit
where object_name = 'ghee_choco'
order by timestamp DESC;
```

*Simple Explanation:*
You get a security camera feed of all who accessed or changed data — great for security and compliance.

---

### 6. Data Lineage: Seeing the Data’s Journey    

You can view the full path of data — from source systems (like databases or files), through all transformations (ETL jobs, filters), to dashboards and machine learning models.   

* Open the table in Data Explorer.   
* Click on the ‘lineage’ tab.   
* See exactly where the data came from and where it’s going.   

*Simple Explanation:*    
This helps answer questions like: “Where did this number come from?” or “What reports will break if we change this data?”

---

## Why Unity Catalog Matters:    

* **Data Privacy:** Employees only see their own data.    
* **Compliance:** Meet regulations by showing exactly who accessed sensitive info.   
* **Security:** Detect and stop unauthorized data access.   
* **Efficiency:** Manage all permissions from one place.   
* **Scalability:** Easily handle permissions as your company grows.   
* **Transparency:** Know exactly how data flows and changes.   

---

## Summary    

Unity Catalog is the **single source of truth for your data’s security and organization** in Databricks. It centralizes access control, organizes data cleanly, tracks everything for auditing, provides fine-grained security, and makes sharing easy and safe.    

---


## Data Quality     

Data Quality is like a cookie inspector who checks:-    
1. Are cookies were right size?   
2. Whether cookies are fully cooked or not?   
3. Do they have chocolate chips?   

that's Data Quality making sure that data is clean, correct and complete befone anyone sees it.    

**Professional:-**     
Define Rules(expectations) like:-      
In Delta Live Tables (DLT), you can define data quality rules called Expectations. These rules check incoming data before it lands in your live Delta table.     

⦁	No Nulls for customer_id    
⦁	quantity > 0    
⦁	Data must be valid    

### Tools:-      
Delta Live table, deeque, great expectations,    

## Benefits:-     
⦁	Prevents bad data entering silver/ gold layer   
⦁	Improves trust in dashboards and ML models   

### Query:-  
```sql
Create live table customers_cleaned
as select * from Stream(live.customers_raw)
EXCEPT(customer_is is not null) on voilation DROP ROW
EXCEPT(age>0)on voilation FAIL UPDATE;    
```

### Expectation Actions in DLT

**You can choose what happens if data violates a rule:-**    
DROP ROW → remove the bad row.    
FAIL UPDATE → stop the pipeline if bad data is found.    
DROP TABLE → remove entire table if quality check fails (rare).   
WARN → allow data but log a warning.  

### Why:-    
Guarantees data quality inside your Lakehouse.    
Prevents dirty data from polluting downstream analytics.   
Automates checks → no manual SQL cleaning later.    
