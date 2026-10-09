const en = document.documentElement.lang === 'en';
const say = (th,eng) => en ? eng : th;
const base = document.body.dataset.base;
const searchDialog = document.querySelector('#search-dialog');
const searchInput = document.querySelector('#search-input');
const searchStatus = document.querySelector('#search-status');
const searchResults = document.querySelector('#search-results');
let searchData;
let searchRequest;

async function loadSearch() {
  if (searchData) return searchData;
  if (!searchRequest) searchRequest = fetch(`${base}search.json`).then(r => {
    if (!r.ok) throw new Error('Search unavailable');
    return r.json();
  }).then(rows => searchData = rows.filter(row => row.lang === (en ? 'en' : 'th'))).catch(error => {
    searchRequest = undefined;
    throw error;
  });
  return searchRequest;
}
async function showResults() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  searchResults.replaceChildren();
  if (!query) { searchStatus.textContent = say('พิมพ์คำเพื่อเริ่มค้นหา','Type a keyword to start'); return; }
  searchStatus.textContent = say('กำลังค้นหา…','Searching…');
  try {
    const rows = await loadSearch();
    if (searchInput.value.trim().toLocaleLowerCase() !== query) return;
    const words = query.split(/\s+/);
    const matches = rows.filter(r => words.every(w => `${r.title} ${r.body}`.toLocaleLowerCase().includes(w)));
    searchStatus.textContent = matches.length ? say(`พบ ${matches.length} บท`,`Found ${matches.length} notes`) : say('ไม่พบคำนี้ ลองคำอื่นหรือค้นหาภาษาอังกฤษ','No matches. Try another keyword.');
    for (const row of matches) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `${base}${row.url}`;
      const label = document.createElement('small'); label.textContent = `WEEK ${String(row.week).padStart(2,'0')}`;
      const title = document.createElement('strong'); title.textContent = row.title;
      const preview = document.createElement('p');
      const index = row.body.toLocaleLowerCase().indexOf(words[0]);
      const start = Math.max(0,index-45);
      preview.textContent = `${start?'…':''}${row.body.slice(start,start+180)}…`;
      a.append(label,title,preview); li.append(a); searchResults.append(li);
    }
  } catch {
    searchStatus.textContent = say('โหลดการค้นหาไม่สำเร็จ ลองพิมพ์อีกครั้ง','Search could not load. Type again to retry.');
  }
}
document.querySelector('[data-search-open]')?.addEventListener('click',() => {
  searchDialog.showModal(); searchInput.focus();
});
searchInput?.addEventListener('input',showResults);
document.addEventListener('keydown',e => {
  if (e.key==='Escape') {
    const dialog=document.querySelector('dialog[open]');
    if(dialog) { e.preventDefault(); dialog.close(); return; }
  }
  if (e.key==='/' && !e.ctrlKey && !e.metaKey && !e.altKey && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) && !e.target.isContentEditable && !document.querySelector('dialog[open]')) {
    e.preventDefault(); searchDialog.showModal(); searchInput.focus();
  }
});
document.querySelectorAll('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',e=> {
  if (e.target===dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); }
}));

const imageDialog = document.querySelector('#image-dialog');
const zoomImage = document.querySelector('#zoom-image');
let fitWidth = 1000;
let zoom = 1;
const resizeImage = () => zoomImage.style.width = `${Math.round(fitWidth*zoom)}px`;
document.querySelectorAll('.diagram-link').forEach(link=>link.addEventListener('click',e=>{
  if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey) return;
  e.preventDefault();
  const img = link.querySelector('img') || link.closest('figure')?.querySelector('img');
  zoomImage.alt = img?.alt || say('ภาพประกอบ','Diagram');
  document.querySelector('#image-caption').textContent = zoomImage.alt;
  document.querySelector('#image-original').href = link.href;
  zoom=1;
  zoomImage.src = link.href;
  imageDialog.showModal();
  fitWidth = Math.min(img?.naturalWidth || 1000, imageDialog.clientWidth-40);
  resizeImage();
  document.querySelector('.image-stage').scrollTo(0,0);
}));
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{
  const direction = button.dataset.zoom;
  zoom = direction==='reset' ? 1 : Math.min(4,Math.max(.5,zoom*(direction==='in'?1.4:1/1.4)));
  resizeImage();
}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  const selected=button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.querySelectorAll('[data-diagram-week]').forEach(fig=>fig.hidden=selected!=='all' && fig.dataset.diagramWeek!==selected);
}));
const storageKey = week => `int182-study-notes:read:${week}`;
const isRead = week => { try { return localStorage.getItem(storageKey(week))==='true'; } catch { return false; } };
function refreshRead() {
  document.querySelectorAll('[data-week]').forEach(link=>{
    const read=isRead(link.dataset.week); const indicator=link.querySelector('.read-indicator');
    indicator.textContent=read?'✓':''; indicator.hidden=!read;
  });
  document.querySelectorAll('[data-read-week]').forEach(button=>{
    const read=isRead(button.dataset.readWeek);
    button.setAttribute('aria-pressed',String(read));
    button.textContent=read?say('อ่านแล้ว ✓','Read ✓'):say('ทำเครื่องหมายว่าอ่านแล้ว','Mark as read');
  });
}
document.querySelectorAll('[data-read-week]').forEach(button=>button.addEventListener('click',()=>{
  try { localStorage.setItem(storageKey(button.dataset.readWeek),String(!isRead(button.dataset.readWeek))); refreshRead(); }
  catch { button.textContent=say('เบราว์เซอร์ไม่อนุญาตให้บันทึก','Browser storage is unavailable'); }
}));
document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());
refreshRead();
if(innerWidth<=900) document.querySelector('.week-menu')?.removeAttribute('open');
const observer = new IntersectionObserver(entries=>{
  for(const entry of entries) if(entry.isIntersecting) {
    document.querySelectorAll('.toc a').forEach(a=>{
      if(decodeURIComponent(a.hash.slice(1))===entry.target.id) a.setAttribute('aria-current','location');
      else a.removeAttribute('aria-current');
    });
  }
},{rootMargin:'-90px 0px -65% 0px'});
document.querySelectorAll('.prose h2[id]').forEach(h=>observer.observe(h));
