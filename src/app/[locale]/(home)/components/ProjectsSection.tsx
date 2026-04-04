"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import NeoButton from "@/components/ui/NeoButton";

type Project = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    bgFrom: string; // centro
    bgTo: string;   // exterior
    textColor: string;
    content: React.ReactNode;
};

const projects: Project[] = [
    {
        id: 1,
        subtitle: "— Publicación empresa",
        title: "Redes sociales y Meta Ads",
        description:
            "Contenido de marca para redes sociales y Meta Ads siguiendo guidelines de empresa.",
        bgFrom: "#A3A3A3",
        bgTo: "#404040",
        textColor: "text-white",
        content: (
            <img
                src="/media/home/hero/apps_hero.png"
                alt="project1"
                className="object-contain drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)]"
            />
        ),
    },
    {
        id: 2,
        subtitle: "— Proyecto personal",
        title: "Diseño en Figma",
        description: "Diseño y prototipado de aplicaciones usando Figma.",
        bgFrom: "#EEEDE9",
        bgTo: "#FFEBC0",
        textColor: "text-black",
        content: (
            <img
                src="/media/home/hero/apps_hero.png"
                alt="project2"
                className="object-contain drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)]"
            />
        ),
    },
    {
        id: 3,
        subtitle: "— UI Experiment",
        title: "Mobile UI Concept",
        description:
            "Exploración visual de interfaces modernas para apps móviles.",
        bgFrom: "#F6F2BA",
        bgTo: "#B0CCE4",
        textColor: "text-black",
        content: (
            <img
                src="/media/home/hero/apps_hero.png"
                alt="project3"
                className="object-contain drop-shadow-[15px_20px_10px_rgba(0,0,0,0.2)]"
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

        // 👇 porcentaje visible del wrapper
        const visibleHeight =
            Math.min(wrapperRect.bottom, window.innerHeight) -
            Math.max(wrapperRect.top, 0);

        const visibilityRatio = visibleHeight / window.innerHeight;

        const scrollY = window.scrollY;
        const firstTop = firstSection.offsetTop;

        const firstNotAligned = scrollY < firstTop - 2;

        return (
            visibilityRatio > 0.4 && // 🔥 CLAVE → al menos 60% visible
            firstNotAligned
        );
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

            // Regla crítica:
            // si estás entrando desde arriba y la primera no está bien alineada,
            // SIEMPRE fuerza la primera antes de permitir avanzar.
            if (e.deltaY > 0 && isEnteringFirstFromAbove()) {
                e.preventDefault();
                scrollToSection(0);
                return;
            }

            if (!isInsideProjectsViewport()) return;

            const currentIndex = getNearestSectionIndex();
            const currentTop = getSectionTop(currentIndex);

            // dejar salir hacia arriba normalmente desde la primera
            if (e.deltaY < 0 && currentIndex === 0 && window.scrollY <= firstTop + 2) {
                wheelAccumulator.current = 0;
                return;
            }

            // dejar salir hacia abajo normalmente desde la última
            if (
                e.deltaY > 0 &&
                currentIndex === projects.length - 1 &&
                window.scrollY >= lastTop - 2
            ) {
                wheelAccumulator.current = 0;
                return;
            }

            const threshold = 90;

            // 👇 acumulas pero NO dejas que el navegador mueva aún
            wheelAccumulator.current += e.deltaY;

            // 👇 si aún no alcanzas threshold → bloqueas scroll visual
            if (Math.abs(wheelAccumulator.current) < threshold) {
                e.preventDefault(); // 🔥 CLAVE → elimina micro salto
                return;
            }

            if (wheelAccumulator.current > 0) {
                const nextIndex = Math.min(currentIndex + 1, projects.length - 1);

                if (nextIndex !== currentIndex) {
                    e.preventDefault();
                    scrollToSection(nextIndex);
                } else {
                    wheelAccumulator.current = 0;
                }
            } else {
                const prevIndex = Math.max(currentIndex - 1, 0);

                if (prevIndex !== currentIndex) {
                    e.preventDefault();
                    scrollToSection(prevIndex);
                } else {
                    wheelAccumulator.current = 0;
                }
            }
        };

        const onTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0]?.clientY ?? null;
        };

        const onTouchEnd = (e: TouchEvent) => {
            if (isAnimating.current) return;
            if (touchStartY.current === null) return;

            const endY = e.changedTouches[0]?.clientY ?? null;
            if (endY === null) return;

            const diff = touchStartY.current - endY;
            touchStartY.current = null;

            if (Math.abs(diff) < 50) return;

            if (diff > 0 && isEnteringFirstFromAbove()) {
                scrollToSection(0);
                return;
            }

            if (!isInsideProjectsViewport()) return;

            const currentIndex = getNearestSectionIndex();
            const firstTop = getSectionTop(0);
            const lastTop = getSectionTop(projects.length - 1);

            if (diff < 0 && currentIndex === 0 && window.scrollY <= firstTop + 2) {
                return;
            }

            if (
                diff > 0 &&
                currentIndex === projects.length - 1 &&
                window.scrollY >= lastTop - 2
            ) {
                return;
            }

            if (diff > 0) {
                const nextIndex = Math.min(currentIndex + 1, projects.length - 1);
                if (nextIndex !== currentIndex) scrollToSection(nextIndex);
            } else {
                const prevIndex = Math.max(currentIndex - 1, 0);
                if (prevIndex !== currentIndex) scrollToSection(prevIndex);
            }
        };

        const onKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;

            // ❌ no interferir con inputs
            if (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable
            ) {
                return;
            }

            if (isAnimating.current) {
                e.preventDefault();
                return;
            }

            const key = e.key;

            const goingDown =
                key === "ArrowDown" ||
                key === "PageDown" ||
                (key === " " && !e.shiftKey);

            const goingUp =
                key === "ArrowUp" ||
                key === "PageUp" ||
                (key === " " && e.shiftKey);

            // 👇 entrada desde arriba
            if (goingDown && isEnteringFirstFromAbove()) {
                e.preventDefault();
                scrollToSection(0);
                return;
            }

            if (!isInsideProjectsViewport()) return;

            const currentIndex = getNearestSectionIndex();

            if (goingDown) {
                const nextIndex = Math.min(currentIndex + 1, projects.length - 1);

                if (nextIndex !== currentIndex) {
                    e.preventDefault();
                    scrollToSection(nextIndex);
                }
            }

            if (goingUp) {
                const prevIndex = Math.max(currentIndex - 1, 0);

                if (prevIndex !== currentIndex) {
                    e.preventDefault();
                    scrollToSection(prevIndex);
                }
            }

            // 👇 opcional pro (pero útil)
            if (key === "Home") {
                e.preventDefault();
                scrollToSection(0);
            }

            if (key === "End") {
                e.preventDefault();
                scrollToSection(projects.length - 1);
            }
        };
        window.addEventListener("keydown", onKeyDown);

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchend", onTouchEnd, { passive: true });

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchend", onTouchEnd);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return (
        <div ref={wrapperRef}>
            {projects.map((project, index) => (
                <section
                    key={project.id}
                    ref={(el) => {
                        sectionRefs.current[index] = el;
                    }}
                    data-index={index}
                    className="h-screen flex overflow-hidden"
                    style={{
                        background: `radial-gradient(ellipse 75% 65% at 50% 50%, ${project.bgFrom} 0%, ${project.bgTo} 65%)`
                    }}
                >
                    <div className="max-w-[1400px] mx-auto px-6 w-full flex items-center">
                        <div className="h-full grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                variants={textVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ amount: 0.55, once: false }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className={`pl-8 md:pl-16 pt-28 pb-28 ml-20 ${project.textColor}`}
                            >
                                <p className="text-2xl opacity-60 mb-4">
                                    {project.subtitle}
                                </p>

                                <h2 className="text-3xl md:text-5xl font-light mb-6">
                                    {project.title}
                                </h2>

                                <p className="text-2xl opacity-70 mb-8">
                                    {project.description}
                                </p>

                                <NeoButton size="sm" className="mt-24 pl-12 pr-12">
                                    <span className="text-xl">→</span>
                                    <span>VER PUBLICACIONES</span>
                                </NeoButton>
                            </motion.div>

                            <motion.div
                                className="relative h-full flex items-center justify-center md:justify-end"
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