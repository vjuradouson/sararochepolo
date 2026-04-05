import { getTranslations } from 'next-intl/server';
import { HeaderDesktopNav } from "./components/HeaderDesktopNav";
import { HeaderMobileMenu } from "./components/HeaderMobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import HeaderLogoClient from "./components/HeaderLogoClient"
import { ROUTES } from '@/constants/routes';

export default async function HeaderWrapper() {
    const t = await getTranslations("app");

    const links = [
        { href: ROUTES.ABOUT, label: t("header.links.about") },
        { href: ROUTES.CONTACT, label: t("header.links.contact") },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/60 supports-[backdrop-filter]:bg-white/40 border-b border-light-blue/50 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <nav className="container-xl mx-auto flex items-center justify-between px-6 h-20">

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