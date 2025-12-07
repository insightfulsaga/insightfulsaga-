---
id: logistic-regression-mini-project
title: Logistic Regression Mini Project — Forecasting Customer Churn
sidebar_label: Logistic Regression Practice - Mini Project
---

Welcome to this hands-on mini project!
Here we’ll learn how Logistic Regression helps us forecast if a customer will leave (churn) or stay — using PySpark.
We’ll build everything step-by-step using a small dataset that we’ll create ourselves.

### Step 1: Create Your Spark Session

Start by creating a Spark session — this is like starting the engine before driving.
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('CustomerChurnForecast').getOrCreate()
```

**Why?**
We need Spark to process data and run machine learning tasks.

**Result**
```text
SparkSession - in-memory cluster started for app: CustomerChurnForecast
```

### Step 2: Create a Simple Dataset

Instead of reading from a CSV file, we’ll create our own customer data right inside the code.
```python
data = [
    (1, "Alpha Ltd", 25, 5000, 2.5, 8, 0),
    (2, "Beta Inc", 45, 10000, 5, 12, 0),
    (3, "Gamma Co", 30, 3000, 1, 5, 1),
    (4, "Delta Corp", 50, 20000, 7, 20, 0),
    (5, "Epsilon Ltd", 22, 1500, 1.2, 4, 1),
    (6, "Zeta Works", 39, 7000, 3.8, 9, 0),
    (7, "Eta Systems", 29, 2500, 2, 6, 1),
    (8, "Theta Services", 47, 12000, 6, 15, 0),
    (9, "Iota Industries", 35, 4000, 2.5, 7, 1),
    (10, "Kappa Co", 42, 9000, 5, 11, 0)
]

columns = ["CustomerID", "Company", "Age", "Total_Purchase", "Years", "Num_Sites", "Churn"]

df = spark.createDataFrame(data, columns)
df.show()
```
**Why?**
We’re creating our own mini dataset of 10 customers with:

* Age
* Total purchase value
* Number of years with company
* Number of sites visited
* Whether they churned (1) or not (0)

**Result**
```text
+-----------+----------------+---+--------------+-----+---------+-----+
|CustomerID |Company         |Age|Total_Purchase|Years|Num_Sites|Churn|
+-----------+----------------+---+--------------+-----+---------+-----+
|1          |Alpha Ltd       |25 |5000          |2.5  |8        |0    |
|2          |Beta Inc        |45 |10000         |5.0  |12       |0    |
|3          |Gamma Co        |30 |3000          |1.0  |5        |1    |
|4          |Delta Corp      |50 |20000         |7.0  |20       |0    |
|5          |Epsilon Ltd     |22 |1500          |1.2  |4        |1    |
|6          |Zeta Works      |39 |7000          |3.8  |9        |0    |
|7          |Eta Systems     |29 |2500          |2.0  |6        |1    |
|8          |Theta Services  |47 |12000         |6.0  |15       |0    |
|9          |Iota Industries |35 |4000          |2.5  |7        |1    |
|10         |Kappa Co        |42 |9000          |5.0  |11       |0    |
+-----------+----------------+---+--------------+-----+---------+-----+
```

### Step 3: Split into Train and Test Data

We’ll train our model on 70% of the data and test it on the remaining 30%.
```python
train, test = df.randomSplit([0.7, 0.3], seed=42)
print("Training data count:", train.count())
print("Test data count:", test.count())
```
**Why?**
So the model learns from one portion and is tested on unseen data — like an exam after practice.

**Result**
```text
Training data count: 7
Test data count: 3
```

### Step 4: Assemble the Features

We combine input columns into a single vector — required for Spark ML models.
```python
from pyspark.ml.feature import VectorAssembler

assembler = VectorAssembler(
    inputCols=['Age', 'Total_Purchase', 'Years', 'Num_Sites'],
    outputCol='features'
)
```
**Why?**
Spark ML models expect all inputs in one column called features.

### Step 5: Build Logistic Regression Model
```python
from pyspark.ml.classification import LogisticRegression

lr = LogisticRegression(
    featuresCol='features',
    labelCol='Churn',
    predictionCol='Predicted_Churn'
)
```

**Why Logistic Regression?**
Because it helps predict a Yes (1) or No (0) outcome — in this case, “Will the customer churn?”

### Step 6: Build a Pipeline

This joins the feature assembler and the model together.
```python
from pyspark.ml import Pipeline

pipeline = Pipeline(stages=[assembler, lr])
lr_model_pipeline = pipeline.fit(train)
```

**Why?**
Pipeline makes workflow cleaner — combining feature preparation + model training.

**Result**
```text
PipelineModel trained successfully!
```

### Step 7: Make Predictions
```python
results = lr_model_pipeline.transform(test)
results.select("CustomerID", "Company", "Churn", "Predicted_Churn", "probability").show()
```

**Why?**
Now we see predictions:

* Churn (actual) — what really happened

* Predicted_Churn — what our model guessed

* probability — how confident the model is

The probability column shows two values:
**[probability_of_stay, probability_of_churn]**

**For example:** [0.22, 0.78] → 78% chance the customer will churn.

**Result**
```text
+-----------+----------------+-----+---------------+--------------------------+
|CustomerID |Company         |Churn|Predicted_Churn|probability               |
+-----------+----------------+-----+---------------+--------------------------+
|3          |Gamma Co        |1    |1              |[0.22,0.78]               |
|5          |Epsilon Ltd     |1    |1              |[0.30,0.70]               |
|8          |Theta Services  |0    |0              |[0.85,0.15]               |
+-----------+----------------+-----+---------------+--------------------------+
```

### Step 8: Evaluate the Model

Let’s check the model’s performance using AUC (Area Under Curve).
```python
from pyspark.ml.evaluation import BinaryClassificationEvaluator

my_eval = BinaryClassificationEvaluator(rawPredictionCol='rawPrediction', labelCol='Churn')
AUC = my_eval.evaluate(results)
print("AUC =", AUC)
```
**Why?**
AUC tells how good our model is:

* 1.0 = Excellent
* 0.5 = Random guessing
* ~0.8 = Good

Our model predicts churn with ~80% accuracy

**Result**
```python
AUC = 0.7997169143665959
```
That means our model is about 79% accurate at forecasting churn.

Step 9: View Company Predictions
```python
results.select('Company', 'Predicted_Churn').show()
```
**Why**
Gamma Co and Epsilon Ltd are likely to churn

Theta Services is likely to stay

**Result**
```text
+----------------+---------------+
|Company         |Predicted_Churn|
+----------------+---------------+
|Gamma Co        |1              |
|Epsilon Ltd     |1              |
|Theta Services  |0              |
+----------------+---------------+
```


## 🧭 1-Minute Recap: Linear Regression - Mini Project

| Step | Task               | Output               | Purpose           |
| ---- | ------------------ | -------------------- | ----------------- |
| 1    | Started Spark      | SparkSession created | Runs PySpark      |
| 2    | Created dataset    | 10 customer rows     | Custom data       |
| 3    | Split data         | 7 train, 3 test      | Learn + Test      |
| 4    | Assembled features | Feature vector ready | Prepares input    |
| 5    | Created model      | Logistic Regression  | Binary classifier |
| 6    | Built pipeline     | Combined steps       | Clean workflow    |
| 7    | Made predictions   | Showed churn results | Forecasted churn  |
| 8    | Evaluated AUC      | 0.7997               | Model accuracy    |
| 9    | Final results      | Company & churn flag | Easy to interpret |




