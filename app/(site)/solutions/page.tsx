import { Hero2 } from '@/components/hero-2';
import { Section } from '@/components/section';
import { CTASection } from '@/components/cta-section';
import { TabSection } from '@/components/tab-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions - By Team & Industry',
  description:
    'CloudGlance solutions for Operations, Procurement, Sales, and Legal teams across Infrastructure, Manufacturing, IT Services, and Government sectors.',
  alternates: {
    canonical: 'https://cloudglancelab.com/solutions',
  },
  openGraph: {
    title: 'CloudGlance Solutions - By Team & Industry',
    description:
      'Discover how CloudGlance transforms document workflows for different teams and industries.',
  },
};

type SolutionsPageProps = {
    searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

export default async function SolutionsPage({ searchParams }: SolutionsPageProps) {
    const params = searchParams instanceof Promise ? await searchParams : searchParams;
    const tabParamInput = params?.tab;
    const tabParam = Array.isArray(tabParamInput) ? tabParamInput[0] : tabParamInput;
    const sectionParamInput = params?.section;
    const sectionParam = Array.isArray(sectionParamInput) ? sectionParamInput[0] : sectionParamInput;

    const teamTabs = [
        {
            value: "operations",
            label: "Operations & Project",
            title: "Operations & Project Teams",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Operations & Project Teams",
            highlights: [
                {
                    subtitle: "The Pain",
                    body: "Teams spend hours digging through files, coordinating tasks, and fixing avoidable mistakes.",
                },
                {
                    subtitle: "How CloudGlance Help",
                    body: "- Pulls the required information from long files in seconds\n- Keeps tasks, documents, and stages connected to avoid slowdowns\n- Reduces errors by giving teams structured, reliable data to work with",
                },
                {
                    subtitle: "The Outcome",
                    body: "Projects move faster with fewer mistakes and far smoother execution.",
                },
            ],
        },
        {
            value: "business",
            label: "Business Development & Sales",
            title: "Business Development & Sales Teams",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Business Development & Sales Teams",
            highlights: [
                {
                    subtitle: "The Pain",
                    body: "Opportunities are lost due to slow discovery, missed requirements, and manual processes that drag out responses.",
                },
                {
                    subtitle: "How CloudGlance Help",
                    body: "- Identifies relevant opportunities automatically\n- Highlights scope fit, risks, and key requirements upfront\n- Speeds up responses by eliminating the manual work that slows teams down",
                },
                {
                    subtitle: "The Outcome",
                    body: "Teams respond quickly, confidently, and with far greater accuracy—leading to more wins.",
                },
            ],
        },
        {
            value: "compliance",
            label: "Compliance, Legal & Risk",
            title: "Compliance, Legal & Risk Teams",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Compliance, Legal & Risk Teams",
            highlights: [
                {
                    subtitle: "The Pain",
                    body: "Critical details are often buried deep in documents, leading to missed risks and inconsistent checks.",
                },
                {
                    subtitle: "How CloudGlance Help",
                    body: "- Spots hidden risks early so nothing in the fine print is overlooked\n- Checks all requirements automatically and flags missing documents or responses\n- Maintains a clean audit trail for internal reviews and compliance",
                },
                {
                    subtitle: "The Outcome",
                    body: "Reviews become more reliable, consistent, and audit-ready—without extra effort.",
                },
            ],
        },
        {
            value: "management",
            label: "Management",
            title: "Management & Decision-Makers",
            image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Management & Decision-Makers",
            highlights: [
                {
                    subtitle: "The Pain",
                    body: "High operational costs, frequent errors, slow turnaround times, and the need for larger teams to maintain output.",
                },
                {
                    subtitle: "How CloudGlance Help",
                    body: "- Cuts nearly 80% of manual effort across document-heavy processes\n- Reduces mistakes, rework, and escalations\n- Enables smaller teams to accomplish significantly more",
                },
                {
                    subtitle: "The Outcome",
                    body: "Lower costs, faster cycles, fewer errors, and better margins across the entire operation.",
                },
            ],
        },
    ];

    const industryTabs = [
        {
            value: "construction",
            label: "Construction & Infrastructure",
            title: "Construction & Infrastructure",
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Construction & Infrastructure",
            highlights: [
                {
                    subtitle: "How CloudGlance Help",
                    body: "Manage large, complex tender packages with ease. CloudGlance extracts BOQs, technical specs, and requirements instantly, reducing coordination delays and helping teams deliver accurate bids on time.",
                },
            ],
        },
        {
            value: "technology",
            label: "Technology & IT",
            title: "Technology & IT",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Technology & IT",
            highlights: [
                {
                    subtitle: "How CloudGlance Help",
                    body: "Accelerate responses to RFPs, security questionnaires, and compliance-heavy documents. CloudGlance reads technical files, maps requirements, and generates structured responses far faster than manual processes.",
                },
            ],
        },
        {
            value: "energy",
            label: "Energy",
            title: "Energy",
            image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Energy",
            highlights: [
                {
                    subtitle: "How CloudGlance Help",
                    body: "Simplify evaluation and bidding for highly regulated projects. CloudGlance surfaces risks, highlights deviations, and keeps all documents connected so teams can respond and review with greater accuracy.",
                },
            ],
        },
        {
            value: "manufacturing",
            label: "Manufacturing",
            title: "Manufacturing",
            image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Manufacturing",
            highlights: [
                {
                    subtitle: "How CloudGlance Help",
                    body: "Eliminate manual work in product and BOQ matching. CloudGlance interprets specifications, quantities, and materials, enabling faster quote preparation and more precise tender responses.",
                },
            ],
        },
        {
            value: "real-estate",
            label: "Real Estate & Property Development",
            title: "Real Estate & Property Development",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Real Estate & Property Development",
            highlights: [
                {
                    subtitle: "How CloudGlance Help",
                    body: "Manage high-volume contracts, proposals, and project documents smoothly. CloudGlance pulls out clauses, costs, obligations, and risks—giving teams clearer insights for evaluation and decision-making.",
                },
            ],
        },
    ];

    const validDefaultTeamTab = sectionParam !== "industry" && teamTabs.some((tab) => tab.value === tabParam) ? tabParam : undefined;
    const validDefaultIndustryTab = sectionParam === "industry" && industryTabs.some((tab) => tab.value === tabParam) ? tabParam : undefined;

    return (
        <div>
            {/* Hero Section */}
            <Hero2
                title="Built for Every Team, Across Every Document-Heavy Industry"
                description="CloudGlance supports analysts, operations, and decision-makers with AI that reads documents, structures information, and powers complete workflows across sectors."
            />

            {/* Tab Section - By Team */}
            <Section
            id="by-team"
            title="By Team"
            >
                <TabSection
                    key={validDefaultTeamTab ?? "default"}
                    tabs={teamTabs}
                    defaultValue={validDefaultTeamTab}
                />
            </Section>

            {/* Tab Section - By Industry */}
            <Section
            id="by-industry"
            title="By Industry"
            description="Streamline your business-to-institution workflows"
            >
                <TabSection
                    key={validDefaultIndustryTab ?? "default"}
                    tabs={industryTabs}
                    defaultValue={validDefaultIndustryTab}
                />
            </Section>

            {/* CTA Section */}
            <CTASection
                title="Ready to Streamline how your Teams Work?"
                description="See how CloudGlance automates the heavy lifting across bids, evaluations, and reviews so your team can focus on decisions, not documents."
                primaryCta={{ text: 'See it in Action', href: 'https://app.cloudglancelab.com' }}
                secondaryCta={{ text: 'Talk to Sales', href: '/contact' }}
            />
        </div>
    );
}
