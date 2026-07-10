import type { Metadata } from "next";
import type { ComponentType } from "react";

import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { FeatureCard } from "@/components/feature-card";
import { RevealOnScroll, StaggerChildren, StaggerItem } from "@/components/animations";
import { PageHeader } from "@/components/page-header";
import { BadgeCheck, CheckCircle, LayoutPanelLeft} from "lucide-react";
import { WorkflowStepCards } from "@/components/workflow-step-cards";
import { ImageShowcaseToggle } from "@/components/image-showcase-toggle";
import {
  EvaluationRubricShowcase,
  L1EvaluationShowcase,
  ComplianceShowcase,
} from "@/components/showcases";

export const metadata: Metadata = {
  title: "Tender Evaluation Automation",
  description:
    "Automate vendor evaluation with AI. Evaluation rubrics, L1 bidder selection, and compliance analysis for faster, objective procurement decisions.",
  alternates: {
    canonical: "https://cloudglancelab.com/automations/tender-evaluation",
  },
  keywords: [
    "tender evaluation automation",
    "vendor evaluation software",
    "L1 bidder evaluation",
    "bid comparison tool",
    "evaluation rubric scoring",
    "compliance analysis",
  ],
  openGraph: {
    title: "Tender Evaluation Automation - CloudGlance",
    description:
      "Choose the best vendor faster with AI-powered bid comparison, compliance checks, and scorecards.",
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
    title: "Evaluation Rubric",
    description:
      "Teams define or upload their scoring criteria, weightages and thresholds, and the platform applies them consistently across every submission. AI reads each vendor's response and maps it against the rubric, scoring technical, commercial and compliance parameters without manual interpretation.\n\nThis removes inconsistency from the evaluation process, ensures every bid is measured against the same standard and gives teams a clear, auditable basis for shortlisting and ranking vendors.",
    image: "/evaluation/rubric_white.png",
    imageDark: "/evaluation/rubric_black.png",
    showcase: EvaluationRubricShowcase,
  },
  {
    title: "L1 Bidder Evaluation",
    description:
      "AI evaluates bidders against the scoring rubric, applies the technical qualification threshold and selects the lowest-priced qualified bidder using the L1 method. It reads pricing schedules, applies normalisation rules and ranks vendors by evaluated cost after filtering out those who do not meet the minimum technical score.\n\nThis automates the most time-consuming part of financial evaluation, reduces errors in price comparison and ensures the L1 selection is transparent, traceable and aligned with the defined evaluation criteria.",
    image: "/evaluation/l1_bidder_white.png",
    imageDark: "/evaluation/l1_bidder_black.png",
    showcase: L1EvaluationShowcase,
  },
  {
    title: "Bidders Package Compliance Analysis",
    description:
      "AI analyses each bidder's submission against the tender requirements by extracting forms from both the tender document and the vendor's response. It matches them pair by pair, evaluates the quality and completeness of each matched set and flags missing, incomplete or non-compliant items.\n\nThe platform then generates a compliance report with rankings, giving evaluation teams a clear view of which vendors submitted complete packages and where gaps exist, so decisions can be made quickly and with full confidence.",
    image: "/evaluation/package_compliance_white.png",
    imageDark: "/evaluation/package_compliance_black.png",
    showcase: ComplianceShowcase,
  },
];

const evaluationBenefits = [
  {
    icon: <LayoutPanelLeft className="text-primary" />,
    title: "Faster Bid Evaluation",
    description: "Evaluate bids faster with clean, side-by-side comparisons of vendor responses.",
  },
  {
    icon: <CheckCircle className="text-primary" />,
    title: "Reduced Errors & Bias",
    description: "Apply structured scoring and automated checks to minimize mistakes and subjective bias.",
  },
  {
    icon: <BadgeCheck className="text-primary" />,
    title: "More Confident Decisions",
    description: "Make evidence-backed decisions with clear scoring trails and auditable insights.",
  },
];

export default function TenderEvaluationPage() {
  return (
    <div>
      <PageHeader
        title="Tender Evaluation with Zero Bottlenecks"
        description="Standardize how you publish, manage, and award tenders with guided workflows and AI assistance."
        button={{
          text: "View All Automations",
          href: "/automations",
          variant: "ghost"
        }}
      />

      <Section>
        <RevealOnScroll direction="up" duration={0.6}>
          <div className="max-w-4xl space-y-4 text-base md:text-lg text-muted-foreground">
            <p>
              Tender evaluation is where procurement teams compare vendor submissions, score bids against defined criteria and select the right partner. Done manually, this process is slow, inconsistent and vulnerable to errors — especially when dozens of bids need to be reviewed under tight deadlines.
            </p>
            <p>
              CloudGlance automates the evaluation workflow by applying scoring rubrics consistently across every submission, running L1 bidder selection based on qualified pricing and analysing each vendor's package for compliance gaps. Teams get structured, auditable results instead of spreadsheets and subjective reviews.
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
            <ScrollStackItem key={step.title} itemClassName="bg-card h-auto" data-step-id={step.title}>
              <div className="grid gap-6 md:grid-cols-3 items-start [&>*]:min-w-0">
                <div className="flex flex-col justify-center space-y-3 md:col-span-1">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-primary">{step.title}</h3>
                  <p className="text-base text-foreground">{step.description}</p>
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
            Why Choose CloudGlance for <span className="text-primary">Evaluating Your Bids</span>
          </>
        }
        description="CloudGlance helps evaluation teams compare vendors faster, reduce scoring errors, and make confident, evidence-backed decisions."
      >
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.12}>
          {evaluationBenefits.map((benefit) => (
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
        title="Experience smarter Tender Evaluation with CloudGlance."
        description="See how CloudGlance can streamline your evaluation process and make smarter, faster decisions."
        primaryCta={{ text: "Book a Demo", href: "/contact" }}
      />
    </div>
  );
}

