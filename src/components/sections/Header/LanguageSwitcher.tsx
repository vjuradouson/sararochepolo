"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { Locale, LOCALES, LANGUAGE_META } from '@/lib/config';

const LANGUAGES = LOCALES.map((code) => ({
    code,
    ...LANGUAGE_META[code],
}));

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const wrapperRef = useRef<HTMLDivElement>(null);

    const currentLang = LANGUAGES.find((lang) => lang.code === locale);

    const handleLanguageChange = (newLocale: Locale) => {
        if (newLocale !== locale) {
            router.push(pathname, { locale: newLocale });
        }
        setIsOpen(false);
    };

    // 👉 Click outside
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
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // 👉 Close on ESC
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        }

        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <div ref={wrapperRef} className="relative z-50">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-light text-brand-dark"
                aria-label="Cambiar idioma"
                aria-expanded={isOpen}
                aria-haspopup="menu"
            >
                <Globe size={16} />
                <span className="hidden sm:inline">{currentLang?.label}</span>
                <span className="sm:hidden">{currentLang?.flag}</span>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                            aria-hidden="true"
                        />

                        {/* Menu */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: -6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -6 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            style={{ originX: 1, originY: 0 }}
                            className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[170px] rounded-2xl border border-neutral-200 bg-white m-2 shadow-[0_12px_32px_rgba(0,0,0,0.10)]"
                            role="menu"
                        >
                            {/* Arrow */}
                            <div className="pointer-events-none absolute -top-[7px] right-6 z-0 h-3.5 w-3.5 rotate-45 border-l border-t border-neutral-200 bg-white" />

                            {/* Content */}
                            <div className="relative z-10">
                                <ul className="space-y-1">
                                    {LANGUAGES.map(({ code, label, flag }) => {
                                        const isActive = code === locale;

                                        return (
                                            <li key={code}>
                                                <button
                                                    onClick={() => handleLanguageChange(code)}
                                                    role="menuitem"
                                                    className={`w-full cursor-pointer rounded-xl px-3 py-2 text-left text-sm font-light transition-colors duration-150 flex items-center gap-2 ${isActive
                                                        ? "bg-white text-brand-dark"
                                                        : "text-brand-dark hover:bg-white"
                                                        }`}
                                                >
                                                    <span>{flag}</span>
                                                    <span>{label}</span>
                                                    {isActive && <span className="ml-auto text-xs">✓</span>}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}