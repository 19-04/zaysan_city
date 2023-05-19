self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-cache').then(function(cache) {
        return cache.addAll([
          '/',
          '/zaysan_city/index.html',
          '/zaysan_city/about.html',
          '/zaysan_city/blog.html',
          '/zaysan_city/contact.html',
          '/zaysan_city/politic.html',
          '/zaysan_city/portfolio.html',
          '/zaysan_city/service.html',
          '/zaysan_city/single.html',
          '/zaysan_city/team.html',
          '/zaysan_city/styles.css',
          '/zaysan_city/script.js',
          '/zaysan_city/manifest.json',
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
  