self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

// Admin pages and auth responses always come from the network. Keep no private data on disk.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.mode !== "navigate" || event.request.method !== "GET" || url.origin !== self.location.origin || !url.pathname.startsWith("/admin")) return;

  event.respondWith(
    fetch(event.request).catch(() =>
      new Response("<!doctype html><html lang=\"en\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><meta name=\"theme-color\" content=\"#023220\"><title>Evermore Admin is offline</title><body style=\"margin:0;min-height:100vh;display:grid;place-items:center;background:#023220;color:#fbf8f1;font:1.1rem system-ui,sans-serif;text-align:center\"><main><h1>You’re offline</h1><p>Reconnect to use Evermore Equine Admin.</p><a style=\"color:inherit\" href=\"/admin\">Try again</a></main></body></html>",
        { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 503 }
      )
    )
  );
});
