import { getTranslations } from 'next-intl/server';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

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
                    <p className="text-md">
                        {t("footer.left.designer")}
                    </p>
                </div>

                {/* Center */}
                <div className="flex gap-6 text-lg">

                    {/* LinkedIn */}
                    <a
                        href={t("contact.contact_link.linkedin.href")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2"
                    >
                        <FaLinkedin className="w-4 h-4 text-dark-blue/60 group-hover:text-[#0A66C2] transition-colors duration-300" />
                        <span>
                            {t("footer.center.linkedin")}
                        </span>
                    </a>

                    {/* Instagram */}
                    <a
                        href={t("contact.contact_link.instagram.href")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2"
                    >
                        <FaInstagram className="w-4 h-4 text-dark-blue/60 group-hover:text-pink-500 transition-colors duration-300" />
                        <span>
                            {t("footer.center.instagram")}
                        </span>
                    </a>

                </div>
                {/* Right */}
                <div className="text-sm text-center md:text-right">
                    © {new Date().getFullYear()}
                    <br className="md:hidden" />
                    <span className="ml-1">
                        {t("home.seo.title")}
                    </span>
                </div>

            </div>
        </footer>
    );
}