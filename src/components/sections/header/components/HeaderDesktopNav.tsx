"use client";

import { Link } from '@/i18n/navigation'
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from 'next-intl'
import { PATHNAMES } from '@/i18n/routing';
import { LOCALES } from '@/lib/config';
import { usePathname } from "next/navigation";
import { useSmoothScrollToTop } from "@/hooks/useSmoothScrollToTop";
import { ChevronDown } from "lucide-react";
import type { NavLink } from "@/components/sections/header/types/nav";

interface DesktopNavProps {
    links: NavLink[];
}

/**
 * Renders the active label while reserving the width of the longest translation.
 * All locale labels are stacked in the same grid cell (`col-start-1 row-start-1`)
 * so the cell's intrinsic width is `max(translations)` regardless of which one
 * is currently visible — no horizontal layout shift on locale change.
 */
function NavLabel({ current, labels }: { current: string; labels?: string[] }) {
    const variants = labels && labels.length > 1 ? labels : null;
    if (!variants) return <>{current}</>;

    return (
        <span className="inline-grid">
            {variants.map((variant, i) => (
                <span
                    key={i}
                    aria-hidden={variant !== current}
                    className={`col-start-1 row-start-1 whitespace-nowrap ${variant === current ? "" : "invisible"}`}
                >
                    {variant}
                </span>
            ))}
        </span>
    );
}

export function HeaderDesktopNav({ links }: DesktopNavProps) {
    const pathname = usePathname();

    const [mounted, setMounted] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const locale = useLocale();
    const dropdownRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenDropdown(null);
            }
        }

        if (openDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openDropdown]);

    const normalizePath = (path: string) => {
        const localeRegex = new RegExp(`^\\/(${LOCALES.join('|')})`);
        return path.replace(localeRegex, '') || '/';
    };

    const normalizedPathname = normalizePath(pathname);
    const { smoothScrollToTop, isScrolling } = useSmoothScrollToTop();

    const getLocalizedHref = (href: string) => {
        const routeConfig = PATHNAMES[href as keyof typeof PATHNAMES];
        return typeof routeConfig === "string" ? routeConfig : routeConfig[locale];
    };

    const handleClick = (href: string) => (e: React.MouseEvent) => {
        const localizedHref = getLocalizedHref(href);
        const normalizedPath = normalizePath(pathname);

        if (localizedHref === normalizedPath) {
            e.preventDefault();

            if (!isScrolling.current) {
                smoothScrollToTop();
            }
        }
    };

    return (
        <ul className="flex items-center sm:gap-2 gap-4">
            {links.map((link) => {
                const { label, href, children } = link;

                // ─── Dropdown item (with children) ──────────────────────────────
                if (children && children.length > 0) {
                    const isOpen = openDropdown === label;

                    const childActive = children.some((child) => {
                        if (!child.href) return false;
                        const childHref = getLocalizedHref(child.href);
                        return (
                            normalizedPathname === childHref ||
                            (childHref !== "/" && normalizedPathname.startsWith(childHref))
                        );
                    });

                    return (
                        <li
                            key={label}
                            className="relative"
                            ref={isOpen ? dropdownRef : null}
                        >
                            <AnimatePresence>
                                {mounted && childActive && !isOpen && (
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

                            <button
                                type="button"
                                onClick={() => setOpenDropdown(isOpen ? null : label)}
                                aria-haspopup="true"
                                aria-expanded={isOpen}
                                className={`cursor-pointer relative z-10 flex items-center gap-1 px-4 py-1 text-body-lg rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-300
                                    ${childActive
                                        ? "text-[#0B3C49]"
                                        : "hover:bg-light-blue/20 hover:text-[#0B3C49] hover:shadow-sm"
                                    }`}
                            >
                                <NavLabel current={label} labels={link.labels} />
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute left-0 top-full z-50 mt-3 min-w-[260px] rounded-2xl border border-foreground/8 bg-white px-4 py-6 shadow-[0_20px_50px_-20px_rgba(11,60,73,0.14)]"
                                    >
                                        <ul className="flex flex-col gap-2">
                                            {children.map((child, idx) => {
                                                if (!child.href) return null;
                                                const childHref = getLocalizedHref(child.href);
                                                const isActive =
                                                    normalizedPathname === childHref ||
                                                    (childHref !== "/" && normalizedPathname.startsWith(childHref));

                                                return (
                                                    <motion.li
                                                        key={child.href}
                                                        initial={{ opacity: 0, y: 8 }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                            transition: {
                                                                duration: 0.4,
                                                                delay: 0.1 + idx * 0.08,
                                                                ease: [0.16, 1, 0.3, 1],
                                                            },
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            y: 8,
                                                            transition: {
                                                                duration: 0.16,
                                                                ease: [0.7, 0, 0.84, 0],
                                                            },
                                                        }}
                                                    >
                                                        <Link
                                                            href={child.href}
                                                            onClick={(e) => {
                                                                handleClick(child.href!)(e);
                                                                setOpenDropdown(null);
                                                            }}
                                                            className={`block rounded-full border px-4 py-1 text-body-lg transition-all duration-200
                                                                ${isActive
                                                                    ? "border-light-blue/60 bg-light-blue/60 text-[#0B3C49]"
                                                                    : "border-transparent text-brand-muted hover:bg-light-blue/20 hover:text-[#0B3C49] hover:shadow-sm"
                                                                }`}
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    </motion.li>
                                                );
                                            })}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    );
                }

                // ─── Regular link ──────────────────────────────────────────────
                if (!href) return null;

                const localizedHref = getLocalizedHref(href);
                const isActive =
                    normalizedPathname === localizedHref ||
                    (localizedHref !== "/" && normalizedPathname.startsWith(localizedHref));

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
                            <NavLabel current={label} labels={link.labels} />
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
