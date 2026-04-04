'use client';

import { useEffect, useState } from 'react';
import type { CookieConsent } from '@/lib/cookie-consent';

export default function CookieScriptsClient() {
    const [consent, setConsent] = useState<CookieConsent | null>(null);

    useEffect(() => {
        const initialConsent = getConsentFromCookie();
        setConsent(initialConsent);

        updateConsent(initialConsent);

        if (initialConsent?.marketing) {
            loadMarketingScripts();
        }

        function handleConsentUpdate() {
            const updatedConsent = getConsentFromCookie();
            setConsent(updatedConsent);

            updateConsent(updatedConsent);
        }

        window.addEventListener('cookie-consent-updated', handleConsentUpdate);

        return () => {
            window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
        };

    }, []);

    return null;
}

/**
* 🔍 Obtener consentimiento desde cookie
*/
function getConsentFromCookie(): CookieConsent | null {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('cookie_consent_v1='))
        ?.split('=')[1];

    if (!cookieValue) return null;

    try {
        return JSON.parse(decodeURIComponent(cookieValue));
    } catch (e) {
        console.error('Error parsing consent cookie:', e);
        return null;
    }
}

function updateConsent(consent: CookieConsent | null) {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        event: 'consent_update',
        analytics_storage: consent?.analytics ? 'granted' : 'denied',
        ad_storage: consent?.marketing ? 'granted' : 'denied',
    });
}

/**

* 🎯 Marketing scripts (placeholder)
  */
function loadMarketingScripts() {
    // Ejemplo:
    // - Meta Pixel
    // - LinkedIn Insight
    // - TikTok Pixel
}


/**

* 🧠 Tipado global
  */
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}
