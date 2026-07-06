import { Fragment, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { RevealOnScroll } from '@/components/animations';

interface SectionProps {
    children?: ReactNode;
    title?: string | ReactNode;
    description?: string;
    className?: string;
    id?: string;
    titleAlign?: 'left' | 'center';
    header?: ReactNode;
    disableDefaultHeader?: boolean;
    /** Tinted section surfaces, centralized here so a retheme edits one
     * place and propagates to every page: pages pick a variant instead of
     * passing bg utilities via className. */
    variant?: 'default' | 'muted' | 'secondary';
}

export function Section({
    children,
    title,
    description,
    className = '',
    id,
    titleAlign = 'left',
    header,
    disableDefaultHeader = false,
    variant = 'default',
}: SectionProps) {
    const titleAlignment = titleAlign === 'center' ? 'text-center mx-auto' : 'text-left';

  const descriptionContent = description
    ? description.split('\n').map((line, index, arr) => (
        <Fragment key={`section-desc-line-${index}`}>
          {line.trim()}
          {index < arr.length - 1 && <br />}
        </Fragment>
      ))
    : null;

  return (
        <section
            id={id}
            className={cn(
                "py-20 md:py-24 lg:py-32",
                variant === 'muted' && "bg-muted",
                // Elevated stripe: zero-offset blur casts the shadow above AND
                // below the band (stock shadows are downward-only), lifting it
                // over the page. Black in both themes (white glow tried in dark
                // and rejected): the band is lighter than the dark bg, so a
                // stronger black halo is the dark-mode depth cue — dark needs
                // ~4x the alpha to register over a 10%-lightness page.
                variant === 'secondary' &&
                    "relative bg-secondary shadow-[0_0_24px_hsl(0_0%_10%/0.10)] dark:shadow-[0_0_24px_hsl(0_0%_0%/0.4)]",
                className
            )}
        >
            <div className="container">
                <div className="max-w-7xl mx-auto">
                    {(header || (!disableDefaultHeader && (title || description))) && (
                        <div className={`${titleAlignment}${children ? ' mb-12 md:mb-16' : ''}`}>
                            {header}
                            {!disableDefaultHeader && title && (
                                <RevealOnScroll direction="up" duration={0.6}>
                                    <h2 className={`text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.05] mb-3 md:mb-4 max-w-3xl ${titleAlign === 'center' ? 'mx-auto' : ''}`}>
                                        {title}
                                    </h2>
                                </RevealOnScroll>
                            )}
                            {!disableDefaultHeader && description && (
                                <RevealOnScroll direction="up" delay={0.15} duration={0.6}>
                                    <p className={`text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl ${titleAlign === 'center' ? 'mx-auto' : ''}`}>
                                        {descriptionContent}
                                    </p>
                                </RevealOnScroll>
                            )}
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </section>
    );
}
