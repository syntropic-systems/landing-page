import { HeroSection } from '@/components/hero-section';
import { Section } from '@/components/section';
import { CTASection } from '@/components/cta-section';
import { WorkflowSteps } from '@/components/workflow-steps';
import EnterpriseReady from '@/components/enterprise-ready';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
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

export default function Home() {
  const workflows = [
    {
      step: '1',
      title: 'Centralized Data',
      description: 'All files related to the organization and projects, across formats like PDF, Excel, Word, drawings, images, forms and technical documents, are maintained centrally.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    },
    {
      step: '2',
      title: 'Structured Understanding',
      description: 'AI reads and interprets content across formats, extracting key information and converting unstructured data into structured, connected data the system can act.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      step: '3',
      title: 'Intelligence to Automation',
      description: 'Structured Information powers all the processes, for tender bidding and vendor evaluation today & automating contract review, financial checks & more tomorrow.',
      image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    },
    {
      step: '4',
      title: 'Review & Finalize',
      description: 'Teams review the AI outputs, collaborate on answers, clear pending items, validate final decisions and close projects end-to-end with accountability across every stage.',
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
    }
  ];

  const automations = [
    {
      title: 'Tender Bidding',
      description: 'Respond to RFXs in a fraction of the usual time.',
      bullets: ['Tender search', 'Automated form filling', 'Product / BOQ matching'],
      cta: { label: 'Learn more', href: '/automations/tender-bidding' },
    },
    {
      title: 'Tender Issuing',
      description: 'Choose the best vendor in a fraction of the usual time.',
      bullets: ['AI bid comparison', 'Compliance checks', 'Scorecards & reports'],
      cta: { label: 'Learn more', href: '/automations/tender-issuing' },
    },
    {
      title: 'Contract Review',
      description: 'Turn long contracts into clear summaries, risks and obligations.',
      bullets: ['Clause extraction', 'Risk identification', 'Obligation mapping'],
      cta: { label: 'Join waitlist', href: '/contact' },
      badge: 'Coming soon',
    },
  ];

  const testimonials = [
    {
      quote:
        "CloudGlance reduced our tender response time from 2 weeks to 3 days. We're now able to bid on 3x more opportunities.",
      name: 'Sarah Johnson',
      title: 'Procurement Director, TechCorp Industries',
    },
    {
      quote:
        "The AI-powered document extraction is incredibly accurate. It's like having an extra team member who never sleeps.",
      name: 'Michael Chen',
      title: 'Operations Manager, Global Solutions Ltd',
    },
    {
      quote:
        "We've seen a 72% improvement in efficiency. CloudGlance pays for itself within the first month.",
      name: 'Emily Rodriguez',
      title: 'Head of Business Development, Innovation Partners',
    },
  ];

  const logos = [
    { src: '/client logos/logo01.svg', alt: 'Client logo 1' },
    { src: '/client logos/logo02.svg', alt: 'Client logo 2' },
    { src: '/client logos/logo03.svg', alt: 'Client logo 3' },
  ];

  // Show only first 5 FAQs on home page
  const homePageFaqs = faqs.slice(0, 5);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        badge="AI Document Intelligence Platform"
        title="Complete document-heavy workflows in minutes, not days"
        description="CloudGlance cuts 80% of the time spent on tender bidding, vendor evaluation, and contract review. Turn PDFs, Excels and Technical files into structured data instantly."
        primaryCta={{ text: 'See it in Action', href: 'https://app.cloudglancelab.com' }}
        secondaryCta={{ text: 'Talk to Sales', href: '/contact' }}
      />

      {/* What Changes */}
      <Section
        title={
          <>
            What Changes with <span className="text-primary">CloudGlance</span>
          </>
        }
        description="Teams use CloudGlance to move faster, reduce risk and deliver more with the same resources."
      >
        <div className="grid md:grid-cols-3 gap-12 text-center mx-auto pt-8">
          <div>
            <div className="text-7xl font-semibold text-primary mb-4">72%</div>
            <div className="text-2xl text-foreground font-semibold pb-2">Faster Response Time</div>
            <div className="text-base text-muted-foreground">AI reads and understands documents, organizing required information instantly and solving the slowest parts of review, preparation and analysis.</div>
          </div>
          <div>
            <div className="text-7xl font-semibold text-primary mb-4">3x</div>
            <div className="text-2xl text-foreground font-semibold pb-2">More Opportunities</div>
            <div className="text-base text-muted-foreground">AI detects every requirement, clause and attachment, even those buried in fine print, with the same consistency, so nothing gets missed.</div>
          </div>
          <div>
            <div className="text-7xl font-semibold text-primary mb-4">100%</div>
            <div className="text-2xl text-foreground font-semibold pb-2">Accuracy</div>
            <div className="text-base text-muted-foreground">With AI handling time-consuming and repetitive manual processes, teams can take on more projects without extra hiring or burnout.</div>
          </div>
        </div>
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
        <div className="grid gap-4 md:grid-cols-3">
          {automations.map((automation) => (
            <div key={automation.title} className="rounded-xl bg-card text-card-foreground border border-border/40 shadow-sm flex flex-col p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-semibold">{automation.title}</h3>
                {automation.badge && (
                  <span className="text-xs font-semibold uppercase tracking-wide bg-muted px-3 py-1 rounded-full text-muted-foreground">
                    {automation.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-6">{automation.description}</p>
              <ul className="space-y-3 text-sm text-muted-foreground flex-1 mb-8">
                {automation.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" asChild>
                <a href={automation.cta.href}>
                  {automation.cta.label}
                </a>
              </Button>
            </div>
          ))}
        </div>
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
        <InfiniteMovingLogos
          items={logos}
          direction="right"
          speed="slow"
          pauseOnHover
          variant="static"
          className="mb-16"
        />
        <div className="pt-4">
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
            pauseOnHover
          />
        </div>
      </Section>

      {/* FAQ Section */}
      <Section
        title="FAQ"
        description="Common questions about CloudGlance"
        titleAlign="center"
      >
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {homePageFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
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
        title="Be a proposer: Catch Up Once & Automate"
        description="Stop drowning in documents. Start winning more bids. Experience CloudGlance today."
        primaryCta={{ text: 'See it in Action', href: 'https://app.cloudglancelab.com' }}
        secondaryCta={{ text: 'Talk to Sales', href: '/contact' }}
      />
    </div>
  );
}

