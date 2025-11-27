import { Button } from './ui/button';

interface CTASectionProps {
    title: string;
    description?: string;
    primaryCta?: {
        text: string;
        href: string;
    };
    secondaryCta?: {
        text: string;
        href: string;
    };
}

export function CTASection({
    title,
    description,
    primaryCta,
    secondaryCta,
}: CTASectionProps) {
    return (
        <section className="py-20 md:py-24 bg-accent/70 shadow-inner">
            <div className="container">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-lg text-muted-foreground mb-8">
                                {description}
                            </p>
                        )}
                        {(primaryCta || secondaryCta) && (
                            <div className="flex flex-wrap gap-4 justify-center">
                                {primaryCta && (
                                    <Button size="lg" asChild>
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
                    </div>
                </div>
            </div>
        </section>
    );
}
