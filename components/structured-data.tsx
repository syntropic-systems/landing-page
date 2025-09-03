export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.cloudglancelab.com/#organization",
        name: "CloudGlance",
        url: "https://www.cloudglancelab.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.cloudglancelab.com/logos/Logo%20Full.svg",
          width: 240,
          height: 60,
        },
        description: "AI-powered document intelligence platform for RFP analysis and contract review",
        sameAs: [
          // Add your social media URLs here
          // "https://twitter.com/cloudglance",
          // "https://linkedin.com/company/cloudglance",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.cloudglancelab.com/#website",
        url: "https://www.cloudglancelab.com",
        name: "CloudGlance",
        description: "Transform weeks of document analysis into minutes with AI-powered RFP analysis and contract review",
        publisher: {
          "@id": "https://www.cloudglancelab.com/#organization",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "CloudGlance Platform",
        operatingSystem: "Web",
        applicationCategory: "BusinessApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Contact for pricing",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "127",
          bestRating: "5",
          worstRating: "1",
        },
        description: "AI-powered document intelligence for automated RFP analysis, contract review, and proposal generation",
        screenshot: "https://www.cloudglancelab.com/images/dashboard-preview.png",
        featureList: [
          "AI-Powered RFP Analysis",
          "Automated Contract Review",
          "Proposal Generation",
          "Go/No-Go Decisions",
          "Document Q&A Engine",
          "Team Collaboration",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does CloudGlance analyze documents?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CloudGlance uses advanced AI and RAG (Retrieval-Augmented Generation) technology to deeply understand your documents, extracting key information, identifying risks, and generating insights in minutes instead of weeks.",
            },
          },
          {
            "@type": "Question",
            name: "What types of documents can CloudGlance process?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CloudGlance can process RFPs, tenders, contracts, proposals, legal documents, and any business documentation. It supports PDF, Word, Excel, and most common document formats.",
            },
          },
          {
            "@type": "Question",
            name: "How much time can CloudGlance save?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CloudGlance typically reduces document analysis time by 90%, transforming weeks of manual review into minutes of AI-powered analysis. Users report saving 20-30 hours per proposal.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}