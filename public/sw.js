const CACHE_NAME = 'v1';

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

  const paths = await (await fetch('https://api.chorditure.com/.netlify/functions/get-paths')).json();

  event.waitUntil(
    caches.open("v1")
      .then((cache) => cache.addAll([
        "/", 
        '/logo.svg', 
        ...paths
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