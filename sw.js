const CACHE = 'aa-shop-v9';
const FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/nio.jpg',
  '/nio_15_b.jpg',
  '/364371910_max.jpg',
  '/st_7c.jpg',
  '/st_7c_1.jpg',
  '/st_7c_2.jpg',
  '/st_7c3.jpg',
  '/radio_221.jpg',
  '/radio_22.jpg',
  '/radio225.jpg',
  '/radio_224.jpg',
  '/radipo_223.jpg',
  '/radio_2226.jpg',
  '/kk8108t_1.jpg',
  '/kk8108t_2.jpg',
  '/pl990_1.jpg',
  '/pl990_2.jpg',
  '/pl990_3.jpg',
  '/pl990_4.jpg',
  '/pl990_5.jpg',
  '/pl990_6.jpg',
  '/pl310_1.jpg',
  '/pl310_2.jpg',
  '/pl310_3.jpg',
  '/pl310_4.jpg',
  '/pl310_5.jpg',
  '/pl310_6.jpg',
  '/pl310_7.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return Promise.allSettled(FILES.map(f => cache.add(f)));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/index.html')))
  );
});
