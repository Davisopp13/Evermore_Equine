const CACHE_NAME = "evermore-public-offline-v1";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll([OFFLINE_URL, "/icons/site-192.png"])));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("evermore-public-") && key !== CACHE_NAME).map((key) => caches.delete(key)))),
      self.clients.claim(),
    ])
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.mode !== "navigate" || event.request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/admin") || url.pathname.startsWith("/api")) return;

  event.respondWith(fetch(event.request).catch(() => caches.match(OFFLINE_URL)));
});
