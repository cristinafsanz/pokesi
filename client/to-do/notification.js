let serviceWorkerRegistration = null

function setServiceWorkerRegistration (_serviceWorkerRegistration) {
  serviceWorkerRegistration = _serviceWorkerRegistration
}

/**
 * Sends a native notification
 * @param {string} title
 * @param {string} body
 */
function sendNotification(title, body) {
  if ('Notification' in global) {
    if (Notification.permission === 'granted') {
      // Crear notificación
      const options = {
        body,
        tag: 'poke-ready',
        lang: 'es',
        icon: '/img/favicon/192x192.png',
        renotify: true,
      }

      new Notification(title, options)
      
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(permission => {
        if (permission === 'granted') {
          sendNotification(title, body)
        }
      })
    }
  }
}

export {
  sendNotification,
  setServiceWorkerRegistration
}
