const CACHE_NAME = 'agropro-v1';
const RUNTIME_CACHE = 'agropro-runtime';

// INSTALACIÓN
self.addEventListener('install', event => {
  console.log('✓ Service Worker instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('✓ Cache inicializado');
      return Promise.resolve();
    }).catch(err => {
      console.log('Cache error:', err);
    })
  );
  self.skipWaiting();
});

// ACTIVACIÓN
self.addEventListener('activate', event => {
  console.log('✓ Service Worker activado');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE)
          .map(cacheName => {
            console.log('Eliminando cache antigua:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  self.clients.claim();
});

// FETCH - NETWORK FIRST CON FALLBACK A CACHE
self.addEventListener('fetch', event => {
  // Solo aplicar para requests GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Ignorar requests a Chrome extensions, servicios, etc.
  if (event.request.url.includes('chrome-extension://') || 
      event.request.url.includes('moz-extension://')) {
    return;
  }

  event.respondWith(
    fetch(event.request, { credentials: 'same-origin' })
      .then(response => {
        // Solo cachear respuestas exitosas
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clonar la respuesta
        const responseClone = response.clone();
        
        // Guardar en cache de runtime
        caches.open(RUNTIME_CACHE).then(cache => {
          cache.put(event.request, responseClone).catch(err => {
            console.log('Cache write error:', err);
          });
        });
        
        return response;
      })
      .catch(() => {
        // Si no hay red, usar cache
        return caches.match(event.request).then(response => {
          if (response) {
            return response;
          }
          
          // Fallback para requests que fallan
          if (event.request.destination === 'document') {
            return caches.match('/') || new Response('Sin conexión', { status: 503 });
          }
          
          return new Response('Sin conexión', { status: 503 });
        });
      })
  );
});

// BACKGROUND SYNC (si está soportado)
if ('sync' in self) {
  self.addEventListener('sync', event => {
    if (event.tag === 'sync-production-data') {
      event.waitUntil(Promise.resolve());
    }
  });
}

// NOTIFICACIONES PUSH (si está soportado)
if ('PushMessageData' in self) {
  self.addEventListener('push', event => {
    try {
      const data = event.data ? event.data.json() : { title: 'AgroPro' };
      const options = {
        body: data.body || 'Nueva notificación',
        icon: '/assets/icon.png',
        badge: '/assets/badge.png',
        tag: 'agropro-notification'
      };
      
      event.waitUntil(
        self.registration.showNotification(data.title || 'AgroPro', options)
      );
    } catch (err) {
      console.log('Push notification error:', err);
    }
  });
}

// MANEJO DE CLICS EN NOTIFICACIONES
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // Buscar si ya hay una ventana abierta
      for (let client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      // Si no, abrir una nueva
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

console.log('✓ Service Worker cargado correctamente');
