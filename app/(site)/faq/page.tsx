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

export default function FAQPage() {

  return (
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
  );
}

