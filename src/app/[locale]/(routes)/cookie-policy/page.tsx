import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from "@/lib/config";
import { getPath } from "@/i18n/getPath";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import { withAlternates } from "@/lib/seo/alternates";
import CookiePolicyContent from "./_components/CookiePolicyContent";
import Breadcrumb from "@/components/ui/Breadcrumb";

const contactLink = (chunks: ReactNode) => (
    <Link
        href={ROUTES.CONTACT}
        className="underline underline-offset-4 hover:opacity-75 transition-opacity"
    >
        {chunks}
    </Link>
);

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    const title = t("app.cookie_policy.seo.title");
    const description = t("app.cookie_policy.seo.description");

    return withAlternates(
        {
            locale,
            route: ROUTES.COOKIE_POLICY,
        },
        {
            title,
            description,
            openGraph: {
                title,
                description,
                url: `${BASE_URL}/${locale}${getPath(ROUTES.COOKIE_POLICY, locale)}`,
            },
            robots: { index: true, follow: false },
        }
    );
}

export default async function CookiePolicyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    const analyticsRowKeys = ["clck", "clsk", "clid", "anonchk", "muid", "mr", "sm"] as const;
    const browserKeys = ["chrome", "firefox", "safari", "edge"] as const;

    return (
        <>
            <Breadcrumb
                crumbs={[
                    { label: t("app.breadcrumb.home"), href: ROUTES.HOME },
                    { label: t("app.cookie_policy.h1") },
                ]}
            />
            <CookiePolicyContent
                data={{
                h1: t("app.cookie_policy.h1"),
                lastUpdated: {
                    label: t("app.cookie_policy.last_updated_label"),
                    value: t("app.cookie_policy.last_updated_value"),
                },
                intro: t("app.cookie_policy.intro"),
                controller: {
                    h2: t("app.cookie_policy.sections.controller.h2"),
                    body: t.rich("app.cookie_policy.sections.controller.body", {
                        contact: contactLink,
                    }),
                },
                what: {
                    h2: t("app.cookie_policy.sections.what.h2"),
                    body: t("app.cookie_policy.sections.what.body"),
                },
                legalBasis: {
                    h2: t("app.cookie_policy.sections.legal_basis.h2"),
                    body: t("app.cookie_policy.sections.legal_basis.body"),
                },
                categories: {
                    h2: t("app.cookie_policy.sections.categories.h2"),
                    necessary: {
                        h3: t("app.cookie_policy.sections.categories.necessary.h3"),
                        body: t("app.cookie_policy.sections.categories.necessary.body"),
                        table: {
                            headers: {
                                cookie: t("app.cookie_policy.sections.categories.necessary.table.cookie"),
                                provider: t("app.cookie_policy.sections.categories.necessary.table.provider"),
                                purpose: t("app.cookie_policy.sections.categories.necessary.table.purpose"),
                                duration: t("app.cookie_policy.sections.categories.necessary.table.duration"),
                            },
                            rows: [
                                {
                                    cookie: t("app.cookie_policy.sections.categories.necessary.table.rows.consent.cookie"),
                                    provider: t("app.cookie_policy.sections.categories.necessary.table.rows.consent.provider"),
                                    purpose: t("app.cookie_policy.sections.categories.necessary.table.rows.consent.purpose"),
                                    duration: t("app.cookie_policy.sections.categories.necessary.table.rows.consent.duration"),
                                },
                            ],
                        },
                    },
                    preferences: {
                        h3: t("app.cookie_policy.sections.categories.preferences.h3"),
                        body: t("app.cookie_policy.sections.categories.preferences.body"),
                    },
                    analytics: {
                        h3: t("app.cookie_policy.sections.categories.analytics.h3"),
                        body: t("app.cookie_policy.sections.categories.analytics.body"),
                        providers: {
                            gtm: {
                                h4: t("app.cookie_policy.sections.categories.analytics.providers.gtm.h4"),
                                body: t("app.cookie_policy.sections.categories.analytics.providers.gtm.body"),
                            },
                            clarity: {
                                h4: t("app.cookie_policy.sections.categories.analytics.providers.clarity.h4"),
                                body: t("app.cookie_policy.sections.categories.analytics.providers.clarity.body"),
                            },
                        },
                        table: {
                            headers: {
                                cookie: t("app.cookie_policy.sections.categories.analytics.table.cookie"),
                                provider: t("app.cookie_policy.sections.categories.analytics.table.provider"),
                                purpose: t("app.cookie_policy.sections.categories.analytics.table.purpose"),
                                duration: t("app.cookie_policy.sections.categories.analytics.table.duration"),
                            },
                            rows: analyticsRowKeys.map((key) => ({
                                cookie: t(`app.cookie_policy.sections.categories.analytics.table.rows.${key}.cookie`),
                                provider: t(`app.cookie_policy.sections.categories.analytics.table.rows.${key}.provider`),
                                purpose: t(`app.cookie_policy.sections.categories.analytics.table.rows.${key}.purpose`),
                                duration: t(`app.cookie_policy.sections.categories.analytics.table.rows.${key}.duration`),
                            })),
                        },
                    },
                    marketing: {
                        h3: t("app.cookie_policy.sections.categories.marketing.h3"),
                        body: t("app.cookie_policy.sections.categories.marketing.body"),
                    },
                },
                international: {
                    h2: t("app.cookie_policy.sections.international.h2"),
                    body: t("app.cookie_policy.sections.international.body"),
                },
                rights: {
                    h2: t("app.cookie_policy.sections.rights.h2"),
                    body: t.rich("app.cookie_policy.sections.rights.body", {
                        contact: contactLink,
                    }),
                },
                manage: {
                    h2: t("app.cookie_policy.sections.manage.h2"),
                    body: t("app.cookie_policy.sections.manage.body"),
                    ctaLabel: t("app.cookie_policy.sections.manage.cta_label"),
                    browserBody: t("app.cookie_policy.sections.manage.browser_body"),
                    browsers: browserKeys.map((key) =>
                        t(`app.cookie_policy.sections.manage.browsers.${key}`)
                    ),
                },
                changes: {
                    h2: t("app.cookie_policy.sections.changes.h2"),
                    body: t("app.cookie_policy.sections.changes.body"),
                },
            }}
            />
        </>
    );
}
