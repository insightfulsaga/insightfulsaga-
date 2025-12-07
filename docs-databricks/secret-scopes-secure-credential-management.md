---
id: secret-scopes-secure-credential-management
title: Secret Scopes — Secure Credential Management
sidebar_label: Secret Scopes
description: Learn how to use Databricks Secret Scopes for securely managing credentials, API keys, and other sensitive information in your Databricks environment.
keywords:
  - Databricks Secret Scopes
  - Secure Credential Management
  - API Keys
  - Sensitive Data
  - Databricks Security
  - Secrets Management
---

# Secret Scopes — Secure Credential Management

## 🔐 Why Secure Credential Management Matters

In a modern data pipeline, sensitive information such as **API keys**, **database credentials**, and **access tokens** is often required to access various services and data sources. But storing these secrets in plain text, hardcoding them in your code, or storing them in a less secure location creates significant security risks.

Databricks offers **Secret Scopes** to securely manage and access secrets within your Databricks workspace. Secret Scopes help you keep sensitive credentials safe, while also simplifying access to them for your notebooks, jobs, and clusters.

In this article, we’ll explore how **Databricks Secret Scopes** work and how you can use them to manage your credentials securely and efficiently.

---

## 🧑‍💻 What Are Secret Scopes?

A **Secret Scope** in Databricks is a container for storing secrets, such as passwords, API keys, or any other sensitive information that your Databricks workspace needs to access. Secrets are stored securely and can only be accessed by users or services with the appropriate permissions.

### Key Features of Secret Scopes:
- **Secure Storage**: Secrets are encrypted and stored securely in Databricks, ensuring that sensitive information is protected.
- **Granular Access Control**: You can control who has access to specific secrets using permissions and roles.
- **Integration with Databricks**: Secrets stored in Secret Scopes can be easily accessed in Databricks notebooks, jobs, and clusters via environment variables or APIs.

---

## 🛠 How to Create and Use Secret Scopes

### 1. **Creating a Secret Scope**

Creating a Secret Scope is simple, and you can do it via the Databricks CLI, REST API, or the Databricks UI. Here’s an example of how to create a secret scope via the Databricks CLI:

```bash
databricks secrets create-scope --scope my_secret_scope
```

This command will create a new secret scope called **`my_secret_scope`**. You can now store secrets within this scope.

### 2. **Storing Secrets in the Secret Scope**

Once your secret scope is created, you can store secrets in it. Here’s an example of how to add a secret:

```bash
databricks secrets put --scope my_secret_scope --key my_api_key
```

This command will store the value for **`my_api_key`** in the **`my_secret_scope`**.

### 3. **Accessing Secrets in Notebooks or Jobs**

Once your secrets are securely stored, you can access them in your Databricks notebooks or jobs using the Databricks Secrets API or environment variables. Here’s how you access a secret in a notebook:

```python
# Accessing a secret in a Databricks notebook
import os
my_api_key = dbutils.secrets.get(scope="my_secret_scope", key="my_api_key")

# Use the secret
print(f"My API Key: {my_api_key}")
```

This will retrieve the **`my_api_key`** secret stored in the **`my_secret_scope`** and make it available in your notebook.

### 4. **Accessing Secrets in Clusters**

You can also configure your **Databricks clusters** to automatically use secrets as environment variables. This is particularly useful for jobs and cluster configurations that require credentials.

To set secrets as environment variables in a cluster configuration:

1. Go to the **Clusters** tab in Databricks.
2. Select a cluster and click **Edit**.
3. Under the **Advanced Options** section, go to **Environment Variables**.
4. Set the environment variable like this:

```
MY_API_KEY = {{secrets/my_secret_scope/my_api_key}}
```

When your cluster starts, it will automatically load the secret as an environment variable.

---

## 🚀 Benefits of Using Secret Scopes

### 1. **Enhanced Security**

Storing sensitive information such as API keys, passwords, and tokens in plaintext or hardcoding them into code is a significant security risk. **Databricks Secret Scopes** ensure that secrets are encrypted and stored securely, preventing unauthorized access.

### 2. **Centralized Secret Management**

With Secret Scopes, all your secrets are stored in a central, secure location, making it easier to manage and audit them. You can rotate secrets, revoke access, and track usage across all Databricks workspaces.

### 3. **Granular Access Control**

Secret Scopes allow you to control who can access secrets. You can define permissions for users, groups, or services, ensuring that only authorized entities can access sensitive data.

### 4. **Simplified Secret Access**

Databricks makes it easy to access secrets in your notebooks, jobs, and clusters. With simple APIs and environment variables, you can seamlessly integrate secrets into your workflows without compromising security.

---

## 🧠 When to Use Secret Scopes

Use Secret Scopes if:

* You need to **securely store** and **manage credentials** such as API keys, database credentials, and access tokens.
* You want to **integrate secrets** into Databricks notebooks, jobs, and clusters without hardcoding them into your code.
* You need to **enforce granular access control** for different users and services.
* You need to ensure compliance with **data security standards** like **GDPR**, **HIPAA**, or **SOC 2**.

Avoid Secret Scopes if:

* You don’t deal with **sensitive data** that requires encryption or access controls.
* You have a **small, isolated project** where credential management isn’t a concern.

---

## 📊 Secret Scopes Architecture Overview

```
Databricks Workspace
       ↓ Secret Scope
   (Encrypted Secrets)
       ↓ Access via Notebooks/Jobs/Clusters
       ↓ Secure Data Access
```

In this architecture, **Secret Scopes** serve as a secure container for sensitive information that is encrypted and only accessible by authorized users and services. You can access secrets directly in notebooks, jobs, and clusters, streamlining your workflow without compromising security.

---

## 📘 Summary

**Databricks Secret Scopes** provide a robust and secure way to manage sensitive data, such as API keys, passwords, and access tokens. By using Secret Scopes, you can ensure that credentials are stored securely and are only accessible to authorized users and services. This approach not only enhances data security but also simplifies credential management across your Databricks environment.

With **granular access controls**, **encryption**, and **seamless integration** into notebooks, jobs, and clusters, Secret Scopes help you manage credentials efficiently while maintaining a high level of security and compliance.

---

# 👉 Next Topic

**Service Principals — Machine Identity for Automation**

```

