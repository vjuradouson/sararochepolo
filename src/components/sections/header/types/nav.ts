export type NavLink = {
    label: string;
    /** All translations of this label across locales — used to reserve max-width on desktop so the layout doesn't shift on language change. */
    labels?: string[];
    href?: string;
    children?: NavLink[];
};
