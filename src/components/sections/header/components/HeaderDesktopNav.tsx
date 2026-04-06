"use client";

import { Link } from '@/i18n/navigation'
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from 'next-intl'
import { PATHNAMES } from '@/i18n/routing';
import { LOCALES } from '@/lib/config';
import { usePathname } from "next/navigation";
import { useSmoothScrollToTop } from "@/hooks/useSmoothScrollToTop";

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
    const { smoothScrollToTop, isScrolling } = useSmoothScrollToTop();

    const handleClick = (href: string) => (e: React.MouseEvent) => {
        const localeRegex = /^\/[a-z]{2}/;
        const normalizedPath = pathname.replace(localeRegex, '') || '/';

        const routeConfig = PATHNAMES[href as keyof typeof PATHNAMES];

        const localizedHref =
            typeof routeConfig === "string"
                ? routeConfig
                : routeConfig[locale];

        console.log(localizedHref, normalizedPath);

        if (localizedHref === normalizedPath) {
            e.preventDefault();

            if (!isScrolling.current) {
                smoothScrollToTop();
            }
        }
    };

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
                                    className="absolute inset-0 rounded-full nav-item-active"
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
                            onClick={handleClick(href)}
                            className={`relative z-10 px-4 py-1 text-body-lg rounded-full transition-all duration-200 
                                ${isActive
                                    ? "text-[#0B3C49]"
                                    : "hover:bg-light-blue/20 hover:text-[#0B3C49] hover:shadow-sm"
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
