import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./../globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sara Roche Polo · Portfolio",
  description: "Portfolio personal de Sara Roche Polo",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${interSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className="min-h-full flex flex-col font-sans">
          <Header />

          <main className="flex-1 pt-20">
            {children}
          </main>

          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
