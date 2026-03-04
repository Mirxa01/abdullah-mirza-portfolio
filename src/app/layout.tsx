import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    metadataBase: new URL("https://abdullahmirza.com"),
    title: "Abdullah Mirza | Entrepreneur | AI Platform Builder | Logistics & E-Commerce Executive",
    description: "Founder-operator portfolio of Abdullah Mirza: AI-driven platform architect, logistics and supply chain executive, and Vision 2030-aligned entrepreneur in Riyadh, Saudi Arabia.",
    keywords: ["Abdullah Mirza", "Riyadh", "Saudi Arabia", "AI Platform Builder", "Logistics Executive", "Supply Chain Strategy", "3PL", "Marketplace Scaling", "Vision 2030", "Entrepreneur"],
    authors: [{ name: "Abdullah Mirza" }],
    robots: "index, follow",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Abdullah Mirza | Founder & Platform Builder",
        description: "I Build AI-Driven Platforms and Scalable Commerce Infrastructure.",
        url: "/",
        siteName: "Abdullah Mirza Portfolio",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/images/executive-portrait.png",
                width: 1200,
                height: 630,
                alt: "Abdullah Mirza - Executive Profile",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Abdullah Mirza | Founder & Platform Builder",
        description: "AI-driven platforms, logistics infrastructure, and scalable commerce ecosystems.",
        images: ["/images/executive-portrait.png"],
    },
};

import CustomCursor from "@/components/CustomCursor";
import { ScrollObserver } from "@/components/ScrollObserver";

import { ToastProvider } from "@/components/ToastProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} scroll-smooth`}>
            <head>
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            {/* The background color is now controlled via global CSS var updated by ScrollObserver */}
            <body className="antialiased min-h-screen relative text-white overflow-x-hidden">
                <ScrollObserver />
                <CustomCursor />
                {/* Ambient background glows */}
                <div className="glow-effect print:hidden" style={{ top: '-10%', left: '-5%' }}></div>
                <div className="glow-effect print:hidden" style={{ top: '40%', right: '-10%' }}></div>
                <div className="glow-effect print:hidden" style={{ bottom: '-5%', left: '20%' }}></div>

                <ToastProvider>
                    {children}
                </ToastProvider>
            </body>
        </html>
    );
}
