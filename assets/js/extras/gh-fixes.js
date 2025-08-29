;(()=>{
  document.documentElement.style.overflowX='hidden';
  document.body && (document.body.style.overflowX='hidden');

  function showAnchor(id){
    const el = document.querySelector(id);
    if(!el) return false;
    document.querySelectorAll('[id^="sec-"]').forEach(s=>{ s.classList.add('dos-hidden'); });
    el.classList.remove('dos-hidden');
    return true;
  }

  function go(sec){
    const anchor = '#sec-' + sec.replace('#sec-','');
    if (window.DOS && DOS.Router && typeof DOS.Router.go==='function'){
      try{ DOS.Router.go(anchor); return; }catch(e){}
    }
    location.hash = anchor;
    showAnchor(anchor);
  }

  function wireTiles(){
    document.querySelectorAll('[data-sec]').forEach(el=>{
      el.addEventListener('click', ()=> go(el.dataset.sec));
    });
  }

  async function clearCaches(){
    try{
      if('caches' in window){
        const ks = await caches.keys();
        await Promise.all(ks.map(k=> caches.delete(k)));
      }
      if(navigator.serviceWorker){
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r=> r.unregister()));
      }
    }catch(e){}
    alert('کش پاک شد. صفحه را رفرش کنید.');
    location.reload();
  }

  function attachClearBtn(){ document.getElementById('btnClearCache')?.addEventListener('click', clearCaches); }
  function onHash(){ const h = location.hash||''; if(/^#sec-/.test(h)) showAnchor(h); }

  document.addEventListener('DOMContentLoaded', ()=>{ wireTiles(); attachClearBtn(); onHash(); });
  window.addEventListener('hashchange', onHash);
  window.GH_FIXES = { go, clearCaches };
})();
