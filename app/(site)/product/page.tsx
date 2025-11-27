import { Hero2 } from '@/components/hero-2';
import { FeatureCard, FeatureGrid } from '@/components/feature-card';
import { Section } from '@/components/section';
import { CTASection } from '@/components/cta-section';
import { FileText, Zap, Brain, Database, Shield, Users } from 'lucide-react';
import { InfiniteMovingLogos } from '@/components/ui/infinite-moving-logos';
import FeaturesSectionDemo from '@/components/features-section-demo-3';

export default function ProductPage() {
    return (
        <div>
            {/* Hero Section */}
            <Hero2
                title="A Document Intelligence Platform for your workflows to run on"
                description="Fill out various customer & vendor forms within seconds with automatic matching and retrieval of information from documents to contract fields."
            />

            {/* Platform Section */}
            <Section
                id="platform"
                title="CloudGlance Platform"
                description="CloudGlance is a document intelligence platform that provides powerful solutions through innovative document processing and AI capabilities."
            >
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold">Document Intelligence</h3>
                        <p className="text-muted-foreground">CloudGlance is a document intelligence platform that provides powerful solutions through innovative document processing and AI capabilities.</p>
                    </div>
                </div>
            </Section>

            {/* Features Section */}
            <Section
                id="features"
                title="Pre-meet Intelligence"
                description="CloudGlance provides powerful solutions through innovative document processing and AI capabilities."
            >
                <FeaturesSectionDemo />
            </Section>

            {/* Integrations Section */}
            <Section
                id="integrations"
                title="Integrations"
                description={`Cloudglance connects with the systems organisations already rely on, so existing processes do not need to be rebuilt. It works with common file drives, SSO setups, ERPs, project management tools and document storage environments, allowing information to flow in from the tools that are already part of daily work. \n\n The platform adapts to the organisation's ecosystem rather than asking teams to migrate or start over. This makes adoption smooth, keeps current workflows intact and ensures that document intelligence and automations can be layered on top of what is already working well.`}
                className="bg-muted"
            >
                <InfiniteMovingLogos
                items={[{ src: '/client logos/logo01.svg', alt: 'Integration logo 1' },
                { src: '/client logos/logo02.svg', alt: 'Integration logo 2' },
                { src: '/client logos/logo03.svg', alt: 'Integration logo 3' }]}
                direction="right"
                speed="normal"
                pauseOnHover
                variant="infinite"
                />
                <InfiniteMovingLogos
                items={[{ src: '/client logos/logo01.svg', alt: 'Integration logo 1' },
                { src: '/client logos/logo02.svg', alt: 'Integration logo 2' },
                { src: '/client logos/logo03.svg', alt: 'Integration logo 3' }]}
                direction="left"
                speed="normal"
                pauseOnHover
                variant="infinite"
                />
                <InfiniteMovingLogos
                items={[{ src: '/client logos/logo01.svg', alt: 'Integration logo 1' },
                { src: '/client logos/logo02.svg', alt: 'Integration logo 2' },
                { src: '/client logos/logo03.svg', alt: 'Integration logo 3' }]}
                direction="right"
                speed="normal"
                pauseOnHover
                variant="infinite"
                />
            </Section>

            {/* Security & Governance Section */}
            <Section
                id="security"
                title="Security & Governance"
                description={`Your data is safe with us. Cloudglance is built with enterprise-grade security at every layer —> encryption, access control, and transparent activity logs come by default. \n\n We follow strict handling practices for sensitive information and maintain full traceability for all actions on the platform. Each client’s data is isolated, and we are currently in the process of aligning with major compliance frameworks. Hence, your documents stay private and your work stays protected.`}
            >
                <FeatureGrid columns={4}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="aspect-square bg-muted/30 rounded-lg border-2 border-border flex flex-col items-center justify-center p-6 hover:border-primary transition-colors"
                        >
                            <Shield className="w-8 h-8 text-primary mb-3" />
                            <p className="text-sm font-medium text-center">Security Feature {i + 1}</p>
                        </div>
                    ))}
                </FeatureGrid>
            </Section>

            {/* CTA Section */}
            <CTASection
                title="Experience CloudGlance in action"
                description="See how CloudGlance can accelerate your document workflows and unlock the full potential of your team."
                primaryCta={{ text: 'See it in Action', href: 'https://app.cloudglancelab.com' }}
                secondaryCta={{ text: 'Talk to Sales', href: '/contact' }}
            />
        </div>
    );
}
