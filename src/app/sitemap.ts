import { MetadataRoute } from 'next'
import { ROUTING } from '@/i18n/routing'
import { BASE_URL } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
    const { locales, pathnames, defaultLocale } = ROUTING

    const entries: MetadataRoute.Sitemap = []
    const lastModified = new Date().toISOString().split('T')[0]

    Object.entries(pathnames).forEach(([key, value]) => {

        const getPath = (locale: string) => {
            if (typeof value === 'string') {
                return value === '/' ? '' : value
            }
            return value[locale as keyof typeof value]
        }

        locales.forEach((locale) => {

            const url = `${BASE_URL}/${locale}${getPath(locale)}`

            const alternates = {
                languages: Object.fromEntries(
                    locales.map((l) => [
                        l,
                        `${BASE_URL}/${l}${getPath(l)}`
                    ])
                )
            }

            entries.push({
                url,
                lastModified,
                alternates
            })
        })
    })

    return entries
}