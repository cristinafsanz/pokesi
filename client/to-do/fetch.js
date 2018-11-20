import { isClientURL } from '../utils/is-app-url'

/**
 * Intercepts a FetchEvent and responds with cached content
 * @param {FetchEvent} event
 * @param {string} cacheVersion
 */
async function respondWithCachedContent (event, cacheVersion) {
  const url = event.request.url
  const cache = await caches.open(cacheVersion)
  let response = await cache.match(url)

  if (!response) {
    try {
      response = await fetch(url);
    } catch(error) {
      if (isClientURL(url)) {
        response = await cache.match('/index.html')
      } else {
        response = await cache.match('/404.html')
      }
    }
  }

  return response
}

export {
  respondWithCachedContent
}
