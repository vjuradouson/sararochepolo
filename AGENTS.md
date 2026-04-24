# 🚀 Next.js & Visual Excellence Standards (Agent Rules)
La versión de node utilizada es: v20.18.3

## 1. Core Tech Stack & Architecture (App Router Expert)
- **Framework:** Next.js 14+ (App Router). Priorizar **Server Components** por defecto. Usar `"use client"` solo cuando sea estrictamente necesario (hooks de estado o interactividad).
- **Rendering:** Forzar **Static Site Generation (SSG)** mediante `output: 'export'` en `next.config.js` siempre que sea posible para máxima velocidad.
- **Type Safety:** TypeScript estricto. Definir interfaces claras para las Props de cada componente.
- **Directory Structure:**
    - `app/`: Solo para archivos de routing (`page.tsx`, `layout.tsx`, `loading.tsx`).
    - `components/ui/`: Componentes base reutilizables (botones, inputs, tarjetas).
    - `components/sections/`: Secciones completas de la página (Hero, Portfolio, Contact).
    - `lib/`: Utilidades y configuraciones (framer-motion-variants.ts, utils.ts).

## 2. Visual Identity & Design Standards
- **Minimalism:** Priorizar el uso de "espacio negativo" (whitespace). Escalas de espaciado generosas (`py-16` a `py-24`) para separar secciones.
- **Typography:** Uso de fuentes variables optimizadas con `next/font/google`. 
    - Títulos: `font-kantumruy-pro tracking-tight`.
    - Cuerpo: `font-kantumruy-pro leading-relaxed`.
- **Animations (Framer Motion):** Implementar transiciones suaves y elegantes:
    - *Scroll Reveal:* Fade-in up cuando los elementos entran en el viewport.
    - *Stagger:* Animaciones en cascada para listas o grids.
- **Styling:** **Tailwind CSS Utility-First**. Prohibido el uso de CSS externo o inline fuera de Tailwind.

## 3. Component Architecture (Atomic & Clean)
- **Atomic Separation:** Separar `Header`, `Footer` y secciones principales en archivos independientes. No amontonar código en el archivo `page.tsx`.
- **Global Layout:** `Header` y `Footer` residen **exclusivamente** en `app/layout.tsx` para evitar re-renders y parpadeos.
- **Colocation:** Componentes que pertenecen a una sola página deben vivir cerca de ella o en una subcarpeta dedicada para evitar el desorden global.

## 4. Senior Implementation Rules
- **Anti-Pattern Protection:** Prohibido el uso de la etiqueta `<img>`. Usar siempre el componente `next/image` con tamaños definidos para evitar Layout Shift (CLS).
- **Lucide Icons:** Uso exclusivo de `lucide-react` para mantener una iconografía consistente y ligera.
- **Accessibility (a11y):** Asegurar contrastes WCAG AA, uso de etiquetas semánticas (`<article>`, `<section>`, `<nav>`) y atributos `aria-label`.
- **SEO Mastery:** Implementar el objeto `Metadata` de Next.js en cada página (Title, Description, OpenGraph). No usar la etiqueta `<Head>` (obsoleta en App Router).
- **Clean Code Rule:** Si un componente supera las 60 líneas de código, **debe** ser fragmentado en sub-componentes más pequeños y manejables.
- **DRY UI (data-driven rendering):** Si renderizas **2+ bloques** con la misma estructura JSX y solo varían datos (colores, imágenes, strings, claves i18n, valores hex/rgb/hsl), **extrae un array de config tipado a nivel de módulo y mapea sobre él**. Queda prohibido copiar/pegar JSX con variantes mínimas — es lo primero que envejece mal al modificar el diseño. Patrón de referencia: `masonryItems` / `logoVariants` en los proyectos de branding.
- **Valores dinámicos de Tailwind:** Cuando el valor venga de una variable (p. ej. `v.color` del config), usa `style={{ backgroundColor: v.color }}`. Tailwind JIT **no** detecta clases construidas por interpolación (`bg-[${v.color}]` no genera CSS). Esta es la **única** excepción autorizada a la regla de "solo Tailwind" para estilos.

## 5. Asset Optimization
- **Imágenes (PNG):** al meter imágenes nuevas en `public/media/**`, **ejecuta siempre** `npm run optimize:images -- <dir>` antes de committear. Usa `sharp` (viene con Next) para redimensionar a max `1920px` de ancho y re-codificar como PNG indexado (paleta) con `quality: 90`, `compressionLevel: 9`, `effort: 10`, `dither: 1.0`. Overwrites in place y salta archivos <100 KB y SVG.
- **Objetivos de tamaño orientativos:** fotografías full-bleed <1.5 MB, fotografías col-span <800 KB, gráficos/logos <50 KB. Si un PNG fotográfico pasa de 2 MB tras correr el script, reduce `--max-width` (p. ej. `--max-width 1600`) antes que bajar `--quality` por debajo de 85.
- **Flags del script:** `--max-width N`, `--quality N` (1-100), `--min-kb N`, `--recursive`. Ejemplo: `npm run optimize:images -- public/media/project/branding-don-tostado --max-width 1600`.
- **SVG y favicons:** **no** los toques — el script los ignora pero tampoco los optimices a mano salvo petición expresa.
- **Si aparece bandeo** en gradientes suaves (cielos, pieles, sombras graduales) tras la optimización, sube `--quality` a 95 o desactiva la paleta editando el script para esa foto concreta (PNG sin paleta es lossless pero mucho más pesado — valorar convertir a WebP manualmente).
- **Referencia:** proceso validado que llevó `branding-don-tostado/` de 25 MB → 2.5 MB (-90%) sin pérdida visible de calidad.

## 6. Reference Style
- El objetivo es emular la estética de `beatrizhc.com`: Limpieza visual, transiciones de alta gama, tipografía premium y carga instantánea.