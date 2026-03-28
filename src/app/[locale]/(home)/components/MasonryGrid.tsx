"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const col1 = [
    { id: 1, src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f", span: "h-[440px]" },
    { id: 2, src: "https://images.unsplash.com/photo-1600607686527-6fb886090705", span: "h-[230px]" },
    { id: 3, src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7", span: "h-[230px]" },
];

const col2 = [
    { id: 4, src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d", span: "h-[230px]" },
    { id: "text", type: "text", span: "h-[440px]" },
    { id: 5, src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6", span: "h-[230px]" },
];

const col3 = [
    { id: 6, src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace", span: "h-[230px]" },
    { id: 7, src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d", span: "h-[230px]" },
    { id: 8, src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f", span: "h-[440px]" },
];

const Column = ({ items }: any) => (
    <div className="flex flex-col gap-4">
        {items.map((item: any, i: number) => (
            <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.4 }}
                className={`relative rounded-2xl overflow-hidden ${item.span}`}
            >
                {item.type === "text" ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center bg-zinc-100 dark:bg-zinc-900 p-6">
                        <h3 className="text-xl font-serif mb-2">
                            La Belleza de lo Esencial
                        </h3>
                        <p className="text-sm text-zinc-500">
                            Diseño atemporal y minimalista.
                        </p>
                    </div>
                ) : (
                    <Image
                        src={`${item.src}?auto=format&fit=crop&w=800&q=80`}
                        alt=""
                        fill
                        className="object-cover"
                    />
                )}
            </motion.div>
        ))}
    </div>
);

export default function MasonryGrid() {
    return (
        <section className="py-24 w-full max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-3 gap-6">
                <Column items={col1} />
                <Column items={col2} />
                <Column items={col3} />
            </div>
        </section>
    );
}