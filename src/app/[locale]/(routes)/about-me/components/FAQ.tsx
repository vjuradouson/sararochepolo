"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import FAQItem from "./FAQItem";

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

export type FAQEntry = {
    q: string;
    a: string;
};

type Props = {
    title: string;
    items: FAQEntry[];
};

export default function FAQ({ title, items }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const idPrefix = useId();

    return (
        <section className="container-xl mx-auto px-6 py-20 md:py-28">
            <div className="mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, ease: EASE_OUT }}
                    className="text-xl uppercase tracking-widest mb-12"
                >
                    {title}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
                >
                    {items.map((entry, i) => (
                        <FAQItem
                            key={i}
                            question={entry.q}
                            answer={entry.a}
                            isOpen={openIndex === i}
                            onToggle={() =>
                                setOpenIndex(openIndex === i ? null : i)
                            }
                            buttonId={`${idPrefix}-faq-${i}-button`}
                            panelId={`${idPrefix}-faq-${i}-panel`}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
