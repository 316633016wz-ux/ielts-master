const CACHE = "ielts-master-v6";
const ASSETS = ["/", "/index.html", "/styles/main.css", "/styles/components.css",
  "/styles/views.css", "/js/app.js", "/js/state.js", "/js/sync.js",
  "/js/utils/date.js", "/js/utils/score.js", "/js/utils/vocab-data.js",
  "/js/utils/ielts-4000-data.js",
  "/js/utils/plan.js", "/js/utils/sm2.js", "/js/utils/html.js",
  "/js/utils/question-bank-data.js",
  "/js/views/dashboard.js", "/js/views/plan.js", "/js/views/vocab.js",
  "/js/views/practice.js", "/js/views/notebook.js", "/js/views/mock.js",
  "/js/views/settings.js",
  "/manifest.webmanifest"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
      return cached ?? network;
    })
  );
});
