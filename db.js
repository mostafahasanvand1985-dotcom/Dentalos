// IndexedDB پایه: dentalos(v1) — استور meta برای دمو
const DB_NAME='dentalos', DB_VER=1; let db;

function openDB(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(DB_NAME,DB_VER);
    req.onupgradeneeded=e=>{
      const d=e.target.result;
      if(!d.objectStoreNames.contains('meta')) d.createObjectStore('meta',{keyPath:'key'});
    };
    req.onsuccess=e=>{db=e.target.result;resolve(db)};
    req.onerror=e=>reject(e.target.error);
  });
}
async function metaSet(key,value){
  if(!db) await openDB();
  return new Promise((res,rej)=>{
    const tx=db.transaction('meta','readwrite');
    tx.objectStore('meta').put({key,value,updatedAt:Date.now()});
    tx.oncomplete=()=>res(true); tx.onerror=e=>rej(e.target.error);
  });
}
async function metaGet(key){
  if(!db) await openDB();
  return new Promise((res,rej)=>{
    const tx=db.transaction('meta','readonly');
    const rq=tx.objectStore('meta').get(key);
    rq.onsuccess=()=>res(rq.result?.value); rq.onerror=e=>rej(e.target.error);
  });
}
window.DB={openDB,metaSet,metaGet};
