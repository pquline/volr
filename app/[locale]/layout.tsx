import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { GeistSans } from "geist/font/sans";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import "../globals.css";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030712",
};

export const metadata: Metadata = {
  title: "volr",
  description:
    "The interactive platform for reporting and viewing public transportation disruptions in real time, ensuring more informed journeys.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "volr",
  },
  icons: {
    icon: "/pwa.png",
    apple: "/pwa.png",
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = await getMessages({ locale });
  } catch {
    notFound();
  }

  const response = NextResponse.next();
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 31536000,
    sameSite: 'lax',
    secure: true
  });

  return (
    <html lang={locale} suppressHydrationWarning className={GeistSans.className}>
      <head />
      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 py-4 bg-gradient-to-t from-secondary/5 to-secondary/30">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
