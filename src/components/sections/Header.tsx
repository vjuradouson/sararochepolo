"use client";

import { Link } from '@/i18n/navigation'
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
    { href: "/about", label: "Sobre mí" },
    { href: "/contact", label: "Contacto" },
];

export default function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const isHome = pathname.split('/').length === 2

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12 h-20"
                aria-label="Navegación principal"
            >
                {/* Logo / Brand */}
                <Link
                    href="/"
                    onClick={(e) => {
                        setMenuOpen(false)

                        if (isHome) {
                            e.preventDefault()
                            window.dispatchEvent(new Event('reanimate-home'))
                        }
                    }}
                    className="text-xl font-serif tracking-tight text-brand-dark hover:opacity-75 transition-opacity"
                >
                    Sara Roche Polo
                </Link>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-6">
                    {links.map(({ href, label }) => {
                        const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`relative text-sm font-medium transition-colors ${isActive
                                        ? "text-brand-dark"
                                        : "text-brand-muted hover:text-brand-dark"
                                        }`}
                                >
                                    {label}
                                    {isActive && (
                                        <motion.span
                                            layoutId="underline"
                                            className="absolute left-0 right-0 -bottom-1 h-px bg-brand-dark"
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex items-center justify-center p-2 text-brand-dark"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden absolute top-20 left-0 right-0 border-b border-neutral-200 bg-white"
                    >
                        <ul className="flex flex-col px-6 py-4 space-y-4">
                            {links.map(({ href, label }) => {
                                const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            onClick={() => setMenuOpen(false)}
                                            className={`block text-lg font-serif transition-colors ${isActive
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
