import Image from "next/image";

import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { FeatureCard, FeatureGrid } from "@/components/feature-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { CheckCircle, FileSignature, Workflow } from "lucide-react";

const workflowSteps = [
  {
    title: "Bid Comparison",
    description:
      "Upon uploading the tender submissions to the platform, AI reads every vendor's submission and brings their responses into a common, comparable format. Technical, commercial and contractual details that normally sit in separate files appear side by side, giving teams a clear view of how each vendor is approaching the scope without digging through individual documents. This speeds up the first level of evaluation, removing hours of manual sorting.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Deviation and Compliance Scoring",
    description:
      "AI checks each bid against the requirements in the tender or RFP and highlights vendor compliance, deviations and any missing documents or responses. It also surfaces gaps or risks that could affect delivery, pricing or contractual obligations, making it clear where vendors may fall short or introduce uncertainty. This gives evaluation teams a straightforward view of which vendors closely match the scope, which ones need clarification and where potential issues may appear later in the project.",
    image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Scorecards and Reports",
    description:
      "Organisations can feed their bid scoring metrics into the platform, and AI applies those rules to evaluate every bid. Each response is scored and ranked objectively, giving teams a clear view of how vendors compare and which ones are the strongest fit. The results can be downloaded or shared as reports for approvals and audits, making the evaluation process faster, consistent and completely traceable.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
  }
];

const issuingBenefits = [
  {
    icon: <Workflow className="text-primary" />,
    title: "Coordinated Teams",
    description: "Legal, finance, and procurement collaborate in-line with version control and approvals.",
  },
  {
    icon: <FileSignature className="text-primary" />,
    title: "Policy Enforcement",
    description: "Templates, clauses, and scoring rubrics are centrally managed so every event stays compliant.",
  },
  {
    icon: <CheckCircle className="text-primary" />,
    title: "Audit Ready",
    description: "Every clarification, attachment, and decision is time-stamped for auditors and partners.",
  },
];

export default function TenderIssuingPage() {
  return (
    <div>
      <PageHeader
        title="Tender Issuing with Zero Bottlenecks"
        description="Standardize how you publish, manage, and award tenders with guided workflows and AI assistance."
        button={{
          text: "View All Automations",
          href: "/automations",
          variant: "ghost"
        }}
      />

      <Section className="!pb-0">
        <div className="grid gap-4 md:grid-cols-3">
          {workflowSteps.map((step) => (
            <Card key={step.title} className="bg-gradient-to-br from-accent/50 to-card text-center border-none shadow-sm p-3">
              <CardHeader className="p-0">
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <ScrollStack
            className="h-[90vh]"
            useWindowScroll
            >
          {workflowSteps.map((step) => (
            <ScrollStackItem key={step.title} itemClassName="bg-card h-[70vh]">
              <div className="grid h-full gap-6 md:grid-cols-2 items-start">
                <div className="flex flex-col justify-center space-y-3">
                  <p className="text-2xl font-semibold text-primary">{step.title}</p>
                  <p className="text-base text-foreground">{step.description}</p>
                </div>
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    src={step.image}
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
        title="Why Sourcing Leaders Choose CloudGlance"
        description="Bring consistency to global tender programs while giving every region the flexibility they need."
        className="bg-muted/40"
      >
        <FeatureGrid columns={3}>
          {issuingBenefits.map((benefit) => (
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
        title="Publish Your Next Tender with CloudGlance"
        description="We will configure your templates, workflows, and vendor rosters so that the next event goes live in minutes."
        primaryCta={{ text: "Schedule a Session", href: "/contact" }}
        secondaryCta={{ text: "Talk to Sales", href: "/contact" }}
      />
    </div>
  );
}

