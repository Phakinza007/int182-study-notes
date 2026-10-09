---
title: "Decision Trees, K-means Clustering และการทวนขอบเขต Exam 1"
week: 5
type: lecture
date: 2026-09-04
tags: [data-science, decision-tree, entropy, information-gain, k-means, clustering, unsupervised-learning, exam1]
---
> สรุปจากคาบวันที่ 4 ก.ย. 2026 (บันทึก 3 ชม. 36 นาที, `INT182_20260904.docx`) โดยใช้สไลด์ `Decision Trees.pdf` (27 หน้า) และ `K-means clustering basics.pdf` (25 หน้า) ของ อ.พรชัย มงคลนาม เป็นโครงหลัก
>
> ⚠️ transcript มาจาก automatic speech recognition และ**เพี้ยนหนักมาก**ในหลายช่วง (`เคมี` = K-means, `ดิสชั่นทรี` = decision tree, `เอ็นโทรพี่` = entropy, `อีฟเด่น` = if–then) สิ่งที่มาจาก transcript อย่างเดียวจะทำเครื่องหมาย *(จาก transcript)* ไว้
>
> คาบนี้เป็นคาบสุดท้ายก่อน Exam 1 อาจารย์แบ่งเวลาเป็น 4 ช่วง: **(1)** แจ้งรายละเอียดข้อสอบ **(2)** ทวน Association Rules ที่ค้างจากคาบ 4 (~30 นาที) **(3)** สอน Decision Trees **(4)** สอน K-means แล้วปิดท้ายด้วยการไล่สไลด์เก่าทีละหน้าเพื่อชี้ว่า**จุดไหนจะออกข้อสอบบ้าง**

## Agenda

1. Exam 1 — รายละเอียดทั้งหมดที่อาจารย์แจ้ง
2. ขอบเขตข้อสอบ — 5 slide sets และเซตที่ถูกตัดออก
3. สูตรไหนออก สูตรไหนไม่ออก
4. ทวน Association Rules (ชี้ไปที่ W04)
5. Decision Tree — คืออะไร อยู่ตรงไหนของภาพใหญ่
6. กายวิภาคของต้นไม้ — root / decision node / leaf / branch
7. ทำไมต้นไม้เตี้ยถึงดีกว่าต้นไม้สูง
8. Entropy — ความวุ่นวายของกลุ่ม
9. Information Gain — คำถามนี้ลดความวุ่นวายได้เท่าไหร่
10. ขั้นตอนการสร้างต้นไม้ (ID3)
11. ตัวอย่างเต็ม — PlayTennis
12. Stopping condition และ overfitting
13. แบบฝึกหัด — ไอศกรีม 12 คน
14. Decision Tree ใน Orange
15. Random Forest (พูดถึงผ่านๆ)
16. K-means — clustering คืออะไร
17. K เป็น hyperparameter
18. Centroid
19. Euclidean distance
20. Normalization และเหตุผลว่าทำไมต้องทำ
21. ขั้นตอนของ K-means
22. WCSS และ Elbow method
23. K-modes, K-prototypes
24. Hard vs Soft clustering (Fuzzy C-means)
25. ไล่สไลด์เก่า — จุดที่อาจารย์บอกว่าจะออกข้อสอบ
26. Glossary
27. สรุปท้ายบท

---

## 01 Exam 1 — รายละเอียดทั้งหมดที่อาจารย์แจ้ง

*(ส่วนนี้มาจาก transcript ทั้งหมด — ให้ยืนยันกับประกาศทางการอีกครั้ง)*

| หัวข้อ | รายละเอียด |
|---|---|
| วันสอบ | **วันศุกร์** ของสัปดาห์ถัดไป · อาจารย์บอกว่า "ตอนเย็น" แต่ตัวเองก็ไม่มั่นใจเวลา ให้**ไปเช็คประกาศและห้องสอบอีกครั้ง** |
| จำนวนข้อ | **50 ข้อ** |
| รูปแบบ | **multiple choice ทั้งหมด** · **single select** (เลือกได้คำตอบเดียว) · ช้อยส์ a/b/c/d **4 ช้อยส์** |
| การตอบ | **ฝนคำตอบด้วยดินสอ** ลงกระดาษคำตอบ (เป็นแผ่น ไม่ใช่สมุด) · เตรียม**ดินสอ 2B** มาเอง (อาจารย์ก็จำไม่ได้ว่า 2B หรือ HB — เอา 2B ไว้ก่อน) |
| คะแนน | ข้อละเท่ากันหมด · น้ำหนักรวมอาจต้องเกลี่ยอีกที เพราะมีบางเนื้อหาที่ยังไม่ได้สอน |
| เวลา | **3 ชั่วโมง** — เฉลี่ยเกือบ 4 นาทีต่อข้อ อาจารย์คาดว่าจริงๆ ใช้แค่ 1–2 นาที/ข้อ จึงเหลือเวลาเยอะมาก |
| ออกจากห้องได้ | หลังผ่านไป 1 ชั่วโมง แต่อาจารย์แนะนำให้อยู่อย่างน้อย 2 ชั่วโมง ทำไปทวนไป |
| เครื่องคิดเลข | **ไม่ต้องใช้** — ไม่ได้ห้ามพกเข้าไป แต่ต้องปิดและไม่ได้ใช้ |
| หนังสือ/โน้ต | **ไม่ได้** — closed book ทั้งหมด |
| จำนวนครั้งที่สอบทั้งเทอม | **2 ครั้งเท่านั้น** — ครั้งที่ 1 (นี้) และครั้งสุดท้าย ทั้งคู่เป็นข้อสอบข้อเขียน |

`ระวัง` *(จาก transcript — ASR เพี้ยนหนักตรงนี้)*: มีช่วงที่อาจารย์พูดถึง "หนึ่งเล่ม" ที่เอาเข้าห้องสอบได้ "เผื่อไว้ดูคำศัพท์ในคำถาม" และบอกว่าผู้คุมสอบ**จะเปิดตรวจว่ามีเขียนอะไรลงไปหรือเปล่า** — ตีความได้ว่าน่าจะเป็น**พจนานุกรม** ที่ยอมให้เอาเข้าได้ถ้าไม่มีอะไรเขียนไว้ข้างใน แต่ประโยคเพี้ยนเกินกว่าจะฟันธง **ให้ถามอาจารย์หรือดูประกาศก่อนเข้าห้องสอบ**

### ความยากของข้อสอบ

อาจารย์ให้ **อ.ชา (กฤษฎา)** ช่วยรีวิวข้อสอบให้ ผลคือ:

- มีทั้งข้อง่ายและข้อยากปนกัน อ.ชา บอกว่า "มีบางข้อยาก"
- ที่ยากเพราะ **choices ใกล้เคียงกัน** — ถ้าแค่ "เคยได้ยินผ่านๆ" จะเลือกไม่ถูกว่าอันไหนกันแน่
- มีข้อที่ต้อง**ประยุกต์** ไม่ใช่ท่องตรงๆ จากสไลด์
- แต่ถ้าเตรียมมา อาจารย์บอกว่า "รับรองน่าจะได้" และหวังว่าส่วนมากจะได้ **40 ขึ้นไปจาก 50**

### วิธีเตรียมสอบที่อาจารย์แนะนำเอง

โยน PDF สไลด์เข้า Gen AI ให้มันสรุปให้ แล้ว**ให้มันลองออกข้อสอบให้ทำ** — อาจารย์บอกตรงๆ ว่า "ตามใจชอบเลย ... หวังว่าคงจะมีซ้ำบ้าง อาจจะไม่ทั้งหมด" เพราะข้อสอบเป็นชุดที่อาจารย์ออกเอง

### หลังสอบ

- หลังสอบอีก **1 สัปดาห์** อาจารย์กลับมาสอนต่ออีก **1 ครั้ง** ให้จบเซต **Classification and Metrics** (~10 สไลด์ที่เป็นทฤษฎี)
- จากนั้นส่งต่อให้ **อ.ชาคริดา** สอนส่วนที่ 2 ซึ่งเป็นเรื่อง **AI** ทั้งทฤษฎีและการประยุกต์ใช้

---

## 02 ขอบเขตข้อสอบ — 5 slide sets

อาจารย์เปิดโฟลเดอร์ class material ให้ดูสดๆ แล้วนับให้ฟังว่ามี **5 ชุด** ที่อยู่ในขอบเขต:

| # | Slide set | ไฟล์ | สอนสัปดาห์ |
|---|---|---|---|
| 1 | **Intro to Data Science, Engineering and AI** | `INT182_01_Intro-to-DS-Engineering-and-AI.pdf` | W1 |
| 2 | **EDA – Model Fitting** | `INT182_02_EDA-Model-Fitting.pdf` | W3 |
| 3 | **Association Rules** | `Association rules.pdf` (19 หน้า) | W4 + ทวนต้นคาบนี้ |
| 4 | **Decision Trees** | `Decision Trees.pdf` (27 หน้า) | คาบนี้ |
| 5 | **K-means clustering basics** | `K-means clustering basics.pdf` (25 หน้า) | คาบนี้ |

> ➤ **`Classification and Metrics.pdf` (71 หน้า) ถูกอาจารย์เอาออกจาก class material แล้ว เพราะยังไม่ได้สอน — เซตนี้ไม่ออกสอบ 1** อาจารย์พูดตรงๆ ว่า "นี้มันยังไม่ออก" และจะสอนหลังสอบ

`เกร็ดเสริม`: มี **AI Index Report 2026** (`ai_index_report_2026.pdf`) อยู่ในโฟลเดอร์ด้วย อาจารย์บอกว่า "อ่านเพื่อประดับความรู้" — ไม่ได้ระบุว่าออกสอบ

---

## 03 สูตรไหนออก สูตรไหนไม่ออก

อันนี้อาจารย์พูดชัดมาก และเป็นข้อมูลที่ประหยัดเวลาอ่านได้เยอะที่สุด:

| สูตร | ออกสอบ? | อาจารย์พูดว่า |
|---|---|---|
| **Support** | ✅ **ออก** (น่าจะ 1 ข้อ) | "ถ้าออกก็คือหนึ่งอัน" · support = ratio ของความถี่กับทั้งหมด |
| **Confidence** | ✅ ต้องจำ | "ตัวนี้ซัพพอร์ตกับ confidence ที่จะต้องจำ" |
| **Lift** | ⚠️ ตอนสอนบอกว่า "ยังไม่ต้องจำ ณ ตอนนี้" แต่ก็สอนเต็มในคาบ 4 | ให้เข้าใจ concept ไว้ (lift > 1 / = 1 / < 1) |
| **Entropy** (−Σ pᵢ log₂ pᵢ) | ❌ **ไม่ออก** | "ไอ้ entropy ไม่ออก มันซับซ้อนเกินไป ... ไม่เอาที่เป็น log pᵢ พวกนี้ไม่เอา **แค่ให้เอาแค่ concept พอ**" |
| **Information Gain** | ❌ ไม่ถามสูตร | ต้องรู้ว่ามันคืออะไรและใช้ทำอะไร |
| **Correlation** (Pearson) | ❌ ไม่ถามสูตร | "ไม่ต้องจำสูตร แค่รู้ว่ามันบวกมันลบความหมายคืออะไร แค่นั้นพอ" |
| **p-value** | ❌ ไม่ถาม | "ต้องเข้าใจ stat ก่อนถึงจะอธิบายได้" |
| **R²** | ❌ ไม่ถาม | — |
| **Polynomial regression** | ❌ ไม่ออก | "แม้โพลิโนเมียลไม่ออก" |
| **ชื่อ algorithm (ID3)** | ❌ ไม่ต้องจำ | "อันนี้เป็นชื่ออัลกอริทึม เขาไม่ต้องจำ" |

---

## 04 ทวน Association Rules

ต้นคาบอาจารย์ทวน Association Rules ประมาณ 30 นาที เพราะ "ครั้งก่อนไปเร็วไปหน่อย" — เนื้อหาไม่มีอะไรใหม่เกินจากคาบ 4 ให้ดู **[W04-Association-Rules.md](../week4/W04-Association-Rules.md)** ซึ่งละเอียดกว่า

สิ่งที่อาจารย์ย้ำซ้ำในการทวน:

- **rule ต้องมีอย่างน้อย 1 item ในแต่ละข้างของลูกศร** — antecedent ว่างหรือ consequent ว่างไม่ได้ · รวมแล้วต้องมีอย่างน้อย **2 items** ถึงจะสร้าง rule ได้
- **จาก 3-itemset สร้างได้ 6 rules** — ต้องสลับให้ครบทุกทิศทาง
- ลำดับการทำ: หา support ของแต่ละ itemset → ตัดตัวที่ต่ำกว่า threshold ทิ้ง → สร้าง rules จากที่เหลือ → คำนวณ confidence ของทุก rule → ตัดตัวที่ต่ำกว่า min confidence ทิ้ง
- **Association Rule Mining = Market Basket Analysis (MBA)** — คำพ้องที่ต้องรู้
- ตัวอย่างในตำนาน: "เมื่อลูกค้าซื้อ diapers แล้ว 80% จะซื้อ beer ด้วย" — อาจารย์เองก็บอกว่าไม่รู้เป็นเรื่องจริงหรือโจ๊ก
- **Association Rules เป็น rule-based** เหมือน Decision Tree — ทั้งคู่ทำงานด้วย if–then

---

## 05 Decision Tree — คืออะไร อยู่ตรงไหนของภาพใหญ่

**Decision Tree อยู่ในกลุ่ม supervised learning** — การเรียนรู้แบบ**มีผู้สอน** คือมีการใส่ **label** บอกว่าอะไรเป็นอะไร

ตัวอย่างของ label ที่อาจารย์ยก:
- รูปนี้เป็นแมว / วัตถุนี้เป็นแอปเปิ้ล
- บ้าน 2 ชั้น พื้นที่ใช้สอยเท่านี้ → ราคาเท่าไหร่

### Classifier ตัวอื่นในสไลด์ (slide 3)

สไลด์ลิสต์ classification methods ไว้ 5 ตัว — **น่าจะออกเป็นช้อยส์ได้**:

| Method | หลักการ |
|---|---|
| **K-nearest neighbors (KNN)** | ทำนายจาก data points ที่อยู่ใน neighborhood ของจุดที่จะทดสอบ |
| **Decision Trees (DT)** | split dataset ที่ทุก node ตามค่าของตัวแปรหนึ่ง แล้วจัดประเภทที่ leaf node จากค่ารวมของ class labels |
| **Naive Bayes (NB)** | ใช้ likelihood probability · **สมมติว่า features เป็นอิสระต่อกัน** เพื่อทำให้โมเดลง่ายลง |
| **Logistic regression (LR)** | fit ความน่าจะเป็นของ class ด้วย **sigmoid function** แล้วหา coefficient ด้วย **gradient descent** |
| **Support vector machine (SVM)** | เรียนรู้ **hyperplane** ที่แยก 2 classes ด้วย **margin สูงสุด** |

`ระวัง`: ประโยคเปิดของสไลด์หน้านี้เป็นคำนิยามที่ถามได้ตรงๆ — **"ใน classification model ตัว target/class label เป็น categorical ส่วนใน regression ตัว target เป็น numeric"**

### จุดเด่นของ Decision Tree

**ทำได้ทั้ง classification และ regression** — สไลด์มีตัวอย่างทั้งสองแบบ:
- **Classification**: "Play an outdoor sport?" → label เป็น Yes/No
- **Regression**: "Predict a house price" → label เป็น**ตัวเลข** ใช้การเปรียบเทียบมากกว่า/น้อยกว่าที่แต่ละ node

อาจารย์ย้ำว่านี่คือ**ข้อดี**ของมัน และมีโมเดลอื่นที่ทำได้สองอย่างเหมือนกัน

---

## 06 กายวิภาคของต้นไม้

| ส่วน | ชื่อ | ความหมาย |
|---|---|---|
| จุดเริ่มต้น | **root node** | node ที่ใหญ่ที่สุด เป็นคำถามแรก · **สำคัญที่สุด** |
| ตรงกลาง | **decision node** / internal node | เป็น**คำถาม** — เขียนเป็นประโยคคำถามใส่ `?` ไว้ |
| เส้นที่ออกจาก node | **branch** | คือ**คำตอบ**ของคำถามนั้น |
| ปลายสุด | **leaf node** | จุดสิ้นสุด · เป็น **label** (output) ไม่ใช่คำถาม |

### กี่กิ่งต่อ node?

- **binary** = 2 ทาง (ง่ายที่สุด, เป็น default) → **binary classification** yes/no
- **ternary** = 3 ทาง, มากกว่านั้นก็ได้ → **multiclass classification**
- อาจารย์บอกว่า "จะมี 2 ทีละ 2 ก็ไม่ผิดอะไร ... ขึ้นอยู่กับการประยุกต์ ทำได้หมด"

`ระวัง` **กฎที่อาจารย์ย้ำ 2 ครั้ง: attribute ที่ใช้ไปแล้ว ห้ามใช้ซ้ำในเส้นทางเดียวกัน** — "ถ้าคุณใช้ Outlook แล้ว คุณไม่ควรจะมี Outlook มาข้างล่างอีก"

---

## 07 ทำไมต้นไม้เตี้ยถึงดีกว่าต้นไม้สูง

คำถามที่อาจารย์โยนใส่ห้อง: ต้นไม้ที่**ไม่สูง**แต่ทำงานได้ดี กับต้นไม้ที่**สูง** อันไหนดีกว่า?

**คำตอบ: เตี้ยดีกว่า** เพราะ:
- จบเร็ว ใช้พลังงานและการคำนวณน้อยกว่า
- **คำถามยิ่งน้อยยิ่งดี**

อุปมาที่อาจารย์ใช้: เหมือนไป**เข้าคิวหรือไปหาหมอ** — เขาจะมีการ **screen** และวิธี screen ที่ดีที่สุดคือวิธีที่**แยกคนได้เร็วที่สุด** · **คำถามแรกคือคำถามที่สำคัญที่สุด** เพราะมันแยกกลุ่มได้มากที่สุด

➤ **หัวใจของ Decision Tree จึงคือ: จะเลือก feature ไหนมาเป็นคำถามแรก?** ซึ่งตอบด้วย **Entropy + Information Gain**

---

## 08 Entropy — ความวุ่นวายของกลุ่ม

**Entropy วัดว่ากลุ่มหนึ่ง "รก" หรือ "ไม่บริสุทธิ์" แค่ไหน** (สไลด์: *"Entropy measures how messy or impure a group is"*)

คำที่ใช้แทนกันได้ — อาจารย์ไล่มาให้หมด เพราะ**ช้อยส์อาจใช้คำใดคำหนึ่ง**:

| คำ | ความหมาย |
|---|---|
| **disorder** | ไม่เป็นระเบียบ |
| **messy / mess** | รกเลอะเทอะ |
| **impure** | ไม่บริสุทธิ์ มีอะไรผสมกันมากมาย |
| **randomness** | สุ่ม ไม่ชัดเจน |
| **uncertainty** | ไม่แน่นอน ไม่ตรงไปตรงมา |

### ค่าของ Entropy

| ค่า | สภาพ | ตัวอย่างในสไลด์ |
|---|---|---|
| **Entropy = 0** | **Perfectly Pure** — ทุกตัวในกลุ่มอยู่ category เดียวกันหมด | ล้วงถุงที่มีแอปเปิ้ล Red Delicious 10 ลูก → uncertainty = 0 |
| **Entropy = 1** | **Maximum Mess** — แบ่ง 50/50 พอดี | ล้วงถุงที่มีผลไม้ 10 ลูก เป็นแอปเปิ้ล 5 ส้ม 5 → ไม่มีทางรู้เลยว่าจะได้อะไร |

### อุปมาห้องเรียนของอาจารย์

- ถ้านั่งกัน**มั่วๆ** ชายหญิงปนกันทั่วห้อง → **entropy สูง** เพราะกระจัดกระจาย impure
- ถ้า screen ให้**ผู้ชายนั่งซ้าย ผู้หญิงนั่งขวา** → **entropy ต่ำ** เพราะแยกชัดเจน pure
- ถ้านั่ง**สลับกันเป๊ะ** ชายหญิงชายหญิง → **maximum mess**
- ถ้าห้องนี้มีแต่ผู้หญิงล้วน → **entropy = 0 ทันที**

➤ **เป้าหมายของทุกคำถามใน tree คือ: กรองให้ pure ที่สุด เร็วที่สุด**

`เกร็ดเสริม` สูตรมี `C` = **จำนวน class** — เช่น เล่น/ไม่เล่น = 2 class · แมว/หมา/หนู = 3 class · **แต่ไม่ออกสอบ**

---

## 09 Information Gain — คำถามนี้ลดความวุ่นวายได้เท่าไหร่

สไลด์: *"Information Gain measures how much a question reduces that messiness"*

```
Information Gain = Entropy(Parent Node) − Weighted Average Entropy(Child Nodes)
```

- **Entropy ของพ่อแม่ ลบด้วย entropy ของลูกๆ ที่ถ่วงน้ำหนักแล้ว**
- ต้อง **weighted** เพราะลูกแต่ละคนมีจำนวน data point ไม่เท่ากัน — "บางทีลูกคนนี้ให้มากหน่อย ลูกคนนั้นให้น้อยหน่อย"
- **IG เป็นค่าเชิงบวก — ยิ่งมากยิ่งดี** เพราะแปลว่า "เราได้ข้อมูลมาก"
- สไลด์นิยามว่ามันคือ *"the reduction in Entropy after you split your data based on a specific question (or feature)"*

➤ **เลือก feature ที่ให้ IG สูงสุดมาเป็นคำถาม**

---

## 10 ขั้นตอนการสร้างต้นไม้ (ID3)

สไลด์ระบุ **ID3 Algorithm by R. Quinlan, 1986**

`ระวัง` transcript ASR อ่านปีเป็น "2026" ซึ่งผิด — อาจารย์พูดต่อว่า "**40 ปีที่แล้ว**" ซึ่งตรงกับ **1986** ในสไลด์พอดี · และ**ชื่อ algorithm ไม่ต้องจำ** อาจารย์บอกเอง

| Step | ทำอะไร |
|---|---|
| **1** | คำนวณ **Entropy ของ dataset ทั้งหมด** (root/parent) |
| **2** | **ลองทุก feature เป็น root** — split ตามแต่ละค่าของ feature นั้น หา entropy ของแต่ละ branch แล้ว weighted average |
| **3** | คำนวณ **IG = Entropy(parent) − Weighted Entropy(branches)** ของทุก feature แล้ว**เลือกตัวที่ IG สูงสุด** |
| **4** | วาด split แรก — root node กับ child nodes |
| **5** | **recurse** — ทำซ้ำกระบวนการเดิมกับทุก subset (child node) เลือก feature ที่ดีที่สุดของ subset นั้น แล้ว recurse ต่อไปเรื่อยๆ **จนกว่าจะเข้า stopping condition** (pure node, max depth, minimum samples) |

---

## 11 ตัวอย่างเต็ม — PlayTennis

สไลด์เรียกมันว่า *"one of the most famous decision tree examples (Quinlan, 1986)"*

**โจทย์: To play tennis or not?** — 14 แถว, **9 "Yes"** + **5 "No"**

Features 4 ตัว: **Outlook, Temperature, Humidity, Windy** (อาจเรียกว่า x₁ x₂ x₃ x₄ ส่วน label คือ y)

### Step 1 — Entropy ของทั้งชุด

จาก 9 Yes / 5 No จาก 14 → **Entropy(full set) ≈ 0.94**

อาจารย์อธิบายความหมาย: **0.94 เข้าใกล้ 1 แปลว่าข้อมูลชุดนี้ยังไม่เป็นระเบียบเลย** มีทั้ง Yes ทั้ง No ปนกัน — เริ่มต้นจากความวุ่นวายสูง แล้วเราจะไล่ให้ลดลงเรื่อยๆ

### Step 2 — คำนวณ IG ทีละ feature

| Feature | Information Gain |
|---|---|
| **Outlook** | **≈ 0.247** ← สูงสุด |
| Humidity | ≈ 0.15 |
| Temperature | ต่ำกว่า |
| Windy | ต่ำกว่า |

➤ สไลด์สรุปตรงๆ: *"Finally, the best split is Outlook (IG = 0.247) → Highest! So Outlook becomes the root node."*

### Step 3 — recurse ลงแต่ละกิ่ง

Outlook มี 3 ค่า: **Sunny / Overcast / Rain**

| Branch | จำนวน | ผล |
|---|---|---|
| **Overcast** | 4 samples | **4 Yes, 0 No → pure node → เป็น leaf: Yes ทันที** |
| **Sunny** | 5 samples (2 Yes + 3 No) | คำนวณ IG ใหม่จาก 5 แถวนี้ ด้วย Humidity/Temperature/Windy → **มีแต่ Humidity ที่แยกได้ดี** · High = 0 Yes/3 No · Normal = 2 Yes/0 No |
| **Rain** | 5 samples (3 Yes + 2 No) | คำนวณใหม่ด้วย Temperature/Humidity/Windy → **Windy แยกได้ดีที่สุด** |

### ต้นไม้ที่ได้

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

`ระวัง` **สังเกตว่าเมื่อ branch ไหน pure แล้ว (Overcast) มันจบเป็น leaf ทันที ไม่ต้องถามต่อ** — นี่คือ stopping condition ข้อแรก

---

## 12 Stopping condition และ overfitting

คำถามที่อาจารย์บอกว่า "คนชอบถาม": **ต้นไม้ควรลึกแค่ไหน?**

ปัญหา: ถ้าปล่อยไว้เฉยๆ โปรแกรม**ไม่หยุด** มันจะ split ไปเรื่อยๆ จนเหลือ data point แค่ 1 หรือ 0 ตัวในแต่ละ leaf — เสียเวลาและได้ต้นไม้ที่ซับซ้อนเกินจำเป็น

### Stopping conditions ที่ใช้กัน

| วิธี | อธิบาย |
|---|---|
| **max depth** | กำหนดล่วงหน้าว่าเอากี่ชั้น |
| **minimum samples** | ถ้าเหลือ data point ในกิ่งนั้นน้อยกว่าที่กำหนด (เช่น < 50) ก็หยุด |
| **pure node** | ถ้า node นั้น pure แล้ว (entropy = 0) ก็จบเป็น leaf ทันที |

### Overfitting

**"ทำอะไรที่มันละเอียดเกินไป ลึกเกินไป จนเหลือ data point น้อยๆ ตอนล่างๆ มันก็ไม่ใช่ว่าจะดี เพราะมันเรียนรู้มากเกินไปกับข้อมูลที่เรามา train"**

อุปมา **"ตัดเสื้อ"** ที่อาจารย์ใช้ *(จาก transcript — และบอกว่าจะออกสอบ)*:

| | อุปมา | ความหมาย |
|---|---|---|
| **Overfitting** | ตัดเสื้อ**เจาะจงกับคนคนเดียว**มากเลย ฟิตเป๊ะ | ใช้กับคนอื่นไม่ได้เพราะไซซ์ต่างกัน · เหมาะกับกลุ่มเดียว **ไม่ general** |
| **Underfitting** | เสื้อ**หลวมเกินไป** | ทำน้อยเกินไป ก็ไม่ดี |

➤ **อาจารย์บอกตรงๆ ว่าจะถาม "overfitting คืออะไร"**

---

## 13 แบบฝึกหัด — ไอศกรีม 12 คน

สไลด์หน้า 18–27 เป็นแบบฝึกหัดเต็มพร้อมเฉลย

**โจทย์**: สำรวจคน **12 คน** ว่าอะไรมีผลต่อการที่เขาจะ**ซื้อไอศกรีม**

| Feature | ค่าที่เป็นได้ |
|---|---|
| **Weather** | Sunny / Cloudy / Rainy |
| **DayOfWeek** | Weekend / Weekday |
| **HasMoney** | Yes / No (มีเงินในกระเป๋าไหม) |
| **CravingLevel** | ระดับความอยากกิน |
| **Target: BuysIceCream** | **Yes / No** |

### Tasks ที่สไลด์สั่ง

1. คำนวณ Entropy ของ full dataset (ก่อน split)
2. สำหรับแต่ละ feature: split ตามค่า → หา entropy ของแต่ละ branch → weighted average → **IG = Root Entropy − Weighted Entropy**
3. เลือกตัวที่ IG สูงสุด
4. วาด split แรก
5. recurse จนเข้า stopping condition

### เฉลย

➤ **Weather มี IG สูงสุด → เป็น root** · สไลด์วาดให้เห็นว่า **Rainy → No** จบเลย ส่วน Sunny กับ Cloudy ยังเป็น `?` ต้องถามต่อ

`เกร็ดเสริม` อาจารย์เล่าตัวอย่างข้อมูลแถวหนึ่งให้ฟัง: ฝนตก + วันเสาร์อาทิตย์ + มีเงิน + อยากกินมาก → แต่คนนี้**ตอบว่าไม่กิน** · "ก็เป็นข้อมูลชุดหนึ่งที่เขาเก็บมา" — คือชี้ว่าข้อมูลจริงมันไม่ได้สวยเสมอไป

---

## 14 Decision Tree ใน Orange

อาจารย์เปิด **Orange** สาธิตสดด้วย dataset ไอศกรีมชุดเดียวกัน (มีไฟล์ตัวอย่างให้ในโฟลเดอร์ `code/`)

สิ่งที่ต้องทำใน Orange:
1. โหลด data — **12 data points**, 4 columns เป็น feature, 1 column เป็น **target**
2. **ระบุ target ให้ชัดเจน** — Orange จะทำเครื่องหมายสีเขียว, ชนิดเป็น **categorical**
3. ต่อเข้า Tree widget

### Parameter ที่ปรับได้ใน Tree widget

| Parameter | ผล |
|---|---|
| **Induce binary tree** (ติ๊ก/ไม่ติ๊ก) | ติ๊ก = บังคับให้เป็น binary · ไม่ติ๊ก = แตกได้ตามจำนวนค่าจริงของ feature |
| **Max tree depth** | ระบุความลึกสูงสุด |
| **Split subsets smaller than…** | **stopping condition** — ถ้า data เหลือน้อยกว่านี้ก็ไม่ split ต่อ |

**สิ่งที่อาจารย์ให้สังเกต**: พอติ๊ก binary ตัว Weather ที่มี 3 ค่า จะถูกจับ **Cloudy กับ Sunny ไว้ด้วยกัน** เป็นกลุ่มขวา และ **Rainy** เป็นกลุ่มซ้าย แล้วค่อยแยกทีหลัง · พอเอาติ๊กออก มันจะแตกเป็น **3 กิ่งพร้อมกัน**ทันที

➤ **ต้นไม้ที่ได้จึงหน้าตาไม่เหมือนกัน ขึ้นอยู่กับว่าบังคับ binary หรือไม่** — แต่ทั้งคู่ไม่ผิด

Orange แสดงตัวเลขที่แต่ละ node ให้ด้วย: เริ่มต้น 12 ตัว (6 Yes / 6 No) → แตกเป็น ซ้าย 4, กลาง 4, ขวา 4 · กิ่ง Sunny สุดท้ายเหลือ 3 Yes / 1 No

จากนั้นต่อ **Test data → Prediction** ได้เลย (ตัวอย่างมี 6 test cases) และมี **Test Score** ให้ดู

---

## 15 Random Forest (พูดถึงผ่านๆ)

*(จาก transcript — อาจารย์บอกว่า "เราไม่ได้พูดถึงกัน เราพูดแค่ตัวนี้ก็พอเป็น basic ก่อน")*

- Decision Tree ปกติให้**ต้นไม้ 1 ต้น**
- มีคนคิดว่าต้นเดียวอาจทำงานไม่ดี — เหมือนตัดสินใจคนเดียว → **ขอใช้หลายต้นได้ไหม?**
- **Random Forest** = ใช้ต้นไม้เป็น **100 / 200 / 300 / 500 ต้น** แล้ว**เอาเสียงส่วนมาก** (voting)
- แต่ละต้นต้อง**แตกต่างกัน** — ใช้เกณฑ์/กฎต่างกันในการเลือก feature อาจใช้การ random, ทำต้นสูงต้นเตี้ยผสมกัน
- **ความหลากหลายคือหัวใจ** ถ้าทุกต้นเหมือนกันหมดก็ไม่มีประโยชน์

---

## 16 K-means — Clustering คืออะไร

**Clustering ใน data science = การจัดกลุ่ม data points ที่มีความคล้ายกันไว้ด้วยกัน และแยกตัวที่ต่างออกไปอีกกลุ่ม** — เรียกอีกอย่างว่า **cluster analysis**

สไลด์: *"K-means clustering is one of the most popular and widely used **unsupervised** machine learning algorithms. It is used to group similar data points together into clusters, **without prior knowledge of the group labels**."*

### `ระวัง` — ข้อสอบถามแน่

อาจารย์พูดตรงๆ ว่า **"เดี๋ยวขอ อันนี้เป็นโจทย์ในข้อสอบ อาจจะถามว่าไอ้ K-means มันอยู่ในกลุ่มประเภทอะไร"**

➤ **K-means = unsupervised learning** · **เหตุผล: ไม่มีการใช้ label**

### Clustering ≠ Classification

อาจารย์ย้ำว่า **"clustering กับ classification มันแยกกัน"**:

| | Classification | Clustering |
|---|---|---|
| ประเภท | supervised | **unsupervised** |
| ใช้ label? | **ใช้** | **ไม่ใช้** |
| วัดถูก/ผิดได้? | ได้ | **ไม่ได้** — "ไม่รู้ว่าถูก ไม่รู้ว่าผิด เอาแค่จัดกลุ่ม" |
| วัดอะไรแทน | accuracy ฯลฯ | **ดีไม่ดี** — "ต้องมาดูว่าตอนเอาไปใช้มันได้ผลไหม" |
| ตัวอย่าง | Decision Tree (เล่น/ไม่เล่น) | จัดกลุ่มลูกค้า |

**ตัวอย่างการใช้จริงที่อาจารย์ยก**: เราเป็นเจ้าของ product อยากรู้ว่าคนที่ซื้อของเราเป็นกลุ่มอะไรบ้าง → เอา attribute ของแต่ละคนมา (อยู่ในเมือง/นอกเมือง, single, single mom, พ่อเลี้ยงเดี่ยว …) แล้วให้มันจัดกลุ่มให้ **โดยที่เราไม่รู้คำตอบว่าถูกหรือผิด**

---

## 17 K เป็น hyperparameter

**K = จำนวน cluster ที่ต้องการ** และ **user เป็นคนเลือกเอง ล่วงหน้า**

สไลด์: *"The 'K' in K-means is the number of clusters you want to find (**you choose K in advance**)"*

### `ระวัง` — ข้อสอบถามแน่

อาจารย์พูดตรงๆ: **"ข้อสอบผมจะถามนะว่ามันมี parameter กับ hyperparameter มันต่างกันอย่างไรด้วย จะมีช้อยส์ให้เลือก"**

➤ **K เป็น hyperparameter** — คนที่ระบุคือ **user / data scientist** ไม่ใช่โมเดลเรียนรู้เอง

อาจารย์ย้ำอีกทีตอนไล่สไลด์ EDA: **"model parameter คืออะไร hyperparameter คืออะไร ไปอ่านอีกที"**

`เกร็ดเสริม`: **"มันไม่มีอะไรถูกไม่มีอะไรผิด"** — Iris จะจัด 3 กลุ่ม 4 กลุ่ม 5 กลุ่มก็ได้ ขึ้นอยู่กับว่าเอาไปใช้แล้วดีไหม

---

## 18 Centroid

**Centroid = จุดศูนย์กลางของแต่ละ cluster**

คำที่เกี่ยวข้องที่อาจารย์ไล่ให้ฟัง (เพราะห้องบอกว่าไม่เคยได้ยินคำว่า centroid):
- **center** — จุดศูนย์กลาง
- **CG = center of gravity** (จุดศูนย์ถ่วง, ในวิชาฟิสิกส์)
- **COM = center of mass**

**ตัวอย่างสามเหลี่ยม** (สไลด์มีรูปนี้): centroid ของสามเหลี่ยมคือ **จุดตัดของเส้นมัธยฐาน (median)** — ลากจากมุมไปยังจุดกึ่งกลางของด้านตรงข้าม ทั้ง 3 เส้นตัดกันที่จุดเดียว โดยสมมติว่าวัตถุเป็นเนื้อเดียวกัน หนาเท่ากันสม่ำเสมอ

➤ **3 จุดง่าย แต่ถ้ามีเป็นหมื่นจุดล่ะ?** — นั่นคือที่มาของ algorithm

---

## 19 Euclidean distance

**วิธีวัดความคล้าย/ไม่คล้าย = ระยะห่าง (distance)** — **ยิ่งใกล้ยิ่งเหมือน ยิ่งไกลยิ่งต่าง**

**Euclidean distance** คือสิ่งที่เรียนมาตั้งแต่มัธยม แค่ไม่ได้ตั้งชื่อให้ — มาจาก **ทฤษฎีบทพีทาโกรัส** (a² + b² = c²):

```
d = √[ (x₁ − x₂)² + (y₁ − y₂)² ]
```

### WCSS

**WCSS = Within-Cluster Sum of Squares** — "within cluster" = ภายใน cluster นั้นๆ, "SS" = sum of squares

สไลด์: *"K-means divides the data into k clusters by **minimizing the sum of the squared distances** of each record/data point to the mean of its assigned cluster. This is referred to as the within-cluster sum of squares or **within-cluster SS (WCSS)**"*

**ทำไมต้อง square?** — อาจารย์อธิบายว่า:
- ถ้าไม่ square ก็ต้องหา square root ซึ่ง**วุ่นวายและช้า**
- เราไม่ต้องการตัวเลขที่ **precise** — ต้องการแค่เปรียบเทียบได้ว่า**ใกล้หรือไกล**
- "ต้องการว่าคนนี้สูงกว่าคนนั้น แต่ไม่ต้องการรู้ว่าสูงกว่าเท่าไหร่"
- ➤ **ทำให้คำนวณเร็วมาก**

`เกร็ดเสริม` สไลด์ระบุว่า R ใช้ algorithm ของ **Hartigan and Wong (1979)** ซึ่ง partition ให้ WCSS น้อยที่สุด

---

## 20 Normalization และเหตุผลว่าทำไมต้องทำ

**ปัญหา: scale ต่างกัน**

ตัวอย่างที่อาจารย์ยก:
- **อายุ** ห่างกันมากสุดก็ประมาณ 100
- **รายได้** ต่างกันได้เกือบล้าน

หรือจาก dataset `imports-85` ที่เคยใช้ตอน linear regression:
- **horsepower** อยู่ระหว่าง **48 – 288**
- **price** อยู่ระหว่าง **5,000 – 40,005**

**ทำไมถึงเป็นปัญหา**: machine learning ต้องหา **error** (ผลต่าง) แล้ว**ยกกำลังสอง** — ถ้าตัวหนึ่งอยู่หลักหมื่น ยกกำลังสองก็ไปหลักล้าน ส่วนอีกตัวหลักร้อยยกกำลังสองได้แค่หลักหมื่น

➤ **มันไม่แฟร์ — โมเดลจะให้น้ำหนักกับ feature ที่มีค่าเยอะเกินไป กลายเป็นเรียนรู้แบบลำเอียง**

### `ระวัง` — อาจารย์เชื่อมเข้ากับข้อสอบทันที

**"เป็น bias ในข้อสอบผมก็ถามนะ bias มีอะไรบ้าง พวก data bias, human bias ก็ไปเปิดดูอีกทีนะ"**

➤ **scale ที่ไม่เท่ากันนับเป็น data bias**

### วิธีแก้

| วิธี | ทำอะไร |
|---|---|
| **Normalization** | บีบให้อยู่ระหว่าง **0 กับ 1** — ต่ำสุดเป็น 0 สูงสุดเป็น 1 ตรงกลาง interpolate |
| **Standardization (Z-score)** | ใช้ standard deviation — ต้องเข้าใจ stat ก่อน |

**ใน Orange**: มี widget **Preprocess** → เลือก **Normalize** → เลือกว่าจะเอาแบบ 0–1 หรือ standard deviation

`เกร็ดเสริม` Orange จะ normalize **เฉพาะ feature (input) ไม่แตะ target (y)** เพราะ target เป็น output · แต่เลือกเองรายคอลัมน์ก็ได้

`เกร็ดเสริม` **preprocessing** = กระบวนการที่ทำ**ก่อน**จะไปทำอย่างอื่น · ตัวอย่างอื่น: ถ้ามีรูปภาพขนาดพันคูณพัน แต่โมเดลต้องการ 500×500 ก็ต้อง preprocess ก่อน

---

## 21 ขั้นตอนของ K-means

สไลด์ให้มา 5 ขั้น:

| Step | ทำอะไร |
|---|---|
| **1** | **เลือก k centroids** — สุ่มเลือก k แถวจาก dataset |
| **2** | **assign แต่ละ data point ไปยัง centroid ที่ใกล้ที่สุด** |
| **3** | **คำนวณ centroid ใหม่** เป็นค่าเฉลี่ยของทุก data point ใน cluster นั้น |
| **4** | **assign data points ใหม่อีกรอบ** ไปยัง centroid ที่ใกล้ที่สุด |
| **5** | **ทำซ้ำ step 3 และ 4** จนกว่า data points **ไม่ถูกย้ายอีกแล้ว** หรือครบ **maximum number of iterations** |

อาจารย์อธิบายเพิ่ม *(จาก transcript)*:
- **centroid เริ่มต้นสุ่มได้เลย** — สมมติมีหมื่นจุด ต้องการ k=3 ก็สุ่มมา 3 จุดจากหมื่นจุด
- รอบแรก centroid **"มันอาจจะเพี้ยน"** เพราะพอมีสมาชิกจริงแล้ว บางจุดเอียงซ้ายบางจุดเอียงขวา → ต้องคำนวณจุดกลางจริงๆ ใหม่
- พอ centroid ย้าย **จุดที่เคยเป็นสีฟ้าอาจกลายเป็นสีแดง** ในรอบถัดไปได้
- **"มันย้ายไปย้ายมาจนกระทั่งมันนิ่ง ก็จบแค่นั้นเอง"**
- **"ไม่ใช่แค่ทำแค่รอบเดียวแล้วจบ"**

### `ระวัง` — K-means เป็น non-deterministic

สไลด์ระบุชัด: *"The basic k-means clustering is based on a **non-deterministic** algorithm. This means that **running the algorithm several times on the same data could give different results**. The non-deterministic nature of k-means is due to its **random selection of data points as initial centroids**."*

และ *"**Sensitive to initial centroid placement** (can converge to poor solutions)"*

➤ **นี่คือช้อยส์ที่ออกสอบได้ง่ายมาก — รันซ้ำกับข้อมูลเดิมได้ผลไม่เหมือนเดิม เพราะสุ่ม centroid เริ่มต้น**

`เกร็ดเสริม` สไลด์ยังบอกว่า *"K-means does not ensure the clusters will have the same size, but finds the clusters that are the **best separated**"* — **ไม่การันตีว่าแต่ละกลุ่มจะขนาดเท่ากัน**

---

## 22 WCSS และ Elbow method

**คำถามที่ทุกคนถาม: จะใช้กี่ cluster ดี?**

### วิธีที่ไม่ค่อยดี

ใช้ความรู้เชิงสถิติ/domain เบื้องต้น — ทำ visualization, ทำ EDA ก่อน แล้วเดาว่าน่าจะมีสัก 5 กลุ่ม แล้วเริ่มจาก 5 · **อาจารย์บอกเองว่า "อันนี้ไม่ใช่คำตอบที่ดี มันเป็นการลองผิดลองถูก"**

### Elbow method

**วิธีที่มั่นใจที่สุด**:
1. **ลอง k ตั้งแต่ 1, 2, 3, … ไปเรื่อยๆ** (เช่นถึง 10)
2. แต่ละ k คำนวณ **WCSS** (error รวมของทุก cluster บวกกัน)
3. **plot** ค่า WCSS เทียบกับ k
4. **ดูจุดที่ error เริ่มนิ่ง — ความชันเริ่มราบ** นั่นคือ "ข้อศอก"

สไลด์: *"By considering the Within Cluster Sum of Squares (WCSS), we can select the number of clusters where **the change in WCSS begins to level off** (called the elbow method)"*

ในตัวอย่างของสไลด์: *"a good number of clusters is **3 at best or 4 if needed**"*

`เกร็ดเสริม` **elbow แปลว่าข้อศอก** — อาจารย์ให้จำจากรูปกราฟที่หักงอเหมือนข้อศอก

`เกร็ดเสริม` สไลด์บอกว่ามีวิธีอื่นด้วยคือ **Silhouette Score** แต่อาจารย์บอก "ยังไม่ต้องเรียนตอนนี้"

### ตัวอย่าง Iris

- **Iris dataset** — ดอกไม้ 3 สายพันธุ์ วัด **petal (กลีบดอก)** และ **sepal (กลีบเลี้ยง)** ทั้งความกว้างและความยาว
- ตอนแสดงผลเป็น 2 มิติ เลือกใช้แค่ 2 ตัวแปร (ความกว้าง/ความยาวของกลีบดอก) ก็**เกือบแยกได้ครบแล้ว**
- Elbow plot ของ Iris ชี้ไปที่ **k = 3** ซึ่ง**ตรงกับความจริง** (3 สายพันธุ์) · k = 4 ก็ไม่ผิด

---

## 23 K-modes และ K-prototypes

### ปัญหา: K-means ใช้กับข้อมูล categorical ไม่ได้

สไลด์: *"**Not suitable for non-numerical (categorical) data.** Even if you encode categories numerically (like one-hot encoding), the **Euclidean distance may become misleading**."*

| Algorithm | ใช้กับ | วัดความต่างด้วย |
|---|---|---|
| **K-means** | **numerical** | **Euclidean distance** — ใช้ **mean** |
| **K-modes** | **categorical / nominal** | **จำนวน mismatch** (คล้าย **Hamming distance**) — ใช้ **mode** |
| **K-prototypes** | **ผสมทั้งสองแบบ** | รวม K-means + K-modes |

### K-modes ทำงานยังไง

**นับว่ามันต่างหรือไม่ต่าง แค่นั้น**:
- ถ้าเหมือนกัน → **mismatch = 0**
- ถ้าต่างกัน → **mismatch = 1**

ตัวอย่างที่อาจารย์ยก: จัดกลุ่มด้วย `city` และ `gender`
- New York vs New York → mismatch = 0
- New York vs Chicago → mismatch = 1
- ถ้าทั้ง Female เหมือนกัน **และ** New York เหมือนกัน → mismatch รวม = 0 → **ใกล้กันที่สุด**

➤ **mismatch ยิ่งน้อยยิ่งใกล้กัน · mismatch ยิ่งมากยิ่งห่างกัน**

`เกร็ดเสริม` เพศ (male/female) เป็น **nominal data** และใช้จัดกลุ่มได้ — ความต่างเป็น 0 หรือ 1 · อาจารย์บอกว่า **"อันนี้ออกสอบนะ ที่เราเรียนกันไป ออกข้อสอบก็จะมีพวก ratio data, interval data"**

### K-prototypes

สไลด์: *"Each cluster center is called a **prototype** because it represents the '**typical**' or most representative point of that cluster"*

**cost function** ที่สไลด์ให้:
```
cost = (age₁ − age₂)² + (income₁ − income₂)² + (number of mismatches)
```
คือ **เอาส่วน numerical (squared distance) บวกกับส่วน categorical (mismatch count)**

---

## 24 Hard vs Soft clustering

สไลด์แบ่งวิธี assign จุดเข้า cluster เป็น 2 แบบ:

| แบบ | ชื่อ | อธิบาย | ตัวอย่าง |
|---|---|---|---|
| **1** | **Hard clustering** | หนึ่งจุด **อยู่ได้แค่ cluster เดียว** ต้องเลือก | **K-means** |
| **2** | **Fuzzy / Soft clustering** | หนึ่งจุด **กระจายอยู่ได้หลาย cluster** ตาม weight ที่กำหนด | **Fuzzy C-means (FCM)** |

**ตัวอย่างแอปเปิ้ลของสไลด์**: แอปเปิ้ลลูกหนึ่งจะแดง**หรือ**เขียว (hard) — แต่จริงๆ มันแดง**และ**เขียวได้ (fuzzy) คือแดงระดับหนึ่ง เขียวระดับหนึ่ง

อาจารย์อธิบายเพิ่ม *(จาก transcript)*: จุดหนึ่งอาจอยู่กลุ่มนี้ **80%** กลุ่มนั้น **20%** — คลุมเครือ ไม่ชัดเจน

`เกร็ดเสริม` **ทำไมใช้ C ไม่ใช้ K?** อาจารย์บอกว่าตอนแรกก็งงเหมือนกัน — **C มาจาก class / category** ก็คือจำนวน center นั่นแหละ ความหมายเดียวกับ K

`เกร็ดเสริม` อาจารย์เทียบ **fuzzy logic** กับ **quantum**: binary คือ 0 กับ 1 ส่วน quantum มีอะไรอยู่ระหว่างกลางได้ · fuzzy logic ก็ไปในทิศทางเดียวกัน คือมีค่าระหว่าง 0 กับ 1

---

## 25 ไล่สไลด์เก่า — จุดที่อาจารย์บอกว่าจะออกข้อสอบ

20 นาทีสุดท้ายอาจารย์เปิดสไลด์เซต Intro และ EDA ไล่ทีละหน้าแล้วบอกว่าจะถามตรงไหน **นี่คือส่วนที่มีค่าที่สุดของทั้งคาบ**

> วิธีออกข้อสอบของอาจารย์: **"เวลาออกข้อสอบผมก็ไปเปิดดูแล้วก็มาดูทีละหน้า ทีอันออกถามเป็นช้อยส์ 4 ช้อยส์"** — คือไล่จากสไลด์ทีละหน้าจริงๆ

### จากเซต Intro to DS, Engineering and AI

| หัวข้อ | อาจารย์พูดว่า |
|---|---|
| **Skills ของ data scientist** | สไลด์มีวลี **"Jack of all trades, master of ..."** — เหมือนเป็ด ทำได้หลายอย่างแต่ไม่เก่งสักอย่าง · **"โจทย์ก็จะถามว่า data scientist ต้องมี skill อะไรบ้าง ต้องมีความรู้อะไรบ้าง"** (stat, computer, domain knowledge) |
| **Data Scientist vs Data Engineer** | **"ต่างกันอย่างไร ต้องให้ได้"** · DE ทำต้นน้ำ — โครงสร้างพื้นฐาน จัดเก็บข้อมูล |
| **Data Science Pipeline** | ต้นน้ำ กลางน้ำ ปลายน้ำ มีอะไรบ้าง |
| **Data Lifecycle** | คล้าย SDLC · **"ผมถามตัวนี้ด้วย"** |
| **จำนวนคนในทีม** | **"data science, data engineering ใครมีมากกว่าใคร จำนวนประมาณเท่าไหร่คร่าวๆ"** — ไปดูอีกที |
| **Data bias / Human bias / Algorithmic bias** | **"ต้องจำ ไปดูอีกที"** · bias คือ error ที่อาจไม่ตั้งใจ เกิดจากความเคยชิน · **"data bias คืออะไร มีประเภทอะไร"** · algorithmic bias เกิดจากการ train · **"แล้วก็จะมีวิธีการลด เราไปดูนะ ทำยังไงถ้าต้องการลดปัญหาเรื่อง bias"** |
| **Overfitting / Underfitting** | **"มีถามก็คือ overfitting คืออะไร"** |
| **PDPA** และ **AI Winter** | "พวกเราก็น่าจะรู้ละ" |
| **"Data is the new oil"** | **"ความหมายมันคืออะไร ไปดูอีกที"** |
| **"AI is the new electricity"** | **"อันนี้ก็ออก มันคืออะไร ไปดูอีกที"** |
| **Democratize AI** | เจ้าของ NVIDIA (Jensen Huang) พูดถึง — ทุกคนต้องเข้าถึง AI ได้ ไม่จำกัดแค่ชนชั้นสูง |
| **Big Data — the V's** | **"เอา big data ที่จะถามด้วย ... มี 5 V มี 7 V"** |
| **Insight / Actionable insight** | **"ผมก็ถามไอ้ตัว insight เนี่ย ต้องไปดูกันคืออะไร actionable insight คืออะไร"** |
| **Data mining** | **"ผมถาม data mining ต้องดูอีกที"** — เทคนิคหา pattern ใน big data / data warehouse |
| **KDD** | **"ถามตัวนี้เลย KDD ไปดูมันคืออะไรด้วย"** (Knowledge Discovery in Databases) |
| **Orange** | **"มีข้อหนึ่งถามออเรนจ์ น่าจะง่ายเลย คุณได้สักทีนึง หนึ่งแต้มเลย"** |

### จากเซต EDA – Model Fitting

| หัวข้อ | อาจารย์พูดว่า |
|---|---|
| **Box plot** | **"ผมถาม box plot เลยนะ"** · **"box plot มีไว้เพื่ออะไร scatter plot เพื่ออะไร ต้องไปดูเอาเองนะ"** |
| **Scatter plot** | **"ผมก็ถาม scatter plot ด้วย"** · **"ทำไมเราต้องพล็อตด้วย ... ทำไมไม่ใช้ตัวอื่น ลองไปหาคำตอบเอาเอง"** |
| **EDA คำนิยาม** | **"แน่นอน ถาม EDA นะ ต้องให้คำนิยามได้"** — การสำรวจ data เบื้องต้น ดูว่า data ดีไม่ดี พอไม่พอ ต้องหา feature เพิ่มไหม มี bias เยอะไหม โดยใช้ visualization + stat มาช่วย |
| **Predictive vs Descriptive** | **"บางทีก็อาจจะถามพวกความแตกต่างระหว่าง predictive กับ descriptive นะครับ มันอย่างไร ต้องอธิบายได้"** |
| **Model fitting / Data fitting / Data modeling** | **"เรามีโมเดลฟิตติ้ง แต่ถ้าฟิตติ้งจำได้มั้ย แล้วก็ data modeling มันต่างกันยังไงด้วย"** · **"อาจต้องให้รู้ความต่างกัน"** |
| **Model parameter vs Hyperparameter** | **"model parameter คืออะไร hyperparameter คืออะไร ไปอ่านอีกทีนะ"** |
| **OLTP vs OLAP** | **"ถ้าจำไม่ผิดก็จะถามพวกนี้ OLTP, OLAP ลองไปดู"** |
| **Data types** | **"อันนี้สำคัญ เพราะเราพูดกันบ่อย"** — **qualitative (categorical)** vs **quantitative** · **nominal** (มาจาก "แค่มองเห็นแต่ไม่มีลำดับ" เช่น gender) · **ordinal** (มาจาก order = ลำดับ) · **interval** · **ratio** · **"ต้องดูว่ามัน ratio คืออะไร interval คืออะไร ผมก็จะถามนะ"** |
| **ศูนย์จริง (true zero)** | **Celsius ไม่ใช่ศูนย์จริง** (ยังมีพลังงานความร้อนอยู่) · **Kelvin เป็นศูนย์จริง** (ไม่มีพลังงานความร้อนเลย) · 0 K ≈ −273 °C · อาจารย์เล่าว่า quantum computer ต้องทำให้เย็นถึงประมาณ 2 K |
| **Distribution เบ้ซ้าย/เบ้ขวา** | ดูว่า mean ไปทางไหน · ถ้า perfect ทุกตัวจะตกที่เดียวกัน |
| **Mean / Median / Mode** | น่าจะรู้แล้ว · **median = ค่าที่ผ่ากลาง** ซึ่ง K-means/K-modes ยืมคำมาใช้ |
| **Box plot รายละเอียด** | **"อันนี้ต้องเข้าใจ"** — **Q1, Q2, Q3, IQR** · **fence** ซ้าย/ขวา = **1.5 × IQR** (บางคนใช้ 3 แต่ 1.5 นิยมกว่า) เอาไปบวก/ลบจากขอบกล่อง · จุดที่อยู่**นอกรั้ว = outlier** · **min/max นับเฉพาะจุดที่อยู่ในรั้ว ไม่นับ outlier** · **five-number summary** = 5 ตัวเลขในภาพนี้ |
| **Outlier** | ตอนวิเคราะห์**ตัดทิ้ง** แต่**ต้องไปหาสาเหตุว่าเกิดอะไรขึ้น** และเอาไปวิเคราะห์แยกกลุ่ม — "อาจจะทำให้เราเห็นอะไรบางอย่างได้" |
| **Correlation** | **ไม่ต้องจำสูตร** · รู้ว่าอยู่ระหว่าง **−1 ถึง 1** · **0 = ไม่มี correlation** · บวก = ไปทางเดียวกัน · ลบ = สวนทาง · มี **Pearson** กับ **Spearman** เราใช้ Pearson |
| **Linear regression** | ทำนาย**ค่าที่เป็นตัวเลข** (ราคารถ ราคาบ้าน) = งาน **regression** ซึ่งเป็นส่วนหนึ่งของ **predictive** · **regression แปลไทยว่า "ถดถอย"** — ถดถอยของ error ให้ลดลงเรื่อยๆ จนน้อยที่สุด · จากเส้นเป็นร้อยเป็นพันเส้นที่ลากผ่าน data ได้ **มีเส้นเดียวที่ error น้อยสุด** |
| **ทำไมใช้ linear** | เพราะง่ายสุด (กำลัง 1) และงานส่วนมากก็พอแล้ว · งานซับซ้อนขึ้นใช้ **polynomial** (กำลัง 2 โค้ง 1 ที่, กำลัง 3 โค้งไปโค้งมา) — **แต่ polynomial ไม่ออกสอบ** |
| **Coefficient และดาว** | อาจถาม **"อ่านค่าออกมาอย่างไร เอาสัมประสิทธิ์มาใช้อย่างไร"** · **ดาว (significance)**: 1 ดาว = ใช้ได้ · 2 ดาว = ดีกว่า · 3 ดาว = ดีมาก · **ไม่มีดาวเลย = ไม่สำคัญพอที่จะเอามาใช้ทำนาย** |
| **p-value, R²** | **ไม่ถาม** |
| **Reinforcement learning** | มี **reward** — ทำดีได้รางวัล ทำผิดหักแต้ม · ใน Gen AI คือปุ่ม 👍👎 ที่เก็บเป็นข้อมูลไปปรับโมเดล |
| **ตำแหน่งของ K-means ในแผนภาพ AI** | K-means **แยกอยู่ต่างหาก** (unsupervised) จาก classification/regression |

---

## Glossary

| คำ | ความหมาย |
|---|---|
| **Supervised learning** | เรียนรู้แบบมีผู้สอน — **ใช้ label** · Decision Tree อยู่กลุ่มนี้ |
| **Unsupervised learning** | เรียนรู้แบบไม่มีผู้สอน — **ไม่ใช้ label** · K-means อยู่กลุ่มนี้ |
| **Label / Target / Class label** | คำตอบที่ติดมากับข้อมูลตอน train · ใน classification เป็น **categorical** ใน regression เป็น **numeric** |
| **Feature** | ตัวแปร/คอลัมน์ที่เอามาใช้ทำนาย (x₁, x₂, …) |
| **Data point** | หนึ่งแถวของข้อมูล |
| **Root node** | node แรกของต้นไม้ — คำถามที่สำคัญที่สุด |
| **Leaf node** | node ปลายสุด เป็น label ไม่ใช่คำถาม |
| **Entropy** | ความวุ่นวาย/ไม่บริสุทธิ์ของกลุ่ม · **0 = pure, 1 = 50/50 mess** |
| **Information Gain (IG)** | Entropy(parent) − Weighted Entropy(children) · **ยิ่งมากยิ่งดี** |
| **ID3** | algorithm สร้าง decision tree ด้วย IG โดย **R. Quinlan, 1986** (ไม่ต้องจำชื่อ) |
| **Stopping condition** | เงื่อนไขให้หยุด split — pure node, max depth, minimum samples |
| **Overfitting** | เรียนรู้ training data มากเกินไป · **เสื้อที่ตัดฟิตเป๊ะกับคนเดียว ใส่คนอื่นไม่ได้** |
| **Underfitting** | เรียนรู้น้อยเกินไป · **เสื้อหลวมเกินไป** |
| **Random Forest** | ใช้ต้นไม้หลายร้อยต้นแล้ว vote เอาเสียงส่วนมาก |
| **Rule-based** | ทำงานด้วย if–then · ทั้ง **Decision Tree** และ **Association Rules** เป็น rule-based |
| **Cluster** | กลุ่มของ data points ที่คล้ายกัน |
| **Clustering / Cluster analysis** | การจัดกลุ่มโดยไม่รู้ label ล่วงหน้า |
| **K (ใน K-means)** | **จำนวน cluster** — เป็น **hyperparameter** ที่ user เลือกเอง |
| **Hyperparameter** | ค่าที่ **user/data scientist กำหนดเอง** ไม่ใช่โมเดลเรียนรู้เอง |
| **Centroid** | จุดศูนย์กลางของ cluster · เทียบได้กับ center of gravity / center of mass |
| **Euclidean distance** | ระยะห่างแบบพีทาโกรัส √[(x₁−x₂)² + (y₁−y₂)²] |
| **WCSS** | Within-Cluster Sum of Squares — ผลรวมกำลังสองของระยะจากทุกจุดถึง centroid ของมัน |
| **Elbow method** | plot WCSS เทียบกับ k แล้วเลือกจุดที่กราฟเริ่มราบ |
| **Silhouette Score** | อีกวิธีเลือก k (ยังไม่เรียน) |
| **Non-deterministic** | รันซ้ำกับข้อมูลเดิมได้ผลต่างกัน — เพราะ K-means สุ่ม centroid เริ่มต้น |
| **K-modes** | K-means เวอร์ชัน categorical — วัดด้วย **จำนวน mismatch** (Hamming distance) ใช้ **mode** |
| **K-prototypes** | ผสม K-means + K-modes สำหรับข้อมูลผสม · center เรียกว่า **prototype** |
| **Hard clustering** | หนึ่งจุดอยู่ได้ cluster เดียว (K-means) |
| **Fuzzy / Soft clustering** | หนึ่งจุดอยู่ได้หลาย cluster ตาม weight (**Fuzzy C-means**) |
| **Normalization** | บีบค่าให้อยู่ใน 0–1 |
| **Standardization (Z-score)** | ปรับด้วย standard deviation |
| **Preprocessing** | สิ่งที่ทำกับข้อมูล**ก่อน**เอาไปเข้าโมเดล |

---

## สรุปท้ายบท

| หัวข้อ | ประเด็นสำคัญ |
|---|---|
| **Exam 1** | **วันศุกร์** · **50 ข้อ multiple choice** single-select 4 ช้อยส์ · **ฝนดินสอ 2B** · **3 ชั่วโมง** · closed book · ไม่ต้องใช้เครื่องคิดเลข |
| **ขอบเขต** | **5 sets**: Intro · EDA-Model Fitting · Association Rules · Decision Trees · K-means · **Classification and Metrics ไม่ออก** |
| **สูตร** | ออก: **Support** (และ confidence ต้องจำ) · **ไม่ออก**: entropy, IG, correlation, p-value, R², polynomial |
| **Decision Tree** | **supervised** · ทำได้ทั้ง **classification และ regression** · **rule-based** |
| **หัวใจของ DT** | เลือก feature ที่ให้ **IG สูงสุด** มาเป็น root · **ต้นไม้เตี้ยดีกว่าสูง** · ห้ามใช้ attribute ซ้ำในเส้นทางเดียวกัน |
| **Entropy** | **0 = pure** · **1 = maximum mess (50/50)** · คำพ้อง: disorder, messy, impure, randomness, uncertainty |
| **Information Gain** | **Entropy(parent) − Weighted Entropy(children)** |
| **PlayTennis** | 9 Yes / 5 No จาก 14 · **Entropy ≈ 0.94** · **IG(Outlook) = 0.247 สูงสุด → root** · Overcast pure → leaf ทันที |
| **ไอศกรีม** | 12 คน · features: Weather / DayOfWeek / HasMoney / CravingLevel · **Weather มี IG สูงสุด → root** |
| **Overfitting** | เสื้อที่ตัดฟิตเป๊ะกับคนเดียว — **ไม่ general** |
| **K-means** | **unsupervised** เพราะ**ไม่ใช้ label** · **K เป็น hyperparameter** ที่ user เลือกเอง |
| **K-means algorithm** | สุ่ม k centroids → assign จุดไปตัวที่ใกล้สุด → คำนวณ centroid ใหม่ → assign ใหม่ → **ทำซ้ำจนไม่มีการย้าย** |
| **Non-deterministic** | รันซ้ำได้ผลต่างกัน เพราะสุ่ม centroid เริ่มต้น · sensitive to initial placement |
| **ระยะทาง** | **Euclidean distance** (พีทาโกรัส) · square เพื่อเลี่ยง square root ให้คำนวณเร็ว |
| **เลือก k** | **Elbow method** — plot WCSS แล้วดูจุดที่เริ่มราบ |
| **ข้อมูล categorical** | K-means ใช้ไม่ได้ → **K-modes** (นับ mismatch) · ผสมกัน → **K-prototypes** |
| **Hard vs Soft** | K-means = hard (1 จุด 1 กลุ่ม) · **Fuzzy C-means** = soft (1 จุดหลายกลุ่มตาม %) |
| **Normalization** | ต้องทำเพราะ scale ต่างกันทำให้โมเดล**ลำเอียง** — นับเป็น **data bias** |
| **ที่อาจารย์บอกว่าจะถามตรงๆ** | box plot ใช้ทำอะไร · scatter plot ใช้ทำอะไร · predictive vs descriptive · parameter vs hyperparameter · K-means อยู่กลุ่มไหน · overfitting คืออะไร · bias มีอะไรบ้าง · Orange 1 ข้อ |
