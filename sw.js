const CACHE_NAME = 'shorouk-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/en/index.html',
    '/assets/css/style.css',
    '/assets/js/main.js',
    '/assets/images/logo.png',
    '/assets/images/hero.png',
    '/assets/images/favicon.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
