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

const intlMiddleware = createMiddleware(ROUTING);

export default function middleware(req: NextRequest) {
    /** -------------------------
     * 1. HEADERS & GEO
     * ------------------------- */
    const country =
        req.headers.get('x-country') ??
        req.headers.get('cf-ipcountry') ??
        'US';

    /** -------------------------
     * 2. COOKIE LOCALE (PRIORIDAD MÁXIMA)
     * ------------------------- */
    const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;

    /** -------------------------
     * 3. LOCALE DETECTION (GEO fallback)
     * ------------------------- */
    let locale = cookieLocale ?? resolveLocaleFromCountry(country);
    if (!isSupportedLocale(locale)) {
        locale = DEFAULT_LOCALE;
    }

    /** -------------------------
     * 4. PATHNAME CHECK
     * ------------------------- */
    const pathname = req.nextUrl.pathname;
    const hasLocale =
        pathname.startsWith('/es') || pathname.startsWith('/en');

    /** -------------------------
     * 5. COOKIE CONSENT
     * ------------------------- */
    const consent = req.cookies.get(COOKIE_CONSENT_NAME)?.value;

    const requestHeaders = new Headers(req.headers);

    if (consent) {
        requestHeaders.set('x-consent', consent);
    }

    /** -------------------------
     * 6. REDIRECT (solo si no hay locale)
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
     * 7. NEXT-INTL
     * ------------------------- */
    const response = intlMiddleware(req);

    if (response) {
        if (consent) {
            response.headers.set('x-consent', consent);
        }
        return response;
    }

    /** -------------------------
     * 8. FALLBACK
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