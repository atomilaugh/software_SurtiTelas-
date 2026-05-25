#!/bin/bash

# Script de instalación rápida para el proyecto
echo ""
echo "========================================"
echo "Instalando proyecto Surtitelas"
echo "========================================"
echo ""

echo "[1/3] Instalando dependencias del backend..."
cd backend
npm install
npx prisma generate
cd ..

echo ""
echo "[2/3] Instalando dependencias del frontend..."
cd frontend
npm install
cd ..

echo ""
echo "[3/3] Compilando frontend..."
cd frontend
npm run build
cd ..

echo ""
echo "========================================"
echo "✓ Instalación completada!"
echo "========================================"
echo ""
echo "Para ejecutar el proyecto:"
echo ""
echo "Opción 1 (Producción - Recomendado):"
echo "  cd backend"
echo "  npm run start"
echo ""
echo "Opción 2 (Desarrollo):"
echo "  Terminal 1: cd backend && npm run dev"
echo "  Terminal 2: cd frontend && npm run dev"
echo ""
