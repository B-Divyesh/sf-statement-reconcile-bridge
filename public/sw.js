const CACHE = 'statement-bridge-v3';
const SHELL = ['/', '/demo', '/work', '/privacy', '/terms', '/manifest.webmanifest', '/icon.svg', '/icon-192.png', '/icon-512.png'];
self.addEventListener('install', event => event.waitUntil((async () => {
  await caches.open(CACHE).then(cache => cache.addAll(SHELL));
})()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  await self.clients.claim();
  await Promise.all((await caches.keys()).filter(key => key !== CACHE).map(key => caches.delete(key)));
})()));
self.addEventListener('message', event => { if (event.data?.type === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    if (response.ok && new URL(event.request.url).origin === location.origin) caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => event.request.mode === 'navigate' ? caches.match('/') : Response.error())));
});
