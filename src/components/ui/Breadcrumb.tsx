import { ComponentProps } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

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
 */
export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
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
