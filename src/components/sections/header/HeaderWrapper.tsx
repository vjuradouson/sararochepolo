import { getTranslations } from 'next-intl/server';
import { HeaderDesktopNav } from "./components/HeaderDesktopNav";
import { HeaderMobileMenu } from "./components/HeaderMobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import HeaderLogoClient from "./components/HeaderLogoClient"
import { ROUTES } from '@/constants/routes';
import { LOCALES } from '@/lib/config';
import type { NavLink } from "@/components/sections/header/types/nav";

export default async function HeaderWrapper() {
    const t = await getTranslations("app");

    // Pre-resolve every nav label across all locales so the desktop nav can
    // reserve max-width per item and avoid layout shifts when switching locale.
    const tByLocale = await Promise.all(
        LOCALES.map(async (loc) => [loc, await getTranslations({ locale: loc, namespace: "app" })] as const)
    );
    const labelsFor = (key: string) => tByLocale.map(([, tt]) => tt(key));

    const links: NavLink[] = [
        {
            label: t("header.links.projects_title"),
            labels: labelsFor("header.links.projects_title"),
            children: [
                {
                    href: ROUTES.PROJECTS_ADOBE_PROJECT_NEO,
                    label: t("header.links.projects.adobe_project_neo"),
                    labels: labelsFor("header.links.projects.adobe_project_neo"),
                },
                {
                    href: ROUTES.PROJECTS_BRANDING,
                    label: t("header.links.projects.branding"),
                    labels: labelsFor("header.links.projects.branding"),
                },
            ],
        },
        {
            href: ROUTES.ABOUT,
            label: t("header.links.about_me"),
            labels: labelsFor("header.links.about_me"),
        },
        {
            href: ROUTES.CONTACT,
            label: t("header.links.contact"),
            labels: labelsFor("header.links.contact"),
        },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-surface-80 backdrop-blur-surface">
            <nav className="container-xl mx-auto flex items-center justify-between h-20">

                {/* Client (interaction) */}
                <HeaderLogoClient ownerName={t("portfolio.owner")} />

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-8">
                    <HeaderDesktopNav links={links} />
                    <LanguageSwitcher />
                </div>

                {/* Mobile */}
                <div className="md:hidden flex items-center gap-3">
                    <LanguageSwitcher />
                    <HeaderMobileMenu links={links} />
                </div>

            </nav>
        </header>
    );
}