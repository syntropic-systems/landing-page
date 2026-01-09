import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://cloudglancelab.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CloudGlance - AI-Powered Document Intelligence Platform",
    template: "%s | CloudGlance",
  },
  description:
    "CloudGlance cuts 80% of time spent on tender bidding, vendor evaluation, and contract review by turning PDFs, Excels, and technical files into structured data and automated workflows.",
  keywords: [
    "document intelligence",
    "AI document processing",
    "tender bidding automation",
    "vendor evaluation",
    "contract review",
    "document automation",
    "enterprise AI",
    "RFX automation",
    "procurement automation",
    "document extraction",
    "AI-powered workflows",
    "tender management",
    "bid management software",
  ],
  authors: [{ name: "CloudGlance" }],
  creator: "CloudGlance",
  publisher: "CloudGlance",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "CloudGlance",
    title: "CloudGlance - AI-Powered Document Intelligence Platform",
    description:
      "Complete document-heavy workflows in minutes, not days. AI-powered automation for tender bidding, vendor evaluation, and contract review.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudGlance - AI-Powered Document Intelligence Platform",
    description:
      "Complete document-heavy workflows in minutes, not days. AI-powered automation for tender bidding, vendor evaluation, and contract review.",
    creator: "@cloudglance",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CloudGlance",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered document intelligence platform that automates tender bidding, vendor evaluation, and contract review workflows.",
  url: siteUrl,
  author: {
    "@type": "Organization",
    name: "CloudGlance",
    url: siteUrl,
  },
  offers: {
    "@type": "Offer",
    category: "Enterprise Software",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "50",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CloudGlance",
  url: siteUrl,
  logo: `${siteUrl}/logo-dark_lg.svg`,
  description:
    "CloudGlance is an AI-powered document intelligence platform that helps enterprises automate document-heavy workflows.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@cloudglance.labs",
    contactType: "sales",
    availableLanguage: ["English"],
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
