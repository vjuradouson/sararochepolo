import type { Metadata } from "next";
import ContactForm from "@/app/[locale]/(routes)/contact/components/ContactForm";
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("app.contact");

    return {
        title: t("seo.title"),
        description: t("seo.description"),
    };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale })

    const contactLinks = [
        {
            label: t("app.contact.contact_link.linkedin.label"),
            value: t("app.contact.contact_link.linkedin.value"),
            href: t("app.contact.contact_link.linkedin.href")
        },
        {
            label: t("app.contact.contact_link.location.label"),
            value: t("app.contact.contact_link.location.value"),
            href: null
        },
    ];

    return (
        <section className="mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-16">
            {/* Heading */}
            <div className="mb-20">
                <p className="text-xl uppercase tracking-widest text-brand-muted mb-4">
                    {t("app.contact.header")}
                </p>
                <h1 className="text-4xl tracking-tight sm:text-5xl">
                    {t("app.contact.h1")}
                </h1>
            </div>

            <div className="grid gap-16 md:grid-cols-2">
                {/* Left — info */}
                <div className="flex flex-col gap-12">
                    <p className="text-lg text-brand-muted leading-relaxed max-w-md">
                        {t('app.contact.description')}
                    </p>

                    <ul className="space-y-6">
                        {contactLinks.map(({ label, value, href }) => (
                            <li key={label} className="flex flex-col gap-1">
                                <span className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
                                    {label}
                                </span>
                                {href ? (
                                    <a
                                        href={href}
                                        target={href.startsWith("http") ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className="text-base font-medium hover:underline underline-offset-4"
                                    >
                                        {value}
                                    </a>
                                ) : (
                                    <span className="text-base font-medium">
                                        {value}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right — form */}
                <div>
                    <h2 className="text-xl mb-6">
                        {t('app.contact.form.title')}
                    </h2>
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
