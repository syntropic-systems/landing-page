'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RevealOnScroll } from '@/components/animations';
import { plans } from '@/data/pricing';
import { PlanCard } from './plan-card';

type Billing = 'annual' | 'monthly';

export function PlansSection() {
  const [billing, setBilling] = useState<Billing>('monthly');

  return (
    <section id="plans" className="relative py-20 md:py-24 lg:py-32">
      <div className="container relative">
        <div className="mx-auto max-w-7xl">
          {/* Toggle */}
          <div className="mb-8 flex justify-center md:mb-12">
            <RevealOnScroll direction="up" duration={0.5}>
              <Tabs
                value={billing}
                onValueChange={(value) => setBilling(value as Billing)}
              >
                <TabsList className="h-11 p-1">
                  <TabsTrigger
                    value="monthly"
                    className="px-5 py-2 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground"
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger
                    value="annual"
                    className="gap-2 px-5 py-2 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground"
                  >
                    <span>Annual</span>
                    <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      Save up to 28%
                    </span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </RevealOnScroll>
          </div>

          {/* Cards grid */}
          <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {plans.map((plan, index) => (
              <RevealOnScroll
                key={plan.id}
                direction="up"
                delay={0.15 + index * 0.1}
                duration={0.6}
                className="h-full"
              >
                <PlanCard plan={plan} billing={billing} />
              </RevealOnScroll>
            ))}
          </div>

          {/* Footnote */}
          <RevealOnScroll direction="up" delay={0.3} duration={0.5}>
            <p className="mt-4 text-center text-xs text-muted-foreground md:mt-6">
              Prices in INR (excl. GST). All plans include onboarding, product updates, and customer support.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
