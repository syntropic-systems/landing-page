import { FeatureCard, FeatureGrid } from "@/components/feature-card";
import { Hero2 } from "@/components/hero-2";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { TeamMemberCard } from "@/components/team-member-card";
import { Flag, Target, ShieldCheck } from "lucide-react";
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
                className="!pb-0"
                title="About Us"
                description="We started Cloudglance to solve a simple but widespread problem: too much important information is trapped in messy, disconnected documents. This leads to enormous waste of time, money and human effort across teams. Our aim is to help organisations organise, understand and act on this information more effectively, without forcing them to change the way they already work.We started Cloudglance to solve a simple but widespread problem: too much important information is trapped in messy, disconnected documents. This leads to enormous waste of time, money and human effort across teams. Our aim is to help organisations organise, understand and act on this information more effectively, without forcing them to change the way they already work."
            >
            </Section>
            
            <Section
                id="our-mission"
            >
                <FeatureGrid columns={3}>
                    <FeatureCard
                        icon={<Flag className="text-primary" />}
                        title="Mission"
                        description="We exist to make complex documents powerless by arming every team in every industry with instant, flawless intelligence."
                    />
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
                    {/* <TeamMemberCard
                        image="/team/yash tiwari.png"
                        name="Yash Tiwari"
                        linkedin="https://www.linkedin.com/in/yash-tiwari-565044190/"
                        position="CEO & Co-Founder"
                        description="Sets product direction and business strategy, aligning engineering and operations so CloudGlance turns messy documents into usable workflows."
                    /> */}
                    <TeamMemberCard
                        image="/team/manish bharti.png"
                        name="Manish Bharti"
                        linkedin="https://www.linkedin.com/in/mbharti/"
                        position="CEO & Co-Founder"
                        description="Leads governance and strategic partnerships, ensuring the company’s roadmap translates into real operational value for enterprise customers."
                    />
                    <TeamMemberCard
                        image="/team/abhishek gautam.png"
                        name="Abhishek Gautam"
                        linkedin="https://www.linkedin.com/in/abhishekgautam03/"
                        position="CTO & Co-Founder"
                        description="Builds and scales the platform infrastructure that processes large document collections, turning complex formats into dependable systems."
                    />
                    <TeamMemberCard
                        image="/team/dr. kk bajpal.png"
                        name="Dr. KK Bajpai"
                        linkedin="https://www.linkedin.com/in/kk-bajpai-7b56611a1/"
                        position="Director"
                        description="Provides senior advisory on domain strategy and quality assurance, helping shape solutions that meet rigorous enterprise standards."
                    />
                    <TeamMemberCard
                        image="/team/pravalika puram.png"
                        name="Pravalika Puram"
                        linkedin="https://www.linkedin.com/in/pravalikapuram1998/"
                        position="Strategy & Sales"
                        description="Drives customer growth by translating client needs into practical solutions and partnership opportunities that improve document workflows."
                    />
                    <TeamMemberCard
                        image="/team/siddharth saha.png"
                        name="Siddharth Saha"
                        linkedin="https://www.linkedin.com/in/siddarth-saha-a02b64222/"
                        position="Founding Engineer"
                        description="Designs and ships core features, focusing on reliable, user-friendly tooling that makes document tasks faster and less error-prone."
                    />
                    <TeamMemberCard
                        image="/team/debabrata kar.png"
                        name="Debabrata Kar"
                        linkedin="https://www.linkedin.com/in/debabrata-kar-/"
                        position="Product"
                        description="Shapes the product roadmap and priorities by listening to customers, turning user problems into clear, testable product bets."
                    />
                    <TeamMemberCard
                        image="/team/swapnish sahare.png"
                        name="Swapnish Sahare"
                        linkedin="https://www.linkedin.com/in/swapnishsahare/"
                        position="Design Consultant"
                        description="Crafts the product’s visual and interaction language, simplifying complex flows so teams can use the product without a manual."
                    />
                </div>
            </Section>

            <CTASection
                title="Want to Connect with our Team?"
                description="We’d love to show you how CloudGlance works and answer any questions about your use case, industry, or workflows."
                primaryCta={{ text: 'Book a Demo', href: '/contact' }}
            />
        </div>
    );
}
