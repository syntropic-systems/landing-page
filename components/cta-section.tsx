'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { RevealOnScroll } from '@/components/animations';

/** href renders a link; onClick renders a plain button (e.g. pricing's
 * scroll-to-plans). Exactly one should be provided. */
interface CTAAction {
    text: string;
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface CTASectionProps {
    title: string;
    description?: string;
    primaryCta?: CTAAction;
    secondaryCta?: CTAAction;
}

function CTAButton({
    action,
    variant,
}: {
    action: CTAAction;
    variant?: 'outline';
}) {
    if (action.href) {
        return (
            <Button size="lg" variant={variant} asChild>
                <Link href={action.href}>{action.text}</Link>
            </Button>
        );
    }
    return (
        <Button size="lg" variant={variant} onClick={action.onClick}>
            {action.text}
        </Button>
    );
}

// The one CTA band shell for the whole site — every page's closing band
// (including pricing via PricingFinalCTA) renders through here, so surface
// styling changes are made once, in this file.
export function CTASection({
    title,
    description,
    primaryCta,
    secondaryCta,
}: CTASectionProps) {
    return (
        <section className="py-20 md:py-24 lg:py-28 bg-secondary shadow-inner">
            <div className="container">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl mx-auto text-center">
                        <RevealOnScroll direction="up" duration={0.6}>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.05] mb-3 md:mb-4">
                                {title}
                            </h2>
                        </RevealOnScroll>
                        {description && (
                            <RevealOnScroll direction="up" delay={0.15} duration={0.6}>
                                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                                    {description}
                                </p>
                            </RevealOnScroll>
                        )}
                        {(primaryCta || secondaryCta) && (
                            <RevealOnScroll direction="up" delay={0.3} duration={0.5}>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    {primaryCta && <CTAButton action={primaryCta} />}
                                    {secondaryCta && (
                                        <CTAButton action={secondaryCta} variant="outline" />
                                    )}
                                </div>
                            </RevealOnScroll>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
