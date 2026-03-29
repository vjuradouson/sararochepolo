"use client";

import { useRef, useEffect, useState } from "react";

const experienceData = [
    {
        year: "2025 — 2026",
        title: "UX/UI Designer · Grupo Piquer",
        description:
            "Diseño de experiencias digitales para entornos educativos. Mejora de la usabilidad, arquitectura de la información y consistencia visual en la plataforma.",
    },
    {
        year: "2024 — 2025",
        title: "UX/UI Designer · Grupo Piquer",
        description:
            "Diseño de experiencias digitales para entornos educativos. Mejora de la usabilidad, arquitectura de la información y consistencia visual en la plataforma.",
    },
    {
        year: "2022 — 2023",
        title: "UX/UI Designer · Grupo Piquer",
        description:
            "Diseño de experiencias digitales para entornos educativos. Mejora de la usabilidad, arquitectura de la información y consistencia visual en la plataforma.",
    },
    {
        year: "2022",
        title: "UI Designer · Sumun Comunicación",
        description:
            "Diseño de interfaces y piezas gráficas para clientes, colaborando con equipos de marketing y desarrollo.",
    },
];

const educationData = [
    {
        year: "2020 — 2022",
        title: "Grado Superior en Diseño Gráfico",
        description:
            "Especialización en gráfica interactiva, UI/UX y sistemas visuales. Desarrollo de proyectos digitales y editoriales.",
    },
    {
        year: "2022 — 2023",
        title: "Content Marketing & Social Media",
        description:
            "Formación en estrategia de contenidos y marketing digital aplicado a producto y marca.",
    },
    {
        year: "2016 — 2017",
        title: "Máster en Educación Secundaria",
        description:
            "Desarrollo de habilidades comunicativas, pensamiento estructurado y capacidad pedagógica.",
    },
    {
        year: "2012 — 2016",
        title: "Grado en Estudios Ingleses (C2)",
        description:
            "Formación lingüística avanzada y capacidad de comunicación profesional en entornos internacionales.",
    },
];

export default function StickySplitSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    const [offset, setOffset] = useState(0);
    const [containerHeight, setContainerHeight] = useState("200vh");
    const [activeTab, setActiveTab] = useState<"experience" | "education">(
        "experience"
    );

    const currentData =
        activeTab === "experience" ? experienceData : educationData;

    useEffect(() => {
        const handleResize = () => {
            if (!rightRef.current) return;

            if (window.innerWidth >= 1024) {
                const totalHeight =
                    rightRef.current.scrollHeight + window.innerHeight;

                setContainerHeight(`${totalHeight}px`);
            } else {
                setContainerHeight("auto");
            }
        };

        const handleScroll = () => {
            if (
                !containerRef.current ||
                !rightRef.current ||
                window.innerWidth < 1024
            )
                return;

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();

            const viewportHeight = window.innerHeight;
            const totalScroll = container.offsetHeight - viewportHeight;

            const progress = Math.min(
                Math.max((-rect.top / totalScroll) * 2, 0),
                1
            );

            const rightHeight = rightRef.current.scrollHeight;
            const rightContainer = rightRef.current.parentElement;

            const visibleHeight =
                rightContainer?.clientHeight || viewportHeight;

            const maxTranslate = Math.max(rightHeight - visibleHeight, 0);

            setOffset(progress * maxTranslate);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!rightRef.current) return;

        if (window.innerWidth >= 1024) {
            const totalHeight =
                rightRef.current.scrollHeight + window.innerHeight;

            setContainerHeight(`${totalHeight}px`);
        } else {
            setContainerHeight("auto");
        }

        // Reset scroll interno
        setOffset(0);
    }, [activeTab]);

    return (
        <section
            ref={containerRef}
            className="w-full bg-[#0f172a] text-white"
            style={{ height: containerHeight }}
        >
            <div className="lg:sticky top-0 lg:h-screen py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 h-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start lg:items-center">

                    {/* LEFT */}
                    <div className="h-fit">
                        <p className="text-sm uppercase tracking-widest text-zinc-400 mb-4">
                            — Experience
                        </p>

                        <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6">
                            Building digital experiences
                            <br />
                            <span className="italic text-zinc-300">
                                with clarity and purpose
                            </span>
                        </h2>

                        <p className="text-lg text-zinc-400 max-w-md">
                            Trayectoria enfocada en diseño de producto, combinando UX,
                            UI y comunicación visual para crear experiencias coherentes
                            y funcionales.
                        </p>

                        <div className="mt-10 flex gap-4">
                            <button
                                onClick={() => setActiveTab("experience")}
                                className={`cursor-pointer px-6 py-3 rounded-lg transition ${activeTab === "experience"
                                    ? "bg-teal-600"
                                    : "border border-white/20 hover:bg-white/10"
                                    }`}
                            >
                                Experiencia
                            </button>

                            <button
                                onClick={() => setActiveTab("education")}
                                className={`cursor-pointer px-6 py-3 rounded-lg transition ${activeTab === "education"
                                    ? "bg-teal-600"
                                    : "border border-white/20 hover:bg-white/10"
                                    }`}
                            >
                                Formación
                            </button>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="overflow-hidden lg:h-full">
                        <div
                            ref={rightRef}
                            style={{
                                transform:
                                    typeof window !== "undefined" &&
                                        window.innerWidth >= 1024
                                        ? `translateY(-${offset}px)`
                                        : "none",
                            }}
                            className="flex flex-col gap-10 will-change-transform"
                        >
                            {currentData.map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-white text-black rounded-2xl p-8 transition hover:scale-[1.01] hover:shadow-xl"
                                >
                                    <p className="text-sm text-teal-600 mb-2">
                                        {item.year}
                                    </p>
                                    <h3 className="text-xl font-semibold mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-zinc-600">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}