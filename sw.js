/* ============================================================
   Pépin — service worker : l'app s'ouvre même sans réseau.
   Version a785376916 (change à chaque mise à jour des fichiers).
   ============================================================ */
const CACHE = 'pepin-a785376916';
const ASSETS = ["./", "index.html", "firebase.js", "firebase-config.js", "manifest.webmanifest", "icons/apple-touch-icon.png", "icons/favicon-32.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "fonts/grandstander-latin-700-normal.woff2", "fonts/grandstander-latin-800-normal.woff2", "fonts/grandstander-latin-900-normal.woff2", "fonts/nunito-latin-600-normal.woff2", "fonts/nunito-latin-700-normal.woff2", "fonts/nunito-latin-800-normal.woff2", "fonts/nunito-latin-900-normal.woff2"];
const at = (p) => new URL(p, self.registration.scope).href;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(ASSETS.map(async (p) => {
      try {
        const res = await fetch(new Request(at(p), { cache: 'reload' }));
        if (res.ok) await cache.put(at(p), res);
      } catch (e) { /* sera mis en cache au prochain passage */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('pepin-') && k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

/* Page et configuration : réseau d'abord (3,5 s max), sinon la copie locale. */
async function networkFirst(req, key, revalidate) {
  const cache = await caches.open(CACHE);
  const net = (revalidate ? fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }) : fetch(req))
    .then((res) => { if (res && res.ok) cache.put(key, res.clone()); return res; });
  net.catch(() => {});
  const late = new Promise((resolve) => setTimeout(resolve, 3500, null));
  try {
    const first = await Promise.race([net, late]);
    if (first) return first;
  } catch (e) { /* hors ligne */ }
  const hit = await cache.match(key);
  return hit || net;
}

/* Le reste (code Firebase, polices, icônes) : copie locale d'abord. */
async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req, { ignoreSearch: true });
  if (hit) return hit;
  const res = await fetch(req);
  if (res && res.ok) cache.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') { event.respondWith(networkFirst(req, at('./'))); return; }
  if (url.pathname.endsWith('/firebase-config.js')) { event.respondWith(networkFirst(req, at('firebase-config.js'), true)); return; }
  event.respondWith(cacheFirst(req));
});
