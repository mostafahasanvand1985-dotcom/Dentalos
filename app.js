const $ = s=>document.querySelector(s);

// ===== تولید آیکن PNG بر اساس لوگوی برند (Canvas) =====
function drawIcon(size=512){
  const c=document.createElement('canvas'); c.width=c.height=size;
  const ctx=c.getContext('2d');

  // پس‌زمینه گرادیانی
  const g=ctx.createLinearGradient(0,0,size,size);
  g.addColorStop(0,'#0ea5e9'); g.addColorStop(1,'#8b5cf6');
  ctx.fillStyle=g; ctx.fillRect(0,0,size,size);

  // دایره شیشه‌ای
  ctx.beginPath(); ctx.arc(size*0.28,size*0.28,size*0.22,0,Math.PI*2);
  ctx.fillStyle='rgba(255,255,255,.18)'; ctx.fill();

  // ابزارها (سه میله سفید)
  ctx.fillStyle='#fff';
  const w=size*0.035, r=size*0.02;
  function rod(x,y,h){ ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+w,y); ctx.lineTo(x+w,y+h); ctx.quadraticCurveTo(x+w,y+h+r,x+w-r,y+h+r); ctx.lineTo(x+r,y+h+r); ctx.quadraticCurveTo(x,y+h+r,x,y+h); ctx.closePath(); ctx.fill(); }
  rod(size*0.20,size*0.18,size*0.46);
  rod(size*0.27,size*0.14,size*0.50);
  rod(size*0.34,size*0.22,size*0.42);

  // عنوان کوتاه
  ctx.fillStyle='rgba(255,255,255,.92)';
  ctx.font = `${Math.round(size*0.14)}px ui-rounded,system-ui`;
  ctx.textAlign='center'; ctx.fillText('DOS', size*0.72, size*0.64);

  return c.toDataURL('image/png');
}

// ===== ساخت Manifest پویا با آیکن‌های تولیدی =====
function ensureDynamicManifest(){
  try{
    const i192 = drawIcon(192);
    const i512 = drawIcon(512);
    const manifest = {
      name: "DentalOS",
      short_name: "DentalOS",
      start_url: "index.html",
      display: "standalone",
      background_color: "#071c27",
      theme_color: "#0d6efd",
      icons: [
        {src:i192, sizes:"192x192", type:"image/png"},
        {src:i512, sizes:"512x512", type:"image/png"}
      ]
    };
    const blob = new Blob([JSON.stringify(manifest)], {type:'application/manifest+json'});
    const url  = URL.createObjectURL(blob);

    // جایگزینی manifest
    let l = document.querySelector('link[rel="manifest"]');
    if(!l){ l=document.createElement('link'); l.rel='manifest'; document.head.appendChild(l); }
    l.href = url;

    // اپل-تاچ-آیکن (ممکن است بعضی نسخه‌های iOS data: را نپذیرند؛ ولی تلاش می‌کنیم)
    const apple = document.createElement('link');
    apple.rel='apple-touch-icon'; apple.href = i192;
    document.head.appendChild(apple);
  }catch(e){ console.warn('manifest generation failed:', e); }
}

// ===== روتینگ سبک + RBAC =====
function routeTo(name){
  if(!RBAC.can(name)){ alert('دسترسی مجاز نیست.'); return; }
  console.log('→ route:', name);
}
document.addEventListener('click', e=>{
  const t=e.target.closest('[data-route]'); if(!t) return; routeTo(t.dataset.route);
});

// ===== Self-Test =====
(async function runHealth(){
  ensureDynamicManifest();
  try{
    await DB.openDB();
    await DB.metaSet('healthPing', Math.random().toString(36).slice(2));
    const val = await DB.metaGet('healthPing');
    $('#health').textContent =
`OK: IndexedDB
Role: ${RBAC.role}
Update Channel: ${UPDATE.channel} (${UPDATE.version})
Last Ping: ${val}
SW: ${'serviceWorker' in navigator ? 'available' : 'N/A'}`;
  }catch(err){
    $('#health').textContent = 'FAIL: '+err.message;
  }
})();
