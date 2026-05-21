import type { Metadata } from "next";
import { Asimovian } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import SmoothScroll from "@/components/SmoothScroll";
import PageIntro from "@/components/PageIntro";

const asimovian = Asimovian({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Hulash Chand | Data Engineer → AI/ML Engineer",
  description: "Building scalable data infrastructure for AI/ML",
  alternates: {
    canonical: "https://www.hulash.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/images/hero-image.png" as="image" />
      </head>
      <body className={`min-h-screen dark ${asimovian.variable}`}>
        <ThemeProvider>
          <PageIntro />
          <LanguageProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}