import { Hero2 } from '@/components/hero-2';
import { Section } from '@/components/section';
import { CTASection } from '@/components/cta-section';
import { TabSection } from '@/components/tab-section';

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
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Operations & Project Teams",
            highlights: [
                {
                    subtitle: "The Pain",
                    body: "Searching team manually reading vendors, assigning bidders, and filing forms.",
                },
                {
                    subtitle: "How We Help",
                    body: "CloudGlance automates data extraction and form-filling.",
                },
                {
                    subtitle: "The Outcome",
                    body: "Finish vendor responses 72% faster.",
                },
            ],
        },
        {
            value: "business",
            label: "Business Development & Sales",
            title: "Business Development & Sales Teams",
            image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Business Development & Sales Teams",
            highlights: [
                {
                    subtitle: "The Pain",
                    body: "Deploy guardrails, audit logs, and permissions suited for global programs.",
                },
                {
                    subtitle: "How We Help",
                    body: "Eliminate repetitive steps so teams focus on decisions—not paperwork.",
                },
                {
                    subtitle: "The Outcome",
                    body: "Bring every region onto the same process without slowing innovation.",
                },
            ],
        },
        {
            value: "compliance",
            label: "Compliance, Legal & Risk",
            title: "Compliance, Legal & Risk Teams",
            image: "https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Compliance, Legal & Risk Teams",
            highlights: [
                {
                    subtitle: "The Pain",
                    body: "Capture every change and citation to satisfy regulators and auditors.",
                },
                {
                    subtitle: "How We Help",
                    body: "Move faster without sacrificing precision in contracts or tenders.",
                },
                {
                    subtitle: "The Outcome",
                    body: "Keep headquarters and field teams working from the same source of truth.",
                },
            ],
        },
        {
            value: "management",
            label: "Management",
            title: "Management & Decision-Makers",
            image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Management & Decision-Makers",
            highlights: [
                {
                    subtitle: "The Pain",
                    body: "Get a clear view of all projects, risks, and opportunities across the organization.",
                },
                {
                    subtitle: "How We Help",
                    body: "Make informed decisions based on real-time data and analytics.",
                },
                {
                    subtitle: "The Outcome",
                    body: "Keep headquarters and field teams working from the same source of truth.",
                },
            ],
        },
    ];

    const industryTabs = [
        {
            value: "b2b-saas",
            label: "B2B SaaS",
            title: "B2B SaaS Companies",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "B2B SaaS Companies",
            highlights: [
                {
                    subtitle: "The Pain",
                    body: "Manual document processing slows down sales cycles and customer onboarding processes.",
                },
                {
                    subtitle: "How We Help",
                    body: "Automate contract reviews, vendor evaluations, and customer document processing to accelerate deals.",
                },
                {
                    subtitle: "The Outcome",
                    body: "Reduce sales cycle time by 40% and streamline customer onboarding workflows.",
                },
            ],
        },
        {
            value: "marketplaces",
            label: "Marketplaces",
            title: "Online Marketplaces",
            image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Online Marketplaces",
            highlights: [
                {
                    subtitle: "The Pain",
                    body: "Managing vendor applications, compliance documents, and onboarding processes at scale.",
                },
                {
                    subtitle: "How We Help",
                    body: "Automate vendor evaluation, document verification, and compliance checks for faster marketplace growth.",
                },
                {
                    subtitle: "The Outcome",
                    body: "Process 3x more vendor applications with the same team and ensure consistent quality standards.",
                },
            ],
        },
        {
            value: "construction",
            label: "Construction",
            title: "Construction & Engineering",
            image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Construction & Engineering",
            highlights: [
                {
                    subtitle: "The Pain",
                    body: "Complex tender documents, technical drawings, and compliance requirements slow project approvals.",
                },
                {
                    subtitle: "How We Help",
                    body: "Extract and structure information from tender documents, technical specs, and drawings automatically.",
                },
                {
                    subtitle: "The Outcome",
                    body: "Respond to tenders 60% faster and ensure all technical requirements are captured accurately.",
                },
            ],
        },
        {
            value: "healthcare",
            label: "Healthcare",
            title: "Healthcare & Life Sciences",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1600&q=80",
            imageAlt: "Healthcare & Life Sciences",
            highlights: [
                {
                    subtitle: "The Pain",
                    body: "Regulatory compliance, vendor qualification, and contract management require meticulous documentation.",
                },
                {
                    subtitle: "How We Help",
                    body: "Automate compliance checks, vendor evaluations, and contract reviews while maintaining audit trails.",
                },
                {
                    subtitle: "The Outcome",
                    body: "Ensure regulatory compliance while reducing administrative overhead by 50%.",
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
                title="Built for Teams who live inside Documents"
                description="Different teams see different pains, but they all stop drowning in documents."
            />

            {/* Tab Section - By Team */}
            <Section
            id="by-team"
            title="By Team"
            description="Streamline your business-to-institution workflows"
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
                title="Ready to transform your workflow?"
                description="See how CloudGlance can read your documents, structure the information and power your tender or evaluation workflows end-to-end."
                primaryCta={{ text: 'See it in Action', href: 'https://app.cloudglancelab.com' }}
                secondaryCta={{ text: 'Talk to Sales', href: '/contact' }}
            />
        </div>
    );
}
