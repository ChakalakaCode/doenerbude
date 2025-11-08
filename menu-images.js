(function(){
function norm(s){return s? s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ä/g,'ae').replace(/ß/g,'ss').trim():''}
function includesAll(hay, arr){return arr.every(k=>hay.includes(k))}
const R=[
 {k:['doener','tasche'],u:'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=900&h=600&fit=crop&auto=format&q=90',a:'Original Berliner Döner Tasche'},
 {k:['doener','teller'],u:'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=900&h=600&fit=crop&auto=format&q=90',a:'Original Berliner Döner Teller'},
 {k:['duerum','doener'],u:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&h=600&fit=crop&auto=format&q=90',a:'Berliner Dürüm Döner'},
 {k:['doener','box'],u:'https://images.unsplash.com/photo-1606502281004-f86cf1282af5?w=900&h=600&fit=crop&auto=format&q=90',a:'Berliner Döner Box'},
 {k:['lahmacun'],u:'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=900&h=600&fit=crop&auto=format&q=90',a:'Lahmacun'},
 {k:['salat','gemischt'],u:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&h=600&fit=crop&auto=format&q=90',a:'Gemischter Salat'},
 {k:['salat','doener'],u:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&h=600&fit=crop&auto=format&q=90',a:'Döner Salat'},
 {k:['salat','bauer'],u:'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=900&h=600&fit=crop&auto=format&q=90',a:'Bauernsalat'},
 {k:['salat','tonno'],u:'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=900&h=600&fit=crop&auto=format&q=90',a:'Salat Tonno'},
 {k:['salat','falafel'],u:'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=900&h=600&fit=crop&auto=format&q=90',a:'Falafel Salat'},
 {k:['salat','chicken'],u:'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=900&h=600&fit=crop&auto=format&q=90',a:'Chicken Salat'},
 {k:['bratwurst'],u:'https://images.unsplash.com/photo-1612392062798-2dbaa4f5d6e4?w=900&h=600&fit=crop&auto=format&q=90',a:'Bratwurst'},
 {k:['currywurst'],u:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=900&h=600&fit=crop&auto=format&q=90',a:'Currywurst'},
 {k:['nuggets'],u:'https://images.unsplash.com/photo-1562967914-608f82629710?w=900&h=600&fit=crop&auto=format&q=90',a:'Chicken Nuggets'},
 {k:['chicken','bites'],u:'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=900&h=600&fit=crop&auto=format&q=90',a:'Chicken Bites'},
 {k:['haehnchen'],u:'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=900&h=600&fit=crop&auto=format&q=90',a:'Hähnchen'},
 {k:['chicken','wings'],u:'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=900&h=600&fit=crop&auto=format&q=90',a:'Chicken Wings'},
 {k:['cheese','nuggets'],u:'https://images.unsplash.com/photo-1619740455993-9e4e0b27f7b4?w=900&h=600&fit=crop&auto=format&q=90',a:'Cheese Nuggets'},
 {k:['pizza','spinaci'],u:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&h=600&fit=crop&auto=format&q=90',a:'Pizza Spinaci'},
 {k:['pizza','babbo'],u:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&h=600&fit=crop&auto=format&q=90',a:'Babbo Pizza'},
 {k:['pizza','margherita'],u:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&h=600&fit=crop&auto=format&q=90',a:'Pizza Margherita'},
 {k:['pizza','tore','bimbo'],u:'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=900&h=600&fit=crop&auto=format&q=90',a:'Pizza Tore Bimbo'},
 {k:['calzone','doener'],u:'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=900&h=600&fit=crop&auto=format&q=90',a:'Calzone Döner'},
 {k:['calzone'],u:'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=900&h=600&fit=crop&auto=format&q=90',a:'Calzone'},
 {k:['schnitzel','pommes'],u:'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=900&h=600&fit=crop&auto=format&q=90',a:'Schnitzel mit Pommes'},
 {k:['schnitzel','zigeuner'],u:'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=900&h=600&fit=crop&auto=format&q=90',a:'Zigeunerschnitzel'},
 {k:['brokkoli','schnitzel'],u:'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=900&h=600&fit=crop&auto=format&q=90',a:'Brokkolischnitzel'},
 {k:['doener','menue'],u:'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=900&h=600&fit=crop&auto=format&q=90',a:'Döner Menü'},
 {k:['duerum','menue'],u:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&h=600&fit=crop&auto=format&q=90',a:'Dürüm Menü'},
 {k:['mania','platte'],u:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=900&h=600&fit=crop&auto=format&q=90',a:'Mania Platte'},
 {k:['hamburger','menue'],u:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&h=600&fit=crop&auto=format&q=90',a:'Hamburger Menü'},
 {k:['chickenburger','menue'],u:'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=900&h=600&fit=crop&auto=format&q=90',a:'Chickenburger Menü'},
 {k:['nuggets','menue'],u:'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=900&h=600&fit=crop&auto=format&q=90',a:'Nuggets Menü'},
 {k:['pizza','broetchen','doener'],u:'https://images.unsplash.com/photo-1619895092538-128341789043?w=900&h=600&fit=crop&auto=format&q=90',a:'Pizza Brötchen Döner'},
 {k:['pizza','broetchen','salami'],u:'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=900&h=600&fit=crop&auto=format&q=90',a:'Pizza Brötchen Salami'},
 {k:['pizza','broetchen','schinken'],u:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&h=600&fit=crop&auto=format&q=90',a:'Pizza Brötchen Schinken'},
 {k:['pizza','broetchen','tonno'],u:'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=900&h=600&fit=crop&auto=format&q=90',a:'Pizza Brötchen Tonno'},
 {k:['pizza','broetchen','spinat'],u:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&h=600&fit=crop&auto=format&q=90',a:'Pizza Brötchen Spinat'},
 {k:['auflauf','nudel'],u:'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=900&h=600&fit=crop&auto=format&q=90',a:'Dönerauflauf mit Nudeln/Reis'},
 {k:['auflauf','pommes'],u:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&h=600&fit=crop&auto=format&q=90',a:'Dönerauflauf mit Pommes'},
 {k:['falafel','tasche'],u:'https://images.unsplash.com/photo-1593504049359-74330189a345?w=900&h=600&fit=crop&auto=format&q=90',a:'Falafel Tasche'},
 {k:['falafel','duerum'],u:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&h=600&fit=crop&auto=format&q=90',a:'Falafel Dürüm'},
 {k:['falafel','box'],u:'https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?w=900&h=600&fit=crop&auto=format&q=90',a:'Falafel Box'},
 {k:['pizza'],u:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&h=600&fit=crop&auto=format&q=90',a:'Pizza'},
 {k:['doener'],u:'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=900&h=600&fit=crop&auto=format&q=90',a:'Döner'},
]
function choose(n){const s=norm(n).replace(/\s+/g,' ');for(const r of R){if(includesAll(s,r.k))return r;}return null}
const FORCE = typeof window !== 'undefined' && !!window.MENU_IMAGES_FORCE;
function sigFor(text){let s=0;for(let i=0;i<text.length;i++){s=(s*31 + text.charCodeAt(i))>>>0;}return (s%1000)+1}
function deriveQuery(dish, section){
  const s = norm((dish+' '+section)||'');
  if(s.includes('lahmacun')) return 'lahmacun,turkish';
  if(s.includes('duerum')||s.includes('durum')) return 'wrap,kebab';
  if(s.includes('doener')||s.includes('doner')||s.includes('kebab')){
    if(s.includes('box')) return 'kebab,fries';
    if(s.includes('teller')) return 'kebab,plate,salad';
    return 'kebab,doner';
  }
  if(s.includes('salat')){
    if(s.includes('tonno')) return 'tuna,salad';
    if(s.includes('falafel')) return 'falafel,salad';
    if(s.includes('chicken')) return 'chicken,salad';
    return 'mixed,salad';
  }
  if(s.includes('pizza') && s.includes('calzone')) return 'calzone,pizza';
  if(s.includes('pizza') && s.includes('spinaci')) return 'pizza,spinach';
  if(s.includes('margherita')) return 'pizza,margherita';
  if(s.includes('pizza') && s.includes('broetchen')) return 'pizza,bread,garlic bread';
  if(s.includes('pizza')) return 'pizza';
  if(s.includes('schnitzel')) return 'schnitzel,cutlet,fries';
  if(s.includes('currywurst')) return 'currywurst';
  if(s.includes('bratwurst')) return 'bratwurst,sausage';
  if(s.includes('nuggets')) return 'chicken,nuggets';
  if(s.includes('wings')) return 'chicken,wings';
  if(s.includes('auflauf')) return 'casserole,gratin';
  return 'food,tasty';
}
function selectSrc(choice, dish, section){
  const MODE = (typeof window!=='undefined' && window.MENU_IMAGES_MODE) || 'curated';
  if(MODE==='search'){
    const q = choice.q || deriveQuery(dish, section);
    const sig = sigFor(dish+' '+section);
    return 'https://source.unsplash.com/900x600/?'+encodeURIComponent(q)+'&sig='+sig;
  }
  return choice.u;
}
function apply(){
  document.querySelectorAll('.menu-item-row').forEach(row=>{
    const nameEl=row.querySelector('.item-name');
    if(!nameEl)return;
    const headerSpan = row.closest('.menu-section') ? row.closest('.menu-section').querySelector('.menu-section-header span') : null;
    const dish = (nameEl.textContent||'');
    const section = headerSpan ? headerSpan.textContent || '' : '';
    const choice=choose(dish+' '+section);
    if(!choice)return;
    let box=row.querySelector('.menu-item-image');
    let img=box? box.querySelector('img'):null;
    const setAttrs=(el)=>{
      el.loading='lazy';
      el.decoding='async';
      el.alt=choice.a;
      el.src=selectSrc(choice, dish, section);
      el.sizes='(max-width: 768px) 100vw, 600px';
    };
    if(img){
      if(FORCE || !img.getAttribute('src')){
        setAttrs(img); img.dataset.auto='1';
      }
    }else{
      box=document.createElement('div');
      box.className='menu-item-image';
      img=document.createElement('img');
      setAttrs(img);
      box.appendChild(img);
      const details=row.querySelector('.menu-item-details');
      if(details)row.insertBefore(box,details);
    }
  })
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',apply)}else{apply()}
})();
