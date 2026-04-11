"use client";

import { motion, Variants } from "framer-motion";
import ContactForm from "./components/ContactForm";
import { useEffect, useState } from "react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";

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
        location: {
            label: string;
            value: string;
        };
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

const getStyles = (label: string) => {
    const l = label.toLowerCase();

    if (l.includes("linkedin")) {
        return {
            icon: (
                <FaLinkedin className="text-dark-blue/60 group-hover:text-[#0A66C2] transition duration-300" size={20} />
            ),
            text: "group-hover:text-[#0A66C2]",
            bg: "group-hover:bg-[#0A66C2]/5",
            border: "group-hover:border-[#0A66C2]/30",
            glow: "group-hover:shadow-[0_0_20px_rgba(10,102,194,0.15)]",
            arrow: "group-hover:text-[#0A66C2]",
        };
    }

    if (l.includes("instagram")) {
        return {
            icon: (
                <FaInstagram className="text-dark-blue/60 group-hover:text-pink-500 transition duration-300" size={20}
                />
            ),
            text: "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#f58529] group-hover:via-[#dd2a7b] group-hover:to-[#8134af]",
            bg: "group-hover:bg-gradient-to-r group-hover:from-[#f58529]/10 group-hover:via-[#dd2a7b]/10 group-hover:to-[#8134af]/10",
            border: "group-hover:border-[#dd2a7b]/30",
            glow: "group-hover:shadow-[0_0_25px_rgba(221,42,123,0.2)]",
            arrow: "group-hover:text-[#dd2a7b]",
        };
    }

    return {
        icon: null,
        text: "",
        bg: "",
        border: "",
        glow: "",
        arrow: "",
    };
};

export default function ContactContent({ data }: Props) {
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const handler = () => {
            setRefreshKey((prev) => prev + 1);
        };

        window.addEventListener("reanimate-effects", handler);

        return () => {
            window.removeEventListener("reanimate-effects", handler);
        };
    }, []);

    return (
        <section className="container-xl mx-auto px-6 py-6 md:py-12 lg:py-20" key={refreshKey}>
            <div className="grid items-start md:gap-20 md:grid-cols-2">
                {/* LEFT */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    className="mb-16"
                >
                    <motion.h1
                        variants={item}
                        className="mb-4 text-xl uppercase tracking-widest text-brand-muted"
                    >
                        {data.h1}
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="mb-10 text-4xl tracking-tight sm:text-5xl"
                    >
                        {data.title}
                    </motion.p>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex flex-col gap-8"
                    >
                        <motion.p
                            variants={item}
                            className="max-w-xl text-xl leading-relaxed text-dark-blue/75"
                        >
                            {data.description}
                        </motion.p>
                    </motion.div>

                    {/* CONTACT BLOCK */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mt-14 max-w-2xl border-t border-dark-blue/20"
                    >
                        {data.contactLinks.map((link, index) => {
                            const styles = getStyles(link.label);

                            return (
                                <motion.div
                                    variants={item}
                                    key={index}
                                    className="border-b border-dark-blue/20"
                                >
                                    <a
                                        href={link.href ?? "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`
                                            group relative flex items-center justify-between gap-6
                                            py-5 transition-all duration-300 ease-out
                                            after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
                                            after:bg-dark-blue/20 after:transition-all after:duration-300
                                            hover:after:w-full
                                        `}
                                    >
                                        <div className="flex min-w-0 items-center gap-4">
                                            <div className="shrink-0">
                                                {styles.icon}
                                            </div>

                                            <div className="min-w-0">
                                                <span className="mb-1 block text-md uppercase tracking-[0.18em] text-dark-blue">
                                                    {link.label}
                                                </span>

                                                <span
                                                    className={`
                                                        inline-block font-medium text-dark-blue text-lg
                                                        transition-colors duration-300
                                                        ${styles.text}
                                                    `}
                                                >
                                                    {link.value}
                                                </span>
                                            </div>
                                        </div>

                                        <FiArrowUpRight
                                            size={17}
                                            className={`
                                                shrink-0 text-dark-blue/40 transition-all duration-300
                                                group-hover:-translate-y-0.5 group-hover:translate-x-0.5
                                                ${styles.arrow}
                                            `}
                                        />
                                    </a>
                                </motion.div>
                            );
                        })}

                        {/* LOCATION */}
                        <motion.div
                            variants={item}
                            className="border-b border-dark-blue/20"
                        >
                            <div className="flex items-center justify-between gap-6 py-5">
                                <div className="flex min-w-0 items-center gap-4">
                                    <div className="shrink-0 text-dark-blue">
                                        <HiOutlineLocationMarker size={20} />
                                    </div>

                                    <div className="min-w-0">
                                        <span className="mb-1 block text-md uppercase tracking-[0.18em] text-dark-blue">
                                            {data.location.label}
                                        </span>
                                        <span className="text-base font-medium text-dark-blue">
                                            {data.location.value}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* RIGHT */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex items-center h-full w-full"
                >
                    <motion.div variants={item} className="rounded-2xl w-full">
                        <ContactForm />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}   