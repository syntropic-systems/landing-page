import { Hero2 } from '@/components/hero-2';
import { Section } from '@/components/section';
import { CTASection } from '@/components/cta-section';
import { FeatureSide } from '@/components/feature-side';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automations - Tender & Evaluation Workflows',
  description:
    'Automate tender bidding, vendor evaluation, and contract review with CloudGlance AI. Reduce manual effort by 80% across your document workflows.',
  alternates: {
    canonical: 'https://cloudglancelab.com/automations',
  },
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
                title="Automate Every Step of Your Tender and Evaluation Workflow"
                description="Let CloudGlance handle the repetitive, time-consuming tasks across bidding, evaluation, and contract review with AI-powered automation."
            />

            <FeatureSide
                title="Tender Bidding"
                description={`Win more bids with a faster, more controlled response process. CloudGlance streamlines how your team discovers opportunities, validates eligibility, assembles responses, and ensures every submission is complete and compliant.
                - Eligibility & Go/No-Go Checks
                - Information & Form Extraction
                - Automated Form Filling
                - Product & BOQ Matching
                - Risk & Compliance Checks
                - Tender Search`}
                image="/automation/bidding.png"
                primaryCta={{ text: "Learn More", href: "/automations/tender-bidding" }}
            />
            <FeatureSide
                sectionClassName="bg-accent"
                reverse={true}
                title="Tender Evaluation"
                description={`Select the right vendor with clarity and confidence. CloudGlance streamlines evaluation by centralizing comparisons, standardizing scoring, and removing bottlenecks across your entire review process.
                - AI Bid Comparison
                - Deviation & Compliance Scoring
                - Scorecards & Evaluation Reports`}
                image="/automation/evaluation.png"
                primaryCta={{ text: "Learn More", href: "/automations/tender-evaluation" }}
            />
            <FeatureSide
                title="Contract Review"
                description="Transform complex contracts into clear, actionable insights. CloudGlance extracts clauses, highlights risks, and maps obligations so teams can review agreements faster and make informed decisions with confidence."
                image="/automation/contract_review.png"
                primaryCta={{ text: "Coming Soon" }}
            />

            <Section
                title={<>What Changes with <span className="text-primary">CloudGlance</span></>
                }   
                description="Teams use CloudGlance to move faster, reduce risk and deliver more with the same resources."
                >
                <div className="grid md:grid-cols-3 gap-12 text-center mx-auto pt-8">
                    <div>
                        <div className="text-7xl font-semibold text-primary mb-4">80%</div>
                        <div className="text-2xl text-foreground font-semibold pb-2">Faster Response Time</div>
                        <div className="text-base text-muted-foreground">AI reads and understands documents, organizing required information instantly & solving review, preparation and analysis faster.</div>
                    </div>
                    <div>
                        <div className="text-7xl font-semibold text-primary mb-4">3x</div>
                        <div className="text-2xl text-foreground font-semibold pb-2">More Opportunities</div>
                        <div className="text-base text-muted-foreground">With AI handling time-consuming and repetitive manual processes, teams can take on more projects without extra hiring or burnout.</div>
                    </div>
                    <div>
                        <div className="text-7xl font-semibold text-primary mb-4">99.7%</div>
                        <div className="text-2xl text-foreground font-semibold pb-2">Accuracy</div>
                        <div className="text-base text-muted-foreground">AI detects every requirement, clause and attachment, even those buried in fine print, with the same consistency, so nothing gets missed.</div>
                    </div>
                </div>
            </Section>

            {/* CTA Section */}
            <CTASection
                title="Let's start with the Workflow that Hurts the Most."
                description="Experience how CloudGlance transforms your most painful tender workflows into streamlined, automated processes."
                primaryCta={{ text: 'Book a Demo', href: '/contact' }}
            />
        </div>
    );
}
