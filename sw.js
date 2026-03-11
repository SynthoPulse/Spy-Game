const CACHE_NAME = 'spygame-v-final-fix'; // تم تغيير الإصدار لفرض التحديث

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './icon512.png'
];

self.addEventListener('install', (e) => {
    // نقوم بتخزين الملفات الأساسية فوراً
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (e) => {
    // الاستراتيجية الجديدة: الملفات المحلية أولاً (Cache First)
    // هذا يمنع مشكلة الشاشة البيضاء عند فصل الإنترنت
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
