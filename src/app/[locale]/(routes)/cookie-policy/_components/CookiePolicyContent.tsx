import ManageCookiesButton from "./ManageCookiesButton";

type CookieRow = {
    cookie: string;
    provider: string;
    purpose: string;
    duration: string;
};

type TableHeaders = {
    cookie: string;
    provider: string;
    purpose: string;
    duration: string;
};

type Props = {
    data: {
        h1: string;
        lastUpdated: { label: string; value: string };
        intro: string;
        controller: { h2: string; body: string };
        what: { h2: string; body: string };
        legalBasis: { h2: string; body: string };
        categories: {
            h2: string;
            necessary: {
                h3: string;
                body: string;
                table: { headers: TableHeaders; rows: CookieRow[] };
            };
            preferences: { h3: string; body: string };
            analytics: {
                h3: string;
                body: string;
                providers: {
                    gtm: { h4: string; body: string };
                    clarity: { h4: string; body: string };
                };
                table: { headers: TableHeaders; rows: CookieRow[] };
            };
            marketing: { h3: string; body: string };
        };
        international: { h2: string; body: string };
        rights: { h2: string; body: string };
        manage: {
            h2: string;
            body: string;
            ctaLabel: string;
            browserBody: string;
            browsers: string[];
        };
        changes: { h2: string; body: string };
    };
};

function CookieTable({
    headers,
    rows,
}: {
    headers: TableHeaders;
    rows: CookieRow[];
}) {
    return (
        <div className="overflow-x-auto mt-6">
            <table className="w-full text-left text-sm border-collapse">
                <thead>
                    <tr className="border-b border-dark-blue/20">
                        <th className="py-3 pr-4 font-medium uppercase tracking-[0.18em] text-xs">{headers.cookie}</th>
                        <th className="py-3 pr-4 font-medium uppercase tracking-[0.18em] text-xs">{headers.provider}</th>
                        <th className="py-3 pr-4 font-medium uppercase tracking-[0.18em] text-xs">{headers.purpose}</th>
                        <th className="py-3 font-medium uppercase tracking-[0.18em] text-xs">{headers.duration}</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.cookie} className="border-b border-dark-blue/10">
                            <td className="py-3 pr-4 font-mono text-xs">{row.cookie}</td>
                            <td className="py-3 pr-4">{row.provider}</td>
                            <td className="py-3 pr-4 leading-relaxed">{row.purpose}</td>
                            <td className="py-3 whitespace-nowrap">{row.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function CookiePolicyContent({ data }: Props) {
    return (
        <section className="container-xl mx-auto pt-25">
            <article className="max-w-3xl mx-auto pb-16">
                <h1 className="mb-4 text-xl uppercase tracking-widest text-brand-muted">
                    {data.h1}
                </h1>

                <p className="mb-10 text-sm text-brand-muted">
                    {data.lastUpdated.label}: {data.lastUpdated.value}
                </p>

                <p className="mb-12 text-lg leading-relaxed">{data.intro}</p>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl tracking-tight">{data.controller.h2}</h2>
                    <p className="leading-relaxed">{data.controller.body}</p>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl tracking-tight">{data.what.h2}</h2>
                    <p className="leading-relaxed">{data.what.body}</p>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl tracking-tight">{data.legalBasis.h2}</h2>
                    <p className="leading-relaxed">{data.legalBasis.body}</p>
                </section>

                <section className="mb-12">
                    <h2 className="mb-6 text-2xl tracking-tight">{data.categories.h2}</h2>

                    <div className="mb-10">
                        <h3 className="mb-3 text-xl tracking-tight">{data.categories.necessary.h3}</h3>
                        <p className="leading-relaxed">{data.categories.necessary.body}</p>
                        <CookieTable
                            headers={data.categories.necessary.table.headers}
                            rows={data.categories.necessary.table.rows}
                        />
                    </div>

                    <div className="mb-10">
                        <h3 className="mb-3 text-xl tracking-tight">{data.categories.preferences.h3}</h3>
                        <p className="leading-relaxed">{data.categories.preferences.body}</p>
                    </div>

                    <div className="mb-10">
                        <h3 className="mb-3 text-xl tracking-tight">{data.categories.analytics.h3}</h3>
                        <p className="leading-relaxed">{data.categories.analytics.body}</p>

                        <div className="mt-6 mb-6">
                            <h4 className="mb-2 font-semibold">{data.categories.analytics.providers.gtm.h4}</h4>
                            <p className="leading-relaxed text-sm">{data.categories.analytics.providers.gtm.body}</p>
                        </div>

                        <div className="mb-2">
                            <h4 className="mb-2 font-semibold">{data.categories.analytics.providers.clarity.h4}</h4>
                            <p className="leading-relaxed text-sm">{data.categories.analytics.providers.clarity.body}</p>
                        </div>

                        <CookieTable
                            headers={data.categories.analytics.table.headers}
                            rows={data.categories.analytics.table.rows}
                        />
                    </div>

                    <div className="mb-10">
                        <h3 className="mb-3 text-xl tracking-tight">{data.categories.marketing.h3}</h3>
                        <p className="leading-relaxed">{data.categories.marketing.body}</p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl tracking-tight">{data.international.h2}</h2>
                    <p className="leading-relaxed">{data.international.body}</p>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl tracking-tight">{data.rights.h2}</h2>
                    <p className="leading-relaxed">{data.rights.body}</p>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl tracking-tight">{data.manage.h2}</h2>
                    <p className="leading-relaxed mb-4">{data.manage.body}</p>
                    <ManageCookiesButton label={data.manage.ctaLabel} />
                    <p className="leading-relaxed mt-6 mb-3">{data.manage.browserBody}</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                        {data.manage.browsers.map((browser) => (
                            <li key={browser}>{browser}</li>
                        ))}
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl tracking-tight">{data.changes.h2}</h2>
                    <p className="leading-relaxed">{data.changes.body}</p>
                </section>
            </article>
        </section>
    );
}
