const DB_NAME = "DentalOS";
const DB_VERSION = 1;
const STORES = ["patients","finance","appointments","lab","inventory","implants","doctors","audit","meta"];

let db;
const req = indexedDB.open(DB_NAME, DB_VERSION);

req.onupgradeneeded = e => {
  db = e.target.result;
  STORES.forEach(store => {
    if (!db.objectStoreNames.contains(store)) {
      db.createObjectStore(store, { keyPath: "id", autoIncrement: true });
    }
  });
};

req.onsuccess = e => { db = e.target.result; };