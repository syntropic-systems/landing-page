import { HeroSection } from '@/components/hero-section';
import { Section } from '@/components/section';
import { CTASection } from '@/components/cta-section';
import { WorkflowSteps } from '@/components/workflow-steps';
import EnterpriseReady from '@/components/enterprise-ready';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { InfiniteMovingLogos } from '@/components/ui/infinite-moving-logos';
import { faqs } from '@/data/faqs';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { YouTubeEmbed } from '@/components/youtube-embed';
import { CountUp, StaggerChildren, StaggerItem, RevealOnScroll } from '@/components/animations';
import { AutomationsTabs } from '@/components/automations-tabs';
import {
  CentralizedRepoShowcase,
  IndexingShowcase,
  FormExtractionShowcase,
  ProjectSpacesShowcase,
} from '@/components/showcases';

export const metadata: Metadata = {
  title: 'CloudGlance - AI-Powered Document Intelligence Platform',
  description:
    'Complete document-heavy workflows in minutes, not days. CloudGlance cuts 80% of time spent on tender bidding, vendor evaluation, and contract review with AI-powered automation.',
  alternates: {
    canonical: 'https://cloudglancelab.com',
  },
};

export default function Home() {
  const workflows = [
    {
      step: '1',
      title: 'Centralized Data',
      description: 'All files related to the organization and projects, across formats like PDF, Excel, Word, drawings, images, forms and technical documents, are maintained centrally.',
      showcase: CentralizedRepoShowcase,
      duration: 11600,
    },
    {
      step: '2',
      title: 'Structured Understanding',
      description: 'AI reads and interprets content across formats, extracting key information and converting unstructured data into structured, connected data the system can act.',
      showcase: IndexingShowcase,
      duration: 13000,
    },
    {
      step: '3',
      title: 'Intelligence to Automation',
      description: 'Structured Information powers all the processes, for tender bidding and vendor evaluation today & automating contract review, financial checks & more tomorrow.',
      showcase: FormExtractionShowcase,
      duration: 13200,
    },
    {
      step: '4',
      title: 'Review & Finalize',
      description: 'Teams review the AI outputs, collaborate on answers, clear pending items, validate final decisions and close projects end-to-end with accountability across every stage.',
      showcase: ProjectSpacesShowcase,
      duration: 11500,
    }
  ];

  const testimonials = [
    {
      quote:
        "Implementing CloudGlance was a strategic turning point for us. We have cut our tender analysis time from weeks to just a couple of days, allowing our team to focus on high-value strategy instead of low-value paperwork. Our bid capacity has tripled, and we’re pursuing deals we previously couldn't even consider.",
      name: 'Bipin Dimiri',
      title: 'Head of Business Development, Cortex Consulting Solutions',
    },
    {
      quote:
        "CloudGlance freed our team from document analysis. We now bid on every opportunity worth pursuing, and our engineers focus on high-value work instead of manual reviews.",
      name: 'Shamanth',
      title: 'Marketing Manager, ABB',
    },    {
      quote:
        "CloudGlance has streamlined our bid evaluation process by enabling quick, side-by-side comparisons based on key criteria, making our decisions faster and more organised. We’re especially impressed by how smoothly it handles large volumes of documents across multiple vendors without compromising accuracy or speed.",
      name: 'Gaurav Jaitak',
      title: 'VP Engineering, Welspun',
    },
    {
      quote:
        "My team and I have saved a lot of time on each tender application since using CloudGlance. Especially its information-extraction automation which processes hundreds of pages and gives me the summaries and answers I need instantly. Overall, it has saved us a huge amount of time and effort that used to go into reading documents.",
      name: 'Pushpa Kumari',
      title: 'Tender Team, SSA Techno Construction',
    },
  ];

  const logos = [
    { src: '/client logos/Jha_client_logo.svg', alt: 'Jha Construction', className: 'h-12' },
    { src: '/client logos/Cortex_client_logo_black.svg', srcDark: '/client logos/Cortex_client_logo_white.svg', alt: 'Cortex Construction Solutions' },
    { src: '/client logos/ABB_client_logo.svg', alt: 'ABB, India' },
    { src: '/client logos/Welspun_client_logo.png', srcDark: '/client logos/Welspun_client_logo_white.png', alt: 'Welspun'},
    { src: '/client logos/SSA_client_logo.svg', alt: 'SSA Techno Construction', className: 'h-12' },
    { src: '/client logos/Texmaco_client_logo.png', srcDark: '/client logos/Texmaco_client_logo_white.png', alt: 'Texmaco', className: 'h-12' },
  ];

  // Show only first 5 FAQs on home page
  const homePageFaqs = faqs.slice(0, 5);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        badge="AI-Powered Document Intelligence Platform"
        title="Complete Document-Heavy Workflows in Minutes, not Days"
        description="CloudGlance cuts 80% of the time spent on tender bidding, vendor evaluation, contract review and more by turning PDFs, Excels and Technical files into structured data and automated processes instantly."
        primaryCta={{ text: 'Book a Demo', href: '/contact' }}
      />

      <Section className="!py-0">
        <RevealOnScroll direction="up" duration={0.7}>
          <InfiniteMovingLogos
            items={logos}
            direction="right"
            speed="slow"
            pauseOnHover
          />
        </RevealOnScroll>
      </Section>

      <Section id="Platform Video">
          <RevealOnScroll direction="up" duration={0.8}>
            <Card className="w-full shadow-2xl overflow-hidden rounded-xl shadow-primary/20">
              <YouTubeEmbed
                videoId="CQuGznmJAZI"
                title="CloudGlance Platform Demo"
              />
            </Card>
          </RevealOnScroll>
      </Section>

      {/* What Changes */}
      <Section
        title={
          <>
            What Changes with <span className="text-primary">CloudGlance</span>
          </>
        }
        description="Teams use CloudGlance to move faster, reduce risk and deliver more with the same resources."
      >
        <StaggerChildren className="grid md:grid-cols-3 gap-12 text-center mx-auto pt-8" stagger={0.15}>
          <StaggerItem>
            <div className="text-7xl font-semibold text-primary mb-4"><CountUp target={80} suffix="%" /></div>
            <div className="text-2xl text-foreground font-semibold pb-2">Faster Response Time</div>
            <div className="text-base text-muted-foreground">AI reads and understands documents, organizing required information instantly & solving review, preparation and analysis faster.</div>
          </StaggerItem>
          <StaggerItem>
            <div className="text-7xl font-semibold text-primary mb-4"><CountUp target={3} suffix="x" /></div>
            <div className="text-2xl text-foreground font-semibold pb-2">More Opportunities</div>
            <div className="text-base text-muted-foreground">With AI handling time-consuming and repetitive manual processes, teams can take on more projects without extra hiring or burnout.</div>
          </StaggerItem>
          <StaggerItem>
            <div className="text-7xl font-semibold text-primary mb-4"><CountUp target={99.7} suffix="%" decimals={1} /></div>
            <div className="text-2xl text-foreground font-semibold pb-2">Accuracy</div>
            <div className="text-base text-muted-foreground">AI detects every requirement, clause and attachment, even those buried in fine print, with the same consistency, so nothing gets missed.</div>
          </StaggerItem>
        </StaggerChildren>
      </Section>

      {/* Workflow Steps */}
      <Section
        title={
          <>
            From messy files to clean, <span className="text-primary">Automated Workflows</span>
          </>
        }
        description="Four steps to turn messy files into clean, structured data."
      >
        <WorkflowSteps steps={workflows} />
      </Section>

      {/* Automations */}
      <Section className="bg-accent/70 shadow-inner"
        title={
          <>
            <span className="text-primary">Automations</span> you get Today
          </>
        }
        description="Cloudglance automates the heaviest parts of tender and vendor workflows first."
      >
        <AutomationsTabs />
      </Section>

      {/* Enterprise Ready */}
      <Section
        title={
          <>
            <span className="text-primary">Enterprise-Ready</span> from Day One
          </>
        }
        description="Security controls, deployment flexibility, and operational rigor to support the most demanding teams."
      >
        <EnterpriseReady />
      </Section>

      {/* Customer Logos */}
      <Section
        className="bg-muted"
        title={
          <>
            Teams already winning more with{' '}
            <span className="text-primary">CloudGlance</span>
          </>
        }
        titleAlign="center"
      >
        <RevealOnScroll direction="up" duration={0.7}>
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
            pauseOnHover
          />
        </RevealOnScroll>
      </Section>

      {/* FAQ Section */}
      <Section
        title="FAQ"
        description="Common questions about CloudGlance"
        titleAlign="center"
      >
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <StaggerChildren stagger={0.08}>
              {homePageFaqs.map((faq, index) => (
                <StaggerItem key={index}>
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </Accordion>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/faq">View All</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Final CTA Section */}
      <CTASection
        title="Ready to Transform the Way your Team Works with Documents?"
        description="Stop wasting time on manual review. See how CloudGlance automates bids, evaluations, and contract workflows from end to end."
        primaryCta={{ text: 'Book a Demo', href: '/contact' }}
      />
    </div>
  );
}

