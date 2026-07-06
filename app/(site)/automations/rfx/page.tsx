import type { Metadata } from "next";
import type { ComponentType } from "react";

import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { FeatureCard } from "@/components/feature-card";
import { RevealOnScroll, StaggerChildren, StaggerItem } from "@/components/animations";
import { PageHeader } from "@/components/page-header";
import { GitCompare, ShieldCheck, Target } from "lucide-react";
import { WorkflowStepCards } from "@/components/workflow-step-cards";
import { ImageShowcaseToggle } from "@/components/image-showcase-toggle";
import {
  RfqMatchingShowcase,
  RfqDeviationShowcase,
} from "@/components/showcases";

export const metadata: Metadata = {
  title: "RFX Response Automation",
  description:
    "Automate RFX responses with AI. Match product specs against RFQ requirements, identify deviations, and generate compliance reports faster.",
  alternates: {
    canonical: "https://cloudglancelab.com/automations/rfx",
  },
  keywords: [
    "RFX response automation",
    "RFP automation software",
    "RFQ matching tool",
    "product BOQ matching",
    "deviation scoring",
    "compliance scoring AI",
  ],
  openGraph: {
    title: "RFX Response Automation - CloudGlance",
    description:
      "Respond to RFPs, RFQs, and RFIs faster with AI-powered product matching and deviation analysis.",
  },
};

const workflowSteps: {
  title: string;
  description: string;
  image: string;
  imageDark: string;
  showcase?: ComponentType;
}[] = [
  {
    title: "Product & BOQ Matching",
    description:
      "AI reads the BOQ and connects each requirement with the company's products or services, showing what fits and where alternatives or clarifications may be needed. This gives teams quick visibility into the scope without manually checking every line or depending on multiple people to piece the information together.\n\nBy surfacing matches, gaps and potential mismatches early, the platform reduces back-and-forth across teams and lowers the risk of incorrect entries that commonly delay or derail submissions.",
    image: "/rfx/product_n_boq_white.png",
    imageDark: "/rfx/product_n_boq_black.png",
    showcase: RfqMatchingShowcase,
  },
  {
    title: "Deviation & Compliance Scoring",
    description:
      "AI checks each response against the requirements in the tender or RFP and highlights compliance, deviations and any missing documents or responses. It also surfaces gaps or risks that could affect delivery, pricing or contractual obligations, making it clear where responses may fall short or introduce uncertainty.\n\nThis gives teams a straightforward view of which specs closely match the requirements, which ones need clarification and where potential issues may appear later in the project.",
    image: "/rfx/deviation_white.png",
    imageDark: "/rfx/deviation_black.png",
    showcase: RfqDeviationShowcase,
  },
];

const rfxBenefits = [
  {
    icon: <GitCompare className="text-primary" />,
    title: "Instant Spec Matching",
    description:
      "Match product catalogs against RFX requirements in seconds instead of hours of manual comparison.",
  },
  {
    icon: <ShieldCheck className="text-primary" />,
    title: "Complete Deviation Visibility",
    description:
      "Surface every deviation, gap and risk before submission so nothing gets missed.",
  },
  {
    icon: <Target className="text-primary" />,
    title: "Faster, More Accurate Responses",
    description:
      "Respond to more RFPs and RFQs with confidence, backed by structured compliance data.",
  },
];

export default function RfxPage() {
  return (
    <div>
      <PageHeader
        title="RFX Responses, Without the Guesswork"
        description="Match products to requirements and surface deviations automatically so your team responds faster and with full accuracy."
        button={{
          text: "View All Automations",
          href: "/automations",
          variant: "ghost",
        }}
      />

      <Section>
        <RevealOnScroll direction="up" duration={0.6}>
          <div className="max-w-4xl space-y-4 text-base md:text-lg text-muted-foreground">
            <p>
              Responding to RFPs, RFQs and RFIs requires matching your products and services against detailed specifications, identifying deviations and ensuring every response meets the buyer's requirements. When done manually, this means hours of cross-referencing catalogues, BOQs and compliance documents across teams.
            </p>
            <p>
              CloudGlance automates RFX responses by reading requirement documents, matching each line item against your product catalogue and scoring compliance and deviations automatically. Teams see exactly where they match, where they deviate and what needs clarification — before the submission deadline.
            </p>
          </div>
        </RevealOnScroll>
      </Section>

      <Section className="!py-0">
        <WorkflowStepCards steps={workflowSteps} />
      </Section>

      <Section className="!py-12">
        <ScrollStack>
          {workflowSteps.map((step) => (
            <ScrollStackItem
              key={step.title}
              itemClassName="bg-card h-auto"
              data-step-id={step.title}
            >
              <div className="grid gap-6 md:grid-cols-3 items-start [&>*]:min-w-0">
                <div className="flex flex-col justify-center space-y-3 md:col-span-1">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-primary">
                    {step.title}
                  </h3>
                  <p className="text-base text-foreground">
                    {step.description}
                  </p>
                </div>
                <ImageShowcaseToggle
                  image={step.image}
                  imageDark={step.imageDark}
                  alt={step.title}
                  showcase={step.showcase}
                />
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </Section>

      <Section
        title={
          <>
            Why Choose CloudGlance for{" "}
            <span className="text-primary">RFX Responses</span>
          </>
        }
        description="CloudGlance helps teams match specs, surface deviations, and respond to RFPs and RFQs with speed and accuracy."
      >
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          stagger={0.12}
        >
          {rfxBenefits.map((benefit) => (
            <StaggerItem key={benefit.title}>
              <FeatureCard
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      <CTASection
        title="Respond to RFXs Faster with Confidence."
        description="See how CloudGlance can streamline your RFX response workflows and eliminate manual spec matching."
        primaryCta={{ text: "Book a Demo", href: "/contact" }}
      />
    </div>
  );
}
