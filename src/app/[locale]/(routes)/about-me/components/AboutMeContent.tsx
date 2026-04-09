"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
    data: {
        h1: string;
        header: string;
        owner: string;
        image: {
            title: string;
            alt: string;
        }
        skills: {
            title: string;
        };
        paragraphs: string[];
        formation: {
            title: string;
        }
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
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        const handler = () => {
            setRefreshKey(prev => prev + 1)
        }

        window.addEventListener('reanimate-effects', handler)

        return () => {
            window.removeEventListener('reanimate-effects', handler)
        }
    }, [])

    return (
        <div>
            <section className="container-xxl mx-auto px-6 py-12 lg:py-20" key={refreshKey}>
                <motion.div
                    className="pb-12 md:h-[500px] lg:h-[600px] overflow-hidden relative shadow-[var(--shadow-card)] rounded-[var(--radius-card)]"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.6 }}
                        className="h-full grid gap-16 md:grid-cols-2 items-stretch">
                        <div className="pl-8 pt-6 lg:ml-18 lg:pb-36 md:pt-18 px-6">
                            <motion.h1 variants={item} className="text-xl uppercase tracking-widest text-brand-muted mb-16">
                                {data.h1}
                            </motion.h1>

                            <motion.p variants={item} className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                                {data.header}
                            </motion.p>
                        </div>

                        {/* Photo */}
                        <motion.div
                            variants={imageVariant}
                            className="w-60 h-72 md:w-80 md:h-full relative justify-self-center self-stretch"
                        >
                            {/* Blue background higher */}
                            <div className="absolute inset-0 bg-light-blue rounded-b-full" />

                            <div className="absolute inset-x-0 bottom-0 top-10 md:top-24 overflow-hidden rounded-b-full">
                                <Image
                                    src="/media/about/profile.png"
                                    title={data.image.title}
                                    alt={data.image.alt}
                                    sizes="50vw"
                                    quality={90}
                                    fill
                                    className="object-cover object-top"
                                    priority
                                    fetchPriority="high"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>
            <section className="container-xl mx-auto px-6" key={refreshKey + 1}>

                {/* Content */}
                <div className="grid md:grid-cols-[7fr_3fr] gap-10 items-start text-lg md:text-xl pb-24">

                    {/* LEFT */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="w-full"
                    >
                        {/* SKILLS */}
                        <motion.div
                            variants={item}
                            className="bg-yellow rounded-xl shadow-[var(--shadow-card-xs)] px-10 py-8"
                        >
                            <h2 className="text-xl uppercase tracking-widest mb-8">
                                {data.skills.title}
                            </h2>

                            <ul className="grid grid-cols-2 gap-x-16 gap-y-6">
                                {skills.map((skill) => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* TEXT */}
                        <motion.div className="mt-10 space-y-6 leading-relaxed">
                            {data.paragraphs.map((text, i) => (
                                <motion.p key={i} variants={item}>
                                    {text}
                                </motion.p>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex h-full"
                    >
                        <motion.div
                            variants={item}
                            className="w-full border border-dark-blue rounded-3xl px-8 py-8 min-h-[480px]"
                        >
                            <h2 className="text-xl uppercase tracking-widest mb-6">
                                {data.formation.title}
                            </h2>

                            <p className="text-md">
                                -
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}