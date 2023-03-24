const CACHE_NAME = 'v1';

const CACHE_URLS = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/logo.svg",
  "/paramore/crushcrushcrush"
]

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME);

  try {
    await cache.addAll(resources);
  } catch (err) {
    console.error(err);
  }
};

self.addEventListener("install", async function (event) {
  console.log("Service Worker installed");

  event.waitUntil(
    caches.open("v1")
      .then((cache) => cache.addAll([
        "/", 
        '/logo.svg', 
        '/paramore/crushcrushcrush',
        '/macy-gray/i-try'
      ]))
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event);
  event.respondWith(async function() {
     try{
       const res = await fetch(event.request);
       const cache = await caches.open(CACHE_NAME);
       cache.put(event.request.url, res.clone());
       return res;
     }
     catch(error){
       return caches.match(event.request);
      }
    }());
});