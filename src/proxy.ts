import createMiddleware from 'next-intl/middleware';
import { ROUTING } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_CONSENT_NAME } from '@/lib/cookie-consent';

const intlMiddleware = createMiddleware(ROUTING);

export default function middleware(req: NextRequest) {
    const consent = req.cookies.get(COOKIE_CONSENT_NAME)?.value;

    const requestHeaders = new Headers(req.headers);

    if (consent) {
        requestHeaders.set('x-consent', consent);
    }

    const response = intlMiddleware(req);

    // 👇 ESTE es el truco correcto
    response.headers.set('x-consed-debug', '1'); // opcional debug

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
        headers: response.headers,
    });
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};