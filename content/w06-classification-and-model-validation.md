---
title: "Classification และการตรวจสอบโมเดล"
week: 6
type: lecture
date: 2026-09-18
tags: [data-science, ai]
---
> สรุปจากสไลด์ `Classification and Metrics.pdf` (71 หน้า) และบันทึกคาบ G2 วันที่ 18 ก.ย. 2026 สไลด์ชุดนี้ครอบคลุมทั้ง classifiers และ metrics; บทนี้เน้นโมเดลกับการแบ่งข้อมูล ส่วนการประเมินเชิงลึกอ่านต่อ W07 ข้อความที่เสริมจากเสียงระบุว่า *(จาก transcript)* ซึ่งมีการถอดเสียงชื่อเทคนิคคลาดเคลื่อน

## 01 ภาพรวม: ทำนายอะไร

Classification เรียนรู้จาก features และ ==class label== ที่รู้คำตอบแล้ว เพื่อทำนายคลาสให้ตัวอย่างใหม่ ต่างจาก regression ซึ่ง target เป็นตัวเลข เช่น ราคาบ้าน (สไลด์ 4, 35)

![Classification รับ features แล้วให้ผลเป็น binary, multi-class หรือ multi-label](./assets/w06-classification-and-model-validation/w6-classification.svg)

| ประเภท | คำตอบต่อหนึ่งตัวอย่าง | ตัวอย่าง |
|---|---|---|
| Binary | หนึ่งคลาสจากสองคลาส | Spam / Not spam |
| Multi-class | หนึ่งคลาสจากมากกว่าสองคลาส | ชนิดดอกไม้ |
| Multi-label | ตั้งแต่ศูนย์ถึงหลาย label พร้อมกัน | รูปเดียวมีสุนัข แมว และนก |

*(จาก transcript)* อาจารย์เปรียบ multi-class กับข้อสอบหลายตัวเลือกที่เลือกคำตอบเดียว อย่าสับสนกับ multi-label ที่เลือกได้หลายคำตอบ

## 02 k-Nearest Neighbors

==k-NN== เก็บ training examples แล้วใช้ตัวอย่างที่ใกล้ query มากที่สุด k ตัว: classification ใช้เสียงข้างมาก ส่วน regression ใช้ค่าเฉลี่ย (สไลด์ 5, 58–67)

1. เลือก k
2. คำนวณระยะจาก query ถึง training examples
3. เรียงระยะและเลือก k ตัวที่ใกล้ที่สุด
4. รวม label ด้วย majority vote

เป็น **nonparametric** และ **lazy learning**: ไม่สร้างสมการโมเดลสรุปข้อมูลไว้ล่วงหน้า งานส่วนใหญ่เกิดตอนทำนาย จุดแข็งคือแนวคิดง่าย; ข้อจำกัดคือคำนวณแพงเมื่อข้อมูลมากและผลขึ้นกับ k, scale และจำนวนมิติ อ่านไดอะแกรมเลือก k ต่อใน W09

## 03 ระยะห่างและชนิดข้อมูล

สไลด์ 62–65 แยก distance สำหรับตัวเลขกับหมวดหมู่:

| Distance | หลักการ |
|---|---|
| Euclidean | `sqrt(sum((x_j - z_j)^2))` ระยะเส้นตรง |
| Manhattan / L1 | `sum(abs(x_j - z_j))` ผลรวมระยะตามแกน |
| Minkowski | รูปทั่วไป; p = 1 เป็น Manhattan, p = 2 เป็น Euclidean |
| Hamming | นับตำแหน่งของ categorical features ที่มีค่าไม่ตรงกัน |

ต้องทำ normalization เมื่อ scale ทำให้บาง features ครอบงำระยะ ทั้ง Euclidean และ Manhattan ยังได้รับผลจาก scale จึงไม่ควรเลือก Manhattan แล้วคิดว่าปัญหาหน่วยวัดหายไปเอง

## 04 Decision Tree และ Gini impurity

Decision Tree ใช้คำถามแบ่งข้อมูลตาม features จนถึง leaf ที่ให้คำตอบ และใช้ได้ทั้ง classification กับ regression สัปดาห์นี้เพิ่ม ==Gini impurity== นอกเหนือจาก Entropy/Information Gain ใน W05 (สไลด์ 9–17)

`Gini = 1 - sum(p_i^2)`

Gini = 0 หมายถึงกลุ่มบริสุทธิ์ ใน binary classification ค่าสูงสุดคือ 0.5 เมื่อสองคลาสมีสัดส่วนเท่ากัน เลือก split ที่ทำให้ **weighted Gini ต่ำที่สุด** จากตัวเลือกที่กำลังเปรียบเทียบ

![ตัวอย่างแบ่งบ้าน 10 หลังด้วย Neighborhood และคำนวณ weighted Gini](./assets/w06-classification-and-model-validation/w6-gini.svg)

ตัวอย่างบ้าน High 5 หลัง/Low 5 หลัง: ก่อนแบ่ง Gini = 0.5 หลังแบ่ง Neighborhood ได้กลุ่ม 4:1 และ 1:4 ซึ่งแต่ละกลุ่ม Gini = 0.32; weighted Gini = 0.32 จึงลดความปนกันลง ข้อนี้แสดงการประเมินหนึ่ง candidate split ยังไม่ได้พิสูจน์ว่าเป็น split ที่ดีที่สุดจนกว่าจะเทียบ features อื่น

## 05 Naïve Bayes

==Naïve Bayes== ใช้ความน่าจะเป็นของคลาสเมื่อเห็น features โดยสมมุติว่า features เป็นอิสระต่อกัน **เมื่อกำหนดคลาสแล้ว** (สไลด์ 18–26)

`P(c | x) = P(x | c) × P(c) / P(x)`

- `P(c)` คือ prior ของคลาส
- `P(x | c)` คือ likelihood ของ features ภายในคลาส
- `P(c | x)` คือ posterior หลังเห็น features

เมื่อตัดสินคลาสของ x เดียวกัน ตัวหาร `P(x)` เท่ากัน จึงเปรียบเทียบ `P(x | c) × P(c)` ได้ สไลด์ spam ให้ `0.1 × 0.2 × 0.2 × 0.3 × 0.4 = 0.00048` เป็นคะแนนฝั่ง Spam ของข้อความ “Dear friend free money” ยังต้องเทียบคะแนนฝั่ง Ham ก่อนเลือกคลาส ตัวเลขนี้ยังไม่ใช่ posterior ที่ normalize แล้ว

ข้อดีคือเรียบง่ายและ train เร็ว; ข้อจำกัดสำคัญคือสมมุติฐาน independence อาจไม่ตรงกับข้อมูลจริง

## 06 Logistic Regression

แม้มีคำว่า regression โมเดลนี้ใช้จำแนกคลาส โดยเปลี่ยน linear score ให้เป็นค่าระหว่าง 0–1 ด้วย ==sigmoid== (สไลด์ 27–31)

`p = 1 / (1 + exp(-(β0 + β1 x1 + ...)))`

จากนั้นเทียบ p กับ threshold เพื่อเลือกคลาส สไลด์ใช้ 0.5 เป็นตัวอย่าง โดยยังต้องกำหนดว่าจะจัดกรณีเท่ากับ threshold ไว้ฝั่งไหน Categorical features ต้อง encode เป็นตัวเลข เช่น one-hot encoding

ตัวอย่างสไลด์ถามว่าลูกค้าอยู่เว็บ 3.5 นาทีจะกด Buy หรือไม่ ต้องมีค่า β ที่เรียนรู้แล้วก่อนจึงคำนวณความน่าจะเป็นได้ เวลาบนเว็บเพียงอย่างเดียวยังไม่ให้คำตอบตัวเลข

## 07 Support Vector Machine

==SVM== หา hyperplane ที่แยกคลาสด้วย margin กว้าง โดย **support vectors** คือจุดข้อมูลใกล้แนวแบ่งที่มีผลต่อแนวแบ่งนั้น (สไลด์ 32–34)

- ข้อมูลสองมิติเห็นแนวแบ่งเป็นเส้น; มิติสูงขึ้นใช้ hyperplane
- เมื่อแยกด้วยเส้นตรงใน representation เดิมไม่ได้ ใช้ **kernel trick** เพื่อจัดการความสัมพันธ์ที่ซับซ้อนขึ้น
- ผลขึ้นกับ kernel และการตั้งค่า และอาจคำนวณแพงเมื่อข้อมูลมาก

*(จาก transcript)* อาจารย์ยกตัวอย่างการรู้จำท่าทางด้วยตำแหน่ง joints เพื่อเชื่อม features จากข้อมูลจริงเข้ากับ classification

## 08 แปลงหลายคลาสเป็น binary problems

สไลด์ 36–38 เสนอวิธีประกอบ binary classifiers สำหรับ C คลาส:

| วิธี | จำนวน classifiers | ตัวอย่าง 4 สี |
|---|---|---|
| One-vs-Rest (OvR) | C | Red vs สีอื่น, Green vs สีอื่น ฯลฯ รวม 4 ตัว |
| One-vs-One (OvO) | C(C−1)/2 | เปรียบเทียบทุกคู่สี รวม 6 ตัว |

OvR แยกทีละคลาสกับที่เหลือ ส่วน OvO แยกทีละคู่คลาส แล้วรวมผลเพื่อตัดสิน multi-class output

## 09 Train, validation และ final test

สไลด์ 41–45 แยกหน้าที่ข้อมูลเพื่อวัด ==generalization== หรือความสามารถกับข้อมูลที่ไม่เคยเห็น:

| ชุดข้อมูล | ใช้ทำอะไร |
|---|---|
| Training | เรียนรู้ parameters ของโมเดล |
| Validation / Dev | เปรียบเทียบโมเดลและเลือก hyperparameters |
| Test | ประเมินโมเดลสุดท้ายหลังเลือกทุกอย่างแล้ว |

สัดส่วน 70:10:20 หรือ 80:20 เป็นตัวอย่าง ไม่ใช่ค่าบังคับ *(จาก transcript)* อาจารย์ย้ำว่าข้อมูลปริมาณมากอาจใช้ test เป็นเปอร์เซ็นต์น้อยลงได้

ตัวอย่าง **5-fold CV**: กัน test 20% ไว้ก่อน แบ่งอีก 80% เป็น 5 folds; แต่ละรอบ train 4 folds และ validate 1 fold จนครบ หาคะแนนเฉลี่ยเพื่อเลือก hyperparameters แล้ว train ใหม่บน 80% ทั้งหมด สุดท้ายประเมินบน test 20% ที่กันไว้

Underfitting มีทั้ง train/test error สูง ส่วน overfitting มี train error ต่ำแต่ test error สูง การตรวจหลาย folds ช่วยประเมินการเลือกโมเดล แต่ยังต้องรักษา final test ไว้

## 10 เริ่มอ่าน Confusion Matrix

สไลด์ 46–57 แนะนำ TP, TN, FP และ FN รวมถึง Accuracy, Precision, Recall, F1, Specificity, ROC และ AUC โดย **ต้องกำหนด positive class ก่อน** และดูทิศของแถว/คอลัมน์ทุกครั้ง

*(จาก transcript)* ใช้อุปมาจับปลา: precision มองสิ่งที่จับมาแล้วว่ามีปลาที่ต้องการจริงเท่าไร; recall มองปลาที่ต้องการทั้งหมดในบ่อว่าเก็บมาได้เท่าไร สูตร ตัวอย่างคำนวณ และเหตุผลเลือก metric อยู่ใน W07

## อภิธานศัพท์ (Glossary)

| คำ | ความหมาย |
|---|---|
| Class label | คำตอบเชิงหมวดหมู่ที่ใช้ train classifier |
| k-NN | ทำนายจากเพื่อนบ้านใกล้ที่สุด k ตัว |
| Gini impurity | ค่าความปนกันของคลาส: 1 − sum(p_i²) |
| Naïve Bayes | classifier เชิงความน่าจะเป็นที่สมมุติ conditional independence |
| Sigmoid | ฟังก์ชันรูป S ที่เปลี่ยนคะแนนเป็นค่าระหว่าง 0–1 |
| Support vector | จุดข้อมูลใกล้แนวแบ่งที่มีผลต่อ hyperplane ของ SVM |
| OvR | แยกหนึ่งคลาสกับคลาสอื่นทั้งหมด |
| OvO | แยกคลาสเป็นคู่ทั้งหมด |
| Validation set | ข้อมูลสำหรับเลือกโมเดลหรือ hyperparameters |
| Generalization | ความสามารถทำนายข้อมูลที่ไม่เคยเห็น |

## สรุปท้ายบท

| หัวข้อ | สิ่งที่ต้องเข้าใจ |
|---|---|
| Classification | categorical target; binary, multi-class, multi-label ต่างกัน |
| Classifiers | k-NN, Decision Tree, Naïve Bayes, Logistic Regression, SVM |
| Gini | เปรียบเทียบ weighted impurity ของ candidate splits |
| หลายคลาส | OvR = C, OvO = C(C−1)/2 |
| การประเมิน | Train เพื่อเรียนรู้, validation เพื่อเลือก, test เพื่อประเมินสุดท้าย |
