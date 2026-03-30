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
      es: '/acerca-de',
      en: '/about'
    },
    [ROUTES.CONTACT]: {
      es: '/contacto',
      en: '/contact'
    }
  }
})

type Route = (typeof ROUTES)[keyof typeof ROUTES];
type Locale = typeof LOCALES[number];

export const PATHNAMES = ROUTING.pathnames as Record<
  Route,
  string | Record<Locale, string>
>;
