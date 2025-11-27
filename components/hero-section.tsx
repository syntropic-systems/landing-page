import { ReactNode } from 'react';
import Aurora from './Aurora';
import { Button } from './ui/button';

interface HeroSectionProps {
    title: string;
    description?: string;
    badge?: string;
    children?: ReactNode;
    primaryCta?: {
        text: string;
        href: string;
    };
    secondaryCta?: {
        text: string;
        href: string;
    };
}

export function HeroSection({
    title,
    description,
    badge,
    children,
    primaryCta,
    secondaryCta,
}: HeroSectionProps) {
    return (
        <section className="relative h-[100vh] flex items-center mb-20 md:mb-28 lg:mb-32 overflow-hidden rounded-b-3xl shadow-primary/30 shadow-2xl bg-gradient-to-t from-card to-transparent">
            <div className="absolute inset-0">
                <Aurora
                    amplitude={1.0}
                    blend={0.8}
                    colorStops={['var(--primary)', 'var(--accent)', 'var(--primary)']}
                    lightSettings={{
                        bias: 0.3,
                        midPoint: 0.45,
                        intensityScale: 0.5,
                        baseColor: '#ffffff',
                        baseStrength: 1.0
                    }}
                    darkSettings={{
                        bias: 0,
                        midPoint: 0.2,
                        intensityScale: 0.6,
                        baseStrength: 0
                    }}
                />
            </div>
            <div className="container relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl text-left space-y-6 lg:space-y-10">
                        {badge && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/70 bg-accent/60 text-accent-foreground text-sm font-semibold tracking-wide backdrop-blur">
                                {badge}
                            </span>
                        )}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-lg md:text-xl text-foreground/70">
                                {description}
                            </p>
                        )}
                        {(primaryCta || secondaryCta) && (
                            <div className="flex flex-wrap gap-4">
                                {primaryCta && (
                                    <Button size="lg" variant="default" asChild>
                                        <a href={primaryCta.href}>{primaryCta.text}</a>
                                    </Button>
                                )}
                                {secondaryCta && (
                                    <Button size="lg" variant="outline" asChild>
                                        <a href={secondaryCta.href}>{secondaryCta.text}</a>
                                    </Button>
                                )}
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}
