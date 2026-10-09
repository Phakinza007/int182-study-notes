import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {parseHTML} from 'linkedom';

const root=path.resolve('docs');
const failures=[];
let checked=0,images=0;
async function walk(dir){const all=[];for(const file of await readdir(dir)){const full=path.join(dir,file);if((await stat(full)).isDirectory())all.push(...await walk(full));else all.push(full)}return all}
const files=await walk(root);
const pages=files.filter(f=>f.endsWith('.html'));
for(const file of pages){
  const {document}=parseHTML(await readFile(file,'utf8'));
  if(!document.querySelector('h1'))failures.push(`${file}: missing h1`);
  const ids=[...document.querySelectorAll('[id]')].map(el=>el.id);
  if(new Set(ids).size!==ids.length)failures.push(`${file}: duplicate IDs`);
  for(const el of document.querySelectorAll('[href],[src]')){
    const url=el.getAttribute('href')??el.getAttribute('src');
    if(!url||/^(https?:|mailto:|data:)/.test(url))continue;
    const [relative,fragment]=url.split('#');
    const clean=decodeURIComponent(relative);
    const target=clean.startsWith('/int182-study-notes/')?path.join(root,clean.slice('/int182-study-notes/'.length)):path.resolve(path.dirname(file),clean||path.basename(file));
    let targetFile=target.endsWith(path.sep)?path.join(target,'index.html'):target;
    if(targetFile===root)targetFile=path.join(root,'index.html');
    try{await stat(targetFile)}catch{failures.push(`${path.relative(root,file)}: broken ${url}`);continue}
    if(fragment&&targetFile.endsWith('.html')){
      const other=targetFile===file?document:parseHTML(await readFile(targetFile,'utf8')).document;
      if(!other.getElementById(decodeURIComponent(fragment)))failures.push(`${path.relative(root,file)}: missing anchor ${url}`);
    }
    checked++;
    if(el.tagName==='IMG'){images++;if(!el.hasAttribute('alt'))failures.push(`${file}: image has no alt`)}
  }
}
const index=JSON.parse(await readFile(path.join(root,'search.json'),'utf8'));
if(index.length!==18||index.some(n=>!n.body||!n.title))failures.push('Search index incomplete');
if(files.some(f=>/\.(pdf|docx|mp4|m4a|env)$/.test(f)))failures.push('Unexpected original or private file in public output');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`Checked ${pages.length} pages, ${checked} internal links/assets, ${images} images and 18 search entries.`);
