---
title: "Association Rules — Market Basket Analysis, Apriori and Support/Confidence/Lift"
week: 4
type: lecture
date: 2026-08-26
tags: [data-science, association-rules, apriori, market-basket-analysis]
lang: en
base: "w04-association-rules"
chapterKeys: ["agenda","01-รูปแบบการนำเสนอไอเดียโปรเจกต์","02-บทเรียนจาก-feedback-การนำเสนอโปรเจกต์","03-นำ-feedback-มาใช้กับ-snoresenseai","04-association-rules-คืออะไร","05-transactional-data","06-item-itemset-และ-frequent-itemset","07-apriori-algorithm-และ-apriori-property","08-support","09-confidence","10-lift","11-สูตรลัดทั้งสามตัว","12-ตัวอย่างเต็ม--dataset-3-transaction","13-การจัดการกับ-3-itemset","14-แบบฝึกหัด--dataset-5-transaction","15-งานที่สั่งและสิ่งที่ต้องเตรียม","สรุปท้ายบท"]
glossaryKeys: ["Association rules","Association mining","Market Basket Analysis (MBA)","Transactional data","Transaction ID","Item","Itemset","k-itemset","Frequent itemset","Frequency","Support","Minimum support threshold","Confidence","Minimum confidence threshold","Lift","Strong rule","Antecedent","Consequent","Disjoint","Apriori algorithm","Apriori property","Contrapositive","Subset","Superset","Power set","Prune / discard","Impulse purchase","Conditional probability","Label","Data science pipeline","Live scoreboard","IRB","PDPA"]
---
> Group 1 (Wednesday 9.30–12.30 @ LX 12/2) — built on the deck `Association rules.pdf` (19 slides, Assoc. Prof. Dr. Pornchai Mongkolnam), with additions from what the lecturers said in class (`INT182_G1_20260826.docx`)
>
> ⚠️ **A note about the groups: this file is summarised from the Group 1 transcript (Wednesday 26 Aug)**, who are two days ahead of Group 2 (Friday 28 Aug). The syllabus places both in the same week, but the presentation order and the deadlines for Group 2 may differ — confirm them in your own session
>
> ⚠️ The transcript comes from automatic speech recognition and is very poor in several stretches — anything drawn from the transcript alone is marked *(from the transcript)*
>
> The session had two halves: the first was project idea presentations, 3–5 minutes per team, with feedback from the lecturers; the second opened deck 3, Association Rules — the class got roughly as far as slide 14 before time ran out, and will continue next week

## Agenda

1. The format of the project idea presentations
2. Lessons from the project presentation feedback
3. Applying the feedback to SnoreSenseAI
4. What association rules are
5. Transactional data
6. Items, itemsets and frequent itemsets
7. The Apriori algorithm and the Apriori property
8. Support
9. Confidence
10. Lift
11. The three quick formulas
12. A full worked example — a 3-transaction dataset
13. Handling 3-itemsets
14. Exercise — a 5-transaction dataset
15. Work that was set and what to prepare

## 01 The format of the project idea presentations

*(this section comes entirely from the transcript)*

- **3–5 minutes** per team (5 minutes is the maximum). Dr. Chakarida set a phone alarm at **4 minutes** — a raised hand means start wrapping up
- Roughly **9–10 teams** in Group 1. A single representative may present, or the whole team may come up
- Both lecturers (Dr. Pornchai and Dr. Chakarida) commented on each team immediately after it finished
- Teams are **4–5 people**. Teams of 4 were asked to take in classmates who still had no team
- **Written feedback will be posted on Friday** — if a lecturer says something is unclear, don't panic, take it and make it clearer
- This round carries no grade of its own; it is an idea pitch to collect feedback before building
- **The second presentation replaces the second exam** (there will be no second exam)
- Between now and then, teams can consult either lecturer outside class. Keep updating your progress rather than leaving it until the presentation is close

## 02 Lessons from the project presentation feedback

*(gathered from the transcript — written up as principles rather than team by team)*

### Principle 1 — the title must be specific, not a bare technology name

A project title that is just a technology name is too ==general==. Narrow it down so the domain and the users show, e.g. instead of "Text to Speech", make it "Thai Text-to-Speech for people with speech disabilities".

Another point the lecturers praised: the team that put the word **"forecast" / "predict"** in its title made it immediately clear to the panel that a model would have to be built. Teams that avoided that word often ended up presenting something that looked like a ==database filter==.

### Principle 2 — there has to be a model, not just a filter

This came up with several teams: if the system only does **data collection + filtering** (the user enters criteria, the system returns matching rows), that **is not yet modeling in the data science or AI sense**.

The fixes suggested were to add a prediction component:
- from "search rental units by spec" → add a **regression** that predicts a fair rent, or predicts how many months a unit will take to let at a given price
- or, if not regression, use **clustering** to group units or customers instead — just have some modeling in there
- from "EDA of sales" → state clearly what will be predicted, e.g. what percentage of stock to hold per product category

### Principle 3 — the dataset must carry a label or a score, or you cannot predict

**This was the point the lecturers hammered hardest all session.** If the data is only raw features with no target variable (y) attached, the model has nothing to learn.

Examples from the session:
- A team predicting athlete fatigue and injury had only heart rate, HRV, step count and sleep as features. The question back was **"the training data has to have a score saying whether this person counts as injured"** — ten people who each lift for half an hour do not end up equally tired, so you need a ==fatigue index== or an ==injury score== from the start. The analogy given was the credit score a bank uses to decide on a loan
- A team detecting falls among the elderly needs both "fall" and "not a fall" data, because lying down on a mat to do yoga is not a fall — without the contrasting class the model cannot tell them apart

> **The key sentence:** if that is all the data you have (no label, no level), the most you can do is ==association== or ==clustering==
>
> That sentence connects straight into the second half of the session — association rules are an **unsupervised** method that works even without labels

### Principle 4 — you need a clear data science pipeline

The slides have to show, as a diagram, **what goes in → what happens in the process → what comes out**. Several teams showed only the end result, so the lecturers could not see what pattern the model was supposed to be learning.

It should be visible end to end: what the input is, what feature engineering happens, which model is used (and whether it is compared against another, e.g. logistic regression vs decision tree), which metric validation uses (MAE / R²), and what the output looks like to the user.

### Principle 5 — the tech stack must be spelled out as a diagram

Don't spend the whole slot on the rationale for why the project should exist. For a **pitch** you need concrete detail on the tech stack: which AI component, which agent, which open-source tool — and it should be a ==diagram== or a ==flow== with icons showing which engine plugs in where.

### Principle 6 — you need references

References were asked for from nearly every team. The reasoning: **when you pitch a project without references it lacks credibility, but with current references you pull a lot of confidence out of the audience.**

Three kinds of reference belong in the deck:
1. **Domain references** — credible sources in the field, e.g. reputable finance sites if the project is about investing
2. **AI technology references** — links to the sites of the tools and models being used
3. **Prior work** — Kaggle notebooks you studied, Medium articles, published papers you found

### Principle 7 — find what makes you different; you don't have to do everything

If the idea already exists (especially in Thailand), go look at what those products do and point out clearly **where you will differ**. The lecturers stressed: "**you don't have to do everything** — just have something nobody else has done, because our time is short."

### Principle 8 — scope belongs in the requirements from day one

Constraints should not appear only on a "Limitations" slide at the end; they belong in the requirements from the start. Examples of scoping the lecturers suggested:
- accept English-language comments only, cap the number of comments per clip, cap comment length
- pick **one hardware platform** rather than supporting several brands (sensors from different brands are calibrated differently) — one hardware data source is enough for this course's scope
- work with ~30 items in the KMUTT bookshop instead of trying to cover thousands of items in a convenience store

The reasoning: **"this is only a small class project, not a commercial one — we are just testing the idea"**

### Principle 9 — every team must be able to say how it will test

The lecturers said **"every team has to have thought about how it is going to tell us the thing works at 70% or 80%"**. You need test cases and you need to know how you will split ==train/test== (which Dr. Pornchai will be teaching in the data science part).

A related tip: if the Kaggle dataset you picked belongs to a competition that is still live, it has a ==live scoreboard== — you can submit a model and get accuracy back immediately, which speeds development up a lot. Check whether yours has one.

### Principle 10 — data collection and data quality

- **Sample randomly, don't cherry-pick** — if the real data has hundreds of thousands of rows and you need to shrink it, take a ==random sample== rather than the top N, because randomness preserves the behaviour actually present in the data
- **Collect variety** — image projects need many angles, many lighting conditions, many weather conditions (low morning sun, rain), and ideally some images from the Thai context rather than only foreign datasets
- **Research ethics** — collecting a dataset that requires people to perform a real behaviour (falling, for instance) needs university ==IRB== approval before recruiting volunteers. Without IRB approval, be extremely careful, or switch to a public dataset instead
- **PDPA** — health data and biometric data count as ==sensitive data== under PDPA and are therefore hard to collect. Plan for that

### Principle 11 — think about real-world conditions

- **Predict early enough for someone to act** — for the attrition prediction team, the point was that by law an employee gives at least 30 days' notice, so a model that fires once the letter is in has come too late. Design it to predict the risk **two months** ahead
- **Safety and redundancy** — a device that reads traffic lights for a colour-blind driver would in reality need more than one unit, because a single unit going flat mid-journey becomes a hazard. Within this course's scope, treat it as a ==prototype==
- **Data that changes over time** — a price-checking system has to know that the standard (UPC) price may not be the real price that day, since shops run week-long discounts. The scoped fix is to fix the prices for now

### Principle 12 — slide design

- **Larger** text, **fewer** graphics, make the text or the diagram stand out, and use the slide area sensibly
- **Don't trust AI too much** — AI-generated slides are usually too dense for anyone to read in time, which makes the presentation ineffective. Break them apart yourself (e.g. split data preprocessing onto its own slide, separate from modeling)
- Look at the **sample project** the lecturer posted (it is in English) — you can see how clearly it states the use case and the engines chosen

## 03 Applying the feedback to SnoreSenseAI

Comparing the twelve principles above against our own deck (`../project-phase1/SnoreSenseAI-Phase1-Pitch.pdf`), ready for the Friday session:

| Principle | Where the current deck stands | What to prepare an answer for |
|---|---|---|
| Specific title | The title names the domain clearly (snoring → sleep-disordered breathing) | Make the predictive/screening word (flag / screen) more prominent |
| A model, not a filter | There is already an AI components & tech stack slide | Explain clearly what pattern the model learns from the audio, rather than just a loudness threshold |
| Dataset must have a label | The biggest risk | Be ready to say where the label comes from — does the dataset ship with ==AHI== or apnea event annotations? Without them supervised learning is off the table |
| Data science pipeline | There is a System architecture slide | Make input → feature → model → output read as one continuous line |
| Tech stack as a diagram | Present | Put the engine icons and names at the right points in the diagram |
| References | There is a References slide, citing Benjafield et al. (2019) and Young et al. (1997) | Already in line with the feedback; add AI technology references and the Kaggle notebooks studied |
| What makes us different | Not yet visible | Add a comparison against existing snore-tracking apps and say where we differ |
| Scope in the requirements | There is a Constraints & boundaries slide | Good — restate that this is screening, not diagnosis |
| Test plan | There is an Evaluation & roadmap slide | Give the train/test split and the metric as concrete numbers |
| Data collection and ethics | Needs adding | Sleep audio is health data → ==sensitive data under PDPA==; it deserves a slide |
| Real-world conditions | Needs adding | Address false positives — a wrong flag alarms someone for no reason |
| Slides | Text is large, graphics are sparse | Watch the problem statement slide with its many figures; don't let it get too dense |

## 04 What association rules are

==Association rules== (also called ==association mining==) means deriving **relationship rules** from data, written in **if–then** form:

```
X → Y     read as "if X is present, Y is likely to be present too"
```

- **X** is the ==antecedent== (the left-hand side) — a set of one or more items
- **Y** is the ==consequent== (the right-hand side) — a set of one or more items
- X and Y must be ==disjoint==, i.e. they share no items at all

The shapes a rule can take (slide 16):

```
A ∧ B → C
A ∧ C → B
B → A ∧ C
...
```

**Market Basket Analysis (MBA)** is the data mining technique used to identify relationships between items frequently purchased together. The goal is to uncover hidden patterns in transactional data and express them as association rules.

> *(from the transcript)* The lecturer's memory hook: MBA is the same acronym as the Master of Business Administration that Thai graduates used to flock to. In this course it stands for **Market Basket Analysis**.

> *(from the transcript)* **The beer & diapers story** — American transaction data revealed that men shopping on a Friday evening who bought beer also tended to buy baby diapers. The reading is that these were married men with small children, picking things up for the child while grabbing beer for their own sports evening. The prior assumption had been that diapers were mostly bought by mothers. This is the classic example of a **hidden and completely unexpected pattern**, which is exactly what MBA is meant to dig up.

## 05 Transactional data

==Transactional data== is information collected and recorded from individual transactions or events. Its key characteristic is that it **captures the details of a specific, single occurrence**.

The example from slide 3 (which comes back later as the exercise):

| Transaction ID | Items Purchased |
|---|---|
| 1 | Milk, Bread, Butter |
| 2 | Milk, Diapers |
| 3 | Bread, Butter, Diapers |
| 4 | Milk, Bread, Butter |
| 5 | Milk, Bread, Diapers |

Total transactions: **N = 5**

*(from the transcript)* The points the lecturer stressed:
- Real transaction data records more than this — who bought, what they bought, **how many**, how much they paid, **where, and at what time**
- **The timestamp matters a great deal**, because data mining over large volumes has to distinguish last year from last month from last week. Without a time stamp there is no way to separate them
- **But within MBA's scope we ignore the quantities.** All that matters is what co-occurs with what
- Because each basket is stored as a ==set==, **items are never repeated** — three cartons of milk still count as Milk once — and **order does not matter**, since sets are unordered

## 06 Items, itemsets and frequent itemsets

- An ==item== is one product type: Milk, Bread, Butter, Eggs, Diapers
- An ==itemset== is a collection of one or more items appearing together in a single transaction
  - a **1-itemset** such as {Milk}
  - a **2-itemset** such as {Milk, Bread}
  - a **3-itemset** such as {Milk, Bread, Butter}
- A ==frequent itemset== is one that appears in the transaction database **more than or equal to the user-defined ==minimum support threshold==**

*(from the transcript)* What the lecturer added:
- **A 1-itemset alone cannot produce a rule**, because having a single product type says nothing about its relationship to another. You need at least a 2-itemset
- In practice **3 or 4 itemsets is about right**. Past 5 it gets confusing, patterns are hard to find, and it stops being useful. Most exam questions stop at 3 or 4 itemsets
- **Frequency** is the raw count of how often an itemset appears, not divided by anything yet; **support** is that frequency divided by N

## 07 The Apriori algorithm and the Apriori property

The ==Apriori algorithm== was first presented by **Rakesh Agrawal and Ramakrishnan Srikant in 1994**. It finds frequently occurring itemsets and produces association rules.

*(from the transcript)* The name "Apriori" carries the sense of **"what comes before"** — the algorithm uses what it learned in the previous pass to decide what to do in the next. It gets pronounced several ways; don't worry about it.

### The Apriori property has two parts

**Part 1 — if an itemset is frequent, then all of its subsets must also be frequent**

From the slide: if {Bread, Butter, Milk} is frequent (bought together often), then it logically follows that the subsets {Bread, Butter}, {Butter, Milk}, {Bread, Milk}, {Bread}, {Butter} and {Milk} must also be frequent.

**Part 2 (the contrapositive) — if an itemset is infrequent, then all of its supersets must also be infrequent**

From the slide: if the algorithm finds that a small itemset such as {Beer, Chips} is infrequent, it can immediately ==prune== every larger itemset that contains it.

*(from the transcript)* The lecturer tied this back to Discrete Mathematics: part 2 is exactly the ==contrapositive== of part 1.

```
p → q   is equivalent to   ¬q → ¬p
```

So there is almost nothing new to memorise — part 2 is part 1 with the sides swapped.

### Why pruning is necessary

*(from the transcript)* In reality a shop stocks thousands of product types. With n items, the total number of subsets (the power set) is **2ⁿ** — with n = 1,000 that is 2^1000, which is simply not computable.

Apriori uses part 2 to cut it down: **anything that is not frequent gets thrown away and is never expanded**, which saves an enormous amount of computation.

### The steps

```
1. Enumerate all 1-itemsets → compute support → discard everything below min support
2. Pair up only the survivors into 2-itemsets → compute support → discard again
3. Combine only the survivors into 3-itemsets → compute support → discard again
4. Keep going until no itemset passes the threshold, then stop
5. Take all the surviving frequent itemsets and generate association rules using confidence
```

## 08 Support

==Support== answers **"how popular is this itemset?"**

$$\text{Support}(X) = \frac{\text{Number of transactions containing } X}{\text{Total number of transactions}}$$

- It ranges from **0% to 100%**
- The ==minimum support threshold== is set by the user. Anything below it is infrequent and gets **discarded**

From the 5-transaction table above:
- Support({Milk}) = 4/5 = **80%** (it appears in T1, T2, T4, T5)
- Support({Milk, Diapers}) = 2/5 = **40%** (only T2 and T5)

*(from the transcript)* **The lecturer stressed that the support and confidence formulas have to be memorised for the exam** — the paper will not supply them, so you must be able to write them out yourself.

## 09 Confidence

==Confidence== answers **"if X is present, how often is Y also present?"**

$$\text{Confidence}(X \rightarrow Y) = \frac{\text{Support}(X, Y)}{\text{Support}(X)}$$

where Support(X, Y) means the support of the case where **X and Y occur together** (X ∧ Y).

*(from the transcript)* The lecturer's way of remembering it: confidence is a **condition** — "given X, will Y happen?" — so **X has to happen first**, which is why X is the denominator. The numerator is the case where both X and Y occur.

The formula comes from ==conditional probability==, already covered elsewhere:

$$P(B|A) = \frac{P(A \cap B)}{P(A)}$$

### An important catch — confidence is not symmetric

*(from the transcript — the last point made before time ran out)*

$$\text{Confidence}(X \rightarrow Y) \neq \text{Confidence}(Y \rightarrow X)$$

The reason: **the numerators are identical but the denominators are not.**

```
Confidence(Milk → Bread) = Support(Milk ∧ Bread) / Support(Milk)
Confidence(Bread → Milk) = Support(Milk ∧ Bread) / Support(Bread)
                            ^^^^^^^^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^
                            identical               different!
```

Support(X ∧ Y) and Support(Y ∧ X) are the same thing, since "and" commutes, but the denominators are different values, so the results need not match — **"buying milk and then buying bread" is not the same statement as "buying bread and then buying milk"**.

## 10 Lift

==Lift== answers **"is this association stronger than random chance?"**

$$\text{Lift}(X \rightarrow Y) = \frac{\text{Confidence}(X \rightarrow Y)}{\text{Support}(Y)} = \frac{\text{Support}(X, Y)}{\text{Support}(X) \times \text{Support}(Y)}$$

- Range of lift: **[0, +∞)**

### Reading a lift value

| Lift value | Meaning |
|---|---|
| **Lift > 1** | X and Y occur together more often than would be expected if they were independent → **a strong association** |
| **Lift = 1** | X and Y are independent → **no association at all** |
| **Lift < 1** | X and Y are negatively associated → the presence of one **reduces** the likelihood of the other |

> ⚠️ **Note — slide 6 has a typo.** Its last bullet reads "Lift > 1: The items X and Y are negatively associated", which contradicts its own first bullet. It should be **Lift < 1**, as in the table above.

*(from the transcript)* For this session the lecturer said to **"just read through"** lift, because piling on more would mean none of it sticks. Get support and confidence solid first, at minimum.

## 11 The three quick formulas

Slide 7 restates all three in terms of **frequency (raw counts)** rather than support — more convenient for hand calculation, since the N cancels out.

For a rule **X ⟹ Y**:

$$\text{Support} = \frac{\text{Frequency}(X, Y)}{N}$$

$$\text{Confidence} = \frac{\text{Frequency}(X, Y)}{\text{Frequency}(X)}$$

$$\text{Lift} = \frac{\text{Support}}{\text{Support}(X) \times \text{Support}(Y)}$$

where **N = the total number of transactions**.

*(from the transcript)* The lecturer recommended memorising the frequency version because it is easier to recall, and memorising just the **top two (support, confidence)** for now — lift can wait.

### Extending it to three items

If the rule goes from X → Y to X → Y ∧ Z, you simply **add Z everywhere Y appears**:

$$\text{Confidence}(X \rightarrow Y, Z) = \frac{\text{Support}(X, Y, Z)}{\text{Support}(X)}$$

and for A, B → C:

$$\text{Confidence}(A, B \rightarrow C) = \frac{\text{Support}(A, B, C)}{\text{Support}(A, B)}$$

## 12 A full worked example — a 3-transaction dataset

Slides 8–15 walk one example through from start to finish; all of it can be reproduced by hand.

**The data:**

| Transaction ID | Items Purchased |
|---|---|
| T1 | Milk, Bread, Butter |
| T2 | Milk, Bread, Eggs |
| T3 | Milk, Eggs |

**The thresholds set:** minimum support = **50%** (i.e. it must appear in at least 2 of the 3 transactions) and minimum confidence = **75%**.

### Step 1a — count the 1-itemsets

| 1-itemset | Appears in | Support | Verdict |
|---|---|---|---|
| {Milk} | T1, T2, T3 | 3/3 = **100%** | Frequent ✅ |
| {Bread} | T1, T2 | 2/3 = **67%** | Frequent ✅ |
| {Butter} | T1 | 1/3 = **33%** | Infrequent ❌ **discard** |
| {Eggs} | T2, T3 | 2/3 = **67%** | Frequent ✅ |

**Frequent 1-itemsets: {Milk}, {Bread}, {Eggs}**

### Step 1b — count the 2-itemsets

Pair up only the survivors of the previous round. Butter is already gone, so no pair containing Butter needs counting — that is the second Apriori property doing its job.

| 2-itemset | Appears in | Support | Verdict |
|---|---|---|---|
| {Milk, Bread} | T1, T2 | 2/3 = **67%** | Frequent ✅ |
| {Milk, Eggs} | T2, T3 | 2/3 = **67%** | Frequent ✅ |
| {Bread, Eggs} | T2 | 1/3 = **33%** | Infrequent ❌ **discard** |

**Frequent 2-itemsets: {Milk, Bread}, {Milk, Eggs}**

### Step 1c — stop here

We have to stop because **no 3-itemset can reach 50% support** — {Milk, Bread, Eggs} appears in T2 only, i.e. 1/3 = **33.33%**, below the threshold.

### Step 2 — generate the association rules

From the frequent itemsets, build if–then rules and check each confidence against the 75% threshold.

**From {Milk, Bread}:**

| Rule | Calculation | Confidence | Verdict |
|---|---|---|---|
| **Rule 1:** {Milk} → {Bread} | Support({Milk, Bread}) / Support({Milk}) = (2/3) / (3/3) = 2/3 | **67%** | weak ❌ **discard** (< 75%) |
| **Rule 2:** {Bread} → {Milk} | Support({Milk, Bread}) / Support({Bread}) = (2/3) / (2/3) | **100%** | **strong rule** ✅ |

Rule 2 tells us that **whenever someone buys bread, they also buy milk**.

**From {Milk, Eggs}:**

| Rule | Calculation | Confidence | Verdict |
|---|---|---|---|
| **Rule 3:** {Milk} → {Eggs} | Support({Milk, Eggs}) / Support({Milk}) = (2/3) / (3/3) = 2/3 | **67%** | weak ❌ **discard** |
| **Rule 4:** {Eggs} → {Milk} | Support({Milk, Eggs}) / Support({Eggs}) = (2/3) / (2/3) | **100%** | **strong rule** ✅ |

Rule 4 tells us that **whenever someone buys eggs, they also buy milk**.

### The final strong rules

1. **{Bread} → {Milk}** (Confidence = 100%)
2. **{Eggs} → {Milk}** (Confidence = 100%)

This is useful to a store owner — they might place milk near the bread and eggs sections to encourage ==impulse purchases==.

### Reading it with lift — the most important lesson in this example

Both rules have 100% confidence, which looks excellent. But compute the lift:

$$\text{Lift}(\{Eggs\} \rightarrow \{Milk\}) = \frac{\text{Confidence}}{\text{Support}(\{Milk\})} = \frac{100\%}{100\%} = \mathbf{1}$$

$$\text{Lift}(\{Bread\} \rightarrow \{Milk\}) = \frac{100\%}{100\%} = \mathbf{1}$$

**A lift of exactly 1 means there is no association at all.**

The reason: customers buy milk every time they buy eggs **not because eggs and milk are related, but because they buy milk in every transaction regardless** (Support({Milk}) = 100%). A high confidence can be deceiving.

Had the support for milk been lower (say 50%) and the lift still come out above 1, that would have indicated a genuinely strong, non-coincidental relationship.

> **This is why lift is an important metric for discovering truly interesting patterns** — support and confidence alone are not enough.

## 13 Handling 3-itemsets

Slides 16 and 18–19 cover this.

### Can we stop at 2-itemsets?

**Yes.** Stopping at 2-itemsets is perfectly valid even when larger itemsets exist — it just means you are choosing to extract only ==pairwise== relationships. If you need more complex bundles, go on to the 3-itemsets.

### The hard rule for generating rules from a 3-itemset

> **Every rule must have the union of antecedent and consequent equal to exactly that itemset, and both sides must be non-empty. When generating rules from a specific frequent itemset, all items in that itemset must appear in the rule — either on the left or the right, and none is missing.**

So if the frequent itemset is **{Milk, Bread, Butter}**, there are **six possible rules**:

**1. Rules with a single item in the consequent (3 rules)**

| Rule | Confidence |
|---|---|
| **Rule 1:** {Milk, Bread} → {Butter} | Support(Milk, Bread, Butter) / Support(Milk, Bread) |
| **Rule 2:** {Milk, Butter} → {Bread} | Support(Milk, Bread, Butter) / Support(Milk, Butter) |
| **Rule 3:** {Bread, Butter} → {Milk} | Support(Milk, Bread, Butter) / Support(Bread, Butter) |

**2. Rules with two items in the consequent (3 rules)**

| Rule | Confidence |
|---|---|
| **Rule 4:** {Milk} → {Bread, Butter} | Support(Milk, Bread, Butter) / Support(Milk) |
| **Rule 5:** {Bread} → {Milk, Butter} | Support(Milk, Bread, Butter) / Support(Bread) |
| **Rule 6:** {Butter} → {Milk, Bread} | Support(Milk, Bread, Butter) / Support(Butter) |

Notice that **the numerator is identical in all six** — the support of the full 3-itemset. Only the denominator changes.

> **The common mistake:** from the 3-itemset {Milk, Bread, Butter} we **cannot** write the rule {Milk} → {Bread}, because **Butter is missing**. That rule belongs to the 2-itemset {Milk, Bread}, not to this 3-itemset.

## 14 Exercise — a 5-transaction dataset

Slide 17 sets an exercise on the 5-transaction table from section 05 above. The task is simply **"Find association rules"**.

*(from the transcript)* For the in-class attempt the lecturer set **min support = 60%** and **min confidence = 80%** (a real exam question will always supply the thresholds; if it doesn't, the question is incomplete). Time ran out before the class finished it — what follows is the worked solution.

**The data:** T1 {Milk, Bread, Butter}, T2 {Milk, Diapers}, T3 {Bread, Butter, Diapers}, T4 {Milk, Bread, Butter}, T5 {Milk, Bread, Diapers} — **N = 5**

### Step 1a — 1-itemsets (min support 60% = at least 3 of 5)

| 1-itemset | Appears in | Support | Verdict |
|---|---|---|---|
| {Milk} | T1, T2, T4, T5 | 4/5 = **80%** | Frequent ✅ |
| {Bread} | T1, T3, T4, T5 | 4/5 = **80%** | Frequent ✅ |
| {Butter} | T1, T3, T4 | 3/5 = **60%** | Frequent ✅ (exactly at threshold) |
| {Diapers} | T2, T3, T5 | 3/5 = **60%** | Frequent ✅ (exactly at threshold) |

All four survive this round.

### Step 1b — 2-itemsets

Pairing the four survivors gives six candidates.

| 2-itemset | Appears in | Support | Verdict |
|---|---|---|---|
| {Milk, Bread} | T1, T4, T5 | 3/5 = **60%** | Frequent ✅ |
| {Milk, Butter} | T1, T4 | 2/5 = **40%** | ❌ discard |
| {Milk, Diapers} | T2, T5 | 2/5 = **40%** | ❌ discard |
| {Bread, Butter} | T1, T3, T4 | 3/5 = **60%** | Frequent ✅ |
| {Bread, Diapers} | T3, T5 | 2/5 = **40%** | ❌ discard |
| {Butter, Diapers} | T3 | 1/5 = **20%** | ❌ discard |

**Frequent 2-itemsets: {Milk, Bread}, {Bread, Butter}**

### Step 1c — 3-itemsets and pruning

The only candidate that can be built from the surviving 2-itemsets is **{Milk, Bread, Butter}**, and the second Apriori property discards it immediately without any counting, because its subset **{Milk, Butter} has only 40% support and is not frequent**.

(Counting it anyway gives 2/5 = 40%, confirming the prune was correct.) → **there are no frequent 3-itemsets; we stop at the 2-itemsets**

### Step 2 — generate the rules (min confidence 80%)

| Rule | Calculation | Confidence | Verdict |
|---|---|---|---|
| {Milk} → {Bread} | 60% / 80% | **75%** | ❌ fails |
| {Bread} → {Milk} | 60% / 80% | **75%** | ❌ fails |
| {Bread} → {Butter} | 60% / 80% | **75%** | ❌ fails |
| {Butter} → {Bread} | 60% / 60% | **100%** | **strong rule** ✅ |

**The only rule that passes: {Butter} → {Bread} (Confidence = 100%)**

Notice that {Bread} → {Butter} gives 75% while {Butter} → {Bread} gives 100%, from the very same itemset — **a clean illustration of the asymmetry of confidence stressed in section 09**.

### Checking the lift

$$\text{Lift}(\{Butter\} \rightarrow \{Bread\}) = \frac{\text{Confidence}}{\text{Support}(\{Bread\})} = \frac{100\%}{80\%} = \mathbf{1.25}$$

**Lift = 1.25 > 1**, so this rule reflects a genuinely strong association rather than a coincidence — unlike the example in section 12, which came out at exactly 1.

(Lift is symmetric, so Lift({Bread} → {Butter}) = 75% / 60% = 1.25 as well, even though the confidences differ.)

## 15 Work that was set and what to prepare

*(from the transcript)*

- **This week's homework:** the lecturer will upload an advanced Association Rules example (a business case) to Microsoft Teams. Study it over the weekend so that next week goes faster
- **Next week:** finish Association Rules, then **work an example by hand and compare the answers against what Orange computes**. The lecturer noted that last year's cohort did it and understood it well, and that without doing it by hand this year's cohort risks not understanding it
- **The slide 17 exercise:** find the association rules for the 5-transaction dataset (solution in section 14)
- **Project:** revise the deck according to the feedback received — the formal written feedback will be posted on Friday. Consult either lecturer outside class in the meantime; don't leave it until the second presentation is close
- **The second presentation replaces the second exam** — there is no second exam
- **Midterm exam:** the syllabus puts it in week 6, **7–11 September 2026** (worth 30%)
- **For Group 2:** teams that did not present in Group 1 were told to present online later and may lose some marks — confirm your own group's arrangement in the Friday session

> 📌 **A note on the syllabus:** the syllabus lists week 4 (26, 28 Aug) as *Statistical Analysis, EDA, Data Visualization*, but in practice that material was already finished in week 3, so this session moved ahead to Association Rules, which is out of the syllabus order (the syllabus does note that it "may change as appropriate").

## Glossary

| Term | Short meaning |
|---|---|
| Association rules | If–then rules stating that if X is present, Y is likely to be present too |
| Association mining | Another name for producing association rules; a branch of data mining |
| Market Basket Analysis (MBA) | The data mining technique for finding items frequently purchased together |
| Transactional data | Data capturing the details of a specific, single transaction or event |
| Transaction ID | The identifier of each individual transaction in the data table |
| Item | One product type or element within a transaction |
| Itemset | A collection of one or more items appearing together in a single transaction |
| k-itemset | An itemset with k members, e.g. the 2-itemset {Milk, Bread} |
| Frequent itemset | An itemset whose support is greater than or equal to the minimum support threshold |
| Frequency | The raw count of how often an itemset appears, before dividing by N |
| Support | The proportion of transactions containing an itemset; how popular the itemset is |
| Minimum support threshold | The user-defined support floor; anything below it counts as infrequent |
| Confidence | How often Y is present given X, computed as Support(X,Y) divided by Support(X) |
| Minimum confidence threshold | The confidence floor a rule must clear to count as a strong rule |
| Lift | The ratio saying whether an association beats chance; ranges from 0 to infinity |
| Strong rule | A rule whose confidence clears the minimum threshold set |
| Antecedent | The left-hand side of a rule, the "if" condition, written A or X |
| Consequent | The right-hand side of a rule, the "then" outcome, written C or Y |
| Disjoint | The condition that antecedent and consequent share no items at all |
| Apriori algorithm | The algorithm finding frequent itemsets and generating rules, by Agrawal and Srikant in 1994 |
| Apriori property | The two-part rule that subsets of a frequent itemset are frequent and supersets of an infrequent one are infrequent |
| Contrapositive | The logical equivalence p→q ≡ ¬q→¬p, which explains the second Apriori property |
| Subset | A set all of whose members belong to the parent set |
| Superset | A larger set that contains the itemset under consideration |
| Power set | The set of all subsets, of size 2 to the n, which is why pruning is needed to keep the work feasible |
| Prune / discard | Cutting away an infrequent itemset so its supersets never have to be computed |
| Impulse purchase | An unplanned purchase, the reason shops arrange goods according to association rules |
| Conditional probability | P(B\|A), the probability that gives rise to the confidence formula |
| Label | The target variable attached to the data; without it supervised learning is impossible |
| Data science pipeline | The diagram showing what goes in, what the process does, and what comes out |
| Live scoreboard | Kaggle's board where a submitted model gets its accuracy back immediately |
| IRB | The human research ethics board whose approval is needed before collecting data from volunteers |
| PDPA | The personal data protection law under which health and biometric data count as sensitive |

## Chapter summary

| Topic | What to remember |
|---|---|
| What association rules are | If–then rules of the form X → Y derived from transaction data; also called association mining |
| MBA | Market Basket Analysis, finding items bought together; the classic example is beer & diapers |
| Transactional data | Records one single event; should carry a timestamp — but MBA ignores quantities and order |
| Itemsets | Being sets, they hold no duplicates and no order — a 1-itemset cannot make a rule, you need at least a 2-itemset |
| In practice | 3–4 itemsets is about right; past 5 the patterns get hard to find and stop being useful |
| Apriori property, part 1 | If an itemset is frequent → all of its subsets are frequent |
| Apriori property, part 2 | If an itemset is infrequent → all of its supersets are infrequent (the contrapositive of part 1) |
| Why pruning matters | The power set has size 2ⁿ; with thousands of products it is uncomputable, so infrequent itemsets are cut immediately |
| The Apriori steps | 1-itemsets → discard → 2-itemsets → discard → 3-itemsets → discard → stop when nothing survives |
| **The support formula** | **Support(X) = transactions containing X ÷ total transactions** |
| **The confidence formula** | **Confidence(X→Y) = Support(X,Y) ÷ Support(X)** — derived from conditional probability |
| The lift formula | Lift(X→Y) = Confidence(X→Y) ÷ Support(Y) = Support(X,Y) ÷ [Support(X) × Support(Y)] |
| Guaranteed on the exam | The lecturer stressed that **you must be able to write the support and confidence formulas yourself**; the paper won't supply them. Lift can just be read through for now |
| Reading lift | > 1 strong association, = 1 independent, < 1 negative association (slide 6 mistypes this as > 1) |
| The high-confidence trap | The slide example reaches 100% confidence but lift of exactly 1, because milk is in every transaction anyway — always check lift too |
| Confidence is not symmetric | Confidence(X→Y) ≠ Confidence(Y→X), because the numerators match but the denominators do not |
| Rules from a 3-itemset | Six rules (3 with a one-item consequent, 3 with a two-item consequent); every item must appear, none may be missing |
| Stopping at 2-itemsets | Valid and correct; it simply means extracting only pairwise relationships |
| The slide example's result | min sup 50%, min conf 75% → strong rules {Bread}→{Milk} and {Eggs}→{Milk}, both at 100% confidence |
| The 5-transaction exercise result | min sup 60%, min conf 80% → one strong rule, {Butter}→{Bread}, confidence 100%, lift 1.25 |
| The most stressed project feedback | The dataset **must carry a label or a score**, otherwise nothing can be predicted — all that is left is association or clustering |
| The next most stressed | There must be modeling rather than a filter, a clear data science pipeline, references, and an answer for how you will test |
| What to do | Study the advanced example the lecturer uploads to Teams over the weekend, and next week compute by hand and compare against Orange |
