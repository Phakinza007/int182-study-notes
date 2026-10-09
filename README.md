# INT182 Study Notes

เว็บสรุป INT182 Data Science & AI แยกสำหรับ GitHub Pages เปิดอ่านได้โดยไม่ต้องเข้าสู่ระบบ

**เว็บไซต์:** https://phakinza007.github.io/int182-study-notes/

- สรุป Week 1–9 จำนวน 18 หน้า ไทย/อังกฤษ
- ไดอะแกรมสรุปใหม่ 10 ภาพ พร้อมรูปประกอบจากโน้ตเดิม
- ค้นหาทั้งเนื้อหา, ขยายภาพ, พิมพ์รายบท, ทำเครื่องหมายอ่านแล้วในเบราว์เซอร์
- ไม่มีระบบบัญชีหรือฐานข้อมูล

## แก้ไขและ build

```sh
npm ci
npm run build
npm run check
```

แก้ Markdown ใน `content/` และภาพใน `content/assets/`; build จะสร้างไฟล์ static ลง `docs/` ใช้ลิงก์แบบ relative จึงรองรับ subpath ของ GitHub Pages

GitHub Pages เผยแพร่จาก `main` → `/docs` เมื่อ push ให้ commit ผลลัพธ์ `docs/` หลัง build ด้วย

ต้นฉบับโน้ตนำมาจาก vault `INT182-DataScienceAI/week1`–`week9` เมื่อ 9 ต.ค. 2026 โดยสำเนานี้แก้ไขและ build ได้เอง ไม่ต้องพึ่งแอป `knowledge-web` เอกสาร PDF/DOCX และบันทึกเสียงไม่ได้รวมใน repository นี้

Week 9 อ้างอิงคาบ G1 7 ต.ค. 2026; กำหนดส่งและนำเสนอของ G2 ต้องเทียบประกาศของกลุ่ม โดยมีหมายเหตุแสดงในบทเรียน

Font: IBM Plex Sans Thai (SIL Open Font License), ดู `public/fonts/LICENSE` ภาพจากสไลด์เดิมระบุที่มาในคำบรรยาย/เนื้อหา ส่วนไดอะแกรมสรุปใหม่อ้างอิงแนวคิดจากเอกสารที่ได้รับ ไม่ใช่เว็บไซต์ทางการของรายวิชา
