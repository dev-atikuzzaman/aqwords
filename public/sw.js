// সার্ভিস ওয়ার্কার — অফলাইন সাপোর্টের জন্য রানটাইম ক্যাশিং।
// বিল্ড-টাইম হ্যাশড ফাইলনেম আগে থেকে জানা সম্ভব নয় বলে (স্ট্যাটিক এক্সপোর্ট),
// প্রথমবার ভিজিটের সময় প্রতিটি রিসোর্স ক্যাশ করে রাখা হয় (cache-first, network fallback)।
const CACHE_NAME = 'quran-dictionary-v1'
const APP_SHELL = ['/', '/manifest.json', '/favicon.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.g')) return

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
        .catch(() => cached)

      return cached || networkFetch
    })
  )
})
