import { ROUTES } from '@/constants/routes'
import { defineRouting } from 'next-intl/routing'

const locales = process.env.NEXT_PUBLIC_LOCALES?.split(',') ?? []
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en'

export const routing = defineRouting({
  locales: locales,
  defaultLocale: defaultLocale,
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

