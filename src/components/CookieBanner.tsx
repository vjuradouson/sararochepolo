'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CookieConsent } from '@/lib/cookie-consent';
import { motion, AnimatePresence } from 'framer-motion';

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
        setConsent(toCookieConsent(values));
        setIsOpen(false);

        try {
            setIsSaving(true);

            const res = await fetch('/api/cookie-consent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values),
            });

            if (!res.ok) throw new Error('No se pudo guardar');

            window.dispatchEvent(new Event('cookie-consent-updated'));
        } catch (error) {
            console.error(error);
            setIsOpen(true);
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

    const acceptAll = () =>
        saveConsent({ analytics: true, marketing: true, preferences: true });

    const rejectOptional = () =>
        saveConsent({ analytics: false, marketing: false, preferences: false });

    const saveCustom = () => saveConsent(prefs);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cookie-banner-title"
                    initial={{ y: 100, opacity: 0, scale: 0.98 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 120,
                        damping: 18,
                    }}
                    exit={{
                        y: 60,
                        opacity: 0,
                        scale: 0.98,
                        transition: {
                            duration: 0.35,
                            ease: 'easeIn',
                        }
                    }}
                    className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 backdrop-blur p-4 shadow-2xl"
                >
                    <div className="mx-auto max-w-5xl">
                        <h2 id="cookie-banner-title" className="text-lg font-semibold">
                            Usamos cookies
                        </h2>

                        <p className="mt-2 text-sm text-neutral-700">
                            Usamos cookies técnicas necesarias y, si nos das permiso,
                            también cookies de analítica, preferencias y marketing.
                        </p>

                        <button
                            type="button"
                            onClick={() => setShowSettings((v) => !v)}
                            className="cursor-pointer mt-3 text-sm underline"
                        >
                            {showSettings
                                ? 'Ocultar configuración'
                                : 'Configurar cookies'}
                        </button>

                        <AnimatePresence initial={false}>
                            {showSettings && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: 'easeInOut',
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-4 grid gap-3 rounded-xl border p-4">
                                        <label className="flex items-start gap-3">
                                            <input type="checkbox" checked disabled />
                                            <span>
                                                <strong>Necesarias</strong>
                                                <br />
                                                <span className="text-sm text-neutral-600">
                                                    Siempre activas.
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
                                            <strong>Preferencias</strong>
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
                                            <strong>Analítica</strong>
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
                                            <strong>Marketing</strong>
                                        </label>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

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
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/**
 * 🔍 Leer cookie en cliente
 */
function getConsentFromCookie(): CookieConsent | null {
    const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('cookie_consent_v1='))
        ?.split('=')[1];

    if (!cookieValue) return null;

    try {
        return JSON.parse(decodeURIComponent(cookieValue));
    } catch {
        return null;
    }
}