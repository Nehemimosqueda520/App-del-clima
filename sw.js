const CACHE_PREFIX = 'climapp-cache-v';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/style.css',
  '/js/main.js',
  '/js/api.js',
  '/js/ui.js',
  '/js/lang.js',
  '/js/toggleTheme.js',
  '/images/sun.png',
  '/manifest.json'
];

// Se genera un nombre único para la caché utilizando la fecha actual.
// Al activarse un service worker nuevo se eliminarán las cachés que
// no coincidan con este nombre para conservar sólo la versión más reciente.
const CACHE_NAME = `${CACHE_PREFIX}${Date.now()}`;

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith((async () => {
    if (event.request.mode === 'navigate') {
      try {
        const response = await fetch(event.request);
        const clone = response.clone();
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, clone);
        return response;
      } catch {
        return caches.match('/offline.html');
      }
    }

    if (event.request.url.startsWith(self.location.origin)) {
      const cached = await caches.match(event.request);
      const fetchPromise = fetch(event.request)
        .then(async networkResponse => {
          if (networkResponse && networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => cached);

      return cached || fetchPromise;
    }

    return fetch(event.request);
  })());
});
