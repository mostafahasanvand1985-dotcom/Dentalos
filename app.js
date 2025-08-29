import {openDB} from './db.js';
import {currentRole,setRole,canAccess} from './rbac.js';
import {initUpdateCenter} from './update-center.js';

// ثبت SW
if ('serviceWorker' in navigator){ navigator.serviceWorker.register('./service-worker.js'); }

// توست
function toast(m){ const t=document.getElementById('toast'); if(!t) return; t.textContent=m; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1800); }

// رویدادها
document.addEventListener('DOMContentLoaded', async ()=>{
  await openDB();
  setRole(currentRole());
  initUpdateCenter(document.getElementById('btnUpdate'));

  // چرخش نقش (روی چیپ)
  document.getElementById('roleChip')?.addEventListener('click', ()=>{
    const order=['manager','reception','doctor','assistant']; const i=order.indexOf(currentRole());
    setRole(order[(i+1)%order.length]);
  });

  // ناوبری به سکشن‌ها
  const goto = (sec)=>{
    if (!canAccess(sec)) return toast(`دسترسی ${sec} مجاز نیست`);
    const id = '#sec-'+sec;
    document.querySelectorAll('[id^="sec-"]').forEach(s=> s.classList.add('dos-hidden'));
    const el = document.querySelector(id); if(el) el.classList.remove('dos-hidden');
    location.hash = id;
  };

  document.querySelectorAll('[data-sec]').forEach(el=>{
    el.addEventListener('click', ()=> goto(el.dataset.sec));
  });

  // اگر با هَش آمدیم
  if (location.hash && /^#sec-/.test(location.hash)){
    document.querySelectorAll('[id^="sec-"]').forEach(s=> s.classList.add('dos-hidden'));
    const el = document.querySelector(location.hash); el && el.classList.remove('dos-hidden');
  }
});
