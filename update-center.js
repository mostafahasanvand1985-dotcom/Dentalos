export function initUpdateCenter(btn){
  btn.addEventListener('click', ()=>{
    const toast = document.getElementById('toast');
    toast.textContent = 'Update Center: کانال Stable (خودکار) فعال است.';
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'), 2200);
  });
}
