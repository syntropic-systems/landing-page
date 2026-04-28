import type { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { StaggerChildren, StaggerItem } from '@/components/animations';
import { PlansSection } from '@/components/pricing/plans-section';
import { ComparisonTable } from '@/components/pricing/comparison-table';
import { AddonsSection } from '@/components/pricing/addons-section';
import { PricingFinalCTA } from '@/components/pricing/pricing-final-cta';
import { plans, SHOW_AI_CREDITS } from '@/data/pricing';
import { getFaqsByCategory } from '@/data/faqs';

const pricingFaqs = getFaqsByCategory('pricing').filter(
  (faq) => SHOW_AI_CREDITS || !/credit/i.test(faq.question)
);

export const metadata: Metadata = {
  title: 'Pricing - Plans for Tender Teams',
  description:
    'CloudGlance pricing for tender teams. Start with Base for AI-assisted tender discovery and bid preparation, scale to Professional for risk analysis and team workflows, or move to Enterprise for issuer/RFX automation and private cloud.',
  alternates: {
    canonical: 'https://cloudglancelab.com/pricing',
  },
  keywords: [
    'CloudGlance pricing',
    'tender management pricing',
    'AI bid preparation pricing',
    'tender project plans',
    'enterprise procurement automation',
    'RFX pricing',
  ],
  openGraph: {
    title: 'CloudGlance Pricing - Plans for Tender Teams',
    description:
      'Pricing built for tender teams that need clarity, speed, and control. Compare Base, Professional, and Enterprise plans.',
  },
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'CloudGlance',
  description:
    'AI-powered tender intelligence platform for bid discovery, analysis, risk evaluation, and bid package automation.',
  brand: { '@type': 'Brand', name: 'CloudGlance' },
  offers: plans.map((plan) => {
    if (plan.customPricing) {
      return {
        '@type': 'Offer',
        name: plan.name,
        description: plan.tagline,
        priceCurrency: 'INR',
        price: '0',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'INR',
          description: 'Custom pricing — contact sales',
        },
      };
    }
    return {
      '@type': 'Offer',
      name: plan.name,
      description: plan.tagline,
      priceCurrency: 'INR',
      price: String(plan.annualMonthlyPrice ?? 0),
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'INR',
        price: plan.annualMonthlyPrice,
        unitText: 'MONTH',
        billingDuration: 'P1Y',
      },
    };
  }),
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pricingFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div>
        <PageHeader
          className="[&_h1]:max-w-3xl"
          title="Pricing built for tender teams who need clarity, speed, and control."
          description="CloudGlance plans are designed around tender projects, team access, and automation depth - so bidder teams can start with tender discovery and bid preparation, then scale into advanced risk analysis, document search, and custom workflows as their volume grows."
        />

        <PlansSection />

        <ComparisonTable />

        <AddonsSection />

        <Section
          id="faq"
          title={
            <>
              Frequently Asked <span className="text-primary">Questions</span>
            </>
          }
          description="Quick answers about projects, add-ons, and what each plan unlocks."
          titleAlign="center"
        >
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <StaggerChildren stagger={0.12}>
                {pricingFaqs.map((faq, index) => (
                  <StaggerItem key={faq.question}>
                    <AccordionItem value={`pricing-faq-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
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

        <PricingFinalCTA />
      </div>
    </>
  );
}
