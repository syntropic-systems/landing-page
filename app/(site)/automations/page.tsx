import { Hero2 } from '@/components/hero-2';
import { TaskCardsShard } from '@/components/hero/shards/TaskCardsShard';
import { Section } from '@/components/section';
import { CTASection } from '@/components/cta-section';
import { FeatureSide } from '@/components/feature-side';
import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/animations';
import { StatsSection } from '@/components/stats-section';
import { TenderSearchShowcase, L1EvaluationShowcase, RfqMatchingShowcase, ComingSoonShowcase } from '@/components/showcases';

export const metadata: Metadata = {
  title: 'Automations - Tender & Evaluation Workflows',
  description:
    'Automate tender bidding, vendor evaluation, and contract review with CloudGlance AI. Reduce manual effort by 80% across your document workflows.',
  alternates: {
    canonical: 'https://cloudglancelab.com/automations',
  },
  keywords: [
    "tender automation",
    "procurement workflow automation",
    "AI bid management",
    "tender evaluation automation",
    "RFX automation",
    "contract review AI",
  ],
  openGraph: {
    title: 'CloudGlance Automations - AI-Powered Workflow Automation',
    description:
      'Let AI handle repetitive tasks across bidding, evaluation, and contract review workflows.',
  },
};

export default function AutomationsPage() {
    return (
        <div>
            {/* Hero Section */}
            <Hero2
                badge="Automations"
                title={
                    <>
                        Automate <span className="text-primary">Every Step</span> of Your Bidding and Evaluation Workflow
                    </>
                }
                description="Let CloudGlance handle the repetitive, time-consuming tasks across bidding, evaluation, and contract review with AI-powered automation."
                visual={<TaskCardsShard />}
            />

            <Section>
                <RevealOnScroll direction="up" duration={0.6}>
                    <div className="max-w-4xl space-y-4 text-base md:text-lg text-muted-foreground">
                        <p>
                            Tender automation replaces the manual, repetitive steps in procurement workflows with AI that reads, extracts and organises information from complex tender documents. Instead of teams spending days scanning portals, cross-referencing eligibility criteria, filling forms and compiling submissions, the platform handles these tasks in minutes with consistent accuracy.
                        </p>
                        <p>
                            Most procurement teams lose time not because they lack expertise, but because the process itself is fragmented. Documents arrive in different formats, requirements are buried across hundreds of pages, and coordination between technical, commercial and compliance teams creates bottlenecks at every stage. CloudGlance connects these steps into a single, structured workflow so nothing falls through the cracks.
                        </p>
                        <p>
                            Whether your team is responding to government tenders, evaluating vendor bids or managing RFX submissions, automation removes the friction that slows down every cycle. The result is faster turnaround, fewer errors and the ability to pursue more opportunities without scaling headcount.
                        </p>
                    </div>
                </RevealOnScroll>
            </Section>

            <FeatureSide
                title="Tender Bidding"
                description={`Win more bids with a faster, more controlled response process. CloudGlance streamlines how your team discovers opportunities, validates eligibility, assembles responses, and ensures every submission is complete and compliant.
                - Tender Search
                - Eligibility & Go/No-Go Checks
                - Information & Form Extraction
                - Automated Form Filling
                - Risk & Compliance Checks`}
                media={<TenderSearchShowcase />}
                imageClassName="aspect-[3/4] lg:aspect-square"
                primaryCta={{ text: "Learn More", href: "/automations/tender-bidding" }}
            />
            <FeatureSide
                sectionVariant="secondary"
                reverse={true}
                title="Tender Evaluation"
                description={`Select the right vendor with clarity and confidence. CloudGlance streamlines evaluation by centralizing comparisons, standardizing scoring, and removing bottlenecks across your entire review process.
                - Evaluation Rubric
                - L1 Bidder Evaluation
                - Bidders Package Compliance Analysis`}
                media={<L1EvaluationShowcase />}
                imageClassName="aspect-[3/4] lg:aspect-square"
                primaryCta={{ text: "Learn More", href: "/automations/tender-evaluation" }}
            />
            <FeatureSide
                title="RFX Response"
                description={`Respond to RFPs, RFQs, and RFIs with speed and precision. CloudGlance matches your products against requirements and surfaces every deviation before submission.
                - Product & BOQ Matching
                - Deviation & Compliance Scoring`}
                media={<RfqMatchingShowcase />}
                imageClassName="aspect-[3/4] lg:aspect-square"
                primaryCta={{ text: "Learn More", href: "/automations/rfx" }}
            />
            <FeatureSide
                sectionVariant="secondary"
                reverse={true}
                title="Contract Review"
                description="Transform complex contracts into clear, actionable insights. CloudGlance extracts clauses, highlights risks, and maps obligations so teams can review agreements faster and make informed decisions with confidence."
                media={<ComingSoonShowcase preset="contract-review" />}
                imageClassName="aspect-[3/4] lg:aspect-square"
                primaryCta={{ text: "Coming Soon" }}
            />
            <FeatureSide
                title="Engineering Search"
                description="Perform analytics across complex documents at scale. CloudGlance identifies methods, techniques, clauses, obligations and procedures across thousands of documents instantly."
                media={<ComingSoonShowcase preset="engineering-search" />}
                imageClassName="aspect-[3/4] lg:aspect-square"
                primaryCta={{ text: "Coming Soon" }}
            />

            <StatsSection />

            {/* CTA Section */}
            <CTASection
                title="Let's start with the Workflow that Hurts the Most."
                description="Experience how CloudGlance transforms your most painful tender workflows into streamlined, automated processes."
                primaryCta={{ text: 'Book a Demo', href: '/contact' }}
            />
        </div>
    );
}
