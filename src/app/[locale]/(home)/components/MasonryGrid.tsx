"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const col1 = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
        span: "h-[440px]",
        title: "Piquer Platform",
        tag: "UX/UI · Web App",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
        span: "h-[230px]",
        title: "Design System",
        tag: "UI · Figma",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1558655146-d09347e92766",
        span: "h-[230px]",
        title: "Landing Optimization",
        tag: "UX · Conversion",
    },
];

const col2 = [
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        span: "h-[230px]",
        title: "WordPress UX",
        tag: "Web Design",
    },
    {
        id: "text",
        type: "text",
        span: "h-[440px]",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
        span: "h-[230px]",
        title: "Editorial Layout",
        tag: "Print · CMYK",
    },
];

const col3 = [
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1558655146-d09347e92766",
        span: "h-[230px]",
        title: "Brand System",
        tag: "Visual Identity",
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1600607686527-6fb886090705",
        span: "h-[230px]",
        title: "Roll-ups & Posters",
        tag: "Print Design",
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        span: "h-[440px]",
        title: "Cross-channel Design",
        tag: "Digital + Physical",
    },
];

const Column = ({ items }: any) => (
    <div className="flex flex-col gap-4">
        {items.map((item: any, i: number) => (
            <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`relative rounded-2xl overflow-hidden group ${item.span}`}
            >
                {item.type === "text" ? (
                    <div className="w-full h-full flex flex-col justify-center bg-zinc-100 p-8">
                        <h3 className="text-2xl mb-4">
                            Diseño centrado en producto
                        </h3>
                        <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                            Experiencia diseñando soluciones UX/UI para entornos reales,
                            desde plataformas educativas hasta sistemas visuales completos.
                        </p>
                        <p className="text-sm text-zinc-500">
                            Figma · Adobe Suite · WordPress <br />
                            Español nativo · Inglés C2
                        </p>
                    </div>
                ) : (
                    <>
                        <Image
                            src={`${item.src}?auto=format&fit=crop&w=800&q=80`}
                            alt={item.title}
                            fill
                            priority={i === 0}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                        {/* Text */}
                        <div className="absolute bottom-0 left-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-xs uppercase tracking-widest mb-1">
                                {item.tag}
                            </p>
                            <h4 className="text-lg font-semibold">
                                {item.title}
                            </h4>
                        </div>
                    </>
                )}
            </motion.div>
        ))}
    </div>
);

export default function MasonryGrid() {
    return (
        <section className="py-24 w-full max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

                <Column items={col1} />
                <Column items={col2} />

                <div className="hidden md:block">
                    <Column items={col3} />
                </div>

            </div>
        </section>
    );
}