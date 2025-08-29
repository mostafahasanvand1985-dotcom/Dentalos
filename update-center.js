export const OTA = {
  channel: localStorage.getItem('ota.channel') || 'stable',
  version: localStorage.getItem('ota.version') || '60.0.0',
  setChannel(v){ this.channel = (v==='beta'?'beta':'stable'); localStorage.setItem('ota.channel', this.channel); },
  check(){ banner(`به‌روز هستید (${this.channel} / ${this.version})`, false); },
  update(){ banner('آپدیت انجام شد', false); location.reload(); }
};

export function initUpdateCenter(btn){
  btn?.addEventListener('click', ()=> OTA.check());
  document.getElementById('ch-stable')?.addEventListener('click', ()=>{ OTA.setChannel('stable'); banner('کانال Stable فعال شد', false); });
  document.getElementById('ch-beta')?.addEventListener('click', ()=>{ OTA.setChannel('beta');   banner('کانال Beta فعال شد', false); });
  document.getElementById('btnCheckUpd')?.addEventListener('click', ()=> OTA.check());
}

function banner(msg, showAction){
  const t = document.getElementById('toast'); if(!t) return;
  t.textContent = msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'), 2200);
}
