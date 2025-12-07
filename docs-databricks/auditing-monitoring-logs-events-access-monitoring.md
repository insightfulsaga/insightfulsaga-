---
id: auditing-monitoring-logs-events-access-monitoring
title: Auditing & Monitoring — Logs, Events & Access Monitoring
sidebar_label: Auditing & Monitoring
description: Learn how to set up auditing and monitoring in Databricks to track logs, events, and access to ensure compliance, security, and operational excellence.
keywords:
  - Databricks Auditing
  - Databricks Monitoring
  - Logs and Events
  - Access Monitoring
  - Databricks Security
  - Compliance
---

# Auditing & Monitoring — Logs, Events & Access Monitoring

## 🔍 The Importance of Auditing and Monitoring in Databricks

In any data-driven organization, **security**, **compliance**, and **operational performance** are crucial. As data pipelines scale and multiple teams access resources, it becomes increasingly important to track every interaction with your environment. This is where **auditing** and **monitoring** play a key role.

**Auditing** helps track who is doing what within your environment, while **monitoring** ensures that all system activities are visible, logged, and traceable. With **Databricks Auditing and Monitoring**, you can track **logs**, **events**, and **access** to ensure that your data pipeline is secure, compliant, and operating efficiently.

This guide explores the features and best practices for setting up and using auditing and monitoring in **Databricks** to improve visibility and maintain high security and compliance standards.

---

## 📜 What Is Auditing in Databricks?

Auditing is the process of recording and tracking **actions** that are performed within your Databricks environment. This includes:

- **User actions** (e.g., creating notebooks, running jobs, accessing data).
- **Access to sensitive data** (e.g., who accessed what tables, views, and clusters).
- **Changes to resources** (e.g., cluster configurations, notebook updates).

Databricks provides an **Audit Logs** feature that captures this data and stores it in an accessible format. These logs help you maintain transparency and track activities for **security**, **compliance**, and **operational monitoring**.

### Key Use Cases for Auditing:
- **Compliance Reporting**: Ensuring your organization meets regulatory standards (e.g., GDPR, HIPAA).
- **Security Monitoring**: Tracking potential unauthorized access to sensitive data.
- **Operational Visibility**: Understanding user activity, resource usage, and performance.

---

## 📊 Monitoring Events in Databricks

**Monitoring** involves continuously observing and logging **events** related to your environment's health and performance. These events can include:

- **Cluster Events**: Starting, stopping, or failing clusters.
- **Job Events**: Job success, failure, and execution details.
- **Resource Utilization**: CPU, memory, and storage usage across your resources.

Monitoring gives you real-time visibility into your environment’s health and helps you **detect anomalies**, address failures, and **optimize resources**.

### Key Metrics to Monitor:
- **Cluster health**: Keep track of cluster uptime, failures, and resource allocation.
- **Job performance**: Monitor job success rates, failure logs, and run times.
- **System performance**: Observe CPU, memory, and disk utilization for optimization.

Databricks provides integration with popular monitoring tools like **Azure Monitor**, **CloudWatch**, and **Prometheus**, allowing you to customize monitoring for your needs.

---

## 🔒 Access Monitoring — Tracking Who Accessed What

Access Monitoring involves keeping track of **who** accessed your Databricks resources and what they did with them. This includes:

- **User access to clusters**: Who created, started, or deleted clusters.
- **Data access**: Who accessed specific tables, notebooks, or datasets.
- **Permissions and role changes**: When users were granted or revoked permissions.

This type of monitoring is essential for ensuring that sensitive data and resources are only accessible to authorized users, which helps in meeting **security** and **compliance** standards.

### Best Practices for Access Monitoring:
- **Track sensitive data access**: Log every time sensitive data (e.g., PII, financial data) is accessed.
- **Regularly review permissions**: Ensure users only have the permissions they need to perform their job functions.
- **Set up alerts for suspicious access patterns**: Notify administrators of any unexpected access patterns, such as access outside of regular business hours.

---

## 🧑‍💻 How to Set Up Auditing and Monitoring in Databricks

### 1. **Enable Audit Logs**

Databricks offers a built-in **Audit Logs** feature that tracks various activities across your environment. Here's how to enable it:

1. Go to the **Admin Console** in Databricks.
2. Under the **Security** section, enable **Audit Logs**.
3. Configure the integration to send audit logs to an external storage service, such as **AWS S3**, **Azure Blob Storage**, or **Google Cloud Storage**.
4. You can now retrieve and analyze audit logs to track activities within your environment.

Example: **Querying Audit Logs**

```python
# Using Databricks REST API to retrieve audit logs
import requests

# Replace with your Databricks domain and token
url = 'https://<your-databricks-instance>/api/2.0/audit/events'
headers = {
    'Authorization': 'Bearer <your-access-token>',
}

response = requests.get(url, headers=headers)
audit_logs = response.json()
print(audit_logs)
```

### 2. **Set Up Event Monitoring with Cloud Integrations**

For event monitoring, Databricks integrates with **Azure Monitor**, **AWS CloudWatch**, and **Google Stackdriver** to capture and analyze system events. These integrations provide a centralized dashboard for real-time monitoring and alerting.

Example: **Setting up CloudWatch Monitoring for Databricks**

1. In your AWS Console, go to **CloudWatch**.
2. Set up a **Databricks CloudWatch Agent** to capture metrics related to your clusters, jobs, and resources.
3. Create custom **alarms** to notify you if a specific metric (e.g., CPU usage) exceeds a threshold.

### 3. **Access Monitoring with Role-Based Access Control (RBAC)**

Databricks uses **Role-Based Access Control (RBAC)** to manage user permissions. To track access:

1. Use the **Databricks CLI** or **REST API** to regularly export the list of users and their roles.
2. Enable **audit logging** for access to sensitive resources (e.g., tables, notebooks).
3. Set up **notifications** for any **unusual access patterns**.

Example: **Exporting User Roles Using the Databricks CLI**

```bash
databricks groups list-members --group-name <group-name>
```

This command lists all users in a specified group and their roles, helping you track access.

---

## 🚀 Benefits of Auditing and Monitoring in Databricks

### 1. **Security Compliance**

Auditing and monitoring ensure that your environment is **compliant** with regulations like **GDPR**, **HIPAA**, and **SOC 2**. By tracking user access and data handling, you can demonstrate that sensitive data is being properly protected.

### 2. **Operational Efficiency**

By continuously monitoring performance and usage, you can detect bottlenecks, optimize resource allocation, and troubleshoot issues faster. This ensures your data workflows are **efficient** and **cost-effective**.

### 3. **Risk Management**

With robust auditing and access monitoring, you can quickly identify and address **security risks**, unauthorized access, or unusual behavior within your environment, mitigating potential risks before they escalate.

### 4. **Transparency and Accountability**

Logging and monitoring every action in your environment ensures that your organization has complete **transparency** and accountability for every user action and system event, making it easier to identify and resolve issues.

---

## 🧠 When to Use Auditing and Monitoring

Use Auditing and Monitoring if:

* Your organization needs to meet **compliance standards** (e.g., GDPR, HIPAA) and must maintain detailed records of data access.
* You want to optimize **resource utilization** and identify areas for **performance improvement**.
* You need to **track** and **audit** all actions in your Databricks workspace for security or operational reasons.
* You are managing **sensitive data** and need to ensure that access and usage are monitored and controlled.

Avoid Auditing and Monitoring if:

* Your Databricks environment is **small-scale** and doesn’t require extensive logging or monitoring.
* Your organization does not have **regulatory compliance requirements** for tracking user activities and resource usage.

---

## 📊 Auditing & Monitoring Architecture Overview

```
Databricks Workspace
    ↓ User Actions & Resource Events
    ↓ Audit Logs (Tracking Activities)
    ↓ Event Logs (Cluster, Job, Resource Performance)
    ↓ Access Monitoring (RBAC, Permissions)
    ↓ Integration with Cloud Monitoring (e.g., CloudWatch, Azure Monitor)
    ↓ Real-time Alerts, Performance Dashboards
```

In this architecture, **Audit Logs** track user activities and data access, while **Event Logs** and **Cloud Integrations** ensure real-time monitoring of resource performance and system health. Combined with **Access Monitoring** through **RBAC**, Databricks gives you complete visibility into your environment.

---

## 📘 Summary

**Auditing and Monitoring** in Databricks is essential for maintaining security, compliance, and operational efficiency. By tracking **user activities**, **system events**, and **access to sensitive data**, you can ensure that your Databricks environment is secure and running smoothly.

With built-in tools like **Audit Logs**, **Cloud Monitoring Integrations**, and **Access Monitoring**, you gain


**visibility** into every action and event in your workspace, helping you respond quickly to potential issues, ensure compliance, and optimize performance.

---

# 👉 Next Topic

**Databricks Jobs — Scheduling Batch Processing**

```

