import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "volr",
  description:
    "Avoid disruptions, travel as free as the air. volr: the interactive platform for reporting and viewing public transportation hazards in real time, ensuring safer and more informed journeys.",
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
      </body>
    </html>
  );
}
