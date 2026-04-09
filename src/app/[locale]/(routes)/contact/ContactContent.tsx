"use client";

import { motion, Variants } from "framer-motion";
import ContactForm from "./components/ContactForm";
import { useEffect, useState } from "react";

type Props = {
    data: {
        h1: string;
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
        <section className="container-xxl mx-auto px-6 py-12 lg:py-20" key={refreshKey}>
            <div className="grid gap-16 md:grid-cols-2 items-start">
                {/* LEFT */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    className="mb-16">
                    <motion.h1 variants={item} className="text-xl uppercase tracking-widest text-brand-muted mb-4">
                        {data.h1}
                    </motion.h1>
                    <motion.p variants={item} className="text-4xl tracking-tight sm:text-5xl mb-10">
                        {data.title}
                    </motion.p>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex flex-col gap-8"
                    >
                        <motion.p variants={item} className="text-xl leading-relaxed max-w-xl">
                            {data.description}
                        </motion.p>
                    </motion.div>
                </motion.div>
                {/* RIGHT */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <motion.div
                        variants={item}
                        className="rounded-2xl bg-neutral-100 pt-12 pb-14 pl-8 pr-8 shadow-card"
                    >
                        <ContactForm />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}