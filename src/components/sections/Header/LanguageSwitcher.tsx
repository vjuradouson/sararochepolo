"use client";

import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";

const LANGUAGES = [
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "en", label: "English", flag: "🇬🇧" },
];

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const currentLang = LANGUAGES.find((lang) => lang.code === locale);

    const handleLanguageChange = (newLocale: string) => {
        if (newLocale !== locale) {
            router.push(pathname, { locale: newLocale as "es" | "en" });
        }
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 text-sm font-medium text-brand-dark"
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
                            initial={{ opacity: 0, scale: 0.95, y: -8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -8 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full right-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg p-2 z-50 min-w-[160px]"
                            role="menu"
                        >
                            <ul className="space-y-1">
                                {LANGUAGES.map(({ code, label, flag }) => {
                                    const isActive = code === locale;
                                    return (
                                        <motion.li key={code}>
                                            <button
                                                onClick={() => handleLanguageChange(code)}
                                                role="menuitem"
                                                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-150 flex items-center gap-2 text-sm font-medium ${isActive
                                                        ? "bg-brand-dark text-white"
                                                        : "text-brand-dark hover:bg-neutral-100"
                                                    }`}
                                            >
                                                <span>{flag}</span>
                                                <span>{label}</span>
                                                {isActive && (
                                                    <motion.span
                                                        layoutId="active-lang"
                                                        className="ml-auto text-xs"
                                                    >
                                                        ✓
                                                    </motion.span>
                                                )}
                                            </button>
                                        </motion.li>
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
