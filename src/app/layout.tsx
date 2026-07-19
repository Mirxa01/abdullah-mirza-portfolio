import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { ScrollObserver } from "@/components/ScrollObserver";
import { ToastProvider } from "@/components/ToastProvider";
import ChatWidget from "@/components/chat/ChatWidget";
import { SITE } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    metadataBase: new URL(SITE.URL),
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    keywords: [
        "Abdullah Mirza",
        "Riyadh",
        "Saudi Arabia",
        "Founder",
        "Full-stack builder",
        "AI products",
        "Workflow automation",
        "E-commerce",
        "Logistics",
        "Vision 2030",
    ],
    authors: [{ name: "Abdullah Mirza" }],
    robots: "index, follow",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Abdullah Mirza | Founder · Builder · Operator",
        description: "Friendly software, AI tools, and operations systems — built from Riyadh.",
        url: "/",
        siteName: SITE.NAME,
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Abdullah Mirza | Founder · Builder · Operator",
        description: "Apps, AI, logistics, and commerce — built with care from Riyadh.",
    },
};

/** JSON-LD structured data for rich search results */
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abdullah Mirza",
    jobTitle: "Founder · Builder · Operator",
    url: "https://abdullahmirza.com",
    description:
        "Founder, builder, and operator with 11 years of experience creating apps, AI tools, and automated workflows from Riyadh.",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Riyadh",
        addressCountry: "SA",
    },
    sameAs: [
        "https://www.linkedin.com/in/abdullahmirxa/",
        "https://mirxaa.com",
    ],
    knowsAbout: ["AI Solutions", "Full-Stack Development", "Workflow Automation", "E-Commerce", "Logistics"],
};

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
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            {/* The background color is now controlled via global CSS var updated by ScrollObserver */}
            <body className="antialiased min-h-screen relative text-white overflow-x-hidden print:overflow-visible">
                <ScrollObserver />
                <CustomCursor />
                {/* Ambient background glows */}
                <div className="glow-effect print:hidden" style={{ top: '-10%', left: '-5%' }}></div>
                <div className="glow-effect print:hidden" style={{ top: '40%', right: '-10%' }}></div>
                <div className="glow-effect print:hidden" style={{ bottom: '-5%', left: '20%' }}></div>

                <ToastProvider>
                    {children}
                    <ChatWidget />
                </ToastProvider>
            </body>
        </html>
    );
}
