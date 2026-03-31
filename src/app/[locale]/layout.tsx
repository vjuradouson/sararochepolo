import type { Metadata } from "next";
import { Kantumruy_Pro } from "next/font/google";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server'
import { ROUTING } from '@/i18n/routing';
import { BASE_URL, LOCALES } from '@/lib/config';
import { ReactNode } from 'react'

const kantumruyPro = Kantumruy_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kantumruy-pro'
});

const locales = LOCALES;

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {

  const { locale } = await params;

  const { locales, defaultLocale } = ROUTING;

  const t = await getTranslations({ locale });

  return {
    title: t("app.portfolio.title"),
    description: t("app.portfolio.description"),

    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        ...Object.fromEntries(
          locales.map(l => [
            l,
            `${BASE_URL}/${l}`
          ])
        ),
        'x-default': `${BASE_URL}/${defaultLocale}`,
      },
    },
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
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale)
  const messages = await getMessages({ locale })
  console.log(messages.app.portfolio.owner)

  return (
    <html
      lang={locale}
      className={`${kantumruyPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />

          <main className="flex-1 pt-20">
            {children}
          </main>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}