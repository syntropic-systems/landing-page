import { CTASection } from "@/components/cta-section";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { StaggerChildren, StaggerItem } from '@/components/animations';
import { faqs } from '@/data/faqs';
import { SHOW_AI_CREDITS } from '@/data/pricing';
import type { Metadata } from 'next';

const visibleFaqs = SHOW_AI_CREDITS
  ? faqs
  : faqs.filter((faq) => !/credit/i.test(faq.question));

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description:
    'Find answers to common questions about CloudGlance AI-powered document intelligence platform, features, onboarding, integrations, and more.',
  alternates: {
    canonical: 'https://cloudglancelab.com/faq',
  },
  keywords: [
    "CloudGlance FAQ",
    "document AI security",
    "SOC 2 document platform",
    "AI accuracy",
    "enterprise onboarding",
    "document extraction accuracy",
  ],
  openGraph: {
    title: 'CloudGlance FAQ',
    description:
      'Answers to common questions about CloudGlance document intelligence platform.',
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: visibleFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div>
        <PageHeader
        title="Frequently Asked Questions"
        description="Find answers to common questions about CloudGlance, our features, and how we can help your team."
      />
      <Section>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <StaggerChildren stagger={0.15}>
              {visibleFaqs.map((faq, index) => (
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
        </div>
      </Section>
      <CTASection
        title="Still have questions? We're here to help."
        description="Talk to our team or see a live demo of CloudGlance in action."
        primaryCta={{ text: 'Book a Demo', href: '/contact' }}
      />
      </div>
    </>
  );
}

