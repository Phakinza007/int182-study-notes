---
title: "พื้นฐาน AI, Rational Agents และ PEAS"
week: 8
type: lecture
date: 2026-10-02
tags: [data-science, ai]
---
> สรุปจาก `INT182_Lecture8_Intro-AI.pdf` (51 หน้า) ซึ่งดัดแปลงจาก Berkeley CS188 และ Duke COMPSCI 270 พร้อมบันทึกคาบ G2 ออนไลน์ 2 ต.ค. 2026 ภาพประกอบสรุปความสัมพันธ์จากสไลด์ ข้อมูลตัวอย่างข่าวและคลิปสะท้อนบริบทที่อาจารย์ยกในคาบ ไม่ใช่การตรวจสอบข่าวปัจจุบัน

## 01 AI ในวิชานี้หมายถึงอะไร

สไลด์ 5 ตั้งคำถามว่า AI คืออะไร มาได้อย่างไร และออกแบบระบบ AI อย่างไร ภาพยนตร์ทำให้เรานึกถึงหุ่นยนต์ทำได้ทุกอย่าง แต่ตัวอย่างระบบจริงมีขอบเขตเฉพาะ เช่น หุ่นยนต์เก็บผลผลิต โดรนตรวจสินค้าคงคลัง การรู้จำเสียง และการวางแผน (สไลด์ 6–14, 36–37)

แนวทางหลักของบทนี้คือ ==acting rationally==: ออกแบบการกระทำให้เหมาะกับเป้าหมายและข้อมูลที่มี การทำเหมือนมนุษย์กับการตัดสินใจที่เหมาะสมเป็นเกณฑ์คนละด้าน และ AI อาจเก่งบางงานโดยไม่ต้องเหมือนมนุษย์ทั้งหมด

## 02 ประวัติและรากฐาน

สไลด์ 16–18 เชื่อม AI กับ philosophy, mathematics, neuroscience, economics, control theory, psychology และ linguistics

| ช่วง | ภาพรวมตามสไลด์ |
|---|---|
| 1940–1950 | โมเดลวงจรของสมองและงาน Turing |
| 1956 | Dartmouth ใช้ชื่อ Artificial Intelligence |
| 1950–1970 | โปรแกรมเกมและการพิสูจน์ทฤษฎี |
| 1970–1990 | Knowledge-based / Expert Systems และ AI Winter |
| 1990–2012 | Statistical approaches, uncertainty, agents และ learning |
| 2012 เป็นต้นมา | Big data, compute และ deep learning |

*(จาก transcript)* อาจารย์ชี้ว่าความพร้อมของข้อมูล อัลกอริทึม และกำลังประมวลผลร่วมกันทำให้ระบบปัจจุบันเกิดขึ้นได้ ประวัติในสไลด์เป็นภาพรวม ไม่ใช่รายการเหตุการณ์ครบทุกครั้ง

## 03 Agent และ Rational Agent

==Agent== คือสิ่งที่รับรู้ environment ผ่าน **sensors** และกระทำต่อ environment ผ่าน **actuators** (สไลด์ 19–20)

![วงจร Environment ส่ง percepts ผ่าน sensors ให้ Agent เลือกการกระทำผ่าน actuators](./assets/w08-introduction-to-ai-and-agents/w8-agent-loop.svg)

Agent function จับคู่ **ลำดับ percepts → action** และทำงานจริงด้วย agent program บนเครื่อง ส่วน ==rational agent== เลือก action ที่เพิ่ม expected utility ให้มากที่สุดตามข้อมูลที่มี Rationality จึงต้องพิจารณาเป้าหมาย ความไม่แน่นอน และข้อจำกัดของ environment ร่วมกัน

## 04 PEAS: ระบุงานให้ชัดก่อนออกแบบ

==PEAS== ประกอบด้วย Performance measure, Environment, Actuators และ Sensors (สไลด์ 22–24)

![PEAS ของ automated taxi: เกณฑ์ผลงาน สภาพแวดล้อม อุปกรณ์กระทำ และเซนเซอร์](./assets/w08-introduction-to-ai-and-agents/w8-peas.svg)

| ตัวอย่าง | P | E | A | S |
|---|---|---|---|---|
| Pacman | −1/step, +10 food, +500 win, −500 die, +200 scared ghost | เกมและพฤติกรรม ghost | ซ้าย ขวา ขึ้น ลง | เห็น state เกือบทั้งหมด ยกเว้นเวลาคงเหลือ power pellet |
| ระบบช่วยวินิจฉัย | สุขภาพผู้ป่วย ต้นทุน ชื่อเสียง | ผู้ป่วย บุคลากร ผู้ประกัน ศาล | หน้าจอ อีเมล | Keyboard/mouse ตามแบบจำลองในสไลด์ |

Sensors ของ agent ไม่จำเป็นต้องเป็นกล้องจริง และ actuators ไม่จำเป็นต้องเป็นแขนหุ่นยนต์ ข้อมูลเข้าและผลลัพธ์ดิจิทัลก็ทำหน้าที่นี้ได้

## 05 ชนิดของ Environment เปลี่ยนการออกแบบ

สไลด์ 25–26 ให้ใช้คุณสมบัติของ environment เลือกเทคนิค:

| คุณสมบัติ | ผลต่อ agent |
|---|---|
| Fully / partially observable | ถ้าเห็นไม่ครบ ต้องมี memory หรือ internal state |
| Single / multi-agent | ต้องคำนึงถึงพฤติกรรมของ agent อื่น; บางบริบทอาจต้องสุ่ม action |
| Deterministic / stochastic | ถ้าไม่แน่นอน ต้องเตรียมผลลัพธ์ที่เป็นไปได้ |
| Static / dynamic | Static มีเวลาคิด; dynamic อาจเปลี่ยนระหว่างคำนวณ |
| Discrete / continuous | เวลาและการควบคุมต่อเนื่องอาจต้องมี controller ที่ทำงานต่อเนื่อง |
| Known / unknown physics | ไม่รู้ transition dynamics ต้องสำรวจ/เรียนรู้ |
| Known / unknown performance measure | หากเป้าหมายยังไม่ชัด ต้องสังเกตหรือโต้ตอบกับผู้กำหนดเป้าหมาย |

*(จาก transcript)* รถอัตโนมัติมีผู้ขับอื่น สภาพอากาศ และการจราจรที่เปลี่ยนไป จึงซับซ้อนกว่าการออกคำสั่งคงที่ในโลกที่กำหนดแน่นอน

## 06 Reflex, state และ goal-based agents

| Agent | ใช้อะไรเลือก action | ข้อจำกัด/ความสามารถ |
|---|---|---|
| Simple reflex | Percept ปัจจุบัน + condition-action rules | ไม่เก็บสิ่งที่มองไม่เห็นในปัจจุบัน |
| Reflex with state | Internal state + วิธีที่โลกเปลี่ยน + ผลของ action | รักษาข้อมูลจากอดีตช่วยเมื่อเห็นโลกไม่ครบ |
| Goal-based | State/model + goals + ผลที่คาดจาก action | คิดว่า action ใดพาเข้าใกล้เป้าหมาย |

ตัวอย่างจากสไลด์ 28:

```python
class GoWestAgent(Agent):
    def getAction(self, percept):
        if Directions.WEST in percept.getLegalPacmanActions():
            return Directions.WEST
        else:
            return Directions.STOP
```

กฎนี้ไปตะวันตกเมื่อทำได้ ไม่ได้พิจารณาอาหารหรือ ghost การทำ lookup table ครอบทุกสถานการณ์ก็อาจใหญ่เกินใช้จริง และ Pacman ยังมีข้อมูลที่เห็นไม่ครบ เช่นระยะเวลาของ power pellet (สไลด์ 27–33)

## 07 นิยาม AI สี่มุมมอง

สไลด์ 38 แบ่งเป็นสองแกน: คิด/กระทำ และเหมือนมนุษย์/มีเหตุผล

| | เหมือนมนุษย์ | มีเหตุผล |
|---|---|---|
| คิด | Think like humans | Think rationally |
| กระทำ | Act like humans | Act rationally |

**Turing Test** มุ่งพฤติกรรมที่ทำให้ผู้ตัดสินแยกจากมนุษย์ได้ยาก ส่วน **Chinese room** ตั้งคำถามว่าการทำตามกฎสัญลักษณ์จนตอบได้ถูกหมายถึงเข้าใจจริงหรือไม่ ตัวอย่าง ELIZA แสดงว่าการเลียนแบบบทสนทนาบางแบบทำให้ผู้ใช้รู้สึกกำลังคุยกับคนได้ (สไลด์ 39–42) บทนี้จึงเน้นประเมิน action ตามงาน มากกว่าตัดสินเรื่อง consciousness

## 08 Traditional AI และส่วนที่เกี่ยวข้อง

AI มีทั้งการใช้สัญลักษณ์/กฎและการเรียนรู้จากข้อมูล หัวข้อที่สไลด์ 45–47 ยกมา ได้แก่:

- Search: หาเส้นทางแก้ปัญหา เช่น Rubik’s cube
- Constraint satisfaction / optimization: จัดตารางประชุมตามข้อจำกัด
- Game playing: chess หรือ poker
- Logic / knowledge representation: แทนข้อเท็จจริงและอนุมาน
- Planning: วางลำดับเพื่อไปถึงเป้าหมาย
- Probability / decision theory: ตัดสินใจเมื่อไม่แน่นอน

หัวข้อทับซ้อนกันได้ *(จาก transcript)* อาจารย์เปรียบ knowledge-based rules กับการใช้ข้อมูลฝึกโมเดล ซึ่งไม่ได้ทำให้ทุกระบบ AI ต้องเป็น machine learning

## 09 ความสามารถและข้อจำกัด

สไลด์ 35, 43–44 ยกเกมและงานที่กำหนดชัดเป็นตัวอย่างความสำเร็จ ขณะที่งานโลกจริงที่ยุ่งเหยิง กำกวม หรืออาศัย common sense ยังยาก การอธิบายเหตุผล การปรับวิธีเมื่อสถานการณ์เปลี่ยน และการโยงความรู้ข้ามบริบทเป็นจุดที่สไลด์ชวนเปรียบเทียบกับมนุษย์

*(จาก transcript)* ตัวอย่างข่าว ภาพสร้างด้วย AI และการนำระบบไปใช้ ชวนให้ดูทั้งศักยภาพและความน่าเชื่อถือ โดยควรแยกสิ่งที่ระบบแสดงออกจากความสามารถที่ทดสอบได้จริง

## 10 Progress ของโปรเจกต์ Phase 2

*(จาก transcript)* Progress ต้องแสดงสิ่งที่เพิ่มจาก Phase 1 และเข้าใกล้วัตถุประสงค์จริง ไม่ใช่เพียงเพิ่มสไลด์:

| มิติ | หลักฐานที่ควรแสดง |
|---|---|
| Algorithms | เลือกวิธีชัดขึ้นและอธิบายเหตุผล |
| Data | แหล่งข้อมูล จำนวนแต่ละคลาส และตัวอย่างที่จับต้องได้ |
| Software | โมดูลหรือโค้ดที่เริ่มทำ พร้อมภาพโครงสร้างถ้ามี |
| References | แหล่ง technical, domain knowledge และระบบใกล้เคียง |
| Pipeline | ขั้นตอนตั้งแต่ input จนถึง output และความคืบหน้าแต่ละขั้น |
| Evaluation | การแบ่ง train/test และหลักฐานว่า performance น่าเชื่อถือ |

ตัวเลขตัวอย่าง rock-paper-scissors 80/75/80 รูป หรือ spam/non-spam หลายร้อยข้อความ เป็นตัวอย่างอธิบาย readiness ไม่ใช่จำนวนขั้นต่ำที่สั่งทุกทีม คาบนี้ระบุช่วงนำเสนอใน exam block 19–26 ต.ค.; วันที่เจาะจงที่กล่าวภายหลังอยู่ใน W09

## 11 ประกาศ Final Exam

*(จาก transcript ช่วงต้นและท้ายคาบ)* อาจารย์ระบุให้นำโน้ต **A4 หนึ่งแผ่น เขียนหรือพิมพ์ได้สองหน้า**, เครื่องคิดเลข และ English dictionary แบบเล่มเข้าห้องสอบได้ **ห้ามยืมหรือแชร์โน้ตกันในห้องสอบ** และอาจารย์จะเก็บโน้ตหลังสอบ

นี่คือข้อมูลจากบันทึกคาบ 2 ต.ค. ซึ่งชัดกว่าความคาดหมายใน W07; วันเวลาและประกาศสอบทางการต้องดูจากรายวิชา

## อภิธานศัพท์ (Glossary)

| คำ | ความหมาย |
|---|---|
| Agent | สิ่งที่รับรู้ environment และกระทำต่อ environment |
| Rational agent | agent ที่เลือก action เพื่อเพิ่ม expected utility |
| Percept | ข้อมูลที่ agent รับรู้ผ่าน sensors |
| Actuator | ช่องทางที่ agent ใช้กระทำต่อโลก |
| PEAS | Performance, Environment, Actuators, Sensors |
| Partially observable | มองเห็นข้อมูล state ของโลกไม่ครบ |
| Stochastic | ผลของการกระทำมีความไม่แน่นอน |
| Simple reflex agent | ใช้ percept ปัจจุบันกับ condition-action rules |
| Internal state | ข้อมูลภายในที่ช่วยแทนสิ่งที่มองไม่เห็นตอนนี้ |
| Goal-based agent | เลือกการกระทำโดยพิจารณาเป้าหมาย |

## สรุปท้ายบท

| หัวข้อ | ประเด็นสำคัญ |
|---|---|
| AI | มีหลายวิธี; บทนี้เน้น acting rationally |
| Agent loop | Sensors → เลือก action → Actuators → Environment |
| PEAS | ระบุเกณฑ์ผลงาน โลก การกระทำ และข้อมูลรับเข้า |
| Environment | ความไม่แน่นอน/การมองเห็น/เวลาเปลี่ยนการออกแบบ |
| Agent design | Reflex → มี state → ใช้ goals |
| Phase 2 | แสดง data, algorithms, software, references, pipeline และ evaluation |
