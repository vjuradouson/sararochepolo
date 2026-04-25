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
    [ROUTES.PROJECT_ADOBE_PROJECT_NEO]: {
      es: '/proyectos/adobe-project-neo',
      en: '/projects/adobe-project-neo'
    },
    [ROUTES.PROJECT_BRANDING]: {
      es: '/proyectos/branding',
      en: '/projects/branding'
    },
    [ROUTES.PROJECT_BRANDING_LA_ESQUINITA_DE_PAPEL]: {
      es: '/proyectos/branding/la-esquinita-de-papel',
      en: '/projects/branding/la-esquinita-de-papel'
    },
    [ROUTES.PROJECT_BRANDING_DON_TOSTADO]: {
      es: '/proyectos/branding/don-tostado',
      en: '/projects/branding/don-tostado'
    }
  }
})

type Route = (typeof ROUTES)[keyof typeof ROUTES];
type Locale = typeof LOCALES[number];

export const PATHNAMES = ROUTING.pathnames as Record<
  Route,
  string | Record<Locale, string>
>;
