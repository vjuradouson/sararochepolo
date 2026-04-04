"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import NeoButton from "@/components/ui/NeoButton";

type Project = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    bg: string;
    content: React.ReactNode;
};

const projects: Project[] = [
    {
        id: 1,
        subtitle: "— Publicación empresa",
        title: "Redes sociales y Meta Ads",
        description:
            "Contenido de marca para redes sociales y Meta Ads siguiendo guidelines de empresa.",
        bg: "#2e2e2e",
        content: (
            <img
                src="/images/project1.png"
                alt="project1"
                className="w-[280px] md:w-[360px] drop-shadow-2xl"
            />
        ),
    },
    {
        id: 2,
        subtitle: "— Proyecto personal",
        title: "Diseño en Figma",
        description: "Diseño y prototipado de aplicaciones usando Figma.",
        bg: "#e8d5a9",
        content: (
            <img
                src="/images/project2.png"
                alt="project2"
                className="w-[280px] md:w-[360px] drop-shadow-2xl"
            />
        ),
    },
    {
        id: 3,
        subtitle: "— UI Experiment",
        title: "Mobile UI Concept",
        description:
            "Exploración visual de interfaces modernas para apps móviles.",
        bg: "#dfe6ec",
        content: (
            <img
                src="/images/project3.png"
                alt="project3"
                className="w-[280px] md:w-[360px] drop-shadow-2xl"
            />
        ),
    },
];

const textVariants = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 80 },
    show: { opacity: 1, scale: 1, x: 0 },
};

export default function ProjectsSection() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const isAnimating = useRef(false);
    const wheelAccumulator = useRef(0);
    const touchStartY = useRef<number | null>(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToSection = (index: number) => {
        const nextSection = sectionRefs.current[index];
        if (!nextSection) return;

        isAnimating.current = true;
        setActiveIndex(index);

        nextSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        window.setTimeout(() => {
            isAnimating.current = false;
            wheelAccumulator.current = 0;
        }, 900);
    };

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (!visible) return;

                const index = Number(
                    (visible.target as HTMLElement).dataset.index ?? 0
                );
                setActiveIndex(index);
            },
            {
                threshold: [0.4, 0.6, 0.8],
            }
        );

        sectionRefs.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        const isWrapperMostlyVisible = () => {
            const rect = wrapper.getBoundingClientRect();
            const viewportH = window.innerHeight;

            return rect.top < viewportH * 0.5 && rect.bottom > viewportH * 0.5;
        };

        const onWheel = (e: WheelEvent) => {
            if (!isWrapperMostlyVisible()) return;
            if (isAnimating.current) {
                e.preventDefault();
                return;
            }

            wheelAccumulator.current += e.deltaY;

            const threshold = 60;

            if (Math.abs(wheelAccumulator.current) < threshold) return;

            if (wheelAccumulator.current > 0) {
                // bajar
                const nextIndex = Math.min(activeIndex + 1, projects.length - 1);

                if (nextIndex !== activeIndex) {
                    e.preventDefault();
                    scrollToSection(nextIndex);
                }
            } else {
                // subir
                const prevIndex = Math.max(activeIndex - 1, 0);

                if (prevIndex !== activeIndex) {
                    e.preventDefault();
                    scrollToSection(prevIndex);
                }
            }
        };

        const onTouchStart = (e: TouchEvent) => {
            if (!isWrapperMostlyVisible()) return;
            touchStartY.current = e.touches[0]?.clientY ?? null;
        };

        const onTouchEnd = (e: TouchEvent) => {
            if (!isWrapperMostlyVisible()) return;
            if (isAnimating.current) return;
            if (touchStartY.current === null) return;

            const endY = e.changedTouches[0]?.clientY ?? null;
            if (endY === null) return;

            const diff = touchStartY.current - endY;
            const threshold = 50;

            if (Math.abs(diff) < threshold) return;

            if (diff > 0) {
                const nextIndex = Math.min(activeIndex + 1, projects.length - 1);
                if (nextIndex !== activeIndex) scrollToSection(nextIndex);
            } else {
                const prevIndex = Math.max(activeIndex - 1, 0);
                if (prevIndex !== activeIndex) scrollToSection(prevIndex);
            }

            touchStartY.current = null;
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchend", onTouchEnd, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [activeIndex]);

    return (
        <div ref={wrapperRef}>
            {projects.map((project, index) => (
                <section
                    key={project.id}
                    ref={(el) => {
                        sectionRefs.current[index] = el;
                    }}
                    data-index={index}
                    className="min-h-screen flex items-center overflow-hidden"
                    style={{ backgroundColor: project.bg }}
                >
                    <div className="max-w-[1400px] mx-auto px-6 w-full">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                variants={textVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ amount: 0.55, once: false }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className={index === 1 ? "text-black" : "text-white"}
                            >
                                <p className="text-xl opacity-60 mb-4">
                                    {project.subtitle}
                                </p>

                                <h2 className="text-3xl md:text-5xl font-light mb-6">
                                    {project.title}
                                </h2>

                                <p className="text-xl opacity-70 mb-8 max-w-[420px]">
                                    {project.description}
                                </p>

                                <NeoButton size="sm">
                                    <span className="text-xl">→</span>
                                    <span>VER PUBLICACIONES</span>
                                </NeoButton>
                            </motion.div>

                            <motion.div
                                className="flex justify-center md:justify-end"
                                variants={imageVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ amount: 0.55, once: false }}
                                transition={{ duration: 0.85, ease: "easeOut" }}
                            >
                                {project.content}
                            </motion.div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}