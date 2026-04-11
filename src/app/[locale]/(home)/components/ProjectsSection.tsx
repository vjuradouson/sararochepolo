"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import NeoButton from "@/components/ui/NeoButton";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Project = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    bgFrom: string;
    bgTo: string;
    textColor: string;
    parentClass: string,
    content: React.ReactNode;
};

const textVariants = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 80 },
    show: { opacity: 1, scale: 1, x: 0 },
};

export default function ProjectsSection() {
    const t = useTranslations("app");

    const projects: Project[] = [
        {
            id: 1,
            subtitle: "— " + t("home.projects.2.subtitle"),
            title: t("home.projects.2.title"),
            description: t("home.projects.2.description"),
            bgFrom: "#EEEDE9",
            bgTo: "#FFEBC0",
            textColor: "text-black",
            parentClass: "w-full min-h-[280px] md:min-h-[500px]",
            content: (
                <Image
                    src="/media/home/projects/figma_pet_buddy.png"
                    title={t("home.projects.2.image_title")}
                    alt={t("home.projects.2.image_alt")}
                    width={1000}
                    height={1000}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    className="w-full h-auto object-contain drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)] my-5"
                />
            ),
        },
        {
            id: 2,
            subtitle: "— " + t("home.projects.1.subtitle"),
            title: t("home.projects.1.title"),
            description: t("home.projects.1.description"),
            bgFrom: "#A3A3A3",
            bgTo: "#404040",
            textColor: "text-white",
            parentClass: "h-[500px] md:h-[100vh] md:min-h-[500px]",
            content: (
                <Image
                    src="/media/home/projects/meta_adds.png"
                    title={t("home.projects.1.image_title")}
                    alt={t("home.projects.1.image_alt")}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    className="object-contain drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)] rotate-[30deg] scale-[0.9] md:scale-[1.1] -translate-x-4 md:translate-x-0"
                />
            ),
        },
        {
            id: 3,
            subtitle: "— " + t("home.projects.3.subtitle"),
            title: t("home.projects.3.title"),
            description: t("home.projects.3.description"),
            bgFrom: "#F6F2BA",
            bgTo: "#B0CCE4",
            textColor: "text-black",
            parentClass: "w-full h-full md:min-h-[500px]",
            content: (
                <Image
                    src="/media/home/projects/cars_ilustration.png"
                    title={t("home.projects.3.image_title")}
                    alt={t("home.projects.3.image_alt")}
                    width={1000}
                    height={1000}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    className="object-contain drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)] mt-5 mb-5"
                />
            ),
        },
    ];

    const wrapperRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const isAnimating = useRef(false);
    const wheelAccumulator = useRef(0);
    const animationFrameRef = useRef<number | null>(null);
    const activeIndexRef = useRef(0);

    const [activeIndex, setActiveIndex] = useState(0);

    const setIndex = (index: number) => {
        activeIndexRef.current = index;
        setActiveIndex(index);
    };

    const getSectionTop = (index: number) => {
        const el = sectionRefs.current[index];
        return el ? el.offsetTop : 0;
    };

    const getNearestSectionIndex = () => {
        let nearestIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        sectionRefs.current.forEach((section, index) => {
            if (!section) return;

            const distance = Math.abs(section.offsetTop - window.scrollY);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestIndex = index;
            }
        });

        return nearestIndex;
    };

    const isInsideProjectsViewport = () => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return false;

        const rect = wrapper.getBoundingClientRect();
        const vh = window.innerHeight;

        return rect.top < vh * 0.5 && rect.bottom > vh * 0.5;
    };

    const isEnteringFirstFromAbove = () => {
        const wrapper = wrapperRef.current;
        const firstSection = sectionRefs.current[0];
        if (!wrapper || !firstSection) return false;

        const wrapperRect = wrapper.getBoundingClientRect();

        const visibleHeight =
            Math.min(wrapperRect.bottom, window.innerHeight) -
            Math.max(wrapperRect.top, 0);

        const visibilityRatio = visibleHeight / window.innerHeight;

        const scrollY = window.scrollY;
        const firstTop = firstSection.offsetTop;

        const firstNotAligned = scrollY < firstTop - 2;

        return visibilityRatio > 0.4 && firstNotAligned;
    };

    const isEnteringLastFromBelow = () => {
        const wrapper = wrapperRef.current;
        const lastSection = sectionRefs.current[projects.length - 1];
        if (!wrapper || !lastSection) return false;

        const wrapperRect = wrapper.getBoundingClientRect();

        const visibleHeight =
            Math.min(wrapperRect.bottom, window.innerHeight) -
            Math.max(wrapperRect.top, 0);

        const visibilityRatio = visibleHeight / window.innerHeight;

        const scrollY = window.scrollY;
        const lastTop = lastSection.offsetTop;

        const lastNotAligned = scrollY > lastTop + 2;

        return visibilityRatio > 0.4 && lastNotAligned;
    };

    const scrollToSection = (index: number) => {
        const target = sectionRefs.current[index];
        if (!target) return;

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        isAnimating.current = true;
        setIndex(index);

        const targetY = target.offsetTop;
        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = 1400;

        let startTime: number | null = null;

        const easeInOut = (t: number) =>
            t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const animate = (time: number) => {
            if (startTime === null) startTime = time;

            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOut(progress);

            window.scrollTo(0, startY + distance * eased);

            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                animationFrameRef.current = null;
                isAnimating.current = false;
                wheelAccumulator.current = 0;
                setIndex(index);
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        // Disable in mobile to avoid conflicts with native momentum scrolling and because the section snapping is less relevant on small screens
        if (typeof window !== "undefined" && window.innerWidth < 768) return;

        const onScroll = () => {
            if (!wrapperRef.current) return;

            const nearest = getNearestSectionIndex();
            if (nearest !== activeIndexRef.current) {
                setIndex(nearest);
            }
        };

        const onWheel = (e: WheelEvent) => {
            const firstTop = getSectionTop(0);
            const lastTop = getSectionTop(projects.length - 1);

            if (isAnimating.current) {
                e.preventDefault();
                return;
            }

            if (e.deltaY > 0 && isEnteringFirstFromAbove()) {
                e.preventDefault();
                scrollToSection(0);
                return;
            }

            if (e.deltaY < 0 && isEnteringLastFromBelow()) {
                e.preventDefault();
                scrollToSection(projects.length - 1);
                return;
            }

            if (!isInsideProjectsViewport()) return;

            const currentIndex = activeIndexRef.current;

            if (e.deltaY < 0 && currentIndex === 0 && window.scrollY <= firstTop + 2) {
                wheelAccumulator.current = 0;
                return;
            }

            if (
                e.deltaY > 0 &&
                currentIndex === projects.length - 1 &&
                window.scrollY >= lastTop - 2
            ) {
                wheelAccumulator.current = 0;
                return;
            }

            const threshold = 90;

            wheelAccumulator.current += e.deltaY;

            if (Math.abs(wheelAccumulator.current) < threshold) {
                e.preventDefault();
                return;
            }

            if (wheelAccumulator.current > 0) {
                const nextIndex = Math.min(currentIndex + 1, projects.length - 1);
                if (nextIndex !== currentIndex) {
                    e.preventDefault();
                    scrollToSection(nextIndex);
                }
            } else {
                const prevIndex = Math.max(currentIndex - 1, 0);
                if (prevIndex !== currentIndex) {
                    e.preventDefault();
                    scrollToSection(prevIndex);
                }
            }
        };

        const onKeyDown = (e: KeyboardEvent) => {
            const firstTop = getSectionTop(0);
            const lastTop = getSectionTop(projects.length - 1);

            if (isAnimating.current) return;

            let delta = 0;

            if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
                delta = 100;
            }

            if (e.key === "ArrowUp" || e.key === "PageUp") {
                delta = -100;
            }

            if (delta === 0) return;

            if (delta > 0 && isEnteringFirstFromAbove()) {
                e.preventDefault();
                scrollToSection(0);
                return;
            }

            if (delta < 0 && isEnteringLastFromBelow()) {
                e.preventDefault();
                scrollToSection(projects.length - 1);
                return;
            }

            if (!isInsideProjectsViewport()) return;

            const currentIndex = activeIndexRef.current;

            if (delta < 0 && currentIndex === 0 && window.scrollY <= firstTop + 2) {
                return;
            }

            if (
                delta > 0 &&
                currentIndex === projects.length - 1 &&
                window.scrollY >= lastTop - 2
            ) {
                return;
            }

            if (delta > 0) {
                const nextIndex = Math.min(currentIndex + 1, projects.length - 1);
                if (nextIndex !== currentIndex) {
                    e.preventDefault();
                    scrollToSection(nextIndex);
                }
            } else {
                const prevIndex = Math.max(currentIndex - 1, 0);
                if (prevIndex !== currentIndex) {
                    e.preventDefault();
                    scrollToSection(prevIndex);
                }
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return (
        <div ref={wrapperRef} className="overflow-x-hidden md:overflow-y-hidden">
            {projects.map((project, index) => (
                <section
                    key={project.id}
                    ref={(el) => {
                        sectionRefs.current[index] = el;
                    }}
                    data-index={index}
                    className="flex md:min-h-screen"
                    style={{
                        background: `radial-gradient(ellipse 75% 65% at 50% 50%, ${project.bgFrom} 0%, ${project.bgTo} 65%)`,
                    }}
                >
                    <div className="container-xl mx-auto md:flex px-6 md:items-center">
                        <div className="grid w-full items-center md:gap-8 md:grid-cols-2 md:grid-rows-[1fr_auto] md:gap-12">
                            {/* TEXT */}
                            <motion.div
                                variants={textVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ amount: 0.55, once: false }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className={`
                            order-1
                            pt-12 md:order-1 md:row-start-1
                            md:pt-28 md:pb-0
                            pb-0
                            ml-0
                            ${project.textColor}
                        `}
                            >
                                <p className="mb-4 text-xl opacity-60 md:text-3xl">
                                    {project.subtitle}
                                </p>

                                <h2 className="mb-12 text-2xl font-light md:text-5xl">
                                    {project.title}
                                </h2>

                                <p className="md:mb-6 text-xl opacity-70 md:mb-8 md:text-3xl">
                                    {project.description}
                                </p>
                            </motion.div>

                            {/* IMAGE */}
                            <motion.div
                                className={`
                            order-2
                            relative
                            mb-0
                            flex items-center justify-center
                            md:order-2 md:col-start-2 md:row-span-2 md:row-start-1
                            lg:w-[120%]
                            ${project.parentClass}
                        `}
                                variants={imageVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ amount: 0.55, once: false }}
                                transition={{ duration: 0.85, ease: "easeOut" }}
                            >
                                {project.content}
                            </motion.div>

                            {/* BUTTON */}
                            <motion.div
                                variants={textVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ amount: 0.55, once: false }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="order-3 pb-12 mt-10 md:order-3 md:row-start-2 md:pb-28"
                            >
                                <div className="flex justify-center md:justify-start">
                                    <NeoButton size="sm" className="mt-0 md:mt-24 pl-12 pr-12">
                                        <span className="text-xl">→</span>
                                        <span>VER PUBLICACIONES</span>
                                    </NeoButton>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}