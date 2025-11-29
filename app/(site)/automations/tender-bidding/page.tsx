import type { Metadata } from "next";

import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { FeatureCard, FeatureGrid } from "@/components/feature-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { ThemeAwareImage } from "@/components/theme-aware-image";
import { ShieldCheck, Timer, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Tender Bidding Automation",
  description:
    "Automate your tender bidding process with AI. Tender search, eligibility checks, form extraction, automated filling, BOQ matching, and compliance verification.",
  alternates: {
    canonical: "https://cloudglancelab.com/automations/tender-bidding",
  },
  openGraph: {
    title: "Tender Bidding Automation - CloudGlance",
    description:
      "Win more bids faster with AI-powered tender search, extraction, and automated form filling.",
  },
};

const workflowSteps = [
  {
    title: "Tender Search",
    description:
      "Tender Search gathers all public tenders in one place and reads the organisation's profile, past work and preferences to automatically suggest the opportunities that fit. New releases appear the moment they go live, so relevant tenders are surfaced without the constant effort of checking multiple portals.\n\nTeams can still use their own keywords and filters whenever they want, and the platform highlights the required documents along with key financial and technical criteria. This keeps the team from missing suitable opportunities, reduces time spent scanning external sites and helps them focus only on tenders that are feasible for them.",
    image: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=800&q=80",
    imageDark: undefined,
  },
  {
    title: "Eligibility & Go / No-Go Check",
    description:
      "Eligibility Check reads the tender and matches its mandatory requirements with the organisation's profile, certifications and project history. It shows exactly where the company meets the criteria and where gaps exist, replacing hours of manual review.\n\nGo/No-Go then looks beyond eligibility by assessing scope, timelines, risks, contract terms and commercial fit. It highlights potential blockers, shows where the company is well-positioned and helps teams make a clear, data-backed decision on whether the bid is worth pursuing.",
    image: "/bidding/go_nogo_white.png",
    imageDark: "/bidding/go_nogo_black.png",
  },
  {
    title: "Information Extraction",
    description:
      "AI pulls out information such the technical details, timelines and requirements from even thousand-page tender documents and organises them into a clear, structured format. Teams get the information they need without searching across files or reading page by page.\n\nEvery extracted answer comes with a citation from the original document, which keeps the review accurate, reduces missed clauses and allows the team to prepare bids with confidence.",
    image: "/bidding/information_extraction_white.png",
    imageDark: "/bidding/information_extraction_black.png",
  },
  {
    title: "Form Extraction & Filling",
    description:
      "AI identifies all the forms and attachments required for a tender and converts them into editable Word or Excel files, allowing teams to work on them directly without manually extraction efforts. AI fills the fields using the company data already stored on the platform and suggests the remaining inputs that need attention.\n\nAI also identifies the supporting documents each form requires, such as GST certificates, incorporation documents or past project records, and attaches them automatically. This ensures that no form or document is missed, reduces the risk of technical rejection and saves significant time otherwise spent filling repetitive formats.",
    image: "/bidding/form_extraction_white.png",
    imageDark: "/bidding/form_extraction_black.png",
  },
  {
    title: "Product & BOQ Matching",
    description:
      "AI reads the BOQ and connects each requirement with the company's products or services, showing what fits and where alternatives or clarifications may be needed. This gives teams quick visibility into the scope without manually checking every line or depending on multiple people to piece the information together.\n\nBy surfacing matches, gaps and potential mismatches early, the platform reduces back-and-forth across teams and lowers the risk of incorrect entries that commonly delay or derail submissions.",
    image: "/bidding/product_n_boq_white.png",
    imageDark: "/bidding/product_n_boq_black.png",
  },
  {
    title: "Risk & Compliance Checks",
    description:
      "AI runs a complete review of the tender response against the tender documents before submission. It checks compliance with mandatory requirements, flags risks hidden in technical, commercial or contractual clauses and verifies that all required forms and documents are in place.\n\nThis single pass highlights what could lead to rejection now or create problems later, giving teams a clear view of what needs to be fixed before the bid goes out.",
    image: "/bidding/risk_compliance_white.png",
    imageDark: "/bidding/risk_compliance_black.png",
  },
];

const automationHighlights = [
  {
    icon: <Timer className="text-primary" />,
    title: "Faster Document Reviews",
    description:
      "Cut review cycles from days to hours with AI-powered extraction and comparison.",
  },
  {
    icon: <ShieldCheck className="text-primary" />,
    title: "Fewer Errors & Mismatches",
    description:
      "Automatically catch inconsistencies and reduce manual mistakes before submission.",
  },
  {
    icon: <Zap className="text-primary" />,
    title: "Handle More Tenders",
    description:
      "Increase your team’s bidding capacity without adding extra workload.",
  },
];

const outcomeMetrics = [
  {
    title: "72% Faster",
    description: "Cycle time from opportunity to submission drops from weeks to hours.",
  },
  {
    title: "3x More Pursuits",
    description: "Automations allow lean teams to respond to more opportunities in parallel.",
  },
  {
    title: "Higher Accuracy",
    description: "Structured reviews ensure every requirement and attachment is satisfied.",
  },
];

const biddingPromises = [
  "Unify tender intake channels, from portals to inboxes",
  "Assign the right pursuit team with AI recommendations",
  "Keep compliance, collaboration, and approvals in one workspace",
];

export default function TenderBiddingPage() {
  return (
    <div>
      <PageHeader
        title="Tender Bidding, Without the Fire Drills"
        description="Automate intake, vendor coordination, and proposal assembly so your team focuses on strategy instead of paperwork."
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
        <ScrollStack>
          {workflowSteps.map((step) => (
            <ScrollStackItem key={step.title} itemClassName="bg-card h-auto">
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
            Why Choose CloudGlance for <span className="text-primary">Your Tender Bidding</span>
          </>
        }
        description="CloudGlance speeds up your bid process, eliminates manual errors, and helps your team handle more tenders with confidence."
        className="bg-muted/40"
      >
        <FeatureGrid columns={3}>
          {automationHighlights.map((item) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </FeatureGrid>
      </Section>

      <CTASection
        title="Respond to Tenders Faster with Confidence."
        description="See how CloudGlance can accelerate your bidding workflows and unlock the full potential."
        primaryCta={{ text: "See it in Action", href: "https://app.cloudglancelab.com" }}
        secondaryCta={{ text: "Talk to Sales", href: "/contact" }}
      />
    </div>
  );
}

