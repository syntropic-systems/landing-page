'use client';

import { motion } from 'framer-motion';
import { Sparkles, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ValueSwap } from './RevealBits';

// Grouped under section subheadings like the real CloudGlance tender
// Summary sidebar (Financials / Dates / …), rather than one flat list.
const GROUPS: Array<{
    title: string;
    rows: Array<{ label: string; value: string; pill?: string }>;
}> = [
    {
        title: 'Financials',
        rows: [
            { label: 'Project Value', value: 'INR 1,34,00,000' },
            { label: 'Bank Guarantee', value: 'INR 6,70,000' },
        ],
    },
    {
        title: 'Dates',
        rows: [
            { label: 'Bid Due Date', value: '27 Feb 2026', pill: '18 days left' },
            { label: 'Delivery Timeline', value: '45 Days' },
        ],
    },
    {
        title: 'Scope & Compliance',
        rows: [
            { label: 'BoQ Items', value: '832' },
            { label: 'Technical Score', value: '61 / 100' },
            { label: 'Compliance Items', value: '12' },
            { label: 'Conditions', value: '87' },
        ],
    },
];

// Group boxes stagger in when the structure is revealed.
const GROUPS_V = {
    hidden: {},
    show: { transition: { delayChildren: 0.3, staggerChildren: 0.12 } },
};
const BOX_V = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * Two-phase reveal for the scene choreography:
 *   showStructure (beat ≥ 2) — group boxes + labels appear, values load
 *                              in as skeletons.
 *   showValues    (beat ≥ 3) — skeletons resolve to real values, the
 *                              Tender Score bar fills, citation appears.
 * Both default true so the card renders fully when used standalone.
 */
export function ExtractedIntelligenceCard({
    className,
    showStructure = true,
    showValues = true,
}: {
    className?: string;
    showStructure?: boolean;
    showValues?: boolean;
}) {
    return (
        <div
            className={cn(
                'rounded-xl border border-border/60 bg-card/80 shadow-xl shadow-primary/20 p-3.5 w-full sm:w-[240px]',
                className
            )}
        >
            <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <p className="text-[11px] font-semibold text-foreground">
                    Extracted Intelligence
                </p>
            </div>

            <motion.div
                className="space-y-2"
                variants={GROUPS_V}
                initial="hidden"
                animate={showStructure ? 'show' : 'hidden'}
            >
                {GROUPS.map((group) => (
                    <motion.div
                        key={group.title}
                        variants={BOX_V}
                        className="rounded-lg bg-background border border-border/40 px-2.5 py-1"
                    >
                        <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-primary/80 my-0.5">
                            {group.title}
                        </p>
                        <div className="divide-y divide-border/30">
                            {group.rows.map((row) => (
                                <div
                                    key={row.label}
                                    className="flex items-center justify-between gap-2 py-0.5"
                                >
                                    <span className="text-[10px] text-foreground/55 shrink-0">
                                        {row.label}
                                    </span>
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        {row.pill && (
                                            <motion.span
                                                initial={false}
                                                animate={{ opacity: showValues ? 1 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-[8px] font-medium text-warning-foreground px-1 py-0.5 rounded bg-warning/40 border border-warning-foreground/20 whitespace-nowrap"
                                            >
                                                {row.pill}
                                            </motion.span>
                                        )}
                                        <ValueSwap
                                            show={showValues}
                                            className="text-[10px] font-semibold text-foreground tabular-nums"
                                        >
                                            {row.value}
                                        </ValueSwap>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Tender score — appears with the structure; the bar and
                number fill in when the values resolve. */}
            <motion.div
                className="mt-2 pt-2 border-t border-border/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: showStructure ? 1 : 0 }}
                transition={{ duration: 0.4, delay: showStructure ? 0.5 : 0 }}
            >
                <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-foreground/55">
                        Tender Score
                    </span>
                    <ValueSwap
                        show={showValues}
                        className="text-[11px] font-semibold text-foreground tabular-nums"
                    >
                        84 / 100
                    </ValueSwap>
                </div>
                <div className="h-1 rounded-full bg-foreground/10 overflow-hidden">
                    <motion.div
                        className="h-full bg-success-foreground rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: showValues ? '84%' : 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
            </motion.div>

            {/* Citation cue — traceability stamp, resolves with the values */}
            <motion.div
                className="mt-2 flex items-center gap-1.5 text-[9px] text-foreground/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: showValues ? 1 : 0 }}
                transition={{ duration: 0.4, delay: showValues ? 0.3 : 0 }}
            >
                <Quote className="h-2.5 w-2.5 text-primary/70 shrink-0" />
                <span>
                    Extracted from{' '}
                    <span className="text-foreground font-medium">12 sources</span> ·
                    fully cited
                </span>
            </motion.div>
        </div>
    );
}
