import 'babel-polyfill'
import { addClientToCache, addIngredientsToCache, clearOldCaches } from './cache'
import { respondWithCachedContent } from './fetch'
import { setServiceWorkerRegistration } from './notification'

/**
 * Register the service worker placed in /sw.js route
 */
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service worked registrado'))
      .catch(() => console.log('No se puede registrar'))
  }
}

/**
 * Executed when the service worker has been installed
 * @param {InstallEvent} event
 * @param {string} cacheVersion
 */
function handleServiceWorkerInstalled(event, cacheVersion) {
  console.log('ServiceWorked installed')

  const cachePromise = caches.open(cacheVersion).then(async cache => {
    await addClientToCache(cache)
    await addIngredientsToCache(cache)
  })

  event.waitUntil(cachePromise)
}

/**
 * Executed when the service worker has been activated
 * @param {ExtendableEvent} event
 * @param {string} cacheVersion
 */
function handleServiceWorkerActivated(event, cacheVersion) {
  console.log('ServiceWorked activated')

  event.waitUntil(clearOldCaches(cacheVersion))
}

/**
 * Executed when the service worker has been activated
 * @param {MessageEvent} event
 * @param {string} cacheVersion
 */
function handleServiceWorkerMessage(event, cacheVersion) {
}

/**
 * Executed when the service worker has been activated
 * @param {FetchEvent} event
 * @param {string} cacheVersion
 */
function handleServiceWorkerFetch(event, cacheVersion) {
  if (event.request.method === 'GET') {
    event.respondWith(
      respondWithCachedContent(event, cacheVersion)
    )
  }
}

export {
  registerServiceWorker,
  handleServiceWorkerInstalled,
  handleServiceWorkerActivated,
  handleServiceWorkerMessage,
  handleServiceWorkerFetch
}
