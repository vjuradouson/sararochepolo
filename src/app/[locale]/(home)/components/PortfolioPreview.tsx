"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/framer-motion-variants";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        id: "01",
        title: "Piquer Learning Platform",
        category: "UX/UI · Web App",
        year: "2025",
        description:
            "Rediseño de plataforma educativa mejorando la navegación y la claridad del contenido para estudiantes y profesores.",
    },
    {
        id: "02",
        title: "E-commerce Checkout Optimization",
        category: "UX Research · UI Design",
        year: "2024",
        description:
            "Optimización del flujo de compra reduciendo fricción y mejorando la conversión en dispositivos móviles.",
    },
    {
        id: "03",
        title: "Brand System & Print Suite",
        category: "Branding · Print Design",
        year: "2024",
        description:
            "Desarrollo de sistema visual aplicado a digital y materiales físicos: posters, roll-ups y piezas editoriales.",
    }
];

export default function PortfolioPreview() {
    return (
        <section id="projects" className="mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-32 border-t border-neutral-200">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Header */}
                <motion.div
                    variants={fadeIn}
                    className="flex justify-between items-end mb-16"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-brand-dark mb-4">
                            Proyectos seleccionados
                        </h2>
                        <p className="text-brand-muted max-w-md">
                            Casos de diseño centrados en producto, donde combino
                            experiencia de usuario, interfaz y comunicación visual
                            para resolver problemas reales.
                        </p>
                    </div>

                    <Link
                        href="/"
                        className="hidden md:inline-flex items-center gap-1 text-sm font-medium uppercase tracking-widest text-brand-muted hover:text-brand-dark transition-colors"
                    >
                        Ver todos <ArrowUpRight size={16} />
                    </Link>
                </motion.div>

                {/* Projects */}
                <div className="flex flex-col">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={fadeIn}
                            className="group relative flex flex-col sm:flex-row sm:items-start justify-between py-12 border-b border-neutral-200 hover:border-brand-dark transition-colors cursor-pointer"
                        >
                            {/* Left */}
                            <div className="flex flex-col gap-4 max-w-xl">
                                <div className="flex items-center gap-6 md:gap-12">
                                    <span className="text-sm font-mono text-brand-muted">
                                        {project.id}
                                    </span>

                                    <h3 className="text-3xl md:text-4xl font-serif text-brand-dark group-hover:italic transition-all">
                                        {project.title}
                                    </h3>
                                </div>

                                {/* Description (🔥 clave) */}
                                <p className="text-brand-muted leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            {/* Right */}
                            <div className="flex items-center justify-between sm:justify-end gap-12 mt-6 sm:mt-0 w-full sm:w-auto">
                                <span className="text-sm text-brand-muted uppercase tracking-wider">
                                    {project.category}
                                </span>
                                <span className="text-sm text-brand-muted">
                                    {project.year}
                                </span>
                            </div>

                            {/* Hover micro interaction */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight
                                    size={20}
                                    className="text-brand-dark"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile CTA */}
                <motion.div variants={fadeIn} className="mt-12 md:hidden">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1 text-sm font-medium uppercase tracking-widest text-brand-dark"
                    >
                        Ver todos los proyectos <ArrowUpRight size={16} />
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}