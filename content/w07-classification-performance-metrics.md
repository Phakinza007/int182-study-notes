---
title: "Classification Performance Metrics และการเลือกวิธีประเมิน"
week: 7
type: lecture
date: 2026-09-25
tags: [data-science, ai]
---
> สรุปจาก `INT182_Lecture7_Classification-ModelEvaluation_V4.pdf` (48 หน้า) และบันทึกคาบ G2 วันที่ 25 ก.ย. 2026 อ้างเลขหน้าจริงของ PDF เพราะหมายเลขสไลด์เดิมจากหลายแหล่งไม่ต่อกัน ตัวอย่างคำนวณด้านล่างคำนวณจากข้อมูลในสไลด์

## 01 การจำแนกและความสามารถกับข้อมูลใหม่

Training set มี attributes และคลาสที่รู้คำตอบแล้ว อัลกอริทึมใช้ข้อมูลนี้สร้างโมเดล (**induction**) แล้วนำโมเดลไปใช้กับข้อมูลใหม่ (**deduction**) เป้าหมายคือทายตัวอย่างที่ไม่เคยเห็นได้ถูกต้อง (PDF หน้า 5–16)

ตัวอย่างต้นไม้ Refund → Marital Status → Taxable Income มีต้นไม้หลายโครงสร้างที่ fit ข้อมูลเดียวกันได้ เมื่อนำ record `Refund = No, Married, Income = 80K` ไปตามต้นไม้ จะหยุดที่ Married → **Cheat = No** โดยไม่ต้องถาม Income ต่อ

การประเมินมี 3 คำถาม: วัดด้วย metric ใด, สุ่ม/แบ่งข้อมูลอย่างไรให้คะแนนน่าเชื่อถือ, และเปรียบเทียบโมเดลอย่างไร *(จาก transcript)* อาจารย์เชื่อมกับข้อจำกัดเวลา งบประมวลผล และการใช้งานจริงด้วย

## 02 Underfitting, overfitting และ Occam’s Razor

| สภาพ | Training error | Test error | ความหมาย |
|---|---|---|---|
| Underfitting | สูง | สูง | โมเดลง่ายจนจับ pattern สำคัญไม่ได้ |
| Generalization ที่ดี | ต่ำเหมาะสม | ใกล้ training | จับ pattern ที่ใช้กับข้อมูลใหม่ได้ |
| Overfitting | ต่ำมาก | สูงกว่า training มาก | จับ noise หรือรายละเอียดเฉพาะ training |

PDF หน้า 20–23 ยกสาเหตุ overfitting จาก noise และตัวอย่างฝึกไม่พอในบางบริเวณ ส่วน **Occam’s Razor** ให้เลือกโมเดลที่ง่ายกว่าเมื่อ generalization error ใกล้กัน เพราะความซับซ้อนเพิ่มโอกาส fit ความบังเอิญของข้อมูล การจัดการ missing values และต้นทุนจำแนกก็เป็น practical issues ในหน้า 18

## 03 Confusion Matrix: ดูจริงและทาย

กำหนด Positive เป็นคลาสที่สนใจก่อน จากนั้นแยกว่าคำทำนายตรงกับความจริงหรือไม่ (PDF หน้า 26–28)

![Confusion Matrix แถวคือ Actual คอลัมน์คือ Predicted พร้อมตัวหารของแต่ละ metric](./assets/w07-classification-performance-metrics/w7-confusion.svg)

- ==True Positive (TP)==: จริงเป็นบวก ทายเป็นบวก
- ==True Negative (TN)==: จริงเป็นลบ ทายเป็นลบ
- ==False Positive (FP)==: จริงเป็นลบ แต่ทายเป็นบวก — false alarm
- ==False Negative (FN)==: จริงเป็นบวก แต่ทายเป็นลบ — missed case

แบบฝึกหน้า 29 มี 12 records: TP = 4, TN = 4, FP = 2, FN = 2 จึงได้ Accuracy, Precision และ Recall เท่ากับ 4/6 หรือ 8/12 = **66.67%** ในตัวอย่างนี้ ค่าที่เท่ากันเกิดจากจำนวนในโจทย์ ไม่ใช่กฎทั่วไป

## 04 สูตรที่ต้องอ่านความหมายออก

ให้ `N = TP + TN + FP + FN` (PDF หน้า 27–28, 33–34)

| Metric | สูตร | ถามว่าอะไร |
|---|---|---|
| Accuracy | `(TP + TN) / N` | ถูกทั้งหมดกี่ส่วน |
| Error rate | `(FP + FN) / N` | ผิดทั้งหมดกี่ส่วน |
| Precision | `TP / (TP + FP)` | ในสิ่งที่ทายบวก เป็นบวกจริงเท่าไร |
| Recall / Sensitivity / TPR | `TP / (TP + FN)` | ในบวกจริงทั้งหมด จับได้เท่าไร |
| Specificity / TNR | `TN / (TN + FP)` | ในลบจริงทั้งหมด ปฏิเสธได้ถูกเท่าไร |
| FPR | `FP / (FP + TN)` | ในลบจริงทั้งหมด เตือนผิดเท่าไร |
| FNR | `FN / (FN + TP)` | ในบวกจริงทั้งหมด พลาดเท่าไร |
| F1 | `2PR / (P + R)` หรือ `2TP / (2TP + FP + FN)` | สมดุล precision กับ recall |

==F1== เป็น harmonic mean และไม่ใช้ TN โดยตรง จึงไม่ใช่คะแนนเดียวที่ตอบได้ครบทุกสถานการณ์ ถ้าตัวหารเป็นศูนย์ต้องระบุวิธีจัดการของเครื่องมือที่ใช้ แทนการคำนวณเป็นค่าปกติ

## 05 ทำไม Accuracy สูงยังพลาดได้

PDF หน้า 30 ให้ข้อมูล Class 0 จำนวน 9,990 ตัวและ Class 1 จำนวน 10 ตัว หากทายทุกตัวเป็น Class 0 จะได้ Accuracy **99.9%** แต่จับ Class 1 ไม่ได้เลย จึงต้องดู ==class imbalance== และชนิดความผิดพลาด

แบบฝึกหน้า 36: TP = 90, FN = 210, FP = 140, TN = 9,560 รวม 10,000 ตัว คำนวณได้:

| Metric | คำนวณ | ผล |
|---|---|---|
| Accuracy | 9650/10000 | 96.50% |
| Error rate | 350/10000 | 3.50% |
| Precision | 90/230 | 39.13% |
| Recall / Sensitivity | 90/300 | 30.00% |
| Specificity | 9560/9700 | 98.56% |
| F1 | 180/530 | 33.96% |

Accuracy ดูดีเพราะคลาสลบมีมาก แต่ Recall แสดงว่าพลาดบวกจริง 210 จาก 300 ตัว การรายงานหลาย metric จึงช่วยเห็นปัญหาที่ค่าเดียวซ่อนไว้

## 06 ต้นทุนและเป้าหมายธุรกิจ

Cost matrix กำหนด `C(i | j)` เป็นต้นทุนเมื่อจริงเป็น j แต่ทายเป็น i (PDF หน้า 31–35) ในตัวอย่างหน้า 32 ให้ต้นทุน TP = −1, FN = 100, FP = 1, TN = 0:

- M1: TP 150, FN 40, FP 60, TN 250 → Accuracy 80%; Cost = `−150 + 4000 + 60 = 3910`
- M2: TP 250, FN 45, FP 5, TN 200 → Accuracy 90%; Cost = `−250 + 4500 + 5 = 4255`

ดังนั้น M2 แม่นยำกว่ารวม แต่แพงกว่าภายใต้ cost matrix นี้

| สิ่งที่ต้องลด | Metric ที่ช่วยมอง |
|---|---|
| False alarms / FP | Precision |
| Missed cases / FN | Recall |
| ต้องสมดุล FP และ FN | F1 พร้อมดู Precision/Recall แยก |
| ดู ranking หลาย threshold | ROC-AUC |
| ตรวจคุณภาพ probability | Log loss — สไลด์กล่าวถึง แต่ไม่ได้ให้สูตรคำนวณ |

*(จาก transcript)* ตัวอย่าง customer churn และสินเชื่อทำให้เห็นว่าต้นทุนของการเตือนผิดกับการพลาดลูกค้าไม่จำเป็นต้องเท่ากัน

## 07 แบ่งข้อมูลอย่างไรให้คะแนนน่าเชื่อถือ

PDF หน้า 38–42 แยก Training สำหรับ fit, Validation สำหรับเลือก และ Test สำหรับประเมินสุดท้าย ผลขึ้นกับ class distribution, misclassification cost และขนาดชุดข้อมูลด้วย

![การหมุน validation fold สามรอบ โดยกัน final test ไว้ก่อน](./assets/w07-classification-performance-metrics/w7-cross-validation.svg)

| วิธี | การทำงาน |
|---|---|
| Holdout | แบ่ง train/test ครั้งเดียว เช่น 2/3 กับ 1/3 |
| Random subsampling | ทำ holdout ซ้ำด้วยการสุ่มหลายครั้ง |
| k-fold CV | แบ่ง k ส่วน; train k−1 ส่วน แล้วทดสอบ fold ที่เหลือ หมุนจนครบ |
| Leave-one-out | กรณี k = N แต่ละครั้งเหลือหนึ่งตัวอย่างไว้ประเมิน |
| Stratified sampling | รักษาสัดส่วนคลาสในส่วนย่อยให้ใกล้กับข้อมูลรวม |
| Bootstrap | สุ่มแบบใส่กลับ จึงเลือก record เดิมซ้ำได้ |

ตัวอย่างหน้า 42 มี Yes 6 และ No 6 ตัว การแบ่ง **3-fold แบบ stratified** ทำได้โดยให้แต่ละ fold มี Yes 2 + No 2 เช่น folds `{1,2,3,4}`, `{6,9,5,7}`, `{10,11,8,12}` ตาม row numbers ของโจทย์ แล้วหมุนส่วนที่ใช้ประเมิน

`ระวัง` Fold ที่ใช้เปรียบเทียบ settings ทำหน้าที่ validation; final test ที่แยกไว้ต้องไม่ถูกนำมาเลือก hyperparameters ซ้ำ

## 08 Learning Curve

==Learning curve== แสดงว่า accuracy เปลี่ยนอย่างไรเมื่อขนาดตัวอย่างฝึกเพิ่มขึ้น (PDF หน้า 40) ใช้ sampling schedule เช่น arithmetic หรือ geometric เพื่อสร้างชุดขนาดต่าง ๆ ขนาดตัวอย่างเล็กอาจทำให้ทั้ง bias และ variance ของค่าประมาณสูง จึงต้องดูวิธีเก็บข้อมูลควบคู่กับคะแนน

## 09 ROC, threshold และ AUC

==ROC== แสดง trade-off ของ **TPR บนแกน Y** กับ **FPR บนแกน X** เมื่อเปลี่ยน threshold (PDF หน้า 44–48) ไม่ใช่จำนวน TP/FP ดิบ

![ROC แบบ schematic: จุดดีที่สุดคือ FPR 0, TPR 1 และเส้นทแยงเป็น random baseline](./assets/w07-classification-performance-metrics/w7-roc.svg)

- `(FPR, TPR) = (0,0)`: ทายทุกตัวเป็น negative
- `(1,1)`: ทายทุกตัวเป็น positive
- `(0,1)`: จุดอุดมคติ
- เส้นทแยง: random baseline
- ==AUC== = พื้นที่ใต้ ROC; อุดมคติ 1, random baseline 0.5

เมื่อ ROC สองเส้นตัดกัน อาจไม่มีโมเดลที่ชนะทุกช่วง FPR ต้องเลือกตาม operating region และต้นทุนจริง AUC ช่วยสรุปภาพรวมแต่ไม่เลือก threshold ให้แทนเรา

`ระวัง` หน้า 45 มีข้อความ `FN = 0.88` ซ้ำชื่อ FN; จากผลรวมของฝั่ง negative ค่านี้ควรเป็น TN ส่วน FN = 0.5 อยู่ฝั่ง positive

## 10 สิ่งที่ประกาศในคาบ

*(จาก transcript)* อาจารย์จะส่ง feedback โปรเจกต์ Phase 1 ผ่านตัวแทนกลุ่ม ให้นำไปปรับ Phase 2/3 โดยเฉพาะ references และความชัดเจนของระบบ ส่วนรูปแบบ final exam ในคาบนี้ยังอยู่ระหว่างหารือ: กล่าวถึงโน้ต A4, เครื่องคิดเลข และพจนานุกรมแบบเล่ม รายละเอียดที่อาจารย์ย้ำชัดขึ้นอยู่ใน W08 จึงควรยึดประกาศล่าสุดของรายวิชา

## อภิธานศัพท์ (Glossary)

| คำ | ความหมาย |
|---|---|
| Confusion matrix | ตารางเทียบคลาสจริงกับคลาสที่ทาย |
| Precision | TP/(TP+FP): สัดส่วนบวกจริงในสิ่งที่ทายบวก |
| Recall | TP/(TP+FN): สัดส่วนบวกจริงที่โมเดลจับได้ |
| Specificity | TN/(TN+FP): สัดส่วนลบจริงที่ปฏิเสธถูก |
| F1 | Harmonic mean ของ precision และ recall |
| Class imbalance | จำนวนตัวอย่างของแต่ละคลาสต่างกันมาก |
| Stratified sampling | แบ่งข้อมูลโดยรักษาสัดส่วนคลาส |
| Bootstrap | สุ่มข้อมูลแบบใส่กลับ |
| ROC | กราฟ TPR เทียบ FPR ที่ threshold ต่าง ๆ |
| AUC | พื้นที่ใต้ ROC สรุปคุณภาพการจัดอันดับ |
| Learning curve | กราฟ performance เทียบขนาดชุดฝึก |

## สรุปท้ายบท

| หัวข้อ | สิ่งที่ต้องจำ |
|---|---|
| Confusion Matrix | กำหนด positive; แยก actual/predicted แล้วนับ TP/TN/FP/FN |
| Metrics | ดูตัวหารและต้นทุนของความผิดพลาด |
| Accuracy | อาจหลอกตาเมื่อคลาสไม่สมดุล |
| Estimation | แบ่งข้อมูล, หมุน folds, รักษาสัดส่วนคลาส |
| ROC-AUC | TPR เทียบ FPR หลาย threshold; ยังต้องเลือก operating point |
