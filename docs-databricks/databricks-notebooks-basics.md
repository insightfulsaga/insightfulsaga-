---
id: databricks-notebooks-basics
title: Databricks Notebooks — Basics, Cells & Commands
sidebar_label: Databricks Notebooks
description: A beginner-friendly, story-style guide to Databricks notebooks, including how to use cells, commands, and collaborate effectively.
keywords:
  - Databricks notebooks
  - Databricks notebook cells
  - Databricks commands
  - Databricks beginner tutorial
  - Databricks interactive notebooks
---

# Databricks Notebooks — Basics, Cells & Commands

Welcome back to **ShopWave**, our fictional retail company.  
You’ve logged into Databricks, opened your cluster, and now it’s time to write your first notebook.  

Your senior engineer says:

> **“Think of a notebook as your lab notebook — each cell is a step in your experiment.”**

Let’s walk through it step by step.

---

## 🖥️ What Is a Databricks Notebook?

A **Databricks notebook** is an interactive web-based tool where you can:

- Write code in **Python, SQL, R, or Scala**  
- Run commands interactively  
- Document your workflow with **Markdown**  
- Visualize data and charts  
- Collaborate with teammates in real-time  

It’s the central workspace for **data engineers, analysts, and data scientists**.

---

## 🧩 Notebook Structure — Cells, Commands & Types

A notebook is made up of **cells**. Each cell can contain:

### 1️⃣ Code Cells
- Run your programming code (Python, SQL, Scala, R)  
- Execute transformations, queries, or ML training  
- Example:

```python
# Python code cell
sales = spark.read.table("sales")
sales.show(5)
```

### 2️⃣ SQL Cells

* Run queries directly against Delta tables
* Can also visualize data using built-in charting

```sql
-- SQL code cell
SELECT product_id, SUM(quantity) AS total_sold
FROM sales
GROUP BY product_id
ORDER BY total_sold DESC
LIMIT 10;
```

### 3️⃣ Markdown / Text Cells

* Add notes, explanations, and documentation
* Supports headings, lists, links, and images

```markdown
# Sales Analysis
This cell explains the top-selling products in Q3 2025.
```

---

## 🔥 Running Cells

* Press **Shift + Enter** → runs the current cell and moves to the next
* Press **Ctrl + Enter** → runs the current cell only
* Press **Alt + Enter** → runs the current cell and inserts a new one below

Your ShopWave workflow:

1. Engineer loads raw sales data in a Python cell
2. Analyst runs a SQL query cell to summarize data
3. Team adds Markdown notes for context
4. Visualize results in the same notebook

---

## 🧠 Magic Commands & Shortcuts

Databricks also has **magic commands**, which make notebooks super flexible:

| Command                | Use Case                                 |
| ---------------------- | ---------------------------------------- |
| `%sql`                 | Run SQL in a Python or Scala notebook    |
| `%python`              | Switch back to Python if in SQL notebook |
| `%md`                  | Render Markdown text                     |
| `%run ./notebook_path` | Import and run another notebook          |
| `%fs`                  | Work with Databricks File System (DBFS)  |

Shortcuts make you faster and improve collaboration.

---

## 🤝 Collaboration Features

Notebooks aren’t just for solo work—they are **team-friendly**:

* Real-time editing (like Google Docs)
* Comment on cells for discussion
* Version history to revert changes
* Git integration to track notebook changes

ShopWave’s ML team uses this to **experiment with models**, then merge the notebook into production workflows seamlessly.

---

## 📊 Visualizations in Notebooks

You can create:

* Bar charts
* Line charts
* Pie charts
* Scatter plots

Directly from SQL queries or DataFrames.
For ShopWave, visualizing top-selling products by region is one click away.

---

## 🏁 Quick Summary

* **Databricks notebooks** are interactive coding and documentation tools.
* Comprised of **cells**: Code (Python/SQL/Scala/R), Markdown, and Visualizations.
* **Magic commands** enhance functionality.
* Collaboration is seamless with **real-time editing, comments, version control, and Git integration**.
* Notebooks are essential for **data engineering, ML, analytics, and dashboard prep**.

---

# 🚀 Coming Next

👉 **Databricks Security Basics — Tokens, Users & Groups**


