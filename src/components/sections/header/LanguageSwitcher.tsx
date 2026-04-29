"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Locale, LOCALES } from "@/lib/config";

function persistLocaleCookie(locale: Locale) {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
}

const REVEAL_TRANSITION = { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const };
const ICON_TRANSITION = { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const };

export default function LanguageSwitcher() {
    const t = useTranslations("app.header.language_switcher");
    const locale = useLocale() as Locale;
    const pathname = usePathname();
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);

    const nextLocale = (LOCALES.find((l) => l !== locale) ?? locale) as Locale;
    const canSwap = nextLocale !== locale;
    const showNext = expanded && canSwap;

    const handleSwap = () => {
        if (!canSwap) return;
        persistLocaleCookie(nextLocale);
        setExpanded(false);
        router.push(pathname, { locale: nextLocale });
    };

    return (
        <button
            type="button"
            onClick={handleSwap}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            onFocus={() => setExpanded(true)}
            onBlur={() => setExpanded(false)}
            aria-label={t(nextLocale)}
            className="group flex w-[88px] cursor-pointer items-center justify-between rounded-full border border-foreground/15 px-3 py-1 text-sm font-thin uppercase tracking-[0.18em] transition-colors duration-300 hover:border-[var(--color-dark-blue)]/40 focus-visible:border-[var(--color-dark-blue)]/40 focus-visible:outline-none"
        >
            <span className="text-[var(--color-dark-blue)]">{locale}</span>

            <span className="relative flex h-3.5 w-3.5 items-center justify-center text-foreground/40 transition-colors duration-300 group-hover:text-[var(--color-dark-blue)]/70">
                <AnimatePresence mode="wait" initial={false}>
                    {showNext ? (
                        <motion.span
                            key="arrow"
                            initial={{ opacity: 0, x: -3 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 3 }}
                            transition={ICON_TRANSITION}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <ArrowRight size={14} strokeWidth={1.5} />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="swap"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={ICON_TRANSITION}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <ArrowLeftRight size={14} strokeWidth={1.5} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </span>

            <motion.span
                initial={false}
                animate={{ width: showNext ? "auto" : 0, opacity: showNext ? 1 : 0 }}
                transition={REVEAL_TRANSITION}
                className="overflow-hidden whitespace-nowrap text-foreground/40 transition-colors duration-300 group-hover:text-foreground/60"
            >
                {nextLocale}
            </motion.span>
        </button>
    );
}
