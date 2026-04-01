"use client";

import { Link } from '@/i18n/navigation'
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/sections/Header/LanguageSwitcher";
import { useLocale, useTranslations } from 'next-intl'
import { PATHNAMES } from '@/i18n/routing';
import { ROUTES } from '@/constants/routes'
import { LOCALES } from '@/lib/config';

export default function Header() {
    const t = useTranslations("app")

    const links = [
        { href: ROUTES.ABOUT, label: t("header.links.about") },
        { href: ROUTES.CONTACT, label: t("header.links.contact") },
    ];

    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const locale = useLocale();

    useEffect(() => {
        setMounted(true);
    }, []);

    const mobileMenuRef = useRef<HTMLDivElement>(null);
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
    const isHome = normalizedPathname === "/";

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-light-blue">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12 h-20"
                aria-label="Navegación principal"
            >
                {/* Logo */}
                <Link
                    href="/"
                    onClick={(e) => {
                        setMenuOpen(false)

                        if (isHome) {
                            e.preventDefault()
                            window.dispatchEvent(new Event('reanimate-home'))
                        }
                    }}
                    className="font-thin text-body-lg leading-none tracking-normal text-brand-dark hover:opacity-75 transition-opacity"
                >
                    {t("portfolio.owner")}
                </Link>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-8">
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
                                        className={`relative z-10 px-4 py-2 text-body-lg transition-colors ${isActive ? "text-brand-dark" : "hover:text-light-blue"
                                            }`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <LanguageSwitcher />
                </div>

                {/* Mobile */}
                <div className="md:hidden flex items-center gap-3">
                    <LanguageSwitcher />
                    <button
                        className="flex items-center justify-center p-2 text-brand-dark"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile dropdown (NO tocar) */}
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
        </header>
    );
}