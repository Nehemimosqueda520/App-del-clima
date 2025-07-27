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

const nextCacheName = caches.keys().then(keys => {
  const versions = keys
    .filter(k => k.startsWith(CACHE_PREFIX))
    .map(k => parseInt(k.replace(CACHE_PREFIX, ''), 10))
    .filter(n => !isNaN(n));
  const next = versions.length ? Math.max(...versions) + 1 : 1;
  return `${CACHE_PREFIX}${next}`;
});

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    nextCacheName.then(name => caches.open(name).then(cache => cache.addAll(ASSETS_TO_CACHE)))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    nextCacheName.then(name =>
      caches.keys().then(keys =>
        Promise.all(
          keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== name)
            .map(key => caches.delete(key))
        )
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    nextCacheName.then(cacheName => {
      if (event.request.mode === 'navigate') {
        return fetch(event.request)
          .then(response => {
            const clone = response.clone();
            caches.open(cacheName).then(cache => cache.put(event.request, clone));
            return response;
          })
          .catch(() => caches.match('/offline.html'));
      }

      if (event.request.url.startsWith(self.location.origin)) {
        return caches.match(event.request).then(cached => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            if (networkResponse && networkResponse.ok) {
              caches.open(cacheName).then(cache => cache.put(event.request, networkResponse.clone()));
            }
            return networkResponse;
          }).catch(() => cached);

          return cached || fetchPromise;
        });
      }

      return fetch(event.request);
    })
  );
});
