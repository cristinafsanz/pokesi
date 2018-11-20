# Taller Progressive Web Apps en acción

Taller hecho por Sarai Díaz (@saray_dg) y Pablo Molina (@p2kmgcl).

Presentación: http://bit.ly/pwas-commit

Repositorio: https://github.com/dgarciasarai/pokesi

  - Rama workshop-complete: aplicación final

  - Tag initial: para comenzar la aplicación

Se usó [hyperapp](https://github.com/jorgebucaran/hyperapp) para crear la aplicación.

El servidor devuelve un json.

PWA: Service worker + Manifest.json + App


## Pasos

- Fork del repositorio 

- Clonar el repositorio

```
git clone https://github.com/cristinafsanz/pokesi.git
```

- Situarse en el mismo commit que el tag, con una rama llamada "workshop":

```
git checkout -b workshop initial
```

- Instalar dependencias

```
npm install
```

- Arrancar cliente y servidor en 2 pestañas de la consola:

```
npm run start:client
npm run start:server
```

- Abrir el navegador: http://localhost:8080/#

## Notas tomadas en el taller

### History API

- Modificar el archivo `navigation.js` para escuchar los eventos de navegación:

  - saveNewHistoryState:

    - pushState sólo para guardar estado: `window.history.pushState(null, 'otro título', pathname)`.

  - listenToHistoryEvents:

    - Por otro lado se escucha evento: `window.addEventListener('popstate', callback)`.

- Modificar el archivo `notification.js` para crear una notificación:

  - sendNotification:

    - Se puede ver la notificación al dar a tramitar pedido.

### Service Worker

- Service Worker: Es necesario registrarlo e instalarlo para usarlo.

  - Un proceso que se ejecuta en segundo plano.

  - Modificar el archivo service-worker.js para registrarlo en nuestra app:

    - registerServiceWorker

    - handleServiceWorkerInstalled

    - handleServiceWorkerActivated

      - En developer tools: Application - Service Workers aparece.

      - Y en la consola: `'serviceWorker' in navigator ` devuelve `true`.

### Cache API

- Modificar el archivo cache.js para añadir el cliente a la caché. Mapear ASSET y hacer cache.add(assetURL)

  - addClientToCache: En el navegador en Application - Cache storage

  - addIngredientsToCache: Ahora salen cosas en Cache storage

  - clearOldCaches

### Service worker - Offline o 404

- Modificar el archivo fetch.js para mostrar una página. Si no obtiene respuesta, mirará si existe en caché y si no, devolverá una página 404

  - respondWithCachedContent: puedes poner offline en Developer Tools y sigue funcionando

  - handleServiceWorkerFetch (en service-worker.js)

- http://localhost:8080/noexisto
  respondWithCachedContent: Si no es url conocida que dé 404

### Manifest.json

- Manifest.json: es una aplicación no una página web (en la slide vienen todas en las notas del orador). Con el nombre ya valdría.
    "display": "standalone”, // Para que parezca una aplicación (se quite la barra de navegación)

- Add to home screen y te lo añade a aplicaciones de chrome: chrome://apps/

### Recursos

- [Workbox](https://developers.google.com/web/tools/workbox/): Librerías JS para añadir soporte offline a las web apps.

- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/): Auditar apps web

### Ficheros modificados

- client/to-do/navigation.js

- client/to-do/notification.js

- client/to-do/service-worker.js

- client/to-do/cache.js

- client/to-do/fetch.js

- client/to-do/manifest.json





