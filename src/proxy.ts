import createMiddleware from 'next-intl/middleware';
import { ROUTING } from './i18n/routing';

export default createMiddleware(ROUTING);

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};