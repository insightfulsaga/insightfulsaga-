---
id: linear-regression-model
title: Linear Regression - Explained Simply
sidebar_label: Linear Regression
description: Predict ride fares using a linear regression model in a real-world example.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### 🚕 Predicting Ride Fares with Linear Regression

Imagine you’re part of a data science team at a ride-sharing company — something like **Uber** or **Lyft**.

Your product manager asks:

> 🧠 “Can we predict the fare price of a ride based on distance, traffic, time of day, and weather?”

This sounds like a perfect job for **Linear Regression** — one of the simplest yet most powerful algorithms for predicting **continuous values** such as prices, distances, or durations.

---

## 🧩 Understanding the Problem

Your company has collected millions of historical ride records.  
Here’s a small sample of what that data might look like:

| Distance (km) | Time of Day | Traffic Level | Weather | Fare ($) |
|---------------|-------------|---------------|----------|-----------|
| 3             | Morning     | Low           | Clear    | 6.50      |
| 5             | Evening     | High          | Rainy    | 12.00     |
| 10            | Afternoon   | Medium        | Clear    | 18.00     |

Your goal is to train a model that can **learn from this data** and **predict fares for future rides** — even those it hasn’t seen before.

🎯 In short: given ride details like **distance**, **traffic**, and **weather**, the model should estimate a fair and accurate fare.

That’s where **Linear Regression** comes in — it’s a perfect first model to learn and apply.

---

## 📘 What Is Linear Regression?      
**Linear Regression** is a **supervised learning algorithm** used to predict a **numeric (continuous)** value from one or more input variables (called *features*).

The intuition is simple:  
> The output (fare) changes *linearly* with the inputs (distance, time, traffic, etc.).

---

### 📐 The Formula

```text
y = w1·x1 + w2·x2 + ... + wn·xn + b
```
| Term              | Meaning                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| `y`               | The value you want to predict (e.g., fare)                              |
| `x1, x2, ..., xn` | The input features (e.g., distance, time, traffic)                      |
| `w1, w2, ..., wn` | The weights — how important each feature is                             |
| `b`               | The bias — the base value when all inputs are zero (like a booking fee) |


So, in our case:
```text
fare = w1*distance + w2*time + w3*traffic + w4*weather + b
```

## How It Works in Practice    

Let’s assume your model is trained with these features:   

x1 = distance (in km)
x2 = hour (time of day)
x3 = traffic level (numeric scale)
x4 = weather (rain = 1, clear = 0)

The trained model will then predict fares using:  
```text
fare = w1*distance + w2*hour + w3*traffic + w4*rain + b
```
This equation becomes your ride fare prediction engine.  


## Let’s Code It (with PySpark)     

Using PySpark, you can easily train a Linear Regression model that scales to millions of rows.   

Here’s a simple example:  
```python  
from pyspark.ml.regression import LinearRegression
from pyspark.ml.feature import VectorAssembler

# Sample training data
data = [
    (3, 8, 1, 0, 6.5),
    (5, 18, 3, 1, 12.0),
    (10, 14, 2, 0, 18.0)
]
df = spark.createDataFrame(data, ["distance", "hour", "traffic", "rain", "fare"])
```

**Step 1: Combine Features with VectorAssembler**   
PySpark’s machine learning models expect all input features to be combined into a single column called features.
That’s exactly what the VectorAssembler does — it merges multiple columns (like distance, hour, etc.) into one feature vector.

```python
assembler = VectorAssembler(
    inputCols=["distance", "hour", "traffic", "rain"],
    outputCol="features"
)
df_features = assembler.transform(df).select("features", "fare")
```

**Step 2: Train the Linear Regression Model**
```python
lr = LinearRegression(featuresCol="features", labelCol="fare")
model = lr.fit(df_features)
```

**Step 3: Make Predictions**
```python
predictions = model.transform(df_features)
predictions.show()
```

**Step 4: Inspect the Learned Model**

Let’s check what the model learned — the weights (w) and bias (b):
```python
print("Weights (w):", model.coefficients)
print("Bias (b):", model.intercept)
```
**Example Output**
```text
Weights (w): [1.5, 0.2, 2.0, 1.0]
Bias (b): 3.0
```

So your model equation is:
```text
fare = 1.5*distance + 0.2*hour + 2.0*traffic + 1.0*rain + 3.0
```

**Step 5: Test the Model on a New Ride**
Let’s plug in a new ride:

* Distance: 7 km
* Hour: 17 (5 PM)
* Traffic: 2 (Moderate)
* Rain: 1 (Yes)
```text
fare = 1.5*7 + 0.2*17 + 2.0*2 + 1.0*1 + 3.0
     = 10.5 + 3.4 + 4.0 + 1.0 + 3.0
     = $21.90
```
**🎉 Predicted Fare: $21.90**

## Key Takeaways   

* Linear Regression is the foundation of many advanced ML models. 

* PySpark’s VectorAssembler combines columns into one feature vector for model training.   

* You can easily interpret model outputs to see which factors influence prices most.     

* Great for beginners to understand predictive modeling at scale.    


## 🧭 1-Minute Recap: Linear Regression    
| **Section**               | **Details**                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------- |
| **Use Case**              | Predict ride fare prices based on ride data (distance, time, traffic, weather).        |
| **Problem Type**          | Regression – predicting a **continuous** value (fare).                                 |
| **Algorithm**             | Linear Regression (Supervised Learning)                                                |
| **Model Formula**         | `y = w1·x1 + w2·x2 + ... + wn·xn + b`                                                  |
| **Target (`y`)**          | Fare (price of the ride)                                                               |
| **Features (`x1...xn`)**  | Distance, Hour, Traffic, Rain                                                          |
| **Weights (`w1...wn`)**   | Importance of each feature                                                             |
| **Bias (`b`)**            | Base fare (booking fee)                                                                |
| **Goal of Model**         | Find the best weights and bias to minimize prediction error                            |
| **Training Data Example** | `(distance=3, hour=8, traffic=1, rain=0, fare=6.5)`                                    |
| **Learned Model**         | `fare = 1.5*distance + 0.2*hour + 2.0*traffic + 1.0*rain + 3.0`                        |
| **Prediction Example**    | Distance=7, Hour=17, Traffic=2, Rain=1                                                 |
| **Predicted Fare**        | `$21.90`                                                                               |
| **You Learned**           | How to frame a regression problem, train a PySpark model, and interpret weights & bias |
