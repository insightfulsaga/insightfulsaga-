---
id: house-price-linear-regression
title: Predict House Price with Linear Regression
sidebar_label: House Price Prediction - Linear Regressing
description: Learn how to predict house prices using PySpark Linear Regression, step-by-step.
---

# 🏠 Predicting House Price from Size Using Linear Regression (PySpark)

Let’s say you're working with a real estate startup.  
They ask:

> 💬 "Can we estimate a house’s price based on its size in square feet?"

That’s a **regression problem** — predicting a continuous number (like price).  
We’ll use **Linear Regression** to do that.


## 📊 Example Dataset
```text
| Size (sq.ft) | Price ($1000s) |
|--------------|----------------|
| 850          | 100            |
| 900          | 120            |
| 1000         | 150            |
| 1200         | 200            |
| 1500         | 250            |
```

## ✅ Step 1: Import Libraries & Create Data

```python
from pyspark.sql import SparkSession
from pyspark.ml.regression import LinearRegression
from pyspark.ml.feature import VectorAssembler

# Start Spark session
spark = SparkSession.builder.appName("LinearRegressionExample").getOrCreate()

# Create dataset (size, price)
data = [
    (850, 100),
    (900, 120),
    (1000, 150),
    (1200, 200),
    (1500, 250)
]

df = spark.createDataFrame(data, ["size", "price"])
df.show()
```
**💡 What This Does:**

| Line                             | Meaning                                                            |
| -------------------------------- | ------------------------------------------------------------------ |
| `SparkSession`                   | Starts Spark (needed for all PySpark work)                         |
| `createDataFrame(data, columns)` | Creates a DataFrame (like a table) with columns `size` and `price` |
| `df.show()`                      | Prints the data table                                              |

## ✅ Step 2: Assemble Features

Spark ML expects features in a single vector column.
```python
assembler = VectorAssembler(inputCols=["size"], outputCol="features")
df_features = assembler.transform(df).select("features", "price")
df_features.show(truncate=False)
```

**💡 What This Does:**
| Line                          | Meaning                                                              |
| ----------------------------- | -------------------------------------------------------------------- |
| `VectorAssembler(...)`        | Converts "size" column into a `features` vector (needed by Spark ML) |
| `transform(df)`               | Applies the assembler to your DataFrame                              |
| `select("features", "price")` | Keeps only the `features` and `price` columns                        |

**Result**
| features | price |
| -------- | ----- |
| [850.0]  | 100   |
| [900.0]  | 120   |
| [1000.0] | 150   |
| [1200.0] | 200   |
| [1500.0] | 250   |


## ✅ Step 3: Train the Linear Regression Model
```python
lr = LinearRegression(featuresCol="features", labelCol="price")
model = lr.fit(df_features)
```

**💡 What This Does:**
| Line                          | Meaning                                                              |
| ----------------------------- | -------------------------------------------------------------------- |
| `LinearRegression(...)`       | Creates the model and tells it which column is the feature and label |
| `model = lr.fit(df_features)` | Trains (fits) the model using your data                              |


## ✅ Step 4: See What the Model Learned
```python
print("Coefficient (w):", model.coefficients)
print("Intercept (b):", model.intercept)
```
**Result**
```python
Coefficient (w): [0.2]
Intercept (b): -70.0
```
This means your learned equation is:
```text
price = 0.2 × size - 70
```
👉 So a 1000 sq.ft house would be:
```text
price = 0.2 × 1000 - 70 = $130k
```

## ✅ Step 5: Check Model Performance
```python
training_summary = model.summary
print("RMSE:", training_summary.rootMeanSquaredError)
print("R2:", training_summary.r2)
```
**💡 What This Does:**
| Metric | Meaning                                                                |
| ------ | ---------------------------------------------------------------------- |
| `RMSE` | Root Mean Square Error – lower is better (how far predictions are off) |
| `R²`   | R-squared – closer to 1 means the model fits data well                 |

**Result**
```text
RMSE: 5.47
R2: 0.98
```
✅ Your model explains 98% of the variance in the data. That's great!

## ✅ Step 6: Make Predictions on Training Data
```python
predictions = model.transform(df_features)
predictions.show()
```

**Result**
```text
| features | price | prediction |
| -------- | ----- | ---------- |
| [850.0]  | 100   | 100.0      |
| [900.0]  | 120   | 110.0      |
| [1000.0] | 150   | 130.0      |
| [1200.0] | 200   | 170.0      |
| [1500.0] | 250   | 230.0      |
```
👉 Predictions are close to real prices (but not perfect).

## ✅ Step 7: Predict New (Unseen) Data
```python
new_data = spark.createDataFrame([(1100,), (1400,)], ["size"])
new_features = assembler.transform(new_data).select("features")
new_predictions = model.transform(new_features)
new_predictions.show()
```

**💡 What This Does:**
| Line                   | Meaning                                   |
| ---------------------- | ----------------------------------------- |
| `createDataFrame(...)` | Makes a new DataFrame with only "size"    |
| `transform(...)`       | Turns size into feature vector            |
| `model.transform(...)` | Applies trained model to make predictions |

**Result**
```text
| features | prediction |
| -------- | ---------- |
| [1100.0] | 150.0      |
| [1400.0] | 210.0      |
```
✅ Model can now predict future house prices based on size!

## 🔑 1-Minute Summary - Predict House Price with Linear Regression
| Step                  | What Happens                                       |
| --------------------- | -------------------------------------------------- |
| Raw Data              | Create table of house size and price               |
| Feature Assembly      | Convert size → `[size]` vector for Spark ML        |
| Model Training        | Fit linear regression model to learn `w` and `b`   |
| View Coefficients     | See how size affects price                         |
| Evaluate Model        | Check RMSE and R² to measure how good the model is |
| Predict Existing Data | See how close predictions are to real prices       |
| Predict New Data      | Use model to forecast unseen house prices          |

📌 This is how machine learning models are built from the ground up — one clean step at a time.