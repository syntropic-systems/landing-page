import type { Metadata } from "next";
import {
  Rethink_Sans,
  Hedvig_Letters_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { ClientLayoutWrapper } from "./client-layout-wrapper";
import { StructuredData } from "@/components/structured-data";

// Configure the fonts
const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const hedvigLettersSerif = Hedvig_Letters_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CloudGlance - AI-Powered Document Intelligence for RFPs & Tenders",
  description:
    "Transform weeks of document analysis into minutes with CloudGlance's AI-powered platform. Automate RFP analysis, contract review, and proposal generation. Increase win rates by 40%.",
  keywords:
    "RFP analysis, tender management, document intelligence, AI contract review, proposal automation, bid management software, document analysis AI, enterprise document processing",
  authors: [{ name: "CloudGlance" }],
  creator: "CloudGlance",
  publisher: "CloudGlance",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.cloudglancelab.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    // apple icon intentionally omitted to prevent loading non-existent file
  },
  openGraph: {
    title: "CloudGlance - AI-Powered Document Intelligence",
    description:
      "Transform weeks of document analysis into minutes. Automate RFP analysis, contract review, and proposal generation with AI.",
    url: "https://www.cloudglancelab.com",
    siteName: "CloudGlance",
    images: [
      {
        url: "/images/og-image.png", // You'll need to create this
        width: 1200,
        height: 630,
        alt: "CloudGlance - AI Document Intelligence Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudGlance - AI-Powered Document Intelligence",
    description:
      "Transform weeks of document analysis into minutes with AI-powered RFP analysis and contract review.",
    images: ["/images/og-image.png"], // Same as OG image
    creator: "@cloudglance", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification
    // yandex: "verification-code",
    // bing: "verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rethinkSans.variable} ${hedvigLettersSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className={rethinkSans.className}>
        <StructuredData />
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
