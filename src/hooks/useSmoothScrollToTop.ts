"use client";

import { useRef } from "react";

export const useSmoothScrollToTop = () => {
    const isScrolling = useRef(false);

    const smoothScrollToTop = () => {
        if (isScrolling.current) return;

        const start = window.scrollY;

        if (start < 5) {
            window.dispatchEvent(new Event('reanimate-effects'));
            return;
        }

        isScrolling.current = true;

        const minDuration = 100;
        const maxDuration = 2000;
        const duration = Math.min(
            maxDuration,
            Math.max(minDuration, start * 0.8)
        );

        const startTime = performance.now();

        const easeInOut = (t: number) => {
            return t < 0.5
                ? 2 * t * t
                : 1 - Math.pow(-2 * t + 2, 2) / 2;
        };

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const eased = easeInOut(progress);
            window.scrollTo(0, start * (1 - eased));

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                isScrolling.current = false;
                window.dispatchEvent(new Event('reanimate-effects'));
            }
        };

        requestAnimationFrame(animate);
    };

    return { smoothScrollToTop, isScrolling };
};