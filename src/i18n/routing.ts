import { ROUTES } from '@/constants/routes'
import { defineRouting } from 'next-intl/routing'
import { LOCALES, DEFAULT_LOCALE } from '@/lib/config';

const locales = LOCALES;
const defaultLocale = DEFAULT_LOCALE

export const ROUTING = defineRouting({
  locales: locales,
  defaultLocale: defaultLocale,
  localePrefix: 'always',
  alternateLinks: false,
  pathnames: {
    [ROUTES.HOME]: '/',
    [ROUTES.ABOUT]: {
      es: '/sobre-mi',
      en: '/about-me'
    },
    [ROUTES.CONTACT]: {
      es: '/contacto',
      en: '/contact'
    },
    [ROUTES.PROJECTS_ADOBE_PROJECT_NEO]: {
      es: '/proyectos/adobe-project-neo',
      en: '/projects/adobe-project-neo'
    },
    [ROUTES.PROJECTS_BRANDING]: {
      es: '/proyectos/branding',
      en: '/projects/branding'
    },
    [ROUTES.PROJECTS_BRANDING_LA_ESQUINITA_DE_PAPEL]: {
      es: '/proyectos/branding/la-esquinita-de-papel',
      en: '/projects/branding/la-esquinita-de-papel'
    },
    [ROUTES.PROJECTS_BRANDING_DON_TOSTADO]: {
      es: '/proyectos/branding/don-tostado',
      en: '/projects/branding/don-tostado'
    },
    [ROUTES.PROJECTS_UX_UI_DESIGN]: {
      es: '/proyectos/diseños-ux-ui',
      en: '/projects/ux-ui-design'
    },
    [ROUTES.PROJECTS_UX_UI_DESIGN_PET_BUDDY]: {
      es: '/proyectos/diseños-ux-ui/pet-buddy',
      en: '/projects/ux-ui-design/pet-buddy'
    },
    [ROUTES.PROJECTS_ILLUSTRATIONS]: {
      es: '/proyectos/ilustraciones',
      en: '/projects/illustrations'
    },
    [ROUTES.PROJECTS_SOCIAL_MEDIA]: {
      es: '/proyectos/redes-sociales',
      en: '/projects/social-media'
    },
    [ROUTES.PROJECTS_EDITORIAL]: {
      es: '/proyectos/diseño-editorial',
      en: '/projects/print-design'
    },
    [ROUTES.COOKIE_POLICY]: {
      es: '/politica-de-cookies',
      en: '/cookie-policy'
    }
  }
})

type Route = (typeof ROUTES)[keyof typeof ROUTES];
type Locale = typeof LOCALES[number];

export const PATHNAMES = ROUTING.pathnames as Record<
  Route,
  string | Record<Locale, string>
>;
