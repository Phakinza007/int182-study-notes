---
title: "Decision Trees, K-means Clustering, and the Exam 1 scope review"
week: 5
type: lecture
date: 2026-09-04
tags: [data-science, decision-tree, entropy, information-gain, k-means, clustering, unsupervised-learning, exam1]
lang: en
base: "w05-decision-trees-and-k-means"
chapterKeys: ["agenda","01-exam-1--รายละเอียดทั้งหมดที่อาจารย์แจ้ง","02-ขอบเขตข้อสอบ--5-slide-sets","03-สูตรไหนออก-สูตรไหนไม่ออก","04-ทวน-association-rules","05-decision-tree--คืออะไร-อยู่ตรงไหนของภาพใหญ่","06-กายวิภาคของต้นไม้","07-ทำไมต้นไม้เตี้ยถึงดีกว่าต้นไม้สูง","08-entropy--ความวุ่นวายของกลุ่ม","09-information-gain--คำถามนี้ลดความวุ่นวายได้เท่าไหร่","10-ขั้นตอนการสร้างต้นไม้-id3","11-ตัวอย่างเต็ม--playtennis","12-stopping-condition-และ-overfitting","13-แบบฝึกหัด--ไอศกรีม-12-คน","14-decision-tree-ใน-orange","15-random-forest-พูดถึงผ่านๆ","16-k-means--clustering-คืออะไร","17-k-เป็น-hyperparameter","18-centroid","19-euclidean-distance","20-normalization-และเหตุผลว่าทำไมต้องทำ","21-ขั้นตอนของ-k-means","22-wcss-และ-elbow-method","23-k-modes-และ-k-prototypes","24-hard-vs-soft-clustering","25-ไล่สไลด์เก่า--จุดที่อาจารย์บอกว่าจะออกข้อสอบ","สรุปท้ายบท"]
glossaryKeys: ["Supervised learning","Unsupervised learning","Label / Target / Class label","Feature","Data point","Root node","Leaf node","Entropy","Information Gain (IG)","ID3","Stopping condition","Overfitting","Underfitting","Random Forest","Rule-based","Cluster","Clustering / Cluster analysis","K (ใน K-means)","Hyperparameter","Centroid","Euclidean distance","WCSS","Elbow method","Silhouette Score","Non-deterministic","K-modes","K-prototypes","Hard clustering","Fuzzy / Soft clustering","Normalization","Standardization (Z-score)","Preprocessing"]
---
> Built from the 4 Sep 2026 session (a 3 h 36 min recording, `INT182_20260904.docx`), on the decks `Decision Trees.pdf` (27 slides) and `K-means clustering basics.pdf` (25 slides) by Assoc. Prof. Dr. Pornchai Mongkolnam
>
> ⚠️ The transcript comes from automatic speech recognition and is **badly mangled** in long stretches (`เคมี` = K-means, `ดิสชั่นทรี` = decision tree, `เอ็นโทรพี่` = entropy, `อีฟเด่น` = if–then). Anything drawn from the transcript alone is marked *(from the transcript)*
>
> This was the last session before Exam 1. The lecturer split it four ways: **(1)** the exam announcement, **(2)** a refill of the Association Rules left over from class 4 (~30 min), **(3)** Decision Trees, **(4)** K-means — closing by walking the earlier decks page by page to say **exactly which points will be on the paper**

## Agenda

1. Exam 1 — everything the lecturer announced
2. The scope — five slide sets, and the one that was cut
3. Which formulas are examined and which are not
4. The Association Rules refill (pointer to W04)
5. Decision Tree — what it is, where it sits
6. The anatomy of a tree
7. Why a short tree beats a tall one
8. Entropy — how messy a group is
9. Information Gain — how much a question reduces that mess
10. The tree-building steps (ID3)
11. A full worked example — PlayTennis
12. Stopping conditions and overfitting
13. The exercise — 12 people and ice cream
14. Decision Trees in Orange
15. Random Forest (mentioned in passing)
16. K-means — what clustering is
17. K is a hyperparameter
18. Centroid
19. Euclidean distance
20. Normalization, and why it is necessary
21. The K-means algorithm
22. WCSS and the Elbow method
23. K-modes and K-prototypes
24. Hard vs soft clustering
25. The deck-by-deck exam walkthrough
26. Glossary
27. Chapter summary

---

## 01 Exam 1 — everything the lecturer announced

*(this section comes entirely from the transcript — confirm against the official announcement)*

| Item | Detail |
|---|---|
| Date | **Friday** of the following week. The lecturer said "in the evening" but was unsure himself — **check the announcement and the room again** |
| Questions | **50** |
| Format | **All multiple choice**, **single select**, **four options** a/b/c/d |
| Answering | **Bubble sheet filled in with pencil** (a sheet, not a booklet). Bring your own **2B pencil** — he could not remember whether it was 2B or HB, so take 2B |
| Marks | Every question is worth the same. The overall weighting may still be adjusted, because some material has not been taught yet |
| Time | **3 hours** — nearly 4 minutes a question. He expects 1–2 minutes each, so there is time to spare |
| Leaving early | Allowed after 1 hour, but he suggests staying at least 2 and re-reading |
| Calculator | **Not needed.** Not banned from the room, but it must be switched off and unused |
| Books / notes | **None** — closed book |
| Exams this term | **Two only** — this one and the final. Both written papers |

`ระวัง` *(from the transcript — the ASR is badly mangled here)*: there is a passage about "one volume" that may be brought in "in case you need to look up vocabulary in the questions", and about invigilators **checking whether anything has been written inside it**. That reads like a **dictionary** being permitted provided nothing is written in it — but the sentences are too corrupted to be certain. **Ask the lecturer or check the announcement before the exam.**

### How hard is it?

He had **Dr Cha (Kritsada)** review the paper. The verdict:

- Easy and hard questions mixed; Dr Cha said "some questions are hard"
- Hard because **the options are close together** — if you have only "heard it in passing" you will not be able to pick which one it actually is
- Some questions require **applying** the material rather than reciting a slide
- But if you have prepared, "you should be fine" — he hopes most people score **40+ out of 50**

### His own advice on preparing

Throw the slide PDFs into a Gen AI, have it summarise them, and **have it write practice questions for you**. He said this outright: "do whatever you like … I hope some will overlap, maybe not all of them" — the paper is a set he wrote himself.

### After the exam

- One week later he returns for **one more session** to finish the **Classification and Metrics** deck (~10 slides of theory)
- Then **Dr Chakrida** takes over for part 2, on **AI** — theory plus applications

---

## 02 The scope — five slide sets

He opened the class-material folder live and counted them out. **Five sets** are in scope:

| # | Slide set | File | Taught |
|---|---|---|---|
| 1 | **Intro to Data Science, Engineering and AI** | `INT182_01_Intro-to-DS-Engineering-and-AI.pdf` | W1 |
| 2 | **EDA – Model Fitting** | `INT182_02_EDA-Model-Fitting.pdf` | W3 |
| 3 | **Association Rules** | `Association rules.pdf` (19 slides) | W4 + this class's refill |
| 4 | **Decision Trees** | `Decision Trees.pdf` (27 slides) | this class |
| 5 | **K-means clustering basics** | `K-means clustering basics.pdf` (25 slides) | this class |

> ➤ **`Classification and Metrics.pdf` (71 slides) has been pulled out of the class material because it has not been taught — it is not on Exam 1.** His words: "this one isn't on it yet". It comes after the exam.

`เกร็ดเสริม`: the **AI Index Report 2026** (`ai_index_report_2026.pdf`) sits in the folder too. He called it background reading — he did not say it is examined.

---

## 03 Which formulas are examined and which are not

He was unusually explicit here, and this saves a lot of revision time.

| Formula | On the paper? | What he said |
|---|---|---|
| **Support** | ✅ **Yes** (probably one question) | "if it comes up, it's one" · support = the ratio of the frequency to the total |
| **Confidence** | ✅ Must be memorised | "support and confidence are the ones you have to remember" |
| **Lift** | ⚠️ "no need to memorise it right now" when teaching, though class 4 covered it fully | know the concept (lift > 1 / = 1 / < 1) |
| **Entropy** (−Σ pᵢ log₂ pᵢ) | ❌ **No** | "entropy isn't on it, it's too complicated … none of that log pᵢ business. **The concept is enough**" |
| **Information Gain** | ❌ The formula is not asked | you must know what it is and what it does |
| **Correlation** (Pearson) | ❌ The formula is not asked | "no need to memorise the formula, just know what positive and negative mean, that's enough" |
| **p-value** | ❌ Not asked | "you'd need statistics before you could explain it" |
| **R²** | ❌ Not asked | — |
| **Polynomial regression** | ❌ Not on it | — |
| **The algorithm's name (ID3)** | ❌ No need to memorise | "this is the algorithm's name, you don't need to remember it" |

---

## 04 The Association Rules refill

The first half hour re-covered Association Rules, because "last time I went a bit too fast". Nothing was new beyond class 4 — see **[W04-Association-Rules.en.md](../week4/W04-Association-Rules.en.md)**, which is more detailed.

What he repeated:

- **A rule needs at least one item on each side of the arrow** — neither the antecedent nor the consequent may be empty, so you need **at least 2 items** in total before you can build a rule
- **A 3-itemset generates 6 rules** — you have to swap through every direction
- The order of work: find the support of each itemset → discard anything below the threshold → generate rules from what remains → compute the confidence of every rule → discard anything below min confidence
- **Association Rule Mining = Market Basket Analysis (MBA)** — a synonym you need
- The famous example: "when a customer buys diapers, 80% will also buy beer". He said himself he does not know whether it is true or a joke
- **Association Rules are rule-based**, exactly like Decision Trees — both work on if–then

---

## 05 Decision Tree — what it is, where it sits

**Decision Trees are supervised learning** — learning *with* a teacher, meaning the data carries a **label** saying what each thing is.

Examples of a label he gave: this picture is a cat; this object is an apple; a house with 2 floors and this much floor area → what price?

### The other classifiers on slide 3

The deck lists five classification methods — **easy material for options**:

| Method | How it works |
|---|---|
| **K-nearest neighbors (KNN)** | predicts from the training points in the neighbourhood of the given test point |
| **Decision Trees (DT)** | split the dataset at every node on the value of a variable, then classify at a leaf from the aggregate class labels |
| **Naive Bayes (NB)** | classifies using data likelihood probabilities, **assuming features are independent** to simplify the model |
| **Logistic regression (LR)** | fits class probabilities with a **sigmoid function**, obtaining coefficients by **gradient descent** |
| **Support vector machine (SVM)** | learns the **hyperplane** separating two classes with the **maximum margin** |

`ระวัง`: the opening sentence of that slide is a definition that can be asked directly — **"In classification models the target variable or class label is categorical, whereas in regression the target variable is numeric."**

### What makes Decision Trees notable

**They do both classification and regression.** The deck shows both:
- **Classification**: "Play an outdoor sport?" → the label is Yes/No
- **Regression**: "Predict a house price" → the label is a **number**, and nodes compare greater-than / less-than

He stressed this is the model's **advantage**, and that other models share it.

---

## 06 The anatomy of a tree

| Part | Name | Meaning |
|---|---|---|
| The start | **root node** | the biggest node, the first question · **the most important one** |
| The middle | **decision node** / internal node | a **question** — written with a `?` |
| The lines out of a node | **branch** | the **answer** to that question |
| The ends | **leaf node** | a terminal point · it is a **label** (output), not a question |

### How many branches per node?

- **binary** = 2 ways (simplest, the default) → **binary classification**, yes/no
- **ternary** = 3 ways, or more → **multiclass classification**
- "two at a time is fine too … it depends on the application, all of them work"

`ระวัง` **The rule he repeated twice: an attribute used once may not be used again on the same path** — "if you've used Outlook, you shouldn't have Outlook again further down."

---

## 07 Why a short tree beats a tall one

The question he put to the room: a tree that is **not tall** but works well, versus a **tall** one — which is better?

**A short one**, because:
- it finishes sooner, using less energy and less computation
- **fewer questions is better**

His analogy: it is like **queuing, or going to the doctor** — there is a **screening** process, and the best screening is the one that **separates people fastest**. **The first question is the most important**, because it separates the most.

➤ **So the heart of a Decision Tree is: which feature do you ask first?** — answered by **Entropy + Information Gain**.

---

## 08 Entropy — how messy a group is

**Entropy measures how messy or impure a group is** (the deck's own wording).

The interchangeable words he listed — worth knowing because **an option may use any of them**:

| Word | Sense |
|---|---|
| **disorder** | not in order |
| **messy / mess** | untidy |
| **impure** | many things mixed together |
| **randomness** | random, not clear-cut |
| **uncertainty** | not straightforward |

### The values

| Value | State | The deck's example |
|---|---|---|
| **Entropy = 0** | **Perfectly Pure** — everyone in the group is the same category | reach into a bag of 10 Red Delicious apples → 0 uncertainty |
| **Entropy = 1** | **Maximum Mess** — a perfect 50/50 split | reach into a bag of 10 fruits, 5 apples and 5 oranges → no idea what you will pull out |

### His classroom analogy

- Everyone sitting **at random**, men and women mixed → **high entropy**, scattered and impure
- Screened so **men sit left, women sit right** → **low entropy**, cleanly separated and pure
- Sitting **strictly alternating**, man-woman-man-woman → **maximum mess**
- A room of only women → **entropy = 0 immediately**

➤ **Every question in the tree exists to make the groups as pure as possible, as fast as possible.**

`เกร็ดเสริม` The formula has `C` = **the number of classes** — play/don't play = 2, cat/dog/mouse = 3. **But the formula is not examined.**

---

## 09 Information Gain — how much a question reduces that mess

The deck: *"Information Gain measures how much a question reduces that messiness."*

```
Information Gain = Entropy(Parent Node) − Weighted Average Entropy(Child Nodes)
```

- **The parent's entropy minus the weighted entropy of the children**
- It must be **weighted** because each child holds a different number of data points — "sometimes this child gets more, that child gets less"
- **IG is a positive quantity — more is better**, because it means "we gained a lot of information"
- The deck defines it as *"the reduction in Entropy after you split your data based on a specific question (or feature)"*

➤ **Pick the feature with the highest IG as the question.**

---

## 10 The tree-building steps (ID3)

The deck names it **ID3 Algorithm by R. Quinlan, 1986**.

`ระวัง` The ASR renders the year as "2026", which is wrong — he goes on to say "**40 years ago**", which matches the deck's **1986** exactly. And **the algorithm's name need not be memorised**, by his own instruction.

| Step | What you do |
|---|---|
| **1** | Compute the **entropy of the whole dataset** (root/parent) |
| **2** | **Try each feature as the root** — split on each of its values, take each branch's entropy, then the weighted average |
| **3** | Compute **IG = Entropy(parent) − Weighted Entropy(branches)** for every feature and **pick the highest** |
| **4** | Draw the first split — root node and its children |
| **5** | **Recurse** — apply the same process to every subset, choosing that subset's best feature, and on into the grandchildren, **until a stopping condition is met** (pure node, max depth, minimum samples) |

---

## 11 A full worked example — PlayTennis

The deck calls it *"one of the most famous decision tree examples (Quinlan, 1986)"*.

**To play tennis or not?** — 14 rows, **9 "Yes"** and **5 "No"**.

Four features: **Outlook, Temperature, Humidity, Windy** (x₁…x₄, with the label as y).

### Step 1 — entropy of the whole set

From 9 Yes / 5 No out of 14 → **Entropy(full set) ≈ 0.94**

His reading of it: **0.94 is close to 1, so this dataset is not orderly at all** — Yes and No are thoroughly mixed. We start from high mess and drive it down.

### Step 2 — IG feature by feature

| Feature | Information Gain |
|---|---|
| **Outlook** | **≈ 0.247** ← highest |
| Humidity | ≈ 0.15 |
| Temperature | lower |
| Windy | lower |

➤ The deck states it flatly: *"Finally, the best split is Outlook (IG = 0.247) → Highest! So Outlook becomes the root node."*

### Step 3 — recurse down each branch

Outlook takes three values: **Sunny / Overcast / Rain**

| Branch | Size | Result |
|---|---|---|
| **Overcast** | 4 samples | **4 Yes, 0 No → pure node → a leaf, Yes, immediately** |
| **Sunny** | 5 samples (2 Yes + 3 No) | recompute IG on those 5 rows over Humidity/Temperature/Windy → **only Humidity splits well** · High = 0 Yes/3 No · Normal = 2 Yes/0 No |
| **Rain** | 5 samples (3 Yes + 2 No) | recompute over Temperature/Humidity/Windy → **Windy splits best** |

### The resulting tree

```
                    Outlook
        ┌──────────────┼──────────────┐
     Sunny         Overcast          Rain
        │              │               │
    Humidity          Yes            Windy
    ┌───┴───┐                      ┌───┴───┐
  High   Normal                  True    False
    │       │                      │       │
   No      Yes                    No      Yes
```

`ระวัง` **Note that as soon as a branch is pure (Overcast) it becomes a leaf and asks nothing further** — that is the first stopping condition.

---

## 12 Stopping conditions and overfitting

The question he says people always ask: **how deep should the tree go?**

The problem: left alone the program **does not stop** — it keeps splitting until each leaf holds one data point or none. That wastes time and produces a needlessly complicated tree.

### The stopping conditions in use

| Method | Meaning |
|---|---|
| **max depth** | fix the number of levels in advance |
| **minimum samples** | stop if fewer than *n* data points remain in a branch (say < 50) |
| **pure node** | if the node is already pure (entropy 0) it becomes a leaf |

### Overfitting

"Going too fine, too deep, until only a few data points are left at the bottom, is not actually good — because it has **learned too much from the data we trained on**."

His **tailoring** analogy *(from the transcript — and he said it will be examined)*:

| | The analogy | The meaning |
|---|---|---|
| **Overfitting** | a suit cut **exactly** for one person, a perfect fit | useless on anyone else, because sizes differ · it fits one group and is **not general** |
| **Underfitting** | a suit that is **too loose** | too little learning, also bad |

➤ **He said outright he will ask "what is overfitting?"**

---

## 13 The exercise — 12 people and ice cream

Slides 18–27 are a complete exercise with its solution.

**The brief**: 12 people were surveyed on what influences whether they would **buy ice cream**.

| Feature | Values |
|---|---|
| **Weather** | Sunny / Cloudy / Rainy |
| **DayOfWeek** | Weekend / Weekday |
| **HasMoney** | Yes / No |
| **CravingLevel** | how much they want it |
| **Target: BuysIceCream** | **Yes / No** |

### The tasks the deck sets

1. Entropy of the full dataset (before any split)
2. For each feature: split by value → entropy of each branch → weighted average → **IG = Root Entropy − Weighted Entropy**
3. Choose the highest IG
4. Draw the first split
5. Recurse until a stopping condition

### The solution

➤ **Weather has the highest IG → it becomes the root.** The deck draws **Rainy → No** as a finished leaf, leaving Sunny and Cloudy as `?` still to be split.

`เกร็ดเสริม` He read out one row: rain + weekend + has money + wants it badly → and that person **said no**. "It's just one of the data points they collected" — his way of pointing out that real data is not tidy.

---

## 14 Decision Trees in Orange

He demonstrated live in **Orange** on the same ice-cream dataset (sample files are in `code/`).

1. Load the data — **12 data points**, 4 feature columns, 1 **target** column
2. **Mark the target explicitly** — Orange flags it green, type **categorical**
3. Wire it into the Tree widget

### The parameters on the Tree widget

| Parameter | Effect |
|---|---|
| **Induce binary tree** | ticked = force binary · unticked = branch on however many values the feature actually has |
| **Max tree depth** | cap the depth |
| **Split subsets smaller than…** | the **stopping condition** — stop splitting once fewer than *n* rows remain |

**What he wanted noticed**: with binary ticked, Weather's three values get grouped — **Cloudy and Sunny together** on one side, **Rainy** on the other, to be separated later. Untick it and it **fans into three branches at once**.

➤ **So the tree looks different depending on whether binary is forced** — and neither version is wrong.

Orange annotates each node: 12 rows at the start (6 Yes / 6 No) → 4 left, 4 middle, 4 right · the Sunny branch ends 3 Yes / 1 No.

You can then wire **Test data → Prediction** (the example has 6 test cases) and read a **Test Score**.

---

## 15 Random Forest (mentioned in passing)

*(from the transcript — he said "we're not covering it, this basic one is enough for now")*

- A plain Decision Tree gives you **one tree**
- Someone reasoned that one tree may not do well — like deciding alone → **why not use many?**
- **Random Forest** = **100 / 200 / 300 / 500** trees, then **take the majority vote**
- Each tree must be **different** — different criteria for picking features, randomisation, a mix of tall and short trees
- **Diversity is the point.** If every tree were identical there would be nothing gained

---

## 16 K-means — what clustering is

**Clustering in data science = grouping similar data points together and putting the different ones in another group** — also called **cluster analysis**.

The deck: *"K-means clustering is one of the most popular and widely used **unsupervised** machine learning algorithms. It is used to group similar data points together into clusters, **without prior knowledge of the group labels**."*

### `ระวัง` — this one is definitely on the paper

His words: **"this is an exam question — I might ask which category K-means falls into."**

➤ **K-means = unsupervised learning** · **because no label is used**

### Clustering ≠ Classification

He was emphatic: **"clustering and classification are separate."**

| | Classification | Clustering |
|---|---|---|
| Type | supervised | **unsupervised** |
| Uses labels? | **yes** | **no** |
| Can you score it right/wrong? | yes | **no** — "you don't know what's right or wrong, you just group them" |
| What you judge instead | accuracy etc. | **whether it is good or not** — "you have to see whether it works when you use it" |
| Example | Decision Tree (play/don't play) | segmenting customers |

**His real-world example**: you own a product and want to know what kinds of people buy it → take each person's attributes (in town / out of town, single, single mum, single dad …) and have it group them — **without knowing whether the answer is right**.

---

## 17 K is a hyperparameter

**K = the number of clusters you want**, and **the user chooses it in advance**.

The deck: *"The 'K' in K-means is the number of clusters you want to find (**you choose K in advance**)."*

### `ระวัง` — also definitely on the paper

His words: **"I'm going to ask how a parameter and a hyperparameter differ. There'll be options to pick from."**

➤ **K is a hyperparameter** — set by the **user / data scientist**, not learned by the model.

He said it again during the EDA walkthrough: **"what is a model parameter, what is a hyperparameter — go and read it again."**

`เกร็ดเสริม` **"There's no right and no wrong"** — Iris can be cut into 3, 4 or 5 groups. What matters is whether it works when applied.

---

## 18 Centroid

**A centroid is the centre point of a cluster.**

Related words he ran through, because the room said they had never heard "centroid":
- **center**
- **CG = center of gravity** (from physics)
- **COM = center of mass**

**The triangle example** (it is on the slide): the centroid of a triangle is the **intersection of the medians** — draw from each vertex to the midpoint of the opposite side, and all three meet at one point, assuming the object is uniform and of even thickness.

➤ **Three points is easy — but what about ten thousand?** That is what the algorithm is for.

---

## 19 Euclidean distance

**Similarity is measured by distance** — **closer means more alike, further means more different.**

**Euclidean distance** is what you learned in school without anyone naming it — it comes straight from **Pythagoras** (a² + b² = c²):

```
d = √[ (x₁ − x₂)² + (y₁ − y₂)² ]
```

### WCSS

**WCSS = Within-Cluster Sum of Squares.**

The deck: *"K-means divides the data into k clusters by **minimizing the sum of the squared distances** of each record/data point to the mean of its assigned cluster. This is referred to as the within-cluster sum of squares or **within-cluster SS (WCSS)**."*

**Why square it?** His explanation:
- without squaring you would need a square root, which is **slow and fiddly**
- we do not need a **precise** number — only enough to compare **near or far**
- "I want to know this person is taller than that one, not by how much"
- ➤ **it makes the computation very fast**

`เกร็ดเสริม` The deck notes that R uses **Hartigan and Wong (1979)**, which partitions so that WCSS is minimised.

---

## 20 Normalization, and why it is necessary

**The problem: different scales.**

His examples:
- **age** spans at most about 100
- **income** can differ by nearly a million

Or from the `imports-85` dataset used for linear regression:
- **horsepower** runs **48 – 288**
- **price** runs **5,000 – 40,005**

**Why that matters**: machine learning computes an **error** (a difference) and **squares it**. A variable in the tens of thousands squares into the millions, while one in the hundreds squares only into the tens of thousands.

➤ **It is not fair — the model will over-weight the large-valued feature and learn with a lean.**

### `ระวัง` — he tied this straight to the exam

**"That's bias, and I ask about bias on the paper — what kinds of bias are there, data bias, human bias, go and look it up."**

➤ **Unequal scales count as data bias.**

### The fix

| Method | What it does |
|---|---|
| **Normalization** | squeeze into **0 to 1** — lowest becomes 0, highest becomes 1, the rest interpolated |
| **Standardization (Z-score)** | use the standard deviation — needs statistics first |

**In Orange**: the **Preprocess** widget → **Normalize** → choose 0–1 or standard deviation.

`เกร็ดเสริม` Orange normalises **only the features, never the target**, since the target is the output — though you can select columns yourself.

`เกร็ดเสริม` **Preprocessing** = whatever you do **before** the next stage. Another example: an image shot at 1000×1000 when the model wants 500×500 must be preprocessed.

---

## 21 The K-means algorithm

The deck gives five steps:

| Step | What happens |
|---|---|
| **1** | **Select k centroids** — k rows of the dataset chosen at random |
| **2** | **Assign each data point to its closest centroid** |
| **3** | **Recalculate the centroids** as the average of all data points in each cluster |
| **4** | **Reassign data points** to their closest centroids again |
| **5** | **Repeat steps 3 and 4** until the data points **are no longer reassigned**, or the **maximum number of iterations** is reached |

What he added *(from the transcript)*:
- **the initial centroids can simply be random** — with ten thousand points and k = 3, pick 3 of the ten thousand
- after the first round the centroids **"may be off"**, because with real members some lean left and some lean right → the true middle must be recomputed
- once a centroid moves, **a point that was blue may turn red** on the next pass
- **"it shifts back and forth until it settles, and that's the end of it"**
- **"it isn't one round and done"**

### `ระวัง` — K-means is non-deterministic

The deck states it plainly: *"The basic k-means clustering is based on a **non-deterministic** algorithm. This means that **running the algorithm several times on the same data could give different results**. The non-deterministic nature of k-means is due to its **random selection of data points as initial centroids**."*

And: *"**Sensitive to initial centroid placement** (can converge to poor solutions)."*

➤ **This is very easy to turn into an option — the same data can give different results, because the starting centroids are random.**

`เกร็ดเสริม` The deck also notes *"K-means does not ensure the clusters will have the same size, but finds the clusters that are the **best separated**"* — **equal group sizes are not guaranteed.**

---

## 22 WCSS and the Elbow method

**The question everyone asks: how many clusters?**

### The weaker approach

Use statistical or domain knowledge first — do some visualization, some EDA, guess there are about 5 groups, start at 5. **He said himself: "that isn't a good answer, it's trial and error."**

### The Elbow method

**The way to be confident**:
1. **Try k = 1, 2, 3, …** and onward (to 10, say)
2. For each k compute **WCSS** (the errors of all clusters added together)
3. **Plot** WCSS against k
4. **Find where the error starts to flatten — where the slope goes level.** That is the elbow

The deck: *"By considering the Within Cluster Sum of Squares (WCSS), we can select the number of clusters where **the change in WCSS begins to level off** (called the elbow method)."*

In its worked example: *"a good number of clusters is **3 at best or 4 if needed**."*

`เกร็ดเสริม` **"Elbow" means the joint of the arm** — remember it from the bend in the curve.

`เกร็ดเสริม` The deck also names **Silhouette Score** as an alternative, which he said is "not for now".

### The Iris example

- **Iris** — three species, measuring **petal** and **sepal** width and length
- Plotted in 2-D using only two variables (petal width and length), it **almost separates cleanly already**
- The elbow plot for Iris points at **k = 3**, which **matches reality** (three species). k = 4 is not wrong either

---

## 23 K-modes and K-prototypes

### The problem: K-means cannot handle categorical data

The deck: *"**Not suitable for non-numerical (categorical) data.** Even if you encode categories numerically (like one-hot encoding), the **Euclidean distance may become misleading**."*

| Algorithm | For | Measures dissimilarity by |
|---|---|---|
| **K-means** | **numerical** | **Euclidean distance** — uses the **mean** |
| **K-modes** | **categorical / nominal** | **number of mismatches** (like **Hamming distance**) — uses the **mode** |
| **K-prototypes** | **mixed** | combines K-means and K-modes |

### How K-modes works

**Count whether things differ, and nothing more:**
- the same → **mismatch = 0**
- different → **mismatch = 1**

His example, clustering on `city` and `gender`:
- New York vs New York → 0
- New York vs Chicago → 1
- both Female **and** both New York → total mismatch 0 → **as close as it gets**

➤ **Fewer mismatches = closer · more mismatches = further apart.**

`เกร็ดเสริม` Gender (male/female) is **nominal data** and can be used for clustering — the difference is 0 or 1. He noted: **"this is on the exam, the material we covered — ratio data, interval data, that sort of thing."**

### K-prototypes

The deck: *"Each cluster center is called a **prototype** because it represents the '**typical**' or most representative point of that cluster."*

The cost function it gives:
```
cost = (age₁ − age₂)² + (income₁ − income₂)² + (number of mismatches)
```
i.e. **the numerical part (squared distance) plus the categorical part (mismatch count)**.

---

## 24 Hard vs soft clustering

The deck splits the ways of assigning a point in two:

| # | Name | Meaning | Example |
|---|---|---|---|
| **1** | **Hard clustering** | a sample goes to **exactly one cluster** | **K-means** |
| **2** | **Fuzzy / soft clustering** | a sample is **distributed among several clusters** by weight | **Fuzzy C-means (FCM)** |

**The deck's apple example**: an apple is red **or** green (hard) — but an apple can also be red **and** green (fuzzy), red to a degree and green to a degree.

He added *(from the transcript)*: a point might be **80%** in one cluster and **20%** in another — blurred, not clear-cut.

`เกร็ดเสริม` **Why C and not K?** He said he wondered too — **C stands for class / category**, i.e. the number of centres. Same meaning as K.

`เกร็ดเสริม` He compared **fuzzy logic** with **quantum**: binary is 0 and 1, while quantum has something in between. Fuzzy logic goes the same way — values between 0 and 1.

---

## 25 The deck-by-deck exam walkthrough

For the last twenty minutes he opened the Intro and EDA decks and went page by page saying what he will ask. **This is the most valuable part of the whole session.**

> How he writes the paper: **"when I set the exam I open it up and go through it page by page, and turn what comes up into four-option questions."** — literally slide by slide.

### From Intro to DS, Engineering and AI

| Topic | What he said |
|---|---|
| **Data scientist skills** | The deck has the phrase **"Jack of all trades, master of …"** — like a duck, does many things, none of them expertly. **"The question will ask what skills a data scientist needs, what knowledge they need"** (statistics, computing, domain knowledge) |
| **Data Scientist vs Data Engineer** | **"How do they differ — you must get this."** DE is upstream: infrastructure, collecting and storing data |
| **Data Science Pipeline** | upstream, midstream, downstream — what is in each |
| **Data Lifecycle** | like the SDLC · **"I ask about this one"** |
| **Team sizes** | **"data science versus data engineering — who has more, roughly how many"** — go and look |
| **Data bias / human bias / algorithmic bias** | **"You have to remember these, go and look again."** Bias is error, sometimes unintentional, coming from habit · **"what is data bias, what types are there"** · algorithmic bias comes from training · **"and there are ways to reduce it — what do you do to reduce bias"** |
| **Overfitting / underfitting** | **"I do ask what overfitting is"** |
| **PDPA** and **AI Winter** | "you should know these by now" |
| **"Data is the new oil"** | **"what does it mean — go and look"** |
| **"AI is the new electricity"** | **"that's on it too, what does it mean"** |
| **Democratize AI** | NVIDIA's Jensen Huang uses the phrase — everyone should be able to reach AI, not just an elite |
| **Big Data — the V's** | **"big data is on it too … there are 5 V's, there are 7 V's"** |
| **Insight / actionable insight** | **"I ask about insight — go and find out what it is, what actionable insight is"** |
| **Data mining** | **"I ask about data mining"** — the technique for finding patterns in big data / a data warehouse |
| **KDD** | **"I ask this one directly — go and find out what KDD is"** (Knowledge Discovery in Databases) |
| **Orange** | **"there's one question on Orange — should be easy, a free mark"** |

### From EDA – Model Fitting

| Topic | What he said |
|---|---|
| **Box plot** | **"I ask about the box plot directly"** · **"what is a box plot for, what is a scatter plot for — go and find out yourselves"** |
| **Scatter plot** | **"I ask about the scatter plot too"** · **"why do we plot at all … why not use something else? Go and find the answer"** |
| **EDA definition** | **"Of course I ask about EDA — you must be able to define it."** Surveying the data first: is it good, is there enough, does it need more features, is there much bias — using visualization and statistics |
| **Predictive vs descriptive** | **"I might ask about the difference between predictive and descriptive — how do they differ. You have to be able to explain it"** |
| **Model fitting / data fitting / data modeling** | **"we have model fitting — but do you remember plain fitting? And how does data modeling differ?"** · **"you probably need to know the difference"** |
| **Model parameter vs hyperparameter** | **"what is a model parameter, what is a hyperparameter — go and read it again"** |
| **OLTP vs OLAP** | **"if I remember rightly I ask about these — go and look"** |
| **Data types** | **"This one matters, we talk about it constantly."** **qualitative (categorical)** vs **quantitative** · **nominal** (something you merely observe, with no ordering — gender) · **ordinal** (from *order*) · **interval** · **ratio** · **"you need to know what ratio is, what interval is — I will ask"** |
| **True zero** | **Celsius has no true zero** (there is still thermal energy) · **Kelvin does** (no thermal energy at all) · 0 K ≈ −273 °C · he mentioned quantum computers being cooled to about 2 K |
| **Skewed distributions** | which way the mean leans · a perfect one has everything falling in the same place |
| **Mean / median / mode** | you should know these · **median = the value that cuts through the middle**, a word K-means and K-modes borrow |
| **Box plot in detail** | **"This you have to understand"** — **Q1, Q2, Q3, IQR** · the **fences** are at **1.5 × IQR** (some use 3, but 1.5 is more common) added to and subtracted from the edges of the box · points **outside the fence are outliers** · **min and max count only points inside the fence, never the outliers** · the **five-number summary** is those five values |
| **Outliers** | dropped for the analysis — but **you must find out why they happened**, and analyse them as a separate group: "it may show you something" |
| **Correlation** | **no formula needed** · runs **−1 to 1** · **0 = no correlation** · positive = same direction · negative = opposite · there is **Pearson** and **Spearman**; we use Pearson |
| **Linear regression** | predicts a **numeric value** (car prices, house prices) = a **regression** task, part of **predictive** work · **regression translates as "receding"** — the error recedes until it is as small as possible · of the hundreds of lines that could pass through the data, **one has the least error** |
| **Why linear** | it is the simplest (degree 1) and enough for most work · harder problems use **polynomial** (degree 2 bends once, degree 3 bends back and forth) — **but polynomial is not examined** |
| **Coefficients and stars** | he may ask **"how do you read the output, how do you use the coefficients"** · **significance stars**: 1 = usable · 2 = better · 3 = very good · **none at all = not important enough to predict with** |
| **p-value, R²** | **not asked** |
| **Reinforcement learning** | there is a **reward** — do well, get a reward; do badly, lose points · in Gen AI that is the 👍👎 buttons, collected and fed back |
| **Where K-means sits** | K-means is **off on its own** (unsupervised), separate from classification and regression |

---

## Glossary

| Term | Meaning |
|---|---|
| **Supervised learning** | learning with a teacher — **uses labels** · Decision Trees belong here |
| **Unsupervised learning** | learning without a teacher — **no labels** · K-means belongs here |
| **Label / target / class label** | the answer attached to the data at training time · **categorical** in classification, **numeric** in regression |
| **Feature** | a variable/column used to predict (x₁, x₂, …) |
| **Data point** | one row of data |
| **Root node** | the tree's first node — the most important question |
| **Leaf node** | a terminal node · a label, not a question |
| **Entropy** | the messiness/impurity of a group · **0 = pure, 1 = 50/50 mess** |
| **Information Gain (IG)** | Entropy(parent) − Weighted Entropy(children) · **more is better** |
| **ID3** | the tree-building algorithm using IG, by **R. Quinlan, 1986** (name not examined) |
| **Stopping condition** | when to stop splitting — pure node, max depth, minimum samples |
| **Overfitting** | learning the training data too well · **a suit cut for one person that fits nobody else** |
| **Underfitting** | learning too little · **a suit that is too loose** |
| **Random Forest** | hundreds of trees taking a majority vote |
| **Rule-based** | works on if–then · both **Decision Trees** and **Association Rules** are rule-based |
| **Cluster** | a group of similar data points |
| **Clustering / cluster analysis** | grouping without knowing the labels in advance |
| **K (in K-means)** | **the number of clusters** — a **hyperparameter** chosen by the user |
| **Hyperparameter** | a value **the user/data scientist sets**, not one the model learns |
| **Centroid** | a cluster's centre point · compare centre of gravity, centre of mass |
| **Euclidean distance** | Pythagorean distance, √[(x₁−x₂)² + (y₁−y₂)²] |
| **WCSS** | Within-Cluster Sum of Squares — the squared distances from every point to its centroid, added up |
| **Elbow method** | plot WCSS against k and take the point where the curve levels off |
| **Silhouette Score** | another way to choose k (not covered yet) |
| **Non-deterministic** | the same data can give different results — K-means picks its starting centroids at random |
| **K-modes** | the categorical version — measures **mismatches** (Hamming distance), uses the **mode** |
| **K-prototypes** | K-means + K-modes for mixed data · its centre is called a **prototype** |
| **Hard clustering** | one point, one cluster (K-means) |
| **Fuzzy / soft clustering** | one point across several clusters by weight (**Fuzzy C-means**) |
| **Normalization** | squeezing values into 0–1 |
| **Standardization (Z-score)** | rescaling by the standard deviation |
| **Preprocessing** | whatever is done to the data **before** it goes into the model |

---

## Chapter summary

| Topic | The essential point |
|---|---|
| **Exam 1** | **Friday** · **50 multiple-choice**, single select, four options · **2B pencil, bubble sheet** · **3 hours** · closed book · no calculator needed |
| **Scope** | **Five sets**: Intro · EDA-Model Fitting · Association Rules · Decision Trees · K-means · **Classification and Metrics is not on it** |
| **Formulas** | Examined: **Support** (and confidence must be known) · **Not examined**: entropy, IG, correlation, p-value, R², polynomial |
| **Decision Tree** | **supervised** · does **both classification and regression** · **rule-based** |
| **The heart of a DT** | pick the feature with the **highest IG** as the root · **short trees beat tall ones** · never reuse an attribute on the same path |
| **Entropy** | **0 = pure** · **1 = maximum mess (50/50)** · synonyms: disorder, messy, impure, randomness, uncertainty |
| **Information Gain** | **Entropy(parent) − Weighted Entropy(children)** |
| **PlayTennis** | 9 Yes / 5 No out of 14 · **entropy ≈ 0.94** · **IG(Outlook) = 0.247, the highest → root** · Overcast is pure, so it is a leaf at once |
| **Ice cream** | 12 people · Weather / DayOfWeek / HasMoney / CravingLevel · **Weather has the highest IG → root** |
| **Overfitting** | the suit cut for one person — **not general** |
| **K-means** | **unsupervised**, because **no label is used** · **K is a hyperparameter** the user chooses |
| **The algorithm** | pick k centroids at random → assign each point to the nearest → recompute the centroids → reassign → **repeat until nothing moves** |
| **Non-deterministic** | repeat runs differ, because the starting centroids are random · sensitive to initial placement |
| **Distance** | **Euclidean distance** (Pythagoras) · squared to avoid the square root and keep it fast |
| **Choosing k** | the **Elbow method** — plot WCSS and take the point where it levels off |
| **Categorical data** | K-means cannot → **K-modes** (count mismatches) · mixed → **K-prototypes** |
| **Hard vs soft** | K-means is hard (one point, one cluster) · **Fuzzy C-means** is soft (one point, several clusters by percentage) |
| **Normalization** | necessary because unequal scales make the model **lean** — which counts as **data bias** |
| **What he said he will ask outright** | what a box plot is for · what a scatter plot is for · predictive vs descriptive · parameter vs hyperparameter · which category K-means is in · what overfitting is · what kinds of bias there are · one question on Orange |
