import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { BASE_URL } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
    const { locales, pathnames, defaultLocale } = routing

    const entries: MetadataRoute.Sitemap = []

    // Fecha limpia (sin milisegundos)
    const lastModified = new Date().toISOString().split('T')[0]

    Object.entries(pathnames).forEach(([key, value]) => {

        const getPath = (locale: string) => {
            if (typeof value === 'string') {
                return value === '/' ? '' : value
            }
            return value[locale as keyof typeof value]
        }

        // Alternates (todos los idiomas)
        const alternates = {
            languages: {
                ...Object.fromEntries(
                    locales.map((l) => [
                        l,
                        `${BASE_URL}/${l}${getPath(l)}`
                    ])
                ),
                'x-default': `${BASE_URL}/${defaultLocale}${getPath(defaultLocale)}`
            }
        }

        // 👉 SOLO UNA URL (default locale)
        entries.push({
            url: `${BASE_URL}/${defaultLocale}${getPath(defaultLocale)}`,
            lastModified,
            alternates
        })
    })

    return entries
}