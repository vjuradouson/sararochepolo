'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CookieConsent } from '@/lib/cookie-consent';

type LocalPreferences = {
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
};

export default function CookieBanner() {
    const [isSaving, setIsSaving] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [consent, setConsent] = useState<CookieConsent | null>(null);

    useEffect(() => {
        const existingConsent = getConsentFromCookie();
        setConsent(existingConsent);
        setIsOpen(!existingConsent);
    }, []);

    const initialValues = useMemo<LocalPreferences>(
        () => ({
            analytics: consent?.analytics ?? false,
            marketing: consent?.marketing ?? false,
            preferences: consent?.preferences ?? false,
        }),
        [consent]
    );

    const [prefs, setPrefs] = useState<LocalPreferences>({
        analytics: false,
        marketing: false,
        preferences: false,
    });

    useEffect(() => {
        setPrefs(initialValues);
    }, [initialValues]);

    async function saveConsent(values: LocalPreferences) {
        try {
            setIsSaving(true);

            const res = await fetch('/api/cookie-consent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                throw new Error('No se pudo guardar el consentimiento');
            }

            setConsent(toCookieConsent(values)); setIsOpen(false);

            window.dispatchEvent(new Event('cookie-consent-updated'));
        } catch (error) {
            console.error(error);
            alert('No se pudo guardar tu preferencia de cookies.');
        } finally {
            setIsSaving(false);
        }

    }

    function toCookieConsent(values: LocalPreferences): CookieConsent {
        return {
            necessary: true,
            analytics: values.analytics,
            marketing: values.marketing,
            preferences: values.preferences,
            updatedAt: new Date().toISOString(),
        };
    }

    function acceptAll() {
        return saveConsent({
            analytics: true,
            marketing: true,
            preferences: true,
        });
    }

    function rejectOptional() {
        return saveConsent({
            analytics: false,
            marketing: false,
            preferences: false,
        });
    }

    function saveCustom() {
        return saveConsent(prefs);
    }

    if (!isOpen) return null;

    return (<div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-banner-title"
        className="fixed inset-x-0 bottom-0 z-50 border-t bg-white p-4 shadow-2xl"
    > <div className="mx-auto max-w-5xl"> <h2 id="cookie-banner-title" className="text-lg font-semibold">
        Usamos cookies </h2>

            <p className="mt-2 text-sm text-neutral-700">
                Usamos cookies técnicas necesarias y, si nos das permiso, también cookies
                de analítica, preferencias y marketing.
            </p>

            <button
                type="button"
                onClick={() => setShowSettings((v) => !v)}
                className="cursor-pointer mt-3 text-sm underline"
            >
                {showSettings ? 'Ocultar configuración' : 'Configurar cookies'}
            </button>

            {showSettings && (
                <div className="mt-4 grid gap-3 rounded-xl border p-4">
                    <label className="flex items-start gap-3">
                        <input type="checkbox" checked disabled />
                        <span>
                            <strong>Necesarias</strong>
                            <br />
                            <span className="text-sm text-neutral-600">
                                Siempre activas. Son necesarias para el funcionamiento básico.
                            </span>
                        </span>
                    </label>

                    <label className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            checked={prefs.preferences}
                            onChange={(e) =>
                                setPrefs((prev) => ({
                                    ...prev,
                                    preferences: e.target.checked,
                                }))
                            }
                        />
                        <span>
                            <strong>Preferencias</strong>
                        </span>
                    </label>

                    <label className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            checked={prefs.analytics}
                            onChange={(e) =>
                                setPrefs((prev) => ({
                                    ...prev,
                                    analytics: e.target.checked,
                                }))
                            }
                        />
                        <span>
                            <strong>Analítica</strong>
                        </span>
                    </label>

                    <label className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            checked={prefs.marketing}
                            onChange={(e) =>
                                setPrefs((prev) => ({
                                    ...prev,
                                    marketing: e.target.checked,
                                }))
                            }
                        />
                        <span>
                            <strong>Marketing</strong>
                        </span>
                    </label>
                </div>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={rejectOptional}
                    disabled={isSaving}
                    className="cursor-pointer rounded-xl border px-4 py-2 text-sm"
                >
                    Rechazar opcionales
                </button>

                <button
                    type="button"
                    onClick={saveCustom}
                    disabled={isSaving}
                    className="cursor-pointer rounded-xl border px-4 py-2 text-sm"
                >
                    Guardar selección
                </button>

                <button
                    type="button"
                    onClick={acceptAll}
                    disabled={isSaving}
                    className="cursor-pointer rounded-xl bg-black px-4 py-2 text-sm text-white"
                >
                    Aceptar todas
                </button>
            </div>
        </div>
    </div>

    );
}

/**
 
* 🔍 Leer cookie en cliente
  */
function getConsentFromCookie(): CookieConsent | null {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('cookie_consent_v1='))
        ?.split('=')[1];

    if (!cookieValue) return null;

    try {
        return JSON.parse(decodeURIComponent(cookieValue));
    } catch {
        return null;
    }
}
