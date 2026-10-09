---
title: "พื้นฐาน Machine Learning, k-NN และ AI Search"
week: 9
type: lecture
date: 2026-10-07
tags: [data-science, ai]
---
> สรุปจาก `INT182_Lecture9_IntroML_UnivToronto.pdf` (49 หน้า; อ้างหมายเลขสไลด์เดิม 1–55 ที่พิมพ์บนหน้า) และบันทึกคาบ **G1 วันที่ 7 ต.ค. 2026** บันทึกนี้มีช่วงโปรเจกต์และ AI Search ก่อนเริ่ม ML; ส่วนท้าย ASR เพี้ยนมาก จึงใช้สไลด์เป็นหลักสำหรับรายละเอียด k-NN สรุปครอบคลุมชุดสไลด์ที่ได้รับ แต่ไม่ได้ยืนยันว่าอาจารย์สอนครบทุกหน้าภายในคาบนี้ ส่วนที่มีเฉพาะในเสียงระบุที่มาไว้

## 01 Project Phase 2: สิ่งที่ต้องแสดง

*(จาก transcript)* ให้แสดง pipeline ที่ส่งมอบผลลัพธ์ได้ และความคืบหน้าจาก Phase 1: แหล่งข้อมูล/จำนวน/ผู้ทำ labels, โมเดลที่เลือก, โค้ดหรือโมดูลที่ทำแล้ว, test plan และ references ตัวอย่างข้อมูลภาพควรโชว์ภาพจริง; งานข้อความควรอธิบายเกณฑ์ label

ใช้ pretrained model หรือ API ได้เมื่อเหมาะกับขอบเขต แต่ต้องบอก **ชื่อโมเดล เวอร์ชัน และรูปแบบ prompt** ที่ใช้ รวมถึง architecture ว่าประมวลผลส่วนใดบน frontend/cloud และอธิบายเหตุผลเลือกวิธี

| ประกาศในคาบ G1 | รายละเอียด |
|---|---|
| ส่งไฟล์พรีเซนต์ | 21 ต.ค. 2026; transcript ไม่ระบุเวลาปิดรับที่ชัดเจน |
| นำเสนอ | 22 ต.ค. 2026 เวลา 13:00–18:00; ห้องประกาศภายหลัง |
| เวลาแต่ละทีม | นำเสนอประมาณ 8 นาที + ถามตอบ 2–3 นาที |
| ลำดับ | อาจารย์จะสุ่มและประกาศช่วงเย็น 20 ต.ค. |
| เวอร์ชัน | ใช้ไฟล์ที่ส่งวันที่ 21 ต.ค. เป็นฉบับนำเสนอ |

`ระวัง` แหล่งเสียงนี้เป็น G1 วันที่/เวลาข้างต้นต้องเทียบประกาศ Teams/LEB2 และเงื่อนไขของ G2 ก่อนใช้เป็นกำหนดของตนเอง

## 02 AI Search: แทนปัญหาเป็น states และ actions

*(จาก transcript ช่วงประมาณ 1:45–2:20; ไม่ได้อยู่ใน PDF ML)* ตัวอย่าง sliding 15-puzzle และเส้นทางเดินทางใช้ส่วนประกอบ:

| ส่วน | ความหมาย |
|---|---|
| State | การจัดวาง/สภาพปัจจุบันของปัญหา |
| Initial state | จุดที่เริ่มหา solution |
| Actions | สิ่งที่ทำได้จาก state นี้ เช่น เลื่อน tile |
| Transition model | `result(s, a)` ให้ state หลังทำ action a ใน s |
| Goal test | ตรวจว่า state ตรงเงื่อนไขเป้าหมายหรือยัง |
| Path cost | ต้นทุนรวมของลำดับ actions |

![Search แทน current state, action, transition และตรวจ goal พร้อม path cost](./assets/w09-introduction-to-ml-and-nearest-neighbors/w9-search.svg)

Solution เป็น **ลำดับ actions** จาก initial state ถึง goal; หากมีหลาย solution อาจต้องการ path cost ต่ำสุด บันทึกพูดถึง breadth-first, depth-first และ heuristic ด้วย แต่ช่วงอธิบายบางส่วนถอดเสียงคลาดเคลื่อน จึงไม่เติม pseudocode หรือข้อรับประกันที่ตรวจจากไฟล์นี้ไม่ได้

## 03 Machine Learning คืออะไร

สไลด์ 11–15 อธิบายการเรียนรู้ผ่านสามองค์ประกอบ: ==Task (T)==, ==Experience (E)== และ ==Performance measure (P)== โปรแกรมเรียนรู้เมื่อผลงานใน T ที่วัดด้วย P ดีขึ้นจาก E

ตัวอย่างบริบทในสไลด์คือ recognition และ speech ซึ่งเขียนกฎให้ครอบทุกกรณีได้ยาก ML จึงให้ algorithm เรียนรู้พฤติกรรมจากข้อมูล/ประสบการณ์ ใช้เมื่อระบบต้องปรับตัวกับการเปลี่ยนแปลงหรือเมื่อ pattern ซับซ้อน

AI ครอบคลุม symbolic reasoning, rule-based systems และ tree search ด้วย จึงไม่ใช่ทุก AI ที่ต้องเรียนรู้ ML มีส่วนทับซ้อนกับ statistics แต่สไลด์เน้นมุม predictive performance, scalability และ autonomy

## 04 ประเภทการเรียนรู้และการประยุกต์

| ประเภท | สัญญาณที่ใช้เรียนรู้ | ผลที่มุ่งหา |
|---|---|---|
| Supervised | ตัวอย่างที่มี labels | ทำนายคำตอบของ input ใหม่ |
| Unsupervised | ข้อมูลที่ไม่มี labels | หา pattern/โครงสร้างที่น่าสนใจ |
| Reinforcement | Agent โต้ตอบกับโลกและรับ reward | เลือกพฤติกรรมให้ reward สูง |

สไลด์ 16–23 ยก computer vision, speech-to-text, NLP, games และ recommender systems เป็นตัวอย่าง พร้อมภาพรวมจาก perceptron ไปสู่ probabilistic methods และ deep learning งานหนึ่งอาจใช้หลายแนวทางร่วมกัน ไม่จำเป็นต้องแบ่งตามชนิดข้อมูลอย่างเดียว

## 05 ML Workflow

![ML workflow ตั้งแต่ตั้งโจทย์ เตรียมข้อมูล baseline เลือกโมเดล optimize และวิเคราะห์ข้อผิดพลาด](./assets/w09-introduction-to-ml-and-nearest-neighbors/w9-workflow.svg)

สไลด์ 26 เรียงขั้นตอน: ตรวจว่าต้องใช้ ML หรือไม่ → เก็บ/จัดข้อมูล → สร้าง ==baseline== → เลือก model/loss/regularization → optimize → ค้น hyperparameters → วิเคราะห์ performance และความผิดพลาด แล้ววนกลับไปปรับโมเดลหรือข้อมูล

สไลด์ 24 แนะนำว่าควรลองวิธีพื้นฐาน เช่น Logistic Regression ก่อนกระโดดไป neural network ที่ซับซ้อน ส่วน 27–28 ชี้ว่า NumPy/vectorization และ frameworks ช่วยคำนวณได้ แต่การ debug ยังต้องเข้าใจ algorithm และคณิตศาสตร์ภายใน

## 06 Input vectors และ targets

Represent input เป็นเวกเตอร์ `x ∈ R^d` เพื่อใช้ linear algebra ได้ ข้อมูลภาพอาจใช้ raw pixels หรือ meaningful features (สไลด์ 30–34)

Training set เขียนเป็น `{(x^(1), t^(1)), ..., (x^(N), t^(N))}` โดย superscript เป็น **index ของตัวอย่าง ไม่ใช่ยกกำลัง**

- Regression: t เป็นจำนวนจริง
- Classification: t อยู่ในเซตคลาส `{1, ..., C}`
- งานอื่น t อาจมีโครงสร้าง เช่น caption หรือภาพ

Representation ที่ดีต้องทำให้สิ่งที่ใกล้กันใน feature space มีความหมายต่อโจทย์ มิฉะนั้นการหา nearest neighbors ก็อาจใกล้ในเชิงตัวเลขแต่ไม่เหมือนในสิ่งที่ต้องการ

## 07 1-Nearest Neighbor

สำหรับ input ใหม่ x ให้หา training example ที่ใกล้ที่สุดแล้วคัดลอก label ของมัน (สไลด์ 35–39)

`x* = argmin distance(x^(i), x)` และ `prediction = t*`

Euclidean distance คือ `sqrt(sum_j((x_j - z_j)^2))` เมื่อต้องการเพียงจัดอันดับระยะ ไม่จำเป็นต้องถอดราก เพราะรากที่สองรักษาลำดับของจำนวนไม่ติดลบ

Decision boundary คือเส้นแบ่งบริเวณที่ทายเป็นคนละคลาส; 1-NN มองได้เป็น Voronoi regions แต่ไวต่อ noise และ labels ที่ผิด

## 08 k-NN และ majority vote

แก้ความไวของ 1-NN โดยเลือก **k ตัวอย่างใกล้ที่สุด** แล้วให้โหวต label (สไลด์ 39–41)

![ตัวอย่าง schematic: k 3 ได้เสียงแดงสองน้ำเงินหนึ่ง ส่วน k 5 ได้น้ำเงินสามแดงสอง](./assets/w09-introduction-to-ml-and-nearest-neighbors/w9-knn.svg)

ภาพเป็นตัวอย่างวาดใหม่เพื่ออธิบายหลักการ ไม่ใช่ผลโมเดลที่วัดจริง เมื่อ k = 3 มีแดง 2/น้ำเงิน 1 จึงทายแดง แต่ k = 5 มีน้ำเงิน 3/แดง 2 จึงทายน้ำเงิน การเปลี่ยน k ทำให้ผลและความเรียบของ boundary เปลี่ยนได้

## 09 เลือก k ด้วย Validation

| k | พฤติกรรม | ความเสี่ยง |
|---|---|---|
| เล็ก | จับรายละเอียดเล็ก ๆ ได้ | Overfit / ไวต่อ noise |
| ใหญ่ | เฉลี่ยหลายตัวอย่างและเสถียรขึ้น | Underfit / ข้าม pattern สำคัญ |

สไลด์ 42 ให้ rule of thumb `k < sqrt(N)` แต่ค่าที่เหมาะขึ้นกับข้อมูล ให้เลือกด้วย ==validation set== (สไลด์ 44) แล้วใช้ **test set ครั้งสุดท้ายหลังเลือก configuration** เพื่อวัด generalization อย่าเลือก k จากคะแนน test ซ้ำ ๆ

## 10 Curse of Dimensionality

ในมิติสูง จุดข้อมูลส่วนใหญ่ห่างกันและระยะอาจใกล้เคียงกัน การมีเพื่อนบ้าน “ใกล้จริง” ต้องใช้ข้อมูลมากขึ้นอย่างรวดเร็ว สไลด์ 45–47 ให้ภาพจำนวนบริเวณที่ใช้ครอบพื้นที่เพิ่มในระดับ `(1/ε)^d`

อย่างไรก็ดีข้อมูลอาจมี ==intrinsic dimension== ต่ำกว่าจำนวน features ที่เก็บ เช่น ภาพล้านพิกเซลอาจอยู่ใกล้ manifold ที่มีอิสระจริงน้อยกว่านั้น Neighborhood structure จึงสัมพันธ์กับ intrinsic dimension ด้วย

## 11 Feature scaling

Nearest neighbors ไวต่อ ranges ของ features เช่น feature หน่วยใหญ่ครอบงำระยะ สไลด์ 48 ใช้ zero mean และ unit variance:

`x_tilde_j = (x_j - μ_j) / σ_j`

นี่คือการทำ ==standardization== แม้หัวข้อสไลด์ใช้ชื่อ Normalization และแตกต่างจาก min–max scaling เป็น 0–1 ใน W05 สไลด์เตือนด้วยว่า scale อาจมีความหมายในบางโจทย์ จึงต้องพิจารณาความหมายของ feature ก่อนปรับ

## 12 ค่าใช้จ่ายในการคำนวณและตัวอย่าง

สไลด์ 49 อธิบาย naive k-NN ที่มี N examples และ D features:

- ช่วง “training” ไม่มี optimization เพื่อ fit โมเดล แต่ต้องเก็บ dataset
- คำนวณระยะต่อ query: `O(ND)`
- หากเรียงระยะทั้งหมด: `O(N log N)`
- ต้องทำซ้ำทุก query และเก็บข้อมูลฝึกในหน่วยความจำ

สไลด์ 50–53 ยก digit recognition และ Tiny Images เพื่อแสดงผลของข้อมูลมากกับ similarity measure ที่ดี ตัวเลข error 0.63% เทียบ 3% เป็นผลจากงานอ้างอิง shape contexts ในสไลด์ ไม่ใช่ผลทดลองของโปรเจกต์นี้

ข้อสรุปของชุดสไลด์: k-NN เรียบง่ายและคุมความซับซ้อนด้วย k ได้ แต่ติดมิติสูงและต้นทุนตอน query; เนื้อหาถัดไปในต้นฉบับคือ parametric models ที่เรียนรู้ตัวแทนข้อมูลขนาดกะทัดรัด

## อภิธานศัพท์ (Glossary)

| คำ | ความหมาย |
|---|---|
| Task (T) | งานที่ต้องการให้ระบบทำ |
| Experience (E) | ข้อมูลหรือประสบการณ์ที่ทำให้เรียนรู้ |
| Performance measure (P) | เกณฑ์วัดว่าระบบทำงานดีขึ้นหรือไม่ |
| Baseline | วิธีอ้างอิงเริ่มต้นสำหรับเปรียบเทียบ |
| Input vector | ตัวแทน input ด้วย features d มิติ |
| Decision boundary | ขอบเขตระหว่างบริเวณที่ทายคนละคลาส |
| k-NN | เลือก k เพื่อนบ้านใกล้ที่สุดแล้วรวมคำตอบ |
| Intrinsic dimension | จำนวนมิติอิสระจริงของโครงสร้างข้อมูล |
| Standardization | ปรับ features ด้วย (x−mean)/standard deviation |
| Transition model | กฎให้ state ถัดไปจาก state และ action |
| Path cost | ต้นทุนรวมของลำดับ actions ใน solution |

## สรุปท้ายบท

| หัวข้อ | ประเด็นสำคัญ |
|---|---|
| ML | ผลงานใน T วัดด้วย P ดีขึ้นจาก E |
| Search | แทน state/actions/transition/goal/cost จากช่วง transcript |
| k-NN | Represent → distance → k neighbors → vote |
| เลือก k | ใช้ validation; final test ใช้หลังเลือกเสร็จ |
| Pitfalls | Noise, มิติสูง, scale และต้นทุน query |
| Phase 2 | บันทึก G1 กล่าวถึงส่ง 21 ต.ค./นำเสนอ 22 ต.ค.; ตรวจประกาศของกลุ่ม |
