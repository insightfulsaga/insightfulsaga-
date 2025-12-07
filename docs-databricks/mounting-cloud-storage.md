---
id: mounting-cloud-storage
title: Mounting Cloud Storage — ADLS, S3 & GCS in Databricks
sidebar_label: Mounting Cloud Storage
description: A simple and beginner-friendly guide to mounting Azure ADLS, Amazon S3, and Google Cloud Storage (GCS) in Databricks.
keywords:
  - Databricks storage
  - mount ADLS
  - mount S3
  - mount GCS
  - Databricks beginners
  - how to mount storage Databricks
---

## Mounting Cloud Storage — ADLS / S3 / GCS

## 🌟 Simple Explanation (For Everyone)

Imagine Databricks is your **computer**, and your cloud storage (ADLS, S3, GCS) is like **an external hard drive**.

To use the files easily, you “plug in” the storage.  
In Databricks, this “plugging in” is called **mounting**.

After mounting, instead of using long, complicated cloud URLs, you get a simple folder:

```

/mnt/raw

```

This makes your life easier when reading or writing files.

---

## 🤔 Why Do We Mount Storage?

Because mounting:

- Makes paths shorter and easy to remember  
- Helps teams work in a clean, organized way  
- Lets you use cloud storage like a normal folder  
- Avoids repeating long URLs in every notebook  

Think of it like giving your cloud data a **nickname**.

---

## 🟦 Mounting Azure ADLS (Easy Version)

### What you need:
- A service principal (like a username + password for apps)
- Secrets stored safely in Databricks

### Example (simple):

```python
# Connect details for ADLS
configs = {
  "client-id": "<client-id>",
  "client-secret": dbutils.secrets.get("storage", "adls-secret"),
  "tenant-id": "<tenant-id>"
}

## Mount ADLS to /mnt/raw
dbutils.fs.mount(
  source = "abfss://raw@yourstorage.dfs.core.windows.net/",
  mount_point = "/mnt/raw",
  extra_configs = configs
)
```

Now you can access files like:

```
/mnt/raw/customers.csv
```

Easy!

---

## 🟧 Mounting AWS S3 (Easy Version)

### For beginners, the easiest method:

```python
dbutils.fs.mount(
  source = "s3a://your-bucket-name",
  mount_point = "/mnt/mybucket",
  extra_configs = {
    "aws-access-key": dbutils.secrets.get("aws", "access-key"),
    "aws-secret-key": dbutils.secrets.get("aws", "secret-key")
  }
)
```

After this, you can access:

```
/mnt/mybucket/orders.json
```

---

## 🟥 Mounting Google Cloud Storage (Easy Version)

### You need:

* A service account JSON file (stored safely in secrets)

```python
dbutils.fs.mount(
  source = "gs://your-gcs-bucket",
  mount_point = "/mnt/gcs",
  extra_configs = {
    "gcs-service-json": dbutils.secrets.get("gcp", "service-json")
  }
)
```

---

## 🧹 How to Unmount

If you no longer want the mount:

```python
dbutils.fs.unmount("/mnt/raw")
```

---

## 👍 Best Practices (Simple & Clear)

### ✔ Don’t store passwords in notebooks

Always use secrets.

### ✔ Use clean folder names

Examples:

```
/mnt/raw
/mnt/bronze
/mnt/silver
/mnt/gold
```

### ✔ Mount storage for shared data

Not for personal workspaces.

### ✔ Use direct cloud paths if mount is not needed

Mounting is helpful—but not required.

---

## 🎉 Summary (In One Minute)

* Mounting = making cloud storage appear like a normal folder
* It makes working with data much easier
* You can mount ADLS, S3, and GCS
* Use secrets to stay secure
* Use simple, clean folder structures

Mounts are the **first building block** of working smoothly in Databricks.
Once this is done, you’re ready for ingestion, Delta Lake, and the Medallion Architecture.

## 🚀 Coming Next

👉 **Autoloader — CloudFiles Ingestion End to End**
