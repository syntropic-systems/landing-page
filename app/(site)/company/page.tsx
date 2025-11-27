import { FeatureCard, FeatureGrid } from "@/components/feature-card";
import { Hero2 } from "@/components/hero-2";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { CheckCircle, Clock, Target, User } from "lucide-react";

export default function CompanyPage() {
    return (
        <div>
            <Hero2
                title="We are CloudGlance"
                description="Learn more about our mission, vision, and values."
            />
            <Section
                id="about-us"
                title="About Us"
                description="We are a team of experienced professionals who are passionate about helping teams work faster, reduce risk and deliver more with the same resources."
            >
                <FeatureGrid columns={3}>
                    <FeatureCard
                        icon={<Clock className="text-primary" />}
                        title="Mission"
                        description="Complete tender responses in hours instead of days with automated data extraction and form filling."
                    />
                    <FeatureCard
                        icon={<Target className="text-primary" />}
                        title="Vision"
                        description="Handle more opportunities simultaneously without adding headcount or compromising quality."
                    />
                    <FeatureCard
                        icon={<CheckCircle className="text-primary" />}
                        title="Values"
                        description="Submit better responses with complete, accurate information powered by AI insights."
                    />
                </FeatureGrid>
            </Section>
            
            <Section
                id="our-mission"
                title="Our Mission"
                description="Our mission is to help teams work faster, reduce risk and deliver more with the same resources."
            >
                <FeatureGrid columns={3}>
                    <FeatureCard
                        icon={<CheckCircle className="text-primary" />}
                        title="Mission"
                        description="Complete tender responses in hours instead of days with automated data extraction and form filling."
                    />
                    <FeatureCard
                        icon={<Target className="text-primary" />}
                        title="Vision"
                        description="Handle more opportunities simultaneously without adding headcount or compromising quality."
                    />
                    <FeatureCard
                        icon={<CheckCircle className="text-primary" />}
                        title="Values"
                        description="Submit better responses with complete, accurate information powered by AI insights."
                    />
                </FeatureGrid>
            </Section>

            <Section
                id="team"
                title="Our Team"
                description="Our team is a group of experienced professionals who are passionate about helping teams work faster, reduce risk and deliver more with the same resources."
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
                title="Ready to see CloudGlance in action?"
                description="Book a demo with our team to experience the platform firsthand and see how it can transform your document workflows."
                primaryCta={{ text: 'Book a Demo', href: '/contact' }}
                secondaryCta={{ text: 'Talk to Sales', href: '/contact' }}
            />
        </div>
    );
}
