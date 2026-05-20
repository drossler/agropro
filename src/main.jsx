import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: '/'
    }).then(reg => {
      console.log('✓ Service Worker registrado correctamente');
    }).catch(err => {
      console.log('Service Worker error:', err.message);
    });
  });
}

const updateOnlineStatus = () => {
  if (navigator.onLine) {
    console.log('✓ Conectado');
    document.documentElement.setAttribute('data-online', 'true');
  } else {
    console.log('✗ Modo offline');
    document.documentElement.setAttribute('data-online', 'false');
  }
};

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

document.addEventListener('touchmove', (e) => {
  if (e.scale !== 1) {
    e.preventDefault();
  }
}, { passive: false });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)