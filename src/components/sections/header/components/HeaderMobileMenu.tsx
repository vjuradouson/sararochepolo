"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { LOCALES } from '@/lib/config';
import { usePathname } from "next/navigation";
import { getPath } from "@/i18n/getPath";
import type { NavLink } from "@/components/sections/header/types/nav";

interface MobileMenuProps {
    links: NavLink[];
}

export function HeaderMobileMenu({ links }: MobileMenuProps) {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [openGroup, setOpenGroup] = useState<string | null>(null);
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

    useEffect(() => {
        if (!menuOpen) {
            setOpenGroup(null);
        }
    }, [menuOpen]);

    const normalizePath = (path: string) => {
        const localeRegex = new RegExp(`^\\/(${LOCALES.join('|')})`);
        return path.replace(localeRegex, '') || '/';
    };

    const normalizedPathname = normalizePath(pathname);

    const isHrefActive = (href: string) => {
        const localizedHref = getPath(href as any, locale);
        return (
            normalizedPathname === localizedHref ||
            (localizedHref !== "/" && normalizedPathname.startsWith(localizedHref))
        );
    };

    return (
        <>
            {/* Toggle button */}
            <button
                className="flex items-center justify-center p-2"
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
                            {links.map((link) => {
                                const { label, href, children } = link;

                                // ─── Expandable group ─────────────────────────
                                if (children && children.length > 0) {
                                    const isGroupOpen = openGroup === label;

                                    return (
                                        <li key={label}>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenGroup(isGroupOpen ? null : label)
                                                }
                                                aria-expanded={isGroupOpen}
                                                className="flex w-full items-center justify-between text-lg transition-colors text-brand-muted"
                                            >
                                                <span>{label}</span>
                                                {isGroupOpen ? (
                                                    <Minus size={18} />
                                                ) : (
                                                    <Plus size={18} />
                                                )}
                                            </button>

                                            <AnimatePresence initial={false}>
                                                {isGroupOpen && (
                                                    <motion.ul
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden pl-4 mt-3 space-y-3"
                                                    >
                                                        {children.map((child) => {
                                                            if (!child.href) return null;
                                                            const isActive = isHrefActive(child.href);

                                                            return (
                                                                <li key={child.href}>
                                                                    <Link
                                                                        href={child.href}
                                                                        onClick={() => setMenuOpen(false)}
                                                                        className={`block text-base transition-colors ${isActive
                                                                            ? ""
                                                                            : "text-brand-muted"
                                                                            }`}
                                                                    >
                                                                        {child.label}
                                                                    </Link>
                                                                </li>
                                                            );
                                                        })}
                                                    </motion.ul>
                                                )}
                                            </AnimatePresence>
                                        </li>
                                    );
                                }

                                // ─── Regular link ─────────────────────────────
                                if (!href) return null;
                                const isActive = isHrefActive(href);

                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            onClick={() => setMenuOpen(false)}
                                            className={`block text-lg transition-colors ${isActive
                                                ? ""
                                                : "text-brand-muted"
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
