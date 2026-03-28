"use client";

import { useRef, useEffect, useState } from "react";

export default function StickySplitSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !rightRef.current) return;

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();

            const viewportHeight = window.innerHeight;
            const stickyPadding = 190;

            const effectiveHeight = viewportHeight - stickyPadding;

            const totalScroll = container.offsetHeight - viewportHeight;

            const progress = Math.min(
                Math.max(-rect.top / totalScroll, 0),
                1
            );

            const rightHeight = rightRef.current.scrollHeight;

            const maxTranslate = rightHeight - effectiveHeight;

            setOffset(progress * maxTranslate);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full bg-[#0f172a] text-white"
            style={{
                height: "200vh"
            }}
        >
            <div className="sticky top-0 h-screen py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 h-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT */}
                    <div className="h-fit">
                        <p className="text-sm uppercase tracking-widest text-zinc-400 mb-4">
                            — My Resume
                        </p>

                        <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6">
                            My Areas of Expertise
                        </h2>

                        <p className="text-lg text-zinc-400 max-w-md">
                            Having spent 10+ years designing, my specialisms lie in
                            Branding Identity and Graphic Design.
                        </p>

                        <div className="mt-10 flex gap-4">
                            <button className="bg-teal-600 px-6 py-3 rounded-lg">
                                Experiences
                            </button>
                            <button className="bg-teal-600 px-6 py-3 rounded-lg">
                                Education
                            </button>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="overflow-hidden h-full">
                        <div
                            ref={rightRef}
                            style={{
                                transform: `translateY(-${offset}px)`,
                            }}
                            className="flex flex-col gap-10 will-change-transform"
                        >
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white text-black rounded-2xl p-8"
                                >
                                    <p className="text-sm text-teal-600 mb-2">
                                        2010–2015
                                    </p>
                                    <h3 className="text-xl font-semibold mb-3">
                                        Graphic Designer #{i + 1}
                                    </h3>
                                    <p className="text-zinc-600">
                                        Production of creative design solutions for print
                                        and digital media. Designed artwork and marketing
                                        materials for campaigns across multiple brands.
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