"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

type Props = {
    data: {
        header: string;
        title: string;
        owner: string;
        paragraphs: string[];
        labels: {
            skills: string;
            info: string;
            location: string;
            languages: string;
        };
        info: {
            location: string;
            languages: string;
        };
    };
};

const skills = [
    "UX Research & User Flows",
    "UI Design & Design Systems",
    "Figma & Prototyping",
    "WordPress & Web Design",
    "Branding & Visual Identity",
    "Print Design & Prepress (CMYK)",
];

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

const container: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: EASE_OUT,
        },
    },
};

const imageVariant: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.9,
            ease: EASE_OUT,
        },
    },
};

export default function AboutContent({ data }: Props) {
    return (
        <section className="container-xl mx-auto px-6 py-8 lg:py-16">
            {/* Heading */}
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="mb-20"
            >
                <motion.h1 variants={item} className="text-xl uppercase tracking-widest text-brand-muted mb-4">
                    {data.header}
                </motion.h1>

                <motion.p variants={item} className="text-4xl tracking-tight sm:text-5xl">
                    {data.title}
                </motion.p>
            </motion.div>

            {/* Content */}
            <div className="grid gap-16 md:grid-cols-2">
                {/* Left */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex flex-col gap-10"
                >
                    {/* Avatar */}
                    <motion.div
                        variants={imageVariant}
                        className="w-56 h-56 md:w-72 md:h-72 relative"
                    >
                        <Image
                            src="/media/about/profile.png"
                            alt={data.owner}
                            fill
                            className="object-cover object-top rounded-2xl shadow-xl border border-gray-200"
                            priority
                        />
                    </motion.div>

                    {/* Paragraphs */}
                    <motion.div className="space-y-6 text-lg text-brand-muted leading-relaxed max-w-lg">
                        {data.paragraphs.map((text, i) => (
                            <motion.p key={i} variants={item}>
                                {text}
                            </motion.p>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex flex-col gap-12 mt-4 md:mt-0"
                >
                    {/* Skills */}
                    <div>
                        <motion.h2 variants={item} className="text-xs font-semibold uppercase tracking-widest text-brand-muted mb-6">
                            {data.labels.skills}
                        </motion.h2>

                        <motion.ul variants={container} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {skills.map((skill) => (
                                <motion.li key={skill} variants={item} className="flex items-center gap-3 text-base">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-muted flex-shrink-0" />
                                    {skill}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>

                    {/* Info */}
                    <div>
                        <motion.h2 variants={item} className="text-xs font-semibold uppercase tracking-widest text-brand-muted mb-6">
                            {data.labels.info}
                        </motion.h2>

                        <motion.ul variants={container} className="space-y-4 text-base">
                            <motion.li variants={item} className="flex items-center">
                                <span className="text-brand-muted w-24">{data.labels.location}</span>
                                <span className="font-medium">{data.info.location}</span>
                            </motion.li>

                            <motion.li variants={item} className="flex items-center">
                                <span className="text-brand-muted w-24">{data.labels.languages}</span>
                                <span className="font-medium">{data.info.languages}</span>
                            </motion.li>
                        </motion.ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}