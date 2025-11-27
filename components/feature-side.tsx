"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CTA {
    text: string;
    href?: string;
    variant?: "default" | "outline" | "ghost" | "secondary" | "link" | "destructive";
    showArrow?: boolean;
}

interface FeatureSideProps {
    title: string;
    description: string;
    image: string;
    imageAlt?: string;
    primaryCta?: CTA;
    reverse?: boolean; // If true, image on left, content on right
    className?: string;
    imageClassName?: string;
    sectionClassName?: string;
}

export function FeatureSide({
    title,
    description,
    image,
    imageAlt,
    primaryCta,
    reverse = false,
    className,
    imageClassName,
    sectionClassName,
}: FeatureSideProps) {
    const contentSection = (
        <div className="flex flex-col gap-3 py-8">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold !my-0 ">{title}</h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed pb-3">
                {description}
            </p>
            {primaryCta && (
                <div className="flex items-center gap-2 flex-wrap">
                    {primaryCta.href ? (
                        <Button className="w-fit" variant={primaryCta.variant || "default"} asChild>
                            <Link href={primaryCta.href}>
                                {primaryCta.text}
                                {(primaryCta.showArrow !== false) && <ArrowRight className="w-4 h-4" />}
                            </Link>
                        </Button>
                    ) : (
                        <Button className="w-fit" variant={primaryCta.variant || "default"} disabled>
                            {primaryCta.text}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );

    const imageSection = (
        <div className={cn(
            "relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted shadow-sm",
            imageClassName
        )}>
            <Image
                src={image}
                alt={imageAlt || title}
                fill
                className="object-cover"
                unoptimized
            />
        </div>
    );

    return (
        <Section className={sectionClassName} disableDefaultHeader>
            <div className={cn(
                "grid items-stretch md:grid-cols-2 md:gap-10",
                reverse && "md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1",
                className
            )}>
                {contentSection}
                {imageSection}
            </div>
        </Section>
    );
}

