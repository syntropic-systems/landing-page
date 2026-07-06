'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/animations';

interface Hero2Props {
    title: ReactNode;
    description?: string;
    badge?: string;
    /** Optional static "shard" of the homepage scene — fills the right
     * column at lg+, stacks under the copy at md, hidden on phones. When
     * absent (Company), the right column simply holds the brand-wash glow. */
    visual?: ReactNode;
}

export function Hero2({
    title,
    description,
    badge,
    visual,
}: Hero2Props) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            // Top spacing mirrors the homepage hero: below lg the same
            // breathing ladder it uses over its pt-14 header offset
            // (32/40/48px → totals 88/96/104). At lg+ the copy is truly
            // CENTERED in the ~75vh stage — lg:pt-14 (header offset) and
            // lg:pb-14 are equal, so the space above and below the content
            // matches optically. With the light bottom edge + the trimmed
            // post-hero gap, the surrounding stage space reads as card
            // padding, not void (the earlier content-height iteration is
            // in git history if the stage ever feels tall again).
            // Post-hero gap = flat mb-20 + the PageHeader convention
            // [&+section]:pt-8/12/16 (sibling selector (0,1,1) beats
            // Section's py-* without !important; pages opt out via !pt-*).
            // The next section must rise far enough INTO the fold to trip
            // its RevealOnScroll, else it stays invisible and the fold reads
            // as empty → line → empty.
            // Edge hierarchy: the homepage hero is the full closed card
            // (rounded-b-3xl + shadow-2xl/primary-30); hub heroes close with
            // a LIGHTER edge — rounded-b-2xl + shadow-xl/primary-20 — enough
            // boundary that shard-less pages still read as a staged hero
            // (fully edgeless, the h1 blurred into the first section's h2),
            // without outranking the homepage card. Tertiary PageHeader
            // stays open/edgeless. Edge needs a tonal floor to sit on, so
            // the gradient ends at secondary/70 (not a dissolve).
            className="relative -mt-14 pt-22 sm:pt-24 md:pt-26 lg:pt-14 pb-22 sm:pb-24 md:pb-26 lg:pb-14 lg:min-h-[max(75vh,560px)] lg:flex lg:flex-col lg:justify-center mb-20 [&+section]:pt-8 md:[&+section]:pt-12 lg:[&+section]:pt-16 overflow-hidden rounded-b-3xl shadow-primary/10 shadow-lg bg-gradient-to-b from-background via-background to-secondary/70"
        >
            {/* Static echo of the homepage hero's brand wash — same radial,
                no bloom animation. Sits over the right half, balancing the
                copy and backlighting the visual shard when one is present. */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,hsl(208_46%_33%/0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,hsl(208_46%_33%/0.25),transparent_70%)]" />

            <div className="container relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* One canonical hub-hero layout: copy in the left column,
                        the right column holding a shard when present and the
                        brand-wash glow when not (Company). Every hub page thus
                        shares the same copy measure + position, shard or not —
                        the visual just fills (or vacates) the right slot.
                        1fr/1.2fr gives the width-hungry row shards the larger
                        half (softened echo of the homepage's 1fr/1.5fr). */}
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-10 lg:gap-12 items-center">
                        {/* Copy sits in the narrow left column, so it adopts
                            the homepage's two-column type banding — 5xl / 18px
                            wait for xl, since the column wraps them hard in the
                            1024–1280 band. */}
                        <div className="text-left space-y-5 md:space-y-6 xl:space-y-7 max-w-xl">
                            {badge && (
                                <RevealOnScroll direction="up" duration={0.6}>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/40 bg-primary/5 text-primary font-semibold tracking-wider uppercase text-[11px] md:text-xs lg:text-[11px] xl:text-xs">
                                        {badge}
                                    </span>
                                </RevealOnScroll>
                            )}
                            <RevealOnScroll direction="up" delay={0.15} duration={0.7}>
                                <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.05]">
                                    {title}
                                </h1>
                            </RevealOnScroll>
                            {description && (
                                <RevealOnScroll direction="up" delay={0.3} duration={0.7}>
                                    <p className="text-base md:text-lg lg:text-base xl:text-lg text-foreground/65 leading-relaxed">
                                        {description}
                                    </p>
                                </RevealOnScroll>
                            )}
                        </div>

                        {/* md–lg: stacks under the copy in the one-column band
                            (homepage playbook — the visual scales down, it
                            doesn't vanish). Phones stay copy-only: a stacked
                            visual would re-inflate the mobile hero we
                            deliberately shrank. hidden wrapper OUTSIDE
                            RevealOnScroll so the display:none grid item
                            generates no row and the gap adds no dead space. */}
                        {visual && (
                            <div className="hidden md:block">
                                <RevealOnScroll direction="up" delay={0.35} duration={0.7}>
                                    {visual}
                                </RevealOnScroll>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
