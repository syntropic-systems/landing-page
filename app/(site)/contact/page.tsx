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
  openGraph: {
    title: "Schedule a Call - CloudGlance",
    description:
      "Book a strategy call with our team to learn how CloudGlance can automate your document workflows.",
  },
};

const CAL_URL = "swapnish-sahare/15min";

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        title="Schedule a Strategy Call"
        description="Book a time with our team to discuss how CloudGlance can streamline your document workflows with AI-powered intelligence."
        className="!pb-0"
      />
      <Section className="!pt-8 md:!pt-12 lg:!pt-16 !pb-12 md:!pb-16 lg:!pb-20">
        <div className="max-w-6xl mx-auto">
          <CalWidget
            url={CAL_URL}
            namespace="15min"
            className="w-full"
          />
        </div>
      </Section>
    </div>
  );
}
