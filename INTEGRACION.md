# 🎯 Guía de Ejecución - Backend + Frontend Integrado

## Requisitos
- Node.js 18+
- npm o yarn

## 📦 Instalación Inicial

### 1. Instalar dependencias del backend
```bash
cd backend
npm install
npx prisma generate
```

### 2. Instalar dependencias del frontend
```bash
cd frontend
npm install
```

## 🚀 Ejecución

### Opción 1: Ejecución en Producción (Recomendado)
```bash
cd backend
npm run start
```
Esto compilará el frontend y ejecutará el servidor en `http://localhost:3000`

### Opción 2: Ejecución en Desarrollo
**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
- Backend: `http://localhost:3000` (API)
- Frontend: `http://localhost:5173` (Vite Dev Server)

### Opción 3: Build Manual
```bash
# Compilar frontend
cd frontend
npm run build

# Ejecutar backend con frontend compilado
cd ../backend
npm run dev
```

### Opción 4: Frontend-only (sin backend)
Si quieres que toda la app funcione solo desde el frontend (datos en memoria), puedes ejecutar únicamente el servidor de desarrollo de Vite.

```bash
cd frontend
npm run dev
# Abre http://localhost:5173
```

En este modo las operaciones CRUD se simulan en memoria dentro del frontend y no requieren un backend ni base de datos.

## 📝 Configuración

### Variables de Entorno del Backend
Crear archivo `.env` en `backend/`:
```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

### Variables de Entorno del Frontend
El archivo `.env` en `frontend/` está configurado automáticamente:
```env
REACT_APP_API_URL=
VITE_API_URL=http://localhost:3000
```
(Dejar vacío en producción para usar el mismo origen)

## 🗄️ Base de Datos

### Generar/Actualizar Schema
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### Ver datos en Prisma Studio
```bash
cd backend
npx prisma studio
```

## 📁 Estructura del Proyecto

```
proyecto_surtitelas/
├── backend/              # Servidor Express + API
│   ├── server.js        # Servidor principal
│   ├── prisma/          # ORM
│   └── package.json
├── frontend/            # React + Vite + TypeScript
│   ├── src/
│   ├── dist/            # Build compilado (generado)
│   └── package.json
```

## 🔄 Flujo Integrado

1. **Backend** sirve archivos estáticos del frontend desde `frontend/dist/`
2. **Frontend** hace llamadas a API a `/api/*` (mismo servidor)
3. **Todas las rutas** que no sean API, sirven `index.html` (React Router)

## 🐛 Solución de Problemas

### "Cannot GET /path"
- Asegúrate de compilar el frontend: `npm run build` en la carpeta `frontend/`
- Verifica que exista la carpeta `frontend/dist/`

### "Cannot fetch /api/..."
- Verifica que el backend esté ejecutándose
- Revisa las rutas de API en `backend/server.js`

### Puerto ya en uso
- Modifica el puerto en `backend/server.js` o usa `PORT=4000 npm run dev`
