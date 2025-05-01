import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
  title: "Volr",
  description: "Avoid disruptions, travel as free as the air. Volr: the interactive platform for reporting and viewing public transportation hazards in real time, ensuring safer and more informed journeys.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <head />
      <body className="antialiased">
        <div suppressHydrationWarning={true}>
          {typeof window !== "undefined" ? typeof window : null}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            <Header />
            <div className="py-4 bg-gradient-to-t from-secondary/5 to-secondary/30">
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
