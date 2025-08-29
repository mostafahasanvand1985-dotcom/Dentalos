// مرکز بروزرسانی سبک (کانال‌ها + نسخه)
const UPDATE={
  channel: localStorage.getItem('upd.channel') || 'stable', // stable | beta
  version: 'v60',
  async check(){ return {latest:'v60', notes:'Initial GH Pages build'}; },
  switch(ch){ this.channel=ch; localStorage.setItem('upd.channel',ch); }
};
window.UPDATE=UPDATE;
