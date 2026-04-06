"use client";

import { motion, Variants } from "framer-motion";
import ContactForm from "./components/ContactForm";
import { useEffect, useState } from "react";

type Props = {
    data: {
        header: string;
        title: string;
        description: string;
        formTitle: string;
        contactLinks: {
            label: string;
            value: string;
            href: string | null;
        }[];
    };
};

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

const container: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.1 },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE_OUT },
    },
};

export default function ContactContent({ data }: Props) {
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        const handler = () => {
            setRefreshKey(prev => prev + 1)
        }

        window.addEventListener('reanimate-effects', handler)

        return () => {
            window.removeEventListener('reanimate-effects', handler)
        }
    }, [])

    return (
        <section className="container-xl mx-auto px-6 py-8 lg:py-16" key={refreshKey}>
            {/* Heading */}
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="mb-20"
            >
                <motion.h1 variants={item} className="text-xl uppercase tracking-widest text-brand-muted mb-4">
                    {data.header}
                </motion.h1>

                <motion.p variants={item} className="text-4xl tracking-tight sm:text-5xl">
                    {data.title}
                </motion.p>
            </motion.div>

            <div className="grid gap-16 md:grid-cols-2">
                {/* LEFT */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-col gap-12"
                >
                    <motion.p variants={item} className="text-lg text-brand-muted leading-relaxed max-w-2xl">
                        {data.description}
                    </motion.p>

                    <motion.ul className="space-y-6">
                        {data.contactLinks.map((link) => (
                            <motion.li key={link.label} variants={item} className="flex flex-col gap-1">
                                <span className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
                                    {link.label}
                                </span>

                                {link.href ? (
                                    <motion.a
                                        href={link.href}
                                        target={link.href.startsWith("http") ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        whileHover={{ x: 4 }}
                                        className="text-base font-medium hover:underline underline-offset-4"
                                    >
                                        {link.value}
                                    </motion.a>
                                ) : (
                                    <span className="text-base font-medium">
                                        {link.value}
                                    </span>
                                )}
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>

                {/* RIGHT */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <motion.h2 variants={item} className="text-xl mb-6">
                        {data.formTitle}
                    </motion.h2>

                    <motion.div variants={item}>
                        <ContactForm />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}