"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/framer-motion-variants";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl'

export default function Hero() {
    const t = useTranslations()

    return (
        <section className="mx-auto max-w-7xl px-6 md:px-12 py-32 md:py-48 flex flex-col justify-center min-h-[80vh]">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="max-w-4xl"
            >
                <motion.p
                    variants={fadeIn}
                    className="text-sm font-medium uppercase tracking-widest text-brand-muted mb-6"
                >
                    {t('app.home.hero.portfolio')}
                </motion.p>
                <motion.h1
                    variants={fadeIn}
                    className="text-6xl md:text-8xl font-serif tracking-tight text-brand-dark leading-[1.1] mb-8"
                >
                    Diseño visual y <br />
                    <span className="italic">dirección de arte</span>
                </motion.h1>
                <motion.p
                    variants={fadeIn}
                    className="text-xl md:text-2xl text-brand-muted max-w-2xl leading-relaxed mb-12"
                >
                    Atención al detalle, minimalismo sistemático y una estética
                    premium para marcas que buscan destacar con elegancia.
                </motion.p>
                <motion.div variants={fadeIn}>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-base font-semibold text-brand-dark group"
                    >
                        <span className="relative overflow-hidden">
                            <span className="block border-b-2 border-brand-dark pb-1">Trabajemos juntos</span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-dark transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                        </span>
                        <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
