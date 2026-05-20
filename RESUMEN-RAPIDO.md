# ⚡ AgroPro - 5 Pasos Rápidos

## Paso 1: Instalar Node.js

Descargar desde: https://nodejs.org/ (versión LTS)

Ejecutar instalador y seguir pasos.

Verificar:
```bash
node --version
npm --version
```

---

## Paso 2: Descargar Archivos

Crear carpeta `agropro` en tu Desktop.

Descargar estos 10 archivos en la carpeta:

```
package.json
vite.config.js
tailwind.config.js
postcss.config.js
index.html
main.jsx
App.jsx
index.css
manifest.json
service-worker.js
```

Crear dentro de `agropro/`:
- Carpeta `src/` → poner main.jsx, App.jsx, index.css
- Carpeta `public/` → poner manifest.json, service-worker.js
- Archivos `.js` y `.json` en raíz de `agropro/`

---

## Paso 3: Abrir Terminal

Windows: Click derecho en carpeta agropro > "Abrir terminal aquí"

Mac/Linux:
```bash
cd ~/Desktop/agropro
```

---

## Paso 4: Instalar Dependencias

```bash
npm install
```

Espera a que termine (1-2 minutos).

---

## Paso 5: Iniciar App

```bash
npm run dev
```

Abrir navegador: http://localhost:5173/

**¡Listo! 🚀**

---

## Uso

**Login**: Cualquier correo y contraseña (es demo)

**Módulos**:
- Dashboard - Métricas principales
- Ganado - Gestión de animales
- Producción - Registro rápido de ordeño
- Reportes - Gráficos
- Alertas - Monitoreo

---

## Detener

```bash
Ctrl + C
```

---

## Volver a Iniciar

```bash
npm run dev
```

---

## Para Producción

```bash
npm run build
npm run preview

# Luego desplegar dist/ a Netlify/Vercel
```

---

## Editar

Abre `src/App.jsx` en cualquier editor y cambia lo que quieras.

Se actualiza automáticamente.

---

## Problemas?

Revisa `INSTALL.md` para troubleshooting completo.

---

🐄 **¡Así de fácil!**
