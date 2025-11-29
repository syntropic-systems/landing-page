"use client";

import React from "react";
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
    // Parse description to handle line breaks and bullet points
    const parseDescription = (desc: string) => {
        // Normalize line breaks - handle both \n and \r\n
        const normalized = desc.replace(/\r\n/g, '\n');
        const lines = normalized.split('\n');
        const elements: React.ReactNode[] = [];
        let currentBulletList: React.ReactNode[] = [];
        let elementIndex = 0;
        
        const flushBulletList = () => {
            if (currentBulletList.length > 0) {
                elements.push(
                    <ul key={`bullets-${elementIndex}`} className="list-disc list-outside space-y-0.5 my-3 ml-5 pl-4">
                        {currentBulletList}
                    </ul>
                );
                currentBulletList = [];
                elementIndex++;
            }
        };
        
        lines.forEach((line) => {
            const trimmedLine = line.trim();
            
            // Skip empty lines
            if (trimmedLine === '') {
                return;
            }
            
            // Check if line starts with bullet point markers
            if (trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
                const bulletText = trimmedLine.substring(1).trim();
                currentBulletList.push(
                    <li key={`bullet-${currentBulletList.length}`} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {bulletText}
                    </li>
                );
            } else {
                // Flush any pending bullet list before adding a paragraph
                flushBulletList();
                
                // Regular paragraph text
                elements.push(
                    <p key={`para-${elementIndex}`} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {trimmedLine}
                    </p>
                );
                elementIndex++;
            }
        });
        
        // Flush any remaining bullet list
        flushBulletList();
        
        return <div className="space-y-3 pb-3">{elements}</div>;
    };

    const contentSection = (
        <div className="flex flex-col gap-3 pt-2">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold !my-0 ">{title}</h3>
            {parseDescription(description)}
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
            "w-full overflow-hidden rounded-lg border border-border bg-muted shadow-sm",
            imageClassName
        )}>
            <Image
                src={image}
                alt={imageAlt || title}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                unoptimized
            />
        </div>
    );

    return (
        <Section className={sectionClassName} disableDefaultHeader>
            <div className={cn(
                "grid items-start gap-6 lg:grid-cols-2 lg:gap-10",
                reverse && "lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1",
                className
            )}>
                {contentSection}
                {imageSection}
            </div>
        </Section>
    );
}

