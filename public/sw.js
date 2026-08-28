const CACHE='statement-bridge-v1';
const SHELL=['/','/demo','/privacy','/terms','/manifest.webmanifest','/icon.svg'];
self.addEventListener('install', event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate', event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event=>{if(event.request.method!=='GET')return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const copy=response.clone();if(response.ok&&new URL(event.request.url).origin===location.origin)caches.open(CACHE).then(c=>c.put(event.request,copy));return response;}).catch(()=>event.request.mode==='navigate'?caches.match('/'):(cached||Response.error()))));});
