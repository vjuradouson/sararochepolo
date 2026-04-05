import { PATHNAMES } from "@/i18n/routing";
import { LOCALES } from "@/lib/config";

type Route = keyof typeof PATHNAMES;
type Locale = typeof LOCALES[number];

export function getPath(route: Route, locale: Locale): string {
    const routeConfig = PATHNAMES[route];

    if (typeof routeConfig === "string") {
        return routeConfig;
    }

    return routeConfig[locale];
}