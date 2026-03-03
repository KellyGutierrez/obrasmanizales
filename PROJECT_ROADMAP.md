# Obras Manizales - Visor Estratégico

Este proyecto es una plataforma de transparencia y gestión de infraestructura urbana para la ciudad de Manizales, inspirada en el centro de control de Medellín.

## 🚀 Bases Fundamentales del Proyecto

Para llevar este prototipo a una solución de producción a nivel gubernamental, se deben seguir estos pilares:

### 1. Integración de Datos Real (Backend)
- **API REST/GraphQL**: Migrar de `projects.ts` (mock) a una base de datos PostgreSQL con PostGIS para manejo geográfico.
- **CMS para Contratistas**: Un panel donde los ingenieros de obra puedan subir fotos de drones, actualizar el % de avance y cargar archivos PDF de actas.

### 2. Capas Geográficas (GIS)
- **GeoJSON de Manizales**: Cargar los polígonos de las comunas y corregimientos para que el mapa muestre sombreados según la inversión por zona.
- **Mapbox SDK**: Si se requiere mayor impacto visual (vistas 3D de terrenos), se recomienda migrar de Leaflet a Mapbox GL JS.

### 3. Visualización de Datos Avanzada
- **Dashboards Ejecutivos**: Integrar gráficos de Recharts para mostrar:
  - Distribución de presupuesto por categoría.
  - Curva S de avance (Planeado vs. Real).
  - Cronograma de entregas por año.

### 4. Seguimiento Visual (Multimedia)
- **Time-lapse**: Implementar una galería que permita deslizar entre el render inicial y el estado actual de la obra.
- **Integración con Drones**: Módulo para visualizar videos 4K de sobrevuelos.

## 🛠 Stack Tecnológico Implementado

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4 + Modern CSS
- **Mapa**: Leaflet.js
- **Animaciones**: Framer Motion
- **Iconografía**: Lucide React

## 📦 Ejecución Local

1. Instalar dependencias: `npm install`
2. Correr servidor de desarrollo: `npm run dev`
3. Abrir: `http://localhost:3000`
