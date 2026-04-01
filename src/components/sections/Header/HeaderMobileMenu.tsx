"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { PATHNAMES } from '@/i18n/routing';
import { LOCALES } from '@/lib/config';
import { usePathname } from "next/navigation";

interface MobileMenuProps {
    links: { href: string; label: string }[];
}

export function HeaderMobileMenu({ links }: MobileMenuProps) {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        }

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    const normalizePath = (path: string) => {
        const localeRegex = new RegExp(`^\\/(${LOCALES.join('|')})`);
        return path.replace(localeRegex, '') || '/';
    };

    const normalizedPathname = normalizePath(pathname);

    return (
        <>
            {/* Toggle button */}
            <button
                className="flex items-center justify-center p-2 text-brand-dark"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
            >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Dropdown menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        ref={mobileMenuRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden absolute top-20 left-0 right-0 border-b border-neutral-200 bg-white"
                    >
                        <ul className="flex flex-col px-6 py-4 space-y-4">
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
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            onClick={() => setMenuOpen(false)}
                                            className={`block text-lg transition-colors ${isActive
                                                ? "text-brand-dark"
                                                : "text-brand-muted hover:text-brand-dark"
                                                }`}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
