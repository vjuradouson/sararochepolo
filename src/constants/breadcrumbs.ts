/**
 * Configuración global de las migas de pan (breadcrumbs).
 *
 * `BREADCRUMB_MIN_LEVEL` = nivel mínimo de página a partir del cual se muestran.
 * El "nivel" es la profundidad de la ruta, medida como el número de migas:
 *
 *   1 → Home
 *   2 → categoría / página suelta   (p. ej. /projects/branding, /about-me, /contact)
 *   3 → detalle de proyecto         (p. ej. /projects/branding/don-tostado)
 *
 * Valores posibles:
 *   3 (por defecto) → solo en páginas de detalle de proyecto (level > 2)
 *   2               → además en categorías y páginas sueltas
 *   1               → en todas las páginas que tengan migas
 *
 * Cambiar este único número decide en qué páginas aparecen las migas; el
 * componente <Breadcrumb> se encarga de no renderizarse por debajo del nivel.
 */
export const BREADCRUMB_MIN_LEVEL = 3;
