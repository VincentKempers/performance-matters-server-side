this.addEventListener('install', function(event){
  event.waitUntil(
    caches.open('poster-v1')
    .then(cache => cache.addAll([
      '/offline',
      '../index.css',
      '../bundle.js'
    ]))
    .then(this.skipWaiting())
  )
});

this.addEventListener('fetch', function(event) {
  const request = event.request;
  if(request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => cachePage(request, response))
        .catch(error => fetchCachedPage(request))
        .catch(error => fetchOnlineFiles('/offline'))
    );
  } else {
    event.respondWith(
      fetch(request)
        .catch(error => fetchOnlineFiles(request.url))
    );
  }
});

function fetchOnlineFiles(url) {
  return caches.open('poster-v1')
  .then(cache => cache.match(url))
  .then(response => response ? response : Promise.reject());
}

function fetchCachedPage(request) {
  return caches.open('poster-v1-pages')
  .then(cache => cache.match(request))
  .then(response => response ? response : Promise.reject());
}

function cachePage(request, response) {
  const clonedResponse = response.clone();
  caches.open('poster-v1-pages')
    .then(cache => cache.put(request, clonedResponse));
    return response;
}
