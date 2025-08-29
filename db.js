// DB v1: stores پایه
const DB_NAME = 'dentalos';
const DB_VERSION = 1;
let db;

export async function openDB(){
  if (db) return db;
  db = await new Promise((res, rej)=>{
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e=>{
      const d = req.result;
      if (!d.objectStoreNames.contains('meta')) d.createObjectStore('meta', {keyPath:'key'});
      ['patients','finance','lab','inventory','appointments','implants','doctors','audit']
        .forEach(n=>{ if(!d.objectStoreNames.contains(n)) d.createObjectStore(n, {keyPath:'id'}) });
    };
    req.onsuccess = ()=>res(req.result);
    req.onerror = ()=>rej(req.error);
  });
  await ensureSeed();
  return db;
}

async function ensureSeed(){
  const tx = db.transaction('meta','readwrite');
  const meta = tx.objectStore('meta');
  const v = await meta.get('schema');
  if (!v){
    await meta.put({key:'schema', value:'1.0', ts: Date.now()});
    await meta.put({key:'seedApplied', value:true, ts: Date.now()});
    // seed اولیه
    const doctors = db.transaction('doctors','readwrite').objectStore('doctors');
    await doctors.put({id:'dr-mina', name:'Mina', share:50});
    await doctors.put({id:'dr-mehdi', name:'Mehdi', share:50});
  }
}
