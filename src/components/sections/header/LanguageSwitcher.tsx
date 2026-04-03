"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { Locale, LOCALES, LANGUAGE_META } from "@/lib/config";
import { useTranslations } from "next-intl";

const LANGUAGES = LOCALES.map((code) => ({
    code,
    ...LANGUAGE_META[code],
}));

export default function LanguageSwitcher() {
    const t = useTranslations("app.header.language_switcher");
    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleLanguageChange = (newLocale: Locale) => {
        if (newLocale !== locale) {
            router.push(pathname, { locale: newLocale });
        }
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") setIsOpen(false);
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <div ref={wrapperRef} className="relative z-50">
            {/* Trigger */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                aria-label="Change language"
                aria-expanded={isOpen}
                aria-haspopup="menu"
            >
                <Globe size={16} className="opacity-70" />
                <span>{t(locale)}</span>
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu */}
                        <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.96 }}
                            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            style={{ originX: 1, originY: 0 }}
                            className="absolute right-0 mt-3 w-48 rounded-2xl border border-neutral-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.10)]"
                            role="menu"
                        >
                            {/* 👇 Arrow (bocadillo) */}
                            <div className="pointer-events-none absolute -top-[6px] right-6 h-3 w-3 rotate-45 border-l border-t border-neutral-200 bg-white" />

                            <ul className="relative z-10 p-1">
                                {LANGUAGES.map(({ code }) => {
                                    const isActive = code === locale;

                                    return (
                                        <li key={code}>
                                            <button
                                                onClick={() => handleLanguageChange(code)}
                                                role="menuitem"
                                                className={`cursor-pointer group flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-all duration-150
                                                    ${isActive
                                                        ? "bg-neutral-100 text-neutral-900"
                                                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                                                    }`}
                                            >
                                                <span>{t(code)}</span>

                                                {isActive && (
                                                    <Check
                                                        size={16}
                                                        className="text-neutral-700 opacity-80"
                                                    />
                                                )}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}