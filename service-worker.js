self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("dentalos-cache").then(cache => {
      return cache.addAll([
        "./DentalOS_FINAL_UNIFIED.html",
        "./manifest.json",
        "./icon.png"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
