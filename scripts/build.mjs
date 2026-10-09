import { readdir, readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, {defaultSchema} from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';
import { parse } from 'yaml';
import remarkCloze from './remark-cloze.mjs';

const out = path.resolve('docs');
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const node = (tagName, properties, children = []) => ({type:'element', tagName, properties, children});
const text = value => ({type:'text', value});
const notes = [];
for (const file of (await readdir('content')).filter(f => /^w\d+.*\.md$/.test(f)).sort()) {
  const raw = await readFile(`content/${file}`, 'utf8');
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) throw new Error(`Missing metadata: ${file}`);
  const meta = parse(fm[1]);
  notes.push({file, slug:file.slice(0,-3), week:meta.week, title:meta.title, date:meta.date, lang:file.endsWith('.en.md')?'en':'th', markdown:raw.slice(fm[0].length)});
}
if (notes.length !== 18) throw new Error(`Expected 18 Thai/English notes, got ${notes.length}`);
const find = (week,lang) => notes.find(n => n.week === week && n.lang === lang);
const href = n => `notes/${n.slug}.html`;
const t = (lang,th,en) => lang === 'en' ? en : th;
const gallery = [];
const search = [];

function decorate(note) {
  return () => tree => {
    visit(tree, 'element', (el,index,parent) => {
      if (el.tagName === 'h2') note.headings.push({id:el.properties.id, title:toString(el)});
      if (el.tagName === 'img') {
        const src = String(el.properties.src);
        if (!src.startsWith('./assets/')) throw new Error(`Unexpected image URL: ${src}`);
        el.properties.src = `../${src.slice(2)}`;
        el.properties.loading = 'lazy';
        el.properties.decoding = 'async';
      }
      if (el.tagName === 'a' && !String(el.properties.href).startsWith('../assets/')) {
        const url = String(el.properties.href ?? '');
        if (url && !/^(https?:|mailto:|#)/.test(url)) {
          const targetWeek = Number(url.match(/[wW](?:eek)?0?(\d+)/)?.[1]);
          const target = find(targetWeek,note.lang);
          if (target) el.properties.href = `${target.slug}.html`;
          else { el.tagName = 'span'; el.properties = {}; }
        }
      }
      if (el.tagName === 'p' && el.children.length === 1 && el.children[0].tagName === 'img') {
        const img = el.children[0];
        const caption = String(img.properties.alt || '');
        const asset = String(img.properties.src).replace(/^\.\.?\//,'');
        el.tagName = 'figure';
        el.properties = {className:['figure']};
        el.children = [node('a',{href:`../${asset}`, target:'_blank', rel:'noopener', className:['diagram-link'], 'aria-label':t(note.lang,`ขยายภาพ: ${caption}`,`Enlarge image: ${caption}`)},[img]), node('figcaption',{},[text(caption),node('a',{href:`../${asset}`,target:'_blank',rel:'noopener',className:['diagram-link','figure-open']},[text(t(note.lang,'ขยายภาพ ↗','Enlarge ↗'))])])];
        if (note.lang === 'th' && img.properties.src.endsWith('.svg')) gallery.push({src:asset,caption,week:note.week,link:href(note)});
      }
      if (el.tagName === 'table' && parent?.tagName !== 'div') {
        parent.children[index] = node('div',{className:['table-scroll'],tabIndex:0,role:'region','aria-label':t(note.lang,'ตาราง เลื่อนแนวนอนได้','Table, scroll horizontally')},[el]);
        return index + 1;
      }
    });
    note.plain = toString(tree);
  };
}

function shell({lang,title,base='./',toggle,body,page='home'}) {
  const en = lang === 'en';
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${esc(t(lang,'สรุป INT182 Data Science และ AI สัปดาห์ 1–9 พร้อมไดอะแกรมและสูตรสำคัญ','INT182 Data Science and AI notes for weeks 1–9, with diagrams and key formulas'))}"><meta name="theme-color" content="#f7f6f3"><title>${esc(title)} · INT182</title><link rel="icon" href="${base}favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${base}style.css"><script src="${base}app.js" defer></script></head>
<body data-base="${base}" data-page="${page}"><a class="skip" href="#main">${t(lang,'ข้ามไปเนื้อหา','Skip to content')}</a>
<header class="topbar"><div class="topbar-inner"><a class="brand" href="${base}${en?'en.html':'index.html'}"><span class="brand-mark">182</span><span>INT182 <small>Study notes</small></span></a><nav aria-label="${t(lang,'เมนูหลัก','Main menu')}"><button class="search-trigger" data-search-open aria-haspopup="dialog">${t(lang,'ค้นหาเนื้อหา','Search notes')} <kbd>/</kbd></button><a class="lang" href="${toggle}" lang="${en?'th':'en'}">${en?'ภาษาไทย':'English'}</a></nav></div></header>
${body}
<footer class="site-footer"><span>INT182 · Data Science & AI<br>${t(lang,'สรุปเพื่อทบทวนจากเอกสารประกอบการเรียน','Study summaries based on course materials')}</span><a href="https://github.com/Phakinza007/int182-study-notes">GitHub ↗</a></footer>
<dialog id="search-dialog" aria-labelledby="search-title"><div class="dialog-heading"><h2 id="search-title">${t(lang,'ค้นหาในสรุป','Search the notes')}</h2><button data-close-dialog aria-label="${t(lang,'ปิดการค้นหา','Close search')}">×</button></div><label for="search-input">${t(lang,'คำค้น เช่น precision, PEAS, kNN','Keyword, e.g. precision, PEAS, kNN')}</label><input id="search-input" type="search" autocomplete="off"><p id="search-status" role="status">${t(lang,'พิมพ์คำเพื่อเริ่มค้นหา','Type a keyword to start')}</p><ul id="search-results"></ul></dialog>
<dialog id="image-dialog" aria-labelledby="image-title"><div class="dialog-heading"><h2 id="image-title">${t(lang,'ภาพประกอบ','Diagram')}</h2><button data-close-dialog aria-label="${t(lang,'ปิดภาพ','Close image')}">×</button></div><div class="image-controls"><button data-zoom="out" aria-label="${t(lang,'ย่อภาพ','Zoom out')}">−</button><button data-zoom="in" aria-label="${t(lang,'ขยายภาพ','Zoom in')}">+</button><button data-zoom="reset">${t(lang,'พอดีจอ','Fit')}</button><a id="image-original" target="_blank" rel="noopener">${t(lang,'เปิดภาพต้นฉบับ ↗','Open original ↗')}</a></div><div class="image-stage"><img id="zoom-image" alt=""></div><p id="image-caption"></p></dialog>
</body></html>`;
}

await rm(out,{recursive:true,force:true});
await mkdir(`${out}/notes`,{recursive:true});
await cp('public',out,{recursive:true});
await cp('content/assets',`${out}/assets`,{recursive:true});
await writeFile(`${out}/.nojekyll`,'');

for (const note of notes) {
  note.headings = [];
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkCloze).use(remarkRehype,{allowDangerousHtml:true}).use(rehypeRaw).use(rehypeSanitize,{...defaultSchema,tagNames:[...defaultSchema.tagNames,'mark']}).use(rehypeSlug).use(decorate(note)).use(rehypeStringify);
  const html = String(await processor.process(note.markdown));
  const lang = note.lang;
  const sidebar = `<details class="week-menu" open><summary>${t(lang,'ทุกสัปดาห์','All weeks')}</summary><nav aria-label="${t(lang,'เลือกสัปดาห์','Choose a week')}">${notes.filter(n=>n.lang===lang).map(n=>`<a href="${n.slug}.html" ${n.week===note.week?'aria-current="page"':''}><span class="week-no">${String(n.week).padStart(2,'0')}</span><span>${esc(n.title)}</span></a>`).join('')}</nav></details>`;
  const toc = `<nav class="toc" aria-label="${t(lang,'สารบัญบทนี้','On this page')}"><strong>${t(lang,'ในบทนี้','On this page')}</strong>${note.headings.map(h=>`<a href="#${esc(h.id)}">${esc(h.title)}</a>`).join('')}</nav>`;
  const prev = find(note.week-1,lang), next = find(note.week+1,lang);
  const body = `<div class="reader-layout"><aside class="reader-sidebar">${sidebar}</aside><main id="main" class="reader"><div class="note-meta">WEEK ${String(note.week).padStart(2,'0')} <span>${esc(note.date)}</span></div><h1>${esc(note.title)}</h1><div class="reader-actions"><button data-read-week="${note.week}" aria-pressed="false">${t(lang,'ทำเครื่องหมายว่าอ่านแล้ว','Mark as read')}</button><button data-print>${t(lang,'พิมพ์บทนี้','Print this note')}</button></div><article class="prose">${html}</article><nav class="pagination" aria-label="${t(lang,'บทก่อนหน้าและถัดไป','Previous and next notes')}">${prev?`<a href="${prev.slug}.html"><small>← ${t(lang,'บทก่อนหน้า','Previous')}</small>${esc(prev.title)}</a>`:'<span></span>'}${next?`<a href="${next.slug}.html"><small>${t(lang,'บทถัดไป','Next')} →</small>${esc(next.title)}</a>`:'<span></span>'}</nav></main><aside class="toc-sidebar">${toc}</aside></div>`;
  await writeFile(`${out}/notes/${note.slug}.html`,shell({lang,title:note.title,base:'../',toggle:`${find(note.week,lang==='th'?'en':'th').slug}.html`,body,page:'note'}));
  search.push({title:note.title,week:note.week,lang:note.lang,url:href(note),body:note.plain});
}

for (const lang of ['th','en']) {
  const en = lang==='en';
  const topics = [
    {title:t(lang,'พื้นฐาน Data Science','Data Science foundations'),weeks:[1,2,3,4,5]},
    {title:t(lang,'Classification และการวัดผล','Classification & evaluation'),weeks:[6,7]},
    {title:t(lang,'AI และ Machine Learning','AI & Machine Learning'),weeks:[8,9]}
  ];
  const latest = find(9,lang);
  const body = `<main id="main" class="home"><section class="hero"><div><p class="eyebrow">DATA SCIENCE & ARTIFICIAL INTELLIGENCE</p><h1>${t(lang,'เข้าใจแนวคิด<br>ผ่านภาพและสรุป','See the ideas.<br>Understand the course.')}</h1><p class="hero-copy">${t(lang,'ทบทวน INT182 สัปดาห์ 1–9 พร้อมสูตร ตัวอย่าง และไดอะแกรม','Review INT182 weeks 1–9 with formulas, examples, and diagrams.')}</p><a class="primary" href="${href(latest)}">${t(lang,'อ่านบทล่าสุด','Read the latest note')} <span>↗</span></a><a class="secondary" href="#diagrams">${t(lang,'ดูไดอะแกรม','Browse diagrams')} ↓</a></div><figure class="hero-visual"><span>08 / RATIONAL AGENT</span><a class="diagram-link" href="assets/w08-introduction-to-ai-and-agents/w8-agent-loop.svg" target="_blank" rel="noopener" aria-label="${t(lang,'ขยายวงจร AI Agent','Enlarge AI agent loop')}"><img src="assets/w08-introduction-to-ai-and-agents/w8-agent-loop.svg" alt="${t(lang,'วงจรการรับรู้และการกระทำของ AI Agent','AI agent perception and action loop')}"></a><figcaption>${t(lang,'มองภาพรวม แล้วค่อยลงรายละเอียด','Start with the big picture.')}</figcaption></figure></section>
<div class="course-stats"><span><strong>09</strong> ${t(lang,'สัปดาห์','weeks')}</span><span><strong>TH / EN</strong> ${t(lang,'สองภาษา','two languages')}</span><span><strong>10</strong> ${t(lang,'ไดอะแกรมสรุปใหม่','new study diagrams')}</span><span class="updated">${t(lang,'เนื้อหาถึง 7 ต.ค. 2026','Through 7 Oct 2026')}</span></div>
<section id="weeks" class="course-section"><h2>${t(lang,'เลือกบทที่อยากทบทวน','Choose a topic to review')}</h2><p class="section-intro">${t(lang,'เรียงตามคาบเรียน ตั้งแต่พื้นฐานข้อมูลถึงการเรียนรู้ของเครื่อง','Follow the course from data foundations to machine learning.')}</p><div class="topic-grid">${topics.map((group,i)=>`<section class="topic-group"><span class="topic-index">0${i+1}</span><h3>${group.title}</h3><div class="week-list">${group.weeks.map(w=>{const n=find(w,lang);return `<a href="${href(n)}" data-week="${w}"><span class="week-no">W${String(w).padStart(2,'0')}</span><span>${esc(n.title)}<small>${esc(n.date)}</small></span><span class="read-indicator" aria-label="${t(lang,'อ่านแล้ว','Read')}"></span><span aria-hidden="true">↗</span></a>`}).join('')}</div></section>`).join('')}</div></section>
<section id="diagrams" class="diagrams-section"><h2>${t(lang,'ทบทวนด้วยไดอะแกรม','Review with diagrams')}</h2><p class="section-intro">${t(lang,'กดภาพเพื่อขยาย แล้วเลือกอ่านคำอธิบายในบทเรียน','Enlarge a diagram or read its explanation in the note.')}</p><div class="diagram-filters" role="group" aria-label="${t(lang,'กรองไดอะแกรมตามสัปดาห์','Filter diagrams by week')}">${['all','6','7','8','9'].map((w,i)=>`<button data-filter="${w}" aria-pressed="${i===0}">${w==='all'?t(lang,'ทั้งหมด','All'):`Week ${w}`}</button>`).join('')}</div><div class="diagram-grid">${gallery.map(g=>`<figure data-diagram-week="${g.week}"><a class="diagram-link diagram-thumb" href="${g.src}" target="_blank" rel="noopener" aria-label="${esc(t(lang,`ขยายภาพ: ${g.caption}`,`Enlarge Week ${g.week} diagram`))}"><img src="${g.src}" alt="${esc(en?path.basename(g.src,'.svg').replace(/^w\d+-/,'').replaceAll('-',' '):g.caption)}" loading="lazy"></a><figcaption><span>WEEK ${g.week}</span><a href="${href(find(g.week,lang))}">${esc(en?path.basename(g.src,'.svg').replace(/^w\d+-/,'').replaceAll('-',' '):g.caption)} ↗</a></figcaption></figure>`).join('')}</div></section>
<section class="source-note"><h2>${t(lang,'เกี่ยวกับสรุปนี้','About these notes')}</h2><p>${t(lang,'อ้างอิงสไลด์และบันทึกคาบเรียนที่ได้รับ โดยแยกข้อจำกัดของการถอดเสียงและแหล่งข้อมูลไว้ในแต่ละบท สัปดาห์ 9 ใช้บันทึก G1 วันที่ 7 ต.ค.; กำหนดงานของ G2 ควรตรวจประกาศของกลุ่มอีกครั้ง','Based on the supplied lecture slides and transcripts, with source limitations noted in each lesson. Week 9 uses the G1 lecture on 7 Oct; G2 students should confirm their group’s project dates.')}</p></section></main>`;
  await writeFile(`${out}/${en?'en':'index'}.html`,shell({lang,title:t(lang,'สรุปบทเรียน','Study notes'),toggle:en?'index.html':'en.html',body}));
}
await writeFile(`${out}/search.json`,JSON.stringify(search));
await writeFile(`${out}/404.html`,shell({lang:'th',title:'ไม่พบหน้า',base:'/int182-study-notes/',toggle:'/int182-study-notes/en.html',body:'<main id="main" class="home"><h1>ไม่พบหน้านี้</h1><p><a href="/int182-study-notes/">กลับหน้ารวมบทเรียน</a></p></main>'}));
console.log(`Built ${notes.length} notes, 2 homepages and ${gallery.length} study diagrams in docs/`);
