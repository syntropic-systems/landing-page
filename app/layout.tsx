import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToSection } from "@/components/scroll-to-section";
import { FloatingCards } from "@/components/floating-cards";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CloudGlance - AI-Powered Document Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudGlance - AI-Powered Document Intelligence Platform",
    description:
      "Complete document-heavy workflows in minutes, not days. AI-powered automation for tender bidding, vendor evaluation, and contract review.",
    creator: "@cloudglance",
    images: ["/opengraph-image"],
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

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CloudGlance",
  url: siteUrl,
  description:
    "AI-powered document intelligence platform for tender bidding, vendor evaluation, and RFX response automation.",
  publisher: {
    "@type": "Organization",
    name: "CloudGlance",
    url: siteUrl,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Product", item: `${siteUrl}/product` },
    { "@type": "ListItem", position: 3, name: "Automations", item: `${siteUrl}/automations` },
    { "@type": "ListItem", position: 4, name: "Solutions", item: `${siteUrl}/solutions` },
    { "@type": "ListItem", position: 5, name: "Company", item: `${siteUrl}/company` },
    { "@type": "ListItem", position: 6, name: "FAQ", item: `${siteUrl}/faq` },
    { "@type": "ListItem", position: 7, name: "Contact", item: `${siteUrl}/contact` },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CloudGlance",
  url: siteUrl,
  logo: `${siteUrl}/logo%20dark_lg.svg`,
  description:
    "CloudGlance is an AI-powered document intelligence platform that helps enterprises automate document-heavy workflows.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "sales@cloudglancelab.com",
    contactType: "sales",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://www.linkedin.com/company/cloudglance-lab-pvt-ltd",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
          <div
            className="pointer-events-none fixed inset-0 z-0 opacity-[0.15]"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--primary) 0.75px, transparent 0.75px)',
              backgroundSize: '24px 24px',
            }}
          />
          <FloatingCards />
          <SiteHeader />
          <Suspense fallback={null}>
            <ScrollToSection />
          </Suspense>
          <main className="relative z-[1] flex-1">{children}</main>
          <div className="relative z-[1]">
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
