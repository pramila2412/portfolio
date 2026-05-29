import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { PageTransition } from "@/components/page-transition";
import { GrainOverlay } from "@/components/grain-overlay";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { ThemeProvider } from "@/components/theme-provider";

const firaCode = Fira_Code({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const firaCodeHeading = Fira_Code({
  weight: ["700"],
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const firaCodeCursive = Fira_Code({
  weight: ["400"],
  variable: "--font-cursive",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pramilak.in"),
  title: {
    default: "Pramila K | Software Developer",
    template: "%s | Pramila K",
  },
  description: "Software Developer specializing in React, Next.js, Node.js, MongoDB and MySQL.",
  verification: {
    google: "google83208983fb394399",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${firaCode.variable} ${firaCodeHeading.variable} ${firaCodeCursive.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <AnimatedBackground />
            <PageTransition>{children}</PageTransition>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
