import { Hero2 } from '@/components/hero-2';
import { FeatureGrid } from '@/components/feature-card';
import { Section } from '@/components/section';
import { CTASection } from '@/components/cta-section';
import { InfiniteMovingLogos } from '@/components/ui/infinite-moving-logos';
import FeaturesSectionDemo from '@/components/features-section-demo-3';
import { Card } from '@/components/ui/card';
import { ThemeAwareImage } from '@/components/theme-aware-image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product - AI Document Intelligence Platform',
  description:
    'Explore CloudGlance platform features: document repository, AI-powered extraction, chat interface, and seamless integrations. Turn messy documents into structured, actionable data.',
  alternates: {
    canonical: 'https://cloudglancelab.com/product',
  },
  openGraph: {
    title: 'CloudGlance Product - AI Document Intelligence Platform',
    description:
      'Turn messy, multi-format documents into structured, actionable data with CloudGlance AI-powered platform.',
  },
};

export default function ProductPage() {
    return (
        <div>
            {/* Hero Section */}
            <Hero2
                title="AI-Powered Document Intelligence Platform for High-Stake Workflows"
                description="Turn messy, multi-format documents into structured, actionable data so your tender, evaluation, and review processes run end-to-end without manual effort."
            />

            {/* Platform Section */}
            <Section
                id="platform"
                title={
                    <>
                      The CloudGlance <span className="text-primary">Platform</span>
                    </>
                  }
                description="Cloudglance is built around the way organisations actually work with documents. From storage and understanding to collaboration and execution, every part of the platform is designed to operate as one connected system. Each module below is part of the same platform, built to work together seamlessly."
            >
                <div>
                    <Card className="w-full shadow-2xl overflow-hidden rounded-xl shadow-primary/20">
                        <div className="relative w-full">
                            <ThemeAwareImage
                                src="/product/home_white.png"
                                srcDark="/product/home_black.png"
                                alt="CloudGlance Platform"
                                width={1600}
                                height={900}
                                className="w-full h-auto object-contain"
                                sizes="100vw"
                            />
                        </div>
                    </Card>
                </div>
            </Section>

            {/* Features Section */}
            <Section
                id="features"
                title={<>The <span className='text-primary'>Building Blocks</span> of Platform</>}
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
                items={[
                    { src: '/integrations/gmail.svg', alt: 'Integration logo 1' },
                    { src: '/integrations/outlook.svg', alt: 'Integration logo 2' },
                    { src: '/integrations/whatsapp.svg', alt: 'Integration logo 3' }]}
                direction="right"
                speed="normal"
                pauseOnHover
                variant="infinite"
                />
                <InfiniteMovingLogos
                items={[
                { src: '/integrations/azure.svg', alt: 'Integration logo 4' },
                { src: '/integrations/google cloud.svg', alt: 'Integration logo 5' },
                { src: '/integrations/aws.svg', alt: 'Integration logo 6' },
                { src: '/integrations/postgresql.svg', alt: 'Integration logo 7' }]}
                direction="left"
                speed="normal"
                pauseOnHover
                variant="infinite"
                />
                <InfiniteMovingLogos
                items={[
                { src: '/integrations/slack.svg', alt: 'Integration logo 8' },
                { src: '/integrations/teams.svg', alt: 'Integration logo 9' },
                { src: '/integrations/linear.svg', alt: 'Integration logo 10' }]}
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
                description={`Your data is safe with us. Cloudglance is built with enterprise-grade security at every layer —> encryption, access control, and transparent activity logs come by default. \n\n We follow strict handling practices for sensitive information and maintain full traceability for all actions on the platform. Each client's data is isolated, and we are currently in the process of aligning with major compliance frameworks. Hence, your documents stay private and your work stays protected.`}
            >
                <FeatureGrid columns={4}>
                    {[
                        { label: "Encryption", value: "AES-256" },
                        { label: "Key Mgmt", value: "KMS / HSM" },
                        { label: "SSO", value: "SAML / SCIM" },
                        { label: "Audit", value: "Real-time" },
                    ].map((control) => (
                        <div
                            key={control.label}
                            className="rounded-xl border border-border/50 bg-gradient-to-br from-accent/50 to-background p-6 hover:border-primary transition-colors"
                        >
                            <p className="text-xs uppercase text-muted-foreground mb-2">
                                {control.label}
                            </p>
                            <p className="text-xl font-semibold">{control.value}</p>
                        </div>
                    ))}
                </FeatureGrid>
            </Section>

            {/* CTA Section */}
            <CTASection
                title="Let's make your Documents work for You!"
                description="See how CloudGlance can accelerate your document workflows and unlock the full potential of your team."
                primaryCta={{ text: 'See it in Action', href: 'https://app.cloudglancelab.com' }}
                secondaryCta={{ text: 'Talk to Sales', href: '/contact' }}
            />
        </div>
    );
}
