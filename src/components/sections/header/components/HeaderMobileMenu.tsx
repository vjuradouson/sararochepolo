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
                                                className="flex w-full items-center justify-between text-xl transition-colors text-brand-muted"
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
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="relative pl-6 pt-4 pb-1">
                                                            <motion.span
                                                                initial={{ scaleY: 0 }}
                                                                animate={{
                                                                    scaleY: 1,
                                                                    transition: { duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] },
                                                                }}
                                                                exit={{
                                                                    scaleY: 0,
                                                                    transition: { duration: 0.22, ease: [0.7, 0, 0.84, 0] },
                                                                }}
                                                                aria-hidden="true"
                                                                className="absolute left-0 top-2 bottom-2 w-px origin-top bg-foreground/20"
                                                            />

                                                            <ul className="flex flex-col gap-4">
                                                                {children.map((child, idx) => {
                                                                    if (!child.href) return null;
                                                                    const isActive = isHrefActive(child.href);

                                                                    return (
                                                                        <motion.li
                                                                            key={child.href}
                                                                            initial={{ opacity: 0, x: -12 }}
                                                                            animate={{
                                                                                opacity: 1,
                                                                                x: 0,
                                                                                transition: {
                                                                                    duration: 0.4,
                                                                                    delay: 0.18 + idx * 0.08,
                                                                                    ease: [0.16, 1, 0.3, 1],
                                                                                },
                                                                            }}
                                                                            exit={{
                                                                                opacity: 0,
                                                                                x: -12,
                                                                                transition: {
                                                                                    duration: 0.18,
                                                                                    ease: [0.7, 0, 0.84, 0],
                                                                                },
                                                                            }}
                                                                        >
                                                                            <Link
                                                                                href={child.href}
                                                                                onClick={() => setMenuOpen(false)}
                                                                                className={`flex items-center justify-between text-lg transition-colors ${isActive
                                                                                    ? ""
                                                                                    : "text-brand-muted"
                                                                                    }`}
                                                                            >
                                                                                <span>{child.label}</span>
                                                                            </Link>
                                                                        </motion.li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </motion.div>
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
                                            className={`block text-xl transition-colors ${isActive
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
