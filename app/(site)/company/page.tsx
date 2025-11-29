import { FeatureCard, FeatureGrid } from "@/components/feature-card";
import { Hero2 } from "@/components/hero-2";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Target, User, ShieldCheck } from "lucide-react";

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
                <FeatureGrid columns={3}>
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
                description="Our team brings together experts in AI, engineering, operations, and procurement who have seen firsthand how slow, manual document work holds organizations back. We’re united by a simple goal: helping teams move faster, reduce risk, and deliver exceptional results with the same resources."
            >
                <FeatureGrid columns={4}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="aspect-square bg-muted/30 rounded-lg border-2 border-border flex flex-col items-center justify-center p-6 hover:border-primary transition-colors"
                        >
                            <User className="w-8 h-8 text-primary mb-3" />
                            <p className="text-sm font-medium text-center">Team Member {i + 1}</p>
                        </div>
                    ))}
                </FeatureGrid>
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
