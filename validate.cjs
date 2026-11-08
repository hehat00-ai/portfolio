const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const sandbox={window:{}};Object.defineProperty(sandbox,'PORTFOLIO',{get(){return sandbox.window.PORTFOLIO}});vm.createContext(sandbox);vm.runInContext(fs.readFileSync('dist/data.js','utf8'),sandbox);
const d=sandbox.window.PORTFOLIO,ids=new Set(),categories=new Set(d.categories.map(c=>c.id));
for(const p of d.projects){assert(!ids.has(p.id),'중복 ID: '+p.id);ids.add(p.id);assert(categories.has(p.category),'잘못된 카테고리');for(const k of ['title','problem','cause','test','result','insight','role'])assert(typeof p[k]==='string'&&p[k].trim(),p.id+': '+k+' 누락');assert(Array.isArray(p.solution)&&p.solution.length,p.id+': 해결 과정 누락');assert(p.images.every(i=>i.alt&&i.caption),p.id+': 이미지 설명 누락');for(const i of p.images)if(i.src?.startsWith('./'))assert(fs.existsSync('dist/'+i.src.slice(2)),p.id+': 이미지 파일 없음');}
const html=fs.readFileSync('dist/index.html','utf8');for(const m of html.matchAll(/(?:src|href)="\.\/([^"]+)"/g))assert(fs.existsSync('dist/'+m[1]),'경로 없음: '+m[1]);
console.log(JSON.stringify({projects:d.projects.length,categories:d.categories.length,uniqueIds:ids.size,status:'PASS'},null,2));
