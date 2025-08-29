self.skipWaiting && self.skipWaiting();
self.clients && self.clients.claim && self.clients.claim();

const CACHE = 'dentalos-v60-1';
const ASSETS = [
  './','./index.html','./styles.css','./app.js','./db.js','./rbac.js','./update-center.js',
  './manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./header-logo.png'
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});
