import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
  title: "Volr",
  description: "Avoid dangers, travel as free as the air. Volr: the interactive platform for reporting and viewing public transportation hazards in real time, ensuring safer and more informed journeys.",
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
            <Header></Header>
            <div className="py-4 bg-gradient-to-b from-background to-secondary/10">
              {children}
            </div>
            <Footer></Footer>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}