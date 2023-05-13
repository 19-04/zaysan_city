self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-cache').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/about.html',
          '/blog.html',
          '/contact.html',
          '/politic.html',
          '/portfolio.html',
          '/service.html',
          '/single.html',
          '/team.html',
          '/styles.css',
          '/script.js',
          '/manifest.json',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  