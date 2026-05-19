'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';
import { COOKIE_CONSENT_NAME, safeParseConsent } from '@/lib/cookieConsent';

export default function ClarityAnalytics() {
    useEffect(() => {
        const id = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
        if (!id) return;
        if (process.env.NODE_ENV !== 'production') return;

        let initialized = false;

        const tryInit = () => {
            if (initialized) return;
            const cookieValue = document.cookie
                .split('; ')
                .find(row => row.startsWith(`${COOKIE_CONSENT_NAME}=`))
                ?.split('=')[1];

            const consent = safeParseConsent(
                cookieValue ? decodeURIComponent(cookieValue) : undefined
            );

            if (!consent?.analytics) return;

            Clarity.init(id);
            initialized = true;
        };

        tryInit();
        window.addEventListener('cookie-consent-updated', tryInit);

        return () => {
            window.removeEventListener('cookie-consent-updated', tryInit);
        };
    }, []);

    return null;
}
