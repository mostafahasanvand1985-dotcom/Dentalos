import {openDB} from './db.js';
import {currentRole, setRole, canAccess} from './rbac.js';
import {initUpdateCenter} from './update-center.js';

// ثبت سرویس‌ورکر (PWA)
if ('serviceWorker' in navigator){
  navigator.serviceWorker.register('./service-worker.js');
}

// مقداردهی اولیه
document.addEventListener('DOMContentLoaded', async ()=>{
  await openDB();

  // نقش: از localStorage بخوان و نشان بده
  setRole(currentRole());

  // مرکز بروزرسانی
  initUpdateCenter(document.getElementById('btnUpdate'));

  // کلیک روی کاشی‌ها/باتم‌بار
  const goto = sec=>{
    if (!canAccess(sec)) return toast(`دسترسی ${sec} برای نقش شما مجاز نیست`);
    // این‌جا بعداً Router واقعی اضافه می‌کنیم
    toast(`ورود به بخش: ${sec}`);
  };

  document.querySelectorAll('[data-sec]').forEach(el=>{
    el.addEventListener('click', ()=>goto(el.dataset.sec));
  });

  // جستجو (استاب)
  document.getElementById('q').addEventListener('input', e=>{
    const v = e.target.value.trim();
    // TODO: مپ کلیدواژه ← سکشن/نتایج
  });
});

function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 1800);
}

// تغییر نقش سریع (لانگ‌پرس روی چیپ نقش)
document.getElementById('roleChip').addEventListener('click', ()=>{
  const order = ['manager','reception','doctor','assistant'];
  const i = order.indexOf(currentRole());
  setRole(order[(i+1)%order.length]);
});
