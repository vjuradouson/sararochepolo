"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";

type Props = {
    src: string;
    alt: string;
    width: number;
    height: number;
    sizes: string;
    quality?: number;
    priority?: boolean;
    maxWidthPx?: number;
    zoomAriaLabel: string;
};

const ZOOM_SCALE = 2.5;

export default function ZoomableImage({
    src,
    alt,
    width,
    height,
    sizes,
    quality = 90,
    priority,
    maxWidthPx,
    zoomAriaLabel,
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [zoomed, setZoomed] = useState(false);
    const [origin, setOrigin] = useState({ x: 50, y: 50 });

    const updateOriginFromEvent = (e: ReactPointerEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setOrigin({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setZoomed((z) => !z);
        } else if (e.key === "Escape") {
            setZoomed(false);
        }
    };

    return (
        <div
            ref={containerRef}
            role="button"
            tabIndex={0}
            aria-label={zoomAriaLabel}
            aria-pressed={zoomed}
            onClick={() => setZoomed((z) => !z)}
            onKeyDown={handleKeyDown}
            onPointerEnter={updateOriginFromEvent}
            onPointerMove={updateOriginFromEvent}
            onPointerLeave={() => setZoomed(false)}
            className={`relative mx-auto overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)] outline-none focus-visible:ring-2 focus-visible:ring-neutral-700/40 ${
                zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            style={maxWidthPx ? { maxWidth: `${maxWidthPx}px` } : undefined}
        >
            <div
                className="will-change-transform"
                style={{
                    transform: zoomed ? `scale(${ZOOM_SCALE})` : "scale(1)",
                    transformOrigin: `${origin.x}% ${origin.y}%`,
                    transition: "transform 250ms ease-out",
                }}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    sizes={sizes}
                    quality={quality}
                    priority={priority}
                    fetchPriority={priority ? "high" : "auto"}
                    loading={priority ? undefined : "eager"}
                    className="w-full h-auto pointer-events-none select-none"
                    draggable={false}
                />
            </div>
        </div>
    );
}
