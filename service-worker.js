self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("dentalos-v1").then(cache => {
      return cache.addAll([
        "index.html","styles.css","app.js","db.js",
        "rbac.js","update-center.js","manifest.json","logo-main.png"
      ]);
    })
  );
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});