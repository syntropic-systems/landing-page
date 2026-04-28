'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RevealOnScroll } from '@/components/animations';

export function PricingFinalCTA() {
  const handleViewPlans = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.getElementById('plans');
    if (!target) return;
    const header = document.querySelector('header') as HTMLElement | null;
    const offset = header?.offsetHeight ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-24 bg-secondary shadow-inner">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <RevealOnScroll direction="up" duration={0.6}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                Ready to make Tender Workflows Faster and more Reliable?
              </h2>
            </RevealOnScroll>
            <RevealOnScroll direction="up" delay={0.15} duration={0.6}>
              <p className="text-lg text-muted-foreground mb-8">
                Start with a bidder plan or speak with us for custom procurement automation.
              </p>
            </RevealOnScroll>
            <RevealOnScroll direction="up" delay={0.3} duration={0.5}>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={handleViewPlans}>
                  View Plans
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
