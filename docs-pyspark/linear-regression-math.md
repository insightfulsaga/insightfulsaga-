---
id: linear-regression-math
title: Manual Linear Regression — Explained Step-by-Step
sidebar_label: Linear Regression (Manual Math)
description: Learn how to calculate slope and intercept manually using basic math and a lemonade example.
---

# 📐 Linear Regression — Manual Math Breakdown       

Let’s calculate everything **manually** to understand how PySpark computes slope (`w`) and intercept (`b`).    

---

## 🍋 Use Case: Lemonade Stand Sales     

| Temperature (x °C) | Sales (y units) |
|--------------------|-----------------|
| 20                 | 30              |
| 25                 | 50              |
| 30                 | 70              |
| 35                 | 90              |

## 📘 Step-by-Step Explanation of the Core Formulas    

We are trying to fit the equation:    

```text
y = w * x + b
```
Where:    

w is the slope    
b is the intercept    

To compute this manually, here are the steps:   

### 🧮 Step 1: Calculate the Mean of x-values   

To find the average (mean) of your input values:    
```text
x̄ = (x₁ + x₂ + x₃ + x₄) / 4
```
This gives you the center point of all the x-values (like average temperature).    

### 📊 Step 2: Calculate the Mean of y-values    

Same idea for the target values:    
```text
ȳ = (y₁ + y₂ + y₃ + y₄) / 4
```
This gives the average output (like average sales).    

### 📐 Step 3: Compute the Slope (w)     

This formula tells you how much y changes for every 1-unit increase in x:      
```text
w = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)²
```

**Breakdown:**      
-Subtract the mean from each x and y value to get how far each point is from the average.   
-Multiply the differences (xᵢ − x̄) and (yᵢ − ȳ) for each row.   
-Sum those products (this gives the numerator).    
-Then, square each (xᵢ − x̄), and sum them (this gives the denominator).   
-Divide numerator by denominator to get w (slope).    

### 📏 Step 4: Compute the Intercept (b)    

Once you have the slope, plug into this formula:     
```text
b = ȳ − w * x̄
```
**Meaning:**    
The intercept is the predicted value of y when x = 0. It "shifts" the line up or down to fit the data.     

**✅ Final Output**     

Put it all together:     
```text
y = w * x + b
```
Now you have a model that can predict future values of y (like sales) from new values of x (like temperature).     

## 2️⃣ Step-by-Step Calculation    
### Step 1: Calculate Means       

| x values       | y values       |
| -------------- | -------------- |
| 20, 25, 30, 35 | 30, 50, 70, 90 |

```text
x̄ = 27.5
ȳ = 60
```

### Step 2: Build Table      

| x          | y  | x - x̄ | y - ȳ | (x−x̄)(y−ȳ) | (x−x̄)² |
| ---------- | -- | ------ | ------ | ------------ | ------- |
| 20         | 30 | -7.5   | -30    | 225          | 56.25   |
| 25         | 50 | -2.5   | -10    | 25           | 6.25    |
| 30         | 70 | 2.5    | 10     | 25           | 6.25    |
| 35         | 90 | 7.5    | 30     | 225          | 56.25   |
| **Totals** |    |        |        | **500**      | **125** |

### Step 3: Calculate Coefficient & Intercept       
```text
w = 500 / 125 = 4.0
b = 60 - (4.0 × 27.5) = -50
```
✅ Final model: y = 4.0x - 50     

## 3️⃣ Test the Manual Model     

| x (°C) | Predicted y = 4x - 50 | Actual y |
| ------ | --------------------- | -------- |
| 20     | 30                    | 30 ✅     |
| 25     | 50                    | 50 ✅     |
| 30     | 70                    | 70 ✅     |
| 35     | 90                    | 90 ✅     |

🎯 Perfect fit!     

## 🔁 PySpark Comparison     

Here’s how the exact same model looks using PySpark:     
```python
from pyspark.ml.regression import LinearRegression
from pyspark.ml.feature import VectorAssembler

data = [(20, 30), (25, 50), (30, 70), (35, 90)]
df = spark.createDataFrame(data, ["temperature", "sales"])

assembler = VectorAssembler(inputCols=["temperature"], outputCol="features")
df_features = assembler.transform(df).select("features", "sales")

lr = LinearRegression(featuresCol="features", labelCol="sales")
model = lr.fit(df_features)

print("Coefficient:", model.coefficients)
print("Intercept:", model.intercept)
```
**Result**     
```text
Coefficient: [4.0]
Intercept: -50.0
```
✅ Matches the manual result exactly.     

**🎓 Why Learn This?**      
| Reason           | Benefit                                             |
| ---------------- | --------------------------------------------------- |
| Build intuition  | Understand what slope and intercept **really mean** |
| Debugging skills | Check if your ML models are making sense            |
| ML foundation    | You'll understand more complex models better later  |

## 🔑 1-Minute Summary — Manual Linear Regression (Lemonade Sales Example)

| **Step** | **What You Did** |
|-----------|------------------|
| 📊 **Raw Data** | Temperature and sales from a lemonade stall |
| 🧮 **Goal** | Fit a line `y = w*x + b` to predict sales from temperature |
| 📌 **Formulas Used** | Slope: `w = Σ(x_i - x̄)(y_i - ȳ) / Σ(x_i - x̄)²` <br /> Intercept: `b = ȳ - w*x̄` |
| 📈 **Mean Values** | `x̄ = 27.5`, `ȳ = 60` |
| ✍️ **Computed Table** | Calculated `(x - x̄)(y - ȳ)` and `(x - x̄)²` for all data points |
| ➕ **Sum of Products** | Numerator = `500`, Denominator = `125` |
| 📐 **Slope (w)** | `w = 500 / 125 = 4.0` |
| 🧾 **Intercept (b)** | `b = 60 - (4.0 * 27.5) = -50` |
| ✅ **Final Equation** | `y = 4.0x - 50` |
| 🔮 **Manual Predictions** | All predicted values match actual ones perfectly |
| 🔁 **Compared with PySpark** | PySpark model gave same result: Coefficient = `4.0`, Intercept = `-50.0` |
| 🧠 **Why This Matters** | Builds intuition, helps interpret model meaning, and validates ML results |


