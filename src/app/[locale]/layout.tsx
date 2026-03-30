import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./../globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { BASE_URL, LOCALES } from '@/lib/config';

const locales = LOCALES;

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {

  const { locale } = await params;
  const { locales, defaultLocale } = routing;

  return {
    title: "Sara Roche Polo · Portfolio",
    description: "Portfolio personal de Sara Roche Polo",

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

async function getMessages(locale: string) {
  try {
    return (await import(`@/i18n/locale/${locale}`)).default;
  } catch {
    return (await import(`@/i18n/locale/en`)).default;
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = await getMessages(locale);

  return (
    <html
      lang={locale}
      className={`${interSans.variable} ${playfairDisplay.variable} h-full antialiased`}
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