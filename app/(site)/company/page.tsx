import { FeatureCard, FeatureGrid } from "@/components/feature-card";
import { Hero2 } from "@/components/hero-2";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { TeamMemberCard } from "@/components/team-member-card";
import { Target, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company - About CloudGlance",
  description:
    "Learn about CloudGlance, our mission to transform document intelligence, and meet the team building the future of AI-powered document workflows.",
  alternates: {
    canonical: "https://cloudglancelab.com/company",
  },
  openGraph: {
    title: "About CloudGlance - The People Behind Document Intelligence",
    description:
      "Meet the team building AI-powered document intelligence solutions for enterprise workflows.",
  },
};

export default function CompanyPage() {
    return (
        <div>
            <Hero2
                title="The People Building the Future of Document Intelligence"
                description="Learn more about the mission, vision, and people building CloudGlance."
            />
            <Section
                id="about-us"
                title="About Us"
                description="We started Cloudglance to solve a simple but widespread problem: too much important information is trapped in messy, disconnected documents. This leads to enormous waste of time, money and human effort across teams. Our aim is to help organisations organise, understand and act on this information more effectively, without forcing them to change the way they already work.We started Cloudglance to solve a simple but widespread problem: too much important information is trapped in messy, disconnected documents. This leads to enormous waste of time, money and human effort across teams. Our aim is to help organisations organise, understand and act on this information more effectively, without forcing them to change the way they already work."
            >
            </Section>
            
            <Section
                id="our-mission"
                title="Our Mission"
                description="Yash needs to write here"
            >
                <FeatureGrid columns={2}>
                    <FeatureCard
                        icon={<Target className="text-primary" />}
                        title="Vision"
                        description="To create a world where organisations work at full speed because their information is instantly clear, connected, and ready to use."
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="text-primary" />}
                        title="Values"
                        description="Simplicity, accuracy, and trust — we build AI that empowers teams, reduces friction, and fits seamlessly into the way people already work."
                    />
                </FeatureGrid>
            </Section>

            <Section
                id="team"
                title="Our Team"
                description="Our team brings together experts in AI, engineering, operations, and procurement who have seen firsthand how slow, manual document work holds organizations back. We're united by a simple goal: helping teams move faster, reduce risk, and deliver exceptional results with the same resources."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <TeamMemberCard
                        image="/team/manish bharti.png"
                        name="Manish Bharti"
                        position="Director"
                        description="Providing strategic leadership and governance to guide CloudGlance's mission of transforming document intelligence for organizations worldwide."
                    />
                    <TeamMemberCard
                        image="/team/dr. kk bajpal.png"
                        name="Dr. KK Bajpal"
                        position="Director"
                        description="Bringing deep expertise and strategic oversight to ensure CloudGlance delivers innovative solutions that meet the evolving needs of our clients."
                    />
                    <TeamMemberCard
                        image="/team/abhishek gautam.png"
                        name="Abhishek Gautam"
                        position="CTO & Co-Founder"
                        description="Architecting and building the AI-powered infrastructure that makes CloudGlance's document intelligence platform fast, reliable, and scalable."
                    />
                    <TeamMemberCard
                        image="/team/pravalika puram.png"
                        name="Pravalika Puram"
                        position="Strategy & Sales"
                        description="Driving growth through strategic partnerships and helping organizations discover how CloudGlance can transform their document workflows."
                    />
                    <TeamMemberCard
                        image="/team/siddharth saha.png"
                        name="Siddharth Saha"
                        position="Founding Engineer"
                        description="Crafting intuitive and accessible user experiences that make complex document intelligence tools simple and powerful for everyone."
                    />
                    <TeamMemberCard
                        image="/team/swapnish sahare.png"
                        name="Swapnish Sahare"
                        position="Design Consultant"
                        description="Consulting on design strategy and user experience to ensure CloudGlance's interface is both powerful and intuitive for all users."
                    />
                </div>
            </Section>

            <CTASection
                title="Want to Connect with our Team?"
                description="We’d love to show you how CloudGlance works and answer any questions about your use case, industry, or workflows."
                primaryCta={{ text: 'Talk to Our Team', href: '/contact' }}
                secondaryCta={{ text: 'Book a Demo', href: '/contact' }}
            />
        </div>
    );
}
