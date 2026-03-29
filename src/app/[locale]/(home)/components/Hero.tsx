"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/framer-motion-variants";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl'

export default function Hero() {
    const t = useTranslations()

    return (
        <section className="mx-auto max-w-7xl px-6 md:px-12 py-16 md:py-16 flex flex-col justify-center min-h-[80vh]">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="max-w-4xl"
            >
                {/* Eyebrow */}
                <motion.p
                    variants={fadeIn}
                    className="text-sm font-medium uppercase tracking-widest text-brand-muted mb-6"
                >
                    {t("app.home.hero.product_designer")}
                </motion.p>

                {/* Headline */}
                <motion.h1
                    variants={fadeIn}
                    className="text-5xl md:text-7xl font-serif tracking-tight text-brand-dark leading-[1.1] mb-8"
                >
                    Transformando necesidades complejas
                    <br />
                    en <span className="italic">experiencias claras y funcionales</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    variants={fadeIn}
                    className="text-xl md:text-2xl text-brand-muted max-w-2xl leading-relaxed mb-12"
                >
                    Product Designer con más de 3 años de experiencia diseñando
                    interfaces intuitivas y sistemas visuales consistentes.
                    Combino UX, UI y comunicación visual para crear soluciones
                    digitales y físicas alineadas con negocio y usuario.
                </motion.p>

                {/* Extra value */}
                <motion.p
                    variants={fadeIn}
                    className="text-base text-brand-muted max-w-xl mb-12"
                >
                    Experiencia en Figma, Adobe Suite y WordPress, con enfoque en
                    consistencia de marca tanto en entornos digitales como en
                    piezas impresas. Español nativo · Inglés C2.
                </motion.p>

                {/* CTA */}
                <motion.div variants={fadeIn} className="flex items-center gap-8">
                    <Link
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document
                                .getElementById("projects")
                                ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-2 text-base font-semibold text-brand-dark group"
                    >
                        <span className="relative overflow-hidden">
                            <span className="block border-b-2 border-brand-dark pb-1">
                                Ver proyectos
                            </span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-dark transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                        </span>
                        <ArrowRight
                            size={20}
                            className="transform group-hover:translate-x-1 transition-transform"
                        />
                    </Link>

                    <Link
                        href="/contact"
                        className="text-base text-brand-muted hover:text-brand-dark transition-colors"
                    >
                        Contacto
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}