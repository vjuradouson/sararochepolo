import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
    const response = intlMiddleware(request);

    if (response instanceof NextResponse && response.headers.get('location')) {
        return response;
    }

    response.headers.set(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=300'
    );

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next|.*\\..*).*)'
    ],
};