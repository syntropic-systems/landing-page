import type { Metadata } from "next";

import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { FeatureCard, FeatureGrid } from "@/components/feature-card";
import { PageHeader } from "@/components/page-header";
import { BadgeCheck, CheckCircle, LayoutPanelLeft} from "lucide-react";
import { ThemeAwareImage } from "@/components/theme-aware-image";
import { WorkflowStepCards } from "@/components/workflow-step-cards";

export const metadata: Metadata = {
  title: "Tender Evaluation Automation",
  description:
    "Automate vendor evaluation with AI. Bid comparison, compliance scoring, deviation analysis, and automated scorecards for faster, objective procurement decisions.",
  alternates: {
    canonical: "https://cloudglancelab.com/automations/tender-evaluation",
  },
  openGraph: {
    title: "Tender Evaluation Automation - CloudGlance",
    description:
      "Choose the best vendor faster with AI-powered bid comparison, compliance checks, and scorecards.",
  },
};

const workflowSteps = [
  {
    title: "Bid Comparison",
    description:
      "Upon uploading the tender submissions to the platform, AI reads every vendor's submission and brings their responses into a common, comparable format. Technical, commercial and contractual details that normally sit in separate files appear side by side, giving teams a clear view of how each vendor is approaching the scope without digging through individual documents. This speeds up the first level of evaluation, removing hours of manual sorting.",
    image: "/evaluation/bid_comparison_white.png",
    imageDark: "/evaluation/bid_comparison_black.png",
  },
  {
    title: "Deviation and Compliance Scoring",
    description:
      "AI checks each bid against the requirements in the tender or RFP and highlights vendor compliance, deviations and any missing documents or responses. It also surfaces gaps or risks that could affect delivery, pricing or contractual obligations, making it clear where vendors may fall short or introduce uncertainty. This gives evaluation teams a straightforward view of which vendors closely match the scope, which ones need clarification and where potential issues may appear later in the project.",
    image: "/evaluation/deviation_white.png",
    imageDark: "/evaluation/deviation_black.png",
  },
  {
    title: "Scorecards and Reports",
    description:
      "Organisations can feed their bid scoring metrics into the platform, and AI applies those rules to evaluate every bid. Each response is scored and ranked objectively, giving teams a clear view of how vendors compare and which ones are the strongest fit. The results can be downloaded or shared as reports for approvals and audits, making the evaluation process faster, consistent and completely traceable.",
    image: "/evaluation/scorecards_white.png",
    imageDark: "/evaluation/scorecards_black.png",
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

      <Section className="!pb-0">
        <WorkflowStepCards steps={workflowSteps} />
      </Section>

      <Section className="!pt-0">
        <ScrollStack>
          {workflowSteps.map((step) => (
            <ScrollStackItem key={step.title} itemClassName="bg-card h-auto" data-step-id={step.title}>
              <div className="grid gap-6 md:grid-cols-3 items-start">
                <div className="flex flex-col justify-center space-y-3 md:col-span-1">
                  <p className="text-2xl font-semibold text-primary">{step.title}</p>
                  <p className="text-base text-foreground">{step.description}</p>
                </div>
                <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-border shadow-md md:col-span-2">
                  <ThemeAwareImage
                    src={step.image}
                    srcDark={step.imageDark}
                    alt={step.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
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
        className="bg-muted/40"
      >
        <FeatureGrid columns={3}>
          {evaluationBenefits.map((benefit) => (
            <FeatureCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </FeatureGrid>
      </Section>

      <CTASection
        title="Experience smarter Tender Evaluation with CloudGlance."
        description="See how CloudGlance can streamline your evaluation process and make smarter, faster decisions."
        primaryCta={{ text: "See it in Action", href: "https://app.cloudglancelab.com" }}
        secondaryCta={{ text: "Talk to Sales", href: "/contact" }}
      />
    </div>
  );
}

