# 💻 Instalar AgroPro en Tu PC

Guía completa para Windows, Mac o Linux.

---

## 🔧 Paso 1: Instalar Node.js (PRIMERO)

Node.js es lo que necesitas para correr React.

### Windows:
1. Ir a: https://nodejs.org/
2. Descargar **LTS** (la versión estable, la más grande)
3. Ejecutar el instalador
4. Siguiente, siguiente, siguiente, instalar
5. Reiniciar PC

### Mac:
```bash
# Opción 1: Descargar de https://nodejs.org/
# Opción 2: Si tienes Homebrew:
brew install node
```

### Linux:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

### Verificar instalación:
Abrir terminal/cmd y ejecutar:
```bash
node --version
npm --version
```

Deberías ver versiones (ej: v20.10.0, 10.2.3). Si funciona ✓, pasamos al paso 2.

---

## 📁 Paso 2: Descargar Los Archivos

Tienes 2 opciones:

### Opción A: Carpeta Completa (Recomendado para empezar)

1. Crear carpeta `C:\Users\TuUsuario\Desktop\agropro` (Windows)
   o `~/Desktop/agropro` (Mac/Linux)

2. Descargar estos archivos en esa carpeta:
   - `package.json`
   - `vite.config.js`
   - `tailwind.config.js`
   - `postcss.config.js`
   - `index.html`
   - `index.css`
   - `main.jsx`
   - `App.jsx`
   - `manifest.json`
   - `service-worker.js`

3. Tu carpeta debe verse así:
```
agropro/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── public/
│   ├── manifest.json
│   └── service-worker.js
└── src/
    ├── main.jsx
    ├── App.jsx
    └── index.css
```

### Opción B: Crear desde cero con Vite (Más limpio)

Terminal/Cmd:

```bash
# Ir al Desktop
cd Desktop

# Crear proyecto Vite
npm create vite@latest agropro -- --template react

# Entrar en carpeta
cd agropro

# Instalar dependencias
npm install
```

Luego copiar los archivos descargados encima.

---

## 🚀 Paso 3: Abrir Terminal en la Carpeta

### Windows (PowerShell o CMD):
```
1. Mantén presionada tecla Shift
2. Click derecho en la carpeta agropro
3. Selecciona "Abrir terminal aquí" o "Open PowerShell window here"
```

O manualmente:
```
1. Abre CMD/PowerShell
2. Ejecuta: cd C:\Users\TuUsuario\Desktop\agropro
```

### Mac/Linux:
```bash
cd ~/Desktop/agropro
# o donde pusiste la carpeta
```

---

## 📦 Paso 4: Instalar Dependencias

En la terminal (dentro de la carpeta agropro):

```bash
npm install
```

Esto descarga React, Tailwind, Recharts, etc.

**Espera a que termine** (puede tomar 1-2 minutos).

Verás al final algo como:
```
added XXX packages
```

---

## 🎯 Paso 5: Iniciar Servidor Local

Aún en la terminal, ejecuta:

```bash
npm run dev
```

**Resultado esperado**:
```
  VITE v5.0.8  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## 🌐 Paso 6: Abrir en Navegador

Abre cualquier navegador (Chrome, Firefox, Safari):

**URL**: http://localhost:5173/

**Deberías ver**:
- Pantalla de login de AgroPro
- Logo 🐄 AgroPro
- Campo correo y contraseña
- Botón ingresar

---

## ✅ Paso 7: Usar la App

1. **Login**: Escribe cualquier correo y contraseña (es demo)
2. **Dashboard**: Ves los litros de hoy, vacas, etc.
3. **Ganado**: Busca y filtra animales
4. **Producción**: Registra ordeño rápidamente
5. **Reportes**: Gráficos de producción
6. **Alertas**: Monitoreo de eventos

---

## 🛑 Detener el servidor

En la terminal, presiona:

```
Ctrl + C
```

(Detiene el servidor, puedes volver a hacer `npm run dev` después)

---

## 🏗️ Paso 8: Build para Producción (Opcional)

Cuando quieras desplegar a Netlify:

```bash
npm run build
```

Esto crea una carpeta `dist/` con archivos optimizados.

```bash
npm run preview
```

Previsualizas cómo se verá en producción.

---

## 🎨 Editar la App

Con un editor de código (VSCode, Sublime, etc.):

1. Abre la carpeta `agropro` en tu editor
2. Modifica archivos en `src/`
3. Guarda (Ctrl+S)
4. El navegador se actualiza automáticamente

---

## 🐛 Si algo falla

### "npm command not found"
```
Node.js no instaló bien. Reinstala desde https://nodejs.org/
```

### "Cannot find module 'react'"
```bash
Ejecuta: npm install
Cierra y reabre la terminal
```

### "Port 5173 is already in use"
```bash
# Opción 1: Cierra otras pestañas/apps que usen ese puerto
# Opción 2: Usa otro puerto:
npm run dev -- --port 3000
# Luego abre http://localhost:3000
```

### "Página en blanco"
```
1. Presiona F12 (DevTools)
2. Mira Console por errores rojos
3. Si dice module error: npm install
4. Si es CSS: npm run build && npm run preview
```

### "Service Worker error"
```
Es NORMAL en localhost. La app funciona igual.
Solo afecta en HTTPS (Netlify/Vercel funciona bien).
```

---

## 📋 Checklist Instalación

```
✅ Node.js instalado (npm --version funciona)
✅ Carpeta agropro creada
✅ Archivos descargados en la carpeta
✅ npm install ejecutado
✅ npm run dev sin errores
✅ http://localhost:5173/ abre en navegador
✅ Login funciona
✅ Dashboard se ve bien
```

---

## 🎓 Comandos Importantes

```bash
npm run dev      # Iniciar servidor local
npm run build    # Build para producción
npm run preview  # Ver el build localmente
npm install      # Instalar dependencias (si agregaste paquetes)
npm install -D tailwindcss  # Agregar un paquete nuevo
```

---

## 💡 Tips

- **Cambios en vivo**: Edita `src/App.jsx`, guarda, el navegador se actualiza automáticamente
- **DevTools Chrome**: F12 > Console > mira los mensajes
- **Network offline**: F12 > Network > Offline > prueba app sin internet
- **Responsive**: F12 > Device Toggle (📱) > prueba en móvil virtual

---

## 🚀 Próximos Pasos

Después de que funcione localmente:

1. **Personalizar datos**: Edita mock animals en `App.jsx`
2. **Cambiar colores**: Edita `tailwind.config.js`
3. **Agregar Firebase**: Para sincronización real
4. **Desplegar a Netlify**: Cuando estés listo

---

## 📞 Atajos de Terminal

```bash
# Ir a una carpeta
cd ruta/de/la/carpeta

# Listar archivos
ls (Mac/Linux) o dir (Windows)

# Crear carpeta
mkdir nombre-carpeta

# Ver ruta actual
pwd

# Limpiar pantalla
clear (Mac/Linux) o cls (Windows)

# Salir de carpeta
cd ..
```

---

## ✨ Listo!

Si llegaste aquí y la app funciona:

✅ Tienes AgroPro corriendo localmente
✅ Puedes editarla libremente
✅ Estás listo para desplegar cuando quieras

**Próximo paso**: Deploy a Netlify (ver DEPLOY.md)

---

**Preguntas?** Revisa SETUP.md o abre la consola (F12) para ver errores específicos.

🐄 **¡Bienvenido a AgroPro!**
