import { CalWidget } from "@/components/cal-widget";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule a Call",
  description:
    "Book a strategy call with CloudGlance. Discover how AI-powered document intelligence can transform your workflows.",
  alternates: {
    canonical: "https://cloudglancelab.com/contact",
  },
  keywords: [
    "CloudGlance demo",
    "book demo document AI",
    "enterprise AI consultation",
    "procurement automation demo",
    "tender software demo",
  ],
  openGraph: {
    title: "Schedule a Call - CloudGlance",
    description:
      "Book a strategy call with our team to learn how CloudGlance can automate your document workflows.",
  },
};

const CAL_URL = "cloudglancesales/30min";

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        title="Schedule a Strategy Call"
        description="Book a time with our team to discuss how CloudGlance can streamline your document workflows with AI-powered intelligence."
        className="!pb-0"
      />
      <Section className="!pb-12 md:!pb-16 lg:!pb-20">
        <div className="max-w-6xl mx-auto">
          <CalWidget
            url={CAL_URL}
            namespace="30min"
            className="w-full"
          />
        </div>
      </Section>
    </div>
  );
}
