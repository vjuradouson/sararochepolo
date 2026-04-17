import { BASE_URL, DEFAULT_LOCALE, Locale } from "@/lib/config";
import { ROUTING } from '@/i18n/routing';
import { getPath } from "@/i18n/getPath";
import { Metadata, Route } from "next"

export async function buildAlternates(
    params: ParamsWithAlternates
) {
    const { locales } = ROUTING
    const locale = params.locale
    const route = params.route

    const buildUrl = (l: Locale) => {
        const path = getPath(route, l)
        return `${BASE_URL}/${l}${path === '/' ? '' : path}`
    }

    return {
        canonical: buildUrl(locale as Locale),
        languages: {
            ...Object.fromEntries(
                locales.map(l => [l, buildUrl(l as Locale)])
            ),
            'x-default': buildUrl(DEFAULT_LOCALE as Locale),
        },
    }
}

type ParamsWithAlternates = {
    locale: string
    route: Route
}

export async function withAlternates(
    params: ParamsWithAlternates,
    metadata: Metadata
): Promise<Metadata> {
    return {
        ...metadata,
        alternates: await buildAlternates(params),
    }
}