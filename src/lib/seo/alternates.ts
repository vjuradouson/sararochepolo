import { BASE_URL, DEFAULT_LOCALE, Locale } from "@/lib/config";
import { ROUTING } from '@/i18n/routing';
import { getPath } from "@/i18n/getPath";
import { Metadata, Route } from "next"
import { DEFAULT_OG_IMAGE } from "@/lib/seo/og";

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
    const hasOgImage = !!metadata.openGraph && 'images' in metadata.openGraph && !!metadata.openGraph.images
    const hasTwitterImage = !!metadata.twitter && 'images' in metadata.twitter && !!metadata.twitter.images

    return {
        ...metadata,
        alternates: await buildAlternates(params),
        openGraph: {
            ...metadata.openGraph,
            ...(hasOgImage ? {} : { images: [DEFAULT_OG_IMAGE] }),
        },
        twitter: {
            card: 'summary_large_image',
            ...metadata.twitter,
            ...(hasTwitterImage ? {} : { images: [DEFAULT_OG_IMAGE.url] }),
        },
    }
}