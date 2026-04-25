type Crumb = {
    name: string;
    url: string;
};

export function getBreadcrumbSchema(crumbs: Crumb[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: crumb.url,
        })),
    };
}
