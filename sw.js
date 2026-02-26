const CACHE_NAME = 'spygame-v3';

self.addEventListener('install', (e) => {
    self.skipWaiting(); // يجبر المشغل الجديد على العمل فوراً
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache); // يمسح أي تصميم قديم
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (e) => {
    // جلب البيانات من الإنترنت دائماً لتجنب تعليق التحديثات
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request)) 
    );
});
