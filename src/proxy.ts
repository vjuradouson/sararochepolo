import createMiddleware from 'next-intl/middleware';
import { ROUTING } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_CONSENT_NAME } from '@/lib/cookie-consent';
import { LOCALES, COUNTRY_LOCALE_MAP, DEFAULT_LOCALE } from '@/lib/config';

const resolveLocaleFromCountry = (country: string): string => {
    return COUNTRY_LOCALE_MAP[country] ?? DEFAULT_LOCALE;
};

const isSupportedLocale = (locale: string): boolean => {
    return LOCALES.includes(locale);
};

/** -------------------------
 * ACCEPT-LANGUAGE PARSER
 * ------------------------- */
const resolveLocaleFromAcceptLanguage = (
    header: string | null
): string | null => {
    if (!header) return null;

    const languages = header
        .split(',')
        .map((lang) => lang.split(';')[0].trim().toLowerCase());

    for (const lang of languages) {
        const base = lang.split('-')[0]; // es-ES → es
        if (LOCALES.includes(base)) {
            return base;
        }
    }

    return null;
};

const intlMiddleware = createMiddleware(ROUTING);

export default function middleware(req: NextRequest) {
    const debug = {
        vercel: req.headers.get('x-vercel-ip-country'),
        cf: req.headers.get('cf-ipcountry'),
        ip: req.headers.get('x-forwarded-for'),
    };

    console.log('DEBUG GEO:', debug);

    /** -------------------------
     * 1. HEADERS
     * ------------------------- */
    const country = req.headers.get('x-vercel-ip-country') ?? 'US';

    const acceptLanguage = req.headers.get('accept-language');

    /** -------------------------
     * 2. COOKIE LOCALE (PRIORIDAD MÁXIMA)
     * ------------------------- */
    const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;

    /** -------------------------
     * 3. ACCEPT-LANGUAGE
     * ------------------------- */
    const browserLocale = resolveLocaleFromAcceptLanguage(acceptLanguage);

    /** -------------------------
     * 4. GEO FALLBACK
     * ------------------------- */
    const geoLocale = resolveLocaleFromCountry(country);

    /** -------------------------
     * 5. FINAL LOCALE (orden correcto)
     * ------------------------- */
    let locale =
        cookieLocale ??
        browserLocale ??
        geoLocale ??
        DEFAULT_LOCALE;

    if (!isSupportedLocale(locale)) {
        locale = DEFAULT_LOCALE;
    }

    /** -------------------------
     * 6. PATHNAME CHECK
     * ------------------------- */
    const pathname = req.nextUrl.pathname;

    const hasLocale = LOCALES.some((loc) =>
        pathname.startsWith(`/${loc}`)
    );

    /** -------------------------
     * 7. COOKIE CONSENT
     * ------------------------- */
    const consent = req.cookies.get(COOKIE_CONSENT_NAME)?.value;

    const requestHeaders = new Headers(req.headers);

    if (consent) {
        requestHeaders.set('x-consent', consent);
    }

    /** -------------------------
     * 8. REDIRECT
     * ------------------------- */
    if (!hasLocale) {
        const url = req.nextUrl.clone();
        url.pathname = `/${locale}${pathname}`;

        const response = NextResponse.redirect(url);

        // 👉 guardar locale SOLO primera vez
        if (!cookieLocale) {
            response.cookies.set('NEXT_LOCALE', locale, {
                path: '/',
                maxAge: 60 * 60 * 24 * 365
            });
        }

        // 👉 mantener consentimiento
        if (consent) {
            response.cookies.set(COOKIE_CONSENT_NAME, consent);
            response.headers.set('x-consent', consent);
        }

        return response;
    }

    /** -------------------------
     * 9. NEXT-INTL
     * ------------------------- */
    const response = intlMiddleware(req);

    if (response) {
        if (consent) {
            response.headers.set('x-consent', consent);
        }
        return response;
    }

    /** -------------------------
     * 10. FALLBACK
     * ------------------------- */
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};