'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/section";
import { cn } from "@/lib/utils";
import { RevealOnScroll } from "@/components/animations";

interface PageHeaderButton {
    text: string;
    href: string;
    variant?: "default" | "outline" | "ghost" | "secondary" | "link" | "destructive";
}

interface PageHeaderProps {
    title: string;
    description?: string;
    className?: string;
    button?: PageHeaderButton;
}

export function PageHeader({ title, description, className, button }: PageHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            // The section following a PageHeader sits close to it — the
            // header has no closing edge (its wash fades out), so the default
            // Section pt (up to 160px) reads as the title floating detached.
            // Sibling variant beats Section's py-* on specificity but stays
            // non-!important, so a page can still opt out with !pt-*.
            className="relative [&+section]:pt-8 md:[&+section]:pt-12 lg:[&+section]:pt-16"
        >
            {/* Brand-wash stage: the header itself is a variable-height
                sliver, so the bloom gets its own coordinate space — the same
                max(75vh,560px) depth as Hero2's stage, with the same radial
                at the same 70%/30% anchor. The light therefore sits at the
                identical viewport position on hub and tertiary pages,
                regardless of title length; it just shines over open page
                instead of a closed hero. */}
            <div className="absolute inset-x-0 top-0 h-[max(75vh,560px)] pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,hsl(208_46%_33%/0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,hsl(208_46%_33%/0.25),transparent_70%)]" />
            <Section
                className={cn("relative z-10 -mt-14 !pt-28 md:!pt-36 lg:!pt-40 !pb-0 [&>div>div>div]:!mb-0", className)}
                disableDefaultHeader
                header={
                    <div className="space-y-4 md:space-y-5 !mb-0">
                        {button && (
                            <RevealOnScroll direction="up" duration={0.5}>
                                <div>
                                    <Button
                                        variant={button.variant || "ghost"}
                                        className="inline-flex items-center gap-1 px-3 py-1 text-xs uppercase tracking-wide"
                                        asChild
                                    >
                                        <Link href={button.href}>
                                            <ArrowLeft className="h-3 w-3" />
                                            <span>{button.text}</span>
                                        </Link>
                                    </Button>
                                </div>
                            </RevealOnScroll>
                        )}
                        <div className="space-y-4 md:space-y-5">
                            <RevealOnScroll direction="up" delay={0.15} duration={0.7}>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
                                    {title}
                                </h1>
                            </RevealOnScroll>
                            {description && (
                                <RevealOnScroll direction="up" delay={0.3} duration={0.7}>
                                    <p className="text-base md:text-lg text-foreground/65 leading-relaxed max-w-3xl">
                                        {description}
                                    </p>
                                </RevealOnScroll>
                            )}
                        </div>
                    </div>
                }
            >
                {null}
            </Section>
        </motion.div>
    );
}
