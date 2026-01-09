import { Hero2 } from '@/components/hero-2';
import { FeatureGrid } from '@/components/feature-card';
import { Section } from '@/components/section';
import { CTASection } from '@/components/cta-section';
import { InfiniteMovingLogos } from '@/components/ui/infinite-moving-logos';
import FeaturesSectionDemo from '@/components/features-section-demo-3';
import { Card } from '@/components/ui/card';
import { ThemeAwareImage } from '@/components/theme-aware-image';
import Image from 'next/image';
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
    const securityBadges = [
        { label: "SOC 2 Type II", status: "Aligned" },
        { label: "ISO 27001", status: "Aligned" },
        { label: "GDPR", status: "Ready" },
    ];

    const infraVendors = [
        { name: "Azure", src: "/integrations/azure.svg" },
        { name: "AWS S3", src: "/integrations/aws.svg" },
        { name: "GCP", src: "/integrations/google cloud.svg" },
        { name: "Cloudflare", src: "/integrations/cloudflare.svg" },
        { name: "Vercel", src: "/integrations/vercel.svg" },
    ];

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
                    { src: '/integrations/gmail.svg', alt: 'Gmail' },
                    { src: '/integrations/outlook.svg', alt: 'Outlook' },
                    { src: '/integrations/whatsapp.svg', alt: 'WhatsApp' }]}
                direction="right"
                speed="normal"
                pauseOnHover
                variant="infinite"
                />
                <InfiniteMovingLogos
                items={[
                { src: '/integrations/azure.svg', alt: 'Azure' },
                { src: '/integrations/google cloud.svg', alt: 'Google Cloud' },
                { src: '/integrations/aws.svg', alt: 'AWS' },
                { src: '/integrations/postgresql.svg', alt: 'PostgreSQL' }]}
                direction="left"
                speed="normal"
                pauseOnHover
                variant="infinite"
                />
                <InfiniteMovingLogos
                items={[
                { src: '/integrations/slack.svg', alt: 'Slack' },
                { src: '/integrations/teams.svg', alt: 'Microsoft Teams' },
                { src: '/integrations/linear.svg', alt: 'Linear' }]}
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
                description={`We leverage world-class infrastructure providers to make sure your data stays encrypted, protected, and always available. CloudGlance runs on Azure’s audited data centers, Cloudflare shields every edge, and encryption plus least-privilege access guard every action end to end.`}
            >
                <div className="mb-8 grid gap-4 lg:grid-cols-2">
                    <div className="flex flex-wrap gap-4 rounded-2xl border border-border/60 bg-gradient-to-br from-accent/30 to-background p-4">
                        {securityBadges.map((badge) => (
                            <div
                                key={badge.label}
                                className="inline-flex h-fit items-center gap-3 rounded-full border border-border/60 bg-card px-4 py-2 text-sm uppercase tracking-wide my-auto mx-auto"
                            >
                                <span className="font-semibold">{badge.label}</span>
                                <span className="text-muted-foreground font-normal">
                                    {badge.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-accent/30 to-background p-4 lg:p-5 shadow-inner">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                            Built on audited, industry-leading infrastructure
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-4">
                            {infraVendors.map((vendor) => (
                                <div
                                    key={vendor.name}
                                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-2"
                                >
                                    {vendor.src ? (
                                        <Image
                                            src={vendor.src}
                                            alt={`${vendor.name} logo`}
                                            width={20}
                                            height={20}
                                            className="h-5 w-5 object-contain"
                                        />
                                    ) : (
                                        <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary/10 text-[0.65rem] font-semibold uppercase text-primary">
                                            {vendor.name.charAt(0)}
                                        </span>
                                    )}
                                    <span className="text-xs font-semibold text-foreground/80">
                                        {vendor.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <FeatureGrid columns={4}>
                    {[
                        {
                            title: "Hosted on Azure",
                            description: "We inherit Azure’s physical security, environmental controls, redundant power, and compliance baseline.",
                        },
                        {
                            title: "Data Encryption",
                            description: "Every payload is encrypted at rest with AES-256 and in transit via TLS 1.3 across public networks.",
                        },
                        {
                            title: "Network Protection",
                            description: "Cloudflare provides WAF coverage, DDoS mitigation, and global CDN acceleration before traffic reaches us.",
                        },
                        {
                            title: "Strict Access Control",
                            description: "Production access is least-privilege, short-lived, fully logged, and reviewed to keep actions traceable.",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="rounded-xl border border-border/60 bg-gradient-to-br from-accent/40 to-background p-6 hover:border-primary transition-colors"
                        >
                            <p className="text-base font-semibold text-foreground mb-2">
                                {item.title}
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </FeatureGrid>
            </Section>

            {/* CTA Section */}
            <CTASection
                title="Let's make your Documents work for You!"
                description="See how CloudGlance can accelerate your document workflows and unlock the full potential of your team."
                primaryCta={{ text: 'Book a Demo', href: '/contact' }}
            />
        </div>
    );
}
