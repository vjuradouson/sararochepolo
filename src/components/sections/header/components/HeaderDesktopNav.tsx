"use client";

import { Link } from '@/i18n/navigation'
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from 'next-intl'
import { PATHNAMES } from '@/i18n/routing';
import { LOCALES } from '@/lib/config';
import { usePathname } from "next/navigation";

interface DesktopNavProps {
    links: { href: string; label: string }[];
}

export function HeaderDesktopNav({ links }: DesktopNavProps) {
    const pathname = usePathname();

    const [mounted, setMounted] = useState(false);
    const locale = useLocale();

    useEffect(() => {
        setMounted(true);
    }, []);

    const normalizePath = (path: string) => {
        const localeRegex = new RegExp(`^\\/(${LOCALES.join('|')})`);
        return path.replace(localeRegex, '') || '/';
    };

    const normalizedPathname = normalizePath(pathname);

    return (
        <ul className="flex items-center gap-6">
            {links.map(({ href, label }) => {
                const routeConfig = PATHNAMES[href as keyof typeof PATHNAMES];

                const localizedHref =
                    typeof routeConfig === "string"
                        ? routeConfig
                        : routeConfig[locale];

                const isActive =
                    normalizedPathname === localizedHref ||
                    (localizedHref !== "/" &&
                        normalizedPathname.startsWith(localizedHref));

                return (
                    <li key={href} className="relative">
                        <AnimatePresence>
                            {mounted && isActive && (
                                <motion.span
                                    layoutId="active-pill"
                                    className="absolute inset-0 rounded-full bg-brand-light nav-item-active"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{
                                        opacity: { duration: 0.2 },
                                        scale: { duration: 0.2 },
                                        layout: { type: "spring", stiffness: 400, damping: 30 }
                                    }}
                                />
                            )}
                        </AnimatePresence>

                        <Link
                            href={href}
                            className={`relative z-10 px-4 py-2 text-body-lg transition-colors ${isActive ? "" : "hover:text-light-blue"
                                }`}
                        >
                            {label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
