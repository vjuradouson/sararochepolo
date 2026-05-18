"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

type Props = {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
    buttonId: string;
    panelId: string;
};

export default function FAQItem({
    question,
    answer,
    isOpen,
    onToggle,
    buttonId,
    panelId,
}: Props) {
    return (
        <div className="border-t border-dark-blue/20 last:border-b">
            <button
                id={buttonId}
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg md:text-xl cursor-pointer"
            >
                <span className="font-medium">{question}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="shrink-0 text-dark-blue"
                >
                    <Plus className="h-5 w-5" aria-hidden="true" />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="panel"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 pr-10 leading-relaxed text-base md:text-lg">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
