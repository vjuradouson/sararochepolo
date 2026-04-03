'use client';

import { useEffect } from 'react';

export default function ConsentScript() {
    useEffect(() => {
        // fallback seguro sin pelear con TS global
        window.dataLayer = window.dataLayer || [];

        const gtag = (...args: any[]) => {
            window.dataLayer!.push(args);
        };

        gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'denied',
            personalization_storage: 'denied',
            security_storage: 'granted'
        });
    }, []);

    return null;
}