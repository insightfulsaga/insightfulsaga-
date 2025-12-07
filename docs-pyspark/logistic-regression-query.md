---
id: logistic-regression-query
title: Logistic Regression - Practical handson
sidebar_label: Logistic Regression (handson)
---


## 2. Professional / Technical Style

Below is a refined technical exposition, including code, intermediate snapshots, and explanations of each component in proper ML / Spark terms.

### 2.1 Setup and Sample Data
```python
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName('LogitExample').getOrCreate()

# Let’s create a toy DataFrame instead of reading from file:
data = [
    (0, 3, "male",   22.0, 1, 0, 7.25,  "S"),
    (1, 1, "female", 38.0, 1, 0, 71.283, "C"),
    (1, 3, "female", 26.0, 0, 0, 7.925, "S"),
    (1, 1, "female", 35.0, 1, 0, 53.10, "S"),
    (0, 3, "male",   35.0, 0, 0, 8.05,   "S"),
    (0, 2, "male",   27.0, 0, 0, 21.0,   "S")
]
columns = ["Survived", "Pclass", "Sex", "Age", "SibSp", "Parch", "Fare", "Embarked"]
df = spark.createDataFrame(data, schema=columns)
df.show(truncate=False)
```
**Output (before transformations):**
```text
+--------+------+------+----+-----+-----+-------+--------+
|Survived|Pclass|Sex   |Age |SibSp|Parch|Fare   |Embarked|
+--------+------+------+----+-----+-----+-------+--------+
|0       |3     |male  |22.0|1    |0    |7.25   |S       |
|1       |1     |female|38.0|1    |0    |71.283 |C       |
|1       |3     |female|26.0|0    |0    |7.925  |S       |
|1       |1     |female|35.0|1    |0    |53.1   |S       |
|0       |3     |male  |35.0|0    |0    |8.05   |S       |
|0       |2     |male  |27.0|0    |0    |21.0   |S       |
+--------+------+------+----+-----+-----+-------+--------+
```

This corresponds to your **final_data.show()** before you apply transformations.

### 2.2 Transformations: Indexing, Encoding, Assembling
```python
from pyspark.ml.feature import StringIndexer, OneHotEncoder, VectorAssembler
from pyspark.ml import Pipeline

# Step 1: indexers
gender_indexer = StringIndexer(inputCol='Sex', outputCol='SexIndex')
embark_indexer = StringIndexer(inputCol='Embarked', outputCol='EmbarkedIndex')

# Step 2: one‑hot encoders
gender_encoder = OneHotEncoder(inputCol='SexIndex', outputCol='SexVec')
embark_encoder = OneHotEncoder(inputCol='EmbarkedIndex', outputCol='EmbarkedVec')

# Step 3: vector assembler
assembler = VectorAssembler(
    inputCols=['Pclass', 'SexVec', 'Age', 'SibSp', 'Parch', 'Fare', 'EmbarkedVec'],
    outputCol='features'
)

pipeline_features = Pipeline(stages=[
    gender_indexer, embark_indexer,
    gender_encoder, embark_encoder,
    assembler
])

# Fit and transform
model_feats = pipeline_features.fit(df)
df_transformed = model_feats.transform(df)
df_transformed.select("Survived", "features").show(truncate=False)
```
**Output (after transformations):**
```text
+--------+-------------------------------------------------------+
|Survived|features                                               |
+--------+-------------------------------------------------------+
|0       |[3.0, 1.0, 0.0, 22.0, 1.0, 0.0, 7.25, 1.0, 0.0, 0.0]     |
|1       |[1.0, 0.0, 1.0, 38.0, 1.0, 0.0, 71.283, 0.0, 1.0, 0.0]   |
|1       |[3.0, 0.0, 1.0, 26.0, 0.0, 0.0, 7.925, 1.0, 0.0, 0.0]    |
|1       |[1.0, 0.0, 1.0, 35.0, 1.0, 0.0, 53.1, 1.0, 0.0, 0.0]     |
|0       |[3.0, 1.0, 0.0, 35.0, 0.0, 0.0, 8.05, 1.0, 0.0, 0.0]     |
|0       |[2.0, 1.0, 0.0, 27.0, 0.0, 0.0, 21.0, 1.0, 0.0, 0.0]     |
+--------+-------------------------------------------------------+
```

Here:

* The vector length is 1 (Pclass) + 2 (SexVec) + 1 (Age) + 1 (SibSp) + 1 (Parch) + 1 (Fare) + 3 (EmbarkedVec) = 10 features
* For example, row 1: Pclass = 3, SexVec = [1.0, 0.0], Age = 22.0, SibSp = 1, Parch = 0, Fare = 7.25, EmbarkedVec = [1.0, 0.0, 0.0]

### 2.3 Logistic Regression Modeling
```python
from pyspark.ml.classification import LogisticRegression
from pyspark.ml.evaluation import BinaryClassificationEvaluator

lr = LogisticRegression(featuresCol='features', labelCol='Survived', predictionCol='prediction')

# Combine feature pipeline + logistic regression into a single pipeline
pipeline = Pipeline(stages=[gender_indexer, embark_indexer, gender_encoder, embark_encoder, assembler, lr])

train, test = df.randomSplit([0.7, 0.3], seed=42)
lr_pipeline_model = pipeline.fit(train)

# Apply to test set
results = lr_pipeline_model.transform(test)
results.select("Survived", "prediction", "probability").show(truncate=False)
```
**Output (example):**
```text
+--------+----------+--------------------------+
|Survived|prediction|probability               |
+--------+----------+--------------------------+
|1       |1.0       |[0.22, 0.78]              |
|0       |0.0       |[0.85, 0.15]              |
|0       |1.0       |[0.40, 0.60]              |
+--------+----------+--------------------------+
```
Here:

* probability = [p0, p1], where p1 is the model’s estimate of survival probability
* prediction is 1.0 if p1 >= 0.5, else 0.0
* On a row where Survived=0 but prediction=1.0, that’s a false positive

### 2.4 Evaluation with BinaryClassificationEvaluator
```python
evaluator = BinaryClassificationEvaluator(
    rawPredictionCol='rawPrediction',  # the default
    labelCol='Survived',
    metricName='areaUnderROC'
)
auc = evaluator.evaluate(results)
print("AUC = ", auc)
```

**Explanation:**

* BinaryClassificationEvaluator computes metrics for binary classification tasks
* **metricName = "areaUnderROC"** means Area Under the Receiver Operating Characteristic (ROC) curve
* The ROC curve plots True Positive Rate vs False Positive Rate at various thresholds
* AUC ranges from 0 to 1; a value closer to 1 means better separability
* If AUC = 0.5, the model is no better than random guessing
You could also use **metricName = "areaUnderPR"** (Area under precision‑recall curve).


### 2.5 Full Code (Concise) & Flow
```python
# 1. Read or create DataFrame → df  
# 2. Pipeline of transformations: StringIndexer, OneHotEncoder, VectorAssembler  
# 3. Append the LogisticRegression estimator  
# 4. Fit on train set, transform test set  
# 5. Inspect predictions + probabilities  
# 6. Use BinaryClassificationEvaluator to compute AUC  
```
The result is a trained logistic regression model that, given new passenger data, outputs survival probabilities and predictions.

## 🧭 1-Minute Recap: Linear Regression 
| **Step**                   | **Description**                                | **Key Tools / Concepts**              | **Output / Purpose**                 |
| -------------------------- | ---------------------------------------------- | ------------------------------------- | ------------------------------------ |
| **1. Gather Data**         | Collect user or passenger data                 | Features like age, gender, fare, etc. | Raw dataset                          |
| **2. Clean & Prepare**     | Handle missing values, drop irrelevant columns | Imputation, feature selection         | Cleaned DataFrame                    |
| **3. Feature Engineering** | Create meaningful features                     | E.g., watch time, payment failures    | Enriched feature set                 |
| **4. String Indexing**     | Convert text to numeric indexes                | `StringIndexer`                       | e.g., "male" → 1, "S" → 0            |
| **5. One-Hot Encoding**    | Convert index to binary vector                 | `OneHotEncoder`                       | e.g., SexVec = [0,1]                 |
| **6. Assemble Features**   | Merge all features into one vector             | `VectorAssembler`                     | Single `features` column             |
| **7. Train Model**         | Fit logistic regression on training data       | `LogisticRegression`                  | Model learns weights                 |
| **8. Predict**             | Predict on new/test data                       | `.transform()`                        | Outputs: `prediction`, `probability` |
| **9. Evaluate**            | Assess model performance                       | `BinaryClassificationEvaluator`       | Metric: AUC (e.g., 0.85)             |
| **10. Deploy**             | Use pipeline for new data                      | `Pipeline`                            | End-to-end repeatable workflow       |
