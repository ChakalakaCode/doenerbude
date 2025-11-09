#!/usr/bin/env node
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'assets', 'menu');

function groupKey(file){
  const name = path.basename(file);
  const m = name.match(/^(.*?)(-\d+)?\.png$/i);
  if (!m) return null;
  return m[1] + '.png';
}

async function run(){
  const entries = await fsp.readdir(dir);
  const pngs = entries.filter(f=>/\.png$/i.test(f));
  const groups = new Map();
  for (const f of pngs){
    const key = groupKey(f);
    if (!key) continue;
    const p = path.join(dir, f);
    const st = await fsp.stat(p);
    const item = { file: p, size: st.size, name: f };
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }

  let changed = 0;
  for (const [baseName, items] of groups.entries()){
    if (!items.length) continue;
    items.sort((a,b)=>b.size - a.size);
    const best = items[0];
    const basePath = path.join(dir, baseName);
    if (best.file.toLowerCase() !== basePath.toLowerCase()){
      await fsp.copyFile(best.file, basePath);
      console.log('pick ', baseName, '<=', path.basename(best.file), `(${best.size} bytes)`);
      changed++;
    } else {
      console.log('keep ', baseName, `(${best.size} bytes)`);
    }
  }
  console.log(`Done. Updated ${changed} base files.`);
}

run().catch(err=>{ console.error(err); process.exit(1); });
