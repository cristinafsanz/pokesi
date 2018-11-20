import {
  ASSETS,
  INGREDIENTS_URL,
  SERVER_URL,
  CLIENT_URL
} from "../utils/constants";

/**
 * Adds client base code to cache
 * @param {Cache} cache
 */
async function addClientToCache(cache) {
  const aLotOfPromisses = ASSETS.map(async asset => {
    const url = `${CLIENT_URL}/${asset}`

    await cache.add(url)
  })

  await Promise.all(aLotOfPromisses)
}

/**
 * Add all ingredients to cache
 * @param {Cache} cache
 */
async function addIngredientsToCache(cache) {
  const response = await fetch(INGREDIENTS_URL)
  
  cache.put(INGREDIENTS_URL, response.clone())

  const json = await response.json()

  const ingredientPromises = json.map(async ingredient => {
    const url = `${SERVER_URL}${ingredient.image}`

    await cache.add(url)
  })

  await Promise.all(ingredientPromises)
}

/**
 * Removes all existing caches except the given cacheVersion
 * @param {string} cacheVersion
 */
function clearOldCaches(cacheVersion) {
  return caches.keys().then(async cacheIds => {
    const deletePromises = cacheIds.forEach(async name => {
      if (name !== cacheVersion) {
        await caches.delete(name)
      }
    })

    await Promise.all(deletePromises)
  })
}

export {
  addClientToCache,
  addIngredientsToCache,
  clearOldCaches
}
