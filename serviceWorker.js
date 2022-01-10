// JS file which runs all the time even if we close the page

// CACHE stands for storage of the browser
const CACHE_NAME = "version-1"
const urlsToCache = ["index.html"]

const self = this

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    // opening the caches
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")

      return cache.addAll(urlsToCache)
    })
  )
})



// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = []
  cacheWhitelist.push(CACHE_NAME)

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    )
  )
})