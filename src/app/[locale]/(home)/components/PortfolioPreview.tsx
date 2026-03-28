"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/framer-motion-variants";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        id: "01",
        title: "Lumina Skin",
        category: "Branding & Packaging",
        year: "2025",
    },
    {
        id: "02",
        title: "Atelier Studio",
        category: "Editorial Design",
        year: "2024",
    },
    {
        id: "03",
        title: "Vanguard",
        category: "Digital Identity",
        year: "2024",
    }
];

export default function PortfolioPreview() {
    return (
        <section className="mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-32 border-t border-neutral-200 dark:border-neutral-800">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.div variants={fadeIn} className="flex justify-between items-end mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-brand-dark">
                        Proyectos destacados
                    </h2>
                    <Link href="/work" className="hidden md:inline-flex items-center gap-1 text-sm font-medium uppercase tracking-widest text-brand-muted hover:text-brand-dark transition-colors">
                        Ver todos <ArrowUpRight size={16} />
                    </Link>
                </motion.div>

                <div className="flex flex-col">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            variants={fadeIn}
                            className="group relative flex flex-col sm:flex-row sm:items-center justify-between py-10 border-b border-neutral-200 dark:border-neutral-800 hover:border-brand-dark dark:hover:border-brand-dark transition-colors cursor-pointer"
                        >
                            <div className="flex items-start sm:items-center gap-6 md:gap-12">
                                <span className="text-sm font-mono text-brand-muted">{project.id}</span>
                                <h3 className="text-3xl md:text-4xl font-serif text-brand-dark group-hover:italic transition-all">
                                    {project.title}
                                </h3>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-12 mt-4 sm:mt-0 w-full sm:w-auto">
                                <span className="text-sm text-brand-muted uppercase tracking-wider">{project.category}</span>
                                <span className="text-sm text-brand-muted">{project.year}</span>
                            </div>
                            {/* Hover Reveal Image Logic would go here */}
                        </motion.div>
                    ))}
                </div>

                <motion.div variants={fadeIn} className="mt-12 md:hidden">
                    <Link href="/work" className="inline-flex items-center gap-1 text-sm font-medium uppercase tracking-widest text-brand-dark">
                        Ver todos los proyectos <ArrowUpRight size={16} />
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
