import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/LanguageProvider";

const AccessibilityWidget = dynamic(
  () => import("@/components/accessibility-widget").then((m) => m.AccessibilityWidget),
  { ssr: false }
);
const ScrollToTop = dynamic(
  () => import("@/components/ScrollToTop").then((m) => m.ScrollToTop),
  { ssr: false }
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MOEWR - Ministry of Energy, Water Resources",
  description: "Official website of the Ministry of Energy, Water Resources - MOEWR",
  icons: {
    icon: '/ministry-logo.png',
    shortcut: '/ministry-logo.png',
    apple: '/ministry-logo.png',
  },
};

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <ScrollToTop />
            <AccessibilityWidget />
          <Analytics />
          <SpeedInsights />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
