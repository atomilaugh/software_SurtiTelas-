# 📋 Resumen de Integración Backend + Frontend

## ✅ Cambios Realizados

### Backend (`backend/`)

#### 1. **server.js** - Configuración para servir frontend
- ✅ Agregado servicio de archivos estáticos desde `frontend/dist/`
- ✅ Rutas de API ahora bajo `/api/*`
- ✅ Fallback a `index.html` para React Router (SPA)
- ✅ Soporte para variables de entorno `PORT`

#### 2. **package.json** - Nuevos scripts
- `npm run build` - Compila el frontend
- `npm run start` - Compila frontend + ejecuta servidor
- `npm run dev:full` - Instala todo + ejecuta en desarrollo
- `npm run install:all` - Instala deps de ambos proyectos
- `postinstall` - Genera automáticamente tipos Prisma

#### 3. **.env** / **.env.example** - Variables de entorno
- `DATABASE_URL` - Conexión a base de datos
- `PORT` - Puerto del servidor (default: 3000)
- `NODE_ENV` - Entorno (development/production)

### Frontend (`frontend/`)

#### 1. **src/infrastructure/api/apiClient.ts** - NUEVO
- ✅ Cliente de API centralizado
- ✅ Helpers: `apiGet`, `apiPost`, `apiPut`, `apiDelete`
- ✅ Configuración automática de URL base
- ✅ Manejo de errores estándar

#### 2. **src/infrastructure/repositories/TelaRepository.ts**
- ✅ Ahora conecta al backend `/api/products`
- ✅ Fallback a datos locales si backend no disponible
- ✅ Usa el nuevo cliente de API

#### 3. **.env** / **.env.example** - Variables de entorno
- `VITE_API_URL` - URL del backend (dejar vacío en producción)

### Raíz del Proyecto (`/`)

#### 1. **INTEGRACION.md** - NUEVO
- Guía completa de instalación y uso
- Opciones de ejecución (desarrollo, producción)
- Solución de problemas

#### 2. **install.bat** - NUEVO (Windows)
- Script automatizado de instalación

#### 3. **install.sh** - NUEVO (Mac/Linux)
- Script automatizado de instalación

## 🚀 Cómo Ejecutar

### Opción 1: Producción (RECOMENDADO)
```bash
cd backend
npm run start
```
Abre `http://localhost:3000`

### Opción 2: Desarrollo
**Terminal 1:**
```bash
cd backend
npm run dev
```

**Terminal 2:**
```bash
cd frontend
npm run dev
```

### Opción 3: Instalación Automática
**Windows:**
```bash
install.bat
```

**Mac/Linux:**
```bash
bash install.sh
```

## 🏗️ Arquitectura

```
Cliente (Frontend - React)
         ↓
    http://localhost:3000
         ↓
Express Server (Backend)
    ├── /api/* → Rutas de API
    └── /* → Archivos estáticos (React Build)
         ↓
    Prisma ORM
         ↓
    Base de Datos
```

## 📦 Estructura de Carpetas

```
proyecto_surtitelas/
├── backend/
│   ├── server.js              (✅ Actualizado)
│   ├── package.json           (✅ Actualizado)
│   ├── .env                   (✅ Nuevo)
│   ├── .env.example           (✅ Nuevo)
│   ├── prisma/
│   └── node_modules/
│
├── frontend/
│   ├── src/
│   │   ├── infrastructure/
│   │   │   ├── api/
│   │   │   │   └── apiClient.ts    (✅ Nuevo)
│   │   │   └── repositories/
│   │   │       └── TelaRepository.ts (✅ Actualizado)
│   │   ├── presentation/
│   │   └── ...
│   ├── .env                   (✅ Nuevo)
│   ├── .env.example           (✅ Nuevo)
│   ├── dist/                  (Generado al compilar)
│   ├── package.json
│   └── vite.config.ts
│
├── INTEGRACION.md             (✅ Nuevo)
├── install.bat                (✅ Nuevo)
├── install.sh                 (✅ Nuevo)
└── CAMBIOS.md                 (Este archivo)
```

## 🔄 Flujo de Integración

1. **Frontend (React)** compila a archivos estáticos (`dist/`)
2. **Backend (Express)** sirve esos archivos
3. **Frontend (en navegador)** hace fetch a `/api/*`
4. **Backend** procesa requests y devuelve datos
5. **Frontend** actualiza UI con los datos

## 🔐 CORS

- ✅ CORS habilitado en Express
- ✅ Permite requests del mismo origen
- ✅ Seguro para producción

## 💾 Base de Datos

Ruta de API actualizada: `/api/products` (antes `/products`)

```bash
# Generar schema
npx prisma generate

# Crear migraciones
npx prisma migrate dev --name <nombre>

# Ver datos
npx prisma studio
```

## ⚠️ Notas Importantes

1. **Primera vez**: Ejecuta `npm run install:all` en `backend/` para instalar todo
2. **Build**: El frontend DEBE compilarse antes de ejecutar en producción
3. **Fallback**: Los repositorios tienen datos locales de backup si el backend falla
4. **CORS**: Está habilitado, pero en producción considera restringirlo

## 🐛 Debugging

### "Cannot GET /path"
```bash
# Asegúrate que dist/ existe
cd frontend && npm run build
```

### "Cannot fetch /api/..."
```bash
# Verifica que el backend esté corriendo
cd backend && npm run dev
```

### Puerto ocupado
```bash
PORT=4000 npm run start
```

---

**¡Listo! Tu proyecto está integrado. Ahora puedes tener frontend y backend en un único servidor. 🎉**
