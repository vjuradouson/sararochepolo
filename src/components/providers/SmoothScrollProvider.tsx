"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

type Props = {
    children: ReactNode;
};

export default function SmoothScrollProvider({ children }: Props) {

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.0, // ⚠️ más rápido (ANTES 1.8)
            easing: (t: number) => t, // ⚠️ lineal (sin “pesadez”)
            smoothWheel: true,
            wheelMultiplier: 1, // normal
        });

        (window as any).lenis = lenis;

        let rafId = 0;

        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}