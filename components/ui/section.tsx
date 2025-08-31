"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { H2, Subtitle } from "@/components/ui/typography";

interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  subtitle: React.ReactNode;
}
/**
 * Section component is a flexible container for organizing content.
 *
 * Props:
 * - `title`: The main heading of the section.
 * - `subtitle`: A secondary heading providing additional context.
 * - `children`: The content to be displayed within the section.
 *
 * Usage:
 * Always wrap the `children` prop inside a `<div>` to ensure proper layout and styling.
 *
 * Example:
 *
 * ```jsx
 * <Section title="My Title" subtitle="My Subtitle">
 *   <div>
 *     <p>Your content here</p>
 *   </div>
 * </Section>
 * ```
 */

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, title, subtitle, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        `relative overflow-hidden flex flex-col pb-12 sm:pb-16 md:pb-32 xl:pb-40 m-0 gap-y-6 md:gap-y-10 xl:gap-y-12 sm:px-6 md:px-30 xl:px-36`,
        className
      )}
      {...props}
    >
      <div className="flex flex-col m-0 p-0 gap-y-2">
        <H2 className="text-foreground text-center">{title}</H2>
        <Subtitle className="text-muted-foreground text-center">
          {subtitle}
        </Subtitle>{" "}
      </div>
      {children}
    </section>
  )
);

Section.displayName = "Section";
