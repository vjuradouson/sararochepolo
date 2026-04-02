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

    if (response) {
        if (consent) {
            response.headers.set('x-consent', consent);
        }

        response.headers.set('x-consed-debug', '1');

        return response;
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};