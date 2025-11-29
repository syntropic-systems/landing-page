import { CTASection } from "@/components/cta-section";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/data/faqs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description:
    'Find answers to common questions about CloudGlance AI-powered document intelligence platform, features, onboarding, integrations, and more.',
  alternates: {
    canonical: 'https://cloudglancelab.com/faq',
  },
  openGraph: {
    title: 'CloudGlance FAQ',
    description:
      'Answers to common questions about CloudGlance document intelligence platform.',
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
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
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
      <CTASection
        title="Ready to see CloudGlance in action?"
        description="Book a demo with our team to experience the platform firsthand and see how it can transform your document workflows."
        primaryCta={{ text: 'Book a Demo', href: '/contact' }}
        secondaryCta={{ text: 'Talk to Sales', href: '/contact' }}
      />
      </div>
    </>
  );
}

