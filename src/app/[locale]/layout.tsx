import type { Metadata } from "next";
import { Kantumruy_Pro } from "next/font/google";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { BASE_URL, LOCALES, LocaleCountryMap } from '@/lib/config';
import { ReactNode } from 'react';
import CookieBanner from '@/components/CookieBanner';
import CookieScriptsClient from '@/components/CookieScriptsClient';
import Script from 'next/script';
import GTMPageView from '@/components/GTMPageView';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights as VercelSpeedInsights } from '@vercel/speed-insights/next';
import ConsentScript from '@/components/ConsentScript';

const kantumruyPro = Kantumruy_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kantumruy-pro'
});

const locales = LOCALES;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const t = await getTranslations({ locale })

  return {
    keywords: t("app.portfolio.seo.keywords"),
    authors: [
      { name: t("app.portfolio.owner"), url: BASE_URL }
    ],
    openGraph: {
      url: `${BASE_URL}/${locale}`,
      siteName: t("app.portfolio.owner"),
      images: [
        {
          url: `${BASE_URL}/media/about/profile.png`,
          width: 1200,
          height: 630,
        }
      ],
      locale: LocaleCountryMap[locale] || 'en_US',
      type: "website",
    }
  };
}

export const dynamic = 'force-static';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${kantumruyPro.variable} h-full antialiased`}
    >
      <head>
        <ConsentScript />
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `,
          }}
        />
        {/* Modern SVG */}
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${BASE_URL}/media/favicons/favicon.svg`}
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${BASE_URL}/media/favicons/favicon-dark.svg`}
          media="(prefers-color-scheme: dark)"
        />

        {/* Fallback SVG */}
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${BASE_URL}/media/favicons/favicon.svg`}
        />

        {/* PNG fallback (old browsers / tabs / Windows) */}
        <link
          rel="icon"
          type="image/png"
          href={`${BASE_URL}/media/favicons/favicon-16x16.png`}
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${BASE_URL}/media/favicons/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${BASE_URL}/media/favicons/favicon-48x48.png`}
          sizes="48x48"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${BASE_URL}/media/favicons/favicon-96x96.png`}
          sizes="96x96"
        />

        {/* ICO fallback (legacy) */}
        <link
          rel="shortcut icon"
          href={`${BASE_URL}/media/favicons/favicon.ico`}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `,
          }}
        />
        <VercelAnalytics />
        <VercelSpeedInsights />
        <GTMPageView />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />

          <main className="flex-1">
            {children}
          </main>

          <Footer />

          <CookieBanner />
          <CookieScriptsClient />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}