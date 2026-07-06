'use client';

import { CTASection } from '@/components/cta-section';

// Thin wrapper over the shared CTA band: only the copy and the
// scroll-to-plans behavior live here; the shell/surface is CTASection's.
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
    <CTASection
      title="Ready to make Tender Workflows Faster and more Reliable?"
      description="Start with a bidder plan or speak with us for custom procurement automation."
      primaryCta={{ text: 'View Plans', onClick: handleViewPlans }}
      secondaryCta={{ text: 'Contact Sales', href: '/contact' }}
    />
  );
}
