import { getTranslations } from 'next-intl/server';
import FooterSocials from '@/components/sections/footer/FooterSocials';
import FooterLegal from '@/components/sections/footer/FooterLegal';

export default async function Footer() {
    const t = await getTranslations("app");

    return (
        <footer className="border-t border-neutral-200 py-12 md:py-16 text-brand-muted mt-12">
            <div className="container-xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-6">

                {/* Left — 1/3 */}
                <div className="md:flex-1 text-center md:text-left">
                    <p className="tracking-tight text-lg">
                        {t("portfolio.owner")}
                    </p>
                    <p className="text-md">
                        {t("footer.left.designer")}
                    </p>
                </div>

                {/* Center — 1/3 */}
                <div className="md:flex-1 flex md:justify-center">
                    <FooterSocials
                        linkedinHref={t("contact.contact_link.linkedin.href")}
                        linkedinLabel={t("footer.center.linkedin")}
                        instagramHref={t("contact.contact_link.instagram.href")}
                        instagramLabel={t("footer.center.instagram")}
                    />
                </div>

                {/* Right — 1/3, copyright + legal links stacked */}
                <div className="md:flex-1 flex flex-col items-center md:items-end gap-2">
                    <FooterLegal
                        cookiePolicyLabel={t("cookie_policy.h1")}
                        manageCookiesLabel={t("cookies.manage_link")}
                    />
                    <div className="text-sm text-center md:text-right">
                        © {new Date().getFullYear()}
                        <br className="md:hidden" />
                        <span className="ml-1">
                            {t("portfolio.owner")}
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
}