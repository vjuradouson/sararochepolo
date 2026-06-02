"use client";

import { ComponentProps } from "react";
import { ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PATHNAMES } from "@/i18n/routing";
import { BREADCRUMB_MIN_LEVEL } from "@/constants/breadcrumbs";
import { trackBreadcrumbClick } from "@/lib/gtm";

type Href = ComponentProps<typeof Link>["href"];

export type Crumb = {
    label: string;
    /** Ruta localizable (clave de ROUTES). Omitir en la miga actual (última). */
    href?: Href;
};

/**
 * Migas de pan clicables. Se usa en páginas con 3+ niveles (Home > Sección >
 * Proyecto). La última miga representa la página actual y no es un enlace.
 * El offset superior (`pt-*`) reserva el alto del header fijo (`h-15`).
 *
 * Cada clic en un enlace emite el evento `breadcrumb_click` al dataLayer (GTM),
 * igual que `nav_click`/`cta_click`.
 */
export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
    const locale = useLocale();

    // El nivel de la página es su profundidad = número de migas. Si está por
    // debajo del mínimo configurado, no se muestran migas (ver BREADCRUMB_MIN_LEVEL).
    if (crumbs.length < BREADCRUMB_MIN_LEVEL) return null;

    // Resuelve la ruta localizada de una clave de ROUTES, igual que el nav.
    const getLocalizedHref = (href: Href | undefined): string | undefined => {
        if (typeof href !== "string") return undefined;
        const routeConfig = PATHNAMES[href as keyof typeof PATHNAMES];
        if (!routeConfig) return undefined;
        return typeof routeConfig === "string" ? routeConfig : routeConfig[locale];
    };

    return (
        <nav
            aria-label="Breadcrumb"
            className="container-xl pt-20 md:pt-24 pb-2 md:pb-4"
        >
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm md:text-base text-neutral-500">
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;

                    return (
                        <li key={index} className="flex items-center gap-x-1.5">
                            {crumb.href && !isLast ? (
                                <Link
                                    href={crumb.href}
                                    onClick={() =>
                                        trackBreadcrumbClick({
                                            breadcrumb_item: String(crumb.href),
                                            breadcrumb_label: crumb.label,
                                            breadcrumb_position: index + 1,
                                            breadcrumb_destination: getLocalizedHref(crumb.href),
                                        })
                                    }
                                    className="hover:text-neutral-900 transition-colors"
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span
                                    aria-current="page"
                                    className="font-medium text-neutral-900"
                                >
                                    {crumb.label}
                                </span>
                            )}
                            {!isLast && (
                                <ChevronRight
                                    className="w-4 h-4 shrink-0 text-neutral-400"
                                    aria-hidden="true"
                                />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
