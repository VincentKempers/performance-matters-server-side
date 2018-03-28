# performance-matters-server-side

## Poster Paradiso
You can look up posters from old concerts! Of Paradiso

### How to run
`npm install`

First run
`npm run build`
bundle the files with JS

to run the server
`npm test`


## Performance



### Modules
* [expressJS](https://expressjs.com/)
* [Pug](https://pugjs.org/api/getting-started.html)
* [nodemon](https://nodemon.io/)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [browserify](http://browserify.org/)
* [path](https://nodejs.org/docs/latest/api/path.html)


### audits

![audit results!](docImages/audit.png)
_99! performance matters_

![audit results!](docImages/fast3g.png)
_Fast 3g Speeds_

![audit results!](docImages/slow3g.png)
_Slow 3g Speeds_


These audits were made after installing browserify!


## Progressive Webapp

So starting with this assignment I had an audit score of 27.

![the score of 45 :l](docImages/audit.png)

### Service Worker
A service worker is a virtual middleman that actually passes data through. When you have a server running and you _don't_ have a server running it wil make a request every single time. With a serverworker you can store it efficiently in the cash and make the client (the browser) talk to the serverworker instead of your server. This will make the experience a bit better.. Why? well for example:

- If the connection is poor of badly you can make your application still work. Pages that are cached will be showed anyway. if not? there will be an error page (you will need to have an error page).

- The call to server is minimum what means that the server can just be called when a user don't have a the page stored.

### My implementation of the service worker

The first thing the server worker does is getting the CSS the /offline page and the bundled JavaScript. He will cache this under cache name poster-v1. When there will be a new version you can just change the storage name to v2. In the the last `.then` we skipWaiting to stop the double refresh problem.
```JS
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
```

On the fetch (every time the client wants to go 'somewhere' in the app) we will use the event to read the request. From that request we will pick up the request and cache the page! When the page doesn't have the Cache it will get the server in on this. If that doesn't work show the offline page.

```JS
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
```

After implementating this cache it boosted alot of the Progressive web app chart.
What i ticked off was:
- [ ] Have an error page.
- [ ] Cache the error page.
- [ ] Have the cache .
![After the implementation of the service worker](docImages/without-any-icons.png)




### Sources
[Fetch event](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent)
[respondWith](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith)
[skipWaiting](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting)
[match](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
[caching-files-with-service-worker](https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker)
[Voorhoede workshop CMD, Thanks Voorhoede](https://github.com/voorhoede/workshop-cmd-pwa/)
