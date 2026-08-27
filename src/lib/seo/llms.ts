import { ROUTES } from '@/constants/routes';
import { getPath } from '@/i18n/getPath';
import { BASE_URL, LOCALES, Locale } from '@/lib/config';

type Translator = (key: string) => string;

type Route = (typeof ROUTES)[keyof typeof ROUTES];

type LlmsLink =
    | { kind: 'route'; route: Route; nameKey: string; descriptionKey: string }
    | { kind: 'external'; hrefKey: string; nameKey: string; descriptionKey: string };

type LlmsSection = {
    headingKey: string;
    links: LlmsLink[];
};

/**
 * Índice de la web para modelos de lenguaje (https://llmstxt.org).
 * Cada entrada reutiliza las mismas claves i18n que ya alimentan los <title>
 * y las <meta description>, de modo que el archivo nunca se desincroniza
 * del contenido real de las páginas.
 */
const SECTIONS: LlmsSection[] = [
    {
        headingKey: 'app.portfolio.llms.sections.profile',
        links: [
            {
                kind: 'route',
                route: ROUTES.HOME,
                nameKey: 'app.portfolio.seo.schema.profile.name',
                descriptionKey: 'app.home.seo.description'
            },
            {
                kind: 'route',
                route: ROUTES.ABOUT,
                nameKey: 'app.header.links.about_me',
                descriptionKey: 'app.about_me.seo.description'
            }
        ]
    },
    {
        headingKey: 'app.portfolio.llms.sections.projects',
        links: [
            {
                kind: 'route',
                route: ROUTES.PROJECTS_UX_UI_DESIGN,
                nameKey: 'app.header.links.projects.ux_ui_design',
                descriptionKey: 'app.projects.ux_ui_design.seo.description'
            },
            {
                kind: 'route',
                route: ROUTES.PROJECTS_UX_UI_DESIGN_PET_BUDDY,
                nameKey: 'app.projects.ux_ui_design.projects.pet_buddy.content.title',
                descriptionKey: 'app.projects.ux_ui_design.projects.pet_buddy.seo.description'
            },
            {
                kind: 'route',
                route: ROUTES.PROJECTS_BRANDING,
                nameKey: 'app.header.links.projects.branding',
                descriptionKey: 'app.projects.branding.seo.description'
            },
            {
                kind: 'route',
                route: ROUTES.PROJECTS_BRANDING_LA_ESQUINITA_DE_PAPEL,
                nameKey: 'app.projects.branding.projects.la_esquinita_de_papel.content.title',
                descriptionKey: 'app.projects.branding.projects.la_esquinita_de_papel.seo.description'
            },
            {
                kind: 'route',
                route: ROUTES.PROJECTS_BRANDING_DON_TOSTADO,
                nameKey: 'app.projects.branding.projects.don_tostado.content.title',
                descriptionKey: 'app.projects.branding.projects.don_tostado.seo.description'
            },
            {
                kind: 'route',
                route: ROUTES.PROJECTS_ADOBE_PROJECT_NEO,
                nameKey: 'app.header.links.projects.adobe_project_neo',
                descriptionKey: 'app.projects.adobe_project_neo.seo.description'
            },
            {
                kind: 'route',
                route: ROUTES.PROJECTS_ILLUSTRATIONS,
                nameKey: 'app.header.links.projects.illustrations',
                descriptionKey: 'app.projects.illustrations.seo.description'
            },
            {
                kind: 'route',
                route: ROUTES.PROJECTS_SOCIAL_MEDIA,
                nameKey: 'app.header.links.projects.social_media',
                descriptionKey: 'app.projects.social_media.seo.description'
            },
            {
                kind: 'route',
                route: ROUTES.PROJECTS_EDITORIAL,
                nameKey: 'app.header.links.projects.print_design',
                descriptionKey: 'app.projects.print_design.seo.description'
            }
        ]
    },
    {
        headingKey: 'app.portfolio.llms.sections.contact',
        links: [
            {
                kind: 'route',
                route: ROUTES.CONTACT,
                nameKey: 'app.header.links.contact',
                descriptionKey: 'app.contact.seo.description'
            },
            {
                kind: 'external',
                hrefKey: 'app.contact.contact_link.linkedin.href',
                nameKey: 'app.contact.contact_link.linkedin.label',
                descriptionKey: 'app.portfolio.llms.social.linkedin'
            },
            {
                kind: 'external',
                hrefKey: 'app.contact.contact_link.instagram.href',
                nameKey: 'app.contact.contact_link.instagram.label',
                descriptionKey: 'app.portfolio.llms.social.instagram'
            }
        ]
    },
    {
        headingKey: 'app.portfolio.llms.sections.legal',
        links: [
            {
                kind: 'route',
                route: ROUTES.COOKIE_POLICY,
                nameKey: 'app.cookie_policy.h1',
                descriptionKey: 'app.cookie_policy.seo.description'
            }
        ]
    }
];

const NOTE_KEYS = [
    'app.portfolio.llms.notes.locale',
    'app.portfolio.llms.notes.location',
    'app.portfolio.llms.notes.availability'
] as const;

const buildUrl = (route: Route, locale: Locale) => {
    const path = getPath(route, locale);
    return `${BASE_URL}/${locale}${path === '/' ? '' : path}`;
};

const buildItem = (name: string, href: string, description: string) =>
    `- [${name}](${href}): ${description}`;

const buildSection = (section: LlmsSection, t: Translator, locale: Locale) => {
    const items = section.links.map((link) =>
        buildItem(
            t(link.nameKey),
            link.kind === 'route' ? buildUrl(link.route, locale) : t(link.hrefKey),
            t(link.descriptionKey)
        )
    );

    return [`## ${t(section.headingKey)}`, '', ...items].join('\n');
};

/**
 * La sección `## Optional` es parte de la especificación llms.txt: los
 * consumidores pueden omitirla si necesitan un contexto más reducido, así que
 * su encabezado se mantiene en inglés de forma intencionada.
 */
const buildOptionalSection = (t: Translator, locale: Locale) => {
    const items = [
        ...LOCALES.filter((l) => l !== locale).map((l) =>
            buildItem(
                t(`app.header.language_switcher.${l}`),
                `${BASE_URL}/${l}/llms.txt`,
                t('app.portfolio.llms.optional.other_language')
            )
        ),
        buildItem('sitemap.xml', `${BASE_URL}/sitemap.xml`, t('app.portfolio.llms.optional.sitemap'))
    ];

    return ['## Optional', '', ...items].join('\n');
};

export function buildLlmsTxt({ t, locale }: { t: Translator; locale: Locale }): string {
    const blocks = [
        `# ${t('app.portfolio.seo.schema.profile.name')}`,
        `> ${t('app.portfolio.llms.summary')}`,
        NOTE_KEYS.map((key) => `- ${t(key)}`).join('\n'),
        ...SECTIONS.map((section) => buildSection(section, t, locale)),
        buildOptionalSection(t, locale)
    ];

    return `${blocks.join('\n\n')}\n`;
}

export const LLMS_TXT_HEADERS = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'
} as const;
