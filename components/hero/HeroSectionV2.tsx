'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RevealOnScroll } from '@/components/animations';
import { HeroVisualScene } from './v2/HeroVisualScene';
import { HeroSceneMobile } from './v2/HeroSceneMobile';
import { HeroProofBar } from './HeroProofBar';

interface HeroSectionV2Props {
    title: ReactNode;
    description?: string;
    badge?: string;
    children?: ReactNode;
    primaryCta?: { text: string; href: string };
    secondaryCta?: { text: string; href: string };
}

export function HeroSectionV2({
    title,
    description,
    badge,
    children,
    primaryCta,
    secondaryCta,
}: HeroSectionV2Props) {
    // Fixed height only at lg+, where copy + scene sit side-by-side and fill
    // the fold. Below lg the scene stacks under the copy and the combined
    // height exceeds one viewport, so we release the height and let the
    // section grow naturally (title → scene → proof bar flow).
    // h = max(100vh, 680px): on short viewports (snapped windows, 1366×768
    // laptops minus chrome) a bare 100vh crushes copy + scene + proof bar
    // and overflow-hidden CLIPS them — the floor lets the hero grow past
    // the fold instead. Normal screens are unaffected (100vh wins the max).
    // Post-hero gap follows the Hero2/PageHeader convention: [&+section]
    // trims the next section's top padding so the hero's mb-20/28/32 sets
    // the rhythm instead of stacking with a full section pt.
    return (
        <section className="relative lg:h-[max(100vh,680px)] -mt-14 pt-14 pb-10 md:pb-8 mb-20 md:mb-28 lg:mb-32 [&+section]:pt-8 md:[&+section]:pt-12 lg:[&+section]:pt-16 overflow-hidden rounded-b-3xl shadow-primary/30 shadow-2xl bg-gradient-to-b from-background via-background to-secondary/70">
            {/* Soft brand wash — blooms on slowly with the scene's entrance
                (a light source turning on behind the window). The base
                gradient stays static: it's the section surface, and fading
                a surface reads as a load glitch, not a reveal. */}
            <motion.div
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,hsl(208_46%_33%/0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,hsl(208_46%_33%/0.25),transparent_70%)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.5, ease: 'easeOut' }}
            />

            <div className="container relative z-10 lg:h-full">
              <div className="max-w-7xl mx-auto lg:h-full flex flex-col">
                {/* Top section: text + scene — fills available vertical space,
                    contents centered. data-scene-viewport: the scene's
                    useFitScale reads this row's height as the vertical budget
                    at lg+ (where the hero is height-locked). */}
                <div className="flex-1 flex items-center min-h-0" data-scene-viewport>
                  {/* One-column (below lg) has no vertical centering — the
                      section is auto-height — so breathing room above the
                      title comes from a laddered pt instead; lg+ zeroes it
                      (flex centering owns the spacing there). */}
                  <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-10 lg:gap-8 items-center pt-8 sm:pt-10 md:pt-12 lg:pt-0">
                    {/* Left: copy */}
                    {/* space-y ladders with the type size: 20px on phones
                        (3xl title — proportionally tightest, and it shortens
                        the tall stacked hero), 24px from md (4xl), 28px only
                        at xl where the type is full-size (5xl). */}
                    <div className="text-left space-y-5 md:space-y-6 xl:space-y-7 max-w-xl">
                        {badge && (
                            <RevealOnScroll direction="up" duration={0.6}>
                                {/* Banded like the title/body: 11px in the
                                    narrow 1024–1280 column keeps the long
                                    uppercase line from wrapping to a
                                    two-line rounded-full pill. */}
                                <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/40 bg-primary/5 text-primary text-[11px] md:text-xs lg:text-[11px] xl:text-xs font-semibold tracking-wider uppercase">
                                    {badge}
                                </span>
                            </RevealOnScroll>
                        )}

                        <RevealOnScroll direction="up" delay={0.15} duration={0.7}>
                            {/* 5xl waits for xl (1280+): in the 1024–1280
                                two-column band the copy column is ~380–450px
                                and 48px wraps hard — 4xl fits it. ≥1280 (incl.
                                the 1920 baseline) is unchanged. */}
                            <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.05]">
                                {title}
                            </h1>
                        </RevealOnScroll>

                        {description && (
                            <RevealOnScroll direction="up" delay={0.3} duration={0.7}>
                                {/* Sized to the COLUMN, not the viewport:
                                    18px where the copy is full-width (md
                                    one-column) or wide (xl+ two-column),
                                    16px in the narrow 1024–1280 two-column
                                    band — mirroring the title's banding. */}
                                <p className="text-base md:text-lg lg:text-base xl:text-lg text-foreground/65 leading-relaxed">
                                    {description}
                                </p>
                            </RevealOnScroll>
                        )}

                        {(primaryCta || secondaryCta) && (
                            <RevealOnScroll direction="up" delay={0.45} duration={0.5}>
                                {/* Banded like the rest of the copy: slimmer
                                    button padding in the narrow 1024–1280
                                    column so both CTAs stay on one row. */}
                                <div className="flex flex-wrap items-center gap-3">
                                    {primaryCta && (
                                        <Button
                                            size="lg"
                                            variant="default"
                                            className="max-[379px]:w-full lg:px-5 xl:px-8"
                                            asChild
                                        >
                                            <a href={primaryCta.href}>{primaryCta.text}</a>
                                        </Button>
                                    )}
                                    {secondaryCta && (
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="max-[379px]:w-full lg:px-5 xl:px-8"
                                            asChild
                                        >
                                            <a href={secondaryCta.href}>{secondaryCta.text}</a>
                                        </Button>
                                    )}
                                </div>
                            </RevealOnScroll>
                        )}

                        {/* Trust microline */}
                        <RevealOnScroll direction="up" delay={0.55} duration={0.5}>
                            <div className="flex items-center gap-2 text-xs text-foreground/55">
                                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                                <span>Enterprise-grade security. Built for scale.</span>
                            </div>
                        </RevealOnScroll>

                        {children}
                    </div>

                    {/* Right: scene — enters with more weight than the copy:
                        a deeper rise + a hint of scale so the "screen" lifts
                        into place from depth, and it lags the text slightly
                        so the copy clearly leads. Tune y/scale/delay to taste. */}
                    <motion.div
                        className="w-full"
                        initial={{ opacity: 0, y: 64, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Scaled exploded scene at sm+; a compact looping
                            slot below sm where the shrunk scene is unreadable.
                            Toggle on wrappers, not the scenes' own roots — the
                            desktop root is `flex`, and a `hidden` on the same
                            element loses to it (both set display). */}
                        {/* pb only in the sm–lg one-column band: the flat 2D
                            scene needs breathing room above the proof bar
                            there; lg+ (tilted, 100vh-centered) and <sm (the
                            mobile scene) manage their own spacing. */}
                        <div className="hidden sm:block pb-10 lg:pb-0">
                            <HeroVisualScene />
                        </div>
                        <div className="sm:hidden">
                            <HeroSceneMobile />
                        </div>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom section: client logo strip — pinned at the bottom of the hero */}
                <RevealOnScroll direction="up" delay={0.6} duration={0.6}>
                    <div className="pt-4 md:pt-6 border-t border-foreground/10">
                        <HeroProofBar />
                    </div>
                </RevealOnScroll>
              </div>
            </div>
        </section>
    );
}
