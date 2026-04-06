import { getTranslations } from 'next-intl/server';

export default async function Footer() {
    const t = await getTranslations("app");

    return (
        <footer className="border-t border-neutral-200 py-12 md:py-16 text-brand-muted">
            <div className="container-xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Left */}
                <div className="text-center md:text-left">
                    <p className="tracking-tight text-lg">
                        {t("portfolio.owner")}
                    </p>
                    <p className="text-sm">
                        {t("footer.left.designer")}
                    </p>
                </div>

                {/* Center */}
                <div className="flex gap-6 text-sm">

                    {/* LinkedIn */}
                    <a
                        href={t("contact.contact_link.linkedin.href")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0A66C2] transition-colors"
                    >
                        <img
                            src="/media/icons/linkedin-icon.svg"
                            alt="linkedin"
                            className="w-4 h-4 opacity-70 hover:opacity-100 transition"
                        />
                        <span>{t("footer.center.linkedin")}</span>
                    </a>

                </div>

                {/* Right */}
                <div className="text-sm text-center md:text-right">
                    © {new Date().getFullYear()}
                    <br className="md:hidden" />
                    <span className="ml-1">
                        {t("portfolio.title")}
                    </span>
                </div>

            </div>
        </footer>
    );
}