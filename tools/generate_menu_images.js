#!/usr/bin/env node
/*
 Generate AI images for menu items using Stability AI.
 - Reads items from ../index.html
 - Generates images with SDXL (1024x768) in assets/menu/
 - Optionally updates ../index.html <img src> to local files (--update-html)

 Usage (PowerShell):
   $env:STABILITY_API_KEY="<YOUR_KEY>"
   node tools/generate_menu_images.js --update-html --overwrite
*/

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const __root = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(__root, 'index.html');
const ASSET_DIR = path.join(__root, 'assets', 'menu');
let API_KEY = process.env.STABILITY_API_KEY;
if (!API_KEY) {
  try {
    const envPath = path.join(__root, '.env');
    const envText = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
    const m = envText.match(/^\s*STABILITY_API_KEY\s*=\s*"?([^"\r\n]+)"?\s*$/m);
    if (m) {
      API_KEY = m[1].trim();
      process.env.STABILITY_API_KEY = API_KEY;
    }
  } catch {}
}
const MODEL = 'stable-diffusion-xl-1024-v1-0';
const WIDTH = 1344; // allowed SDXL size
const HEIGHT = 768;  // allowed SDXL size

const ARGS = process.argv.slice(2);
const FLAG_UPDATE_HTML = ARGS.includes('--update-html');
const FLAG_OVERWRITE = ARGS.includes('--overwrite');
const DRY = ARGS.includes('--dry');
function argValue(name){
  const i = ARGS.findIndex(a => a === name || a.startsWith(name+'='));
  if (i === -1) return null;
  const a = ARGS[i];
  if (a.includes('=')) return a.split('=')[1];
  return ARGS[i+1] || null;
}
const ONLY_TYPES = (argValue('--only-types') || '').split(',').map(s=>s.trim()).filter(Boolean);
const ONLY_NUMS = (argValue('--only-nums') || '').split(',').map(s=>s.trim()).filter(Boolean);
const SAMPLES = Math.max(1, parseInt(argValue('--samples') || process.env.SAMPLES || '1', 10) || 1);
const UNIQUE_PER_TYPE = ARGS.includes('--unique-per-type');

if (!API_KEY) {
  console.error('Error: STABILITY_API_KEY is not set. Leg ihn in .env (STABILITY_API_KEY="...") oder setze die ENV-Variable.');
  process.exit(1);
}

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

async function ensureDir(p){ await fsp.mkdir(p, { recursive: true }); }

function extractItems(html){
  const sections = html.split('<div class="menu-section">').slice(1);
  const items = [];
  for (const sec of sections){
    const headerMatch = sec.match(/<div class="menu-section-header">[\s\S]*?<span>(.*?)<\/span>/);
    const sectionTitle = headerMatch ? headerMatch[1].replace(/<[^>]+>/g,'').trim() : '';

    const rowRe = /<div class="menu-item-row">[\s\S]*?<span class="item-number">([\s\S]*?)<\/span>[\s\S]*?<span class="item-name">([\s\S]*?)<\/span>/g;
    let m;
    while ((m = rowRe.exec(sec))){
      const number = m[1].replace(/<[^>]+>/g,'').trim();
      const name = m[2].replace(/<[^>]+>/g,'').trim();
      items.push({ number, name, sectionTitle });
    }
  }
  return items;
}

function classify(item){
  const n = normalize(item.name).toLowerCase();
  const s = normalize(item.sectionTitle).toLowerCase();
  const includes = (t)=>n.includes(t) || s.includes(t);
  if (includes('lahmacun')) return 'lahmacun';
  if (includes('pizza br')) return 'pizza_broetchen';
  if (includes('knackige pizza') || includes('pizza')){
    if (n.includes('calzone')) return 'calzone';
    return 'pizza';
  }
  if (includes('vegetarisch') || n.includes('falafel')){
    if (n.includes('durum')||n.includes('duerum')) return 'falafel_durum';
    if (n.includes('box')) return 'falafel_box';
    return 'falafel_tasche';
  }
  if (includes('frische salate') || n.includes('salat')){
    if (n.includes('tonno')) return 'salat_tonno';
    if (n.includes('chicken')) return 'salat_chicken';
    if (n.includes('doener')||n.includes('doner')) return 'salat_doner';
    return 'salat_mix';
  }
  if (includes('schnellgerichte')){
    if (n.includes('currywurst')) return 'currywurst';
    if (n.includes('bratwurst')) return 'bratwurst';
    if (n.includes('wings')) return 'chicken_wings';
    if (n.includes('nuggets')) return 'nuggets';
    if (n.includes('hahnchen')||n.includes('haehnchen')||n.includes('chicken')) return 'chicken';
  }
  if (includes('schnitzel')) return 'schnitzel';
  if (includes('menüs')||includes('menus')||includes('menue')) return 'menu_combo';
  if (includes('stabiler auflauf')||includes('auflauf')) return 'auflauf';
  // Döner Gruppe
  if (n.includes('teller')) return 'doner_teller';
  if (n.includes('durum')||n.includes('duerum')) return 'durum';
  if (n.includes('box')) return 'doner_box';
  if (n.includes('doener')||n.includes('doner')) return 'doner_tasche';
  return 'generic_food';
}

const BASE_STYLE = 'Mouthwatering ultra realistic food photography, close-up 3/4 angle, shallow depth of field (creamy bokeh), soft warm restaurant lighting, glossy highlights, juicy textures, vibrant yet natural colors, styled plating, neutral background, extremely high detail, no text, no watermark, no logo, commercial menu photo, 50mm lens look.';
const NEGATIVE = 'text, watermark, logo, hands, people, deformed, distorted, disfigured, ugly, low quality, lowres, blurry, oversaturated, oversharpened';
const NEG_WRAP = 'shawarma wrap, gyro wrap, burrito, tortilla, lavash, round pita pocket';
const POS_BERLIN_BREAD = 'triangular crispy Turkish flatbread wedge (doner bread), sesame crust, open pocket';

function negFor(type){
  let n = NEGATIVE;
  if (type === 'doner_tasche' || type === 'doner_teller' || type === 'doner_box') {
    n += ', ' + NEG_WRAP;
  }
  if (type === 'durum') {
    n += ', round pita pocket';
  }
  return n;
}

function promptFor(item){
  const type = classify(item);
  const nm = item.name;
  switch(type){
    case 'doner_tasche':
      return `${nm}, Original Berlin style doner in ${POS_BERLIN_BREAD}, thinly sliced veal and chicken döner meat, iceberg lettuce, tomato, cucumber, red cabbage, authentic herb/garlic/spicy sauces visible, juicy glossy meats, steam rising. Not a wrap. ${BASE_STYLE}`;
    case 'doner_teller':
      return `${nm}, Original Berlin style döner plate on white plate: döner meat with golden crispy fries and mixed salad on the side, sauces drizzled, no bread pocket, not a wrap, authentic German döner plate presentation. ${BASE_STYLE}`;
    case 'durum':
      return `${nm}, authentic Berlin style dürüm: long yufka flatbread wrap (dürüm), cylindrical roll, with döner meat, salad and creamy sauce, cut open showing filling, juicy and glossy, close-up. ${BASE_STYLE}`;
    case 'doner_box':
      return `${nm}, Berlin style döner box: cardboard takeaway box filled with döner meat and crispy fries, sauces drizzled on top, steam and glossy highlights, appetizing. ${BASE_STYLE}`;
    case 'lahmacun':
      return `${nm}, crispy lahmacun with minced topping, fresh parsley and lemon wedge on wooden surface, hot and fragrant, edge crisp detail. ${BASE_STYLE}`;
    case 'salat_tonno':
      return `${nm}, tuna salad with lettuce, tomato, cucumber, red onion, glistening dressing drops, ultra fresh. ${BASE_STYLE}`;
    case 'salat_chicken':
      return `${nm}, chicken salad with grilled juicy chicken strips, fresh greens and dressing, appetizing shine. ${BASE_STYLE}`;
    case 'salat_doner':
      return `${nm}, salad topped with sliced doner meat, mixed greens and vegetables, juicy and vibrant. ${BASE_STYLE}`;
    case 'salat_mix':
      return `${nm}, mixed salad with fresh seasonal vegetables, vivid colors, droplets on leaves, ultra fresh. ${BASE_STYLE}`;
    case 'bratwurst':
      return `${nm}, grilled bratwurst with mustard and bread roll, juicy grill marks, sizzling look on rustic wooden background. ${BASE_STYLE}`;
    case 'currywurst':
      return `${nm}, sliced sausage with rich curry ketchup and curry powder, served with crispy fries, glossy sauce, steam. ${BASE_STYLE}`;
    case 'nuggets':
      return `${nm}, crispy golden chicken nuggets with dipping sauce, crumb detail macro, close-up. ${BASE_STYLE}`;
    case 'chicken_wings':
      return `${nm}, crispy chicken wings with sticky glaze, appetizing shine, sesame and herbs. ${BASE_STYLE}`;
    case 'chicken':
      return `${nm}, crispy fried chicken pieces with golden crunchy crust, juicy inside, steam. ${BASE_STYLE}`;
    case 'pizza':
      return `${nm}, 30cm pizza on wooden board, bubbling melted cheese, appetizing toppings, dramatic cheese pull. ${BASE_STYLE}`;
    case 'calzone':
      return `${nm}, calzone folded pizza, golden blistered crust, fresh herbs, cut to show steamy filling. ${BASE_STYLE}`;
    case 'pizza_broetchen':
      return `${nm}, pizza bread bites with melted cheese, golden brown edges, appetizing cheese stretch. ${BASE_STYLE}`;
    case 'schnitzel':
      return `${nm}, schnitzel with fries on white plate, lemon wedge, parsley, extra crisp breading, juicy shine, close-up. ${BASE_STYLE}`;
    case 'auflauf':
      return `${nm}, casserole baked with cheese, golden bubbling crust, steamy and gooey cheese. ${BASE_STYLE}`;
    case 'falafel_tasche':
      return `${nm}, falafel sandwich in pita with salad and tahini sauce, crispy falafel crumb, vibrant greens, juicy tomatoes. ${BASE_STYLE}`;
    case 'falafel_durum':
      return `${nm}, falafel dürüm wrap with salad, cut open showing filling, close-up, appetizing textures. ${BASE_STYLE}`;
    case 'falafel_box':
      return `${nm}, falafel box with salad and sauce, crispy edges, glossy sauce, vibrant and fresh. ${BASE_STYLE}`;
    case 'menu_combo':
      return `${nm}, combo meal with main item, fries and a drink, extra appetizing commercial photo, glossy highlights. ${BASE_STYLE}`;
    default:
      return `${nm}, appetizing, professional food photo. ${BASE_STYLE}`;
  }
}

async function generateImage(prompt, outfileBase, type){
  if (!FLAG_OVERWRITE && fs.existsSync(outfileBase)){
    console.log('skip  ', path.basename(outfileBase));
    return 'skipped';
  }
  if (DRY){
    console.log('DRY   ', path.basename(outfileBase), '|', prompt);
    return 'dry';
  }
  const endpoint = `https://api.stability.ai/v1/generation/${MODEL}/text-to-image`;
  const body = {
    text_prompts: [
      { text: prompt, weight: 1 },
      { text: negFor(type), weight: -1 }
    ],
    cfg_scale: 8.5,
    height: HEIGHT,
    width: WIDTH,
    samples: SAMPLES,
    steps: 35,
    style_preset: 'photographic'
  };
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok){
    const txt = await res.text();
    throw new Error(`Stability API error ${res.status}: ${txt}`);
  }
  const data = await res.json();
  const arts = (data && data.artifacts) || [];
  if (!arts.length) throw new Error('No image returned');
  await ensureDir(path.dirname(outfileBase));
  for (let i=0;i<arts.length;i++){
    const af = arts[i];
    if (!af || !af.base64) continue;
    const buf = Buffer.from(af.base64, 'base64');
    const out = i===0 ? outfileBase : outfileBase.replace(/\.png$/i, `-${i+1}.png`);
    await fsp.writeFile(out, buf);
    console.log('saved ', path.basename(out));
  }
  return 'saved';
}

function buildUniqueFilenames(items){
  const used = new Set();
  return items.map(it=>{
    let slug = slugify(it.name, it.number);
    let base = slug;
    let i=1;
    while(used.has(base)){
      base = `${slug}-${i++}`;
    }
    used.add(base);
    return { ...it, slug: base, file: path.join(ASSET_DIR, `${base}.png`) };
  });
}

function replaceSrcInRow(html, item, relPath){
  const num = escapeRe(item.number);
  const re = new RegExp(
    String.raw`(<div class="menu-item-row">[\s\S]*?<div class="menu-item-image">[\s\S]*?<img[^>]*?src=")([^"\n]*)("[\s\S]*?<span class="item-number">\s*${num}\s*<\/span>)`,
    'm'
  );
  return html.replace(re, (_, pre, _old, post)=>`${pre}${relPath}${post}`);
}

async function main(){
  const html = await fsp.readFile(INDEX_PATH, 'utf8');
  const extracted = extractItems(html);
  if (!extracted.length){
    console.error('Keine Gerichte gefunden. Struktur der index.html prüfen.');
    process.exit(2);
  }
  let items = buildUniqueFilenames(extracted).map(it => ({...it, type: classify(it)}));
  if (ONLY_TYPES.length){
    items = items.filter(it => ONLY_TYPES.includes(it.type));
  }
  if (ONLY_NUMS.length){
    const set = new Set(ONLY_NUMS.map(x=>x.trim()));
    items = items.filter(it => set.has(it.number));
  }
  if (UNIQUE_PER_TYPE){
    const seen = new Set();
    items = items.filter(it => {
      if (seen.has(it.type)) return false;
      seen.add(it.type);
      return true;
    });
  }

  // Generate images sequentially to avoid rate limits
  for (const it of items){
    const prompt = promptFor(it);
    try {
      await generateImage(prompt, it.file, it.type);
    } catch (e) {
      console.error('FEHLER', it.name, '-', e.message);
    }
  }

  if (FLAG_UPDATE_HTML){
    let newHtml = html;
    for (const it of items){
      const rel = path.join('assets', 'menu', `${it.slug}.png`).replace(/\\/g,'/');
      const abs = path.join(__root, rel);
      if (fs.existsSync(abs)) {
        newHtml = replaceSrcInRow(newHtml, it, rel);
      }
    }
    if (!DRY){
      await fsp.writeFile(INDEX_PATH, newHtml, 'utf8');
      console.log('index.html aktualisiert');
    } else {
      console.log('DRY: index.html NICHT geschrieben.');
    }
  }
}

// Node 18+ fetch support check
if (typeof fetch !== 'function'){
  console.error('Diese Skript benötigt Node.js 18+ (global fetch). Bitte Node aktualisieren.');
  process.exit(1);
}

main().catch(err=>{ console.error(err); process.exit(1); });
