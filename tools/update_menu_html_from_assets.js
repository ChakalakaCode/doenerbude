#!/usr/bin/env node
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const root = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(root, 'index.html');
const ASSET_DIR = path.join(root, 'assets', 'menu');

function normalize(s=''){
  return s
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/Ä/g,'Ae').replace(/Ö/g,'Oe').replace(/Ü/g,'Ue').replace(/ß/g,'ss')
    .trim();
}
function slugify(name, num){
  const base = normalize(String(name)).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  const nn = String(num||'').replace(/[^a-z0-9]+/gi,'').toLowerCase();
  return nn ? `${nn}-${base}` : base;
}
function escapeRe(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}

function extractItems(html){
  const sections = html.split('<div class="menu-section">').slice(1);
  const items = [];
  for (const sec of sections){
    const rowRe = /<div class="menu-item-row">[\s\S]*?<span class="item-number">([\s\S]*?)<\/span>[\s\S]*?<span class="item-name">([\s\S]*?)<\/span>/g;
    let m;
    while ((m = rowRe.exec(sec))){
      const number = m[1].replace(/<[^>]+>/g,'').trim();
      const name = m[2].replace(/<[^>]+>/g,'').trim();
      items.push({ number, name });
    }
  }
  return items;
}

function updateBlocks(html, resolver){
  const rowRe = /<div class="menu-item-row">[\s\S]*?<div class="menu-item-details">[\s\S]*?<span class="item-number">\s*([^<]*)\s*<\/span>[\s\S]*?<span class="item-name">\s*([^<]*)\s*<\/span>[\s\S]*?<\/div>\s*<\/div>/g;
  return html.replace(rowRe, (block, number, name)=>{
    const rel = resolver({ number: number.trim(), name: name.trim() });
    if (!rel) return block;
    return block.replace(/(<div class="menu-item-image">[\s\S]*?<img[^>]*?src=")([^"\n]*)(")/, `$1${rel}$3`);
  });
}

async function main(){
  const html = await fsp.readFile(INDEX_PATH, 'utf8');
  const items = extractItems(html);
  const dirEntries = await fsp.readdir(ASSET_DIR);
  const files = new Set(dirEntries.filter(f=>f.toLowerCase().endsWith('.png')));

  function resolver(it){
    const numberPrefix = (String(it.number).replace(/[^a-z0-9]+/gi,'').toLowerCase()) + '-';
    const candidates = [...files].filter(f=>f.toLowerCase().startsWith(numberPrefix));
    let chosen = null;
    if (candidates.length){
      const base = candidates.find(f=>!(/-(\d+)\.png$/i.test(f)));
      chosen = base || candidates.sort((a,b)=>{
        const ma = a.match(/-(\d+)\.png$/i); const na = ma?parseInt(ma[1],10):1;
        const mb = b.match(/-(\d+)\.png$/i); const nb = mb?parseInt(mb[1],10):1;
        return nb - na;
      })[0];
    } else {
      const slug = slugify(it.name, it.number) + '.png';
      if (files.has(slug)){
        chosen = slug;
      }
    }
    if (!chosen) return null;
    return path.join('assets','menu',chosen).replace(/\\/g,'/');
  }

  const updated = updateBlocks(html, resolver);
  const count = (updated !== html) ? (updated.match(/assets\/menu\//g)||[]).length : 0;

  if (updated !== html){
    await fsp.writeFile(INDEX_PATH, updated, 'utf8');
    console.log(`index.html aktualisiert (${count} Einträge)`);
  } else {
    console.log('index.html war bereits aktuell');
  }
}

main().catch(err=>{ console.error(err); process.exit(1); });
