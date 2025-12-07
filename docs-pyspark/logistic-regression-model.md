---
id: logistic-regression-model
title: Logistic Regression - Explained Simply
sidebar_label: Logistic Regression
---

## 🚀 Churn Predictor: Building an ML Model for Streaming Service
👀 Imagine This:

You’re a data scientist at a fast-growing streaming platform called Streamly. Your mission? Build a Churn Predictor — a smart system that guesses whether a user will cancel their subscription next month (1 = yes, 0 = no) based on their usage data.

Let’s walk through how you’d tackle this, step by step — just like a real-world ML project.

#### 📦 Step 1: Gather the Data

You collect raw user data:

* User demographics (age, gender, location)
* Subscription plan type
* Viewing habits (hours watched, number of sessions)
* Customer support interactions
* Payment history

And the key outcome: churned or not

#### 🧹 Step 2: Clean and Prepare

* Real-world data is messy.
* Some users have missing age or location — you fill those gaps with median values or common categories.
* Text fields like gender and plan type are converted into numerical labels.
* You remove irrelevant columns like user ID or signup timestamp, which don’t help prediction.

#### 🏗️ Step 3: Feature Engineering

You build a “feature bag” with variables likely to influence churn:

* Average weekly watch time
* Number of active days in the last month
* Whether they contacted support recently
* Payment failure counts
* Subscription tier (basic, standard, premium)
* Demographic features (age group, region)

#### 🤖 Step 4: Train the Model

You use Logistic Regression — a straightforward, interpretable classifier — to learn patterns from historical user behavior.

The model figures out, for example:

* Users with low watch time are more likely to churn.
* Premium subscribers churn less often.
* Frequent payment issues increase churn risk.

#### 📊 Step 5: Test and Evaluate

You evaluate your model on a holdout set using AUC — to check how well it distinguishes churners from loyal users.
An AUC score around 0.85 tells you the model is pretty good at predicting who’s likely to leave.

### Step 0: Sample Data (Before transformation)

Let’s suppose your raw data has 6 rows:

| Survived | Pclass | Sex    | Age  | SibSp | Parch | Fare   | Embarked |
| -------- | ------ | ------ | ---- | ----- | ----- | ------ | -------- |
| 0        | 3      | male   | 22.0 | 1     | 0     | 7.25   | S        |
| 1        | 1      | female | 38.0 | 1     | 0     | 71.283 | C        |
| 1        | 3      | female | 26.0 | 0     | 0     | 7.925  | S        |
| 1        | 1      | female | 35.0 | 1     | 0     | 53.100 | S        |
| 0        | 3      | male   | 35.0 | 0     | 0     | 8.050  | S        |
| 0        | 2      | male   | 27.0 | 0     | 0     | 21.000 | S        |

This is the “before” raw table in Spark (i.e. what final_data.show() would show before transformations).

### Step 1: Converting text to numeric — “Sex” and “Embarked”

The Logistic Regression spell requires numeric features only. So we convert:

* Sex (“male”, “female”) → an index → one-hot vector
* Embarked (“S”, “C”, “Q”, etc.) → index → one-hot vector

In our story:

* You ask an indexer to assign “female” → 0, “male” → 1 (or vice versa)
* Then you transform that index into a binary vector [1, 0] or [0, 1]
* Similarly for Embarked: maybe “S”→0, “C”→1, “Q”→2, then one-hot [1,0,0], [0,1,0] or [0,0,1].

So after the transformation, row 1 (female) might have:

* SexIndex = 0
* SexVec = [1.0, 0.0] (assuming female is first)
* EmbarkedIndex = 0
* EmbarkedVec = [1.0, 0.0, 0.0]

Thus the row becomes:
| Survived | Pclass | **SexVec** | Age  | SibSp | Parch | Fare   | **EmbarkedVec** |
| -------- | ------ | ---------- | ---- | ----- | ----- | ------ | --------------- |
| 0        | 3      | [0,1]      | 22.0 | 1     | 0     | 7.25   | [1,0,0]         |
| 1        | 1      | [1,0]      | 38.0 | 1     | 0     | 71.283 | [0,1,0]         |
| …        |        |            |      |       |       |        |                 |
You don’t see separate SexIndex and EmbarkedIndex columns in the final features — you only use the one-hot vectors for modeling.

### Step 2: Vector Assembler — “Packing your travel bag”

Now you have multiple pieces: Pclass (integer), SexVec (vector of length 2), Age (float), SibSp, Parch, Fare, EmbarkedVec (vector of length 3). The VectorAssembler takes all these into a single feature vector column named, say, features.

So the row becomes:
| Survived | features                                             |
| -------- | ---------------------------------------------------- |
| 0        | [3.0, 0.0, 1.0, 22.0, 1.0, 0.0, 7.25, 1.0,0.0,0.0]   |
| 1        | [1.0, 1.0, 0.0, 38.0, 1.0, 0.0, 71.283, 0.0,1.0,0.0] |
| …        | …                                                    |
(This vector concatenates: Pclass, SexVec (2 dims), Age, SibSp, Parch, Fare, EmbarkedVec (3 dims).)


### Step 3: Logistic Regression — “The Spell of Survival Odds”

Now you cast the logistic regression spell.
Intuitively:

You want to learn a function **𝑝=𝜎(𝑤𝑇𝑥+𝑏)p=σ(wTx+b)** that gives the probability of survival 𝑝p for a passenger with features x.

If p > 0.5 (or some threshold), you guess survived (1); otherwise death (0).

Logistic regression learns the weights 𝑤 and bias 𝑏 that best separate the survivors from non‑survivors, by maximizing likelihood (or minimizing log loss).

After training, for a test passenger, it produces:

* **rawPrediction** (a pair of scores, e.g. [score0, score1])
* **probability** (e.g. [0.28, 0.72])
* **prediction** (0 or 1) — where it picks the class with higher score.

So if for a passenger we get **prediction = 1**, we say “our spell guesses they survived.”

### Step 4: Evaluate — “How good is your spell?”

You need to judge how accurate your predictions are. Suppose on test data you see:
| Survived | prediction |
| -------- | ---------- |
| 0        | 0          |
| 1        | 1          |
| 0        | 1          |
| 1        | 1          |
| 0        | 0          |

You have false positives, false negatives etc.

The **BinaryClassificationEvaluator** (with metric “areaUnderROC” by default) computes AUC (Area under ROC curve). This measures how well your model separates the classes across all thresholds.

If AUC = 0.85, it means your spell (model) is pretty good: when it says “higher score → survived,” it's quite accurate.

## Narrated Explanation of Key Components

Here’s how you could explain each in story form:

**StringIndexer:** “You ask your indexer scribe: 'For each text label, assign a unique number so that the spell machines can handle it.'”

**OneHotEncoder:** “Now that you have numbers, you transform each into a one-hot flag array — kind of like picking which colored gem lights up for that label.”

**VectorAssembler:** “You gather all the little features and pack them into a single magical satchel called features.”

**Pipeline:** “You chain your steps — transformation spells + logistic spell — into a single pipeline, so you can do fit and transform in one shot.”

**LogisticRegression:** “The heart of the spell — it learns how each feature nudges survival odds, and computes a probability.”

**BinaryClassificationEvaluator:** “You need a judge. This metric tool looks at predictions and true labels and gives you a single score (AUC) on how well your spell performed overall.”


## 🧭 1-Minute Recap: Linear Regression 
| **Step**                   | **Description**                                             | **Key Concepts / Tools**                     | **Purpose / Output**                    |
| -------------------------- | ----------------------------------------------------------- | -------------------------------------------- | --------------------------------------- |
| **1. Gather**              | Collect user data (demographics, usage, payments)           | Raw attributes                               | Prepare input features + target (churn) |
| **2. Clean**               | Fill missing values, drop irrelevant fields                 | Imputation, Label Encoding                   | Make data usable for modeling           |
| **3. Feature Engineering** | Create meaningful features like watch time, support contact | Derived metrics                              | Capture churn signals                   |
| **4. Train**               | Fit Logistic Regression model                               | Logistic Regression                          | Learn patterns linked to churn          |
| **5. Evaluate**            | Test on holdout data using AUC metric                       | BinaryClassificationEvaluator                | Check model quality (e.g., AUC = 0.85)  |
| **Text → Numeric**         | Convert "Sex", "Embarked" to index + one-hot                | StringIndexer, OneHotEncoder                 | Make categorical features usable        |
| **Assemble Features**      | Combine all into a single vector                            | VectorAssembler                              | Create final input column: `features`   |
| **Prediction Output**      | Model gives score + probability + prediction                | `rawPrediction`, `probability`, `prediction` | Decide churn (1) or not (0)             |
| **Evaluate Prediction**    | Check how well prediction matches true label                | AUC (Area Under ROC)                         | Measure performance objectively         |
