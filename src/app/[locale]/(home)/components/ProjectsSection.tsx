"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import NeoButton from "@/components/ui/NeoButton";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";

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
    view_all: string;
    href: string | null;
};

const textVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
};

export default function ProjectsSection() {
    const t = useTranslations("app");

    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== "undefined") {
            return window.innerWidth < 768;
        }
        return false;
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const imageVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 200,
            scale: 0.8
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 2,
                ease: [0.22, 1, 0.36, 1] as any
            },
        },
    };

    const projects: Project[] = [
        {
            id: 1,
            subtitle: "— " + t("home.projects.figma_pet_buddy.subtitle"),
            title: t("home.projects.figma_pet_buddy.title"),
            description: t("home.projects.figma_pet_buddy.description"),
            bgFrom: "#FDE08D",
            bgTo: "#F9D1B7",
            textColor: "text-black",
            parentClass: "w-full min-h-[380px] md:min-h-[500px]",
            view_all: t("home.projects.figma_pet_buddy.view_all"),
            href: null,
            content: (
                <Image
                    src="/media/home/projects/figma_pet_buddy.png"
                    alt={t("home.projects.figma_pet_buddy.image_alt")}
                    width={1200}
                    height={828}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                    className="block mx-auto max-h-full max-w-full w-full h-auto object-contain drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)] mt-12 mb-12 md:mt-0 md:mb-0 scale-[1.3] md:scale-[1] xl:scale-[1.3] xl:pl-[10%]"
                />
            ),
        },
        {
            id: 2,
            subtitle: "— " + t("home.projects.meta_adds.subtitle"),
            title: t("home.projects.meta_adds.title"),
            description: t("home.projects.meta_adds.description"),
            bgFrom: "#F9D1B7",
            bgTo: "#EAD7D1",
            textColor: "text-black",
            parentClass: "h-[400px] md:h-[500px] lg:h-full md:h-[100vh] md:min-h-[500px] mb-10 md:mb-0",
            view_all: t("home.projects.meta_adds.view_all"),
            href: null,
            content: (
                <Image
                    src="/media/home/projects/meta_adds.png"
                    alt={t("home.projects.meta_adds.image_alt")}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                    className="max-h-full max-w-full object-contain drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)] rotate-[30deg] scale-[1.1] md:scale-[0.8] -translate-x-4 md:translate-x-0 mx-0 my-0"
                />
            ),
        },
        {
            id: 3,
            subtitle: "— " + t("home.projects.adobe_project_neo.subtitle"),
            title: t("home.projects.adobe_project_neo.title"),
            description: t("home.projects.adobe_project_neo.description"),
            bgFrom: "#EAD7D1",
            bgTo: "#D1D1D1",
            textColor: "text-black",
            parentClass: "h-[400px] md:h-[500px] lg:h-full md:h-[100vh] md:min-h-[500px]",
            view_all: t("home.projects.adobe_project_neo.view_all"),
            href: ROUTES.PROJECT_ADOBE_PROJECT_NEO,
            content: (
                <Image
                    src="/media/home/projects/adobe-project-neo-keyboard.png"
                    alt={t("home.projects.adobe_project_neo.image_alt")}
                    width={1000}
                    height={1000}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                    className="max-h-full max-w-full object-contain drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)] mt-5 mb-5 mx-0 my-0 scale-[0.9] md:pl-[10%] xl:scale-[1.05]"
                />
            ),
        },
        {
            id: 4,
            subtitle: "— " + t("home.projects.illustration.subtitle"),
            title: t("home.projects.illustration.title"),
            description: t("home.projects.illustration.description"),
            bgFrom: "#D1D1D1",
            bgTo: "#F5E1C8",
            textColor: "text-black",
            parentClass: "h-[400px] md:h-[500px] lg:h-full md:h-[100vh] md:min-h-[500px]",
            view_all: t("home.projects.illustration.view_all"),
            href: null,
            content: (
                <Image
                    src="/media/home/projects/illustration.png"
                    alt={t("home.projects.illustration.image_alt")}
                    width={1000}
                    height={1000}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                    className="max-h-full max-w-full object-contain drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)] mt-5 mb-5 mx-0 my-0 scale-[1] md:scale-[1]"
                />
            ),
        },
        {
            id: 5,
            subtitle: "— " + t("home.projects.branding_la_esquinita.subtitle"),
            title: t("home.projects.branding_la_esquinita.title"),
            description: t("home.projects.branding_la_esquinita.description"),
            bgFrom: "#F5E1C8",
            bgTo: "#FFF",
            textColor: "text-black",
            parentClass: "h-[400px] md:h-[500px] lg:h-full md:h-[100vh] md:min-h-[500px]",
            view_all: t("home.projects.branding_la_esquinita.view_all"),
            href: ROUTES.PROJECT_BRANDING,
            content: (
                <Image
                    src="/media/home/projects/branding-la-esquinita.png"
                    alt={t("home.projects.branding_la_esquinita.image_alt")}
                    width={1000}
                    height={1000}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                    className="max-h-[280px] md:max-h-full max-w-full object-contain drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)] mt-5 mb-5 mx-0 my-0 scale-[0.9] md:scale-[0.85]"
                />
            ),
        }
    ];

    const wrapperRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const isAnimating = useRef(false);
    const wheelAccumulator = useRef(0);
    const animationFrameRef = useRef<number | null>(null);
    const activeIndexRef = useRef(0);
    const touchStartY = useRef(0);
    const touchCurrentY = useRef(0);
    const touchDelta = useRef(0);
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
        const duration = 900;

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

        if (isMobile) return;

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

        const onTouchStart = (e: TouchEvent) => {
            if (isAnimating.current) return;

            touchStartY.current = e.touches[0].clientY;
            touchCurrentY.current = touchStartY.current;
            touchDelta.current = 0;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (isAnimating.current) {
                e.preventDefault();
                return;
            }

            touchCurrentY.current = e.touches[0].clientY;
            touchDelta.current = touchStartY.current - touchCurrentY.current;

            if (!isInsideProjectsViewport()) return;

            const currentIndex = activeIndexRef.current;
            const deltaY = touchDelta.current;

            const isScrollingDown = deltaY > 0; // dedo sube → contenido baja
            const isScrollingUp = deltaY < 0;

            const isFirst = currentIndex === 0;
            const isLast = currentIndex === projects.length - 1;

            const firstTop = getSectionTop(0);
            const lastTop = getSectionTop(projects.length - 1);

            // 🚨 PERMITIR salir arriba
            if (
                isFirst &&
                isScrollingUp &&
                window.scrollY <= firstTop + 2
            ) {
                return; // NO preventDefault → deja scroll normal
            }

            // 🚨 PERMITIR salir abajo
            if (
                isLast &&
                isScrollingDown &&
                window.scrollY >= lastTop - 2
            ) {
                return; // NO preventDefault
            }

            // 🔒 En cualquier otro caso, bloqueamos scroll nativo
            e.preventDefault();
        };

        const onTouchEnd = () => {
            if (isAnimating.current) return;

            const deltaY = touchDelta.current;

            const firstTop = getSectionTop(0);
            const lastTop = getSectionTop(projects.length - 1);

            // 👇 EXACT same logic que wheel
            if (deltaY > 0 && isEnteringFirstFromAbove()) {
                scrollToSection(0);
                return;
            }

            if (deltaY < 0 && isEnteringLastFromBelow()) {
                scrollToSection(projects.length - 1);
                return;
            }

            if (!isInsideProjectsViewport()) return;

            const currentIndex = activeIndexRef.current;

            if (deltaY < 0 && currentIndex === 0 && window.scrollY <= firstTop + 2) {
                return;
            }

            if (
                deltaY > 0 &&
                currentIndex === projects.length - 1 &&
                window.scrollY >= lastTop - 2
            ) {
                return;
            }

            const threshold = 60; // menor que wheel (finger ≠ wheel)

            if (Math.abs(deltaY) < threshold) return;

            if (deltaY > 0) {
                const nextIndex = Math.min(currentIndex + 1, projects.length - 1);
                if (nextIndex !== currentIndex) {
                    scrollToSection(nextIndex);
                }
            } else {
                const prevIndex = Math.max(currentIndex - 1, 0);
                if (prevIndex !== currentIndex) {
                    scrollToSection(prevIndex);
                }
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("keydown", onKeyDown);
        /*window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("touchend", onTouchEnd);*/

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("keydown", onKeyDown);
            /*window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);*/
        };
    }, [isMobile]);

    return (
        <div
            ref={wrapperRef}
            className="overflow-x-hidden overflow-y-hidden md:overflow-y-hidden"
        >
            <h2 className="sr-only">{t("home.projects_h2")}</h2>
            {projects.map((project, index) => (
                <section
                    key={project.id}
                    ref={(el) => {
                        sectionRefs.current[index] = el;
                    }}
                    data-index={index}
                    className="flex flex-col md:h-screen md:min-h-screen pt-8 md:pt-0"
                    style={{
                        background: `linear-gradient(180deg, ${project.bgFrom} 0%, ${project.bgTo} 100%)`
                    }}
                >
                    <div className="container-xl mx-auto px-6 md:pt-8 md:pt-0 mb-12 md:mb-0 md:h-full">

                        {/* GRID */}
                        <div className="grid w-full grid-cols-1 md:grid-cols-2 md:grid-rows-[1fr_auto_auto_1fr] md:h-full">

                            {/* TEXT */}
                            <motion.div
                                variants={textVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ amount: 0.55, once: isMobile }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className={`order-1 md:order-1 md:col-start-1 md:row-start-2 flex flex-col justify-start mt-6 md:mt-0 ${project.textColor}`}>
                                <p className="mb-1 text-xl opacity-60 md:mb-4 md:text-3xl">
                                    {project.subtitle}
                                </p>

                                <h3 className="mb-4 text-2xl font-light md:mb-12 md:text-5xl">
                                    {project.title}
                                </h3>

                                <p className="text-xl opacity-70 md:mb-6 md:text-3xl">
                                    {project.description}
                                </p>
                            </motion.div>

                            {/* IMAGE */}
                            <motion.div
                                variants={imageVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ amount: 0.5, once: isMobile }}
                                transition={{ duration: 0.85, ease: "easeOut" }}
                                className={`order-2 md:order-2 md:col-start-2 md:row-start-1 md:row-end-5 relative flex items-center justify-center w-full md:h-full lg:w-[100%] ${project.parentClass}`}
                            >
                                <div className="w-full md:h-full flex md:items-center justify-center">
                                    <div className="md:max-h-full md:max-w-full">
                                        {project.content}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={textVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ amount: 0, once: isMobile }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className={`order-3 md:order-3 md:col-start-1 md:row-start-3 mt-6 md:mt-12 ${project.textColor}`}>
                                <div className="flex justify-center md:justify-start">
                                    {project.href ? (
                                        <Link href={project.href}>
                                            <NeoButton size="sm" className="pl-12 pr-12">
                                                <span className="text-xl">→</span>
                                                <span className="uppercase">{project.view_all}</span>
                                            </NeoButton>
                                        </Link>
                                    ) : (
                                        <NeoButton size="sm" className="pl-12 pr-12">
                                            <span className="text-xl">→</span>
                                            <span className="uppercase">{project.view_all}</span>
                                        </NeoButton>
                                    )}
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}