import { visit } from "unist-util-visit";

// ==ข้อความ== โดยข้อความต้องไม่ว่างและไม่มี = ปนอยู่
const CLOZE = /==([^=]+)==/g;

function clozeNode(children) {
  return {
    type: "cloze",
    data: { hName: "mark", hProperties: { className: ["cloze"] } },
    children,
  };
}

/**
 * จับคู่ == ที่เปิดใน text node หนึ่งแล้วไปปิดอีก text node หนึ่ง
 * โดยมี node อื่น (ส่วนใหญ่คือ inlineCode) คั่นกลาง เช่น
 *
 *     ย้ำเรื่อง ==`getMonth()` คืน 0–11== อีกรอบ
 *
 * remark แตกบรรทัดนี้เป็น text("ย้ำเรื่อง ==") + inlineCode + text(" คืน 0–11== อีกรอบ")
 * ทั้งสอง text node จึงไม่มี == ครบคู่ในตัวเอง รอบแรกเลยจับไม่ได้
 * และ == จะค้างเป็นข้อความให้ผู้อ่านเห็น
 *
 * ทำหลังรอบแรกเสมอ — == ที่เหลืออยู่ ณ จุดนี้คือตัวที่ยังไม่มีคู่ในโหนดตัวเอง
 * ส่วน == ที่อยู่ใน inline code ไม่ถูกนับ เพราะ inlineCode เก็บค่าไว้ใน value
 * ของตัวเอง ไม่ใช่ text node
 */
function pairAcrossNodes(parent) {
  const kids = parent.children;

  for (let i = 0; i < kids.length; i++) {
    const opener = kids[i];
    if (opener.type !== "text") continue;
    const open = opener.value.indexOf("==");
    if (open === -1) continue;

    let closerAt = -1;
    let close = -1;
    for (let k = i + 1; k < kids.length; k++) {
      if (kids[k].type !== "text") continue;
      const found = kids[k].value.indexOf("==");
      if (found !== -1) {
        closerAt = k;
        close = found;
        break;
      }
    }
    if (closerAt === -1) return;

    const head = opener.value.slice(0, open);
    const openTail = opener.value.slice(open + 2);
    const closeHead = kids[closerAt].value.slice(0, close);
    const closeTail = kids[closerAt].value.slice(close + 2);

    const inner = [];
    if (openTail) inner.push({ type: "text", value: openTail });
    inner.push(...kids.slice(i + 1, closerAt));
    if (closeHead) inner.push({ type: "text", value: closeHead });
    // ไฮไลต์ว่าง (==== หรือ == ==) ปล่อยไว้เหมือนเดิม
    if (inner.length === 0) return;

    const parts = [];
    if (head) parts.push({ type: "text", value: head });
    parts.push(clozeNode(inner));
    if (closeTail) parts.push({ type: "text", value: closeTail });

    kids.splice(i, closerAt - i + 1, ...parts);
    i += parts.length - 1;
  }
}

/**
 * remark-gfm ไม่รองรับไฮไลต์แบบ ==x== (ทดสอบแล้วได้ข้อความดิบออกมา)
 * ปลั๊กอินนี้แปลงเป็น <mark class="cloze"> เพื่อให้เห็นคำสำคัญตอนอ่าน
 * และเป็นแหล่งข้อสอบเติมคำ — การสกัดข้อสอบอยู่ที่ src/lib/quiz-items.ts
 * ซึ่งอ่าน markdown ดิบเอง ไม่ได้พึ่งปลั๊กอินนี้
 *
 * visit "text" จึงไม่แตะ inlineCode/code เพราะสองอย่างนั้นเก็บค่าใน value
 * ของ node ตัวเอง ไม่ใช่ text node ลูก
 */
export default function remarkCloze() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      if (!parent || typeof index !== "number") return;
      if (!node.value.includes("==")) return;

      const parts = [];
      let last = 0;
      CLOZE.lastIndex = 0;
      let match;

      while ((match = CLOZE.exec(node.value)) !== null) {
        if (match.index > last) {
          parts.push({
            type: "text",
            value: node.value.slice(last, match.index),
          });
        }
        parts.push(clozeNode([{ type: "text", value: match[1] }]));
        last = match.index + match[0].length;
      }

      if (parts.length === 0) return;
      if (last < node.value.length) {
        parts.push({ type: "text", value: node.value.slice(last) });
      }

      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });

    visit(tree, (node) => {
      if (Array.isArray(node.children)) pairAcrossNodes(node);
    });
  };
}
