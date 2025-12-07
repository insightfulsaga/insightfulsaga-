---
id: databricks-governance-tags-classifications-policies
title: Databricks Governance — Tags, Classifications & Policies
sidebar_label: Governance — Tags & Policies
description: Learn how Databricks Governance helps manage data assets with tags, classifications, and policies to ensure data security, compliance, and integrity.
keywords:
  - Databricks Governance
  - Data Security
  - Tags and Classifications
  - Data Policies
  - Data Compliance
  - Data Integrity
---

# Databricks Governance — Tags, Classifications & Policies

## 🛡️ The Importance of Governance in Databricks

As organizations scale their data operations, ensuring that data is **secure**, **compliant**, and **well-managed** becomes paramount. Effective governance ensures that data is handled appropriately, with the right access, security measures, and policies applied throughout its lifecycle.

Databricks Governance provides robust tools like **tags**, **classifications**, and **policies** to help you govern data at scale. These tools allow data teams to enforce security, comply with regulations (like GDPR or HIPAA), and ensure that data is used responsibly.

In this guide, we’ll explore how you can leverage these tools to strengthen your data governance strategy.

---

## 🏷️ What Are Tags and Classifications?

### **Tags**:
Tags are labels that you can apply to data assets (like tables, views, and columns) to identify specific characteristics about the data. These characteristics might include data sensitivity (e.g., **PII**, **financial data**) or data ownership (e.g., **HR data**, **sales data**). Tags help you:

- Classify and organize data based on its type or sensitivity.
- Implement more granular data access controls.
- Enable efficient data discovery and auditing.

### **Classifications**:
Data classification is the process of categorizing data based on its level of sensitivity or criticality. For example:

- **Public**: Data that can be freely shared without restrictions.
- **Confidential**: Sensitive data that requires access controls.
- **Restricted**: Highly sensitive data that requires stringent access and security measures.

Using classifications helps you apply **data protection policies** automatically and ensures that the appropriate safeguards are in place for each class of data.

---

## 📜 Policies: Automating Data Governance

**Data policies** in Databricks help you automate governance tasks by defining rules for data access, security, and usage. With Databricks Governance, you can set policies that apply across your data assets based on tags, classifications, and other attributes. Policies help you:

- Ensure that only authorized users can access sensitive data.
- Automate **encryption** or **masking** of sensitive data.
- Implement **audit logging** and traceability to meet compliance requirements.

### Example of Policy Use Cases:

1. **Access Control Policy**: Automatically deny access to any data classified as **restricted** to unauthorized users.
2. **Encryption Policy**: Automatically apply **encryption** to data tagged as **PII**.
3. **Audit Policy**: Track all access to data classified as **financial** for regulatory audits.

Policies help enforce governance at scale, ensuring consistency and reducing the likelihood of human error.

---

## 🧑‍💻 Example: Applying Tags and Classifications in Databricks

Here’s how you can apply **tags** and **classifications** to a Databricks table to ensure proper governance:

```python
# Tagging a table with sensitivity level 'PII' (Personally Identifiable Information)
spark.sql("ALTER TABLE my_table ADD TAG 'sensitivity' = 'PII'")

# Classifying data as 'Confidential'
spark.sql("ALTER TABLE my_table SET CLASSIFICATION 'Confidential'")

# Setting a policy to mask PII data automatically
spark.sql("CREATE POLICY pii_masking ON TABLE my_table USING 'mask_data()'")
```

In this example:

* The **sensitivity** tag is used to mark the table as containing **PII** data.
* The **classification** is set to **Confidential** for added protection.
* A **masking policy** is applied to automatically redact sensitive data.

By applying tags, classifications, and policies, you ensure that your data is consistently governed and that security measures are applied automatically.

---

## ⚖️ Why Tags, Classifications, and Policies Are Crucial for Governance

### 1. **Data Security**:

Tags and classifications help you identify and protect **sensitive data**. By tagging data as **PII**, **financial**, or **confidential**, you can apply policies that ensure this data is **secured** and that access is restricted to only authorized users.

### 2. **Regulatory Compliance**:

Governance tools like tags and policies help you meet **compliance requirements** (e.g., **GDPR**, **CCPA**). By classifying data appropriately, you ensure that data is handled in a way that aligns with legal and regulatory frameworks.

### 3. **Auditing & Transparency**:

With proper tagging, classification, and policy enforcement, you can **audit** and track all actions on sensitive data. This transparency is critical for understanding **who** accessed the data and **how** it was used, which is vital for compliance audits.

### 4. **Efficient Data Discovery**:

Tags make it easy to organize and **discover** data based on its type, sensitivity, or ownership. For example, you can easily filter for all **PII** data across your Databricks environment and apply the necessary security measures.

---

## 🧠 When to Use Tags, Classifications, and Policies

Use Databricks Governance tools if:

* Your organization deals with **sensitive data** (e.g., PII, financial data) and you need to enforce strict **access controls**.
* You need to comply with **data regulations** like **GDPR**, **HIPAA**, or **CCPA** and want to automate compliance.
* You want to implement **automated security measures** like data masking or encryption.
* You need to track **data usage** and **auditing** to meet internal or external regulatory standards.

Avoid Databricks Governance tools if:

* Your data needs are **simple** and don’t involve sensitive data or regulatory compliance.
* You don’t have a large scale of data where automating governance policies would be beneficial.

---

## 🏛️ Databricks Governance Architecture

```
Data Assets (Tables, Views, Columns)
        ↓ Tagging & Classification
     Databricks Governance (Tags, Classifications, Policies)
        ↓ Secure Data Access
  Compliance (GDPR, HIPAA, CCPA)
```

In this architecture, **tags** and **classifications** are applied to your data assets, and governance policies are enforced automatically based on these attributes. This ensures **secure access** and helps you maintain **compliance** across your entire data pipeline.

---

## 📘 Summary

**Databricks Governance** with **tags**, **classifications**, and **policies** provides a robust, automated approach to securing and managing data. Tags and classifications help you organize and protect data, while policies automate security and compliance enforcement across your data pipeline.

By using Databricks Governance, you can ensure that your data is handled securely, remains compliant with regulations, and is easily auditable, all without manual intervention. This allows you to focus on **data analytics** and **insights**, knowing your data governance needs are taken care of.

---

# 👉 Next Topic

**Secret Scopes — Secure Credential Management**

```

