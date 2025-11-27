import { Hero2 } from '@/components/hero-2';
import { Section } from '@/components/section';
import { CTASection } from '@/components/cta-section';
import { FeatureSide } from '@/components/feature-side';

export default function AutomationsPage() {
    const tenderBiddingSteps = [
        {
            title: '1. UPLOAD TENDER',
            description: 'Upload tender document and CloudGlance will extract all requirements automatically.',
        },
        {
            title: '2. VENDOR SEARCH',
            description: 'AI searches your database for the best matching vendors based on requirements.',
        },
        {
            title: '3. AUTO-ASSIGN BIDDERS',
            description: 'Automatically assign bidders based on expertise, availability, and past performance.',
        },
        {
            title: '4. FILL OUT RFP AUTOMATICALLY',
            description: 'AI fills out the RFP using historical data and vendor information.',
        },
        {
            title: '5. REVIEW AND SUBMIT',
            description: 'Quick review process with all information pre-filled and ready to submit.',
        },
        {
            title: '6. WHAT IT UNLOCKS',
            description: 'Reduce tender response time from weeks to hours. Increase bid volume by 3x.',
        },
    ];

    const tenderIssuingSteps = [
        {
            title: '1. CREATE TENDER AUTOMATICALLY',
            description: 'Generate tender documents from templates with AI-powered content suggestions.',
        },
        {
            title: '2. VENDOR MATCHING',
            description: 'Automatically identify and invite qualified vendors from your network.',
        },
        {
            title: '3. TRACK RESPONSES',
            description: 'Monitor all vendor responses in real-time with automated status updates.',
        },
    ];

    return (
        <div>
            {/* Hero Section */}
            <Hero2
                title="From Tender Search to Vendor Selection, BA Transforms Time"
                description="Automate your tender workflows from start to finish with AI-powered intelligence."
            />

            <FeatureSide
                title="Tender Bidding"
                description="A complete tender solution for businesses that procure FREQUENTLY from government or large enterprises. Bid faster, bid better."
                image="/images/automations/tender-bidding.png"
                primaryCta={{ text: "Learn More", href: "/automations/tender-bidding" }}
            />
            <FeatureSide
                sectionClassName="bg-accent"
                reverse={true}
                title="Tender Issuing"
                description="Issue tenders efficiently and manage the entire vendor selection process."
                image="/images/automations/tender-issuing.png"
                primaryCta={{ text: "Learn More", href: "/automations/tender-issuing" }}
            />
            <FeatureSide
                title="Contract Review"
                description="Review contracts efficiently and manage the entire vendor selection process."
                image="/images/automations/contract-review.png"
                primaryCta={{ text: "Coming Soon" }}
            />

            <Section
                title={<>What Changes with <span className="text-primary">CloudGlance</span></>
                }   
                description="Teams use CloudGlance to move faster, reduce risk and deliver more with the same resources."
                >
                <div className="grid md:grid-cols-3 gap-12 text-center mx-auto pt-8">
                    <div>
                        <div className="text-7xl font-semibold text-primary mb-4">72%</div>
                        <div className="text-2xl text-foreground font-semibold pb-2">Faster Response Time</div>
                        <div className="text-base text-muted-foreground">AI reads and understands documents, organizing required information instantly and solving the slowest parts of review, preparation and analysis.</div>
                    </div>
                    <div>
                        <div className="text-7xl font-semibold text-primary mb-4">3x</div>
                        <div className="text-2xl text-foreground font-semibold pb-2">More Bids</div>
                        <div className="text-base text-muted-foreground">AI detects every requirement, clause and attachment, even those buried in fine print, with the same consistency, so nothing gets missed.</div>
                    </div>
                    <div>
                        <div className="text-7xl font-semibold text-primary mb-4">100%</div>
                        <div className="text-2xl text-foreground font-semibold pb-2">Accuracy</div>
                        <div className="text-base text-muted-foreground">With AI handling time-consuming and repetitive manual processes, teams can take on more projects without extra hiring or burnout.</div>
                    </div>
                </div>
            </Section>

            {/* CTA Section */}
            <CTASection
                title="Let's see it with the workflow that hurts the most"
                description="Experience how CloudGlance transforms your most painful tender workflows into streamlined, automated processes."
                primaryCta={{ text: 'See it in Action', href: 'https://app.cloudglancelab.com' }}
                secondaryCta={{ text: 'Talk to Sales', href: '/contact' }}
            />
        </div>
    );
}
