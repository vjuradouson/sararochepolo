'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CookieConsent } from '@/lib/cookieConsent';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';

type LocalPreferences = {
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
};

export default function CookieBanner() {
    const t = useTranslations('app.cookies');
    const [isSaving, setIsSaving] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [consent, setConsent] = useState<CookieConsent | null>(null);

    useEffect(() => {
        const existingConsent = getConsentFromCookie();
        setConsent(existingConsent);
        setIsOpen(!existingConsent);

        const handleOpenRequest = () => {
            setShowSettings(true);
            setIsOpen(true);
        };
        window.addEventListener('open-cookie-banner', handleOpenRequest);

        return () => {
            window.removeEventListener('open-cookie-banner', handleOpenRequest);
        };
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

            if (!res.ok) throw new Error('Save failed');

            window.dispatchEvent(new Event('cookie-consent-updated'));
        } catch (error) {
            console.error(error);
            setIsOpen(true);
            alert(t('errors.save_failed'));
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
                            {t('title')}
                        </h2>

                        <p className="mt-2 text-sm text-neutral-700">
                            {t('description')}{' '}
                            <Link
                                href={ROUTES.COOKIE_POLICY}
                                className="underline"
                            >
                                {t('policy_link')}
                            </Link>
                            .
                        </p>

                        <button
                            type="button"
                            onClick={() => setShowSettings((v) => !v)}
                            className="cursor-pointer mt-3 text-sm underline"
                        >
                            {showSettings
                                ? t('hide_settings')
                                : t('show_settings')}
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
                                                <strong>{t('categories.necessary.label')}</strong>
                                                <br />
                                                <span className="text-sm text-neutral-600">
                                                    {t('categories.necessary.description')}
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
                                                <strong>{t('categories.preferences.label')}</strong>
                                                <br />
                                                <span className="text-sm text-neutral-600">
                                                    {t('categories.preferences.description')}
                                                </span>
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
                                                <strong>{t('categories.analytics.label')}</strong>
                                                <br />
                                                <span className="text-sm text-neutral-600">
                                                    {t('categories.analytics.description')}
                                                </span>
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
                                                <strong>{t('categories.marketing.label')}</strong>
                                                <br />
                                                <span className="text-sm text-neutral-600">
                                                    {t('categories.marketing.description')}
                                                </span>
                                            </span>
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
                                {t('actions.reject_optional')}
                            </button>

                            <button
                                type="button"
                                onClick={saveCustom}
                                disabled={isSaving}
                                className="cursor-pointer rounded-xl border px-4 py-2 text-sm"
                            >
                                {t('actions.save_selection')}
                            </button>

                            <button
                                type="button"
                                onClick={acceptAll}
                                disabled={isSaving}
                                className="cursor-pointer rounded-xl bg-black px-4 py-2 text-sm text-white"
                            >
                                {t('actions.accept_all')}
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